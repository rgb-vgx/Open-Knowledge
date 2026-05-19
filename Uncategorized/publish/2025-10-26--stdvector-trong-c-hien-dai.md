---
title: std::vector trong C++ hiện đại
date: '2025-10-26 22:38:54'
date_gmt: '2025-10-26 15:38:54'
modified: '2025-10-26 22:44:54'
status: publish
slug: stdvector-trong-c-hien-dai
wordpress_id: 443
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/stdvector-trong-c-hien-dai/
categories:
- Uncategorized
tags: []
---

### Key Takeaways

`std::vector` là một cấu trúc dữ liệu cơ bản và thường được khuyến nghị sử dụng mặc định trong C++ do tính linh hoạt (mảng động có thể thay đổi kích thước), hiệu suất cao (bộ nhớ liền kề) và khả năng cấp phát trên Heap cho dữ liệu lớn. Để tối ưu hiệu suất, hãy sử dụng `.reserve()` khi biết trước kích thước, truyền `vector` bằng `const&` hoặc `std::span` vào hàm để tránh sao chép tốn kém, và cẩn thận với việc xóa phần tử trong vòng lặp do có thể làm mất hiệu lực iterator. Hàm `.data()` hữu ích khi tương tác với các API kiểu C.

### Giới thiệu về `std::vector`

`std::vector` là một phần của Thư viện Chuẩn (Standard Template Library - STL) trong C++ từ C++98. Nó được mô tả tốt nhất là một "mảng động" (dynamic array), nghĩa là một cấu trúc dữ liệu có thể tự động thay đổi kích thước.

#### Cơ chế hoạt động của `vector`

- **Thay đổi kích thước và cấp phát lại bộ nhớ**: Khi thêm phần tử vào một `vector` đã đầy dung lượng (capacity), `vector` sẽ cấp phát lại một vùng bộ nhớ mới lớn hơn, sao chép tất cả các phần tử hiện có sang vùng mới, sau đó mới thêm phần tử mới.
- **Dung lượng (Capacity) và Kích thước (Size)**:
  - **Size**: Số lượng phần tử thực tế đang có trong `vector`.
  - **Capacity**: Tổng số phần tử mà `vector` có thể chứa mà không cần cấp phát lại bộ nhớ.
- **Tối ưu cấp phát lại**: Để tránh việc sao chép thường xuyên, các triển khai của `vector` thường cấp phát thừa bộ nhớ. Ví dụ, khi cần cấp phát lại, dung lượng có thể tăng gấp đôi hoặc 1.5 lần kích thước hiện tại. Điều này giúp giảm số lần cấp phát lại và sao chép.

### Ưu điểm của `std::vector`

1. **Hiệu suất cao**: Các phần tử trong `vector` được lưu trữ liền kề trong bộ nhớ. Điều này rất tốt cho hiệu suất bộ nhớ đệm (cache) của phần cứng và mô hình truy cập dữ liệu, giúp truy cập nhanh chóng.
2. **Cấp phát trên Heap**: `vector` được cấp phát trên Heap, cho phép lưu trữ các bộ sưu tập dữ liệu lớn mà không bị giới hạn bởi kích thước Stack (thường chỉ vài trăm kilobyte đến vài megabyte).
3. **Mặc định được khuyến nghị**: `vector` thường là cấu trúc dữ liệu đầu tiên được khuyến nghị sử dụng trong C++ nếu không có yêu cầu đặc biệt nào khác.

### Các hàm thành viên và cách sử dụng cơ bản

Để sử dụng `vector`, cần `#include <vector>`.

#### Khởi tạo và truy cập phần tử

- **Khởi tạo**:`std::vector<int> myVector = {1, 2, 3}; // Hoặc với C++17 trở lên, có thể dùng suy luận kiểu đối số template (CTAD): // std::vector myVector = {1, 2, 3};`
- **Truy cập**:
  - Sử dụng toán tử `[]` (subscript operator) như mảng: `myVector[0]`. Không kiểm tra lỗi tràn biên.
  - Sử dụng `.at(index)`: `myVector.at(0)`. Có kiểm tra lỗi tràn biên (bounds checking) và sẽ ném ngoại lệ nếu truy cập không hợp lệ.
- **Kích thước**: `.size()` trả về số phần tử hiện có.
- **Dung lượng**: `.capacity()` trả về số phần tử có thể chứa mà không cần cấp phát lại.
- **Thêm phần tử**: `.push_back(value)` thêm một phần tử vào cuối `vector`.

#### Ví dụ về `capacity` và `push_back`

Khi chạy thử nghiệm với `push_back` và in ra `capacity`, ta có thể thấy `capacity` tăng theo các bước:

- Khởi tạo `myVector = {1, 2, 3}`: `size = 3`, `capacity = 3`.
- `myVector.push_back(4)`: `size = 4`, `capacity = 6` (tăng gấp đôi).
- `myVector.push_back(5)`: `size = 5`, `capacity = 6` (vẫn đủ chỗ).
- `myVector.push_back(6)`: `size = 6`, `capacity = 6` (vẫn đủ chỗ).
- `myVector.push_back(7)`: `size = 7`, `capacity = 12` (tăng gấp đôi vì đã đầy).

### Tối ưu hóa bộ nhớ

- **`shrink_to_fit()` (C++11)**: Giảm `capacity` xuống bằng `size` hiện tại, giải phóng bộ nhớ thừa. Hữu ích khi bạn đã thêm và xóa nhiều phần tử, và không mong đợi `vector` sẽ phát triển thêm.
- **`reserve(count)`**: Đặt trước một dung lượng nhất định cho `vector`. Nếu bạn biết trước số lượng phần tử tối đa mà `vector` sẽ chứa, gọi `.reserve(count)` một lần duy nhất trước khi thêm các phần tử sẽ ngăn chặn các hoạt động cấp phát lại và sao chép tốn kém.
  - **Lưu ý**: Không nên gọi `reserve` trước mỗi `push_back`, vì điều đó có thể làm tăng số lần cấp phát bộ nhớ thay vì giảm.

### Xóa phần tử (`erase`) và Iterator

- **Iterator**: Là một khái niệm giống như con trỏ, dùng để trỏ đến một vị trí trong `vector`.
  - `myVector.begin()`: Trả về một iterator trỏ đến phần tử đầu tiên.
  - `myVector.end()`: Trả về một iterator trỏ đến vị trí "sau" phần tử cuối cùng (không phải phần tử cuối cùng).
  - `myVector.begin() + offset`: Trả về iterator trỏ đến vị trí `offset` so với `begin()`.
- **`erase(iterator)`**: Xóa phần tử tại vị trí mà iterator trỏ tới.
  - Ví dụ: `myVector.erase(myVector.begin())` sẽ xóa phần tử đầu tiên.
  - **Hiệu suất**: `.erase()` là một thao tác có độ phức tạp tuyến tính (linear time), vì khi một phần tử bị xóa, tất cả các phần tử phía sau nó phải được dịch chuyển về phía trước.

#### Cảnh báo khi xóa phần tử trong vòng lặp

- **Làm mất hiệu lực Iterator (Iterator Invalidation)**: Khi xóa một phần tử, các iterator trỏ đến hoặc sau vị trí bị xóa có thể bị mất hiệu lực (trở nên không hợp lệ).
- **Vòng lặp `for` dựa trên phạm vi (Range-based for loop)**: Không an toàn khi xóa phần tử bên trong loại vòng lặp này vì nó hoạt động trên một bản sao hoặc một tập hợp iterator được tạo ra ban đầu, và việc thay đổi `vector` có thể làm hỏng các iterator đó, dẫn đến hành vi không mong muốn hoặc lỗi.
- **Vòng lặp kiểu C truyền thống với Iterator**: Nếu cần xóa phần tử trong vòng lặp, nên sử dụng vòng lặp truyền thống với iterator và cẩn thận cập nhật iterator sau mỗi lần xóa. Hàm `.erase()` trả về một iterator trỏ đến phần tử tiếp theo sau phần tử đã xóa, nên có thể sử dụng giá trị trả về này để cập nhật iterator.

```
// Cách an toàn hơn để xóa trong vòng lặp
for (auto it = myVector.begin(); it != myVector.end(); /* không tăng it ở đây */) {
    if (*it == some_value_to_erase) {
        it = myVector.erase(it); // Cập nhật iterator với giá trị trả về
    } else {
        ++it; // Chỉ tăng iterator nếu không xóa
    }
}
```

### Tối ưu hóa khi truyền `vector` vào hàm

Khi truyền `vector` làm đối số cho hàm, đặc biệt là `vector` lớn, cần cân nhắc hiệu suất:

- **Truyền bằng giá trị (by value)**: Tạo một bản sao đầy đủ của `vector`. Điều này rất tốn kém về thời gian và bộ nhớ, đặc biệt với `vector` lớn (ví dụ: 500,000 phần tử).
- **Truyền bằng tham chiếu hằng (by `const&`)**: `const std::vector<long>& myVector`. Đây là cách phổ biến và hiệu quả để truyền `vector` vào hàm khi bạn chỉ cần đọc dữ liệu và không muốn sửa đổi nó. Tránh được chi phí sao chép.
- **Sử dụng `std::span` (C++20)**: `std::span<long> myData`. `std::span` cung cấp một "view" (chế độ xem) vào một vùng bộ nhớ liền kề (như `vector` hoặc mảng), rất nhẹ và không sở hữu dữ liệu. Nó cho phép bạn truyền một phần hoặc toàn bộ `vector` vào hàm một cách an toàn và hiệu quả, đặc biệt khi hàm chỉ cần đọc một vùng dữ liệu mà không quan tâm đến kiểu container gốc.

### Tương tác với API kiểu C

Khi cần truyền dữ liệu từ `std::vector` sang các API kiểu C (ví dụ: thư viện đồ họa OpenGL, Vulkan), bạn có thể sử dụng hàm `.data()`:

- **`myVector.data()`**: Trả về một con trỏ tới phần tử đầu tiên của mảng cơ bản mà `vector` sử dụng để lưu trữ dữ liệu. Đây là một con trỏ kiểu C (`int*`, `long*`, v.v.).
- **`myVector.size()`**: Cung cấp số lượng phần tử.

Ví dụ:

```
// Hàm API kiểu C
void c_style_api_function(long* data, size_t count);

// Cách gọi từ C++ với vector
std::vector<long> myVector2;
// ... thêm dữ liệu vào myVector2 ...
c_style_api_function(myVector2.data(), myVector2.size());
```

Việc hiểu rõ `.data()` là rất quan trọng để tránh nhầm lẫn khi làm việc với các API yêu cầu con trỏ dữ liệu thô.

### Kết luận

`std::vector` là một cấu trúc dữ liệu mạnh mẽ và linh hoạt trong C++. Mặc dù có những đánh đổi về hiệu suất khi thay đổi kích thước, nhưng với các kỹ thuật tối ưu như `.reserve()`, truyền bằng `const&` hoặc `std::span`, và quản lý iterator cẩn thận, `vector` vẫn là lựa chọn hàng đầu cho nhiều trường hợp sử dụng. Việc tự triển khai một `vector` từ đầu cũng là một bài tập hữu ích để hiểu sâu hơn về quản lý bộ nhớ và các constructor sao chép/di chuyển.
