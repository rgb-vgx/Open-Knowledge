---
title: 'Sức Mạnh Của C++17 Parallel Algorithms: Tăng Tốc Code Chỉ Với Một Tham Số'
date: '2025-07-26 17:04:13'
date_gmt: '2025-07-26 10:04:13'
modified: '2025-07-26 17:33:41'
status: publish
slug: suc-manh-cua-c17-parallel-algorithms-tang-toc-code-chi-voi-mot-tham-so
wordpress_id: 289
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/suc-manh-cua-c17-parallel-algorithms-tang-toc-code-chi-voi-mot-tham-so/
categories:
- C++ Multithreading
tags: []
---

Chúng ta đã học cách hiện thực hóa Data Parallelism một cách thủ công qua `std::async` và `std::packaged_task`. Mặc dù hiệu quả, chúng vẫn đòi hỏi khá nhiều code boilerplate để chia dữ liệu và quản lý các task.

Sẽ ra sao nếu tôi nói bạn có thể biến một lời gọi `std::sort` hay `std::for_each` thông thường thành một phiên bản song song, tận dụng tất cả các core CPU của bạn, chỉ bằng cách thêm vào **một tham số duy nhất**? Chào mừng bạn đến với các thuật toán song song của C++17.

---

### Phần 1: Các "Execution Policy" - Ra Lệnh Cho Thuật Toán

C++17 đã nạp chồng (overload) hầu hết các thuật toán trong thư viện chuẩn để nhận một tham số đầu tiên đặc biệt, gọi là **Execution Policy**. Policy này là một "chỉ thị" của bạn cho thư viện, yêu cầu nó thực thi thuật toán theo một chiến lược nhất định.

- **Header**: `<execution>`
- **Các policy chính**:
  - `std::execution::seq`: **Sequenced**. Thực thi tuần tự trên một thread duy nhất.
  - `std::execution::par`: **Parallelized**. Thực thi song song trên nhiều thread.
  - `std::execution::par_unseq`: **Parallelized & Unsequenced**. Thực thi song song trên nhiều thread, đồng thời cho phép vector hóa (SIMD) trong mỗi thread.
  - `std::execution::unseq`: **Unsequenced** (C++20). Thực thi trên một thread, nhưng cho phép vector hóa.

**Lưu ý quan trọng:** Một policy là một **yêu cầu**, không phải là một mệnh lệnh. Thư viện có quyền bỏ qua yêu cầu của bạn và chạy tuần tự nếu nó không thể thực hiện song song (ví dụ, không đủ tài nguyên, hoặc thuật toán đó chưa được cài đặt phiên bản song song).

---

### Phần 2: Phân Tích Từng Policy

Mỗi policy đi kèm với những đảm bảo và những ràng buộc riêng mà lập trình viên **bắt buộc phải tuân thủ**.

#### a) `std::execution::seq` - Tuần tự

Đây là policy an toàn nhất, hành vi của nó gần giống với các thuật toán C++14 thông thường: chạy trên một thread duy nhất, không có sự xen kẽ (interleaving).

#### b) `std::execution::par` - Song song

- **Hành vi**: Thư viện sẽ chia công việc ra và thực thi trên nhiều thread. Các thao tác trên *các thread khác nhau* có thể bị xen kẽ.
- **⚠️ CẢNH BÁO DATA RACE**: Đây là điểm nguy hiểm nhất! Vì các thao tác có thể xen kẽ, nếu hàm/lambda bạn cung cấp cho thuật toán có truy cập và thay đổi một shared memory (ví dụ một biến đếm được capture), bạn sẽ tạo ra một **Data Race**.

**Code minh họa Data Race:** Hãy thử dùng `std::for_each` với policy `par` để khởi tạo một vector.

C++

```
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main() {
    std::vector<int> v(20000);
    int count = 0; // Shared memory

    // Yêu cầu thực thi song song
    std::for_each(std::execution::par, v.begin(), v.end(), [&](int& n) {
        // Data Race xảy ra ở đây! Nhiều thread cùng lúc đọc và ghi vào 'count'
        n = ++count; 
    });

    // Kiểm tra xem có phần tử nào bị trùng lặp do data race không
    std::sort(v.begin(), v.end());
    auto adjacent_it = std::adjacent_find(v.begin(), v.end());
    if (adjacent_it != v.end()) {
        std::cout << "Data race detected! Gia tri bi trung lap: " << *adjacent_it << std::endl;
    } else {
        std::cout << "Khong co data race, ket qua cuoi cung: " << v.back() << std::endl;
    }
}
```

Khi chạy, bạn sẽ thấy chương trình phát hiện ra các giá trị bị trùng lặp, một triệu chứng rõ ràng của Data Race do `++count` không phải là atomic.

#### c) `std::execution::par_unseq` và `unseq` - Sức mạnh tối đa, ràng buộc tối đa

- **Hành vi**: Ngoài việc chạy song song, các policy này còn cho phép trình biên dịch sắp xếp lại thứ tự các thao tác và sử dụng các chỉ thị **vector hóa (SIMD)** để xử lý nhiều phần tử dữ liệu trong một chỉ thị máy duy nhất.
- **Ràng buộc nghiêm ngặt**: Để có được sức mạnh này, bạn phải trả giá. Code của bạn không chỉ phải **không có Data Race**, mà còn **KHÔNG ĐƯỢC PHÉP** sử dụng bất kỳ cơ chế đồng bộ hóa nào (mutex, atomic, etc.) hoặc các thao tác có thể cấp phát bộ nhớ một cách không an toàn. Bất kỳ lời gọi nào có thể dẫn đến blocking đều bị cấm.

---

### Bảng Tóm Tắt Nhanh

| Policy | Số Thread | Xen kẽ (Interleaved)? | Yêu cầu |
| --- | --- | --- | --- |
| `seq` | 1 | Không | - |
| `par` | Nhiều | Giữa các thread | **Không được có Data Race** |
| `unseq` | 1 | Có thể | **Không được có Data Race** và **Không được dùng lock/blocking** |
| `par_unseq` | Nhiều | Có thể (ngay cả trên 1 thread) | **Không được có Data Race** và **Không được dùng lock/blocking** |


---

Các thuật toán song song của C++17 là một công cụ cực kỳ mạnh mẽ, giúp hiện thực hóa implicit parallelism một cách dễ dàng, thường mang lại sự cải thiện hiệu năng đáng kể chỉ với một thay đổi nhỏ trong code.

Tuy nhiên, sức mạnh luôn đi kèm với trách nhiệm. Khi sử dụng các policy song song, **bạn**, với tư cách là lập trình viên, phải chịu hoàn toàn trách nhiệm đảm bảo rằng hàm tác vụ bạn cung cấp là an toàn và không vi phạm các quy tắc của policy đó.

*Until then, keep coding!*
