---
title: 'C++ Multithreading #21: Tối Ưu Hóa Concurrency: Vấn Đề "Nhiều Reader, Ít Writer"
  và Hạn Chế Của std::mutex'
date: '2025-07-24 02:49:45'
date_gmt: '2025-07-23 19:49:45'
modified: '2025-07-26 17:38:44'
status: publish
slug: c-multithreading-21-toi-uu-hoa-concurrency-van-de-nhieu-reader-it-writer-va-han-che-cua-stdmutex
wordpress_id: 207
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/24/c-multithreading-21-toi-uu-hoa-concurrency-van-de-nhieu-reader-it-writer-va-han-che-cua-stdmutex/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã học cách sử dụng `std::mutex` và các trình quản lý RAII để bảo vệ shared memory và loại bỏ Data Race. Đây là những công cụ cực kỳ mạnh mẽ và là nền tảng của việc đồng bộ hóa. Tuy nhiên, `std::mutex` không phải là giải pháp hoàn hảo cho mọi kịch bản.

Trong bài viết này, chúng ta sẽ khám phá một tình huống rất phổ biến—khi có nhiều thread đọc nhưng chỉ có rất ít thread ghi dữ liệu—và phân tích tại sao `std::mutex` lại trở thành một "nút thắt cổ chai" về hiệu năng trong trường hợp này.

---

### Phần 1: Kịch Bản Phổ Biến: Nhiều Reader, Ít Writer

Hãy tưởng tượng một số ứng dụng trong thực tế:

- **Dữ liệu thị trường chứng khoán:** Có hàng ngàn người dùng (thread) liên tục đọc giá cổ phiếu mới nhất. Trong khi đó, chỉ có một thread cập nhật giá khi có giao dịch mới, và việc này xảy ra không thường xuyên.
- **Streaming video:** Một thread ghi dữ liệu từ mạng vào một buffer. Hàng chục thread khác (rendering, audio) liên tục đọc dữ liệu từ buffer đó để hiển thị.

Trong cả hai trường hợp, chúng ta có một mô hình chung: dữ liệu được **đọc rất thường xuyên**, nhưng được **ghi rất hiếm khi**.

---

### Phần 2: Phân Tích Lại Các Xung Đột Tiềm Tàng

Hãy cùng ôn lại quy tắc của Data Race: nó chỉ xảy ra khi có **ít nhất một thao tác ghi**. Dựa trên quy tắc này, hãy phân tích các kịch bản truy cập đồng thời:

1. **Reader vs. Reader 🧐**: Nhiều thread cùng đọc một dữ liệu.
   - **Kết quả**: ✅ **An toàn**. Không có thao tác ghi, không có Data Race. Về lý thuyết, không cần khóa.
2. **Reader vs. Writer 🧐**: Một thread đọc trong khi một thread khác ghi.
   - **Kết quả**: 🚨 **Nguy hiểm**. Có thao tác ghi, có nguy cơ Data Race. **Bắt buộc phải khóa**.
3. **Writer vs. Writer 🧐**: Hai thread cùng ghi dữ liệu.
   - **Kết quả**: 🚨 **Nguy hiểm**. Có thao tác ghi, có nguy cơ Data Race. **Bắt buộc phải khóa**.

**Điểm mấu chốt:** Trong kịch bản "nhiều reader, ít writer", trường hợp phổ biến nhất (Reader vs. Reader) vốn dĩ là an toàn.

---

### Phần 3: `std::mutex` - Giải Pháp "Tất Cả Hoặc Không Có Gì"

Vấn đề nằm ở chỗ `std::mutex` là một **khóa độc quyền (exclusive lock)**. Tại một thời điểm, chỉ có **duy nhất một thread** được phép giữ khóa, bất kể thread đó là reader hay writer.

Điều này có nghĩa là `std::mutex` buộc các thread reader phải xếp hàng chờ đợi nhau một cách không cần thiết. Nó biến một loạt các thao tác đọc vốn có thể chạy song song thành một chuỗi các thao tác tuần tự, giết chết lợi ích của concurrency.

---

### Phần 4: Thí Nghiệm: Minh Họa Tắc Nghẽn Hiệu Năng

Hãy xem đoạn code sau. Chúng ta sẽ tạo ra 40 thread reader và chỉ 2 thread writer. Mỗi reader sẽ giữ khóa trong 100ms.

C++

```
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
#include <chrono>

int shared_counter = 0;
std::mutex mtx;

void reader() {
    std::lock_guard<std::mutex> lock(mtx);
    // Giả lập công việc đọc
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
}

void writer() {
    std::lock_guard<std::mutex> lock(mtx);
    ++shared_counter;
}

int main() {
    std::vector<std::thread> threads;

    // Tạo 40 thread reader
    for (int i = 0; i < 40; ++i) {
        threads.emplace_back(reader);
    }
    // Tạo 2 thread writer
    threads.emplace_back(writer);
    threads.emplace_back(writer);

    auto start = std::chrono::high_resolution_clock::now();

    for (auto& t : threads) {
        t.join();
    }

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> diff = end - start;
    std::cout << "Tong thoi gian thuc thi: " << diff.count() << " giay\n";

    return 0;
}
```

- **Giả thuyết**: Nếu 40 reader có thể chạy song song, tổng thời gian sẽ chỉ hơn 100ms một chút. Nếu chúng phải chạy tuần tự, tổng thời gian sẽ là 40 \* 100ms = 4000ms = 4 giây.
- **Kết quả thực tế**:

```
Tong thoi gian thuc thi: 4.02345 giay
```

Kết quả cho thấy rõ ràng: `std::mutex` đã buộc tất cả 40 thread reader phải thực thi nối đuôi nhau, làm cho tổng thời gian chạy chương trình tăng lên đáng kể và lãng phí sức mạnh xử lý song song của CPU.

---

Chúng ta cần một giải pháp thông minh hơn, một cơ chế khóa có thể "phân biệt" được giữa reader và writer. Nó nên cho phép **nhiều reader vào cùng một lúc**, nhưng khi có một writer muốn vào, nó phải **đảm bảo độc quyền truy cập**.

Cơ chế khóa thông minh này là một khái niệm nổi tiếng trong lập trình multi-thread, được gọi là **Read-Write Lock**. Trong bài học tiếp theo, chúng ta sẽ tìm hiểu về cách C++ hiện thực hóa pattern này thông qua `std::shared_mutex`.

*Until then, keep coding!*
