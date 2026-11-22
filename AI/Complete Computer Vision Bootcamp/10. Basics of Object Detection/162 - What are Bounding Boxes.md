---
title: 'Bài 162 — Bounding Box và hai cách biểu diễn'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 162
status: edited
source: '162 - What are Bounding Boxes.md'
categories:
- AI
tags: []
---
# 📦 Bounding Box: Corner Format và Center Format

> Nguồn: `162 - What are Bounding Boxes.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49111983)

Chào các bạn! Ở bài trước mình đã điểm qua bounding box; lần này ta đi sâu vào cách biểu diễn nó. Có hai định dạng chính — **corner format** và **center format** — và hiểu cả hai sẽ giúp các bạn đọc được output của mọi model detection.

### 🟥 Bounding box là gì?

**Bounding box** là một vùng hình chữ nhật bao quanh object mà model detection phát hiện. Trong ảnh minh hoạ có ba box — một đỏ, hai vàng — lần lượt cho *dog*, *car* và *bicycle*.

Box giúp **định vị** và **nhận diện** object trong ảnh nhờ cung cấp **toạ độ không gian**. Muốn vẽ được hình chữ nhật, tối thiểu các bạn cần bốn con số. Không có chúng thì không thể dựng box.

### 📐 Corner Format — bốn góc

Định dạng này dùng bốn toạ độ:

* `x_min`, `y_min` — góc trên bên trái (top-left),
* `x_max`, `y_max` — góc dưới bên phải (bottom-right).

Ví dụ mình lấy bộ số `50, 30, 200, 180`:

* top-left = `(50, 30)`,
* bottom-right = `(200, 180)`.

Ghép cặp `(x, y)` này lại là vẽ được hình chữ nhật, và bên trong nó là object cần tìm. Rất trực quan.

### 🎯 Center Format — tâm cộng kích thước

Định dạng thứ hai khác đi một chút. Thay vì hai góc, nó dùng:

* `x_center`, `y_center` — toạ độ điểm giữa của box,
* `width` — chiều rộng box,
* `height` — chiều cao box.

Ví dụ với bộ số `125, 105, 150, 150`:

* tâm box = `(125, 105)`,
* `width = 150`, `height = 150`.

Từ tâm và kích thước, các bạn cũng dựng lại được hình chữ nhật y hệt. Đây chính là kiểu biểu diễn mà định dạng YOLO dùng (dù YOLO còn chuẩn hoá các giá trị về khoảng 0–1).

### ⚖️ Định dạng nào đang được dùng?

Tuỳ thuật toán mà người ta chọn định dạng này hay định dạng kia.

* **Corner format** từng được dùng rất nhiều trong quá khứ.
* **Center format** là lựa chọn phổ biến của các thuật toán hiện nay (tính đến 2025).

Dù chọn cách nào, điểm chung vẫn là: luôn cần **ít nhất bốn thông tin**. Corner format là `x_min, y_min, x_max, y_max`; center format là `x_center, y_center, width, height`.

---
### ✅ Chốt lại

Bounding box chỉ là một hình chữ nhật, nhưng cách mô tả nó quyết định cách model học và cách ta đọc kết quả. Nắm chắc hai định dạng này, các bạn sẽ thấy mọi con số trong file annotation hay output của YOLO đều có nghĩa. Hẹn gặp ở bài tiếp theo!
