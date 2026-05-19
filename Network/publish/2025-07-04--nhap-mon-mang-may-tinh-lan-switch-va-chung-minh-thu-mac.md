---
title: 'Nhập Môn Mạng Máy Tính: LAN, Switch và "Chứng Minh Thư" MAC'
date: '2025-07-04 23:23:10'
date_gmt: '2025-07-04 16:23:10'
modified: '2025-07-04 23:23:10'
status: publish
slug: nhap-mon-mang-may-tinh-lan-switch-va-chung-minh-thu-mac
wordpress_id: 86
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/04/nhap-mon-mang-may-tinh-lan-switch-va-chung-minh-thu-mac/
categories:
- Network
tags: []
---

Chào mừng bạn đến với thế giới của mạng máy tính! Nghe có vẻ phức tạp, nhưng những khái niệm cốt lõi lại vô cùng gần gũi và thú vị. Trong bài viết này, chúng ta sẽ cùng nhau "mổ xẻ" những viên gạch nền tảng nhất đã xây dựng nên Internet mà bạn đang sử dụng hàng ngày, bắt đầu từ một khái niệm quen thuộc: mạng LAN.

### Mạng LAN là gì?

Hãy tưởng tượng bạn đang ở trong văn phòng hoặc tại nhà. Bạn có một vài chiếc máy tính, một cái máy in, và bạn muốn tất cả chúng có thể "nói chuyện", chia sẻ dữ liệu với nhau. Khi chúng ta kết nối các thiết bị này lại trong một không gian vật lý giới hạn (như một tòa nhà, một căn phòng), chúng ta đã tạo ra một **Mạng Cục Bộ**, hay **Local Area Network (LAN)**.

Mục đích của mạng LAN rất đơn giản: cho phép các thiếtes bị ở gần nhau có thể giao tiếp và chia sẻ tài nguyên một cách hiệu quả.

### Các "Diễn Viên" Chính Trong Mạng LAN

Để các thiết bị có thể kết nối với nhau, chúng ta cần một số thành phần phần cứng quan trọng.

#### 1. Thiết bị trung tâm: Switch Ethernet

Để kết nối tất cả máy tính và máy in, chúng ta cần một thiết bị trung tâm. Ngày nay, thiết bị phổ biến nhất cho vai trò này là **Switch Ethernet** (bộ chuyển mạch).

Hãy hình dung Switch như một "trung tâm giao thông" thông minh. Nó có rất nhiều cổng cắm (port). Mỗi máy tính hay máy in sẽ dùng một sợi cáp Ethernet cắm vào một cổng trên Switch. Khi đó, mọi dữ liệu đi từ máy này đến máy khác đều sẽ đi qua Switch.

Cấu trúc kết nối mà Switch làm trung tâm và các thiết bị khác tỏa ra xung quanh được gọi là **cấu trúc mạng hình sao (Star Topology)**.

*Lưu ý: Trước đây, người ta thường dùng một thiết bị gọi là "Hub", nhưng Hub kém thông minh hơn Switch và hiện nay gần như không còn được sử dụng.*

#### 2. Card Mạng (NIC) và Cáp Ethernet

Mỗi thiết bị muốn tham gia vào mạng đều cần có một **Card Giao Tiếp Mạng (Network Interface Card - NIC)**. Hầu hết các máy tính hiện đại đều đã tích hợp sẵn NIC trên bo mạch chủ (mainboard). Đây chính là nơi có cổng để bạn cắm dây mạng vào.

Sợi dây kết nối từ máy tính đến Switch chính là **cáp Ethernet** (ví dụ: cáp Cat5e, Cat6).

Tất nhiên, kết nối không chỉ giới hạn ở dây cáp. Mạng không dây **Wi-Fi** cũng là một phương thức để tạo nên mạng LAN, trong đó **Access Point (AP)** đóng vai trò tương tự như Switch, kết nối các thiết bị bằng sóng vô tuyến thay vì cáp vật lý.

### "Chứng Minh Thư" của Thiết Bị: Địa Chỉ MAC

Đây là một trong những khái niệm quan trọng nhất ở lớp mạng cơ bản. Làm thế nào Switch biết được phải gửi dữ liệu đến đúng máy tính nào trong hàng chục máy đang kết nối? Câu trả lời nằm ở **Địa chỉ MAC**.

**MAC (Media Access Control)** là một địa chỉ định danh **DUY NHẤT** được gán cho mỗi Card Mạng (NIC) trên toàn thế giới.

- **Duy nhất & Vĩnh viễn:** Địa chỉ này được nhà sản xuất "đốt" thẳng vào phần cứng của card mạng và không thể thay đổi. Nó giống như số seri hay dấu vân tay của thiết bị vậy.
- **Cấu trúc:** Một địa chỉ MAC gồm 12 ký tự hệ thập lục phân (hexadecimal), ví dụ: `3C-FD-FE-08-4E-F1`.

Mọi thiết bị trong mạng LAN của bạn, từ máy tính, máy in cho đến điện thoại thông minh, đều có một địa chỉ MAC riêng.

**Làm thế nào để xem địa chỉ MAC trên máy của bạn?**

- **Trên Windows:** Mở `Command Prompt` và gõ lệnh: `ipconfig /all`. Tìm đến card mạng bạn đang dùng (Ethernet hoặc Wi-Fi) và xem dòng `Physical Address`. Đó chính là địa chỉ MAC của bạn.
- **Trên macOS hoặc Linux:** Mở `Terminal` và gõ lệnh: `ifconfig`.

### Giao Tiếp Trong Mạng LAN: Phép ẩn dụ "Lá Thư"

Khi máy tính A muốn gửi dữ liệu cho máy tính B trong cùng mạng LAN, nó sẽ tạo ra một gói tin gọi là **Khung Ethernet (Ethernet Frame)**.

Hãy tưởng tượng Khung Ethernet giống như một bì thư bạn gửi qua bưu điện:

1. **Tải trọng (Payload):** Đây là dữ liệu thực sự bạn muốn gửi, tương đương với nội dung lá thư bên trong.
2. **Địa chỉ Đích (Destination MAC Address):** Đây là địa chỉ MAC của máy tính B, người nhận. Nó giống như địa chỉ người nhận được ghi ở giữa bì thư.
3. **Địa chỉ Nguồn (Source MAC Address):** Đây là địa chỉ MAC của máy tính A, người gửi. Nó giống như địa chỉ người gửi (return address) ở góc trên bên trái.

Khi máy A gửi "bức thư" này đến Switch, Switch sẽ đọc "địa chỉ người nhận" (Destination MAC), xác định xem máy tính B đang cắm ở cổng nào và chỉ chuyển tiếp "bức thư" đến đúng cổng đó. Nhờ vậy, các máy tính khác không cần nhận những dữ liệu không dành cho mình.

Quá trình này cũng tương tự khi bạn gửi lệnh in. Máy tính của bạn sẽ tạo một Khung Ethernet với địa chỉ MAC của máy in làm địa chỉ đích.

### Tóm Tắt Nhanh

Hãy cùng điểm lại những ý chính:

- **LAN (Mạng Cục Bộ):** Kết nối các thiết bị trong một khu vực vật lý giới hạn.
- **Switch Ethernet:** Thiết bị trung tâm thông minh giúp kết nối các thành viên trong mạng LAN.
- **Card Mạng (NIC):** Phần cứng giúp thiết bị có khả năng kết nối mạng.
- **Địa chỉ MAC:** "Chứng minh thư" định danh duy nhất và vĩnh viễn của mỗi card mạng.
- **Khung Ethernet (Ethernet Frame):** Gói tin chứa dữ liệu, địa chỉ MAC nguồn và địa chỉ MAC đích, được dùng để giao tiếp trong mạng LAN.

Hy vọng bài viết này đã giúp bạn có cái nhìn rõ ràng và hệ thống hơn về những khái niệm cơ bản nhất của mạng máy tính. Đây chính là nền tảng để chúng ta tiếp tục khám phá những chủ đề thú vị hơn như địa chỉ IP, Router và cách chúng ta kết nối ra thế giới Internet rộng lớn. Chúc bạn học tập vui vẻ!
