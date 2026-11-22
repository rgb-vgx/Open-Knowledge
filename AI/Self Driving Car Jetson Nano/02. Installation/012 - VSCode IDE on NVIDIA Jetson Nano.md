---
title: 'Cài Visual Studio Code trên Jetson Nano'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 012
status: edited
source: '012 - VSCode IDE on NVIDIA Jetson Nano.md'
categories:
- AI
tags: []
---

# 🧑‍💻 Cài Visual Studio Code trên Jetson Nano

> Nguồn: `012 - VSCode IDE on NVIDIA Jetson Nano.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39480294)

Mình sẽ cài **Visual Studio Code** trực tiếp trên Jetson Nano, toàn bộ thao tác thực hiện qua VNC. Đây sẽ là IDE để các bạn viết code Python và OpenCV trong suốt khóa học.

### 🔗 Kết nối tới board qua VNC

1. Mở **VNC Viewer**.
2. Chọn địa chỉ IP của Jetson Nano đã lưu.
3. Bấm **Continue**, nhập mật khẩu (trong bài là **1234**) và Enter.

### 📥 Tải bản VS Code cho ARM64

1. Trên board, mở Google và tìm **Visual Studio Code**.
2. Vào trang web chính thức của Visual Studio Code.
3. Bấm **Other platforms** để mở danh sách tải cho các hệ điều hành.
4. Chuyển sang mục tải cho **Linux**.
5. Tải file **.deb** ở nhánh **ARM64** — đúng kiến trúc của Jetson Nano.
6. Trình duyệt có thể cảnh báo file tải về, bấm **Keep** rồi **Keep anyway**.

### 🔧 Cài đặt

1. Tải xong, bấm **Show in folder**.
2. Mở file `.deb` vừa tải.
3. Bấm **Install**.
4. Nhập mật khẩu của board (**1234**) và xác nhận.
5. Chờ quá trình cài chạy xong.

### ✅ Mở VS Code

1. Mở ô tìm kiếm của hệ điều hành, gõ **code**.
2. Nếu chưa thấy ứng dụng, vào **Filter results** và chọn mục ứng dụng.
3. Mở **Visual Studio Code** để kiểm tra — cửa sổ IDE hiện lên là cài đặt thành công.

---

IDE đã sẵn sàng. Bài sau mình sẽ chỉnh độ phân giải màn hình VNC bằng một màn hình ảo, để làm việc trong VS Code dễ chịu hơn nhiều.
