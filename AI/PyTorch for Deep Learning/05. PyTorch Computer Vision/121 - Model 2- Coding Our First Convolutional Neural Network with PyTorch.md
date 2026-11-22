---
title: 'Bài 121 — Model 2: code mạng tích chập đầu tiên bằng PyTorch'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 121
status: edited
source: '121 - Model 2- Coding Our First Convolutional Neural Network with PyTorch.md'
categories:
- AI
tags: []
---

# 🏗️ Model 2: code mạng tích chập đầu tiên bằng PyTorch

> Nguồn: `121 - Model 2- Coding Our First Convolutional Neural Network with PyTorch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920350)

Đây là model lớn nhất từ đầu khóa: mình dựng **TinyVGG** — kiến trúc của CNN Explainer — bằng PyTorch thuần. Code xong nguyên model rồi mấy bài sau mới mổ xẻ từng layer. Chuẩn bị tinh thần: sẽ có vài lỗi chính tả và một lỗi ở cuối vì chưa biết `in_features` của classifier.

### 🧩 TinyVGG là gì?

CNN Explainer gọi kiến trúc của nó là **TinyVGG**. Tên kiểu này là quy ước: khi công bố một kiến trúc, tác giả đặt tên để sau này người khác chỉ cần nhắc tên là hiểu. Họ hàng của nó có **VGG16**, **ResNet**, **LeNet**, **AlexNet**… TinyVGG là bản "tí hon" để học.

Mình chia mạng thành các **convolutional block**:

* **conv_block_1**: `Conv2d → ReLU → Conv2d → ReLU → MaxPool2d`
* **conv_block_2**: y hệt block 1
* **classifier**: `Flatten → Linear`

---

### 🏗️ Code đầy đủ

```python
class FashionMNISTModelV2(nn.Module):
    """Model architecture that replicates the TinyVGG model
    from CNN Explainer website."""

    def __init__(self, input_shape: int, hidden_units: int, output_shape: int):
        super().__init__()

        self.conv_block_1 = nn.Sequential(
            nn.Conv2d(
                in_channels=input_shape,
                out_channels=hidden_units,
                kernel_size=3,
                stride=1,
                padding=1,
            ),
            nn.ReLU(),
            nn.Conv2d(
                in_channels=hidden_units,
                out_channels=hidden_units,
                kernel_size=3,
                stride=1,
                padding=1,
            ),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2),
        )

        self.conv_block_2 = nn.Sequential(
            nn.Conv2d(hidden_units, hidden_units, 3, 1, 1),
            nn.ReLU(),
            nn.Conv2d(hidden_units, hidden_units, 3, 1, 1),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(in_features=hidden_units * something * something,
                      out_features=output_shape),
        )

    def forward(self, x):
        x = self.conv_block_1(x)
        x = self.conv_block_2(x)
        x = self.classifier(x)
        return x
```

---

### 🔍 Các hyperparameter của `Conv2d`

* **`in_channels`** — số kênh của input. Layer đầu nhận `input_shape`; các layer sau nhận `out_channels` của layer trước.
* **`out_channels`** — số kênh output, cũng là "hidden units" của block.
* **`kernel_size`** — kích thước cửa sổ trượt. `3` tương đương `(3, 3)`.
* **`stride`** — bước nhảy của kernel.
* **`padding`** — thêm viền quanh ảnh.

Đây đều là **hyperparameter** — giá trị bạn tự đặt. Nhớ lại: nối layer thì `out_channels` của layer trước phải bằng `in_channels` của layer sau.

---

### ⚙️ Khởi tạo

```python
torch.manual_seed(42)

model_2 = FashionMNISTModelV2(
    input_shape=1,            # 1 color channel (ảnh xám)
    hidden_units=10,
    output_shape=len(class_names),
).to(device)
```

Lưu ý `input_shape=1` — không phải `784`. Với CNN, input vẫn giữ dạng `[C, H, W]`, không flatten trước. Nếu là ảnh màu RGB thì `input_shape=3`.

---

### 🐛 Lỗi gặp phải (rất đáng học)

Khi chạy, code báo lỗi ngay tại classifier vì `something` chưa có giá trị — Python không thể nhân một biến chưa tồn tại để ra `in_features`. Đây là chỗ khó nhất khi dựng CNN: **không biết output shape của conv block trước khi flatten**. Mình cố tình để vậy và sẽ giải quyết bằng "mẹo" ở bài 124.

Ngoài ra còn một loạt lỗi chính tả kiểu `out channel` thiếu chữ `l`, `colonel size` thay vì `kernel_size`. Sửa xong mới chạy được — đừng lo, ai cũng gặp.

---

### 💡 Vì sao chép kiến trúc có sẵn?

Đây là thực tế rất phổ biến trong ML: tìm một kiến trúc đã được chứng minh, replicate lại bằng code, rồi thử trên bài của mình. TinyVGG nhỏ, dễ hiểu, phù hợp để học.

---

### ✅ Tạm kết

Về cơ bản Model 2 đã thành hình, chỉ còn `in_features` của classifier là ẩn số. Mấy bài sau mình mổ xẻ `Conv2d` và `MaxPool2d` từng bước, rồi tìm ra con số đó. Bài tập mở rộng vẫn là: dành 20 phút với CNN Explainer, đọc về padding, kernel size, stride.
