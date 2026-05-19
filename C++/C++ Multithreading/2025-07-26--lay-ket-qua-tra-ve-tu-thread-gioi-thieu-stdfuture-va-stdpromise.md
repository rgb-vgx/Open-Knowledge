---
title: 'Lấy Kết Quả Trả Về Từ Thread: Giới Thiệu std::future và std::promise'
date: '2025-07-26 15:03:20'
date_gmt: '2025-07-26 08:03:20'
modified: '2025-07-26 17:37:07'
status: publish
slug: lay-ket-qua-tra-ve-tu-thread-gioi-thieu-stdfuture-va-stdpromise
wordpress_id: 248
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/lay-ket-qua-tra-ve-tu-thread-gioi-thieu-stdfuture-va-stdpromise/
categories:
- C++ Multithreading
tags: []
---

Cho đến nay, khi cần một thread ("producer") tạo ra dữ liệu cho một thread khác ("consumer") sử dụng, chúng ta đã phải làm việc khá "thủ công":

1. Tạo một biến **shared memory**.
2. Dùng `std::mutex` để bảo vệ nó khỏi Data Race.
3. Dùng `std::condition_variable` để thông báo khi dữ liệu đã sẵn sàng.

Tất cả các bước trên là cần thiết và mạnh mẽ, nhưng cho một tác vụ đơn giản là "chạy một hàm trong một thread và lấy kết quả trả về của nó", chúng có vẻ hơi cồng kềnh.

C++ cung cấp một giải pháp thanh lịch và ở mức độ cao hơn được thiết kế riêng cho kịch bản này: cặp đôi **`std::future`** và **`std::promise`**.

---

### Phần 1: Kênh Giao Tiếp Một Chiều 📮

Hãy tưởng tượng `std::promise` và `std::future` như hai đầu của một kênh giao tiếp một chiều, một lần duy nhất. Chúng được kết nối với nhau thông qua một "trạng thái chia sẻ" (shared state) mà thư viện chuẩn sẽ quản lý giúp bạn.

- **Promise (Lời hứa)**: Đầu "gửi" của kênh.
- **Future (Tương lai)**: Đầu "nhận" của kênh.

**Ưu điểm lớn nhất:**

- **Không cần shared memory thủ công**: Dữ liệu được truyền qua "shared state" ẩn.
- **Không cần mutex/condition\_variable tường minh**: Việc đồng bộ hóa và chờ đợi được tích hợp sẵn bên trong các lớp này.

---

### Phần 2: Mô Hình "Producer-Consumer"

Cặp đôi này hoạt động hoàn hảo theo mô hình "Producer-Consumer":

**Producer (Thread sản xuất):**

- Giữ một đối tượng `std::promise`.
- Thực hiện một công việc tính toán hoặc lấy dữ liệu.
- Khi có kết quả, nó "thực hiện lời hứa" (fulfills the promise) bằng cách đặt giá trị vào đối tượng `promise`. Giá trị này sẽ được lưu vào shared state.

**Consumer (Thread tiêu thụ):**

- Giữ đối tượng `std::future` tương ứng.
- Khi nó cần kết quả, nó sẽ gọi một phương thức trên đối tượng `future` (ví dụ `get()`).
- Lời gọi này sẽ **block** (chặn lại) và **chờ đợi** cho đến khi Producer đặt giá trị vào shared state.
- Khi giá trị đã sẵn sàng, lời gọi `get()` sẽ unblock và trả về kết quả đó.

---

### Phần 3: Xử Lý Exception Một Cách Thanh Lịch ✨

Đây là một trong những tính năng mạnh mẽ nhất của future/promise. Điều gì sẽ xảy ra nếu thread Producer ném ra một exception thay vì tạo ra một kết quả?

1. Thread **Producer** ném ra một exception.
2. Đối tượng **`promise`** sẽ bắt lấy exception này và **lưu nó vào trong shared state**, thay vì một giá trị thông thường.
3. Thread **Consumer** gọi `future.get()`.
4. Thay vì trả về một giá trị, `get()` sẽ **ném lại (re-throw)** chính xác cái exception đã được lưu trong shared state.

Điều này cho phép một khối `try/catch` trong thread Consumer có thể bắt được một exception được ném ra từ một thread Producer hoàn toàn khác. Đây là một cách cực kỳ trong sáng để truyền lỗi qua lại giữa các thread.

---

`std::future` và `std::promise` cung cấp một cơ chế trừu tượng hóa ở mức độ cao, giúp đơn giản hóa đáng kể kịch bản phổ biến là lấy một kết quả đơn lẻ từ một tác vụ bất đồng bộ. Nó giúp chúng ta viết code rõ ràng hơn, ít bị lỗi hơn bằng cách ẩn đi sự phức tạp của việc quản lý mutex và condition variable thủ công.

Chúng ta đã hiểu về lý thuyết. Trong bài viết tiếp theo, chúng ta sẽ đi vào code để xem chính xác cách tạo, liên kết và sử dụng `std::promise` và `std::future`.

*Until then, keep coding!*
