---
title: 'Bài 086 — Đọc, hiển thị và ghi ảnh với OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 86
status: edited
source: '086 - Reading and Writing Images.md'
categories:
- AI
tags: []
---

# 📷 Đọc, hiển thị và ghi ảnh với OpenCV

> Nguồn: `086 - Reading and Writing Images.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48420821)

Chào các bạn! Đây là bài thực hành đầu tiên với **OpenCV**: đọc ảnh, hiển thị để kiểm tra, rồi ghi lại ảnh sau xử lý. Dù sau này ta làm detection, tracking hay filter, chương trình nào cũng phải bắt đầu từ ba bước này. Mình sẽ dựng môi trường bằng **VSCode** + **conda** rồi chạy từng cell trong notebook.

### ⚙️ Chuẩn bị môi trường

Mình dùng **VSCode** để tạo notebook Python (đuôi `.ipynb`) và **conda** (Anaconda) để tạo môi trường. Bốn bước tổng quát:

1. Tạo môi trường Python bằng `conda`.
2. Cài đặt **OpenCV** bản Python.
3. Đọc và hiển thị ảnh để kiểm tra.
4. Sau khi xử lý, ghi ảnh ra đĩa.

Đầu tiên mở terminal trong VSCode bằng `Ctrl + ~` (hoặc menu **View → Terminal**) rồi gõ `conda` để kiểm tra conda đã cài chưa — nếu thấy log và danh sách lệnh là ổn. Mình tạo môi trường tên `myenv` với Python **3.11** (mình thấy đây là bản ổn định nhất hiện tại):

```bash
conda create -n myenv python=3.11
```

Khi được hỏi `Proceed ([y]/n)?`, gõ `y`. Tạo xong thì kích hoạt môi trường:

```bash
conda activate myenv
```

Nếu dấu nhắc chuyển sang `(myenv)` nghĩa là môi trường đã hoạt động. Tiếp theo cài extension **Jupyter** của Microsoft trong VSCode để mở được notebook, rồi tạo file `reading_and_writing.ipynb` (`.ipynb` là viết tắt của **interactive Python notebook**). Bấm **Select Kernel**, chọn **Python Environments** rồi chọn kernel `myenv`.

---

### 🧪 Cài OpenCV và ipykernel

Trong notebook, cài trực tiếp bằng dấu `!`:

```python
!pip install opencv-python
!pip install ipykernel
```

`ipykernel` giúp chạy các cell với kernel đã chọn. Nếu VSCode đã cài sẵn, pip sẽ báo `Requirement already satisfied`. Chạy xong, mình xoá log cho notebook gọn rồi bắt tay vào code.

---

### 🖼️ Đọc ảnh và kiểm tra

Trước hết import thư viện:

```python
import cv2
```

Đọc ảnh bằng `cv2.imread`, truyền đường dẫn tới file (`mountain.jpg`). Hàm này trả về một **NumPy array** — tức ảnh được biểu diễn thành lưới điểm ảnh:

```python
image = cv2.imread('mountain.jpg')
```

Nếu đường dẫn sai, `cv2.imread` trả về `None` thay vì báo lỗi. Vì vậy cần kiểm tra:

```python
if image is None:
    print("Could not load the image")
else:
    print("Image loaded successfully")
```

Chạy cell, nếu in ra "Image loaded successfully" là ảnh đã nạp đúng.

---

### 👁️ Hiển thị ảnh

Để xem ảnh, dùng ba dòng:

```python
cv2.imshow('Image Window', image)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

* `cv2.imshow` mở một cửa sổ, tham số đầu là **tên cửa sổ**, tham số sau là ảnh.
* `cv2.waitKey(0)` tạm dừng chương trình **cho tới khi có phím được nhấn**, giữ cửa sổ mở thay vì tắt ngay.
* `cv2.destroyAllWindows()` đóng mọi cửa sổ OpenCV và giải phóng bộ nhớ.

Khi chạy, cửa sổ hiện ảnh; bấm phím bất kỳ (ví dụ `Q`) thì cửa sổ đóng và cell kết thúc.

---

### 💾 Ghi ảnh sau khi xử lý

Ghi lại đúng ảnh gốc thì không có gì để so sánh, nên mình tạo một bản mới bằng cách cộng **30** vào mọi điểm ảnh (vì ảnh là NumPy array), rồi lưu bằng `cv2.imwrite`:

```python
image_new = image + 30
cv2.imwrite('output.jpg', image_new)
```

Mở `output.jpg` và so với `mountain.jpg` gốc, các bạn sẽ thấy ảnh bị nhiễu mạnh: màu trắng, đỏ, xanh đều bị đổi giá trị vì ta cộng 30 vào từng kênh. Mục đích không phải tạo ảnh đẹp mà là chứng minh đã đọc — xử lý — ghi thành công.

Vậy là các bạn đã nắm được nền tảng đọc, hiển thị và ghi ảnh. Đây là bước đệm cho mọi thứ ta sẽ xây dựng sau này, bắt đầu từ việc làm việc với video ở bài tiếp theo.
