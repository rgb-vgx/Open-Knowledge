---
title: 'Quiz 1: ôn tập số block chạy đồng thời trên mỗi SM'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 29
status: edited
source: '029 - Quiz 1- how many blocks can we run concurrently per SM.md'
categories:
- Nvidia
tags: []
---

# ❓ Quiz 1: ôn tập số block chạy đồng thời trên mỗi SM

> Nguồn: `029 - Quiz 1- how many blocks can we run concurrently per SM.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/6295172)

Bài quiz này củng cố khái niệm **allocated active blocks per SM** — số block thực sự chạy đồng thời trên một SM. Nội dung ôn lại bảng giới hạn Ampere, cách warp/register/shared memory ép số block, và cách đối chiếu với Nsight Compute trên RTX 3090.

### 🧮 Câu hỏi 1: Bao nhiêu block tối đa mỗi SM?

Theo bảng whitepaper A100 (kiến trúc Ampere), giới hạn cứng là **32 block/SM** và **64 warp/SM**. Điểm cần nhớ: **warp limit điều khiển số block được cấp phát**.

Nếu ứng dụng gán 32 block/SM, mỗi block **4 warp** → 128 warp, vượt 64. Trình biên dịch giảm còn **16 block** để 16 × 4 = 64 warp. Chỉ số này xuất hiện trong Nsight Compute là **Block Limit Warps**.

Cần phân biệt: có thể gán hơn 1000 block/SM, nhưng chỉ 32 hoặc ít hơn **chạy đồng thời**.

---

### 💾 Câu hỏi 2: Register limit tính thế nào?

A100 có hơn **65 000 register/SM**. Ví dụ block **512 thread**, mỗi thread **16 register**:

1. 512 × 16 = **8192 register/block**.
2. 65 536 / 8192 = **8 block**.

Dù bảng ghi 32 block/SM, SM chỉ chạy **8 block** đồng thời.

Trường hợp xấu: 1 block/SM, 1024 thread, mỗi thread **100 register** → hơn 100 000 register, vượt giới hạn. Không giảm được số block nên phải giảm thread/block; nếu không sẽ xảy ra **register spilling** ra local memory, làm giảm hiệu năng.

---

### 🔻 Câu hỏi 3: Vì sao lấy giá trị nhỏ nhất?

Giả sử bốn ràng buộc cho ra:

* Block limit tổng: **32**
* Warp limit: **4 block**
* Register limit: **8 block**
* Shared memory limit: **16 block**

SM chọn **min = 4 block**. Đây là lý do khi tính theoretical occupancy ta lấy giá trị nhỏ nhất trong bốn con số thay vì con số 32 danh nghĩa.

---

### 🔬 Câu hỏi 4: Trên RTX 3090, profile ra bao nhiêu?

Mở section **Occupancy** của Nsight Compute với vector addition:

* Block Limit Warps: **16**
* Block Limit Shared Memory: **16**
* Block Limit Registers: **42**
* Giá trị nhỏ nhất: **16** → allocated active blocks/SM = 16.

Không phải 32 vì GPU ở đây là **RTX 3090**, không phải A100. Với block size **96 thread** (3 warp), 16 block × 3 = **48 warp**, đúng giới hạn 48 warp/SM của RTX 3090, nên theoretical occupancy đạt **100 %**.

---

### ✅ Chốt lại

Bốn câu hỏi dẫn tới cùng một kết luận: số block chạy đồng thời trên SM là **giá trị nhỏ nhất** của block limit, warp limit, register limit và shared memory limit. Nắm chắc điều này thì các bài profiling sau chỉ còn là đọc đúng con số trong Nsight Compute.
