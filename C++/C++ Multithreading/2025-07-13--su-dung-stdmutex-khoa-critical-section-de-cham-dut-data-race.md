---
title: 'C++ Multithreading #16: Sử Dụng std::mutex: "Khóa" Critical Section Để Chấm
  Dứt Data Race'
date: '2025-07-13 01:49:09'
date_gmt: '2025-07-12 18:49:09'
modified: '2025-07-26 17:38:52'
status: publish
slug: su-dung-stdmutex-khoa-critical-section-de-cham-dut-data-race
wordpress_id: 170
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/13/su-dung-stdmutex-khoa-critical-section-de-cham-dut-data-race/
categories:
- C++ Multithreading
tags: []
---

Trong các bài viết trước, chúng ta đã hiểu về khái niệm "Critical Section" và "Mutex" như một người gác cổng. Bây giờ là lúc biến lý thuyết đó thành code C++ thực tế. Chúng ta sẽ học cách sử dụng lớp `std::mutex` từ Thư viện Chuẩn để bảo vệ dữ liệu chia sẻ và sửa lỗi Data Race mà chúng ta đã tạo ra.

#### **Phần 1: Gặp Gỡ `std::mutex` trong C++**

Để sử dụng mutex, chúng ta cần `#include <mutex>`. Lớp `std::mutex` cung cấp một giao diện rất đơn giản, trong đó có 3 phương thức chính chúng ta cần quan tâm:

1. **`lock()`**: Đây là một lệnh gọi **chặn (blocking)**.
   - Khi một thread gọi `mtx.lock()`, nó sẽ cố gắng khóa mutex.
   - Nếu mutex đang mở, thread sẽ khóa nó thành công và đi tiếp.
   - Nếu mutex đã bị khóa bởi một thread khác, thread này sẽ bị **dừng lại và chờ đợi** cho đến khi mutex được mở. Nó sẽ không quay trở lại cho đến khi khóa thành công.
2. **`unlock()`**: Mở khóa mutex, cho phép một trong các thread đang chờ có cơ hội để khóa nó.
3. **`try_lock()`**: Đây là một lệnh gọi **không chặn (non-blocking)**.
   - Nó sẽ cố gắng khóa mutex. Nếu thành công, nó trả về `true`.
   - Nếu không thành công (vì mutex đã bị khóa), nó sẽ **trả về `false` ngay lập tức** mà không chờ đợi.

#### **Phần 2: Sửa Lỗi Data Race với `lock()` và `unlock()`**

Hãy quay trở lại ví dụ về Data Race với `std::cout` ở bài trước. Chúng ta sẽ thêm một `std::mutex` toàn cục để bảo vệ critical section (đoạn code in ra chuỗi ký tự).

C++

```
#include <iostream>
#include <thread>
#include <string>
#include <vector>
#include <mutex> // Thêm header cho mutex

// Mutex này sẽ được chia sẻ bởi tất cả các thread
std::mutex mtx;

void print_string(const std::string& str) {
    for (int i = 0; i < 5; ++i) {
        // --- Bắt đầu Critical Section ---
        mtx.lock(); // Yêu cầu khóa. Nếu có thread khác đang giữ khóa, chờ ở đây.

        // Chỉ có một thread được phép thực thi đoạn code này tại một thời điểm
        for (char c : str) {
            std::cout << c;
        }
        std::cout << " ";

        mtx.unlock(); // Mở khóa, cho phép thread khác vào.
        // --- Kết thúc Critical Section ---
    }
}

int main() {
    std::vector<std::thread> threads;
    threads.emplace_back(print_string, "abc");
    threads.emplace_back(print_string, "def");
    threads.emplace_back(print_string, "xyz");

    for (auto& t : threads) {
        t.join();
    }
    std::cout << std::endl;
    return 0;
}
```

**Kết quả:**

```
abc abc abc abc abc def def def def def xyz xyz xyz xyz xyz
```

Output bây giờ đã hoàn toàn trật tự! Mặc dù thứ tự các thread (abc, def, xyz) có thể thay đổi mỗi lần chạy, nhưng output của mỗi thread sẽ không bao giờ bị xen kẽ vào nhau nữa. Bằng cách bao bọc vùng code nhạy cảm giữa `lock()` và `unlock()`, chúng ta đã đảm bảo **Mutual Exclusion** và loại bỏ hoàn toàn Data Race.

#### **Phần 3: Thử Khóa Không Chờ Đợi với `try_lock()`**

`try_lock()` hữu ích khi một thread không muốn bị chặn lại. Nếu không lấy được khóa, nó có thể đi làm một việc khác trong khi chờ đợi. Một mô hình phổ biến là sử dụng `try_lock()` trong một vòng lặp.

Hãy xem ví dụ sau:

- `task1` sẽ khóa mutex ngay lập tức và giữ trong 1 giây.
- `task2` sẽ cố gắng khóa mutex bằng `try_lock()`. Vì `task1` đang giữ khóa, `try_lock()` sẽ thất bại. `task2` sẽ không chờ, thay vào đó nó sẽ in ra thông báo "không thể khóa" và thử lại sau một khoảng thời gian ngắn.

C++

```
#include <iostream>
#include <thread>
#include <chrono>
#include <mutex>

using namespace std::chrono_literals;

std::mutex mtx;

void task1() {
    std::cout << "Task 1: Dang co gang lock mutex...\n";
    mtx.lock();
    std::cout << "Task 1: Da lock mutex. Giu trong 1 giay.\n";
    std::this_thread::sleep_for(1s);
    std::cout << "Task 1: Mo khoa mutex.\n";
    mtx.unlock();
}

void task2() {
    std::this_thread::sleep_for(50ms); // Chờ một chút để task1 chắc chắn đã lock
    std::cout << "Task 2: Dang co gang lock mutex...\n";
    
    // Cố gắng khóa, nếu không được thì làm việc khác và thử lại
    while (!mtx.try_lock()) {
        std::cout << "Task 2: Khong the lock mutex, dang cho...\n";
        std::this_thread::sleep_for(100ms);
    }

    // Nếu vòng lặp kết thúc, có nghĩa là đã lock thành công
    std::cout << "Task 2: Da lock mutex.\n";
    mtx.unlock();
}

int main() {
    std::thread t1(task1);
    std::thread t2(task2);

    t1.join();
    t2.join();

    return 0;
}
```

Output của chương trình sẽ cho thấy `task2` liên tục thử và thất bại cho đến khi `task1` mở khóa, lúc đó `try_lock()` của `task2` mới thành công.

### **Lời Kết**

Chúng ta đã thành công trong việc sử dụng `std::mutex` để giải quyết vấn đề Data Race. `lock()` và `unlock()` là cặp đôi nền tảng để bảo vệ Critical Section, trong khi `try_lock()` cung cấp một phương án linh hoạt hơn cho các kịch bản không muốn bị chặn.

Tuy nhiên, việc sử dụng `lock()` và `unlock()` thủ công tiềm ẩn một rủi ro lớn: nếu một **exception** xảy ra giữa hai lời gọi này thì sao? Mutex sẽ bị khóa mãi mãi, gây ra tình trạng **deadlock**.

Trong bài viết tiếp theo, chúng ta sẽ học một cách làm an toàn và "C++" hơn rất nhiều để quản lý mutex bằng cách sử dụng nguyên tắc RAII với `std::lock_guard`.

*Until then, keep coding!*
