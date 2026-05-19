---
title: 'Network Programming #5: Data Encapsulation Thực Sự Diễn Ra Như Thế Nào?'
date: '2025-11-09 23:08:46'
date_gmt: '2025-11-09 16:08:46'
modified: '2025-11-10 02:27:27'
status: publish
slug: network-programming-5-data-encapsulation-thuc-su-dien-ra-nhu-the-nao
wordpress_id: 558
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/09/network-programming-5-data-encapsulation-thuc-su-dien-ra-nhu-the-nao/
categories:
- Concept
tags: []
---

Bây giờ chúng ta sẽ đi vào **chi tiết cụ thể** của quá trình **Data Encapsulation** xảy ra trên **máy gửi**.

Giả sử:

- Máy gửi: **Machine A**
- Máy đích: **Machine D**
- Ứng dụng trên máy gửi: **APP1**
- Ứng dụng trên máy đích: **APP2**
- APP1 muốn gửi một đoạn dữ liệu: `"How are you?"`

Đây là dữ liệu mà người dùng nhìn thấy — và đây cũng chính là **Application Data**.

---

## Bước 1 — Application Layer tạo dữ liệu

Ứng dụng **APP1** trên Machine A tạo ra dữ liệu:

```
"How are you?"
```

Dữ liệu này được gọi là: **Application Data**

Sau đó Application Layer **chuyển dữ liệu xuống** layer bên dưới: **Transport Layer**

---

## Bước 2 — Transport Layer gắn Transport Header

Transport Layer (TCP hoặc UDP) nhận dữ liệu từ Application Layer và **đính thêm một Transport Header**.

Transport Header chứa **thông tin nhận dạng tiến trình (process)**:

- Process gửi (APP1)
- Process nhận (APP2)

Thông tin này được mã hóa bằng:

| Thông tin | Ý nghĩa |
| --- | --- |
| Source Port | Xác định APP1 trên máy gửi |
| Destination Port | Xác định APP2 trên máy nhận |

Sau khi thêm header, dữ liệu trở thành:

```
Transport Header + "How are you?"
→ gọi là: Segment
```

---

## Bước 3 — Network Layer gắn IP Header

Segment được chuyển xuống Network Layer.  
Network Layer **gắn thêm IP Header** để chỉ ra **máy gửi và máy nhận** là ai.

IP Header chứa:

| Trường | Ý nghĩa |
| --- | --- |
| Source IP Address | Địa chỉ máy gửi (A) |
| Destination IP Address | Địa chỉ máy nhận (D) |

Sau bước này, dữ liệu trở thành:

```
IP Header + Segment
→ gọi là: Packet
```

---

## Bước 4 — Data Link Layer gắn MAC Header

Packet tiếp tục được chuyển xuống **Data Link Layer**.  
Tại đây, Data Link Layer gắn thêm **MAC Header**.

MAC Header chứa:

- **Source MAC**: địa chỉ MAC của máy A
- **Destination MAC**: địa chỉ MAC của **hop kế tiếp (next hop)**

Next hop **không nhất thiết** là máy đích D.  
Nó có thể là một router trung gian, ví dụ **Machine B**.

```
MAC Header + Packet
→ gọi là: Frame
```

---

## Bước 5 — Physical Layer truyền dữ liệu ra môi trường

Cuối cùng Data Link Layer chuyển **Frame** xuống Physical Layer.

Physical Layer **chuyển đổi frame thành tín hiệu điện / sóng** (bit 0 và 1) và phát lên đường truyền.

---

## Hình Minh Họa Encapsulation trên máy gửi

```
Application Data ("How are you?")
        ↓
[ Transport Header ] + Data  → Segment
        ↓
[ IP Header ] + Segment  → Packet
        ↓
[ MAC Header ] + Packet → Frame
        ↓
Frame → chuyển thành Bit → truyền trên dây / sóng
```

---

## Điều Quan Trọng Cần Ghi Nhớ

**Mỗi layer chỉ quan tâm đến header của chính nó.**

- Transport Layer **không đọc** IP Header
- Network Layer **không đọc** MAC Header
- Data Link Layer **không quan tâm** Transport Header

**Không layer nào can thiệp nội dung header của các layer khác.**

Đây là lý do TCP/IP stack:

- **Dễ bảo trì**
- **Dễ mở rộng**
- **Có thể thay thế từng layer mà không ảnh hưởng toàn bộ hệ thống**

---

## Trong Phần Tiếp Theo

Chúng ta sẽ làm **thao tác ngược lại**:  
**Data Decapsulation** trên máy đích — từng layer **gỡ header** và chuyển dữ liệu lên trên.

Sau đó, chúng ta sẽ bắt đầu phần **Transport Layer chi tiết**, gồm:

- Cơ chế **TCP reliability** (ACK, Sequence Number, Handshake)
- Tại sao **UDP nhanh nhưng không đảm bảo**
- So sánh trực quan trong thực tế
