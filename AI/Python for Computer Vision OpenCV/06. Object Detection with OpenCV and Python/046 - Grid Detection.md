---
title: 'Grid Detection: tìm bàn cờ và lưới điểm tròn'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 46
status: edited
source: '046 - Grid Detection.md'
categories:
- AI
tags: []
---

# 🔲 Grid Detection: tìm bàn cờ và lưới điểm tròn

> Nguồn: `046 - Grid Detection.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257844)

Camera thường gây méo ảnh (radial distortion, tangential distortion). Cách phổ biến để bù lại là gắn một **hoa văn dễ nhận dạng** lên vật cần theo dõi — thường là lưới bàn cờ — rồi để thuật toán bám theo nó. Bài này mình dùng hai hàm có sẵn của OpenCV để tìm loại lưới đó.

### 🎯 Vì sao cần lưới?

Khi track một vật (ví dụ xe), người ta dán lưới lên vật để giữ được **góc xoay** của nó trong suốt quá trình di chuyển. Hình minh họa trong bài là một khối lập phương ảo gắn lên lưới thật: lưới di chuyển thì khối lập phương bám theo. Lưới cũng dùng để **calibrate camera**.

Lưu ý quan trọng: hai hàm dưới đây chỉ tìm lưới **đúng chuẩn bàn cờ**, không phải thứ "trông hao hao" bàn cờ. Hoa văn phải được in/gắn có chủ đích.

---

### ♟️ findChessboardCorners

```python
import cv2

flat_chess = cv2.imread('data/flat_chessboard.png')

found, corners = cv2.findChessboardCorners(flat_chess, (7, 7))
```

Hàm nhận ảnh và **kích thước lưới**. Ảnh bàn cờ phẳng là lưới 8x8, nhưng các ô ngoài cùng nằm sát mép nên thiếu cạnh — không tính là góc trong. Vì vậy kích thước truyền vào là **(7, 7)**, không phải 8x8.

Hàm trả về hai giá trị:

* **`found`** — Boolean, cho biết có tìm được lưới hay không.
* **`corners`** — danh sách toạ độ các góc tìm được.

`found` rất hữu ích để rẽ nhánh, vì ảnh mờ hoặc lệch có thể khiến hàm thất bại:

```python
if found:
    print('We found corners!')
else:
    print('We did not find corners')
```

---

### 🌈 drawChessboardCorners

Để vẽ kết quả, dùng `cv2.drawChessboardCorners()`, nhận trực tiếp output của hàm trên:

```python
cv2.drawChessboardCorners(flat_chess, (7, 7), corners, found)
```

Nó đánh dấu từng góc và tô **mỗi hàng một màu** theo dải màu cầu vồng, rồi nối các góc bằng đường ziczac. Nếu không muốn làm hỏng ảnh gốc, hãy truyền vào một bản copy.

---

### ⚫ findCirclesGrid

Hoa văn phổ biến thứ hai là lưới các điểm tròn. Ảnh mẫu là lưới **10x10** điểm:

```python
dots = cv2.imread('data/dots_grid.png')  # tên file trong transcript không nêu rõ

found, corners = cv2.findCirclesGrid(dots, (10, 10),
                                     cv2.CALIB_CB_SYMMETRIC_GRID)
```

Tham số cuối là **cách tìm**: `CALIB_CB_SYMMETRIC_GRID` là giá trị mặc định cho lưới đối xứng. Với ảnh mẫu, `found` trả về `True`.

Điểm hay: `corners` của lưới tròn có **cùng định dạng** với lưới bàn cờ, nên vẫn dùng được `cv2.drawChessboardCorners()` để vẽ:

```python
cv2.drawChessboardCorners(dots, (10, 10), corners, found)
```

---

### ✅ Tóm lại

Hai hàm cần nhớ là **`cv2.findChessboardCorners()`** và **`cv2.findCirclesGrid()`**, kết quả vẽ bằng **`cv2.drawChessboardCorners()`**. Điều kiện tiên quyết là ảnh phải sạch và đúng chuẩn lưới — với ảnh thật ngoài đời, luôn kiểm tra `found` trước khi vẽ. Đây là phần mở rộng trực tiếp của corner và edge detection; bài sau ta sang contour detection.
