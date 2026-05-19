---
title: 'C++ Multithreading #10: Quản Lý Vòng Đời Thread: join, detach, và "Thread
  Guard" Pattern'
date: '2025-07-12 00:29:47'
date_gmt: '2025-07-11 17:29:47'
modified: '2025-07-14 14:11:02'
status: publish
slug: quan-ly-vong-doi-thread-join-detach-va-thread-guard-pattern
wordpress_id: 151
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/12/quan-ly-vong-doi-thread-join-detach-va-thread-guard-pattern/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã biết cách tạo ra một thread, nhưng câu chuyện không kết thúc ở đó. Khi một `std::thread` được tạo ra, chúng ta có một trách nhiệm: phải quyết định "số phận" của nó trước khi đối tượng `std::thread` quản lý nó bị hủy. Nếu không, chương trình của chúng ta sẽ bị `std::terminate()` một cách không thương tiếc.

Bài viết này sẽ khám phá hai "số phận" chính của một thread—`join()` và `detach()`—và giới thiệu một mẫu thiết kế (design pattern) cực kỳ mạnh mẽ theo nguyên tắc RAII để quản lý thread một cách an toàn, ngay cả khi có exception xảy ra.

#### **Phần 1: Hai Số Phận Của Một Thread: `join()` vs. `detach()`**

Mỗi execution thread phải được xử lý theo một trong hai cách sau:

**1. `join()` - Chờ Đợi**

- **Hành vi:** Khi thread cha gọi `t.join()`, nó sẽ **dừng lại và chờ đợi** cho đến khi thread con `t` hoàn thành công việc của mình. Mối quan hệ giữa hai thread là ràng buộc.
- **Sử dụng khi:** Bạn cần kết quả từ thread con, hoặc cần đảm bảo thread con đã hoàn thành một tác vụ nào đó trước khi thread cha tiếp tục. Đây là trường hợp phổ biến nhất.

**2. `detach()` - Tách Ra và Chạy Độc Lập**

- **Hành vi:** Khi thread cha gọi `t.detach()`, nó sẽ **tách rời** mối liên kết giữa đối tượng `std::thread` và execution thread thực sự. Execution thread này sẽ trở thành một "daemon" (tiến trình nền), tự chạy độc lập. Nó sẽ tiếp tục thực thi cho đến khi hoàn thành, ngay cả khi thread cha đã kết thúc. Hệ điều hành sẽ chịu trách nhiệm dọn dẹp tài nguyên của nó sau khi nó chạy xong.
- **Sử dụng khi:** Bạn muốn khởi chạy một tác vụ nền dài hạn mà không cần quan tâm đến kết quả của nó (ví dụ: một thread giám sát hệ thống, ghi log...). Sau khi gọi `detach()`, bạn không thể `join()` hay tương tác với thread đó nữa.

#### **Phần 2: Cạm Bẫy Chết Người: Exception và `std::terminate()`**

Hãy xem xét đoạn code tưởng chừng như vô hại sau:

C++

```
void some_task() { /* ... */ }

void do_work() {
    std::thread t(some_task);
    // ... làm một số công việc có thể ném ra exception ...
    if (/* một điều kiện lỗi xảy ra */) {
        throw std::runtime_error("Co loi!");
    }
    t.join(); // Lời gọi join() có thể không bao giờ được thực thi
}
```

Nếu một exception được ném ra trước khi `t.join()` được gọi, thảm họa sẽ xảy ra:

1. Stack unwinding bắt đầu để xử lý exception.
2. Đối tượng `t` ra khỏi scope và destructor của nó được gọi.
3. Destructor kiểm tra thấy thread vẫn đang "joinable" (chưa được `join` hay `detach`).
4. `std::terminate()` được gọi, và toàn bộ chương trình của bạn bị crash.

#### **Phần 3: Giải Pháp Tốt Hơn - Nguyên Tắc RAII và "Thread Guard"**

Một giải pháp đơn giản là đặt `join()` trong cả khối `try` và `catch`, nhưng nó dài dòng và lặp lại code. Một giải pháp C++ "chính thống" và thanh lịch hơn nhiều là sử dụng nguyên tắc **RAII**.

Chúng ta sẽ tạo một lớp "bảo vệ" (guard) có nhiệm vụ đảm bảo thread luôn được `join()` khi đối tượng bảo vệ này bị hủy, bất kể là do kết thúc scope thông thường hay do exception.

C++

```
#include <thread>
#include <utility>

class ThreadGuard {
private:
    std::thread& t; // Giữ một tham chiếu tới thread cần bảo vệ

public:
    // Constructor nhận tham chiếu tới thread
    explicit ThreadGuard(std::thread& thread_obj) : t(thread_obj) {}

    // Destructor sẽ được tự động gọi khi đối tượng ThreadGuard ra khỏi scope
    ~ThreadGuard() {
        // Chỉ join() nếu thread thực sự có thể join() được
        // để tránh lỗi gọi join() nhiều lần
        if (t.joinable()) {
            t.join();
        }
    }

    // Xóa các hàm khởi tạo sao chép và gán sao chép để ngăn việc copy
    ThreadGuard(const ThreadGuard&) = delete;
    ThreadGuard& operator=(const ThreadGuard&) = delete;
};
```

*Lưu ý: Phương thức `t.joinable()` trả về `true` nếu thread đang hoạt động và chưa được `join`/`detach`.*

#### **Phần 4: Áp Dụng "Thread Guard" vào Thực Tế**

Bây giờ, chúng ta có thể viết lại hàm `do_work()` một cách an toàn và gọn gàng.

C++

```
#include <iostream>
#include <thread>
#include <stdexcept>

// Lớp ThreadGuard từ ví dụ trên

void some_task() {
    std::cout << "Task dang chay...\n";
}

void do_work_safely() {
    std::thread my_thread(some_task);
    // Ngay sau khi tạo thread, giao nó cho ThreadGuard quản lý
    ThreadGuard g(my_thread);

    std::cout << "do_work_safely() dang lam viec...\n";
    // Giả sử có exception xảy ra ở đây
    throw std::runtime_error("Loi xay ra trong do_work_safely!");

    // Dòng code này sẽ không được chạy tới
    // Nhưng destructor của 'g' VẪN được gọi, và nó sẽ join() an toàn!
}

int main() {
    try {
        do_work_safely();
    } catch(const std::exception& e) {
        std::cerr << "Da bat duoc exception trong main: " << e.what() << std::endl;
    }
    // Chương trình kết thúc một cách an toàn
    return 0;
}
```

Ngay cả khi có exception, destructor của `ThreadGuard g` vẫn được C++ đảm bảo sẽ được gọi, và nó sẽ thực hiện `join()` một cách an toàn.

#### **Ghi Chú Phụ: "Giết" Một Thread?**

Việc ép buộc một thread phải dừng lại (kill, cancel, terminate) thường là một ý tưởng rất tồi. Một thread có thể đang giữ một tài nguyên quan trọng (lock, file handle,...). Việc "giết" nó giữa chừng có thể làm rò rỉ tài nguyên và gây ra các vấn đề nghiêm trọng. Vì lý do này, `std::thread` của C++11 không hỗ trợ việc này. Các phiên bản C++ mới hơn như C++20 với `std::jthread` cung cấp cơ chế "hợp tác" để yêu cầu một thread dừng lại một cách an toàn, chúng ta sẽ tìm hiểu sau.

### **Lời Kết**

Quản lý vòng đời của một thread là một trong những trách nhiệm quan trọng nhất khi lập trình multi-thread.

- Bạn phải quyết định số phận của mỗi thread bằng `join()` (chờ đợi) hoặc `detach()` (chạy độc lập).
- Để đảm bảo code của bạn an toàn trước các exception, hãy luôn sử dụng mẫu "Thread Guard" dựa trên nguyên tắc RAII. Đây là cách làm chuẩn mực và an toàn trong C++ hiện đại.

*Until then, keep coding!*
