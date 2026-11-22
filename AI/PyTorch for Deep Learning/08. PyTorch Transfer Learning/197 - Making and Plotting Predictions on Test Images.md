---
title: 'Dự đoán và vẽ kết quả trên ảnh test'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 197
status: edited
source: '197 - Making and Plotting Predictions on Test Images.md'
categories:
- AI
tags: []
---

# 🍽️ Dự đoán và vẽ kết quả trên ảnh test

> Nguồn: `197 - Making and Plotting Predictions on Test Images.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33021208)

Chào các bạn! Ta vừa viết `pred_and_plot_image` nhưng chưa chạy thử. Giờ ta **lấy ngẫu nhiên vài ảnh test**, cho qua hàm, xem model dự đoán đúng được bao nhiêu.

### 🎲 Chọn ngẫu nhiên ảnh test

```python
import random

num_images_to_plot = 3

test_image_path_list = list(Path(test_dir).glob("*/*.jpg"))
test_image_path_sample = random.sample(
    population=test_image_path_list,
    k=num_images_to_plot,
)
```

Giải thích:

* **`Path(test_dir).glob("*/*.jpg")`** — lấy mọi ảnh `.jpg` nằm trong các thư mục con (pizza/steak/sushi). `*/*` nghĩa là "một cấp thư mục rồi tới file".
* **`random.sample(population, k)`** — chọn ngẫu nhiên `k` phần tử **không lặp lại**.
* Test set có khoảng **75 ảnh**.

### 🔁 Chạy qua hàm

```python
for image_path in test_image_path_sample:
    pred_and_plot_image(
        model=model,
        image_path=image_path,
        class_names=class_names,
        image_size=(224, 224),
    )
```

`image_size` thực ra đã có mặc định, nhưng mình ghi rõ cho chắc.

### 🐛 Lỗi đầu tiên: format tensor

Chạy lần đầu, ta gặp:

```text
TypeError: unsupported format string passed to Tensor.__format__
```

Nguyên nhân: trong `plt.title`, ta dùng `target_image_pred_probs:.3f` — áp format lên **cả tensor** thay vì một giá trị float.

Cách sửa: lấy **giá trị lớn nhất** của tensor trước khi format.

```python
target_image_pred_probs.max()
```

Sau đó `:.3f` mới hoạt động. Mình in thử `target_image_pred_probs` để thấy nó là một tensor — đó là lý do.

Sửa xong, hàm chạy trơn.

### 📊 Kết quả

Vài ví dụ:

* Ảnh **steak** → dự đoán **steak** ✅
* Ảnh **sushi** → dự đoán **sushi** ✅
* Ảnh **pizza** → dự đoán **pizza** ✅
* Một ảnh **sushi** → dự đoán **steak** ❌

Model nhìn chung làm tốt, nhưng **vẫn sai vài ảnh**. Ví dụ ảnh sushi bị đoán thành steak. Điều này bình thường — model vẫn tốt hơn nhiều so với trước.

### 💡 Điều rút ra

* Đánh giá **định lượng** (accuracy, loss) và **định tính** (nhìn ảnh thật) bổ sung cho nhau.
* Một model 90% accuracy vẫn sai 10% — và nhìn tận mắt giúp hiểu nó sai kiểu gì.

### 🎯 Bài tập

Dự đoán trên **pizza_dad** — ảnh pizza nổi tiếng dùng suốt khóa. Tải ảnh từ repo xuống rồi đưa qua hàm. Hoặc dùng **ảnh pizza/steak/sushi của chính bạn**.

### ✅ Chốt lại

Hàm hoạt động, model dự đoán khá chuẩn trên ảnh chưa từng thấy. Video sau ta thử **ảnh custom** — phép thử thực sự của một model ML. Hẹn gặp!
