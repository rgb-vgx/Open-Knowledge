---
title: 'Thực hành module math và time: sqrt, pow, factorial, sleep, dir và help'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 042
status: edited
source: '042 - Exercise -9.md'
categories:
- AI
tags: []
---

# 🧪 Thực hành module math và time: sqrt, pow, factorial, sleep, dir và help

> Nguồn: `042 - Exercise -9.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39604890)

Chào các bạn, bài này mình dùng hai module: **math** để tính factorial, lũy thừa, căn bậc hai; và **time** để thêm thời gian chờ vào chương trình. Mình kết nối Jetson Nano, mở VS Code và chọn thư mục project.

### 🔍 Hai hàm khám phá module: dir() và help()

Trước khi dùng, có hai hàm rất hữu ích:

* `dir(module)` — trả về danh sách tên tất cả cấu trúc trong module.
* `help(module)` — giải thích các cấu trúc đó làm gì.

Tạo file `dir_help.py`:

```python
import math

print(dir(math))
```

Chạy file, các bạn sẽ thấy toàn bộ thành phần của `math`. Với `time`:

```python
import time

print(help(time))
```

Terminal hiện mô tả của module; bấm phím **space** để xem tiếp.

### √ Căn bậc hai với math.sqrt

```python
import math

square_value = math.sqrt(25)
square_value2 = math.sqrt(49)

print("square root of 25:", square_value)
print("square root of 49:", square_value2)
```

`math.sqrt()` nhận một giá trị và trả về căn bậc hai.

### 🔢 Factorial, lũy thừa và sleep

Tạo file `modules1.py`:

```python
import math
import time as t

fact = math.factorial(5)
exp = math.pow(2, 3)
sqr = math.sqrt(25)

print("factorial of 5:", fact)
print("2 to the power of 3:", exp)
print("square root of 25:", sqr)
```

* `math.factorial(5)` cho `120`.
* `math.pow(base, power)` nhận hai tham số: cơ số và số mũ — ở đây `2` mũ `3`.
* `math.sqrt(25)` cho `5.0`.

Giờ thêm độ trễ giữa các lần in bằng `time.sleep()`:

```python
t.sleep(1)
t.sleep(3)
```

`t.sleep(seconds)` tạm dừng thực thi đúng số giây truyền vào — `1` giây và `3` giây trong ví dụ. Chạy lại, các bạn sẽ thấy chương trình dừng giữa các dòng in.

---

Hai module này sẽ còn dùng nhiều: `time` cho nhịp xử lý, `math` cho tính toán. Bài sau mình tự viết module riêng.
