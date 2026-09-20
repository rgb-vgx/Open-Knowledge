# MỤC LỤC — Khóa Mastering System Design: From Basics to Cracking Interviews (Rahul Singh)

> Index các bài blog đã biên soạn từ transcript khóa **Mastering System Design: From Basics to Cracking Interviews** (Udemy, giảng viên Rahul Singh).
> Cấu trúc section theo HTML gốc. Numbering 001–128 khớp hoàn toàn giữa HTML và transcript (không có bài thiếu, không có quiz/resource riêng).
> Style biên soạn: xem `_STYLE - Blog style guide.md`. Mỗi bài là một file blog tiếng Việt trong thư mục section tương ứng.

**Tổng: 25 section · 128 bài blog**

> Ghi chú: folder section 14 được đặt tên `Design a News Feed (Twitter-Instagram)` thay cho `(Twitter/Instagram)` vì ký tự `/` không hợp lệ trong tên thư mục Windows. Khóa không có bài nào không có transcript và không có quiz của Udemy.

---

## 01. Introduction

- [001 - Welcome](<01. Introduction/001 - Welcome.md>) — 🏗️ Chào mừng đến với Mastering System Design — Từ nền tảng đến chinh phục phỏng vấn
- [002 - What is System Design](<01. Introduction/002 - What is System Design.md>) — 🏗️ System Design là gì? Bản thiết kế của hệ thống trước khi viết code
- [003 - Why System Design Matters](<01. Introduction/003 - Why System Design Matters.md>) — 💡 Vì sao System Design quan trọng — và vì sao không chỉ để đi phỏng vấn
- [004 - Evolution of System Design](<01. Introduction/004 - Evolution of System Design.md>) — 🕰️ 25 năm tiến hóa của System Design — từ monolith đến edge computing
- [005 - How This Course is Structured](<01. Introduction/005 - How This Course is Structured.md>) — 🗺️ Khóa học này được cấu trúc thế nào và vì sao lại theo thứ tự đó?
- [006 - Navigate This Course Effectively](<01. Introduction/006 - Navigate This Course Effectively.md>) — 🧭 Học khóa này sao cho hiệu quả — những lời khuyên trước khi bắt đầu

## 02. Networking & Communication (System Design Fundamentals)

- [007 - Introduction to Networking](<02. Networking & Communication (System Design Fundamentals)/007 - Introduction to Networking.md>) — 🌐 Networking trong System Design — lớp kết nối làm nên mọi hệ thống phân tán
- [008 - Understanding IP Addresses](<02. Networking & Communication (System Design Fundamentals)/008 - Understanding IP Addresses.md>) — 🧭 IP Address — "danh tính" của mọi thiết bị trên mạng
- [009 - How DNS Works](<02. Networking & Communication (System Design Fundamentals)/009 - How DNS Works.md>) — 🗺️ DNS hoạt động thế nào — "danh bạ" của toàn bộ internet
- [010 - Client-Server Model Explained](<02. Networking & Communication (System Design Fundamentals)/010 - Client-Server Model Explained.md>) — 🤝 Client-Server Model — mô hình nền móng của mọi hệ thống hiện đại
- [011 - Forward Proxy vs Reverse Proxy](<02. Networking & Communication (System Design Fundamentals)/011 - Forward Proxy vs Reverse Proxy.md>) — 🚪 Forward Proxy vs Reverse Proxy — cùng là "trung gian", khác hẳn bài toán
- [012 - Introduction to Load Balancing](<02. Networking & Communication (System Design Fundamentals)/012 - Introduction to Load Balancing.md>) — ⚖️ Load Balancing — khi một máy chủ không còn đủ
- [013 - What is an API Gateway](<02. Networking & Communication (System Design Fundamentals)/013 - What is an API Gateway.md>) — 🚪 API Gateway — "cửa trước" của hệ thống microservices
- [014 - Content Delivery Networks (CDN)](<02. Networking & Communication (System Design Fundamentals)/014 - Content Delivery Networks (CDN).md>) — 🌍 CDN — đưa nội dung đến gần người dùng hơn
- [015 - Networking Fundamentals Summary](<02. Networking & Communication (System Design Fundamentals)/015 - Networking Fundamentals Summary.md>) — 🏁 Tổng kết Networking & Communication — khi các mảnh ghép khớp vào nhau

## 03. Protocols (System Design Fundamentals)

- [016 - Introduction to Protocols](<03. Protocols (System Design Fundamentals)/016 - Introduction to Protocols.md>) — 🧭 Bắt đầu với Protocols — giao tiếp là nền tảng của mọi hệ phân tán
- [017 - TCP and UDP](<03. Protocols (System Design Fundamentals)/017 - TCP and UDP.md>) — 🔌 TCP và UDP — Bài toán cân bằng giữa độ tin cậy và tốc độ
- [018 - HTTP Backbone of the Web](<03. Protocols (System Design Fundamentals)/018 - HTTP Backbone of the Web.md>) — 🌐 HTTP — Xương sống của web và nền tảng của mọi API
- [019 - REST and RESTfulness](<03. Protocols (System Design Fundamentals)/019 - REST and RESTfulness.md>) — 🧩 REST và RESTfulness — Nguyên tắc thiết kế API bền vững
- [020 - Real-Time Communication Protocols](<03. Protocols (System Design Fundamentals)/020 - Real-Time Communication Protocols.md>) — ⚡ Giao tiếp thời gian thực — WebSocket và long polling
- [021 - Modern API Protocols Beyond REST](<03. Protocols (System Design Fundamentals)/021 - Modern API Protocols Beyond REST.md>) — 🚀 Vượt xa REST — gRPC và GraphQL trong hệ phân tán hiện đại
- [022 - Summary and Practical Applications](<03. Protocols (System Design Fundamentals)/022 - Summary and Practical Applications.md>) — 🎓 Tổng kết Protocols — chọn đúng giao thức cho đúng bài toán

## 04. Architectural Patterns (System Design Fundamentals)

- [023 - Introduction to Architectural Patterns](<04. Architectural Patterns (System Design Fundamentals)/023 - Introduction to Architectural Patterns.md>) — 🗺️ Bước vào chuyên đề Architectural Patterns — khi kiến trúc định hình vận mệnh hệ thống
- [024 - Software Architecture Patterns and Styles](<04. Architectural Patterns (System Design Fundamentals)/024 - Software Architecture Patterns and Styles.md>) — 🏛️ Các mẫu kiến trúc phần mềm phổ biến — và vì sao không có lựa chọn nào "tốt nhất"
- [025 - Multi-Tier Architecture](<04. Architectural Patterns (System Design Fundamentals)/025 - Multi-Tier Architecture.md>) — 🏢 Kiến trúc Multi-Tier: từ two-tier đến N-tier và những đánh đổi để mở rộng
- [026 - Microservices Architecture](<04. Architectural Patterns (System Design Fundamentals)/026 - Microservices Architecture.md>) — 🧩 Microservices Architecture — tự chủ để mở rộng, và cái giá của hệ phân tán
- [027 - Event-Driven Architecture](<04. Architectural Patterns (System Design Fundamentals)/027 - Event-Driven Architecture.md>) — 🔔 Event-Driven Architecture — thiết kế hệ thống quanh những gì đã xảy ra
- [028 - Summary and Practical Applications](<04. Architectural Patterns (System Design Fundamentals)/028 - Summary and Practical Applications.md>) — 🎓 Tổng kết Architectural Patterns — chọn đúng kiến trúc, không chọn "hay nhất"

## 05. Web Concepts in System Design (System Design Fundamentals)

- [029 - Introduction to Web Concepts](<05. Web Concepts in System Design (System Design Fundamentals)/029 - Introduction to Web Concepts.md>) — 🌐 Web Concepts — Nền tảng nằm sau mọi ứng dụng hiện đại
- [030 - Web Sessions and State Management](<05. Web Concepts in System Design (System Design Fundamentals)/030 - Web Sessions and State Management.md>) — 🍪 Web Sessions — Cách ứng dụng "nhớ" bạn khi HTTP không hề có bộ nhớ
- [031 - Serialization and Data Formats](<05. Web Concepts in System Design (System Design Fundamentals)/031 - Serialization and Data Formats.md>) — 🔄 Serialization — Ngôn ngữ chung để mọi hệ thống trao đổi dữ liệu
- [032 - CORS and Web Security](<05. Web Concepts in System Design (System Design Fundamentals)/032 - CORS and Web Security.md>) — 🔐 CORS — Cách trình duyệt cân bằng giữa bảo mật và kết nối
- [033 - Summary and Practical Applications](<05. Web Concepts in System Design (System Design Fundamentals)/033 - Summary and Practical Applications.md>) — 🧭 Tổng kết Web Concepts — Từ nền tảng đến ứng dụng thực tế

## 06. Scalability in System Design

- [034 - Introduction to Scalability](<06. Scalability in System Design/034 - Introduction to Scalability.md>) — 📈 Scalability — Khi thành công trở thành bài toán tăng trưởng
- [035 - Scaling Strategies](<06. Scalability in System Design/035 - Scaling Strategies.md>) — ⚖️ Scaling Strategies — Vertical, Horizontal và Diagonal
- [036 - Understanding Load Balancers](<06. Scalability in System Design/036 - Understanding Load Balancers.md>) — 🎯 Load Balancer — Trái tim của kiến trúc mở rộng và sẵn sàng cao
- [037 - Autoscaling and Cloud Best Practices](<06. Scalability in System Design/037 - Autoscaling and Cloud Best Practices.md>) — 🔁 Auto-scaling — Tự động co giãn hạ tầng theo nhu cầu
- [038 - Summary and Final Thoughts](<06. Scalability in System Design/038 - Summary and Final Thoughts.md>) — 🧭 Tổng kết Scalability — Khi hệ thống lớn lên mà không hóa điểm nghẽn

## 07. Storage - Database and Storage

- [039 - Introduction to Storage and CAP Theorem](<07. Storage - Database and Storage/039 - Introduction to Storage and CAP Theorem.md>) — 🗄️ Storage và CAP Theorem — nền móng dữ liệu của mọi hệ thống lớn
- [040 - SQL vs NoSQL Database Models](<07. Storage - Database and Storage/040 - SQL vs NoSQL Database Models.md>) — 🗃️ SQL vs NoSQL — hai triết lý database và cách chọn đúng cho hệ thống
- [041 - Sharding Replication and Polyglot Persistence](<07. Storage - Database and Storage/041 - Sharding Replication and Polyglot Persistence.md>) — 🧩 Sharding, Replication và Polyglot Persistence — bộ ba giúp database scale
- [042 - Object Storage in Modern Systems](<07. Storage - Database and Storage/042 - Object Storage in Modern Systems.md>) — 📦 Object Storage — trụ cột lưu trữ phi cấu trúc của cloud hiện đại
- [043 - File Systems and Distributed Storage](<07. Storage - Database and Storage/043 - File Systems and Distributed Storage.md>) — 🗂️ File Systems và Distributed Storage — từ một máy đến cả cluster
- [044 - Big Data Fundamentals](<07. Storage - Database and Storage/044 - Big Data Fundamentals.md>) — 📊 Big Data Fundamentals — khi dữ liệu vượt khỏi tầm với của hệ thống truyền thống
- [045 - Choosing the Right Storage Solution](<07. Storage - Database and Storage/045 - Choosing the Right Storage Solution.md>) — 🎓 Tổng kết Storage — tư duy chọn đúng giải pháp lưu trữ

## 08. Performance - Concepts, Tools & Techniques

- [046 - Introduction to System Performance](<08. Performance - Concepts, Tools & Techniques/046 - Introduction to System Performance.md>) — 🚀 Hiệu năng hệ thống: Khi "chạy được" là chưa đủ
- [047 - Caching for Speed Optimization](<08. Performance - Concepts, Tools & Techniques/047 - Caching for Speed Optimization.md>) — ⚡ Caching: Bí quyết giúp hệ thống nhanh hơn và database "thở phào"
- [048 - Messaging Queues for Decoupling](<08. Performance - Concepts, Tools & Techniques/048 - Messaging Queues for Decoupling.md>) — 📨 Messaging & Queues: Tách rời dịch vụ để mở rộng và chống chịu tốt hơn
- [049 - Concurrency and Parallelism](<08. Performance - Concepts, Tools & Techniques/049 - Concurrency and Parallelism.md>) — 🧵 Concurrency và Parallelism: Hai khái niệm "sinh đôi" giải quyết hai bài toán khác nhau
- [050 - Database Performance Optimization](<08. Performance - Concepts, Tools & Techniques/050 - Database Performance Optimization.md>) — ⚡ Tối ưu hiệu năng database: Bộ kỹ thuật architect cần nắm để hệ thống scale bền vững
- [051 - Summary and Recap Performance](<08. Performance - Concepts, Tools & Techniques/051 - Summary and Recap Performance.md>) — 🎓 Nhìn lại chặng Performance: Hiệu năng không đến từ một tối ưu duy nhất

## 09. Reliability, Availability & Disaster Recovery

- [052 - Introduction to System Reliability](<09. Reliability, Availability & Disaster Recovery/052 - Introduction to System Reliability.md>) — 🛡️ Introduction to System Reliability — vì sao "không bao giờ lỗi" là mục tiêu sai lầm
- [053 - High Availability Fault Tolerance and Failover](<09. Reliability, Availability & Disaster Recovery/053 - High Availability Fault Tolerance and Failover.md>) — ⚙️ High Availability, Fault Tolerance & Failover — bộ ba giữ hệ thống luôn "sống"
- [054 - Backup and Recovery Strategies](<09. Reliability, Availability & Disaster Recovery/054 - Backup and Recovery Strategies.md>) — 💾 Backup & Recovery — "lưới an toàn" cho dữ liệu khi mọi thứ khác thất bại
- [055 - Disaster Recovery in Practice](<09. Reliability, Availability & Disaster Recovery/055 - Disaster Recovery in Practice.md>) — 🌍 Disaster Recovery in Practice — khi cả một vùng hạ tầng "gục ngã"
- [056 - Section Summary and Recap](<09. Reliability, Availability & Disaster Recovery/056 - Section Summary and Recap.md>) — 🎓 Tổng kết Reliability, Availability & Disaster Recovery — bức tranh về hệ thống "sống sót"

## 10. Security in System Design - Principles, Practices & Protocols

- [057 - Introduction to Security](<10. Security in System Design - Principles, Practices & Protocols/057 - Introduction to Security.md>) — 🔐 Security trong System Design — thiết kế an toàn ngay từ đầu, không phải vá sau
- [058 - Authentication and Authorization](<10. Security in System Design - Principles, Practices & Protocols/058 - Authentication and Authorization.md>) — 🔑 Authentication và Authorization — "bạn là ai" và "bạn được làm gì"
- [059 - Data Protection and Secure Communication](<10. Security in System Design - Principles, Practices & Protocols/059 - Data Protection and Secure Communication.md>) — 🛡️ Bảo vệ dữ liệu và giao tiếp an toàn — encryption, TLS và PKI
- [060 - Network and Infrastructure Security](<10. Security in System Design - Principles, Practices & Protocols/060 - Network and Infrastructure Security.md>) — 🌐 Network & Infrastructure Security — nhiều lớp phòng thủ cho hạ tầng hiện đại
- [061 - Summary and Recap](<10. Security in System Design - Principles, Practices & Protocols/061 - Summary and Recap.md>) — 🎓 Tổng kết Security in System Design — bảo mật là chuỗi quyết định thiết kế

## 11. The System Design Blueprint

- [062 - The 4-Step System Design Approach](<11. The System Design Blueprint/062 - The 4-Step System Design Approach.md>) — 🧩 Blueprint 4 bước thiết kế hệ thống — từ định nghĩa bài toán đến giải pháp cuối cùng

## 12. Design a URL Shortener (TinyURL)

- [063 - Understanding the Problem and Scope](<12. Design a URL Shortener (TinyURL)/063 - Understanding the Problem and Scope.md>) — 🔗 Thiết kế TinyURL (phần 1) — hiểu bài toán và chốt scope
- [064 - Estimating Scale and Bottlenecks](<12. Design a URL Shortener (TinyURL)/064 - Estimating Scale and Bottlenecks.md>) — 📏 Thiết kế TinyURL (phần 2) — ước lượng scale và tìm điểm nghẽn
- [065 - High-Level Design Services APIs Communication](<12. Design a URL Shortener (TinyURL)/065 - High-Level Design Services APIs Communication.md>) — 🏗️ Thiết kế TinyURL (phần 3) — API, service và giao tiếp
- [066 - Making Tech and Infra Decisions](<12. Design a URL Shortener (TinyURL)/066 - Making Tech and Infra Decisions.md>) — ⚙️ Thiết kế TinyURL (phần 4) — quyết định công nghệ và hạ tầng
- [067 - The Final Design](<12. Design a URL Shortener (TinyURL)/067 - The Final Design.md>) — 🏁 Thiết kế TinyURL (phần 5) — final design và hai luồng chính

## 13. Design a Ticketing System (BookMyShow)

- [068 - Understanding the Problem and Scope](<13. Design a Ticketing System (BookMyShow)/068 - Understanding the Problem and Scope.md>) — 🎬 Thiết kế Ticketing System (BookMyShow) — hiểu bài toán và xác định phạm vi
- [069 - Estimating Scale and Bottlenecks](<13. Design a Ticketing System (BookMyShow)/069 - Estimating Scale and Bottlenecks.md>) — 📏 Ước lượng scale và tìm điểm nghẽn — con số không bao giờ nói dối
- [070 - High Level Design Services and APIs](<13. Design a Ticketing System (BookMyShow)/070 - High Level Design Services and APIs.md>) — 🏗️ High-Level Design — services, API và cách hệ thống giao tiếp
- [071 - Tech and Infra Decisions](<13. Design a Ticketing System (BookMyShow)/071 - Tech and Infra Decisions.md>) — ⚙️ Chọn công nghệ & hạ tầng — mỗi lựa chọn phải trả lời một bài toán
- [072 - The Final Design](<13. Design a Ticketing System (BookMyShow)/072 - The Final Design.md>) — 🗺️ Final Design — ghép mọi mảnh ghép thành hệ thống bán vé hoàn chỉnh

## 14. Design a News Feed (Twitter-Instagram)

- [073 - Understanding the Problem & Defining the Scope](<14. Design a News Feed (Twitter-Instagram)/073 - Understanding the Problem & Defining the Scope.md>) — 🐦 Thiết kế News Feed kiểu Twitter/Instagram: Hiểu đúng bài toán trước khi vẽ kiến trúc
- [074 - Estimating Scale & Identifying Bottlenecks](<14. Design a News Feed (Twitter-Instagram)/074 - Estimating Scale & Identifying Bottlenecks.md>) — 📊 Ước lượng quy mô News Feed: Những con số định hình mọi quyết định kiến trúc
- [075 - High-Level Design - Services, APIs & Communication](<14. Design a News Feed (Twitter-Instagram)/075 - High-Level Design - Services, APIs & Communication.md>) — 🏗️ High-Level Design cho News Feed: Services, API và chiến lược sinh timeline
- [076 - Making Tech & Infra Decisions Strategically](<14. Design a News Feed (Twitter-Instagram)/076 - Making Tech & Infra Decisions Strategically.md>) — ⚙️ Chọn công nghệ cho News Feed: Yêu cầu kiến trúc dẫn đường, không phải tên sản phẩm
- [077 - The Final Design - News Feed](<14. Design a News Feed (Twitter-Instagram)/077 - The Final Design - News Feed.md>) — 🗺️ Final Design News Feed: Ghép mọi mảnh ghép thành một hệ thống hoàn chỉnh

## 15. Design a Notification System

- [078 - Understanding the Problem & Defining the Scope](<15. Design a Notification System/078 - Understanding the Problem & Defining the Scope.md>) — 🔔 Thiết kế Notification System: Gửi đúng thông báo, đúng người, đúng lúc
- [079 - Estimating Scale & Identifying Bottlenecks](<15. Design a Notification System/079 - Estimating Scale & Identifying Bottlenecks.md>) — 📊 Ước lượng quy mô Notification System: Từ 100 triệu đến 300 triệu thông báo mỗi ngày
- [080 - High-Level Design - Services, APIs & Communication](<15. Design a Notification System/080 - High-Level Design - Services, APIs & Communication.md>) — 🏗️ High-Level Design cho Notification System: Pipeline, luồng giao tiếp và API
- [081 - Making Tech & Infra Decisions Strategically](<15. Design a Notification System/081 - Making Tech & Infra Decisions Strategically.md>) — ⚙️ Chọn công nghệ cho Notification System: Từ Kafka đến SendGrid
- [082 - The Final Design - Notification System](<15. Design a Notification System/082 - The Final Design - Notification System.md>) — 🚀 Final Design Notification System: Từ sự kiện nghiệp vụ đến thông báo trong tay người dùng

## 16. Design a Chat Application (aka WhatsApp)

- [083 - Understanding the Problem and Scope](<16. Design a Chat Application (aka WhatsApp)/083 - Understanding the Problem and Scope.md>) — 💬 Thiết kế ứng dụng chat kiểu WhatsApp — Bước 1: Hiểu bài toán và chốt scope
- [084 - Estimating Scale and Bottlenecks](<16. Design a Chat Application (aka WhatsApp)/084 - Estimating Scale and Bottlenecks.md>) — 📊 Chat app — Bước 2: Ước lượng quy mô và tìm điểm nghẽn
- [085 - High-Level Design and APIs](<16. Design a Chat Application (aka WhatsApp)/085 - High-Level Design and APIs.md>) — 🏗️ Chat app — Bước 3: High-level design với các service chuyên trách
- [086 - Tech and Infrastructure Decisions](<16. Design a Chat Application (aka WhatsApp)/086 - Tech and Infrastructure Decisions.md>) — ⚙️ Chat app — Bước 4: Chọn công nghệ và hạ tầng theo nhu cầu kiến trúc
- [087 - The Final Chat Design](<16. Design a Chat Application (aka WhatsApp)/087 - The Final Chat Design.md>) — 🏁 Chat app — Bước 5: Kiến trúc hoàn chỉnh và hành trình end-to-end

## 17. Design an Auction Platform (aka eBay)

- [088 - Understanding the Problem and Scope](<17. Design an Auction Platform (aka eBay)/088 - Understanding the Problem and Scope.md>) — 🔨 Thiết kế nền tảng đấu giá kiểu eBay — Bước 1: Hiểu bài toán và chốt scope
- [089 - Estimating Scale and Bottlenecks](<17. Design an Auction Platform (aka eBay)/089 - Estimating Scale and Bottlenecks.md>) — 📐 Nền tảng đấu giá — Bước 2: Ước lượng quy mô và nhận diện điểm nghẽn
- [090 - High-Level Design and APIs](<17. Design an Auction Platform (aka eBay)/090 - High-Level Design and APIs.md>) — 🏗️ Nền tảng đấu giá — Bước 3: High-level design với các service chuyên trách
- [091 - Tech and Infrastructure Decisions](<17. Design an Auction Platform (aka eBay)/091 - Tech and Infrastructure Decisions.md>) — ⚙️ Nền tảng đấu giá — Bước 4: Chọn công nghệ theo yêu cầu, không theo trào lưu
- [092 - The Final Auction Design](<17. Design an Auction Platform (aka eBay)/092 - The Final Auction Design.md>) — 🏁 Nền tảng đấu giá — Bước 5: Kiến trúc hoàn chỉnh và góc nhìn end-to-end

## 18. Design an Online Rental Platform (aka Airbnb)

- [093 - Understanding the Problem and Scope](<18. Design an Online Rental Platform (aka Airbnb)/093 - Understanding the Problem and Scope.md>) — 🏠 Design nền tảng cho thuê nhà: Hiểu bài toán & xác định phạm vi trước khi vẽ kiến trúc
- [094 - Estimating Scale and Bottlenecks](<18. Design an Online Rental Platform (aka Airbnb)/094 - Estimating Scale and Bottlenecks.md>) — 📊 Ước lượng quy mô & nhận diện điểm nghẽn nền tảng cho thuê nhà
- [095 - High-Level Design Services and APIs](<18. Design an Online Rental Platform (aka Airbnb)/095 - High-Level Design Services and APIs.md>) — 🏗️ High-Level Design nền tảng cho thuê nhà: Service, API & giao tiếp
- [096 - Tech and Infrastructure Decisions](<18. Design an Online Rental Platform (aka Airbnb)/096 - Tech and Infrastructure Decisions.md>) — ⚙️ Quyết định công nghệ & hạ tầng cho nền tảng cho thuê nhà
- [097 - The Final Design Rental Platform](<18. Design an Online Rental Platform (aka Airbnb)/097 - The Final Design Rental Platform.md>) — 🗺️ Kiến trúc cuối cùng của nền tảng cho thuê nhà — nhìn từ trên cao

## 19. Design a Cloud Storage Solution (aka Google Drive, Dropbox)

- [098 - Understanding the Problem and Scope](<19. Design a Cloud Storage Solution (aka Google Drive, Dropbox)/098 - Understanding the Problem and Scope.md>) — ☁️ Design dịch vụ lưu trữ đám mây: Hiểu bài toán & xác định phạm vi
- [099 - Estimating Scale and Bottlenecks](<19. Design a Cloud Storage Solution (aka Google Drive, Dropbox)/099 - Estimating Scale and Bottlenecks.md>) — 📊 Ước lượng quy mô dịch vụ lưu trữ đám mây: 5 tỷ file & 10 petabyte
- [100 - High-Level Design Services and APIs](<19. Design a Cloud Storage Solution (aka Google Drive, Dropbox)/100 - High-Level Design Services and APIs.md>) — 🧩 High-Level Design dịch vụ lưu trữ đám mây: service, API & giao tiếp
- [101 - Tech and Infrastructure Decisions](<19. Design a Cloud Storage Solution (aka Google Drive, Dropbox)/101 - Tech and Infrastructure Decisions.md>) — ⚙️ Quyết định công nghệ & hạ tầng cho dịch vụ lưu trữ đám mây
- [102 - The Final Design Cloud Storage](<19. Design a Cloud Storage Solution (aka Google Drive, Dropbox)/102 - The Final Design Cloud Storage.md>) — 🗺️ Kiến trúc cuối cùng của dịch vụ lưu trữ đám mây — nhìn từ trên cao

## 20. Design a Video Sharing Platform (aka YouTube)

- [103 - Understanding the Problem & Defining the Scope](<20. Design a Video Sharing Platform (aka YouTube)/103 - Understanding the Problem & Defining the Scope.md>) — 🎬 Thiết kế nền tảng chia sẻ video kiểu YouTube: Hiểu bài toán & xác định phạm vi
- [104 - Estimating Scale & Identifying Bottlenecks](<20. Design a Video Sharing Platform (aka YouTube)/104 - Estimating Scale & Identifying Bottlenecks.md>) — 📊 Ước lượng quy mô nền tảng video: 50MB mỗi video, petabyte mỗi ngày
- [105 - High-Level Design - Services, APIs & Communication](<20. Design a Video Sharing Platform (aka YouTube)/105 - High-Level Design - Services, APIs & Communication.md>) — 🏗️ High-Level Design nền tảng video: Services, API và cách chúng giao tiếp
- [106 - Making Tech & Infra Decisions Strategically](<20. Design a Video Sharing Platform (aka YouTube)/106 - Making Tech & Infra Decisions Strategically.md>) — ⚙️ Chọn công nghệ cho nền tảng video: Kiến trúc dẫn đường, công nghệ theo sau
- [107 - The Final Design - Video Sharing Platform](<20. Design a Video Sharing Platform (aka YouTube)/107 - The Final Design - Video Sharing Platform.md>) — 🗺️ Final Design nền tảng chia sẻ video: Một video đi qua hệ thống như thế nào?

## 21. Design a Search Engine(aka Google)

- [108 - Understanding the Problem & Defining the Scope](<21. Design a Search Engine(aka Google)/108 - Understanding the Problem & Defining the Scope.md>) — 🔎 Thiết kế search engine kiểu Google: Hiểu bài toán & xác định phạm vi
- [109 - Estimating Scale & Identifying Bottlenecks](<21. Design a Search Engine(aka Google)/109 - Estimating Scale & Identifying Bottlenecks.md>) — 📐 Ước lượng quy mô search engine: 100 triệu trang, ngân sách 1 petabyte
- [110 - High-Level Design - Services, APIs & Communication](<21. Design a Search Engine(aka Google)/110 - High-Level Design - Services, APIs & Communication.md>) — 🏗️ High-Level Design search engine: Pipeline biến web thành kết quả tìm kiếm
- [111 - Making Tech & Infra Decisions Strategically](<21. Design a Search Engine(aka Google)/111 - Making Tech & Infra Decisions Strategically.md>) — ⚙️ Chọn công nghệ cho search engine: Công cụ phục vụ yêu cầu, không vì phổ biến
- [112 - The Final Design - Search Engine](<21. Design a Search Engine(aka Google)/112 - The Final Design - Search Engine.md>) — 🗺️ Final Design search engine: Hai pipeline vận hành song song

## 22. Design an E-Commerce Platform(aka Amazon)

- [113 - Understanding the Problem & Defining the Scope](<22. Design an E-Commerce Platform(aka Amazon)/113 - Understanding the Problem & Defining the Scope.md>) — 🛒 Thiết kế E-Commerce Platform kiểu Amazon: Hiểu bài toán & chốt scope
- [114 - Estimating Scale & Identifying Bottlenecks](<22. Design an E-Commerce Platform(aka Amazon)/114 - Estimating Scale & Identifying Bottlenecks.md>) — 📊 E-Commerce Platform: Ước lượng scale & nhận diện điểm nghẽn
- [115 - High-Level Design Services APIs & Communication](<22. Design an E-Commerce Platform(aka Amazon)/115 - High-Level Design Services APIs & Communication.md>) — 🏗️ E-Commerce Platform: High-Level Design — services, APIs & giao tiếp
- [116 - Making Tech & Infra Decisions Strategically](<22. Design an E-Commerce Platform(aka Amazon)/116 - Making Tech & Infra Decisions Strategically.md>) — 🧰 E-Commerce Platform: Chọn tech & hạ tầng một cách chiến lược
- [117 - The Final Design E-Commerce Platform](<22. Design an E-Commerce Platform(aka Amazon)/117 - The Final Design E-Commerce Platform.md>) — 🏁 E-Commerce Platform: Bản thiết kế cuối cùng — ghép mọi mảnh ghép

## 23. Design a Taxi Hailing App (aka Uber)

- [118 - Understanding the Problem & Defining the Scope](<23. Design a Taxi Hailing App (aka Uber)/118 - Understanding the Problem & Defining the Scope.md>) — 🚕 Thiết kế Taxi Hailing App kiểu Uber: Hiểu bài toán & chốt scope
- [119 - Estimating Scale & Identifying Bottlenecks](<23. Design a Taxi Hailing App (aka Uber)/119 - Estimating Scale & Identifying Bottlenecks.md>) — 📊 Taxi Hailing App: Ước lượng scale & điểm nghẽn
- [120 - High-Level Design Services APIs & Communication](<23. Design a Taxi Hailing App (aka Uber)/120 - High-Level Design Services APIs & Communication.md>) — 🏗️ Taxi Hailing App: High-Level Design — services, APIs & real-time
- [121 - Making Tech & Infra Decisions Strategically](<23. Design a Taxi Hailing App (aka Uber)/121 - Making Tech & Infra Decisions Strategically.md>) — 🧰 Taxi Hailing App: Chọn tech & hạ tầng một cách chiến lược
- [122 - The Final Design Taxi Hailing Application](<23. Design a Taxi Hailing App (aka Uber)/122 - The Final Design Taxi Hailing Application.md>) — 🏁 Taxi Hailing App: Bản thiết kế cuối cùng

## 24. Design a Collaborative Document Editor (aka Google Docs)

- [123 - Understanding the Problem & Defining the Scope](<24. Design a Collaborative Document Editor (aka Google Docs)/123 - Understanding the Problem & Defining the Scope.md>) — 📝 Thiết kế Collaborative Document Editor: Hiểu bài toán trước khi nghĩ đến kiến trúc
- [124 - Estimating Scale & Identifying Bottlenecks](<24. Design a Collaborative Document Editor (aka Google Docs)/124 - Estimating Scale & Identifying Bottlenecks.md>) — 📊 Ước lượng quy mô Collaborative Document Editor: 10 triệu người dùng, 10 tỷ sự kiện mỗi ngày
- [125 - High-Level Design - Document Model, Sync Flow & APIs](<24. Design a Collaborative Document Editor (aka Google Docs)/125 - High-Level Design - Document Model, Sync Flow & APIs.md>) — 🏗️ High-Level Design Collaborative Document Editor: Document model, luồng sync và API
- [126 - Making Tech & Infra Decisions Strategically](<24. Design a Collaborative Document Editor (aka Google Docs)/126 - Making Tech & Infra Decisions Strategically.md>) — ⚙️ Chọn công nghệ cho Collaborative Document Editor: Công nghệ phục vụ kiến trúc
- [127 - The Final Design - Collaborative Document Editor](<24. Design a Collaborative Document Editor (aka Google Docs)/127 - The Final Design - Collaborative Document Editor.md>) — 🗺️ Final Design Collaborative Document Editor: Kiến trúc hoàn chỉnh và bài học về quy trình

## 25. Final Prep, Mindset & Moving Forward

- [128 - Final Prep and Mindset](<25. Final Prep, Mindset & Moving Forward/128 - Final Prep and Mindset.md>) — 🎓 Chinh phục phỏng vấn System Design — mindset, chiến lược và hành trình tiếp theo
