---
title: 'IPC2: Tại sao cần IPC? Kiến trúc hệ thống và các kỹ thuật IPC'
date: '2025-10-04 01:08:30'
date_gmt: '2025-10-03 18:08:30'
modified: '2025-10-04 01:08:30'
status: publish
slug: ipc2-tai-sao-can-ipc-kien-truc-he-thong-va-cac-ky-thuat-ipc
wordpress_id: 351
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/04/ipc2-tai-sao-can-ipc-kien-truc-he-thong-va-cac-ky-thuat-ipc/
categories:
- IPC
tags: []
---

## 1. IPC là gì?

**Interprocess Communication (IPC)** là cơ chế cho phép **hai hoặc nhiều tiến trình (process)** trên cùng một hệ thống máy tính trao đổi dữ liệu với nhau.

> **Lưu ý quan trọng:**
>
> - IPC đề cập đến giao tiếp giữa các tiến trình **trên cùng một máy**.
> - Nếu tiến trình nằm trên **các máy khác nhau trong mạng**, việc giao tiếp sẽ thuộc phạm trù **Network Communication** (giao tiếp mạng), không còn là IPC theo định nghĩa truyền thống.

Tuy nhiên, các nguyên lý nền tảng của IPC vẫn hữu ích khi bạn chuyển sang học về lập trình mạng (network sockets).

---

## 2. Tại sao tiến trình cần giao tiếp?

Các tiến trình trong một hệ điều hành thường cần **chia sẻ dữ liệu và phối hợp hành động** để:

- Xử lý bài toán phức tạp bằng cách phân tách thành nhiều tiến trình.
- Đồng bộ hóa (synchronization) trong xử lý song song.
- Tối ưu hiệu năng bằng cách dùng tài nguyên chung.

Linux cung cấp **nhiều cơ chế IPC khác nhau**, mỗi cơ chế có ưu/nhược điểm và phù hợp với từng kịch bản.

---

## 3. Liên hệ với các hệ điều hành khác

Mặc dù trong khóa học này ta dùng **Linux** để lập trình và demo, nhưng các khái niệm về IPC **không hề giới hạn** ở Linux.

- Trên **Windows**, **macOS**, hay bất kỳ hệ điều hành hiện đại nào, IPC vẫn tồn tại với nguyên lý tương tự.
- Các ngôn ngữ khác nhau (C, C++, Java, Python, C#) đều hỗ trợ IPC, chỉ khác nhau ở cách lập trình cụ thể.

Vì vậy, kiến thức bạn học ở đây sẽ hữu ích cho sự nghiệp lâu dài, bất kể nền tảng bạn làm việc.

---

## 4. Kiến trúc hệ thống máy tính (3 lớp)

Để hiểu rõ hơn IPC hoạt động ở đâu, ta cần nắm được **kiến trúc 3 lớp** của máy tính:

1. **Hardware Layer (Lớp phần cứng)**
   - Bao gồm CPU, RAM, ổ đĩa, cổng USB, card mạng, bàn phím, chuột…
   - Là nền tảng vật lý của toàn bộ hệ thống.
2. **Kernel Space (Lớp nhân hệ điều hành)**
   - Chứa **Operating System (OS)**, trực tiếp quản lý phần cứng.
   - Giao tiếp với phần cứng thông qua **device driver** (trình điều khiển thiết bị).
   - Ví dụ: driver của bàn phím, driver của card đồ họa.
3. **User Space (Lớp ứng dụng)**
   - Là nơi các ứng dụng mà bạn chạy (Chrome, Word, Photoshop, …) hoạt động.
   - Muốn tương tác với OS, ứng dụng phải thông qua **system calls** (ví dụ: `malloc()`, `free()`).

👉 **IPC diễn ra trong User Space**, khi hai ứng dụng/tiến trình cần trao đổi dữ liệu trực tiếp với nhau.

---

## 5. Các cơ chế IPC chính trên Linux

Linux cung cấp nhiều kỹ thuật IPC. Trong khóa học, ta sẽ tập trung vào **4 kỹ thuật quan trọng nhất**:

1. **Unix Domain Sockets**
   - Giao tiếp socket nhưng chỉ trong cùng máy.
   - Mạnh mẽ, phổ biến trong lập trình hệ thống và client–server nội bộ.
2. **Message Queues**
   - Cơ chế gửi/nhận tin nhắn dạng hàng đợi FIFO.
   - Giúp các tiến trình trao đổi dữ liệu theo cấu trúc thông điệp.
3. **Shared Memory**
   - Vùng bộ nhớ chung cho nhiều tiến trình cùng truy cập.
   - Rất nhanh, nhưng cần cơ chế đồng bộ để tránh xung đột.
4. **Signals**
   - Cơ chế gửi tín hiệu đơn giản (ví dụ: báo hiệu tiến trình cần dừng, tiếp tục…).

Ngoài ra còn có **Pipes** (ống dẫn dữ liệu), nhưng hiện nay ít dùng trong thực tế nên sẽ không được đào sâu trong khóa học này.

---

## 6. IPC trong phỏng vấn kỹ thuật

IPC là chủ đề thường xuyên xuất hiện trong **phỏng vấn kỹ sư hệ thống** (system programming). Bạn có thể gặp các câu hỏi như:

- Liệt kê các cơ chế IPC trong Linux.
- So sánh ưu/nhược điểm giữa Shared Memory và Message Queue.
- Khi nào chọn Unix Socket thay vì Signals?

👉 Vì vậy, nắm vững IPC không chỉ giúp bạn lập trình tốt hơn mà còn nâng cao lợi thế trong phỏng vấn.

---

## Kết luận

Trong bài học này, bạn đã hiểu:

- IPC là gì và vì sao cần thiết.
- Vị trí của IPC trong kiến trúc hệ thống.
- Các kỹ thuật IPC chính trên Linux.

Ở bài học tiếp theo, chúng ta sẽ đi sâu vào **Unix Domain Sockets**, cơ chế mạnh mẽ và phổ biến nhất để xây dựng giao tiếp client–server nội bộ.
