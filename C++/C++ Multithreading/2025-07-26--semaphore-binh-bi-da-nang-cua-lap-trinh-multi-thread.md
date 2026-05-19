---
title: 'Semaphore: "Bình Bi" Đa Năng Của Lập Trình Multi-thread'
date: '2025-07-26 17:22:15'
date_gmt: '2025-07-26 10:22:15'
modified: '2025-07-26 17:33:03'
status: publish
slug: semaphore-binh-bi-da-nang-cua-lap-trinh-multi-thread
wordpress_id: 309
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/semaphore-binh-bi-da-nang-cua-lap-trinh-multi-thread/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã học về `mutex` để khóa độc quyền và `condition_variable` để chờ đợi và thông báo. Bây giờ, chúng ta sẽ tìm hiểu về **Semaphore**, một cơ chế đồng bộ hóa ở mức độ cao hơn, có thể được xem như sự kết hợp và tổng quát hóa của cả hai khái niệm trên.

---

### Phần 1: Khái Niệm - "Bình Bi Ve" 🔮

Cách dễ nhất để hình dung một semaphore là hãy tưởng tượng nó như một cái **bình thủy tinh chứa các viên bi ve**.

- **Cái bình**: Chính là đối tượng semaphore.
- **Số bi trong bình**: Là một bộ đếm (counter) nội bộ, đại diện cho số lượng tài nguyên đang có sẵn.
- **`acquire()` (Lấy bi)**: Một thread muốn sử dụng một tài nguyên. Nó sẽ cố gắng **lấy một viên bi** ra khỏi bình. Thao tác này làm **giảm bộ đếm đi 1**. Nếu bình rỗng (bộ đếm bằng 0), thread phải **chờ (block)** cho đến khi có bi.
- **`release()` (Bỏ bi vào)**: Một thread đã sử dụng xong và trả lại tài nguyên. Nó sẽ **bỏ một viên bi** vào bình. Thao tác này **tăng bộ đếm lên 1** và có thể sẽ **đánh thức** một thread đang chờ.

---

### Phần 2: Cài Đặt Semaphore "Cây Nhà Lá Vườn"

Trước C++20, chúng ta phải tự cài đặt semaphore. Một cách làm phổ biến là sử dụng `std::mutex` và `std::condition_variable`.

C++

```
#include <mutex>
#include <condition_variable>

class Semaphore {
private:
    std::mutex mtx;
    std::condition_variable cv;
    int count;

public:
    Semaphore(int initial_count = 0) : count(initial_count) {}

    void acquire() {
        std::unique_lock<std::mutex> lock(mtx);
        // Chờ cho đến khi count > 0
        cv.wait(lock, [this]{ return count > 0; });
        --count;
    }

    void release() {
        std::lock_guard<std::mutex> lock(mtx);
        ++count;
        cv.notify_one(); // Đánh thức một thread đang chờ
    }
};
```

---

### Phần 3: Các "Hương Vị" và Ứng Dụng Của Semaphore

Semaphore cực kỳ linh hoạt và có thể được dùng trong nhiều vai trò khác nhau.

#### a) Counting Semaphore (Semaphore Đếm)

Đây là trường hợp tổng quát, khi bộ đếm có thể lớn hơn 1. Nó được dùng để kiểm soát quyền truy cập vào một **nhóm các tài nguyên giống hệt nhau** (a pool of resources). Ví dụ, một hệ thống có 4 cổng kết nối database, một counting semaphore với giá trị ban đầu là 4 sẽ đảm bảo rằng tại một thời điểm chỉ có tối đa 4 thread được phép lấy kết nối.

#### b) Binary Semaphore (Semaphore Nhị Phân)

Đây là trường hợp đặc biệt khi bộ đếm chỉ có thể là 0 hoặc 1. Nó có hai ứng dụng chính:

**1. Thay thế cho Mutex:** Một binary semaphore có thể hoạt động như một `mutex`.

- `acquire()` ↔️ `lock()`
- `release()` ↔️ `unlock()` Một thread gọi `acquire()` để vào critical section (làm bộ đếm từ 1 xuống 0). Các thread khác gọi `acquire()` sẽ phải chờ. Sau khi xong việc, thread đó gọi `release()` (làm bộ đếm từ 0 lên 1) để cho thread khác vào.

**2. Thay thế cho Condition Variable (Cơ chế Tín hiệu):** Đây là cách dùng phổ biến hơn.

- Một thread (Consumer) gọi `acquire()` để chờ một sự kiện/tín hiệu.
- Một thread **khác** (Producer) gọi `release()` để gửi tín hiệu, đánh thức Consumer dậy.

**Ưu điểm so với `condition_variable`:** Semaphore cho phép kiểm soát "liều lượng" tín hiệu. Với CV, bạn chỉ có thể `notify_one()` hoặc `notify_all()`. Với semaphore, nếu bạn muốn đánh thức chính xác 3 thread, bạn chỉ cần gọi `release()` 3 lần.

---

### Phần 4: `std::counting_semaphore` trong C++20

Tin vui là từ C++20, chúng ta không cần phải tự cài đặt nữa. Thư viện chuẩn đã cung cấp `std::counting_semaphore` và `std::binary_semaphore` trong header `<semaphore>`.

Quan trọng hơn, phiên bản chuẩn có thể được cài đặt một cách hiệu quả hơn nhiều, thường là dùng `std::atomic` thay vì `mutex` và `condition_variable`, giúp mang lại hiệu năng tốt hơn trong các kịch bản có độ tranh chấp cao.

---

Semaphore là một công cụ đồng bộ hóa cổ điển, linh hoạt và mạnh mẽ. Nó là một khái niệm trừu tượng hóa ở mức cao hơn, có thể được dùng để mô hình hóa nhiều bài toán concurrency phức tạp, từ việc khóa đơn giản cho đến quản lý một nhóm tài nguyên.

*Until then, keep coding!*
