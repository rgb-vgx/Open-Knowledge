---
title: 'Kiểm tra lỗi trong CUDA: synchronous và asynchronous'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 32
status: edited
source: '032 - Error checking APIs.md'
categories:
- Nvidia
tags: []
---

# 🛡️ Kiểm tra lỗi trong CUDA: synchronous và asynchronous

> Nguồn: `032 - Error checking APIs.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/43052966)

Có những lỗi CUDA biên dịch sạch nhưng chạy sai, ví dụ `cudaMalloc` thất bại vì hết RAM — không compiler nào bắt được và runtime có thể không in ra lỗi đọc được. Vì vậy cần **error checking** cho mọi hàm CUDA trước khi profiling. Bài này phân biệt hai loại: **synchronous** và **asynchronous**.

### 🔄 Synchronous error checking

Các thao tác như cấp phát bộ nhớ là **synchronous**: chặn host cho tới khi thiết bị xong. Lỗi được báo ngay sau khi thao tác hoàn tất, nên xử lý đơn giản. Phần lớn hàm Runtime API trả về mã lỗi.

Mẫu kiểm tra:

```cuda
cudaError_t err = cudaMalloc((void**)&d_a, bytes);
if (err != cudaSuccess) {
    fprintf(stderr, "cudaMalloc failed: %s\n", cudaGetErrorString(err));
}
```

`cudaGetErrorString` nhận mã lỗi và trả về chuỗi mô tả tương ứng.

---

### 🧪 Thí nghiệm: làm tràn bộ nhớ

Vector addition với số phần tử lớn. Mỗi phần tử là `int` 4 byte, ba vector A, B, C. Ở mức ban đầu, mỗi vector chiếm khoảng **4 GB**, tổng **12 GB** — vẫn vừa. Tăng thêm hệ số 20 thì mỗi vector khoảng **80 GB**, ba vector vượt xa cả RAM lẫn VRAM.

Trước tiên gặp **warning** ở dòng 17: `integer conversion resulted in truncation`. Biến `size` kiểu `int` không chứa nổi kết quả `N × 4`. Sửa thành `long` thì hết warning.

Khi tăng tiếp, phép nhân `1024 * 1024 * 20` vẫn bị tràn vì các toán hạng đều là `int`. Cần ép kiểu:

```cuda
long long N = 1024LL * 1024LL * 20LL;
```

Hậu tố `LL` buộc phép nhân chạy trên `long long`, tránh tràn trung gian. Warning cũng xuất hiện ở vòng `for`, nên sửa cả đó.

Chạy với kích thước quá lớn → **segmentation fault**. Nhưng segfault không cho biết lỗi nằm ở đâu, nên cần error checking.

---

### 🧷 Đặt error checking đúng chỗ

Ban đầu, chương trình cấp phát bộ nhớ **host** (`malloc`) trước rồi mới `cudaMalloc`. Segfault đến từ `malloc`, không phải `cudaMalloc`, nên các kiểm tra cho `cudaMalloc` không in gì.

Chuyển `cudaMalloc` lên trước, và thêm kiểm tra cho cả ba vector. Kết quả:

```text
failed to allocate device memory: out of memory
```

GPU thử cấp phát, chạm trần **24 GB** dedicated rồi tăng shared memory, vẫn không đủ, thử–thất bại vài lần rồi báo **out of memory**. Đây chính là giá trị của error checking: chỉ đúng hàm và đúng nguyên nhân.

---

### ⚡ Asynchronous error checking

Kernel launch là **asynchronous**: host không chờ kernel xong mà chạy tiếp instruction sau. Vì vậy không thể làm `err = kernel<<<...>>>(...)` để bắt lỗi ngay. Nếu không đồng bộ mà đã `cudaMemcpy` kết quả về, có thể copy khi kernel chưa chạy xong.

Cách đúng: gọi **`cudaGetLastError`** sau khi launch, và **`cudaDeviceSynchronize`** khi cần chờ hoàn tất.

```cuda
vectorAdd<<<blocks, threads>>>(d_a, d_b, d_c, n);
cudaError_t err = cudaGetLastError();
if (err != cudaSuccess) {
    fprintf(stderr, "Kernel launch failed: %s\n", cudaGetErrorString(err));
}
cudaDeviceSynchronize();
```

---

### 🧱 Gom thành macro

Ba dòng kiểm tra bị lặp ở mọi lời gọi. Gom lại bằng macro gọi một hàm `inline`:

```cuda
inline void gpuAssert(cudaError_t code, const char* file, int line) {
    if (code != cudaSuccess) {
        fprintf(stderr, "GPU assert: %s %s %d\n",
                cudaGetErrorString(code), file, line);
        exit(code);
    }
}

#define CUDA_CHECK_ERROR(val) gpuAssert((val), __FILE__, __LINE__)
```

Dùng `CUDA_CHECK_ERROR(cudaMalloc(...))`. Vì `gpuAssert` gọi `exit`, khi vector A không cấp phát được thì dừng ngay thay vì thử tiếp B và C. Khi chạy, thông báo in cả **tên file** và **số dòng**, ví dụ dòng 37.

Với kernel launch, dùng biến thể asynchronous dựa trên `cudaGetLastError` thay vì bắt giá trị trả về của lời gọi kernel.

---

### ✅ Chốt lại

Hai loại lỗi cần hai cách bắt: hàm synchronous như `cudaMalloc` trả mã lỗi trực tiếp; kernel launch asynchronous phải dùng `cudaGetLastError` và `cudaDeviceSynchronize`. Gom kiểm tra vào macro `CUDA_CHECK_ERROR` để không lặp code và dừng đúng lúc. Từ các bài sau, error checking được dùng mặc định mà không nhắc lại.
