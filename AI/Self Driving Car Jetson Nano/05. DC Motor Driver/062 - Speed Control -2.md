---
title: 'Khởi tạo I2C và đối tượng PCA9685'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 062
status: edited
source: '062 - Speed Control -2.md'
categories:
- AI
tags: []
---

# 🔗 Khởi tạo I2C và đối tượng PCA9685

> Nguồn: `062 - Speed Control -2.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39853006)

Chào các bạn, sau khi đã import thư viện, bài này mình sẽ khai báo các đường tín hiệu và địa chỉ cần thiết: tạo đối tượng I2C, tạo đối tượng PCA9685 và đặt tần số hoạt động.

### 🧱 Tạo đối tượng I2C

Mình dùng một lớp (class) trong module **busio** là **I2C**. Khóa học không đi sâu vào lập trình hướng đối tượng, nên các bạn chỉ cần hiểu đơn giản: muốn điều khiển các chân của mạch và gửi tín hiệu thì phải gọi lớp giao tiếp này.

Tạo một biến, ví dụ **i2c**, rồi gọi **`busio.I2C`**. Hàm nhận **hai tham số**: đường **SCL** và đường **SDA**. Vì đã import trực tiếp từ module **board** nên mình chỉ cần ghi tên:

```python
i2c = busio.I2C(SCL, SDA)
```

### 📮 Tạo đối tượng PCA9685 và địa chỉ

Tiếp theo mình tạo biến, ví dụ **pca**, và gọi lớp **PCA9685** — trùng tên với chính mạch điện tử. Lớp này nhận **hai tham số**:

1. **Đường I2C** dùng để giao tiếp giữa mạch và Jetson Nano — chính là biến **i2c** ở trên.
2. **Địa chỉ (address)** của module.

Về địa chỉ, các bạn có thể hình dung như số điện thoại: nếu I2C là SIM thì address là số cần gọi.

* Module PCA9685 **không phải hàng original** có địa chỉ **`0x40`**.
* Hàng **original** có địa chỉ **`0x60`**.

Phải khai báo đúng một trong hai địa chỉ này, nếu không module sẽ không hoạt động. Trong bài, mình dùng module không phải hàng original nên đặt **`0x40`**:

```python
pca = PCA9685(i2c, address=0x40)
```

### 🎚️ Đặt tần số hoạt động

Vì các module hoạt động bằng tín hiệu, mình cần chỉnh cả **tần số**. Trong bài đặt **100** là đủ dùng:

```python
pca.frequency = 100
```

---

Vậy là mình đã có đối tượng I2C, đối tượng PCA9685 với địa chỉ `0x40`, và tần số `100`. Bài sau mình sẽ khai báo các chân PWM tương ứng với từng động cơ.
