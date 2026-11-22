---
title: 'Vector addition với kích thước không phải bội số của 32'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 36
status: edited
source: '036 - Vector addition with a size not power of 2 !!! important.md'
categories:
- Nvidia
tags: []
---

# ➗ Vector addition với kích thước không phải bội số của 32

> Nguồn: `036 - Vector addition with a size not power of 2 !!! important.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46267835)

Các bài trước đều dùng số phần tử là bội số của 32 (1024, 2048) nên mọi thứ chia đẹp. Nhưng dữ liệu thực tế hiếm khi tròn như vậy. Bài này xem điều gì xảy ra với **1000 phần tử** và cách chọn block/grid để không lãng phí thread.

### 🧵 Vì sao là bội số của 32

Đơn vị tối thiểu của một ứng dụng CUDA là **một warp**, mà warp có **32 thread**. Không thể dùng 16 thread; luôn phải là 32 hoặc bội số của 32. Do đó tổng số thread phải là bội số của 32, và vì tổng thread = block size × grid size, cả hai cấu hình đều bị ràng buộc theo.

Nếu vector chỉ có **16 phần tử**, vẫn phải dùng 32 thread: 16 thread làm việc, 16 thread ngồi không. **Thread utilization = 50 %**. Đây chính là lý do các bài trước chọn 1024 chứ không chọn 1000.

Lưu ý: với 16 phần tử, chi phí copy CPU↔GPU lớn hơn nhiều lợi ích, nên thực tế nên cộng trên CPU.

---

### 🔢 Bài toán 1000 phần tử

Giả sử vector có **1000 phần tử**. Block size không thể là 100 thread vì không phải bội số của 32. Hai lựa chọn gần nhất: **96 thread** (3 warp) hoặc **128 thread** (4 warp). Xét hai kịch bản:

**Kịch bản 1 — 10 block, mỗi block 100 phần tử.**

Không thể dùng 96 thread vì thiếu; phải dùng **128 thread** (4 warp). Mỗi block có 100 thread làm việc, **28 thread idle**. Thread utilization = 100 / 128 ≈ **78 %**.

**Kịch bản 2 — 8 block, mỗi block 128 phần tử.**

Bảy block đầu dùng đủ **128 thread** (4 warp), không lãng phí. Block cuối dùng 3 warp cộng **8 thread** của warp thứ tư, tức **24 thread idle** — nhưng chỉ ở một block, không phải mọi block. Thread utilization trung bình ≈ **97.7 %** (1000 thread hữu ích trên 1024 thread được cấp), gần như tối đa.

---

### 🌊 Ảnh hưởng tới số wave

Giả sử GPU chỉ có **8 SM** (ví dụ nhỏ để dễ hình dung):

* Kịch bản 2 có 8 block → mỗi SM nhận 1 block, chạy xong trong **một wave**.
* Kịch bản 1 có 10 block → wave đầu 8 block, wave sau 2 block. Tổng **hai wave**, thời gian gần gấp đôi.

Số block giảm không chỉ tiết kiệm thread mà còn giảm số wave, trong khi mỗi block vẫn giữ 4 warp.

---

### 🧮 Điều cần điều khiển

Toàn bộ khác biệt nằm ở ba con số, không đụng tới kernel:

1. **Số phần tử** (do dữ liệu quyết định).
2. **Block size** — phải là bội số của 32, càng gần số phần tử mỗi block càng tốt.
3. **Grid size** — tính để `grid × block` phủ đủ số phần tử.

Nếu mỗi thread xử lý nhiều phần tử, tổng thread giảm và số block giảm theo. Ví dụ 1024 phần tử mà mỗi thread làm 2 phần tử thì chỉ cần 512 thread, tức ít block hơn. Việc này có thể tăng occupancy và có thể cải thiện hoặc làm xấu hiệu năng — phải đo mới biết.

---

### ✅ Chốt lại

Khi số phần tử không phải bội số của 32, hãy chọn **block size là bội số của 32 gần nhất phía trên** và chia block sao cho phần dư chỉ rơi vào block cuối. Kịch bản 8 block × 128 thread đạt utilization 97.7 % so với 78 % của 10 block × 128 thread, lại còn ít wave hơn. Chỉ cần tinh chỉnh ba con số cấu hình là đủ, không phải sửa logic kernel.
