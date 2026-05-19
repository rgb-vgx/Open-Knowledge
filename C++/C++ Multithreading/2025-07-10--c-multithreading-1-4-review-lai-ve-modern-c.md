---
title: 'C++ Multithreading #1.4: Review lại về Modern C++'
date: '2025-07-10 00:17:13'
date_gmt: '2025-07-09 17:17:13'
modified: '2025-07-10 00:25:15'
status: publish
slug: c-multithreading-1-4-review-lai-ve-modern-c
wordpress_id: 124
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/10/c-multithreading-1-4-review-lai-ve-modern-c/
categories:
- C++ Multithreading
tags: []
---

### **Move Semantics (Phần 2): Move Constructor và Các Lớp "Chỉ Di Chuyển"**

Ở phần 1, chúng ta đã hiểu "tại sao" cần đến Move Semantics - đó là một kỹ thuật tối ưu hóa để tránh các thao tác sao chép tốn kém. Trong phần này, chúng ta sẽ đào sâu vào "cách thức" nó hoạt động, khám phá các cơ chế cốt lõi của ngôn ngữ và một mẫu thiết kế cực kỳ quan trọng mà nó mang lại: các lớp "chỉ di chuyển" (move-only).

Đây là kiến thức nền tảng giúp bạn hiểu sâu sắc các lớp thư viện chuẩn như `unique_ptr`, `fstream`, và quan trọng nhất là các lớp dùng trong đa luồng như `std::thread` và `std::mutex`.

#### **Phần 1: Nạp Chồng Hàm và "Quyền Sở Hữu"**

Move semantics cho phép chúng ta nạp chồng (overload) hàm dựa trên việc tham số truyền vào là `lvalue` hay `rvalue`.

C++

```
#include <iostream>

struct Widget {};

void process(const Widget& w) { // (1) Phiên bản cho lvalue
    std::cout << "Xu ly Widget bang tham chieu lvalue (borrowing).\n";
}

void process(Widget&& w) {      // (2) Phiên bản cho rvalue
    std::cout << "Xu ly Widget bang tham chieu rvalue (taking ownership).\n";
}

int main() {
    Widget w_var;
    process(w_var);              // Gọi (1): w_var là lvalue
    process(Widget{});           // Gọi (2): Widget{} là một đối tượng tạm thời, là rvalue
    process(std::move(w_var));   // Gọi (2): std::move cast w_var thành rvalue
}
```

Sự khác biệt về "quyền sở hữu" là rất quan trọng:

- **Phiên bản `const Widget&` (1):** Hàm chỉ "mượn" (borrow) đối tượng. Nó không sở hữu và không được thay đổi đối tượng gốc. Người gọi vẫn là chủ sở hữu.
- **Phiên bản `Widget&&` (2):** Hàm "tiếp quản quyền sở hữu" (take ownership). Vì đầu vào là một đối tượng tạm thời hoặc đã được `std::move`, hàm có toàn quyền "đánh cắp" tài nguyên của nó.

#### **Phần 2: "Trái Tim" Của Move Semantics: Move Constructor & Move Assignment**

Để việc "đánh cắp" tài nguyên diễn ra, C++11 đã giới thiệu hai phương thức thành viên đặc biệt mới, song hành cùng Copy Constructor và Copy Assignment:

1. **Move Constructor:** `T(T&& other) noexcept;`
2. **Move Assignment Operator:** `T& operator=(T&& other) noexcept;`

- **Khi nào chúng được gọi?** Chúng được tự động gọi khi một đối tượng được khởi tạo hoặc được gán giá trị từ một `rvalue`.
- **Chúng làm gì?** Thay vì sao chép sâu (deep copy) dữ liệu, chúng thực hiện một "sao chép nông" (shallow copy) các con trỏ và tài nguyên, sau đó vô hiệu hóa đối tượng nguồn (`other`) bằng cách set con trỏ của nó về `nullptr`.
- **Tại sao lại `noexcept`?** Một thao tác `move` không nên ném ra ngoại lệ. Nếu có lỗi xảy ra giữa chừng, bạn có thể rơi vào tình trạng một đối tượng đã bị "hỏng" một phần, rất khó để phục hồi. `noexcept` là một lời hứa với compiler rằng thao tác này an toàn.

#### **Phần 3: Một Mẫu Thiết Kế Mới: Lớp "Chỉ Di Chuyển" (Move-Only Types)**

Đây là một trong những ứng dụng mạnh mẽ nhất của Move Semantics. Một lớp "move-only" là lớp quản lý một tài nguyên duy nhất và **không thể bị sao chép**, nhưng **có thể di chuyển**.

Hãy nghĩ về một số tài nguyên trong đời thực và lập trình:

- **File Handle (`std::fstream`):** Bạn không thể "copy" một file đang mở. Điều đó vô nghĩa. Nhưng bạn có thể "chuyển giao" quyền kiểm soát file đó cho một đối tượng khác.
- **Con trỏ duy nhất (`std::unique_ptr`):** Chỉ một `unique_ptr` được phép sở hữu một vùng nhớ tại một thời điểm. Copy sẽ vi phạm quy tắc này.
- **Thread (`std::thread`):** Bạn không thể copy một luồng đang chạy.
- **Mutex (`std::mutex`):** Bạn không thể copy một khóa (lock).

Tất cả các lớp này đều tuân theo nguyên tắc **RAII (Resource Acquisition Is Initialization)**. Chúng không cho phép sao chép, nhưng cho phép di chuyển để chuyển giao quyền sở hữu tài nguyên.

#### **Phần 4: Cú Pháp Hiện Đại: `= delete` và `= default`**

Làm thế nào để tạo ra một lớp "move-only"? C++11 cung cấp một cú pháp cực kỳ rõ ràng:

- `= delete`: Cấm compiler tạo ra phương thức đó. Bất kỳ nỗ lực nào gọi đến nó sẽ gây ra lỗi biên dịch.
- `= default`: Yêu cầu compiler tự động tạo ra phiên bản mặc định của phương thức.

Đây là cách chúng ta tạo một lớp `MoveOnly`:

C++

```
#include <utility> // Cho std::move
#include <iostream>

class MoveOnly {
public:
    // 1. Cấm các thao tác sao chép
    MoveOnly(const MoveOnly&) = delete;
    MoveOnly& operator=(const MoveOnly&) = delete;

    // 2. Cho phép các thao tác di chuyển (compiler tự tạo)
    MoveOnly(MoveOnly&&) = default;
    MoveOnly& operator=(MoveOnly&&) = default;

    // 3. Constructor mặc định
    MoveOnly() = default;
};

int main() {
    MoveOnly obj1;
    MoveOnly obj2;

    // MoveOnly obj3 = obj1; // LỖI BIÊN DỊCH! Đã bị delete.
    // obj2 = obj1;         // LỖI BIÊN DỊCH! Đã bị delete.

    MoveOnly obj4 = std::move(obj1); // OK! Gọi Move Constructor.
    obj2 = std::move(obj4);          // OK! Gọi Move Assignment.

    std::cout << "Thao tac di chuyen thanh cong!\n";
    return 0;
}
```

#### **Phần 5: Tối Ưu Hóa Thầm Lặng: Pass-by-Value Trong C++11**

Có một sự thay đổi tinh tế nhưng quan trọng đối với việc truyền tham số bằng giá trị (pass-by-value):

`void my_func(MyType value);`

- **Trước C++11:** Luôn luôn gọi Copy Constructor để tạo `value`.
- **Từ C++11:**
  - Nếu bạn truyền vào một `lvalue` (`my_func(my_lvalue)`), nó vẫn gọi Copy Constructor (an toàn).
  - Nếu bạn truyền vào một `rvalue` (`my_func(MyType{})`), nó sẽ gọi **Move Constructor** (tối ưu hóa).

Điều này có nghĩa là rất nhiều code cũ tự động được tăng tốc khi biên dịch với C++11 và sử dụng các kiểu dữ liệu có hỗ trợ move.

### **Lời Kết**

Move Semantics không chỉ đơn giản là `std::move`. Nó là một hệ thống hoàn chỉnh bao gồm:

- **Nạp chồng hàm** dựa trên `lvalue/rvalue`.
- Các phương thức đặc biệt **Move Constructor** và **Move Assignment**.
- Khả năng tạo ra các lớp **"Move-Only"** an toàn cho quản lý tài nguyên.
- Cú pháp rõ ràng với **`= delete`** và **`= default`**.

Hiểu rõ những cơ chế này là chìa khóa để viết code C++ hiện đại, hiệu quả và an toàn, đặc biệt là khi bạn chuẩn bị bước chân vào thế giới phức tạp của lập trình đa luồng.

*Until then, keep coding!*
