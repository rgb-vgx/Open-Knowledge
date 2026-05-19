---
title: 'Deadlock: "Cái Ôm Chết Chóc" Của Các Thread'
date: '2025-07-26 01:25:33'
date_gmt: '2025-07-25 18:25:33'
modified: '2025-07-26 17:38:24'
status: publish
slug: deadlock-cai-om-chet-choc-cua-cac-thread
wordpress_id: 222
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/deadlock-cai-om-chet-choc-cua-cac-thread/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã học cách dùng mutex để ngăn chặn Data Race. Nhưng cũng chính công cụ này, nếu sử dụng không cẩn thận, lại có thể tạo ra một vấn đề nguy hiểm không kém: **Deadlock**.

Deadlock được xem là vấn đề phổ biến thứ hai trong code multi-thread (chỉ sau Data Race). Bài viết này sẽ giải thích Deadlock là gì, minh họa nó bằng một ví dụ kinh điển, và giới thiệu một giải pháp đơn giản để phòng tránh.

---

### Phần 1: Deadlock Là Gì?

**Deadlock** (khóa chết) là tình huống mà một hoặc nhiều thread bị "treo" vĩnh viễn, không thể tiếp tục thực thi vì chúng đang chờ đợi một tài nguyên mà không bao giờ được giải phóng.

Trường hợp phổ biến nhất là **mutual deadlock** (khóa chết lẫn nhau), khi hai hay nhiều thread tạo thành một vòng tròn chờ đợi luẩn quẩn.

- Thread A đang chờ Thread B.
- Nhưng Thread B lại đang chờ Thread A.
- ... Cứ thế, không ai có thể đi tiếp.

Tình huống này còn được gọi là "cái ôm chết chóc" (deadly embrace), vì các thread bị kẹt lại trong một vòng tay chờ đợi không lối thoát.

---

### Phần 2: Kịch Bản Deadlock Kinh Điển 😈

Kịch bản kinh điển nhất gây ra deadlock là khi hai thread cố gắng khóa hai mutex theo thứ tự ngược nhau.

**Kịch bản:**

1. **Thread A** `lock()` thành công **Mutex 1**.
2. Cùng lúc đó, **Thread B** `lock()` thành công **Mutex 2**.
3. Bây giờ, **Thread A** cố gắng `lock()` **Mutex 2**. Nhưng Mutex 2 đang bị Thread B giữ, vì vậy Thread A phải **chờ**.
4. Đồng thời, **Thread B** cố gắng `lock()` **Mutex 1**. Nhưng Mutex 1 đang bị Thread A giữ, vì vậy Thread B cũng phải **chờ**.

Kết quả: Thread A chờ Thread B nhả Mutex 2, còn Thread B lại chờ Thread A nhả Mutex 1. Cả hai sẽ chờ đợi nhau mãi mãi, và chương trình của bạn bị treo cứng.

**Code minh họa:**

C++

```
#include <iostream>
#include <thread>
#include <mutex>
#include <chrono>

std::mutex mtx1;
std::mutex mtx2;

void task_A() {
    std::cout << "Thread A: Dang co gang lock mtx1...\n";
    mtx1.lock();
    std::cout << "Thread A: Da lock mtx1.\n";
    
    std::this_thread::sleep_for(std::chrono::milliseconds(50));
    
    std::cout << "Thread A: Dang co gang lock mtx2...\n";
    mtx2.lock(); // Sẽ bị kẹt ở đây
    std::cout << "Thread A: Da lock mtx2.\n";

    mtx2.unlock();
    mtx1.unlock();
}

void task_B() {
    std::cout << "Thread B: Dang co gang lock mtx2...\n";
    mtx2.lock();
    std::cout << "Thread B: Da lock mtx2.\n";

    std::this_thread::sleep_for(std::chrono::milliseconds(50));

    std::cout << "Thread B: Dang co gang lock mtx1...\n";
    mtx1.lock(); // Sẽ bị kẹt ở đây
    std::cout << "Thread B: Da lock mtx1.\n";

    mtx1.unlock();
    mtx2.unlock();
}

int main() {
    std::thread t1(task_A);
    std::thread t2(task_B);
    t1.join();
    t2.join();
    std::cout << "Hoan thanh!\n"; // Dòng này sẽ không bao giờ được in ra
    return 0;
}
```

Khi chạy chương trình này, bạn sẽ thấy output dừng lại sau khi cả hai thread đã khóa được mutex đầu tiên của chúng, và chương trình sẽ bị treo.

---

### Phần 3: Giải Pháp Đơn Giản - Luôn Khóa Mutex Theo Thứ Tự

Để phá vỡ vòng tròn chờ đợi, có một quy tắc rất đơn giản:

> **Tất cả các thread phải `lock` nhiều mutex theo cùng một thứ tự.**

Nếu cả Thread A và Thread B đều cố gắng `lock` Mutex 1 trước, rồi mới đến Mutex 2, thì deadlock sẽ không xảy ra.

1. Một trong hai thread (ví dụ Thread A) sẽ `lock` thành công Mutex 1 trước.
2. Thread còn lại (Thread B) sẽ bị chặn ngay tại `lock` Mutex 1 và phải chờ.
3. Thread A sẽ tiếp tục, `lock` thành công Mutex 2 (vì không có ai đang giữ nó), làm xong việc, rồi `unlock` cả hai.
4. Lúc này Thread B mới có thể `lock` Mutex 1, rồi đến Mutex 2 và hoàn thành công việc của nó.

Chỉ cần sửa lại `task_B` như sau:

C++

```
void task_B_safe() {
    // Luôn lock mtx1 trước, giống như task_A
    std::cout << "Thread B: Dang co gang lock mtx1...\n";
    mtx1.lock(); 
    std::cout << "Thread B: Da lock mtx1.\n";
    
    std::cout << "Thread B: Dang co gang lock mtx2...\n";
    mtx2.lock();
    std::cout << "Thread B: Da lock mtx2.\n";
    
    mtx2.unlock();
    mtx1.unlock();
}
```

Với sự thay đổi này, chương trình sẽ chạy đến cùng và kết thúc một cách đúng đắn.

---

### Phần 4: Tại Sao Giải Pháp Này Chưa Đủ Tốt? 🤔

Mặc dù quy tắc "khóa theo thứ tự" hoạt động, nó lại có một điểm yếu lớn: nó **dựa hoàn toàn vào kỷ luật của lập trình viên**.

- Trong một dự án lớn với hàng chục lập trình viên và hàng trăm mutex, việc đảm bảo mọi người luôn tuân thủ một thứ tự khóa toàn cục là cực kỳ khó khăn và dễ xảy ra lỗi.
- Một người mới vào dự án có thể không biết về quy tắc này và vô tình gây ra deadlock.

Rõ ràng, chúng ta cần một giải pháp mang tính hệ thống hơn, một công cụ từ C++ có thể giúp chúng ta khóa nhiều mutex một cách an toàn mà không cần phải lo lắng về thứ tự.

May mắn thay, C++ cung cấp chính xác công cụ đó. Chúng ta sẽ tìm hiểu về `std::lock` trong bài viết tiếp theo.

*Until then, keep coding!*
