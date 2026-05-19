---
title: 'C++ Multithreading #13: Hậu Quả Của Data Race: Khi "Bất Khả Thi" Trở Thành
  Hiện Thực'
date: '2025-07-12 00:58:08'
date_gmt: '2025-07-11 17:58:08'
modified: '2025-07-24 01:46:15'
status: publish
slug: hau-qua-cua-data-race-khi-bat-kha-thi-tro-thanh-hien-thuc
wordpress_id: 157
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/12/hau-qua-cua-data-race-khi-bat-kha-thi-tro-thanh-hien-thuc/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã thấy một ví dụ trực quan về Data Race qua `std::cout`. Output bị xáo trộn, nhưng chương trình không crash. Điều này có thể tạo ra một cảm giác sai lầm rằng Data Race "không quá nguy hiểm".

Sự thật hoàn toàn ngược lại. Trong C++, **không có data race nào là vô hại (benign)**. Bài viết này sẽ là một "bộ sưu tập" các kịch bản kinh dị, cho thấy một Data Race có thể phá hủy chương trình của bạn theo những cách tinh vi và khó lường nhất, biến những điều "lẽ ra không thể xảy ra" thành hiện thực.

#### **Loại 1: Kết Quả Thiếu Nhất Quán (Inconsistent Results)**

Đây là hậu quả dễ hình dung nhất. Các thread đọc giá trị của dữ liệu chia sẻ tại các thời điểm khác nhau, dẫn đến kết quả tính toán không nhất quán về mặt logic.

C++

```
// Dữ liệu chia sẻ
int x = 5;

// --- Thread A ---
// (1)
int y = x * 10; // y = 5 * 10 = 50

// --- Thread B xen ngang ---
x = 6;

// --- Thread A tiếp tục ---
// (2)
int z = x * 10; // z = 6 * 10 = 60

// >> Kết quả: y và z được tính toán dựa trên hai giá trị khác nhau của x,
//    dù chúng nằm trong cùng một luồng logic của thread A.
```

```
#include <iostream>
#include <thread>
#include <chrono>

// Biến chia sẻ giữa các thread
int x = 5;

void threadA() {
    // (1) Tính y theo x hiện tại
    int y = x * 10; // y = 50 nếu x chưa bị thay đổi
    std::this_thread::sleep_for(std::chrono::milliseconds(100)); // giả lập delay
    // (2) Sau khi x bị thay đổi bởi thread B
    int z = x * 10; // z = 60 nếu x đã bị thay đổi thành 6
    std::cout << "[Thread A] y = " << y << ", z = " << z << "\n";
}

void threadB() {
    std::this_thread::sleep_for(std::chrono::milliseconds(50)); // chạy giữa (1) và (2)
    x = 6; // thay đổi x
    std::cout << "[Thread B] x changed to 6\n";
}

int main() {
    std::thread tA(threadA);
    std::thread tB(threadB);

    tA.join();
    tB.join();

    return 0;
}
```

#### **Loại 2: Luồng Logic Bị Phá Vỡ (Broken Program Logic)**

Đây là kịch bản nguy hiểm hơn, nơi một Data Race phá vỡ các quy tắc và điều kiện mà bạn đã cẩn thận đặt ra trong code.

**Ví dụ 1: Lỗi "Bất Khả Thi"**

Mô hình "kiểm tra rồi hành động" (check-then-act) rất phổ biến, nhưng lại cực kỳ nguy hiểm nếu không có đồng bộ hóa.

C++

```
// Dữ liệu chia sẻ
double x = 1.0;

// --- Thread A ---
// (1) Kiểm tra điều kiện: x là số dương
if (x >= 0.0) {

    // --- Thread B xen ngang ---
    x = -1.0;

    // --- Thread A tiếp tục ---
    // (2) Hành động: tự tin rằng x >= 0
    double result = sqrt(x); // CRASH! Gọi sqrt(-1.0)
}
// >> Lỗi runtime xảy ra dù đã có câu lệnh 'if' để kiểm tra.
//    Thread B đã thay đổi giá trị của x trong khoảng thời gian cực ngắn
//    giữa lúc thread A kiểm tra và hành động.
```

```
#include <iostream>
#include <thread>
#include <cmath>
#include <chrono>

// Biến dùng chung
double x = 1.0;

void threadA() {
    if (x >= 0.0) {
        std::this_thread::sleep_for(std::chrono::milliseconds(100)); // tạo khoảng trống để thread B xen vào
        double result = sqrt(x); // có thể crash nếu x bị đổi thành -1.0
        std::cout << "[Thread A] sqrt(x) = " << result << "\n";
    } else {
        std::cout << "[Thread A] x is negative\n";
    }
}

void threadB() {
    std::this_thread::sleep_for(std::chrono::milliseconds(50)); // chạy vào giữa if và sqrt
    x = -1.0;
    std::cout << "[Thread B] x changed to -1.0\n";
}

int main() {
    std::thread tA(threadA);
    std::thread tB(threadB);

    tA.join();
    tB.join();

    return 0;
}
```

**Ví dụ 2: Lỗi Jump Table**

Đôi khi, trình biên dịch tối ưu hóa câu lệnh `switch` bằng một "jump table" - một mảng các con trỏ hàm. Điều này còn nguy hiểm hơn.

C++

```
// switch (x) { case 1: f1(); break; ... case 9: f9(); break; }
// có thể được tối ưu hóa thành:
// function_pointer_array[x]();

// --- Thread A ---
// (1) Kiểm tra x trong khoảng an toàn [1, 9]
if (x >= 1 && x <= 9) {

    // --- Thread B xen ngang ---
    x = 10; // Giá trị ngoài khoảng

    // --- Thread A tiếp tục ---
    // (2) Thực hiện jump table
    function_pointer_array[x](); // Nhảy đến địa chỉ rác ngoài mảng!
}
// >> Chương trình có thể thực thi một đoạn mã lệnh hoàn toàn ngẫu nhiên,
//    dẫn đến những hậu quả không thể lường trước.
```

#### **Loại 3: "Torn Reads" và "Torn Writes" (Đọc/Ghi Bị Xé Rách)**

Với các kiểu dữ liệu lớn hơn một word của máy (ví dụ `long long` trên hệ thống 32-bit), việc đọc hoặc ghi không phải là một thao tác nguyên tử (atomic). Nó có thể bị "xé" thành nhiều phần.

- **Torn Write:** Thread A muốn ghi giá trị `0xAAAAAAAA`, Thread B muốn ghi `0xBBBBBBBB`.
  1. Thread A ghi nửa đầu: `AAAA____`.
  2. Thread B xen ngang, ghi toàn bộ giá trị của nó: `BBBBBBBB`.
  3. Thread A tiếp tục, ghi nốt nửa sau: `BBBB**AAAA**`.
  - Kết quả cuối cùng là một giá trị rác, không phải của A cũng không phải của B.
- **Torn Read:** Tương tự, một thread có thể đọc được một nửa giá trị cũ và một nửa giá trị mới, tạo ra một kết quả không bao giờ tồn tại trên thực tế.

```
#include <iostream>
#include <thread>
#include <chrono>
#include <cstdint>
#include <iomanip>

volatile uint64_t shared = 0;

void writerA() {
    while (true) {
        // Ghi nửa đầu (32 bit cao)
        uint32_t* ptr = reinterpret_cast<uint32_t*>(&shared);
        ptr[1] = 0xAAAAAAAA; // phần cao
        std::this_thread::sleep_for(std::chrono::microseconds(1)); // tạo khoảng trống
        ptr[0] = 0xAAAAAAAA; // phần thấp
    }
}

void writerB() {
    while (true) {
        shared = 0xBBBBBBBBBBBBBBBB; // ghi toàn bộ 64 bit
    }
}

void reader() {
    while (true) {
        uint64_t val = shared;
        if (val != 0xAAAAAAAAAAAAAAAA && val != 0xBBBBBBBBBBBBBBBB) {
            std::cout << "❗ Torn value detected: 0x" 
                      << std::hex << std::setw(16) << std::setfill('0') << val << "\n";
        }
    }
}

int main() {
    std::thread t1(writerA);
    std::thread t2(writerB);
    std::thread t3(reader);

    t1.join();
    t2.join();
    t3.join();
    return 0;
}
```

#### **Loại 4: Vòng Đời Đối Tượng Bị Hỏng (Corrupted Object Lifecycle)**

**a) Khởi tạo không đúng cách (Improper Construction)** Nếu hai thread cùng gọi constructor để tạo một đối tượng tại cùng một địa chỉ bộ nhớ, kết quả có thể là một đối tượng "bị xé", với một nửa thuộc tính được khởi tạo bởi thread này, nửa còn lại bởi thread kia.

```
#include <iostream>
#include <thread>
#include <chrono>

struct MyObject {
    int a;
    int b;
    MyObject() {
        std::cout << "[Constructor] Start\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(50)); // giả lập khởi tạo chậm
        a = 1;
        b = 2;
        std::cout << "[Constructor] End\n";
    }
};

MyObject* shared_ptr = nullptr;

void threadA() {
    shared_ptr = new MyObject(); // khởi tạo đối tượng
}

void threadB() {
    shared_ptr = new MyObject(); // cũng khởi tạo tại cùng địa chỉ!
}

void reader() {
    std::this_thread::sleep_for(std::chrono::milliseconds(30)); // truy cập giữa lúc khởi tạo
    if (shared_ptr) {
        std::cout << "[Reader] a = " << shared_ptr->a << ", b = " << shared_ptr->b << "\n";
    } else {
        std::cout << "[Reader] shared_ptr is null\n";
    }
}

int main() {
    std::thread t1(threadA);
    std::thread t2(threadB);
    std::thread t3(reader);

    t1.join();
    t2.join();
    t3.join();

    delete shared_ptr;
    return 0;
}
```

Một kịch bản tinh vi hơn là khi một thread truy cập vào một đối tượng **đang được khởi tạo dang dở**.

```
#include <iostream>
#include <thread>
#include <memory>
#include <chrono>

struct MyObject {
    int a;
    int b;
    MyObject() {
        std::cout << "[Constructor] Start\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(100)); // giả lập khởi tạo chậm
        a = 42;
        b = 99;
        std::cout << "[Constructor] End\n";
    }
};

std::shared_ptr<MyObject> sharedObj;

void creator() {
    sharedObj = std::make_shared<MyObject>(); // khởi tạo chậm
}

void reader() {
    std::this_thread::sleep_for(std::chrono::milliseconds(50)); // truy cập giữa lúc khởi tạo
    if (sharedObj) {
        std::cout << "[Reader] a = " << sharedObj->a << ", b = " << sharedObj->b << "\n";
    } else {
        std::cout << "[Reader] sharedObj is null\n";
    }
}

int main() {
    std::thread t1(creator);
    std::thread t2(reader);

    t1.join();
    t2.join();

    return 0;
}
```

**b) Hủy không đúng cách (Improper Destruction)** Đây là một ví dụ kinh điển với cơ chế đếm tham chiếu (reference counting) tự cài đặt.

C++

```
// Dữ liệu chia sẻ
int ref_count = 1;

// --- Thread A ---
// (1) Giảm ref_count
ref_count--; // ref_count bây giờ là 0

// --- Thread B xen ngang ---
// (2) Cũng giảm ref_count
ref_count--; // ref_count bây giờ là -1

// --- Thread A tiếp tục ---
if (ref_count == 0) { /* delete resource */ } // Điều kiện sai, không delete

// --- Thread B tiếp tục ---
if (ref_count == 0) { /* delete resource */ } // Điều kiện sai, không delete

// >> Kết quả: Tài nguyên không bao giờ được giải phóng -> Memory Leak.
//    Một kịch bản khác (nếu ref_count ban đầu là 2) có thể dẫn đến Double Delete -> Crash.
```

### **Kết Luận: Không Có Data Race Nào Là Vô Hại**

Qua các ví dụ trên, có thể thấy rõ:

- Data Race rất **tinh vi và khó lường**. Chúng có thể không xuất hiện trong hàng ngàn lần chạy thử, nhưng lại xảy ra vào thời điểm hệ thống chịu tải nặng hoặc trên một cấu hình phần cứng khác.
- Chúng gây ra những lỗi logic nghiêm trọng, phá vỡ các giả định an toàn của bạn và dẫn đến **Undefined Behavior**.

Cách duy nhất để chiến thắng trong cuộc chiến này là **phòng ngừa**. Có hai quy tắc vàng:

1. **Cách tốt nhất: Không chia sẻ dữ liệu giữa các thread.**
2. **Cách bắt buộc (nếu phải chia sẻ): Luôn luôn đồng bộ hóa (synchronize) mọi truy cập đến dữ liệu được chia sẻ.**

Việc đồng bộ hóa có chi phí về hiệu năng và làm tăng độ phức tạp của code, nhưng đó là cái giá bắt buộc phải trả để có được một chương trình đúng đắn.

Bây giờ khi đã thực sự hiểu sự kinh hoàng của Data Race, chúng ta đã sẵn sàng để học về các công cụ để ngăn chặn chúng.

*Until then, keep coding!*
