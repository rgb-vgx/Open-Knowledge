---
title: 'Fundamentals of Backend 10: Multiplexing và Demultiplexing: Tối ưu hóa Kết
  nối trong Kiến trúc Backend'
date: '2025-12-07 21:18:21'
date_gmt: '2025-12-07 14:18:21'
modified: '2026-01-21 15:24:01'
status: publish
slug: multiplexing-va-demultiplexing-toi-uu-hoa-ket-noi-trong-kien-truc-backend
wordpress_id: 610
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/07/multiplexing-va-demultiplexing-toi-uu-hoa-ket-noi-trong-kien-truc-backend/
categories:
- Back End
tags: []
---

**Multiplexing** và **Demultiplexing** là các thuật ngữ cốt lõi trong viễn thông và mạng máy tính, mô tả cách chúng ta quản lý việc truyền tải nhiều luồng dữ liệu qua một kênh vật lý giới hạn.

## 1. Khái niệm Cốt lõi

### 1.1. Multiplexing (Ghép kênh)

**Multiplexing** là quá trình lấy nhiều tín hiệu hoặc luồng dữ liệu (Input Streams) và kết hợp chúng thành một tín hiệu hoặc luồng dữ liệu duy nhất (Single Output Channel) để truyền tải.

- **Ví dụ:** Giống như việc gộp nhiều dòng xe (nhiều yêu cầu) vào một đường cao tốc duy nhất (một kết nối TCP).
- **Ứng dụng:** Trong giao thức **HTTP/2**, nhiều yêu cầu (Streams) từ Client được gộp lại và truyền qua một kết nối TCP duy nhất đến Server.

### 1.2. Demultiplexing (Tách kênh)

**Demultiplexing** là quá trình ngược lại: Tách luồng dữ liệu duy nhất đã được ghép kênh thành lại các luồng dữ liệu ban đầu (Multiple Output Streams) để phân phối đến các đích khác nhau.

- **Ví dụ:** Khi dữ liệu đến Server, Server phải tách luồng dữ liệu HTTP/2 duy nhất đó thành các yêu cầu riêng lẻ để xử lý bởi các ứng dụng Backend khác nhau.
- **Ứng dụng:** Xảy ra ở phía Server/Proxy.

## 2. Ứng dụng trong Giao thức HTTP

### HTTP/1.1 (Demultiplexing ở Client)

Trong HTTP/1.1, mỗi yêu cầu (Request) thường đòi hỏi một kết nối TCP mới.

- **Cơ chế:** Khi Client (ví dụ: trình duyệt Chrome) cần gửi 3 yêu cầu (tải CSS, JS, Image), nó sẽ mở **3 kết nối TCP** vật lý khác nhau đến Server.
- **Vấn đề:** Do giới hạn của trình duyệt (thường là **6 kết nối** đồng thời trên mỗi tên miền), việc sử dụng quá nhiều kết nối có thể gây ra hiện tượng **đói tài nguyên (Resource Starvation)** cho các yêu cầu khác (như trong ví dụ **Server-Sent Events** hoặc **Long Polling** đã học). Các yêu cầu mới sẽ bị **chặn (blocked)** cho đến khi một trong 6 kết nối đó được giải phóng.

### HTTP/2 (Multiplexing)

HTTP/2 được thiết kế để giải quyết các hạn chế của HTTP/1.1 thông qua Multiplexing.

- **Cơ chế:** Client chỉ thiết lập **MỘT (Single)** kết nối TCP. Tất cả các yêu cầu từ Client được **Multiplex** thành các **Streams** và gửi qua kết nối duy nhất đó.
- **Lợi ích:** Loại bỏ vấn đề giới hạn 6 kết nối, cho phép hàng trăm luồng dữ liệu chạy đồng thời trên cùng một kết nối, giảm độ trễ và tăng hiệu suất.
- **Chi phí:** Việc gộp và tách luồng dữ liệu (Parsing) yêu cầu CPU của Server phải làm việc nhiều hơn so với HTTP/1.1, nơi các kết nối TCP đã tự nhiên phân tách luồng dữ liệu.

## 3. Multiplexing trong Kiến trúc Backend

Multiplexing và Demultiplexing không chỉ xảy ra ở cấp độ giao thức mà còn ở cấp độ kiến trúc dịch vụ.

### 3.1. Reverse Proxy (Envoy/Nginx)

Trong một kiến trúc Microservices điển hình:

- **Frontend-to-Proxy (Có thể là H/1.1):** Client mở nhiều kết nối H/1.1 (Demultiplexing) đến Reverse Proxy.
- **Proxy-to-Backend (Thường là H/2):** Proxy sau đó **Multiplex** tất cả các yêu cầu đó vào **MỘT** kết nối HTTP/2 duy nhất đến Server Backend (để tiết kiệm tài nguyên kết nối Backend).

### 3.2. Connection Pooling (Demultiplexing)

**Connection Pooling** là một kỹ thuật Demultiplexing được sử dụng rộng rãi, đặc biệt khi kết nối với Database (như PostgreSQL).

- **Mục tiêu:** Tránh lãng phí thời gian và tài nguyên để thiết lập/đóng nhiều kết nối TCP/DB mới cho mỗi request HTTP đến.
- **Cơ chế:**
  1. Server Backend (Web Server) mở sẵn một **Pool (hồ bơi)** gồm $N$ kết nối đến Database và giữ chúng "nóng" (hot/idle).
  2. Khi một yêu cầu HTTP đến và cần truy vấn DB, nó sẽ lấy một kết nối **đang rảnh (idle)** từ Pool.
  3. Các yêu cầu HTTP khác sẽ lấy các kết nối rảnh tiếp theo.
- **Demultiplexing:** Nhiều yêu cầu HTTP (một "luồng" đầu vào) được phân phối (Demultiplex) đến nhiều kết nối DB rảnh (nhiều "luồng" đầu ra).
- **Vấn đề:** Nếu tất cả $N$ kết nối trong Pool đều đang bận, các yêu cầu DB mới sẽ bị **chặn** và phải chờ cho đến khi một kết nối được giải phóng (sau khi nhận được phản hồi DB và trả lời Client).

#### Về việc gửi nhiều Query trên một Kết nối DB

Như đã đề cập, việc gửi nhiều truy vấn SQL (Query Pipelining) trên cùng một kết nối DB mà không chờ phản hồi giữa các truy vấn là một chủ đề phức tạp:

- Nếu không có cơ chế gắn thẻ (tagging) đặc biệt, Server Backend sẽ không thể phân biệt được phản hồi nào thuộc về truy vấn nào, vì thứ tự xử lý của DB Server không được đảm bảo.
- Các phiên bản mới hơn của DB (ví dụ: PostgreSQL 14+) đã bắt đầu hỗ trợ **Pipelining**, cho phép Client gửi nhiều truy vấn mà không cần chờ đợi, và DB Server đảm bảo phản hồi trả về đúng thứ tự.

## 4. Tóm tắt

Hiểu rõ **Multiplexing** và **Demultiplexing** giúp các kỹ sư Backend đưa ra quyết định kiến trúc tốt hơn:

- **Sử dụng HTTP/2:** Khắc phục tắc nghẽn giao thức HTTP/1.1 bằng cách **Multiplex** streams.
- **Sử dụng Connection Pooling:** Tối ưu hóa việc sử dụng tài nguyên DB bằng cách **Demultiplex** các yêu cầu đến trên các kết nối DB đã mở sẵn.
