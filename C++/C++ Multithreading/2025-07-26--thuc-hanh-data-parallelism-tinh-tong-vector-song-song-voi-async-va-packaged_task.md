---
title: 'Thực Hành Data Parallelism: Tính Tổng Vector Song Song với async và packaged_task'
date: '2025-07-26 16:54:44'
date_gmt: '2025-07-26 09:54:44'
modified: '2025-07-26 17:33:48'
status: publish
slug: thuc-hanh-data-parallelism-tinh-tong-vector-song-song-voi-async-va-packaged_task
wordpress_id: 285
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/thuc-hanh-data-parallelism-tinh-tong-vector-song-song-voi-async-va-packaged_task/
categories:
- C++ Multithreading
tags: []
---

Trong bài học trước, chúng ta đã tìm hiểu về các mẫu thiết kế parallelism. Giờ là lúc áp dụng một trong những mẫu phổ biến nhất—**Data Parallelism**—vào một bài toán thực tế: tính tổng tất cả các phần tử của một vector lớn.

Chúng ta sẽ hiện thực hóa giải pháp này bằng hai cách khác nhau: một lần với `std::async` tiện lợi và một lần với `std::packaged_task` linh hoạt hơn.

---

### Phần 1: Thiết Lập Bài Toán 📝

- **Mục tiêu**: Tính tổng các phần tử của một `std::vector<double>` chứa 10,000 số ngẫu nhiên.
- **Chiến lược (Data Parallelism)**:
  1. **Split**: Chia vector thành 4 phần bằng nhau.
  2. **Process**: Tạo 4 thread, mỗi thread sẽ tính tổng của một phần.
  3. **Reduce**: Cộng 4 kết quả riêng lẻ lại để có được tổng cuối cùng.
- **Hàm Tác Vụ (Task Function)**: Đây là công việc mà mỗi thread sẽ thực hiện. Chúng ta sẽ dùng `std::accumulate` để tính tổng cho một khoảng (range) được chỉ định.

C++

```
#include <numeric> // Cho std::accumulate
#include <vector>

// Task function nhận vào hai iterator (con trỏ) và tính tổng các phần tử giữa chúng
double sum_part(const double* start, const double* end) {
    return std::accumulate(start, end, 0.0);
}
```

---

### Phần 2: Hiện Thực với `std::async` - Nhanh và Gọn 🚀

`std::async` là công cụ lý tưởng cho các tác vụ song song đơn giản. Nó tự động quản lý thread và trả về `std::future` cho chúng ta.

C++

```
#include <future>
#include <vector>

double parallel_sum_async(const std::vector<double>& vec) {
    const size_t chunk_size = vec.size() / 4;
    const double* p = vec.data();

    // 1. SPLIT & PROCESS: Khởi chạy 4 task bất đồng bộ
    //    Chúng ta dùng std::launch::async để đảm bảo thread mới được tạo
    auto f1 = std::async(std::launch::async, sum_part, p, p + chunk_size);
    auto f2 = std::async(std::launch::async, sum_part, p + chunk_size, p + 2 * chunk_size);
    auto f3 = std::async(std::launch::async, sum_part, p + 2 * chunk_size, p + 3 * chunk_size);
    auto f4 = std::async(std::launch::async, sum_part, p + 3 * chunk_size, p + vec.size());

    // 2. REDUCE: Chờ và tổng hợp kết quả
    return f1.get() + f2.get() + f3.get() + f4.get();
}
```

**Phân tích**: Cách làm này cực kỳ gọn gàng. Toàn bộ sự phức tạp của việc tạo thread, promise, future đều được `std::async` ẩn đi.

---

### Phần 3: Hiện Thực với `std::packaged_task` - Linh Hoạt và Tường Minh 🛠️

`std::packaged_task` cho chúng ta nhiều quyền kiểm soát hơn. Chúng ta sẽ tự tay "đóng gói" task, lấy future, và khởi tạo thread.

C++

```
#include <future>
#include <vector>
#include <thread>

double parallel_sum_packaged_task(const std::vector<double>& vec) {
    const size_t chunk_size = vec.size() / 4;
    const double* p = vec.data();

    // Định nghĩa kiểu cho packaged_task
    using TaskType = double(const double*, const double*);

    // 1. Chuẩn bị các task và future
    std::packaged_task<TaskType> task1(sum_part);
    std::packaged_task<TaskType> task2(sum_part);
    std::packaged_task<TaskType> task3(sum_part);
    std::packaged_task<TaskType> task4(sum_part);

    std::future<double> f1 = task1.get_future();
    std::future<double> f2 = task2.get_future();
    std::future<double> f3 = task3.get_future();
    std::future<double> f4 = task4.get_future();

    // 2. PROCESS: Khởi tạo các thread và move task vào
    std::thread t1(std::move(task1), p, p + chunk_size);
    std::thread t2(std::move(task2), p + chunk_size, p + 2 * chunk_size);
    std::thread t3(std::move(task3), p + 2 * chunk_size, p + 3 * chunk_size);
    std::thread t4(std::move(task4), p + 3 * chunk_size, p + vec.size());
    
    // Phải join() các thread
    t1.join();
    t2.join();
    t3.join();
    t4.join();

    // 3. REDUCE: Tổng hợp kết quả
    return f1.get() + f2.get() + f3.get() + f4.get();
}
```

**Phân tích**: Code dài hơn đáng kể, nhưng nó cho thấy rõ từng bước: chuẩn bị task, lấy future, tạo thread, và cuối cùng là tổng hợp kết quả. Sự tách biệt giữa việc tạo task và thực thi task này chính là sức mạnh của `std::packaged_task`.

---

Cả hai phương pháp trên đều hiện thực hóa thành công pattern Data Parallelism và cho ra cùng một kết quả chính xác.

- **`std::async`** là lựa chọn tuyệt vời cho các tác vụ song song đơn giản, nơi sự tiện lợi được đặt lên hàng đầu.
- **`std::packaged_task`** là khối xây dựng (building block) tốt hơn cho các hệ thống phức tạp, nơi bạn cần kiểm soát nhiều hơn đối với việc thực thi task, ví dụ như trong một thread pool.

Tuy nhiên, cả hai cách làm trên đều đòi hỏi chúng ta phải tự tay chia dữ liệu. Sẽ ra sao nếu Thư viện Chuẩn C++ có thể làm tất cả những việc này cho chúng ta? Trong bài học tiếp theo, chúng ta sẽ khám phá các thuật toán song song của C++17, thứ làm cho Data Parallelism trở nên đơn giản đến không ngờ.

*Until then, keep coding!*
