---
title: 'Network Programming #10: Module 3 – Subnetting và Toán IP (IP Address Math)'
date: '2025-11-10 02:25:18'
date_gmt: '2025-11-09 19:25:18'
modified: '2025-11-10 02:27:16'
status: publish
slug: network-programming-10-module-3-subnetting-va-toan-ip-ip-address-math
wordpress_id: 570
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/10/network-programming-10-module-3-subnetting-va-toan-ip-ip-address-math/
categories:
- Concept
tags: []
---

Trong module này, chúng ta sẽ học cách phân chia mạng thành các mạng con nhỏ hơn (subnets), cách xác định **network ID**, **broadcast address**, cách phân biệt **local subnet** và **remote subnet**, và giới thiệu nền tảng của **L2 Routing** và **L3 Routing**.

Đây là **kiến thức trung tâm của mạng máy tính**.  
Nếu bạn dự định thi **CCNA**, **CCNP**, hoặc phỏng vấn tại Cisco, Juniper, F5, HPE…, câu đầu tiên gần như **luôn luôn** là:

> “Giải thích sự khác nhau giữa **L2 Routing** và **L3 Routing**.”

Vì vậy, hãy học phần này thật kỹ.

---

## **1. Subnetting là gì?**

**Subnetting** là quá trình **chia một mạng lớn thành nhiều mạng con nhỏ hơn (subnets)**.

Tương tự đời thực:

- Chia **một quốc gia thành các tỉnh**
- Chia **một lớp thành nhiều tổ**
- Chia **một khu dân cư thành từng block**

Mục đích:

- Giảm độ phức tạp
- Tăng tính tổ chức
- Dễ quản lý và giám sát
- Tối ưu hiệu năng mạng (giảm broadcast traffic)

---

## **2. Subnet là Layer nào?**

Một subnet thuộc **Layer 2 (Data Link Layer)** của TCP/IP stack.

- Nếu **hai máy nằm trong cùng subnet** → **Data Link Layer (L2 Routing)** đảm nhiệm truyền dữ liệu.
- Nếu **hai máy nằm ở hai subnet khác nhau** → phải dùng **Network Layer (L3 Routing)**.

**Điểm rất quan trọng:**

| Trường hợp giao tiếp | Ai chịu trách nhiệm? | Layer tham gia |
| --- | --- | --- |
| Hai máy trong **cùng subnet** | Data Link Layer | L2 Routing |
| Hai máy thuộc **khác subnet** | Network Layer | L3 Routing (Router phải tham gia) |


---

## **3. L3 Routing hoạt động như thế nào?**

L3 Routing **không truyền gói tin từ máy đến máy**, mà **truyền từ subnet nguồn đến subnet đích**.

Điểm cần nắm thật chắc:

> **Network Layer chịu trách nhiệm đưa gói tin từ subnet nguồn → subnet đích, không phải từ máy nguồn → máy đích.**

Sau khi gói tin **đến đúng subnet đích**, lúc đó **L2 Routing** sẽ tiếp tục đưa gói tin đến **máy đích cuối cùng**.

---

## **4. Ví dụ minh họa quan trọng**

Giả sử:

| Máy / Interface | IP Address | Subnet |
| --- | --- | --- |
| Machine VM1 | 192.168.1.1 | 192.168.1.0/24 (Subnet A) |
| Machine VM2 | 192.168.1.2 | 192.168.1.0/24 (Subnet A) |
| Router VM | 192.168.4.5 | 192.168.4.0/24 (Subnet B) |

### **Trường hợp 1: Router VM → 192.168.1.1**

- Router VM nằm trong **Subnet B**
- IP đích 192.168.1.1 nằm trong **Subnet A**

→ Hai subnet khác nhau → **L3 Routing phải được dùng** (Router tham gia)

---

### **Trường hợp 2: Router VM → 192.168.4.1**

- Router VM và máy đích đều nằm trong **Subnet B**

→ **L2 Routing là đủ**, không cần Router định tuyến.

---

## **5. IP Address và MAC Address thuộc về cái gì?**

Một sai lầm cực kỳ phổ biến:

> “Máy tính có IP Address và MAC Address.”

Điều này **sai**.

Sự thật:

| Giá trị | Thuộc về | Không thuộc về |
| --- | --- | --- |
| **IP Address** | **Interface mạng (Network Interface)** | Máy tính |
| **MAC Address** | **Interface mạng (Card mạng / NIC)** | Máy tính |

Vì một máy có thể có:

- Nhiều interface
- Mỗi interface có **IP và MAC riêng**

**Chúng ta không gửi dữ liệu đến Subnet.  
Chúng ta gửi dữ liệu đến *một interface cụ thể* của máy đích.**

Giống như:

- Bạn không gửi thư chỉ ghi *Tên Thành Phố*
- Bạn phải ghi **địa chỉ nhà cụ thể**

---

## **6. IP Header (bên trong Network Layer)**

Trong IP Header có 2 trường rất quan trọng:

| Trường | Ý nghĩa | Dạng dữ liệu |
| --- | --- | --- |
| **Source Address** | IP của máy gửi | 32-bit integer |
| **Destination Address** | IP của máy nhận | 32-bit integer |

Điểm cần nhớ:

- Địa chỉ trong IP Header **không có subnet mask**
- Subnet mask chỉ được dùng **để máy tính tính subnet**, không được gửi trong gói tin.

---

## **7. Quy Ước Tên Gọi Dữ Liệu Theo Layer**

| Layer | Tên dữ liệu | Ví dụ |
| --- | --- | --- |
| Application Layer | **Data** | "How are you?" |
| Transport Layer | **Segment** | TCP Segment |
| Network Layer | **Packet** | IP Packet |
| Data Link Layer | **Frame** | Ethernet Frame |
| Physical Layer | **Bits** | 0 / 1 |

→ Đây là câu hỏi **phỏng vấn kinh điển**.

---

## **Tóm Tắt Lý Thuyết Trọng Tâm**

1. **Subnetting = chia mạng lớn thành mạng nhỏ**
2. **Subnet thuộc Layer 2**
3. **L2 Routing**: giao tiếp trong cùng subnet
4. **L3 Routing**: giao tiếp giữa các subnet
5. **IP và MAC gắn với Interface, không phải máy**
6. **IP Header không chứa subnet mask**
7. Tên dữ liệu thay đổi theo layer (Data → Segment → Packet → Frame → Bits)

---

## **Ở phần tiếp theo chúng ta sẽ học:**

### **Cách tính Subnet (Network ID, Broadcast Address, Host Range)**

Chúng ta sẽ bắt đầu với ví dụ:

```
192.168.10.25 /24
```

Và bạn sẽ học cách tính:

- Network ID
- First usable host
- Last usable host
- Broadcast address

Mình sẽ dạy theo cách:

- **Không cần bảng subnet**
- **Không cần mẹo nhớ phức tạp**
- Chỉ cần **logic + hiểu bản chất**
