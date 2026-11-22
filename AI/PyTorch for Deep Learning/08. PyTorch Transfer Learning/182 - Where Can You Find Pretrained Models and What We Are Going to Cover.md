---
title: 'Tìm pretrained model ở đâu và những gì sẽ học'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 182
status: edited
source: '182 - Where Can You Find Pretrained Models and What We Are Going to Cover.md'
categories:
- AI
tags: []
---

# 🔎 Tìm pretrained model ở đâu và những gì sẽ học

> Nguồn: `182 - Where Can You Find Pretrained Models and What We Are Going to Cover.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32854184)

Chào các bạn! Video trước ta đã bàn **transfer learning là gì, vì sao dùng**. Lý do lớn nhất: *đột nhiên nhiều người như chúng ta có thể làm việc đẳng cấp thế giới với ít tài nguyên và ít dữ liệu hơn*.

### 🗺️ Bốn nơi tìm pretrained model

1. **PyTorch domain libraries** — thư viện chính thức của PyTorch.
2. **Torch Image Models (timm)** — thư viện rất mạnh cho computer vision.
3. **Hugging Face Hub** — nơi đang nhanh chóng trở thành điểm đến cho gần như mọi tác vụ.
4. **Papers with Code — State of the Art (SOTA)** — tổng hợp nghiên cứu mới nhất.

Có thể còn vài nơi nữa mình quên, nhưng chừng này là quá đủ để bắt đầu. Section này ta tập trung vào **PyTorch domain libraries**.

### 📦 PyTorch domain libraries gồm gì?

Trong tài liệu PyTorch có các nhánh:

* **torchvision** — model thị giác.
* **torchtext** — model văn bản.
* **torchaudio** — model âm thanh.
* **torchrec** — model recommendation.

Ta quan tâm torchvision. Vào mục **Models and pre-trained weights**.

Lúc quay video (tháng 6/2022), bản stable là **0.12**, nhưng khóa dùng bản mới hơn (**0.13+**) vì có API mới. Có thể khi bạn học, nó đã ra khỏi beta.

### 🏷️ Danh sách model phân loại

Dưới mục **Classification** có rất nhiều kiến trúc: AlexNet, ConvNeXt, DenseNet, EfficientNet (B0, V2...), MobileNet (V3), Swin Transformer, Vision Transformer...

Đừng lo về tên các kiến trúc — chúng chỉ là tên. Điều quan trọng: **tất cả đều truy cập được bằng code PyTorch**.

### 🌐 Các nơi khác

* **timm (Torch Image Models)** — thư viện đẹp cho computer vision.
* **Hugging Face Hub** — có image classification, image segmentation, translation, token classification cho NLP, sentence similarity, audio classification... Gần như bất kỳ tác vụ nào bạn nghĩ ra.
* **torchtext / torchaudio** — cấu trúc tương tự torchvision, dành cho text và audio.
* **Papers with Code SOTA** — duyệt state-of-the-art theo từng lĩnh vực: computer vision, NLP, medical, time series...

Mình khuyên: khi **bắt đầu một bài toán ML mới**, hãy ghé một trong những nơi này xem **cái gì đã chạy tốt** — bạn sẽ có một khởi đầu thuận lợi thay vì bắt đầu từ số 0.

### 🎯 Những gì sẽ học trong section

Vì tập trung PyTorch thuần, ta dùng **PyTorch domain libraries**. Nội dung:

1. **Getting set up** — không viết lại mọi thứ từ đầu; import code đã viết ở các section trước, đặc biệt là phần **going modular**.
2. **Giới thiệu transfer learning bằng code PyTorch** — đã hiểu khái niệm, giờ làm thực tế.
3. **Customize một pretrained model** cho Food Vision Mini — mục tiêu xuyên suốt khóa: làm model phân loại ảnh tốt nhất có thể, khởi đầu với pizza/steak/sushi.
4. **Đánh giá** model transfer learning.
5. **Dự đoán trên dữ liệu custom** của chính bạn.

### ✅ Chốt lại

Đã biết chỗ tìm model "xịn". Giờ là lúc code — rất nhiều code. Hẹn gặp các bạn ở video tiếp theo!
