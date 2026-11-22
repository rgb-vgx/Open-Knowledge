---
title: 'Tensor core: phần cứng chuyên cho nhân ma trận'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 55
status: edited
source: '055 - The Tensor cores (introduction).md'
categories:
- Nvidia
tags: []
---

# ⚡ Tensor core: đơn vị quan trọng nhất của GPU hiện đại

> Nguồn: `055 - The Tensor cores (introduction).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/48188743)

Từ 2017, tensor core là thứ thay đổi hoàn toàn tốc độ deep learning. Bài này giải thích nó là gì, vì sao nhanh hơn core thường hàng chục lần, và nó hỗ trợ những kiểu dữ liệu nào qua từng kiến trúc.

### 🎯 Vì sao cần phần cứng riêng

Deep learning chủ yếu là **nhân ma trận**: một layer mạng nơ-ron là phép nhân ma trận trọng số với ma trận đầu vào; convolution cũng quy về nhân ma trận ảnh với ma trận filter. Core thường chỉ làm được một phép cộng/nhân mỗi cycle — quá nhỏ so với khối lượng này.

**Tensor core** ra đời để làm đúng một việc: nhân ma trận. NVIDIA gọi là tensor core, AMD gọi là matrix core — cùng chức năng.

---

### 🕰️ Lịch sử kiến trúc

Tensor core xuất hiện lần đầu trên **Volta (2017)**, rồi Turing, Ampere, Hopper, Ada Lovelace, Blackwell.

So sánh P100 (Pascal, không có tensor core) với V100 (Volta):

* P100: khoảng **15 TFLOPS** FP16 theo transcript (spec FP16 chính thức của P100 là ~19 TFLOPS).
* V100: **125 TFLOPS** FP16.
* Chênh khoảng **9 lần** — con số NVIDIA dùng trong whitepaper.

Ý nghĩa thực tế: một mô hình train mất 10 ngày trên P100 có thể xong trong khoảng 1 ngày trên V100. Tiết kiệm thời gian, điện năng, và mở ra khả năng train những mô hình lớn hơn.

---

### 🔬 Cấu tạo

Mỗi tensor core **không phải một đơn vị đơn lẻ** mà gồm nhiều đơn vị nhỏ bên trong — đó là lý do nó xử lý được nhiều phần tử cùng lúc.

Số lượng:

* **2 tensor core mỗi partition**.
* **4 partition mỗi SM** → **8 tensor core mỗi SM**.
* V100 có 80 SM → **640 tensor core**.

Một tensor core thực hiện **64 FMA** mỗi clock. **FMA** (*Fused Multiply-Add*) là phép `d = a*b + c` — tính bằng **hai** phép toán (một nhân, một cộng) trong một instruction. Vậy:

* 1 tensor core = 64 FMA = **128 phép toán/clock**.
* 1 SM (8 tensor core) = 512 FMA = **1024 phép toán dấu phẩy động/clock**.
* Core thường: **1 phép toán/clock**.

Chênh lệch đó, nhân với hàng chục SM, giải thích con số gấp 9 lần ở trên.

---

### 🧮 Kiểu dữ liệu theo kiến trúc

Ký hiệu `A×B → C`: hai kiểu đầu là input, kiểu sau là output.

| Kiến trúc | Hỗ trợ |
|---|---|
| **Volta** | FP16 → FP16, FP16 → FP32 |
| **Turing** | các dạng trên + **INT8**, **INT4** |
| **Ampere** | thêm **INT1** (binary), **BF16**, **TF32**, tensor core cho **FP64** |

Vì sao cần `FP16 → FP32`? Khi nhân hai ma trận số lớn, tổng tích lũy có thể vượt miền biểu diễn của FP16. Giữ input ở 16 bit để nhanh, nhưng **tích lũy** ở 32 bit để không tràn — đây là cấu hình mặc định cho hầu hết phép nhân deep learning.

Vì sao có **INT1**? Với mạng chỉ có hai trạng thái (bật/tắt), input 1 bit là đủ. Nhưng output không thể 1 bit: cộng hai bit đã ra 2, cần ít nhất 2 bit, nên output phải là 4 hoặc 8 bit.

**TF32** là định dạng riêng của Ampere: giữ 10 bit mantissa của FP16 nhưng exponent 8 bit của FP32, cho phép chạy FP32 nhanh hơn mà không phải viết lại code.

---

### 📊 Ampere: 20 so với 156/312

Với A100, core thường đạt **19.5 TFLOPS** FP32. Dùng tensor core: **156 TFLOPS** TF32, **312 TFLOPS** FP16 (dense) — hoặc gấp đôi nếu tận dụng **sparsity** (ma trận thưa). Đó là lý do mọi framework hiện đại đều mặc định dùng tensor core khi chạy matmul trên GPU.

---

### 🧰 Phần mềm đi kèm

Tensor core chỉ dùng được khi phần mềm biết phát instruction cho nó. NVIDIA đã cập nhật toàn bộ stack:

* **cuBLAS**: GEMM tối ưu sẵn.
* **cuDNN**: convolution và layer của deep learning.
* **cuSPARSE**, **cuFFT**, **cuSOLVER**.
* Framework: Caffe2, MXNet, **PyTorch**, TensorFlow.

Nghĩa là khi các bạn gọi `torch.matmul` trên GPU, bên dưới gần như chắc chắn là tensor core — trừ khi kiểu dữ liệu hoặc kích thước ma trận không phù hợp.

Một lưu ý hiệu năng sẽ nói kỹ ở bài sau: **hiệu quả cao nhất khi các chiều là bội của 128 byte**; lệch khỏi bội số đó thì lợi ích giảm.

---

### 🛠️ Hai cách lập trình

1. **WMMA API** (`nvcuda::wmma`) — thư viện C++ trong CUDA, cho phép viết kernel dùng tensor core trực tiếp.
2. **cuBLAS / CUTLASS** — gọi thư viện đã tối ưu.

Hai bài tiếp theo làm cả hai trên cùng kích thước ma trận và kiểu dữ liệu, để so thời gian chạy thực tế giữa core thường và tensor core.

> ⚠️ Cần kiểm chứng: transcript nói hiệu năng tensor core tốt nhất khi "các chiều là bội của 128 byte". Cách phát biểu này chưa rõ — tài liệu NVIDIA thường nói về bội số kích thước tile hoặc alignment tính theo phần tử/byte. Nên đối chiếu whitepaper trước khi dùng như một quy tắc cứng.
