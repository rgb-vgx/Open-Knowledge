---
title: 'Kết nối VNC Viewer từ Windows tới Jetson Nano'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 011
status: edited
source: '011 - Remote Control -2.md'
categories:
- AI
tags: []
---

# 🔗 Kết nối VNC Viewer từ Windows tới Jetson Nano

> Nguồn: `011 - Remote Control -2.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39469736)

Sau khi đã bật VNC và có địa chỉ IP của board, bài này mình cài **VNC Viewer** trên máy Windows để nhìn thấy màn hình Jetson Nano ngay trên máy tính. Từ đây, mọi thao tác code đều làm được từ xa.

### 📥 Tải VNC Viewer

1. Lên Google, gõ **Jetson Nano VNC** và Enter.
2. Mở trang web hướng dẫn như bài trước.
3. Tìm mục tải cho **Windows**.
4. Bấm **Download VNC Viewer** và chờ tải xong.

---

### 🔧 Cài đặt

1. Mở file vừa tải.
2. Chọn ngôn ngữ **English**.
3. Bấm **Next**.
4. Đồng ý license agreement.
5. Bấm **Next** lần nữa, rồi **Install**.
6. Xong thì bấm **Finish**.

---

### 🖥️ Kết nối tới board

1. Mở ô tìm kiếm của Windows, gõ **VNC viewer** và mở ứng dụng.
2. Nhập **địa chỉ IP của Jetson Nano** vào ô kết nối. Trong bài là `192.168.1.21`.
3. Enter, rồi bấm **Continue**.
4. Ứng dụng hỏi mật khẩu — nhập mật khẩu mình đặt lúc cấu hình VNC, trong bài là **123456**.
5. Enter.

Nếu mọi thứ đúng, màn hình Jetson Nano sẽ hiện lên trong cửa sổ VNC Viewer.

---

Vậy là các bạn đã điều khiển được Jetson Nano từ xa. Bài sau mình sẽ cài **Visual Studio Code** ngay trên board để bắt đầu viết code Python và OpenCV.
