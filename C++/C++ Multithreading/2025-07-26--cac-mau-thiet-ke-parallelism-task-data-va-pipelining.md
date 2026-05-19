---
title: 'Các Mẫu Thiết Kế Parallelism: Task, Data, và Pipelining'
date: '2025-07-26 16:44:25'
date_gmt: '2025-07-26 09:44:25'
modified: '2025-07-26 17:33:52'
status: publish
slug: cac-mau-thiet-ke-parallelism-task-data-va-pipelining
wordpress_id: 283
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/cac-mau-thiet-ke-parallelism-task-data-va-pipelining/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã phân biệt được sự khác nhau giữa Concurrency và Parallelism. Giờ đây, hãy tập trung vào Parallelism và khám phá các mẫu thiết kế (design patterns) phổ biến để cấu trúc một chương trình song song một cách hiệu quả.

Việc lựa chọn đúng mẫu thiết kế phụ thuộc rất nhiều vào bản chất của bài toán bạn đang giải quyết.

---

### Phần 1: Task Parallelism - Phân Chia Công Việc dividir

**Ý tưởng:** Lấy một bài toán tính toán lớn và chia nó thành nhiều **tác vụ con (sub-tasks)** nhỏ hơn. Các tác vụ con này có thể **khác nhau** và được thực thi song song trên các core khác nhau.

- **Mô hình:** "Fork and Join".
  1. **Fork**: Chương trình chính "phân nhánh", khởi tạo nhiều thread, mỗi thread chịu trách nhiệm cho một tác vụ con.
  2. **Join**: Chương trình chính chờ đợi cho đến khi tất cả các thread con hoàn thành.
- **Ví dụ:** Một máy chủ database multi-thread. Khi nhận một câu truy vấn phức tạp, nó có thể chia thành các tác vụ con: một thread đọc dữ liệu từ ổ đĩa, một thread khác xử lý việc join các bảng, một thread thứ ba sắp xếp kết quả. Trong khi thread đọc đĩa đang chờ I/O, các thread khác có thể tận dụng CPU để tính toán.

---

### Phần 2: Data Parallelism - Phân Chia Dữ Liệu 📊

**Ý tưởng:** Đây là mẫu phổ biến nhất. Thay vì chia công việc, chúng ta chia **dữ liệu**. Một tập dữ liệu lớn được chia thành nhiều phần nhỏ hơn, và nhiều thread sẽ thực thi **cùng một thao tác** trên các phần dữ liệu đó một cách song song.

- **Mô hình:** "Vectorization" hay "MapReduce".
  1. **Split (Map)**: Phân chia dữ liệu ra nhiều phần.
  2. **Process**: Các thread xử lý các phần dữ liệu của chúng song song.
  3. **Reduce**: Một bước cuối cùng để tổng hợp các kết quả riêng lẻ từ mỗi thread thành một kết quả cuối cùng duy nhất.
- **Ví dụ:** Tính tổng của một mảng chứa 1 tỷ phần tử. Chúng ta có thể chia mảng thành 10 phần, mỗi phần 100 triệu phần tử. 10 thread sẽ cùng lúc tính tổng cho phần của mình. Cuối cùng, một bước "reduce" sẽ cộng 10 kết quả riêng lẻ đó lại.
- **Lợi ích kép - Data Locality**: Ngoài việc tận dụng nhiều core, Data Parallelism còn mang lại một lợi ích cực lớn về hiệu năng: **Data Locality**. Bằng cách chia dữ liệu thành các khối đủ nhỏ để nằm gọn trong cache riêng của mỗi core CPU, chúng ta giảm thiểu đáng kể số lần truy cập vào RAM chính (vốn rất chậm), giúp tăng tốc độ xử lý lên nhiều lần.
- **Liên kết Phần cứng**: Các CPU hiện đại hỗ trợ trực tiếp Data Parallelism ở cấp độ phần cứng thông qua các tập lệnh **SIMD** (Single Instruction, Multiple Data) như SSE và AVX, cho phép thực hiện một phép tính trên nhiều dữ liệu cùng lúc.

---

### Phần 3: Pipelining - "Dây Chuyền Lắp Ráp" Cho Các Tác Vụ Phụ Thuộc 🏭

**Ý tưởng:** Mẫu này được dùng khi bạn có một chuỗi các tác vụ **phụ thuộc tuyến tính** (A → B → C) cần được áp dụng lên một luồng dữ liệu liên tục. Tác vụ B không thể bắt đầu trên một item cho đến khi A hoàn thành, và C không thể bắt đầu cho đến khi B hoàn thành.

- **Mô hình:** "Dây chuyền lắp ráp" (Assembly Line). Mỗi tác vụ là một công đoạn (stage) trên dây chuyền, chạy trên một thread riêng.
  - Tại thời điểm T1: `Item 1` được xử lý ở `Stage A`.
  - Tại thời điểm T2: `Item 1` chuyển sang `Stage B`, đồng thời `Item 2` bắt đầu vào `Stage A`.
  - Tại thời điểm T3: `Item 1` chuyển sang `Stage C`, `Item 2` chuyển sang `Stage B`, và `Item 3` bắt đầu vào `Stage A`.
- **Ví dụ:** Xử lý một gói tin mạng.
  - Stage A (Thread 1): Giải mã (Decrypt).
  - Stage B (Thread 2): Xử lý nội dung (Modify payload).
  - Stage C (Thread 3): Tái mã hóa và cập nhật header (Re-encrypt).
- **Lợi ích**: Mặc dù mỗi gói tin vẫn phải đi qua các bước một cách tuần tự, dây chuyền cho phép **nhiều gói tin được xử lý cùng một lúc** ở các công đoạn khác nhau, giúp tăng thông lượng (throughput) của toàn bộ hệ thống.

---

Việc lựa chọn đúng mẫu thiết kế parallelism là bước đầu tiên và quan trọng nhất để xây dựng một chương trình song song hiệu quả. Tùy thuộc vào việc bài toán của bạn có thể được chia theo "công việc", "dữ liệu", hay "công đoạn", bạn sẽ chọn một trong các mẫu trên.

Giờ khi đã hiểu các mẫu thiết kế ở mức độ cao, chúng ta hãy xem C++17 cung cấp những công cụ cụ thể nào để hiện thực hóa chúng một cách dễ dàng. Trong bài học tiếp theo, chúng ta sẽ đi sâu vào các thuật toán song song (Parallel Algorithms) của C++17.

*Until then, keep coding!*
