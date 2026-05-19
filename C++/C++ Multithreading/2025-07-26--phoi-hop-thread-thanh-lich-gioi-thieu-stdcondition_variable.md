---
title: 'Phối Hợp Thread Thanh Lịch: Giới Thiệu std::condition_variable'
date: '2025-07-26 02:14:40'
date_gmt: '2025-07-25 19:14:40'
modified: '2025-07-26 17:37:18'
status: publish
slug: phoi-hop-thread-thanh-lich-gioi-thieu-stdcondition_variable
wordpress_id: 242
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/phoi-hop-thread-thanh-lich-gioi-thieu-stdcondition_variable/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã xây dựng thành công một chương trình multi-thread có sự phối hợp, nhưng phải trả giá bằng code khá "thủ công" và kém hiệu quả với kỹ thuật polling `while-sleep`. Chúng ta đã phải đối mặt với hai vấn đề: lãng phí CPU và khó khăn trong việc chọn thời gian ngủ hợp lý.

Sẽ tốt hơn biết bao nếu một thread đang chờ có thể thực sự "ngủ yên", và chỉ được một thread khác **đánh thức** dậy **đúng vào thời điểm** công việc đã sẵn sàng?

Đây chính là lúc **`std::condition_variable`** (biến điều kiện) tỏa sáng. Nó là công cụ chuẩn của C++ được thiết kế cho chính xác loại kịch bản phối hợp "chờ-và-thông báo" này.

---

### Phần 1: Mô Hình Hoạt Động - "Producer" và "Consumer"

Hãy hình dung `std::condition_variable` như một "phòng chờ" có người quản lý. Các thread sẽ đóng hai vai trò:

- **Consumer (Thread chờ):** Thread cần một điều kiện nào đó được thỏa mãn (ví dụ: dữ liệu đã sẵn sàng). Nó sẽ vào "phòng chờ" và ngủ.
- **Producer (Thread thông báo):** Thread làm cho điều kiện đó được thỏa mãn (ví dụ: tải dữ liệu xong). Nó sẽ đến "phòng chờ" và thông báo cho người quản lý để đánh thức Consumer dậy.

Để mô hình này hoạt động, chúng ta cần 3 thành phần thiết yếu:

1. **Shared Data**: Dữ liệu mà các thread đang phối hợp với nhau (ví dụ: một chuỗi, một hàng đợi).
2. **`std::mutex`**: Để bảo vệ shared data khỏi Data Race.
3. **`std::condition_variable`**: Để quản lý việc chờ và thông báo.

---

### Phần 2: Luồng Hoạt Động Chi Tiết 📜

Đây là phần cốt lõi. Hãy cùng phân tích từng bước trong điệu "khiêu vũ" giữa hai thread:

**Về phía Consumer (Thread chờ):**

1. Khóa mutex bằng một `std::unique_lock`. **Bắt buộc phải là `unique_lock`** vì `condition_variable` cần sự linh hoạt của nó.
2. Gọi `cv.wait(lock)`.
3. **Phép màu xảy ra**: Hàm `wait()` sẽ làm hai việc một cách nguyên tử:
   - **Tự động `unlock()` mutex** (để cho phép thread Producer có thể vào làm việc).
   - **Đưa thread Consumer vào trạng thái ngủ** (blocked/sleeping).

**Về phía Producer (Thread thông báo):** 4. Khóa cùng một mutex (có thể dùng `std::lock_guard` cho hiệu quả). 5. Thực hiện công việc: thay đổi shared data. 6. `unlock()` mutex. 7. Gọi `cv.notify_one()` (đánh thức một thread đang chờ) hoặc `cv.notify_all()` (đánh thức tất cả các thread đang chờ).

**Consumer thức giấc:** 8. Thread Consumer được đánh thức bởi tín hiệu `notify`. 9. Hàm `wait()` của nó sẽ cố gắng **khóa lại mutex**. Nó có thể phải chờ nếu Producer chưa unlock. 10. Khi khóa thành công, hàm `wait()` kết thúc. Thread Consumer tiếp tục chạy với mutex vẫn đang được khóa, sẵn sàng để làm việc với shared data đã được cập nhật.

---

### Phần 3: Code Minh Họa

Hãy viết lại chương trình "writer/reader" đơn giản của chúng ta bằng `condition_variable`.

C++

```
#include <iostream>
#include <thread>
#include <mutex>
#include <string>
#include <condition_variable> // Thêm header mới

// Các thành phần cần thiết
std::string shared_data;
std::mutex mtx;
std::condition_variable cv;

void reader_thread() {
    std::cout << "Reader: Dang cho du lieu...\n";
    // Bắt buộc dùng unique_lock
    std::unique_lock<std::mutex> lock(mtx);

    // Chờ... Hàm wait sẽ unlock mutex và cho thread ngủ
    cv.wait(lock);

    // Khi được đánh thức, wait() sẽ khóa lại mutex trước khi trả về
    std::cout << "Reader: Du lieu da san sang! Noi dung: " << shared_data << std::endl;
}

void writer_thread() {
    // Lock mutex để chuẩn bị ghi dữ liệu
    { // Tạo scope riêng cho lock_guard
        std::lock_guard<std::mutex> lock(mtx);
        std::this_thread::sleep_for(std::chrono::seconds(1)); // Giả lập công việc
        shared_data = "Hello from Writer";
        std::cout << "Writer: Da ghi du lieu xong.\n";
    } // lock_guard bị hủy, mutex được unlock ở đây

    // Thông báo cho một thread đang chờ
    cv.notify_one();
}

int main() {
    std::thread t1(reader_thread);
    std::thread t2(writer_thread);
    t1.join();
    t2.join();
    return 0;
}
```

Khi chạy, bạn sẽ thấy `Reader` chờ, `Writer` ghi dữ liệu, sau đó `Writer` "đánh thức" `Reader` dậy để xử lý. Mọi thứ diễn ra một cách trật tự và hiệu quả, không cần polling.

---

### Ghi Chú Phụ: `condition_variable` vs. `condition_variable_any`

- `std::condition_variable`: Chỉ hoạt động với `std::mutex`. Hiệu quả hơn. Đây là lựa chọn mặc định.
- `std::condition_variable_any`: Hoạt động với bất kỳ loại mutex nào (ví dụ `std::timed_mutex`, `std::shared_mutex`). Linh hoạt hơn nhưng có thể có thêm overhead.

---

`std::condition_variable` cung cấp một cách làm thanh lịch, hiệu quả và dựa trên sự kiện để các thread phối hợp với nhau, loại bỏ hoàn toàn các vấn đề của việc polling thủ công.

Tuy nhiên, có một vấn đề tinh vi gọi là **"spurious wakeup"** (đánh thức giả) có thể xảy ra. Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu nó là gì và làm thế nào để sử dụng một phiên bản `wait()` mạnh mẽ hơn để xử lý nó một cách triệt để.

*Until then, keep coding!*
