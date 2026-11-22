---
title: 'Cài đặt và import thư viện điều khiển tốc độ động cơ'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 061
status: edited
source: '061 - Speed Control -1.md'
categories:
- AI
tags: []
---

# 📦 Cài đặt thư viện điều khiển tốc độ động cơ DC

> Nguồn: `061 - Speed Control -1.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39759064)

Chào các bạn, bài này mình bắt đầu phần điều khiển tốc độ các động cơ DC nối với Jetson Nano. Trước khi viết logic, mình cần cài và import đúng các thư viện — đây là bước hay gây lỗi nhất nên các bạn làm chậm và kiểm tra kỹ.

### 🧩 Hai nhóm module cần dùng

Vì **PCA9685** là module hỗ trợ **I2C**, mình phải khai báo đường I2C. Trên Jetson có hai module phục vụ việc này:

* **busio** — khai báo I2C.
* **board** — khai báo hai chân **SDA** và **SCL** cần cho I2C.

Ngoài ra cần thêm module để điều khiển động cơ DC, tức là **PCA9685** và **motor**.

---

### 📁 Tạo file Python

1. Mở **VS Code**, vào project folder.
2. Tạo file Python mới, đặt tên ví dụ **dc_motor_speed.py**.

---

### ⬇️ Cài thư viện PCA9685

Thư viện Adafruit dùng cho PCA9685 **không có sẵn** theo mặc định. Mình mở **Terminal** mới trong VS Code và chạy:

```bash
sudo pip3 install adafruit-circuitpython-pca9685
```

Khi được hỏi mật khẩu thì nhập mật khẩu của các bạn. Quá trình cài có thể mất một lúc, các bạn cứ chờ đến khi terminal báo đã cài xong.

Transcript cũng lưu ý thư viện điều khiển động cơ chưa có sẵn theo mặc định, nhưng video chỉ minh hoạ lệnh cài cho PCA9685. Nếu máy chưa có module **`adafruit_motor`** dùng ở bước import bên dưới, các bạn cài thêm gói tương ứng trước khi chạy.

---

### 🐍 Import các module

Sau khi cài, mình import lần lượt:

```python
import time
import busio
import board
from board import SCL, SDA
from adafruit_pca9685 import PCA9685
from adafruit_motor import motor
```

Giải thích nhanh:

* **`time`** — cần để tạo khoảng chờ khi điều khiển tốc độ.
* **`busio`** — import đường I2C của board Jetson Nano.
* **`board`, `SCL`, `SDA`** — lấy đúng hai chân I2C của Jetson Nano.
* **`PCA9685`** — class nằm trong module **`adafruit_pca9685`**, dùng để nói chuyện với mạch PCA9685.
* **`motor`** — lấy từ module **`adafruit_motor`**; module này hỗ trợ nhiều loại động cơ như **servo**, **step**, và ở đây mình dùng **DC**.

---

Vậy là môi trường đã sẵn sàng với đầy đủ thư viện cho I2C và động cơ. Bài sau mình sẽ dùng các module này để khai báo kết nối và bắt đầu điều khiển.
