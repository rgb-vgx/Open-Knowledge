---
title: 'Load model tốt nhất và dự đoán trên ảnh test'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 219
status: edited
source: '219 - Loading the Best Model and Making Predictions on Random Images from th.md'
categories:
- AI
tags: []
---

# 🥇 Load model tốt nhất và dự đoán trên ảnh test

> Nguồn: `219 - Loading the Best Model and Making Predictions on Random Images from th.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33132626)

Ta đã xem kết quả experiment tracking với TensorBoard. Giờ đến phần vui nhất: **load model tốt nhất** và dự đoán. Nếu muốn, bạn pause video lại và tự thử trước — load model tốt nhất, làm theo phần dưới, và dự đoán trên ảnh từ test set.

### 🗂️ Xác định best model

Ta đã chốt best model là **EffNetB2, pizza/steak/sushi 20%, 10 epoch**. Lấy đường dẫn file:

```python
best_model_path = "models/07_effnetb2_pizza_steak_sushi_20_percent_10_epochs.pth"
```

Tên hơi dài nhưng đó là best model của ta.

---

### 🔄 Load state dict vào model mới

Vì hàm `save_model` lưu **state dictionary**, ta cần tạo một instance EffNetB2 mới rồi load:

```python
best_model = create_effnetb2()
best_model.load_state_dict(torch.load(best_model_path))
```

Chạy xong, các key khớp hết — thành công. Giờ trong tay đã có best model.

---

### 📏 Kiểm tra kích thước model

Đây là "sound check" quan trọng. Nhớ mục tiêu: model đạt **~95% test accuracy** và **chạy được trên mobile/web**. Giống kiểu NutriFact app chạy trực tiếp trên browser. Vì ảnh đồ ăn thường chụp bằng điện thoại, model không thể quá lớn.

```python
from pathlib import Path

effnetb2_model_size = Path(best_model_path).stat().st_size // (1024 * 1024)
print(f"EffNetB2 feature extractor model size: {effnetb2_model_size} MB")
```

`stat().st_size` trả về số byte, chia cho `1024 * 1024` để đổi sang **MB**. Kết quả: khoảng **29 MB** — một con số hợp lý. Không muốn model cỡ **gigabyte**, cũng không muốn quá nhỏ đến mức mất hiệu năng.

---

### 🖼️ Dự đoán trên ảnh test ngẫu nhiên

Dùng hàm `pred_and_plot_image` đã viết ở section 6, giờ nằm trong `predictions.py` của going modular — import một dòng thay cho ~80 dòng code:

```python
from going_modular.predictions import pred_and_plot_image
import random

num_images_to_plot = 3
test_image_path_list = list(Path(data_20_percent_path / "test").glob("*/*.jpg"))
test_image_path_sample = random.sample(population=test_image_path_list,
                                       k=num_images_to_plot)

for image_path in test_image_path_sample:
    pred_and_plot_image(model=best_model,
                        image_path=image_path,
                        class_names=class_names,
                        image_size=(224, 224))
```

Hàm nhận `model`, đường dẫn ảnh, `class_names` và `image_size` (mặc định 224). `random.sample` lấy ngẫu nhiên 3 ảnh.

---

### 🍕 Kết quả

Ba... hai... một... chạy! Có một ảnh bị đoán sai (pizza thay vì steak), còn lại đúng. Chạy thêm vài lần với ảnh khác: steak/steak/sushi đúng, pizza/steak/sushi đúng... Trong khoảng **12 ảnh chỉ sai 1** — khá ấn tượng với ~95% accuracy. Model làm rất tốt!

---

### ✅ Tạm kết

Best model đang dự đoán cực ổn trên test set. Phần cuối: dự đoán trên **ảnh custom** — ảnh không nằm trong test set. Ta sẽ dùng ảnh "pizza dad" quen thuộc. Bạn có thể tự thử trước bằng hàm trên. Video sau ta xem liệu model có phân loại đúng không. Hẹn gặp!
