---
title: 'C++ Multithreading #1.5: Review lại về Modern C++'
date: '2025-07-10 00:23:12'
date_gmt: '2025-07-09 17:23:12'
modified: '2025-07-10 00:25:12'
status: publish
slug: c-multithreading-1-5-review-lai-ve-modern-c
wordpress_id: 126
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/10/c-multithreading-1-5-review-lai-ve-modern-c/
categories:
- C++ Multithreading
tags: []
---

### **C++ Hiện Đại (Phần cuối): 3 Công Cụ Nâng Cao Trước Khi Vào Đa Luồng**

Chào mừng bạn đến với bài viết cuối cùng trong series ôn tập các tính năng C++ hiện đại! Chúng ta đã cùng nhau đi qua một chặng đường từ `auto`, `nullptr`, Lambda Expressions cho đến Move Semantics. Hôm nay, chúng ta sẽ trang bị thêm ba "vũ khí" nâng cao cuối cùng. Nắm vững chúng sẽ giúp bạn viết code không chỉ hiệu quả, an toàn mà còn chuyên nghiệp hơn rất nhiều.

Đây là những công cụ bạn sẽ thường xuyên bắt gặp, đặc biệt khi làm việc với các bài toán phức tạp và quản lý tài nguyên. Hãy cùng bắt đầu!

#### **1. "Capture by Move": Đưa Lambda Lên Tầm Cao Mới (C++14)**

C++14 đã mở rộng khả năng của Lambda với **Generalized Lambda Capture**, cho phép chúng ta khởi tạo biến mới ngay bên trong cặp ngoặc vuông `[]`. Tuy nhiên, ứng dụng đột phá và quan trọng nhất của nó chính là "Capture by Move".

- **Vấn đề:** Làm thế nào để một lambda có thể tiếp quản quyền sở hữu một đối tượng "move-only" (như `std::unique_ptr`) hoặc một đối tượng lớn mà chúng ta không muốn sao chép?
- **Giải pháp:** Khởi tạo một biến mới trong capture clause bằng cách di chuyển đối tượng gốc.

**Cú pháp:** `[new_variable = std::move(original_variable)]`

C++

```
#include <iostream>
#include <vector>
#include <string>
#include <utility> // Cho std::move

int main() {
    std::vector<std::string> messages{"Hello", "World", "from", "C++"};
    std::cout << "Kich thuoc ban dau: " << messages.size() << std::endl;

    // Lambda này "đánh cắp" toàn bộ vector 'messages'
    auto lambda = [owned_messages = std::move(messages)]() {
        std::cout << "Ben trong lambda, vector co " << owned_messages.size() << " phan tu.\n";
        // 'owned_messages' giờ là chủ sở hữu, 'messages' bên ngoài đã rỗng.
    };

    lambda(); // Gọi lambda

    // 'messages' đã bị di chuyển, kích thước của nó bây giờ là 0
    std::cout << "Kich thuoc sau khi move: " << messages.size() << std::endl;

    return 0;
}
```

Kỹ thuật này cho phép lambda toàn quyền sở hữu tài nguyên, và tài nguyên đó sẽ được tự động giải phóng khi lambda bị hủy. Đây là một cách cực kỳ an toàn và hiệu quả để quản lý vòng đời của đối tượng.

#### **2. Sinh Số Ngẫu Nhiên Như Chuyên Gia với `<random>`**

Hãy quên hàm `rand()` cũ kỹ của C đi. Nó có nhiều vấn đề về chất lượng phân phối và khó sử dụng. C++11 cung cấp một hệ thống sinh số ngẫu nhiên mạnh mẽ và linh hoạt hơn rất nhiều trong header `<random>`.

Hệ thống này gồm 2 thành phần chính:

1. **Engine (Cỗ máy):** Tạo ra một chuỗi các số nguyên giả ngẫu nhiên với phân phối đều.
   - **Lựa chọn tốt nhất:** `std::mt19937` (Mersenne Twister), một thuật toán rất mạnh mẽ.
   - **Lưu ý quan trọng:** Việc khởi tạo Engine khá tốn kém. Bạn nên tạo nó **một lần duy nhất** (ví dụ, dùng biến `static` hoặc global) và tái sử dụng cho tất cả các lần gọi.
2. **Distribution (Phân phối):** Lấy các số thô từ Engine và ánh xạ chúng vào một khoảng giá trị và một phân phối thống kê cụ thể (ví dụ: phân phối đều, phân phối chuẩn...).

C++

```
#include <iostream>
#include <random>
#include <chrono>

// 1. Tạo Engine MỘT LẦN DUY NHẤT.
// Dùng thời gian hiện tại làm seed để mỗi lần chạy ra kết quả khác nhau.
static std::mt19937 engine(std::chrono::steady_clock::now().time_since_epoch().count());

int main() {
    // 2. Tạo Distribution cho số nguyên trong khoảng [1, 100]
    std::uniform_int_distribution<int> int_dist(1, 100);

    std::cout << "5 so nguyen ngau nhien tu 1-100:\n";
    for (int i = 0; i < 5; ++i) {
        // 3. Lấy số ngẫu nhiên bằng cách gọi distribution với engine
        std::cout << int_dist(engine) << " ";
    }
    std::cout << "\n\n";

    // Tương tự với số thực trong khoảng [0.0, 1.0)
    std::uniform_real_distribution<double> real_dist(0.0, 1.0);
    std::cout << "3 so thuc ngau nhien tu 0.0-1.0:\n";
    for (int i = 0; i < 3; ++i) {
        std::cout << real_dist(engine) << " ";
    }
    std::cout << "\n";

    return 0;
}
```

#### **3. Quản Lý Bộ Nhớ An Toàn Tuyệt Đối với `std::unique_ptr`**

`std::unique_ptr` là giải pháp hiện đại của C++ cho vấn đề quản lý bộ nhớ động (heap). Nó là một con trỏ thông minh (smart pointer) đảm bảo hai điều:

1. **Quyền Sở Hữu Duy Nhất (Unique Ownership):** Tại một thời điểm, chỉ có một `unique_ptr` được phép "sở hữu" (và chịu trách nhiệm giải phóng) một đối tượng trên heap. Đây là lý do nó là một lớp **"move-only"** - bạn không thể sao chép nó.
2. **RAII (Resource Acquisition Is Initialization):** Nó tự động gọi `delete` trên đối tượng mà nó quản lý khi `unique_ptr` ra khỏi phạm vi (scope) hoặc khi có ngoại lệ xảy ra. Điều này giúp **loại bỏ hoàn toàn nguy cơ rò rỉ bộ nhớ (memory leak)**.

**Cách tạo và sử dụng:**

- **Cách tốt nhất (C++14 trở đi):** Dùng `std::make_unique`. An toàn và hiệu quả hơn.
- **Cách C++11:** Gọi `new` trực tiếp và truyền vào constructor của `unique_ptr`.

C++

```
#include <iostream>
#include <memory> // Cho unique_ptr, make_unique

struct Point {
    int x, y;
    Point(int x_val, int y_val) : x(x_val), y(y_val) {
        std::cout << "Point duoc tao\n";
    }
    ~Point() {
        std::cout << "Point bi huy\n";
    }
    void print() {
        std::cout << "(" << x << ", " << y << ")\n";
    }
};

int main() {
    // Cách C++14 (khuyên dùng)
    auto ptr1 = std::make_unique<Point>(10, 20);

    // Cách C++11
    // std::unique_ptr<Point> ptr1(new Point(10, 20));

    // Sử dụng như một con trỏ thông thường
    ptr1->print();

    // Không cần gọi delete ptr1;
    // Khi main() kết thúc, ptr1 sẽ tự động bị hủy và gọi destructor của Point.
    return 0;
}
```

### **Lời Kết**

Vậy là chúng ta đã hoàn thành chuyến du hành qua các tính năng quan trọng nhất của C++ hiện đại. Từ những khái niệm nền tảng như Move Semantics đến các công cụ chuyên dụng như `<random>` và `std::unique_ptr`, bạn giờ đây đã có trong tay một bộ công cụ mạnh mẽ để viết code an toàn, hiệu quả và dễ bảo trì.

Phần ôn tập đã kết thúc. Trong bài viết tiếp theo, chúng ta sẽ chính thức bắt đầu hành trình chinh phục **Lập Trình Đa Luồng trong C++**. Hãy sẵn sàng!

*Keep coding!*
