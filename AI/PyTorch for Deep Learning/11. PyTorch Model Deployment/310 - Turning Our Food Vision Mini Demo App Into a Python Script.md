---
title: 'Bài 310 — Viết app.py: đưa demo Food Vision Mini thành script'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 310
status: edited
source: '310 - Turning Our Food Vision Mini Demo App Into a Python Script.md'
categories:
- AI
tags: []
---

# 📜 Viết `app.py` — bộ não của app demo

> Nguồn: `310 - Turning Our Food Vision Mini Demo App Into a Python Script.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34106538)

Chào các bạn. Đây là file quan trọng nhất: `app.py`. Hugging Face Spaces sẽ chạy chính file này để dựng demo. Tin tốt là mọi thứ khó đã làm rồi, giờ chỉ cần ráp lại.

### 🧱 Bốn phần của `app.py`

1. **Import + class names** — dependency và danh sách lớp.
2. **Chuẩn bị model và transforms** — tạo instance EffNetB2, load state dict.
3. **Hàm `predict`** — map ảnh → dictionary xác suất + thời gian.
4. **Gradio app** — `gr.Interface` + `launch()`.

### ✍️ Phần 1 và 2: import, model, transforms

```python
%%writefile demos/food_vision_mini/app.py
import gradio as gr
import os
import torch
from model import create_effnetb2_model
from timeit import default_timer as timer
from typing import Tuple, Dict

class_names = ["pizza", "steak", "sushi"]

effnetb2, effnetb2_transforms = create_effnetb2_model(num_classes=3)

effnetb2.load_state_dict(
    torch.load(
        f="09_pretrained_effnetb2_feature_extractor_pizza_steak_sushi_20_percent.pth",
        map_location=torch.device("cpu"),
    )
)
```

Hai điểm cần chú ý:

* **`from model import create_effnetb2_model`** — vì `app.py` nằm cùng thư mục với `model.py`. Lỗi hay gặp là quên import này.
* **`map_location=torch.device("cpu")`** — model được train trên GPU, nếu không ép về CPU thì khi load trên môi trường chỉ có CPU sẽ lỗi. Đây là cái bẫy mình từng dính.

### 🧠 Phần 3: hàm predict

Hàm `predict` giữ nguyên như bản trong notebook:

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

### 🖼️ Phần 4: app Gradio + examples

Một khác biệt so với notebook: `app.py` không có biến `example_list` sẵn. Phải đọc từ thư mục `examples/`:

```python
example_list = [["examples/" + example] for example in os.listdir("examples")]

demo = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil"),
    outputs=[
        gr.Label(num_top_classes=3, label="Predictions"),
        gr.Number(label="Prediction time (s)"),
    ],
    examples=example_list,
    title="Food Vision Mini 🍕🥩🍣",
    description="EffNetB2 feature extractor to classify images as pizza, steak or sushi.",
    article="Created at [09. PyTorch Model Deployment](https://www.learnpytorch.io/09_pytorch_model_deployment/).",
)

demo.launch(debug=False, share=True)
```

Toàn bộ file chỉ khoảng **72 dòng**. Mình cố ý viết hơi dài dòng cho dễ đọc, hoàn toàn có thể rút gọn.

### ⚠️ Lưu ý về import

Mình hay quên import vì không nhớ code cần gì. Cách duy nhất để biết là **chạy thử app** — thiếu import là nó báo lỗi ngay. Đừng lo nếu phải sửa vài lần, đó là quá trình bình thường.

---

Còn đúng một file: `requirements.txt`. Các bạn thử tự tạo nhé — bài sau mình chốt cùng.
