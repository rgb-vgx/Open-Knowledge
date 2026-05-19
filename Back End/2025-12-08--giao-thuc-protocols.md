---
title: 'Fundamentals of Backend 13: Giao thức (Protocols)'
date: '2025-12-08 00:19:52'
date_gmt: '2025-12-07 17:19:52'
modified: '2026-01-21 15:23:54'
status: publish
slug: giao-thuc-protocols
wordpress_id: 620
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/08/giao-thuc-protocols/
categories:
- Back End
tags: []
---

**Giao thức (Protocol)** là một **hệ thống các quy tắc** cho phép hai hoặc nhiều bên giao tiếp với nhau một cách thống nhất và có trật tự. Khi thiết kế hoặc lựa chọn một giao thức, các kỹ sư cần xem xét các thuộc tính sau.

## 1. Mục đích và Vấn đề Giải quyết

Mỗi giao thức đều được tạo ra để giải quyết một vấn đề cụ thể, thường là do giới hạn của các giao thức tiền nhiệm.

- **Ví dụ:** **HTTP/2** được phát triển để giải quyết sự chậm chạp và tắc nghẽn của **HTTP/1.1** bằng cách giới thiệu **Multiplexing** và giao thức nhị phân (Binary Framing).
- **Ví dụ:** **TCP** được thiết kế để cung cấp sự **đáng tin cậy (Reliable Delivery)** trên một mạng không đáng tin cậy.

## 2. Các Thuộc tính Thiết kế Chính

### 2.1. Định dạng Dữ liệu (Data Format)

Cách dữ liệu được mã hóa để truyền qua dây dẫn.

- **Text-Based (Dạng Văn bản):** Dễ đọc và gỡ lỗi (debug) cho con người.
  - **Ví dụ:** **HTTP/1.1** (Headers và Body là văn bản), JSON, XML, SMTP.
- **Binary (Dạng Nhị phân):** Khó đọc nhưng **hiệu quả** hơn về mặt truyền tải (ít byte hơn) và xử lý (máy tính không cần phân tích cú pháp chuỗi phức tạp).
  - **Ví dụ:** **HTTP/2, HTTP/3, gRPC, Protocol Buffers, RESP** (Redis Serialization Protocol).

### 2.2. Chế độ Truyền tải (Transfer Mode)

Cách các đơn vị dữ liệu được phân chia và gửi đi.

- **Message-Based (Dựa trên Thông điệp):** Dữ liệu được truyền dưới dạng các khối rời rạc, có **điểm bắt đầu và kết thúc** rõ ràng (ví dụ: một Request HTTP, một DNS Query).
  - **Ví dụ:** **HTTP, UDP, DNS.**
- **Stream-Based (Dựa trên Luồng):** Dữ liệu được coi là một chuỗi byte liên tục, không có ranh giới logic rõ ràng.
  - **Ví dụ:** **TCP**. (Client/Server phải tự mình phân tích luồng byte TCP để xác định nơi một tin nhắn/request bắt đầu và kết thúc).

### 2.3. Hệ thống Địa chỉ (Addressing System)

Cách xác định nguồn gốc và điểm đến của dữ liệu.

- **Layer 7 (Application):** Tên miền (DNS) - `www.google.com`.
- **Layer 3 (Internet):** Địa chỉ IP - `192.168.1.1`.
- **Layer 2 (Data Link):** Địa chỉ MAC (dùng để định tuyến trong mạng cục bộ).

### 2.4. Tính Trạng thái (Statefulness)

Mức độ phụ thuộc vào thông tin được lưu trữ giữa các lần giao tiếp.

- **Stateful:** Lưu trữ trạng thái và phụ thuộc vào nó (ví dụ: **TCP** duy trì trạng thái kết nối, số thứ tự).
- **Stateless:** Không lưu trữ trạng thái giữa các lần giao tiếp (ví dụ: **UDP, HTTP** yêu cầu mọi thông tin cần thiết phải được gửi kèm theo mỗi Request).

### 2.5. Định hướng (Directionality)

Khả năng truyền dữ liệu giữa hai bên.

- **Unidirectional:** Dữ liệu chỉ đi theo một chiều.
- **Half Duplex:** Dữ liệu có thể đi cả hai chiều, nhưng không thể xảy ra đồng thời (ví dụ: Wi-Fi truyền thống).
- **Full Duplex/Bidirectional:** Dữ liệu có thể truyền song song và đồng thời cả hai chiều (ví dụ: **WebSockets, TCP, HTTP/2 Streams**).

### 2.6. Khả năng Điều khiển (Control and Reliability)

Các cơ chế được tích hợp để quản lý luồng và đảm bảo tính toàn vẹn của dữ liệu.

- **Flow Control (Điều khiển Luồng):** Ngăn người gửi áp đảo người nhận bằng cách kiểm soát tốc độ gửi.
- **Congestion Control (Điều khiển Tắc nghẽn):** Giảm tốc độ gửi khi phát hiện mạng bị tắc nghẽn (đặc trưng của **TCP**).
- **Reliable Delivery (Phân phối Đáng tin cậy):** Đảm bảo dữ liệu đến nơi, đúng thứ tự, không bị mất hoặc trùng lặp (ví dụ: **TCP** sử dụng **Retransmission** và **Acknowledgements (ACKs)**). **UDP** thì không.

### 2.7. Quản lý Lỗi (Error Management)

Các quy tắc xử lý khi giao tiếp không thành công.

- **Error Codes:** Mã lỗi tiêu chuẩn (ví dụ: Mã trạng thái HTTP 4xx, 5xx).
- **Timeout & Retry Logic:** Giao thức có quy định về thời gian chờ và việc thử gửi lại tự động hay không.

---

Việc hiểu rõ các thuộc tính này sẽ giúp bạn phân tích được lý do tại sao các giao thức như **TCP, UDP, HTTP/2, và gRPC** lại được thiết kế theo những cách khác nhau và áp dụng chúng một cách hiệu quả trong kiến trúc của mình.
