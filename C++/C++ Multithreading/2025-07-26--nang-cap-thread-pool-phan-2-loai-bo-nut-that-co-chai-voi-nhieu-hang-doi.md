---
title: 'Nâng Cấp Thread Pool (Phần 2): Loại Bỏ "Nút Thắt Cổ Chai" với Nhiều Hàng Đợi'
date: '2025-07-26 17:28:06'
date_gmt: '2025-07-26 10:28:06'
modified: '2025-07-26 17:32:00'
status: publish
slug: nang-cap-thread-pool-phan-2-loai-bo-nut-that-co-chai-voi-nhieu-hang-doi
wordpress_id: 319
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/nang-cap-thread-pool-phan-2-loai-bo-nut-that-co-chai-voi-nhieu-hang-doi/
categories:
- C++ Multithreading
tags: []
---

Trong bài học trước, chúng ta đã xây dựng một `ThreadPool` đơn giản và hiệu quả. Tuy nhiên, kiến trúc đó có một điểm yếu tiềm ẩn: **một hàng đợi duy nhất**.

Bài viết này sẽ phân tích tại sao một hàng đợi duy nhất có thể trở thành "nút thắt cổ chai" về hiệu năng và sau đó tái cấu trúc `ThreadPool` của chúng ta để sử dụng một kiến trúc nhiều hàng đợi, giúp tăng khả năng song song.

---

### Phần 1: Vấn Đề "Nút Thắt Cổ Chai" Của Hàng Đợi Đơn

Hãy tưởng tượng một kịch bản với 8 worker thread và một `ConcurrentQueue` duy nhất. Khi cả 8 thread cùng lúc rảnh rỗi và muốn lấy task mới, chúng sẽ **cùng lúc tranh chấp** để `lock()` cái mutex bên trong hàng đợi.

Kết quả là, tại thời điểm lấy task, các thread của chúng ta không còn chạy song song nữa. Chúng phải **xếp hàng tuần tự** để lần lượt lấy task ra khỏi hàng đợi. Nếu thời gian chờ đợi để lấy được lock này là đáng kể so với thời gian thực thi task, hiệu năng của toàn bộ pool sẽ bị ảnh hưởng. Hàng đợi đơn đã trở thành một điểm nóng về tranh chấp (high contention bottleneck).

---

### Phần 2: Kiến Trúc Mới - Mỗi Thread Một Hàng Đợi

**Ý tưởng:** Để loại bỏ sự tranh chấp giữa các worker thread, chúng ta sẽ cung cấp cho **mỗi thread một hàng đợi riêng**.

- Khi một worker thread cần task mới, nó chỉ cần truy cập vào hàng đợi của chính mình mà không cần phải cạnh tranh với các worker khác.
- **Lưu ý:** Mutex trong mỗi hàng đợi vẫn cần thiết, vì thread `main` (hoặc các thread client khác) vẫn sẽ `push` task vào các hàng đợi này, tạo ra sự cạnh tranh giữa producer và consumer. Nhưng sự cạnh tranh giữa các worker thread với nhau đã được loại bỏ.

Kiến trúc mới của chúng ta sẽ trông như thế này:

Để phân phối các task đến từ người dùng vào các hàng đợi này, chúng ta sẽ cài đặt một bộ lập lịch (scheduler) đơn giản theo kiểu **"Round-Robin"**: task đầu tiên vào hàng đợi 0, task thứ hai vào hàng đợi 1,... cứ thế xoay vòng.

---

### Phần 3: Hiện Thực Hóa Thread Pool Nâng Cấp

Chúng ta sẽ sửa đổi lớp `ThreadPool` của mình.

**a) Thay Đổi Cấu Trúc Dữ Liệu:** Chúng ta thay thế một queue đơn bằng một mảng các queue và thêm một biến index để theo dõi cho scheduler.

C++

```
#include <vector>
#include <thread>
#include <functional>
#include <memory>    // Cho std::unique_ptr
#include <atomic>    // Cho std::atomic

// ... ConcurrentQueue<TaskType> ...

class ThreadPool {
private:
    using QueueType = ConcurrentQueue<std::function<void()>>;

    std::vector<std::thread> m_threads;
    // Dùng unique_ptr để quản lý một mảng các queue trên heap
    std::unique_ptr<QueueType[]> m_queues;
    std::atomic<unsigned> m_queue_index{0};
    unsigned m_thread_count;
    // ...
};
```

**b) Sửa Đổi Constructor:** Constructor giờ đây sẽ cấp phát mảng các queue và khi tạo thread, nó sẽ truyền ID để mỗi thread biết hàng đợi của mình là cái nào.

C++

```
ThreadPool::ThreadPool() {
    m_thread_count = std::thread::hardware_concurrency() - 1;
    m_queues = std::make_unique<QueueType[]>(m_thread_count);

    for (unsigned i = 0; i < m_thread_count; ++i) {
        // Truyền 'i' làm ID cho mỗi worker
        m_threads.emplace_back(&ThreadPool::worker, this, i);
    }
}
```

**c) `submit()` - Bộ Lập Lịch "Round-Robin":** Hàm `submit` giờ đây sẽ đẩy task vào hàng đợi tiếp theo trong vòng xoay.

C++

```
void ThreadPool::submit(std::function<void()> task) {
    // Lấy index của queue hiện tại và tăng nó lên cho lần submit tiếp theo
    unsigned current_queue = m_queue_index++;
    m_queues[current_queue % m_thread_count].push(task);
}
```

**d) `worker()` - Làm Việc Trên Hàng Đợi Riêng:** Mỗi worker giờ đây nhận một `id` và chỉ làm việc trên hàng đợi `m_queues[id]`.

C++

```
void ThreadPool::worker(unsigned my_id) {
    while (true) { // Vẫn là vòng lặp vô tận (tạm thời)
        std::function<void()> task;
        // Chỉ pop từ hàng đợi của chính mình
        m_queues[my_id].pop(task);
        task();
    }
}
```

---

### Phần 4: Đánh Giá và Một Vấn Đề Mới 🤔

**Thành quả:** Chúng ta đã thành công loại bỏ được "nút thắt cổ chai" khi các worker thread cùng tranh nhau lấy task. Dưới một tải trọng công việc lớn, kiến trúc này sẽ có hiệu năng tốt hơn.

**Vấn đề mới:** Thiết kế này lại làm nảy sinh một vấn đề khác - **sự mất cân bằng tải (load imbalance)**. Điều gì sẽ xảy ra nếu bộ lập lịch Round-Robin vô tình đẩy 10 tác vụ nặng vào Hàng đợi 0, trong khi Hàng đợi 1 và 2 lại trống không? Khi đó, Thread 0 sẽ phải làm việc cật lực, trong khi Thread 1 và 2 lại "ngồi chơi xơi nước". Toàn bộ pool sẽ hoạt động không hiệu quả.

---

Chúng ta đã tiến một bước dài trong việc tối ưu hóa `ThreadPool`. Tuy nhiên, để thực sự hiệu quả, một thread rảnh rỗi nên có khả năng "giúp đỡ" một thread đang bận rộn. Kỹ thuật này được gọi là **Work Stealing**.

Trong bài học tiếp theo, chúng ta sẽ nâng cấp `ThreadPool` một lần nữa với cơ chế Work Stealing để đạt được cả hai mục tiêu: độ tranh chấp thấp và hiệu suất sử dụng worker cao.

*Until then, keep coding!*
