---
title: 'Xây Dựng ConcurrentQueue (Phần 1): Nền Tảng với Mutex và Exception'
date: '2025-07-26 17:23:19'
date_gmt: '2025-07-26 10:23:19'
modified: '2025-07-26 17:32:59'
status: publish
slug: xay-dung-concurrentqueue-phan-1-nen-tang-voi-mutex-va-exception
wordpress_id: 311
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/xay-dung-concurrentqueue-phan-1-nen-tang-voi-mutex-va-exception/
categories:
- C++ Multithreading
tags: []
---

Queue (hàng đợi) là một cấu trúc dữ liệu nền tảng trong lập trình multi-thread. Nó hoạt động như một "băng chuyền", cho phép các thread producer sản xuất công việc và đưa vào hàng đợi, trong khi các thread consumer lấy công việc ra để xử lý, theo nguyên tắc First-In, First-Out (FIFO).

Một câu hỏi tự nhiên là: "Tại sao chúng ta không dùng luôn `std::queue` và bọc nó trong một `std::mutex`?". Bài viết này sẽ giải thích tại sao cách làm đó là chưa đủ và sẽ hướng dẫn bạn xây dựng phiên bản `ConcurrentQueue` đầu tiên, an toàn nhưng vẫn còn cơ bản.

---

### Phần 1: Tại Sao `std::queue` Không Phù Hợp?

Lớp `std::queue` trong thư viện chuẩn có 3 vấn đề lớn khi sử dụng trong môi trường multi-thread:

1. **Không có đồng bộ hóa**: Giống như mọi container STL khác, nó không được thiết kế để an toàn cho thread.
2. **`pop()` trên queue rỗng là Undefined Behavior**: Cố gắng lấy phần tử từ một hàng đợi rỗng sẽ gây ra hành vi không xác định, thường là crash chương trình.
3. **Race Condition giữa `front()` và `pop()`**: Để lấy ra một phần tử, bạn phải gọi hai hàm: `front()` để lấy giá trị và `pop()` để xóa nó. Một thread khác hoàn toàn có thể xen vào giữa hai lời gọi này, dẫn đến việc bạn có thể lấy ra một giá trị nhưng lại xóa đi một giá trị khác, hoặc truy cập vào một phần tử đã bị thread khác xóa mất.

---

### Phần 2: Thiết Kế Lớp `ConcurrentQueue`

Để giải quyết các vấn đề trên, chúng ta sẽ xây dựng một lớp bao bọc (wrapper class) theo Monitor Pattern.

- **Thành phần**:
  - `std::queue<T>`: Để lưu trữ dữ liệu.
  - `std::mutex`: Để bảo vệ queue khỏi Data Race (sử dụng Coarse-Grained Locking).
  - Một biến `max_size` để giới hạn kích thước của queue.
- **Giao diện (Interface)**:
  - `push(T value)`: Thêm một phần tử. Sẽ ném ra exception nếu queue đầy.
  - `pop(T& value)`: Lấy ra một phần tử. Sẽ ném ra exception nếu queue rỗng.
- **Quy tắc đặc biệt**: Chúng ta sẽ xóa các hàm copy và move constructor/assignment để đảm bảo rằng `ConcurrentQueue` là một đối tượng duy nhất được chia sẻ, không thể bị sao chép hay di chuyển nhầm.

---

### Phần 3: Hiện Thực Hóa Chi Tiết

Đây là code cài đặt cho lớp `ConcurrentQueue` của chúng ta.

C++

```
#include <queue>
#include <mutex>
#include <stdexcept>

// Các lớp exception tùy chỉnh
struct QueueEmptyException : public std::exception {
    const char* what() const noexcept override { return "ConcurrentQueue is empty!"; }
};
struct QueueFullException : public std::exception {
    const char* what() const noexcept override { return "ConcurrentQueue is full!"; }
};

template <typename T>
class ConcurrentQueue {
private:
    std::queue<T> m_queue;
    mutable std::mutex m_mtx;
    size_t m_max_size;

public:
    ConcurrentQueue(size_t max_size = 50) : m_max_size(max_size) {}

    // Xóa các hàm special member
    ConcurrentQueue(const ConcurrentQueue&) = delete;
    ConcurrentQueue& operator=(const ConcurrentQueue&) = delete;

    void push(const T& item) {
        std::lock_guard<std::mutex> lock(m_mtx);
        if (m_queue.size() >= m_max_size) {
            throw QueueFullException();
        }
        m_queue.push(item);
    }

    void pop(T& item) {
        std::lock_guard<std::mutex> lock(m_mtx);
        if (m_queue.empty()) {
            throw QueueEmptyException();
        }
        item = m_queue.front();
        m_queue.pop();
    }
};
```

---

### Phần 4: Thử Nghiệm với Reader và Writer

Hãy dùng `std::async` để tạo ra một writer thread (đẩy dữ liệu vào) và một reader thread (lấy dữ liệu ra) và xem `ConcurrentQueue` hoạt động như thế nào, đặc biệt là khi có lỗi.

C++

```
#include <future>
#include <iostream>

ConcurrentQueue<int> g_queue(50);

void writer_task() {
    for (int i = 0; i < 60; ++i) { // Cố gắng đẩy 60 phần tử vào queue chỉ có 50 chỗ
        std::cout << "Dang push " << i << std::endl;
        g_queue.push(i);
    }
}

void reader_task() {
    int val;
    std::this_thread::sleep_for(std::chrono::seconds(2)); // Chờ writer push xong
    for (int i = 0; i < 50; ++i) {
        g_queue.pop(val);
        std::cout << "Da pop " << val << std::endl;
    }
}

int main() {
    auto future_writer = std::async(std::launch::async, writer_task);
    auto future_reader = std::async(std::launch::async, reader_task);

    try {
        future_writer.get();
    } catch(const std::exception& e) {
        std::cerr << "Writer thread da nem exception: " << e.what() << std::endl;
    }

    try {
        future_reader.get();
    } catch(const std::exception& e) {
        std::cerr << "Reader thread da nem exception: " << e.what() << std::endl;
    }
    return 0;
}
```

Khi chạy code trên, bạn sẽ thấy `writer_task` ném ra `QueueFullException` sau khi đã đẩy 50 phần tử. Tương tự, nếu `reader_task` cố gắng `pop` từ một queue rỗng, nó sẽ ném `QueueEmptyException`.

---

### Lời Kết và Hạn Chế

Chúng ta đã xây dựng thành công một `ConcurrentQueue` cơ bản, thread-safe. Nó an toàn vì mọi truy cập đều được bảo vệ bởi mutex, và nó giao tiếp lỗi một cách rõ ràng qua exception.

Tuy nhiên, mô hình này có một hạn chế lớn: nó **không hiệu quả**.

- Khi queue rỗng, thread reader phải `pop`, bắt exception, rồi lại thử lại trong một vòng lặp. Đây chính là một dạng **polling** kém hiệu quả.
- Tương tự với writer khi queue đầy.

Sẽ tốt hơn biết bao nếu thread reader có thể "ngủ" một cách yên bình khi queue rỗng, và chỉ được "đánh thức" dậy bởi thread writer khi có một phần tử mới được đẩy vào? Đây chính là bài toán hoàn hảo cho **`std::condition_variable`**.

Trong bài học tiếp theo, chúng ta sẽ nâng cấp `ConcurrentQueue` để trở thành một hàng đợi blocking thực sự hiệu quả.

*Until then, keep coding!*
