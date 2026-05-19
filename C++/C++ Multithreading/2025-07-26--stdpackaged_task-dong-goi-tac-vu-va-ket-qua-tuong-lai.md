---
title: 'std::packaged_task: "Đóng Gói" Tác Vụ và Kết Quả Tương Lai'
date: '2025-07-26 16:09:42'
date_gmt: '2025-07-26 09:09:42'
modified: '2025-07-26 17:36:25'
status: publish
slug: stdpackaged_task-dong-goi-tac-vu-va-ket-qua-tuong-lai
wordpress_id: 271
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/stdpackaged_task-dong-goi-tac-vu-va-ket-qua-tuong-lai/
categories:
- C++ Multithreading
tags: []
---

Trong các bài học trước, chúng ta đã phải tự "kết nối" một `std::promise` và một `std::future` một cách thủ công để lấy kết quả từ một thread. Mặc dù cách làm này rất mạnh mẽ, nó đòi hỏi một vài bước thiết lập.

C++ cung cấp một giải pháp ở mức độ cao hơn để đơn giản hóa quá trình này: **`std::packaged_task`**. Nó là một công cụ giúp "đóng gói" một tác vụ và kênh giao tiếp kết quả của nó vào một đối tượng duy nhất.

---

### Phần 1: `std::packaged_task` là gì? 🎁

`std::packaged_task` (từ header `<future>`) là một lớp bao bọc (wrapper) chứa hai thứ bên trong nó:

1. Một **callable object** (hàm, lambda, functor...): Đây chính là công việc, là đoạn code cần được thực thi.
2. Một **`std::promise`**: Được dùng để lưu trữ kết quả (hoặc exception) sau khi callable object thực thi xong.

**Chữ ký (Signature):** Nó là một class template có dạng `std::packaged_task<ReturnType(ArgTypes...)>`, tương tự như `std::function`.

C++

```
// Một task nhận 2 int và trả về 1 int
std::packaged_task<int(int, int)> my_task;
```

**Điểm khác biệt cốt lõi với `std::thread`:**

> **Việc tạo ra một `std::packaged_task` KHÔNG thực thi nó.** Nó chỉ "đóng gói" và chuẩn bị sẵn sàng. Điều này cho chúng ta toàn quyền kiểm soát **khi nào** và **ở đâu** tác vụ sẽ được chạy.

Để lấy kết quả, bạn gọi phương thức `get_future()` trên đối tượng task, nó sẽ trả về một `std::future` được liên kết với `promise` bên trong.

---

### Phần 2: Hai Cách Thực Thi một `packaged_task`

Đây là phần thú vị nhất. Cùng một đối tượng `packaged_task`, bạn có thể chọn chạy nó theo cách đồng bộ hoặc bất đồng bộ.

**a) Thực thi Đồng bộ (Synchronously)** Bạn có thể gọi trực tiếp đối tượng task như một hàm. Khi đó, tác vụ sẽ chạy trên **thread hiện tại** và **block** cho đến khi hoàn thành.

C++

```
#include <iostream>
#include <future>
#include <chrono>

using namespace std::chrono_literals;

int add(int a, int b) {
    std::cout << "Task dang chay dong bo...\n";
    std::this_thread::sleep_for(2s);
    return a + b;
}

int main() {
    std::packaged_task<int(int, int)> task(add);
    std::future<int> f = task.get_future();

    std::cout << "Main: chuan bi goi task...\n";
    // Chạy task trên main thread. Main thread sẽ bị block ở đây trong 2 giây.
    task(6, 7);
    std::cout << "Main: task da chay xong.\n";
    
    std::cout << "Ket qua la: " << f.get() << std::endl;
    return 0;
}
```

Bạn sẽ thấy có một độ trễ 2 giây trước khi dòng "Main: task da chay xong." được in ra.

**b) Thực thi Bất đồng bộ (Asynchronously)** Để chạy tác vụ trên một thread mới, bạn chỉ cần `std::move` đối tượng task vào constructor của `std::thread`.

C++

```
// ... hàm add() giữ nguyên ...

int main() {
    std::packaged_task<int(int, int)> task(add);
    std::future<int> f = task.get_future();

    std::cout << "Main: chuan bi khoi tao thread...\n";
    // Chạy task trên một thread mới.
    std::thread t(std::move(task), 6, 7);
    t.detach(); // Hoặc t.join() nếu cần

    std::cout << "Main: thread da duoc khoi tao. Main tiep tuc chay.\n";
    
    // get() vẫn sẽ block cho đến khi task trên thread kia hoàn thành.
    std::cout << "Ket qua la: " << f.get() << std::endl; 
    return 0;
}
```

Lần này, dòng "Main: thread da duoc khoi tao..." sẽ được in ra ngay lập tức. Main thread không bị block. Chỉ có lời gọi `f.get()` mới block để chờ kết quả.

---

### Phần 3: Tại Sao Nên Dùng `packaged_task`?

- **Code Sạch Sẽ Hơn**: Nó ẩn đi việc phải tạo và quản lý `std::promise` một cách thủ công.
- **Kiểm Soát Tốt Hơn**: Nó tách biệt việc **định nghĩa** một tác vụ khỏi việc **thực thi** nó. Điều này cực kỳ hữu ích.
- **Các Ứng Dụng Nâng Cao**: Vì có thể tạo ra các task mà không chạy ngay, chúng ta có thể lưu chúng vào một container (ví dụ `std::vector`), truyền chúng qua lại, và xây dựng các hệ thống phức tạp như **thread pool** hoặc các bộ lập lịch tác vụ (scheduler) tùy chỉnh.

---

`std::packaged_task` là một khối xây dựng (building block) mạnh mẽ cho lập trình bất đồng bộ. Nó đóng gói một tác vụ và kênh kết quả của nó một cách gọn gàng, đồng thời cho chúng ta toàn quyền quyết định khi nào và ở đâu tác vụ đó sẽ được thực thi.

Tuy nhiên, C++ còn cung cấp một công cụ ở mức độ cao hơn nữa, giúp chúng ta thực hiện các tác vụ bất đồng bộ mà không cần phải quản lý cả `packaged_task` hay `std::thread`. Trong bài học tiếp theo, chúng ta sẽ khám phá công cụ tiện lợi tối thượng: `std::async`.

## Thực Hành: Xây Dựng Producer-Consumer với `std::promise` và `std::future`

Bài tập này yêu cầu chúng ta quay trở lại những khối xây dựng (building blocks) cơ bản. Thay vì dùng `std::packaged_task` tiện lợi, chúng ta sẽ tự mình "kết nối" một `std::promise` và một `std::future` để truyền kết quả tính toán từ một thread Producer sang một thread Consumer.

Đây là một bài thực hành tuyệt vời để củng cố sự hiểu biết của chúng ta về cách các thành phần này hoạt động cùng nhau.

---

### Mục Tiêu

Xây dựng một chương trình C++ gồm hai thread:

1. **Thread Producer (`adder_thread`)**: Nhận vào hai số nguyên, tính tổng của chúng, và lưu kết quả vào một `std::promise`.
2. **Thread Consumer (`printer_thread`)**: Nhận một `std::future`, chờ đợi và in kết quả được gửi bởi Producer.

---

### Code Lời Giải

Dưới đây là một chương trình C++ hoàn chỉnh, có thể biên dịch và chạy được, đáp ứng đúng các yêu cầu của bài tập.

C++

```
#include <iostream>
#include <thread>
#include <future>
#include <chrono>
#include <functional> // Cần thiết cho std::ref

// === PRODUCER THREAD ===
// Nhiệm vụ: Tính tổng và "thực hiện lời hứa"
void adder_thread(std::promise<int>& p, int a, int b) {
    std::cout << "Producer: Bat dau tinh toan...\n";
    std::this_thread::sleep_for(std::chrono::seconds(2)); // Giả lập công việc
    int sum = a + b;
    
    // Gửi kết quả qua promise
    p.set_value(sum); 
    
    std::cout << "Producer: Da gui ket qua.\n";
}

// === CONSUMER THREAD ===
// Nhiệm vụ: Chờ đợi và nhận kết quả từ "tương lai"
void printer_thread(std::future<int>& f) {
    std::cout << "Consumer: Dang cho ket qua...\n";
    
    // f.get() sẽ block thread này cho đến khi producer gọi set_value()
    int result = f.get(); 
    
    std::cout << "Consumer: Da nhan duoc ket qua: " << result << std::endl;
}

int main() {
    int val1 = 20;
    int val2 = 22;

    // 1. Tạo cặp đôi promise và future trong main thread
    std::promise<int> sum_promise;
    std::future<int> sum_future = sum_promise.get_future();

    // 2. Khởi tạo các thread
    //    - Dùng std::move cho promise vì nó là move-only.
    //    - Dùng std::move cho future vì nó cũng là move-only.
    std::thread producer(adder_thread, std::ref(sum_promise), val1, val2);
    std::thread consumer(printer_thread, std::ref(sum_future));

    // 3. Chờ cả hai thread hoàn thành
    producer.join();
    consumer.join();
    
    std::cout << "Chuong trinh ket thuc." << std::endl;

    return 0;
}
```

---

### Phân Tích Kết Quả

Khi bạn biên dịch và chạy chương trình trên, output sẽ tương tự như sau:

```
Consumer: Dang cho ket qua...
Producer: Bat dau tinh toan...
Producer: Da gui ket qua.
Consumer: Da nhan duoc ket qua: 42
Chuong trinh ket thuc.
```

Chương trình đã hoạt động chính xác như mong đợi:

- Cả hai thread khởi chạy gần như đồng thời.
- Thread Consumer ngay lập tức bị block tại `sum_future.get()`.
- Thread Producer thực hiện công việc tính toán, sau đó "đánh thức" Consumer dậy bằng cách gọi `sum_promise.set_value()`.
- Consumer nhận được kết quả và in ra.
- Cả hai thread kết thúc và chương trình thoát một cách an toàn.

Bài tập này đã minh họa thành công cách chúng ta có thể phối hợp hai thread và truyền dữ liệu giữa chúng một cách an toàn và hiệu quả chỉ với `std::promise` và `std::future`.

*Until then, keep coding!*
