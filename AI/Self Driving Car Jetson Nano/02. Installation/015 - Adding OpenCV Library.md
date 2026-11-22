---
title: 'Kiểm tra OpenCV đã sẵn sàng trên Jetson Nano'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 015
status: edited
source: '015 - Adding OpenCV Library.md'
categories:
- AI
tags: []
---

# 📷 Kiểm tra OpenCV đã sẵn sàng trên Jetson Nano

> Nguồn: `015 - Adding OpenCV Library.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39480436)

Bài cuối của phần cài đặt: kiểm tra thư viện **OpenCV** trong Visual Studio Code. Tin tốt là sau khi cài Python ở bài trước, module OpenCV đã có sẵn — mình chỉ cần xác nhận lại bằng một đoạn code ngắn.

### 🔗 Kết nối và mở VS Code

1. Kết nối tới Jetson Nano qua VNC, bấm **Continue** khi được hỏi.
2. Mở ô tìm kiếm, gõ **code** và mở **Visual Studio Code**.

---

### 📝 Tạo file Python mới

1. Trong project, tạo file Python mới, ví dụ `project.py`.
2. Nhập đoạn code kiểm tra phiên bản OpenCV:

```python
import cv2
print(cv2.__version__)
```

Hai dòng này làm đúng hai việc:

* `import cv2` nạp module OpenCV (tên module là `cv2`).
* `print(cv2.__version__)` in ra phiên bản OpenCV đang có trên máy.

---

### ✅ Chạy và đọc kết quả

Bấm **Run**. Kết quả trong bài là:

```text
4.1.1
```

Nghĩa là **OpenCV 4.1.1** đã sẵn sàng để dùng — các bạn không cần cài thêm gì cho phần này.

---

Vậy là xong phần Installation: từ thẻ SD, hệ điều hành, kết nối từ xa cho tới Python và OpenCV. Bài tiếp theo mình sẽ bắt đầu làm quen với các kiến thức nền tảng của Jetson Nano và những bài code OpenCV đầu tiên.
