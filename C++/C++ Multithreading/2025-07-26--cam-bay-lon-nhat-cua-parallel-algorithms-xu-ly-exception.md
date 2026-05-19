---
title: 'Cạm Bẫy Lớn Nhất Của Parallel Algorithms: Xử Lý Exception'
date: '2025-07-26 17:07:19'
date_gmt: '2025-07-26 10:07:19'
modified: '2025-07-26 17:33:37'
status: publish
slug: cam-bay-lon-nhat-cua-parallel-algorithms-xu-ly-exception
wordpress_id: 291
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/cam-bay-lon-nhat-cua-parallel-algorithms-xu-ly-exception/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã được giới thiệu về sức mạnh của các thuật toán song song trong C++17—chỉ cần thêm một tham số execution policy là có thể tăng tốc chương trình. Nhưng liệu sự thay đổi đơn giản này có đi kèm với những thay đổi khác về hành vi không? Đặc biệt, điều gì sẽ xảy ra khi có lỗi và một **exception** được ném ra?

Câu trả lời sẽ khiến bạn ngạc nhiên. Hành vi xử lý exception giữa thuật toán tuần tự và thuật toán song song là **hoàn toàn khác biệt**, và việc không biết điều này có thể dẫn đến hậu quả nghiêm trọng.

---

### Phần 1: Ôn Lại Xử Lý Exception trong Thuật Toán Tuần Tự (Không có Policy)

Trong C++ truyền thống (trước C++17 hoặc khi không dùng policy), hành vi xử lý exception rất đơn giản và dễ đoán. Nếu một exception được ném ra từ bên trong một hàm/lambda được truyền vào thuật toán, nó sẽ lan truyền (propagate) ra khỏi lời gọi thuật toán đó. Chúng ta có thể bắt nó bằng một khối `try/catch` thông thường.

**Ví dụ:**

C++

```
#include <iostream>
#include <vector>
#include <algorithm>
#include <stdexcept>

int main() {
    std::vector<int> v{3, 1, 4, 1, 5, 9};

    try {
        // Sắp xếp với một hàm so sánh cố tình ném ra exception
        std::sort(v.begin(), v.end(), [](int a, int b) {
            throw std::runtime_error("Loi xay ra trong luc so sanh!");
            return a < b;
        });
    } catch (const std::exception& e) {
        std::cout << "Da bat duoc exception: " << e.what() << std::endl;
        std::cout << "Chuong trinh tiep tuc chay an toan.\n";
    }

    return 0;
}
```

**Kết quả:**

```
Da bat duoc exception: Loi xay ra trong luc so sanh!
Chuong trinh tiep tuc chay an toan.
```

Mọi thứ hoạt động đúng như mong đợi. Exception được bắt và chương trình tiếp tục.

---

### Phần 2: "Lựa Chọn Hạt Nhân" Của Parallel Algorithms (C++17) 💣

Bây giờ, hãy thêm một execution policy vào. Ngay cả khi chúng ta chỉ yêu cầu chạy tuần tự (`seq`), hành vi cũng sẽ thay đổi hoàn toàn.

**Vấn đề:** Trong môi trường multi-thread, việc lan truyền exception rất phức tạp. Một exception được ném ra trên một worker thread. Nó nên được gửi đến đâu? Thread gọi hàm có nên bắt nó không? Các worker thread khác có nên tiếp tục chạy hay dừng lại?

Để tránh tất cả những sự phức tạp này, Ủy ban Tiêu chuẩn C++ đã quyết định chọn một giải pháp đơn giản, dễ đoán, nhưng rất **nghiêm khắc**.

> **Quy tắc vàng:** Nếu bất kỳ **exception** nào được ném ra từ bên trong một thuật toán có **execution policy** (bất kể là `seq`, `par`, hay `par_unseq`), chương trình sẽ gọi `std::terminate()` và **bị chấm dứt ngay lập tức.**

Điều này có nghĩa là: bạn **KHÔNG THỂ** bắt được exception từ các parallel algorithms bằng khối `try/catch`. Chương trình sẽ crash.

**Code minh họa:** Chúng ta chỉ cần thêm `std::execution::seq` vào ví dụ trên.

C++

```
#include <execution> // Thêm header mới
// ...

std::sort(std::execution::seq, v.begin(), v.end(), [](int a, int b) {
    throw std::runtime_error("Loi xay ra trong luc so sanh!");
    return a < b;
});

// ...
```

**Kết quả:** Chương trình sẽ bị hệ điều hành dừng đột ngột. Khối `catch` sẽ không bao giờ được thực thi.

---

### Phần 3: Tại Sao và Hướng Xử Lý?

- **Tại sao?** Việc lan truyền exception giữa các thread có chi phí hiệu năng và làm tăng độ phức tạp của thư viện. `std::terminate()` là một hành vi "fail-fast", đảm bảo chương trình không rơi vào trạng thái không xác định.
- **Hướng xử lý?** Quy tắc trên buộc chúng ta phải thay đổi chiến lược xử lý lỗi.**Callable object (hàm, lambda) mà bạn truyền vào một parallel algorithm không bao giờ được phép để một exception thoát ra ngoài.**Bạn phải tự xử lý tất cả exception **bên trong** callable object đó.C++`std::for_each(std::execution::par, data.begin(), data.end(), [](auto& item) { try { // ... thực hiện công việc có thể ném exception ... } catch (const std::exception& e) { // XỬ LÝ LỖI TẠI ĐÂY // Ví dụ: ghi log, đánh dấu item bị lỗi, set một cờ atomic báo lỗi... // Nhưng không được để exception thoát ra khỏi lambda này! } });`

---

Đây là một trong những thay đổi hành vi quan trọng nhất cần phải nhớ khi chuyển từ code tuần tự sang code song song với các thuật toán C++17. Hãy luôn đảm bảo rằng các hàm tác vụ của bạn là `noexcept` hoặc tự xử lý exception bên trong để tránh việc chương trình bị chấm dứt đột ngột.

*Until then, keep coding!*
