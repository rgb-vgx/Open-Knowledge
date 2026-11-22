---
title: 'Tải data cho Food Vision Mini'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 227
status: edited
source: '227 - Downloading Data for Food Vision Mini.md'
categories:
- AI
tags: []
---

# 📥 Tải data cho Food Vision Mini

> Nguồn: `227 - Downloading Data for Food Vision Mini.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975302)

Bài này không có gì mới về kỹ thuật, nhưng mình vẫn làm cho đủ quy trình. Mục tiêu của cả notebook: replicate **ViT** (Vision Transformer) — một kiến trúc computer vision — cho bài **Food Vision Mini**. Đây cũng là **Milestone Project 2**, nên mình ghi luôn lên đầu notebook.

### 🍕 Vì sao lại dùng đúng bộ data cũ?

Paper ViT nói rằng vision transformer đạt kết quả so với **state of the art convolutional neural networks** mà lại cần **ít tài nguyên tính toán hơn đáng kể** để train. Nghe hấp dẫn đúng không? Nếu đang làm một bài toán computer vision, chẳng lẽ lại không thử kiến trúc mới này trên data của mình.

Mình dùng lại đúng bộ ảnh **pizza, steak, sushi** như các section trước — để so sánh **apples to apples**, tức cùng một bộ data thì mới so sánh được công bằng giữa các model trên ảnh pizza, steak, sushi.

---

### ⬇️ Gọi hàm download

`download_data` là helper function nằm trong `helper_functions.py`, mình đã viết từ section 7 (Experiment Tracking). Cách dùng:

```python
from helper_functions import download_data

image_path = download_data(
    source="https://github.com/mrdbourke/pytorch-deep-learning/raw/main/data/pizza_steak_sushi.zip",
    destination="pizza_steak_sushi",
)
```

Chạy xong phải nhận lại một `image_path`. Nếu không chắc thì cứ chạy thử — "if in doubt, run the code". Download không lâu, và ta có cấu trúc `train` / `test` với ba class **pizza, steak, sushi**.

---

### 🛣️ Tạo train/test path

Cuối bài, tạo hai biến đường dẫn quen thuộc:

```python
train_dir = image_path / "train"
test_dir = image_path / "test"
```

Vậy là data đã sẵn sàng cho toàn bộ project.

---

### ✅ Chốt lại

Ta đã có data. Bước tiếp theo là biến ảnh thành **DataLoader**. Các bạn có thể thử trước bằng `create_dataloaders` trong `data_setup.py` — bài sau mình làm cùng nhau.
