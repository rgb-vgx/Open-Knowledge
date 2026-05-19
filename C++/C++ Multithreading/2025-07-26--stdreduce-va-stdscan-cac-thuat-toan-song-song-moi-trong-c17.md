---
title: 'std::reduce và std::scan: Các Thuật Toán Song Song Mới trong C++17'
date: '2025-07-26 17:09:09'
date_gmt: '2025-07-26 10:09:09'
modified: '2025-07-26 17:33:33'
status: publish
slug: stdreduce-va-stdscan-cac-thuat-toan-song-song-moi-trong-c17
wordpress_id: 293
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/stdreduce-va-stdscan-cac-thuat-toan-song-song-moi-trong-c17/
categories:
- C++ Multithreading
tags: []
---

Ở bài trước, chúng ta đã biết C++17 cho phép thêm execution policy vào hầu hết các thuật toán trong `<algorithm>`. Tuy nhiên, với các thuật toán số học kinh điển trong `<numeric>` như `std::accumulate`, câu chuyện lại khác. Do bản chất tuần tự cố hữu, chúng không thể được song song hóa một cách đơn giản.

Vì vậy, C++17 đã giới thiệu các thuật toán **mới**, được thiết kế lại từ đầu để hỗ trợ parallelism.

---

### Phần 1: Từ `std::accumulate` đến `std::reduce`

#### a) `std::accumulate` - Người Tiền Nhiệm Tuần Tự

`std::accumulate` tính tổng các phần tử trong một range. Vấn đề là, tiêu chuẩn C++ quy định rằng nó **bắt buộc** phải thực hiện phép cộng một cách **tuần tự nghiêm ngặt từ trái sang phải**.

C++

```
// std::accumulate({1, 2, 3, 4}, 0) phải được tính là (((0+1)+2)+3)+4
```

Chuỗi phụ thuộc này (`+2` phải chờ kết quả của `0+1`) khiến cho việc song song hóa là bất khả thi.

#### b) `std::reduce` - Sức Mạnh Song Song

`std::reduce` (C++17) là phiên bản thay thế có hỗ trợ execution policy. Điểm khác biệt cốt lõi là:

> `std::reduce` **không đảm bảo** thứ tự thực hiện phép tính. Nó giả định rằng phép toán của bạn có tính **giao hoán (commutative)** và **kết hợp (associative)**.

Điều này cho phép thư viện tự do "xé" bài toán ra và tính toán song song. Ví dụ, để tính tổng 8 phần tử, nó có thể:

1. Chia thành 2 nhóm: `(1+2+3+4)` và `(5+6+7+8)`. Hai nhóm này được tính song song trên 2 thread khác nhau.
2. Mỗi nhóm lại có thể được chia nhỏ hơn nữa.
3. Cuối cùng, kết quả của các nhóm được cộng lại với nhau (bước "reduce").

C++

```
#include <iostream>
#include <vector>
#include <numeric>     // Cho accumulate, reduce
#include <execution>   // Cho execution policies

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};

    // Luôn chạy tuần tự
    int sum_acc = std::accumulate(v.begin(), v.end(), 0);

    // Có thể chạy song song
    int sum_red = std::reduce(std::execution::par, v.begin(), v.end(), 0);

    std::cout << "accumulate: " << sum_acc << std::endl;
    std::cout << "reduce:     " << sum_red << std::endl;
}
```

**⚠️ Cảnh báo**: Vì `std::reduce` có thể sắp xếp lại phép tính, đừng dùng nó cho các phép toán mà thứ tự là quan trọng (như phép trừ, phép chia) hoặc khi việc nhóm lại có thể thay đổi kết quả (như phép cộng số thực dấu phẩy động có thể gây ra sai số làm tròn khác nhau).

---

### Phần 2: Từ `std::partial_sum` đến `scan`

`std::partial_sum` tính tổng tích lũy (prefix sum), ví dụ `out[i] = in[0] + ... + in[i]`. Nó cũng có bản chất tuần tự. C++17 giới thiệu hai phiên bản song song hóa của nó.

#### a) `std::inclusive_scan`

Đây là phiên bản thay thế trực tiếp cho `std::partial_sum`. Kết quả tại vị trí `i` **bao gồm (inclusive)** giá trị tại vị trí `i` của đầu vào.

C++

```
// input:  {1, 2, 3, 4}
// output: {1, 1+2, 1+2+3, 1+2+3+4} -> {1, 3, 6, 10}
```

#### b) `std::exclusive_scan`

Phiên bản này cũng tính tổng tích lũy, nhưng kết quả tại vị trí `i` **loại trừ (exclusive)** giá trị tại vị trí `i` của đầu vào. Nó sẽ tính tổng của `i-1` phần tử đầu tiên.

C++

```
// input:      {1, 2, 3, 4}, initial_value: -1
// output[0] = -1
// output[1] = -1 + 1
// output[2] = -1 + 1 + 2
// output[3] = -1 + 1 + 2 + 3
// -> {-1, 0, 2, 5}
```

Các thuật toán `scan` rất hữu ích trong lập trình song song và tính toán khoa học.

**Code minh họa:**

C++

```
#include <iostream>
#include <vector>
#include <numeric>
#include <execution>

int main() {
    std::vector<int> v = {1, 2, 3, 4};
    std::vector<int> res1(4), res2(4);

    // Tương đương partial_sum
    std::inclusive_scan(std::execution::par, v.begin(), v.end(), res1.begin());

    // Tính tổng "loại trừ" phần tử hiện tại
    std::exclusive_scan(std::execution::par, v.begin(), v.end(), res2.begin(), 0);

    std::cout << "inclusive_scan: ";
    for(int n : res1) std::cout << n << " "; // In ra: 1 3 6 10
    std::cout << std::endl;

    std::cout << "exclusive_scan: ";
    for(int n : res2) std::cout << n << " "; // In ra: 0 1 3 6
    std::cout << std::endl;
}
```

---

C++17 đã cung cấp cho chúng ta những công cụ mạnh mẽ để song song hóa các thuật toán số học phổ biến. Bằng cách giới thiệu các phiên bản mới như `std::reduce` và `std::scan` thay vì sửa đổi các thuật toán cũ, thư viện chuẩn vừa đảm bảo tính tương thích ngược, vừa cho phép chúng ta lựa chọn rõ ràng giữa hành vi tuần tự có thứ tự (`accumulate`) và hành vi song song không có thứ tự (`reduce`).

*Until then, keep coding!*
