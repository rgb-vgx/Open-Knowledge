---
title: 'Deadlock Nâng Cao: Bài Toán Kinh Điển "Dining Philosophers"'
date: '2025-07-26 01:27:29'
date_gmt: '2025-07-25 18:27:29'
modified: '2025-07-26 17:38:20'
status: publish
slug: deadlock-nang-cao-bai-toan-kinh-dien-dining-philosophers
wordpress_id: 224
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/deadlock-nang-cao-bai-toan-kinh-dien-dining-philosophers/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã thấy một deadlock đơn giản với 2 thread và 2 mutex. Nhưng trong các hệ thống phức tạp, deadlock có thể xảy ra theo những cách tinh vi hơn nhiều. Để hiểu rõ hơn về bản chất của nó, chúng ta sẽ khám phá một trong những bài toán nổi tiếng nhất trong lĩnh vực concurrency: **The Dining Philosophers** (Những triết gia ăn tối).

Đây không chỉ là một câu chuyện thú vị, mà còn là một mô hình hóa chính xác cho các vấn đề về phân chia tài nguyên trong các hệ thống máy tính.

---

### Phần 1: Giới Thiệu Bài Toán "Dining Philosophers" 🤔

**Bối cảnh:** Có 5 nhà triết học ngồi quanh một bàn ăn tròn. Giữa mỗi hai người là một chiếc nĩa. Trước mặt mỗi người là một bát mỳ Ý.

**Luật chơi:**

1. Các triết gia chỉ làm hai việc: **Thinking** (suy tư) hoặc **Eating** (ăn).
2. Để ăn mỳ, một triết gia cần **cả hai chiếc nĩa**: chiếc bên trái và chiếc bên phải của họ.
3. Mỗi chiếc nĩa chỉ có thể được cầm bởi **một người** tại một thời điểm.
4. Mỗi triết gia chỉ có thể nhặt **từng chiếc nĩa một**.
5. Nếu một triết gia không ăn được, họ sẽ chết đói (một tổn thất lớn cho nhân loại!).

---

### Phần 2: Mô Hình Hóa Bằng Code Multi-thread

Chúng ta có thể dễ dàng mô hình hóa bài toán này bằng các công cụ đã học:

- **Mỗi triết gia** ↔️ Một `std::thread`.
- **Mỗi chiếc nĩa** ↔️ Một `std::mutex`.
- **Nhặt một chiếc nĩa** ↔️ `mutex.lock()`.
- **Đặt một chiếc nĩa xuống** ↔️ `mutex.unlock()`.

Một thuật toán có vẻ hợp lý cho mỗi triết gia sẽ là:

1. Suy tư một lúc.
2. Nhặt chiếc nĩa bên **trái**.
3. Suy tư thêm một chút.
4. Nhặt chiếc nĩa bên **phải**.
5. Khi có đủ 2 nĩa, bắt đầu ăn.
6. Ăn xong, đặt cả 2 nĩa xuống.
7. Quay lại suy tư.

**Code minh họa logic chính:**

C++

```
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
#include <chrono>
#include <string>

// Giả sử có 5 triết gia (và 5 chiếc nĩa)
const int NUM_PHILOSOPHERS = 5;
std::array<std::mutex, NUM_PHILOSOPHERS> forks;

void philosopher_task(int id, const std::string& name) {
    int left_fork = id;
    int right_fork = (id + 1) % NUM_PHILOSOPHERS;

    while (true) { // Vòng lặp suy tư - ăn
        // ... Suy tư ...
        std::cout << name << " dang co gang nhat nia trai (" << left_fork << ").\n";
        forks[left_fork].lock();
        std::cout << name << " da nhat duoc nia trai (" << left_fork << ").\n";
        
        // ... Suy tư thêm ...
        std::cout << name << " dang co gang nhat nia phai (" << right_fork << ").\n";
        forks[right_fork].lock();
        std::cout << name << " da nhat duoc nia phai (" << right_fork << ").\n";

        // ... Ăn ...
        std::cout << name << " dang an.\n";

        forks[right_fork].unlock();
        forks[left_fork].unlock();
    }
}
```

---

### Phần 3: Chạy Chương Trình và "Cái Chết" Của Các Triết Gia 💀

Khi chúng ta chạy chương trình với logic trên, một kịch bản thảm họa sẽ xảy ra:

**Diễn biến:**

1. Chương trình bắt đầu, tất cả 5 triết gia cùng suy tư.
2. Sau một lúc, tất cả cùng cảm thấy đói và quyết định đi ăn.
3. **Tất cả 5 người đồng loạt vươn tay ra và nhặt thành công chiếc nĩa BÊN TRÁI của mình.**
4. Bây giờ, mỗi người đều đang cầm 1 chiếc nĩa bên tay trái.
5. Tiếp theo, tất cả cùng cố gắng nhặt chiếc nĩa BÊN PHẢI.

**Và chương trình bị treo cứng.**

**Phân tích Deadlock:**

- **Triết gia 0** đang giữ Nĩa 0, và chờ Nĩa 1.
- **Triết gia 1** đang giữ Nĩa 1, và chờ Nĩa 2.
- **Triết gia 2** đang giữ Nĩa 2, và chờ Nĩa 3.
- **Triết gia 3** đang giữ Nĩa 3, và chờ Nĩa 4.
- **Triết gia 4** đang giữ Nĩa 4, và chờ Nĩa 0 (đang bị Triết gia 0 giữ).

Chúng ta đã tạo ra một **vòng tròn chờ đợi (circular wait)** hoàn hảo. Mỗi triết gia đang chờ đợi người hàng xóm bên phải của mình đặt nĩa xuống, nhưng không ai có thể làm vậy vì họ chưa được ăn. Không ai chịu nhường ai. Đây chính là một deadlock kinh điển.

---

Bài toán "Dining Philosophers" là một minh họa tuyệt vời cho thấy các vấn đề deadlock có thể dễ dàng phát sinh như thế nào trong các hệ thống phức tạp, nơi nhiều thực thể (thread) cùng cạnh tranh để giành lấy nhiều tài nguyên (mutex). Một thuật toán có vẻ logic và đúng đắn cho từng cá nhân lại có thể dẫn đến sự sụp đổ của cả hệ thống.

Vậy làm thế nào để phá vỡ vòng tròn chết chóc này và giúp các triết gia được ăn? Trong bài học tiếp theo, chúng ta sẽ khám phá các giải pháp cho bài toán này, bao gồm cả việc áp dụng lại quy tắc "khóa theo thứ tự" và một giải pháp tổng quát hơn từ thư viện chuẩn C++.

*Until then, keep coding!*
