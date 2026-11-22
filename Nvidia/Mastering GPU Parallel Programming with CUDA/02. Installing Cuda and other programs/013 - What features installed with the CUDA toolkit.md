---
title: 'CUDA toolkit gồm những gì'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 13
status: edited
source: '013 - What features installed with the CUDA toolkit.md'
categories:
- Nvidia
tags: []
---

# 🧰 CUDA toolkit gồm những gì

> Nguồn: `013 - What features installed with the CUDA toolkit.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/41215706)

**CUDA (Compute Unified Device Architecture)** là nền tảng tính toán song song của Nvidia. Nhưng "cài CUDA" không chỉ là cài một compiler — toolkit còn có thư viện tối ưu, runtime API, công cụ profiling/debug và sample code. Bài này điểm qua từng phần để các bạn biết mình có gì trong tay.

### 🧩 CUDA là gì

CUDA là nền tảng và **API** tính toán song song do Nvidia tạo ra, cho phép lập trình viên dùng GPU Nvidia cho mục đích tổng quát — cách tiếp cận gọi là **GPGPU (General Purpose computing on GPU)**.

Toolkit phục vụ cả lập trình CUDA đơn giản lẫn ứng dụng GPU phức tạp, và là cửa ngõ để khai thác GPU Nvidia.

---

### ⚙️ nvcc: compiler trung tâm

**nvcc** là compiler CUDA, trái tim của toolkit. Nó chuyển code CUDA bậc cao thành dạng GPU hiểu được:

* Biên dịch code CUDA thành **PTX** — dạng tương thích với nhiều architecture Nvidia.
* Tạo **file thực thi** chạy hiệu quả trên GPU.

Trong khóa học, nvcc còn xuất hiện ở nhiều vai trò khác khi ta học các tùy chọn biên dịch và tối ưu.

---

### 📚 Thư viện tối ưu sẵn

CUDA đi kèm bộ thư viện chuyên dụng, đã tối ưu:

* **cuBLAS**: đại số tuyến tính.
* **cuFFT**: Fast Fourier Transform.
* **cuRAND**: sinh số ngẫu nhiên.
* **cuDNN**: tăng tốc neural network cho deep learning.

Đây là xương sống của lập trình GPU hiệu quả: hàm dùng ngay, đã tối ưu, tiết kiệm thời gian và tăng hiệu năng.

---

### 🧩 Runtime API

Runtime API quản lý **khởi tạo device**, **cấp phát memory** và **launch kernel** — tức cách ứng dụng tương tác với GPU. Hai hàm quen thuộc:

* **`cudaMalloc`**: cấp phát memory trên GPU, tương tự `malloc` của C nhưng dành cho device.
* **`cudaMemcpy`**: copy dữ liệu giữa **host (CPU)** và **device (GPU)**.

Các hàm này sẽ được dùng liên tục trong mọi dự án CUDA ở section sau.

---

### 🔬 Profiling và debug

Viết code chỉ là một nửa; nửa còn lại là đảm bảo hiệu quả và ổn định. Toolkit có:

* **Nsight Systems** và **Nsight Compute**: profiling, phân tích ứng dụng.
* **cuda-gdb**: debug CUDA trên Linux và macOS.
* **cuda-memcheck**: phát hiện và chẩn đoán lỗi memory.

Bộ công cụ này tạo môi trường đầy đủ để không chỉ viết code mà còn tinh chỉnh ứng dụng tăng tốc GPU.

---

### 🧪 Sample code và cập nhật phiên bản

Toolkit có nhiều **sample code** — không chỉ là code mẫu mà là hướng dẫn thực hành các kỹ thuật CUDA từ cơ bản tới nâng cao. Phân tích các sample là cách học rất hiệu quả, bổ sung cho lý thuyết.

CUDA được cập nhật liên tục. Ví dụ bản **12.3** có cập nhật cho **cuda-gdb**, compiler **nvcc**, và các thư viện — nhằm tận dụng tính năng phần cứng mới của các architecture như **Hopper** hay **Ada Lovelace**.

**Chốt lại.** CUDA toolkit = **compiler nvcc** + **thư viện tối ưu** + **runtime API** + **công cụ profiling/debug** + **sample code**. Bài sau mình bắt tay vào cài đặt, bắt đầu trên Windows.
