---
title: 'Thực Hành với std::future và std::promise: Từ "Happy Path" đến Xử Lý Exception'
date: '2025-07-26 15:14:33'
date_gmt: '2025-07-26 08:14:33'
modified: '2025-07-26 17:36:59'
status: publish
slug: thuc-hanh-voi-stdfuture-va-stdpromise-tu-happy-path-den-xu-ly-exception
wordpress_id: 252
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/thuc-hanh-voi-stdfuture-va-stdpromise-tu-happy-path-den-xu-ly-exception/
categories:
- C++ Multithreading
tags: []
---

Trong các bài viết trước, chúng ta đã tìm hiểu về khái niệm và giao diện của `std::future` và `std::promise`. Giờ là lúc kết hợp tất cả lại và xem chúng hoạt động trong một chương trình multi-thread hoàn chỉnh.

Chúng ta sẽ xây dựng một ví dụ theo mô hình Producer-Consumer, bao gồm cả kịch bản thành công (trả về giá trị) và kịch bản thất bại (truyền một exception).

---

### Phần 1: Kịch Bản "Happy Path" - Truyền Giá Trị Thành Công ✅

Đây là trường hợp cơ bản nhất: thread Producer tính toán ra một giá trị và gửi nó cho thread Consumer.

**Code:**

C++

```
#include <iostream>
#include <thread>
#include <future>
#include <chrono>

// PRODUCER: Tính toán và "hứa" sẽ trả về một số int
void producer(std::promise<int>& p) {
    std::cout << "Producer: Dang tinh toan...\n";
    std::this_thread::sleep_for(std::chrono::seconds(2));
    int result = 42;
    p.set_value(result); // Thực hiện lời hứa, gửi kết quả
    std::cout << "Producer: Da gui ket qua.\n";
}

// CONSUMER: Chờ đợi kết quả từ "tương lai"
void consumer(std::future<int>& f) {
    std::cout << "Consumer: Dang cho ket qua...\n";
    int result = f.get(); // Lấy kết quả. Sẽ block ở đây cho đến khi producer xong.
    std::cout << "Consumer: Da nhan duoc ket qua: " << result << std::endl;
}

int main() {
    // 1. Tạo cặp đôi promise và future
    std::promise<int> my_promise;
    std::future<int> my_future = my_promise.get_future();

    // 2. Khởi tạo các thread, truyền promise và future vào
    // Dùng std::ref để truyền tham chiếu
    std::thread t1(producer, std::ref(my_promise));
    std::thread t2(consumer, std::ref(my_future));

    t1.join();
    t2.join();
    return 0;
}
```

**Phân tích luồng chạy:**

1. `main` tạo ra `promise` và `future`.
2. `consumer` thread bắt đầu, gọi `f.get()` và ngay lập tức bị block (ngủ).
3. `producer` thread chạy, tính toán trong 2 giây, sau đó gọi `p.set_value(42)`.
4. Ngay khi `set_value` được gọi, `consumer` thread được đánh thức, `f.get()` nhận được giá trị 42 và trả về.
5. Cả hai thread tiếp tục và kết thúc.

---

### Phần 2: Kịch Bản Xử Lý Lỗi - Truyền Exception Giữa Các Thread 💣

Bây giờ, hãy xem điều gì xảy ra khi Producer gặp lỗi.

- **Producer**: Phải đặt code có nguy cơ gây lỗi vào trong một khối `try/catch`. Trong khối `catch`, nó sẽ gọi `promise.set_exception()`. Để lấy con trỏ tới exception hiện tại, ta dùng `std::current_exception()`.
- **Consumer**: Phải đặt lời gọi `future.get()` vào trong một khối `try/catch`, vì `get()` sẽ ném lại chính cái exception mà Producer đã gửi.

**Code:**

C++

```
#include <iostream>
#include <thread>
#include <future>
#include <stdexcept>

// PRODUCER: Gặp lỗi và gửi đi một exception
void producer_with_exception(std::promise<int>& p) {
    try {
        std::cout << "Producer: chuan bi nem exception.\n";
        throw std::runtime_error("Loi xay ra trong producer!");
        p.set_value(42); // Dòng này không bao giờ được chạy
    } catch (...) {
        // Bắt tất cả exception và gửi nó qua promise
        p.set_exception(std::current_exception());
    }
}

// CONSUMER: Sẵn sàng để bắt exception từ future
void consumer_with_exception(std::future<int>& f) {
    try {
        std::cout << "Consumer: Dang cho ket qua...\n";
        int result = f.get(); // get() sẽ ném ra exception
        std::cout << "Consumer: Da nhan duoc ket qua: " << result << std::endl;
    } catch (const std::exception& e) {
        // Bắt exception được ném lại bởi get()
        std::cout << "Consumer: Da bat duoc exception: " << e.what() << std::endl;
    }
}

// ... hàm main() tương tự như trên ...
```

---

### Phần 3: Cải Tiến - `std::make_exception_ptr()` 💡

Việc viết `try/catch` trong Producer chỉ để gọi `set_exception()` đôi khi hơi dài dòng. Nếu bạn đã biết mình muốn gửi đi một exception cụ thể, C++11 cung cấp một hàm tiện ích: `std::make_exception_ptr()`.

Hàm này nhận một đối tượng exception và trả về một `std::exception_ptr` mà `set_exception()` cần, giúp code của Producer gọn gàng hơn.

**Code Producer được cải tiến:**

C++

```
void producer_cleaner(std::promise<int>& p) {
    std::cout << "Producer: Gui exception mot cach gon gang.\n";
    // Tạo exception và ptr, rồi set trực tiếp, không cần try/catch
    auto exception_ptr = std::make_exception_ptr(std::runtime_error("Loi duoc gui di"));
    p.set_exception(exception_ptr);
}
```

Code của Consumer không cần thay đổi. Kết quả hoàn toàn tương tự, nhưng code phía Producer đã trở nên rõ ràng và súc tích hơn.

---

`std::future` và `std::promise` cung cấp một cơ chế hoàn chỉnh và mạnh mẽ để truyền cả giá trị thành công và thông tin lỗi giữa các thread. Việc tích hợp sẵn cơ chế exception giúp chúng ta viết code xử lý lỗi trong môi trường multi-thread một cách trong sáng và tự nhiên, giống như cách chúng ta vẫn làm trong code single-thread.

*Until then, keep coding!*
