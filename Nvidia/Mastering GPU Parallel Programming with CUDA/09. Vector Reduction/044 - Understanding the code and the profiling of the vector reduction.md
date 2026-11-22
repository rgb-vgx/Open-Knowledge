---
title: 'Vector reduction: hoàn thiện code và đo baseline'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 44
status: edited
source: '044 - Understanding the code and the profiling of the vector reduction.md'
categories:
- Nvidia
tags: []
---

# 📐 Vector reduction: viết đủ chương trình và đo baseline

> Nguồn: `044 - Understanding the code and the profiling of the vector reduction.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46502265)

Bài trước mới có phần lý thuyết và kernel. Bài này viết trọn chương trình: hàm CPU để đối chiếu kết quả, cấu hình ba lượt kernel, đọc kết quả về, rồi profile để lấy **baseline** — mốc so sánh cho mọi tối ưu về sau.

### ✅ Viết hàm CPU để kiểm chứng

Kernel GPU rất dễ sai mà không báo lỗi, nên cần một hàm CPU đơn giản làm chuẩn:

```cuda
float cpu_reduce(float* input, int n) {
    float sum = 0;
    for (int i = 0; i < n; i++) {
        sum += input[i];
    }
    return sum;
}
```

Đầu vào giống kernel (con trỏ vector + `n`), đầu ra là **một** giá trị `float`. So `cpu_reduce` với `input[0]` sau khi chạy GPU là đủ để biết kernel đúng hay sai.

### 🧱 Seven steps quen thuộc

1. Cấp phát host và device: `float* h_input = new float[n];` và `cudaMalloc(&d_input, size)` với `size = n * sizeof(float)` — nhớ `size` là **số byte**, không phải số phần tử.
2. Khởi tạo host: `h_input[i] = static_cast<float>(i);`
3. Copy host → device: `cudaMemcpy(d_input, h_input, size, cudaMemcpyHostToDevice);`
4. Cấu hình kernel và launch.
5. `cudaDeviceSynchronize()` — chờ toàn bộ block chạy xong. Thiếu lệnh này, CPU có thể chạy tiếp trước khi kernel kết thúc.
6. Copy kết quả device → host.
7. Giải phóng: `cudaFree(d_input); delete[] h_input;`

Với `n = 1024 * 1024` (gọi tắt "1 triệu"), nên build sau vài dòng để bắt lỗi sớm thay vì viết hết mới biên dịch.

### 🔢 Cấu hình grid size

Chọn `block_size = 256`. Số thread toàn ứng dụng phải phủ đủ `n` phần tử, nên:

```cuda
int grid_size = (n + block_size - 1) / block_size;
```

Không viết `n / block_size` trần, vì khi `n` không chia hết sẽ ra số thực và thiếu block. Cộng `block_size - 1` trước khi chia là phép **làm tròn lên**. Với `n = 1024*1024` và block 256, `grid_size = 4096`.

### 🪜 Ba lượt kernel

Kernel `reduce_in_place` không cho ra tổng cuối, mà cho ra **một partial sum mỗi block**. Vì vậy phải gọi nhiều lần, mỗi lần input nhỏ đi:

| Lượt | Số phần tử vào | Grid size | Vì sao |
|---|---|---|---|
| 1 | 1.048.576 | 4096 | vector gốc, 4096 block |
| 2 | 4096 | 16 | 4096 partial sum / 256 thread |
| 3 | 16 | 1 | 16 phần tử < 256, một block là đủ |

Kết quả cuối nằm ở `d_input[0]`. Chỉ cần copy **một** `float` (4 byte) về host thay vì cả vector 4 MB:

```cuda
cudaMemcpy(h_input, d_input, sizeof(float), cudaMemcpyDeviceToHost);
```

Lưu ý: dù block 256 thread, lượt 3 chỉ dùng 16 thread; các thread dư bị bộ lọc `tid + stride < n` chặn lại.

Với ứng dụng thật, đừng hard-code `4096`, `16`, `n` — viết vòng lặp tự tính `n_mới = grid_size` cho tới khi `n_mới == 1`. Giảng viên tách từng bước để dễ hiểu rồi mới gộp.

### 🔍 So sánh kết quả CPU và GPU

Kết quả chạy ra xấp xỉ **5.4** ở cả hai phía, nhưng lệch ở chữ số cuối. Nguyên nhân là **độ chính xác khác nhau** giữa phép cộng dồn trên GPU và CPU, không phải lỗi logic. Đổi kiểu từ `float` sang `double` ở toàn bộ chương trình thì hai kết quả khớp hẳn.

Với code phải đổi `float` ở nhiều chỗ, giảng viên gợi ý dùng **template C++** để chỉ cần đổi một từ khóa.

### 📊 Profiling baseline

Mở **Nsight Compute** qua Nsight Integration, đặt tên report `A` — đây là **baseline**, mọi so sánh sau này dựa vào nó.

Bảng summary cho thấy ba kernel cùng tên nhưng khác cấu hình: **grid size 4096, 16, 1**; **block size 256** không đổi. Thời gian chạy:

* Kernel 1: **284 µs** — chiếm gần hết.
* Kernel 2: **15–16 µs**.
* Kernel 3: **~13 µs**.

Vì sao kernel 1 chậm? GPU có **38 SM**. 4096 block / 38 SM ≈ **108 block mỗi SM**, tức hàng trăm **wave** nối tiếp. Kernel 2 chỉ có 16 block → một block mỗi SM, **một wave**, và hơn nửa số SM ngồi không. Kernel 3 càng nhỏ.

Các chỉ số khác của baseline:

* **SM utilization ~74%**, trong khi **memory throughput chỉ ~9%** — ứng dụng nghiêng hẳn về compute.
* **L1 hit rate 91%**, **L2 hit rate ~80%**.
* Double precision và tensor core bằng 0 vì toàn bộ tính bằng `float`.

Hit rate cao là điểm đáng chú ý: khác vector addition (mỗi phần tử dùng đúng một lần, hit rate 0%), reduction **tái sử dụng** phần tử 0 ở gần như mọi bước, nên cache có việc để làm.

Baseline đã có. Bài tiếp theo bắt đầu tối ưu — và bước đầu tiên là bỏ các phép toán thừa của thread lẻ.
