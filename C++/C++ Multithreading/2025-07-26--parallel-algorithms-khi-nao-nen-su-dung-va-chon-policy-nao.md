---
title: 'Parallel Algorithms: Khi Nào Nên Sử Dụng và Chọn Policy Nào?'
date: '2025-07-26 17:15:08'
date_gmt: '2025-07-26 10:15:08'
modified: '2025-07-26 17:33:22'
status: publish
slug: parallel-algorithms-khi-nao-nen-su-dung-va-chon-policy-nao
wordpress_id: 299
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/parallel-algorithms-khi-nao-nen-su-dung-va-chon-policy-nao/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã thấy các thuật toán song song của C++17 có thể mang lại sự cải thiện hiệu năng ấn tượng chỉ với một thay đổi nhỏ trong code. Nhưng "sức mạnh lớn đi kèm với trách nhiệm lớn". Việc thêm một execution policy không phải lúc nào cũng là một viên đạn bạc.

Bài viết này sẽ đưa ra một bộ hướng dẫn thực tế để giúp bạn quyết định khi nào nên sử dụng các thuật toán song song và cách chọn execution policy phù hợp nhất cho tình huống của mình.

---

### Phần 1: Các "Nhưng" Cần Ghi Nhớ

Trước khi quyết định, hãy luôn ghi nhớ những điều sau:

- **Policy là một yêu cầu, không phải mệnh lệnh**: Trình biên dịch có quyền bỏ qua yêu cầu của bạn và chạy thuật toán một cách tuần tự nếu nó không thể đáp ứng.
- **Hỗ trợ từ trình biên dịch không đồng đều**: Không phải tất cả các trình biên dịch đều hỗ trợ đầy đủ các policy này.
- **Parallelism có chi phí (overhead)**: Việc tạo, quản lý và đồng bộ hóa các thread đều tốn thời gian. Lợi ích về hiệu năng phải lớn hơn chi phí này.

---

### Phần 2: Khi Nào KHÔNG Nên Dùng Parallel Policy? 🚫

Đôi khi, việc không sử dụng policy lại là lựa chọn tốt nhất. Hãy tránh sử dụng chúng nếu:

1. **Tính di động (portability) là ưu tiên hàng đầu**: Nếu code của bạn cần phải chạy trên nhiều loại trình biên dịch khác nhau, một số trong đó có thể chưa hỗ trợ đầy đủ.
2. **Thuật toán có bản chất tuần tự**: Cố gắng song song hóa một bài toán phụ thuộc tuyến tính (như `std::iota`) sẽ chỉ làm nó chậm đi.
3. **Thứ tự thực hiện là quan trọng**: Nếu bạn cần đảm bảo các phép toán diễn ra theo đúng thứ tự từ trái sang phải, hãy dùng các thuật toán tuần tự như `std::accumulate` thay vì `std::reduce`.
4. **Hàm tác vụ có thể ném exception**: Như đã học, một exception không được xử lý bên trong một parallel algorithm sẽ gọi `std::terminate()` và làm crash toàn bộ chương trình.
5. **Chi phí đồng bộ hóa quá lớn**: Nếu hàm tác vụ của bạn cho policy `par` đòi hỏi phải sử dụng một mutex bị tranh chấp cao, chi phí chờ đợi có thể xóa sạch mọi lợi ích từ việc chạy song song.

---

### Phần 3: Chọn Execution Policy Nào? 🤔

Nếu bạn đã quyết định rằng parallelism là phù hợp, đây là cách để chọn policy:

#### `std::execution::par_unseq` - Lựa chọn Tối ưu Hiệu năng 🚀

- **Mục tiêu**: Tốc độ tối đa, tận dụng cả parallelism (đa lõi) và vectorization (SIMD).
- **Khi nào dùng**: Đây nên là lựa chọn đầu tiên bạn nhắm tới.
- **Ràng buộc (Nghiêm ngặt nhất)**: Hàm tác vụ của bạn phải **hoàn toàn độc lập**. Nó không được gây ra Data Race VÀ không được sử dụng bất kỳ cơ chế đồng bộ hóa nào (mutex, atomic, lock...) hay các thao tác cấp phát/giải phóng bộ nhớ.

#### `std::execution::par` - Lựa chọn Song song An toàn ⚖️

- **Mục tiêu**: Chạy song song khi không thể đáp ứng các ràng buộc của `par_unseq`.
- **Khi nào dùng**: Khi hàm tác vụ của bạn cần truy cập shared memory và bạn cần dùng mutex hoặc atomic để ngăn chặn Data Race. Policy này cho phép các thao tác đồng bộ hóa.

#### `std::execution::seq` - Dành cho Debugging 🐞

- **Mục tiêu**: Gỡ lỗi code song song.
- **Khi nào dùng**: Nó chạy trên một thread duy nhất, giúp việc debug dễ dàng hơn, nhưng nó vẫn mô phỏng một số hành vi của các policy song song (như gọi `std::terminate()` khi có exception). Điều này giúp bạn phát hiện lỗi trong một môi trường dễ kiểm soát hơn.

#### `std::execution::unseq` (C++20) - Dành cho Vector hóa

- **Mục tiêu**: Tận dụng các chỉ thị SIMD trên một thread duy nhất.
- **Khi nào dùng**: Khi bạn có một tác vụ tuần tự nhưng có thể được hưởng lợi từ việc xử lý nhiều dữ liệu cùng lúc ở cấp độ phần cứng. Ràng buộc của nó cũng nghiêm ngặt như `par_unseq`.

---

**Quy trình ra quyết định:**

1. Đầu tiên, hãy tự hỏi: "Mình có nên dùng parallel policy không?" (Xem lại danh sách ở Phần 2).
2. Nếu có, hãy thử với `std::execution::par_unseq` trước tiên để có hiệu năng tốt nhất.
3. Nếu tác vụ của bạn yêu cầu đồng bộ hóa hoặc cấp phát bộ nhớ, hãy lùi về `std::execution::par`.
4. Dùng `std::execution::seq` để kiểm tra và gỡ lỗi logic của bạn.
5. **Và quan trọng nhất: Hãy đo lường (Benchmark)!** Đừng bao giờ cho rằng một policy song song sẽ tự động làm code nhanh hơn. Hãy đo đạc để chứng minh điều đó.

---

Phần tìm hiểu về Parallelism của chúng ta kết thúc ở đây. Bạn đã được trang bị các kiến thức từ các mẫu thiết kế cấp cao đến các công cụ C++17 cụ thể và các quy tắc để sử dụng chúng một cách an toàn và hiệu quả.

Trong chương lớn tiếp theo, chúng ta sẽ vận dụng tất cả những gì đã học về thread, mutex, và các cơ chế đồng bộ hóa để xây dựng các cấu trúc dữ liệu thread-safe của riêng mình.

*Until then, keep coding!*
