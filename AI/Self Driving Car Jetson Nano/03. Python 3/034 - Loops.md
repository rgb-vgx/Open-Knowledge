---
title: 'Vòng lặp for và while trong Python'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 034
status: edited
source: '034 - Loops.md'
categories:
- AI
tags: []
---

# 🔁 Vòng lặp for và while trong Python

> Nguồn: `034 - Loops.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39580072)

Chào các bạn, bài này mình học **vòng lặp**. Python có hai loại: `for` và `while`. Cả hai đều quan trọng vì sau này trên Jetson Nano mình sẽ dùng chúng để mở camera và bám làn đường.

Vòng lặp dùng để thực thi một khối code lặp đi lặp lại khi điều kiện còn thỏa. Chúng giúp tự động hóa các tác vụ lặp và duyệt qua các sequence như list, tuple, string.

### 🔂 Vòng lặp for

Khác với nhiều ngôn ngữ, `for` trong Python có cách chạy riêng: mục đích là **duyệt qua nhiều phần tử dữ liệu** và xử lý từng phần tử.

Cấu trúc gồm: từ khóa `for`, một **biến phần tử**, rồi dữ liệu cần duyệt (list, tuple...), cuối cùng là dấu hai chấm và khối lệnh thụt lề.

```python
numbers = [1, 2, 3]

for x in numbers:
    print(x)
```

Kết quả in ra `1`, `2`, `3` — mỗi phần tử một dòng.

### ♾️ Vòng lặp while

`while` là vòng lặp chính trong chương trình: nó chạy cho tới khi điều kiện sai thì dừng.

Giả sử `a = 5`, và:

```python
a = 5

while a > 0:
    print(a)
```

Đoạn này sẽ tạo **vòng lặp vô hạn** vì điều kiện luôn đúng. Muốn in các giá trị từ `5` xuống `1`, mỗi vòng phải **giảm** `a` đi một:

```python
a = 5

while a > 0:
    print(a)
    a -= 1
```

Kết quả: `5, 4, 3, 2, 1`.

### 💡 Vì sao cần cả hai

Các bạn sẽ gặp lại cả `for` và `while` khi làm việc với camera và lane tracking trên Jetson Nano, nên nắm chắc cả hai ngay từ đây sẽ đỡ vất vả về sau.

---

Vậy là mình đã biết hai kiểu vòng lặp. Bài sau mình thực hành với list và điều kiện lọc.
