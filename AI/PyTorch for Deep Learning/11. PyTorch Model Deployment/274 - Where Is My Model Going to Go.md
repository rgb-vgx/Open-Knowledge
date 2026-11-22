---
title: 'Bài 274 — Model sẽ chạy ở đâu: on-device hay cloud?'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 274
status: edited
source: '274 - Where Is My Model Going to Go.md'
categories:
- AI
tags: []
---

# 📍 Model sẽ chạy ở đâu: on-device (edge) hay cloud?

> Nguồn: `274 - Where Is My Model Going to Go.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055216)

Trong ba câu hỏi deploy, "model của tôi sẽ đi đâu?" là câu quyết định kiến trúc nhiều nhất. Bài này mình đào sâu hai lựa chọn **on-device (edge)** và **cloud**, kèm ví dụ Tesla và danh sách ưu/nhược điểm để bạn cân nhắc.

### 🚗 Vì sao cần model ngay trên thiết bị?

Với Food Vision Mini, ai đó chụp ảnh trên smartphone — ta có thể đợi ảnh rời máy lên cloud rồi trả về không? Có thể, nhưng lý tưởng là chụp xong có dự đoán ngay.

Ví dụ rõ hơn là **Tesla autopilot**: xe đang chạy và model phát hiện chướng ngại vật. Không có đủ thời gian để dữ liệu rời xe, lên cloud, dự đoán rồi gửi về — xe có thể đã đâm. Thêm nữa, nếu mạng kém hoặc không có mạng thì dữ liệu thậm chí không upload được.

Đó là lý do chính của **model on the edge**: khi prediction phải xảy ra ngay trên thiết bị, vì **yêu cầu độ trễ** hoặc **không có kết nối mạng**.

Các ví dụ khác: tính năng nhận diện văn bản, chọn chủ thể trong ảnh trên thiết bị Apple và nhiều điện thoại khác — chờ ảnh lên cloud rồi về sẽ mất vài giây, trải nghiệm không chấp nhận được.

---

### ☁️ Vì sao vẫn cần cloud?

Cloud cho bạn **tài nguyên nhiều hơn hẳn** thiết bị: Google Cloud, AWS, Hugging Face, Azure Machine Learning… gần như **compute vô hạn**. Model lớn không vừa thiết bị có thể xử lý trên cloud rồi trả dự đoán về.

Điểm mấu chốt: **network delay thường là phần lớn nhất** của độ trễ, chứ không phải compute.

| | On-device (edge) | Cloud |
|---|---|---|
| Model | Nhỏ hơn, hiệu năng thấp hơn | Lớn hơn, hiệu năng cao hơn |
| Inference | Rất nhanh, không có network latency | Chậm hơn do phải upload/download dữ liệu |
| Compute | Giới hạn | Gần như vô hạn |
| Kết nối mạng | Không cần | Bắt buộc |

Tesla là ví dụ kinh điển: **inference** chạy on-device để đảm bảo an toàn và tốc độ; còn **training** chạy trên cloud để có model lớn hơn, nhiều compute và storage hơn. Hai bên mix-and-match tùy mục đích.

---

### ⚖️ Ưu và nhược điểm của từng lựa chọn

**On-device / edge**

* **Pro:** rất nhanh vì dữ liệu không rời thiết bị; **bảo vệ quyền riêng tư** (dữ liệu ở lại máy); **không cần Internet**; có thể chạy cả trong **browser** (ví dụ qua **ONNX** — Open Neural Network Exchange).
* **Con:** compute và storage giới hạn — model lớn chạy chậm hoặc không vừa; thường phải **tùy biến model theo từng thiết bị** (iPhone và Android có thể cần model khác nhau).

**Cloud**

* **Pro:** gần như vô hạn compute, co giãn khi cần; **deploy một model dùng khắp nơi qua API**; dễ tích hợp vào **cloud ecosystem** sẵn có của công ty/app.
* **Con:** **chi phí có thể vượt kiểm soát** nếu không đặt giới hạn scaling (app viral chạy 1000 máy, mỗi máy $10/giờ thì rất tốn); dự đoán **chậm hơn do network latency**; dữ liệu phải rời thiết bị nên có thể **lo ngại quyền riêng tư**.

---

### 🔌 API — cách cloud phục vụ nhiều nơi

**API** (Application Programming Interface) là cách để hai hay nhiều chương trình máy tính giao tiếp. Bạn deploy model thành API, rồi viết app gọi: "API ơi, đây là dữ liệu, trả tôi dự đoán" — và dùng app đó ở mọi nơi. Đúng tinh thần deployment: model tương tác với người khác hoặc chương trình khác.

---

Nếu muốn xem thêm ví dụ thực tế, transcript gợi ý hai bài trên blog PyTorch: deploy model PyTorch lên **Raspberry Pi** ở edge (camera chụp ảnh và inference trực tiếp trên thiết bị), và bài "Moving ML inference from the Cloud to the Edge". Bài sau mình sẽ trả lời câu hỏi cuối: **model sẽ hoạt động thế nào** — online hay offline.
