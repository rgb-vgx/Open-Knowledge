---
title: 'std::condition_variable Nâng Cao: Chống "Lost Wakeup" và "Spurious Wakeup"
  với Predicate'
date: '2025-07-26 02:16:47'
date_gmt: '2025-07-25 19:16:47'
modified: '2025-07-26 17:37:15'
status: publish
slug: stdcondition_variable-nang-cao-chong-lost-wakeup-va-spurious-wakeup-voi-predicate
wordpress_id: 244
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/stdcondition_variable-nang-cao-chong-lost-wakeup-va-spurious-wakeup-voi-predicate/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã thấy `std::condition_variable` là một giải pháp thanh lịch cho việc phối hợp thread. Tuy nhiên, đoạn code đơn giản mà chúng ta viết ra lại ẩn chứa hai cạm bẫy nguy hiểm: **Lost Wakeup** và **Spurious Wakeup**.

Bài viết này sẽ giải thích hai vấn đề này là gì và giới thiệu cách sử dụng phiên bản `wait()` mạnh mẽ hơn với **predicate** để viết code phối hợp thread thực sự vững chắc.

---

### Phần 1: Các Vấn Đề Tinh Vi Của `wait()`

#### a) Lost Wakeup (Đánh Thức Bị Mất) classic

Đây là một race condition kinh điển. Hãy tưởng tượng kịch bản sau:

1. **Producer (Writer)** chạy trước. Nó chuẩn bị dữ liệu, lock mutex, unlock, rồi gọi `cv.notify_one()`. Tín hiệu "đánh thức" đã được gửi đi.
2. Tuy nhiên, tại thời điểm đó, **Consumer (Reader)** vẫn chưa chạy đến lời gọi `cv.wait()`.
3. Tín hiệu `notify` giống như một tiếng gõ cửa—nếu không có ai ở nhà để nghe, nó sẽ bị bỏ lỡ và mất đi vĩnh viễn.
4. Sau đó, Consumer chạy đến, gọi `cv.wait()` và bắt đầu chờ đợi một tín hiệu sẽ không bao giờ đến nữa. **Kết quả:** Chương trình bị deadlock.

**Code minh họa:**

C++

```
// Sửa hàm main() để writer chạy trước
int main() {
    std::thread t2(writer_thread);
    std::this_thread::sleep_for(100ms); // Đảm bảo writer notify() trước
    std::thread t1(reader_thread);
    t1.join();
    t2.join();
    return 0;
}
// >> Kết quả: Reader sẽ bị treo và chờ mãi mãi.
```

#### b) Spurious Wakeup (Đánh Thức Giả)

Đây là một vấn đề kỳ lạ hơn. Vì lý do tối ưu hóa hiệu năng ở tầng hệ thống, đôi khi một thread đang `wait()` có thể bị **"đánh thức giả"**—nó thức dậy mà không hề có bất kỳ thread nào gọi `notify()`.

Nếu chúng ta không xử lý tình huống này, thread Consumer có thể thức dậy, nghĩ rằng dữ liệu đã sẵn sàng trong khi thực tế thì chưa, và xử lý dữ liệu sai hoặc cũ.

---

### Phần 2: Giải Pháp Toàn Diện - `wait()` với Predicate

May mắn thay, cả hai vấn đề trên đều được giải quyết một cách triệt để bằng cách sử dụng một phiên bản `wait()` mạnh mẽ hơn, nhận vào một tham số thứ hai gọi là **predicate**.

> **Predicate** là một đối tượng có thể gọi được (thường là một lambda) trả về `true` hoặc `false`. Nó dùng để kiểm tra xem điều kiện mà thread đang chờ đã thực sự được thỏa mãn hay chưa.

**Cách hoạt động:** Lời gọi `cv.wait(lock, predicate);` về mặt logic tương đương với:

C++

```
while (!predicate()) { // Trong khi điều kiện CHƯA đúng
    cv.wait(lock);       // thì mới chờ.
}
```

Vòng lặp `while` "tưởng tượng" này giải quyết cả hai vấn đề một cách hoàn hảo:

- **Chống Lost Wakeup**: Nếu tín hiệu `notify` đến trước, Producer sẽ set điều kiện thành `true`. Khi Consumer gọi `wait(lock, predicate)`, nó sẽ kiểm tra `predicate()` trước tiên. Vì điều kiện đã là `true`, nó sẽ không đi vào `wait()` và tiếp tục chạy ngay lập tức.
- **Chống Spurious Wakeup**: Nếu thread bị "đánh thức giả", hàm `wait(lock)` bên trong sẽ trả về. Tuy nhiên, vòng lặp `while` sẽ buộc nó phải **kiểm tra lại `predicate()`**. Vì Producer chưa hề thay đổi điều kiện, `predicate()` sẽ trả về `false`, và thread sẽ lại gọi `wait(lock)` để đi ngủ trở lại.

---

### Phần 3: Code Minh Họa Đã Sửa Lỗi

Để áp dụng giải pháp này, chúng ta cần thêm một biến `bool` để làm cờ cho predicate.

C++

```
#include <iostream>
#include <thread>
#include <mutex>
#include <string>
#include <condition_variable>

std::string shared_data;
std::mutex mtx;
std::condition_variable cv;
bool data_ready = false; // Cờ điều kiện (predicate)

void reader_thread() {
    std::unique_lock<std::mutex> lock(mtx);
    
    // Chờ cho đến khi data_ready == true
    // Lambda []{ return data_ready; } chính là predicate
    cv.wait(lock, []{ return data_ready; });
    
    // Khi ra khỏi wait, chúng ta chắc chắn data đã sẵn sàng
    std::cout << "Reader: Du lieu da san sang! Noi dung: " << shared_data << std::endl;
}

void writer_thread() {
    {
        std::lock_guard<std::mutex> lock(mtx);
        std::this_thread::sleep_for(std::chrono::seconds(1));
        shared_data = "Hello from Writer";
        data_ready = true; // Set cờ điều kiện thành true
        std::cout << "Writer: Da ghi du lieu xong va set cờ.\n";
    }
    cv.notify_one();
}

// ... main function có thể khởi tạo thread theo thứ tự bất kỳ ...
```

Với phiên bản này, chương trình của bạn sẽ **luôn chạy đúng**, bất kể thứ tự khởi tạo thread hay các vấn đề "đánh thức giả".

---

### Ghi Chú Phụ: `notify_one()` vs. `notify_all()`

- **`notify_one()`**: Đánh thức chỉ **một** trong số các thread đang chờ. Hiệu quả hơn nếu bất kỳ thread nào cũng có thể xử lý công việc.
- **`notify_all()`**: Đánh thức **tất cả** các thread đang chờ. Tất cả sẽ cùng lúc cạnh tranh để lấy lock và kiểm tra lại predicate. Dùng khi tín hiệu có thể thỏa mãn nhiều thread, hoặc khi các thread đang chờ các điều kiện con khác nhau.

---

**Quy tắc vàng:**

> **Luôn luôn sử dụng phiên bản `wait()` có predicate.**

Phiên bản `wait()` không có predicate rất dễ gây lỗi trong các kịch bản thực tế. Việc sử dụng predicate kết hợp với một biến cờ là cách làm chuẩn mực, an toàn và vững chắc nhất để phối hợp các thread bằng `std::condition_variable`.

*Until then, keep coding!*
