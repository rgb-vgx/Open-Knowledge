---
title: 'Bài 078 — Ảnh RGB và ảnh grayscale'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 78
status: edited
source: '078 - All you need to know about Images.md'
categories:
- AI
tags: []
---

# 🖼️ Ảnh grayscale và RGB: hiểu trước khi làm CNN

> Nguồn: `078 - All you need to know about Images.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979369)

Chào các bạn! Trước khi mổ xẻ CNN, cần nắm **ảnh được biểu diễn thế nào**. Bài này mình đi qua hai loại: **ảnh grayscale** (1 channel) và **ảnh RGB** (3 channel) — cùng cách đọc **kích thước ảnh** theo pixel.

### 🎨 Ảnh màu = 3 channel R, G, B

Mọi ảnh màu — kể cả khuôn mặt bạn thấy trên màn hình — được **tách thành ba channel: red, green, blue**. Khi **ba màu này kết hợp**, ta được mọi ảnh màu. Màu cuối cùng phụ thuộc **giá trị tại từng pixel** ở mỗi channel.

Ví dụ với ảnh núi và túp lều hay một con vẹt: tách ra ta được ba ảnh riêng cho **red channel**, **green channel**, **blue channel**.

### 📐 Pixel và kích thước ảnh

Ảnh được chia thành **pixel**. Nếu ảnh có 6 pixel theo chiều ngang và 6 theo chiều dọc, gọi là ảnh **6×6**.

Mỗi pixel có giá trị **0 đến 255**. Quy ước: **0** là **đen**, **255** là **trắng**.

Cách ghi kích thước:

```text
Ảnh grayscale 6×6, 1 channel  →  6 × 6 × 1
Ảnh màu      4×4, 3 channel  →  4 × 4 × 3
```

* Hai số đầu = số pixel (cao × rộng).
* Số cuối = **số channel**.

### ⬛ Ảnh grayscale

Ảnh **grayscale** (trắng đen) chỉ có **một channel**, mỗi pixel vẫn `0..255`. Vì không có ba channel RGB nên ghi **`6 × 6 × 1`**. Nhiều ảnh cũ, phim đen trắng cũng thuộc dạng này.

### 🌈 Ảnh RGB

Ảnh màu có **ba channel**. Mỗi channel là một ma trận pixel `0..255` riêng (R, G, B). Ghép ba ma trận lại thành ảnh màu, và ghi kích thước **`4 × 4 × 3`** cho ảnh 4×4.

```text
R channel  +  G channel  +  B channel   →  ảnh màu
 (0..255)      (0..255)       (0..255)
```

---

### 📌 Cần nhớ

| Loại ảnh | Số channel | Ký hiệu (ví dụ) |
|---|---|---|
| **Grayscale** | 1 | `6 × 6 × 1` |
| **RGB** | 3 | `4 × 4 × 3` |

Bài sau ta sẽ bắt đầu với **grayscale** để hiểu phép **convolution** hoạt động thế nào, rồi mở rộng sang **RGB**. Hẹn gặp lại!
