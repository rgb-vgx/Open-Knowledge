---
title: 'Bài 30 — Đóng gói (encapsulation) trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 30
status: edited
source: '030 - Encapsulation In OOPS.md'
categories:
- AI
tags: []
---

# 🔐 Encapsulation — gói dữ liệu và kiểm soát truy cập

> Nguồn: `030 - Encapsulation In OOPS.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086821)

**Encapsulation** là việc gói dữ liệu (biến) và các method thao tác trên dữ liệu đó vào một khối duy nhất, đồng thời **hạn chế truy cập trực tiếp** vào một số thành phần của object — nhằm tránh thay đổi nhầm lẫn và lạm dụng. Đây là nền tảng để thiết kế code dễ bảo trì, dễ tái sử dụng.

### 🔎 Ba mức truy cập: public, protected, private

Trong Python có ba kiểu "access modifier" dựa trên quy ước đặt tên:

| Kiểu | Cách viết | Truy cập từ ngoài class | Truy cập từ class con |
|---|---|---|---|
| Public | `self.name` | ✅ Có | ✅ Có |
| Protected | `self._name` | ❌ Không (theo quy ước) | ✅ Có |
| Private | `self.__name` | ❌ Không | ❌ Không |

Ví dụ class có cả biến public và private:

```python
class Person:
    def __init__(self, name, age, gender):
        self.__name = name      # private
        self.__age = age        # private
        self.gender = gender    # public
```

Tạo object và kiểm tra bằng `dir()`:

```python
person = Person("Krish", 34, "male")
print(dir(person))
```

Kết quả không có `__name` hay `__age`, mà thay vào đó là **`_Person__name`**, **`_Person__age`**. Đây là **name mangling**: Python tự đổi tên private attribute bằng cách thêm tiền tố `_TênClass`. Cố truy cập `person.__name` sẽ báo lỗi *không có attribute đó*.

### 🚫 Vì sao private "không truy cập được" từ ngoài

```python
print(person.__name)   # AttributeError: 'Person' object has no attribute '__name'
```

Private attribute **không truy cập được từ ngoài class** và cả **từ class con** cũng không. Nhưng bên trong class thì dùng được bình thường — và đó chính là lý do sinh ra **getter/setter**.

Giảng viên so sánh với chiếc máy giặt: bạn thấy nút bấm, chỗ cho quần áo, cách khởi động — nhưng cơ cấu bên trong hoàn toàn bị che. Encapsulation làm đúng như vậy: chỉ mở ra những gì cần dùng.

Một lưu ý của giảng viên: Python không có ràng buộc tuyệt đối. Vì `dir()` vẫn hiện `_Person__age`, lập trình viên vẫn "moi" được private attribute bằng tên đã mangled — nhưng đó là **không phải best practice**, làm vậy là phá vỡ ý đồ thiết kế.

### 🔓 Getter và setter — cửa chính thức để đọc/ghi

Getter là method public để **đọc** giá trị private; setter là method public để **ghi** giá trị, thường kèm kiểm tra hợp lệ:

```python
class Person:
    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name

    def get_age(self):
        return self.__age

    def set_age(self, age):
        if age > 0:
            self.__age = age
        else:
            print("Age cannot be negative")
```

Dùng thử:

```python
person = Person("Krish", 34)

print(person.get_name())   # Krish
print(person.get_age())    # 34

person.set_age(35)
print(person.get_age())    # 35

person.set_age(-5)         # Age cannot be negative
```

`set_age` chính là chỗ đặt logic nghiệp vụ: chỉ chấp nhận tuổi dương. Nếu để `__age` public, ai cũng có thể gán `-5` mà không ai kiểm soát.

### 🧱 Protected — mở cho class con

Protected dùng **một dấu gạch dưới**:

```python
class Person:
    def __init__(self, name, age, gender):
        self._name = name      # protected
        self._age = age        # protected
        self.gender = gender   # public


class Employee(Person):
    def __init__(self, name, age, gender):
        super().__init__(name, age, gender)
```

Từ `Employee` (class con), `self._name` truy cập được:

```python
employee = Employee("Krish", 34, "male")
print(employee._name)   # Krish
```

Nhưng từ bên ngoài, `_name` không nên dùng — đây là quy ước giữa các lập trình viên, không phải rào chắn cứng của Python.

### 📌 Tóm tắt thực hành

1. Dữ liệu quan trọng, không muốn bị sửa tùy tiện → để **private** (`__name`).
2. Dữ liệu cần cho class con → **protected** (`_name`).
3. Dữ liệu thoải mái chia sẻ → **public** (`name`).
4. Mọi truy cập/ghi vào dữ liệu private nên đi qua **getter/setter**, nơi đặt được kiểm tra hợp lệ.

---

Encapsulation trả lời câu hỏi "ai được phép chạm vào dữ liệu". Bài sau mình sang **abstraction** — ẩn chi tiết triển khai phức tạp và chỉ phơi ra những gì người dùng thực sự cần.
