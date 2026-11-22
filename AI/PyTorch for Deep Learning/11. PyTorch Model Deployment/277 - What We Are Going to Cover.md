---
title: 'Bài 277 — Chúng ta sẽ làm gì trong section này'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 277
status: edited
source: '277 - What We Are Going to Cover.md'
categories:
- AI
tags: []
---

# 🗺️ Chúng ta sẽ làm gì: deploy Food Vision Mini

> Nguồn: `277 - What We Are Going to Cover.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055219)

Đủ lý thuyết rồi — giờ là lúc deploy một model thật. Mình cho các bạn xem trước **Food Vision Mini** đang chạy trên điện thoại, chụp ảnh bữa trưa là ra "sushi", mở trong browser trên Hugging Face là ra "steak", "pizza" trong tích tắc. Đó là đích đến của section này.

### 🎯 Kịch bản deploy lý tưởng của Food Vision Mini

Nhìn lại ba câu hỏi deploy, ta có câu trả lời:

* **Chạy được trên mobile** — on-device.
* **Trả dự đoán ngay** — online/real-time.
* **Nhanh** — muốn nhanh hơn nữa, và đây là chỗ có thể cải thiện.

Vậy kịch bản lý tưởng là **on-device + online**. Nhưng câu hỏi quan trọng hơn: *model nào* cho ta trade-off tốt nhất giữa hiệu năng và tốc độ? Đó là phần thực nghiệm của section.

---

### 🧪 Lộ trình

1. **Get set up** — import lại code đã viết ở các module trước.
2. **Giới thiệu deployment với PyTorch** — đưa lý thuyết thành code cụ thể.
3. **Deploy Food Vision Mini thành web app** dùng được.
4. **Đội mũ machine learning engineer** — chia sẻ web app cho bất kỳ ai.
5. **Tiếp tục thực nghiệm nhiều model** — so sánh **EfficientNet B2** và **Vision Transformer** feature extractor.
6. **Một bất ngờ lớn ở cuối** — không spoil, nhưng nếu đã xem materials thì bạn có thể đã đoán ra.

Các công cụ ở bài trước không loại trừ nhau: ví dụ muốn inference on-device thì nhắm **ML Kit** hay **Core ML**, nhưng train trên cloud thì dùng **Vertex AI**, còn làm demo nhanh có thể chọn **Gradient + Hugging Face** hoặc dựng **FastAPI** đơn giản. Chọn gì tùy use case.

---

### 🍳 Tinh thần của section

Đây là **Milestone Project 3** — nơi mọi thứ hội tụ. Và vì đang nấu "Food Vision", chúng ta sẽ "cook" rất nhiều code.

---

Mình hẹn gặp các bạn trong **Google Colab**. Mở notebook lên, chạy theo, và đừng ngại phá thử — đó là cách học nhanh nhất. Let's code!
