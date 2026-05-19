---
title: 'C++ Multithreading #5: "Hello, World!" Đa Luồng - Khởi Tạo Thread Đầu Tiên
  với std::thread'
date: '2025-07-10 00:46:55'
date_gmt: '2025-07-09 17:46:55'
modified: '2025-07-10 00:56:55'
status: publish
slug: c-multithreading-5-hello-world-da-luong-khoi-tao-thread-dau-tien-voi-stdthread
wordpress_id: 134
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/10/c-multithreading-5-hello-world-da-luong-khoi-tao-thread-dau-tien-voi-stdthread/
categories:
- C++ Multithreading
tags: []
---

Sau một hành trình dài với các khái niệm và lý thuyết, cuối cùng chúng ta cũng đã đến lúc được "vấy bẩn tay" với code. Trong chương này, chúng ta sẽ viết chương trình đa luồng C++ đầu tiên.

Ngôi sao của ngày hôm nay là lớp `std::thread` - công cụ cơ bản và nền tảng nhất để tạo và quản lý luồng trong C++ tiêu chuẩn. Hãy cùng nhau khám phá cách sử dụng nó, và quan trọng hơn, là cách để tránh một "thảm họa" thường gặp!

#### **Phần 1: Gặp Gỡ `std::thread` - Công Cụ Tạo Luồng**

Để tạo một luồng mới, chúng ta sử dụng lớp `std::thread` được định nghĩa trong header `<thread>`.

Nguyên tắc hoạt động của nó cực kỳ đơn giản:

- Bạn `#include <thread>`.
- Bạn tạo một đối tượng của lớp `std::thread`.
- Ngay tại thời điểm đối tượng này được khởi tạo, một luồng thực thi mới sẽ được hệ điều hành tạo ra và bắt đầu chạy **ngay lập tức**.

Hàm khởi tạo (constructor) của `std::thread` nhận vào một **đối tượng có thể gọi được (callable object)**. Đây chính là **hàm điểm bắt đầu (entry point function)** của luồng mới. Luồng mới sẽ thực thi toàn bộ mã lệnh bên trong hàm này.

"Callable object" có thể là:

- Con trỏ hàm (function pointer)
- Một Lambda expression
- Một đối tượng của lớp có toán tử `()` được nạp chồng (functor)
- Và nhiều thứ khác...

#### **Phần 2: "Hello, Thread!" - Viết Chương Trình Đầu Tiên**

Hãy bắt đầu với một ví dụ kinh điển. Chúng ta sẽ tạo một luồng mới chỉ để in ra dòng chữ "Hello, Thread!".

C++

```
#include <iostream>
#include <thread> // Cần thiết cho std::thread

// Đây là hàm entry point của luồng mới
void hello_from_thread() {
    std::cout << "Hello, Thread!" << std::endl;
}

int main() {
    // 1. Tạo một đối tượng std::thread
    //    - Truyền con trỏ hàm 'hello_from_thread' vào constructor.
    //    - Ngay lập tức, một luồng mới được tạo và bắt đầu chạy hàm hello_from_thread().
    std::thread t1(hello_from_thread);

    // 2. Trong khi đó, luồng chính (main thread) vẫn tiếp tục chạy.
    std::cout << "Hello from main thread!" << std::endl;

    // ...?

    return 0; // Luồng chính kết thúc tại đây
}
```

#### **Phần 3: Thảm Họa Bất Ngờ - Tại Sao Chương Trình Bị Crash?**

Nếu bạn biên dịch và chạy đoạn mã trên, kết quả có thể sẽ làm bạn ngạc nhiên. Thay vì chạy một cách mượt mà, chương trình của bạn có thể bị **crash** với một thông báo lỗi "terminate called without an active exception" hoặc tương tự.

**Chuyện gì đã xảy ra?**

1. `main` thread tạo ra luồng con `t1` và tiếp tục chạy.
2. `main` thread chạy đến dấu `}` cuối cùng và chuẩn bị kết thúc.
3. Khi ra khỏi scope của `main`, đối tượng `t1` sẽ bị hủy (destructor của `std::thread` được gọi).
4. **Vấn đề cốt lõi:** Tại thời điểm `t1` bị hủy, luồng con mà nó quản lý rất có thể **vẫn đang chạy**.
5. Các nhà thiết kế C++ cho rằng việc để một luồng con tiếp tục chạy sau khi chương trình chính đã kết thúc là một tình huống nguy hiểm (tạo ra các "zombie thread").
6. Vì vậy, để đảm bảo an toàn, destructor mặc định của `std::thread` sẽ gọi `std::terminate()` nếu luồng nó quản lý vẫn còn "joinable" (tức là vẫn đang chạy và chưa được xử lý). `std::terminate()` sẽ ngay lập tức "giết chết" toàn bộ chương trình của bạn. Đây là "lựa chọn hạt nhân" (nuclear option) của C++.

#### **Phần 4: Giải Cứu - `join()` Chờ Đợi và Đồng Bộ Hóa**

Rất may, chúng ta có một cách để xử lý tình huống này một cách thanh lịch: phương thức `join()`.

Khi luồng cha (ví dụ: `main` thread) gọi `t1.join()`, nó sẽ **tự chặn (block)** chính mình lại. Luồng cha sẽ **dừng lại và chờ đợi** cho đến khi luồng con `t1` thực thi xong hàm entry point của nó và kết thúc.

Sau khi `t1.join()` trả về, chúng ta có thể chắc chắn 100% rằng luồng `t1` đã hoàn thành. Lúc này, đối tượng `t1` không còn "joinable" nữa, và destructor của nó sẽ không gọi `std::terminate()`.

Hãy sửa lại chương trình của chúng ta:

C++

```
#include <iostream>
#include <thread>

void hello_from_thread() {
    // Luồng này có thể mất một chút thời gian để bắt đầu và chạy
    std::cout << "Hello, Thread!" << std::endl;
}

int main() {
    std::thread t1(hello_from_thread);
    std::cout << "Hello from main thread!" << std::endl;

    // Yêu cầu main thread chờ cho đến khi t1 hoàn thành.
    t1.join(); // <-- Dòng code cứu rỗi!

    // Bây giờ chương trình có thể kết thúc một cách an toàn.
    return 0;
}
```

Bây giờ, chương trình sẽ luôn chạy đúng và kết thúc một cách bình thường.

#### **Phần 5: Linh Hoạt Hơn với Functor và Lambda**

Việc sử dụng con trỏ hàm rất rõ ràng, nhưng trong thực tế, Lambda expression thường tiện lợi hơn rất nhiều vì bạn có thể định nghĩa mã lệnh của luồng ngay tại nơi bạn tạo nó.

C++

```
#include <iostream>
#include <thread>

int main() {
    // Sử dụng Lambda expression làm entry point
    std::thread t1([]() {
        std::cout << "Hello from a Lambda thread!" << std::endl;
    });

    t1.join();

    return 0;
}
```

Đoạn mã này hoàn toàn tương đương với ví dụ trước. Compiler sẽ tự động tạo một lớp functor ẩn danh và truyền nó vào cho `std::thread`.

### **Lời Kết**

Chúc mừng bạn đã viết và hiểu được chương trình đa luồng đầu tiên của mình! Bài học quan trọng nhất hôm nay là:

- Tạo một luồng mới rất dễ dàng với `std::thread(callable_object)`.
- Một luồng đang chạy **phải** được xử lý trước khi đối tượng `std::thread` quản lý nó bị hủy.
- `thread.join()` là cách cơ bản nhất để **chờ** một luồng khác hoàn thành.

`join()` là viên gạch đầu tiên trong việc xây dựng các chương trình đa luồng phức tạp. Trong các bài viết tiếp theo, chúng ta sẽ tìm hiểu cách truyền tham số cho các luồng và các cách quản lý luồng khác.

*Keep coding!*
