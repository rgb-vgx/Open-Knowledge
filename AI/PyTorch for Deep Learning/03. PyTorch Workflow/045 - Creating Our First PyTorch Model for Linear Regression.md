---
title: 'Bài 45 — Tạo model PyTorch đầu tiên cho hồi quy tuyến tính'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 45
status: edited
source: '045 - Creating Our First PyTorch Model for Linear Regression.md'
categories:
- AI
tags: []
---

# 🧱 Tạo model PyTorch đầu tiên cho hồi quy tuyến tính

> Nguồn: `045 - Creating Our First PyTorch Model for Linear Regression.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32699334)

Đây rồi, khoảnh khắc đáng mong chờ: viết model PyTorch đầu tiên. Mình sẽ dựng một model hồi quy tuyến tính "thuần" PyTorch, có `weight`, có `bias` và có phép tính forward. Mục tiêu: bắt đầu từ tham số ngẫu nhiên rồi chỉnh dần để khớp với đường thẳng thật.

### ⚙️ Nhắc lại công thức cần học

Model cần chạy đúng phép tính `y = weight * X + bias`. Nghĩa là nó phải có một tham số cho weight, một tham số cho bias, và một cách thực hiện phép tính **forward**. Đó chính là công thức mình đã dùng để tạo dữ liệu ở bài 42.

---

### 🧰 `nn.Module` — viên gạch Lego của PyTorch

```python
import torch
from torch import nn

class LinearRegressionModel(nn.Module):
```

Class của mình kế thừa từ `nn.Module`. Gần như mọi thứ trong PyTorch đều kế thừa từ nó — tài liệu chính thức mô tả `nn.Module` là **base class cho mọi neural network module**, và khuyến nghị model của bạn cũng nên kế thừa class này.

Có thể hình dung `nn.Module` như viên gạch Lego: module có thể chứa module khác, xếp chồng lên nhau để tạo mạng ngày càng phức tạp. Bây giờ mình bắt đầu đơn giản trước.

---

### 🔥 Khởi tạo tham số ngẫu nhiên

```python
    def __init__(self):
        super().__init__()
        self.weight = nn.Parameter(torch.randn(1,
                                               requires_grad=True,
                                               dtype=torch.float))
        self.bias = nn.Parameter(torch.randn(1,
                                             requires_grad=True,
                                             dtype=torch.float))
```

`super().__init__()` là cú pháp Python bắt buộc khi kế thừa — cứ làm theo, đọc thêm tài liệu sau.

`nn.Parameter` theo docs là **một loại tensor thường được coi là tham số của module**. Khi gán làm thuộc tính của module, nó tự động được thêm vào danh sách tham số và xuất hiện trong `module.parameters()`. Gán một tensor thường thì không có hiệu ứng đó.

Các tham số của `nn.Parameter`:

* `torch.randn(1)` — khởi tạo ngẫu nhiên, chuẩn normal.
* `requires_grad=True` — yêu cầu tính gradient cho tham số này.
* `dtype=torch.float` — tức `torch.float32`, kiểu mặc định PyTorch thích dùng.

Lưu ý: `requires_grad=True` thực ra là **mặc định** của `nn.Parameter`, nên không nhất thiết phải ghi ra.

---

### 🚀 Hàm `forward`

```python
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.weight * x + self.bias
```

`x` là input data (ở đây là training data, kiểu `torch.Tensor`), hàm trả về tensor. Và biểu thức trả về chính là công thức hồi quy tuyến tính quen thuộc.

---

### 🧠 Model học bằng cách nào?

Khi tạo dữ liệu, mình **biết** weight và bias là bao nhiêu. Còn model thì bắt đầu bằng **số ngẫu nhiên**, nhìn vào training data rồi chỉnh dần để tiến gần các giá trị lý tưởng.

Quy trình:

1. Bắt đầu với `weight` và `bias` ngẫu nhiên.
2. Nhìn vào training data.
3. Chỉnh các giá trị ngẫu nhiên để biểu diễn đường thẳng ngày càng đúng hơn.

Việc chỉnh này diễn ra nhờ hai thuật toán chính: **gradient descent** và **backpropagation**. Đó là lý do có `requires_grad=True`: khi chạy phép tính qua model, PyTorch sẽ theo dõi gradient của `weight` và `bias` rồi cập nhật chúng.

Tin tốt: PyTorch đã cài sẵn hai thuật toán này, mình chỉ viết code bậc cao để kích hoạt chúng.

---

### 🛠 Mẹo Colab khi quay lại sau khi nghỉ

Nếu bạn rời Colab một lúc rồi quay lại, runtime có thể đã ngắt kết nối và biến bị mất. Bấm **Reconnect**, hoặc dùng **Restart and run all** — một trong những bước troubleshooting hữu ích nhất khi một cell báo lỗi vì cell phía trên chưa được chạy.

---

### ✅ Tạm kết

Model đầu tiên đã xong: có tham số, có forward, sẵn sàng để học. Bài sau mình sẽ mổ xẻ từng dòng xem thực sự có gì bên trong — và giới thiệu thêm vài module quan trọng khác của PyTorch.
