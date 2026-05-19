---
title: 'C++ Multithreading #12: Data Race "Ngoài Đời Thực": Một Ví Dụ Trực Quan với
  std::cout'
date: '2025-07-12 00:32:00'
date_gmt: '2025-07-11 17:32:00'
modified: '2025-07-24 01:45:48'
status: publish
slug: data-race-ngoai-doi-thuc-mot-vi-du-truc-quan-voi-stdcout
wordpress_id: 154
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/12/data-race-ngoai-doi-thuc-mot-vi-du-truc-quan-voi-stdcout/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã định nghĩa về **Data Race** một cách lý thuyết. Lý thuyết là vậy, nhưng một data race trông như thế nào trong thực tế? Làm thế nào để chúng ta nhận ra nó và tại sao nó lại nguy hiểm đến vậy?

Bài viết này sẽ đưa lý thuyết vào thực tiễn. Chúng ta sẽ cùng nhau viết một chương trình đơn giản để cố tình tạo ra một data race và quan sát hậu quả của nó một cách trực quan nhất.

#### **Phần 1: Ôn Lại "Công Thức" Của Data Race**

Trước khi bắt đầu, hãy cùng nhắc lại công thức "chết người" tạo nên một Data Race. Nó xảy ra khi có đủ 3 điều kiện sau:

1. **Hai hoặc nhiều thread** cùng truy cập...
2. ... vào **cùng một vị trí bộ nhớ (memory location)**...
3. ... và **ít nhất một** trong số các truy cập đó là một thao tác **ghi (write)**.

Nếu ba điều kiện này xảy ra mà **không có cơ chế đồng bộ hóa (synchronization)**, chương trình của bạn sẽ rơi vào vùng đất của **Undefined Behavior**.

#### **Phần 2: Thí Nghiệm: Cho Các Thread Cùng Ghi Ra Console**

Hãy cùng thực hiện một thí nghiệm đơn giản. Chúng ta sẽ tạo ra 3 thread, mỗi thread có nhiệm vụ in một chuỗi ký tự riêng biệt ra console 5 lần. Để tăng khả năng các thread "xen ngang" vào nhau, chúng ta sẽ in ra từng ký tự một.

C++

```
#include <iostream>
#include <thread>
#include <string>
#include <vector>

// Hàm entry point cho các thread
// In một chuỗi ra console 5 lần, từng ký tự một
void print_string(const std::string& str) {
    for (int i = 0; i < 5; ++i) {
        for (char c : str) {
            std::cout << c;
        }
        std::cout << " "; // Thêm một khoảng trắng sau mỗi lần in
    }
}

int main() {
    std::vector<std::thread> threads;

    // Tạo 3 thread, mỗi thread in một chuỗi khác nhau
    threads.emplace_back(print_string, "abc");
    threads.emplace_back(print_string, "def");
    threads.emplace_back(print_string, "xyz");

    for (auto& t : threads) {
        t.join();
    }

    std::cout << std::endl;
    return 0;
}
```

Bạn kỳ vọng kết quả sẽ như thế nào? Liệu nó có phải là `abc abc ... def def ... xyz xyz ...` một cách trật tự không?

#### **Phần 3: Kết Quả Hỗn Loạn và Câu Hỏi Lớn**

Đây là một ví dụ về kết quả bạn có thể nhận được khi chạy chương trình trên:

```
adefbac bca bc abc abc def def def xyz xyz xyz xyz xyz def
```

Kết quả là một mớ hỗn độn! Các chuỗi ký tự đã bị xé lẻ và trộn lẫn vào nhau. Chúng ta có thể phân tích:

- Thread "def" bắt đầu, in ra chữ 'd'.
- Nó ngay lập tức bị hệ điều hành ngắt quãng.
- Thread "abc" chạy, in ra 'a', 'b', 'c'.
- Rồi đến lượt thread "xyz", và cứ thế...

Sự xen kẽ (interleaving) trong việc thực thi của các thread đã làm cho output bị xáo trộn. Nhưng một câu hỏi lớn hơn được đặt ra: **Đâu là vùng nhớ bị chia sẻ?** Trong code của chúng ta không hề có biến toàn cục, biến static hay lambda capture nào cả!

#### **Phần 4: "Thủ Phạm" Giấu Mặt: `std::cout`**

Thủ phạm chính là `std::cout`.

`std::cout` không phải là một phép màu, nó thực chất là một **đối tượng toàn cục (global object)** của lớp `std::ostream`. Khi bạn gọi `std::cout << c;`, bạn đang gọi một phương thức của đối tượng toàn cục này, và phương thức đó sẽ **ghi (write)** vào buffer nội bộ của `std::cout`.

Bây giờ hãy áp dụng lại "công thức" của Data Race:

1. **Nhiều thread?** Có, chúng ta có 3 thread.
2. **Cùng một memory location?** Có, cả 3 thread đều đang truy cập vào cùng một đối tượng toàn cục là `std::cout`.
3. **Ít nhất một thao tác ghi?** Có, toán tử `<<` là một thao tác ghi, nó thay đổi trạng thái bên trong của `std::cout`.
4. **Không đồng bộ hóa?** Đúng vậy, chúng ta không hề sử dụng một cơ chế khóa nào.

**Kết luận:** Chúng ta đã tạo ra một Data Race hoàn hảo! Và kết quả hỗn loạn kia chính là biểu hiện của Undefined Behavior.

#### **Phần 5: Tại Sao `std::cout` Lại "May Mắn" và Lời Cảnh Báo**

Bạn có thể nghĩ: "Output bị xáo trộn thì cũng hơi khó chịu, nhưng chương trình không bị crash, có lẽ cũng không quá tệ?".

Trong trường hợp của `std::cout`, chúng ta đã khá "may mắn". Các thư viện chuẩn thường cài đặt `std::cout` với một mức độ đồng bộ hóa tối thiểu bên trong để đảm bảo rằng bản thân đối tượng `cout` không bị hỏng (corrupt). Hậu quả tệ nhất thường chỉ là output bị xen kẽ.

**NHƯNG, đây là một ngoại lệ!** Đối với hầu hết các loại dữ liệu chia sẻ khác (một biến `int` đếm số lượng, một `std::vector`, một đối tượng của lớp do bạn tự viết...), một Data Race có thể gây ra những hậu quả thảm khốc và khó lường hơn nhiều:

- **Kết quả tính toán sai:** Một thread đọc giá trị cũ trong khi thread khác đang ghi giá trị mới.
- **Torn Reads/Writes:** Đọc một nửa giá trị cũ và một nửa giá trị mới của một biến, tạo ra một giá trị "rác".
- **Hỏng trạng thái đối tượng:** Một đối tượng bị đưa vào trạng thái không hợp lệ (vi phạm invariants của lớp).
- **Chương trình bị crash** một cách ngẫu nhiên.

### **Lời Kết**

Ví dụ với `std::cout` là một minh họa trực quan và dễ thấy về Data Race. Nó cho chúng ta thấy bằng chứng không thể chối cãi về việc các thread có thể xen kẽ và can thiệp vào công việc của nhau như thế nào khi không có sự đồng bộ hóa.

Hãy luôn ghi nhớ rằng, trong khi output bị xáo trộn có thể nhìn thấy được, một Data Race trên dữ liệu quan trọng của ứng dụng có thể gây ra những thiệt hại "âm thầm" và nghiêm trọng hơn rất nhiều.

Giờ khi đã thấy tận mắt vấn đề, đã đến lúc chúng ta học cách khắc phục nó. Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu về công cụ đồng bộ hóa đầu tiên và cơ bản nhất: `std::mutex`.

*Until then, keep coding!*
