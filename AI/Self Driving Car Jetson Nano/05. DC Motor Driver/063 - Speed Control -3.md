---
title: 'Khai báo kênh PWM và đối tượng động cơ DC'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 063
status: edited
source: '063 - Speed Control -3.md'
categories:
- AI
tags: []
---

# ⚡ Khai báo kênh PWM và đối tượng động cơ DC

> Nguồn: `063 - Speed Control -3.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39855594)

Chào các bạn, bài này mình sẽ chỉnh các đường của PCA9685 để điều khiển động cơ DC bằng PWM. Cụ thể là đặt duty cycle cho 6 kênh và tạo đối tượng cho từng động cơ.

### 🧾 Vì sao phải đặt duty cycle cho 6 kênh

Các đường này nằm trong một danh sách gọi là **channels**. Như đã đấu ở sơ đồ, L298N nối với các chân **0 đến 5**, nên mình phải khai báo **duty cycle cho kênh 0–5** thì mới thực hiện được phép PWM.

Vì việc xử lý tín hiệu diễn ra trên chính mạch PCA9685, mình dùng biến **pca** để truy cập từng kênh và gán giá trị **`0xFFFF`** — có thể hiểu đây là bước "chuẩn bị" cho các chân.

```python
pca.channels[0].duty_cycle = 0xFFFF
pca.channels[1].duty_cycle = 0xFFFF
pca.channels[2].duty_cycle = 0xFFFF
pca.channels[3].duty_cycle = 0xFFFF
pca.channels[4].duty_cycle = 0xFFFF
pca.channels[5].duty_cycle = 0xFFFF
```

Lần lượt: kênh 0 là **ENA**, kênh 3 là **ENB**; các kênh 1, 2, 4, 5 tương ứng **IN1–IN4**.

### 🚗 Tạo đối tượng động cơ bằng lớp `DCMotor`

Để điều khiển các động cơ nối vào **OUT1/OUT2** và **OUT3/OUT4**, mình dùng lớp **DCMotor** trong module **motor**. Lớp này nhận **hai tham số**, là các giá trị bắt đầu bằng **IN** (IN1, IN2, IN3, IN4). Theo sơ đồ:

* **IN1, IN2** tương ứng **OUT1, OUT2** — cặp động cơ bên trái.
* **IN3, IN4** tương ứng **OUT3, OUT4** — cặp động cơ bên phải.

Với hai động cơ đấu vào OUT1/OUT2, mình đã khai báo kênh **1** và **2**, nên tạo biến **motor1** như sau:

```python
motor1 = motor.DCMotor(pca.channels[1], pca.channels[2])
```

Tương tự, hai động cơ ở OUT3/OUT4 dùng kênh **4** và **5**, mình tạo biến **motor2**:

```python
motor2 = motor.DCMotor(pca.channels[4], pca.channels[5])
```

---

Vậy là các khai báo đã đầy đủ: 6 kênh PWM đã có duty cycle, và hai đối tượng `motor1`, `motor2` đã sẵn sàng. Bài sau mình sẽ dùng chúng để điều khiển tốc độ động cơ.
