---
title: 'Dựng đường chạy thử cho xe tự lái'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 083
status: edited
source: '083 - Building a Lane.md'
categories:
- AI
tags: []
---

# 🛣️ Dựng đường chạy thử cho xe tự lái

> Nguồn: `083 - Building a Lane.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/43979736)

Chào các bạn, hôm nay mình bắt đầu phần phát triển dự án. Kết thúc dự án này, các bạn sẽ có một chiếc xe **tự chạy và bám theo đường**. Trước khi viết code, mình cần một sa bàn đường chạy thử — bài này chỉ làm đúng việc đó.

### 🏁 Mục tiêu của dự án

* Cuối dự án, các bạn sẽ phát triển được một chiếc xe **tự lái và bám đường**.
* Mình hy vọng dự án này chỉ là **một phần** trong công việc của các bạn, và giúp các bạn phát triển được những dự án toàn diện hơn trong tương lai.

Một lời nhắn nhỏ từ giảng viên: khi mới học **AI**, **computer vision** và lập trình, mọi chủ đề đều có vẻ khá khó. Nhưng **thành công đến khi các bạn kiên trì không bỏ cuộc** — cứ tiếp tục, đừng nghi ngờ.

### 📏 Vật liệu và kích thước đường

Đường chạy thử được tạo bằng **băng dính trắng** dán trên **foil đen** (nền đen). Đây là cách đơn giản để tạo đường chạy thử.

* Phần **đường thẳng dài**: **80 cm**.
* Phần **oval** (hai đầu cong): là các **nửa đường tròn** có đường kính **12 cm** — tức **120 mm**.

Các bạn có thể thấy băng trắng và nền foil đen trong bài giảng; phần oval nối hai đầu đường thẳng thành một vòng kín.

### 🧩 Tự bố trí theo ý mình

* Trong bài, giảng viên bố trí các đoạn theo ý muốn của mình.
* Các bạn cũng có thể **tự vẽ đường của riêng mình** rồi kiểm tra xe trên đó.

---

Vậy là các bạn đã có sa bàn đường chạy thử với kích thước cụ thể. Bài sau mình sẽ bắt đầu viết code cho dự án, trước hết là điểm qua các **module** cần dùng.
