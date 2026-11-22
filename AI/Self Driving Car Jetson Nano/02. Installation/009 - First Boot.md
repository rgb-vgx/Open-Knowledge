---
title: 'Khởi động Jetson Nano lần đầu và thiết lập hệ điều hành'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 009
status: edited
source: '009 - First Boot.md'
categories:
- AI
tags: []
---

# 🚗 Khởi động Jetson Nano lần đầu và thiết lập hệ điều hành

> Nguồn: `009 - First Boot.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39469488)

Đây là lần đầu cấp nguồn cho board, mình sẽ đi qua toàn bộ màn hình thiết lập ban đầu của hệ điều hành. Các bạn chuẩn bị sẵn chuột, bàn phím và một màn hình là làm được ngay.

### 🧰 Chuẩn bị

* Một bộ **chuột và bàn phím USB**.
* Cáp **DisplayPort hoặc HDMI** để xuất ra màn hình.

Cắm chuột, bàn phím USB và cáp màn hình vào board, sau đó cấp nguồn bằng adapter.

### ✅ Đồng ý license và chọn ngôn ngữ, bàn phím

1. Màn hình hiện **license agreement**, các bạn đọc rồi bấm **Accept** và **Continue**.
2. Ở phần chọn ngôn ngữ, mình để mặc định vì khóa học dùng tiếng Anh.
3. Ở phần **keyboard layout**, chọn đúng layout của mình. Trong bài, giảng viên dùng bàn phím Thổ Nhĩ Kỳ, layout **Q**.

### 📶 Kết nối Wi-Fi và chọn vùng

1. Ở mục **wireless connection**, chọn mạng Wi-Fi và kết nối.
2. Đây là bước bắt buộc nếu sau này các bạn muốn **điều khiển Jetson Nano từ xa**.
3. Bấm **Continue**.
4. Ở mục chọn **region** để hệ thống đặt đồng hồ, chọn đúng quốc gia của mình. Trong bài, giảng viên chọn Turkey.

### 👤 Đặt tên máy và mật khẩu

1. Nhập tên máy: trong bài là **Yilmaz**.
2. Đặt mật khẩu: trong bài là **1234**.
3. Chọn **login automatically** nếu muốn máy tự đăng nhập.

### ⚙️ Chọn dung lượng và chế độ hiệu năng

* Màn hình hỏi dung lượng bộ nhớ muốn dùng, mình để **mặc định**.
* Có hai lựa chọn cho tốc độ chạy của máy. Mình chọn option **MAXN** (hiệu năng tối đa) vì sẽ chạy các ứng dụng **machine learning**.

Sau khi hoàn tất, hệ điều hành sẽ khởi động vào desktop và Wi-Fi đã kết nối thành công.

---

Board đã chạy được hệ điều hành. Bài sau mình sẽ cấu hình VNC để điều khiển Jetson Nano từ xa, không cần cắm màn hình nữa.

> ⚠️ Cần kiểm chứng: tên option hiệu năng — transcript ghi "Maxon", tài liệu NVIDIA dùng tên **MAXN**; bản Jetson Nano 2GB lại hiển thị hai mode **10W/5W**. Cần xác nhận đúng nhãn trên màn hình setup của kit đang dùng.
