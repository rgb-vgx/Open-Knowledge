---
title: 'Fundamentals of Backend 11: Stateful (Có Trạng thái) vs. Stateless (Phi Trạng
  thái)'
date: '2025-12-07 21:59:12'
date_gmt: '2025-12-07 14:59:12'
modified: '2026-01-21 15:23:59'
status: publish
slug: stateful-co-trang-thai-vs-stateless-phi-trang-thai
wordpress_id: 613
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/07/stateful-co-trang-thai-vs-stateless-phi-trang-thai/
categories:
- Back End
tags: []
---

## 1. Khái niệm Trạng thái (State)

Trong bối cảnh kiến trúc Backend, **trạng thái (State)** là bất kỳ dữ liệu nào mà một ứng dụng hoặc một hệ thống lưu trữ về một phiên làm việc, một client, hoặc một quá trình nào đó, và **phụ thuộc** vào dữ liệu đó để xử lý các yêu cầu tiếp theo một cách chính xác.

### 1.1. Stateful Backend (Có Trạng thái)

- **Định nghĩa:** Backend lưu trữ trạng thái của client **trong bộ nhớ cục bộ (local memory)** của chính nó hoặc trên đĩa cứng cục bộ, và **buộc phải có** trạng thái đó để hoạt động.
- **Ví dụ:** Lưu trữ **Session ID** của người dùng (sau khi đăng nhập) ngay trong bộ nhớ RAM của Server.
- **Hạn chế:**
  - **Khó mở rộng (Scaling):** Khi bạn có nhiều Server (Load Balancing), nếu một Client đã đăng nhập vào Server A (và session chỉ nằm trên A), yêu cầu tiếp theo đến Server B sẽ bị lỗi vì B không có session đó.
  - **Không có khả năng phục hồi (Resilience):** Nếu Server A bị crash hoặc khởi động lại, **tất cả session** trên Server A sẽ bị mất, buộc người dùng phải đăng nhập lại.
  - **Yêu cầu Sticky Session:** Load Balancer phải được cấu hình để gửi tất cả yêu cầu từ một Client cụ thể đến **cùng một Server** để đảm bảo trạng thái được duy trì.

### 1.2. Stateless Backend (Phi Trạng thái)

- **Định nghĩa:** Backend **không lưu trữ** bất kỳ trạng thái nào của Client trong bộ nhớ cục bộ, hoặc nếu có, việc mất trạng thái đó cũng không ảnh hưởng đến khả năng hoạt động.
- **Cơ chế:** Client có trách nhiệm gửi tất cả thông tin trạng thái cần thiết **kèm theo mỗi yêu cầu** (ví dụ: Session ID, Token). Server sẽ lấy thông tin trạng thái từ một **hệ thống lưu trữ chung (Centralized State Store)**.
- **Ví dụ:** Server luôn kiểm tra Session ID bằng cách truy vấn một **Database (PostgreSQL)** hoặc một **Cache phân tán (Redis)**.
- **Lợi ích:**
  - **Dễ mở rộng (Scaling):** Bạn có thể tăng/giảm số lượng Server Backend mà không cần lo lắng. Bất kỳ Server nào cũng có thể xử lý yêu cầu.
  - **Khả năng phục hồi (Resilience):** Nếu một Server crash, bạn có thể khởi động lại ngay lập tức mà không làm gián đoạn người dùng, vì trạng thái đã được lưu trữ an toàn ở nơi khác.
  - **Không cần Sticky Session:** Load Balancer có thể phân phối ngẫu nhiên (Round Robin) các yêu cầu đến bất kỳ Server nào.

> **Quy tắc vàng để kiểm tra tính Stateless của Backend:** Nếu ứng dụng Backend của bạn có thể bị tắt, khởi động lại, và Client vẫn tiếp tục quy trình làm việc của họ **mà không bị lỗi**, thì Backend đó là **Stateless**.

---

## 2. Statelessness trong Hệ thống và Ứng dụng

Điều quan trọng là phải phân biệt giữa tính trạng thái của **Ứng dụng (App)** và **Toàn bộ Hệ thống (System)**.

### Hệ thống Stateful, Ứng dụng Stateless

- Hầu hết các hệ thống hiện đại đều là **Stateful** ở cấp độ hệ thống, vì chúng cần lưu trữ dữ liệu người dùng (dĩ nhiên phải dùng Database).
- Tuy nhiên, các Server Web/API (Backend Applications) thì nên được thiết kế **Stateless**.
- **Trick:** Server Backend chỉ là một lớp tính toán. Nó chuyển trách nhiệm lưu trữ trạng thái sang một dịch vụ khác (Database, Redis).
- **Kết quả:** Ứng dụng Backend có thể bị phá hủy và tạo lại mà không mất dữ liệu, miễn là dịch vụ lưu trữ trạng thái (Database) vẫn hoạt động.

### Ví dụ về Quản lý Session

| **Mô hình** | **Session ID (S1) được lưu ở đâu?** | **Khả năng mở rộng?** |
| --- | --- | --- |
| **Stateful** | Bộ nhớ cục bộ của Backend App (RAM). | Kém, cần Sticky Session. |
| **Stateless** | **Database/Redis** (Hệ thống lưu trữ bên ngoài). | Tốt, Load Balancer có thể chuyển Client đến bất kỳ Server nào. |


---

## 3. Trạng thái trong Giao thức (Protocols)

Tính trạng thái không chỉ áp dụng cho ứng dụng mà còn cho các giao thức mạng.

### 3.1. Giao thức Stateful (TCP)

- **TCP (Transmission Control Protocol)** là giao thức **Stateful**.
- Nó duy trì một **máy trạng thái (State Machine)** cho mỗi kết nối (ví dụ: `ESTABLISHED`, `CLOSED`, `TIME_WAIT`).
- TCP lưu trữ trạng thái như: **số thứ tự (Sequences)**, **kích thước cửa sổ (Window Sizes)**, và **kiểm soát tắc nghẽn (Congestion Control)**.
- Nếu bất kỳ thông tin trạng thái nào bị mất, kết nối TCP sẽ bị hủy.

### 3.2. Giao thức Stateless (UDP, HTTP)

- **UDP (User Datagram Protocol)** là giao thức **Stateless**. Nó chỉ đơn thuần gửi các gói dữ liệu (Datagrams) mà không cần bắt tay, không đảm bảo thứ tự hay kiểm soát lỗi.
- **HTTP (Hypertext Transfer Protocol)** là giao thức **Stateless** ở cấp độ ứng dụng. Mỗi Request HTTP độc lập với các Request trước đó.
  - **Cơ chế:** Để duy trì một phiên làm việc trên giao thức Stateless như HTTP, chúng ta phải sử dụng **Cookies** hoặc **Token** (như JWT) để truyền trạng thái (Session ID) qua lại giữa Client và Server.

> **Twist:** Bạn có thể xây dựng một giao thức Stateless trên một giao thức Stateful (ví dụ: **HTTP (Stateless) chạy trên TCP (Stateful)**) và ngược lại (ví dụ: **QUIC (Stateful) chạy trên UDP (Stateless)**, bằng cách tự xây dựng logic quản lý trạng thái, số thứ tự và kiểm soát lỗi ngay trong giao thức QUIC).

### 3.3. JSON Web Token (JWT) - Ví dụ về Stateless hoàn toàn

**JWT** là một phương pháp quản lý phiên cực kỳ **Stateless** ở cấp độ ứng dụng.

- **Cơ chế:** Toàn bộ dữ liệu phiên (User ID, Quyền hạn, Thời hạn) được mã hóa và ký số vào chính Token.
- **Server không cần truy vấn DB:** Server chỉ cần giải mã và xác thực chữ ký của Token (tính toán cục bộ) để biết đây là ai.
- **Hạn chế:** Vì không có trạng thái lưu trữ tập trung, bạn **không thể dễ dàng thu hồi (Revoke)** một JWT đã phát hành trước khi nó hết hạn. Nếu một Token bị đánh cắp, nó vẫn có giá trị cho đến khi hết thời gian sử dụng, khiến việc quản lý bảo mật trở nên phức tạp hơn (cần dùng kèm Refresh Token).
