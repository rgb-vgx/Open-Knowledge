---
title: 'Bài 008 — Kiểu dữ liệu cơ bản trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 8
status: edited
source: '008 - Basic Datatypes In Python.md'
categories:
- AI
tags: []

---

# 🧱 Kiểu dữ liệu cơ bản trong Python

> Nguồn: `008 - Basic Datatypes In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084907)

Chào các bạn! Bài trước chúng ta đã nói về biến, bài này mình đi tiếp vào **kiểu dữ liệu**. Mục tiêu khá rõ: hiểu data type là gì, vì sao nó quan trọng, rồi thực hành ngay bốn kiểu nền tảng — **integer**, **float**, **string** và **boolean** — trong Jupyter notebook. Các kiểu nâng cao như list, tuple, set, dict sẽ để dành cho những bài sau.

### 🧠 Data type là gì và vì sao quan trọng?

**Data type** là cách phân loại dữ liệu, cho compiler hoặc interpreter biết lập trình viên định dùng dữ liệu đó theo cách nào. Cụ thể, kiểu dữ liệu quyết định ba thứ:

* Những **phép toán** có thể thực hiện trên dữ liệu.
* Những **giá trị** mà dữ liệu có thể nhận.
* Lượng **bộ nhớ** cần để lưu dữ liệu.

Các kiểu khác nhau chiếm lượng bộ nhớ khác nhau — giảng viên ví dụ integer và float là hai kiểu lưu trữ với số bit khác nhau. Hiểu đúng kiểu dữ liệu giúp chương trình:

1. Lưu dữ liệu một cách **hiệu quả**.
2. Thực hiện **đúng phép toán** trên dữ liệu.
3. **Hạn chế lỗi và bug**.
4. Quản lý bộ nhớ tốt hơn.

Đó là lý do vì sao phần này đáng dành thời gian, dù các bạn đã từng gặp `int` hay `float` ở đâu đó rồi.

---

### 🔢 Bốn kiểu dữ liệu nền tảng

| Kiểu | Ví dụ | Ý nghĩa |
|---|---|---|
| **int** (integer) | `age = 35` | Số nguyên |
| **float** | `height = 5.11` | Số thực, có phần thập phân |
| **str** (string) | `name = "Krish"` | Chuỗi ký tự |
| **bool** (boolean) | `True`, `False` | Chỉ có hai giá trị đúng/sai |

Để biết một giá trị thuộc kiểu nào, các bạn dùng hàm `type()`. Đây là công cụ mình dùng suốt trong buổi demo.

---

### 🧪 Thực hành: khai báo và kiểm tra kiểu

Trước khi chạy bất kỳ notebook nào, nhớ **chọn kernel** trỏ đúng virtual environment đã tạo — giảng viên nhắc lại điều này mỗi bài.

Với **integer**, mình tạo biến `age = 35`, rồi gọi `type(age)` và nhận về `int`. Với **float**, mình dùng `height = 5.11`; `print(height)` cho ra `5.11`, còn `type(height)` báo `float`. Với **string**, `name = "Krish"`; in ra thì thấy `Krish`, kiểm tra kiểu thì thấy `str`.

Riêng **boolean** có vài cách thể hiện:

* Gán thẳng `True` hoặc `False`, rồi `type()` sẽ trả về `bool`.
* Đặt tên gợi nhớ như `is_true = True`, sau đó `type(is_true)` cũng là `bool`.
* Gọi `bool()` không truyền tham số — mặc định kết quả là `False`.

Điểm thú vị: kết quả của một phép so sánh cũng là boolean. Ví dụ `a = 10`, `b = 10`, rồi `a == b` cho `True`; kiểm tra `type(a == b)` sẽ thấy `bool`. Nghĩa là boolean không chỉ đến từ chữ `True`/`False` mà còn sinh ra từ các biểu thức logic.

---

### ⚠️ Lỗi quen thuộc: cộng chuỗi với số

Giảng viên cố tình tạo lỗi để các bạn thấy tận mắt. Đặt `result = "hello"`, sau đó thử `result + 5`. Python báo lỗi kiểu:

```text
can only concatenate str (not "int") to str
```

Lý do rất trực quan: bên trái là **string**, bên phải là **integer**, nên không thể cộng như phép toán số học. Cách sửa là **type casting** — bọc số bằng `str(5)`, rồi `result + str(5)` sẽ cho `hello5`.

Đây chính là sức mạnh của chuyển đổi kiểu: cùng một giá trị, nhưng đổi cách Python hiểu nó là xử lý được. Những lỗi tương tự sẽ còn gặp dài dài, nên nhớ kỹ ví dụ nhỏ này.

---

### 🧰 Hé lộ: string có hàng loạt method

Một chi tiết giảng viên cho xem trước: khi gõ `"hello".` trong Jupyter, autocomplete hiện ra rất nhiều method của string, chẳng hạn `isalnum`, `casefold`, `center`, `count`... Danh sách này sẽ được khai thác khi học **advanced data types**.

Còn bây giờ, mình cứ đi chậm và chắc. Giảng viên nói thẳng: nhiều bạn muốn học nhanh, nhưng nắm chắc định nghĩa cùng vài ví dụ nhỏ quan trọng hơn là lướt qua. Càng luyện nhiều, các bạn càng thành thạo.

Hẹn gặp các bạn ở bài tiếp theo: **toán tử trong Python**, nơi chúng ta bắt đầu "làm toán" với các kiểu dữ liệu vừa học.
