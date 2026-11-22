---
title: 'Vector addition và các bước của một dự án CUDA'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 22
status: edited
source: '022 - 003 - Vector addition + the Steps for any CUDA project.md'
categories:
- Nvidia
tags: []
---

# ➕ Vector addition và các bước của một dự án CUDA

> Nguồn: `022 - 003 - Vector addition + the Steps for any CUDA project.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/33805758)

Project 003 cộng hai vector **1024 phần tử**. Bài này là bản mẫu cho mọi dự án CUDA về sau: cấp phát memory, khởi tạo, copy host→device, launch kernel, copy device→host, giải phóng. Kernel chỉ cần một lệnh, không vòng lặp, nhờ mỗi thread đảm nhận một phần tử.

### 🧮 Bài toán và cách làm trên CPU

Cho vector **A** và **B**, mỗi vector **1024 phần tử** (chỉ số 0–1023). Kết quả lưu vào **C**, cộng từng phần tử tương ứng: `C[0] = A[0] + B[0]`, v.v.

Trên CPU, chỉ cần một vòng `for` duyệt 1024 phần tử, mỗi lần cộng `A[i] + B[i]` ghi vào `C[i]`. Nhưng vòng lặp chạy **tuần tự**.

---

### 🧠 Ánh xạ thread sang phần tử

Chọn cấu hình **1 block, 1024 thread**. Khi đó:

* Block ID = **0** — không hữu ích, chỉ một block.
* Thread ID chạy **0–1023**, **trùng khớp** với chỉ số phần tử của vector.

Vì vậy mỗi thread có thể đảm nhận đúng một phần tử: thread 0 làm phần tử 0, thread 1 làm phần tử 1... Không cần vòng lặp — `threadIdx.x` đã đóng vai trò chỉ số.

Kernel:

```cuda
__global__ void vector_add(int *a, int *b, int *c, int n) {
    int i = threadIdx.x;
    c[i] = a[i] + b[i];
}
```

Một instruction `c[i] = a[i] + b[i]` được "viết lại" 1024 lần với `i` khác nhau, giao cho các core chạy song song.

---

### 🪜 Sáu bước của mọi dự án CUDA

1. **Cấp phát memory** cho input/output, cả trên **host** và **device**. Ba con trỏ cho CPU dùng `malloc`; ba con trỏ cho GPU dùng `cudaMalloc`.
2. **Khởi tạo input** trên CPU: vòng `for` gán giá trị cho A và B. (C không cần khởi tạo vì sẽ ghi kết quả.)
3. **Copy A và B từ host sang device** bằng `cudaMemcpy` với chiều **HostToDevice**.
4. **Launch kernel**: `vector_add<<<1, 1024>>>(d_a, d_b, d_c, n)`. Lệnh này gồm ba phần: tên kernel, cấu hình `<<<blocks, threads>>>`, và tham số.
5. **Copy kết quả từ device về host** bằng `cudaMemcpy` với chiều **DeviceToHost**.
6. **Giải phóng memory** trên cả hai phía: `cudaFree` cho GPU, `free` cho CPU — tránh memory leak.

---

### 💻 Chi tiết code

* `#define` kích thước vector là **1024**, đổi một chỗ là đổi toàn bộ.
* Kernel có dấu **`__global__`**, nhận `a, b, c` và `n`. Biến `n` bằng kích thước, sẽ dùng ở các bài sau để xử lý trường hợp lớn hơn số thread.
* Trong `main`, ba con trỏ CPU (`a, b, c`) và ba con trỏ GPU (`d_a, d_b, d_c`).
* Kích thước cấp phát là `size * sizeof(int)`, không phải chỉ `size`.
* Khởi tạo: `a[i] = i`, `b[i] = size - i`.
* Copy: `cudaMemcpy(d_a, a, size, cudaMemcpyHostToDevice)`, tương tự cho B; sau kernel copy ngược `cudaMemcpy(c, d_c, size, cudaMemcpyDeviceToHost)`.
* Cuối cùng `cudaFree` ba con trỏ GPU và `free` ba con trỏ CPU.

---

### ✅ Kiểm chứng kết quả

Build thành công (1 succeeded, 0 failed), chạy in ra từng dòng `a + b = c`. Ví dụ **23 + 9 = 32** — đúng. Khi thử với 32 phần tử đầu: A chạy 0–31, B chạy 32–1, cộng lại khớp.

---

### ✅ Chốt lại

Sáu bước trên lặp lại ở hầu hết dự án CUDA. Điểm mấu chốt của vector addition là **ánh xạ thread ID sang chỉ số phần tử**, nhờ đó bỏ được vòng lặp. Bài sau mình sẽ tăng vector lên 2048, buộc phải dùng nhiều block, và rút ra công thức index quan trọng.
