---
title: 'Bài 029 — Đa hình (polymorphism) trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 29
status: edited
source: '029 - Polymorphism In OOPS.md'
categories:
- AI
tags: []
---

# 🎭 Polymorphism — một hành động, nhiều hình thái

> Nguồn: `029 - Polymorphism In OOPS.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086813)

**Polymorphism** (bắt nguồn từ "multiple forms" — nhiều hình thái) cho phép các object thuộc class khác nhau được xử lý như object của một superclass chung. Nói cách khác: cùng một hành động, nhưng mỗi object thực hiện theo cách riêng. Trong Python, điều này đạt được chủ yếu qua **method overriding** và **abstract base class**.

### 🐕 Method overriding: class con tự viết lại hành vi

**Method overriding** cho phép class con cung cấp cách triển khai riêng cho method đã có ở class cha. Ví dụ class cha `Animal`:

```python
class Animal:
    def speak(self):
        return "The sound of the animal"
```

Hai class con cùng kế thừa nhưng override `speak` theo cách khác nhau:

```python
class Dog(Animal):
    def speak(self):
        return "Woof"

class Cat(Animal):
    def speak(self):
        return "Meow"
```

```python
dog = Dog()
cat = Cat()

print(dog.speak())   # Woof
print(cat.speak())   # Meow
```

Cùng tên method `speak`, nhưng hành vi khác nhau tùy object. Đó là bản chất của overriding.

---

### 🔁 Hàm ngoài class cũng thể hiện polymorphism

Không chỉ method — một hàm thường nhận object và gọi method của nó cũng minh họa polymorphism:

```python
def animal_speak(animal):
    print(animal.speak())

animal_speak(dog)   # Woof
```

Hàm `animal_speak` không cần biết `animal` là `Dog` hay `Cat`; nó chỉ cần object có method `speak`. Đây là lợi ích cốt lõi: một hàm xử lý được nhiều loại object khác nhau.

---

### 📐 Ví dụ thực tế: tính diện tích các hình

Class cha `Shape` định nghĩa method `area`:

```python
class Shape:
    def area(self):
        print("The area of the figure")
```

Mỗi hình override với công thức riêng:

```python
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius * self.radius
```

Dùng chung một hàm:

```python
def print_area(shape):
    print(f"The area is {shape.area()}")

rectangle = Rectangle(4, 5)
circle = Circle(3)

print_area(rectangle)   # The area is 20
print_area(circle)      # The area is 28.26
```

`Rectangle(4, 5)` cho diện tích 20 (4 × 5). `Circle(3)` theo công thức πr² với π = 3.14 cho 28.26 — trong video giảng viên đọc thành 28.25, đó chỉ là cách đọc số.

---

### 🧩 Abstract base class — bắt buộc class con phải triển khai

Interface trong ngôn ngữ khác tương ứng với **abstract base class (ABC)** trong Python. ABC định nghĩa bộ method chung cho một nhóm object liên quan, và buộc class con phải triển khai các method đó — đảm bảo tính nhất quán.

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def start_engine(self):
        pass
```

* `ABC` là class nền cho abstract class.
* `@abstractmethod` là decorator đánh dấu method trừu tượng — thân method để trống (`pass`).
* Không thể tạo object trực tiếp từ `Vehicle`; class con bắt buộc phải cài đặt `start_engine`.

Hai class con triển khai khác nhau:

```python
class Car(Vehicle):
    def start_engine(self):
        return "Car engine started"


class MotorCycle(Vehicle):
    def start_engine(self):
        return "Motorcycle engine started"
```

Chạy thử:

```python
for v in (Car(), MotorCycle()):
    print(v.start_engine())
```

---

### 🧭 Vì sao polymorphism quan trọng?

* Cho phép **một hàm** xử lý object của nhiều class, mỗi class tự lo phần triển khai.
* Code dễ **mở rộng**: thêm class mới chỉ cần cài đặt đúng interface chung, không sửa hàm xử lý.
* Tăng tính **linh hoạt và dễ bảo trì** trong thiết kế hướng đối tượng.

---

Ba trụ cột của OOP đã hiện diện đủ: đóng gói dữ liệu trong object, kế thừa giữa class, và polymorphism cho hành vi linh hoạt. Bài sau mình đi sâu vào hai khái niệm còn lại — **encapsulation** và **abstraction**.
