---
title: 'Modern C++ #7: (Review) Con trỏ và Bộ nhớ trong C++'
date: '2025-07-04 00:38:46'
date_gmt: '2025-07-03 17:38:46'
modified: '2025-07-04 00:47:37'
status: publish
slug: modern-c-7-review-con-tro-va-bo-nho-trong-c
wordpress_id: 79
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/04/modern-c-7-review-con-tro-va-bo-nho-trong-c/
categories:
- Modern C++
tags: []
---

Trong thế giới C++, con trỏ là một công cụ cung cấp quyền năng tối thượng: khả năng truy cập và thao tác trực tiếp với các địa chỉ bộ nhớ. Đây là tính năng không thể thiếu trong lập trình hệ thống, tương tác với phần cứng, hay tối ưu hiệu năng. Tuy nhiên, quyền năng luôn đi kèm với trách nhiệm. Việc quản lý bộ nhớ thủ công bằng con trỏ chứa đầy những cạm bẫy nguy hiểm nếu không cẩn thận.

Bài viết này sẽ đi sâu vào cách sử dụng con trỏ, cấp phát bộ nhớ động, và quan trọng hơn là cách để tránh những sai lầm kinh điển.

#### **1. Con trỏ: Biến chứa Địa chỉ**

Về cơ bản, **con trỏ (pointer)** là một biến mà giá trị của nó là một địa chỉ trong bộ nhớ.

- **Khai báo:** Dùng dấu hoa thị (`*`) sau kiểu dữ liệu. `int* p;` khai báo `p` là một con trỏ có thể trỏ đến một vùng nhớ chứa kiểu `int`.
- **Lấy địa chỉ:** Dùng toán tử địa chỉ (`&`) để lấy địa chỉ của một biến khác. `p = &my_variable;`.
- **Truy cập dữ liệu (Dereferencing):** Dùng toán tử hoa thị (`*`) trước tên con trỏ để đọc hoặc ghi dữ liệu tại địa chỉ mà nó đang trỏ tới.

C++

```
int i = 10;   // Một biến thông thường trên stack
int* p1 = &i; // p1 bây giờ giữ địa chỉ của i

std::cout << "Địa chỉ của i: " << p1 << std::endl;
std::cout << "Giá trị tại địa chỉ đó: " << *p1 << std::endl; // Sẽ in ra 10

*p1 = 20; // Thay đổi giá trị tại địa chỉ của i thông qua con trỏ
std::cout << "Giá trị mới của i: " << i << std::endl; // Sẽ in ra 20
```

#### **2. Cấp phát Động trên Heap với `new`**

Các biến như `i` ở trên được lưu trên **stack** và sẽ tự động bị hủy khi ra khỏi scope. Nhưng nếu chúng ta cần một đối tượng tồn tại lâu hơn, chúng ta phải cấp phát bộ nhớ trên **heap** bằng toán tử `new`.

C++

```
// Cấp phát một vùng nhớ trên heap để chứa một số int
int* p2 = new int; 

// Cấp phát và khởi tạo giá trị ban đầu (cú pháp C++11)
int* p3 = new int{36}; 

std::cout << "Giá trị của p3: " << *p3 << std::endl; // In ra 36
```

Bộ nhớ được cấp phát trên heap sẽ tồn tại cho đến khi nó được giải phóng một cách tường minh. Và đây là nơi các vấn đề bắt đầu nảy sinh.

#### **3. Những Cạm bẫy Chết người**

##### **a. Rò rỉ Bộ nhớ (Memory Leaks): Kẻ thù thầm lặng**

Rò rỉ bộ nhớ xảy ra khi bạn cấp phát bộ nhớ trên heap nhưng sau đó làm mất con trỏ duy nhất trỏ đến nó. Vùng nhớ đó vẫn bị chương trình chiếm giữ nhưng không còn cách nào để truy cập hay giải phóng nó nữa.

C++

```
void cause_a_leak() {
    int* p4 = new int{42}; // p4 là biến cục bộ trên stack
    // ... làm việc với p4 ...
} // Khi hàm kết thúc, p4 bị hủy.
  // Nhưng vùng nhớ chứa số 42 trên heap thì vẫn còn đó, bị bỏ rơi!
```

Trong các ứng dụng chạy dài ngày, memory leak sẽ tích tụ dần, làm chương trình "phình to" và cuối cùng làm sập cả hệ thống.

##### **b. Con trỏ Lơ lửng (Dangling Pointers): Cánh cửa dẫn đến Hỗn loạn**

Đây là lỗi xảy ra khi bạn giải phóng một vùng nhớ, nhưng vẫn giữ lại con trỏ trỏ đến vùng nhớ (nay đã vô chủ) đó.

C++

```
int* p5 = new int{100};
delete p5; // Giải phóng vùng nhớ

// Bây giờ p5 trở thành một "dangling pointer"
*p5 = 99; // LỖI NGHIÊM TRỌNG! Ghi vào vùng nhớ không còn thuộc về mình
          // Đây là hành vi không xác định (undefined behavior), có thể gây sập chương trình.
```

Việc truy cập vào một dangling pointer là một trong những lỗi nguy hiểm và khó tìm nhất trong C++.

#### **4. Quản lý Tài nguyên: Cặp bài trùng `new` và `delete`**

Giải pháp cho memory leak là giải phóng bộ nhớ khi bạn đã dùng xong. Cặp toán tử `new` và `delete` là không thể tách rời.

**Quy tắc vàng: Với mỗi `new`, phải có một `delete` tương ứng.**

C++

```
void no_leak() {
    int* p4 = new int{42};
    // ... làm việc với p4 ...
    delete p4; // Giải phóng bộ nhớ trước khi con trỏ bị hủy
}
```

#### **5. Thao tác với Mảng Động**

`new` và `delete` cũng có phiên bản dành cho mảng.

- **Cấp phát mảng:** `int* pa = new int[20];`
- **Giải phóng mảng:** `delete[] pa;`

**Quy tắc vàng thứ hai: `new[]` phải đi đôi với `delete[]`.**

Việc dùng sai cặp (ví dụ `delete pa` thay vì `delete[] pa`) cũng là hành vi không xác định và có thể gây ra những lỗi khó lường.

#### **Lời kết: Hướng tới Modern C++**

Như bạn thấy, quản lý bộ nhớ thủ công với `new`/`delete` cực kỳ mạnh mẽ nhưng cũng vô cùng rủi ro và dễ mắc lỗi. Chính vì những cạm bẫy này, **Modern C++ khuyến khích chúng ta hạn chế tối đa việc sử dụng trực tiếp `new` và `delete`**.

Thay vào đó, C++ hiện đại cung cấp một giải pháp an toàn và thanh lịch hơn nhiều: **Con trỏ thông minh (Smart Pointers)** như `std::unique_ptr` và `std::shared_ptr`. Chúng ta sẽ khám phá chúng trong những bài học tiếp theo. Đây là cách tiếp cận ưu tiên giúp bạn tận dụng sức mạnh của bộ nhớ động mà không phải đối mặt với những rủi ro kể trên.

Hãy tiếp tục viết mã và luôn nhớ đến trách nhiệm đi kèm với con trỏ! Keep coding!
