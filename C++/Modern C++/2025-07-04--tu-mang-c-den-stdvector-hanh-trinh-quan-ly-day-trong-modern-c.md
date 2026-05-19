---
title: 'Modern C++ #8: Từ Mảng C đến std::vector: Hành trình Quản lý Dãy trong Modern
  C++'
date: '2025-07-04 00:51:20'
date_gmt: '2025-07-03 17:51:20'
modified: '2025-07-04 14:51:15'
status: publish
slug: tu-mang-c-den-stdvector-hanh-trinh-quan-ly-day-trong-modern-c
wordpress_id: 82
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/04/tu-mang-c-den-stdvector-hanh-trinh-quan-ly-day-trong-modern-c/
categories:
- Modern C++
tags: []
---

Trong hầu hết mọi chương trình, chúng ta đều có nhu cầu lưu trữ và quản lý một dãy các phần tử. C++ cung cấp nhiều cách để làm điều này, từ cấu trúc cấp thấp được kế thừa từ C cho đến các container mạnh mẽ, an toàn trong thư viện chuẩn. Hãy cùng thực hiện một hành trình để hiểu rõ sự tiến hóa này.

#### **1. Nền tảng: Mảng Kiểu C (C-style Array)**

Đây là cấu trúc cơ bản nhất: một khối bộ nhớ liên tục (contiguous), được đánh chỉ mục từ 0.

- **Ưu điểm:** Cực kỳ nhanh và hiệu quả. Phần cứng máy tính hiện đại được tối ưu hóa để làm việc với các khối bộ nhớ liên tục như thế này.
- **Nhược điểm:** Rất "thô sơ" và thiếu an toàn.
  - **Kích thước cố định:** Khi khai báo trên stack, kích thước của mảng phải là một hằng số đã biết tại thời điểm biên dịch (`int arr[5];`).
  - **Quản lý thủ công:** Khi cấp phát trên heap (`int* arr = new int[10];`), bạn phải tự mình quản lý bộ nhớ và giải phóng nó bằng `delete[]`. Việc quên `delete[]` sẽ gây rò rỉ bộ nhớ (memory leak).
  - **Mảng ký tự kiểu C (`char[]`):** Là một trường hợp đặc biệt, dùng để lưu chuỗi. Nó dựa vào một ký tự `null` (giá trị 0) ở cuối để đánh dấu kết thúc. Điều này làm cho các thao tác xử lý chuỗi trở nên chậm (phải quét tìm ký tự `null`) và cực kỳ nguy hiểm nếu ký tự `null` bị thiếu.

Mảng kiểu C vẫn hữu ích trong lập trình cấp thấp hoặc khi tương tác với các thư viện C, nhưng trong hầu hết các trường hợp của C++ hiện đại, chúng ta có những lựa chọn tốt hơn.

#### **2. `std::string`: Mảng Ký tự Thông minh**

Để giải quyết những vấn đề của chuỗi kiểu C, thư viện chuẩn C++ cung cấp lớp `std::string`. Đây không phải là một mảng thô, mà là một **đối tượng** được thiết kế để **quản lý** một mảng ký tự động.

Bên trong, một đối tượng `std::string` thường chứa:

1. Một con trỏ trỏ đến vùng nhớ trên heap, nơi lưu trữ dữ liệu ký tự thực tế.
2. Một biến để lưu trữ kích thước hiện tại của chuỗi.

Nó giống như một mảng tự quản lý. Điều này mang lại những lợi ích vượt trội:

- **Quản lý bộ nhớ tự động (RAII):** Constructor của `std::string` sẽ tự động cấp phát bộ nhớ (`new[]`), và destructor sẽ tự động giải phóng nó (`delete[]`). Bạn không bao giờ phải lo về memory leak.
- **Tự động thay đổi kích thước:** Nếu bạn thêm ký tự vào chuỗi và nó không đủ chỗ, `std::string` sẽ tự động cấp phát một vùng nhớ lớn hơn và sao chép dữ liệu cũ qua.
- **An toàn khi sao chép/gán:** Các hàm thành viên đặc biệt được viết sẵn để xử lý việc sao chép sâu (deep copy), đảm bảo mỗi chuỗi có một bản sao dữ liệu riêng.
- **Tiện lợi:** Cung cấp các hàm hữu ích như `.size()` để lấy độ dài (thao tác rất nhanh, O(1)) và toán tử `[]` để truy cập ký tự.

#### **3. `std::vector`: Thùng chứa Vạn năng**

`std::string` rất tuyệt vời, nhưng nó chỉ dành cho ký tự (`char`). "Vậy nếu tôi muốn một mảng thông minh cho các số nguyên, số thực, hay các đối tượng của tôi thì sao?"

Câu trả lời chính là **`std::vector`**.

`std::vector` là phiên bản tổng quát của `std::string`. Nó là một template class có thể chứa một dãy các phần tử thuộc **bất kỳ kiểu dữ liệu nào**.

C++

```
// Một vector chứa các số nguyên
std::vector<int> numbers = {4, 2, 3, 5, 1};

// Một vector chứa các chuỗi
std::vector<std::string> names = {"Alice", "Bob"};
```

`std::vector` có cấu trúc và ưu điểm tương tự như `std::string`:

- Quản lý bộ nhớ tự động theo nguyên tắc RAII.
- Tự động thay đổi kích thước.
- An toàn khi sao chép và gán.
- Cung cấp các hàm tiện lợi như `.size()`, toán tử `[]`, và đặc biệt là `.push_back()` để dễ dàng thêm một phần tử vào cuối dãy.

C++

```
numbers.push_back(6); // Thêm số 6 vào cuối vector
// `numbers` bây giờ là {4, 2, 3, 5, 1, 6}
// Vector sẽ tự lo việc cấp phát thêm bộ nhớ nếu cần.
```

#### **Lời khuyên: Lựa chọn nào cho Modern C++?**

Quy tắc rất đơn giản:

> Trong mã C++ hiện đại, **hãy luôn ưu tiên `std::vector` (cho dữ liệu chung) và `std::string` (cho văn bản) thay vì mảng kiểu C và quản lý bộ nhớ thủ công với `new`/`delete[]`**.

Việc sử dụng các container của thư viện chuẩn giúp mã của bạn trở nên an toàn hơn, dễ đọc hơn, dễ bảo trì hơn và trong nhiều trường hợp cũng không hề thua kém về hiệu năng.

Hãy làm quen và sử dụng thành thạo những công cụ mạnh mẽ này. Keep coding!
