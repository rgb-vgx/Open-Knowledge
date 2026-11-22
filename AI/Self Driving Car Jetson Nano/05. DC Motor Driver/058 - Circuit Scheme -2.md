---
title: 'Sơ đồ đấu dây động cơ DC — phần 2'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 058
status: edited
source: '058 - Circuit Scheme -2.md'
categories:
- AI
tags: []
---

# 🔗 Sơ đồ đấu dây động cơ DC (phần 2)

> Nguồn: `058 - Circuit Scheme -2.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39759932)

Chào các bạn, tiếp nối phần 1, bài này mình đi vào phần còn lại của sơ đồ: nối tín hiệu từ **L298N** sang **PCA9685**, rồi đưa PCA9685 lên **Jetson Nano**. Đây là các mối nối quyết định việc code điều tốc có chạy đúng hay không.

### 🧷 Nối L298N sang PCA9685

Mình nối các chân tín hiệu của L298N sang các chân số của PCA9685 theo thứ tự sau, để tiện cho việc code:

1. **ENA** → **pin 0**.
2. **IN1** → **pin 1**.
3. **IN2** → **pin 2**.
4. **ENB** (chân enable) → **pin 3**.
5. **IN3** → **pin 4**.
6. **IN4** → **pin 5**.

Đấu đúng thứ tự này thì mình mới điều khiển được tốc độ các động cơ DC.

---

### 🔌 Nối PCA9685 lên Jetson Nano

Để gửi tín hiệu điều tốc, PCA9685 phải nối với Jetson Nano:

1. **GND** của module → **GND** trên Nano.
2. **SCL** → **pin 5** của Jetson Nano.
3. **SDA** → **pin 3** của Jetson Nano (trong sơ đồ dùng **dây màu cam**).
4. **VCC** → đường **3.3V** trên Jetson Nano.

Vì module hỗ trợ **I2C**, mình nối **SDA** và **SCL** vào đúng đường I2C của board. Nếu không, tín hiệu không truyền được và cũng không điều khiển được động cơ.

---

Vậy là mình đã đi hết sơ đồ: L298N nhận lệnh qua 6 chân 0–5 của PCA9685, còn PCA9685 nói chuyện với Jetson Nano qua I2C. Bài sau mình sẽ viết code để điều khiển tốc độ các động cơ DC.
