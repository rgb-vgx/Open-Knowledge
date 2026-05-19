---
title: 'Asynchronous Programming 4: Asynchronous vs Multithreading?'
date: '2025-10-18 02:16:49'
date_gmt: '2025-10-17 19:16:49'
modified: '2025-10-18 02:16:49'
status: publish
slug: asynchronous-programming-4-asynchronous-vs-multithreading
wordpress_id: 383
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/18/asynchronous-programming-4-asynchronous-vs-multithreading/
categories:
- Uncategorized
tags: []
---

- **Asynchronous (bất đồng bộ)** là **tư duy thiết kế**: chia công việc thành **task** độc lập, sắp xếp/điều phối bằng **event loop / queue / callback / timer**, tránh chặn (non-blocking), vẫn **có thể** chỉ dùng **một luồng**.
- **Multithreading (đa luồng)** là **kỹ thuật thực thi**: chạy nhiều **thread** song song để làm **task** nhanh hơn (song hành phần cứng).
- Một chương trình **single-thread** hoàn toàn **có thể** là **asynchronous**. Và ngược lại: chương trình đa luồng vẫn có thể… đồng bộ (nếu mỗi thread chờ xong mới nhường).

---

## 1) Khái niệm cốt lõi: **Task vs Thread**

- **Task**: Một “đơn vị công việc” (xử lý 10 gói mạng, chạy callback của timer, render một frame UI, ghi log…).
- **Thread**: Một “người công nhân” thực thi CPU.
- **Asynchronous** tổ chức **luồng công việc** (task flow).
- **Multithreading** tổ chức **tài nguyên thực thi** (threads).

**Hệ quả**

- Viết **đa luồng** => *có thể* bất đồng bộ, nhưng chưa chắc.
- Viết **bất đồng bộ** => *có thể* một luồng hoặc nhiều luồng.

---

## 2) Bốn mô hình điển hình

### 2.1. Synchronous + Single Thread

```
[Task1 ---------done][Task2 ---------done][Task3 ---done]  
       (chờ)                (chờ)              (chờ)
```

Mọi việc chạy **tuần tự**, luôn **chờ** bước trước.

### 2.2. Synchronous + Multi Thread

```
Thread A: [Task1 ---------done]   
Thread B: [Task2 ---------done]  
Thread C: [Task3 ---------done]
```

- Nhiều thread **nhưng** mỗi thread vẫn xử lý **một việc đến hết** rồi mới thôi (ít/có blocking).
- Tăng throughput nhờ song song phần cứng, nhưng **logic vẫn đồng bộ** trong phạm vi từng thread.

### 2.3. Asynchronous + Single Thread ✅ *điểm nhấn của bài*

```
Loop:[T1(part)]→[T2(part)]→[T1(part)]→[T3(part)]→[T2(finish)]→...
```

**Một luồng duy nhất**, liên tục **chuyển ngữ cảnh** giữa các task **không blocking** (cooperative).

Dựa vào **event loop / dispatch queue / timers / I/O events**.

---

### 2.4. Asynchronous + Multi Thread

- Nhiều thread, mỗi thread lại **điều phối task** theo kiểu async như trên (kết hợp thread-pool, work-stealing…).
- **Phức tạp** hơn (đồng bộ dữ liệu, contention, cache misses, false sharing, v.v.).

---

## 3) Vì sao một luồng vẫn “bất đồng bộ” được?

Vì **asynchronous** là **cách chia nhỏ công việc** và **quy tắc không chặn**:

- Tách công việc lớn thành **nhiều bước nhỏ (chunk)**.
- Mỗi lần xử lý **một phần nhỏ** rồi **trả lại quyền điều phối** cho event loop.
- I/O, timer, tín hiệu mạng… **đều kích hoạt** task tiếp theo thông qua **callback/event**.

Lợi ích:

- UI/CLI **không treo**.
- Tối đa hóa **tính đáp ứng**.
- Tránh “lạm dụng mutex” khi thật ra bạn **không cần** nhiều thread.

---

## 4) Mini-library: **Event Loop** một luồng (C++17)

> Mục tiêu: Cho bạn một khung tối giản để chạy **task**, **timer** và **chuỗi tác vụ không chặn**.  
> Bạn có thể paste code, build nhanh với `-std=c++17 -O2`.

```
// event_loop.hpp
#pragma once
#include <queue>
#include <functional>
#include <chrono>
#include <atomic>
#include <vector>
#include <iostream>

class EventLoop {
public:
    using Task = std::function<void()>;
    using Clock = std::chrono::steady_clock;
    using Ms = std::chrono::milliseconds;

    void post(Task t) {
        tasks_.push(std::move(t));
    }

    void postDelayed(Task t, Ms delay) {
        timers_.push(Timer{Clock::now() + delay, std::move(t)});
    }

    void stop() { running_ = false; }

    void run() {
        running_ = true;
        while (running_) {
            // 1) Kích hoạt timer đến hạn
            while (!timers_.empty() && timers_.top().when <= Clock::now()) {
                tasks_.push(std::move(timers_.top().t));
                timers_.pop();
            }

            // 2) Chạy một task (nếu có)
            if (!tasks_.empty()) {
                Task t = std::move(tasks_.front());
                tasks_.pop();
                t(); // không nên block lâu trong này
                continue;
            }

            // 3) Không có task sẵn: ngủ ngắn để tránh bận CPU
            if (!timers_.empty()) {
                auto now = Clock::now();
                auto wakeAt = timers_.top().when;
                if (wakeAt > now) {
                    std::this_thread::sleep_for(std::min(Ms(1), 
                        std::chrono::duration_cast<Ms>(wakeAt - now)));
                }
            } else {
                std::this_thread::sleep_for(Ms(1));
            }
        }
    }

private:
    struct Timer {
        Clock::time_point when;
        Task t;
    };
    struct Cmp {
        bool operator()(const Timer& a, const Timer& b) const {
            return a.when > b.when; // min-heap
        }
    };

    std::queue<Task> tasks_;
    std::priority_queue<Timer, std::vector<Timer>, Cmp> timers_;
    std::atomic<bool> running_{false};
};
```

---

## 5) Ví dụ 1: Tính **tổng** và **tích** một mảng — *asynchronous, single-thread*

- Chúng ta chia mỗi tác vụ thành **bước nhỏ 100 phần tử** rồi **tự lên lịch lại** (self-reschedule).
- Hai tác vụ **đan xen** nhau trên **một event loop duy nhất** mà **không block**.

```
// main.cpp
#include "event_loop.hpp"
#include <thread>
#include <numeric>

struct SumState {
    const std::vector<int>& a;
    size_t i = 0;
    long long acc = 0;
    explicit SumState(const std::vector<int>& arr) : a(arr) {}
};

struct ProdState {
    const std::vector<int>& a;
    size_t i = 0;
    long double acc = 1.0L; // tránh overflow sớm, demo thôi
    explicit ProdState(const std::vector<int>& arr) : a(arr) {}
};

int main() {
    std::vector<int> data(10'000, 2); // 10k số 2
    EventLoop loop;

    auto sum = std::make_shared<SumState>(data);
    auto prod = std::make_shared<ProdState>(data);

    // Bước xử lý 100 phần tử rồi tự post lại chính mình
    std::function<void()> sumStep, prodStep;

    sumStep = [sum, &loop]() {
        size_t chunk = 100;
        size_t end = std::min(sum->i + chunk, sum->a.size());
        for (; sum->i < end; ++sum->i) sum->acc += sum->a[sum->i];

        if (sum->i < sum->a.size()) {
            loop.post(sumStep); // còn việc -> chạy tiếp sau
        } else {
            std::cout << "[SUM DONE] acc = " << sum->acc << "\n";
        }
    };

    prodStep = [prod, &loop]() {
        size_t chunk = 100;
        size_t end = std::min(prod->i + chunk, prod->a.size());
        for (; prod->i < end; ++prod->i) prod->acc *= prod->a[prod->i];

        if (prod->i < prod->a.size()) {
            loop.post(prodStep);
        } else {
            std::cout << "[PROD DONE] acc (approx) = " << (double)prod->acc << "\n";
        }
    };

    // Lên lịch khởi động
    loop.post(sumStep);
    loop.post(prodStep);

    // Demo timer: in nhịp “tick” mỗi 200ms trong 1s
    int ticks = 0;
    std::function<void()> tick = [&]() {
        std::cout << "tick #" << ++ticks << "\n";
        if (ticks < 5) loop.postDelayed(tick, EventLoop::Ms(200));
    };
    loop.postDelayed(tick, EventLoop::Ms(200));

    // Dừng sau 2 giây (demo)
    loop.postDelayed([&loop]() { loop.stop(); }, EventLoop::Ms(2000));

    loop.run();
    return 0;
}
```

**Điểm đáng chú ý**

- **Không dùng thread phụ**. Vẫn đan xen nhiều **task** → bất đồng bộ một luồng.
- **Không chặn**: mỗi “bước” làm rất ngắn, trả quyền cho loop ngay.
- **Timer** cho thấy cách xử lý tác vụ nền (nhịp “tick”) song song với tính toán.

> Thực tế, bạn sẽ thay `std::this_thread::sleep_for` bằng **poll I/O** (epoll/kqueue/IOCP), hoặc binding như **Boost.Asio**, **libuv**, **Qt QEventLoop**, v.v. để đạt non-blocking I/O thực sự.

---

## 6) Khi nào dùng Async? Khi nào cần Multi-thread?

**Chọn Async (single-thread) nếu:**

- Ứng dụng **I/O-bound**, nhiều sự kiện (socket, timer, UI).
- Cần **đáp ứng mượt** (UI/CLI không treo).
- Muốn **đơn giản hóa chia sẻ dữ liệu** (tránh mutex, race).

**Thêm Multithreading nếu:**

- Bài toán **CPU-bound nặng** (nén/giải nén, render, ML inference…).
- Cần tận dụng **đa lõi** thật sự.
- Sẵn sàng xử lý **đồng bộ dữ liệu** (mutex/lock-free) và độ phức tạp đi kèm.

---

## 7) Bản mở rộng: từ **Async Single-thread** → **Async Multi-thread**

- Tạo **thread-pool**, mỗi worker chạy **event loop riêng** hoặc dùng **hàng đợi dùng chung** (MPSC/SPMC).
- **Dispatch** task CPU-bound sang pool, còn I/O-bound giữ ở **loop chính**.
- Thiết kế **message passing** giữa loop và workers để tránh chia sẻ bộ nhớ trực tiếp.

> Quy tắc vàng: **chia nhỏ – không chặn – truyền thông qua thông điệp (message)**.

---

## 8) Checklist thiết kế

- Task được **chia nhỏ** (mỗi bước xử lý ngắn).
- Không `sleep` dài hay `read()` blocking trong callback.
- I/O qua **non-blocking + event** (hoặc lib hỗ trợ).
- Có **timeout / retry / backoff** cho tác vụ nền.
- Log theo **task-id / correlation-id** để debug dễ.
- Nếu thêm multi-thread → xác định **vùng dữ liệu sở hữu** + **biên truyền thông điệp**.

---

## 9) Kết luận

- **Asynchronous** là cách tối ưu **dòng chảy công việc**; **multithreading** là cách tối ưu **tài nguyên chạy**.
- Kết hợp khéo léo hai tư duy, bạn sẽ có **hệ thống responsive, scalable, và dễ kiểm soát**.

---


---
