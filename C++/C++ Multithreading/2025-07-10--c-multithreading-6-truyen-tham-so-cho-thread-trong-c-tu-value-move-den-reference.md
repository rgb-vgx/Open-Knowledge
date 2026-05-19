---
title: 'C++ Multithreading #6: Truyền Tham Số Cho Thread trong C++: Từ Value, Move
  đến Reference'
date: '2025-07-10 00:55:33'
date_gmt: '2025-07-09 17:55:33'
modified: '2025-07-10 00:56:51'
status: publish
slug: c-multithreading-6-truyen-tham-so-cho-thread-trong-c-tu-value-move-den-reference
wordpress_id: 140
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/10/c-multithreading-6-truyen-tham-so-cho-thread-trong-c-tu-value-move-den-reference/
categories:
- C++ Multithreading
tags: []
---

Trong bài "Hello, World!" trước, hàm entry point của chúng ta khá đơn giản và không nhận bất kỳ tham số nào. Nhưng trong thực tế, các luồng hầu như luôn cần dữ liệu đầu vào để xử lý. Vậy làm cách nào để chúng ta truyền dữ liệu từ luồng cha sang luồng con một cách an toàn và hiệu quả?

Bài viết này sẽ hướng dẫn bạn chi tiết các kỹ thuật để truyền tham số cho một `std::thread`, từ cách đơn giản nhất đến những "mánh khóe" hữu ích.

#### **Phần 1: Cơ Chế Hoạt Động**

Cơ chế truyền tham số cho `std::thread` rất trực quan. Khi bạn tạo một đối tượng `std::thread`, các tham số trong hàm khởi tạo của nó được xử lý như sau:

- **Tham số đầu tiên:** Luôn luôn là đối tượng có thể gọi được (callable object) - tức là hàm entry point của luồng.
- **Các tham số tiếp theo:** Sẽ được sao chép hoặc di chuyển để trở thành các tham số tương ứng cho hàm entry point.

Cú pháp chung: `std::thread t(entry_point_func, arg1, arg2, ...);`

#### **Phần 2: Truyền Tham Số Bằng Giá Trị (Pass by Value)**

Đây là cách mặc định và an toàn nhất. Khi bạn truyền một biến vào `std::thread`, một **bản sao** của biến đó sẽ được tạo ra và truyền cho luồng mới. Luồng mới sẽ làm việc trên bản sao này, hoàn toàn không ảnh hưởng đến biến gốc.

C++

```
#include <iostream>
#include <string>
#include <thread>

void print_message(std::string message) {
    std::cout << "Thread noi: " << message << std::endl;
}

int main() {
    std::string my_message = "Hello from a variable";

    // Một bản sao của chuỗi "Hello" được tạo và truyền vào luồng.
    std::thread t1(print_message, "Hello");

    // Một bản sao của biến my_message được tạo và truyền vào luồng.
    std::thread t2(print_message, my_message);

    t1.join();
    t2.join();

    return 0;
}
```

#### **Phần 3: Truyền Tham Số Bằng Di Chuyển (Pass by Move)**

Khi làm việc với các đối tượng lớn (như vector chứa hàng triệu phần tử) hoặc các đối tượng "move-only" (như `std::unique_ptr`), việc sao chép là rất tốn kém hoặc không thể thực hiện. Lúc này, **di chuyển (move)** là giải pháp tối ưu.

Để làm điều này, hàm entry point của bạn nên nhận tham số là một tham chiếu rvalue (`T&&`), và khi tạo thread, bạn cần dùng `std::move` để "cast" biến của mình thành rvalue.

C++

```
#include <iostream>
#include <string>
#include <thread>
#include <utility> // Cho std::move

void process_data(std::string&& data) { // Nhận tham chiếu rvalue
    std::cout << "Thread da tiep quan du lieu: " << data << std::endl;
}

int main() {
    std::string large_data = "Day la mot chuoi du lieu rat lon...";
    std::cout << "Truoc khi move, large_data rong? " << std::boolalpha << large_data.empty() << std::endl;

    // Di chuyển quyền sở hữu của 'large_data' vào luồng t1
    std::thread t1(process_data, std::move(large_data));
    t1.join();

    // Sau khi move, 'large_data' ở trạng thái không xác định (thường là rỗng)
    std::cout << "Sau khi move, large_data rong? " << std::boolalpha << large_data.empty() << std::endl;

    return 0;
}
```

#### **Phần 4: "Mánh Khóe" Truyền Tham Chiếu với `std::ref`**

Sẽ có lúc bạn muốn luồng con có thể **thay đổi giá trị của biến gốc** ở luồng cha. Tuy nhiên, như đã thấy, `std::thread` mặc định sẽ sao chép tham số. Vậy làm thế nào để truyền một tham chiếu thực sự?

Câu trả lời là sử dụng hàm `std::ref` (hoặc `std::cref` cho tham chiếu hằng) từ header `<functional>`.

Hàm `std::ref` sẽ "gói" tham chiếu của bạn vào một đối tượng đặc biệt gọi là **reference wrapper**. `std::thread` sẽ sao chép đối tượng wrapper này (một thao tác rất nhẹ), nhưng bên trong đối tượng wrapper vẫn chứa một tham chiếu đến biến gốc của bạn.

C++

```
#include <iostream>
#include <string>
#include <thread>
#include <functional> // Cho std::ref

// Hàm này nhận một tham chiếu và thay đổi nó
void modify_string(std::string& s) {
    s = "Da duoc thay doi boi thread";
}

int main() {
    std::string status = "Gia tri ban dau";
    std::cout << "Truoc khi goi thread: " << status << std::endl;

    // Gói 'status' bằng std::ref để truyền tham chiếu vào luồng
    std::thread t1(modify_string, std::ref(status));
    t1.join();

    // Giá trị của biến gốc đã bị thay đổi
    std::cout << "Sau khi goi thread: " << status << std::endl;

    return 0;
}
```

**Cảnh báo:** Khi dùng tham chiếu, bạn phải đảm bảo rằng biến gốc (`status` trong ví dụ) phải tồn tại trong suốt vòng đời của luồng `t1`.

#### **Phần 5: Hướng Đối Tượng - Dùng Member Function Làm Entry Point**

Bạn hoàn toàn có thể dùng một phương thức của lớp (member function) làm entry point. Khi đó, bạn cần cung cấp:

1. Con trỏ tới phương thức thành viên.
2. Con trỏ tới đối tượng (`this`) mà bạn muốn phương thức đó được gọi trên nó.

C++

```
#include <iostream>
#include <thread>

class Greeter {
public:
    void hello(std::string name) {
        std::cout << "Hello, " << name << " from my object!" << std::endl;
    }
};

int main() {
    Greeter greeter_obj;

    // Tham số 1: Con trỏ tới member function
    // Tham số 2: Con trỏ tới đối tượng ('this')
    // Tham số 3...: Các tham số của member function
    std::thread t1(&Greeter::hello, &greeter_obj, "Bjarne");

    t1.join();
    return 0;
}
```

### **Lời Kết**

Việc truyền tham số cho luồng là một kỹ năng cơ bản nhưng cực kỳ quan trọng. Bằng cách nắm vững các kỹ thuật truyền bằng giá trị (mặc định), di chuyển (`std::move`), và tham chiếu (`std::ref`), bạn đã có thể xử lý hầu hết các kịch bản giao tiếp dữ liệu đơn giản giữa các luồng.

Hiểu rõ khi nào nên sao chép, khi nào nên di chuyển, và khi nào cần tham chiếu sẽ giúp bạn viết code đa luồng không chỉ đúng mà còn hiệu quả và an toàn.

*Keep coding!*
