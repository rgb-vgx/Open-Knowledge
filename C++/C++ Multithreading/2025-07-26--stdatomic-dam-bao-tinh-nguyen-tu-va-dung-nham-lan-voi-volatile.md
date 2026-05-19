---
title: 'std::atomic: Đảm Bảo Tính Nguyên Tử và Đừng Nhầm Lẫn với volatile'
date: '2025-07-26 15:52:57'
date_gmt: '2025-07-26 08:52:57'
modified: '2025-07-26 17:36:48'
status: publish
slug: stdatomic-dam-bao-tinh-nguyen-tu-va-dung-nham-lan-voi-volatile
wordpress_id: 258
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/26/stdatomic-dam-bao-tinh-nguyen-tu-va-dung-nham-lan-voi-volatile/
categories:
- C++ Multithreading
tags: []
---

Trong bài viết trước, chúng ta đã giới thiệu `std::atomic` như một giải pháp "thần kỳ" cho vấn đề Data Race của phép tăng biến `++`. Lần này, chúng ta sẽ tìm hiểu kỹ hơn về cách `std::atomic` hoạt động, và quan trọng không kém, là làm sáng tỏ một sự nhầm lẫn kinh điển với từ khóa `volatile`.

---

### Phần 1: Giới Thiệu `std::atomic<T>`

`std::atomic` là một class template được định nghĩa trong header `<atomic>`.

C++

```
#include <atomic>

// Khai báo và khởi tạo một biến int atomic
std::atomic<int> atomic_counter{0};
```

**Lời hứa của `std::atomic`:** Khi bạn bọc một kiểu dữ liệu `T` trong `std::atomic<T>`, thư viện chuẩn C++ đảm bảo rằng **mọi thao tác** trên đối tượng atomic đó sẽ là **nguyên tử (atomic)** — tức là không thể bị chia cắt hay xen ngang bởi các thread khác.

- **Kiểu `T` được hỗ trợ:** `T` phải là *TriviallyCopyable*, có nghĩa là các kiểu dữ liệu cơ bản (`int`, `bool`, `char*`,...) hoặc các struct/class chỉ chứa các kiểu đó. Trong thực tế, chúng ta thường dùng `std::atomic` với các kiểu số nguyên và con trỏ.

---

### Phần 2: Các Thao Tác Cơ Bản và Cạm Bẫy

Các thao tác đơn giản như đọc, ghi, hay tăng/giảm đều là atomic.

C++

```
std::atomic<int> x{0};
std::atomic<int> y{0};

// THAO TÁC 1: Ghi (atomic)
x = 10;

// THAO TÁC 2: Đọc (atomic)
int some_val = x;

// THAO TÁC 3: Read-Modify-Write (atomic)
x++;
```

Tuy nhiên, có một cạm bẫy quan trọng cần lưu ý:

> `std::atomic` chỉ đảm bảo tính nguyên tử cho **từng thao tác riêng lẻ**, không phải cho một **chuỗi các thao tác**.

Ví dụ sau đây **KHÔNG** phải là một khối atomic:

C++

```
// Thao tác 1 (atomic)
x = 2;
// Một thread khác CÓ THỂ xen vào đây và thay đổi x!
// Thao tác 2 (atomic)
y = x;
```

Trong đoạn code trên, `y` không chắc chắn sẽ bằng `2` vì một thread khác có thể đã thay đổi `x` trong khoảng thời gian giữa hai dòng lệnh.

---

### Phần 3: Lời Minh Oan Cho `volatile` - "Tôi Không Phải Dành Cho Thread!" 억

Đây là một trong những hiểu lầm lớn nhất và nguy hiểm nhất trong C++, đặc biệt với các lập trình viên đến từ các ngôn ngữ khác như Java hay C#.

- **Sự nhầm lẫn**: Trong Java/C#, `volatile` có vai trò trong việc đảm bảo memory visibility giữa các thread. Nhiều người lầm tưởng nó cũng có tác dụng tương tự trong C++.
- **Sự thật trong C++**: Trong C++, từ khóa `volatile` **KHÔNG CÓ BẤT KỲ TÁC DỤNG NÀO** liên quan đến thread-safety. Nó không ngăn chặn Data Race, không đảm bảo tính nguyên tử, và không đảm bảo memory visibility giữa các thread.

**Vậy `volatile` dùng để làm gì?** `volatile` là một chỉ thị cho **trình biên dịch (compiler)**, báo rằng "giá trị của biến này có thể bị thay đổi bởi các yếu tố nằm ngoài tầm kiểm soát của chương trình" (ví dụ: một thanh ghi phần cứng, một vùng nhớ được chia sẻ với một tiến trình khác). Nó ngăn cản trình biên dịch thực hiện các phép tối ưu hóa, chẳng hạn như lưu giá trị của biến vào thanh ghi và sử dụng lại mà không đọc lại từ bộ nhớ.

**Chứng minh:** Hãy quay lại ví dụ `counter++` của chúng ta, nhưng lần này thay `atomic` bằng `volatile`.

C++

```
#include <iostream>
#include <thread>
#include <vector>

// Dùng volatile thay vì atomic
volatile long long counter = 0;

void increment() {
    for (int i = 0; i < 100000; ++i) {
        counter++; // Thao tác này KHÔNG thread-safe
    }
}
//... main function ...
```

**Kết quả:**

```
Ket qua cuoi cung: 310813
Ket qua mong doi:  1000000
```

Data Race đã quay trở lại! Điều này chứng minh `volatile` hoàn toàn vô dụng trong việc ngăn chặn Data Race.

---

### Ghi Chú Phụ: `std::atomic` và Double-Checked Locking

`std::atomic` cũng chính là công cụ hiện đại để sửa lỗi "Double-Checked Locking Pattern" (DCLP) trong các phiên bản C++ trước C++17. Bằng cách khai báo con trỏ là `std::atomic<Resource*>`, chúng ta đảm bảo rằng việc đọc và ghi vào con trỏ này tuân thủ các quy tắc memory ordering, ngăn chặn được lỗi instruction reordering nguy hiểm.

---

**Tóm lại:**

1. `std::atomic` là công cụ chính để thực hiện các thao tác nguyên tử, lock-free, hiệu năng cao trên các kiểu dữ liệu cơ bản.
2. `volatile` trong C++ chỉ dùng để tương tác với memory-mapped hardware và ngăn chặn tối ưu hóa của trình biên dịch, nó **không phải** là một công cụ multi-thread.

Hãy luôn sử dụng đúng công cụ cho đúng công việc, và đối với các thao tác nguyên tử, `std::atomic` chính là công cụ bạn cần.

## Sửa Lỗi Double-Checked Locking với `std::atomic` - Một Phân Tích Sâu

Trong các bài học trước, chúng ta đã vạch trần sự nguy hiểm của Double-Checked Locking Pattern (DCLP) cổ điển do vấn đề instruction reordering. Một câu hỏi tự nhiên nảy ra: "Liệu `std::atomic` có thể cứu vãn được pattern này không?"

Câu trả lời là **CÓ**, nhưng cách làm phải thật chính xác và cẩn thận.

---

### Phần 1: Phân Tích Lại Vấn Đề và Hướng Giải Quyết

Vấn đề cốt lõi của DCLP là thao tác `ptr = new some_type;` không phải là nguyên tử (atomic). Nó có thể bị "xé" ra và sắp xếp lại, dẫn đến việc một thread có thể thấy `ptr` khác `nullptr` trong khi đối tượng nó trỏ tới chưa được khởi tạo.

Bằng cách khai báo `ptr` là `std::atomic<some_type*>`, chúng ta đã giải quyết được một phần quan trọng của vấn đề. Các thao tác đọc (`load`) và ghi (`store`) trên chính con trỏ `ptr` giờ đây là nguyên tử. Điều này ngăn chặn được "torn read/write" trên chính con trỏ.

Khi Thread B thực hiện kiểm tra lần 1, chỉ có hai khả năng:

1. **`ptr` là `nullptr`**: Thread B sẽ tiến vào và cố gắng lấy lock.
2. **`ptr` khác `nullptr`**: Điều này chỉ có thể xảy ra nếu Thread A đã hoàn thành thao tác gán `ptr = ...`. Với `std::atomic`, thao tác gán này đi kèm với các đảm bảo về memory ordering, giúp các thay đổi của Thread A (việc khởi tạo đối tượng) trở nên "nhìn thấy được" đối với Thread B.

Do đó, về cơ bản, việc sử dụng `std::atomic` đã giải quyết được Data Race.

---

### Phần 2: Hoàn Thiện Code - Sử Dụng `load()` và `store()` Tường Minh

Mặc dù code bạn cung cấp có thể chạy đúng trên nhiều trình biên dịch hiện đại, cách làm đúng đắn và rõ ràng nhất theo chuẩn C++ là sử dụng các phương thức `load()` và `store()` tường minh với các tham số memory ordering. Điều này cho phép chúng ta diễn đạt ý định của mình một cách chính xác nhất.

- **`ptr.load(std::memory_order_acquire)`**: Khi đọc con trỏ, chúng ta dùng `acquire` semantic. Nó tạo ra một "hàng rào bộ nhớ", đảm bảo rằng mọi thao tác ghi từ các thread khác (đặc biệt là việc khởi tạo đối tượng) xảy ra *trước* khi chúng ta đọc giá trị này phải được hoàn thành và "nhìn thấy được".
- **`ptr.store(p, std::memory_order_release)`**: Khi ghi con trỏ, chúng ta dùng `release` semantic. Nó cũng tạo ra một hàng rào, đảm bảo rằng mọi thao tác ghi xảy ra *trước* khi chúng ta lưu con trỏ (tức là việc cấp phát và khởi tạo) phải được hoàn thành trước.

**Đây là phiên bản DCLP hoàn chỉnh và an toàn trong C++ hiện đại:**

C++

```
#include <mutex>
#include <thread>
#include <vector>
#include <atomic>
#include <iostream>

class some_type {
public:
	some_type() { std::cout << "Constructor called by thread " << std::this_thread::get_id() << std::endl; }
	void do_it() { /*...*/ }
};

// Khai báo con trỏ là atomic
std::atomic<some_type*> ptr{nullptr};
std::mutex process_mutex;

void process() {
    // KIỂM TRA LẦN 1: Dùng 'acquire' để đảm bảo visibility
    if (ptr.load(std::memory_order_acquire) == nullptr) {
        std::lock_guard<std::mutex> lk(process_mutex);
        
        // KIỂM TRA LẦN 2: Dùng 'acquire' một lần nữa
        if (ptr.load(std::memory_order_acquire) == nullptr) {
            some_type* p = new some_type;
            // GHI: Dùng 'release' để đảm bảo các thao tác trước đó được "công bố"
            ptr.store(p, std::memory_order_release);
        }
    }
    // Lấy con trỏ ra một biến cục bộ để sử dụng an toàn
    some_type* local_ptr = ptr.load(std::memory_order_relaxed);
	local_ptr->do_it();
}

int main() {
	std::vector<std::thread> threads;
	
	for (int i = 0; i < 10; ++i)
		threads.emplace_back(std::thread{process});
	for (auto& t : threads)
		t.join();

    // Dọn dẹp
    delete ptr.load();
}
```

**Kết quả chạy:**

```
Constructor called by thread 0x70000e31b000
```

Constructor chỉ được gọi đúng một lần duy nhất, chứng tỏ pattern đã hoạt động đúng.

---

Việc sử dụng `std::atomic` kết hợp với memory ordering tường minh là cách làm chính xác và an toàn nhất để hiện thực hóa Double-Checked Locking Pattern trong C++ hiện đại.

Tuy nhiên, như đã thảo luận ở bài trước, DCLP vẫn là một pattern phức tạp và dễ gây lỗi. Trong hầu hết các trường hợp, giải pháp "Magic Statics" (Meyers' Singleton) vẫn là lựa chọn ưu tiên hàng đầu vì sự đơn giản và an toàn tuyệt đối của nó. Hãy chỉ sử dụng DCLP khi bạn thực sự cần khởi tạo đối tượng trên heap và hiểu rõ những gì mình đang làm.

*Until then, keep coding!*
