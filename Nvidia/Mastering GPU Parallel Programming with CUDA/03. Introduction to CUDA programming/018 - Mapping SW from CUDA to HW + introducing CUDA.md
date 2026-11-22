---
title: 'Ánh xạ phần mềm CUDA xuống phần cứng GPU'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 18
status: edited
source: '018 - Mapping SW from CUDA to HW + introducing CUDA.md'
categories:
- Nvidia
tags: []
---

# 🔗 Ánh xạ phần mềm CUDA xuống phần cứng GPU

> Nguồn: `018 - Mapping SW from CUDA to HW + introducing CUDA.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/34013876)

Phần cứng GPU có bốn tầng, và phần mềm CUDA cũng có bốn tầng tương ứng. Hiểu ánh xạ này là điều kiện để cấu hình block/thread hợp lý. Bài này giới thiệu CUDA, phân biệt host/device, rồi đi từ GPU → SM → partition → core và từ kernel → block → warp → thread.

### 🧩 CUDA và ba điểm cần nhớ

**CUDA (Compute Unified Device Architecture)** là nền tảng tính toán song song và API do Nvidia tạo ra, cho phép dùng GPU Nvidia cho xử lý tổng quát — gọi là **GPGPU**.

Ba điểm mở đầu:

1. **Dựa trên C**: lập trình viên quen C có thể viết phần mềm chạy trên GPU Nvidia.
2. **Compiler nvcc**: trái tim của toolkit. Nó không chỉ dịch code CUDA thành file thực thi/mã máy mà còn đảm nhiệm nhiều vai trò tối ưu; các lệnh nvcc sẽ được khám phá dần trong khóa.
3. **Host và device**: **host** = CPU cùng global memory/RAM; **device** = GPU cùng global memory của nó. Phân biệt này ảnh hưởng tới cấu trúc code, truyền dữ liệu và quản lý memory.

---

### 🏗️ Bốn tầng phần cứng

1. **GPU**: bao trùm toàn bộ đơn vị bên trong.
2. **SM (Streaming Multiprocessor)**: GPU chứa nhiều SM.
3. **Partition**: mỗi SM chia thành nhiều partition. Ở Volta và Ampere là **bốn partition** mỗi SM — thấy rõ trong whitepaper Volta và Ampere.
4. **Core tính toán**: trong mỗi partition, ví dụ **core FP32** thực thi phép floating point. Đây là đơn vị tính toán cơ bản nhất.

---

### 🧱 Bốn tầng phần mềm tương ứng

Một ứng dụng CUDA chạy trên toàn GPU. Bước đầu tiên khi viết code là **chia ứng dụng thành các block** (block hay **thread block** đều đúng).

* **Toàn ứng dụng** ↔ **toàn GPU**.
* **Block** ↔ **SM**.
* **Warp** ↔ **partition**.
* **Thread** ↔ **core**.

Câu hỏi đặt ra: ai gán các block (task) cho các SM (worker)? Đó là **GigaThread Engine** — một trong những đơn vị quan trọng nhất của GPU. Trong whitepaper Volta, GigaThread nằm trong cấu trúc toàn GPU, nối tới **tất cả SM**, chịu trách nhiệm cấp block/task cho chúng.

---

### 🧵 Warp: chia block cho bốn partition

Một block được gán cho một SM, nhưng SM có bốn partition — làm sao dùng hết? Nếu dồn cả block vào một partition, ba partition còn lại sẽ **nhàn rỗi**, lãng phí tài nguyên.

Giải pháp là tầng thứ ba: **warp**.

* Chia block thành các warp; mỗi warp gán cho một partition. Ví dụ block **4 warp** → mỗi partition một warp.
* Nếu block có **32 warp** và SM có 4 partition → mỗi partition chạy **8 warp**.
* Khi một partition có nhiều warp, cần "người quản lý": **warp scheduler** trong mỗi partition, mỗi cycle chọn một warp để phát instruction.

Tầng thứ tư: mỗi partition có nhiều core; mỗi **warp mặc định gồm 32 thread**, mỗi thread chạy trên một core riêng trong partition — nhờ vậy mọi core đều được huy động.

---

### ✅ Chốt lại

Khi khởi tạo ứng dụng CUDA, cần chỉ định **hai tham số**: số **block** và số **thread trong mỗi block**. Số warp trong một block = **số thread mỗi block / 32**, vì warp cố định 32 thread. Bài sau mình sẽ viết chương trình đầu tiên để thấy các con số này in ra màn hình.
