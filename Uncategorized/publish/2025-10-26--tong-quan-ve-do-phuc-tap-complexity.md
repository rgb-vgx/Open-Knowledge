---
title: Tổng quan về Độ phức tạp (Complexity)
date: '2025-10-26 15:43:04'
date_gmt: '2025-10-26 08:43:04'
modified: '2025-10-26 15:43:04'
status: publish
slug: tong-quan-ve-do-phuc-tap-complexity
wordpress_id: 438
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/tong-quan-ve-do-phuc-tap-complexity/
categories:
- Uncategorized
tags: []
---

Bước cuối cùng trong chu trình phát triển là tính toán độ phức tạp của hệ thống. Chúng ta cần phân tích độ phức tạp thời gian (time complexity) và độ phức tạp bộ nhớ (memory complexity).

### 🚀 Các khái niệm chính

- **Độ phức tạp thời gian (Time Complexity)**
  - Thường là yếu tố then chốt trong các buổi phỏng vấn kỹ thuật.
  - Là trọng tâm chính khi cải thiện hiệu suất của thuật toán.
  - Khi chỉ đề cập "độ phức tạp" (ví dụ: `O(n)`) mà không nói rõ là thời gian hay bộ nhớ, thì mặc định đó là độ phức tạp thời gian. Điều này cũng đúng trong ngành công nghiệp.
  - Ví dụ: Nếu nói `O(N^2)`, ngầm hiểu là độ phức tạp thời gian.
- **Độ phức tạp bộ nhớ (Memory Complexity / Space Complexity)**
  - Đôi khi được gọi là độ phức tạp không gian (space complexity).
  - Cần được phân tích cùng với độ phức tạp thời gian.

### 💡 Lời khuyên và Thực hành tốt nhất

1. **Phân tích toàn diện**: Luôn phân tích cả độ phức tạp thời gian và độ phức tạp bộ nhớ cho hệ thống hoặc thuật toán của bạn.
2. **Ưu tiên thời gian**: Khi cải thiện thuật toán, hãy tập trung vào việc tối ưu độ phức tạp thời gian.
3. **Xác định rõ ràng**:
   - Nêu rõ độ phức tạp cho từng hàm (function) khác nhau trong code.
   - Nếu có một khối code nhạy cảm ảnh hưởng lớn đến độ phức tạp, hãy làm nổi bật nó.
4. **Cẩn trọng với Đệ quy (Recursion)**:
   - Đệ quy sẽ tạo ra **không gian phụ trợ (auxiliary space)**.
   - Mỗi lời gọi đệ quy sẽ thêm một khung ngăn xếp (stack frame) vào stack, chiếm một lượng bộ nhớ nhất định (ví dụ: `O(1)` hoặc hơn, tùy thuộc vào dữ liệu được lưu trữ).
   - Đây là một điểm thường được hỏi trong các buổi phỏng vấn.
   - **Ví dụ**:
     - Tính giai thừa `N` bằng đệ quy có độ phức tạp không gian phụ trợ là `O(n)`.
     - Tính giai thừa `N` bằng cách lặp (iteratively) chỉ có độ phức tạp không gian phụ trợ là `O(1)`.
