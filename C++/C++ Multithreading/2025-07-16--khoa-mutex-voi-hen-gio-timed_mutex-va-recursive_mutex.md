---
title: 'C++ Multithreading #20: Khóa Mutex Với "Hẹn Giờ": timed_mutex và recursive_mutex'
date: '2025-07-16 00:57:09'
date_gmt: '2025-07-15 17:57:09'
modified: '2025-07-24 01:48:29'
status: publish
slug: khoa-mutex-voi-hen-gio-timed_mutex-va-recursive_mutex
wordpress_id: 184
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/16/khoa-mutex-voi-hen-gio-timed_mutex-va-recursive_mutex/
categories:
- C++ Multithreading
tags: []
---

Trong các bài học trước, chúng ta đã làm chủ `std::mutex` và các trình quản lý RAII như `lock_guard` và `unique_lock`. Chúng đã giải quyết được vấn đề Data Race và an toàn với exception.

Tuy nhiên, `std::mutex::lock()` có một đặc tính có thể gây phiền toái: nó sẽ chờ đợi **vô thời hạn**. Nếu một thread giữ khóa quá lâu hoặc bị lỗi, các thread khác sẽ bị "treo" mãi mãi. Bài viết này sẽ giới thiệu các loại mutex nâng cao hơn để giải quyết vấn đề này và một số trường hợp đặc biệt khác.

#### **Phần 1: Trường Hợp Đặc Biệt - Khóa Đệ Quy với `std::recursive_mutex`**

**Quy tắc vàng:** Bạn không bao giờ được `lock()` cùng một `std::mutex` hai lần trên cùng một thread mà không có lời gọi `unlock()` ở giữa. Làm vậy sẽ gây ra **deadlock** ngay lập tức.

Tuy nhiên, trong một số kịch bản đệ quy (thường là do thiết kế chưa tối ưu), một hàm có thể cần gọi lại chính nó và khóa lại cùng một mutex. `std::recursive_mutex` được sinh ra để xử lý tình huống này. Nó cho phép cùng một thread có thể `lock()` nó nhiều lần. Thread đó sẽ phải `unlock()` đủ số lần tương ứng để giải phóng mutex cho các thread khác.

C++

```
#include <iostream>
#include <thread>
#include <mutex>

// Dùng recursive_mutex cho phép khóa đệ quy
std::recursive_mutex rec_mtx;

void recursive_func(int count) {
    // Dùng lock_guard với recursive_mutex
    std::lock_guard<std::recursive_mutex> guard(rec_mtx);
    
    if (count <= 0) {
        std::cout << "Ket thuc de quy.\n";
        return;
    }
    
    std::cout << "Lock count: " << count << std::endl;
    recursive_func(count - 1);
}

int main() {
    std::thread t1(recursive_func, 5);
    t1.join();
    return 0;
}
```

**Lời khuyên từ chuyên gia:** Nếu bạn thấy mình cần dùng đến `std::recursive_mutex`, hãy dừng lại và xem xét lại thiết kế của mình. Rất có thể logic của bạn có thể được tái cấu trúc để tránh việc khóa đệ quy. Hãy xem nó như một giải pháp cuối cùng, không phải là một công cụ nên dùng thường xuyên.

#### **Phần 2: Khóa Có Thời Hạn với `std::timed_mutex`**

Đây là công cụ cực kỳ hữu ích để tránh việc chờ đợi vô hạn. `std::timed_mutex` hoạt động giống như `std::mutex` nhưng có thêm hai phương thức `try_lock` với "hẹn giờ":

1. **`try_lock_for(duration)`**: Cố gắng khóa mutex. Nếu không khóa được, nó sẽ chờ trong một khoảng thời gian `duration` (ví dụ `100ms`). Nếu trong khoảng thời gian đó khóa được, nó trả về `true`. Nếu hết giờ mà vẫn không khóa được, nó trả về `false`.
2. **`try_lock_until(time_point)`**: Tương tự, nhưng nó sẽ chờ cho đến một **thời điểm** cụ thể trong tương lai.

Những phương thức này cho phép một thread từ bỏ việc chờ đợi sau một khoảng thời gian nhất định và có thể đi làm việc khác.

#### **Kết Hợp với `std::unique_lock`**

Cách sử dụng `timed_mutex` an toàn và phổ biến nhất là kết hợp với `std::unique_lock`, vì `unique_lock` cũng hỗ trợ các thao tác có thời hạn.

Mô hình chung sẽ như sau:

1. Tạo một `unique_lock` với tùy chọn `std::defer_lock` để nó không khóa mutex ngay lập tức.
2. Sử dụng phương thức `lock.try_lock_for()` hoặc `lock.try_lock_until()` trong một vòng lặp.
3. Nếu khóa thành công (`true`), thoát khỏi vòng lặp và xử lý critical section.
4. Nếu thất bại (`false`), có thể đi làm việc khác hoặc ngủ một chút rồi thử lại.

C++

```
#include <iostream>
#include <thread>
#include <mutex>
#include <chrono>

using namespace std::chrono_literals;

std::timed_mutex timed_mtx;

void worker() {
    std::cout << std::this_thread::get_id() << ": Dang cho de lock mutex...\n";
    
    // Tạo unique_lock nhưng chưa lock ngay
    std::unique_lock<std::timed_mutex> lock(timed_mtx, std::defer_lock);

    // Cố gắng lock trong 1 giây, nếu không được thì thử lại
    while (!lock.try_lock_for(100ms)) {
        std::cout << std::this_thread::get_id() << ": ... van chua lock duoc.\n";
    }
    
    // Nếu thoát khỏi vòng lặp, có nghĩa là đã lock thành công
    std::cout << std::this_thread::get_id() << ": Da lock mutex! Bat dau critical section.\n";
    std::this_thread::sleep_for(500ms);
    std::cout << std::this_thread::get_id() << ": Ket thuc critical section.\n";
    
    // unique_lock sẽ tự động unlock trong destructor của nó
}

int main() {
    std::thread t1(worker);
    std::thread t2(worker);

    t1.join();
    t2.join();
    return 0;
}
```

#### **Ghi Chú Về Thời Gian: `system_clock` vs. `steady_clock`**

Khi làm việc với thời gian, thư viện `<chrono>` cung cấp hai loại đồng hồ chính:

- **`std::chrono::system_clock`**: Đồng hồ hệ thống, có thể bị thay đổi (ví dụ khi đổi múi giờ, đồng bộ qua mạng). Dùng nó khi bạn cần một **thời điểm** cụ thể (ví dụ `try_lock_until`).
- **`std::chrono::steady_clock`**: Đồng hồ "ổn định", luôn tăng tiến đều và không bao giờ nhảy lùi. Dùng nó khi bạn cần đo một **khoảng thời gian** (ví dụ `try_lock_for`).

### **Lời Kết**

Việc khóa một mutex không chỉ có hai lựa chọn "chờ mãi mãi" hoặc "bỏ cuộc ngay". Với `std::timed_mutex`, chúng ta có thêm khả năng "chờ đợi trong một khoảng thời gian hợp lý", giúp các ứng dụng multi-thread trở nên linh hoạt và phản hồi tốt hơn, tránh được các kịch bản bị treo vô thời hạn.

Trong khi đó, `std::recursive_mutex` là một công cụ đặc thù cho các trường hợp hiếm gặp, và sự tồn tại của nó nhắc nhở chúng ta về tầm quan trọng của việc thiết kế luồng xử lý đơn giản và rõ ràng.

*Until then, keep coding!*
