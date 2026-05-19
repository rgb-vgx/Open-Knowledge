---
title: 'Monitor Pattern: Hành Trình Xây Dựng Một Lớp "Tự Đồng Bộ Hóa"'
date: '2025-07-26 17:20:20'
date_gmt: '2025-07-26 10:20:20'
modified: '2025-07-26 17:33:11'
status: publish
slug: monitor-pattern-hanh-trinh-xay-dung-mot-lop-tu-dong-bo-hoa
wordpress_id: 305
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/monitor-pattern-hanh-trinh-xay-dung-mot-lop-tu-dong-bo-hoa/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã học cách sử dụng các lớp thread-safe có sẵn và cách dùng mutex để bảo vệ các đối tượng thông thường. Bây giờ, hãy tiến thêm một bước: tự xây dựng một lớp có khả năng tự đồng bộ hóa. Mẫu thiết kế này được gọi là **Monitor**.

Một lớp Monitor là một lớp được đồng bộ hóa từ bên trong (internally synchronized). Nó tự chịu trách nhiệm bảo vệ dữ liệu nội bộ của mình khỏi Data Race, giúp cho người dùng lớp có thể sử dụng nó một cách an toàn trong môi trường multi-thread mà không cần bận tâm đến mutex.

Hãy cùng khám phá hành trình xây dựng một Monitor qua ví dụ kinh điển: giao dịch ngân hàng.

---

### Phần 1: Bài Toán - Giao Dịch Ngân Hàng An Toàn 🏦

Mục tiêu của chúng ta là thực hiện một giao dịch chuyển tiền. Giao dịch này phải có tính **nguyên tử (atomic)**. Người quan sát từ bên ngoài chỉ được phép thấy một trong hai trạng thái: hoặc là tiền vẫn ở tài khoản nguồn, hoặc là tiền đã ở tài khoản đích. Họ không bao giờ được thấy trạng thái trung gian "tiền bốc hơi".

Hãy bắt đầu với một lớp `Bank` đơn giản:

C++

```
class Bank {
private:
    double balance;
public:
    void debit(double amount);  // Trừ tiền
    void credit(double amount); // Cộng tiền
    double get_balance() const; // Xem số dư
};
```

---

### Phần 2: Cách Tiếp Cận 1 - Mutex Nội Bộ

Ý tưởng đầu tiên và rõ ràng nhất là đặt một `std::mutex` vào bên trong chính lớp `Bank`. Mỗi phương thức sẽ sử dụng `std::lock_guard` để khóa mutex này trước khi thao tác.

**Code:**

C++

```
#include <mutex>

class Bank {
private:
    double balance{0.0};
    std::mutex mtx;
public:
    void debit(double amount) {
        std::lock_guard<std::mutex> lock(mtx);
        balance -= amount;
    }
    void credit(double amount) {
        std::lock_guard<std::mutex> lock(mtx);
        balance += amount;
    }
    // ...
};
```

**Phân Tích Nhược Điểm:** Cách làm này có vẻ an toàn, nhưng lại tiềm ẩn nhiều vấn đề nghiêm trọng:

1. **Nguy cơ Deadlock**: Nếu một phương thức (ví dụ `debit`) cần gọi một phương thức khác trong cùng đối tượng (ví dụ `get_balance`), nó sẽ cố gắng `lock` cùng một mutex hai lần, gây ra deadlock.
2. **Giao dịch không hiệu quả**: Một giao dịch chuyển tiền `bank.debit(100); bank.credit(100);` sẽ thực hiện hai chu trình `lock`/`unlock` riêng biệt, gây ra overhead không cần thiết.
3. **Nguy cơ Race Condition**: Quan trọng nhất, giữa lúc `debit()` vừa `unlock` xong và `credit()` chưa kịp `lock`, một thread khác có thể xen vào và gọi `get_balance()`. Thread này sẽ thấy một trạng thái không nhất quán của hệ thống (tiền đã "bốc hơi" khỏi tài khoản nguồn nhưng chưa xuất hiện ở tài khoản đích). Giao dịch của chúng ta đã không còn atomic nữa!
4. **Tính Xâm Lấn (Invasive)**: Cách làm này đòi hỏi chúng ta phải sửa đổi code gốc của lớp `Bank`. Điều này là bất khả thi nếu chúng ta không có mã nguồn hoặc không muốn thay đổi một lớp đã được kiểm thử kỹ lưỡng.

---

### Phần 3: Cách Tiếp Cận 2 - Lớp "Monitor" Bao Bọc

Để giải quyết vấn đề "xâm lấn", chúng ta có thể tạo một lớp bao bọc (wrapper class) bên ngoài. Lớp này, `BankMonitor`, sẽ chứa cả đối tượng `Bank` và `std::mutex`.

**Code:**

C++

```
#include <mutex>

// Lớp Bank gốc không thay đổi, không biết gì về thread
class Bank { /* ... */ };

class BankMonitor {
private:
    Bank bank_object;
    std::mutex mtx;
public:
    void debit(double amount) {
        std::lock_guard<std::mutex> lock(mtx);
        bank_object.debit(amount);
    }
    void credit(double amount) {
        std::lock_guard<std::mutex> lock(mtx);
        bank_object.credit(amount);
    }
    // ...
};

// Sử dụng:
BankMonitor safe_bank;
safe_bank.debit(100); // An toàn
```

**Phân Tích:**

- **Ưu điểm**: ✅ Giải quyết được vấn đề "xâm lấn". Chúng ta có thể áp dụng pattern này cho bất kỳ lớp nào mà không cần sửa đổi code gốc của nó.
- **Nhược điểm**: ❌ Nó **không hề giải quyết** 3 vấn đề còn lại. Nguy cơ deadlock, sự không hiệu quả, và race condition giữa các lời gọi hàm vẫn còn y nguyên.

---

Chúng ta đã tiến bộ hơn trong việc thiết kế, tạo ra một giải pháp không xâm lấn, nhưng vẫn chưa giải quyết được bài toán cốt lõi: làm thế nào để thực hiện một **chuỗi các thao tác** như một giao dịch atomic duy nhất.

Chúng ta cần một cách để "lock đối tượng, thực hiện một loạt hành động, rồi unlock". Làm thế nào để đạt được điều này mà không "để lộ" mutex ra cho người dùng? Lời giải nằm ở một cách sử dụng `lambda` thông minh, và chúng ta sẽ khám phá nó trong bài học tiếp theo.

*Until then, keep coding!*
