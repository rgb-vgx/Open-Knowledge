---
title: 'Dự đoán trên một ảnh custom'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 198
status: edited
source: '198 - Making a Prediction on a Custom Image.md'
categories:
- AI
tags: []
---

# 📷 Dự đoán trên một ảnh custom

> Nguồn: `198 - Making a Prediction on a Custom Image.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33021210)

Chào các bạn! Video trước ta dự đoán trên ảnh test và thấy model làm khá tốt. Nhưng **phép thử thực sự** của một model ML là dự đoán trên **dữ liệu của chính bạn**. Hôm nay ta thử với ảnh **pizza_dad**.

### 🖼️ Tải ảnh custom

```python
custom_image_path = data_path / "04-pizza-dad.jpeg"

if not custom_image_path.is_file():
    with open(custom_image_path, "wb") as f:
        request = requests.get("https://raw.githubusercontent.com/mrdbourke/pytorch-deep-learning/main/images/04-pizza-dad.jpeg")
        print(f"Downloading {custom_image_path}...")
        f.write(request.content)
else:
    print(f"{custom_image_path} already exists, skipping download.")
```

Lưu ý quen thuộc:

* Dùng **raw URL** của GitHub.
* Mở file chế độ **binary** (`"wb"`).
* Ghi **`request.content`** vào file.

Ảnh này khá lớn — Colab có thể hơi lâu mới hiển thị. Kiên nhẫn chút nhé: đó là bố mình và một cái pizza.

---

### 🔮 Dự đoán

Ảnh lớn không sao, vì `pred_and_plot_image` sẽ **tự format** về đúng kích thước model cần (224×224).

```python
pred_and_plot_image(
    model=model,
    image_path=custom_image_path,
    class_names=class_names,
)
```

---

### 📊 Kết quả

Model dự đoán: **pizza**, xác suất **0.517**.

Đừng lo nếu con số của bạn hơi khác — miễn model dự đoán **đúng class** là được.

---

### 🥊 So với TinyVGG

Ở section 04, TinyVGG cũng đoán đúng **pizza**, nhưng xác suất chỉ **0.373**. Như vậy transfer learning model **tự tin hơn** với dự đoán đúng. Đây là tín hiệu tốt.

Toàn bộ quá trình: lấy EfficientNet B0 làm backbone, đóng băng nó, customize cho pizza/steak/sushi, rồi dùng pattern học từ ImageNet + dữ liệu riêng để dự đoán **ảnh "ngoài đời"**.

---

### 🌍 Ứng dụng thật

Đây chính là kiểu model mình dùng trong sản phẩm thật của mình: chụp ảnh món ăn và nhận thông tin về nó. Trang web chạy EfficientNet B0, upload ảnh pizza_dad sẽ ra dự đoán **pizza** và thông tin dinh dưỡng.

Ứng dụng đó hiện hỗ trợ khoảng **100 món**, và sẽ tăng dần. Food Vision Mini mới làm được **3 món** — bạn có thể mở rộng bằng cách thêm dữ liệu train và xem transfer learning làm tốt tới đâu.

Nhớ rằng ta chỉ có khoảng **70 ảnh train mỗi class** — rất ít trong bối cảnh deep learning. Đó chính là sức mạnh của transfer learning.

---

### ✅ Chốt lại

Model dự đoán đúng ảnh custom với độ tự tin cao hơn hẳn model cũ. Bạn hãy thử với **ảnh món ăn của mình** — mình rất muốn xem kết quả! Video sau ta tổng kết và bàn bài tập. Hẹn gặp!
