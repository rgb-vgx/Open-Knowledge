---
title: 'Thực Hành Lock-Free: Sửa Lỗi Double-Checked Locking với std::atomic'
date: '2025-07-26 16:06:08'
date_gmt: '2025-07-26 09:06:08'
modified: '2025-07-26 17:36:33'
status: publish
slug: thuc-hanh-lock-free-sua-loi-double-checked-locking-voi-stdatomic
wordpress_id: 267
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/thuc-hanh-lock-free-sua-loi-double-checked-locking-voi-stdatomic/
categories:
- C++ Multithreading
tags: []
---

Trong các bài học trước, chúng ta đã mổ xẻ pattern "Double-Checked Locking" (DCLP). Chúng ta đã thấy nỗ lực "thông minh" của nó để tránh khóa mutex không cần thiết, nhưng cuối cùng lại thất bại thảm hại do một cạm bẫy tinh vi: **instruction reordering**.

Chúng ta cũng đã thảo luận về các giải pháp hiện đại như `std::call_once` hay "Magic Statics" (Meyers' Singleton). Trong bài thực hành này, chúng ta sẽ khám phá một giải pháp khác ở cấp độ thấp hơn nhưng cực kỳ mạnh mẽ: sử dụng `std::atomic` để "thuần hóa" DCLP.

---

### Phần 1: Ôn Lại Vấn Đề Của Double-Checked Locking

Hãy cùng nhắc lại vấn đề cốt lõi. Trong đoạn code DCLP cổ điển:

C++

```
if (pTest == nullptr) { // Check 1
    std::lock_guard<std::mutex> lock(mtx);
    if (pTest == nullptr) { // Check 2
        pTest = new Test(); // NGUY HIỂM!
    }
}
```

Câu lệnh `pTest = new Test();` có thể bị trình biên dịch/CPU sắp xếp lại thành 3 bước theo thứ tự sai:

1. Cấp phát bộ nhớ.
2. **Gán địa chỉ cho con trỏ `pTest`**.
3. Gọi constructor để khởi tạo đối tượng tại vùng nhớ đó.

Một thread khác có thể đi qua "Check 1" và thấy `pTest` khác `nullptr` (vì bước 2 đã xảy ra), sau đó bỏ qua lock và cố gắng sử dụng một đối tượng chưa được khởi tạo (vì bước 3 chưa xảy ra). Đây là một Data Race nghiêm trọng.

---

### Phần 2: `std::atomic` - "Hàng Rào" Chống Sắp Xếp Lại Lệnh

Khi chúng ta khai báo con trỏ là `std::atomic<Test*>`, chúng ta không chỉ nhận được các thao tác đọc/ghi nguyên tử trên chính con trỏ. Quan trọng hơn, chúng ta nhận được sự đảm bảo về **thứ tự bộ nhớ (memory ordering)**.

Một thao tác trên biến `atomic` (với memory order mặc định là `memory_order_seq_cst`) hoạt động như một **"hàng rào bộ nhớ" (memory fence)**.

- **Thao tác `store` (ghi)** có **release semantics**: Nó đảm bảo rằng tất cả các thao tác ghi (như cấp phát bộ nhớ và gọi constructor) xảy ra *trước* nó trong code phải được hoàn thành và "công bố" ra cho các thread khác thấy, trước khi bản thân thao tác `store` được thực hiện.
- **Thao tác `load` (đọc)** có **acquire semantics**: Nó đảm bảo rằng nếu chúng ta đọc được một giá trị được ghi bởi một thao tác `release`, thì tất cả các thao tác ghi xảy ra trước thao tác `release` đó cũng sẽ được "nhìn thấy".

Nói một cách đơn giản, `std::atomic` buộc các bước phải xảy ra theo đúng thứ tự chúng ta muốn: **(1. Cấp phát + 2. Khởi tạo) XẢY RA TRƯỚC (3. Gán con trỏ)**. "Cửa sổ" nguy hiểm nơi `pTest` khác `nullptr` nhưng trỏ đến vùng nhớ rác đã bị đóng lại.

---

### Phần 3: Code Hoàn Chỉnh và Một Lưu Ý Quan Trọng

Đây là phiên bản DCLP đã được sửa lỗi bằng `std::atomic`.

C++

```
#include <atomic>
#include <mutex>
#include <thread>
#include <vector>
#include <iostream>

class Test {
public:
    Test() { std::cout << "Constructor called.\n"; }
    void do_it() { /* ... */ }
};

// Khai báo con trỏ là atomic
std::atomic<Test*> pTest{nullptr};
std::mutex mtx;

void process() {
    // Check 1: Dùng load() để đọc giá trị một cách an toàn
    if (pTest.load(std::memory_order_acquire) == nullptr) {
        std::lock_guard<std::mutex> lock(mtx);
        
        // Check 2: Sau khi có khóa, kiểm tra lại
        if (pTest.load(std::memory_order_acquire) == nullptr) {
            Test* p = new Test();
            // Dùng store() để ghi giá trị một cách an toàn
            pTest.store(p, std::memory_order_release);
        }
    }

    // LƯU Ý QUAN TRỌNG:
    // Không thể dereference trực tiếp một con trỏ atomic: pTest->do_it(); // LỖI!
    // Phải load nó ra một con trỏ thường trước.
    Test* local_p = pTest.load(std::memory_order_relaxed);
    if (local_p) {
        local_p->do_it();
    }
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 10; ++i) {
        threads.emplace_back(process);
    }
    for (auto& t : threads) {
        t.join();
    }

    delete pTest.load(); // Dọn dẹp
    return 0;
}
```

**Lưu ý quan trọng**: Bạn không thể hủy tham chiếu (dereference) trực tiếp một con trỏ atomic (`pTest->do_it()` sẽ gây lỗi). Bạn phải `load()` giá trị của nó ra một con trỏ thông thường rồi mới sử dụng.

---

`std::atomic` cung cấp một giải pháp hợp lệ và an toàn để hiện thực hóa DCLP bằng cách áp đặt các quy tắc nghiêm ngặt về thứ tự bộ nhớ.

Tuy nhiên, điều này không thay đổi lời khuyên cuối cùng của chúng ta: DCLP, ngay cả khi được viết đúng, vẫn là một pattern phức tạp. Đối với hầu hết các nhu cầu về lazy initialization, giải pháp **"Magic Statics" (Meyers' Singleton)** vẫn là lựa chọn đơn giản, dễ đọc và an toàn nhất trong C++ hiện đại.

*Until then, keep coding!*
