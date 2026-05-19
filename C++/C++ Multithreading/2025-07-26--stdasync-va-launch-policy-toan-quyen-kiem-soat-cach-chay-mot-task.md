---
title: 'std::async và Launch Policy: Toàn Quyền Kiểm Soát Cách Chạy Một Task'
date: '2025-07-26 16:33:43'
date_gmt: '2025-07-26 09:33:43'
modified: '2025-07-26 17:36:17'
status: publish
slug: stdasync-va-launch-policy-toan-quyen-kiem-soat-cach-chay-mot-task
wordpress_id: 277
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/stdasync-va-launch-policy-toan-quyen-kiem-soat-cach-chay-mot-task/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã ca ngợi `std::async` như một công cụ tiện lợi tối thượng. Nhưng có một câu hỏi quan trọng: `std::async` *quyết định* chạy tác vụ của chúng ta như thế nào? Liệu nó có luôn tạo ra một thread mới không?

Câu trả lời là: **không hẳn, và chúng ta có thể kiểm soát điều đó.** Cơ chế kiểm soát này được gọi là **Launch Policy**.

---

### Phần 1: Các "Launch Policy" Của `std::async`

Launch policy là một tham số tùy chọn (thường là tham số đầu tiên) bạn có thể truyền vào `std::async` để chỉ định chính xác cách thức thực thi tác vụ.

**a) `std::launch::async` - Bất Đồng Bộ Thực Sự 🚀**

- **Hành vi**: Đảm bảo tác vụ sẽ được chạy trên một **thread mới** (hoặc một thread trong một a thread pool nội bộ), thực sự chạy song song với thread gọi nó.
- **Thời điểm chạy**: Tác vụ bắt đầu chạy **ngay lập tức** sau khi `std::async` được gọi.
- **Cú pháp**: `auto f = std::async(std::launch::async, my_func);`

**b) `std::launch::deferred` - "Lười Biếng" Có Chủ Đích 🐢**

- **Hành vi**: Tác vụ **sẽ không chạy**. Nó bị trì hoãn (deferred).
- **Thời điểm chạy**: Tác vụ chỉ được thực thi khi và chỉ khi hàm `.get()` được gọi trên `future` tương ứng. Tác vụ sẽ chạy **đồng bộ (synchronously)** trên chính thread đã gọi `.get()`.
- **Cú pháp**: `auto f = std::async(std::launch::deferred, my_func);`

**c) Policy Mặc Định (Không truyền gì cả)**

- **Hành vi**: `std::launch::async | std::launch::deferred`.
- **Thời điểm chạy**: Cho phép **hệ thống tự quyết định**. Nó có thể tạo thread mới hoặc trì hoãn.
- **⚠️ Cảnh báo**: Policy mặc định này gây ra sự không chắc chắn. Bạn không thể biết trước liệu tác vụ của mình sẽ chạy song song hay bị trì hoãn. Điều này đặc biệt nguy hiểm nếu bạn đang sử dụng `thread_local` storage.

---

### Phần 2: Code Minh Họa

Hãy xem sự khác biệt qua một ví dụ in ra ID của thread thực thi tác vụ.

C++

```
#include <iostream>
#include <future>
#include <thread>

int task() {
    std::cout << "Task dang chay tren thread ID: " << std::this_thread::get_id() << std::endl;
    return 42;
}

int main() {
    std::cout << "Main thread ID: " << std::this_thread::get_id() << std::endl;
    
    // 1. Dùng std::launch::async
    std::future<int> f_async = std::async(std::launch::async, task);
    
    // 2. Dùng std::launch::deferred
    std::future<int> f_deferred = std::async(std::launch::deferred, task);
    
    std::cout << "Main: Goi .get() tren future cua deferred task...\n";
    // Lời gọi .get() này sẽ kích hoạt task chạy trên main thread
    int result_deferred = f_deferred.get(); 
    
    int result_async = f_async.get();
}
```

**Kết quả có thể có:**

```
Main thread ID: 0x16f167000
Task dang chay tren thread ID: 0x70000a6e9000  <-- ID khác, chạy ngay lập tức
Main: Goi .get() tren future cua deferred task...
Task dang chay tren thread ID: 0x16f167000  <-- ID giống, chỉ chạy khi .get() được gọi
```

---

### Phần 3: Khi Nào Nên Dùng Gì?

**Hãy dùng `std::launch::async` khi:**

- ✅ Bạn chắc chắn muốn chạy song song trên một thread khác để tận dụng CPU đa nhân.
- ✅ Bạn muốn tác vụ bắt đầu ngay lập tức.
- ✅ Bạn cần dùng `wait_for()` / `wait_until()` để kiểm tra tiến độ (vì `deferred` task sẽ không bao giờ "ready" nếu không có `.get()`).

**Hãy dùng `std::launch::deferred` khi:**

- ✅ Bạn muốn thực hiện lazy evaluation (chỉ tính toán khi thực sự cần kết quả).
- ✅ Bạn muốn tác vụ chạy trên thread gọi `.get()` thay vì tạo thread mới.
- ✅ Bạn muốn đảm bảo tác vụ vẫn được thực thi ngay cả khi hệ thống không thể tạo thêm thread mới.

> **Lời khuyên từ chuyên gia:** Luôn tường minh. Hãy luôn chỉ định rõ `std::launch::async` hoặc `std::launch::deferred` để tránh sự mơ hồ và làm cho hành vi của code trở nên dễ đoán.

---

### Ghi Chú Phụ: Giá Trị Trả Về Của `wait_for()`

Nhân tiện, hãy làm rõ giá trị trả về của `wait_for()` và `wait_until()`:

- **`std::future_status::ready`**: Kết quả đã sẵn sàng. Bạn có thể gọi `.get()` mà không bị block.
- **`std::future_status::timeout`**: Hết thời gian chờ mà kết quả vẫn chưa có.
- **`std::future_status::deferred`**: `future` này được liên kết với một task `deferred`. Nó sẽ không bao giờ "ready" cho đến khi `.get()` được gọi.

---

Launch policy cho chúng ta quyền kiểm soát sâu sắc đối với `std::async`. Bằng cách lựa chọn policy một cách tường minh, chúng ta có thể đảm bảo rằng các tác vụ bất đồng bộ của mình hoạt động chính xác như chúng ta mong đợi.

*Until then, keep coding!*
