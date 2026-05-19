---
title: 'C++ Multithreading #1.2: Review lại về Modern C++'
date: '2025-07-10 00:10:20'
date_gmt: '2025-07-09 17:10:20'
modified: '2025-07-10 00:25:22'
status: publish
slug: c-multithreading-1-2-review-lai-ve-modern-c
wordpress_id: 120
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/10/c-multithreading-1-2-review-lai-ve-modern-c/
categories:
- C++ Multithreading
tags: []
---

### **Lambda Expressions trong C++: "Phép Thuật" Giúp Code Ngắn Gọn và Mạnh Mẽ Hơn**

Bạn đã bao giờ thấy phiền phức khi phải viết hẳn một hàm riêng biệt hoặc một lớp functor chỉ để sử dụng nó đúng một lần cho một thuật toán STL chưa? Nếu có, thì Lambda Expression chính là "phép thuật" mà bạn đang tìm kiếm.

Trong bài viết này, chúng ta sẽ giải mã một trong những tính năng mạnh mẽ và được yêu thích nhất của C++ hiện đại. Đây là công cụ sẽ thay đổi cách bạn viết và tư duy về code.

#### **1. Lambda Expression Là Gì?**

Hãy tưởng tượng Lambda Expression như một **hàm không tên (anonymous function)** được định nghĩa ngay tại nơi nó được sử dụng (inline). Nó không cần một cái tên trang trọng, không cần được khai báo ở đâu đó xa xôi. Nó giống như một người trợ giúp nhanh gọn, được tạo ra để thực hiện một tác vụ đơn giản và chỉ dùng một lần duy nhất.

#### **2. Cú Pháp: Giải Phẫu một Lambda**

Cú pháp của một lambda có vẻ lạ lúc đầu, nhưng thực ra rất logic.

C++

```
[capture_clause](parameters) -> return_type {
    // Thân hàm (body)
};
```

- `[ ]` - **Capture Clause:** Đây là phần "phép thuật" nhất. Nó quy định cách lambda "bắt" và sử dụng các biến từ môi trường bên ngoài. Chúng ta sẽ đào sâu vào phần này sau.
- `( )` - **Parameter List:** Danh sách tham số, giống hệt như một hàm thông thường.
- `-> return_type` - **Kiểu trả về (Tùy chọn):**
  - Trong nhiều trường hợp, compiler có thể tự suy luận kiểu trả về.
  - Với C++11, nếu lambda có nhiều hơn một lệnh `return` hoặc có các lệnh phức tạp, bạn phải chỉ định rõ kiểu trả về.
- `{ }` - **Body:** Phần thân chứa mã lệnh của lambda.
- `;` - **Dấu chấm phẩy:** Vì một lambda expression định nghĩa một kiểu dữ liệu mới, bạn cần kết thúc nó bằng một dấu chấm phẩy.

#### **3. Sử Dụng Lambda: Từ Định Nghĩa Đến Thực Thi**

Có hai cách chính để sử dụng một lambda:

**a. Gọi ngay lập tức (Immediate Invocation)**

Bạn có thể định nghĩa và gọi lambda ngay tại chỗ bằng cách thêm cặp ngoặc tròn `()` chứa tham số ngay sau thân hàm.

C++

```
// Định nghĩa và gọi lambda ngay lập tức với tham số là 3
int result = [](int arg) { return arg * 2; }(3);

std::cout << "Kết quả: " << result; // In ra: Kết quả: 6
```

**b. Lưu vào một biến và gọi sau**

Cách phổ biến hơn là lưu lambda vào một biến có kiểu `auto`. Biến này sẽ trở thành một đối tượng có thể gọi được (callable object).

C++

```
// Lưu lambda vào biến 'multiplier'
auto multiplier = [](int arg) { return arg * 2; };

// Gọi nó như một hàm thông thường
int result1 = multiplier(5);  // result1 = 10
int result2 = multiplier(10); // result2 = 20
```

#### **4. Sức Mạnh Thực Sự: Capture Clause `[]`**

Đây là nơi lambda tỏ rõ sức mạnh vượt trội so với hàm thông thường. Nó cho phép lambda truy cập vào các biến cục bộ tại nơi nó được định nghĩa.

- **Capture by Value (`[ten_bien]`):** Lambda sẽ tạo một **bản sao** của biến và bản sao này là **bất biến (immutable)** bên trong lambda.
- **Capture by Reference (`[&ten_bien]`):** Lambda sẽ giữ một **tham chiếu** tới biến gốc. Điều này cho phép lambda **đọc và ghi** vào biến gốc.C++`int n = 0; // Capture 'n' bằng tham chiếu, cho phép sửa đổi 'n' auto modify_n = [&](int arg) { n = arg; // Sửa đổi biến 'n' gốc }; modify_n(42); std::cout << "Giá trị của n bây giờ là: " << n; // In ra: 42`
- **Implicit Captures (Bắt ngầm định):**
  - `[=]`: Bắt tất cả các biến cục bộ bằng **giá trị (value)**.
  - `[&]`: Bắt tất cả các biến cục bộ bằng **tham chiếu (reference)**. (Hãy cẩn thận với tùy chọn này vì nó có thể vô tình thay đổi các biến không mong muốn).
- **Capture `this`:** Khi ở trong một phương thức của lớp (member function), bạn có thể bắt con trỏ `this` để truy cập các thuộc tính (data members) của đối tượng đó.C++`class MyClass { private: int m_value = 10; public: void doSomething() { auto my_lambda = [this]() { // Có thể truy cập m_value nhờ capture [this] std::cout << "Giá trị thành viên: " << this->m_value; }; my_lambda(); } };`

#### **5. Ứng Dụng "Vàng": Lambda và Thuật Toán STL**

Đây là nơi lambda thực sự tỏa sáng. Thay vì phải viết một hàm riêng rẽ, bạn có thể định nghĩa logic (predicate) ngay bên trong lời gọi thuật toán, giúp code trở nên cực kỳ súc tích và dễ đọc.

Hãy xem ví dụ với `std::count_if` để đếm số phần tử chẵn trong một vector.

C++

```
#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    std::vector<int> numbers {1, 2, 3, 4, 5, 6};
    int radix = 3; // Chúng ta muốn tìm các số chia hết cho 3

    // Trước C++11: Phải viết một hàm riêng hoặc functor... rất dài dòng.

    // Với Lambda:
    // Predicate được viết ngay tại chỗ!
    int even_count = std::count_if(numbers.begin(), numbers.end(), [](int n) {
        return n % 2 == 0;
    });

    std::cout << "Số lượng số chẵn: " << even_count << std::endl; // In ra: 3

    // Ví dụ nâng cao: Dùng capture để làm cho predicate linh hoạt hơn
    int divisible_count = std::count_if(numbers.begin(), numbers.end(), [radix](int n) {
        // 'radix' được "bắt" từ môi trường bên ngoài
        return n % radix == 0;
    });

    std::cout << "Số lượng số chia hết cho " << radix << ": " << divisible_count << std::endl; // In ra: 2

    return 0;
}
```

### **Lời Kết**

Lambda Expressions không chỉ là một cú pháp "cool ngầu". Chúng là một công cụ nền tảng trong C++ hiện đại giúp cải thiện đáng kể tính **dễ đọc**, **ngắn gọn** và **bảo trì** của code, đặc biệt khi làm việc với các thuật toán. Việc logic được đặt ngay tại nơi sử dụng giúp người đọc dễ dàng theo dõi luồng chương trình hơn rất nhiều.

Làm chủ lambda là một bước tiến lớn trên con đường trở thành một lập trình viên C++ hiện đại.

*But until then, keep coding!*
