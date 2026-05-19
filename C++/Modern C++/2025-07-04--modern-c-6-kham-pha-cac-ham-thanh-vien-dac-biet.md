---
title: 'Modern C++ #6: Khám phá các Hàm thành viên đặc biệt'
date: '2025-07-04 00:26:05'
date_gmt: '2025-07-03 17:26:05'
modified: '2025-07-05 00:23:33'
status: publish
slug: modern-c-6-kham-pha-cac-ham-thanh-vien-dac-biet
wordpress_id: 74
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/04/modern-c-6-kham-pha-cac-ham-thanh-vien-dac-biet/
categories:
- Modern C++
tags: []
---

Trong C++, không phải tất cả các hàm thành viên đều được tạo ra như nhau. Có một nhóm các hàm được coi là "đặc biệt" vì chúng đóng vai trò then chốt trong việc quản lý vòng đời của một đối tượng: từ lúc được sinh ra, sao chép, cho đến khi bị hủy bỏ.

Điểm đặc biệt của chúng là:

- Tên của chúng có liên quan mật thiết đến tên của lớp.
- Chúng ta thường **không gọi chúng một cách tường minh**. Thay vào đó, trình biên dịch sẽ tự động chèn các lời gọi đến những hàm này vào những thời điểm thích hợp.

Theo C++ truyền thống, có 4 hàm thành viên đặc biệt mà mọi lập trình viên C++ cần phải nắm vững.

#### **1. Constructor (Hàm khởi tạo) - Sự Khởi đầu của một Đối tượng**

Đây là hàm được gọi khi một đối tượng mới được tạo ra. Nhiệm vụ của nó là khởi tạo đối tượng với các giá trị ban đầu.

- **Tên hàm:** Giống hệt tên lớp.
- **Mục đích:** Thiết lập trạng thái ban đầu cho đối tượng.

**Thực hành tốt nhất:** Sử dụng **danh sách khởi tạo thành viên (member initializer list)** để khởi tạo dữ liệu. Đây là cách hiệu quả hơn so với việc gán giá trị trong thân hàm.

C++

```
class MyString {
private:
    int m_id;
    std::string m_str;

public:
    // Sử dụng member initializer list (phần sau dấu hai chấm ':')
    // Các thành viên được khởi tạo trực tiếp, không qua bước gán.
    MyString(int id, const std::string& str) : m_id(id), m_str(str) {
        // Thân hàm dùng cho các tác vụ phức tạp hơn sau khi đã khởi tạo
        // Ví dụ: kết nối CSDL, mở file, cấp phát bộ nhớ...
        std::cout << "Đối tượng " << m_id << " được tạo.\n";
    }
};
```

Việc gán trong thân hàm (`m_id = id;`) sẽ thực hiện khởi tạo mặc định trước, sau đó mới thực hiện phép gán, gây ra công việc thừa.

#### **2. Copy Constructor (Hàm khởi tạo sao chép) - Tạo ra một Bản sao**

Hàm này được gọi khi một đối tượng mới được tạo ra như một bản sao của một đối tượng đã tồn tại.

- **Mục đích:** Tạo một bản sao chính xác của một đối tượng khác.
- **Cú pháp tiêu biểu:** `ClassName(const ClassName& other)`

**Điểm cốt lõi:** Tham số của hàm khởi tạo sao chép **bắt buộc phải là một tham chiếu (`&`)**.

- **Tại sao?** Nếu bạn truyền bằng giá trị (`ClassName other`), để tạo ra `other`, trình biên dịch sẽ phải gọi... hàm khởi tạo sao chép. Điều này lại yêu cầu tạo một bản sao khác, và cứ thế tiếp diễn, gây ra một vòng lặp đệ quy vô tận!
- **Tại sao là `const`?** Vì bạn không bao giờ nên thay đổi đối tượng gốc khi chỉ đang sao chép từ nó.

C++

```
// Bên trong class MyString
MyString(const MyString& other) : m_id(other.m_id), m_str(other.m_str) {
    std::cout << "Đối tượng " << m_id << " được sao chép.\n";
}
```

#### **3. Copy Assignment Operator (`operator=`) - Gán giá trị**

Hàm này được gọi khi bạn gán giá trị của một đối tượng đã tồn tại cho một đối tượng **khác cũng đã tồn tại**.

- **Phân biệt:** Hàm khởi tạo sao chép tạo ra *đối tượng mới*, còn toán tử gán thao tác trên *hai đối tượng đã có sẵn*.
- **Cú pháp tiêu biểu:** `ClassName& operator=(const ClassName& other)`

**Điểm cốt lõi:**

- Hàm trả về một tham chiếu (`ClassName&`) tới chính đối tượng đã được gán (`*this`). Điều này cho phép thực hiện "gán chuỗi" (chained assignment) như `a = b = c;`, một cú pháp hợp lệ trong C/C++.
- Tham số cũng nên là một `const` tham chiếu vì lý do hiệu năng và an toàn.

C++

```
// Bên trong class MyString
MyString& operator=(const MyString& other) {
    std::cout << "Đối tượng " << this->m_id << " được gán từ " << other.m_id << ".\n";
    
    // Gán giá trị cho các thành viên
    m_id = other.m_id;
    m_str = other.m_str;
    
    // Trả về chính đối tượng này để cho phép gán chuỗi
    return *this;
}
```

#### **4. Destructor (Hàm hủy) - Lời Tạm biệt Cuối cùng**

Đây là hàm được gọi tự động ngay trước khi một đối tượng bị hủy (khi nó ra khỏi scope hoặc bị `delete`).

- **Tên hàm:** Giống tên lớp nhưng có dấu ngã (`~`) ở trước. Ví dụ: `~MyString()`.
- **Mục đích:** Dọn dẹp tài nguyên mà đối tượng đã sử dụng trong suốt vòng đời của nó. Đây là hành động ngược lại với hàm khởi tạo.
- **Ví dụ dọn dẹp:** Giải phóng bộ nhớ đã cấp phát, đóng kết nối CSDL, đóng file...

C++

```
// Bên trong class MyString
~MyString() {
    // Thực hiện các công việc dọn dẹp ở đây
    std::cout << "Đối tượng " << m_id << " bị hủy.\n";
}
```

Việc hiểu và triển khai đúng các hàm thành viên đặc biệt này là nền tảng để xây dựng các lớp C++ mạnh mẽ, an toàn và không bị rò rỉ tài nguyên. Keep coding!
