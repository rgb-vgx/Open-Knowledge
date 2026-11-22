---
title: 'Lộ trình PyTorch: những gì chúng ta sẽ học và workflow 6 bước'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 16
status: edited
source: '016 - What We Are Going To Cover With PyTorch.md'
categories:
- AI
tags: []
---

# 🗺️ Lộ trình PyTorch và workflow 6 bước

> Nguồn: `016 - What We Are Going To Cover With PyTorch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656598)

Trước khi vào code, mình muốn các bạn thấy rõ bức tranh tổng thể: chúng ta sẽ học những gì, và cách một dự án PyTorch vận hành ra sao. Nhưng trước hết, mình muốn giải thích vì sao mình cứ "Google mọi thứ" thay vì đọc đáp án cho các bạn.

### 🔍 Vì sao mình hay search thay vì giảng?

Nếu các bạn thắc mắc "Daniel ơi, tôi vào khóa học để học PyTorch mà sao anh cứ Google?", thì đây là lý do.

Nếu mình kể hết mọi thứ về deep learning, machine learning, PyTorch, cái gì là gì, cái gì không phải gì, khóa học sẽ dài vô tận. Nhưng hơn thế, **search chính là công việc hằng ngày của một machine learning engineer**. Mình viết code, và khi không biết gì đó, mình mở Google gõ đúng cái lỗi đang gặp, hoặc "PyTorch what is a tensor".

Mình muốn các bạn thấy rằng **search như vậy là bình thường, và được khuyến khích**. Suốt khóa học các bạn sẽ thấy mình làm điều này rất nhiều.

---

### 📚 Nguồn học liệu chính thức

Elon Musk từng tweet một hình vui về các "cấp độ" học: học đại học, khóa online, YouTube, bài viết, meme, rồi "hóa thần". Mình thì nghiêm túc hơn: toàn bộ tài liệu khóa học nằm ở **learnpytorch.io**, dưới dạng **online book**. Các bạn có thể đọc song song khi xem video, và theo thời gian sách sẽ có thêm chương.

---

### 🧱 Module này: tensor và phép toán trên tensor

Trong module đầu tiên, chúng ta sẽ học **PyTorch basics và fundamentals**, chủ yếu xoay quanh **tensor** và các **tensor operation**. Nhớ lại: neural network là input tensor → thực hiện phép toán trên tensor → output tensor.

Nhìn rộng hơn, cả khóa học sẽ đi qua:

1. **Tiền xử lý dữ liệu** — biến dữ liệu thô (ảnh, văn bản...) thành numerical encoding, tức tensor.
2. **Xây dựng và dùng model pretrained** — cụ thể là neural network.
3. **Fit model vào dữ liệu** — viết code để model học pattern.
4. **Dự đoán** — dùng pattern từ quá khứ để đoán tương lai.
5. **Đánh giá** dự đoán của model.
6. **Lưu và load model** — ví dụ export model ra ứng dụng.
7. **Dùng model đã train để dự đoán trên dữ liệu của riêng bạn** (custom data) — phần rất vui.

---

### 👨‍🍳 Học như đầu bếp, không chỉ như nhà khoa học

Mình hay nói vui: chúng ta sẽ làm như **đầu bếp**, không phải như nhà hóa học.

Nhà hóa học cần chính xác tuyệt đối. Đầu bếp thì kiểu "thêm chút muối, chút bơ, nếm thử — ngon là được". Machine learning là sự pha trộn của cả hai: một phần khoa học, một phần nghệ thuật. Nên mình thích gọi đây là **"nấu ăn với PyTorch"**.

---

### 🔄 Workflow PyTorch sáu bước

Đây là workflow chúng ta sẽ dùng xuyên suốt khóa:

1. **Chuẩn bị dữ liệu** (get data ready).
2. **Chọn hoặc xây một pretrained model** phù hợp bài toán.
   * 2.1. **Chọn loss function và optimizer** — chưa cần lo, sẽ học ngay sau.
   * 2.2. **Xây training loop** — phần này nằm trong bước 2, nên mới có 2.1 và 2.2.
3. **Fit model vào dữ liệu và dự đoán** — ví dụ phân loại ảnh ramen hay spaghetti.
4. **Đánh giá model** — xem nó dự đoán ổn hay tệ.
5. **Cải thiện bằng thực nghiệm** — phần "vừa nghệ thuật vừa khoa học".
6. **Lưu và load lại model đã train**.

Các bước được đánh số cho dễ hiểu, nhưng thực tế có thể trộn qua lại tùy giai đoạn.

---

### 🔜 Tiếp theo

Còn một video nữa trước khi vào code: những điểm rất quan trọng về **cách tiếp cận khóa học**. Hẹn gặp các bạn ở đó!
