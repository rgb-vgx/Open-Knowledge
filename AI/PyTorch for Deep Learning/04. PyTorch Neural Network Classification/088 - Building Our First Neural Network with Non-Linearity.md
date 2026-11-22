---
title: 'Bài 88 — Xây neural network đầu tiên có non-linearity'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 88
status: edited
source: '088 - Building Our First Neural Network with Non-Linearity.md'
categories:
- AI
tags: []
---

# ⚡ Xây neural network đầu tiên có non-linearity

> Nguồn: `088 - Building Our First Neural Network with Non-Linearity.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32869492)

Sẵn sàng chưa? Giờ mình thêm mảnh ghép "phép thuật" — **non-linearity** — vào model. Nhắc lại: **linear = đường thẳng**, **non-linear = không thẳng**. Và thử thách bài trước: trong `torch.nn`, hàm phi tuyến nào mình đã dùng rồi? Đáp án là **sigmoid** — mình dùng nó để biến logits thành xác suất.

### 🧰 Non-linear activations trong `torch.nn`

`torch.nn` có gần như đủ mọi thứ dùng được làm hidden layer: pooling, padding, activation… Tất cả cùng một nguyên lý — **thực hiện một phép toán trên input**. Mục **non-linear activations** chứa `nn.Sigmoid`, `nn.ReLU`, và nhiều hàm khác. Mỗi hàm đều có ví dụ kèm theo, các bạn tự khám phá trong tài liệu.

Về lý thuyết, hidden layer có thể là **gần như bất kỳ tổ hợp** các module trong `torch.nn` — thậm chí bất kỳ hàm nào các bạn nghĩ ra; chỉ có điều nó có học được không thôi.

---

### 🔦 ReLU: đơn giản mà hiệu quả

**ReLU** — *rectified linear unit* — làm đúng một việc **theo từng phần tử** (element-wise):

* Input **âm** → biến thành **0**.
* Input **dương** → giữ nguyên.

Trông như hai đoạn thẳng ghép lại, nhưng kết quả không phải một đường thẳng — nên đây là **non-linear activation**. Mình không phải tự code: chỉ cần `nn.ReLU()`. Về cơ bản không thể đơn giản hơn.

---

### 🏗️ `CircleModelV2`

```python
class CircleModelV2(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer_1 = nn.Linear(in_features=2, out_features=10)
        self.layer_2 = nn.Linear(in_features=10, out_features=10)
        self.layer_3 = nn.Linear(in_features=10, out_features=1)
        self.relu = nn.ReLU()  # non-linear activation

    def forward(self, x):
        # Put relu between each layer
        return self.layer_3(self.relu(self.layer_2(self.relu(self.layer_1(x)))))

model_3 = CircleModelV2().to(device)
```

Điểm cốt lõi: **đặt non-linear activation giữa mỗi layer**.

1. `x` vào `layer_1` → phép biến đổi tuyến tính.
2. Output của `layer_1` qua **ReLU** — mọi giá trị âm thành 0, giữ phần dương.
3. Output đó vào `layer_2`, rồi qua **ReLU** lần nữa.
4. Output đổ vào `layer_3` — layer output, **không** đặt ReLU sau nó.

Vì sao không đặt ReLU ở cuối? Vì output cuối là **logits**, muốn giữ nguyên để sau đó mình áp **sigmoid** biến thành xác suất. Có thể đặt `self.sigmoid = nn.Sigmoid()` ngay trong model, nhưng mình chọn áp sigmoid riêng lên logits — lấy lại đúng vai trò "logits là đầu ra thô".

Với **2 hidden layer × 10 hidden unit** và ReLU chen giữa, model giờ có sức mạnh vẽ **đường cong** — khác hẳn mấy cái "chỉ đường thẳng" trước đó.

---

### 🎯 Thử thách kép

1. Tự viết **training code** cho `model_3` trên dữ liệu vòng tròn và xem nó có học được không (mình sẽ làm cùng nhau ở các bài sau).
2. Lên **TensorFlow Playground**, dựng lại mạng tương tự: **2 hidden layer**, đổi activation từ **Linear** sang **ReLU**, learning rate **0.1**, rồi bấm Play. Nhìn xem các đường ranh giới uốn cong thế nào.

> ⚠️ Cần kiểm chứng: transcript nhắc cả learning rate **0.01** và **0.1** cho TensorFlow Playground; bài giữ **0.1** theo câu "we've been using 0.1, so we'll leave that".
