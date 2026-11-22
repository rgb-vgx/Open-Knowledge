---
title: 'Khởi tạo I2C, PCA9685 và hai động cơ DC'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 085
status: edited
source: '085 - Definition of I2C and Motors.md'
categories:
- AI
tags: []
---

# 🔌 Khởi tạo I2C, PCA9685 và hai động cơ DC

> Nguồn: `085 - Definition of I2C and Motors.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/44091860)

Chào các bạn, bài này mình sẽ giải thích các cấu trúc vừa định nghĩa: giao thức **I2C**, driver **PCA9685** và hai **động cơ DC**. Đây là phần "phần cứng" của dự án — làm đúng thì xe mới quay bánh đúng chiều.

### 🔗 Khởi tạo giao thức I2C

Mình khởi tạo I2C với dòng lệnh gán class **`busio.I2C`** cho biến **i2c**.

* I2C dùng để **trao đổi dữ liệu giữa nhiều thiết bị**.
* Nó hoạt động qua hai đường: **SCL** (clock signal) và **SDA** (data signal).
* Hai đường này được nối tới các chân cụ thể trên board **Jetson Nano**.

```python
i2c = busio.I2C(board.SCL, board.SDA)
```

### 🎛️ Tạo driver PWM PCA9685

Tiếp theo mình tạo và khởi tạo driver PWM **PCA9685**, gán class `PCA9685` cho biến **pca**.

* Đây là bộ điều khiển **PWM** dùng để điều khiển nhiều thiết bị.
* Nó thường dùng **địa chỉ I2C `0x40`** — module của mình cũng vậy.
* Địa chỉ I2C giúp **định danh duy nhất** từng thiết bị khi có nhiều thiết bị trên cùng một đường I2C; vì thế mình phải khai báo địa chỉ cho PCA9685.

```python
pca = PCA9685(i2c, address=0x40)
```

### ⏱️ Đặt tần số PWM

Mình đặt **`pca.frequency`** bằng **100**.

* Tần số này quyết định **tần số tín hiệu PWM**.
* Nó ảnh hưởng trực tiếp tới **tốc độ hoạt động của động cơ**.

```python
pca.frequency = 100
```

### 💯 Đặt duty cycle 100%

Mình đặt duty cycle của kênh **0** trên PCA9685 thành **100%** bằng giá trị **`0xFFFF`**.

* **Duty cycle** là tỉ lệ thời gian tín hiệu ở trạng thái bật so với tổng thời gian tín hiệu.
* Giá trị **`0xFFFF`** nghĩa là tín hiệu **bật liên tục**.

```python
pca.channels[0].duty_cycle = 0xFFFF
```

### 🚗 Tạo hai đối tượng động cơ

Cuối cùng mình tạo hai đối tượng động cơ, **motor1** và **motor2**.

* Hai động cơ được điều khiển qua các **kênh** tương ứng của PCA9685.
* **Motor1** dùng **kênh 1 và 2**.
* **Motor2** dùng **kênh 4 và 5**.
* Các đối tượng này dùng để điều khiển **tốc độ và chiều quay** của động cơ.

```python
motor1 = motor.DCMotor(pca.channels[1], pca.channels[2])
motor2 = motor.DCMotor(pca.channels[4], pca.channels[5])
```

Tóm lại, đoạn code này khởi tạo driver PWM PCA9685 qua I2C, đặt tần số, gán duty cycle 100% cho kênh 0 và tạo hai động cơ — từ đó mình điều khiển được tốc độ và chiều quay của xe.

---

Vậy là các bạn đã nắm cấu trúc I2C và cách khởi tạo động cơ. Bài sau mình sẽ chỉnh các thuộc tính **webcam** và viết lại hàm **ROI** cho dự án thực tế.
