---
title: 'Bài 300 — Phác thảo hàm predict cho Gradio'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 300
status: edited
source: '300 - Gradio Function Outline.md'
categories:
- AI
tags: []
---

# 🧩 Phác thảo hàm `predict()` cho giao diện Gradio

> Nguồn: `300 - Gradio Function Outline.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055242)

Gradio chỉ cần một thứ để hoạt động: một **hàm Python nhận input và trả output**. Bài này phác thảo hàm đó cho Food Vision Mini — nhận ảnh, trả về **dictionary xác suất từng lớp** cùng **thời gian dự đoán**. Đây sẽ là tham số `fn` của `gr.Interface`.

### 🎯 Vì sao phải có demo?

Vì **deployment quan trọng ngang training**. Số liệu trong notebook rất đẹp, nhưng chỉ khi đưa model vào tay người khác, bạn mới chạm tới **tập dữ liệu thật sự: thế giới thực**.

Gradio ánh xạ:

```text
inputs  →  function / model  →  outputs
```

Với Food Vision Mini:

* **Inputs**: ảnh món ăn.
* **Model**: EfficientNet B2 feature extractor.
* **Outputs**: nhãn (steak / sushi / pizza) + prediction time cho vui.

### 🧱 Chuẩn bị model trên CPU

```python
effnetb2.to("cpu")
next(iter(effnetb2.parameters())).device
```

Hard-code **CPU** vì Hugging Face Spaces (bản miễn phí) chạy CPU trừ khi trả tiền nâng cấp GPU.

### ✍️ Thiết kế hàm `predict()`

Chữ ký:

```python
from typing import Tuple, Dict

def predict(img) -> Tuple[Dict, float]:
    ...
```

Trả về **tuple**: một `dict` và một `float`.

* `dict` — xác suất từng lớp, dạng:

```python
{
    "steak": 0.93,
    "pizza": 0.05,
    "sushi": 0.02
}
```

* `float` — **thời gian dự đoán**, giúp đánh giá tốc độ thật khi chạy trên server.

### 📝 Các bước bên trong

1. **Khởi động timer**.
2. **Transform** ảnh đầu vào bằng `effnetb2_transforms`.
3. Đưa model về **eval mode** (`effnetb2.eval()`).
4. Chạy **forward pass** trong `torch.inference_mode()` → logits.
5. `softmax` → **prediction probabilities**.
6. Ghép thành **dictionary** `{class_name: prob}`.
7. **Dừng timer**, tính `pred_time`.
8. `return pred_labels_and_probs, pred_time`.

### 🖼️ Vì sao trả dictionary thay vì nhãn?

Vì Gradio component `Label` nhận đúng dạng `{label: score}` và tự vẽ thanh xác suất. Trả cả dict giúp người dùng thấy model **tự tin bao nhiêu** ở từng lớp, chứ không chỉ một nhãn cứng.

---

Đây chính là phần lõi sẽ gắn vào `gr.Interface(fn=predict, inputs=..., outputs=...)`. Thử tự điền các bước trên trước, rồi bài sau mình code hoàn chỉnh cùng nhau.
