---
title: 'C++ Multithreading #18: Giải Pháp Cho Mutex Bị Kẹt: An Toàn Tuyệt Đối với
  std::lock_guard'
date: '2025-07-13 02:02:29'
date_gmt: '2025-07-12 19:02:29'
modified: '2025-07-24 01:49:41'
status: publish
slug: giai-phap-cho-mutex-bi-ket-an-toan-tuyet-doi-voi-stdlock_guard
wordpress_id: 172
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/13/giai-phap-cho-mutex-bi-ket-an-toan-tuyet-doi-voi-stdlock_guard/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã học cách sử dụng `mtx.lock()` và `mtx.unlock()` để bảo vệ một critical section. Nó đã hoạt động và giải quyết được vấn đề Data Race. Nhưng chúng ta cũng đã kết thúc với một câu hỏi đáng lo ngại: **Điều gì sẽ xảy ra nếu một exception được ném ra giữa `lock()` và `unlock()`?**

Bài viết này sẽ đi thẳng vào vấn đề đó, minh họa thảm họa "mutex bị kẹt", và giới thiệu "người hùng" đến để giải cứu: `std::lock_guard`.

#### **Phần 1: Thảm Họa "Mutex Bị Kẹt" (The "Stuck Mutex" Disaster)**

Hãy xem xét đoạn code sau. Chúng ta đã cẩn thận đặt critical section vào trong một khối `try`, nhưng lại cố tình ném ra một exception sau khi đã `lock()` mutex.

C++

```
#include <iostream>
#include <thread>
#include <mutex>
#include <stdexcept>
#include <vector>

std::mutex mtx;

void task() {
    try {
        mtx.lock(); // (1) Thread này khóa mutex thành công.
        std::cout << std::this_thread::get_id() << ": Da lock mutex, chuan bi nem exception.\n";
        
        // (2) Ném ra một exception
        throw std::runtime_error("Mot loi bat ngo!");

        // (3) Dòng code này KHÔNG BAO GIỜ được gọi tới.
        mtx.unlock(); 
    }
    catch (const std::exception& e) {
        std::cout << std::this_thread::get_id() << ": Da bat duoc exception: " << e.what() << std::endl;
    }
}

int main() {
    std::vector<std::thread> threads;
    for(int i = 0; i < 3; ++i) {
        threads.emplace_back(task);
    }
    for(auto& t : threads) {
        t.join();
    }
    return 0;
}
```

**Kết quả:** Một thread sẽ vào, lock mutex, ném exception và bắt được nó. Nhưng vì exception đã xảy ra, luồng thực thi nhảy thẳng đến khối `catch`, **bỏ qua hoàn toàn lời gọi `mtx.unlock()`**. Kết quả là **mutex bị khóa vĩnh viễn**. Tất cả các thread còn lại khi gọi `mtx.lock()` sẽ bị chặn lại và chờ đợi mãi mãi. Toàn bộ chương trình của bạn bị **deadlock**.

#### **Phần 2: Người Hùng RAII Xuất Hiện - `std::lock_guard`**

Giải pháp cho vấn đề này nằm ở nguyên tắc lập trình C++ kinh điển: **RAII (Resource Acquisition Is Initialization)**. Ý tưởng là quản lý vòng đời của một tài nguyên thông qua vòng đời của một đối tượng trên stack.

- **Tài nguyên ở đây là gì?** Là một cái "khóa" trên mutex.
- **Đối tượng quản lý là gì?** `std::lock_guard`.

`std::lock_guard` là một lớp bao bọc (wrapper) cực kỳ đơn giản cho mutex. Cơ chế hoạt động của nó là một vẻ đẹp của sự tự động hóa:

1. **Constructor:** Khi bạn tạo một đối tượng `std::lock_guard`, nó sẽ nhận một `std::mutex` làm tham số và **ngay lập tức gọi `lock()`** trên mutex đó.
2. **Destructor:** Khi đối tượng `std::lock_guard` ra khỏi scope (dù là kết thúc scope thông thường hay do một exception được ném ra), destructor của nó sẽ được C++ **đảm bảo gọi tự động**, và destructor này sẽ **gọi `unlock()`** trên mutex.

Quá trình khóa và mở khóa trở nên hoàn toàn tự động và an toàn trước exception.

#### **Phần 3: Viết Lại Code Một Cách An Toàn**

Bây giờ, hãy viết lại ví dụ trên bằng `std::lock_guard`.

C++

```
#include <iostream>
#include <thread>
#include <mutex>
#include <stdexcept>
#include <vector>
std::mutex mtx;

void safe_task() {
    try {
        // Tạo lock_guard, nó sẽ tự động lock mtx.
        // Không cần gọi mtx.lock() thủ công.
        std::lock_guard<std::mutex> guard(mtx);
        
        // --- Critical Section bắt đầu ---
        std::cout << std::this_thread::get_id() << ": Da lock mutex, chuan bi nem exception.\n";
        throw std::runtime_error("Mot loi bat ngo!");
        // --- Critical Section kết thúc ---

    } // Khi exception được ném, 'guard' ra khỏi scope.
      // Destructor của 'guard' được gọi, tự động unlock() mtx.
    catch (const std::exception& e) {
        std::cout << std::this_thread::get_id() << ": Da bat duoc exception." << std::endl;
    }
}

// ... main function tương tự như trên, nhưng gọi safe_task ...
int main() {
    std::vector<std::thread> threads;
    for(int i = 0; i < 3; ++i) {
        threads.emplace_back(safe_task);
    }
    for(auto& t : threads) {
        t.join();
    }
    return 0;
}
```

Nếu bạn chạy đoạn code an toàn này, bạn sẽ thấy cả 3 thread đều lần lượt chạy, ném ra exception, bắt được nó, và quan trọng nhất là chương trình kết thúc một cách bình thường mà không bị deadlock. `std::lock_guard` đã tự động giải phóng mutex cho chúng ta.

#### **Phần 4: Một Hạn Chế Của `lock_guard`**

`std::lock_guard` rất an toàn nhưng có một hạn chế: nó hơi "cứng nhắc". Cái khóa sẽ được giữ trong **suốt vòng đời của đối tượng `lock_guard`**, tức là cho đến khi kết thúc scope chứa nó.

Hãy xem xét:

C++

```
{
    std::lock_guard<std::mutex> guard(mtx);
    
    // Critical section thực sự chỉ ở đây
    shared_data++; 
    
    // Giả sử có một công việc dài nhưng không truy cập shared_data
    std::this_thread::sleep_for(2s); 

} // Mutex chỉ được unlock tại đây!
```

Trong ví dụ trên, mutex vẫn bị khóa trong suốt 2 giây của `sleep_for`, mặc dù critical section đã kết thúc từ lâu. Điều này không cần thiết và làm giảm khả năng song song của chương trình, vì các thread khác phải chờ 2 giây một cách vô ích.

### **Lời Kết**

Bài học quan trọng nhất hôm nay là: **Hãy quên việc gọi `lock()` và `unlock()` thủ công đi**. Hãy luôn sử dụng một trình quản lý dựa trên RAII.

`std::lock_guard` là công cụ mặc định, an toàn và hiệu quả cho hầu hết các trường hợp khóa đơn giản dựa trên scope. Nó giải quyết triệt để vấn đề an toàn với exception.

Tuy nhiên, như chúng ta đã thấy, sự đơn giản của nó đôi khi đi kèm với sự thiếu linh hoạt. Vậy nếu chúng ta cần kiểm soát vòng đời của khóa một cách tinh vi hơn thì sao? Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về một công cụ mạnh mẽ và linh hoạt hơn: `std::unique_lock`.

*Until then, keep coding!*
