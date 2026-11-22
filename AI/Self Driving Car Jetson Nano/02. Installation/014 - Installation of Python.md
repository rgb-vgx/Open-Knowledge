---
title: 'Cài Python trong VS Code và chạy chương trình đầu tiên'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 014
status: edited
source: '014 - Installation of Python.md'
categories:
- AI
tags: []
---

# 🐍 Cài Python trong VS Code và chạy chương trình đầu tiên

> Nguồn: `014 - Installation of Python.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39480368)

Bài này mình cài extension **Python** cho Visual Studio Code trên Jetson Nano, tạo thư mục project và chạy thử chương trình `hello world`. Mục tiêu là chắc chắn môi trường đã sẵn sàng trước khi động vào OpenCV.

### 🔗 Kết nối và mở VS Code

1. Mở **VNC Viewer**, chọn địa chỉ IP của Jetson Nano.
2. Bấm **Continue**, nhập mật khẩu (trong bài là **1234**).
3. Mở ô tìm kiếm của hệ điều hành, gõ **code** và mở **Visual Studio Code**.

---

### 📁 Tạo thư mục project

1. Ở thanh bên, bấm **Explorer**.
2. Chọn **Open Folder**.
3. Bấm tạo thư mục mới, đặt tên ví dụ **projects**, rồi bấm **Create** và **OK**.
4. VS Code hiện thông báo hỏi có tin tưởng các file trong thư mục cha không — chọn **"Yes, I trust the authors"**.

---

### 🧩 Cài extension Python

1. Mở mục **Extensions** ở thanh bên.
2. Gõ **Python** vào ô tìm kiếm.
3. Chọn extension **Python** do **Microsoft** phát hành.
4. Bấm **Install** và chờ cài xong.

---

### ▶️ Chạy chương trình đầu tiên

1. Quay lại **Explorer**, bấm tạo file mới.
2. Đặt tên file, ví dụ `first_code.py`, rồi Enter.
3. Nhập đoạn code sau:

```python
print("hello world")
```

4. Bấm **Run** để chạy.

Kết quả `hello world` hiện ra ở cửa sổ output — môi trường Python đã hoạt động.

---

Python đã chạy được trong VS Code. Bài cuối của phần cài đặt, mình sẽ kiểm tra xem thư viện **OpenCV** đã có sẵn trên board hay chưa.
