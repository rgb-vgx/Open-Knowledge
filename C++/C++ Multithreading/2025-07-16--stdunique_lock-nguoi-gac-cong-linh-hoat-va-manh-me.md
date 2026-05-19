---
title: 'C++ Multithreading #19: std::unique_lock: "Người Gác Cổng" Linh Hoạt và Mạnh
  Mẽ'
date: '2025-07-16 00:57:15'
date_gmt: '2025-07-15 17:57:15'
modified: '2025-10-11 14:18:19'
status: publish
slug: stdunique_lock-nguoi-gac-cong-linh-hoat-va-manh-me
wordpress_id: 182
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/16/stdunique_lock-nguoi-gac-cong-linh-hoat-va-manh-me/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã tôn vinh `std::lock_guard` như một "người hùng" RAII, giúp giải quyết triệt để vấn đề an toàn với exception khi làm việc với `std::mutex`. Tuy nhiên, chúng ta cũng đã phát hiện ra một hạn chế của nó: sự "cứng nhắc". `lock_guard` luôn giữ khóa cho đến hết scope, điều này đôi khi làm giảm hiệu năng không cần thiết.

Vậy nếu chúng ta cần sự an toàn của RAII nhưng lại muốn có sự linh hoạt để có thể mở khóa sớm hơn thì sao? Đây là lúc "người gác cổng" mạnh mẽ hơn xuất hiện: `std::unique_lock`.

#### **Phần 1: Giải Quyết Hạn Chế Của `lock_guard`**

Hãy cùng xem lại vấn đề của `lock_guard`:

C++

```
{
    std::lock_guard<std::mutex> guard(mtx);
    shared_data++; // Critical section kết thúc ở đây.
    
    // Công việc dài nhưng không cần khóa
    std::this_thread::sleep_for(2s); 
} // Mutex chỉ được unlock tại đây, lãng phí 2 giây!
```

`std::unique_lock` giải quyết vấn đề này một cách hoàn hảo. Nó cũng là một lớp RAII (destructor sẽ tự động unlock), nhưng nó cung cấp thêm phương thức `unlock()` để chúng ta có thể chủ động mở khóa bất cứ lúc nào.

C++

```
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;

void task() {
    { // Tạo một scope riêng để minh họa
        std::unique_lock<std::mutex> lock(mtx); // Tự động lock mutex
        
        std::cout << std::this_thread::get_id() << ": Critical section dang chay...\n";
        // Critical section kết thúc
        
        lock.unlock(); // Mở khóa mutex một cách chủ động!
        
        // Công việc dài nhưng không cần khóa
        std::cout << std::this_thread::get_id() << ": Da unlock, dang lam viec khac...\n";
        std::this_thread::sleep_for(1s);
    } // 'lock' ra khỏi scope, destructor của nó được gọi,
      // nhưng vì đã unlock thủ công nên nó không làm gì cả.
}
```

Với `unique_lock`, chúng ta có được điều tốt nhất của cả hai thế giới: sự an toàn tự động của RAII và sự linh hoạt để tối ưu hóa hiệu năng bằng cách giải phóng khóa sớm nhất có thể.

#### **Phần 2: Các Tùy Chọn Khởi Tạo Nâng Cao**

Sự linh hoạt của `unique_lock` còn thể hiện ở hàm khởi tạo của nó. Ngoài việc lock mặc định, nó có thể nhận thêm một tham số thứ hai để thay đổi hành vi:

1. std::defer\_lock — Trì hoãn lock  
   Cho phép tạo unique\_lock mà không lock mutex ngay lập tức. Thích hợp khi bạn cần kiểm soát thời điểm lock sau này.

```
std::mutex mtx;
std::unique_lock<std::mutex> lock(mtx, std::defer_lock);

// ... thực hiện một số thao tác khác

lock.lock();   // Khi nào cần thì mới lock
```

2. std::defer\_lock — Trì hoãn lock  
Cho phép tạo unique\_lock mà không lock mutex ngay lập tức. Thích hợp khi bạn cần kiểm soát thời điểm lock sau này.

```
std::mutex mtx;
std::unique_lock<std::mutex> lock(mtx, std::try_to_lock);

if (lock.owns_lock()) {
    std::cout << "Lock acquired!" << std::endl;
} else {
    std::cout << "Mutex is already locked." << std::endl;
}
```

```
3. std::adopt_lock — Kế thừa khóa có sẵn
Khi mutex đã được lock bên ngoài, dùng adopt_lock để unique_lock quản lý mutex mà không lock lại lần nữa.

std::mutex mtx;
mtx.lock();  // lock trước

std::unique_lock<std::mutex> lock(mtx, std::adopt_lock);  // Không lock lại
⚠️ Cẩn thận: Nếu mutex chưa được lock trước đó, sẽ gây undefined behavior!
```

- **`std::defer_lock`**: Tạo một đối tượng `unique_lock` nhưng **không khóa mutex ngay lập tức**. Bạn có thể gọi `lock.lock()` để khóa nó sau này.C++`std::unique_lock<std::mutex> lock(mtx, std::defer_lock); // ... làm việc khác ... lock.lock(); // Khóa mutex tại đây`
- **`std::try_to_lock`**: `unique_lock` sẽ cố gắng khóa mutex bằng cách gọi `mtx.try_lock()`. Nó sẽ không bị chặn. Bạn có thể dùng phương thức `lock.owns_lock()` để kiểm tra xem việc khóa có thành công hay không.
- **`std::adopt_lock`**: Dùng khi thread hiện tại **đã khóa mutex từ trước**. `unique_lock` sẽ "nhận nuôi" (adopt) cái khóa đó và chịu trách nhiệm `unlock()` trong destructor mà không cố gắng `lock()` thêm một lần nữa.

#### **Phần 3: `unique_lock` là Move-Only**

Một đặc tính quan trọng khác của `unique_lock` là nó **move-only**, không thể sao chép. Điều này rất giống với `std::unique_ptr`. Vì nếu bạn copy, sẽ có **nhiều đối tượng cùng unlock mutex**, gây ra undefined behavior.  
→ **Các hàm sao chép (copy constructor, copy assignment)** của `unique_lock` bị **xóa (`= delete`)**.

- `std::unique_ptr`: Đại diện cho quyền sở hữu **duy nhất** đối với một vùng nhớ.
- `std::unique_lock`: Đại diện cho quyền sở hữu **duy nhất** đối với một cái *khóa* trên một mutex.

Việc này cho phép chúng ta thực hiện các kỹ thuật nâng cao như chuyển giao quyền sở hữu của một cái khóa từ scope này sang scope khác, hoặc từ một hàm này sang một hàm khác. Đây cũng chính là lý do nó có tên là `unique_lock`.

#### **Phần 4: `lock_guard` vs. `unique_lock`: Khi Nào Dùng Gì?**

Cả hai đều là công cụ RAII tuyệt vời để quản lý mutex. Vậy khi nào nên dùng cái nào?

|  | `std::lock_guard` | `std::unique_lock` |
| --- | --- | --- |
| **Mục đích** | Khóa và mở khóa đơn giản theo scope. | Cung cấp sự linh hoạt và các tính năng nâng cao. |
| **Ưu điểm** | Nhẹ hơn, nhanh hơn một chút, cú pháp đơn giản nhất. | Linh hoạt (có thể unlock sớm), hỗ trợ nhiều chiến lược khóa, có thể di chuyển (move). |
| **Nhược điểm** | Cứng nhắc, luôn giữ khóa đến hết scope. | Nặng hơn một chút (tốn thêm bộ nhớ và chi phí hoạt động). |
| **Khi nào dùng?** | Khi bạn chỉ cần khóa mutex trong toàn bộ một scope và không có nhu cầu phức tạp nào khác. | Khi bạn cần unlock sớm, hoặc cần các tính năng như `defer_lock`, `try_to_lock`, hoặc cần chuyển giao quyền sở hữu khóa. |

**Quy tắc chung:** Hãy bắt đầu với `std::lock_guard` vì sự đơn giản và hiệu quả của nó. Chỉ "nâng cấp" lên `std::unique_lock` khi bạn thực sự cần đến sự linh hoạt mà nó mang lại.

### **Lời Kết**

`std::unique_lock` là một công cụ cực kỳ mạnh mẽ trong kho vũ khí của lập trình viên multi-thread. Nó không chỉ cung cấp sự an toàn trước exception như `lock_guard` mà còn mang lại sự linh hoạt cần thiết để viết code hiệu năng cao trong các kịch bản phức tạp.

Việc hiểu rõ khi nào nên dùng `lock_guard` và khi nào nên dùng `unique_lock` sẽ giúp bạn đưa ra những quyết định thiết kế đúng đắn cho ứng dụng của mình.

*Until then, keep coding!*
