---
title: 'Thực hành hàm: greet, cộng hai số và hàm đếm phần tử bằng for'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 038
status: edited
source: '038 - Exercise -8.md'
categories:
- AI
tags: []
---

# 🛠️ Thực hành hàm: greet, cộng hai số và hàm đếm phần tử bằng for

> Nguồn: `038 - Exercise -8.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39597204)

Chào các bạn, bài này mình làm ba ví dụ về **hàm**. Mình kết nối Jetson Nano, mở VS Code, chọn thư mục **Python basics** và tạo file `function1.py`.

### 👋 Hàm greetings có tham số

```python
def greetings(name):
    print("Hello", name)
```

Chạy file ngay lúc này sẽ **không có output**, vì mình mới định nghĩa hàm chứ chưa gọi. Cần gọi hàm và truyền đối số:

```python
greetings("Yilmaz")
```

Kết quả: `Hello Yilmaz`.

---

### ➕ Hàm cộng hai số

```python
def addition(x, y):
    return x + y

add = addition(10, 50)
```

Hai tham số được ngăn cách bằng dấu phẩy. Chạy file vẫn chưa thấy gì, vì `return` chỉ trả giá trị cho biến `add` chứ không in ra terminal. Muốn thấy kết quả, phải in:

```python
print(add)
```

Lúc này terminal hiện `60`.

---

### 📏 Hàm đếm số phần tử của list

Ý tưởng: dùng `for` duyệt qua list, mỗi vòng tăng biến đếm lên một, từ đó biết tổng số phần tử.

```python
mixed = [12.5, True, False, 11, 50]

def length_of_array(array):
    counter = 0
    for x in array:
        counter += 1
    print("total size of array:", counter)
```

Gọi hàm với list:

```python
length_of_array(mixed)
```

Hàm này cũng dùng được với string hoặc tuple:

```python
name = "Yilmaz"
length_of_array(name)
```

Thêm vài ký tự vào chuỗi, số phần tử sẽ tăng tương ứng — ví dụ thêm `s d f` thì kết quả là `9`.

> ⚠️ Cần kiểm chứng: transcript liệt kê list `mixed` gồm `12.5`, `True`, `False`, `11`, `50` nhưng giảng viên nói list có 6 phần tử; transcript gốc không nêu rõ phần tử còn lại.

---

Ba ví dụ đã cho mình thấy rõ khác biệt giữa in trong hàm và `return` rồi in ở ngoài. Bài sau là coding exercise tổng hợp vòng lặp và hàm.
