---
title: 'Network Programming #8: Tổng Quan Luồng Gói Tin Trong TCP/IP Stack (Incoming
  vs Outgoing)'
date: '2025-11-10 00:35:44'
date_gmt: '2025-11-09 17:35:44'
modified: '2025-11-10 02:27:21'
status: publish
slug: network-programming-8-tong-quan-luong-goi-tin-trong-tcp-ip-stack-incoming-vs-outgoing
wordpress_id: 565
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/10/network-programming-8-tong-quan-luong-goi-tin-trong-tcp-ip-stack-incoming-vs-outgoing/
categories:
- Concept
tags: []
---

Trong mạng máy tính, dữ liệu có thể **đi vào** (incoming traffic) hoặc **đi ra** (outgoing traffic) khỏi một máy tính. Hai hành trình này diễn ra theo **chiều ngược nhau** trong TCP/IP stack.

### Hành trình gói tin *đi vào* (Incoming Packet Journey)

Khi gói tin đến một máy tính:

1. **Data Link Layer** kiểm tra **Destination MAC Address**  
   → Xác định xem gói tin có thuộc **node hiện tại** hay không.
2. **Network Layer** kiểm tra **Destination IP Address**  
   → Xác định xem đây có phải **máy đích cuối cùng** hay chỉ là một **router trung gian**.
3. **Transport Layer** kiểm tra **Port Number** (Source/Destination Port)  
   → Xác định gói tin cần chuyển cho **ứng dụng nào** trên máy nhận.

```
Incoming Packet:
MAC → IP → Port → Application
```

---

### Hành trình gói tin *đi ra* (Outgoing Packet Journey)

Trong chiều ngược lại:

- Dữ liệu được **Application Layer** tạo ra.
- Sau đó đi xuống các layer:
  - Transport Layer → gắn **Transport Header**
  - Network Layer → gắn **IP Header**
  - Data Link Layer → gắn **MAC Header**

Mỗi layer **tự chèn (append) header của chính nó**, không quan tâm nội dung header của layer khác.

```
Outgoing Packet:
Application → Port → IP → MAC → Physical Transmission
```

---

## Các Layer Này Được Triển Khai Ở Đâu?

Điều quan trọng cần hiểu là:

> **Toàn bộ Transport Layer, Network Layer và Data Link Layer đều được triển khai bên trong Hệ Điều Hành (Operating System).**

Chúng **không nằm trong ứng dụng**.  
Ứng dụng chỉ **gửi yêu cầu** đến các layer này thông qua một cơ chế gọi là **System Call Interface**.

---

## System Call Interface là gì?

**System Call Interface** (giao diện lời gọi hệ thống) là tập hợp các **API / hàm** mà ứng dụng sử dụng để yêu cầu **dịch vụ của hệ điều hành**.

### Ví dụ quen thuộc:

Nếu bạn từng lập trình C và dùng:

```
malloc()
```

`malloc()` không tự mình cấp phát bộ nhớ.

- Thực chất nó **gửi yêu cầu** đến **Operating System** thông qua **system call** để xin vùng nhớ.
- OS sau đó cấp phát và trả lại địa chỉ cho ứng dụng.

→ Đây chính là **System Call Interface**.

---

## Vai Trò của System Call Interface trong Networking

Khi ứng dụng muốn gửi dữ liệu qua mạng, nó **không tự gửi đi** mà gọi system call:

Ví dụ:

```
send()
recv()
socket()
bind()
connect()
```

Những lời gọi này **yêu cầu OS kích hoạt TCP/IP stack** để xử lý dữ liệu.

```
Application
    ↓ (System Call Interface)
Transport Layer (TCP/UDP)
Network Layer (IP)
Data Link Layer (MAC/Ethernet)
Physical Layer (Hardware)
```

---

## Vai Trò của Device Drivers và Hardware

Bên dưới Operating System là **Hardware**, bao gồm:

- CPU
- GPU
- RAM
- Network Interface Card (NIC)
- USB Controllers
- Các thiết bị khác

**Drivers** là **phần mềm trung gian** giúp hệ điều hành **giao tiếp được với phần cứng**.

Ví dụ:

| Thành phần | Vai trò |
| --- | --- |
| NIC Driver | Cho phép OS gửi Frame ra mạng |
| GPU Driver | Cho phép OS chạy xử lý đồ họa |
| USB Driver | Cho phép OS nhận dữ liệu từ thiết bị ngoại vi |

Do đó:

> **OS ↔ Drivers ↔ Hardware**

---

## Tổng Kết Bức Tranh Hệ Thống (Networking Subsystem)

```
Applications (A1, A2, A3, ...)
        ↓ via System Call Interface
Transport Layer (TCP/UDP)
Network Layer (IP)
Data Link Layer (Ethernet/Wi-Fi)
        ↓ via Device Drivers
Network Interface Hardware (NIC)
        ↓
Physical Network (Cáp, Sóng, Internet)
```

---

## Kết Luận Phần Này

- Incoming packets: **kiểm tra MAC → IP → Port**
- Outgoing packets: **append header → truyền xuống hardware**
- TCP/IP stack nằm **bên trong hệ điều hành**
- Ứng dụng **không đụng trực tiếp TCP/IP stack**, mà phải thông qua **System Calls**
- Device Drivers cho phép OS giao tiếp với phần cứng mạng

---

## Phần Tiếp Theo Cực Kỳ Quan Trọng:

# **Transport Layer in Depth — TCP vs UDP**

Chúng ta sẽ học:

- Cơ chế đảm bảo tin cậy của **TCP**
- **Three-Way Handshake**
- **Sequence Number**, **ACK Number**
- Tại sao UDP nhanh nhưng *không đảm bảo*?
- Vận dụng vào thực tế: Web, Game, Video Call,…
