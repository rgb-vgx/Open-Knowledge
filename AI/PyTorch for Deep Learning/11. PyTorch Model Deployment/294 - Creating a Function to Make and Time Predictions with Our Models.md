---
title: 'Bài 294 — Viết hàm pred_and_store() đo latency từng ảnh'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 294
status: edited
source: '294 - Creating a Function to Make and Time Predictions with Our Models.md'
categories:
- AI
tags: []
---

# 🧪 Viết `pred_and_store()`: dự đoán và đo latency

> Nguồn: `294 - Creating a Function to Make and Time Predictions with Our Models.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055236)

Bài trước mới là phác thảo, bài này code thật. Hàm `pred_and_store()` mở từng ảnh, biến đổi, cho model dự đoán, **đo thời gian mỗi lần**, lưu mọi thứ vào một dictionary — và có thêm cột `correct` để tiện đánh giá model. Đây là công cụ để so tốc độ EffNetB2 với ViT.

### 📦 Import

```python
from PIL import Image
from pathlib import Path
from timeit import default_timer as timer
from tqdm.auto import tqdm
from typing import List, Dict

import torch
import torchvision
```

* `default_timer` — bộ đếm mặc định của Python.
* `tqdm.auto` — tự chọn progress bar phù hợp môi trường (notebook hay terminal).
* `List`, `Dict` — chỉ để type hint: hàm trả về **list of dictionaries**.

### 🧱 Chữ ký hàm

```python
def pred_and_store(paths: List[Path],
                   model: torch.nn.Module,
                   transform: torchvision.transforms,
                   class_names: List[str],
                   device: str = "cuda" if torch.cuda.is_available() else "cpu") -> List[Dict]:
```

`device` mặc định bám theo máy — device-agnostic như mọi khi.

### 🔁 Thân hàm

```python
    pred_list = []
    for path in tqdm(paths):
        pred_dict = {}

        # 5. Lấy đường dẫn và ground truth từ file path
        pred_dict["image_path"] = path
        class_name = path.parent.stem       # tên thư mục cha = nhãn thật
        pred_dict["class_name"] = class_name

        # 6-7. Bắt đầu timer và mở ảnh
        start_time = timer()
        img = Image.open(path)

        # 8. Transform + thêm batch dimension + lên device
        transformed_image = transform(img).unsqueeze(0).to(device)

        # 9. Model lên device, chuyển eval mode
        model.to(device)
        model.eval()

        # 10. Inference mode + forward pass
        with torch.inference_mode():
            pred_logit = model(transformed_image)
            pred_prob = torch.softmax(pred_logit, dim=1)
            pred_label = torch.argmax(pred_prob, dim=1)
            pred_class = class_names[pred_label.cpu()]   # Python list sống trên CPU

            # 11. Lưu xác suất cao nhất và class dự đoán
            pred_dict["pred_prob"] = round(pred_prob.max().cpu().item(), 4)
            pred_dict["pred_class"] = pred_class

            # 12. Dừng timer
            end_time = timer()
            pred_dict["time_for_pred"] = round(end_time - start_time, 4)

        # 13-14. Đúng/sai + append
        pred_dict["correct"] = class_name == pred_class
        pred_list.append(pred_dict)

    return pred_list
```

Vài điểm đáng chú ý:

* **`unsqueeze(0)`** — model quen nhận batch; dự đoán một ảnh vẫn phải có batch dimension.
* **`pred_label.cpu()`** — `class_names` là list Python, sống trên CPU; nếu tensor nằm trên GPU mà không chuyển về CPU sẽ lỗi.
* **`pred_prob.max().cpu().item()`** — lấy xác suất lớn nhất, chuyển về CPU, `.item()` để ra số Python, làm tròn 4 chữ số.
* **`torch.inference_mode()`** — tắt những cơ chế chỉ cần cho training.

### 👀 Vì sao "list of dictionaries"?

Mỗi mẫu có nhiều thông tin: đường dẫn, nhãn thật, dự đoán, xác suất, thời gian, đúng/sai. Một list các dictionary cho phép giữ **mọi trường** mà vẫn duyệt như danh sách. Sau này có thể dựng bảng phân tích rất dễ.

---

Hàm đã viết xong nhưng có thể còn lỗi nhỏ — thử chạy với EffNetB2 hoặc ViT là biết ngay. Bài sau mình chạy thật và xem latency từng model.
