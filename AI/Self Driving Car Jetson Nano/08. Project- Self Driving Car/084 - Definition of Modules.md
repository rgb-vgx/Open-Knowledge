---
title: 'Các module cần import cho xe tự lái'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 084
status: edited
source: '084 - Definition of Modules.md'
categories:
- AI
tags: []
---

# 📦 Các module cần import cho xe tự lái

> Nguồn: `084 - Definition of Modules.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/43937150)

Chào các bạn, bài này mình sẽ điểm qua các module dùng trong code của dự án — đây là lúc ghép toàn bộ kiến thức đã học lại với nhau. Mình xem từng module và giải thích vì sao cần nó, để các bạn không import một cách máy móc.

### 🐍 `cv2` — xử lý ảnh và thị giác máy tính

* Module **OpenCV**, tên import là **`cv2`**.
* Dùng để thực hiện các phép xử lý ảnh: **contouring**, phát hiện **vạch trắng**, và các thao tác ảnh khác.
* Đây là module chính của toàn bộ phần lane tracking.

```python
import cv2
```

### 🔢 `numpy` — làm việc với mảng và vùng quan tâm

* Module **NumPy**.
* Lý do dùng: mình cần **sở hữu một vùng xác định** trong ảnh.
* Module này đặc biệt hữu ích ở phần **region of interest**.

```python
import numpy as np
```

### 🔌 `busio` — giao tiếp I2C

* Module **busio**.
* Lý do: module điện tử bên ngoài mà mình dùng hoạt động theo giao thức **I2C**.
* Vì vậy cần module này để khai báo các chân I2C cho **PCA9685**.

```python
import busio
```

### 🎛️ `PCA9685` — điều khiển PWM

* Module **Adafruit_PCA9685**, lấy ra **class `PCA9685`**.
* Class này định nghĩa các đường **I2C** và **địa chỉ** cho mạch của mình.
* Nó là bộ điều khiển **PWM** dùng để điều khiển nhiều thiết bị.

```python
from adafruit_pca9685 import PCA9685
```

### ⚙️ `motor` — điều khiển động cơ DC

* Module **Adafruit_Motor**, phần **motor**.
* Trong project có file Python **`motor.py`**.
* Với module này mình định nghĩa các đường của **động cơ DC** và điều khiển **tốc độ**.

```python
from adafruit_motor import motor
```

---

Vậy là các bạn đã biết năm nhóm module của dự án: `cv2`, `numpy`, `busio`, `PCA9685` và `motor`. Bài sau mình sẽ khởi tạo giao thức I2C, driver PWM và hai đối tượng động cơ.
