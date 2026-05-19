---
title: 'MongoDB Essentials 4: Modern MongoDB CLI: Nâng cấp trải nghiệm với mongosh'
date: '2026-02-03 23:51:20'
date_gmt: '2026-02-03 16:51:20'
modified: '2026-03-04 23:57:15'
status: publish
slug: modern-mongodb-cli-nang-cap-trai-nghiem-voi-mongosh
wordpress_id: 668
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/02/03/modern-mongodb-cli-nang-cap-trai-nghiem-voi-mongosh/
categories:
- MongoDB
tags: []
---

Nếu bạn đã cài đặt MongoDB Server (phiên bản cũ hoặc mặc định), có thể bạn đã quen với lệnh `mongo`. Tuy nhiên, MongoDB đã phát hành một công cụ mới mạnh mẽ hơn, hiện đại hơn tên là **MongoDB Shell (`mongosh`)**. Đây là tiêu chuẩn mới cho mọi kỹ sư làm việc với MongoDB.

## 1. Tại sao cần `mongosh` thay vì `mongo` (Legacy)?

Mặc dù các lệnh truy vấn cốt lõi (Query syntax) giữa hai phiên bản này là **giống hệt nhau** (bạn học cái này sẽ dùng được cái kia), `mongosh` mang lại trải nghiệm Developer Experience (DX) tốt hơn hẳn:

- **Syntax Highlighting:** Tô màu cú pháp giúp dễ đọc code JSON/JavaScript.
- **Intelligent Auto-completion:** Gợi ý lệnh thông minh hơn.
- **Modern JavaScript Engine:** Hỗ trợ các tính năng ES6+ mới nhất.
- **Error Reporting:** Thông báo lỗi dễ hiểu và trực quan hơn.

> **Lưu ý quan trọng:** Trong môi trường Production hoặc các tài liệu cũ, bạn vẫn sẽ thấy lệnh `mongo`. Đừng lo lắng, logic truy vấn không thay đổi. Bài viết này khuyến nghị bạn sử dụng `mongosh` để có trải nghiệm tốt nhất ngay từ đầu.

## 2. Hướng dẫn Cài đặt & Setup

Bạn có thể tải `mongosh` từ trang chủ MongoDB (Software > Developer Tools > MongoDB Shell). Dưới đây là quy trình setup chuẩn cho môi trường Dev:

### Đối với Windows

1. **Tải về:** Chọn file cài đặt `.msi` hoặc `.exe`.
2. **Cài đặt:** Chạy file cài đặt, giữ nguyên các đường dẫn mặc định (Default Path).
3. **Khởi chạy:** Mở Start Menu, tìm kiếm `mongosh` và chạy chương trình.

### Đối với macOS

Quy trình trên macOS yêu cầu thao tác thủ công một chút để đưa file thực thi vào đường dẫn hệ thống (PATH):

1. **Tải về:** Chọn file `.zip`.
2. **Giải nén:** Bạn sẽ nhận được thư mục chứa file `bin`. Bên trong có 2 file quan trọng, trong đó `mongosh` là file chính.
3. **Cài đặt vào System Path:**
   - Bạn cần di chuyển các file này vào thư mục `/usr/local/bin` (đây là nơi chứa các lệnh terminal, nơi bạn đã cài MongoDB Server trước đó).
   - Mở Finder, dùng tổ hợp phím `Cmd + Shift + .` để hiện các file ẩn nếu cần tìm thư mục `usr`.
   - Kéo thả (hoặc dùng lệnh `mv` trong terminal) để đưa file `mongosh` vào `/usr/local/bin`.

### Đối với Linux

Trên Linux, cách tốt nhất (Best Practice) là sử dụng **Package Manager** (như `apt` hoặc `yum`) thay vì tải file nén `.tgz`. Điều này giúp bạn dễ dàng cập nhật phiên bản mới chỉ với một lệnh update hệ thống.

### Cách 1: Cài đặt trên Ubuntu / Debian (Phổ biến nhất)

Đây là môi trường Dev phổ biến nhất. Chúng ta sẽ thêm kho chứa (repository) chính thức của MongoDB vào hệ thống.

**Bước 1: Import Public Key** Hệ thống cần key này để xác thực gói cài đặt là chính chủ từ MongoDB (tránh malware).

Bash

```
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
```

*(Lưu ý: Nếu bạn dùng bản Ubuntu mới nhất, có thể cần cài thêm `gnupg` trước)*.

**Bước 2: Tạo list file cho MongoDB** Lệnh này thêm repo của MongoDB vào danh sách nguồn tải của `apt`.

Bash

```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

*(Thay `jammy` bằng mã phiên bản Ubuntu của bạn nếu khác, ví dụ `focal` cho 20.04).*

**Bước 3: Cập nhật và Cài đặt**

Bash

```
sudo apt-get update
sudo apt-get install -y mongodb-mongosh
```

> **Lưu ý:** Gói `mongodb-mongosh` chỉ cài đặt Shell (nhẹ), không cài đặt toàn bộ Database Server. Rất phù hợp nếu bạn chỉ cần client để kết nối tới Atlas hoặc Server khác.

## 3. Kết nối và Kiểm tra (Verification)

Sau khi cài đặt xong, hãy đảm bảo rằng **MongoDB Server** của bạn đang chạy (background service). Shell chỉ là client, nó cần server để kết nối.

### Bước 1: Khởi động Shell

- **Windows:** Chạy ứng dụng `mongosh` từ Start Menu hoặc CMD.
- **macOS/Linux:** Mở Terminal và gõ lệnh:Bash`mongosh` *(Lưu ý: Lệnh là `mongosh`, không phải `mongo`)*

### Bước 2: Kiểm tra kết nối

Khi giao diện Shell hiện ra, bạn sẽ thấy thông tin phiên bản và dấu nhắc lệnh. Hãy chạy thử lệnh sau để liệt kê các database hiện có:

JavaScript

```
show dbs
```

**Kết quả mong đợi:** Bạn sẽ thấy danh sách các database mặc định (như `admin`, `config`, `local`).

Plaintext

```
admin   40.00 KiB
config  60.00 KiB
local   72.00 KiB
```

Nếu bạn thấy danh sách này, chúc mừng! Bạn đã kết nối thành công vào MongoDB Server bằng `mongosh`.

## 4. Troubleshooting & Notes

- **Connection Refused:** Nếu chạy `mongosh` mà báo lỗi kết nối, 99% nguyên nhân là MongoDB Server chưa chạy. Hãy kiểm tra lại service (`mongod`) trên máy của bạn.
- **Warnings:** Khi mới khởi động, bạn có thể thấy một số cảnh báo (warnings) về Access Control hoặc cấu hình. Ở môi trường Local Dev, bạn có thể tạm thời bỏ qua chúng.

---

## Kết luận & Next Steps

Bạn đã hoàn tất việc chuẩn bị "vũ khí". Chúng ta có:

1. **Server:** Nơi lưu trữ dữ liệu.
2. **Compass:** Công cụ giao diện (GUI) để xem dữ liệu.
3. **Mongosh:** Công cụ dòng lệnh (CLI) để thao tác chuyên sâu.

**Bước tiếp theo:** Bây giờ hạ tầng đã sẵn sàng, bài viết tiếp theo chúng ta sẽ đi vào phần quan trọng nhất: **CRUD Operations**. Tôi sẽ hướng dẫn bạn cách Tạo (Create), Đọc (Read), Cập nhật (Update) và Xóa (Delete) dữ liệu bằng chính `mongosh` mà bạn vừa cài đặt. Hãy giữ terminal của bạn mở nhé!
