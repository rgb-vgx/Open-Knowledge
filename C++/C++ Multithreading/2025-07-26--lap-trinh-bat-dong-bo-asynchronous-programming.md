---
title: Lập Trình Bất Đồng Bộ (Asynchronous Programming)
date: '2025-07-26 16:07:50'
date_gmt: '2025-07-26 09:07:50'
modified: '2025-07-26 17:36:29'
status: publish
slug: lap-trinh-bat-dong-bo-asynchronous-programming
wordpress_id: 269
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/lap-trinh-bat-dong-bo-asynchronous-programming/
categories:
- C++ Multithreading
tags: []
---

Từ đầu series đến nay, mô hình làm việc của chúng ta chủ yếu là **synchronous** (đồng bộ). Chúng ta khởi tạo một thread, và sau đó thường phải `join()` để chờ đợi nó hoàn thành. Ngay cả với `future`, lời gọi `get()` cũng là một hành động **chặn (blocking)** để chờ kết quả.

Nhưng sẽ ra sao nếu chúng ta có thể khởi chạy một tác vụ và tiếp tục công việc của mình ngay lập tức mà không cần chờ đợi? Chào mừng bạn đến với thế giới của **Asynchronous Programming** (Lập trình Bất đồng bộ).

---

### Phần 1: Synchronous vs. Asynchronous - Sự Khác Biệt Cốt Lõi

Để hiểu rõ, hãy cùng so sánh hai cách tiếp cận này.

#### **Synchronous (Đồng bộ) ⏳**

- **Định nghĩa**: "Chờ đợi công việc hoàn thành rồi mới đi tiếp."
- **Ví dụ đời thường**: Bạn gọi điện thoại cho ai đó và phải giữ máy chờ cho đến khi họ trả lời.
- **Ví dụ trong code**: Một lời gọi hàm thông thường.C++`save_data_to_disk(my_data); // Thread của bạn bị BLOCK ở đây // cho đến khi dữ liệu được ghi xong. do_next_thing();`
- **Nhược điểm**: Lãng phí thời gian chờ đợi. Nếu tác vụ đồng bộ này kéo dài (ghi file lớn, truy vấn database), toàn bộ thread của bạn (và có thể cả ứng dụng) sẽ bị "treo".

#### **Asynchronous (Bất đồng bộ) 🚀**

- **Định nghĩa**: "Giao việc và tiếp tục đi làm việc khác ngay lập tức."
- **Ví dụ đời thường**: Bạn gửi một email. Bạn nhấn "Send" và có thể đóng ngay chương trình email để làm việc khác, email sẽ được gửi đi trong nền.
- **Ví dụ trong code**:C++`// Giao việc ghi file cho một tác vụ chạy nền asynchronously_save_data(my_data); // Thread của bạn KHÔNG BỊ BLOCK, // nó tiếp tục thực thi ngay lập tức. do_next_thing();`
- **Ưu điểm**: Tăng đáng kể hiệu năng và khả năng phản hồi của ứng dụng bằng cách giảm thiểu thời gian thread phải chờ đợi.

---

### Phần 2: Tại Sao Cần Tránh Blocking?

Lập trình bất đồng bộ trở nên quan trọng vì trong môi trường multi-thread, việc **blocking** là điều tối kỵ:

- **Làm chậm thread**: Một thread bị block là một thread không làm được việc gì hữu ích.
- **Hiệu ứng domino**: Một thread bị block có thể khiến các thread khác đang `join()` nó cũng bị block theo.
- **Nguy hiểm trong Critical Section**: Giữ một lock trong khi thực hiện một thao tác blocking có thể khiến các thread khác phải chờ đợi rất lâu một cách không cần thiết.
- **Nguy cơ Deadlock**: Blocking là một trong những điều kiện cần để xảy ra deadlock.

Lập trình bất đồng bộ là một chiến lược cốt lõi để giảm thiểu việc blocking.

---

### Phần 3: Mô Hình Đồng Bộ Hóa Mới - Message Queue

Hai paradigma này cũng dẫn đến hai mô hình đồng bộ hóa khác nhau:

- **Với Blocking Operations**: Chúng ta dùng **mutex** và **atomic**. Một thread trực tiếp làm một thread khác phải dừng lại bằng cách chiếm giữ một tài nguyên.
- **Với Asynchronous Operations**: Mô hình phổ biến là **Message Queue** (Hàng đợi tin nhắn).
  1. Các thread **Producer** "gửi" các tác vụ (thường là các callable object) vào một hàng đợi chung. Chúng không cần chờ đợi.
  2. Một hoặc nhiều thread **Consumer** theo dõi hàng đợi này. Khi có tác vụ mới, chúng sẽ lấy ra và thực thi.

Mô hình này tách biệt hoàn toàn người giao việc và người làm việc, cho phép hệ thống hoạt động một cách trôi chảy và hiệu quả. Mặc dù C++ không có sẵn một lớp concurrent queue trong thư viện chuẩn, đây là một pattern nền tảng mà chúng ta có thể tự xây dựng hoặc dùng từ các thư viện bên thứ ba (Boost, TBB...).

---

Lập trình bất đồng bộ là một sự thay đổi trong tư duy: thay vì "gọi và chờ", chúng ta "bắn và quên" (fire and forget). Nó giúp tách biệt việc khởi chạy một tác vụ khỏi việc hoàn thành của nó, từ đó tối đa hóa hiệu suất và sự mượt mà của ứng dụng.

Thư viện chuẩn C++ cung cấp các công cụ ở mức độ cao để giúp việc này trở nên dễ dàng hơn rất nhiều. Trong bài học tiếp theo, chúng ta sẽ tìm hiểu về công cụ đầu tiên và quan trọng nhất: `std::async`.

*Until then, keep coding!*
