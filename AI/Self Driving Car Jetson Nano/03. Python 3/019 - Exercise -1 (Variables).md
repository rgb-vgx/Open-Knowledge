---
title: 'Thực hành biến trong Python: từng quy tắc qua lỗi thật'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 019
status: edited
source: '019 - Exercise -1 (Variables).md'
categories:
- AI
tags: []
---

# 🔧 Thực hành biến trong Python: từng quy tắc qua lỗi thật

> Nguồn: `019 - Exercise -1 (Variables).md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39517468)

Chào các bạn, bài này mình làm bài tập về **biến** để hiểu rõ hơn lý thuyết vừa học. Các bài exercise trong khóa được tạo ra để các bạn luyện code, nên các bạn hãy làm theo ví dụ và tự tạo thêm mẫu của riêng mình.

### 🖥️ Mở đúng môi trường làm việc

1. Nhập mật khẩu để vào hệ điều hành (trong bài là **1234**).
2. Mở ô tìm kiếm, gõ **VS code** và mở **Visual Studio Code**.
3. Vào **File**, chọn **Open Folder**.
4. Tạo thư mục mới bằng nút **Create Folder** ở góc trên phải; đặt tên ví dụ `Python_project_basics`.
5. Bấm **Create**, rồi bấm **Open** ở góc dưới phải.
6. Khi VS Code hỏi, chọn **"Yes, I trust the authors"**.

---

### 📄 Tạo file Python

1. Trong thư mục project, bấm nút **New File** ở bên phải.
2. Đặt tên file là `var` và thêm phần mở rộng `.py` — tức `var.py` — rồi Enter.

---

### 🔍 Chạy thử và kiểm tra lỗi

Để chạy file, mở menu chạy ở thanh bên và chọn **Run Python File in Terminal**.

Giờ mình đi từng quy tắc, cố tình vi phạm để xem Python báo lỗi thế nào.

**Quy tắc 1 — Không bắt đầu bằng chữ số.** Nếu tạo biến như `12name` rồi chạy, các bạn sẽ nhận **syntax error**. Lý do: khi bắt đầu bằng số, Python hiểu đó là một con số bình thường.

**Quy tắc 2 — Có thể bắt đầu bằng ký tự hoặc dấu gạch dưới, sau đó có thể có số.** Các dạng sau đều hợp lệ:

```python
name1 = "Yilmaz"
_name2 = "example"
x = 1
y = 2
animal = "cat"
```

**Quy tắc 3 — Không thể tạo biến mà không gán giá trị.** Chạy một dòng chỉ có tên biến sẽ báo lỗi; sau khi tạo biến, phải dùng dấu bằng để định nghĩa giá trị. Ví dụ gán tên của mình:

```python
name1 = "Yilmaz"
```

**Quy tắc 5 — Dữ liệu chuỗi phải đặt trong dấu ngoặc kép.** Muốn gán tên, các bạn phải đặt nó trong cặp nháy kép.

**Gán số nguyên và số thực.** Số nguyên thì gán trực tiếp, không cần nháy:

```python
x1 = 0
age = 7.5
```

Cả hai đều chạy không lỗi.

**Quy tắc 6 — Không dùng từ khóa của Python làm tên biến.** Ví dụ `for` là một cấu trúc trong Python; nếu đặt:

```python
for = 12
```

chương trình sẽ báo lỗi vì `for` đã có nhiệm vụ riêng trong ngôn ngữ.

**Quy tắc 7 — Tên nhiều từ không được có khoảng trắng.** Viết `name surname = "Yilmaz Alija"` sẽ lỗi; phải nối bằng dấu gạch dưới:

```python
name_surname = "Yilmaz Alija"
```

**Quy tắc 8 — Tên biến chỉ dùng ký tự tiếng Anh.** Dùng ký tự đặc biệt của ngôn ngữ khác (ví dụ chữ cái riêng trong tiếng Thổ Nhĩ Kỳ) có thể gây lỗi khi chạy code.

---

Vậy là mình đã đi hết các quy tắc đặt tên biến bằng cách thử sai có kiểm soát. Bài sau mình sẽ học kỹ hơn về các toán tử.

> ⚠️ Cần kiểm chứng: Python 3 (PEP 3131) thực tế **cho phép chữ cái Unicode** trong tên biến, miễn ký tự đầu hợp lệ; quy tắc "chỉ dùng ký tự tiếng Anh" là khuyến nghị của giảng viên để tránh nhầm lẫn, không phải giới hạn của ngôn ngữ.
