---
title: 'Một Vòng Lặp Vô Tận Tinh Vi: Phân Tích Livelock Qua Một Ví Dụ C++'
date: '2025-07-26 01:46:56'
date_gmt: '2025-07-25 18:46:56'
modified: '2025-07-26 17:38:00'
status: publish
slug: mot-vong-lap-vo-tan-tinh-vi-phan-tich-livelock-qua-mot-vi-du-c
wordpress_id: 234
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/mot-vong-lap-vo-tan-tinh-vi-phan-tich-livelock-qua-mot-vi-du-c/
categories:
- C++ Multithreading
tags: []
---

Trong lập trình multi-thread, những đoạn code trông có vẻ vô hại nhất đôi khi lại ẩn chứa những cạm bẫy tinh vi. Hãy cùng xem xét một ví dụ sau:

C++

```
#include <thread>

int x{0};
 
void func() {
    while (x == 0) {
        x = 1 - x;
    }
}
 
int main() {
    std::thread thr1{ func };
    std::thread thr2{ func };

    thr1.join();
    thr2.join();

    return 0;
}
```

Nhìn qua, logic có vẻ đơn giản. Hai thread cùng chạy hàm `func`. Một trong hai thread sẽ vào vòng lặp, gán `x = 1`, và sau đó cả hai thread sẽ thấy điều kiện `x == 0` là sai và thoát ra. Chương trình sẽ kết thúc.

Nhưng điều gì sẽ xảy ra nếu tôi nói rằng chương trình này có khả năng chạy mãi mãi? Hãy cùng phân tích để tìm ra một **livelock** tiềm ẩn.

---

### Phần 1: Phân Tích Vấn Đề - Race Condition Dẫn Đến Livelock

Vấn đề cốt lõi nằm ở chỗ biến `x` là **shared memory**, và các thao tác trên nó không có tính **nguyên tử (atomic)**. Cả việc kiểm tra điều kiện `while (x == 0)` và việc gán `x = 1 - x` đều là các thao tác riêng biệt. Điều này tạo ra một **race condition**, cho phép hệ điều hành xen kẽ (interleave) các thread theo một kịch bản "đen đủi" sau:

1. **Trạng thái ban đầu**: `x` là `0`.
2. **Thread 1** kiểm tra `x == 0`. Điều kiện **đúng**. Nó tiến vào trong vòng lặp.
3. Hệ điều hành ngắt quãng Thread 1, chuyển sang cho **Thread 2**.
4. **Thread 2** kiểm tra `x == 0`. Điều kiện cũng **đúng**. Nó cũng tiến vào trong vòng lặp.
5. **Thread 1** được chạy tiếp, thực thi `x = 1 - x;` (tức `x = 1 - 0;`). Biến `x` bây giờ có giá trị là **1**.
6. **Thread 2** được chạy tiếp, nó cũng thực thi `x = 1 - x;`. Nhưng lúc này, nó đọc giá trị hiện tại của `x` là `1`, tính toán `1 - 1 = 0`. Biến `x` bị gán **trở lại giá trị 0**.
7. **Cả hai thread** quay lại đầu vòng lặp. Khi chúng kiểm tra điều kiện `while (x == 0)`, điều kiện lại là **đúng**!

Chu trình này có thể lặp lại vô tận. Cả hai thread đều rất "bận rộn" (tiêu tốn CPU) nhưng không tạo ra bất kỳ tiến triển nào để thoát khỏi vòng lặp. Đây chính là một **livelock**.

---

### Phần 2: Giải Pháp - Đảm Bảo Tính Nguyên Tử (Atomicity)

Để sửa lỗi này, chúng ta phải đảm bảo rằng thao tác "kiểm tra và gán giá trị" phải được thực hiện như một khối duy nhất, không thể bị xen ngang.

#### Giải Pháp 1: Sử Dụng `std::mutex`

Mutex là công cụ cổ điển để bảo vệ một critical section. Ở đây, critical section chính là logic kiểm tra và thay đổi biến `x`.

C++

```
#include <thread>
#include <mutex>

int x{0};
std::mutex mtx;

void func_mutex() {
    // lock_guard đảm bảo mutex được khóa và mở khóa an toàn
    std::lock_guard<std::mutex> lock(mtx);
    
    // Toàn bộ logic kiểm tra và thay đổi nằm trong vùng được bảo vệ
    if (x == 0) {
        x = 1;
    }
}
```

Với giải pháp này, thread đầu tiên lấy được lock sẽ vào kiểm tra `x == 0`, gán `x = 1` và thoát. Thread thứ hai sau đó lấy được lock, thấy `x` đã bằng `1` nên không làm gì cả và cũng thoát. Cả hai thread đều kết thúc đúng đắn.

#### Giải Pháp 2: Sử Dụng `std::atomic` (Khuyên Dùng) 💡

Đối với các tác vụ đơn giản như xử lý một biến cờ (flag) hoặc biến đếm, `std::atomic` là giải pháp hiệu quả và "chuẩn C++" hơn. Nó thường sử dụng các chỉ thị phần cứng đặc biệt để đảm bảo tính nguyên tử mà không cần đến chi phí khóa của mutex.

C++

```
#include <thread>
#include <atomic>

// Khai báo x là một biến atomic
std::atomic<int> x{0};

void func_atomic() {
    int expected = 0;
    // Thao tác "compare-and-swap" nguyên tử:
    // Chỉ thay đổi x thành 1 NẾU giá trị hiện tại của x là 0 (expected).
    // Toàn bộ thao tác này là không thể bị chia cắt.
    x.compare_exchange_strong(expected, 1);
}
```

Đây là giải pháp tốt nhất. `compare_exchange_strong` thực hiện việc "kiểm tra và gán" trong một bước nguyên tử duy nhất. Thread đầu tiên chạy sẽ thành công. Thread thứ hai sẽ thấy `x` không còn bằng `expected` nữa nên sẽ không làm gì cả. Vấn đề race condition và livelock được giải quyết một cách triệt để và hiệu quả.

---

Bài học rút ra là những đoạn code multi-thread trông có vẻ đơn giản có thể ẩn chứa những lỗi rất tinh vi. Luôn phải đặt câu hỏi về tính nguyên tử của các thao tác trên **shared memory**. Đối với các biến đơn giản, hãy luôn ưu tiên sử dụng `std::atomic` thay cho `std::mutex`.

*Until then, keep coding!*
