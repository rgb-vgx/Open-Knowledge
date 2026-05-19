---
title: 'Modern C++ #5: (Review) Class và con trỏ this'
date: '2025-07-04 00:13:44'
date_gmt: '2025-07-03 17:13:44'
modified: '2025-07-04 00:19:27'
status: publish
slug: modern-c-5-class-va-con-tro-this
wordpress_id: 70
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/04/modern-c-5-class-va-con-tro-this/
categories:
- Modern C++
tags: []
---

Khi nói đến Lập trình Hướng đối tượng (Object-Oriented Programming - OOP) trong C++, `class` là khái niệm trung tâm. Một `class` cho phép chúng ta tạo ra các "đối tượng" (objects) – những cấu trúc dữ liệu phức hợp không chỉ chứa dữ liệu mà còn chứa cả các hàm để thao tác trên chính dữ liệu đó.

#### **1. Giao diện và Triển khai: `public` vs. `private`**

Đây là nguyên tắc nền tảng của tính đóng gói (encapsulation). Một `class` chia các thành viên của nó thành hai khu vực chính:

- **`public` (Công khai):** Đây là **giao diện (interface)** của lớp. Bất kỳ đoạn mã nào bên ngoài lớp cũng có thể truy cập và sử dụng các thành viên `public` (bao gồm cả dữ liệu và hàm). Giao diện định nghĩa những gì một đối tượng *có thể làm*.
- **`private` (Riêng tư):** Đây là phần **triển khai (implementation)** bên trong. Chỉ các hàm thành viên của chính lớp đó mới có thể truy cập các thành viên `private`. Phần này ẩn giấu các chi tiết phức tạp về cách đối tượng *thực hiện* công việc của nó.

**Ví dụ kinh điển:** Hãy nghĩ về chiếc điện thoại của bạn.

- **Giao diện `public`:** Màn hình cảm ứng, các nút bấm, cổng sạc. Bạn tương tác với chúng để thực hiện cuộc gọi, lướt web...
- **Triển khai `private`:** Vi mạch điện tử, pin, hệ điều hành bên trong. Bạn không cần biết (và cũng không thể trực tiếp can thiệp) chúng hoạt động như thế nào để thực hiện các chức năng trên.

Nguyên tắc thiết kế này giúp tạo ra mã nguồn dễ bảo trì. Bạn có thể thay đổi hoàn toàn phần `private` (ví dụ: nâng cấp vi xử lý) mà không làm ảnh hưởng đến những người dùng khác, miễn là giao diện `public` (cách sử dụng màn hình) không thay đổi.

Trong C++, mặc định tất cả các thành viên của một `class` là `private`.

#### **2. `class` vs. `struct`: Khi nào dùng cái nào?**

Về mặt kỹ thuật, sự khác biệt duy nhất giữa `class` và `struct` trong C++ là **quyền truy cập mặc định**:

- **`class`**: Mặc định là `private`.
- **`struct`**: Mặc định là `public`.

Vậy khi nào nên dùng cái nào? Quy tắc chung được cộng đồng C++ tuân theo là:

- **Dùng `struct`**: Khi bạn muốn nhóm một vài mẩu dữ liệu liên quan lại với nhau mà không có hành vi phức tạp hay các "bất biến" (invariants) cần bảo vệ. `struct` thường được dùng cho các cấu trúc dữ liệu đơn thuần (Plain Old Data - POD).
  - *Ví dụ:* Một `struct Point { double x; double y; };` hoặc một `struct DatabaseRecord { int id; std::string name; };`.
- **Dùng `class`**: Khi bạn muốn tạo một đối tượng thực thụ với trạng thái nội tại cần được bảo vệ (`private data`) và các hành vi rõ ràng (`public methods`) để duy trì sự toàn vẹn của trạng thái đó.
  - *Ví dụ:* Một `class BankAccount` với số dư là `private` và các hàm `deposit()`, `withdraw()` là `public`.

#### **3. "Hậu trường" của Hàm thành viên và con trỏ `this`**

Bạn có bao giờ tự hỏi làm thế nào một hàm thành viên biết nó đang thao tác trên đối tượng nào không?

Khi bạn gọi `my_object.do_something()`, trình biên dịch sẽ "âm thầm" dịch nó thành một lời gọi hàm toàn cục và truyền địa chỉ của `my_object` vào như một tham số ẩn đầu tiên.

C++

```
// Những gì bạn viết:
my_object.do_something(1, 2);

// Những gì trình biên dịch "hiểu" (một cách khái niệm):
ClassName::do_something(&my_object, 1, 2);
```

Bên trong hàm thành viên, địa chỉ của đối tượng đó được lưu trữ trong một con trỏ đặc biệt có tên là **`this`**. `this` là một con trỏ trỏ đến chính đối tượng đã gọi hàm.

C++

```
class Test {
private:
    int data_member;

public:
    void set_data(int value) {
        // Hai dòng dưới đây là tương đương!
        
        // 1. Truy cập tường minh qua con trỏ 'this'
        this->data_member = value;

        // 2. Truy cập ngầm định (cách thường dùng)
        // Trình biên dịch tự động thêm "this->" cho bạn
        data_member = value;
    }
};
```

Việc truy cập ngầm định được sử dụng phổ biến nhất vì sự ngắn gọn của nó. Con trỏ `this` chỉ thực sự cần thiết trong một vài trường hợp cụ thể, chẳng hạn như khi tên tham số của hàm trùng với tên thành viên dữ liệu.

**Ví dụ tổng hợp:**

C++

```
#include <iostream>
#include <string>

class Phone {
private: // Phần triển khai, bị ẩn đi
    std::string internal_model = "Gemini-OS-v1";
    int battery_level = 100;

public: // Giao diện, công khai cho mọi người dùng
    void make_call(const std::string& number) {
        if (battery_level > 1) {
            std::cout << "Calling " << number 
                      << " using model " << this->internal_model << "...\n";
            battery_level -= 1; // Thay đổi trạng thái nội tại
        } else {
            std::cout << "Battery low!\n";
        }
    }
};

int main() {
    Phone my_phone; // Tạo một đối tượng của lớp Phone
    my_phone.make_call("123-456-789"); // Tương tác qua giao diện public
    // my_phone.battery_level = 0; // LỖI! Không thể truy cập thành viên private từ bên ngoài
    
    return 0;
}
```

Việc nắm vững `class` là bước đầu tiên và quan trọng nhất trên con đường chinh phục Lập trình Hướng đối tượng với C++. Hãy bắt đầu xây dựng những lớp của riêng bạn! Keep coding!
