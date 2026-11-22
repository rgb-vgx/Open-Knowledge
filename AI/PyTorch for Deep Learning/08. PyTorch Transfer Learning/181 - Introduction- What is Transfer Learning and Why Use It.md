---
title: 'Transfer learning là gì và vì sao nên dùng'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 181
status: edited
source: '181 - Introduction- What is Transfer Learning and Why Use It.md'
categories:
- AI
tags: []
---

# 🎓 Transfer learning là gì và vì sao nên dùng

> Nguồn: `181 - Introduction- What is Transfer Learning and Why Use It.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32854180)

Chào các bạn, chào mừng tới **Transfer Learning** với PyTorch. Đây là một trong những chủ đề mình thích nhất trong toàn bộ machine learning, nên mình rất háo hức.

### 🆘 Where can you get help — nhắc lại

1. **Follow along with the code** — làm theo code, chạy code. Câu thần chú: *if in doubt, run the code*.
2. **Try it** — tự chạy, bấm `Shift + Cmd + Space` đọc docstring.
3. **Search** — tra tài liệu PyTorch chính thức.
4. **Ask** — đặt câu hỏi trên trang GitHub discussions của khóa.

Notebook của section này là `06_pytorch_transfer_learning`. Lúc quay có hai phiên bản (`V2` do dùng PyTorch bản mới), nhưng khi bạn xem có thể chỉ còn một bản.

### 🤔 Vậy transfer learning là gì?

Ta đã tự xây vài model. Nhưng chắc bạn cũng nghĩ: *chẳng lẽ chưa ai dành thời gian thiết kế sẵn một model phù hợp cho công việc này?* — Và đúng là có. **Transfer learning là tận dụng chính điều đó.**

Ví dụ với computer vision:

* Có một **dataset lớn** tên **ImageNet** — bản truyền thống có hơn **1 triệu ảnh** thuộc **1000 class**. (Một phiên bản mở rộng có tới khoảng 14 triệu ảnh.)
* Nhiều người đã train model thị giác trên ImageNet.
* Vậy nếu ta **lấy các pattern model đó học được**, rồi **tùy chỉnh cho bài toán của mình** — ở đây là Food Vision Mini — thì sao?

Đó chính là transfer learning: **lấy thứ một model đã học trên dataset lớn, rồi tinh chỉnh cho use case riêng**.

### 📝 Ví dụ bên NLP

Với xử lý ngôn ngữ tự nhiên:

* Có một model đã **train trên toàn bộ Wikipedia** để học cấu trúc ngôn ngữ.
* Nó biết, chẳng hạn, trong câu *"The something jumped over the fence"*, chỗ `something` nhiều khả năng là "dog" hơn là "car".
* Ta có thể **customize** model đó thành một **spam filter**: email này có phải spam không?

### 🧠 Bản chất

Tóm gọn:

1. Lấy một model đã học trên một dataset — thường rất lớn.
2. Gọi đó là **pre-trained** model.
3. Model học ra **pattern / weight / parameter** từ một không gian bài toán tương tự bài của ta.
4. Ta **tune** những pattern đó cho bài toán riêng.

### 🚀 Vì sao nên dùng transfer learning?

* **Tận dụng kiến trúc đã được chứng minh.** Khi xây TinyVGG, ta tự ghép từng layer. Với transfer learning, các nhà nghiên cứu giỏi đã thiết kế sẵn kiến trúc chạy tốt trên bài toán tương tự.
* **Tận dụng pattern đã học.** Nhờ vậy thường đạt **kết quả tốt với ít dữ liệu hơn**.

Hình dung: một model như **EfficientNet** (kiến trúc computer vision) đã hiểu cấu trúc chung của ảnh. Ta rút pattern từ nó và tune cho Food Vision Mini. Kết quả thường **tốt hơn model train from scratch** như TinyVGG.

### 📄 Trích dẫn đáng nhớ

Từ paper **"How to Train Your ViT"** (ViT = Vision Transformer):

> *"Most practitioners, however, rarely if ever, perform pre-training on today's largest datasets, but instead use some of the many publicly available parameter sets."*

Nghĩa là: phần lớn người làm thực tế **không tự pre-train** trên dataset khổng lồ, mà dùng các bộ tham số có sẵn công khai. Và kết luận của paper:

> *"...even if the downstream data of interest appears to only be weakly related to the data used for pre-training, transfer learning remains the best available option."*

Ngay cả khi dữ liệu riêng của bạn chỉ **liên quan lỏng lẻo** tới dữ liệu pre-train, transfer learning vẫn là lựa chọn tốt nhất.

Còn Jeremy Howard (fast.ai) thì nói: *"If we can do better at transfer learning, it's this world-changing thing. Suddenly, lots more people like us can do world-class work with less resources and less data."*

### 🔧 Nhắc lại "các cách cải thiện model"

Ở slide "improving our model" mấy section trước, để **giảm overfitting** ta có thể:

* thêm dữ liệu,
* dùng **data augmentation**,
* dùng dữ liệu tốt hơn,
* hoặc **transfer learning** — lấy pattern đã học từ bài toán khác và tinh chỉnh.

### ✅ Chốt lại

Transfer learning cho phép làm việc "world-class" với ít tài nguyên và ít dữ liệu. Video tới mình sẽ chỉ vài nơi tìm pre-trained model. Hẹn gặp các bạn!
