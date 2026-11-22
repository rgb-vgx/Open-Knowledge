---
title: 'Hello World CUDA: warp ID'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 21
status: edited
source: '021 - 002 Hello World program ( Warp_IDs).md'
categories:
- Nvidia
tags: []
---

# 🧵 Hello World CUDA: warp ID

> Nguồn: `021 - 002 Hello World program ( Warp_IDs).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/34013956)

Project 002 mở rộng project 001 để in thêm **warp ID** — tầng thứ ba trong hệ phần mềm CUDA. Khác với block và thread, CUDA **không có biến dựng sẵn** cho warp ID, nên phải tự tính từ `threadIdx.x`. Bài này cũng chỉ ra warp ID được tính **theo từng block**, không phải toàn GPU.

### 🧱 Nhắc lại phân cấp phần mềm

Một ứng dụng CUDA gồm các **grid**; mỗi grid gồm các **block**; mỗi block chứa các **warp**; mỗi **warp** gồm **32 thread**. Đây là bốn tầng của phần mềm CUDA.

Project 001 đã in được **thread ID** và **block ID**. Thread có ID theo ba chiều x, y, z, nhưng bài này chỉ dùng chiều x. Project 002 đi xuống tầng **warp**.

---

### ➗ Tính warp ID từ thread ID

Không có biến `warpIdx` dựng sẵn. Nhưng vì mỗi warp luôn có **32 thread**, có thể suy ra warp ID:

```cuda
int warpId = threadIdx.x / 32;
```

Ví dụ: block có **128 thread** → 128 / 32 = **4 warp**. Mỗi thread chia `threadIdx.x` cho 32 sẽ ra warp ID của nó.

Kết quả in ra: với 128 thread, warp ID chạy từ **0 đến 3**.

---

### 🔢 Kiểm chứng với các cấu hình khác

* Nếu vẫn để **1024 thread/block** mà in, sẽ thấy warp ID lên tới **31** — vì 1024 / 32 = 32 warp. Con số "quá nhiều" này là dấu hiệu cấu hình chưa được đổi về 128.
* Đổi về **128 thread/block**: block ID vẫn là **0** (chỉ một block), thread ID chạy **0–127**, warp ID chạy **0–3**. Ví dụ thread 31 nằm ở cuối warp 0.

---

### 🔁 Hai block, warp ID lặp lại

Đổi cấu hình thành **2 block × 64 thread/block**:

* Mỗi block có 64 / 32 = **2 warp**.
* Tổng thread toàn ứng dụng = 2 × 64 = **128**, tức **4 warp** trên toàn GPU.
* Kết quả in ra: block ID **0 và 1**; trong mỗi block có warp ID **0 và 1**.
* Vì vậy **warp ID 0 xuất hiện hai lần** — một lần cho block 0, một lần cho block 1.

Điều này khẳng định: **warp ID được tính theo block**, không phải theo toàn GPU. Muốn xác định duy nhất một warp trên toàn ứng dụng, phải ghép thêm block ID.

---

### ✅ Chốt lại

Bảng đối chiếu nhanh:

| Cấu hình | Warp mỗi block | Warp toàn ứng dụng | Ghi chú |
|---|---|---|---|
| 1 block × 128 thread | 4 | 4 | Warp ID 0–3 |
| 1 block × 1024 thread | 32 | 32 | Warp ID 0–31 |
| 2 block × 64 thread | 2 | 4 | Warp ID 0–1 lặp mỗi block |

Công thức cơ bản: `warpId = threadIdx.x / 32`. Số warp mỗi block = số thread mỗi block / 32. Warp ID lặp lại giữa các block. Giảng viên để lại một bài tập: tìm cách tính warp ID bằng phép **chia lấy dư (remainder)** — các bạn tự thử để hiểu sâu hơn.
