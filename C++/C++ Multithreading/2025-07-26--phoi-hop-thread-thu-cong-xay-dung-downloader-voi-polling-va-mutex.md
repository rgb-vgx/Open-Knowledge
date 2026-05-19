---
title: 'Phối Hợp Thread "Thủ Công": Xây Dựng Downloader với Polling và Mutex'
date: '2025-07-26 02:06:25'
date_gmt: '2025-07-25 19:06:25'
modified: '2025-10-11 16:39:55'
status: publish
slug: phoi-hop-thread-thu-cong-xay-dung-downloader-voi-polling-va-mutex
wordpress_id: 240
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/phoi-hop-thread-thu-cong-xay-dung-downloader-voi-polling-va-mutex/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã thảo luận về ý tưởng **Thread Coordination**. Bây giờ, hãy bắt tay vào xây dựng một ứng dụng multi-thread có sự phối hợp thực sự, chỉ sử dụng những công cụ mà chúng ta đã biết: `bool` làm cờ và `std::mutex` để bảo vệ.

Dự án của chúng ta: một chương trình download file đơn giản gồm 3 thread:

1. **Fetcher**: Thread tải dữ liệu.
2. **Progress**: Thread hiển thị thanh tiến trình.
3. **Processor**: Thread xử lý dữ liệu sau khi tải xong.

---

### Phần 1: Thiết Kế - Các Mảnh Ghép

Để các thread có thể phối hợp, chúng cần một số "biển báo" và "luật lệ" chung.

- **Shared Data**:C++`std::string downloaded_data; bool data_updated = false; // Cờ báo hiệu có dữ liệu mới bool download_complete = false; // Cờ báo hiệu đã tải xong`
- **Mutexes**:C++`std::mutex data_mutex; // Bảo vệ downloaded_data và data_updated std::mutex completed_mutex; // Bảo vệ download_complete`

---

### Phần 2: Cạm Bẫy Của Polling và Kỹ Thuật "Lock-Check-Unlock-Sleep"

Các thread "chờ" (Progress và Processor) cần một cách để theo dõi các biến cờ. Một cách tiếp cận ngây thơ là dùng một vòng lặp `while` để kiểm tra liên tục (gọi là **polling**).

**Cách làm sai (KHÔNG LÀM):**

C++

```
// Vòng lặp nóng - Gây lãng phí CPU và deadlock!
mtx.lock();
while (!flag) {
    // Vòng lặp này chạy với tốc độ tối đa, chiếm 100% CPU
    // và giữ khóa mutex, khiến thread khác không thể set flag!
}
mtx.unlock();
```

Đây là một thảm họa. Để polling một cách đúng đắn và "thân thiện", chúng ta phải sử dụng kỹ thuật **"Lock-Check-Unlock-Sleep"**.

C++

```
// Kỹ thuật polling đúng đắn
while (true) {
    // Cần unique_lock để unlock thủ công
    std::unique_lock<std::mutex> lock(mtx); 
    
    if (flag_is_true) {
        // ... làm việc với dữ liệu được bảo vệ ...
        break; // Thoát khỏi vòng lặp
    }
    
    // RẤT QUAN TRỌNG: Mở khóa trước khi ngủ
    lock.unlock(); 
    // Ngủ để nhường CPU cho thread khác
    std::this_thread::sleep_for(100ms); 
}
```

Kỹ thuật này tránh được deadlock và không chiếm dụng CPU một cách vô ích.

---

### Phần 3: Hiện Thực Hóa Chương Trình Downloader

Bây giờ, hãy áp dụng kỹ thuật trên để xây dựng 3 thread của chúng ta.

**a) Thread Fetcher (Producer)** Thread này giả lập việc tải dữ liệu và set các cờ tương ứng.

C++

```
void fetch_data() {
    for (int i = 0; i < 5; ++i) {
        std::this_thread::sleep_for(500ms);
        std::lock_guard<std::mutex> lock(data_mutex);
        downloaded_data += "Block" + std::to_string(i+1) + " ";
        data_updated = true;
    }
    std::cout << "Download hoan tat!\n";
    std::lock_guard<std::mutex> lock(completed_mutex);
    download_complete = true;
}
```

**b) Thread Progress Bar (Observer)** Thread này chờ cờ `data_updated`, in tiến trình, sau đó chờ cờ `download_complete` để kết thúc.

C++

```
void progress_bar() {
    while (true) {
        // Chờ cờ download_complete
        std::unique_lock<std::mutex> completed_lock(completed_mutex);
        if (download_complete) {
            completed_lock.unlock();
            break;
        }
        completed_lock.unlock();

        // Chờ cờ data_updated
        std::unique_lock<std::mutex> data_lock(data_mutex);
        if (data_updated) {
            std::cout << "Da tai duoc " << downloaded_data.size() << " bytes.\n";
            data_updated = false;
        }
    }
    std::cout << "Progress bar ket thuc.\n";
}
```

**c) Thread Processor (Consumer)** Thread này chỉ chờ duy nhất cờ `download_complete`.

C++

```
void process_data() {
    std::unique_lock<std::mutex> lock(completed_mutex);
    while (!download_complete) {
        lock.unlock();
        std::this_thread::sleep_for(100ms);
        lock.lock();
    }
    // Khi vòng lặp kết thúc, chúng ta vẫn đang giữ khóa
    lock.unlock();

    std::lock_guard<std::mutex> data_lock(data_mutex);
    std::cout << "Processor: Bat dau xu ly du lieu...\n" << downloaded_data << std::endl;
}
```

---

### Phần 4: Đánh Giá Giải Pháp - "Nó Chạy, Nhưng..." 🤔

Chương trình trên hoạt động đúng! Các thread đã phối hợp với nhau thành công. Tuy nhiên, giải pháp này có nhiều nhược điểm:

1. **Code Phức Tạp**: Rất nhiều vòng lặp `while`, `lock`, `unlock` thủ công. Code trở nên khó đọc và dễ mắc lỗi.
2. **Vấn Đề Về Thời Gian Ngủ**: `sleep_for(100ms)` là một con số tùy ý.
   - Nếu quá **lớn**, ứng dụng sẽ có độ trễ, phản hồi chậm (ví dụ thanh tiến trình cập nhật chậm).
   - Nếu quá **nhỏ**, thread sẽ thức dậy liên tục để kiểm tra một cách vô ích, lãng phí tài nguyên CPU, gần giống như một "vòng lặp nóng".

Chúng ta đã xây dựng thành công một cơ chế phối hợp "thủ công", nhưng nó không hề lý tưởng.

---

Sẽ tốt hơn biết bao nếu một thread đang chờ có thể thực sự "ngủ yên", và chỉ được **đánh thức** bởi một thread khác **đúng vào thời điểm** công việc đã sẵn sàng, mà không cần phải polling hay đoán mò thời gian ngủ?

Cơ chế "đánh thức" dựa trên sự kiện này thực sự tồn tại trong C++. Nó được gọi là **Condition Variable**, và đó chính là công cụ mà chúng ta sẽ làm chủ trong bài học tiếp theo.

*Until then, keep coding!*
