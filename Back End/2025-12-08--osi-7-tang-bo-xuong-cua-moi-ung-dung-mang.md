---
title: 'Fundamentals of Backend 14: OSI 7 tầng – “bộ xương” của mọi ứng dụng mạng'
date: '2025-12-08 00:27:34'
date_gmt: '2025-12-07 17:27:34'
modified: '2026-01-21 15:23:52'
status: publish
slug: osi-7-tang-bo-xuong-cua-moi-ung-dung-mang
wordpress_id: 623
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/12/08/osi-7-tang-bo-xuong-cua-moi-ung-dung-mang/
categories:
- Back End
tags: []
---

> Người viết: *“20 năm trước tôi học OSI mà chẳng hiểu gì, chỉ thuộc lòng cho qua kỳ thi. Giờ nhìn lại mới thấy tiếc: nếu không hiểu OSI, coi như bạn đang code trong bóng tối, không biết gói tin của mình đang chạy ở đâu, va chạm gì, và tại sao lại chậm/trễ/mất.”*

---

## 1. Tại sao thế giới cần một… “mô hình”?

- **Không có chuẩn → mỗi nhà làm một kiểu**: Ứng dụng của bạn phải có bản “Wi-Fi”, bản “Ethernet”, bản “4G” riêng biệt.
- **Có chuẩn → viết một lần, chạy mọi nơi**: Node.js, Python, Go… chỉ cần gọi `fetch()`/`http.Get()` là có dữ liệu, mặc kệ dưới là ánh sáng (fiber), điện (cáp đồng) hay sóng vô tuyến (Wi-Fi/5G).

→ OSI (Open Systems Interconnection) sinh ra để **chia nhỏ bài toán**, mỗi tầng chỉ lo một nhiệm vụ, và **tách biệt phương tiện vật lý** khỏi logic ứng dụng.  
→ Đổi mới ở tầng nào không ảnh hưởng tầng kia: thay cáp quang bằng… “tia laser xanh” (nếu có) cũng chỉ đụng tầng 1, ứng dụng bạn vẫn yên.

---

## 2. 7 tầng – “bí kíp” nhớ nhanh

| Tầng | Tên tiếng Anh | Keyword dễ nhớ | Đơn vị dữ liệu | Câu hỏi nổi tiếng |
| --- | --- | --- | --- | --- |
| 7 | Application | “App” | Data (JSON, HTTP, gRPC) | “Tôi muốn gửi gì?” |
| 6 | Presentation | “Parse” (serialize/encrypt) | Data | “Dữ liệu viết bằng gì? JSON? XML? UTF-8?” |
| 5 | Session | “State” (giữ phiên) | Data | “Ai đang nói chuyện với ai? Có cần đăng nhập lại?” |
| 4 | Transport | “Port” | Segment (TCP) / Datagram (UDP) | “Gửi đến tiến trình nào trên máy đích?” |
| 3 | Network | “IP/Route” | Packet | “Đường đi ngắn nhất ra sao? Qua router nào?” |
| 2 | Data-Link | “MAC” | Frame | “Trong cùng một đoạn cáp LAN, máy nào nhận?” |
| 1 | Physical | “Bit-0-1” | Bit (điện, sáng, sóng) | “Bit 0/1 chuyển thành tín hiệu gì?” |

**Thần chú 7 chữ**:  
*“Aunt Pussy Should Try New Diet Books”* → Application – Presentation – Session – Transport – Network – Data-link – Books (Physical).

---

## 3. Tuần tự “Nén – Gói – Gửi – Nở” của một POST JSON

Client gọi `axios.post('https://api.x/orders', {coffee: "espresso"})`

1. **Tầng 7**: JS object `{coffee: "espresso"}`
2. **Tầng 6**: serialize thành chuỗi byte `"{"coffee":"espresso"}"`
3. **Tầng 5**: mở TLS handshake (nếu https), lưu session ID
4. **Tầng 4**: TCP three-way handshake (SYN → SYN-ACK → ACK), thêm port 443
5. **Tầng 3**: thêm IP header (src: 192.168.1.5, dst: 104.16.42.99)
6. **Tầng 2**: ARP tìm MAC của gateway, thêm MAC header
7. **Tầng 1**: 0/1 → điện hoặc sóng Wi-Fi 5 GHz

**Server** làm ngược lại:  
Physical → Frame → Packet → Segment → Session (giải mã TLS) → Deserialize → Express callback.

---

## 4. Ứng dụng của bạn sống ở tầng mấy?

| Loại app / thiết bị | Tầng chủ đạo | Có thể nhìn thấy gì? | Ví dụ |
| --- | --- | --- | --- |
| Load-balancer dựa trên URL path | 7 | `/images/*` vs `/api/*` | Nginx, HAProxy, Envoy |
| Reverse-proxy cache | 7 | body JSON, cookie | Cloudflare, Fastly |
| Firewall “deep inspect” | 5-7 | TLS session, SNI | Zscaler, Palo Alto |
| Firewall “trong suốt” | 3-4 | IP, port | iptables, AWS NACL |
| Router | 3 | IP dst | Cisco, Juniper |
| Switch managed | 2 | MAC | Cisco Catalyst |
| Hub / repeater | 1 | bit | …bây giờ hiếm lắm! |

→ Biết mình ở tầng nào → biết mình **có quyền gì** (và bị bó buộc gì).  
Ví dụ:

- Layer-4 LB chỉ đổi dst-port, **không đọc được URL** → nhanh.
- Layer-7 LB **phải decrypt TLS** để đọc path → chậm hơn, nhưng linh hoạt.

---

## 5. TCP/IP model – “rút gọn” OSI

Do thực tế người ta ghép 5-6-7 thành **Application**, bỏ tách biệt Presentation & Session → còn 4 tầng:  
Application (HTTP, FTP…) → Transport (TCP/UDP) → Internet (IP) → Network Access (Ethernet/Wi-Fi).

→ Dễ nói chuyện, nhưng **mất granularity**: bạn sẽ ít khi nghe ai nói “tôi viết app layer-5” nữa.  
→ Trong DevOps/Cloud, vẫn dùng ngôn ngữ OSI: “layer-7 ingress”, “layer-4 load balancer”…

---

## 6. Các “gói nhỏ” trong “gói lớn” – Matryoshka packet

Copy

```
[ Ethernet Frame ]
  └─ IP Packet
       └─ TCP Segment
            └─ TLS Record
                 └─ HTTP/2 Frame
                      └─ JSON byte string
```

Kích thước tối đa mỗi tầng:

- Ethernet: 1 500 byte (MTU) → IP packet ≤ 1 500 → nếu to hơn phải **fragment** (tránh được càng tốt).
- TCP MSS thường 1 460 byte (để chừng chỗ cho header).

---

## 7. Lợi ích thiết thực khi bạn HIỂU OSI

1. **Debug đúng chỗ**:
   - High retransmit = nghẽn tầng 4 (congestion).
   - “Destination host unreachable” = tầng 3 (routing).
   - “ARP timeout” = tầng 2 (sai VLAN).
2. **Tối ưu đúng tầng**: nén JSON (tầng 6), reuse connection (tầng 5), tuning TCP window (tầng 4), path MTU (tầng 3).
3. **Bảo mật đúng chỗ**:
   - Có thể bị sniff MAC (tầng 2) trong cùng LAN → dùng switch protected port.
   - IP spoofing (tầng 3) → uRPF, ACL.
   - TLS fingerprint (tầng 5-6) → ngăn bot.
4. **Phỏng vấn SRE/Network**: “Kể bạn đi qua bao nhiêu tầng khi bấm google.com?” – trả lời trôi chảy!

---

## 8. Tóm tắt nhanh – “phiếu nhớ” dán tường

- OSI 7 tầng: **A-P-S-T-N-D-P**
- Đơn vị: **Data – Segment – Packet – Frame – Bit**
- Router = 3, Switch = 2, LB/Proxy = 4-7, VPN = 3 (IP-in-IP)
- Ứng dụng bạn ở tầng **Application (7)**, nhưng nếu bạn chỉ quản kết nối (pooling) → **Session (5)**.
- **Không bao giờ** đặt “đoạn mã kiểm tra điện áp” trong app của bạn – tầng 1 đã có người lo!

---

## 9. Tài nguyên đào sâu

- Sách: “Computer Networking – A Top-Down Approach” – Kurose & Ross.
- Labs: Wireshark + filter `tcp.stream eq 0`, xem handshake ngay tầng 4.
- RFC 791 (IP), 793 (TCP), 5246 (TLS 1.2) – đọc lướt header format.
- Tool: `ping` (3), `traceroute` (3), `tcpdump` (2-4), `ss -tlnp` (4).

---

## 10. Kết

OSI không phải bài học “vô thưởng vô phạt” – nó là **bản đồ bí mật** giúp bạn:

- Biết gói tin đang lạc trôi ở đâu.
- Hiểu vì sao ứng dụng chậm, mất gói, time-out.
- Thiết kế hệ thống scalable, chọn đúng công cụ (L4 hay L7 LB?), và **nói chuyện cùng ngôn ngữ** với network-team, DevOps, security-team.

> *“Once you ‘see’ the layers, you can’t un-see them.”* – Happy hacking!
