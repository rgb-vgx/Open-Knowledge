---
title: 'Nâng Cấp ConcurrentQueue (Phần 2): Thêm condition_variable Để Chờ Đợi Hiệu
  Quả'
date: '2025-07-26 17:24:23'
date_gmt: '2025-07-26 10:24:23'
modified: '2025-07-26 17:32:55'
status: publish
slug: nang-cap-concurrentqueue-phan-2-them-condition_variable-de-cho-doi-hieu-qua
wordpress_id: 313
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/nang-cap-concurrentqueue-phan-2-them-condition_variable-de-cho-doi-hieu-qua/
categories:
- C++ Multithreading
tags: []
---

Ở Phần 1, chúng ta đã xây dựng một `ConcurrentQueue` an toàn, nhưng nó có một nhược điểm lớn: khi một thread consumer cố gắng `pop` từ một queue rỗng, nó sẽ nhận một exception. Để xử lý, consumer phải bắt exception và thử lại trong một vòng lặp, một dạng **polling** rất tốn kém và không hiệu quả.

Trong bài học này, chúng ta sẽ nâng cấp `ConcurrentQueue` lên một tầm cao mới. Thay vì "ném lỗi", nó sẽ "chờ đợi" một cách thông minh bằng cách sử dụng **`std::condition_variable`**.

---

### Phần 1: Thiết Kế Mới - Từ "Ném Lỗi" đến "Chờ Đợi"

Logic mới của chúng ta sẽ như sau:

- **`pop()`**: Nếu queue rỗng, thread consumer sẽ **block (ngủ)** một cách hiệu quả, không tốn CPU.
- **`push()`**: Sau khi thêm một phần tử mới vào queue, thread producer sẽ **thông báo (notify)** để "đánh thức" một consumer đang ngủ dậy.

Đây chính xác là kịch bản mà `std::condition_variable` được sinh ra để giải quyết.

---

### Phần 2: Hiện Thực Hóa `ConcurrentQueue` Nâng Cấp

Chúng ta sẽ thêm một `std::condition_variable` vào lớp của mình và sửa lại hai phương thức `push` và `pop`.

C++

```
#include <queue>
#include <mutex>
#include <condition_variable>

template <typename T>
class ConcurrentQueue {
private:
    std::queue<T> m_queue;
    mutable std::mutex m_mtx;
    std::condition_variable m_cv; // Thêm condition variable

public:
    // ... constructor và các hàm bị delete giữ nguyên ...

    void push(const T& item) {
        { // Tạo scope riêng cho lock_guard
            std::lock_guard<std::mutex> lock(m_mtx);
            m_queue.push(item);
        } // lock_guard bị hủy, mutex được unlock ở đây
        
        // Thông báo cho MỘT thread đang chờ (nếu có)
        m_cv.notify_one();
    }

    void pop(T& item) {
        // Phải dùng unique_lock với condition_variable
        std::unique_lock<std::mutex> lock(m_mtx);

        // Chờ cho đến khi predicate (!m_queue.empty()) trả về true
        m_cv.wait(lock, [this]{ return !m_queue.empty(); });

        // Khi wait() trả về, chúng ta chắc chắn queue không rỗng và mutex đang được khóa
        item = m_queue.front();
        m_queue.pop();
    }
};
```

**Phân tích sự thay đổi:**

- **Trong `push()`**: Sau khi đẩy phần tử mới và `unlock` mutex, chúng ta gọi `m_cv.notify_one()`. Lời gọi này sẽ "đánh thức" một thread consumer (nếu có thread nào đang chờ trong hàm `wait()`).
- **Trong `pop()`**: Đây là nơi phép màu xảy ra.
  - `m_cv.wait(lock, [this]{ return !m_queue.empty(); });`
  - Dòng code này làm những việc sau:
    1. Kiểm tra predicate: `!m_queue.empty()`.
    2. Nếu queue **không rỗng** (predicate là `true`), `wait()` trả về ngay lập tức và tiếp tục.
    3. Nếu queue **rỗng** (predicate là `false`), `wait()` sẽ tự động **unlock mutex** và đưa thread vào trạng thái ngủ.
    4. Khi được `notify()` đánh thức, thread sẽ tỉnh dậy, **khóa lại mutex**, và **kiểm tra lại predicate**. Nếu đúng, nó mới thực sự thoát khỏi `wait()`.

---

### Phần 3: Thử Nghiệm

Hãy xem phiên bản nâng cấp này hoạt động như thế nào khi reader chạy trước và phải chờ đợi.

C++

```
#include <iostream>
#include <thread>
#include <vector>

ConcurrentQueue<int> g_queue;

void writer_task() {
    std::cout << "Writer: Se bat dau push sau 2 giay...\n";
    std::this_thread::sleep_for(std::chrono::seconds(2));
    for (int i = 0; i < 10; ++i) {
        g_queue.push(i);
        std::cout << "Writer: Da push " << i << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
}

void reader_task() {
    int val;
    for (int i = 0; i < 10; ++i) {
        std::cout << "Reader: Dang cho de pop...\n";
        g_queue.pop(val); // Sẽ block ở đây nếu queue rỗng
        std::cout << "Reader: Da pop duoc " << val << std::endl;
    }
}

int main() {
    std::thread reader(reader_task);
    std::thread writer(writer_task);
    reader.join();
    writer.join();
    return 0;
}
```

**Kết quả:** Bạn sẽ thấy `Reader` in ra "Dang cho de pop..." và bị dừng lại. Sau 2 giây, `Writer` bắt đầu `push` các phần tử. Cứ mỗi lần `Writer` `push` một số, `Reader` sẽ được đánh thức, `pop` số đó ra và in, rồi lại quay lại chờ đợi. Chương trình phối hợp một cách hoàn hảo và hiệu quả.

---

Bằng cách thay thế cơ chế exception bằng `std::condition_variable`, chúng ta đã biến `ConcurrentQueue` từ một lớp "an toàn nhưng cồng kềnh" thành một công cụ producer-consumer thực sự hiệu quả. Các thread chờ đợi sẽ không tốn tài nguyên CPU và chỉ được đánh thức khi thực sự có việc để làm.

Đây là một pattern nền tảng và cực kỳ quan trọng, là trái tim của rất nhiều hệ thống multi-thread phức tạp.

*Until then, keep coding!*
