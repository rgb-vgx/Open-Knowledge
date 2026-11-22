---
title: 'Bài 092 — Hiểu hệ tọa độ trong OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 92
status: edited
source: '092 - Understanding Coordinate system in openCV.md'
categories:
- AI
tags: []
---

# 🧭 Hiểu hệ tọa độ trong OpenCV

> Nguồn: `092 - Understanding Coordinate system in openCV.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48422769)

Chào các bạn! Bài ngắn này nói về một khái niệm nền tảng mà nhiều bạn hay bỏ qua: **hệ tọa độ trong OpenCV**. Hiểu nó rồi thì crop, vẽ hình hay đặt chữ sẽ dễ hơn rất nhiều.

### ❓ Vì sao cần hiểu tọa độ?

Hầu hết thao tác trên ảnh đều cần **tọa độ**. Lấy vài ví dụ:

* **Crop** — muốn cắt một vùng, bạn phải chỉ ra vùng đó nằm ở đâu, tức cần tọa độ.
* **Vẽ hình** — muốn vẽ một hình chữ nhật, cần **hai cặp `(x, y)`**: góc này và góc đối diện.
* **Đặt chữ** — muốn ghi chữ "person" lên khung, cần điểm bắt đầu của dòng chữ; điểm kết thúc tính theo độ rộng của chuỗi.

Cả ba việc đều dựa trên cùng một câu hỏi: điểm đó có tọa độ bao nhiêu trong ảnh?

---

### 📐 OpenCV dùng hệ tọa độ kiểu Cartesian

OpenCV dùng **hệ tọa độ kiểu Cartesian**, nhưng có một điểm khác biệt quan trọng so với đồ thị toán học thông thường:

* Gốc `(0, 0)` nằm ở **góc trên-trái** của ảnh (không phải góc dưới-trái như đồ thị thường thấy).
* Trục **x** chạy **ngang**, tăng dần **từ trái sang phải**.
* Trục **y** chạy **dọc**, tăng dần **từ trên xuống dưới**.

Nghĩa là càng đi xuống thì **y càng lớn** — ngược với thói quen "lên cao là tăng" trong toán học.

---

### 🔢 Một ví dụ cụ thể

Giả sử ảnh có **width = 100** và **height = 200**:

* Góc trên-trái là `(0, 0)`.
* Góc trên-phải là `(100, 0)` — x tăng hết chiều rộng.
* Góc dưới-trái là `(0, 200)` — y tăng hết chiều cao.

Nếu mình muốn ghi chữ "hello" gần góc dưới-phải, có thể đặt tại `x = 90`, `y = 90` (với ảnh vuông 100×100) — chữ sẽ bắt đầu đúng từ điểm đó.

---

### ✂️ Liên hệ với crop và vẽ

Khi crop, bạn đưa cho OpenCV hai điểm: `(x1, y1)` là góc trên-trái vùng chọn và `(x2, y2)` là góc dưới-phải. Ảnh mới chính là phần nằm giữa hai tọa độ đó.

```python
# x1, y1 là góc trên-trái; x2, y2 là góc dưới-phải
crop = image[y1:y2, x1:x2]
```

Với slicing của NumPy, nhớ **y đứng trước, x đứng sau** — đúng theo thứ tự hàng/cột của mảng.

---

### ✅ Chốt bài

Chỉ cần nhớ ba điều:

1. Gốc `(0, 0)` ở **góc trên-trái**.
2. Trục **x** sang phải.
3. Trục **y** xuống dưới.

Vậy là đủ để làm chủ tọa độ trong OpenCV. Bài sau mình sẽ áp dụng nó vào vẽ đường và hình. Hẹn gặp lại!
