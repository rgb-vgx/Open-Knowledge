---
title: 'C++ Multithreading #17: Xây Dựng Các Lớp An Toàn Cho Thread: "Internal Synchronization"
  Pattern'
date: '2025-07-13 01:54:32'
date_gmt: '2025-07-12 18:54:32'
modified: '2025-07-26 17:38:48'
status: publish
slug: xay-dung-cac-lop-an-toan-cho-thread-internal-synchronization-pattern
wordpress_id: 171
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/13/xay-dung-cac-lop-an-toan-cho-thread-internal-synchronization-pattern/
categories:
- C++ Multithreading
tags: []
---

Trong các bài học trước, chúng ta đã học cách dùng `std::mutex` để bảo vệ một critical section một cách thủ công. Chúng ta đã tạo một mutex toàn cục và gọi `lock()`/`unlock()` xung quanh đoạn code truy cập `std::cout`. Cách làm này được gọi là **External Synchronization** (Đồng bộ hóa từ bên ngoài) - tức là người sử dụng đối tượng có trách nhiệm phải tự khóa và mở khóa.

Cách tiếp cận này hoạt động, nhưng nó khá rườm rà và dễ gây lỗi (rất dễ quên gọi `lock` hoặc `unlock`). Có một cách làm tốt hơn, an toàn hơn và đúng với tinh thần hướng đối tượng hơn không? Câu trả lời là có, và đó là **Internal Synchronization Pattern**.

#### **Phần 1: External vs. Internal Synchronization**

Hãy cùng so sánh hai phương pháp:

- **External Synchronization (Bên ngoài):**
  - **Cách làm:** Người dùng lớp (ví dụ `std::vector`) phải tự tạo và quản lý một `std::mutex` riêng biệt. Trước mỗi lần gọi một phương thức của `vector`, họ phải tự `lock()` mutex, và `unlock()` sau khi gọi xong.
  - **Nhược điểm:** Dễ quên, làm cho code sử dụng trở nên phức tạp, phá vỡ tính đóng gói của đối tượng.
- **Internal Synchronization (Bên trong):**
  - **Cách làm:** Lớp tự chịu trách nhiệm cho sự an toàn của chính nó. Nó chứa một `std::mutex` làm thành viên dữ liệu (data member). Mỗi phương thức của lớp, trước khi truy cập vào dữ liệu nội bộ, sẽ tự `lock()` mutex này và `unlock()` sau khi hoàn thành.
  - **Ưu điểm:** An toàn và dễ sử dụng. Người dùng lớp không cần phải lo lắng về việc đồng bộ hóa. Nó trở thành một phần của "hợp đồng" mà lớp cung cấp.

#### **Phần 2: Xây Dựng Một `SynchronizedVector`**

Hãy cùng xây dựng một lớp `SynchronizedVector` đơn giản để minh họa cho pattern này. Lớp này sẽ bao bọc một `std::vector` và một `std::mutex`.

C++

```
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <string>

template <typename T>
class SynchronizedVector {
private:
    mutable std::mutex m_mtx;
    std::vector<T> m_vec;

public:
    void push_back(const T& value) {
        m_mtx.lock();
        // Critical Section bắt đầu
        m_vec.push_back(value);
        // Critical Section kết thúc
        m_mtx.unlock();
    }

    void print_all() const {
        m_mtx.lock();
        // Critical Section bắt đầu
        for (const auto& item : m_vec) {
            std::cout << item << " ";
        }
        std::cout << std::endl;
        // Critical Section kết thúc
        m_mtx.unlock();
    }

    // Các phương thức khác của vector có thể được thêm vào đây...
};

// Hàm entry point cho các thread
void add_and_print(SynchronizedVector<int>& s_vec, int start_val) {
    for (int i = 0; i < 3; ++i) {
        s_vec.push_back(start_val + i);
        s_vec.print_all();
    }
}

int main() {
    SynchronizedVector<int> s_vec;
    std::thread t1(add_and_print, std::ref(s_vec), 100);
    std::thread t2(add_and_print, std::ref(s_vec), 200);

    t1.join();
    t2.join();

    return 0;
}
```

Khi chạy chương trình này, bạn sẽ thấy output được in ra một cách có trật tự. Mặc dù các dòng output từ hai thread có thể xen kẽ nhau, nhưng nội dung của mỗi dòng (kết quả của `print_all`) luôn nhất quán và không bị xáo trộn.

#### **Phần 3: Bài Học Cực Kỳ Quan Trọng - Reader cũng phải được Đồng Bộ Hóa!**

Một câu hỏi có thể nảy ra: "Phương thức `print_all` chỉ đọc dữ liệu chứ không thay đổi nó. Vậy có thực sự cần `lock` và `unlock` cho một thao tác chỉ đọc không?"

Đây là một cạm bẫy rất phổ biến. **Câu trả lời là CÓ, BẮT BUỘC PHẢI CÓ.**

Hãy tưởng tượng điều gì sẽ xảy ra nếu chúng ta bỏ `lock/unlock` trong hàm `print_all`:

1. **Thread A** gọi `s_vec.print_all()`. Nó bắt đầu vòng lặp `for` để duyệt qua các phần tử của vector.
2. **Thread B** xen ngang và gọi `s_vec.push_back()`. Giả sử vector hiện tại đã đầy, `push_back` cần phải **tái cấp phát bộ nhớ (reallocate)**. Nó sẽ tạo ra một vùng nhớ mới lớn hơn, sao chép tất cả các phần tử cũ sang đó, rồi giải phóng vùng nhớ cũ.
3. **Thread A** tiếp tục vòng lặp của mình. Nhưng lúc này, nó vẫn đang duyệt trên **vùng nhớ cũ đã bị giải phóng**. Các con trỏ/iterator của nó giờ đây là không hợp lệ.
4. Chương trình bị **Undefined Behavior** và rất có thể sẽ **crash**.

> **Quy tắc vàng:** Nếu có **ít nhất một writer** (một thread đang ghi/thay đổi dữ liệu), thì **tất cả các reader** (các thread đang đọc dữ liệu) cũng **phải được đồng bộ hóa** với writer đó. Một thao tác đọc không hề "vô hại" trong môi trường multi-thread nếu cấu trúc dữ liệu có thể bị thay đổi bởi một thread khác.

### **Lời Kết**

Internal Synchronization là một pattern mạnh mẽ để tạo ra các lớp trừu tượng thread-safe, giúp người dùng không cần phải bận tâm đến việc đồng bộ hóa thủ công. Tuy nhiên, nó cũng cho thấy một bài học đắt giá về sự nguy hiểm của việc truy cập dữ liệu chia sẻ: ngay cả một thao tác chỉ đọc cũng phải được bảo vệ nếu có khả năng dữ liệu bị thay đổi bởi một thread khác.

Và một lần nữa, chúng ta lại đối mặt với rủi ro của việc gọi `lock()` và `unlock()` thủ công: một exception có thể khiến mutex bị khóa mãi mãi. Đã đến lúc chúng ta phải giải quyết dứt điểm vấn đề này. Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về `std::lock_guard` - một công cụ RAII giúp việc quản lý mutex trở nên an toàn và tự động.

*Until then, keep coding!*
