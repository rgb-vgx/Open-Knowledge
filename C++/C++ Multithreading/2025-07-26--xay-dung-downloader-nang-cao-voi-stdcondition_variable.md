---
title: Xây Dựng Downloader Nâng Cao với std::condition_variable
date: '2025-07-26 14:46:12'
date_gmt: '2025-07-26 07:46:12'
modified: '2025-07-26 17:37:11'
status: publish
slug: xay-dung-downloader-nang-cao-voi-stdcondition_variable
wordpress_id: 246
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/xay-dung-downloader-nang-cao-voi-stdcondition_variable/
categories:
- C++ Multithreading
tags: []
---

Trong các bài học trước, chúng ta đã xây dựng một chương trình downloader "thủ công" bằng kỹ thuật polling, và sau đó đã tìm hiểu về lý thuyết của `std::condition_variable` (CV). Giờ là lúc kết hợp cả hai: chúng ta sẽ tái cấu trúc (refactor) lại chương trình downloader để thay thế cơ chế polling cồng kềnh bằng giải pháp CV thanh lịch và hiệu quả.

Thử thách lần này sẽ thú vị hơn: thread `progress_bar` sẽ cần phải lắng nghe hai sự kiện khác nhau.

---

### Phần 1: Thiết Kế Mới Dựa Trên Condition Variable

Chúng ta vẫn giữ nguyên 3 thread (Fetcher, Progress, Processor), nhưng công cụ điều phối sẽ được nâng cấp.

- **Shared Components**:

```cpp
std::string downloaded_data; 
bool data_updated = false; // Predicate cho dữ liệu mới 
bool download_complete = false; // Predicate cho việc hoàn tất 
std::mutex data_mutex; // Bảo vệ data và cờ data_updated 
std::mutex completed_mutex; // Bảo vệ cờ download_complete 
// // Nâng cấp từ polling lên CV 
std::condition_variable cv_data;
std::condition_variable cv_completed;
```

- **Luồng hoạt động**:
  - `Fetcher` sẽ `notify()` cho `cv_data` mỗi khi có block dữ liệu mới, và `notify()` cho `cv_completed` khi hoàn tất.
  - `Processor` sẽ `wait()` trên `cv_completed`.
  - `Progress` sẽ `wait()` trên `cv_data` để cập nhật, và đồng thời phải kiểm tra `cv_completed` để biết khi nào nên kết thúc.

---

### Phần 2: Hiện Thực Hóa Các Thread

**a) `fetch_data()` (The Producer)**

Thread này không thay đổi nhiều, chỉ thay `sleep` bằng `notify`.

C++

```cpp
void fetch_data() {
    for (int i = 0; i < 5; ++i) {
        std::this_thread::sleep_for(500ms); // Giả lập việc tải
        {
            std::lock_guard<std::mutex> lock(data_mutex);
            downloaded_data += "Block" + std::to_string(i+1) + " ";
            data_updated = true;
        } // Unlock mutex trước khi notify
        cv_data.notify_all(); // Thông báo có dữ liệu mới
    }

    std::cout << "Download hoan tat!\n";
    {
        std::lock_guard<std::mutex> lock(completed_mutex);
        download_complete = true;
    }
    cv_completed.notify_all(); // Thông báo đã hoàn tất
}
```

**b) `process_data()` (The Simple Consumer)**

Thread này trở nên cực kỳ đơn giản và hiệu quả. Không còn vòng lặp polling vô nghĩa.

C++

```cpp
void process_data() {
    std::unique_lock<std::mutex> lock(completed_mutex);

    // Ngủ yên cho đến khi được đánh thức và download_complete == true
    cv_completed.wait(lock, []{ return download_complete; });

    // Khi được đánh thức, xử lý dữ liệu
    std::lock_guard<std::mutex> data_lock(data_mutex);
    std::cout << "Processor: Bat dau xu ly du lieu...\n" << downloaded_data << std::endl;
}
```

**c) `progress_bar()` (The Complex Consumer)**

Đây là phần thử thách nhất. Thread này phải chờ hai sự kiện.

1. Nó phải **chờ chặn (blocking wait)** để được thông báo có dữ liệu mới.
2. Sau mỗi lần cập nhật, nó phải **kiểm tra không chặn (non-blocking check)** xem download đã hoàn tất chưa để thoát.

Chúng ta sử dụng `wait()` cho việc 1 và `wait_for()` với timeout cực ngắn cho việc 2.

C++

```cpp
void progress_bar() {
    while (true) {
        // 1. Chờ dữ liệu mới một cách hiệu quả
        std::unique_lock<std::mutex> data_lock(data_mutex);
        cv_data.wait(data_lock, []{ return data_updated; });

        // Được đánh thức, cập nhật giao diện
        std::cout << "Da tai duoc " << downloaded_data.size() << " bytes.\n";
        data_updated = false; // Reset cờ
        data_lock.unlock(); // Mở khóa ngay sau khi dùng xong

        // 2. Kiểm tra xem đã hoàn tất chưa mà không bị block
        std::unique_lock<std::mutex> completed_lock(completed_mutex);
        // Chờ tối đa 1ms, nếu cờ là true, nó sẽ trả về ngay.
        // Nếu không, nó sẽ hết hạn và trả về false.
        if (cv_completed.wait_for(completed_lock, 1ms, []{ return download_complete; })) {
            break; // Thoát khỏi vòng lặp nếu đã hoàn tất
        }
    }
    std::cout << "Progress bar ket thuc.\n";
}
```

---

### Phần 3: Kết Quả và Phân Tích

Chương trình giờ đây chạy một cách hoàn hảo. Các thread chờ đợi hiệu quả, không tốn CPU và phản hồi ngay lập tức khi có thông báo. So với giải pháp polling, code không chỉ gọn gàng hơn mà còn hiệu quả hơn rất nhiều.

Nếu chúng ta mắc sai lầm và dùng `wait()` chặn cho cả hai điều kiện trong thread `progress_bar`, nó sẽ nhận được thông báo dữ liệu đầu tiên, in ra tiến trình, và sau đó sẽ bị kẹt lại ở `cv_completed.wait()`, chờ cho đến khi download hoàn tất. Nó sẽ bỏ lỡ tất cả các thông báo cập nhật tiến trình ở giữa.

---

`std::condition_variable` là một công cụ cực kỳ mạnh mẽ cho các kịch bản phối hợp phức tạp. Bằng cách sử dụng các phiên bản `wait()` khác nhau (`wait`, `wait_for`, `wait_until`), chúng ta có thể xây dựng các luồng logic phức tạp, nơi một thread có thể chờ đợi nhiều sự kiện một cách hiệu quả.

*Until then, keep coding!*
