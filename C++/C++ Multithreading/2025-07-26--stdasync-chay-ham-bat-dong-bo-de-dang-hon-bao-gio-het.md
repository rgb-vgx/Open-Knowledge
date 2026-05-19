---
title: 'std::async: Chạy Hàm Bất Đồng Bộ Dễ Dàng Hơn Bao Giờ Hết'
date: '2025-07-26 16:17:26'
date_gmt: '2025-07-26 09:17:26'
modified: '2025-07-26 17:36:21'
status: publish
slug: stdasync-chay-ham-bat-dong-bo-de-dang-hon-bao-gio-het
wordpress_id: 275
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/stdasync-chay-ham-bat-dong-bo-de-dang-hon-bao-gio-het/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã đi từ việc quản lý `thread` thủ công, đến việc "kết nối" `promise` và `future`, rồi "đóng gói" chúng bằng `packaged_task`. Mỗi bước là một sự trừu tượng hóa cao hơn. Giờ đây, chúng ta sẽ đến với công cụ ở mức cao nhất, đơn giản và tiện lợi nhất để chạy một tác vụ và lấy kết quả của nó: **`std::async`**.

`std::async` là một hàm trong header `<future>`, có thể xem như một "trọn gói" tất cả trong một.

---

### Phần 1: `std::async` là gì?

Hãy tưởng tượng bạn muốn chạy một hàm trong một thread khác và lấy giá trị trả về của nó. Với những gì đã học, bạn cần:

1. Tạo một `std::promise`.
2. Lấy `std::future` từ nó.
3. Tạo một `std::thread`, `move` promise vào đó.
4. Lấy `future` để chờ kết quả.

`std::async` làm tất cả những việc đó cho bạn chỉ trong **một lời gọi hàm duy nhất**.

> `std::async` là một hàm giúp khởi chạy một callable object (hàm, lambda...) một cách bất đồng bộ và **trả về ngay lập tức một `std::future`** sẽ chứa kết quả của callable object đó.

**Cú pháp:**

C++

```
#include <future>

// Cách dùng
auto my_future = std::async(my_function, arg1, arg2);
```

Nó sẽ tự động lo liệu việc tạo promise, lấy future, có thể tạo một thread mới, thực thi hàm của bạn, và bắt kết quả (hoặc exception) vào trong future.

---

### Phần 2: Lấy Kết Quả với `std::future`

Vì `std::async` trả về một `std::future`, cách lấy kết quả hoàn toàn giống như chúng ta đã học. Lời gọi `.get()` trên future sẽ block cho đến khi tác vụ bất đồng bộ hoàn thành.

Hãy xem một ví dụ tính toán số Fibonacci thứ 44 (một tác vụ tốn thời gian) một cách bất đồng bộ.

C++

```
#include <iostream>
#include <future>
#include <chrono>

// Một hàm tính toán tốn thời gian
long long fibonacci(int n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    std::cout << "Main: Goi std::async de tinh Fibonacci(44)...\n";

    // Khởi chạy tác vụ bất đồng bộ
    auto fib_future = std::async(fibonacci, 44);

    std::cout << "Main: Da goi async. Main thread co the lam viec khac trong khi cho doi.\n";

    // Vòng lặp chờ đợi mà không block hoàn toàn
    while (fib_future.wait_for(std::chrono::seconds(1)) != std::future_status::ready) {
        std::cout << "Main: Van dang cho ket qua...\n";
    }

    std::cout << "Main: Future da san sang!\n";
    long long result = fib_future.get();
    std::cout << "Ket qua Fibonacci(44) la: " << result << std::endl;

    return 0;
}
```

**Phân tích luồng chạy:**

1. `std::async` được gọi, một tác vụ tính toán `fibonacci(44)` được khởi chạy trong nền. Main thread không bị block.
2. Main thread ngay lập tức đi vào vòng lặp `while`, in ra "Van dang cho..." mỗi giây.
3. Trong khi đó, tác vụ `fibonacci` đang chạy trên một thread khác.
4. Sau vài giây, tác vụ `fibonacci` hoàn thành. `fib_future` chuyển sang trạng thái "ready".
5. Vòng lặp `while` kết thúc. `fib_future.get()` được gọi và trả về kết quả ngay lập tức (vì kết quả đã sẵn sàng).

---

### Phần 3: Xử Lý Exception với `std::async`

Cơ chế xử lý exception cũng được tích hợp sẵn một cách thanh lịch.

- Nếu hàm được truyền vào `std::async` ném ra một exception, exception đó sẽ được bắt lại và **lưu trữ bên trong `std::future`** được trả về.
- Khi bạn gọi `.get()` trên future đó, nó sẽ **ném lại (re-throw)** chính exception đã được lưu.

**Code minh họa:**

C++

```
#include <iostream>
#include <future>
#include <stdexcept>

int task_may_throw(bool do_throw) {
    if (do_throw) {
        throw std::runtime_error("Loi duoc nem ra tu task!");
    }
    return 100;
}

int main() {
    auto future_with_exception = std::async(task_may_throw, true);

    try {
        std::cout << "Dang co gang .get() tu future co exception...\n";
        int result = future_with_exception.get(); // Dòng này sẽ ném exception
        std::cout << "Ket qua: " << result << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Main: Da bat duoc exception: " << e.what() << std::endl;
    }
    return 0;
}
```

Khối `try/catch` trong `main` đã bắt thành công một exception được ném ra từ một thread khác, tất cả nhờ vào `std::async` và `std::future`.

---

`std::async` là công cụ đơn giản và tiện lợi nhất để chạy một tác vụ "một lần" bất đồng bộ và lấy kết quả của nó. Nó trừu tượng hóa đi toàn bộ sự phức tạp của thread, promise, và packaged\_task.

Tuy nhiên, `std::async` có một chi tiết cực kỳ quan trọng điều khiển **cách thức** nó chạy một tác vụ: **launch policy**. Liệu nó có luôn tạo một thread mới không? Không hẳn! Trong bài học tiếp theo, chúng ta sẽ tìm hiểu về các launch policy và khám phá toàn bộ sức mạnh cũng như sự tinh tế của `std::async`.

*Until then, keep coding!*
