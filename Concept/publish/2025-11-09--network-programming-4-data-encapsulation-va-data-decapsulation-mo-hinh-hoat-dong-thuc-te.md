---
title: 'Network Programming #4: Data Encapsulation và Data Decapsulation — Mô Hình
  Hoạt Động Thực Tế'
date: '2025-11-09 23:02:26'
date_gmt: '2025-11-09 16:02:26'
modified: '2025-11-10 02:27:30'
status: publish
slug: network-programming-4-data-encapsulation-va-data-decapsulation-mo-hinh-hoat-dong-thuc-te
wordpress_id: 553
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/09/network-programming-4-data-encapsulation-va-data-decapsulation-mo-hinh-hoat-dong-thuc-te/
categories:
- Concept
tags: []
---

Trong quá trình truyền dữ liệu qua mạng, dữ liệu phải đi qua các layer của **TCP/IP stack**.  
Hai khái niệm cực kỳ quan trọng trong tiến trình này là:

- **Data Encapsulation (Đóng gói dữ liệu)** – diễn ra **trên máy gửi**
- **Data Decapsulation (Gỡ đóng gói dữ liệu)** – diễn ra **trên máy nhận**

Hãy xem điều gì thực sự xảy ra tại mỗi giai đoạn.

---

## Quá Trình Data Encapsulation (Trên Máy Gửi)

Giả sử chúng ta đang gửi một tin nhắn hoặc tải một trang web.  
Ứng dụng tạo ra dữ liệu → và dữ liệu đó sẽ lần lượt đi qua các layer từ trên xuống dưới.

### 1. Application Layer

Ứng dụng (ví dụ: web browser, messenger…) tạo ra **Application Data**.

### 2. Transport Layer (TCP hoặc UDP)

Transport Layer **gắn Transport Header** vào dữ liệu.

- Nếu dùng **TCP** → đảm bảo tin cậy, có kiểm soát lỗi, thứ tự gói.
- Nếu dùng **UDP** → nhanh, nhưng không đảm bảo truyền thành công.

Transport Header chứa:

- **Source Port** (ứng dụng gửi là ai)
- **Destination Port** (ứng dụng nhận là ai)

```
Transport Header + Application Data → Segment
```

### 3. Network Layer (IP)

Network Layer gắn **IP Header**.

IP Header chứa:

- **Source IP Address** (địa chỉ máy gửi)
- **Destination IP Address** (địa chỉ máy nhận)

```
IP Header + Segment → Packet
```

### 4. Data Link Layer (Ethernet / Wi-Fi)

Data Link Layer gắn **MAC Header**.

MAC Header chứa:

- **Source MAC** (địa chỉ phần cứng của node hiện tại)
- **Destination MAC** (địa chỉ của **hàng xóm kế tiếp** – next hop)

```
MAC Header + Packet → Frame
```

### 5. Physical Layer

Frame được biến thành **tín hiệu điện / sóng** để truyền qua dây hoặc sóng không dây.

```
Bits (0 và 1) truyền trên môi trường vật lý
```

---

## Quá Trình Data Decapsulation (Trên Máy Nhận)

Khi dữ liệu đến máy đích, quá trình diễn ra ngược lại — từ dưới lên trên.

### 1. Data Link Layer

- Nhận **Frame**
- Kiểm tra **MAC Header**
- **Gỡ bỏ MAC Header**
- Chuyển phần còn lại lên Network Layer

### 2. Network Layer

- Nhận **Packet**
- Kiểm tra **Destination IP**
- **Gỡ bỏ IP Header**
- Chuyển lên Transport Layer

### 3. Transport Layer

- Nhận **Segment**
- Kiểm tra **Destination Port**
- **Gỡ bỏ Transport Header**
- Chuyển dữ liệu lên Application Layer

### 4. Application Layer

- Ứng dụng tiêu thụ dữ liệu và hiển thị kết quả cho người dùng
- Hoặc tạo phản hồi (bắt đầu lại vòng lặp Encapsulation)

---

## Tóm tắt bằng sơ đồ

### Trên máy gửi – Encapsulation:

```
Application Data
      ↓
Transport Header + Data = Segment
      ↓
IP Header + Segment = Packet
      ↓
MAC Header + Packet = Frame
      ↓
Bits → Physical Transmission
```

### Trên máy nhận – Decapsulation:

```
Bits
↓
Frame → remove MAC Header
↓
Packet → remove IP Header
↓
Segment → remove Transport Header
↓
Application Data
```

---

## Quy Tắc Cốt Lõi Cần Nhớ

| Quá Trình | Hành động | Hướng dữ liệu |
| --- | --- | --- |
| Encapsulation | **Thêm Header** | Từ **Application → Physical Layer** |
| Decapsulation | **Gỡ Header** | Từ **Physical → Application Layer** |


---

## Tiếp Theo Chúng Ta Sẽ Học Gì?

Trong phần tiếp theo, chúng ta sẽ bắt đầu **đào sâu vào Transport Layer**, cụ thể:

- Sự khác nhau *thực tế* giữa **TCP** và **UDP**
- Vì sao **TCP** đảm bảo tin cậy còn **UDP** thì không?
- Khi nào dùng TCP? Khi nào dùng UDP?
- Minh họa bằng ví dụ thực tế dễ hiểu
