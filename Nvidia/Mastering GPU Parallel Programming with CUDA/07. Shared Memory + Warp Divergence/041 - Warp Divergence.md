---
title: 'Warp divergence: khi 32 thread trong warp rẽ nhánh'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 41
status: edited
source: '041 - Warp Divergence.md'
categories:
- Nvidia
tags: []
---

# 🔀 Warp divergence: cái giá của rẽ nhánh trên GPU

> Nguồn: `041 - Warp Divergence.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46320995)

**Warp divergence** là một trong những chủ đề quan trọng nhất khi tối ưu CUDA. Bài này giải thích vì sao một câu `if/else` tưởng như vô hại lại làm giảm hiệu năng, và ba mức độ divergence mà các bạn sẽ gặp.

### 🧵 Ôn lại warp và mô hình SIMT

* Thread được tổ chức thành **block**, block lại chia thành **warp**.
* Một **warp gồm 32 thread**, và cả warp thực thi **một instruction** trong cùng một nhịp — mô hình **SIMT (Single Instruction, Multiple Threads)**.
* Ví dụ vector addition: chỉ có **một** instruction cộng, nhưng 32 thread cùng chạy nó trên các phần tử khác nhau của `A` và `B`, dùng thread ID (`blockIdx`, `threadIdx`) để chọn phần tử.
* Mỗi warp do **một warp scheduler** điều khiển. Trong một SM có nhiều partition, mỗi partition chạy được một warp cùng lúc, bên cạnh L1 data cache, shared memory, texture memory…

Kịch bản lý tưởng: **phát 32 thread mỗi clock**, tất cả cùng một instruction, cùng một nhịp. Đó vẫn là *một* instruction nhân cho 32 thread, không phải 32 instruction khác nhau.

### ⚠️ Khi nào divergence xuất hiện

Divergence đến từ **`if/else`** khi các thread trong cùng warp đi hai nhánh khác nhau. Không phải câu `if` nào cũng gây hại — phải phân biệt hai loại điều kiện:

* **Điều kiện biên** (`if (idx < N)`): chỉ đúng với thread cuối, hoặc một nhóm rất nhỏ ở rìa vector. Ví dụ vector 1000 phần tử cần 1024 thread (bội của 32), nên 24 thread dư phải bị chặn lại. Loại này **không** gây warp divergence đáng kể.
* **Điều kiện chia nhánh thật** (`if (i < 16)`): đúng với khoảng một nửa warp, có thể xảy ra ở **2–3 warp** chứ không riêng thread cuối. Đây mới là warp divergence — không phải block divergence, cũng không phải thread divergence.

### 🔬 GPU xử lý divergence thế nào

Khi warp rẽ nhánh, GPU **serialize** các nhánh: chạy nhánh A cho nhóm thread thuộc A, trong lúc đó nhóm còn lại bị **mask** (stall, idle); xong mới chạy nhánh B, rồi các nhánh hợp lại ở sau `if`. Tức là hai đường đi tốn hai lượt thay vì một — chi phí tăng gấp đôi trong trường hợp đơn giản nhất.

### 📊 Ba mức độ divergence

**1. Không divergence (SIMT thuần)** — cả 32 thread đi cùng một đường, không rẽ nhánh. Mọi thread đều active, chỉ tốn 1–2 cycle. Đây là kịch bản lý tưởng.

**2. Divergence vừa (moderate)** — đúng **một mức** rẽ nhánh, thường là 16 thread đi nhánh A, 16 thread đi nhánh B. Nhóm này chạy thì nhóm kia idle, sau đó đổi vai. Hai bước thay vì một, hiệu suất warp giảm còn một nửa.

**3. Divergence nặng (severe)** — nhiều câu `if` lồng nhau hoặc chia theo kiểu chẵn/lẻ, mỗi nhóm bốn thread một nhánh. Thread liên tục chuyển giữa active và idle. Đây là trường hợp tệ nhất: phần lớn thread idle ở mỗi cycle, hiệu năng mất đi rõ rệt.

### 📉 Hệ quả lên hiệu năng

* **Chỉ một nhánh chạy tại một thời điểm**: các thread còn lại idle, chờ nhánh kia xong.
* **Serialize nhiều đường đi**: throughput của warp giảm vì lúc nào cũng chỉ một phần warp làm việc có ích.
* **Lãng phí tài nguyên**: thread inactive vẫn chiếm slot trong warp.
* **Tăng thời gian chạy**: control flow bị chia thành nhiều bước, GPU phải chuyển qua lại giữa các đường, kéo dài thời gian hoàn tất kernel.
* **Giảm instruction throughput**: số thread active mỗi cycle ít đi.

Cơ chế **masking** — tắt tạm các thread không thuộc nhánh đang chạy — chính là thứ khiến divergence tốn kém: phần cứng vẫn phải "chạy" cả warp, chỉ có điều một nửa lane không sinh kết quả.

### 🎯 Vì sao chưa tối ưu ngay ở vector addition

Giảng viên chủ động không làm ví dụ tối ưu trên vector addition: ứng dụng này quá đơn giản, giảm divergence cũng không tăng hiệu năng đáng kể. **Vector reduction** mới là nơi divergence ảnh hưởng rõ rệt và việc xử lý nó mang lại cải thiện thực sự — sẽ làm ở các bài trong section Vector Reduction.

Nắm được divergence rồi, bài tiếp theo chuyển sang công cụ: gỡ lỗi CUDA bằng Visual Studio.
