---
title: 'Lắp quạt tản nhiệt cho Jetson Nano'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 008
status: edited
source: '008 - Adding Cooler Fan.md'
categories:
- AI
tags: []
---

# 🌬️ Lắp quạt tản nhiệt cho Jetson Nano

> Nguồn: `008 - Adding Cooler Fan.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39463680)

Bài này mình lắp quạt tản nhiệt lên board Jetson Nano. Đây là bước nhỏ nhưng quan trọng, vì board sẽ chạy các ứng dụng machine learning nên cần thoát nhiệt tốt.

### 🧰 Linh kiện cần có

* Một **quạt tản nhiệt**.
* Hai **ốc máy** (machine screw) và **hex nut** đi kèm.

Lưu ý hướng quạt: **cửa thoát gió của quạt phải hướng về phía cooler** (bộ tản nhiệt).

---

### 🔧 Cố định quạt lên cooler

1. Đặt quạt lên cooler, canh đúng hai lỗ ốc.
2. Đưa ốc qua lỗ.
3. Bắt **hex nut** để giữ quạt thật chặt, không còn khe hở.
4. Làm tương tự với hai lỗ chéo còn lại để quạt được ép đều xuống cooler.

---

### 🔌 Đấu dây nguồn quạt

Quạt có hai dây **đỏ** và **đen**:

* Dây **đỏ** nối vào đường **Vdd** trên board Jetson Nano.
* Dây **đen** nối vào đường **GND**.

Đấu đúng cực như vậy để quạt quay đúng chiều và an toàn cho board.

---

### ⚡ Cấp nguồn

Sau khi quạt đã cố định và đấu dây xong, cắm dây nguồn từ adapter vào board Jetson Nano.

---

Vậy là quạt đã được lắp hoàn chỉnh. Bài sau mình sẽ bật board lần đầu và đi qua các bước thiết lập hệ điều hành.

> ⚠️ Cần kiểm chứng: "Vdd" là cách giảng viên gọi đường nguồn trong transcript; Jetson Nano không in nhãn "Vdd" trên board (header quạt dùng GND/5V). Cần đối chiếu bo mạch thực tế trước khi đấu dây.
