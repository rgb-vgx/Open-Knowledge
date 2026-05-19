---
title: 'Concurrency vs. Parallelism: Hiểu Đúng Để Lập Trình Hiệu Quả'
date: '2025-07-26 16:41:52'
date_gmt: '2025-07-26 09:41:52'
modified: '2025-07-26 17:33:56'
status: publish
slug: concurrency-vs-parallelism-hieu-dung-de-lap-trinh-hieu-qua
wordpress_id: 281
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/concurrency-vs-parallelism-hieu-dung-de-lap-trinh-hieu-qua/
categories:
- C++ Multithreading
tags: []
---

Trong suốt series, chúng ta đã nói rất nhiều về **Concurrency**. Giờ đây, chúng ta sẽ bắt đầu tìm hiểu về một khái niệm liên quan nhưng khác biệt: **Parallelism**. Mặc dù thường được sử dụng thay thế cho nhau, việc hiểu rõ sự khác biệt giữa chúng là cực kỳ quan trọng để có thể thiết kế và viết các chương trình hiệu quả.

Bài viết này sẽ làm rõ hai khái niệm này, phân biệt mục tiêu và đặc điểm của chúng.

---

### Phần 1: Concurrency - Quản Lý Nhiều Việc Cùng Lúc 🎭

**Concurrency** (tính đồng thời) là về việc **cấu trúc** một chương trình để xử lý nhiều tác vụ **khác biệt về mặt khái niệm** trong cùng một khoảng thời gian.

- **Đặc điểm**:
  - **Các tác vụ khác nhau**: Ví dụ, một thread xử lý giao diện người dùng (GUI), một thread khác tải file từ mạng, một thread thứ ba thực hiện tính toán.
  - **Có thể chạy trên một core duy nhất**: Thông qua cơ chế chuyển đổi ngữ cảnh (time-slicing), hệ điều hành có thể làm cho các tác vụ có vẻ như đang chạy cùng lúc.
  - **Các tác vụ thường tương tác**: Chúng có thể giao tiếp, chờ đợi và phụ thuộc lẫn nhau (ví dụ: thread xử lý phải chờ thread download hoàn tất).
- **Mục tiêu**: Chủ yếu là để cải thiện **khả năng phản hồi (responsiveness)** và **cấu trúc chương trình (separation of concerns)**.
- **Phép loại suy**: Một **ban nhạc jazz**. Mỗi nhạc công (thread) chơi một nhạc cụ khác nhau (tác vụ khác nhau), họ tương tác, lắng nghe và ứng biến cùng nhau để tạo ra một bản nhạc hoàn chỉnh.

---

### Phần 2: Parallelism - Làm Một Việc Nhanh Hơn 🚀

**Parallelism** (tính song song) là về việc **thực thi** một tác vụ lớn bằng cách chia nó thành nhiều phần nhỏ, **giống hệt nhau** và chạy chúng trên nhiều đơn vị xử lý khác nhau tại **cùng một thời điểm**.

- **Đặc điểm**:
  - **Các tác vụ giống hệt nhau**: Ví dụ, xử lý 1 triệu phần tử của một mảng bằng cách chia nó thành 4 phần, mỗi phần 250,000 phần tử, và cho 4 thread cùng xử lý.
  - **Yêu cầu nhiều core**: Parallelism chỉ thực sự mang lại lợi ích về tốc độ khi có phần cứng đa nhân.
  - **Các tác vụ hoàn toàn độc lập**: Chúng không giao tiếp hay chờ đợi lẫn nhau.
- **Mục tiêu**: Chủ yếu là để **tăng tốc độ xử lý (speedup)** và **thông lượng (throughput)**.
- **Phép loại suy**: Một **cuộc thi chạy 100m**. Tất cả các vận động viên (thread) đều làm cùng một việc (chạy), tại cùng một thời điểm, một cách độc lập, với mục tiêu là hoàn thành nhanh nhất có thể.

---

### Bảng So Sánh Nhanh

| Tiêu chí | Concurrency | Parallelism |
| --- | --- | --- |
| **Bản chất** | Xử lý **nhiều việc** | Làm **một việc** nhanh hơn |
| **Số lượng Core** | Có thể chạy trên 1 core | Cần nhiều core để hiệu quả |
| **Loại tác vụ** | Các tác vụ khác nhau | Các tác vụ giống nhau |
| **Sự tương tác** | Có, thường xuyên | Không, độc lập |
| **Mục tiêu** | Cấu trúc, khả năng phản hồi | Tốc độ, hiệu năng |

> **Một chương trình có thể là concurrent mà không parallel.** Ví dụ: một ứng dụng GUI trên máy 1 core. **Một chương trình có thể là parallel mà không concurrent.** Ví dụ: một phép tính ma trận song song không có sự tương tác nào khác. **Và một chương trình có thể là cả hai.** Ví dụ: một trình duyệt web vừa xử lý giao diện (concurrent), vừa render song song các phần của trang web (parallel).

---

### Phần 3: Explicit vs. Implicit Parallelism

Khi triển khai parallelism, có hai cách tiếp cận:

- **Explicit Parallelism (Tường minh)**: **Lập trình viên** phải tự tay làm mọi thứ: chia dữ liệu, tạo và quản lý số lượng thread cố định. Cách làm này cứng nhắc và không có khả năng mở rộng (not scalable). Code được tối ưu cho máy 4 core sẽ chạy không hiệu quả trên máy 8 core hoặc 2 core.
- **Implicit Parallelism (Ngầm định)**: **Lập trình viên** chỉ cần mô tả *cái gì* cần làm song song. Còn *cách làm* (chia bao nhiêu phần, dùng bao nhiêu thread) sẽ do **thư viện hoặc trình biên dịch** quyết định dựa trên phần cứng có sẵn tại thời điểm chạy. Cách làm này linh hoạt, có khả năng mở rộng và tận dụng tối đa tài nguyên.

Trong C++ hiện đại, **Implicit Parallelism** gần như luôn là lựa chọn tốt hơn.

---

Hiểu rõ sự khác biệt giữa Concurrency và Parallelism giúp chúng ta lựa chọn đúng công cụ và kiến trúc cho vấn đề cần giải quyết.

C++ hiện đại cung cấp các công cụ mạnh mẽ cho **Implicit Parallelism**. Trong bài học tiếp theo, chúng ta sẽ khám phá các thuật toán song song (Parallel Algorithms) được giới thiệu trong C++17, cho phép chúng ta biến một thuật toán tuần tự thành song song chỉ bằng một thay đổi nhỏ.

*Until then, keep coding!*
