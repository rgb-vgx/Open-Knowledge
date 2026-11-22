---
title: 'Viết hàm dự đoán và vẽ ảnh'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 196
status: edited
source: '196 - Creating a Function Predict On and Plot Images.md'
categories:
- AI
tags: []
---

# 🖼️ Viết hàm dự đoán và vẽ ảnh

> Nguồn: `196 - Creating a Function Predict On and Plot Images.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33021204)

Chào các bạn! Video trước ta phác thảo mười bước cho hàm `pred_and_plot_image`. Giờ ta code cùng nhau — đây chỉ là **một trong nhiều cách** viết, cái đẹp của lập trình là vậy.

### 📥 Import và khai báo hàm

```python
from typing import List, Tuple
from PIL import Image
import matplotlib.pyplot as plt
import torchvision
from torchvision import transforms

def pred_and_plot_image(
    model: torch.nn.Module,
    image_path: str,
    class_names: List[str],
    image_size: Tuple[int, int] = (224, 224),
    transform: torchvision.transforms = None,
    device: torch.device = device,
):
```

Đây là **bước 1** — nhận đủ: model, đường dẫn ảnh, danh sách class, image size (mặc định 224×224), transform (mặc định `None`), device (mặc định `device` toàn cục).

### 🖼️ Bước 2 — mở ảnh

```python
    img = Image.open(image_path)
```

Dùng **PIL**. Ảnh gốc này sẽ dùng để vẽ ở bước cuối.

### 🎛️ Bước 3 — tạo transform nếu chưa có

```python
    if transform is not None:
        image_transform = transform
    else:
        image_transform = transforms.Compose([
            transforms.Resize(image_size),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225],
            ),
        ])
```

Tham số `transform` cho phép dùng **manual hoặc automatic transform** tùy ý. Nếu không truyền, ta tự tạo một cái theo chuẩn ImageNet.

### 📱 Bước 4 — đưa model lên device

```python
    model.to(device)
```

Tránh lỗi device mismatch.

### 🧪 Bước 5 — inference mode và eval

```python
    model.eval()
    with torch.inference_mode():
```

* **`model.eval()`** tắt dropout và các hành vi chỉ dùng khi train.
* **`torch.inference_mode()`** tắt gradient tracking và các thứ không cần khi inference — giúp chạy nhanh hơn.

### 🔄 Bước 6 — transform và thêm batch dimension

```python
        transformed_image = image_transform(img).unsqueeze(dim=0)
```

`unsqueeze(dim=0)` **thêm một chiều ở vị trí 0**, biến ảnh `[3, 224, 224]` thành `[1, 3, 224, 224]` — batch size 1. Model luôn cần chiều batch.

### 🔮 Bước 7 — forward pass

```python
        target_image_pred = model(transformed_image.to(device))
```

Đưa ảnh lên **cùng device** với model trước khi gọi — xử lý luôn vấn đề device ở đây.

### 📊 Bước 8 — logit → xác suất

```python
        target_image_pred_probs = torch.softmax(target_image_pred, dim=1)
```

`dim=1` vì chiều class là chiều thứ 1.

### 🏷️ Bước 9 — xác suất → nhãn

```python
        target_image_pred_label = torch.argmax(target_image_pred_probs, dim=1)
```

Lấy index có xác suất cao nhất — chính là class dự đoán.

### 🎨 Bước 10 — vẽ ảnh

```python
    plt.figure()
    plt.imshow(img)
    plt.title(
        f"Pred: {class_names[target_image_pred_label]} | Prob: {target_image_pred_probs.max():.3f}"
    )
    plt.axis(False)
```

Chú ý:

* Vẽ **`img` gốc** (PIL), không phải ảnh đã transform — nếu không matplotlib sẽ lỗi.
* `target_image_pred_probs.max()` lấy **xác suất cao nhất**.
* `:.3f` làm tròn 3 chữ số thập phân.

### 🐛 Chắc chắn có lỗi...

Mình đoán hàm này sẽ vướng ít nhất một lỗi — và đó là bình thường. Video sau ta chạy thử, tìm và sửa.

### ✅ Chốt lại

Ta đã có hàm hoàn chỉnh đi qua cả mười bước. Bài tập cho video sau: **lấy ngẫu nhiên ba đường dẫn ảnh từ test set**, chạy qua hàm trong một vòng lặp, và vẽ kết quả kèm dự đoán. Hẹn gặp!
