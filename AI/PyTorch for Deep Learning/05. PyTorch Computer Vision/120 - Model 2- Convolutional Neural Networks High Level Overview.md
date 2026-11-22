---
title: 'Bài 120 — Model 2: tổng quan kiến trúc mạng tích chập'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 120
status: edited
source: '120 - Model 2- Convolutional Neural Networks High Level Overview.md'
categories:
- AI
tags: []
---

# 🧠 Model 2: tổng quan kiến trúc mạng tích chập

> Nguồn: `120 - Model 2- Convolutional Neural Networks High Level Overview.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920348)

Model 1 không vượt baseline. Đã đến lúc mang "hàng nặng" ra: **convolutional neural network (CNN)**, còn gọi là *convnet*. Bài này mình đi qua kiến trúc ở mức high-level và giới thiệu website yêu thích để học CNN — trước khi lao vào code ở bài sau.

### 🏛️ Kiến trúc điển hình

Một CNN gồm:

* **Input layer** — nhận dữ liệu như mọi model.
* **Các convolutional layer** — tìm pattern.
* **Hidden activation / non-linear layer** (thường ReLU).
* **Pooling layer** — thường max pooling.
* **Output layer** — thường là linear layer.

Giá trị cụ thể của từng layer phụ thuộc bài toán. Code nhìn chung vẫn giống các model trước; khác biệt nằm ở **loại layer** được dùng.

### 🧱 Convolutional block

Đây là khái niệm hay gây lẫn:

* Một **layer** là một đơn vị như `Conv2d`, `ReLU`, `MaxPool2d`.
* Một **block** là nhóm nhiều layer, ví dụ `Conv2d → ReLU → Conv2d → ReLU → MaxPool2d`.
* Một **architecture** là nhóm nhiều block nối với nhau, cộng input/output layer.

Càng "deep" thì càng nhiều block, và mỗi block có thể chứa nhiều layer — giống xếp Lego.

### 🔗 Vì sao thêm layer lại giúp?

Mỗi layer thực hiện một phép toán trên dữ liệu, layer sau nhận input từ layer trước. Càng nhiều layer, model càng có nhiều cơ hội tìm ra pattern. Đó cũng là nguồn gốc chữ **deep** trong *deep learning*.

Có những mạng tiên tiến dùng input từ layer rất xa (residual connections), nhưng nằm ngoài phạm vi bài này.

### 🌐 CNN Explainer — website nên xem

Đây là resource mình thích nhất để học CNN: **CNN Explainer**. Nó chạy **live trong browser**:

* Bạn chọn một ảnh (pizza, espresso, sport car…).
* Ảnh tách thành 3 kênh đỏ/xanh lá/xanh dương.
* Đi qua chuỗi `conv → relu → conv → relu → maxpool → …` đến output 10 lớp.
* Lớp có giá trị cao nhất chính là dự đoán — pizza ra pizza, espresso ra espresso.

Điểm đáng xem nhất là phần **convolutional layer**:

* Input `64 x 64 x 3` (channels last).
* Một **kernel** (còn gọi là **filter**) trượt qua ảnh, từ góc trên trái sang phải, xuống dưới.
* Ở giữa, các con số thay đổi liên tục — đó chính là phép toán convolution.
* Bên phải là output, mỗi **hidden unit** học một feature khác nhau. Có unit bắt sáng quanh đèn pha xe, có unit bắt cạnh…

Và điều kỳ diệu lẫn đáng sợ của deep learning: **mình không kiểm soát** mỗi unit học gì. Model tự tìm ra.

Kích thước output thay đổi qua từng layer — đó là xu hướng xuyên suốt, và là lý do phải tính shape cẩn thận.

### 🎯 Bài tập mở rộng

Dành **20 phút** click qua toàn bộ CNN Explainer, đặc biệt phần **"Understanding hyperparameters"**: kéo kernel size, stride, padding và xem output thay đổi. Bài sau mình sẽ code đúng kiến trúc "Tiny VGG" mà website này mô phỏng.

### ✅ Tạm kết

CNN = input → nhiều block (conv + relu + pooling) → output linear. Hiểu được kernel trượt và nén dần dữ liệu là hiểu được 80% ý tưởng. Giờ thì code thôi — bài sau mình dựng nguyên một CNN bằng PyTorch.
