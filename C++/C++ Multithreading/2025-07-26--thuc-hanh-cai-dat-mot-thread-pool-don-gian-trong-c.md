---
title: 'Thực Hành: Cài Đặt Một Thread Pool Đơn Giản trong C++'
date: '2025-07-26 17:26:46'
date_gmt: '2025-07-26 10:26:46'
modified: '2025-07-26 17:32:48'
status: publish
slug: thuc-hanh-cai-dat-mot-thread-pool-don-gian-trong-c
wordpress_id: 317
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/thuc-hanh-cai-dat-mot-thread-pool-don-gian-trong-c/
categories:
- C++ Multithreading
tags: []
---

Trong bài học trước, chúng ta đã tìm hiểu về khái niệm và kiến trúc của một **Thread Pool**. Giờ là lúc biến lý thuyết đó thành code. Chúng ta sẽ cùng nhau xây dựng một lớp `ThreadPool` đơn giản nhưng đầy đủ chức năng, sử dụng lại lớp `ConcurrentQueue` mà chúng ta đã tạo ra trước đó.

> **Tin vui bên lề:** Ủy ban Tiêu chuẩn C++ đang làm việc để đưa một phiên bản `concurrent_queue` vào thư viện chuẩn, có thể sẽ xuất hiện trong C++26. Nhưng trong lúc chờ đợi, việc tự xây dựng các công cụ này là một bài thực hành tuyệt vời!

---

### Phần 1: Thiết Kế Lớp `ThreadPool`

Kiến trúc của chúng ta sẽ bám sát mô hình "Typing Pool":

- **Các worker thread**: Một `std::vector<std::thread>` với số lượng thread cố định.
- **Hàng đợi tác vụ**: Một `ConcurrentQueue` để nhận các công việc được giao.
- **Tác vụ (Task)**: Chúng ta sẽ định nghĩa một tác vụ là một `std::function<void()>`, cho phép người dùng gửi bất kỳ callable object nào (hàm, lambda,...) không nhận tham số và không trả về giá trị.

**Giao diện lớp `ThreadPool`:**

C++

```
class ThreadPool {
public:
    ThreadPool(); // Constructor
    ~ThreadPool(); // Destructor

    // Giao việc cho pool
    void submit(std::function<void()> task);

private:
    // Hàm mà mỗi worker thread sẽ chạy
    void worker();

    std::vector<std::thread> m_threads;
    ConcurrentQueue<std::function<void()>> m_queue;
};
```

---

### Phần 2: Cài Đặt Chi Tiết

#### a) Constructor và Destructor

- **Constructor**: Sẽ xác định số lượng worker thread tối ưu (`hardware_concurrency`), sau đó khởi tạo và cho chúng chạy hàm `worker()`.
- **Destructor**: Sẽ `join()` tất cả các worker thread để đảm bảo chương trình kết thúc một cách sạch sẽ.

C++

```
#include <vector>
#include <thread>
#include <functional>
// #include "ConcurrentQueue.h" // Giả sử queue của chúng ta ở đây

ThreadPool::ThreadPool() {
    // Lấy số core và trừ đi 1 cho main thread/OS
    unsigned const thread_count = std::thread::hardware_concurrency() - 1;

    for (unsigned i = 0; i < thread_count; ++i) {
        // Khởi tạo mỗi thread và cho nó chạy hàm worker()
        m_threads.emplace_back(&ThreadPool::worker, this);
    }
}

ThreadPool::~ThreadPool() {
    // Chờ tất cả các thread hoàn thành
    for (auto& t : m_threads) {
        t.join();
    }
}
```

#### b) `submit()` - Giao Việc

Phương thức này rất đơn giản, nó chỉ cần đẩy tác vụ mà người dùng gửi vào `ConcurrentQueue`.

C++

```
void ThreadPool::submit(std::function<void()> task) {
    m_queue.push(task);
}
```

#### c) `worker()` - Vòng Lặp Bất Tận

Đây là "trái tim" của Thread Pool. Mỗi worker thread sẽ chạy hàm này trong một vòng lặp vô tận.

C++

```
void ThreadPool::worker() {
    while (true) {
        std::function<void()> task;
        // Lấy task từ queue. Hàm pop() sẽ block nếu queue rỗng.
        m_queue.pop(task);
        // Thực thi task
        task();
    }
}
```

---

### Phần 3: Chạy Thử Nghiệm

Hãy viết một chương trình `main` đơn giản để tạo một `ThreadPool` và giao cho nó 20 tác vụ.

C++

```
#include <iostream>
#include <chrono>

// Hàm task đơn giản
void simple_task(int id) {
    std::cout << "Task " << id << " bat dau boi thread " << std::this_thread::get_id() << std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(500));
    std::cout << "Task " << id << " ket thuc.\n";
}

int main() {
    ThreadPool pool;

    // Giao 20 task cho pool
    for (int i = 0; i < 20; ++i) {
        pool.submit([i]{ simple_task(i); });
    }

    std::cout << "Main: Da giao het 20 task. Chuong trinh se bi treo o day...\n";
    // Chương trình sẽ không thoát ra được vì destructor của pool đang chờ join() các thread
    // mà các thread thì đang kẹt trong vòng lặp vô tận.
    
    return 0;
}
```

Khi chạy, bạn sẽ thấy các ID thread khác nhau được tái sử dụng để thực thi các task khác nhau. Điều này chứng tỏ các thread đang được tái sử dụng thành công!

---

### Phần 4: Hạn Chế và Hướng Cải Thiện

Phiên bản `ThreadPool` của chúng ta đã hoạt động, nhưng nó có một lỗ hổng nghiêm trọng: **chương trình không bao giờ kết thúc!** Các worker thread bị kẹt trong vòng lặp `while(true)`, do đó destructor của `ThreadPool` sẽ chờ `join()` mãi mãi.

**Làm thế nào để sửa lỗi này?** (Đây là một bài tập thú vị cho bạn!)

1. Thêm một cờ `std::atomic<bool> m_done{false}` vào lớp `ThreadPool`.
2. Trong destructor, trước khi `join()`, hãy set `m_done = true;`.
3. Thay đổi điều kiện của `worker()` thành `while(!m_done)`.
4. **Vấn đề mới:** Nếu tất cả các worker đang bị block ở `m_queue.pop()`, chúng sẽ không bao giờ thấy được cờ `m_done` thay đổi.
5. **Giải pháp thực sự:** Trong destructor, sau khi set `m_done = true`, bạn cần phải "đánh thức" tất cả các worker đang ngủ dậy. Một cách đơn giản là `push` một số lượng "task rỗng" bằng với số lượng thread để đảm bảo chúng thoát khỏi `pop()` và kiểm tra lại điều kiện `while`.

---

Chúng ta đã xây dựng thành công một `ThreadPool` cơ bản, cho thấy sức mạnh của việc tái sử dụng thread. Tuy nhiên, nó vẫn còn hạn chế, ví dụ như chưa thể lấy kết quả trả về từ các task.

Trong bài học tiếp theo, chúng ta sẽ nâng cấp `ThreadPool` này để nó có thể làm việc với `std::packaged_task` và `std::future`, cho phép chúng ta không chỉ giao việc mà còn nhận lại kết quả.

*Until then, keep coding!*
