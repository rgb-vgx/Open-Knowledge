---
title: 'Vẽ đường thẳng trên ảnh bằng cv2.line'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 048
status: edited
source: '048 - Basic Drawing Operations -1.md'
categories:
- AI
tags: []
---

# ✏️ Vẽ đường thẳng trên ảnh với OpenCV

> Nguồn: `048 - Basic Drawing Operations -1.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39650530)

Chào các bạn, mở đầu chuỗi bài vẽ hình cơ bản, hôm nay mình sẽ vẽ một đường thẳng lên ảnh bằng OpenCV. Thao tác này sẽ rất hữu ích khi cần đánh dấu làn đường hay vẽ đè lên kết quả xử lý.

### 🐍 Chuẩn bị file Python

1. Mở editor, vào project folder cũ.
2. Tạo file Python mới, đặt tên ví dụ **drawing_functions.py**.
3. Import **cv2** và đọc ảnh vào biến ma trận **img**:

```python
import cv2

img = cv2.imread("image.jpg")
```

---

### 🔧 Hàm `cv2.line` và năm tham số

Hàm **line** nhận **năm tham số** theo thứ tự:

1. **Ma trận output** để vẽ lên — ở đây là **img**.
2. **Điểm bắt đầu** của đường thẳng, dạng tuple `(x1, y1)`.
3. **Điểm kết thúc**, dạng tuple `(x2, y2)`.
4. **Màu** của đường, dạng tuple. Màu đỏ là **`(0, 0, 255)`**.
5. **Độ dày** (thickness) của đường, tính bằng pixel.

Ví dụ mình vẽ từ điểm `(100, 50)` đến `(250, 300)`, màu đỏ, dày 5 pixel:

```python
cv2.line(img, (100, 50), (250, 300), (0, 0, 255), 5)
```

---

### 👁️ Hiển thị kết quả

Sau khi vẽ, mình hiển thị ảnh bằng **`cv2.imshow`** với cửa sổ `"b line"`, rồi giữ lại bằng **`cv2.waitKey(0)`**:

```python
cv2.imshow("b line", img)
cv2.waitKey(0)
```

Chạy code, các bạn sẽ thấy đường thẳng đỏ vẽ đè lên ảnh.

---

### 🔍 Thử thay đổi tham số

Để thấy rõ tác dụng của từng tham số, mình thử hai lần chỉnh:

* Đổi **thickness** từ `5` thành **`10`** — chạy lại, đường thẳng đậm và rộng hơn.
* Đổi **điểm bắt đầu** thành **`(250, 150)`** — chạy lại, điểm xuất phát của đường dịch sang vị trí mới đúng như mong muốn.

---

Vậy là mình đã vẽ được đường thẳng bằng `cv2.line` và nắm được năm tham số của nó. Bài sau mình sẽ tiếp tục với các phép vẽ hình cơ bản khác.
