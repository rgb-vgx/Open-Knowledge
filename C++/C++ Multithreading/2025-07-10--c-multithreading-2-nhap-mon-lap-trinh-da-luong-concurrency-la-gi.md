---
title: 'C++ Multithreading #2: Nhập Môn Lập Trình Đa Luồng - Concurrency Là Gì?'
date: '2025-07-10 00:36:11'
date_gmt: '2025-07-09 17:36:11'
modified: '2025-07-10 00:57:07'
status: publish
slug: c-multithreading-2-nhap-mon-lap-trinh-da-luong-concurrency-la-gi
wordpress_id: 130
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/10/c-multithreading-2-nhap-mon-lap-trinh-da-luong-concurrency-la-gi/
categories:
- C++ Multithreading
tags: []
---

Cuối cùng chúng ta cũng đến với phần chính của series! Sau khi trang bị đầy đủ các "vũ khí" từ C++ hiện đại, giờ là lúc chúng ta lặn sâu vào thế giới của lập trình đa luồng. Và để bắt đầu, chúng ta cần nắm vững khái niệm nền tảng và quan trọng nhất: **Concurrency** (tính đồng thời).

Bài viết này sẽ giải mã Concurrency là gì, tại sao nó lại quan trọng, và máy tính của chúng ta thực hiện nó như thế nào.

#### **Phần 1: Concurrency Là Gì? Một Ví Dụ Đời Thường**

Một cách đơn giản nhất, **Concurrency là thực hiện hai hoặc nhiều hoạt động có vẻ như diễn ra cùng một lúc**.

Hãy nghĩ về một ví dụ rất đời thường: bạn có thể vừa đọc sách vừa nghe nhạc. Đây là hai hoạt động riêng biệt về mặt khái niệm, nhưng chúng đang diễn ra trong cùng một khoảng thời gian. Đó chính là Concurrency.

Trong lĩnh vực máy tính, Concurrency cho phép một chương trình thực hiện nhiều tác vụ đồng thời. Ví dụ, một chương trình có thể vừa tải về một tệp tin lớn từ mạng, vừa hiển thị một thanh tiến trình (progress bar) cho người dùng biết quá trình đang diễn ra, thay vì "đứng hình" và làm người dùng tưởng rằng nó đã bị treo.

#### **Phần 2: Tại Sao Lập Trình Viên Cần Quan Tâm?**

Concurrency không phải là một khái niệm xa lạ. Chính hệ điều hành bạn đang dùng (Windows, macOS, Linux) là một minh chứng hùng hồn cho Concurrency. Nó có thể chạy trình biên dịch của bạn, một trình soạn thảo văn bản, và một ứng dụng email cùng một lúc.

Với vai trò là một lập trình viên, việc hiểu và áp dụng Concurrency mang lại lợi ích trực tiếp và to lớn:

- **Cải thiện trải nghiệm người dùng:** Như ví dụ trên, thay vì bắt người dùng nhìn vào một con trỏ chuột hình đồng hồ cát đang xoay vô tận, bạn có thể chạy các tác vụ nặng (tính toán, tải file, truy vấn database) trên một luồng nền. Trong khi đó, luồng chính vẫn hoàn toàn tự do để phản hồi các tương tác của người dùng (như click chuột, gõ phím), giúp ứng dụng luôn mượt mà và "sống".
- **Tận dụng tối đa tài nguyên hệ thống:** Giúp tối ưu hóa việc sử dụng CPU, đặc biệt là trên các hệ thống hiện đại.

#### **Phần 3: Các Hình Thức Concurrency**

Vậy máy tính làm thế nào để thực hiện được phép màu này? Có hai hình thức chính:

**a) Hardware Concurrency (Song Song Thực Sự - True Parallelism)**

Đây là hình thức Concurrency được thực hiện bởi chính phần cứng.

- **Nền tảng:** Các CPU hiện đại không chỉ có một bộ xử lý, mà có nhiều **nhân (core)**. Mỗi nhân là một bộ xử lý độc lập có thể thực thi một chuỗi lệnh riêng.
- **Cách hoạt động:** Nếu máy tính của bạn có 4 nhân, nó có thể thực sự chạy 4 tác vụ khác nhau tại **cùng một thời điểm**. Mỗi luồng thực thi của chương trình được ánh xạ trực tiếp tới một nhân phần cứng. Đây được gọi là các **Hardware Threads**. Có một sự tương ứng 1-1: một Hardware Thread cho mỗi nhân CPU.

**b) Software Concurrency (Đa Nhiệm - Task Switching)**

Đây là hình thức Concurrency được quản lý bởi hệ điều hành. Nó cho phép chúng ta có nhiều luồng phần mềm hơn số lượng nhân vật lý.

- **Nền tảng:** Hệ điều hành là một nhà quản lý tài ba.
- **Cách hoạt động:** Thường thì một chương trình sẽ có số lượng **Software Threads** (luồng phần mềm) nhiều hơn số lượng Hardware Threads. Làm sao điều này có thể xảy ra? Phép màu nằm ở chỗ các luồng thường không chạy liên tục. Chúng thường xuyên phải dừng lại để chờ đợi một điều gì đó (ví dụ: chờ dữ liệu từ mạng về, chờ đọc xong file từ ổ cứng). Trong lúc một luồng đang "chờ" và không làm gì cả, hệ điều hành sẽ cực kỳ nhanh chóng tạm dừng nó và chuyển CPU cho một luồng khác đang sẵn sàng để làm việc. Quá trình chuyển đổi qua lại này được gọi là **"task switching"**, và nó diễn ra nhanh đến mức người dùng có cảm giác mọi thứ đang chạy song song.

Kỹ thuật này giúp tối đa hóa lượng công việc hữu ích mà hệ thống có thể thực hiện, đảm bảo CPU luôn bận rộn thay vì ngồi không chờ đợi.

### **Lời Kết**

Như vậy, chúng ta đã có cái nhìn tổng quan đầu tiên về Concurrency. Nó là ý tưởng về việc xử lý nhiều việc cùng lúc để tạo ra các chương trình hiệu quả và phản hồi tốt hơn. Ý tưởng này được hiện thực hóa thông qua sức mạnh của phần cứng đa nhân (Hardware Concurrency) hoặc sự quản lý thông minh của hệ điều hành (Software Concurrency).

Bây giờ khi đã hiểu "Concurrency là gì", câu hỏi tiếp theo và tự nhiên nhất chính là: "Làm thế nào để chúng ta tạo ra các luồng phần mềm (software threads) trong C++?". Đây chính là chủ đề của bài viết tiếp theo.

*Keep coding!*
