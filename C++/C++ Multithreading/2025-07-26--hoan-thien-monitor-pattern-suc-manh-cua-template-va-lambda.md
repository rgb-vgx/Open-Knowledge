---
title: 'Hoàn Thiện Monitor Pattern: Sức Mạnh Của Template và Lambda'
date: '2025-07-26 17:21:20'
date_gmt: '2025-07-26 10:21:20'
modified: '2025-07-26 17:33:07'
status: publish
slug: hoan-thien-monitor-pattern-suc-manh-cua-template-va-lambda
wordpress_id: 307
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/hoan-thien-monitor-pattern-suc-manh-cua-template-va-lambda/
categories:
- C++ Multithreading
tags: []
---

Trong bài học trước, chúng ta đã thử hai cách tiếp cận để xây dựng một lớp Monitor nhưng đều đi vào ngõ cụt: chúng không thể đảm bảo tính nguyên tử (atomicity) cho một giao dịch (transaction) gồm nhiều bước. Ví dụ, một thread khác vẫn có thể xen vào giữa hai lời gọi `debit()` và `credit()`.

Làm thế nào để "khóa" một đối tượng, thực hiện một **chuỗi các hành động** do người dùng định nghĩa, rồi sau đó mới "mở khóa"? Bài viết này sẽ giới thiệu một pattern Monitor nâng cao, sử dụng sức mạnh của template và lambda để tạo ra một giải pháp toàn diện.

---

### Phần 1: Hướng Đi Của Một "Library Developer"

Thay vì tạo ra một lớp `BankMonitor` chuyên dụng, một người phát triển thư viện sẽ nhắm đến một giải pháp tổng quát có thể áp dụng cho bất kỳ lớp nào.

- **Tổng quát hóa (Genericity)**: Biến Monitor thành một class template (`Monitor<T>`) để nó có thể "bảo vệ" bất kỳ kiểu dữ liệu `T` nào.
- **Linh hoạt (Flexibility)**: Thay vì định nghĩa sẵn các phương thức như `debit`, `credit`, hãy cung cấp một cơ chế duy nhất để người dùng có thể thực thi **một chuỗi các hành động bất kỳ** như một giao dịch duy nhất.

---

### Phần 2: "Công Thức" Của Monitor Hoàn Chỉnh 🌟

Giải pháp thanh lịch nằm ở việc biến chính đối tượng Monitor thành một **callable object (functor)**, và dùng lambda để định nghĩa giao dịch.

**Cấu trúc của lớp Monitor**

1. Là một **class template** với tham số `T` là kiểu dữ liệu cần bảo vệ.
2. Chứa hai thành viên private: đối tượng dữ liệu `T m_data` và một `std::mutex m_mtx`.
3. Nạp chồng **toán tử gọi hàm `operator()`**. Đây chính là "cửa ngõ" duy nhất để thực hiện giao dịch.
4. Toán tử `operator()` này cũng là một **template function**, nhận vào một **callable object (thường là lambda)**. Lambda này sẽ chứa toàn bộ logic của giao dịch.

**Code của lớp Monitor:**

C++

```
#include <mutex>

template <typename T>
class Monitor {
private:
    T m_data;
    mutable std::mutex m_mtx; // mutable để có thể lock trong hàm const

public:
    // Constructor cho phép khởi tạo đối tượng bên trong
    template<typename... Args>
    Monitor(Args&&... args) : m_data(std::forward<Args>(args)...) {}

    // Toán tử gọi hàm - "cửa ngõ" của giao dịch
    template <typename Func>
    auto operator()(Func func) const {
        std::lock_guard<std::mutex> lock(m_mtx);
        // Thực thi toàn bộ lambda của người dùng trên dữ liệu được bảo vệ
        return func(m_data);
    }
};
```

**Phân tích:** Logic của `operator()` cực kỳ đơn giản nhưng rất mạnh mẽ:

1. Khóa mutex bằng `lock_guard`.
2. Thực thi lambda `func` mà người dùng cung cấp, truyền vào đối tượng `m_data` đang được bảo vệ.
3. `lock_guard` tự động mở khóa mutex khi kết thúc.

Toàn bộ chuỗi hành động bên trong lambda được thực thi dưới một lần khóa duy nhất, đảm bảo tính nguyên tử tuyệt đối cho giao dịch.

---

### Phần 3: Áp Dụng Monitor Hoàn Chỉnh

**a) Với Giao Dịch Ngân Hàng** Bây giờ, giao dịch chuyển tiền trở nên an toàn và súc tích.

C++

```
// Lớp Bank gốc không cần mutex
class Bank { /* ... */ };

int main() {
    // Tạo một Monitor bảo vệ đối tượng Bank
    Monitor<Bank> safe_bank;

    // Thực hiện giao dịch chuyển tiền
    safe_bank([&](Bank& b) {
        // Toàn bộ code trong lambda này là một giao dịch atomic
        b.debit(100.0);
        b.credit(100.0);
    });
}
```

Vấn đề race condition giữa `debit` và `credit` đã được giải quyết hoàn toàn.

**b) Trong Môi Trường Multi-thread** Hãy xem nó hoạt động như thế nào với nhiều thread cùng sửa đổi một `std::string`.

C++

```
#include <string>
#include <vector>
#include <future>

// Tạo một Monitor bảo vệ một std::string, khởi tạo với giá trị "Start: "
Monitor<std::string> safe_string("Start: ");

// Task cho các thread
auto task = [&](int id) {
    // Gọi Monitor, truyền vào lambda định nghĩa giao dịch
    safe_string([&](std::string& s) {
        s += std::to_string(id) + ", ";
    });
};

int main() {
    std::vector<std::future<void>> futures;
    for (int i = 0; i < 10; ++i) {
        futures.push_back(std::async(std::launch::async, task, i));
    }
    // ... chờ các future ...

    // In kết quả cuối cùng
    safe_string([](const std::string& s) {
        std::cout << "Ket qua cuoi cung: " << s << std::endl;
    });

    return 0;
}
```

Kết quả cuối cùng sẽ là một chuỗi hoàn chỉnh, không bị xáo trộn, chứng tỏ Monitor đã bảo vệ thành công `std::string` khỏi Data Race.

---

Monitor pattern kết hợp với template và lambda là một kỹ thuật cực kỳ mạnh mẽ trong C++ hiện đại. Nó cho phép chúng ta tạo ra các đối tượng thread-safe, có thể tái sử dụng, và cung cấp một cách làm an toàn và linh hoạt để người dùng thực thi các giao dịch phức tạp.

*Until then, keep coding!*
