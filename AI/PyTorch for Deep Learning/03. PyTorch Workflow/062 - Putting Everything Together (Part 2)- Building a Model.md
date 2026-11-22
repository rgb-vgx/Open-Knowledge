---
title: 'Bài 62 — Ghép mọi thứ lại (Phần 2): Dựng model'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 62
status: edited
source: '062 - Putting Everything Together (Part 2)- Building a Model.md'
categories:
- AI
tags: []
---

# 🧩 Ghép mọi thứ lại (Phần 2): Dựng model

> Nguồn: `062 - Putting Everything Together (Part 2)- Building a Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32763704)

Đã có dữ liệu đường thẳng. Bước tiếp theo: dựng model. Lần này mình "chơi chiêu" một chút — không tự khởi tạo `weight`/`bias` nữa, mà dùng layer có sẵn của PyTorch. Đây mới là cách đa số model deep learning được viết.

### 🧱 Dùng `nn.Linear` thay vì tự tạo tham số

```python
class LinearRegressionModelV2(nn.Module):
    def __init__(self):
        super().__init__()
        # Use nn.Linear() for creating the model parameters
        self.linear_layer = nn.Linear(in_features=1,
                                      out_features=1)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.linear_layer(x)
```

Khác biệt cốt lõi so với model cũ: thay vì tự tạo `nn.Parameter` cho `weight`/`bias`, ta khai báo một **linear layer**. Layer tự tạo tham số bên trong cho mình.

`in_features=1, out_features=1` vì mỗi một `x` ứng với một `y`; đầu vào một feature, đầu ra một feature.

Theo tài liệu, `nn.Linear` **áp một phép biến đổi tuyến tính lên dữ liệu đầu vào**: `y = xA^T + b`. Đúng là công thức hồi quy tuyến tính với tên chữ khác đi — layer lo phần đó giúp mình.

Lưu ý thuật ngữ: linear layer còn gọi là **linear transform**, **probing layer**, **fully connected layer**, hay **dense layer** (TensorFlow). Nhiều tên, một phép toán.

---

### 🐛 Lỗi "không có tham số"

```python
torch.manual_seed(42)
model_1 = LinearRegressionModelV2()
model_1.state_dict()
```

Lần đầu `state_dict()` trống trơn, không có `weight`/`bias`. Nguyên nhân: hàm khởi tạo viết sai tên — `__int__` thay vì `__init__`. Vì sai tên nên constructor không chạy, layer không được tạo. Sửa lại đúng `__init__` là xong.

Bài học: nếu `state_dict()` rỗng, kiểm tra ngay tên `__init__` và `super().__init__()`.

---

### 🔍 Vì sao giá trị hơi khác dù đã seed?

`torch.manual_seed(42)` cho kết quả tái lập, nhưng `nn.Linear` bên trong dùng cách sinh số ngẫu nhiên riêng, nên giá trị không khớp với model tự khởi tạo trước đây. Không sao — quan trọng là cơ chế tạo tham số, không phải con số cụ thể.

---

### 🧠 Sự chuyển dịch quan trọng

| Model cũ (tự viết) | Model mới (`nn.Linear`) |
|---|---|
| Tự tạo `weight`, `bias` | Layer tự tạo tham số |
| Viết `weight * x + bias` trong `forward` | Chỉ cần `self.linear_layer(x)` |
| Học cách công thức hoạt động | Học cách lắp ghép layer |

Đây chính là cách phần lớn model PyTorch được viết: dùng các layer dựng sẵn trong `torch.nn` (convolutional, pooling, padding, normalization, recurrent, linear, dropout...) rồi nối chúng trong `forward`. Neural network bản chất là chồng các lớp biến đổi toán học.

---

### ✅ Tạm kết

Về cơ bản model V2 vẫn y hệt model cũ, chỉ khác ở chỗ dùng `nn.Linear` thay vì khởi tạo tay. Bước tiếp theo là train nó — đó là nội dung phần 3.
