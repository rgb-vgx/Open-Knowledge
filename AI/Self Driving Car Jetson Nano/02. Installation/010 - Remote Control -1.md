---
title: 'Điều khiển Jetson Nano từ xa: bật VNC và lấy địa chỉ IP'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 010
status: edited
source: '010 - Remote Control -1.md'
categories:
- AI
tags: []
---

# 🖥️ Điều khiển Jetson Nano từ xa: bật VNC và lấy địa chỉ IP

> Nguồn: `010 - Remote Control -1.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39469582)

Trong bài này mình cấu hình **VNC** trên board để sau này có thể điều khiển Jetson Nano từ máy tính, không cần cắm màn hình riêng nữa. Cuối bài, các bạn sẽ có địa chỉ IP của board để dùng cho bước kết nối.

### 🔍 Tìm hướng dẫn bật VNC

1. Lên Google, gõ **Jetson Nano VNC** rồi Enter.
2. Mở trang hướng dẫn có tiêu đề về **setting up VNC**.
3. Trong trang có sẵn các đoạn lệnh. Các bạn sẽ copy và dán lần lượt vào terminal của board.

> 💡 Lưu ý về dòng RAM: nếu Jetson Nano của các bạn có **2GB RAM**, chỉ cần dán **hai đoạn lệnh đầu**. Với model **4GB RAM**, làm giống hệt như trong bài.

### ⌨️ Dán lệnh vào terminal

1. Trên board, mở **Terminal**.
2. Copy và dán các đoạn lệnh **theo đúng thứ tự**, mỗi đoạn Enter một lần.
3. Khi terminal hỏi mật khẩu, nhập mật khẩu mình đặt lúc cài hệ điều hành — trong bài là **1234**.
4. Với đoạn lệnh cuối, các bạn cần đặt mật khẩu để kết nối từ xa: xóa phần mật khẩu nằm trong dấu ngoặc kép rồi thay bằng mật khẩu của mình. Trong bài, giảng viên đặt là **123456**.
5. Enter để chạy lệnh.

### 🔄 Khởi động lại board

Các thay đổi chỉ có hiệu lực sau khi reboot:

```bash
sudo reboot
```

Nhập mật khẩu khi được hỏi và chờ board khởi động lại.

### 🌐 Lấy địa chỉ IP

1. Mở **Terminal** trên board.
2. Chạy lệnh:

```bash
ifconfig
```

3. Tìm **địa chỉ IP** của board trong kết quả. IP của bạn có thể khác với trong bài — điều đó bình thường.

---

Ghi lại địa chỉ IP này để dùng ở bài sau. Giờ mình sẽ chuyển sang máy tính Windows để cài **VNC Viewer** và kết nối vào board.

> ⚠️ Cần kiểm chứng: transcript ghi "three gigabyte Ram", nhưng Jetson Nano chỉ có bản **2GB** và **4GB** — mình đã sửa thành 4GB.
