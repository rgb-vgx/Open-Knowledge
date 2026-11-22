---
title: 'Bài 181 — Test YOLO11 Instance Segmentation'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 181
status: edited
source: '181 - Testing Yolov11 Instance Segmentation.md'
categories:
- AI
tags: []
---
# 🔎 Inference với YOLO11 Segmentation

> Nguồn: `181 - Testing Yolov11 Instance Segmentation.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49231907)

Chào các bạn! Model crack detection đã train xong; giờ ta **test/inference** nó trên ảnh thật. Bài này đi qua cách đọc `Results` của Ultralytics, chạy trên một ảnh, batch ảnh, numpy array (frame camera), và cách **rút mask semantic từ instance segmentation**.

### 📚 `Results` trả về gì?

Theo docs phần **predict**, `model(...)` trả về một **iterator** các `Results`. Mỗi `Results` có:

* `result.boxes` — bounding box,
* `result.masks` — mask của object (segmentation),
* `result.keypoints` — pose,
* `result.probs` — classification,
* `result.obb` — oriented bounding box,
* `result.show()` — hiển thị ảnh kết quả,
* `result.save()` — lưu ảnh.

Ta chỉ cần thay model mặc định bằng **model custom** đã train.

### 🗂️ Load model

Giải nén thư mục kết quả train, vào `train/weights/`:

* `best.pt` — checkpoint tốt nhất (cân bằng box/classification/object/segmentation loss),
* `last.pt` — epoch cuối (có thể không phải tốt nhất).

Dùng **`best.pt`**:

```python
from ultralytics import YOLO
model = YOLO("train/weights/best.pt")
```

Ultralytics tự nhận biết đây là model **segmentation**.

### 🖼️ Inference một ảnh

```python
results = model("stone_texture2.jpeg")
for r in results:
    r.show()
```

Ảnh test là các bức tường/đá có **nhiều vết nứt**, không nằm trong tập train. Kết quả:

* **preprocess ~16.5 ms**, **inference ~52.6 ms**, **postprocess ~56.3 ms**,
* input **608×640** RGB.

Model bao phủ gần hết các vết nứt, dù gộp chúng thành một instance — hợp lý vì dataset train hầu như chỉ có một crack mỗi ảnh. Vết nứt mảnh (hairline) chưa train thì có thể bị bỏ sót.

### 🧺 Inference batch ảnh

Chỉ cần truyền **list đường dẫn**:

```python
paths = ["stone_texture2.jpeg", "stone_texture4.jpeg"]
results = model(paths)
for idx, r in enumerate(results):
    r.save(filename=f"out_{idx}.jpg")
```

Mỗi ảnh cho một `Results`; `enumerate` giúp đánh số. Cách này hợp với nhiều frame camera đến cùng lúc.

### 🎥 Inference trên numpy array

Nếu ảnh đã đọc bằng OpenCV (không có "path"), truyền thẳng **numpy array**:

```python
import cv2
image_array = cv2.imread("stone_texture2.jpeg")   # numpy.ndarray
results = model(image_array)
```

Ultralytics chấp nhận cả path lẫn numpy array — hữu ích khi xử lý frame từ video stream.

### 🎭 Từ instance mask sang semantic mask

Vì instance segmentation chứa nhiều thông tin hơn, ta có thể **chuyển thành semantic**. Ý tưởng: lấy mask của các object thuộc class quan tâm rồi gộp lại.

```python
import torch, matplotlib.pyplot as plt

r = results[0]
if r.masks is not None:
    masks = r.masks.data          # (N, H, W)
    classes = r.boxes.data[:, -1] # class id ở cột cuối
    idx = torch.where(classes == 0)[0]   # class 0 = crack
    crack_masks = masks[idx]
    # gộp / chọn mask cần hiển thị, scale 0..255
    mask = crack_masks[0].cpu().numpy()
    plt.imshow(mask, cmap="gray")
```

Lưu ý:

* `result.masks.data` và `result.boxes.data` là **tensor trên GPU**; phải `.cpu().numpy()` trước khi đưa vào Matplotlib.
* Nếu không có object class cần tìm, mảng index rỗng → cần kiểm tra `len(idx) == 0` và bỏ qua.
* Dùng **`cmap="gray"`** để mask hiện đen/trắng; nếu bỏ, Matplotlib sẽ tô màu tím/vàng mặc định.

Đây là minh chứng cho điều đã nói ở bài 172: **instance → semantic được**, còn **semantic → instance thì không**.

---
### ✅ Tóm lại

Inference YOLO11: `YOLO("best.pt")` → gọi với path/list/numpy → đọc `Results` (`boxes`, `masks`) → `show()`/`save()`. Có thể lấy mask và chuyển về dạng semantic. Vậy là xong module segmentation; tiếp theo là **dự án YOLO-powered image search**. Hẹn gặp!
