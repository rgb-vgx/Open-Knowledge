# MỤC LỤC — The Complete Microservices & Event-Driven Architecture

> Khóa học Udemy của **Michael Pogrebinsky** (Top Developer Academy).
> Cấu trúc section lấy từ HTML snapshot Udemy; nội dung biên soạn từ 27 file transcript trong `transcripts-ua\the-complete-microservices-event-driven-architecture`.
> Đánh số bài theo **transcript (001–027)**. HTML đánh số 1–33 và có thêm 6 quiz + 6 bài giảng (trong đó 4 bài "Solutions" và 1 Bonus Lecture) **không có transcript** — xem ghi chú cuối trang.
> Quy ước trình bày: xem [`_STYLE - Blog style guide.md`](<_STYLE - Blog style guide.md>).

## 01. Introduction

- [001 - Introduction to Microservices and Event-Driven Architecture](<01. Introduction/001 - Introduction to Microservices and Event-Driven Architecture.md>) — Microservices và Event-Driven Architecture: Vì sao cần, khi nào dùng?
- [002 - Microservices Benefits and Challenges](<01. Introduction/002 - Microservices Benefits and Challenges.md>) — Microservices: Lợi ích vượt trội và những cái bẫy phải biết
- [003 - Download the Course Workbook](<01. Introduction/003 - Download the Course Workbook.md>) — Workbook khóa học và đôi lời trước khi bắt đầu

## 02. Migration to Microservices Architecture

- [004 - Microservices Boundaries Core Principles](<02. Migration to Microservices Architecture/004 - Microservices Boundaries Core Principles.md>) — Ranh giới Microservices: Ba nguyên tắc cốt lõi rút ra từ ba case study
- [005 - Decomposition of a Monolith to Microservices](<02. Migration to Microservices Architecture/005 - Decomposition of a Monolith to Microservices.md>) — Decompose Monolith: Hai cách tách chuẩn ba nguyên tắc
- [006 - Migration Steps Tips and Patterns](<02. Migration to Microservices Architecture/006 - Migration Steps Tips and Patterns.md>) — Migration thực chiến: Bắt đầu từ đâu và pattern Strangler Fig

## 03. Microservices - Principles and Best Practices

- [007 - Database per Microservice](<03. Microservices - Principles and Best Practices/007 - Database per Microservice.md>) — Database per Microservice: vì sao mỗi dịch vụ phải sở hữu dữ liệu của riêng mình
- [008 - DRY Principle and Shared Libraries](<03. Microservices - Principles and Best Practices/008 - DRY Principle and Shared Libraries.md>) — DRY trong Microservices: chia sẻ thư viện hay nhân bản code?
- [009 - Structured Autonomy for Teams](<03. Microservices - Principles and Best Practices/009 - Structured Autonomy for Teams.md>) — Structured Autonomy: tự chủ trong khuôn khổ cho các team microservices
- [010 - Micro-frontends Architecture Pattern](<03. Microservices - Principles and Best Practices/010 - Micro-frontends Architecture Pattern.md>) — Micro-frontends: khi frontend cũng cần được "chia nhỏ"
- [011 - API Management and API Gateway](<03. Microservices - Principles and Best Practices/011 - API Management and API Gateway.md>) — API Gateway: cửa ngõ quản lý API cho hệ microservices

## 04. Event-Driven Architecture

- [012 - Introduction to Event-Driven Architecture](<04. Event-Driven Architecture/012 - Introduction to Event-Driven Architecture.md>) — Event-Driven Architecture: Khi microservices cần nói chuyện bất đồng bộ
- [013 - Use Cases and Patterns of EDA](<04. Event-Driven Architecture/013 - Use Cases and Patterns of EDA.md>) — Khi nào dùng Event-Driven? 6 use case và 2 pattern giao sự kiện
- [014 - Message Delivery Semantics](<04. Event-Driven Architecture/014 - Message Delivery Semantics.md>) — Message Delivery Semantics: at-most-once, at-least-once và exactly-once

## 05. Event-Driven Microservices - Design Patterns

- [015 - Saga Pattern](<05. Event-Driven Microservices - Design Patterns/015 - Saga Pattern.md>) — Saga Pattern: Distributed Transaction cho kiến trúc microservices
- [016 - CQRS Pattern](<05. Event-Driven Microservices - Design Patterns/016 - CQRS Pattern.md>) — CQRS Pattern: Tách lệnh và truy vấn để đọc ghi đều nhanh
- [017 - Event Sourcing Pattern](<05. Event-Driven Microservices - Design Patterns/017 - Event Sourcing Pattern.md>) — Event Sourcing: Lưu sự kiện thay vì trạng thái

## 06. Testing Microservices and Event-Driven Architecture

- [018 - Testing Pyramid for Microservices](<06. Testing Microservices and Event-Driven Architecture/018 - Testing Pyramid for Microservices.md>) — Testing Pyramid cho Microservices: Nền tảng kiểm thử và ba thách thức lớn
- [019 - Contract Tests and Production Testing](<06. Testing Microservices and Event-Driven Architecture/019 - Contract Tests and Production Testing.md>) — Contract Tests và Production Testing: Kiểm thử microservices mà không cần dựng cả hệ thống

## 07. Observability in Microservices Architecture

- [020 - Three Pillars of Observability](<07. Observability in Microservices Architecture/020 - Three Pillars of Observability.md>) — Ba trụ cột Observability: Logs, Metrics và Tracing khác nhau thế nào?
- [021 - Distributed Logging](<07. Observability in Microservices Architecture/021 - Distributed Logging.md>) — Distributed Logging: Biến hàng triệu dòng log thành vũ khí debug
- [022 - Metrics](<07. Observability in Microservices Architecture/022 - Metrics.md>) — Metrics: Năm nhóm tín hiệu đáng theo dõi nhất trong microservices
- [023 - Distributed Tracing](<07. Observability in Microservices Architecture/023 - Distributed Tracing.md>) — Distributed Tracing: Lần theo dấu vết request xuyên hàng trăm microservices

## 08. Deployment of Microservices and Event-Driven Architecture in Production

- [024 - Cloud Virtual Machines and Dedicated Hosts](<08. Deployment of Microservices and Event-Driven Architecture in Production/024 - Cloud Virtual Machines and Dedicated Hosts.md>) — Cloud VM, Dedicated Host và Dedicated Instance: chọn nền tảng nào để chạy microservices?
- [025 - Serverless Deployment with Function as a Service](<08. Deployment of Microservices and Event-Driven Architecture in Production/025 - Serverless Deployment with Function as a Service.md>) — Function as a Service: deploy microservices theo từng sự kiện
- [026 - Containers for Microservices](<08. Deployment of Microservices and Event-Driven Architecture in Production/026 - Containers for Microservices.md>) — Containers: đóng gói microservices để chạy từ dev tới production
- [027 - Container Orchestration and Kubernetes](<08. Deployment of Microservices and Event-Driven Architecture in Production/027 - Container Orchestration and Kubernetes.md>) — Container Orchestration và Kubernetes: bộ não vận hành microservices

## 09. Bonus Section

*(Section này chỉ có 1 bài Bonus Lecture, không có transcript — xem ghi chú cuối trang.)*

---

## Ghi chú về các bài không có transcript

HTML snapshot có 39 mục (33 bài giảng đánh số + 6 quiz). Trong đó **12 mục không có transcript**, được giữ nguyên trong cấu trúc section nhưng không biên soạn thành bài blog:

| # HTML | Mục | Loại |
|---|---|---|
| 15 | Message Broker Technologies - Delivery Guarantees | Bài giảng (không có transcript) |
| 21 | Contract Tests Solutions | Bài giảng (không có transcript) |
| 26 | Distributed Tracing Solutions | Bài giảng (không có transcript) |
| 28 | Cloud Virtual Machine, Dedicated Hosts and Instances - Solutions | Bài giảng (không có transcript) |
| 30 | Serverless Deployment ... - Solutions | Bài giảng (không có transcript) |
| 33 | Bonus Lecture - Let's Keep Learning | Bài giảng (không có transcript, thuộc section 09) |
| — | Trắc nghiệm 1–6 | Quiz (không có transcript) |

**Tổng:** 27 bài blog / 27 transcript.
