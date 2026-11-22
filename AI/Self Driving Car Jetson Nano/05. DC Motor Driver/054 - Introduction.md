---
title: 'Giới thiệu phần điều khiển động cơ DC'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 054
status: edited
source: '054 - Introduction.md'
categories:
- AI
tags: []
---

# 🚗 Giới thiệu phần điều khiển động cơ DC

> Nguồn: `054 - Introduction.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39693192)

Chào các bạn, mở đầu section này mình sẽ nói qua vì sao cần đến các module driver động cơ DC bên ngoài, và chiếc xe tự lái của mình sẽ đánh lái dựa trên nguyên lý nào. Đây là phần nối tiếp rất tự nhiên sau khi đã biết đọc ảnh bằng OpenCV.

### 🎯 Mục tiêu của section

* Xe tự hành của mình sẽ **tự đi theo làn đường**.
* Để làm được vậy, xe phải tính toán được việc **rẽ** và các tình huống khác.
* Vì thế mình cần tìm hiểu các **driver động cơ DC bên ngoài** để điều khiển chuyển động.

### 🛞 Cách xe đánh lái với bốn động cơ

Xe có **bốn động cơ**. Hai động cơ nằm cạnh nhau quay **cùng chiều**.

* Khi xe cần **rẽ trái**: tăng tốc độ các động cơ **bên phải**, giảm tốc độ các động cơ **bên trái**.
* Khi xe cần **rẽ phải**: tăng tốc độ động cơ **bên trái**.

Cách đánh lái bằng chênh lệch tốc độ hai bên là điểm cốt lõi của phần điều khiển này.

### ⚠️ Đừng đánh lái quá gắt

Có một điều các bạn cần lưu ý: hầu hết các xe bám làn đều **can thiệp rất chậm**, vì đây là yếu tố quan trọng cho **an toàn con người**. Vì vậy mình cũng **không nên đặt các góc rẽ quá gắt**.

### 🔌 Không cần vi điều khiển ngoài

Với **Jetson Nano**, mình có thể điều chỉnh tốc độ và hoạt động của động cơ mà **không cần thêm vi điều khiển bên ngoài**. Tất nhiên vẫn cần các **module ngoài**, cụ thể là hai driver động cơ:

* **L298N**
* **PCA9685**

---

Vậy là mình đã nắm được mục tiêu và nguyên lý đánh lái của xe. Bài sau mình sẽ xem kỹ module **L298N** trước.
