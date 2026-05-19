---
title: 'Ôn Tập Về Thuật Toán STL: Iterator, Predicate và find/find_if'
date: '2025-07-26 17:00:32'
date_gmt: '2025-07-26 10:00:32'
modified: '2025-07-26 17:33:45'
status: publish
slug: on-tap-ve-thuat-toan-stl-iterator-predicate-va-find-find_if
wordpress_id: 287
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/on-tap-ve-thuat-toan-stl-iterator-predicate-va-find-find_if/
categories:
- C++ Multithreading
tags: []
---

Trước khi chúng ta khai phá sức mạnh của các thuật toán song song trong C++17, điều quan trọng là phải đảm bảo nền tảng của chúng ta về các thuật toán trong Thư viện Chuẩn (STL) đã vững chắc. Các thuật toán này là một trong những trụ cột của lập trình C++ hiện đại.

Bài viết này sẽ là một bài ôn tập nhanh nhưng đầy đủ về các khái niệm cốt lõi: **iterator range** và **predicate**, thông qua cặp đôi ví dụ kinh điển `std::find` và `std::find_if`.

---

### Phần 1: Nguyên Tắc Hoạt Động Cốt Lõi

Các thuật toán STL (trong header `<algorithm>` và `<numeric>`) là một bộ sưu tập các hàm hiệu quả cho các tác vụ phổ biến như tìm kiếm, sắp xếp, biến đổi dữ liệu... Chúng không làm việc trực tiếp trên container (như `std::vector`) mà làm việc trên một khái niệm tổng quát hơn.

**Iterator Ranges `[first, last)`** Đây là nguyên tắc quan trọng nhất. Một thuật toán nhận vào hai iterator để xác định một "khoảng" (range) dữ liệu mà nó sẽ thao tác:

- `first`: Một iterator trỏ đến phần tử **đầu tiên** trong khoảng.
- `last`: Một iterator trỏ đến vị trí **ngay sau** phần tử cuối cùng.

Khoảng này là "nửa mở": nó bao gồm `first` nhưng **không** bao gồm `last`. Cặp `container.begin()` và `container.end()` là cách phổ biến nhất để chỉ định toàn bộ container.

---

### Phần 2: Ví Dụ Kinh Điển - `std::find`

Giả sử chúng ta muốn tìm sự xuất hiện đầu tiên của ký tự `'o'` trong một chuỗi. `std::find` là công cụ hoàn hảo cho việc này.

C++

```
#include <iostream>
#include <string>
#include <algorithm> // Cho std::find

int main() {
    std::string s = "Hello, world!";
    char target = 'o';

    // Tìm kiếm trong toàn bộ chuỗi
    auto it = std::find(s.cbegin(), s.cend(), target);

    // BẮT BUỘC phải kiểm tra kết quả trả về
    if (it != s.cend()) {
        // Tìm thấy! 'it' là một iterator hợp lệ trỏ đến chữ 'o'
        std::cout << "Tim thay '" << target << "' tai vi tri: " 
                  << std::distance(s.cbegin(), it) << std::endl;
    } else {
        // Không tìm thấy. 'it' bằng với s.cend()
        std::cout << "Khong tim thay '" << target << "'." << std::endl;
    }
    return 0;
}
```

**Phân tích:**

- `std::find` trả về một iterator.
- Nếu tìm thấy, iterator đó sẽ trỏ đến phần tử được tìm thấy.
- Nếu không tìm thấy, nó sẽ trả về chính iterator `end` mà bạn đã truyền vào.
- Do đó, việc kiểm tra `if (it != s.cend())` là cực kỳ quan trọng để tránh lỗi khi cố gắng sử dụng một iterator không hợp lệ.

---

### Phần 3: Sức Mạnh Của Predicate và `std::find_if`

Bây giờ, nếu chúng ta muốn tìm ký tự `'O'` (viết hoa) thì sao?

C++

```
auto it = std::find(s.cbegin(), s.cend(), 'O'); // Thử tìm 'O' hoa
```

`std::find` sẽ không tìm thấy, vì phép so sánh ký tự mặc định là có phân biệt chữ hoa/thường (`'o' != 'O'`).

**Predicate là gì?** `std::find` sử dụng toán tử `==` của kiểu dữ liệu làm điều kiện so sánh. Toán tử `==` này được xem như một **predicate** (vị từ) ngầm định. Một predicate chỉ đơn giản là một callable object (hàm, lambda...) nhận một phần tử và trả về `true` hoặc `false`.

Khi chúng ta cần một logic so sánh phức tạp hơn, chúng ta dùng `std::find_if`. Thuật toán này cho phép chúng ta cung cấp **predicate tùy chỉnh** của riêng mình.

**Ví dụ: Tìm kiếm không phân biệt hoa/thường** Chúng ta sẽ cung cấp một lambda expression làm predicate: nó sẽ chuyển cả ký tự trong chuỗi và ký tự mục tiêu về dạng viết hoa trước khi so sánh.

C++

```
#include <iostream>
#include <string>
#include <algorithm>
#include <cctype> // Cho std::toupper

int main() {
    std::string s = "Hello, world!";
    char target_upper = 'O';

    auto it = std::find_if(s.cbegin(), s.cend(), [target_upper](char c) {
        // Predicate: trả về true nếu ký tự sau khi chuyển thành hoa bằng với mục tiêu
        return std::toupper(c) == target_upper;
    });

    if (it != s.cend()) {
        std::cout << "Tim thay '" << *it << "' khong phan biet hoa/thuong.\n";
    } else {
        std::cout << "Khong tim thay.\n";
    }
    return 0;
}
```

Với `std::find_if`, chúng ta đã định nghĩa lại "sự bằng nhau" theo logic của riêng mình, làm cho thuật toán trở nên mạnh mẽ và linh hoạt hơn rất nhiều.

---

**Tóm lại:**

1. Các thuật toán STL hoạt động trên **iterator ranges `[begin, end)`**.
2. Nhiều thuật toán sử dụng **predicate** để đưa ra quyết định.
3. Các thuật toán có hậu tố `_if` cho phép bạn cung cấp một **predicate tùy chỉnh**, mang lại sự linh hoạt tối đa.

Với nền tảng vững chắc này, chúng ta đã sẵn sàng cho phần thú vị nhất. Trong bài học tiếp theo, hãy xem C++17 cho phép chúng ta chạy các thuật toán này song song một cách dễ dàng như thế nào.

*Until then, keep coding!*
