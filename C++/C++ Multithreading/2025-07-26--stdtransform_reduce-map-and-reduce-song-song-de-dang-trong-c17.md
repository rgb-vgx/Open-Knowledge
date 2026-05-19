---
title: 'std::transform_reduce: "Map and Reduce" Song Song Dễ Dàng trong C++17'
date: '2025-07-26 17:12:15'
date_gmt: '2025-07-26 10:12:15'
modified: '2025-07-26 17:33:30'
status: publish
slug: stdtransform_reduce-map-and-reduce-song-song-de-dang-trong-c17
wordpress_id: 295
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/stdtransform_reduce-map-and-reduce-song-song-de-dang-trong-c17/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã học về `std::reduce` để thực hiện các phép tính tổng hợp song song. Nhưng nhiều bài toán thực tế đòi hỏi một quy trình hai bước: đầu tiên **biến đổi (transform)** dữ liệu, sau đó mới **tổng hợp (reduce)** các kết quả đã biến đổi. Đây chính là pattern kinh điển **"Map and Reduce"**.

C++17 đã mang đến một thuật toán được tối ưu hóa cao cho chính xác pattern này: `std::transform_reduce`.

---

### Phần 1: Ôn Lại `std::transform` (Bước "Map")

`std::transform` là một thuật toán STL tiêu chuẩn, nó duyệt qua một container đầu vào, áp dụng một hàm cho từng phần tử, và lưu kết quả vào một container đầu ra. Về bản chất, nó "ánh xạ" (maps) một tập dữ liệu đầu vào thành một tập dữ liệu đầu ra.

C++

```
std::vector<int> input = {1, 2, 3, 4};
std::vector<int> output;
// "Map" mỗi phần tử của input thành giá trị gấp đôi của nó trong output
std::transform(input.begin(), input.end(), std::back_inserter(output), 
               [](int n){ return n * 2; });
// output bây giờ là {2, 4, 6, 8}
```

---

### Phần 2: Pattern "Map and Reduce" Kinh Điển

Đây là một pattern lập trình song song rất phổ biến:

1. **Map Phase**: Chia nhỏ dữ liệu. Nhiều thread cùng lúc chạy một hàm "map" (như `transform`) trên các phần dữ liệu khác nhau để tạo ra các kết quả trung gian.
2. **Reduce Phase**: Một bước cuối cùng để kết hợp tất cả các kết quả trung gian đó lại thành một kết quả cuối cùng duy nhất (dùng một hàm "reduce" như `std::reduce`).

Trước C++17, để làm điều này, bạn phải:

- Tự tạo các thread.
- Chạy `transform` trên mỗi thread.
- Lưu kết quả trung gian vào các vector tạm.
- Chờ tất cả các thread `transform` hoàn thành.
- Chạy `reduce` trên các vector tạm đó.

Quá trình này rất cồng kềnh, tốn bộ nhớ cho các kết quả trung gian và kém hiệu quả do phải chờ đợi nhiều lần.

---

### Phần 3: `std::transform_reduce` - Sức Mạnh Hợp Nhất 퓨전

`std::transform_reduce` (trong header `<numeric>`) là giải pháp C++17 cho vấn đề trên. Nó **"hợp nhất" (fuses)** cả hai bước Map và Reduce vào một thuật toán duy nhất.

**Lợi ích của việc hợp nhất:**

- **Không cần bộ nhớ trung gian**: Kết quả từ bước transform có thể được đưa thẳng vào bước reduce.
- **Hiệu quả hơn**: Bước reduce có thể bắt đầu ngay khi có những kết quả transform đầu tiên, không cần chờ tất cả hoàn thành.
- **Tái sử dụng thread**: Giảm chi phí tạo thread mới.

#### Use Case Đơn Giản Nhất: `inner_product` Song Song

Thuật toán kinh điển `std::inner_product` tính tích vô hướng của hai vector: `init + (v1[0]*v2[0]) + (v1[1]*v2[1]) + ...`

Đây chính là một ví dụ hoàn hảo của transform-reduce:

- **Transform (Map)**: Nhân các cặp phần tử tương ứng với nhau.
- **Reduce**: Cộng dồn các tích đó lại.

`std::transform_reduce` cung cấp một phiên bản song song cho chính xác tác vụ này.

C++

```
#include <iostream>
#include <vector>
#include <numeric>
#include <execution>

int main() {
    std::vector<int> v1 = {1, 2, 3, 4};
    std::vector<int> v2 = {5, 4, 3, 2};
    int init = 0;

    // Cách làm tuần tự truyền thống
    int result_inner_prod = std::inner_product(v1.begin(), v1.end(), v2.begin(), init);
    std::cout << "std::inner_product: " << result_inner_prod << std::endl;

    // Cách làm song song với C++17
    int result_transform_reduce = std::transform_reduce(
        std::execution::par,
        v1.begin(), v1.end(),
        v2.begin(),
        init
    );
    std::cout << "std::transform_reduce: " << result_transform_reduce << std::endl;
    // Cả hai đều cho kết quả: 0 + (1*5) + (2*4) + (3*3) + (4*2) = 30
    return 0;
}
```

---

`std::transform_reduce` là một thuật toán cực kỳ mạnh mẽ và hiệu quả của C++17. Bằng cách hợp nhất hai bước Map và Reduce, nó giúp chúng ta hiện thực hóa các pattern song song phức tạp một cách gọn gàng và tối ưu.

Chúng ta mới chỉ xem xét dạng đơn giản nhất của nó. Trong bài học tiếp theo, chúng ta sẽ khám phá các phiên bản nạp chồng (overload) nâng cao hơn của `transform_reduce` để giải quyết các bài toán còn phức tạp hơn nữa.

*Until then, keep coding!*
