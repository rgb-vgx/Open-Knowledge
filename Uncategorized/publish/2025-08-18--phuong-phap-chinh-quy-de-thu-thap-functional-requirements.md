---
title: Phương pháp chính quy để thu thập Functional Requirements
date: '2025-08-18 10:35:50'
date_gmt: '2025-08-18 03:35:50'
modified: '2025-10-06 00:34:13'
status: publish
slug: phuong-phap-chinh-quy-de-thu-thap-functional-requirements
wordpress_id: 341
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/08/18/phuong-phap-chinh-quy-de-thu-thap-functional-requirements/
categories:
- Uncategorized
tags: []
---

Trong bài học trước, chúng ta đã nói về **tầm quan trọng của requirements** trong việc thiết kế hệ thống lớn và những thách thức như **scope (phạm vi rộng)** và **ambiguity (tính mơ hồ)**. Ở bài học này, ta sẽ đi tiếp một bước: học **một phương pháp formal (chính quy)** để **capture (thu thập và mô tả) functional requirements** và **visualize (trực quan hóa)** chúng.

---

## Cách tiếp cận truyền thống và hạn chế

Một cách đơn giản là chỉ cần hỏi khách hàng mô tả mọi thứ họ muốn hệ thống làm. Nhưng với hệ thống phức tạp, nhiều actor và nhiều feature, cách này **dễ thiếu sót và khó quản lý**.

👉 Giải pháp tốt hơn là dùng:

- **Use Case (tình huống sử dụng)**: một kịch bản mà người dùng sử dụng hệ thống để đạt mục tiêu.
- **User Flow (luồng người dùng)**: mô tả chi tiết, từng bước (hoặc dưới dạng sơ đồ) cho từng use case.

---

## Quy trình 3 bước thu thập Functional Requirements

1. **Identify Actors (Xác định các tác nhân/actor)**
   - Là người hoặc hệ thống tương tác với hệ thống của chúng ta.
   - Nếu bỏ sót actor, ta sẽ bỏ sót các use case quan trọng.
2. **List Use Cases (Liệt kê tất cả các tình huống sử dụng)**
   - Mỗi actor có nhiều cách tương tác với hệ thống.
   - Ví dụ: đăng ký, đăng nhập, đặt chuyến, nhận thông báo, thanh toán…
3. **Expand User Flows (Mở rộng luồng sự kiện)**
   - Mô tả chi tiết tương tác **giữa actor và hệ thống** qua từng bước.
   - Ghi nhận: **action (hành động)** và **data flow (luồng dữ liệu)** đi vào/ra hệ thống.

---

## Ví dụ: Hệ thống Hitchhiking Service

Hệ thống cho phép **driver (tài xế)** nhận thêm **rider (người đi nhờ)** trên tuyến đường của mình.

### Bước 1 – Actors

- Rider
- Driver

### Bước 2 – Use Cases

- Rider đăng ký tài khoản mới.
- Driver đăng ký tài khoản mới.
- Rider đăng nhập để đặt chuyến.
- Driver đăng nhập và bật trạng thái nhận khách.
- Rider – Driver match thành công → chuyến đi bắt đầu và hoàn tất.
- Rider không tìm thấy Driver phù hợp (match thất bại).

### Bước 3 – User Flow chi tiết cho **Successful Match**

- **Driver** đã đăng nhập → gửi thông tin tuyến đường và sẵn sàng nhận khách.
- **Rider** đăng nhập → gửi yêu cầu đi nhờ (origin, destination).
- **System** tìm kiếm và ghép cặp Rider – Driver.
- Nếu **match thành công**:
  - Rider và Driver cùng nhận được thông báo.
  - Driver đến đón Rider, Rider nhận xác nhận bắt đầu chuyến đi.
- Khi đến đích:
  - Driver gửi thông báo hoàn tất chuyến đi.
  - **System** trừ tiền Rider, gửi receipt, giữ lại phí dịch vụ và chuyển phần còn lại vào tài khoản Driver.
  - Driver được thông báo về số dư mới.

---

## Biểu diễn bằng Sequence Diagram

**Sequence Diagram (Sơ đồ tuần tự)** là một loại **UML (Unified Modeling Language)**, dùng để biểu diễn tương tác giữa các actor và hệ thống theo trục thời gian (từ trên xuống dưới):

- **Actor / Entity** → biểu diễn bằng đường dọc.
- **Message (tương tác)** → mũi tên.
- **Response** → đường gạch đứt ngược lại.

👉 Ưu điểm: giúp ta thấy rõ **thứ tự, dữ liệu, và tương tác** giữa các bên.

Ví dụ sequence diagram cho “successful match”:

```
Driver → System: Gửi tuyến đường + trạng thái sẵn sàng  
Rider → System: Gửi origin + destination  
System → Rider: Thông báo tìm thấy Driver phù hợp  
System → Driver: Thông báo Rider đã ghép cặp  
Driver → Rider: Đến điểm đón (start ride)  
Driver → System: Thông báo hoàn tất chuyến đi  
System → Rider: Trừ tiền + gửi receipt  
System → Driver: Cộng tiền (sau khi trừ phí dịch vụ)
```

---

## Lợi ích phụ: Định nghĩa API

Mỗi **interaction (tương tác)** trong user flow thực chất là một **API call**:

- **Actor → System** = request.
- **System → Actor** = response.
- **Data flow** = arguments & payload trong API.

👉 Sau này khi thiết kế API, ta có thể tái sử dụng trực tiếp từ các sequence diagram này.

---

## Kết luận

- **Use Case + User Flow** là cách formal để thu thập và mô tả functional requirements.
- Quy trình gồm **3 bước**: xác định actor → liệt kê use case → mở rộng user flow.
- **Sequence diagram** là công cụ hữu ích để trực quan hóa tương tác.
- Ngoài việc làm rõ requirement, nó còn giúp **định hình API tương lai**.
