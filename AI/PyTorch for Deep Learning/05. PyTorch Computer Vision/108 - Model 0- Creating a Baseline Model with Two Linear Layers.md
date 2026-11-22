---
title: 'Bài 108 — Model 0: baseline model với hai lớp linear'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 108
status: edited
source: '108 - Model 0- Creating a Baseline Model with Two Linear Layers.md'
categories:
- AI
tags: []
---

# 🏁 Model 0: baseline model với hai lớp linear

> Nguồn: `108 - Model 0- Creating a Baseline Model with Two Linear Layers.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920324)

Đây là model computer vision đầu tiên của chúng ta — tuy chỉ là baseline. Nguyên tắc khi bắt đầu một chuỗi thí nghiệm: **đi từ đơn giản, thêm phức tạp khi cần**. Neural network rất mạnh, có xu hướng làm quá tốt trên tập train (**overfitting**), nên cần một mốc đơn giản để so sánh.

### 🎯 Baseline model là gì?

Baseline là một model đơn giản mà các model sau sẽ cố vượt qua. Workflow vẫn vậy: chuẩn bị data → dựng model → fit → evaluate → cải thiện. Model đầu tiên thường là baseline, sau đó mới "improve through experimentation".

### 🧱 Lớp mới: `nn.Flatten()`

`nn.Flatten` "flattens a contiguous range of dims into a tensor, for use with `Sequential`". Nghĩa là nó ép một tensor nhiều chiều thành vector một chiều.

Mình thử ngay với một mẫu:

```python
flatten_model = nn.Flatten()

x = train_features_batch[0]  # shape [1, 28, 28]

output = flatten_model(x)
print(f"Shape before flattening: {x.shape}")    # [1, 28, 28]
print(f"Shape after flattening: {output.shape}") # [1, 784]
```

Vì sao `784`? Vì `28 x 28 = 784` — mỗi pixel thành một giá trị trong vector. Đây chính là ý tưởng "nén thông tin vào một vector space" mà ta đã thấy ở ví dụ Tesla đưa môi trường quanh xe thành vector.

Tại sao phải flatten? Vì **linear layer không nhận dữ liệu nhiều chiều** — nó cần một vector làm input.

### 🏗️ Code Model 0

```python
from torch import nn

class FashionMNISTModelV0(nn.Module):
    def __init__(self, input_shape: int, hidden_units: int, output_shape: int):
        super().__init__()
        self.layer_stack = nn.Sequential(
            nn.Flatten(),
            nn.Linear(in_features=input_shape, out_features=hidden_units),
            nn.Linear(in_features=hidden_units, out_features=output_shape),
        )

    def forward(self, x):
        return self.layer_stack(x)
```

Điểm cần nhớ: **output của lớp trước phải khớp input của lớp sau**. Vì vậy `out_features=hidden_units` ở lớp đầu trùng với `in_features=hidden_units` ở lớp thứ hai.

Model này = flatten + hai linear layer, **không có hàm phi tuyến**. Não của nó là hai phép nhân ma trận nối tiếp.

### ⚙️ Khởi tạo model

```python
torch.manual_seed(42)

model_0 = FashionMNISTModelV0(
    input_shape=784,          # 28 * 28
    hidden_units=10,
    output_shape=len(class_names),
).to("cpu")
```

`input_shape=784` vì đó là output của `Flatten`. `output_shape` là số lớp (10). Ban đầu mình để model trên **CPU**, sẽ chuyển sang GPU sau để so sánh tốc độ.

### 🧪 Dummy forward pass

Đây là cách troubleshoot nhanh nhất: tạo input giả đúng shape rồi cho qua model.

```python
dummy_x = torch.rand(size=(1, 28, 28))
model_0(dummy_x)
```

Kết quả: tensor shape `[1, 10]` — **một giá trị logit cho mỗi lớp**. Chính xác cái mình muốn.

Giờ thử phá xem sao:

* **Bỏ `Flatten`** → lỗi `mat1 and mat2 shapes cannot be multiplied (1x784 and 28x10)`. Vì linear layer cần vector, không nhận ma trận 28x28.
* **Đổi `input_shape=28`** → ra shape `[1, 28, 10]`, tức 28 "mẫu" mỗi cái 10 logit — sai hoàn toàn. Ta cần nén ảnh thành **một** vector duy nhất.

Đó là lý do `Flatten` tồn tại.

### 💡 Bài học về lỗi shape

Lỗi phổ biến nhất khi làm ML là **tensor shape mismatch**. Cách phòng: luôn biết shape dữ liệu đang ở đâu, và đọc docs xem layer mong đợi input shape gì. Ban đầu hơi vất vả, nhưng khi chạy được thì rất vui.

### ✅ Tạm kết

Model 0 đã có: flatten + hai linear layer, xuất ra 10 logit. Nó chưa có phi tuyến và chưa được train. Bài sau mình chọn loss function và optimizer để bắt đầu train.
