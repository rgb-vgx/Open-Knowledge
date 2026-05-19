---
title: 'Fundamentals of Backend 12: The Sidecar Pattern'
date: '2025-12-07 22:03:10'
date_gmt: '2025-12-07 15:03:10'
modified: '2026-01-21 15:23:56'
status: publish
slug: the-sidecar-pattern
wordpress_id: 616
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/07/the-sidecar-pattern/
categories:
- Back End
tags: []
---

**Sidecar Pattern** (Mô hình Thùng xe) là một mô hình thiết kế kiến trúc nơi một ứng dụng (Service chính) được triển khai cùng với một ứng dụng hỗ trợ (Sidecar) trong cùng một môi trường máy chủ hoặc container.

Mục tiêu chính là **tách biệt các mối quan tâm không cốt lõi (non-core concerns)** như giao tiếp mạng, bảo mật và giám sát, ra khỏi logic nghiệp vụ chính của ứng dụng.

## 1. Vấn đề: Sự phức tạp của Thư viện Giao thức

Mỗi giao thức mạng phức tạp (như gRPC, HTTP/2, TLS, WebSockets) đều yêu cầu một thư viện (Library) phức tạp để xử lý các tác vụ như:

- Phân tích cú pháp (Parsing) Header, Body.
- Mã hóa/Giải mã **TLS (SSL)**.
- Đàm phán giao thức (ALPN).
- Xử lý luồng (Streams) và Frame (như trong HTTP/2).

### Hậu quả của việc nhúng Thư viện

1. **Thư viện Dày (Thick Libraries):** Mã nguồn của ứng dụng trở nên phức tạp và nặng nề hơn.
2. **Phụ thuộc Ngôn ngữ:** Nếu bạn dùng một thư viện gRPC bằng Java, tất cả các dịch vụ giao tiếp với nó thường phải là Java (hoặc phải dùng các **Native/C API Interop** phức tạp). Điều này hạn chế kiến trúc **Polyglot** (sử dụng nhiều ngôn ngữ).
3. **Khó Nâng cấp:** Khi có lỗ hổng bảo mật (ví dụ: Heartbleed trong OpenSSL) hoặc cần nâng cấp giao thức (ví dụ: lên HTTP/3/QUIC), bạn phải **sửa đổi, xây dựng lại và triển khai lại** mọi dịch vụ trong hệ thống.
4. **Thiếu Tính năng Chuẩn hóa:** Mỗi nhóm phát triển phải tự viết hoặc cấu hình logic phức tạp như **Retry**, **Circuit Breaking**, và **Service Discovery**.

## 2. Giải pháp: Sidecar Proxy

Mô hình Sidecar giải quyết vấn đề này bằng cách chuyển trách nhiệm giao tiếp mạng cho một **Proxy** chạy cùng với ứng dụng.![Image of Sidecar pattern architecture](https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQWHZzfkgVMsceKSyJV-Y2QuCaHTCgsUP7aSuRoqTdolCyZvzmyUxZhS0Pzxq0W_XOH6B4jiyh4Zo2rnF5FxzWFZ1ENuxbIj74mhciW_oM14kZnrtE)

### Cơ chế hoạt động

1. **Triển khai:** Ứng dụng chính (ví dụ: Service A) và Sidecar Proxy (ví dụ: Envoy/Linkerd) được triển khai trên cùng một máy chủ/container (chia sẻ cùng mạng **Loopback/localhost**).
2. **Chuyển hướng:** Ứng dụng chính được cấu hình để gửi tất cả yêu cầu mạng ra bên ngoài thông qua địa chỉ Loopback đến Sidecar Proxy (ví dụ: `http://localhost:9090`).
3. **Proxy Giao tiếp:**
   - Sidecar Proxy nhận yêu cầu **HTTP/1.1 đơn giản** từ ứng dụng chính.
   - Sidecar Proxy **rewrite** (viết lại) yêu cầu, xử lý tất cả các logic phức tạp (TLS, HTTP/2/3, Retry, Tracing, Service Discovery).
   - Sidecar Proxy gửi yêu cầu đã xử lý đến Sidecar Proxy của dịch vụ đích (Service B).

### Lợi ích của Sidecar Pattern

| **Lợi ích** | **Mô tả** |
| --- | --- |
| **Language Agnostic (Polyglot)** | Dịch vụ chính có thể được viết bằng bất kỳ ngôn ngữ nào (Python, Go, Java) vì nó chỉ cần nói **HTTP/1.1 đơn giản** với Sidecar Proxy (thường được viết bằng ngôn ngữ hiệu suất cao như Rust). |
| **Protocol Upgrade** | Nâng cấp toàn bộ hệ thống lên HTTP/3/QUIC, TLS 1.3, hoặc một giao thức mới chỉ cần **nâng cấp Proxy Sidecar**, không cần chạm vào code của ứng dụng nghiệp vụ. |
| **Security/TLS** | Sidecar Proxy xử lý toàn bộ việc **mã hóa/giải mã TLS** (thao tác ở **Layer 7**). Ứng dụng chính có thể giao tiếp không mã hóa với Proxy, giúp đơn giản hóa code và tăng tính bảo mật (vì Private Key chỉ nằm trong Proxy). |
| **Observability (Tracing/Monitoring)** | Proxy Sidecar tự động thêm các Header theo dõi (ví dụ: **Trace ID** cho OpenTracing/Jaeger) vào mỗi yêu cầu, cho phép theo dõi toàn bộ hành trình của yêu cầu qua hàng loạt Microservices. |
| **Networking Logic** | Sidecar Proxy xử lý **Retry Logic**, **Load Balancing**, **Rate Limiting** và **Circuit Breaking** một cách tập trung và nhất quán cho mọi dịch vụ. |
| **Service Discovery** | Sidecar Proxy tự động tìm kiếm vị trí của dịch vụ đích thông qua hệ thống DNS tập trung (hoặc Control Plane), loại bỏ logic discovery khỏi ứng dụng. |

## 3. Nhược điểm

- **Độ trễ (Latency):** Mọi yêu cầu đều phải đi qua **hai hop local** (App -> Sidecar A -> Sidecar B -> App), làm tăng độ trễ, mặc dù là rất nhỏ.
- **Chi phí tài nguyên:** Mỗi dịch vụ cần một Sidecar riêng, làm tăng chi phí vận hành (CPU, RAM) và số lượng container trong hệ thống.
- **Phức tạp:** Sidecar Pattern là nền tảng của **Service Mesh** (Linkerd, Istio, Envoy), đây là một kiến trúc phức tạp cần một **Control Plane** (Mặt phẳng điều khiển) để quản lý cấu hình và chính sách cho tất cả các Sidecar Proxy. Debugging (gỡ lỗi) có thể khó khăn hơn.

## 4. Tóm tắt

Sidecar Pattern là một giải pháp kiến trúc **tuyệt vời** cho các hệ thống **Microservices lớn và phức tạp**, cho phép **decouple (giảm sự kết nối)** logic nghiệp vụ khỏi các mối quan tâm về mạng và cơ sở hạ tầng. Nó cho phép các nhóm phát triển sử dụng ngôn ngữ yêu thích của họ và tập trung vào business logic, trong khi việc quản lý mạng được giao cho đội ngũ SRE/Platform thông qua Service Mesh.
