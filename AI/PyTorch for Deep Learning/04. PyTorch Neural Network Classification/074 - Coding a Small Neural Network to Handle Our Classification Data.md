---
title: 'Code mạng neural nhỏ để xử lý dữ liệu phân loại'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 74
status: edited
source: '074 - Coding a Small Neural Network to Handle Our Classification Data.md'
categories:
- AI
tags: []
---

# 🧱 Code mạng neural nhỏ để xử lý dữ liệu phân loại

> Nguồn: `074 - Coding a Small Neural Network to Handle Our Classification Data.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32820606)

Device-agnostic code đã có. Giờ tới bước hai: **construct a model** bằng cách subclass `nn.Module`. Gần như mọi model trong PyTorch đều subclass `nn.Module` vì nó lo sẵn rất nhiều thứ hữu ích phía sau. Mình chia bước này thành bốn bước nhỏ.

### 🪜 Bốn bước con

1. **Subclass `nn.Module`**.
2. **Tạo hai lớp `nn.Linear`** có khả năng xử lý đúng shape dữ liệu.
3. **Định nghĩa `forward()`** — mô tả forward computation (forward pass) của model.
4. **Khởi tạo instance** của class và gửi nó lên **target device**.

### 📐 Bước 2: chọn `in_features` và `out_features`

```python
X_train.shape
# torch.Size([800, 2])
```

Có **800 mẫu train**, mỗi mẫu **2 feature**. Vậy lớp đầu vào phải nhận `in_features=2`. Nguyên tắc này giữ nguyên dù feature của các bạn dài 100, 10 hay hàng triệu số.

Muốn output một số như `y` (scalar), có thể để `out_features=1` với một lớp tuyến tính duy nhất. Nhưng mình muốn **hai lớp**, nên:

* Lớp 1: `in_features=2` → `out_features=5`.
* Lớp 2: `in_features=5` (phải khớp `out_features` lớp trước, nếu không sẽ **shape mismatch**) → `out_features=1`.

### 🧮 Vì sao nâng 2 feature lên 5?

Vì **nhiều hidden neuron hơn thì model có nhiều cơ hội học pattern hơn**. Ban đầu model chỉ có 2 con số để bám vào; nâng lên 5 thì có 5 con số. Các bạn thắc mắc sao không phang luôn 10.000? Vì lợi ích tăng dần rồi chững lại — có ngưỡng trên. Mình dùng **5** cho đơn giản.

`5` là con số tùy chọn, có thể là 128, 256… Thông thường người ta dùng **bội số của 8** (5 → 8) vì hiệu quả tính toán trên phần cứng — đây chỉ là rule of thumb, mình không rành phần cứng để giải thích cặn kẽ.

Mỗi lớp `nn.Linear` thực hiện một phép biến đổi tuyến tính trên input rồi nhân với ma trận trọng số để ra `out_features`.

### ⌨️ Viết class

```python
class CircleModelV0(nn.Module):
    def __init__(self):
        super().__init__()
        # 2 -> 5: take in 2 features, output 5 features
        self.layer_1 = nn.Linear(in_features=2, out_features=5)
        # 5 -> 1: take in 5 features, output 1 feature
        self.layer_2 = nn.Linear(in_features=5, out_features=1)

    def forward(self, x):
        # x -> layer_1 -> layer_2 -> output
        return self.layer_2(self.layer_1(x))
```

Đường đi rất rõ: `x` vào `layer_1` (phép tính tuyến tính), kết quả đổ vào `layer_2`, rồi ra output. Output 1 feature chính là shape ta muốn, khớp với `y`.

### 🚀 Bước 4: khởi tạo và gửi lên device

```python
model_0 = CircleModelV0().to(device)
model_0
```

Nếu quên `self` trong `def __init__(self)` sẽ gặp lỗi — mình dính ngay lần đầu. Đó là lỗi gõ tay kinh điển. Lợi ích của việc đóng gói thành class: có thể đưa vào file `model.py` và tái sử dụng, khỏi viết lại.

Kiểm tra model đã lên GPU chưa:

```python
next(model_0.parameters()).device
# device(type='cuda', index=0)
```

`next(model_0.parameters())` lấy parameter đầu tiên, `.device` cho biết nó nằm trên **CUDA** — nhờ Colab cho mượn GPU đấy. Bài sau mình sẽ vẽ hình để thấy rõ bên trong model thực sự diễn ra gì.
