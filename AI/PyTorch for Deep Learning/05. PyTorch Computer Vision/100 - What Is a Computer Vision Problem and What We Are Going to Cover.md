---
title: 'Bài 100 — Computer vision là gì và chúng ta sẽ học những gì'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 100
status: edited
source: '100 - What Is a Computer Vision Problem and What We Are Going to Cover.md'
categories:
- AI
tags: []
---

# 👁️ Computer vision là gì và chặng đường phía trước

> Nguồn: `100 - What Is a Computer Vision Problem and What We Are Going to Cover.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32896506)

Chào mừng các bạn đến với section mới: computer vision với PyTorch. Trước khi viết dòng code nào, mình muốn chốt ba thứ: khi bí thì tìm help ở đâu, computer vision thực chất là bài toán gì, và chúng ta sẽ đi qua những bước nào để giải một bài toán phân loại ảnh end-to-end.

### 🆘 Bí thì làm gì? Bốn bước theo thứ tự

Câu thần chú của khóa học là **if in doubt, run the code** — chạy thử rồi xem input/output. Cụ thể, mình đi theo thứ tự:

1. Chạy code và quan sát input/output. Trong Google Colab, bấm `shift + command + space` (hoặc `ctrl` trên Windows) để xem docstring của hàm.
2. Tự thử sửa, thử phá code xem nó vỡ ra sao.
3. Search lỗi — sẽ gặp StackOverflow hoặc tài liệu PyTorch.
4. Vẫn tắc thì mở **Discussions** của repo `pytorch-deep-learning`, tạo discussion mới, ghi rõ section, dán code đã format trong cặp backtick ba, chọn category **Q&A** rồi bấm *Start discussion*. Như vậy câu hỏi sẽ search được và mọi người trả lời được.

### 📚 Tài liệu đi kèm section

Mọi code trong section này nằm trong **reference notebook** "PyTorch computer vision" — notebook có chú thích kèm hình, dùng làm phao khi bí. Bản sách online tương ứng ở mục *Section 3: PyTorch Computer Vision*. Các bạn cứ mở song song khi xem video.

Nếu muốn tìm cảm hứng, search cụm *"what can computer vision be used for"* sẽ ra những danh sách dài như "27 most popular computer vision applications in 2022" — đủ để thấy lĩnh vực này rộng đến mức nào. Nhưng đừng để bị cuốn: section này chỉ tập trung vào **một** bài toán phân loại ảnh nhiều lớp, làm cho thật chắc.

### 🖼️ Computer vision rộng đến mức nào?

Nếu bạn **nhìn thấy** được thứ gì đó, gần như đều có thể phát biểu thành một bài toán computer vision. Vài ví dụ cụ thể:

* **Binary classification**: ảnh này là steak hay pizza? Model tự học pattern từ pixel, mình không nói cho nó biết phải học gì.
* **Multiclass classification**: ảnh này là sushi, steak hay pizza? Có thể 3 lớp, 100 lớp, 1000 lớp. Ví dụ thực tế là một app phân loại được 100 loại đồ ăn; đưa ảnh chicken wings thì ra *chicken wings*, đưa ảnh không phải đồ ăn thì báo *no food found*.
* **Object detection**: trả lời câu hỏi *thứ mình tìm nằm ở đâu* trong ảnh — ví dụ tìm một chiếc xe cụ thể trong footage camera an ninh.
* **Segmentation**: tách các vùng trong ảnh (người, da, tóc, trời) để xử lý riêng — đó là nền tảng của computational photography trên iPhone/iPad.
* **Self-driving**: Tesla dùng 8 camera mỗi xe, đưa qua mạng nơ-ron rồi biểu diễn môi trường quanh xe thành **vector** — một dãy số — vì máy tính hiểu số tốt hơn hiểu ảnh.

Điểm thú vị: ở Tesla AI Day, chỗ device-agnostic code mà Tesla dùng chính là PyTorch. Cùng loại code chúng ta sắp viết.

### 🎯 Chúng ta sẽ làm gì trong section này

* Lấy một **vision dataset** có sẵn qua `torchvision` (thư viện domain của PyTorch cho computer vision).
* Đi qua kiến trúc **convolutional neural network (CNN)**.
* Làm một bài **multiclass image classification** end-to-end.
* Các bước modeling với CNN: dựng model, chọn **loss function**, chọn **optimizer**, train, evaluate.

Đúng như slide mình chiếu: ta sẽ đi qua **tất cả** các phần của một bài toán vision, nhưng trọng tâm là **dựng CNN để tìm pattern trong ảnh** — vì không phải lúc nào pattern cũng dễ tìm, và đó mới là phần thú vị.

### ✅ Tạm kết

Nửa art, nửa science — như một show nấu ăn của machine learning, mình sẽ "nấu" thật nhiều code. Bài sau chúng ta sẽ soi kỹ **input và output shape** của một bài toán computer vision, vì đây là thứ ám ảnh mọi kỹ sư ML.

Và nhớ: nếu bạn nhìn thấy được thứ gì đó, gần như bạn đã có một bài toán computer vision để thử. Hẹn các bạn ở bài sau.
