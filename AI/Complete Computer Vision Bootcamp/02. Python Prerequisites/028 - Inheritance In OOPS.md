---
title: 'Bài 28 — Kế thừa (inheritance) trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 28
status: edited
source: '028 - Inheritance In OOPS.md'
categories:
- AI
tags: []
---

# 🧬 Kế thừa trong OOP: single và multiple inheritance

> Nguồn: `028 - Inheritance In OOPS.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086797)

**Inheritance** cho phép một class thừa hưởng attributes và methods từ class khác — giống chuyện con cái thừa kế tài sản của cha mẹ, nhưng chiều ngược lại thì không. Nhờ vậy mình không phải viết lại từ đầu những gì class cha đã có. Bài này gồm **single inheritance**, `super()`, và **multiple inheritance**.

### 🚙 Class cha: blueprint `Car`

Bắt đầu với class cha có constructor đầy đủ:

```python
class Car:
    def __init__(self, windows, doors, engine_type):
        self.windows = windows
        self.doors = doors
        self.engine_type = engine_type

    def drive(self):
        print(f"The person will drive the {self.engine_type} car")
```

Dùng thử trực tiếp:

```python
car1 = Car(4, 5, "petrol")
car1.drive()   # The person will drive the petrol car
```

Lưu ý: bên trong method phải gọi `self.engine_type`, không dùng `engine_type` trần. Nếu viết `print(car1.drive())` thì kết quả in ra thêm `None` vì `drive` chỉ `print`, không `return`.

### 🚘 Single inheritance với `super()`

Tesla cũng là một chiếc xe: có windows, doors, engine type, nhưng thêm thuộc tính **self-driving**. Thay vì chép lại toàn bộ, kế thừa từ `Car`:

```python
class Tesla(Car):
    def __init__(self, windows, doors, engine_type, is_self_driving):
        super().__init__(windows, doors, engine_type)
        self.is_self_driving = is_self_driving

    def self_driving(self):
        print(f"Tesla supports self-driving: {self.is_self_driving}")
```

* `class Tesla(Car)` — tên class cha đặt trong ngoặc là kế thừa.
* `super().__init__(...)` gọi constructor của class cha, để class cha tự khởi tạo `windows`, `doors`, `engine_type`.
* Tesla chỉ tự khai báo thêm `self.is_self_driving`.

Chạy thử:

```python
tesla1 = Tesla(4, 5, "electric", True)
tesla1.self_driving()   # Tesla supports self-driving: True
tesla1.drive()          # The person will drive the electric car
```

Method `drive` không hề viết lại trong `Tesla` nhưng vẫn gọi được — đó chính là phần "thừa kế". Đây là **single inheritance** vì chỉ một class con kế thừa một class cha.

### 🐾 Multiple inheritance: kế thừa nhiều base class

Khi một class cần lấy dữ liệu từ **nhiều hơn một** base class, khai báo chúng cách nhau bằng dấu phẩy. Giả sử có hai base class:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print("Subclasses must implement this method")


class Pet:
    def __init__(self, owner):
        self.owner = owner
```

Class `Dog` kế thừa cả hai:

```python
class Dog(Animal, Pet):
    def __init__(self, name, owner):
        Animal.__init__(self, name)
        Pet.__init__(self, owner)

    def speak(self):
        return f"{self.name} says woof"
```

Điểm khác biệt so với single inheritance: khi có hai class cha, `super()` không đủ rõ ràng, nên gọi trực tiếp **`Animal.__init__(self, ...)`** và **`Pet.__init__(self, ...)`** để lấy đúng thuộc tính từ từng class.

Kết quả:

```python
dog = Dog("Buddy", "Krish")
print(dog.speak())   # Buddy says woof
print(dog.owner)     # Krish
```

`Dog` override `speak` của `Animal`; method của class con được ưu tiên hơn method cùng tên ở class cha.

### 🧭 Tóm tắt luồng chạy

1. Tạo `Dog("Buddy", "Krish")` → gọi `Dog.__init__`.
2. `Dog.__init__` lần lượt gọi `Animal.__init__(self, name)` và `Pet.__init__(self, owner)`.
3. Mỗi base class gán instance variable của mình (`self.name`, `self.owner`).
4. Gọi `speak()` → Python tìm trong `Dog` trước, thấy liền dùng, không chạm tới `Animal.speak`.

---

Nắm được `super()` và cách gọi constructor của từng base class là đủ để dựng các hệ thống phân cấp class gọn gàng. Bài sau mình sang **polymorphism** — cùng một method nhưng hành xử khác nhau tùy object, và tiếp đó là ví dụ mô hình hóa hệ thống thư viện.
