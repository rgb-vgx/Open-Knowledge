---
title: 'Bài 275 — Model hoạt động thế nào: online real-time hay offline batch?'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 275
status: edited
source: '275 - How Is My Model Going to Function.md'
categories:
- AI
tags: []
---

# ⚡ Model hoạt động thế nào: online real-time hay offline batch?

> Nguồn: `275 - How Is My Model Going to Function.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055217)

Đây là câu hỏi thứ ba trong bộ ba câu hỏi deploy: bạn muốn dự đoán trả về **ngay lập tức** hay chấp nhận **trả về sau**? Bài này phân tích hai chế độ **online (real-time, synchronous)** và **offline (batch, asynchronous)** cùng những ví dụ rất đời thường.

### 🍕 Online — dự đoán ngay khi có dữ liệu

Với Food Vision Mini, bạn upload ảnh chiếc pizza và model trả về "pizza" gần như tức thì.

Một ví dụ khác là **phát hiện giao dịch gian lận**. Không ai muốn quẹt thẻ rồi đứng chờ mười phút, một giờ hay một ngày để biết giao dịch có bị chặn hay không. Nó phải tức thì.

Đặc điểm: dự đoán trả về **ngay khi request đến**.

---

### 🌙 Offline — xử lý theo lô, có độ trễ

**Batch** nghĩa là xử lý nhiều mẫu cùng lúc. Bạn upload nhiều ảnh, chờ mười phút, rồi nhận về pizza, steak, sushi.

Với app inference thì đây không lý tưởng. Nhưng với **training** thì hoàn toàn ổn: upload hàng nghìn, hàng chục nghìn ảnh, train chạy nền, chờ mười phút hay một giờ cũng được, miễn model tốt lên.

Ví dụ hay nhất là **Apple Photos**: khi bạn cắm sạc iPhone và để đó hơn một giờ, iOS chạy model để phân loại ảnh trong nền (biển, gia đình, các khuôn mặt…). Nếu chạy lúc bạn đang dùng máy thì điện thoại vừa chậm vừa tụt pin — nên chọn lúc sạc là hợp lý.

---

### 🗓️ Tần suất và mục tiêu tối ưu

* **Offline:** chạy định kỳ — mỗi 10 phút, mỗi 4 giờ, mỗi ngày. YouTube có thể chạy thuật toán gợi ý mỗi ngày (hoặc thường xuyên hơn) dựa trên video bạn xem hôm qua.
* **Online:** chạy ngay khi có request, càng sớm càng tốt.

Offline tối ưu cho **high throughput** — xử lý/train nhiều mẫu một lúc, không cần kết quả tức thì. Online tối ưu cho **low latency** — nhanh và thường xuyên.

| Chế độ | Đặc điểm | Ví dụ |
|---|---|---|
| Offline (batch/async) | Có độ trễ, throughput cao | Apple Photos, gợi ý của Netflix/YouTube, index video YouTube, training |
| Online (real-time/sync) | Kết quả tức thì, latency thấp | Food Vision Mini, phát hiện gian lận, spam detection, translation, self-driving |

---

### 🚦 Khi nào bắt buộc phải online?

Những trường hợp mà chờ đợi là vô nghĩa hoặc nguy hiểm:

* **Gian lận thẻ tín dụng** — không ai đợi một giờ để model chạy lúc 9 giờ sáng rồi mới biết thẻ có gian lận không.
* **Spam detection** — email/tin nhắn đến là phải biết ngay.
* **Dịch máy** — Google Translate trả kết quả tức thì.
* **Self-driving vision system** — chờ mười phút để biết phía trước có gì là điều không thể.

Ngược lại, ảnh cần phân loại, recommendation, video indexing hay training đều có thể chạy offline.

---

Bảng so sánh trong bài được lấy từ cuốn **Designing Machine Learning Systems** của Chip Huyen (đặc biệt chương 7), một tài liệu mình rất khuyến nghị. Và cũng như cloud với edge, online và offline **có thể kết hợp** tùy use case. Bài sau: có những công cụ và nơi chốn nào để deploy model?
