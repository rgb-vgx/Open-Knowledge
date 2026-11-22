---
title: 'Machine learning truyền thống vs deep learning: dữ liệu có cấu trúc và phi cấu trúc'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 10
status: edited
source: '010 - Machine Learning vs. Deep Learning.md'
categories:
- AI
tags: []
---

# ⚖️ Machine learning truyền thống vs deep learning

> Nguồn: `010 - Machine Learning vs. Deep Learning.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656586)

Bài trước chúng ta đã nói deep learning giỏi gì và thường không giỏi gì. Giờ mình sẽ đi sâu hơn vào so sánh **machine learning truyền thống** và **deep learning**. Nhắc lại: mình hay dùng lẫn hai thuật ngữ này, và mọi thứ đang thay đổi liên tục — nên đây là nói theo hướng tổng quát, không phải chân lý tuyệt đối.

### 📊 Dữ liệu có cấu trúc: sân nhà của ML truyền thống

**Structured data** là những bảng số với **hàng và cột** rõ ràng. Với loại dữ liệu này, một trong những thuật toán tốt nhất là **gradient boosted machine**, ví dụ **XGBoost**.

Các bạn sẽ thấy XGBoost xuất hiện rất nhiều trong các cuộc thi data science, và cả trong **production** — tức những ứng dụng các bạn dùng hằng ngày trên Internet.

Nên nếu có dữ liệu dạng bảng, hãy cân nhắc XGBoost trước khi nghĩ đến việc xây một thuật toán deep learning. Dĩ nhiên, luật không đóng đinh — đây chính là phần "vừa là nghệ thuật, vừa là khoa học" của machine learning.

### 🖼️ Dữ liệu phi cấu trúc: sân nhà của deep learning

Với **unstructured data** — dữ liệu "lung tung", không nằm trong hàng cột gọn gàng — deep learning thường tốt hơn. Ví dụ:

* **Ngôn ngữ tự nhiên**, như một dòng tweet.
* **Văn bản** dài, như định nghĩa deep learning trên Wikipedia.
* **Hình ảnh**, như ảnh chụp món ăn cho một app nhận diện burger.
* **File âm thanh**, như khi bạn nói chuyện với trợ lý giọng nói.

Đám dữ liệu này nhìn thì không có cấu trúc, nhưng sẽ có cách biến chúng thành dạng có cấu trúc nhờ "phép màu" của **tensor** — thứ chúng ta sẽ làm rất nhiều trong khóa này.

Tóm gọn: **structured data → gradient boosting, random forest, tree-based (như XGBoost)**; **unstructured data → neural network**.

### 🌳 Các thuật toán "nông" và các mạng "sâu"

Với dữ liệu có cấu trúc, các thuật toán quen thuộc gồm:

* **Random Forest** (một trong những cái mình thích nhất)
* **Gradient boosted models**
* **Naive Bayes**
* **Nearest neighbor**
* **Support Vector Machine (SVM)**
* và nhiều thuật toán khác

Từ khi deep learning ra đời, người ta thường gọi nhóm này là **shallow algorithms** — thuật toán "nông".

Vậy tại sao gọi là **deep** learning? Vì mạng có thể có rất nhiều **layer** chồng lên nhau: một **input layer**, có thể hàng trăm layer ở giữa, rồi một **output layer**.

Các kiến trúc neural network phổ biến:

* **Fully connected neural network**
* **Convolutional neural network (CNN)**
* **Recurrent neural network (RNN)**
* **Transformer** — nổi lên mạnh trong vài năm gần đây

### 🎯 Khóa học này tập trung vào đâu

Nghe đến đây có thể hơi quá tải, nhất là nếu các bạn chưa có nhiều kinh nghiệm. Tin tốt là: trong PyTorch, chúng ta sẽ tập trung vào **fully connected neural network** và **convolutional neural network** — nền tảng của deep learning.

Nắm được những viên gạch nền này rồi, các bạn có thể bước sang các kiểu mạng khác.

Và nhắc lại lần nữa: tùy cách các bạn biểu diễn bài toán, rất nhiều thuật toán ở đây có thể dùng cho cả hai phía. Mình vừa "làm rối" các bạn một chút khi nói cái này hợp deep learning, cái kia hợp machine learning — nhưng đó cũng chính là phần thú vị: hãy dùng sự tò mò của mình để tìm ra cách tốt nhất cho bài toán cụ thể.

### 🔜 Tiếp theo: neural network là gì?

Trước khi xem bài sau, mình muốn các bạn **Google "what are neural networks?"** và thử tự hình thành định nghĩa của riêng mình — vì sẽ có hàng trăm định nghĩa khác nhau. Bài tới chúng ta sẽ cùng xem.
