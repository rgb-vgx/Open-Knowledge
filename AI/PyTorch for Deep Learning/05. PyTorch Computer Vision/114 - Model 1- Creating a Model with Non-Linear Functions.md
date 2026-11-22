---
title: 'Bài 114 — Model 1: xây model có các hàm phi tuyến'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 114
status: edited
source: '114 - Model 1- Creating a Model with Non-Linear Functions.md'
categories:
- AI
tags: []
---

# 🔀 Model 1: xây model có các hàm phi tuyến

> Nguồn: `114 - Model 1- Creating a Model with Non-Linear Functions.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920336)

Ta đang ở bước **improve through experimentation**. Baseline đạt 83% mà không có phi tuyến. Vậy nếu thêm phi tuyến thì sao? Bài này mình dựng Model 1 — y hệt Model 0 nhưng chèn các lớp `ReLU` — rồi đẩy lên GPU.

### 🧠 Vì sao cần phi tuyến?

Trong notebook section 2 có phần "The missing piece: non-linearity": nếu dữ liệu không phải đường thẳng, model chỉ có đường thẳng sẽ không mô phỏng nổi. Kết hợp **linear + non-linear** đúng cách có thể mô hình hóa gần như mọi loại dữ liệu.

Nhưng nhìn ảnh bag thì có vẻ khá "thẳng" — toàn đường thẳng. Vậy phi tuyến có giúp ích không? Không biết trước. Đó là phần **experimentation**: thử rồi xem.

---

### 📐 `ReLU` hoạt động thế nào?

**ReLU** (Rectified Linear Unit) là activation phi tuyến:

* Input âm → biến thành **0**.
* Input dương → giữ nguyên.

Chỉ vậy thôi, nhưng đủ để model học được đường gấp khúc thay vì đường thẳng.

---

### 🏗️ Code Model 1

```python
class FashionMNISTModelV1(nn.Module):
    def __init__(self, input_shape: int, hidden_units: int, output_shape: int):
        super().__init__()
        self.layer_stack = nn.Sequential(
            nn.Flatten(),
            nn.Linear(in_features=input_shape, out_features=hidden_units),
            nn.ReLU(),
            nn.Linear(in_features=hidden_units, out_features=output_shape),
            nn.ReLU(),
        )

    def forward(self, x: torch.Tensor):
        return self.layer_stack(x)
```

So với Model 0, chỉ thêm hai lớp `nn.ReLU()`. Thứ tự thường thấy là **linear → non-linear**, lặp lại. Nhưng neural network linh hoạt vô cùng — vấn đề chỉ là có hiệu quả hay không.

Lưu ý: ReLU **không đổi shape** dữ liệu. Bạn có thể in shape trước/sau để kiểm chứng. Vì vậy `out_features` của linear này vẫn phải khớp `in_features` của linear kia.

Nếu bỏ hai lớp ReLU đi, ta quay đúng về Model 0 — đây là cách hay để thấy mình chỉ thêm đúng hai dòng.

---

### ⚙️ Khởi tạo và đẩy lên GPU

```python
torch.manual_seed(42)

model_1 = FashionMNISTModelV1(
    input_shape=784,
    hidden_units=10,
    output_shape=len(class_names),
).to(device)
```

Set manual seed để model khởi tạo với cùng bộ số ngẫu nhiên mỗi lần, giúp kết quả giữa máy bạn và máy mình gần nhau hơn.

`input_shape=784` vẫn là `28 * 28` — output của Flatten.

Kiểm tra model đang ở đâu:

```python
next(model_1.parameters()).device
# device(type='cuda', index=0)
```

`index=0` nghĩa là GPU đầu tiên — máy chỉ có một Tesla T4 nên model nằm trên đó.

---

### 💡 Class linh hoạt như function

Nhấn mạnh: class cũng linh hoạt như function. Cần thêm use case khác cho model class thì cứ thêm tham số, thêm logic vào `__init__`. Đừng ngại.

---

### ✅ Tạm kết

Model 1 = Model 0 + hai lớp ReLU, đang sống trên GPU. Câu hỏi treo: nó có vượt được 83.4%? Bài sau mình tạo loss function và optimizer cho nó — gợi ý: y hệt Model 0.
