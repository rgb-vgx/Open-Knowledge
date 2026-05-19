---
title: 'Fundamentals of Backend 15: Giao thức Internet (IP): "Phương tiện vận chuyển"
  của Internet'
date: '2025-12-08 00:28:13'
date_gmt: '2025-12-07 17:28:13'
modified: '2026-01-21 15:23:50'
status: publish
slug: giao-thuc-internet-ip-phuong-tien-van-chuyen-cua-internet
wordpress_id: 626
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/08/giao-thuc-internet-ip-phuong-tien-van-chuyen-cua-internet/
categories:
- Back End
tags: []
---

---

Giao thức IP đóng vai trò như phương tiện vận chuyển chính trên Internet. Mọi dữ liệu, dù là yêu cầu từ client đến backend hay phản hồi từ backend, cuối cùng đều được đóng gói vào một **IP packet** (gói IP).

- **Mục đích chính của IP packet**: Vận chuyển dữ liệu từ địa chỉ IP nguồn đến địa chỉ IP đích.
- **Tại Layer 3 (Lớp Mạng)**: IP packet chỉ quan tâm đến địa chỉ IP nguồn và đích. Nó không biết gì về cổng (port), tiêu đề HTTP, mã hóa hay các giao thức cấp cao hơn.
- **Nội dung dữ liệu**: Có thể là bất kỳ loại dữ liệu nào (mã hóa, gRPC, UDP, TCP, phản hồi PostgreSQL từ SQL, v.v.), tất cả đều sẽ nằm gọn trong một IP packet.

---

## 🧱 Địa chỉ IP: Các khối xây dựng cơ bản

Địa chỉ IP là một thuộc tính quan trọng của **Layer 3**.

### ⚙️ Cấu hình địa chỉ IP

- **Tự động (Automatic)**: Sử dụng DHCP (Dynamic Host Configuration Protocol) để gán địa chỉ IP tự động. Đây là một vấn đề ở cấp độ mạng, thường do kỹ sư mạng quản lý.
- **Tĩnh (Statically)**: Có thể cấu hình địa chỉ IP cố định trên máy.

### 🌐 Cấu trúc địa chỉ IP (IPv4)

- Địa chỉ IPv4 có **4 byte** (32 bit).
- Được chia thành hai phần: **phần mạng (network portion)** và **phần host (host portion)**.
- **Ký hiệu `/X` (CIDR notation)**: `X` biểu thị số bit dành cho phần mạng.
  - **Ví dụ**: `192.168.254.0/24`
    - `24` bit đầu tiên (3 byte đầu tiên: `192.168.254`) là **phần mạng**.
    - `8` bit còn lại (byte thứ tư: `0`) là **phần host**.
    - Điều này có nghĩa là có thể có tối đa `2^8 - 2 = 254` host trong mạng này (trừ địa chỉ mạng và địa chỉ broadcast).
- **Lưu ý cho kỹ sư phần mềm**: Chúng ta cần hiểu cách gói tin được gửi, nhưng việc cấu hình mạng chi tiết thường dành cho kỹ sư mạng.

### 🎭 Subnet và Subnet Mask

- **Subnet (Mạng con)**: Là một phân đoạn của mạng lớn hơn, được xác định bởi địa chỉ IP và subnet mask.
- **Subnet Mask**: Được sử dụng để xác định xem một địa chỉ IP có thuộc cùng subnet hay không.
  - **Cách hoạt động**: Thực hiện phép toán `AND` bitwise giữa địa chỉ IP và subnet mask.
  - **Ví dụ**:
    - IP của bạn: `192.168.1.3`
    - Subnet Mask của bạn: `255.255.255.0`
    - Kết quả AND: `192.168.1.0` (Đây là địa chỉ mạng của bạn)
    - Nếu bạn muốn giao tiếp với `192.168.1.2`:
      - Kết quả AND với subnet mask của `192.168.1.2` cũng là `192.168.1.0`.
      - Vì cả hai đều có cùng địa chỉ mạng, chúng nằm trong **cùng subnet**.
    - Nếu bạn muốn giao tiếp với `192.168.2.2`:
      - Kết quả AND với subnet mask của `192.168.2.2` là `192.168.2.0`.
      - Vì địa chỉ mạng khác nhau (`192.168.1.0` vs `192.168.2.0`), chúng nằm ở **khác subnet**.
- **Thông tin cần thiết để kết nối mạng**: Địa chỉ IP của bạn, Subnet Mask và Default Gateway.

### 🚪 Default Gateway

- **Mục đích**: Là điểm thoát cho các gói tin muốn đi ra khỏi subnet hiện tại để đến các mạng khác.
- **Vai trò của Router**: Một router thường có nhiều giao diện mạng, mỗi giao diện được gán một địa chỉ IP thuộc một mạng khác nhau. Nó biết cách định tuyến gói tin giữa các mạng này.
- **Kịch bản giao tiếp**:
  - **Trong cùng subnet**: Host A có thể giao tiếp trực tiếp với Host B bằng địa chỉ MAC (không cần router định tuyến Layer 3). Router lúc này có thể hoạt động như một switch Layer 2.
  - **Khác subnet**: Host A gửi gói tin đến Default Gateway. Gateway sẽ định tuyến gói tin đến mạng đích (có thể thông qua các gateway khác).
  - 🚨 **Cảnh báo**: **ARP Poisoning** là một cuộc tấn công nơi kẻ xấu giả mạo địa chỉ MAC của router để chặn tất cả các gói tin.

### ⚠️ **Thực tiễn cho Kỹ sư Backend: Database và Ứng dụng**

- **Khuyến nghị**: Đặt database và ứng dụng backend trong **cùng một subnet**.
- **Lý do**:
  - Nếu database ở một subnet khác, mọi yêu cầu TCP từ ứng dụng đến database sẽ phải đi qua router.
  - Nếu router bị tắc nghẽn (congested) do xử lý quá nhiều lưu lượng từ hàng nghìn mạng/host khác, các gói tin SQL có thể bị trì hoãn (buffer fill up), dẫn đến độ trễ trong ứng dụng của bạn.
  - Thay vì dùng router làm switch, hãy sử dụng **switch mạng chuyên dụng hiệu suất cao** để kết nối database và ứng dụng trong cùng một subnet, tối ưu hóa giao tiếp nội bộ.
- **Bài học**: Hiểu rõ cấu hình mạng giúp kỹ sư backend làm việc hiệu quả hơn với kỹ sư mạng.

---

## 🔬 Giải phẫu một IP Packet

IP packet bao gồm hai phần chính: **Header (tiêu đề)** và **Data (dữ liệu)**.

### 📏 Kích thước

- **Header**: Mặc định **20 byte**, có thể lên tới **60 byte** nếu có các tùy chọn (options). Đây là "chi phí" để gửi dữ liệu.
- **Data**: Có thể chứa tới **65,536 byte** (do trường độ dài dữ liệu là 16 bit).
  - Tuy nhiên, trong thực tế, ít khi thấy gói IP lớn đến vậy vì giới hạn **MTU (Maximum Transmission Unit)** của hầu hết các mạng là **1500 byte**.

### 🗺️ Cấu trúc Header IP (IPv4)

(Tham khảo RFC của giao thức IP hoặc Wikipedia)

- **Version (Phiên bản)**: 4 bit, chỉ định phiên bản IP (hiện tại là 4 hoặc 6).
- **Internet Header Length (IHL)**: 4 bit, xác định độ dài của header IP theo đơn vị 32-bit words. Mặc định là 5 (tương ứng 20 byte). Nếu có options, IHL sẽ tăng lên.
- **Total Length (Tổng độ dài)**: 16 bit, tổng độ dài của toàn bộ IP packet (header + data) tính bằng byte.
- **Fragmentation (Phân mảnh)**:
  - **MTU (Maximum Transmission Unit)**: Kích thước khung (frame) tối đa mà một mạng có thể truyền. Thông thường là 1500 byte.
  - Nếu IP packet lớn hơn MTU, nó phải được **phân mảnh (fragment)**.
  - **Cờ "Don't Fragment" (DF)**: Nếu bit này được đặt, router sẽ không phân mảnh gói tin. Nếu gói tin quá lớn, router sẽ gửi lại một thông báo ICMP "Packet too large" và hủy gói tin.
  - **Cách phân mảnh**: Một gói IP lớn (ví dụ 2000 byte) có thể bị chia thành nhiều khung (frame) nhỏ hơn (ví dụ 1500 byte và 500 byte).
  - **Rủi ro của phân mảnh**:
    - Các mảnh có thể đến không theo thứ tự.
    - Host đích phải tập hợp lại các mảnh (reassembly), gây thêm chi phí xử lý.
    - Rủi ro bảo mật (kẻ tấn công có thể giả mạo các mảnh).
  - **QUIC**: Giao thức QUIC tắt tính năng phân mảnh IP để tránh các vấn đề này.
- **Time To Live (TTL)**: 8 bit (1 byte), một bộ đếm để ngăn chặn gói tin đi vào vòng lặp vô hạn trên mạng.
  - **Cách hoạt động**:
    - Khi gói tin được gửi, nó có một giá trị TTL ban đầu (ví dụ: 128).
    - Mỗi khi gói tin đi qua một router (một "hop"), giá trị TTL sẽ giảm đi 1.
    - Nếu TTL đạt đến 0, router sẽ hủy gói tin và gửi lại một thông báo ICMP "Packet timed out" cho địa chỉ IP nguồn.
  - **Ứng dụng**: Đây là cơ chế hoạt động của lệnh `traceroute` (sẽ được giải thích chi tiết hơn).
- **Protocol (Giao thức)**: 8 bit, xác định loại giao thức cấp cao hơn nằm trong phần dữ liệu của IP packet (ví dụ: ICMP, TCP, UDP).
  - **Lợi ích**: Router có thể đọc trường này để biết nội dung bên trong mà không cần xử lý toàn bộ dữ liệu, giúp cải thiện hiệu suất và cho phép lọc gói tin.
- **Source IP Address (Địa chỉ IP nguồn)**: 32 bit (4 byte), địa chỉ IP của máy gửi gói tin.
- **Destination IP Address (Địa chỉ IP đích)**: 32 bit (4 byte), địa chỉ IP của máy nhận gói tin.
  - 🚨 **Giả mạo IP nguồn (IP Spoofing)**: Về lý thuyết, có thể thay đổi địa chỉ IP nguồn trong gói tin. Tuy nhiên, các ISP hiện đại thường chặn các gói tin có IP nguồn không hợp lệ để ngăn chặn spoofing. Hơn nữa, nếu IP nguồn bị giả mạo, máy gửi sẽ không nhận được phản hồi.
- **Explicit Congestion Notification (ECN)**: Các bit này được sử dụng để thông báo tắc nghẽn mạng mà không cần phải hủy gói tin.
  - **Tắc nghẽn (Congestion)**: Xảy ra khi buffer (bộ đệm) của router đầy, khiến router phải hủy các gói tin đến. Trước đây, client phải đoán tắc nghẽn dựa trên việc mất gói tin.
  - **Cách hoạt động ECN**:
    - Khi buffer của router sắp đầy, router sẽ **đặt một bit ECN** trong header IP của gói tin thay vì hủy nó.
    - Gói tin vẫn được chuyển tiếp đến đích.
    - Bên nhận gói tin (server) thấy bit ECN được đặt, biết rằng có tắc nghẽn trên đường đi.
    - Bên nhận sẽ thông báo lại cho bên gửi (client) (thông qua giao thức TCP) để bên gửi giảm tốc độ truyền dữ liệu.
  - **Lợi ích**: Giúp phát hiện và xử lý tắc nghẽn kịp thời mà không làm mất gói tin, cải thiện hiệu suất mạng.
  - **Bài học cho kỹ sư backend**: Thiết kế ECN cho thấy tầm quan trọng của việc tối ưu hóa hiệu quả tài nguyên (ví dụ: tránh dữ liệu dư thừa, JSON cồng kềnh) trong phát triển ứng dụng.

---

## 🗣️ Giao thức ICMP (Internet Control Message Protocol)

ICMP là một giao thức Layer 3 cực kỳ quan trọng, được sử dụng để gửi các thông điệp thông tin giữa các host.

### 🎯 Mục đích của ICMP

- **Thông điệp thông tin**: Cung cấp phản hồi về các sự kiện mạng, lỗi, hoặc thông tin chẩn đoán.
- **Không có cổng (port)**: Vì là giao thức Layer 3, ICMP không sử dụng khái niệm cổng.
- **Các thông điệp ICMP phổ biến**:
  - `Host unreachable`: Host đích không thể truy cập được.
  - `Port unreachable`: Cổng đích không tồn tại (mặc dù cổng là khái niệm Layer 4, thông báo này được gửi bởi ICMP).
  - `Fragmentation needed`: Gói tin quá lớn cần phân mảnh (khi cờ "Don't Fragment" được đặt).
  - `Packet expiry`: TTL của gói tin đã hết hạn.

### 🛡️ Bảo mật và ICMP

- **Tường lửa chặn ICMP**: Nhiều tường lửa chặn các thông điệp ICMP vì lý do bảo mật.
  - **Rủi ro**: Kẻ tấn công có thể sử dụng ICMP cho các cuộc tấn công như DDoS (ICMP flooding) hoặc thăm dò mạng (backchannel attacks).
- **Hậu quả khi chặn ICMP**:
  - **Không thể Ping/Traceroute**: Các công cụ chẩn đoán mạng cơ bản không hoạt động.
  - **Sự cố TCP Blackhole**: Nếu ICMP "Fragmentation needed" bị chặn, một kết nối TCP có thể được thiết lập thành công (các gói tin bắt tay 3 bước nhỏ), nhưng khi dữ liệu thực sự lớn được gửi đi (và cần phân mảnh), router sẽ không thể gửi thông báo ICMP về việc cần phân mảnh. Client sẽ không nhận được dữ liệu và kết nối bị "treo" (blackhole).

### 🛠️ Công cụ sử dụng ICMP

#### 1. `Ping`

- **Mục đích**: Kiểm tra khả năng kết nối và thời gian phản hồi giữa hai host.
- **Cách hoạt động**:
  1. Gửi gói tin **ICMP Echo Request** đến host đích.
  2. Host đích (nếu hỗ trợ ICMP và không bị chặn) sẽ gửi lại gói tin **ICMP Echo Reply**.
  3. `Ping` tính toán thời gian khứ hồi (Round Trip Time - RTT) và hiển thị TTL.
- **Demo `ping`**:
  - `ping 192.168.254.254` (router của tôi): Hiển thị TTL, kích thước gói tin, và thời gian phản hồi.
  - `ping google.com`: `ping` sẽ tự động thực hiện DNS lookup để tìm địa chỉ IP của `google.com` trước khi gửi ICMP Echo Request.
  - **Quan sát**: TTL cao hơn cho Google.com (vì xa hơn), thời gian phản hồi có thể chậm hơn router cục bộ.

#### 2. `Traceroute` (hoặc `Tracert` trên Windows)

- **Mục đích**: Xác định đường đi (path) mà một gói tin IP đi qua để đến đích, liệt kê tất cả các router (hop) trên đường đi.
- **Cách hoạt động**: Sử dụng cơ chế TTL của gói tin IP và thông điệp ICMP "Packet timed out".
  1. `Traceroute` gửi một chuỗi các gói tin Echo Request đến đích, bắt đầu với **TTL = 1**.
  2. Gói tin đầu tiên (TTL=1) sẽ đến router đầu tiên, TTL giảm xuống 0, router này sẽ hủy gói tin và gửi lại thông báo ICMP "Packet timed out" kèm theo địa chỉ IP của nó cho nguồn.
  3. `Traceroute` ghi lại IP của router đầu tiên, sau đó gửi gói tin tiếp theo với **TTL = 2**.
  4. Gói tin này sẽ vượt qua router đầu tiên (TTL=1), đến router thứ hai, TTL giảm xuống 0. Router thứ hai hủy gói tin và gửi thông báo ICMP.
  5. Quá trình này lặp lại, tăng TTL dần cho đến khi gói tin đến được đích và nhận được ICMP Echo Reply.
- **Hạn chế**:
  - Không phải lúc nào cũng chính xác 100% vì đường đi của gói tin có thể thay đổi.
  - Nếu ICMP bị chặn bởi tường lửa, `traceroute` sẽ hiển thị `* * *` (không thể xác định hop).
- **Demo `traceroute`**:
  - `traceroute 192.168.254.254` (router của tôi): Chỉ hiển thị 1 hop vì router hoạt động như một switch Layer 2 khi giao tiếp trong cùng subnet, không làm giảm TTL.
  - `traceroute 192.168.254.10` (một máy khác trong cùng subnet): Cũng chỉ hiển thị 1 hop.
  - `traceroute google.com`: Hiển thị một chuỗi các hop, bắt đầu từ gateway của bạn và đi qua các router của ISP cho đến mạng của Google.
  - **Quan sát quan trọng**: Khi giao tiếp trong **cùng một mạng con**, TTL của gói tin **không bị ảnh hưởng** bởi router vì router hoạt động ở Layer 2 (switch), không phải Layer 3 (định tuyến).

---

## 📝 Tổng kết

- **IP packet**: Là phương tiện vận chuyển dữ liệu cơ bản, chỉ quan tâm đến IP nguồn và IP đích ở Layer 3.
- **Địa chỉ IP**: Gồm phần mạng và phần host, được chia bởi subnet mask.
- **Subnet Mask**: Dùng để xác định các host trong cùng một mạng con.
- **Default Gateway**: Điểm thoát cho các gói tin ra khỏi mạng con hiện tại.
- **Header IP**: Chứa các thông tin quan trọng như Version, IHL, Total Length, TTL, Protocol, Source/Destination IP và ECN.
- **Fragmentation**: Quá trình chia gói IP lớn thành các mảnh nhỏ hơn để phù hợp với MTU, tiềm ẩn rủi ro.
- **TTL**: Ngăn chặn vòng lặp vô hạn, là cơ sở cho `traceroute`.
- **ECN**: Cơ chế thông báo tắc nghẽn mà không làm rớt gói tin, giúp tối ưu hiệu suất.
- **ICMP**: Giao thức Layer 3 dùng để gửi thông điệp kiểm soát và thông tin (ví dụ: host/port unreachable, packet expiry).
- **Ping và Traceroute**: Các công cụ chẩn đoán mạng sử dụng ICMP.
- **Lưu ý quan trọng**: Việc chặn ICMP bởi tường lửa có thể gây ra các vấn đề nghiêm trọng như **TCP Blackhole**.

Hiểu rõ các nguyên lý cơ bản của IP và ICMP là nền tảng vững chắc để chẩn đoán và giải quyết các vấn đề mạng phức tạp, đặc biệt hữu ích cho kỹ sư backend khi thiết kế và vận hành các ứng dụng phân tán.
