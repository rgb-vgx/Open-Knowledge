---
title: 'Thực hành vòng lặp: lọc số chẵn, cộng tổng lẻ chẵn và counter while'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 035
status: edited
source: '035 - Exercise -7.md'
categories:
- AI
tags: []
---

# 🧮 Thực hành vòng lặp: lọc số chẵn, cộng tổng lẻ chẵn và counter while

> Nguồn: `035 - Exercise -7.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39581058)

Chào các bạn, bài này mình thực hành vòng lặp. Mình kết nối board NVIDIA, mở VS Code, chọn thư mục **Python Basics** rồi tạo file `loops_exercise.py`.

### 📋 Duyệt list và lọc số chẵn

Tạo list mười phần tử từ 1 đến 10:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Dùng `for` để duyệt, kèm `if` kiểm tra phần tử chia hết cho 2:

```python
for element in numbers:
    if element % 2 == 0:
        print(element)
```

Kết quả: `2, 4, 6, 8, 10` — các số chia hết cho 2 không dư.

### ➕ Cộng riêng tổng chẵn và tổng lẻ

Ý tưởng: cộng các số lẻ với nhau, các số chẵn với nhau. Trước hết tạo hai biến **bên ngoài** vòng lặp, gán bằng `0`:

```python
odd = 0
even = 0

for element in numbers:
    if element % 2 == 0:
        even += element
    else:
        odd += element

print("addition of even numbers:", even)
print("addition of odd numbers:", odd)
```

Biến phải khai báo ngoài vòng lặp thì mới giữ được giá trị tích lũy qua các lần lặp.

### ♾️ Counter bằng while và cách thoát vòng lặp vô hạn

Tạo file mới `loops_exercise2.py`:

```python
counter = 0

while counter < 10:
    print(counter)
```

Đoạn này lặp vô hạn vì `counter` không đổi, điều kiện luôn đúng. Khi chạy thử, các bạn sẽ thấy terminal in mãi — bấm nút **kill terminal** ở bên phải để dừng.

Để đếm từ 0 đến 10 (không gồm 10), tăng `counter` mỗi vòng:

```python
counter = 0

while counter < 10:
    print(counter)
    counter += 1
```

Chạy lại, kết quả đúng như mong đợi.

---

Vậy là mình đã ghép `for`, `if` và `while` vào các bài toán thực tế. Bài sau mình học hàm.
