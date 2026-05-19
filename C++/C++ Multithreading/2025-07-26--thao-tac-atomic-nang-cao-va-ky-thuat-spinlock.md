---
title: Thao Tác Atomic Nâng Cao và Kỹ Thuật "Spinlock"
date: '2025-07-26 16:00:01'
date_gmt: '2025-07-26 09:00:01'
modified: '2025-07-26 17:36:44'
status: publish
slug: thao-tac-atomic-nang-cao-va-ky-thuat-spinlock
wordpress_id: 261
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/thao-tac-atomic-nang-cao-va-ky-thuat-spinlock/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã biết `std::atomic` có thể làm cho các thao tác đơn giản như `++` trở nên thread-safe. Trong bài viết này, chúng ta sẽ khám phá thêm các phương thức mạnh mẽ khác của `std::atomic` và dùng một loại atomic đặc biệt, `std::atomic_flag`, để xây dựng một cơ chế khóa gọi là "Spinlock".

---

### Phần 1: Khám Phá Giao Diện của `std::atomic`

Ngoài các toán tử gán và `++`/`--` quen thuộc, `std::atomic` còn cung cấp các phương thức tường minh và mạnh mẽ hơn:

- **`store(value)`** và **`load()`**:
  - `atomic_var.store(10);` // Tương đương `atomic_var = 10;`
  - `int val = atomic_var.load();` // Tương đương `int val = atomic_var;`
  - Sử dụng `store` và `load` giúp code trở nên rõ ràng hơn, nhấn mạnh rằng đây là một thao tác atomic.
- **`exchange(value)`**: Thao tác Read-Modify-Write mạnh mẽ. Nó gán một giá trị mới cho biến atomic và trả về giá trị **cũ** của biến đó, tất cả trong một bước nguyên tử.C++`std::atomic<int> x{5}; int old_val = x.exchange(10); // x bây giờ là 10, old_val là 5`
- **Các Chuyên Biệt Hóa (Specializations)**: Đối với các kiểu số nguyên và con trỏ, `std::atomic` còn có các phương thức tiện ích khác như `fetch_add`, `fetch_sub` và các toán tử logic bitwise (`|=`, `&=`, `^=`).

---

### Phần 2: `std::atomic_flag` và Kỹ Thuật Spinlock 🔁

`std::atomic_flag` là loại atomic đơn giản nhất, nguyên thủy nhất và được đảm bảo là lock-free trên mọi nền tảng. Nó về cơ bản là một cờ boolean atomic.

- Nó phải được khởi tạo bằng macro `ATOMIC_FLAG_INIT`.
- Phương thức quan trọng nhất của nó là `test_and_set()`. Thao tác này làm hai việc một cách nguyên tử: **set cờ thành `true`** và **trả về giá trị *trước đó* của cờ**.

Với `std::atomic_flag`, chúng ta có thể xây dựng một **Spinlock**.

**Spinlock là gì?** Khác với `std::mutex` sẽ đưa thread vào trạng thái ngủ (blocked/sleeping) nếu không lấy được khóa, một spinlock sẽ khiến thread **chờ đợi một cách chủ động** bằng cách "quay" (spin) trong một vòng lặp `while` rỗng, liên tục kiểm tra xem khóa đã được mở hay chưa.

**Hiện thực Spinlock:**

C++

```
#include <atomic>
#include <thread>
#include <vector>
#include <iostream>

// Khởi tạo cờ spinlock
std::atomic_flag lock_stream = ATOMIC_FLAG_INIT;

void task(int id) {
    // "Quay" cho đến khi test_and_set() trả về false
    // (nghĩa là cờ trước đó là false và chúng ta là người đầu tiên set nó)
    while (lock_stream.test_and_set(std::memory_order_acquire)) {
        // Vòng lặp bận-chờ (busy-wait), không làm gì cả
    }

    // --- Critical Section Bắt Đầu ---
    std::cout << "Thread " << id << " dang o trong critical section.\n";
    // --- Critical Section Kết Thúc ---

    // Mở khóa
    lock_stream.clear(std::memory_order_release);
}
```

Khi chạy code với nhiều thread, bạn sẽ thấy output không bị xáo trộn. Spinlock đã đồng bộ hóa thành công các thread.

---

### Phần 3: Spinlock vs. Mutex - Sự Đánh Đổi

Vậy tại sao chúng ta không luôn dùng spinlock? Vì nó đi kèm với một sự đánh đổi rất lớn.

|  | **Spinlock** | **Mutex** |
| --- | --- | --- |
| **Trạng thái chờ** | **Chủ động (Active)** - Thread chạy trong "vòng lặp nóng", tiêu tốn 100% CPU. | **Bị động (Passive)** - Thread được hệ điều hành cho "ngủ", không tốn CPU. |
| **Ưu điểm** | **Độ trễ thấp (Low Latency)**. Khi khóa được mở, thread có thể tiếp tục ngay lập tức mà không cần chờ OS đánh thức (context switch). | **Thân thiện với hệ thống**. Nhường CPU cho các công việc hữu ích khác khi phải chờ. |
| **Nhược điểm** | **Cực kỳ lãng phí CPU**. Nếu thời gian chờ dài, nó sẽ làm chậm toàn bộ hệ thống. | **Độ trễ cao hơn**. Việc "đánh thức" một thread bởi OS mất nhiều thời gian hơn. |

**Khi Nào Nên Dùng Spinlock? 🧐** Spinlock là một công cụ dành cho chuyên gia, chỉ nên được sử dụng trong các kịch bản rất cụ thể:

1. Khi Critical Section **cực kỳ ngắn** (chỉ vài chỉ thị máy).
2. Khi sự tranh chấp (contention) **rất thấp** (khả năng phải chờ là rất nhỏ).

Trong thực tế, nó thường được dùng để cài đặt các thư viện cấp thấp hoặc trong hệ điều hành, **không phải trong code ứng dụng thông thường**. Một sự thật thú vị là `std::mutex` trên nhiều nền tảng thường được cài đặt như một "hybrid mutex": nó sẽ spin trong một khoảng thời gian cực ngắn, và nếu vẫn không lấy được khóa thì mới yêu cầu OS cho thread đi ngủ.

---

`std::atomic` cung cấp một bộ công cụ mạnh mẽ cho lập trình lock-free. Spinlock là một ví dụ điển hình về sức mạnh đó, nhưng cũng cho thấy sự đánh đổi giữa độ trễ và việc sử dụng CPU. Đối với hầu hết các ứng dụng, `std::mutex` và các trình quản lý RAII của nó vẫn là lựa chọn an toàn và hợp lý hơn.

*Until then, keep coding!*
