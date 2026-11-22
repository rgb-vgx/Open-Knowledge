---
title: 'Cửa sổ hiển thị ảnh của OpenCV và cách chạy như script'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 13
status: edited
source: '013 - Opening Image files with OpenCV.md'
categories:
- AI
tags: []
---

# 🪟 Hiển thị ảnh bằng cửa sổ OpenCV và chạy như script

> Nguồn: `013 - Opening Image files with OpenCV.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257622)

Với các bài phân tích video và ảnh phức tạp về sau, ta cần hiển thị ảnh **bên ngoài Jupyter**. Bài này giới thiệu `cv2.imshow`, những lỗi kernel có thể gặp trên macOS/Linux, và cách chạy cùng đoạn code dưới dạng một file `.py`.

### 🖥️ cv2.imshow — imshow của riêng OpenCV

```python
import cv2

image = cv2.imread('DATA/puppy.jpg')

cv2.imshow('Puppy', image)
cv2.waitKey()
```

`cv2.imshow` nhận hai tham số: **tên cửa sổ** (không được có dấu cách) và **ảnh** muốn hiển thị. Lệnh này mở một cửa sổ riêng, không nằm trong notebook.

* Cửa sổ OpenCV **không resize được**, ảnh hiển thị đúng kích thước gốc. Với ảnh lớn, trên laptop màn hình nhỏ nó có thể chiếm gần hết màn hình.
* `cv2.waitKey()` là tín hiệu để chương trình chờ và cho phép bấm nút đóng cửa sổ.

Trong notebook, mọi thứ phải nằm **cùng một cell**. Sau khi chạy, cell hiện dấu `*` nghĩa là đang chạy; nhìn xuống taskbar sẽ thấy thêm một cửa sổ mang icon JupyterLab. Đóng cửa sổ xong, cell trả về `-1` là mọi thứ ổn.

---

### ⚠️ Kernel chết khi đóng cửa sổ trên macOS/Linux

Vì Jupyter chạy trong browser, đôi khi nó can thiệp vào việc đóng cửa sổ. Triệu chứng thường gặp trên macOS và Linux (ít gặp hơn trên Windows):

* Bấm đóng nhưng cửa sổ không tắt, mọi thứ chậm dần.
* Hiện thông báo "Puppy isn't responding" rồi kernel chết.

Cách xử lý:

1. Force Quit cửa sổ đó (chuột phải ở taskbar rồi chọn Force Quit).
2. Vào menu **Kernel → Restart** để khởi động lại kernel.
3. Chạy thử một lệnh như `print(1)` để chắc chắn kernel đã sống lại.

Nếu không restart kernel thì code sẽ không chạy được nữa. Nếu lỗi này xuất hiện thường xuyên, hãy chuyển hẳn sang chạy bằng script.

---

### 📜 Chuyển sang file .py

Trước khi làm phần này, các bạn nên đã biết chạy Python script ở command line — đó là kiến thức Python cơ bản.

1. Copy toàn bộ code trong cell.
2. Tạo một text file mới trong JupyterLab và đổi tên thành `mypuppy.py`.
3. Dán code vào và chỉnh lại phần hiển thị.

Đặt tên file **duy nhất**, đừng đặt là `opencv.py` hay `numpy.py` vì có thể gây lỗi.

---

### ⌨️ Vòng lặp chờ phím Escape

```python
import cv2

image = cv2.imread('DATA/puppy.jpg')

while True:
    cv2.imshow('Puppy', image)
    if cv2.waitKey(1) & 0xFF == 27:
        break

cv2.destroyAllWindows()
```

Đặt `imshow` trong `while True` sẽ hiển thị ảnh liên tục, nên cần một điều kiện để thoát. Dòng điều kiện trông lạ nhưng thực chất gồm hai phần:

* `cv2.waitKey(1)`: chờ ít nhất **1 millisecond** rồi trả về tín hiệu bàn phím.
* `& 0xFF == 27`: kiểm tra xem phím vừa bấm có phải **Escape** hay không (27 là mã của phím Escape).

`0xFF` là hằng hexadecimal toàn số 1 trong binary, dùng cho phép so sánh bitwise. Ta sẽ gặp lại mẫu code này rất nhiều khi làm việc với OpenCV; chưa cần hiểu từng chi tiết, chỉ cần nhớ nó nghĩa là "chờ một chút và kiểm tra phím Escape". Sau này có thể thay bằng phím `q` hoặc phím khác tùy nhu cầu.

Cuối vòng lặp, `cv2.destroyAllWindows()` đóng toàn bộ cửa sổ. Chú ý chữ **A** và **W** viết hoa.

Chạy script bằng terminal:

```bash
python mypuppy.py
```

Cửa sổ ảnh hiện lên, bấm Escape là đóng.

---

### 💡 Workflow notebook → script

Khi làm việc với `cv2.imshow` — đặc biệt là video — mình thường viết toàn bộ code trong **một cell notebook** trước, tận dụng các tiện ích như `Shift + Tab` để xem signature hàm, rồi copy sang file `.py`. Đó cũng là lý do khóa học dùng JupyterLab: có sẵn notebook, script và terminal trong cùng một chỗ.

Bài sau ta bắt đầu vẽ các hình cơ bản lên ảnh.
