---
title: 'Lắp thẻ SD và module Wi-Fi vào Jetson Nano'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 007
status: edited
source: '007 - Adding Wi-Fi and SD Card.md'
categories:
- AI
tags: []
---

# 🔌 Lắp thẻ SD và module Wi-Fi vào Jetson Nano

> Nguồn: `007 - Adding Wi-Fi and SD Card.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39463196)

Trong bài này mình sẽ lắp thẻ SD đã có hệ điều hành và module Wi-Fi vào board Jetson Nano. Các bạn thao tác nhẹ tay, đặc biệt khi tháo module xử lý ra khỏi socket.

### 🔩 Tháo module xử lý khỏi socket

1. Tháo các ốc vít đang giữ module xử lý.
2. Bấm cả hai chốt (clip) hai bên để nhả module.
3. Nhấc module xử lý ra khỏi socket.

### 💾 Lắp thẻ SD

1. Trên module xử lý có một khe cắm thẻ SD.
2. Lấy thẻ SD đã ghi hệ điều hành, cắm vào khe này.
3. Lưu ý: **mặt sau của thẻ SD phải tiếp xúc với board**.

Vậy là xong phần thẻ SD.

### 📶 Lắp module Wi-Fi

1. Tháo ốc vít ở vị trí gắn module Wi-Fi.
2. Module Wi-Fi có **ba chân** khác nhau.
3. Đặt chân ngắn nhất sang phía bên trái.
4. Lắp module vào đúng vị trí.
5. Gắn các chi tiết cố định còn lại của module Wi-Fi.

### 🔧 Đóng lại board

1. Đặt module xử lý trở lại socket.
2. Bắt ốc vít cố định lại như cũ.

---

Board đã có thẻ SD và Wi-Fi, sẵn sàng cho lần khởi động đầu tiên. Bài tiếp theo mình sẽ lắp quạt tản nhiệt trước khi cấp nguồn.

> ⚠️ Cần kiểm chứng: transcript gốc ghi "install the scripts of the WiFi module" (auto-caption), không rõ là ốc vít hay dây kết nối — mình đã để mức mơ hồ "các chi tiết cố định". Ngoài ra transcript gọi khe cắm là "SIM card slot"; thực tế là khe microSD, và vị trí (trên module hay trên board) cần đối chiếu với board thật.
