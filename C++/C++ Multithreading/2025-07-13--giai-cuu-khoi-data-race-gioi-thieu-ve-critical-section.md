---
title: 'C++ Multithreading #14: Giải Cứu Khỏi Data Race: Giới Thiệu Về "Critical Section"'
date: '2025-07-13 01:08:01'
date_gmt: '2025-07-12 18:08:01'
modified: '2025-07-26 17:39:00'
status: publish
slug: giai-cuu-khoi-data-race-gioi-thieu-ve-critical-section
wordpress_id: 166
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/13/giai-cuu-khoi-data-race-gioi-thieu-ve-critical-section/
categories:
- C++ Multithreading
tags: []
---

Trong các bài viết trước, chúng ta đã chứng kiến sự hỗn loạn và những hậu quả khôn lường của một **Data Race**. Chúng ta cũng đã xác định rằng, khi các thread phải chia sẻ dữ liệu, giải pháp duy nhất là phải **đồng bộ hóa (synchronization)** các truy cập đó.

Nhưng "đồng bộ hóa" thực sự có nghĩa là gì? Để trả lời câu hỏi đó, chúng ta cần tìm hiểu về một khái niệm nền tảng trong lập trình multi-thread: **Critical Section** (Vùng Găng).

#### **Phần 1: Bài Toán Đường Sắt Một Chiều**

Hãy tưởng tượng một tuyến đường sắt có một đoạn ray đặc biệt: nó chỉ có **một đường duy nhất**, nhưng lại có hai đoàn tàu từ hai hướng ngược nhau cùng muốn đi qua.

Nếu không có bất kỳ sự phối hợp hay tín hiệu nào, các đoàn tàu cứ thế chạy bất cứ khi nào chúng muốn. Kết quả sẽ là một thảm họa không thể tránh khỏi: một vụ va chạm.

Để giải quyết vấn đề này, ngành đường sắt áp dụng một quy tắc vàng, không thể phá vỡ:

> **Tại một thời điểm, chỉ có MỘT đoàn tàu duy nhất được phép đi vào đoạn đường ray đơn.**

Khi một đoàn tàu đến gần đoạn ray này, nếu đã có một tàu khác ở trong, nó bắt buộc phải dừng lại và chờ đợi. Nó chỉ có thể đi tiếp khi đoàn tàu kia đã hoàn toàn rời khỏi đoạn ray.

#### **Phần 2: "Critical Section" trong Lập Trình**

Phép loại suy về đường sắt trên ánh xạ một cách hoàn hảo sang các khái niệm trong lập trình multi-thread:

- **Các đoàn tàu** ↔️ **Các thread**.
- **Đoạn đường ray đơn** ↔️ **Tài nguyên được chia sẻ** (ví dụ: một biến toàn cục, `std::cout`, một kết nối mạng, một file...).
- **Hành động đi vào đoạn ray đơn** ↔️ **Đoạn code truy cập vào tài nguyên được chia sẻ**.

Đoạn code này được gọi là **Critical Section**.

> **Định nghĩa:** Một **Critical Section** là một vùng code thực hiện truy cập tới một tài nguyên được chia sẻ, và nó phải được bảo vệ để đảm bảo rằng tại một thời điểm chỉ có tối đa một thread được phép thực thi nó.

Chúng ta sử dụng thuật ngữ "tiến vào" (enter) và "rời khỏi" (leave) một critical section.

#### **Phần 3: Cơ Chế Hoạt Động - Locking Protocol**

Làm thế nào để chúng ta thực thi quy tắc "chỉ một thread được vào"?

- Trên đường sắt, họ dùng đèn tín hiệu, các cần gạt chuyển ray.
- Trong lập trình, chúng ta dùng các **cơ chế khóa (locking protocol)**.

Hãy tưởng tượng có một cánh cửa được khóa ở mỗi đầu của critical section.

1. Khi một thread muốn "tiến vào", nó phải giành được "chìa khóa" để mở cửa.
2. Sau khi đã vào trong, nó sẽ khóa trái cửa lại từ bên trong.
3. Tất cả các thread khác muốn vào sẽ bị "khóa trái" (locked out) ở bên ngoài và phải chờ đợi.
4. Sau khi thread bên trong thực thi xong toàn bộ code trong critical section và "rời khỏi", nó sẽ mở khóa cửa.
5. Lúc này, một trong số các thread đang chờ đợi sẽ có cơ hội giành lấy chìa khóa và tiến vào.

Bằng cách này, chúng ta đã ép buộc các thread phải thực thi critical section một cách **tuần tự**, loại bỏ hoàn toàn nguy cơ xảy ra Data Race.

### **Lời Kết**

Khái niệm "Critical Section" rất đơn giản nhưng vô cùng quan trọng. Nó là trái tim của việc đồng bộ hóa. Bước đầu tiên để giải quyết Data Race chính là xác định được đâu là những "đoạn đường ray đơn" trong code của bạn—những vùng code truy cập vào dữ liệu được chia sẻ.

Khi đã xác định được chúng, bước tiếp theo là tìm một "cơ chế khóa" phù hợp để bảo vệ chúng.

Chúng ta đã hiểu *cái gì* (Critical Section) và *tại sao* (để ngăn Data Race). Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về *cách làm*—chúng ta sẽ gặp gỡ công cụ khóa đầu tiên và cơ bản nhất trong C++: `std::mutex`.

*Until then, keep coding!*
