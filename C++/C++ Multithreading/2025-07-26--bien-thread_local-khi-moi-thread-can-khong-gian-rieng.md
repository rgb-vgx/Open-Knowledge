---
title: 'Biến thread_local: Khi Mỗi Thread Cần "Không Gian Riêng"'
date: '2025-07-26 01:13:39'
date_gmt: '2025-07-25 18:13:39'
modified: '2025-07-26 17:38:32'
status: publish
slug: bien-thread_local-khi-moi-thread-can-khong-gian-rieng
wordpress_id: 215
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/bien-thread_local-khi-moi-thread-can-khong-gian-rieng/
categories:
- C++ Multithreading
tags: []
---

Trong suốt các bài học vừa qua, chúng ta đã tập trung rất nhiều vào việc quản lý **shared memory**—dữ liệu được chia sẻ giữa nhiều thread. Nhưng đôi khi, chúng ta lại cần điều ngược lại: một biến trông có vẻ toàn cục, nhưng mỗi thread lại có một bản sao hoàn toàn riêng biệt và độc lập.

Đây chính là lúc từ khóa `thread_local` tỏa sáng. Bài viết này sẽ giới thiệu về công cụ mạnh mẽ này và cách nó giúp chúng ta tạo ra "không gian riêng" cho mỗi thread.

---

### Phần 1: `thread_local` là gì?

Khi bạn khai báo một biến với từ khóa `thread_local`, bạn đang ra lệnh cho trình biên dịch:

> "Hãy tạo ra một thực thể (instance) riêng biệt của biến này cho mỗi một thread trong chương trình."

Hãy so sánh sự khác biệt cơ bản:

- **Biến toàn cục/static thông thường**:C++`static int shared_counter = 0;` => Chỉ có **MỘT** `shared_counter` duy nhất cho toàn bộ chương trình. Tất cả các thread đều thấy và thay đổi cùng một biến này.
- **Biến `thread_local`**:C++`thread_local int private_counter = 0;` => Mỗi thread sẽ có **một `private_counter` của riêng mình**. Thread A tăng `private_counter` của nó sẽ không hề ảnh hưởng đến `private_counter` của Thread B.

---

### Phần 2: Vòng Đời: Khởi Tạo và Hủy

- **Khởi tạo**:
  - Nếu là biến toàn cục/namespace, nó sẽ được khởi tạo vào lần đầu tiên một thread sử dụng nó.
  - Nếu là biến cục bộ (bên trong hàm), nó được khởi tạo vào lần đầu tiên một thread đi qua câu lệnh khai báo đó (giống như "Magic Statics" nhưng trên cơ sở từng thread).
- **Hủy**: Đây là một điểm khác biệt quan trọng. Một biến `thread_local` sẽ được **hủy khi thread sở hữu nó kết thúc** (ví dụ, sau khi `join()` trả về). Trong khi đó, biến toàn cục/static chỉ bị hủy khi toàn bộ chương trình chấm dứt.

---

### Phần 3: Ví Dụ Thực Tế - "Random Number Engine" Cho Mỗi Thread 🎲

Một trong những ứng dụng hữu ích của `thread_local` là trong việc kiểm thử (testing). Giả sử chúng ta muốn mỗi thread thực hiện một loạt các phép tính với cùng một chuỗi số ngẫu nhiên để đảm bảo kết quả có thể tái lập. Nếu chúng ta dùng chung một random number engine, thread thứ hai sẽ nhận được chuỗi số tiếp theo, chứ không phải chuỗi số giống hệt.

`thread_local` giải quyết vấn đề này một cách hoàn hảo.

**Thí nghiệm:** Hãy tạo một random number engine `thread_local` và xem hai thread sẽ tạo ra chuỗi số như thế nào.

C++

```
#include <iostream>
#include <thread>
#include <random>
#include <vector>

// Mỗi thread sẽ có một bản sao riêng của 'engine' này.
thread_local std::mt19937 engine(1337); // Dùng seed cố định để dễ so sánh

void task() {
    // Tạo một distribution cục bộ cho task
    std::uniform_int_distribution<int> dist(1, 1000);
    for (int i = 0; i < 5; ++i) {
        std::cout << "Thread [" << std::this_thread::get_id() << "]: " 
                  << dist(engine) << std::endl;
    }
}

int main() {
    std::thread t1(task);
    std::thread t2(task);

    t1.join();
    t2.join();
    return 0;
}
```

**Kết quả với `thread_local`:**

```
Thread [0x70000e42f000]: 407
Thread [0x70000e42f000]: 678
Thread [0x70000e42f000]: 808
Thread [0x70000e42f000]: 976
Thread [0x70000e42f000]: 952
Thread [0x70000e535000]: 407
Thread [0x70000e535000]: 678
Thread [0x70000e535000]: 808
Thread [0x70000e535000]: 976
Thread [0x70000e535000]: 952
```

Như bạn thấy, cả hai thread (với ID khác nhau) đã tạo ra **cùng một chuỗi 5 số ngẫu nhiên**. Đó là vì mỗi thread đang làm việc với một đối tượng `engine` riêng biệt của chính nó.

**Nếu chúng ta bỏ `thread_local` đi thì sao?** Nếu `engine` là một biến toàn cục thông thường, nó sẽ là **shared memory**.

C++

```
// Bỏ thread_local đi
std::mt19937 engine(1337);
```

**Kết quả khi dùng biến toàn cục:**

```
Thread [0x700004561000]: 407
Thread [0x700004561000]: 678
Thread [0x700004561000]: 808
Thread [0x700004561000]: 976
Thread [0x700004561000]: 952
Thread [0x700004667000]: 37
Thread [0x700004667000]: 909
Thread [0x700004667000]: 144
Thread [0x700004667000]: 402
Thread [0x700004667000]: 930
```

Bây giờ, thread thứ hai đã nhận được 5 số tiếp theo trong chuỗi, vì cả hai đang dùng chung **một** `engine`.

---

`thread_local` là một công cụ mạnh mẽ để tạo ra các biến có vòng đời tĩnh nhưng trạng thái lại là của riêng từng thread. Nó đặc biệt hữu ích khi bạn cần các tài nguyên riêng cho mỗi thread (như random number engine, bộ đệm, biến `errno`...) mà không muốn phải truyền chúng qua lại giữa các hàm một cách phức tạp.

Nó là một cách tuyệt vời để **tránh chia sẻ dữ liệu khi việc chia sẻ là không cần thiết**, giúp giảm độ phức tạp của việc đồng bộ hóa.

*Until then, keep coding!*
