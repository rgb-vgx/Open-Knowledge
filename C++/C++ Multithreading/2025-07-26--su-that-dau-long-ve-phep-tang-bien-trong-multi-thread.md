---
title: Sự Thật "Đau Lòng" Về Phép Tăng Biến (++) trong Multi-thread
date: '2025-07-26 15:20:42'
date_gmt: '2025-07-26 08:20:42'
modified: '2025-07-26 17:36:52'
status: publish
slug: su-that-dau-long-ve-phep-tang-bien-trong-multi-thread
wordpress_id: 256
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/su-that-dau-long-ve-phep-tang-bien-trong-multi-thread/
categories:
- C++ Multithreading
tags: []
---

Một thao tác đơn giản như `count++` trông thật vô hại. Trên nhiều kiến trúc CPU, nó chỉ tương ứng với một chỉ thị máy (machine instruction) duy nhất. Và vì một chỉ thị máy là không thể bị ngắt quãng, vậy nên `count++` chắc chắn là an toàn cho thread (thread-safe), đúng không? Chúng ta có thể vứt bỏ `std::mutex` nặng nề cho một thao tác nhỏ như vậy chứ?

Câu trả lời là một tiếng **KHÔNG** dứt khoát. Bài viết này sẽ phá vỡ lầm tưởng phổ biến đó, chứng minh tại sao `count++` lại cực kỳ nguy hiểm trong môi trường multi-thread, và giới thiệu công cụ C++ đúng đắn để giải quyết vấn đề.

---

### Phần 1: Thí Nghiệm - Khi 10 x 100,000 không bằng 1,000,000 😵

Hãy cùng thực hiện một thí nghiệm đơn giản: chúng ta sẽ tạo một biến đếm toàn cục, sau đó cho 10 thread cùng chạy, mỗi thread sẽ tăng biến đếm này 100,000 lần.

C++

```
#include <iostream>
#include <thread>
#include <vector>

long long counter = 0;

void increment() {
    for (int i = 0; i < 100000; ++i) {
        counter++;
    }
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 10; ++i) {
        threads.emplace_back(increment);
    }

    for (auto& t : threads) {
        t.join();
    }

    std::cout << "Ket qua cuoi cung: " << counter << std::endl;
    std::cout << "Ket qua mong doi:  " << 10 * 100000 << std::endl;
    return 0;
}
```

**Kết quả kỳ vọng:** `1000000` **Kết quả thực tế (một ví dụ):**

```
Ket qua cuoi cung: 241843
Ket qua mong doi:  1000000
```

Kết quả thực tế thấp hơn rất nhiều so với kỳ vọng! Rõ ràng đã có rất nhiều thao tác tăng biến bị "mất". Chuyện gì đã xảy ra?

---

### Phần 2: Giải Phẫu Một Thao Tác Tăng Biến

Vấn đề cốt lõi là: ở cấp độ cao, `counter++` trông như một thao tác, nhưng ở cấp độ phần cứng, nó là một chuỗi gồm ba bước **Read-Modify-Write**:

1. **Read**: Đọc giá trị hiện tại của `counter` từ memory vào một thanh ghi (register) của CPU.
2. **Modify**: Tăng giá trị trong thanh ghi đó lên 1.
3. **Write**: Ghi giá trị mới từ thanh ghi trở lại vào memory.

Vấn đề là, hệ điều hành có thể ngắt quãng một thread **giữa bất kỳ bước nào** trong ba bước này.

---

### Phần 3: Kịch Bản "Update Bị Mất" (The "Lost Update")

Đây chính là kịch bản Data Race đã xảy ra trong thí nghiệm của chúng ta, được khuếch đại bởi các cơ chế tối ưu hóa của phần cứng như cache và store buffer:

Hãy tưởng tượng `counter` đang có giá trị là `5`.

1. **Thread A** thực hiện bước **Read**. Nó đọc giá trị `5` vào thanh ghi của mình.
2. Hệ điều hành ngắt quãng Thread A, chuyển sang cho **Thread B**.
3. **Thread B** cũng thực hiện bước **Read**. Nó cũng đọc giá trị `5` từ memory (vì Thread A chưa kịp ghi lại giá trị mới).
4. **Thread B** thực hiện bước **Modify** (`5 + 1 = 6`) và **Write**. `counter` trong memory bây giờ là `6`.
5. **Thread A** được chạy tiếp. Nó tiếp tục từ bước 2, thực hiện bước **Modify** trên giá trị `5` mà nó đã đọc lúc trước (`5 + 1 = 6`).
6. **Thread A** thực hiện bước **Write**. Nó ghi giá trị `6` trở lại vào memory.

**Kết quả:** Cả hai thread đều đã thực hiện một phép tăng, nhưng giá trị cuối cùng của `counter` chỉ tăng lên 1. Một phép tăng đã bị "mất". Khi điều này xảy ra hàng trăm ngàn lần, kết quả sẽ sai lệch nghiêm trọng.

---

### Phần 4: Giải Pháp - `std::atomic` ⚛️

Chúng ta biết rằng `std::mutex` có thể giải quyết vấn đề này bằng cách biến toàn bộ chuỗi Read-Modify-Write thành một critical section. Tuy nhiên, đối với các kiểu dữ liệu cơ bản như `int`, `bool`, `char`,... việc dùng mutex có thể là quá mức cần thiết.

C++ cung cấp một giải pháp chuyên dụng và hiệu quả hơn nhiều: **`std::atomic`**.

Khi bạn khai báo một biến là `std::atomic`, bạn đang ra lệnh cho trình biên dịch và phần cứng:

- Sử dụng các chỉ thị máy đặc biệt, có tính **nguyên tử (atomic)**.
- Tắt các phép tối ưu hóa nguy hiểm (như sắp xếp lại chỉ thị) xung quanh biến này.
- Đảm bảo các thay đổi được "công bố" ngay lập tức cho các core khác (memory synchronization).

**Code đã được sửa lỗi:**

C++

```
#include <iostream>
#include <thread>
#include <vector>
#include <atomic> // Thêm header mới

// Khai báo counter là một đối tượng atomic
std::atomic<long long> counter{0};

void increment() {
    for (int i = 0; i < 100000; ++i) {
        // Thao tác ++ trên một đối tượng atomic là thread-safe
        counter++;
    }
}

// ... hàm main() giữ nguyên ...
```

Với sự thay đổi duy nhất này, chương trình giờ đây sẽ **luôn luôn** cho ra kết quả chính xác là `1000000`. `std::atomic` đã biến thao tác `++` thành một hành động nguyên tử, không thể bị xen ngang, giải quyết triệt để Data Race.

---

**Bài học quan trọng nhất:** Đừng bao giờ cho rằng một thao tác trên shared memory là an toàn chỉ vì nó trông có vẻ đơn giản. Đối với các kiểu dữ liệu cơ bản, **`std::atomic` là công cụ đúng đắn và hiệu quả nhất** để đảm bảo tính nguyên tử và tránh Data Race.

*Until then, keep coding!*
