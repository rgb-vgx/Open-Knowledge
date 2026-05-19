---
title: 'Giải Pháp Tối Ưu Cho "Nhiều Reader": std::shared_mutex'
date: '2025-07-24 03:51:44'
date_gmt: '2025-07-23 20:51:44'
modified: '2025-07-26 17:38:40'
status: publish
slug: giai-phap-toi-uu-cho-nhieu-reader-stdshared_mutex
wordpress_id: 210
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/24/giai-phap-toi-uu-cho-nhieu-reader-stdshared_mutex/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã chứng kiến `std::mutex` trở thành một "nút thắt cổ chai" về hiệu năng trong kịch bản "nhiều reader, ít writer". Nó buộc các reader phải xếp hàng chờ đợi nhau một cách không cần thiết.

May mắn thay, C++ cung cấp một giải pháp được thiết kế riêng cho vấn đề này. Bài viết này sẽ giới thiệu bạn với "Read-Write Lock" của C++: **`std::shared_mutex`**.

---

### Phần 1: Giới Thiệu `std::shared_mutex` - Khóa Hai Chế Độ

`std::shared_mutex`, được định nghĩa trong header `<shared_mutex>`, là một loại mutex đặc biệt hỗ trợ hai cấp độ khóa khác nhau:

1. **Exclusive Lock (Khóa Độc Quyền)** ✍️
   - **Mục đích**: Dành cho các **writer** (các thread cần thay đổi dữ liệu).
   - **Hành vi**: Hoạt động y hệt `std::mutex`. Khi một thread giữ khóa này, **không một thread nào khác** (cả reader và writer) có thể có được bất kỳ loại khóa nào. Nó đảm bảo sự độc quyền tuyệt đối.
2. **Shared Lock (Khóa Chia Sẻ)** 📖
   - **Mục đích**: Dành cho các **reader** (các thread chỉ đọc dữ liệu).
   - **Hành vi**: Cho phép **nhiều thread cùng lúc** giữ khóa này. Các reader có thể vào critical section cùng nhau. Tuy nhiên, một shared lock chỉ có thể được cấp nếu **không có thread nào đang giữ exclusive lock**.

| Ai đang giữ khóa? | Reader mới có được vào không? | Writer mới có được vào không? |
| --- | --- | --- |
| **Không ai cả** | ✅ Có (Shared Lock) | ✅ Có (Exclusive Lock) |
| **1 hoặc nhiều Reader** | ✅ Có (Shared Lock) | ❌ Không (Phải chờ) |
| **1 Writer** | ❌ Không (Phải chờ) | ❌ Không (Phải chờ) |

Export to Sheets

---

### Phần 2: Cách Sử Dụng trong C++

Việc sử dụng `std::shared_mutex` cũng tuân thủ nguyên tắc RAII, nhưng với hai trình quản lý khóa khác nhau:

- **Để lấy Exclusive Lock (cho Writer):**
  - Dùng `std::lock_guard<std::shared_mutex>` hoặc `std::unique_lock<std::shared_mutex>`. Cách sử dụng không khác gì so với `std::mutex`.
- **Để lấy Shared Lock (cho Reader):**
  - Dùng một lớp RAII mới: **`std::shared_lock<std::shared_mutex>`**. Đây là trình quản lý được thiết kế riêng để tự động lấy và giải phóng shared lock.

---

### Phần 3: Thí Nghiệm - "Giải Cứu" Hiệu Năng 🚀

Bây giờ, hãy viết lại chương trình "40 reader, 2 writer" của chúng ta bằng `std::shared_mutex`.

C++

```
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
#include <chrono>
#include <shared_mutex> // Thêm header mới

int shared_counter = 0;
// Sử dụng shared_mutex thay vì mutex
std::shared_mutex s_mtx;

void reader() {
    // Dùng shared_lock để lấy khóa chia sẻ
    std::shared_lock<std::shared_mutex> lock(s_mtx);
    // Giả lập công việc đọc
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
}

void writer() {
    // Dùng lock_guard (hoặc unique_lock) để lấy khóa độc quyền
    std::lock_guard<std::shared_mutex> lock(s_mtx);
    ++shared_counter;
}

// ... hàm main() giữ nguyên như bài trước ...
```

- **Kết quả với `std::mutex`**: `~4.0 giây`
- **Kết quả mới với `std::shared_mutex`**:`Tong thoi gian thuc thi: 0.10521 giay`

Kết quả thật đáng kinh ngạc! Thời gian thực thi đã giảm từ 4 giây xuống chỉ còn khoảng 0.1 giây. Đây là minh chứng rõ ràng nhất: tất cả 40 thread reader đã có thể thực thi công việc của chúng gần như song song, chỉ bị chặn lại trong một khoảng thời gian rất ngắn khi 2 thread writer cần truy cập độc quyền.

---

### Phần 4: Phân Tích Tính An Toàn - Tại Sao Không Có Data Race?

`std::shared_mutex` vẫn đảm bảo an toàn tuyệt đối:

- Một **writer** chỉ có thể lấy được exclusive lock khi không có bất kỳ ai khác (cả reader và writer) đang ở trong critical section.
- Một **reader** chỉ có thể lấy được shared lock khi không có writer nào đang ở trong critical section.

Điều này có nghĩa là kịch bản nguy hiểm nhất—**có truy cập đồng thời trong khi có một thao tác ghi**—sẽ không bao giờ xảy ra. Concurrency chỉ được phép khi tất cả các thread đều là reader.

---

### Phần 5: Khi Nào Nên Dùng `std::shared_mutex`?

Dù rất mạnh mẽ, `std::shared_mutex` không phải là một viên đạn bạc. Nó phức tạp hơn và có chi phí (overhead) cao hơn so với `std::mutex` thông thường.

**Hãy sử dụng `std::shared_mutex` khi và chỉ khi ứng dụng của bạn thỏa mãn các điều kiện sau:**

1. Số lượng **reader nhiều hơn đáng kể** so với số lượng writer.
2. Công việc của các **reader đủ dài** để việc chạy song song mang lại lợi ích thực sự, bù đắp được cho chi phí overhead của `shared_mutex`.

Nếu critical section của bạn rất ngắn, hoặc số lượng reader và writer tương đương nhau, việc sử dụng `std::mutex` đơn giản có thể lại nhanh hơn. **Hãy luôn đo lường (benchmark) trước khi tối ưu hóa!**

---

`std::shared_mutex` là một công cụ tối ưu hóa hiệu năng tuyệt vời cho kịch bản "nhiều reader, ít writer". Bằng cách cho phép các thao tác đọc được thực thi song song, nó có thể cải thiện đáng kể thông lượng (throughput) của ứng dụng.

*Until then, keep coding!*
