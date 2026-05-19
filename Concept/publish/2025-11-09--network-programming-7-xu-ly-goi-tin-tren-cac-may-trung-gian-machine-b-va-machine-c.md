---
title: 'Network Programming #7: Xử lý Gói Tin Trên Các Máy Trung Gian (Machine B và
  Machine C)'
date: '2025-11-09 23:18:49'
date_gmt: '2025-11-09 16:18:49'
modified: '2025-11-10 02:27:23'
status: publish
slug: network-programming-7-xu-ly-goi-tin-tren-cac-may-trung-gian-machine-b-va-machine-c
wordpress_id: 563
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/09/network-programming-7-xu-ly-goi-tin-tren-cac-may-trung-gian-machine-b-va-machine-c/
categories:
- Concept
tags: []
---

Ở các phần trước, chúng ta đã hiểu:

- **Machine A** (máy gửi) thực hiện **Data Encapsulation**
- **Machine D** (máy nhận) thực hiện **Data Decapsulation**

Nhưng trong thực tế, dữ liệu thường **không đi trực tiếp** từ A đến D.  
Nó phải đi qua nhiều thiết bị trung gian (Router), ví dụ:

```
Machine A → Machine B → Machine C → Machine D
```

Machine B và Machine C **không phải máy gửi**, **không phải máy nhận**, mà là:

> **Forwarding Machines** (máy chuyển tiếp)

Chúng đóng vai trò cực kỳ quan trọng trong quá trình truyền dữ liệu trên Internet.

---

## Điều Gì Xảy Ra Trên Máy Trung Gian (Ví dụ: Machine B)?

### 1. Data Link Layer nhận dữ liệu từ đường truyền

Machine B **nhận Frame** từ Machine A.

- MAC Header lúc này chứa:
  - **Source MAC** = MAC của Machine A
  - **Destination MAC** = MAC của Machine B (vì Data Link Layer chỉ giao tiếp **giữa các nút liền kề**)

Data Link Layer trên Machine B:

- **Gỡ bỏ MAC Header**
- Chuyển phần còn lại (Packet) lên **Network Layer**

```
Frame → remove MAC Header → Packet
```

---

### 2. Network Layer kiểm tra IP Header

Network Layer đọc **Destination IP** trong IP Header.

- Nếu **Destination IP == IP của Machine B** → gói tin dành cho máy này ⇒ xử lý tiếp lên Transport Layer.
- Nếu **Destination IP != IP của Machine B** → gói tin **không dành cho Machine B** ⇒ phải **forward**.

Trong ví dụ này, **gói tin phải được chuyển tiếp đến Machine D**.

Machine B tra **Routing Table** để tìm **Next Hop** → là **Machine C**.

Sau đó, Network Layer **chuyển Packet trở lại cho Data Link Layer** để chuẩn bị truyền tiếp.

---

### 3. Data Link Layer trên Machine B tạo MAC Header mới

Bởi vì Data Link Layer chỉ làm việc **hop-by-hop**, nên khi chuyển tiếp sang Machine C, MAC Header sẽ được **tạo mới**:

| Trường trong MAC Header mới | Giá trị |
| --- | --- |
| Source MAC | MAC của Machine B |
| Destination MAC | MAC của Machine C (Next Hop) |

Sau đó, Data Link Layer:

- Đóng gói lại Frame
- Truyền dữ liệu xuống Physical Layer
- Phát lên đường truyền tới Machine C

```
Packet → add new MAC Header → Frame → gửi đi
```

---

## Điều Gì Diễn Ra Trên Machine C?

Quá trình **giống hệt Machine B**:

1. Data Link Layer:
   - Nhận Frame từ Machine B
   - Kiểm tra MAC Header
   - Gỡ bỏ MAC Header → gửi Packet lên Network Layer
2. Network Layer:
   - Kiểm tra Destination IP → nhận ra Packet chưa đến đích
   - Xác định Next Hop = Machine D
   - Chuyển Packet xuống Data Link Layer
3. Data Link Layer:
   - Tạo MAC Header mới:
     - Source MAC = MAC của Machine C
     - Destination MAC = MAC của Machine D
   - Gửi Frame đi tiếp

---

## Lưu Ý Cực Kỳ Quan Trọng

### **MAC Header thay đổi theo từng hop, IP Header giữ nguyên suốt đường đi**

| Thông tin | Thay đổi? | Ai xử lý? | Ý nghĩa |
| --- | --- | --- | --- |
| MAC Header | ✅ Thay đổi tại mỗi router | Data Link Layer | Hop-by-Hop delivery |
| IP Header | ❌ Không thay đổi | Network Layer | End-to-End delivery |
| Transport Header | ❌ Không thay đổi | Transport Layer (chỉ máy gửi/nhận dùng) | Process-to-Process delivery |
| Application Data | ❌ Không thay đổi | Application Layer | Nội dung truyền thật sự |


---

## Tóm Tắt Chức Năng Các Layer

| Layer | Nhiệm vụ chính | Biết thông tin gì? | Không biết thông tin gì? |
| --- | --- | --- | --- |
| **Transport Layer (TCP/UDP)** | Giao tiếp giữa **APP1 ↔ APP2** | Port (Process Identity) | IP, MAC |
| **Network Layer (IP)** | Giao tiếp giữa **Machine A ↔ Machine D** | Source/Destination IP | Port, MAC |
| **Data Link Layer (Ethernet/Wi-Fi)** | Giao tiếp **Hop-by-Hop** | Source/Destination MAC | IP, Port |


---

## Thuật Ngữ Đổi Tên Dữ Liệu Theo Layer

| Khi dữ liệu ở Layer | Gọi là | Ví dụ |
| --- | --- | --- |
| Application Layer | **Data** | `"How are you?"` |
| Transport Layer | **Segment** | TCP Segment |
| Network Layer | **Packet** | IP Packet |
| Data Link Layer | **Frame** | Ethernet Frame |
| Physical Layer | **Bits** | 0 và 1 |


---

## Kết Luận Phần Encapsulation/Decapsulation

- Mỗi layer có **chức năng riêng** và **không can thiệp** layer khác
- MAC Header thay đổi **hop-by-hop**
- IP Header giữ nguyên từ **source → destination**
- Thông tin **Process**, **Machine**, **Next Hop** được đóng gói ở **các layer khác nhau**

Sự phối hợp nhịp nhàng này giúp:

> **Ứng dụng APP1 trên Machine A có thể nói chuyện được với APP2 trên Machine D dù nằm cách nhau nửa vòng trái đất.**

---

## Tiếp Theo: Bắt Đầu Transport Layer — **TCP vs UDP**

Trong bài tới chúng ta sẽ học:

- TCP hoạt động như thế nào để **đảm bảo dữ liệu không bị mất**?
- Cơ chế **Three-Way Handshake**
- Khái niệm **Sequence Number**, **Acknowledgment Number**
- Tại sao UDP **nhanh hơn nhưng không tin cậy**?
- Lúc nào dùng TCP, lúc nào dùng UDP?
