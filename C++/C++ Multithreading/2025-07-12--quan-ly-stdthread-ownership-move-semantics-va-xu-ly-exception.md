---
title: 'C++ Multithreading #9: Quản Lý std::thread: Ownership, Move Semantics và Xử
  Lý Exception'
date: '2025-07-12 00:26:09'
date_gmt: '2025-07-11 17:26:09'
modified: '2025-07-14 14:10:35'
status: publish
slug: quan-ly-stdthread-ownership-move-semantics-va-xu-ly-exception
wordpress_id: 149
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/12/quan-ly-stdthread-ownership-move-semantics-va-xu-ly-exception/
categories:
- C++ Multithreading
tags: []
---

Sau khi đã biết cách tạo và truyền tham số cho một thread, đã đến lúc chúng ta tìm hiểu sâu hơn về bản chất của chính đối tượng `std::thread`. Nó hoạt động như thế nào khi chúng ta di chuyển nó qua lại giữa các hàm? Và điều gì sẽ xảy ra khi có lỗi - khi một **exception** được ném ra từ bên trong một thread?

Hiểu rõ hai khía cạnh này—move semantics và xử lý exception—là chìa khóa để viết code multi-thread an toàn và đáng tin cậy.

#### **Phần 1: `std::thread` là một Lớp "Move-Only"**

Cách tốt nhất để tư duy về `std::thread` là hãy xem nó giống như `std::unique_ptr`. Cả hai đều tuân theo nguyên tắc **RAII (Resource Acquisition Is Initialization)**:

- Một đối tượng `std::thread` được tạo ra sẽ "thâu tóm" và "sở hữu" (owns) một tài nguyên hệ thống, đó chính là một execution thread.
- Giống như `std::unique_ptr`, quyền sở hữu này là **duy nhất**. Không thể có hai đối tượng `std::thread` cùng quản lý một execution thread.

Vì lý do này, việc sao chép `std::thread` bị cấm. Thay vào đó, `std::thread` là một lớp **move-only**: bạn không thể sao chép nó, nhưng bạn có thể **di chuyển (move)** nó. Khi bạn di chuyển một đối tượng `std::thread`, bạn đang chuyển giao quyền sở hữu execution thread từ đối tượng này sang đối tượng khác.

**a) Truyền `std::thread` vào một hàm**

Vì `std::thread` không thể copy, bạn phải di chuyển nó. Hàm nhận thread giờ đây sẽ chịu trách nhiệm `join()` nó.

C++

```
#include <iostream>
#include <thread>
#include <utility> // Cho std::move

void worker_task() { /* ... */ }

// Hàm này nhận quyền sở hữu của thread
// Dùng T&& (rvalue reference) là một thực hành tốt
void process_thread(std::thread&& t) {
    std::cout << "Process_thread da nhan thread voi ID: " << t.get_id() << std::endl;
    // Bây giờ hàm này chịu trách nhiệm join()
    t.join();
}

int main() {
    std::thread my_thread(worker_task);
    std::cout << "Main tao ra thread voi ID: " << my_thread.get_id() << std::endl;

    // Phải dùng std::move() để chuyển quyền sở hữu vào hàm
    process_thread(std::move(my_thread));

    // my_thread bây giờ không còn quản lý execution thread nào nữa
    // Gọi my_thread.join() ở đây sẽ gây lỗi!

    return 0;
}
```

**b) Trả về `std::thread` từ một hàm**

Việc này đơn giản hơn nhiều. Compiler sẽ tự động thực hiện thao tác `move` cho bạn. Bạn chỉ cần trả về đối tượng `std::thread` như bình thường.

C++

```
#include <iostream>
#include <thread>

void hello() {
    std::cout << "Hello from a new thread!\n";
}

std::thread create_thread() {
    std::thread t(hello);
    // Chỉ cần return, compiler sẽ tự động move
    // KHÔNG nên viết: return std::move(t);
    return t;
}

int main() {
    std::thread worker = create_thread();
    std::cout << "Main da nhan thread voi ID: " << worker.get_id() << std::endl;

    worker.join();
    return 0;
}
```

#### **Phần 2: Thread và Xử Lý Exception**

Đây là một trong những quy tắc quan trọng và nghiêm ngặt nhất trong lập trình multi-thread.

**Quy tắc vàng: Mỗi thread có một ngăn xếp thực thi (execution stack) riêng biệt.**

Điều này dẫn đến một hệ quả cực kỳ quan trọng:

- Khi một **exception** được ném ra, quá trình "gỡ rối ngăn xếp" (stack unwinding) để tìm một khối `catch` phù hợp chỉ diễn ra **trên stack của chính thread đó**.
- Nếu **exception** đi đến đỉnh stack của thread mà không tìm thấy `catch` handler nào, chương trình sẽ gọi `std::terminate()` và **toàn bộ ứng dụng sẽ bị chấm dứt ngay lập tức**.
- Một khối `try/catch` trong `main` thread **KHÔNG THỂ** bắt được một **exception** ném ra từ một worker thread khác.

**Cách xử lý đúng:** Bạn phải đặt khối `try/catch` bên trong hàm entry point của thread.

**Ví dụ sai (DON'T):** Cố gắng bắt exception ở `main`.

C++

```
// !!! CODE NÀY SẼ GÂY CRASH !!!
#include <iostream>
#include <thread>
#include <stdexcept>

void task_that_throws() {
    throw std::runtime_error("Loi tu ben trong thread!");
}

int main() {
    std::thread t1(task_that_throws);
    try {
        t1.join();
    } catch (const std::exception& e) {
        // Khối catch này sẽ KHÔNG BAO GIỜ được gọi
        std::cout << "Da bat duoc exception: " << e.what() << std::endl;
    }
    return 0; // Chương trình sẽ bị terminate trước khi đến đây.
}
```

**Ví dụ đúng (DO):** Xử lý exception bên trong thread.

C++

```
#include <iostream>
#include <thread>
#include <stdexcept>

void task_that_throws() {
    try {
        // ... code có thể ném exception ...
        throw std::runtime_error("Loi tu ben trong thread!");
    } catch (const std::exception& e) {
        // Xử lý exception ngay tại đây
        std::cerr << "Da bat va xu ly exception trong thread: " << e.what() << std::endl;
    }
}

int main() {
    std::thread t1(task_that_throws);
    t1.join();
    std::cout << "Chuong trinh ket thuc an toan." << std::endl;
    return 0;
}
```

### **Lời Kết**

Việc nắm vững cách `std::thread` hoạt động như một đối tượng là cực kỳ quan trọng. Hãy luôn ghi nhớ hai nguyên tắc chính từ bài học này:

1. **`std::thread` là move-only:** Hãy đối xử với nó như `std::unique_ptr`. Khi bạn di chuyển nó, bạn đang chuyển giao quyền sở hữu và trách nhiệm.
2. **Xử lý exception tại chỗ:** Một **exception** không được xử lý trong một thread sẽ là "án tử" cho toàn bộ chương trình của bạn. Luôn đặt `try/catch` bên trong code của thread nếu có nguy cơ xảy ra lỗi.

Với những nguyên tắc này, bạn đã tiến thêm một bước dài trong việc viết code multi-thread mạnh mẽ và an toàn. Thách thức tiếp theo của chúng ta sẽ là làm thế nào để các thread có thể chia sẻ dữ liệu với nhau mà không gây ra xung đột.

*Until then, keep coding!*
