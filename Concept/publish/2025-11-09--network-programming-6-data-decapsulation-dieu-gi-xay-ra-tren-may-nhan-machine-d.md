---
title: 'Network Programming #6: Data Decapsulation: Điều Gì Xảy Ra Trên Máy Nhận (Machine
  D)?'
date: '2025-11-09 23:16:40'
date_gmt: '2025-11-09 16:16:40'
modified: '2025-11-10 02:27:25'
status: publish
slug: network-programming-6-data-decapsulation-dieu-gi-xay-ra-tren-may-nhan-machine-d
wordpress_id: 560
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/09/network-programming-6-data-decapsulation-dieu-gi-xay-ra-tren-may-nhan-machine-d/
categories:
- Concept
tags: []
---

Chúng ta đã biết rằng **Data Encapsulation** diễn ra trên **máy gửi (Machine A)**.  
Bây giờ, hãy xem điều gì xảy ra khi dữ liệu đến **máy nhận (Machine D)**.

Giả sử gói tin di chuyển theo đường:

```
Machine A → Machine B → Machine C → Machine D
```

Machine D là **đích cuối cùng**, nơi dữ liệu cần được chuyển đến **APP2** – ứng dụng nhận.

---

### Bước 1 — Data Link Layer trên Machine D nhận dữ liệu từ đường truyền

Dữ liệu được truyền dưới dạng **Frame** từ máy liền kề **Machine C** → Machine D.

Do Data Link Layer chỉ hoạt động **giữa các node liền kề (adjacent nodes)**, nên:

- **Source MAC** trong MAC Header = MAC của Machine C
- **Destination MAC** trong MAC Header = MAC của Machine D

Data Link Layer kiểm tra MAC Header để đảm bảo rằng **Machine D đúng là người nhận**.

→ Sau đó, **MAC Header được gỡ bỏ**.

```
[MAC Header] + Packet  → remove MAC Header  → Packet
```

---

### Bước 2 — Network Layer xử lý Packet

Network Layer nhận **Packet** và kiểm tra **IP Header**.

IP Header chứa:

- **Source IP** = Machine A
- **Destination IP** = Machine D

Nếu Destination IP **không phải** địa chỉ của Machine D → gói bị **loại bỏ**.  
Nếu **đúng**, Network Layer **gỡ bỏ IP Header** và chuyển tiếp phần còn lại lên Transport Layer.

```
[IP Header] + Segment → remove IP Header → Segment
```

---

### Bước 3 — Transport Layer chuyển dữ liệu đến đúng ứng dụng

Transport Layer nhận **Segment**, đọc thông tin trong **Transport Header**:

- **Destination Port** cho biết ứng dụng nào (APP2) đang chờ dữ liệu.

Transport Layer **gỡ Transport Header** và chuyển dữ liệu lên **APP2**.

```
[Transport Header] + Data → remove Transport Header → Application Data
```

---

### Bước 4 — Application Layer nhận dữ liệu

Cuối cùng:

```
APP2 nhận "How are you?"
```

Ứng dụng có thể:

- Hiển thị kết quả cho người dùng
- Hoặc gửi phản hồi → bắt đầu một chu kỳ **Encapsulation → Transmission → Decapsulation** mới.

---

## Tóm tắt toàn bộ chu kỳ từ gửi đến nhận

```
(Machine A - Sender)
Application → Transport → Network → Data Link → Physical
      Encapsulation (Add Headers)

↓ Truyền dữ liệu qua nhiều router / hop ↓

(Machine D - Receiver)
Physical → Data Link → Network → Transport → Application
      Decapsulation (Remove Headers)
```

---

## Vậy còn những máy trung gian (Machine B, Machine C) thì sao?

Machine B và Machine C **không phải máy gửi**, cũng **không phải máy nhận**.

Chúng được gọi là:

> **Forwarding Devices** (thiết bị chuyển tiếp)  
> ví dụ: Router

Chúng không quan tâm đến ứng dụng hoặc dữ liệu bên trong — nhiệm vụ duy nhất của chúng là **đẩy gói tin đi đúng hướng**.

### Điều gì xảy ra tại Router B và Router C?

| Layer | Router (B/C) làm gì? |
| --- | --- |
| Data Link Layer | Chỉ xử lý MAC Header (Hop-by-Hop). Mỗi lần qua router, MAC Header **thay đổi**. |
| Network Layer | Đọc **Destination IP** → quyết định router tiếp theo (Next Hop). |
| Transport Layer | **Không mở và không đọc**. |
| Application Layer | **Không bao giờ chạm tới**. |

Nói cách khác:

- **MAC Header thay đổi ở mỗi hop**
- **IP Header không đổi xuyên suốt đường đi**
- **Transport Header & Application Data không bị router đụng chạm**

Chúng ta sẽ học cơ chế này khi đi vào **L2 Routing & L3 Routing**.

---

## Phần Tiếp Theo Trong Bài Học

Tiếp theo chúng ta sẽ bắt đầu chương rất quan trọng:

# **Behavior of Forwarding Devices (Router Processing Logic)**

Trong đó bạn sẽ học:

- Router quyết định Next Hop như thế nào?
- Sự khác nhau giữa **L2 forwarding** và **L3 routing**
- Tại sao MAC Header thay đổi còn IP Header thì không?
- Khái niệm **Routing Table**
