---
title: 'Bài 080 — Padding trong CNN'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 80
status: edited
source: '080 - Padding In CNN.md'
categories:
- AI
tags: []
---

# 🧷 Padding: giữ nguyên kích thước ảnh sau convolution

> Nguồn: `080 - Padding In CNN.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979389)

Chào các bạn! Convolution làm **output nhỏ hơn input** (`6×6` qua filter `3×3` còn `4×4`) nên **mất thông tin** ở viền. **Padding** — thêm một lớp "đệm" quanh ảnh — giữ nguyên kích thước và chặn mất mát đó.

### 📉 Vấn đề: mất thông tin ở viền

Với công thức `output = n - f + 1`:

```text
6 - 3 + 1 = 4   →  ảnh 6×6 thành 4×4
```

Ảnh gốc `6×6` nhưng output chỉ `4×4` → mất một phần. Ta muốn input `6×6` cho ra output `6×6` để không mất dữ liệu.

### 🧩 Cách làm: thêm một lớp đệm

Thêm **một lớp cushion** quanh ảnh: `6×6` → `8×8`. Khi đó `8 - 3 + 1 = 6` → output trở lại `6×6`.

### 📐 Công thức tính padding cần dùng

```text
output = (n - f + 2p) / s + 1
```

với stride `s = 1`. Muốn output = `6`:

```text
6 = (6 - 3 + 2p) / 1 + 1
6 = 3 + 2p + 1  →  2p = 2  →  p = 1
```

Vậy **padding = 1** (một lớp quanh ảnh) là đủ để `6×6` giữ nguyên `6×6`.

### 🎨 Giá trị điền vào phần đệm

Có hai cách:

* **Zero padding** — điền toàn **0** vào viền. Phổ biến nhất.
* **Neighbor padding** — lấy giá trị **hàng xóm** gần đó gán vào (ví dụ các ô `1` thì điền `1`).

### ✅ Lợi ích

Padding giúp **không mất thông tin** từ ảnh — input `6×6` cho output `6×6`, rồi có thể tiếp tục convolution cho các lớp sau mà kích thước ổn định.

---

### 📌 Ghi nhớ

```text
output = (n + 2p - f) / s + 1
p = 1  →  giữ nguyên kích thước khi f = 3, s = 1
```

**Bài tập:** ảnh `7×7`, filter `3×3`, muốn output `7×7` thì cần padding bao nhiêu? Các bạn thử áp công thức trên.

Bài sau ta xem chi tiết **CNN khác ANN ở phép toán nào** — vì sao sau convolution lại dùng **ReLU**. Hẹn gặp lại!
