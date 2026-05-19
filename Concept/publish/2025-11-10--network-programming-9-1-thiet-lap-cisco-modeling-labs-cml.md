---
title: 'Network Programming #9.1: Thiết Lập Cisco Modeling Labs (CML)'
date: '2025-11-10 01:20:49'
date_gmt: '2025-11-09 18:20:49'
modified: '2025-11-10 02:27:19'
status: publish
slug: network-programming-9-1-thiet-lap-cisco-modeling-labs-cml
wordpress_id: 568
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/10/network-programming-9-1-thiet-lap-cisco-modeling-labs-cml/
categories:
- Concept
tags: []
---

Trong phần này, chúng ta sẽ tìm hiểu và thiết lập **Cisco Modeling Labs (CML)**.

---

## Cisco Modeling Labs (CML) là gì?

**Cisco Modeling Labs**, thường được viết tắt là **CML**, là một **nền tảng mô phỏng mạng (Network Simulation Platform)** do Cisco phát triển.  
Nó cho phép người dùng:

- Thiết kế (design)
- Xây dựng (build)
- Mô phỏng (simulate)

các **topology mạng phức tạp** sử dụng thiết bị Cisco **hoàn toàn dưới dạng ảo hóa**.

CML được sử dụng rộng rãi trong:

| Mục đích | Ví dụ |
| --- | --- |
| Học tập | Sinh viên, người mới học mạng |
| Luyện thi chứng chỉ | CCNA, CCNP, CCIE |
| Kiểm thử cấu hình | Network Lab Testing trước khi triển khai thật |
| Nghiên cứu & mô phỏng | Thử nghiệm giao thức, kiến trúc mạng |


---

## Ưu điểm lớn nhất của CML

### **1. CML chạy hoàn toàn từ xa (Remote Lab)**

Bạn **không cần cài đặt gì trên máy local**.

- Không yêu cầu CPU mạnh
- Không cần RAM lớn
- Không phụ thuộc Card mạng ảo phức tạp

Chỉ cần **trình duyệt web + Internet** là có thể sử dụng ngay.

→ Điều này giúp **tránh lỗi cài môi trường** – một vấn đề phổ biến khi dùng GNS3 hoặc EVE-NG.

---

### **2. Miễn phí cho sinh viên / người tự học**

Cisco cung cấp CML phiên bản **miễn phí** cho người học.  
Tuy nhiên, đi kèm **một số giới hạn**:

| Yếu tố | Chi tiết |
| --- | --- |
| Hình thức sử dụng | Phải **đặt lịch / reserve lab** |
| Thời gian sử dụng mỗi lần | Tối đa **4 giờ / phiên** |
| Khi hết thời gian | Cần **đặt lịch lại** |
| Tài nguyên thiết bị | Chia sẻ **server với nhiều người trên thế giới** |

→ Nhưng trong thực tế, **phần lớn thời điểm đều có slot trống** để sử dụng ngay.

---

### **3. Cung cấp đủ các thiết bị Cisco quan trọng**

Bạn sẽ có sẵn:

- Router Cisco
- Switch Cisco
- Server và Terminal Console
- Kết nối Link tùy chỉnh
- Công cụ giám sát và ghi log gói tin

→ **Quá đủ cho học CCNA / CCNP** và các bài lab mạng phổ biến.

---

## So sánh CML với GNS3 & EVE-NG

| Công cụ | Ưu điểm | Nhược điểm |
| --- | --- | --- |
| **CML** | Không cần cài đặt, chạy từ xa, ổn định, thiết bị Cisco chuẩn | Cần đặt lịch, giới hạn thời gian |
| **GNS3** | Linh hoạt, chạy được nhiều vendor | Cần máy mạnh, cài đặt phức tạp |
| **EVE-NG** | Dùng cho lab chuyên sâu & doanh nghiệp, hỗ trợ đa vendor | Rất nặng, khó cài đặt, đòi hỏi cấu hình cao |

→ Đối với **người mới / tự học** → **CML là lựa chọn tốt nhất**.

---

## Cách truy cập và khởi chạy CML (Tổng quan)

1. Đăng ký tài khoản trên website Cisco Networking Academy.
2. Truy cập mục **Cisco Modeling Labs Remote Sandbox**.
3. **Đặt lịch (Reserve Lab)** → thường 4 giờ.
4. Nhận email xác nhận kèm link truy cập.
5. Mở lab trong Browser → kéo thả thiết bị → kết nối → Start simulation.

Toàn bộ quá trình thiết lập **chỉ 10–15 phút**, không có lỗi driver, không lỗi môi trường.

---

## Kết luận phần này

- **CML** là giải pháp mô phỏng mạng **nhẹ, dễ dùng, không yêu cầu máy mạnh**.
- Là công cụ lý tưởng cho **sinh viên, người học chứng chỉ CCNA/CCNP, người mới học mạng**.
- Dễ dàng tạo và thử nghiệm các **network topology thực tế** trước khi triển khai ngoài đời.

---

## Phần Tiếp Theo (Rất Quan Trọng)

Trong phần tiếp theo, chúng ta sẽ:

- **Truy cập vào CML**
- **Tạo lab đầu tiên**
- Thêm Router, Switch
- Kết nối interface
- Mở Console và bắt đầu cấu hình thực tế

Tức là:

> **Bây giờ chúng ta sẽ chuyển từ lý thuyết → thực hành.**
