---
title: 'C++ Multithreading #4: Nền Tảng Lập Trình Đa Luồng C++: Process, Thread, và
  Lịch Sử Phát Triển'
date: '2025-07-10 00:44:08'
date_gmt: '2025-07-09 17:44:08'
modified: '2025-07-10 00:56:59'
status: publish
slug: c-multithreading-4-nen-tang-lap-trinh-da-luong-c-process-thread-va-lich-su-phat-trien
wordpress_id: 133
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/10/c-multithreading-4-nen-tang-lap-trinh-da-luong-c-process-thread-va-lich-su-phat-trien/
categories:
- C++ Multithreading
tags: []
---

Sau khi đã hiểu rõ "tại sao" concurrency lại quan trọng, trong bài viết này, chúng ta sẽ đi sâu vào "như thế nào". Chúng ta sẽ so sánh hai mô hình kiến trúc chính để đạt được concurrency, khám phá cấu trúc bên trong của một chương trình đa luồng, và nhìn lại chặng đường phát triển của tính năng này trong C++ để thấy được những công cụ mạnh mẽ mà chúng ta đang có trong tay.

#### **Phần 1: Hai Mô Hình Concurrency: Dựa trên Process và Dựa trên Thread**

Để thực hiện các tác vụ đồng thời, có hai phương pháp tiếp cận chính:

**a) Single-threading (Dựa trên Process)**

- **Mô hình:** Mỗi hoạt động được thực thi trong một **tiến trình (process)** riêng biệt. Ví dụ, để vừa tính toán vừa hiển thị thanh tiến trình, bạn cần chạy hai chương trình riêng biệt.
- **Ưu điểm:**
  - **An toàn:** Mỗi process có không gian bộ nhớ riêng, hoàn toàn cách ly. Một process không thể vô tình làm hỏng dữ liệu của process khác.
  - **Phân tán:** Các process có thể chạy trên các máy tính khác nhau trong một mạng, giúp cân bằng tải (load balancing).
- **Nhược điểm:**
  - **Nặng nề:** Tạo một process mới là một thao tác tốn thời gian và tài nguyên hệ thống.
  - **Giao tiếp phức tạp:** Việc trao đổi dữ liệu giữa các process (Inter-Process Communication - IPC) khá phức tạp và không được C++ hỗ trợ trực tiếp trong thư viện chuẩn.

**b) Multi-threading (Dựa trên Thread)**

- **Mô hình:** Tất cả các hoạt động được thực thi bên trong **một process duy nhất**, với mỗi hoạt động chạy trên một **luồng (thread)** riêng.
- **Ưu điểm:**
  - **Nhẹ nhàng:** Thread được coi là "tiến trình hạng nhẹ". Chúng khởi tạo nhanh hơn, sử dụng ít bộ nhớ hơn, và việc chuyển đổi qua lại giữa các thread (context switching) cũng nhanh hơn so với process.
  - **Dễ dàng chia sẻ dữ liệu:** Tất cả các thread trong cùng một process **chia sẻ chung một không gian bộ nhớ**. Việc truyền dữ liệu qua lại có thể đơn giản như truy cập một biến toàn cục hoặc truyền con trỏ/tham chiếu.
- **Nhược điểm:**
  - **Rủi ro:** Việc chia sẻ bộ nhớ chung cũng là một con dao hai lưỡi. Các thread có thể can thiệp và làm hỏng dữ liệu của nhau nếu không được bảo vệ cẩn thận (gây ra data race, data corruption).
  - **Phức tạp:** Code đa luồng khó viết, khó hiểu và khó gỡ lỗi hơn.
  - **Overhead:** Việc bảo vệ dữ liệu và đồng bộ hóa các thread có thể tạo ra chi phí (overhead), đôi khi khiến chương trình không nhanh hơn, thậm chí chậm đi.

| Tiêu chí | Dựa trên Process (Single-threading) | Dựa trên Thread (Multi-threading) |
| --- | --- | --- |
| **Đơn vị thực thi** | Mỗi hoạt động là một Process | Mỗi hoạt động là một Thread trong cùng Process |
| **Bộ nhớ** | Cách ly, an toàn | Chia sẻ chung, tiềm ẩn rủi ro |
| **Giao tiếp** | Phức tạp (IPC) | Đơn giản (truy cập bộ nhớ chung) |
| **Chi phí tạo** | Cao | Thấp |
| **Độ phức tạp code** | Quản lý IPC phức tạp | Quản lý đồng bộ hóa phức tạp |

Export to Sheets

#### **Phần 2: Cấu Trúc Của Một Chương Trình Đa Luồng**

Ngay cả một chương trình C++ "không đa luồng" đơn giản nhất cũng thực chất có một luồng thực thi.

- **Main Thread:** Khi chương trình của bạn bắt đầu, một luồng duy nhất được tạo ra. Luồng này có hàm `main()` là **điểm bắt đầu (entry point)**. Nó sẽ thực thi tuần tự các lệnh trong `main()` và các hàm được `main()` gọi. Khi `main()` kết thúc, luồng này cũng kết thúc và chương trình đóng lại.

Trong một chương trình đa luồng, mọi thứ trở nên thú vị hơn:

- **Main Thread** vẫn là luồng khởi đầu.
- Từ `main` thread, bạn có thể **khởi tạo (spawn)** các thread mới.
- Mỗi thread mới này sẽ có một **hàm entry point riêng**. Khi được khởi tạo, thread sẽ bắt đầu thực thi các lệnh trong hàm entry point của nó.
- Tất cả các thread (bao gồm cả main thread) sẽ chạy **đồng thời (concurrently)**.
- Khi hàm entry point của một thread kết thúc, thread đó sẽ tự kết thúc. `main` thread không tự động chờ các thread con kết thúc, trừ khi chúng ta yêu cầu nó làm vậy một cách tường minh.

#### **Phần 3: Lịch Sử và Hỗ Trợ Đa Luồng trong C++ Tiêu Chuẩn**

- **Thời kỳ sơ khai:** Ban đầu, C++ không có hỗ trợ trực tiếp cho thread. Các lập trình viên phải dựa vào các API của hệ điều hành (như Windows API) hoặc các thư viện C như **pthreads**.
- **Thư viện bên thứ ba:** Sau này, các thư viện C++ như Boost, Poco, ACE ra đời và cung cấp các lớp trừu tượng hóa cho thread, nhưng chúng không phải là một phần của ngôn ngữ tiêu chuẩn.
- **Cuộc cách mạng C++11:** Năm 2011 là một bước ngoặt. Lần đầu tiên, C++ chính thức đưa hỗ trợ concurrency vào thư viện chuẩn. Điều này cho phép viết code đa luồng **đa nền tảng (portable)**, hiệu quả và có ngữ nghĩa rõ ràng. Lớp `std::thread` ra đời, trở thành đơn vị cơ bản của concurrency trong C++.
- **Sự tiến hóa liên tục:**
  - **C++14:** Bổ sung `shared_mutex` (read-write locks).
  - **C++17:** Giới thiệu các phiên bản song song của nhiều thuật toán trong thư viện chuẩn.
  - **C++20/23:** Mang đến `jthread`, `semaphore`, `barrier`, `latch` và cải thiện coroutine.

Cuối cùng, một chút về thuật ngữ. Trong series này:

- **Thread:** Sẽ được dùng để chỉ **software thread** do hệ điều hành quản lý, hoặc lớp `std::thread` của C++ bao bọc quanh nó.
- **Task:** Là một khái niệm ở mức độ trừu tượng cao hơn, chỉ một **công việc** cần được thực hiện đồng thời. Một `thread` sẽ thực thi một `task`.

### **Lời Kết**

Chúng ta đã có một cái nhìn toàn cảnh về nền tảng của concurrency. Chúng ta hiểu rõ ưu và nhược điểm của hai mô hình chính, biết được cấu trúc bên trong của một chương trình đa luồng, và nắm được lịch sử phát triển cũng như các công cụ mà C++ tiêu chuẩn cung cấp.

Với tất cả kiến thức nền tảng vững chắc này, chúng ta đã hoàn toàn sẵn sàng để bắt tay vào viết code. Trong bài viết tiếp theo, chúng ta sẽ viết chương trình đa luồng "Hello, World!" đầu tiên bằng cách sử dụng `std::thread`.

*Keep coding!*
