---
title: 'Tạo màn hình ảo để tăng độ phân giải VNC'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 013
status: edited
source: '013 - Virtual Display.md'
categories:
- AI
tags: []
---

# 📺 Tạo màn hình ảo để tăng độ phân giải VNC

> Nguồn: `013 - Virtual Display.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39478958)

Khi kết nối VNC, các bạn sẽ thấy màn hình Jetson Nano có độ phân giải rất thấp. Trong bài này mình tạo một **virtual screen** để đặt độ phân giải phù hợp, giúp làm việc trong VS Code dễ hơn hẳn.

### 🔗 Kết nối và mở terminal

1. Mở **VNC Viewer**, kết nối tới Jetson Nano.
2. Bấm **Continue**, nhập mật khẩu (trong bài là **123456**).
3. Mở **Terminal** trên board.

---

### ⌨️ Mở file cấu hình X.Org

Chạy lệnh:

```bash
sudo vim /etc/X11/xorg.conf
```

Giải thích nhanh hai phần của lệnh:

* `sudo` cho phép thao tác với quyền **administrator**. Không có nó thì các bạn không sửa được cấu hình hệ thống.
* `vim` là trình soạn thảo để mở và sửa file `xorg.conf`, nhờ đó mới lưu được thay đổi.

Khi được hỏi mật khẩu, nhập mật khẩu của board (trong bài là **1234**).

---

### ✍️ Thêm cấu hình màn hình ảo

File `xorg.conf` mở ra trong vim. Các bạn di chuyển xuống cuối file và nhập nội dung tạo màn hình ảo. Chú ý **dấu cách** giữa các thành phần — transcript nhắc đi nhắc lại điểm này:

```text
Section "Screen"
    Identifier "Default Screen"
    Monitor "Configured Monitor"
    Device "Tegra 0"
    DefaultDepth 24
    SubSection "Display"
        DefaultDepth 24
        Virtual 1280 720
    EndSubSection
EndSection
```

Trong quá trình nhập, giảng viên có sửa lại vài chỗ bị gõ sai (ví dụ `Identifer` thành `Identifier`, `Tegra zero` thành `Tegra 0`). Các bạn cứ gõ đúng như khối trên là được.

* `Section "Screen"` mở khối cấu hình màn hình.
* `Identifier "Default Screen"` đặt tên cho màn hình.
* `Monitor "Configured Monitor"` và `Device "Tegra 0"` chỉ định monitor và thiết bị đồ họa.
* `DefaultDepth 24` đặt độ sâu màu 24-bit.
* `SubSection "Display"` là khối con, nơi đặt độ phân giải ảo.
* `Virtual 1280 720` là độ phân giải mong muốn — trong bài dùng **1280x720**, các bạn có thể chọn độ phân giải khác.

---

### 💾 Lưu file và reboot

1. Bấm **ESC** để thoát chế độ nhập.
2. Gõ `:wq` rồi Enter để lưu và thoát vim.
3. Khởi động lại board:

```bash
reboot
```

4. Chờ khoảng **hai phút**. Trước khi kiểm tra, giảng viên **rút cáp HDMI** khỏi Jetson Nano để chắc chắn VNC đang dùng màn hình ảo.

---

### ✅ Kiểm tra kết quả

Kết nối lại VNC bằng mật khẩu **123456**. Màn hình lúc này đã đúng độ phân giải và hiển thị rõ ràng hơn nhiều.

---

Vậy là môi trường làm việc từ xa đã ổn. Bài sau mình sẽ cài **Python** vào Visual Studio Code và chạy chương trình đầu tiên.

> ⚠️ Cần kiểm chứng: lệnh mở file cấu hình — transcript chỉ đọc là "V", có thể là `sudo vi` hoặc `sudo vim`; mình giữ `vim`. Chi tiết giảng viên sửa lỗi gõ (`Identifer` → `Identifier`, `Tegra zero` → `Tegra 0`) là suy luận từ transcript.
