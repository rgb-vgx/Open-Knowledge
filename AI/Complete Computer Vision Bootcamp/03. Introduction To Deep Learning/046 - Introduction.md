---
title: 'Bài 046 — Deep Learning là gì và nó nằm ở đâu giữa AI, ML'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 46
status: edited
source: '046 - Introduction.md'
categories:
- AI
tags: []
---

# 🧠 Deep Learning nhập môn: AI, ML và mạng neural

> Nguồn: `046 - Introduction.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47940303)

Chào các bạn! Đây là bài mở đầu của series **Deep Learning**. Trước khi lao vào code, mình muốn dựng cho các bạn tấm bản đồ khái niệm: **AI**, **machine learning** và **deep learning** khác nhau thế nào, rồi từ đó đi qua ba nhánh kỹ thuật lớn mà cả khóa sẽ dùng — **ANN**, **CNN** và **RNN**.

### 🤖 AI: cho máy tự làm nhiệm vụ

**AI** (artificial intelligence) có mục tiêu tạo ra những ứng dụng có thể **tự thực hiện nhiệm vụ của nó**. Ví dụ quen thuộc là hệ thống gợi ý phim của **Netflix**: dựa trên vài input từ người dùng, nó tự động đưa ra gợi ý phim khác nhau. Hay **self-driving car**, hay **Amazon** — nơi bạn mua sắm và được gợi ý những món đồ hấp dẫn.

---

### 📊 Machine learning: tập con của AI

**Machine learning** là một tập con của AI. Nó cung cấp cho bạn các công cụ thống kê để **phân tích dữ liệu**, **trực quan hóa dữ liệu**, thậm chí thực hiện các phép toán như **forecasting** và **dự đoán**. Trong machine learning lại chia làm hai nhánh lớn: **supervised** và **unsupervised**.

---

### 🧬 Deep learning: bắt chước bộ não người

**Deep learning** là tập con của machine learning, và đây là phần cốt lõi của cả series. Nhiệm vụ chính của nó là **bắt chước bộ não con người**. Câu hỏi mà các nhà nghiên cứu đặt ra: liệu có thể làm cho máy học giống cách con người học đủ thứ trên đời? Từ đó deep learning ra đời.

Trong deep learning, mình sẽ làm việc cụ thể với **neural network**, và chính xác hơn là **multilayered neural network** (mạng neural nhiều tầng). Deep learning cũng có **supervised** và **unsupervised**, nhưng trọng tâm của khóa là các loại mạng neural sau:

1. **ANN** (artificial neural network) — giải được cả bài toán **classification** lẫn **regression**, hai dạng cốt lõi của bài toán supervised.
2. **CNN** (convolutional neural network) — mạnh khi input là **ảnh** và **video frame**; giải bài toán classification và mở đường sang **object detection** (Detectron, **YOLO** với các phiên bản v5, v6, v7) cùng **image segmentation**.
3. **RNN** (recurrent neural network) — dành cho dữ liệu dạng chuỗi: **NLP** (natural language processing) với input là text, hoặc **time series** như dự đoán doanh số, dự đoán nhu cầu nguyên vật liệu cho sáu tháng tới.

---

### 🪜 Từ RNN đi lên tới Transformers

RNN không phải điểm dừng. Trong nhánh này các bạn sẽ lần lượt gặp:

* **Word embeddings**
* **LSTM** và **GRU**
* **Bidirectional LSTM**
* **Encoder–decoder**
* **Transformers** — phần cực kỳ quan trọng, hiện giải được gần như mọi bài toán
* **BERT**

Cả series sẽ giải nhiều use case và dùng framework như **TensorFlow** — framework mã nguồn mở do Google phát triển, trước đây được nhóm Google Brain sử dụng. Ngoài ra khóa còn tập trung vào **end-to-end project**.

---

### 🎯 Học gì để đủ sức đi làm

Mình nói thẳng: hiện tại phần lớn nghiên cứu đang diễn ra quanh **object detection** và dữ liệu **NLP** — nơi Google và rất nhiều PhD đang nghiên cứu cách model hiểu được cả sự **mỉa mai** (sarcasm) trong câu chữ.

Nhưng nếu chỉ cần vững để phỏng vấn và đi làm, các bạn hãy tập trung vào **ba kỹ thuật chính** — ANN, CNN, RNN — cùng các biến thể của chúng. Đây là thứ xuất hiện nhiều nhất trong các buổi phỏng vấn; trả lời tốt nhóm này thì khả năng đậu rất cao.

Bài sau mình sẽ nói vì sao deep learning lại bùng nổ đến vậy. Hẹn gặp các bạn ở video tiếp theo!
