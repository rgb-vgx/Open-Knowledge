---
title: 'Thực Hành transform_reduce: Tìm Lỗi Sai Lớn Nhất Giữa Hai Vector'
date: '2025-07-26 17:14:05'
date_gmt: '2025-07-26 10:14:05'
modified: '2025-07-26 17:33:26'
status: publish
slug: thuc-hanh-transform_reduce-tim-loi-sai-lon-nhat-giua-hai-vector
wordpress_id: 297
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/thuc-hanh-transform_reduce-tim-loi-sai-lon-nhat-giua-hai-vector/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã tìm hiểu phiên bản đơn giản nhất của `std::transform_reduce`, tương đương với một `std::inner_product` song song. Tuy nhiên, sức mạnh thực sự của thuật toán này nằm ở khả năng cho phép chúng ta tùy chỉnh hoàn toàn cả hai quá trình: **transform** và **reduce**.

Bài viết này sẽ đi sâu vào phiên bản nạp chồng (overload) nâng cao của `transform_reduce` để giải quyết một bài toán phân tích dữ liệu thực tế.

---

### Phần 1: Sức Mạnh Thực Sự Của `transform_reduce`

Phiên bản `transform_reduce` nâng cao cho phép chúng ta cung cấp hai hàm (hoặc lambda) tùy chỉnh:

1. **`transform_op` (Binary)**: Một hàm nhận hai phần tử (một từ mỗi vector đầu vào) và **biến đổi (transform)** chúng thành một giá trị trung gian.
2. **`reduce_op` (Binary)**: Một hàm nhận hai giá trị trung gian (kết quả của `transform_op`) và **tổng hợp (reduce)** chúng lại thành một giá trị duy nhất.

Về cơ bản, nó thực hiện phép tính sau một cách song song: `reduce(reduce(..., reduce(init, transform(v1[0], v2[0])), transform(v1[1], v2[1])), ...)`

---

### Phần 2: Bài Toán Thực Tế - Phân Tích Dữ Liệu Thí Nghiệm 📈

Hãy tưởng tượng một kịch bản thực tế trong khoa học:

- Chúng ta có một `std::vector<double> expected_values` chứa các giá trị được dự đoán bởi một lý thuyết.
- Chúng ta có một `std::vector<double> actual_values` chứa các kết quả thu được từ một thí nghiệm thực tế.
- **Mục tiêu**: Tìm ra **sai số lớn nhất** giữa giá trị lý thuyết và giá trị thực tế, tức là `max(abs(expected[i] - actual[i]))` trên toàn bộ tập dữ liệu.

---

### Phần 3: Giải Quyết Bằng `transform_reduce`

Bài toán này là một ứng cử viên hoàn hảo cho `transform_reduce`. Chúng ta có thể ánh xạ bài toán vào các tham số của thuật toán như sau:

- **`transform_op`**: Tính sai số (hiệu) của một cặp giá trị. Chúng ta cần giá trị tuyệt đối vì không quan tâm đến dấu.C++`[](double expected, double actual) { return std::abs(expected - actual); }`
- **`reduce_op`**: Từ các sai số riêng lẻ, tìm ra sai số lớn nhất.C++`[](double err1, double err2) { return std::max(err1, err2); }`
- **`initial_value`**: Giá trị khởi tạo cho "sai số lớn nhất" nên là `0.0`.

**Code hoàn chỉnh:**

C++

```
#include <iostream>
#include <vector>
#include <numeric>
#include <execution>
#include <cmath>     // Cho std::abs
#include <algorithm> // Cho std::max

int main() {
    // Dữ liệu từ lý thuyết
    std::vector<double> expected_values = {1.0, 1.2, 1.4, 1.6, 1.8, 2.0};
    // Dữ liệu từ thí nghiệm thực tế
    std::vector<double> actual_values   = {1.01, 1.22, 1.37, 1.61, 1.82, 2.01};

    // Tìm sai số lớn nhất bằng transform_reduce
    double max_error = std::transform_reduce(
        std::execution::par,    // Yêu cầu thực thi song song
        expected_values.begin(), 
        expected_values.end(),
        actual_values.begin(),
        0.0,                    // 1. Giá trị khởi tạo cho reduce
        [](double a, double b) { return std::max(a, b); },      // 2. Phép toán Reduce
        [](double exp, double act) { return std::abs(exp - act); } // 3. Phép toán Transform
    );

    std::cout << "Sai so lon nhat tim duoc la: " << max_error << std::endl;
    // Kết quả sẽ là 0.03 (từ cặp 1.4 và 1.37)
    
    return 0;
}
```

Chỉ với một lời gọi hàm duy nhất, chúng ta đã hiện thực hóa một thuật toán phân tích dữ liệu phức tạp, và nó có thể chạy song song trên nhiều core CPU, cực kỳ hiệu quả cho các tập dữ liệu lớn.

---

`std::transform_reduce` là một ví dụ điển hình cho sức mạnh và sự linh hoạt của các thuật toán song song trong C++17. Bằng cách cho phép tùy chỉnh các phép toán transform và reduce, nó không chỉ giới hạn ở các bài toán số học đơn giản mà còn có thể giải quyết một loạt các vấn đề xử lý dữ liệu phức tạp trong một cú pháp gọn gàng và hiệu năng cao.

*Until then, keep coding!*
