---
title: 'Chương Mới: Data Structures và Concurrency - Khi push_back Trở Thành Thảm
  Họa'
date: '2025-07-26 17:16:52'
date_gmt: '2025-07-26 10:16:52'
modified: '2025-07-26 17:33:18'
status: publish
slug: chuong-moi-data-structures-va-concurrency-khi-push_back-tro-thanh-tham-hoa
wordpress_id: 301
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/chuong-moi-data-structures-va-concurrency-khi-push_back-tro-thanh-tham-hoa/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã trang bị đầy đủ các công cụ như `mutex`, `condition_variable`, `future`... Giờ là lúc áp dụng chúng vào một trong những thử thách lớn nhất của lập trình multi-thread: làm cho các cấu trúc dữ liệu (data structures) trở nên an toàn khi được sử dụng đồng thời bởi nhiều thread.

Một câu hỏi quan trọng được đặt ra: "Nếu hai thread cùng thay đổi các phần tử **khác nhau** của cùng một cấu trúc dữ liệu, liệu có an toàn không?". Câu trả lời, có lẽ sẽ làm bạn ngạc nhiên, là một tiếng "KHÔNG" dứt khoát. Hãy cùng khám phá tại sao qua một ví dụ "thảm họa".

---

### Phần 1: Thí Nghiệm "Thảm Họa" với `std::vector` 💥

Hãy xem xét đoạn code tưởng chừng như vô hại sau. Chúng ta có một `std::vector` được chia sẻ, và hai thread cùng lúc gọi `push_back` để thêm các phần tử vào đó.

C++

```
#include <iostream>
#include <vector>
#include <thread>

int main() {
    std::vector<int> shared_vec;

    auto task = [&shared_vec](int start_val) {
        for (int i = 0; i < 100000; ++i) {
            shared_vec.push_back(start_val + i);
        }
    };

    std::thread t1(task, 100000);
    std::thread t2(task, 200000);

    t1.join();
    t2.join();

    std::cout << "Final vector size: " << shared_vec.size() << std::endl;
    return 0;
}
```

Bạn có thể đoán rằng kết quả sẽ là các phần tử bị xen kẽ. Nhưng thực tế còn tệ hơn nhiều: chương trình này rất có thể sẽ **crash**.

**Tại sao?** Vấn đề nằm ở cơ chế hoạt động bên trong của `std::vector`: **reallocation** (tái cấp phát).

1. `std::vector` sử dụng một vùng nhớ (memory block) liên tục để lưu trữ các phần tử.
2. Khi bạn gọi `push_back` và vùng nhớ này đã đầy, vector phải tìm một vùng nhớ mới **lớn hơn**.
3. Nó sao chép tất cả các phần tử từ vùng nhớ cũ sang vùng nhớ mới.
4. Cuối cùng, nó **giải phóng (deallocate)** vùng nhớ cũ.

**Race Condition chết người xảy ra ở đây:** Hãy tưởng tượng **Thread A** thấy vector đã đầy và bắt đầu quá trình reallocation. Cùng lúc đó, **Thread B** xen ngang và cố gắng `push_back` một phần tử mới vào **vùng nhớ cũ**, chính là vùng nhớ mà Thread A đang trong quá trình giải phóng. Đây là một lỗi truy cập bộ nhớ đã giải phóng (use-after-free) kinh điển và gây ra crash.

---

### Phần 2: Bài Học Đắt Giá - "Chạy Được Không Có Nghĩa là Đúng" ☝️

Một điều thú vị là, nếu bạn giảm số lần lặp xuống (ví dụ 100), chương trình trên có thể sẽ "chạy được" trên một số trình biên dịch (như g++) mà không bị crash.

Đây là một trong những bài học đắt giá nhất về Data Race:

> **Sự vắng mặt của một vụ crash không phải là bằng chứng cho sự đúng đắn.**

Các lỗi Data Race có tính phi tất định (non-deterministic). Chúng có thể chỉ xuất hiện dưới một tải trọng hệ thống nhất định, trên một cấu hình phần cứng khác, hoặc chỉ đơn giản là vào một ngày "không đẹp trời". Đừng bao giờ tự mãn chỉ vì code của bạn "có vẻ chạy được".

**Quy tắc an toàn cho các container của STL:** Tất cả các container trong thư viện chuẩn C++ đều tuân theo quy tắc:

- Nhiều thread cùng **đọc** một container là an toàn.
- Nếu có **ít nhất một thread đang ghi** (thay đổi container), thì mọi truy cập khác (cả đọc và ghi) từ các thread khác **phải được đồng bộ hóa**. Về cơ bản, hãy xem toàn bộ container như một memory location duy nhất.

---

### Phần 3: Vấn Đề Chung và Sự Đánh Đổi: "Coarse vs. Fine-Grained Locking"

Khi làm cho một cấu trúc dữ liệu trở nên thread-safe, chúng ta đối mặt với một sự đánh đổi cơ bản về "độ chi tiết của khóa" (lock granularity).

**1. Coarse-Grained Locking (Khóa Thô)**

- **Cách làm**: Sử dụng một mutex duy nhất để khóa **toàn bộ** cấu trúc dữ liệu cho **bất kỳ** thao tác nào. Đây chính là cách chúng ta đã sửa lỗi `std::cout` và `std::vector` ở trên.
- **Ưu điểm**: Đơn giản để cài đặt, đảm bảo an toàn tuyệt đối.
- **Nhược điểm**: "Giết chết" concurrency. Chỉ có một thread được phép thao tác trên cấu trúc dữ liệu tại một thời điểm, biến nó thành một "nút thắt cổ chai" tuần tự.

**2. Fine-Grained Locking (Khóa Mịn)**

- **Cách làm**: Sử dụng nhiều lock để chỉ khóa những phần cụ thể của cấu trúc dữ liệu đang bị ảnh hưởng. Ví dụ, trong một danh sách liên kết, ta chỉ khóa các node lân cận của node đang được thêm/xóa.
- **Ưu điểm**: Cho phép mức độ song song cao hơn nhiều (ví dụ, một thread có thể thêm phần tử vào đầu danh sách trong khi một thread khác thêm vào cuối danh sách).
- **Nhược điểm**: **Cực kỳ khó** để thiết kế và cài đặt đúng. Rất dễ bỏ sót một trường hợp nào đó và tạo ra một Data Race hoặc Deadlock tinh vi.

---

Bài học này cho thấy rằng việc làm cho một cấu trúc dữ liệu trở nên an toàn cho thread không chỉ đơn giản là rắc một vài cái lock vào. Nó đòi hỏi sự hiểu biết sâu sắc về cả hoạt động bên trong của cấu trúc dữ liệu và các vấn đề tiềm ẩn của concurrency.

Trong các bài học tiếp theo, chúng ta sẽ áp dụng những kiến thức này để bắt đầu xây dựng cấu trúc dữ liệu thread-safe đầu tiên của mình: một hàng đợi (queue) đơn giản, sử dụng phương pháp khóa "thô" để đảm bảo sự đúng đắn.

*Until then, keep coding!*
