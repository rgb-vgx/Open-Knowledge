---
title: 'Đánh đổi giữa model lớn và nhỏ khi deploy'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 269
status: edited
source: '269 - Discussing the Trade-Offs Between Using a Larger Model for Deployments.md'
categories:
- AI
tags: []
---

# ⚖️ Đánh đổi giữa model lớn và nhỏ khi deploy

> Nguồn: `269 - Discussing the Trade-Offs Between Using a Larger Model for Deployments.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34049502)

Ta đã lưu model tốt nhất (pre-trained ViT với head được chỉnh cho bài toán của mình) và thấy nó nặng **327 MB**. Nếu deploy Food Vision Mini thành ứng dụng production lên mobile hay trình duyệt, con số này có thể hơi lớn.

### 🔍 So sánh với EfficientNetB2

Ở Section 7, model EfficientNetB2 chỉ nặng **29 MB**. Nhưng lưu ý quan trọng: bản EfficientNetB2 ở section đó được train trên **20%** dữ liệu pizza/steak/sushi. Muốn so sánh công bằng thì phải train lại ViT trên đúng 20% dữ liệu đó — một exercise đáng thử.

Dù vậy, nhìn kết quả:

* ViT feature extractor **lớn hơn khoảng 11 lần** EfficientNetB2.
* **Test accuracy gần như tương đương** (khoảng **93,84%** ở bản tốt nhất).
* Khác biệt thực sự chỉ là ViT có **test loss thấp hơn một chút**.

---

### 🤔 Câu hỏi lớn: có đáng không?

Đây là bài toán bạn sẽ luôn phải cân nhắc khi deploy:

* Trong deep learning, nhìn chung **model lớn hơn thì tốt hơn**.
* Nhưng nếu có **giới hạn compute**, model lớn có đáng để đưa vào production so với model nhỏ cho kết quả tương đương?

Nếu một model **nhỏ hơn 11 lần** mà vẫn cho kết quả tốt gần như vậy, rất có thể nên deploy model nhỏ hơn. Kỹ năng này chỉ đến từ **thực hành nhiều**.

---

### 🌐 Ví dụ thực tế: ứng dụng chạy trên trình duyệt

Mình đang làm một app tên **Nutrafol** dùng kỹ thuật tương tự Food Vision Mini. Tải ảnh pizza lên trình duyệt — **không có GPU** nào chạy phía sau — model vẫn dự đoán "pizza" và hiện thông tin dinh dưỡng khá nhanh.

Vậy câu hỏi: model **327 MB** sẽ mất bao lâu để tính toán và liệu trải nghiệm người dùng có tốt bằng một model nhỏ hơn **gần như tức thì** mà cho kết quả tương đương? Đây là điều cần nghĩ khi xây ứng dụng có AI.

---

### ✅ Tiếp theo

Ta sẽ **dự đoán trên ảnh custom** — giống Section 11 đã làm, nhưng thay vì EfficientNetB2 thì dùng **pre-trained ViT feature extractor** vừa train. Thử trước nhé, bài sau ta làm cùng nhau.
