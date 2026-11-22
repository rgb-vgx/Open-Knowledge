---
title: 'Biến code xây model thành Python script'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 176
status: edited
source: '176 - Turning Our Model Building Code into a Python Script.md'
categories:
- AI
tags: []
---

# 🏗️ Biến code xây model thành Python script

> Nguồn: `176 - Turning Our Model Building Code into a Python Script.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32820622)

Chào các bạn! Video trước ta có script đầu tiên `data_setup.py` tạo train/test dataloader và trả về class names. Giờ ta làm điều tương tự với phần **xây model**.

### 🧠 Model dùng lại từ notebook 4

Đây vẫn là model **TinyVGG** đã dùng ở section trước, nên mình không đi sâu vào kiến trúc — chỉ tập trung cách biến nó thành script.

Chạy cell tạo model, ta được:

* Một instance TinyVGG.
* Có thể dùng **operator fusion** (một kỹ thuật tăng tốc, thuộc nội dung bài "make your models go brrr").
* Device-agnostic code.
* Một **dummy forward pass** để chắc model chạy được.

### 📄 Tạo `model_builder.py`

Trước hết thử xem magic hoạt động thế nào:

```python
%%writefile going_modular/model_builder.py
print("Hello, I'm about to build a model")
```

Chạy cell, file `model_builder.py` xuất hiện với đúng một dòng print. Và vì đây là Python program thật, ta có thể chạy:

```bash
python going_modular/model_builder.py
```

Nó sẽ in ra dòng đó. Đây chính là ý tưởng của `train.py` sau này: một script chạy được từ command line.

### 📋 Chép code model vào script

Thay vì viết lại toàn bộ kiến trúc, mình chép cell model phía trên vào. Nhớ thêm:

* Docstring đầu file: *"Contains PyTorch model code to instantiate a TinyVGG model from the CNN Explainer website."*
* Import `torch` và `nn` (dùng `from torch import nn`).

Sau khi ghi đè, mở `model_builder.py` ra sẽ thấy đủ docstring và class `TinyVGG`.

### 🔬 Kiểm tra bằng dummy forward pass

Giờ dùng script thay cho cell cũ:

```python
from going_modular import model_builder

device = "cuda" if torch.cuda.is_available() else "cpu"

model_1 = model_builder.TinyVGG(
    input_shape=3,
    hidden_units=10,
    output_shape=len(class_names),
).to(device)
```

Mình cố tình đặt `hidden_units=10` như các section trước, `output_shape=len(class_names)`.

Điểm hay: gõ `model_builder.TinyVGG` và xem docstring — ta thấy mô tả kiến trúc, cùng **Args** `input_shape`, `hidden_units`, `output_shape`. Đó là docstring mình viết trong class theo Google style.

Sau đó chạy dummy forward pass y như code cũ, nhưng dùng `model_1` lấy từ script. Không lỗi — tuyệt!

### 💡 Vì sao đây là sức mạnh của going modular

Nhớ lại lần đầu viết TinyVGG mất bao lâu, và ta đã viết đi viết lại mấy lần. Giờ có `model_builder.py`, chỉ cần import là có model sẵn dùng. Bạn có thể dùng file này cho bất kỳ model PyTorch nào tương tự.

Đây cũng là workflow thực tế của mình: thí nghiệm trong notebook, khi đã chạy được thì **lưu thành script** để dùng lại nhiều lần.

### ➡️ Bước tiếp theo

Các hàm `train_step`, `test_step`, `train` hiện vẫn nằm trong notebook — chỉ khác là đã có docstring. Ta sẽ đưa cả ba vào một script tên **`engine.py`**, vì chúng chính là "động cơ" chạy việc train.

### ✅ Chốt lại

`model_builder.py` hoàn tất, dummy forward pass chạy ổn. Bài tập: thử tự viết docstring Google style cho `train_step`, `test_step`, `train` trước khi ta tách chúng ra. Hẹn gặp ở video sau!
