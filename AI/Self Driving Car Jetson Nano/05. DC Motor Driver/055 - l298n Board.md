---
title: 'Module L298N: điều khiển chiều quay động cơ DC'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 055
status: edited
source: '055 - l298n Board.md'
categories:
- AI
tags: []
---

# 🔌 Module L298N — điều khiển chiều quay động cơ DC

> Nguồn: `055 - l298n Board.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39674670)

Chào các bạn, bài này mình sẽ xem kỹ module **L298N** — mạch driver động cơ DC mà xe tự lái sẽ dùng. Mình sẽ đi qua công dụng, nguồn cấp, và ý nghĩa từng chân để các bạn nắm trước khi đấu dây.

### ⚙️ L298N làm được gì

* Module này cho phép động cơ DC quay **trái hoặc phải** trong điều kiện bình thường.
* Module cũng có thể điều khiển tốc độ động cơ DC bằng **PWM**, nhưng các chân **GPIO** trên Jetson Nano không thật sự phù hợp cho việc này.
* Vì vậy với mạch driver này, mình **chỉ chỉnh hướng và trạng thái hoạt động** của động cơ.

---

### 🔋 Cấp nguồn ngoài cho driver

Driver cần được **cấp nguồn ngoài**, dùng pin từ **6V trở lên**. Trên board có một cụm **triple header** (ba chân) gồm:

* Chân **12V** — đường dương.
* Chân **GND** — đường mass.
* Chân **5V**.

Cách đấu pin:

1. Nối dây **dương** của pin vào chân **12V**.
2. Nối dây **âm** của pin vào chân **GND** của L298N.

Đây là đường nguồn bắt buộc để driver hoạt động.

---

### 🧷 Các chân điều khiển phía bên phải

Trên board có một dãy chân song song nhau:

* **ENA** và **ENB**: dùng để **điều khiển tốc độ**.
* **IN1, IN2, IN3, IN4**: dùng để **điều khiển chiều quay** của động cơ.

Khi làm việc với module **PCA9685**, mình sẽ nối chính các chân này sang module đó.

---

### 🔁 Các chân ra động cơ

* Động cơ DC được nối vào các cặp **OUT1/OUT2** và **OUT3/OUT4**.
* Cáp động cơ DC phải đấu đúng vào hai chân của từng cặp thì mới điều khiển được chiều quay.

---

### 🚗 Cách bố trí cho xe tự lái

Trong dự án xe tự lái, mình sẽ đấu:

* **Động cơ bên phải** vào **OUT3** và **OUT4**.
* **Động cơ bên trái** vào **OUT1** và **OUT2**.

Bố trí này giúp phần điều khiển lái của xe mạnh hơn, vì việc đánh lái sẽ được thực hiện bằng **tốc độ quay của các động cơ**.

---

Vậy là các bạn đã nắm được công dụng, cách cấp nguồn và ý nghĩa các chân của L298N. Bài sau mình sẽ tìm hiểu module **PCA9685**, nơi đảm nhận việc điều khiển tốc độ.
