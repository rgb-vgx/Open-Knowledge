---
title: 'Livelock: Khi Các Thread "Lịch Sự" Một Cách Vô Ích'
date: '2025-07-26 01:37:59'
date_gmt: '2025-07-25 18:37:59'
modified: '2025-07-26 17:38:08'
status: publish
slug: livelock-khi-cac-thread-lich-su-mot-cach-vo-ich
wordpress_id: 230
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/livelock-khi-cac-thread-lich-su-mot-cach-vo-ich/
categories:
- C++ Multithreading
tags: []
---

Trong bài trước, chúng ta đã tìm hiểu về Deadlock - tình trạng các thread bị "treo cứng", không thể hoạt động vì đang chờ đợi lẫn nhau. Nhưng có một tình trạng "họ hàng" khác của Deadlock, tinh vi hơn, được gọi là **Livelock**.

Bài viết này sẽ giúp bạn phân biệt hai khái niệm này, minh họa Livelock qua một ví dụ đời thường và trong code, đồng thời đưa ra các giải pháp để khắc phục.

---

### Phần 1: Deadlock vs. Livelock - Sự Khác Biệt Tinh Tế

Hãy làm rõ sự khác biệt:

- **Deadlock**: Các thread hoàn toàn bị **chặn (blocked)**. Chúng đang ở trạng thái ngủ, không tiêu tốn CPU, và thụ động chờ đợi một tài nguyên sẽ không bao giờ được giải phóng.
- **Livelock**: Các thread vẫn đang **hoạt động (active)**. Chúng tiêu tốn CPU, chạy các dòng lệnh, nhưng lại bị kẹt trong một vòng lặp vô ích. Chúng liên tục cố gắng làm một việc gì đó, thất bại, rồi thử lại, nhưng không bao giờ tạo ra được tiến triển thực sự.

Nói cách khác, Deadlock là "không làm gì cả", còn Livelock là "bận rộn mà không làm được gì".

---

### Phần 2: Phép Loại Suy "Hai Người Lịch Sự" 🚶‍♂️🚪🚶‍♀️

Một trong những ví dụ đời thường hay nhất để minh họa Livelock là câu chuyện về hai người lịch sự gặp nhau ở một cánh cửa hẹp:

1. Cả hai cùng tiến đến cửa và cố gắng đi qua cùng lúc. Họ va vào nhau.
2. Cả hai cùng lùi lại và nói: "Xin lỗi, mời anh/cô đi trước".
3. Cả hai cùng chờ một chút.
4. Rồi cả hai lại cùng lúc quyết định đi tiếp. Họ lại va vào nhau.
5. Cả hai lại lùi lại, lại nói "Mời anh/cô đi trước"... Quá trình này lặp đi lặp lại mãi mãi. Cả hai đều rất "bận rộn" và "lịch sự", nhưng không ai trong số họ thực sự đi qua được cánh cửa. Đây chính là Livelock.

---

### Phần 3: Từ Deadlock đến Livelock trong Code

Livelock thường nảy sinh từ một nỗ lực ngây thơ để sửa Deadlock. Quay lại ví dụ Deadlock kinh điển, một lập trình viên có thể nghĩ: "Thay vì dùng `lock()` chờ mãi mãi, tôi sẽ dùng `try_lock()`. Nếu không khóa được mutex thứ hai, tôi sẽ nhả mutex đầu tiên ra và thử lại sau".

Hãy xem ý tưởng "lịch sự" này dẫn đến đâu:

C++

```
void task_A() {
    while (true) {
        mtx1.lock();
        // Cố gắng khóa mtx2
        if (mtx2.try_lock()) {
            // Thành công!
            // ... làm việc ...
            mtx2.unlock();
            mtx1.unlock();
            break; // Thoát vòng lặp
        } else {
            // Thất bại, "lịch sự" nhả mtx1 ra và thử lại
            mtx1.unlock();
            std::this_thread::sleep_for(1ms);
        }
    }
}

// task_B tương tự nhưng với thứ tự ngược lại (lock mtx2, try_lock mtx1)
```

**Kịch bản Livelock:**

1. Thread A lock `mtx1`.
2. Thread B lock `mtx2`.
3. Thread A `try_lock(mtx2)` -> thất bại -> `unlock(mtx1)`.
4. Thread B `try_lock(mtx1)` -> thất bại -> `unlock(mtx2)`.
5. Cả hai cùng `sleep`.
6. Sau khi thức dậy, cả hai lại bắt đầu lại từ bước 1 và "va vào nhau" một lần nữa. Vòng lặp này có thể tiếp diễn mãi mãi.

---

### Phần 4: Giải Pháp Cho Livelock

**a) Chống Deadlock Đúng Cách (`std::scoped_lock`)** Cách tốt nhất để tránh Livelock kiểu này là ngăn chặn nó ngay từ gốc. Sử dụng các cơ chế chống deadlock đúng đắn như `std::scoped_lock` (C++17) hoặc `std::lock` (C++11) để lấy tất cả các khóa cần thiết trong một thao tác duy nhất. Khi đó, sẽ không có kịch bản "va vào nhau".

**b) Phá vỡ Tính Đối Xứng (Breaking Symmetry)** Giống như trong đời thực, giải pháp là một trong hai người phải quyết định nhường hẳn. Chúng ta cần phá vỡ sự đối xứng trong hành vi của các thread.

- **Randomized Wait**: Thay vì cho cả hai thread cùng `sleep(1ms)`, hãy cho chúng sleep một khoảng thời gian ngẫu nhiên (ví dụ từ 1-10ms). Điều này làm giảm đáng kể khả năng chúng sẽ thử lại vào cùng một thời điểm.
- **Thread Priority**: Một cách khác là ưu tiên cho một thread. Chúng ta có thể dùng `native_handle()` để truy cập API của hệ điều hành và gán cho một thread mức độ ưu tiên cao hơn. Thread có ưu tiên cao hơn sẽ có nhiều khả năng "chiến thắng" trong cuộc đua giành lấy các lock.

---

### Phần 5: Một Khái Niệm Rộng Hơn - Resource Starvation

Cả Deadlock và Livelock đều là các dạng cụ thể của một vấn đề lớn hơn gọi là **Resource Starvation** (Sự đói tài nguyên).

> **Resource Starvation** là tình trạng một thread không bao giờ có được các tài nguyên mà nó cần để thực hiện công việc và tạo ra tiến triển.

Ngoài Deadlock và Livelock, sự đói tài nguyên cũng có thể xảy ra do:

- **Hệ thống hết bộ nhớ:** Không thể tạo thread mới hoặc cấp phát bộ nhớ cho thread hiện tại.
- **Lịch trình không công bằng (Unfair Scheduling):** Hệ điều hành luôn ưu tiên các thread có độ ưu tiên cao, khiến các thread có độ ưu tiên thấp không bao giờ có cơ hội chạy. (Tuy nhiên, các hệ điều hành hiện đại thường có cơ chế để tránh tình trạng này).

---

**Deadlock** là bị động chờ đợi, **Livelock** là chủ động chờ đợi trong vô ích. Cả hai đều là những vấn đề nghiêm trọng cần tránh. Cách tốt nhất là sử dụng các cơ chế chống deadlock chuẩn như `std::scoped_lock` ngay từ đầu, thay vì cố gắng tự mình "sửa lỗi" một cách ngây thơ có thể dẫn đến Livelock.

*Until then, keep coding!*
