---
title: 'Sử Dụng std::future &amp; std::promise: Giao Diện và Cách Hoạt Động'
date: '2025-07-26 15:12:15'
date_gmt: '2025-07-26 08:12:15'
modified: '2025-07-26 17:37:03'
status: publish
slug: su-dung-stdfuture-stdpromise-giao-dien-va-cach-hoat-dong
wordpress_id: 250
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/su-dung-stdfuture-stdpromise-giao-dien-va-cach-hoat-dong/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã học về mô hình future/promise như một kênh giao tiếp một chiều thanh lịch. Bây giờ, hãy cùng "mổ xẻ" các lớp `std::future` và `std::promise` trong C++ để xem chúng ta có những công cụ gì và cách chúng hoạt động với nhau như thế nào.

---

### Phần 1: `std::future<T>` - Người Tiêu Thụ Chờ Đợi 📥

`std::future<T>` là một đối tượng đại diện cho một kết quả sẽ có trong **tương lai**. Nó là "đầu nhận" của kênh giao tiếp.

- **Header**: `#include <future>`
- **Tham số template `T`**: Là kiểu dữ liệu của kết quả mà future này sẽ chứa (ví dụ: `std::future<int>`, `std::future<std::string>`).

#### Các phương thức chính:

- **`T get()`**: Đây là phương thức quan trọng nhất.
  - Nó **chặn (block)** thread hiện tại và chờ cho đến khi kết quả sẵn sàng trong shared state.
  - Khi kết quả đã có, nó sẽ lấy giá trị ra và **trả về giá trị đó**.
  - Nếu shared state chứa một exception, `get()` sẽ **ném lại (re-throw)** exception đó.
  - **Lưu ý quan trọng**: Bạn chỉ có thể gọi `get()` **đúng một lần** trên một đối tượng `std::future`.
- **`wait()`, `wait_for()`, `wait_until()`**: Các phương thức này cũng chờ cho đến khi kết quả sẵn sàng, nhưng chúng **không lấy ra hay trả về giá trị**. Chúng chỉ hữu ích khi bạn muốn kiểm tra xem một tác vụ đã hoàn thành hay chưa mà không cần lấy kết quả ngay.

---

### Phần 2: `std::promise<T>` - Người Sản Xuất Thực Hiện Lời Hứa 📤

`std::promise<T>` là đối tượng mà thread "producer" sử dụng để **thiết lập giá trị** cho shared state. Nó là "đầu gửi" của kênh giao tiếp.

- **Header**: `#include <future>`
- **Tham số template `T`**: Phải khớp với kiểu `T` của `std::future` tương ứng.

#### Các phương thức chính:

- **Constructor**: Khi bạn tạo một đối tượng `std::promise`, nó sẽ tự động tạo ra một shared state.
- **`std::future<T> get_future()`**: Phương thức này trả về đối tượng `std::future` duy nhất được liên kết với `promise` này. Đây là cách bạn tạo ra cặp đôi promise/future.
- **`void set_value(T value)`**: "Thực hiện lời hứa" khi có kết quả tốt đẹp. Nó đặt `value` vào shared state và đánh thức thread đang chờ trên `future`.
- **`void set_exception(std::exception_ptr e)`**: "Thực hiện lời hứa" khi có lỗi. Nó đặt một exception vào shared state và cũng đánh thức thread đang chờ.

---

### Phần 3: Luồng Hoạt Động Điển Hình 📜

Đây là các bước điển hình để sử dụng promise và future trong một chương trình multi-thread:

1. **Trong thread cha (ví dụ `main`)**:
   - Tạo một đối tượng `std::promise<T> p;`.
   - Lấy ra future tương ứng: `std::future<T> f = p.get_future();`.
2. **Khởi tạo các thread**:
   - Khởi tạo thread Producer và **chuyển `promise` p** vào cho nó (thường dùng `std::move` vì `std::promise` là move-only).
   - Khởi tạo thread Consumer và **chuyển `future` f** vào cho nó (tương tự, `std::future` cũng là move-only).
3. **Bên trong thread Producer**:
   - Thực hiện công việc để tính toán ra `result`.
   - Khi xong, gọi `p.set_value(result)` (hoặc `p.set_exception(...)` nếu có lỗi).
4. **Bên trong thread Consumer**:
   - Làm các công việc khác.
   - Khi cần kết quả, gọi `T value = f.get();`. Lời gọi này sẽ block cho đến khi Producer gọi `set_value`.

---

Chúng ta đã nắm vững các thành phần và quy trình hoạt động của `std::future` và `std::promise`. Chúng cung cấp một cơ chế trừu tượng hóa ở mức độ cao, giúp chúng ta không cần bận tâm đến sự phức tạp của mutex và condition variable cho kịch bản giao tiếp đơn giản này.

Trong bài viết tiếp theo, chúng ta sẽ áp dụng tất cả kiến thức này để viết một chương trình C++ hoàn chỉnh.

*Until then, keep coding!*
