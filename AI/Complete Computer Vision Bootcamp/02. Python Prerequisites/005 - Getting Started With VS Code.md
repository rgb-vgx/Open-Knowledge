---
title: 'Bài 005 — Bắt đầu với VS Code'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 5
status: edited
source: '005 - Getting Started With VS Code.md'
categories:
- AI
tags: []

---

# 💻 Bắt đầu với VS Code

> Nguồn: `005 - Getting Started With VS Code.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084895)

Chào các bạn! Đây là buổi đầu của series Python. Mình sẽ dùng **VS Code** làm IDE xuyên suốt khóa, vì nó chạy được cả file `.ipynb` lẫn `.py`, tạo môi trường dễ và có nhiều extension hỗ trợ. Mục tiêu hôm nay: tạo một môi trường **conda** với Python 3.12, chạy code trong terminal và trong Jupyter Notebook.

### 🎯 Vì sao mình chọn VS Code?

* Chạy được **Jupyter notebook** (`.ipynb`) và file Python (`.py`) trong cùng một công cụ.
* Tạo và quản lý **environment** thuận tiện.
* Có **extensions**, **code assistance** và nhiều tính năng hỗ trợ khác.

Mình cũng chọn **Python 3.12** — bản mới nhất ở thời điểm quay bài — và sẽ lồng ghép các tính năng mới từ **3.10 đến 3.12** vào series này.

---

### 🌱 Vì sao mỗi dự án cần một môi trường riêng?

Một dự án Python hoặc data science thường dùng nhiều package, nhiều thư viện. Hầu hết là **open source**, và cứ vài tháng lại có tính năng mới. Nếu tất cả dự án dùng chung một môi trường, các phiên bản sẽ đụng nhau.
Vì vậy mình tạo **environment riêng cho từng dự án**. Khi có package mới, các bạn tạo dự án mới với môi trường mới, không ảnh hưởng dự án cũ. Đây là thói quen nên hình thành ngay từ đầu.

---

### ⚡ Tạo môi trường bằng conda

Mình mở **Command Prompt** (không dùng PowerShell) và chạy:
`conda create -p venv python==3.12`
Trong lệnh này, `venv` là tên môi trường, còn `3.12` là phiên bản Python. Không phải dự án nào cũng cần 3.12 — con số phụ thuộc package mà dự án yêu cầu; riêng series nhập môn này mình dùng 3.12.
Sau khi Enter:

1. Conda bắt đầu tải các package nền tảng.
2. Màn hình liệt kê các package sẽ được cài; các bạn bấm `Y` để đồng ý.
3. Thời gian cài phụ thuộc tốc độ mạng.
4. Xong xuôi, thư mục `venv` xuất hiện với các thư mục con như `DLL`, `include` và bộ package mặc định.

Để dùng môi trường, mình chạy `conda activate` kèm đường dẫn tới thư mục `venv` vừa tạo. Khi môi trường được kích hoạt, các bạn có thể chạy trực tiếp file `.py` bằng Python trong môi trường đó.
Giờ mình tạo file `app.py` với nội dung `print(1 + 1)`. Muốn chạy, phải đứng đúng thư mục, đã activate môi trường, rồi gõ `python app.py`. Kết quả phép cộng hiện ra ngay trong terminal.

---

### 📓 Chạy Jupyter Notebook ngay trong VS Code

Mình tạo thư mục **Python basics**, bên trong tạo file `test.ipynb`. VS Code sẽ dò **kernel** và cho chọn môi trường Python; mình chọn `venv` với **Python 3.12.0** trong danh sách các môi trường trên máy.
Trong notebook có hai loại cell:

* **Code cell** — nơi viết code Python.
* **Markdown cell** — nơi viết ghi chú, tiêu đề, mô tả.

Nhấn **Shift + Enter** để chạy cell hiện tại. Chuột phải sẽ thấy thêm nhiều tùy chọn, trong đó có **Run All** nếu muốn chạy toàn bộ.
Lần đầu chạy `1 + 1`, mình gặp lỗi: *running cell requires the ipykernel package*. Lý do là môi trường mới chưa có **ipykernel**.

---

### 📦 Cài `ipykernel` và quản lý package bằng requirements.txt

Cách sửa rất đơn giản: chạy `pip install ipykernel`. Package này cung cấp **kernel** để Jupyter Notebook thực thi code Python. Với notebook mặc định của Anaconda, ipykernel đã được tích hợp sẵn; còn môi trường conda tự tạo thì phải cài.
Mình cũng tạo file `requirements.txt` để ghi lại các package cần dùng:

* Đầu tiên là `ipykernel`.
* Về sau sẽ thêm `pandas`, `numpy` và các package khác.
* Chạy file requirements để cài một lượt toàn bộ danh sách.

Cài xong, mình chạy lại `1 + 1`, notebook báo **connecting to kernel** rồi trả kết quả. Thử thêm `print("hello world")` cũng chạy bình thường.
Khác với notebook, file `.py` không cần kernel: terminal đã được gắn với môi trường, nên chỉ cần `python app.py` là đủ. Với cell trong notebook thì vẫn là **Shift + Enter**.
Cuối bài, mình xóa thư mục test sau khi demo, nhưng giữ `requirements.txt` để tiếp tục cập nhật package. Cách tổ chức về sau sẽ theo từng thư mục cho mỗi buổi học. Bài tới chúng ta chính thức vào **Python basics**.

> ⚠️ Cần kiểm chứng: transcript dùng `conda create -p venv python==3.12`. Theo docs.conda.io, `-p/--prefix` nhận đường dẫn vị trí môi trường, còn `-n/--name` mới nhận tên môi trường; ví dụ trong docs dùng `conda create -n myenv python=3.12`. Nên đối chiếu lại trước khi dùng, nhất là khi đường dẫn tương đối `venv` có thể được hiểu theo thư mục hiện tại.
