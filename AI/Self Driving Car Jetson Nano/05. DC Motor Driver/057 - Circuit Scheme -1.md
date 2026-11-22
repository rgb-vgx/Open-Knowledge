---
title: 'Sơ đồ đấu dây động cơ DC — phần 1'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 057
status: edited
source: '057 - Circuit Scheme -1.md'
categories:
- AI
tags: []
---

# 🔋 Sơ đồ đấu dây động cơ DC (phần 1)

> Nguồn: `057 - Circuit Scheme -1.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39759930)

Chào các bạn, bài này mình bắt đầu đi vào sơ đồ mạch động cơ DC cho xe tự lái. Sơ đồ khá phức tạp nên mình chia làm hai video; phần này tập trung vào các kết nối quanh module **L298N**.

### 🔋 Nguồn pin và bốn động cơ

* Trong sơ đồ, mình dùng một **pin 9V**.
* Vì phải điều khiển **bốn động cơ DC** nên cần một nguồn pin đủ mạnh.

### 🚗 Vì sao hai động cơ mỗi bên dùng chung đầu ra

Xe trong dự án **không có vô lăng**, nên mình cho hai động cơ **bên trái** nối vào **cùng một cặp output** của L298N:

* Động cơ thứ nhất và động cơ thứ hai bên trái cùng đấu vào một cổng output.
* Làm tương tự với hai động cơ **bên phải**: động cơ thứ ba và thứ tư dùng chung cặp output còn lại, phục vụ việc quay sang phải.

### 🖤 Nối GND chung

Để hoàn tất phần điều khiển của mạch L298N, mình phải nối **GND của pin** với **GND trên Jetson Nano**:

* GND của pin nối với GND của **module Jetson Nano** và của **module L298N**.
* Trong sơ đồ, đường này dùng **dây màu đen**.

Đây là mối nối mass chung, thiếu nó thì mạch không hoạt động đúng.

### 🧷 Các chân tín hiệu của L298N

Trên L298N có các chân tín hiệu: **ENA, IN1, IN2, IN3, IN4, ENB**. Mình cần nối các chân này sang module **PCA9685** theo đúng thứ tự.

* **ENA**: điều chỉnh hướng và tốc độ cho các động cơ **bên trái**.
* **ENB**: điều chỉnh hướng và tốc độ cho các động cơ **bên phải**.

---

Vậy là phần đầu của sơ đồ đã rõ: nguồn 9V, hai động cơ mỗi bên dùng chung output, GND nối chung với Jetson Nano, và các chân tín hiệu chờ đấu sang PCA9685. Bài sau mình sẽ đi tiếp phần kết nối còn lại.
