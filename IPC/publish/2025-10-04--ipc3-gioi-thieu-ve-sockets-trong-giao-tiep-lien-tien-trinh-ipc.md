---
title: 'IPC3: Giới thiệu về Sockets trong Giao Tiếp Liên Tiến Trình (IPC)'
date: '2025-10-04 22:49:50'
date_gmt: '2025-10-04 15:49:50'
modified: '2025-10-06 00:34:08'
status: publish
slug: ipc3-gioi-thieu-ve-sockets-trong-giao-tiep-lien-tien-trinh-ipc
wordpress_id: 354
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/04/ipc3-gioi-thieu-ve-sockets-trong-giao-tiep-lien-tien-trinh-ipc/
categories:
- IPC
tags: []
---

## 1. Mở đầu

Chào mừng bạn quay trở lại khóa học về **Interprocess Communication (IPC)**!  
Trong bài học này, chúng ta sẽ bắt đầu với **kỹ thuật IPC đầu tiên – Sockets**, một cơ chế cực kỳ phổ biến và linh hoạt trong cả **lập trình hệ thống** và **lập trình mạng**.

---

## 2. Socket là gì?

**Socket** là một **giao diện lập trình (API interface)** được hệ điều hành (như Linux hoặc Unix) cung cấp, cho phép **các tiến trình giao tiếp với nhau** — dù là:

- Hai tiến trình **chạy trên cùng một máy** (giao tiếp nội bộ), hoặc
- Hai tiến trình **chạy trên các máy khác nhau trong mạng** (giao tiếp qua mạng).

Nói cách khác, **socket là cầu nối cho dữ liệu giữa các tiến trình.**

---

## 3. Các loại Socket chính

Có hai loại socket phổ biến nhất mà chúng ta sẽ tìm hiểu trong khóa học:

1. **Unix Domain Socket (UDS)**  
   👉 Dùng cho **các tiến trình chạy trên cùng một máy**.
   - Tốc độ cao, do không qua lớp giao thức mạng.
   - Thường được dùng trong ứng dụng client–server nội bộ (ví dụ: giữa Nginx và PHP-FPM).
2. **Network Socket (TCP/UDP Socket)**  
   👉 Dùng cho **các tiến trình chạy trên các máy khác nhau trong mạng**.
   - Là nền tảng của Internet: mọi giao tiếp qua TCP/UDP đều dựa trên socket.

Trong khóa học này, chúng ta sẽ tập trung vào **Unix Domain Socket**, còn **Network Socket** sẽ chỉ được nhắc qua ở mức khái niệm (do nó thuộc phạm vi lập trình mạng).

---

## 4. Socket Interface – Tập hợp các API lập trình

Linux cung cấp một bộ API gọi là **socket interface**, gồm các hàm (system calls) mà lập trình viên sử dụng để thiết lập và quản lý kết nối socket.

Một số hàm tiêu biểu:

| Nhóm chức năng | API tiêu biểu | Mô tả |
| --- | --- | --- |
| Tạo socket | `socket()` | Khởi tạo một socket mới |
| Gắn địa chỉ (bind) | `bind()` | Gắn socket với địa chỉ (file path hoặc IP/port) |
| Lắng nghe (server) | `listen()` | Chờ kết nối từ client |
| Chấp nhận kết nối | `accept()` | Tạo socket mới cho mỗi client kết nối |
| Kết nối (client) | `connect()` | Yêu cầu kết nối đến server |
| Truyền dữ liệu | `send()`, `recv()` | Gửi/nhận dữ liệu giữa hai socket |
| Đóng kết nối | `close()` | Giải phóng tài nguyên socket |

Các hàm này tạo thành **bộ công cụ lõi** để lập trình giao tiếp socket trong C/C++ và nhiều ngôn ngữ khác.

---

## 5. Socket hoạt động như thế nào?

Hãy hình dung lại **kiến trúc hệ thống máy tính** mà ta đã học trong bài trước:

```
+-------------+
| User Space  |  ← Ứng dụng của bạn (Client/Server)
+-------------+
| System Call |  ← Giao diện giữa app và kernel (socket APIs)
|  Interface  |
+-------------+
| Kernel Space|  ← Hệ điều hành (Linux)
|-------------+
|   Hardware  |  ← CPU, RAM, NIC...
+-------------+
```

Ứng dụng của bạn (ở **User Space**) không thể trực tiếp điều khiển phần cứng hay mạng.  
Vì vậy, khi bạn gọi hàm như `socket()` hay `send()`, thực chất bạn đang **gọi system call** — yêu cầu **Kernel** (hệ điều hành) thực hiện hành động giúp bạn.

> Ví dụ:  
> Khi bạn gọi `malloc()` trong C, bạn đang **gửi yêu cầu đến kernel** để cấp phát vùng nhớ.
>
> Tương tự, khi bạn gọi `socket()` → Kernel sẽ **tạo socket trong không gian hệ thống**, cấp cho bạn một **file descriptor** để sử dụng.

---

## 6. Hệ thống gọi hàm (System Calls)

Hệ điều hành Linux cung cấp nhiều **system call** — mỗi lời gọi tương ứng với một yêu cầu dịch vụ cụ thể mà ứng dụng gửi đến kernel.

Ví dụ:

```
int *ptr = (int*) malloc(100 * sizeof(int));
```

Dòng code trên thực chất là yêu cầu hệ điều hành:

> “Hãy cấp cho tôi 100 ô nhớ liên tiếp trên RAM!”

Khi ta gọi:

```
free(ptr);
```

Hệ điều hành hiểu rằng:

> “Vùng nhớ này không cần nữa, hãy thu hồi lại!”

Tương tự, **socket system calls** cũng hoạt động như vậy:

- Ứng dụng gọi `socket()` → yêu cầu kernel tạo socket.
- Ứng dụng gọi `bind()` → kernel gắn socket với địa chỉ cụ thể.
- Ứng dụng gọi `connect()` → kernel mở kết nối đến tiến trình khác.

---

## 7. Vòng đời giao tiếp của Socket

Một **giao tiếp socket** (đặc biệt là kiểu client–server) thường trải qua chuỗi bước sau:

**Trên phía Server:**

1. `socket()` – Tạo socket.
2. `bind()` – Gắn socket với địa chỉ (đường dẫn file hoặc IP/port).
3. `listen()` – Chuyển sang trạng thái chờ kết nối.
4. `accept()` – Chấp nhận client kết nối.
5. `recv()` / `send()` – Nhận & gửi dữ liệu.
6. `close()` – Đóng kết nối.

**Trên phía Client:**

1. `socket()` – Tạo socket.
2. `connect()` – Kết nối đến server.
3. `send()` / `recv()` – Truyền và nhận dữ liệu.
4. `close()` – Đóng kết nối.

---

## 8. Kết luận và hướng đi tiếp theo

Trong bài học này, bạn đã hiểu:

- Khái niệm **socket** và vai trò của nó trong IPC.
- Phân biệt giữa **Unix Domain Socket** và **Network Socket**.
- Cách **socket interface** hoạt động như cầu nối giữa ứng dụng và hệ điều hành.
- Tổng quan các **API** và **chu trình kết nối socket**.

Ở bài học kế tiếp, chúng ta sẽ **đi sâu vào Unix Domain Socket**:

- Cấu trúc `sockaddr_un`
- Các bước tạo kết nối client–server nội bộ
- Code minh họa bằng C (demo thật trên Linux)
