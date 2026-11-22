---
title: 'Bài 169 — Faster R-CNN với PyTorch (inference)'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 169
status: edited
source: '169 - FASTER RCNN with Pytorch Implementation.md'
categories:
- AI
tags: []
---
# 🔬 Faster R-CNN với PyTorch: từ model có sẵn đến bounding box

> Nguồn: `169 - FASTER RCNN with Pytorch Implementation.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49150765)

Chào các bạn! Bài này mình dùng model **Faster R-CNN** có sẵn trong **torchvision** để chạy inference trên một ảnh, rồi tự tay vẽ bounding box bằng **OpenCV**. Không train lại — chỉ dùng model COCO pre-trained.

### 📦 Model và thư viện

Model mình chọn là **Faster R-CNN với backbone ResNet-50 + FPN**, bản `v2` trong `torchvision.models.detection`. Các import chính:

```python
import torch
import torchvision
from torchvision.models.detection import (
    fasterrcnn_resnet50_fpn_v2,
    FasterRCNN_ResNet50_FPN_V2_Weights,
)
import cv2, numpy as np, matplotlib.pyplot as plt
from PIL import Image
from torchvision import transforms
```

Mình cần cả **kiến trúc** lẫn **weights**, cùng `cv2` để vẽ box và các thư viện đọc/transform ảnh.

### 🧠 Load model

```python
weights = FasterRCNN_ResNet50_FPN_V2_Weights.DEFAULT
model = fasterrcnn_resnet50_fpn_v2(weights=weights, box_score_thresh=0.7)
model.eval()
```

* `box_score_thresh=0.7` — chỉ giữ detection có confidence **≥ 0.7**.
* `model.eval()` — bắt buộc khi inference (tắt dropout/batchnorm ở chế độ train).
* `weights.meta["categories"]` trả về **tên class** của COCO: list có **91** phần tử, index 0 là background, các index 1–90 theo COCO category id (trong đó có một số mục `N/A`). COCO detection thực tế có **80 class** object.

Lưu ý: ResNet-50 nghĩa là 50 layer, nên **load model khá lâu**.

### 🖼️ Tiền xử lý ảnh

Hàm nhận đường dẫn ảnh, mở bằng **PIL**, chuyển sang **RGB**, rồi chuyển thành **tensor**:

```python
image = Image.open(path).convert("RGB")
tensor = transforms.ToTensor()(image)
```

Hàm trả về **cả ảnh gốc** (để vẽ) lẫn **tensor** (để đưa vào model).

### 🔮 Chạy dự đoán

```python
with torch.no_grad():
    prediction = model([image_tensor])
```

`torch.no_grad()` tránh tích luỹ gradient khi chỉ inference. Model trả về một **list**; phần tử đầu tiên chứa ba thứ:

* **boxes** — toạ độ bounding box,
* **labels** — class index,
* **scores** — confidence score.

### 🎨 Vẽ kết quả

Hàm `visualize_detection` nhận ảnh, prediction và danh sách category:

1. Chuyển ảnh **RGB → BGR** cho OpenCV.
2. Với mỗi box vượt ngưỡng, sinh màu ngẫu nhiên bằng `np.random.randint(0, 255)`.
3. Vẽ hình chữ nhật bằng `cv2.rectangle` (truyền toạ độ theo đúng định dạng box trả về).
4. Tính kích thước chữ bằng `cv2.getTextSize`, vẽ nền nhãn bằng `cv2.rectangle`, rồi `cv2.putText` để ghi tên class.

Vì màu là random, mỗi lần chạy box lại đổi màu — tiện để phân biệt các object.

### 📊 Kết quả và bài học về threshold

Với ngưỡng **0.7**, model báo **9 object** nhưng thực tế ảnh chỉ có **7** (2 person + 5 horse): một person bị phát hiện **hai lần** (một box chỉ thấy nửa người, confidence thấp), và vài con ngựa bị trùng.

Khi nâng threshold lên **0.9**, kết quả còn đúng **7 object** — 2 person và 5 horse, khớp với ảnh. Bài học: **threshold rất quan trọng**. Ngưỡng thấp dễ sinh detection trùng hoặc sai; nên đặt theo use case cụ thể.

---
### ✅ Tóm lại

Pipeline gọn: load `fasterrcnn_resnet50_fpn_v2` + weights COCO → `model.eval()` → `model([tensor])` trong `no_grad` → đọc `boxes/labels/scores` → vẽ bằng OpenCV. Nhớ tinh chỉnh `box_score_thresh`. Các bạn thử với ảnh khác, hoặc lặp qua cả thư mục ảnh bằng vòng `for`. Hẹn gặp ở bài sau!
