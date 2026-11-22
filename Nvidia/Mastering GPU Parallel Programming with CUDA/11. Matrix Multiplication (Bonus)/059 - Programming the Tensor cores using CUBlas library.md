---
title: 'cuBLAS: gọi thư viện, không viết kernel'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 59
status: edited
source: '059 - Programming the Tensor cores using CUBlas library.md'
categories:
- Nvidia
tags: []
---

# 🧰 cuBLAS: 107 µs mà không viết dòng kernel nào

> Nguồn: `059 - Programming the Tensor cores using CUBlas library.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/48364937)

WMMA cho phép điều khiển tensor core nhưng vẫn phải tự viết load, mma, store. **cuBLAS** làm hết — các bạn chỉ khai báo tham số. Kết quả cho ma trận 1024: **107 µs**, nhanh hơn WMMA 388 µs khoảng **3,6 lần**.

### 📚 cuBLAS là gì

Thư viện BLAS của NVIDIA cho GPU, cung cấp kernel GEMM đã tối ưu sẵn cho mọi kiến trúc. Khác WMMA ở chỗ **không tùy biến được**: không sửa được cách chia tile hay cách nạp dữ liệu, nhưng bù lại hiệu năng gần giới hạn phần cứng.

Cài đặt: lấy từ trang download của NVIDIA, chọn bản khớp với **CUDA Toolkit** đang dùng. Trên Linux thường có sẵn khi cài CUDA Toolkit đầy đủ.

### 🧾 Phương trình GEMM

cuBLAS tính:

$$C = \alpha \cdot op(A) \cdot op(B) + \beta \cdot C$$

* `alpha = 1`, `beta = 0` → `C = A·B`, ghi đè C.
* `beta = 1` → cộng dồn vào C (dùng khi chia K thành nhiều lần gọi).
* `op(A)` là `A` hoặc `Aᵀ` tùy `transa`.

Tham số `transa`/`transb` nhận `CUBLAS_OP_N` (không chuyển vị) hoặc `CUBLAS_OP_T` (chuyển vị). Chuyển vị hữu ích khi ma trận lưu row-major mà kernel lại cần đọc theo cột — đổi cách nhìn thay vì copy dữ liệu.

### 🎛️ Handle

Mọi hàm cuBLAS đều nhận tham số đầu là **handle** — một con trỏ quản lý trạng thái (stream, chế độ, workspace). Không có handle thì không gọi được gì.

```cpp
cublasHandle_t handle;
cublasCreate(&handle);
// ... dùng handle cho mọi lệnh
cublasDestroy(handle);
```

### 🚀 Lời gọi GEMM

```cpp
cublasGemmEx(handle,
             CUBLAS_OP_N, CUBLAS_OP_N,
             N, N, N,                 // m, n, k
             &alpha,                  // 1.0f
             d_a, CUDA_R_16F, N,      // A, kiểu, lda
             d_b, CUDA_R_16F, N,      // B, kiểu, ldb
             &beta,                   // 0.0f
             d_c, CUDA_R_32F, N,      // C, kiểu, ldc
             CUBLAS_COMPUTE_32F,      // kiểu tính toán
             CUBLAS_GEMM_DEFAULT);
```

Đọc từng nhóm tham số:

* **`m, n, k`** — kích thước ba ma trận. Ma trận vuông nên cả ba bằng `N`; tổng quát phải tách riêng.
* **`$alpha`** là **địa chỉ** của biến `alpha` (con trỏ), không phải giá trị.
* **`CUDA_R_16F`** — kiểu dữ liệu thực (`R` = real), `16F` = half precision. `CUDA_R_32F` là single.
* **`lda`, `ldb`, `ldc`** — leading dimension, số phần tử một hàng. Với ma trận không pad thì bằng `N`.
* **`CUBLAS_COMPUTE_32F`** — **quan trọng**: phép tính được thực hiện ở **32 bit** dù input là 16 bit. Đây là cách tránh tràn số khi cộng dồn hàng nghìn tích, và cũng là cấu hình chuẩn cho deep learning.
* **`CUBLAS_GEMM_DEFAULT`** — để thư viện tự chọn thuật toán.

Lưu ý tên hàm: `cublasGemmEx` với `Ex` là bản mở rộng cho phép khai báo **kiểu riêng cho A, B, C và kiểu tính toán** — đó là cách đạt half input / float accumulate. Các biến thể khác:

* `cublasSgemm` — single precision thuần.
* `cublasDgemm` — double.
* `cublasHgemm` — half thuần.

Chọn sai biến thể là lỗi kiểu dữ liệu lúc chạy.

### 🔗 Biên dịch

Phải link thư viện, nếu không linker báo undefined reference:

```bash
nvcc -arch=sm_80 -O3 -lcublas -o cublas cublas.cu
```

`-O3` bật tối ưu compiler; `-lcublas` kéo thư viện vào.

Với nhiều chương trình (naive, WMMA, cuBLAS…), giảng viên dùng **Makefile** để khỏi gõ lại lệnh dài mỗi lần: `make` build tất cả, `make clean` xóa binary.

### 📊 Kết quả

| Phiên bản | N = 1024 |
|---|---|
| Naive | 2,5 ms |
| WMMA (tự viết kernel) | 388 µs |
| **cuBLAS** | **107 µs** |

Nhanh hơn naive **khoảng 23 lần**, hơn WMMA tự viết **3,6 lần**. Toàn bộ chênh lệch đó đến từ những thứ kernel tự viết chưa làm: chọn tile động theo kích thước, nạp bất đồng bộ (`cp.async`), double buffering, xử lý biên, và chọn thuật toán theo kiến trúc.

### 🎯 Kết luận cho cả section

Con đường đã đi qua: naive → tiling + shared memory → float4 + unroll → WMMA → cuBLAS, mỗi bước đều đo bằng Nsight Compute. Bài học không phải "hãy dùng cuBLAS" mà là **hiểu bên dưới nó làm gì** để biết khi nào tự viết kernel, khi nào gọi thư viện.

Quy tắc thực dụng:

* Cần matmul thông thường → **cuBLAS**.
* Cần biến thể đặc biệt (fused epilogue, layout riêng, kiểu dữ liệu lạ) → **CUTLASS** hoặc tự viết.
* Cần kiểm soát tuyệt đối / nghiên cứu → **WMMA**.
