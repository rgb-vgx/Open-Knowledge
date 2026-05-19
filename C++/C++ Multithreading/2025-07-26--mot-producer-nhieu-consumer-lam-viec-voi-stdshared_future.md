---
title: 'Một Producer, Nhiều Consumer: Làm Việc với std::shared_future'
date: '2025-07-26 15:16:36'
date_gmt: '2025-07-26 08:16:36'
modified: '2025-07-26 17:36:56'
status: publish
slug: mot-producer-nhieu-consumer-lam-viec-voi-stdshared_future
wordpress_id: 254
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/mot-producer-nhieu-consumer-lam-viec-voi-stdshared_future/
categories:
- C++ Multithreading
tags: []
---

Trong các ví dụ trước, chúng ta luôn làm việc với mô hình 1-1: một thread Producer gửi kết quả cho một thread Consumer duy nhất.

Nhưng điều gì sẽ xảy ra nếu có **nhiều thread Consumer** cùng muốn chờ đợi và nhận **cùng một kết quả**? Ví dụ, một thread tính toán ra một giá trị quan trọng, và nhiều thread khác cần sử dụng giá trị đó để tiếp tục công việc của chúng. Liệu chúng ta có thể chia sẻ một đối tượng `std::future` cho tất cả chúng không?

Bài viết này sẽ giải thích tại sao đó là một ý tưởng tồi và giới thiệu công cụ đúng đắn cho công việc này: **`std::shared_future`**.

---

### Phần 1: Vấn Đề với `std::future` - "Quyền Sở Hữu Duy Nhất"

Câu trả lời ngắn gọn là: **KHÔNG, bạn không thể chia sẻ `std::future`**.

Lý do là vì `std::future` được thiết kế theo nguyên tắc "quyền sở hữu duy nhất".

1. **Nó là Move-Only**: Giống như `std::unique_ptr`, bạn không thể sao chép (copy) một `std::future`. Bạn chỉ có thể di chuyển (move) quyền sở hữu của nó.
2. **Không an toàn cho thread (Not Thread-Safe)**: Thư viện chuẩn không đảm bảo điều gì sẽ xảy ra nếu nhiều thread cùng lúc gọi `get()` trên cùng một đối tượng `std::future`. Việc này sẽ gây ra Data Race và Undefined Behavior.

Nếu bạn cố gắng chia sẻ một `std::future` cho nhiều thread, chương trình của bạn có thể crash, hoặc "tình cờ" chạy đúng trên một số trình biên dịch nhưng lại sai trên trình biên dịch khác. Đây là một lỗi rất nguy hiểm.

---

### Phần 2: Giải Pháp - `std::shared_future` 🤝

Để giải quyết kịch bản "một producer, nhiều consumer", C++ cung cấp lớp **`std::shared_future`**.

- **Đặc tính quan trọng nhất**: `std::shared_future` **có thể sao chép (copyable)**.
- **Cách hoạt động**: Bạn có thể tạo ra nhiều bản sao của một `std::shared_future`. Tất cả các bản sao này đều tham chiếu đến cùng một shared state. Thư viện chuẩn đảm bảo rằng việc gọi `get()` trên các bản sao khác nhau từ các thread khác nhau là hoàn toàn an toàn.

---

### Phần 3: Cách Tạo và Sử Dụng `std::shared_future`

Chúng ta không tạo `std::shared_future` trực tiếp từ `std::promise`. Quy trình là chuyển đổi từ một `std::future`.

1. Tạo `std::promise` và lấy ra `std::future` như bình thường.
2. Chuyển `std::future` thành `std::shared_future`.

C++

```
std::promise<int> p;

// Lấy ra future duy nhất
std::future<int> f = p.get_future();

// Chuyển future thành shared_future. Sau bước này, 'f' không còn hợp lệ.
std::shared_future<int> sf = f.share();
```

Từ đối tượng `sf` ban đầu, giờ đây bạn có thể tạo ra bao nhiêu bản sao tùy thích để gửi cho các thread consumer.

**Code minh họa:**

C++

```
#include <iostream>
#include <thread>
#include <future>
#include <chrono>
#include <vector>

// Producer không có gì thay đổi
void producer(std::promise<int>& p) {
    std::cout << "Producer: Dang tinh toan...\n";
    std::this_thread::sleep_for(std::chrono::seconds(2));
    p.set_value(42);
}

// Consumer bây giờ nhận shared_future
void consumer(int id, std::shared_future<int> sf) {
    std::cout << "Consumer " << id << ": Dang cho ket qua...\n";
    // get() an toàn để gọi từ nhiều thread
    int result = sf.get(); 
    std::cout << "Consumer " << id << ": Da nhan duoc ket qua: " << result << std::endl;
}

int main() {
    std::promise<int> my_promise;
    std::future<int> my_future = my_promise.get_future();
    
    // Chuyển thành shared_future
    std::shared_future<int> shared_f = my_future.share();

    std::vector<std::thread> threads;
    threads.emplace_back(producer, std::ref(my_promise));
    
    // Tạo nhiều consumer, mỗi consumer nhận một BẢN SAO của shared_future
    threads.emplace_back(consumer, 1, shared_f);
    threads.emplace_back(consumer, 2, shared_f);
    threads.emplace_back(consumer, 3, shared_f);

    for (auto& t : threads) {
        t.join();
    }
    return 0;
}
```

Khi chạy chương trình này, bạn sẽ thấy thread Producer chạy, và sau 2 giây, **tất cả 3 thread Consumer** sẽ đồng loạt được đánh thức và nhận được cùng một kết quả là `42`.

---

**Quy tắc rất đơn giản:**

- Sử dụng `std::future` cho kịch bản 1 producer - 1 consumer.
- Sử dụng `std::shared_future` cho kịch bản 1 producer - **nhiều consumer**.

`std::shared_future` là công cụ chuẩn và an toàn để "phát sóng" (broadcast) một kết quả duy nhất tới nhiều thread đang chờ đợi.

*Until then, keep coding!*
