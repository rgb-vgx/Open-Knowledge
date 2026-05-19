---
title: 'Modern C++ #2: (Review) Hiểu về Biến cục bộ và Các cách truyền tham số cho
  hàm'
date: '2025-07-03 23:37:46'
date_gmt: '2025-07-03 16:37:46'
modified: '2025-07-03 23:37:46'
status: publish
slug: modern-c-2-review-hieu-ve-bien-cuc-bo-va-cac-cach-truyen-tham-so-cho-ham
wordpress_id: 55
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/03/modern-c-2-review-hieu-ve-bien-cuc-bo-va-cac-cach-truyen-tham-so-cho-ham/
categories:
- Modern C++
tags: []
---

Trước khi đi sâu vào những kỹ thuật nâng cao của Modern C++, việc nắm vững các khái niệm cơ bản là điều bắt buộc. Trong bài viết này, chúng ta sẽ "giải phẫu" vòng đời của một biến cục bộ và phân tích chi tiết các phương pháp truyền đối số cho hàm trong C++.

#### **1. Vòng đời của một Biến Cục bộ: Scope, Stack và Sự tồn tại**

Khi bạn định nghĩa một biến bên trong một cặp dấu ngoặc nhọn `{}`, bạn đã tạo ra một **biến cục bộ** (local variable). Cặp ngoặc nhọn này định nghĩa một **phạm vi** (scope).

```
{ // Bắt đầu scope
    int i = 10; // Biến 'i' được tạo ra
    // ... có thể sử dụng 'i' ở đây ...
} // Kết thúc scope, biến 'i' bị hủy
```

Vòng đời của biến `i` diễn ra như sau:

1. **Tạo ra (Creation):** Khi chương trình thực thi đến dòng `int i = 10;`, một vùng nhớ đủ để chứa một số nguyên (`int`) sẽ được cấp phát trên **stack** của chương trình.
2. **Khởi tạo (Initialization):** Vùng nhớ đó được gán giá trị khởi tạo.
   - Nếu bạn cung cấp giá trị (như `10`), nó sẽ được sử dụng.
   - Nếu không, đối với kiểu dữ liệu cơ bản (`int`, `double`...), nó sẽ chứa một "giá trị rác" (dữ liệu ngẫu nhiên có sẵn trong bộ nhớ). Đối với đối tượng của một `class`, hàm khởi tạo mặc định (default constructor) sẽ được gọi.
3. **Hủy bỏ (Destruction):** Ngay khi chương trình thoát khỏi scope (đi qua dấu `}`), biến `i` sẽ bị hủy. Bộ nhớ mà nó chiếm giữ trên stack được giải phóng và không thể truy cập được nữa. Ta nói rằng biến đã "ra khỏi tầm vực" (gone out of scope).

#### **2. Khám phá các phương pháp truyền tham số cho hàm**

Cách bạn truyền một biến vào hàm sẽ quyết định liệu hàm đó có thể thay đổi giá trị của biến gốc hay không.

##### **2.1. Truyền bằng Giá trị (Pass-by-Value): Bản sao độc lập**

Đây là phương pháp mặc định. Một **bản sao** của biến gốc sẽ được tạo ra bên trong hàm.

```
#include <iostream>

// y là một bản sao của x
int func(int y) {
    y = 1; // Chỉ thay đổi bản sao y, không ảnh hưởng đến x
    std::cout << "Địa chỉ của y (bên trong hàm): " << &y << std::endl;
    return y;
}

int main() {
    int x = 2;
    std::cout << "Địa chỉ của x (bên ngoài hàm): " << &x << std::endl;
    int z = func(x);

    std::cout << "Giá trị của x sau khi gọi hàm: " << x << std::endl; // x vẫn là 2
    std::cout << "Giá trị của z: " << z << std::endl; // z nhận giá trị trả về là 1
    return 0;
}
```

**Kết quả:** Địa chỉ của `x` và `y` sẽ khác nhau, chứng tỏ chúng là hai biến hoàn toàn riêng biệt. Việc thay đổi `y` không hề ảnh hưởng đến `x`.

##### **2.2. Truyền bằng Con trỏ (Pass-by-Pointer): Quyền năng thay đổi từ xa**

Thay vì tạo bản sao, chúng ta truyền **địa chỉ bộ nhớ** của biến. Hàm sẽ nhận vào một con trỏ để "trỏ" tới địa chỉ đó.

```
#include <iostream>

// y là một con trỏ, giữ địa chỉ của x
int func(int* y) {
    *y = 1; // Dùng toán tử '*' để truy cập và thay đổi giá trị tại địa chỉ mà y đang trỏ tới
    std::cout << "Giá trị của y (địa chỉ của x): " << y << std::endl;
    return *y;
}

int main() {
    int x = 2;
    std::cout << "Địa chỉ của x: " << &x << std::endl;
    int z = func(&x); // Truyền địa chỉ của x bằng toán tử '&'

    std::cout << "Giá trị của x sau khi gọi hàm: " << x << std::endl; // x đã bị thay đổi thành 1
    return 0;
}
```

**Kết quả:** Giá trị của con trỏ `y` chính là địa chỉ của biến `x`. Bằng cách giải tham chiếu (`*y`), ta có thể thay đổi trực tiếp giá trị của biến `x` từ bên trong hàm.

##### **2.3. Truyền bằng Tham chiếu (Pass-by-Reference): Bí danh tiện lợi**

Đây là cách viết đơn giản và an toàn hơn so với con trỏ. Tham số của hàm trở thành một **bí danh** (alias) cho biến gốc. Mọi thao tác trên bí danh cũng chính là thao tác trên biến gốc.

```
#include <iostream>

// y là một tham chiếu (bí danh) của x
int func(int& y) {
    y = 1; // Thay đổi y cũng chính là thay đổi x
    std::cout << "Địa chỉ của y (tham chiếu): " << &y << std::endl;
    return y;
}

int main() {
    int x = 2;
    std::cout << "Địa chỉ của x: " << &x << std::endl;
    int z = func(x); // Cú pháp truyền giống hệt pass-by-value

    std::cout << "Giá trị của x sau khi gọi hàm: " << x << std::endl; // x đã bị thay đổi thành 1
    return 0;
}
```

**Kết quả:** Địa chỉ của `x` và `y` sẽ **giống hệt nhau**, vì `y` chỉ là một cái tên khác của `x`. Đây là cách ưu tiên trong Modern C++ khi bạn muốn thay đổi giá trị của đối số.

#### **3. Tối ưu và An toàn với `const` Reference**

Vậy nếu bạn có một đối tượng lớn (ví dụ một `class` phức tạp) và chỉ muốn đọc dữ liệu từ nó mà không sao chép (để tiết kiệm hiệu năng), nhưng vẫn muốn đảm bảo hàm không vô tình thay đổi nó thì sao?

Câu trả lời là **truyền bằng tham chiếu hằng (pass-by-const-reference)**.

```
#include <iostream>
#include <string>

// obj là một tham chiếu, nhưng là tham chiếu hằng (const)
void inspect_object(const std::string& obj) {
    std::cout << "Đối tượng có giá trị: " << obj << std::endl; // OK: Chỉ đọc
    // obj = "Một chuỗi mới"; // Lỗi biên dịch! Không thể gán cho biến hằng.
}

int main() {
    std::string my_data = "Dữ liệu gốc quan trọng";
    inspect_object(my_data);
    return 0;
}
```

Đây là phương pháp hiệu quả nhất để truyền các đối tượng lớn mà chỉ cần truy cập đọc:

- **Hiệu quả:** Không tốn chi phí sao chép đối tượng như pass-by-value.
- **An toàn:** Trình biên dịch sẽ đảm bảo hàm không thể thay đổi giá trị của biến gốc, giúp mã nguồn trở nên an toàn và dễ đoán hơn.

#### **Bảng so sánh nhanh**

| Phương pháp | Cú pháp hàm | Cơ chế | Thay đổi biến gốc? | Khi nào dùng? |
| --- | --- | --- | --- | --- |
| **Pass-by-Value** | `func(int y)` | Tạo bản sao | **Không** | Các kiểu dữ liệu cơ bản, nhỏ (int, double, char...). |
| **Pass-by-Pointer** | `func(int* y)` | Truyền địa chỉ | **Có** | Lập trình C, hoặc khi cần khả năng trỏ tới `nullptr`. |
| **Pass-by-Reference** | `func(int& y)` | Tạo bí danh | **Có** | **Cách ưu tiên** trong C++ để thay đổi giá trị đối số. |
| **Pass-by-const-Ref** | `func(const T& y)` | Bí danh chỉ đọc | **Không** | **Cách ưu tiên** để truyền các đối tượng lớn (class, struct) mà không cần thay đổi. |

Export to Sheets

### **Kết luận**

Việc lựa chọn phương pháp truyền tham số phù hợp là một kỹ năng cơ bản nhưng tối quan trọng. Nó ảnh hưởng trực tiếp đến hiệu năng, tính đúng đắn và sự an toàn của chương trình. Hãy luôn ghi nhớ:

- Dùng **pass-by-value** cho các kiểu dữ liệu nhỏ.
- Dùng **pass-by-const-reference** để "nhìn" các đối tượng lớn.
- Dùng **pass-by-reference** để thay đổi các đối tượng.

Và như mọi khi, cách tốt nhất để hiểu sâu là thực hành. Hãy thử nghiệm với các ví dụ trên, thay đổi chúng và xem kết quả. Keep coding!
