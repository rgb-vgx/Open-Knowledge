---
title: 'Coding exercise 4: vòng lặp và hàm trong cùng một file'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 039
status: edited
source: '039 - Coding Exercise 4- Loops and Functions.md'
categories:
- AI
tags: []
---

# 🔄 Coding exercise 4: vòng lặp và hàm trong cùng một file

> Nguồn: `039 - Coding Exercise 4- Loops and Functions.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/6401234)

Chào các bạn, bài coding exercise này gộp **vòng lặp** và **hàm** trong một file `function1.py`. Nội dung trùng với bài exercise trước, nhưng mình gõ lại để quen tay. Mình kết nối Jetson Nano, mở VS Code và chọn thư mục **Python basics**.

### 👋 Hàm chào có tham số

```python
def greetings(name):
    print("Hello", name)
```

Định nghĩa xong chạy file sẽ không có output — phải gọi hàm:

```python
greetings("Yilmaz")
```

Kết quả: `Hello Yilmaz`.

### ➕ Hàm cộng có return

```python
def addition(x, y):
    return x + y

add = addition(10, 50)
print(add)
```

`return` đưa giá trị `60` vào biến `add`, nhưng không tự in. Phải gọi `print(add)` mới thấy kết quả trên terminal.

### 📏 Đếm phần tử bằng for và counter

```python
mixed = [12.5, True, False, 11, 50]

def length_of_array(array):
    counter = 0
    for x in array:
        counter += 1
    print("total size of array:", counter)

length_of_array(mixed)
```

Hàm dùng được cho cả chuỗi:

```python
name = "Yilmaz"
length_of_array(name)
```

Thêm ký tự vào chuỗi, ví dụ `s d f`, số đếm tăng lên `9` — tức mỗi ký tự được tính là một phần tử.

### 💡 Điểm rút ra

* Hàm chỉ chạy khi được gọi.
* `return` khác với in: return trả giá trị, việc hiển thị là của `print`.
* `for` + biến đếm là cách tự viết hàm đo độ dài.

> ⚠️ Cần kiểm chứng: transcript liệt kê list `mixed` gồm `12.5`, `True`, `False`, `11`, `50` nhưng giảng viên nói có 6 phần tử; transcript gốc không nêu rõ phần tử còn lại.

---

Vòng lặp và hàm đã phối hợp được với nhau. Bài sau mình học **module** — bước đệm để dùng OpenCV.
