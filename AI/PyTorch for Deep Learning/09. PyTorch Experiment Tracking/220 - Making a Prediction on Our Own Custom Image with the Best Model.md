---
title: 'Dự đoán trên ảnh custom với model tốt nhất'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 220
status: edited
source: '220 - Making a Prediction on Our Own Custom Image with the Best Model.md'
categories:
- AI
tags: []
---

# 🍕 Dự đoán trên ảnh custom với model tốt nhất

> Nguồn: `220 - Making a Prediction on Our Own Custom Image with the Best Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33132630)

Ta đã thấy best model làm tốt thế nào. Trước khi kết thúc section, thử thêm ba ảnh test ngẫu nhiên: pizza, pizza, sushi — hơi tiếc là sai một ảnh (pizza đoán nhầm). Model vẫn còn chỗ cải thiện, mình để phần đó cho bạn. Giờ đến phần chính: dự đoán trên **ảnh custom** của mình.

### 🖼️ Ảnh "pizza dad"

Mình khuyến khích bạn thử trên ảnh riêng, nhưng bài này dùng **ảnh pizza dad** quen thuộc — ảnh bố mình đang ăn pizza. Đây là ảnh đã được dùng để test model xuyên suốt khóa học, giữ cho nhất quán.

### ⬇️ Tải ảnh vào Colab

Ta tái dùng code tải ảnh từ bài transfer learning: dùng `requests` tải về nếu chưa có. Lần này code báo lỗi **`data_path is not defined`** — hóa ra ta chưa định nghĩa `data_path`. Đúng là "cái lần duy nhất mình nói không cần xem lại code thì lại phải xem".

Sửa bằng cách tạo path thủ công:

```python
from pathlib import Path

custom_image_path = Path("data/pizza_dad.jpeg")
```

Rồi chạy lại code tải ảnh, nó ghi nội dung ra `custom_image_path`. Ảnh đã có.

### 🔮 Dự đoán

```python
pred_and_plot_image(model=best_model,
                    image_path=custom_image_path,
                    class_names=class_names)
```

Chạy — và **hai ngón tay cái giơ lên**! Model dự đoán **pizza** với xác suất **0.982**.

### 🎯 So sánh độ "tự tin"

Wow — đây có vẻ là model **tự tin nhất** từ trước tới giờ. Nhớ lại section transfer learning trước: EffNetB0 trên 10% dữ liệu, 5 epoch cho xác suất dự đoán gần như **chỉ bằng một nửa** con số này.

Cần phân biệt: xác suất cao hơn **không có nghĩa là đúng hơn** — chỉ là model **tự tin hơn**. Nhưng theo mình, điều đó gợi ý rằng các pattern nó học được **tốt hơn** các model trước.

### ✅ Tạm kết

Bạn thử upload ảnh custom của mình và xem best model phân loại pizza/steak/sushi thế nào nhé. Vậy là ta đã viết xong toàn bộ code cho milestone project đầu tiên: tải dữ liệu, xem experiment một model với TensorBoard, dựng loạt experiment, chạy 8 model trong 5 phút, và dự đoán bằng model tốt nhất. Tự hào về bản thân đi! Video sau ta tổng kết main takeaways, bài tập và extra curriculum. Hẹn gặp!
