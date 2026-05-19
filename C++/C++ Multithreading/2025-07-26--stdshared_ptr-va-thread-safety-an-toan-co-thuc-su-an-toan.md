---
title: 'std::shared_ptr và Thread-Safety: "An Toàn" Có Thực Sự An Toàn?'
date: '2025-07-26 17:18:43'
date_gmt: '2025-07-26 10:18:43'
modified: '2025-07-26 17:33:14'
status: publish
slug: stdshared_ptr-va-thread-safety-an-toan-co-thuc-su-an-toan
wordpress_id: 303
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/stdshared_ptr-va-thread-safety-an-toan-co-thuc-su-an-toan/
categories:
- C++ Multithreading
tags: []
---

Trong series bài học về data structures, chúng ta sẽ bắt đầu với một công cụ quản lý bộ nhớ rất phổ biến: `std::shared_ptr`. Nó cho phép nhiều con trỏ cùng "sở hữu chung" một đối tượng trên heap. Nhưng khi đưa vào môi trường multi-thread, câu hỏi quan trọng là: nó "an toàn" đến mức nào?

Bài viết này sẽ giải thích cơ chế hoạt động của `std::shared_ptr` và phân tích một cách chi tiết hai lớp an toàn của nó—cái gì được bảo vệ và cái gì bạn phải tự bảo vệ.

---

### Phần 1: `std::shared_ptr` Hoạt Động Như Thế Nào?

`std::shared_ptr` (trong header `<memory>`) quản lý một đối tượng thông qua cơ chế **đếm tham chiếu (reference counting)**.

- Khi một `shared_ptr` được tạo ra, nó trỏ đến đối tượng và một "control block" được tạo ra với bộ đếm tham chiếu (ref count) bằng 1.
- Khi một `shared_ptr` mới được tạo ra bằng cách **sao chép (copy)** một `shared_ptr` đã có, chúng chỉ trỏ đến cùng một đối tượng và control block, đồng thời **tăng ref count lên 1**.
- Khi một `shared_ptr` bị hủy, nó **giảm ref count đi 1**.
- Chỉ khi **ref count trở về 0**, đối tượng trên heap mới thực sự bị xóa.

**Cách tạo:** Cách tốt nhất để tạo một `shared_ptr` là dùng `std::make_shared`. Nó hiệu quả hơn vì chỉ cần một lần cấp phát bộ nhớ cho cả đối tượng và control block.

C++

```
// Cách làm được khuyên dùng
auto ptr1 = std::make_shared<MyObject>(/* args */);

// Cách làm cũ hơn (kém hiệu quả hơn)
std::shared_ptr<MyObject> ptr2(new MyObject(/* args */));
```

---

### Phần 2: Phân Tích Thread-Safety - Hai Lớp An Toàn

Đây là phần quan trọng nhất và thường bị hiểu lầm. Sự an toàn của `std::shared_ptr` phải được xem xét ở hai cấp độ riêng biệt.

#### a) Lớp 1: Control Block (Bộ Đếm Tham Chiếu) - AN TOÀN ✅

- **Cái gì an toàn?**: Việc **thay đổi bộ đếm tham chiếu** (tăng khi copy, giảm khi hủy) là **hoàn toàn thread-safe**. Các thao tác này được thực hiện một cách **atomic**.
- **Ý nghĩa**: Bạn có thể an toàn sao chép, di chuyển, gán và hủy các đối tượng `std::shared_ptr` trên nhiều thread khác nhau mà không gây ra Data Race **trên chính bộ đếm**.
- Đây là một ví dụ của **Internal Synchronization**: Lớp `shared_ptr` tự lo liệu việc đồng bộ hóa cho các hoạt động nội bộ của nó.

C++

```
// Kịch bản AN TOÀN
std::shared_ptr<int> s_ptr = std::make_shared<int>(10);

auto task = [s_ptr]() {
    // Việc sao chép s_ptr vào s_ptr_copy là thread-safe
    // Ref count sẽ được tăng một cách an toàn
    std::shared_ptr<int> s_ptr_copy = s_ptr; 
};

std::thread t1(task);
std::thread t2(task);
// ...
```

#### b) Lớp 2: Đối Tượng Được Quản Lý (Dữ liệu) - KHÔNG AN TOÀN ❌

- **Cái gì không an toàn?**: `std::shared_ptr` **KHÔNG** cung cấp bất kỳ sự bảo vệ nào cho **đối tượng mà nó đang trỏ tới**.
- **Kịch bản nguy hiểm**: Nếu Thread A và Thread B cùng giữ bản sao của một `shared_ptr`, và cả hai cùng hủy tham chiếu (dereference) con trỏ để thay đổi trạng thái của đối tượng bên trong (`ptr->do_something()`), bạn sẽ có một **Data Race** trên chính đối tượng đó.
- **Trách nhiệm**: **Lập trình viên** phải chịu hoàn toàn trách nhiệm bảo vệ đối tượng được quản lý.
- Đây là yêu cầu cho **External Synchronization**: Bạn phải sử dụng một `std::mutex` riêng biệt để bảo vệ các truy cập vào dữ liệu.

C++

```
// Kịch bản NGUY HIỂM (Data Race)
std::shared_ptr<std::vector<int>> s_vec_ptr = std::make_shared<std::vector<int>>();

auto unsafe_task = [s_vec_ptr]() {
    // Hai thread cùng lúc gọi push_back -> Data Race trên vector!
    s_vec_ptr->push_back(1); 
};

// GIẢI PHÁP ĐÚNG
std::mutex mtx;
auto safe_task = [s_vec_ptr]() {
    std::lock_guard<std::mutex> lock(mtx);
    // Truy cập vào vector giờ đã được bảo vệ
    s_vec_ptr->push_back(1);
};
```

---

### Phần 3: Lời Khuyên: `unique_ptr` vs. `shared_ptr`

- **`std::unique_ptr`**: Nên là **lựa chọn mặc định** của bạn. Nó có chi phí bằng không (zero-overhead) so với con trỏ thô và thể hiện rõ ràng ý đồ "sở hữu duy nhất", vốn là trường hợp phổ biến nhất.
- **`std::shared_ptr`**: Chỉ sử dụng khi ngữ nghĩa "sở hữu chung" là một phần **thiết yếu và không thể tránh khỏi** trong thiết kế của bạn. Hãy luôn ý thức về chi phí cao hơn của nó (control block, thao tác atomic).

---

**Tóm lại:** `std::shared_ptr` chỉ an toàn ở góc độ quản lý vòng đời của chính nó (sao chép, hủy...). Nó **không** cung cấp bất kỳ sự an toàn nào cho đối tượng mà nó quản lý. Nếu nhiều thread có thể thay đổi đối tượng đó thông qua `shared_ptr`, bạn **bắt buộc** phải tự mình bảo vệ nó bằng một `std::mutex` hoặc cơ chế đồng bộ hóa khác.

*Until then, keep coding!*
