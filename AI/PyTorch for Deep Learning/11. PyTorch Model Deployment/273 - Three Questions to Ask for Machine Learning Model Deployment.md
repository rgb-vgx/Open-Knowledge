---
title: 'Bài 273 — Ba câu hỏi cần đặt ra khi deploy model'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 273
status: edited
source: '273 - Three Questions to Ask for Machine Learning Model Deployment.md'
categories:
- AI
tags: []
---

# 🤔 Ba câu hỏi cần hỏi trước khi deploy một model

> Nguồn: `273 - Three Questions to Ask for Machine Learning Model Deployment.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055215)

Trước khi viết dòng code deploy nào, mình luôn tự hỏi ba câu. Chúng giúp hình dung rõ mục tiêu lý tưởng, nơi model sẽ sống, và cách model trả kết quả. Bài này đi qua từng câu, lấy **Food Vision Mini** làm ví dụ xuyên suốt.

### 💡 Câu 1 — Kịch bản deploy lý tưởng nhất là gì?

Mình bắt đầu từ **trường hợp lý tưởng nhất** rồi làm ngược lại. Với Food Vision Mini, điều lý tưởng là:

* **Model luôn đúng** — mỗi lần ai đó chụp ảnh món ăn, model đoán chính xác.
* **Model chạy cực nhanh** — nhanh "cỡ tốc độ ánh sáng", vì dữ liệu di chuyển qua linh kiện điện tử. Thực tế sẽ luôn có một chút trễ, nhưng đó vẫn là mục tiêu để hướng tới.

Tất nhiên, thế giới model xác suất thì "luôn đúng" gần như không thể. Nhưng đặt ra mục tiêu lý tưởng trước giúp bạn biết mình đang cố đạt tới đâu.

---

### 📍 Câu 2 — Model sẽ đi đâu: on-device hay cloud?

Đây là câu hỏi về **nơi model chạy**.

* **On-device (edge)** — model nằm ngay trên thiết bị bạn dùng. Với Food Vision Mini, đưa lên điện thoại thì model sống trên chính chiếc điện thoại đó.
* **Cloud** — model chạy trên một máy tính *không phải* thiết bị của bạn. Cloud là tập hợp server trong các data center trên khắp thế giới, truy cập qua Internet; chuyển lên cloud có thể giúp công ty tiết kiệm tiền và tiện cho người dùng hơn.

Hai lựa chọn này không loại trừ nhau. Model on-device thường nhỏ vì điện thoại không nhiều compute; nếu nó chạy không tốt, có thể fallback sang model trên cloud — nơi gần như có compute vô hạn.

---

### ⚡ Câu 3 — Model sẽ hoạt động thế nào: online hay offline?

* **Online (real-time)** — chụp ảnh, nhận dự đoán ngay lập tức.
* **Offline (batch)** — chụp mười tấm ảnh, một giờ sau mới nhận dự đoán hàng loạt. Khác biệt cốt lõi là *ngay* hay *trễ một chút*.

Chúng ta thực ra đã làm offline suốt khóa: train trên từng batch dữ liệu. Trong một hệ thống thật, hai cách có thể kết hợp — **prediction pipeline** chạy real-time, còn **training pipeline** chạy offline theo batch.

| Câu hỏi | Lựa chọn |
|---|---|
| Lý tưởng nhất | Luôn đúng + cực nhanh |
| Model đi đâu | On-device (edge) / Cloud |
| Model hoạt động thế nào | Online (real-time) / Offline (batch) |

---

Ba câu hỏi này không có thứ tự bắt buộc — bạn có thể nhảy qua lại giữa chúng. Hãy thử áp dụng cho model của bạn: kịch bản lý tưởng là gì, nó nên chạy trên thiết bị hay cloud, và người dùng cần kết quả ngay hay chấp nhận chờ? Bài sau mình sẽ đào sâu từng câu một trước khi bước vào code.
