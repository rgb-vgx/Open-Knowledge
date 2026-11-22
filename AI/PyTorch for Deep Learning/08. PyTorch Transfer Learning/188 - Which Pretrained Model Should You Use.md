---
title: 'Nên chọn pretrained model nào'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 188
status: edited
source: '188 - Which Pretrained Model Should You Use.md'
categories:
- AI
tags: []
---

# 🤹 Nên chọn pretrained model nào

> Nguồn: `188 - Which Pretrained Model Should You Use.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33006516)

Chào các bạn! Ta đã có hai cách transform dữ liệu. Giờ tới câu hỏi lớn: **lấy pretrained model ở đâu, và chọn cái nào?**

### 📍 Nơi lấy model

1. **PyTorch domain libraries** (torchvision, torchtext...).
2. **timm** — Torch Image Models.
3. **Hugging Face Hub**.
4. **Papers with Code**.

---

### 🎯 Ba tiêu chí chọn model

Không có câu trả lời chắc chắn — như mọi thứ trong ML, hãy **experiment, experiment, experiment**. Nhưng mình thường cân nhắc ba yếu tố:

1. **Speed** — model chạy nhanh cỡ nào?
2. **Size** — model lớn cỡ nào (số tham số)?
3. **Performance** — model làm tốt cỡ nào trên bài toán của bạn?

Ba yếu tố này thường **gắn chặt nhau**.

---

### 🚗 Ví dụ: xe tự lái

Xe Tesla cần model **rất nhanh** vì đang chạy trên đường. Không thể đợi upload video lên server rồi tải kết quả về — quá chậm. Nên model phải **nằm trên xe**.

Ngược lại, có bài toán cho phép model chạy trên **compute server** ở cloud. Câu hỏi "model sống ở đâu?" ảnh hưởng trực tiếp tới lựa chọn.

Với Food Vision Mini, nếu deploy lên **mobile**:

* phải nhanh,
* phải nhỏ để vừa thiết bị,
* performance phải đủ tốt, nếu không chẳng ai dùng.

---

### 📊 Đọc bảng weight

Trong tài liệu torchvision, mục classification có bảng **tất cả classification weights**:

* **Weight** — tên pretrained weight (thường là ImageNet-1K).
* **Acc@1** — độ chính xác.
* **Params** — số tham số.

Quy tắc kinh nghiệm: **ít tham số hơn thường chạy nhanh hơn**, vì mỗi tham số là một phép tính. Không phải lúc nào cũng đúng, nhưng thường vậy.

Ta muốn **accuracy cao nhất với số tham số thấp nhất**.

---

### 🥇 So sánh nhanh

* **EfficientNet B0**: khoảng **78% accuracy**, chừng **5 triệu tham số**.
* **Inception V3**: accuracy **thấp hơn**, nhưng số tham số **gấp 6 lần**.

Đó là lý do mình hay chọn efficientnet — performance tốt trên nền số tham số thấp.

Ngoài ra còn có **MobileNet** dành riêng cho thiết bị di động:

* **MobileNet V3 Large**: khoảng **75% accuracy**, số tham số tương đương EfficientNet B0.

---

### 📜 The Bitter Lesson

Một điều đáng bàn: nếu có **compute vô hạn**, ta sẽ chọn model **lớn nhất, nhiều tham số nhất, tổng quát nhất**. Đó là tinh thần bài luận **"The Bitter Lesson"** của Rich Sutton:

> Bài học lớn nhất rút ra từ 70 năm nghiên cứu AI là các **phương pháp tổng quát** tận dụng được nhiều compute cuối cùng sẽ hiệu quả nhất — và hiệu quả hơn rất nhiều.

Hiểu đơn giản: càng nhiều dữ liệu, càng nhiều compute, phương pháp càng tổng quát (như neural network) → kết quả càng tốt.

Nhưng **ta không có compute vô hạn**. Nên chiến lược là: **bắt đầu nhỏ, mở rộng khi cần**.

---

### 🧭 Chốt lại

Khi chọn pretrained model, hỏi:

* Model cần chạy nhanh đến đâu?
* Nó deploy trên thiết bị (self-driving, mobile) hay trên server?
* Nó cần nhỏ cỡ nào?
* Performance yêu cầu ra sao?

Với Food Vision Mini, **EfficientNet B0** là lựa chọn cân bằng tốt giữa performance và size. Video sau ta setup model này. Hẹn gặp các bạn!
