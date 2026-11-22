---
title: 'Module PCA9685: điều khiển PWM qua I2C'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 056
status: edited
source: '056 - PCA9685 Board.md'
categories:
- AI
tags: []
---

# 🎛️ Module PCA9685 — điều khiển PWM qua I2C

> Nguồn: `056 - PCA9685 Board.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39693306)

Chào các bạn, nếu bài trước là L298N lo phần chiều quay thì bài này mình sẽ xem module **PCA9685** — mạch đảm nhận việc điều khiển tốc độ động cơ DC cho xe. Các bạn để ý cách nó giao tiếp để thấy vì sao mình chọn module này.

### 🧠 PCA9685 là gì

* Về mặc định, mạch driver này được tạo ra để điều khiển **servo** và **stepper motor**.
* Tuy nhiên mình vẫn có thể điều khiển **động cơ DC** khi dùng kết hợp cả **L298N** và **PCA9685**.
* Các module này giao tiếp bằng chuẩn **I2C**, nên chỉ cần rất ít dây nối với Jetson Nano là điều khiển được.

Khi dựng sơ đồ mạch, mình sẽ nối Jetson Nano với PCA9685 để từ dữ liệu nhận được, xe vừa bám được làn vừa chỉnh được tốc độ động cơ DC.

### 🔌 Bốn chân giao tiếp bên trái

Trên module có **6 khe chân** ở phía bên trái, nhưng mình chỉ cần dùng **4 chân**: **GND, SCL, SDA, VCC**.

* **GND** và **VCC**: cấp nguồn cho module.
* **SCL** và **SDA**: truyền dữ liệu với board Jetson Nano.

Nếu module không hỗ trợ I2C thì sẽ phải đấu rất nhiều dây; nhờ I2C mà mình tránh được chuyện đó.

### ⚡ Mười sáu chân PWM ở phía dưới

Phía dưới module có **16 đường chân**, đánh số từ **0 đến 15**. Đây chính là các đường dùng để **điều khiển tốc độ** động cơ DC.

Cách nối với L298N: đưa các chân **ENA, ENB, IN1, IN2, IN3, IN4** của L298N sang các chân tương ứng trên PCA9685 theo thứ tự. Khi đấu đúng như vậy, mình điều khiển được tốc độ động cơ.

### 🐍 Chuẩn bị cho bài sau

Để dùng module này, mình cần học thêm một **thư viện Python** mới. Khi đã nắm được thông tin về mạch driver, các bạn sẵn sàng sang bài tiếp theo để cài và dùng thư viện đó.

---

Vậy là mình đã hiểu PCA9685: giao tiếp I2C qua 4 chân GND, SCL, SDA, VCC, và 16 kênh PWM ở dưới để điều tốc. Bài sau mình sẽ đi vào thư viện Python tương ứng.
