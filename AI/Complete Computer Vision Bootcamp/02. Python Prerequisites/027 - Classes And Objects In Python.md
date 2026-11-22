---
title: 'Bài 027 — Class và object trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 27
status: edited
source: '027 - Classes And Objects In Python.md'
categories:
- AI
tags: []
---

# 🏗️ Class và object — viên gạch đầu tiên của OOP

> Nguồn: `027 - Classes And Objects In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086785)

**Object-Oriented Programming (OOP)** là paradigm dùng object để thiết kế ứng dụng, cho phép mô hình hóa thế giới thực. Dự án end-to-end nào rồi cũng cần **class** và **object**, vì chúng tăng khả năng tái sử dụng code. Trong bài này mình tạo class từ con số 0, hiểu `__init__`, `self`, instance variable và instance method.

### 🚗 Class là blueprint, object là sản phẩm

**Class** là bản thiết kế (blueprint) để tạo object, chứa **attributes** (thuộc tính) và **methods** (hành vi) riêng.

```python
class Car:
    pass
```

Từ blueprint này tạo ra nhiều object khác nhau:

```python
audi = Car()
bmw = Car()

print(type(audi))   # <class '__main__.Car'>
print(audi)         # <__main__.Car object at 0x...>
```

`audi` và `bmw` đều là **object** — chúng được *instantiate* từ class `Car`, nằm ở những vùng nhớ khác nhau. Cùng một class `Car`, nhưng mỗi object đại diện một chiếc xe cụ thể.

---

### ⚠️ Vì sao không nên gán attribute tùy tiện

Có thể gán thẳng thuộc tính cho từng object:

```python
audi.windows = 4
print(audi.windows)   # 4

tata = Car()
tata.doors = 4
print(tata.windows)   # AttributeError!
```

`audi` có `windows` nhưng `tata` thì không — mỗi object tự mọc thuộc tính riêng, không nhất quán. Đây **không phải cách làm chuẩn**. Muốn mọi object đều có đủ thuộc tính ngay từ đầu, phải khai báo trong **constructor**.

---

### 🔧 `__init__` — constructor khởi tạo thuộc tính

Python có method đặc biệt `__init__` (đọc là "dunder init") đóng vai trò **constructor**, chạy tự động mỗi khi tạo object:

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
```

* `self.name` là **instance variable** (thuộc tính của object).
* `name` bên phải dấu `=` là **parameter** truyền vào lúc tạo object.
* `self` là tham chiếu tới chính object đang được tạo — nhờ nó method truy cập được instance variable của object đó.

`self` không bắt buộc phải tên là `self` (có thể đặt bất kỳ tên gì), nhưng `self` là quy ước chung toàn cầu và nên giữ.

Tạo object bây giờ bắt buộc phải truyền đủ tham số:

```python
dog1 = Dog("Buddy", 3)
print(dog1.name)   # Buddy
print(dog1.age)    # 3

dog2 = Dog("Lucy", 4)
print(dog2.name)   # Lucy
```

Nếu gọi `Dog()` mà thiếu tham số, Python báo thiếu **positional argument** `name` và `age`.

---

### 🐕 Instance method — hành vi của object

**Instance method** là hàm định nghĩa trong class, nhận `self` làm tham số đầu để truy cập instance variable:

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print(f"{self.name} says woof")
```

Gọi qua object:

```python
dog1 = Dog("Buddy", 3)
dog2 = Dog("Lucy", 4)

dog1.bark()   # Buddy says woof
dog2.bark()   # Lucy says woof
```

Cùng một method, nhưng kết quả khác nhau vì `self` trỏ tới object khác nhau. Đây chính là sức mạnh của blueprint: mỗi object dùng chung attributes và methods nhưng với dữ liệu riêng.

---

### 🏦 Ví dụ trọn vẹn: tài khoản ngân hàng

Ghép mọi thứ lại thành một class có nghiệp vụ thật:

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"{amount} is deposited. New balance is {self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds")
        else:
            self.balance -= amount
            print(f"{amount} is withdrawn. New balance is {self.balance}")

    def get_balance(self):
        return self.balance
```

Chạy thử:

```python
account = BankAccount("Krish", 5000)

print(account.balance)   # 5000
account.deposit(100)     # 100 is deposited. New balance is 5100
account.withdraw(300)    # 300 is withdrawn. New balance is 4800
print(account.get_balance())   # 4800
```

`withdraw` kiểm tra `amount > self.balance` trước khi trừ tiền — đây là ví dụ nhỏ cho việc đóng gói logic nghiệp vụ vào bên trong class. Tham số `balance=0` có giá trị mặc định, khớp với ý tưởng tài khoản mới mở có số dư bằng 0.

---

### 💡 Vài lưu ý thực hành

* Đặt tên class bằng chữ cái đầu viết hoa (`BankAccount`, `Dog`) — quy ước phổ biến.
* `dir(object)` liệt kê toàn bộ attribute và method của object, hữu ích khi muốn xem class có gì.
* `self` chỉ dùng được **bên trong** class; ngoài class muốn truy cập thì gọi qua object (`dog1.name`).
* Chú ý **indentation** — mọi method phải thụt lề trong thân class.

---

Từ đây mọi thứ trong Python đều có thể nhìn qua lăng kính object. Bài tiếp theo mình đi vào **inheritance** — cách để class con kế thừa và mở rộng class cha.
