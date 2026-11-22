---
title: 'Điều khiển tốc độ động cơ DC — bài cuối'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 064
status: edited
source: '064 - Speed Control -4 (Final).md'
categories:
- AI
tags: []
---

# 🏁 Điều khiển tốc độ động cơ DC — hoàn thiện và chạy thử

> Nguồn: `064 - Speed Control -4 (Final).md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39860582)

Chào các bạn, bài cuối của phần driver này mình sẽ hoàn thiện đoạn code điều tốc và chạy thử trên Jetson Nano. Mình sẽ quay động cơ theo nhiều tốc độ và chiều khác nhau để các bạn thấy rõ cách điều khiển.

### 🎚️ Thuộc tính `throttle`

Để điều khiển tốc độ, mình dùng thuộc tính **`throttle`** trên hai biến **motor1** và **motor2**. Giá trị nằm trong khoảng **-1 đến 1**:

* **`1`** — quay với **100%** tốc độ.
* **`0.5`** — quay với **50%** tốc độ.
* **`0`** — động cơ **dừng**, không quay.
* Giá trị **âm** — quay theo **chiều ngược lại**.

Nếu lỡ đấu dây động cơ sai chiều, các bạn chỉ cần ra lệnh quay âm để nó chạy đúng hướng mong muốn.

---

### 🔁 Vòng lặp chạy thử nhiều trạng thái

Mình tạo một vòng lặp **`while True`** để lần lượt cho xe chạy tới chậm, chạy tới nhanh, lùi nhanh, lùi chậm và dừng. Trước mỗi bước có lệnh **`print`** để khi chạy biết ngay động cơ đang ở trạng thái nào và đổi nhanh khi cần.

```python
while True:
    print("forward slowly")
    motor1.throttle = 0.5
    motor2.throttle = 0.5
    time.sleep(3)

    print("forwards")
    motor1.throttle = 1
    motor2.throttle = 1
    time.sleep(3)

    print("backwards")
    motor1.throttle = -1
    motor2.throttle = -1
    time.sleep(3)

    print("backwards slowly")
    motor1.throttle = -0.5
    motor2.throttle = 0.3
    time.sleep(3)

    print("stop")
    motor1.throttle = 0
    motor2.throttle = 0
    time.sleep(3)
```

Lưu ý: ở bước **backwards slowly**, transcript đọc **`-0.5`** cho motor1 và **`0.3`** cho motor2 — tức hai bánh quay ngược chiều nhau trong đoạn này. Khi chạy thử, các bạn kiểm tra lại chiều quay thực tế và chỉnh giá trị cho khớp với xe của mình.

---

### ⏱️ Thêm thời gian chờ giữa các bước

Mỗi trạng thái mình giữ **3 giây** bằng **`time.sleep(3)`**, nhờ vậy có đủ thời gian quan sát động cơ đổi tốc và đổi chiều. Vòng lặp chạy mãi nên xe sẽ lần lượt lặp lại chuỗi động tác trên.

---

### ✅ Chạy thử trên Jetson Nano

Chạy code, terminal không báo lỗi, và khi nhìn xuống phần cứng các bạn sẽ thấy các động cơ quay đúng theo từng giai đoạn: chậm, nhanh, đảo chiều rồi dừng.

---

Vậy là mình đã đi hết phần điều khiển động cơ DC: từ cài thư viện, khởi tạo I2C và PCA9685, khai báo kênh PWM, đến điều tốc bằng `throttle`. Đây là nền tảng để ghép với phần thị giác ở các chương trước thành chiếc xe tự bám làn.
