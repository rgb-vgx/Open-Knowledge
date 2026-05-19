---
title: 'Mạng Máy Tính (Phần 2): Hub, Bridge, và Switch - Cuộc Tiến Hóa Của Kết Nối'
date: '2025-07-04 23:27:55'
date_gmt: '2025-07-04 16:27:55'
modified: '2025-07-04 23:27:55'
status: publish
slug: mang-may-tinh-phan-2-hub-bridge-va-switch-cuoc-tien-hoa-cua-ket-noi
wordpress_id: 88
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/04/mang-may-tinh-phan-2-hub-bridge-va-switch-cuoc-tien-hoa-cua-ket-noi/
categories:
- Network
tags: []
---

Ở phần 1, chúng ta đã làm quen với mạng LAN và "chứng minh thư" MAC. Giờ là lúc tìm hiểu sâu hơn về các thiết bị đã tạo nên cuộc cách mạng trong việc kết nối: Hub, Bridge, và Switch. Đây là câu chuyện về sự tiến hóa từ "ngốc nghếch" đến "thông minh".

### Giao tiếp 1-1: Unicast là gì?

Trước khi bắt đầu, hãy làm rõ một thuật ngữ. Khi một thiết bị muốn gửi dữ liệu trực tiếp và chỉ riêng cho một thiết bị khác, chúng ta gọi đó là **Unicast**. Ví dụ, máy tính có địa chỉ `MAC_1` gửi file cho máy tính có địa chỉ `MAC_2`. Đây là hình thức giao tiếp phổ biến nhất trong mạng.

### 1. Kẻ "Ngốc Nghếch" Thời Khai Sơ - Hub

Hub là một trong những thiết bị kết nối mạng LAN đời đầu. Cách hoạt động của nó cực kỳ đơn giản, hay nói thẳng ra là khá "ngốc nghếch".

Khi một khung Ethernet (Ethernet Frame) từ một máy tính đi vào Hub, Hub không cần biết người nhận là ai. Nó chỉ làm một việc duy nhất: **sao chép và đẩy (flood) khung tin đó ra tất cả các cổng khác**.

**Vấn đề của Hub:**

- **Không hiệu quả:** Dữ liệu được gửi đến cả những máy tính không phải là đích, gây ra lưu lượng mạng không cần thiết.
- **Miền Đụng Độ (Collision Domain):** Đây là nhược điểm chí mạng. Vì Hub hoạt động như một đường dây chung, nếu hai máy tính cùng cố gắng gửi dữ liệu *cùng một lúc*, dữ liệu của chúng sẽ va vào nhau, gây ra một vụ **đụng độ (collision)**. Khi đó, cả hai đều phải dừng lại, chờ một khoảng thời gian ngẫu nhiên rồi mới thử gửi lại. Toàn bộ các thiết bị kết nối với Hub tạo thành **một miền đụng độ duy nhất**. Điều này giống như một con đường một làn xe, tất cả phải lần lượt đi chứ không thể đi cùng lúc.

Chính vì những lý do này, Hub gần như không còn được sử dụng trong các mạng hiện đại.

### 2. Bước Đệm Thông Minh - Bridge (Cầu nối)

Để giải quyết vấn đề của Hub, **Bridge** ra đời. Bridge thông minh hơn Hub một bậc. Nhiệm vụ của nó là kết nối hai phân đoạn mạng khác nhau (ví dụ: hai cái Hub).

Vũ khí bí mật của Bridge là một **bảng địa chỉ MAC (MAC address table)**. Bridge "học" và ghi nhớ các địa chỉ MAC nào đang tồn tại ở mỗi phía của nó.

**Cách Bridge hoạt động:**

- **Tình huống 1: Giao tiếp trong cùng một phía.** Máy `MAC_1` gửi dữ liệu cho `MAC_2`. Dữ liệu đến Hub và được đẩy ra các cổng, trong đó có cổng nối đến Bridge. Bridge nhìn vào địa chỉ MAC đích là `MAC_2` và tra bảng. Nó thấy `MAC_2` cũng ở cùng phía với `MAC_1`. Bridge sẽ quyết định: "Không cần chuyển tiếp gói tin này qua phía bên kia". Giao thông được cô lập, giảm tải cho phần mạng còn lại.
- **Tình huống 2: Giao tiếp giữa hai phía.** Máy `MAC_1` gửi dữ liệu cho `MAC_4`. Dữ liệu đến Bridge. Bridge tra bảng, thấy `MAC_4` ở phía bên kia và sẽ chuyển tiếp khung tin đó sang.

Lợi ích lớn nhất của Bridge là nó đã **chia một miền đụng độ lớn thành hai miền đụng độ nhỏ hơn**. Máy `MAC_1` và `MAC_3` giờ đây có thể truyền dữ liệu cùng lúc mà không sợ đụng độ. Bridge chính là tiền thân trực tiếp của Switch.

### 3. Kẻ Thống Trị Hiện Đại - Switch (Bộ chuyển mạch)

Switch có thể được coi là một chiếc "Bridge nhiều cổng". Nó là sự kết hợp hoàn hảo giữa khả năng kết nối của Hub và trí thông minh của Bridge, và là tiêu chuẩn của mạng LAN ngày nay.

Giống như Bridge, Switch cũng duy trì một bảng địa chỉ MAC chi tiết, nhưng nó ánh xạ từng địa chỉ MAC với **từng cổng cụ thể** mà thiết bị đó đang kết nối.

Khi máy `MAC_1` gửi một gói tin Unicast đến `MAC_2`:

1. Khung tin đến Switch.
2. Switch đọc địa chỉ MAC đích là `MAC_2`.
3. Switch tra bảng, thấy rằng `MAC_2` đang được kết nối ở `Cổng 2`.
4. Switch chỉ chuyển tiếp chính xác khung tin đó đến `Cổng 2` mà không làm phiền đến các cổng khác.

**Siêu năng lực của Switch:**

Switch đã tạo ra một cuộc cách mạng bằng cách **biến mỗi cổng của nó thành một miền đụng độ riêng biệt**. Điều này có nghĩa là tất cả bốn máy tính trong sơ đồ trên có thể gửi và nhận dữ liệu cùng một lúc mà không bao giờ xảy ra đụng độ!

### 4. Miền Đụng Độ vs. Miền Quảng Bá (Broadcast Domain)

Chúng ta đã thấy Switch giải quyết triệt để vấn đề "miền đụng độ". Nhưng có một khái niệm khác bạn cần nắm: **Miền Quảng Bá (Broadcast Domain)**.

Đôi khi, một máy tính cần gửi tin nhắn cho **TẤT CẢ** các thiết bị khác trong mạng LAN (ví dụ: để hỏi "ai có địa chỉ IP này?"). Nó sẽ gửi một khung tin với địa chỉ MAC đích đặc biệt là địa chỉ quảng bá (broadcast address: `FF:FF:FF:FF:FF:FF`).

Khi một Switch nhận được một khung tin quảng bá, nó sẽ hành động giống như một chiếc Hub: **đẩy khung tin đó ra tất cả các cổng** (trừ cổng mà nó nhận vào).

> **Toàn bộ một Switch (hoặc nhiều Switch kết nối với nhau) tạo thành một miền quảng bá duy nhất.**

### Giới Hạn và Hướng Đi Tiếp Theo

Khi mạng LAN của bạn ngày càng lớn, kết nối nhiều thiết bị và nhiều Switch với nhau, miền quảng bá cũng phình to ra. Điều này dẫn đến hai vấn đề:

1. **Lưu lượng quảng bá (broadcast traffic) quá lớn**, làm chậm toàn bộ mạng.
2. **Bảng địa chỉ MAC của Switch trở nên khổng lồ**, khó quản lý.

Một mạng Layer 2 (mạng hoạt động dựa trên địa chỉ MAC) không thể phát triển mãi mãi. Cũng giống như chúng ta dùng Bridge để chia nhỏ miền đụng độ, chúng ta sẽ cần một thiết bị khác để **chia nhỏ miền quảng bá**. Và thiết bị đó chính là **Router**. Chúng ta sẽ tìm hiểu về Router trong bài học tiếp theo.

### Tóm Tắt Nhanh Phần 2

- **Unicast:** Giao tiếp một-một.
- **Hub:** Thiết bị "ngốc", đẩy dữ liệu ra mọi cổng. Toàn bộ Hub là một miền đụng độ.
- **Bridge:** Thông minh hơn, kết nối các phân đoạn mạng và chia nhỏ miền đụng độ.
- **Switch:** Thiết bị hiện đại, chuyển tiếp dữ liệu thông minh dựa trên bảng MAC. **Mỗi cổng là một miền đụng độ riêng**, giúp loại bỏ hoàn toàn va chạm.
- **Miền Quảng Bá:** Là khu vực mà một gói tin quảng bá có thể lan tới. Toàn bộ một Switch là một miền quảng bá.
- **Router:** Là thiết bị được sử dụng để chia nhỏ các miền quảng bá.
