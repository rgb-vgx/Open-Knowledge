---
title: std::thread, packaged_task, hay std::async? Chọn Công Cụ Nào Cho Tác Vụ Của
  Bạn
date: '2025-07-26 16:37:54'
date_gmt: '2025-07-26 09:37:54'
modified: '2025-07-26 17:34:00'
status: publish
slug: stdthread-packaged_task-hay-stdasync-chon-cong-cu-nao-cho-tac-vu-cua-ban
wordpress_id: 279
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/stdthread-packaged_task-hay-stdasync-chon-cong-cu-nao-cho-tac-vu-cua-ban/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã đi qua một hành trình khám phá các công cụ lập trình bất đồng bộ trong C++, từ `std::thread` ở mức độ thấp, `std::packaged_task` hướng đối tượng, cho đến `std::async` ở mức độ cao. Với nhiều lựa chọn như vậy, một câu hỏi tự nhiên nảy sinh: **Khi nào nên dùng công cụ nào?**

Bài viết này sẽ so sánh ưu và nhược điểm của từng phương pháp và đưa ra những khuyến nghị rõ ràng để giúp bạn lựa chọn công cụ phù hợp nhất cho công việc của mình.

---

### 1. `std::async` - Sự Lựa Chọn Đơn Giản Nhất 👍

`std::async` là cách nhanh chóng và tiện lợi nhất để chạy một tác vụ "một lần" và lấy kết quả của nó.

- **Ưu điểm ✅**:
  - **Dễ sử dụng nhất**: Chỉ cần một lời gọi hàm.
  - **Dễ lấy kết quả**: Tự động trả về một `std::future` chứa kết quả hoặc exception.
  - **Trừu tượng hóa cao**: Thư viện tự quản lý thread, bạn không cần bận tâm đến việc tạo hay `join()` thread.
- **Nhược điểm ❌**:
  - **Không có `detach()`**: Bạn không thể tạo một tác vụ nền thực sự rồi "quên" nó đi.
  - **"Implicit Join" trong Destructor**: Đây là một đặc điểm gây tranh cãi và rất quan trọng cần biết. Destructor của đối tượng `future` được trả về bởi `std::async` sẽ **block** và chờ cho đến khi tác vụ hoàn thành.

**Minh họa "Implicit Join":**

C++

```
#include <iostream>
#include <future>
#include <chrono>

void long_task() {
    std::this_thread::sleep_for(std::chrono::seconds(5));
    std::cout << "42\n";
}

void start_async() {
    std::cout << "start_async: Bat dau goi async...\n";
    auto f = std::async(std::launch::async, long_task);
    std::cout << "start_async: Goi async xong, ham chuan bi ket thuc.\n";
} // Destructor của 'f' được gọi ở đây và sẽ block trong 5 giây!

int main() {
    start_async();
    std::cout << "main: Ham start_async da tra ve.\n";
    return 0;
}
```

**Kết quả:** Bạn sẽ thấy chương trình chờ 5 giây, sau đó dòng "42" được in ra, và cuối cùng dòng "main: Ham start\_async da tra ve." mới xuất hiện. Hàm `start_async` đã không trả về ngay lập tức như chúng ta kỳ vọng.

---

### 2. `std::packaged_task` - "Đóng Gói" Tác Vụ Thành Đối Tượng 📦

`std::packaged_task` là lựa chọn tuyệt vời khi bạn cần sự kiểm soát và linh hoạt cao hơn.

- **Ưu điểm ✅**:
  - **Tách biệt** việc định nghĩa task khỏi việc thực thi nó.
  - **Đại diện cho task như một đối tượng**: Cho phép bạn lưu trữ các task trong container (ví dụ `std::vector`), truyền chúng qua lại.
  - **Toàn quyền kiểm soát**: Bạn quyết định khi nào và trên thread nào task sẽ được chạy.
- **Nhược điểm ❌**:
  - Cồng kềnh hơn `std::async`, vì bạn phải tự tạo và quản lý `std::thread`.

---

### 3. `std::thread` - Sự Linh Hoạt Tối Đa 🛠️

`std::thread` là công cụ ở mức độ thấp nhất, cho bạn sự kiểm soát tối đa.

- **Ưu điểm ✅**:
  - **Hỗ trợ `detach()`**: Cho phép tạo các tác vụ nền thực sự chạy độc lập.
  - **Truy cập cấp thấp**: Cho phép lấy `native_handle()` để sử dụng các tính năng của hệ điều hành (như đặt độ ưu tiên, ghim thread vào một core).
- **Nhược điểm ❌**:
  - **Phức tạp nhất**: Bạn phải tự quản lý mọi thứ, bao gồm cả việc truyền kết quả và exception (thường là phải tự "kết nối" `promise`/`future`).

---

### Bảng Tóm Tắt và Lời Khuyên

| Tiêu chí | `std::async` | `std::packaged_task` | `std::thread` |
| --- | --- | --- | --- |
| **Mức độ trừu tượng** | Cao nhất | Trung bình | Thấp nhất |
| **Lấy kết quả** | Rất dễ (trả về `future`) | Dễ (`get_future()`) | Thủ công (cần `promise`) |
| **Kiểm soát thực thi** | Hạn chế (qua policy) | Toàn quyền | Toàn quyền |
| **Hỗ trợ `detach()`** | Không | Không | **Có** |
| **Use case tốt nhất** | Tác vụ đơn giản, cần kết quả | Hệ thống task queue, thread pool | Tác vụ nền, cần tối ưu cấp OS |

**Khuyến nghị của tôi:**

- **Để chạy một tác vụ và lấy kết quả**: Hãy bắt đầu với `std::async(std::launch::async, ...)` vì sự đơn giản của nó.
- **Nếu bạn cần xây dựng một hệ thống tác vụ linh hoạt (như thread pool)**: `std::packaged_task` là lựa chọn đúng đắn.
- **Nếu bạn cần một tác vụ nền chạy dài hạn (`detach`) hoặc cần can thiệp ở cấp độ OS**: `std::thread` là công cụ duy nhất cho bạn.

---

### Cái Nhìn về Tương Lai Của C++ Concurrency

Dù mạnh mẽ, thư viện concurrency của C++ vẫn còn thiếu một số tính năng cao cấp so với các ngôn ngữ khác, như `continuation` (nối chuỗi các tác vụ), `when_all`/`when_any` (chờ đợi nhiều future), và một `concurrent_queue` chuẩn. Những tính năng này đã được hứa hẹn trong nhiều phiên bản nhưng vẫn bị trì hoãn. Hy vọng chúng ta sẽ thấy chúng trong C++26 hoặc các phiên bản tương lai.

*Until then, keep coding!*
