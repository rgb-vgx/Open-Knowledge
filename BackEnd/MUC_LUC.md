# MỤC LỤC — Khóa Fundamentals of Backend Engineering (Hussein Nasser)

> Index các bài blog đã biên soạn từ transcript khóa **Fundamentals of Backend Engineering** (Udemy, giảng viên Hussein Nasser).
> Cấu trúc section theo HTML gốc. Số bài giữ theo numbering HTML trên file `.txt` (các bài 005, 050, 055, 056, 062 không có transcript trong bộ sưu tập).
> Style biên soạn: xem `_STYLE - Blog style guide.md`. Mỗi bài là một file blog tiếng Việt trong thư mục section tương ứng.

**Tổng: 8 section · 59 bài blog**

> Các bài không có transcript (chỉ có tài nguyên/không có bản ghi): 005 Download all slides, 050 When do you use threads?, 055 How I design software, 056 The Journey of a Request to the Backend, 062 Postgres failure caused by a Cisco router (TCP issue).

---

## 01. Introduction

- [001 - Welcome](<01. Introduction/001 - Welcome.md>) — 🚀 Chào mừng đến với Fundamentals of Backend Engineering: Vén bức màn "under the wire"
- [002 - Who Is This Course For](<01. Introduction/002 - Who Is This Course For.md>) — 🎯 Khóa học này dành cho ai? (Khi ứng dụng chạy được nhưng bạn không hiểu vì sao)
- [003 - Course Outline](<01. Introduction/003 - Course Outline.md>) — 🗺️ Toàn cảnh khóa học: Từ design pattern, protocol đến proxy và load balancer
- [004 - Course Notes](<01. Introduction/004 - Course Notes.md>) — 🧠 Lời khuyên sau một năm phát hành: Cứ "ngâm" kiến thức, rồi bạn sẽ thấy mọi thứ đều là first principle

## 02. Backend Communication Design Patterns

- [006 - Communication Patterns Intro](<02. Backend Communication Design Patterns/006 - Communication Patterns Intro.md>) — 🧭 Backend Communication Design Patterns: Những "first principles" mình đúc kết sau 17–18 năm làm backend
- [007 - Request Response](<02. Backend Communication Design Patterns/007 - Request Response.md>) — 🔄 Request/Response: Pattern kinh điển nhất của backend và những chi phí ẩn bên dưới đường truyền
- [008 - Push](<02. Backend Communication Design Patterns/008 - Push.md>) — ⚡ Push: Khi server chủ động đẩy dữ liệu về client — nhanh nhất, nhưng có cái giá
- [009 - Synchronous vs Asynchronous Workloads](<02. Backend Communication Design Patterns/009 - Synchronous vs Asynchronous Workloads.md>) — ⚡ Synchronous vs Asynchronous: Câu hỏi duy nhất quyết định cách backend vận hành
- [010 - Polling](<02. Backend Communication Design Patterns/010 - Polling.md>) — 📊 Polling (hỏi vòng): Pattern giao tiếp đơn giản nhất mà backend nào cũng dùng
- [011 - Long Polling](<02. Backend Communication Design Patterns/011 - Long Polling.md>) — 🔁 Long Polling (hỏi vòng kéo dài): Bí quyết Kafka dùng để không "làm phiền" backend
- [012 - Server-Sent Events](<02. Backend Communication Design Patterns/012 - Server-Sent Events.md>) — 📡 Server-Sent Events: Một Request, Nhưng Phản Hồi Không Bao Giờ Kết Thúc
- [013 - Publish-Subscribe](<02. Backend Communication Design Patterns/013 - Publish-Subscribe.md>) — 📬 Publish-Subscribe: Upload Xong Là Xong, Phần Còn Lại Giao Cho Broker
- [014 - Multiplexing vs Demultiplexing](<02. Backend Communication Design Patterns/014 - Multiplexing vs Demultiplexing.md>) — 🔀 Multiplexing vs Demultiplexing: Gộp Kênh, Tách Kênh và Nghệ Thuật Connection Pooling
- [015 - Stateful vs Stateless](<02. Backend Communication Design Patterns/015 - Stateful vs Stateless.md>) — 🧠 Stateful vs Stateless: Đừng Học Định Nghĩa, Hãy Nhìn Hệ Quả
- [016 - Sidecar Pattern](<02. Backend Communication Design Patterns/016 - Sidecar Pattern.md>) — 🚗 Sidecar Pattern: Nâng Cấp Giao Thức Mà Không Đổi Một Dòng Code

## 03. Protocols

- [017 - Protocols Intro](<03. Protocols/017 - Protocols Intro.md>) — 🗺️ Protocols Intro: Mở màn chương Giao thức — tấm bản đồ trước khi lặn sâu
- [018 - Protocol Properties](<03. Protocols/018 - Protocol Properties.md>) — 🧬 Protocol Properties: Bộ thuộc tính của mọi giao thức — và vì sao đừng học vẹt chúng
- [019 - OSI Model](<03. Protocols/019 - OSI Model.md>) — 🪆 OSI Model: Bảy tầng của mọi kết nối — tấm bản đồ bạn phải đọc được
- [020 - Internet Protocol](<03. Protocols/020 - Internet Protocol.md>) — 🌐 Internet Protocol: Bóc Tách "Chiếc Xe Chở Hàng" Của Toàn Bộ Internet
- [021 - UDP](<03. Protocols/021 - UDP.md>) — 📬 UDP: Giao Thức Datagram Siêu Gọn — Gửi Xong, Không Cần Biết Đã Tới Hay Chưa
- [022 - TCP](<03. Protocols/022 - TCP.md>) — 🔗 TCP — Giao thức truyền tin cậy: Ba cái bắt tay, cửa sổ trượt và cả bộ máy bên dưới
- [023 - TLS](<03. Protocols/023 - TLS.md>) — 🔐 TLS — Bảo mật tầng vận chuyển: Từ HTTP "trần trụi" tới bắt tay mã hóa một roundtrip
- [024 - HTTP 1.1](<03. Protocols/024 - HTTP 1.1.md>) — 🌐 HTTP/1.1: Giao thức "đơn giản đến mức khó thay thế" đã sống qua bao thế hệ
- [025 - HTTPS TLS Keys and Certificates](<03. Protocols/025 - HTTPS TLS Keys and Certificates.md>) — 🛡️ HTTPS, TLS, Keys và Certificates: Chuyện gì thực sự xảy ra sau ổ khóa trên thanh địa chỉ?
- [026 - WebSockets](<03. Protocols/026 - WebSockets.md>) — 🔌 WebSockets: Kênh hai chiều thời gian thực được xây trên nền HTTP
- [027 - HTTP2](<03. Protocols/027 - HTTP2.md>) — ⚡ HTTP/2: Ghép kênh trên một kết nối TCP và cái giá phải trả
- [028 - HTTP3](<03. Protocols/028 - HTTP3.md>) — 🚀 HTTP/3 và QUIC: Thay TCP bằng UDP để "cứu" web khỏi head-of-line blocking
- [029 - gRPC](<03. Protocols/029 - gRPC.md>) — 🔧 gRPC: Khi một protocol cố "thống trị" mọi giao tiếp client - server
- [030 - WebRTC](<03. Protocols/030 - WebRTC.md>) — 🎥 WebRTC: Hiểu tận gốc video call thời gian thực — SDP, ICE, STUN, TURN và bài demo trên trình duyệt

## 04. Many ways to HTTPS

- [031 - HTTPS Communication Basics Intro](<04. Many ways to HTTPS/031 - HTTPS Communication Basics Intro.md>) — 🌐 Many Ways to HTTPS: Ba Trụ Cột Của Mọi Kết Nối Web
- [032 - HTTPS over TCP with TLS 1.2](<04. Many ways to HTTPS/032 - HTTPS over TCP with TLS 1.2.md>) — 🔐 HTTPS over TCP với TLS 1.2: Hai Chuyến Bắt Tay Cổ Điển
- [033 - HTTPS over TCP with TLS 1.3](<04. Many ways to HTTPS/033 - HTTPS over TCP with TLS 1.3.md>) — ⚡ HTTPS over TCP với TLS 1.3: Bớt Hẳn Một Vòng Khứ Hồi
- [034 - HTTPS over QUIC HTTP3](<04. Many ways to HTTPS/034 - HTTPS over QUIC HTTP3.md>) — 🚀 HTTPS over QUIC (HTTP/3): Kết Nối Và Mã Hóa Gộp Trong Một Vòng Khứ Hồi
- [035 - HTTPS over TFO with TLS 1.3](<04. Many ways to HTTPS/035 - HTTPS over TFO with TLS 1.3.md>) — 🍪 HTTPS over TFO (TCP Fast Open) với TLS 1.3: Ý Tưởng Lý Thuyết Mình Tự Nghĩ Ra
- [036 - HTTPS over TCP with TLS 1.3 and 0RTT](<04. Many ways to HTTPS/036 - HTTPS over TCP with TLS 1.3 and 0RTT.md>) — 🏎️ HTTPS over TCP với TLS 1.3 và 0-RTT: Gửi Request Trong Cùng Hơi Thở
- [037 - HTTPS over QUIC with 0RTT](<04. Many ways to HTTPS/037 - HTTPS over QUIC with 0RTT.md>) — 🥇 HTTPS over QUIC với 0-RTT: Cách Nhanh Nhất Có Thể, Và Chỉ Cloudflare Làm Được

## 05. Backend Execution Patterns

- [038 - Backend Execution Patterns Intro](<05. Backend Execution Patterns/038 - Backend Execution Patterns Intro.md>) — 🔥 Backend Execution Patterns: Bước vào nơi backend thật sự "chạy"
- [039 - The Process, The Thread and CPU Time](<05. Backend Execution Patterns/039 - The Process, The Thread and CPU Time.md>) — 🧠 Process và Thread: Cuộc chiến giành từng mili-giây CPU
- [040 - How the Backend Accepts Connections](<05. Backend Execution Patterns/040 - How the Backend Accepts Connections.md>) — 📬 Backend Accept Connection Như Thế Nào? Hành Trình Từ SYN Đến File Descriptor
- [041 - Reading and Sending Socket Data](<05. Backend Execution Patterns/041 - Reading and Sending Socket Data.md>) — 📖 Đọc và Gửi Dữ Liệu Trên Socket: Chặng Cuối Trước Khi Request Chạm Tới Code Của Bạn
- [042 - The Listener, the Acceptor and the Reader](<05. Backend Execution Patterns/042 - The Listener, the Acceptor and the Reader.md>) — 🎭 Listener, Acceptor và Reader: Bộ Ba Vai Diễn Không Thể Tách Rời Trong Backend
- [043 - Single Listener, Acceptor and Reader](<05. Backend Execution Patterns/043 - Single Listener, Acceptor and Reader.md>) — 🧵 Single Listener, Acceptor and Reader: Kiến Trúc Một Thread "Cân" Mọi Connection Của Node.js
- [044 - Single Listener, Acceptor and Multiple Readers](<05. Backend Execution Patterns/044 - Single Listener, Acceptor and Multiple Readers.md>) — 👥 Single Listener, Acceptor và Multiple Readers: Chia Việc Đọc Cho Nhiều Thread
- [045 - Message Load Balancing Pattern](<05. Backend Execution Patterns/045 - Message Load Balancing Pattern.md>) — 📨 Message Load Balancing: Kiến Trúc "Công Bằng Thật Sự" Của RAMCloud
- [046 - Multiple Accepter Threads on a Single Socket](<05. Backend Execution Patterns/046 - Multiple Accepter Threads on a Single Socket.md>) — 🔒 Multiple Accepter Threads Trên Một Socket: Nginx Và Nghệ Thuật Accept Mutex
- [047 - Socket Sharding](<05. Backend Execution Patterns/047 - Socket Sharding.md>) — 🧷 Socket Sharding: Nhiều Listener Cùng Một Port Và Cú Trick Đẹp Của Linux Kernel
- [048 - Backend Idempotency](<05. Backend Execution Patterns/048 - Backend Idempotency.md>) — ♻️ Backend Idempotency: Vì Sao Một Cú Retry Có Thể Khiến Bạn Bị Tính Tiền Hai Lần
- [049 - Nagle's Algorithm](<05. Backend Execution Patterns/049 - Nagle's Algorithm.md>) — 🐢 Nagle's Algorithm: Thủ Phạm Của Những Độ Trễ "Không Có Lý Do" Trong App

## 06. Proxying and Load Balancing

- [051 - Proxy vs Reverse Proxy](<06. Proxying and Load Balancing/051 - Proxy vs Reverse Proxy.md>) — 🔀 Proxy và Reverse Proxy: Hai khái niệm nền tảng mà mọi backend engineer phải nằm lòng
- [052 - Layer 4 vs Layer 7 Load Balancers](<06. Proxying and Load Balancing/052 - Layer 4 vs Layer 7 Load Balancers.md>) — ⚖️ Layer 4 vs Layer 7 Load Balancer: Hiểu sai một tầng là trả giá cả hệ thống
- [053 - WebSocket Proxying](<06. Proxying and Load Balancing/053 - WebSocket Proxying.md>) — 🔌 WebSocket Proxying: Khi Layer 4 và Layer 7 "đối đầu" qua một đường hầm hai chiều

## 07. Extras

- [054 - How ChatGPT Uses Server-Sent Events](<07. Extras/054 - How ChatGPT Uses Server-Sent Events.md>) — 🧠 ChatGPT "nhả chữ" từng token như thế nào? Mổ xẻ Server-Sent Events từ A tới Z
- [057 - The Journey of a Request to the Backend](<07. Extras/057 - The Journey of a Request to the Backend.md>) — 🚀 Hành trình của một request từ Front-end tới Back-end: 6 bước mà không ai nghĩ là phải trả giá
- [058 - JWT Pros and Cons](<07. Extras/058 - JWT Pros and Cons.md>) — 🔐 JWT — "Viên đạn bạc" của xác thực stateless và cái giá không hề rẻ
- [059 - SELECT COUNT Performance](<07. Extras/059 - SELECT COUNT Performance.md>) — 📊 SELECT COUNT(*) — Thao tác tưởng vô hại nhưng có thể bóp nghẹt backend của bạn

## 08. Bonus Content

- [060 - How the Kernel Manages Connections](<08. Bonus Content/060 - How the Kernel Manages Connections.md>) — 🧠 Kernel quản lý connection backend như thế nào? Mổ xẻ SYN queue và accept queue
- [061 - Running Out of TCP Ports](<08. Bonus Content/061 - Running Out of TCP Ports.md>) — 🌐 Hết cổng TCP: câu chuyện thật về ephemeral ports và cú "đơ" của web server
- [063 - Building Secure Backend Applications with OWASP](<08. Bonus Content/063 - Building Secure Backend Applications with OWASP.md>) — 🛡️ Xây backend an toàn: 10 rủi ro bảo mật OWASP mà mọi developer nên nằm lòng
- [064 - HTTP Graceful Connection Shutdown](<08. Bonus Content/064 - HTTP Graceful Connection Shutdown.md>) — 🚦 HTTP Graceful Connection Shutdown: cách server tạm biệt client một cách êm ái
