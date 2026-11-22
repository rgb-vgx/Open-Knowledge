---
title: 'Bài 325 — Viết app.py cho demo Food Vision Big'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 325
status: edited
source: '325 - Creating an App Script for Our Food Vision Big Model Gradio Demo.md'
categories:
- AI
tags: []
---

# 🎛️ `app.py` cho Food Vision Big: đọc nhãn từ file, 101 lớp

> Nguồn: `325 - Creating an App Script for Our Food Vision Big Model Gradio Demo.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34130418)

Chào các bạn. `app.py` của Food Vision Big gần giống bản Mini. Khác biệt lớn nhất: **class names đọc từ `class_names.txt`**, model dùng 101 lớp, và phần mô tả được cập nhật.

### 📥 Import và đọc class names

```python
%%writefile demos/food_vision_big/app.py
import gradio as gr
import os
import torch
from model import create_effnetb2_model
from timeit import default_timer as timer
from typing import Tuple, Dict

with open("class_names.txt", "r") as f:
    class_names = [food_name.strip() for food_name in f.readlines()]
```

Vì `app.py` nằm cùng cấp với `class_names.txt`, đường dẫn tương đối `"class_names.txt"` là đủ. Nhớ `.strip()` để bỏ newline.

---

### 🧠 Chuẩn bị model 101 lớp

```python
effnetb2, effnetb2_transforms = create_effnetb2_model(num_classes=101)

effnetb2.load_state_dict(
    torch.load(
        f="09_pretrained_effnetb2_feature_extractor_food101_20_percent.pth",
        map_location=torch.device("cpu"),
    )
)
```

`map_location=torch.device("cpu")` tiếp tục là bắt buộc: model train trên GPU, load lại trên CPU (free tier của Spaces) mà không ép device sẽ lỗi.

---

### 🔮 Hàm predict giữ nguyên

Không cần sửa gì — hàm `predict` vốn đã tổng quát theo `class_names`:

```python
def predict(img) -> Tuple[Dict, float]:
    start_time = timer()
    img = effnetb2_transforms(img).unsqueeze(0)
    effnetb2.eval()
    with torch.inference_mode():
        pred_probs = torch.softmax(effnetb2(img), dim=1)
    pred_labels_and_probs = {
        class_names[i]: float(pred_probs[0][i])
        for i in range(len(class_names))
    }
    pred_time = round(timer() - start_time, 4)
    return pred_labels_and_probs, pred_time
```

---

### 🖥️ Giao diện Gradio

```python
example_list = [["examples/" + example] for example in os.listdir("examples")]

demo = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil"),
    outputs=[
        gr.Label(num_top_classes=5, label="Predictions"),
        gr.Number(label="Prediction time (s)"),
    ],
    examples=example_list,
    title="Food Vision Big 🍔💪",
    description="EffNetB2 feature extractor to classify 101 classes of food from the Food101 dataset.",
    article="Created at [11. PyTorch Model Deployment](https://www.learnpytorch.io/09_pytorch_model_deployment/).",
)
demo.launch()
```

Vài điểm cần chú ý:

* **`num_top_classes=5`** thay vì 3 — vì 101 lớp, hiển thị top 5 trực quan hơn.
* **Không có `share=True`** trong `launch()` — bài học từ Food Vision Mini: Spaces không hỗ trợ tham số này.
* `example_list` vẫn dùng `os.listdir("examples")` như bản Mini.

---

### 🧪 Kiểm tra sau khi ghi file

```bash
ls demos/food_vision_big/
```

Kỳ vọng: `app.py`, `model.py`, `class_names.txt`, `examples/`, file `.pth`.

---

Còn đúng `requirements.txt` và bước nén/upload. Bài sau mình hoàn tất file cuối và đóng gói.
