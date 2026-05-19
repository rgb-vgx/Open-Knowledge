---
title: 'C++ Multithreading #8: Tương Tác Với Thread Ở Cấp Độ Hệ Thống: Handle, ID,
  và Sleep'
date: '2025-07-12 00:25:39'
date_gmt: '2025-07-11 17:25:39'
modified: '2025-09-29 22:52:37'
status: publish
slug: tuong-tac-voi-thread-o-cap-do-he-thong-handle-id-va-sleep
wordpress_id: 145
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/12/tuong-tac-voi-thread-o-cap-do-he-thong-handle-id-va-sleep/
categories:
- C++ Multithreading
tags: []
---

Trong các bài viết trước, chúng ta đã học cách tạo ra một thread và truyền tham số cho nó. Nhưng việc quản lý một thread không chỉ dừng lại ở đó. Trong thực tế, chúng ta thường cần định danh các thread, tạm dừng chúng, hoặc thậm chí là can thiệp sâu hơn ở cấp độ hệ điều hành.

Bài viết này sẽ giới thiệu 3 công cụ quan trọng để tương tác với `std::thread`: lấy "handle" của hệ thống, lấy ID định danh, và cho một thread "ngủ".

#### **Phần 1: Vượt Qua Giới Hạn C++ Tiêu Chuẩn - `native_handle()`**

Thư viện chuẩn C++ được thiết kế để có thể chạy trên mọi nền tảng (tính đa nền tảng - portability). Điều này có nghĩa là nó chỉ bao gồm những tính năng chung nhất. Tuy nhiên, các hệ điều hành thường cung cấp những tính năng mạnh mẽ hơn nhưng không có trong chuẩn, ví dụ:

- **Thiết lập độ ưu tiên (Priority):** Yêu cầu hệ điều hành cho một thread quan trọng được ưu tiên sử dụng CPU nhiều hơn.
- **Thiết lập "Affinity":** "Ghim" một thread để nó luôn chạy trên một nhân CPU cụ thể, tránh chi phí context-switch và hữu ích trong các ứng dụng tài chính yêu cầu độ trễ cực thấp.

Để sử dụng các tính năng này, C++ cung cấp phương thức `native_handle()`.

- **Nó làm gì?** Phương thức này trả về một "handle" (một dạng định danh/con trỏ) thô, đặc thù của hệ điều hành (`pthread_t` trên Linux, `HANDLE` trên Windows,...).
- **Sử dụng như thế nào?** Chúng ta không cần quan tâm kiểu chính xác của handle này là gì. Chúng ta chỉ cần lấy nó và truyền vào các hàm API của hệ điều hành tương ứng.

C++

```
#include <iostream>
#include <thread>

void task() { /* ... */ }

int main() {
    std::thread t1(task);
    std::thread::native_handle_type handle = t1.native_handle();

    std::cout << "Native handle: " << handle << std::endl;

    t1.join();

    // Sau khi join(), thread đã kết thúc, handle không còn hợp lệ (thường là 0 hoặc null)
    handle = t1.native_handle();
    std::cout << "Native handle sau khi join: " << handle << std::endl;

    return 0;
}
```

#### **Phần 2: Định Danh Duy Nhất - Lấy Thread ID**

Mỗi thread đang thực thi trong một chương trình đều có một ID định danh duy nhất (`std::thread::id`). ID này rất hữu ích để theo dõi, gỡ lỗi, hoặc dùng làm khóa trong các container như `std::map`.

Có hai cách để lấy ID của một thread:

1. `thread_object.get_id()`: Lấy ID của thread được quản lý bởi `thread_object`. Được gọi từ một thread khác (ví dụ, `main` thread).
2. `std::this_thread::get_id()`: Lấy ID của chính thread đang gọi hàm này. Được gọi từ bên trong mã lệnh của thread.

C++

```
#include <iostream>
#include <thread>
#include <chrono>

void worker_thread() {
    std::cout << "  [Worker] ID cua toi la: " << std::this_thread::get_id() << std::endl;
}

int main() {
    std::thread t1(worker_thread);

    std::cout << "[Main] ID cua main thread la: " << std::this_thread::get_id() << std::endl;
    std::cout << "[Main] ID cua worker thread la: " << t1.get_id() << std::endl;

    t1.join();
    return 0;
}
```

**Lưu ý quan trọng:** Sau khi một thread kết thúc, ID của nó có thể được tái sử dụng bởi một thread mới được tạo ra sau đó.

#### **Phần 3: Tạm Dừng Thực Thi - `sleep_for()`**

Đôi khi, chúng ta muốn một thread tạm dừng thực thi trong một khoảng thời gian nhất định. Thư viện C++ cung cấp một cách chuẩn và an toàn để làm điều này thông qua `std::this_thread::sleep_for()`.

- **Nó làm gì?** Khiến **thread hiện tại** ("this thread") rơi vào trạng thái "ngủ" trong một khoảng thời gian được chỉ định. Bạn không thể cho một thread khác "ngủ" từ bên ngoài.
- **Tham số:** Nó nhận một đối tượng `std::chrono::duration`. Từ C++14, chúng ta có thể dùng các "literals" rất tiện lợi như `2s`, `500ms`.

C++

```
#include <iostream>
#include <thread>
#include <chrono> // Cần thiết cho duration và literals

// Kích hoạt các chrono literals như 's', 'ms'
using namespace std::chrono_literals;

void delayed_hello() {
    std::cout << "Toi se ngu trong 2 giay..." << std::endl;

    // Yêu cầu thread hiện tại ngủ trong 2 giây
    std::this_thread::sleep_for(2s);
    // Với C++11: std::this_thread::sleep_for(std::chrono::seconds(2));

    std::cout << "Hello! Toi da tinh day." << std::endl;
}

int main() {
    std::thread t1(delayed_hello);
    t1.join();
    return 0;
}
```

**Lưu ý:** `sleep_for` là một yêu cầu. Thread sẽ ngủ *ít nhất* là khoảng thời gian bạn chỉ định, nhưng có thể lâu hơn một chút tùy thuộc vào lịch trình của hệ điều hành.

### **Lời Kết**

Việc quản lý và tương tác với các thread là một phần không thể thiếu của lập trình multi-thread. Với `native_handle()`, `get_id()`, và `sleep_for()`, bạn đã có trong tay những công cụ cơ bản nhưng mạnh mẽ để định danh, điều khiển, và thậm chí là tối ưu hóa các thread của mình ở cấp độ sâu hơn.

Nắm vững những công cụ này sẽ giúp bạn xây dựng các ứng dụng multi-thread phức tạp và đáng tin cậy hơn. Giờ khi đã biết cách tạo và quản lý thread, thách thức lớn tiếp theo đang chờ đợi chúng ta: làm thế nào để các thread chia sẻ dữ liệu một cách an toàn?

*Until then, keep coding!*
