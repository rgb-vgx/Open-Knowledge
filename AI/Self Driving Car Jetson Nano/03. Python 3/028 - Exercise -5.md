---
title: 'Thực hành input và hàm type(): kiểm tra kiểu dữ liệu nhập vào'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 028
status: edited
source: '028 - Exercise -5.md'
categories:
- AI
tags: []
---

# ⌨️ Thực hành input và hàm type(): kiểm tra kiểu dữ liệu nhập vào

> Nguồn: `028 - Exercise -5.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39560194)

Chào các bạn, bài này mình thực hành hàm **input** và học thêm hàm `type()` để kiểm tra kiểu dữ liệu. Mình kết nối Jetson Nano, mở VS Code, chọn thư mục **Python basics** và tạo file `input_func.py`.

### ⌨️ Nhập dữ liệu không có thông điệp

Tạo biến và gọi `input()` không truyền gì:

```python
name = input()
```

Khi chạy, chương trình sẽ chờ dữ liệu gõ từ bàn phím. Nhập `Yilmaz` rồi Enter — biến `name` nhận giá trị `Yilmaz`. Muốn xác nhận, in lại:

```python
print(name)
```

### 💬 Thêm thông điệp hướng dẫn

Có thể đặt câu nhắc trong dấu nháy kép bên trong `input()`:

```python
name2 = input("Please enter your name: ")
```

Lưu ý: phần thông điệp này **không** được gán vào biến, nó chỉ hiển thị cho người dùng.

### 🔍 Kiểm tra kiểu bằng type()

Mọi giá trị nhập qua `input()` đều được chuyển thành **string**. Để kiểm chứng, mình dùng `type()`:

```python
print(type(name))
print(type(name2))
print(type(10))
```

Kết quả: hai biến đầu đều có kiểu `str`, còn `10` là `int`.

Cách gọi là `type(<biến hoặc dữ liệu>)` — truyền vào biến hoặc giá trị cần kiểm tra.

---

Mình đã biết cách nhận dữ liệu và xác định kiểu của nó. Vì `input()` luôn trả về string, bài sau mình học chuyển đổi kiểu dữ liệu.
