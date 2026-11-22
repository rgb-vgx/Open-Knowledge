---
title: 'Bài 126 — Viết backend inference cho Gradio app phân loại ảnh'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 126
status: edited
source: '126 - Implementing gradio app inference backend.md'
categories:
- AI
tags: []
---

# 🔌 Backend inference: nối CNN đã train vào giao diện Gradio

> Nguồn: `126 - Implementing gradio app inference backend.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49094255)

Chào các bạn! Ở bài trước mình có textbox giả lập. Hôm nay mình thay bằng **backend thật**: một class `ImageClassifier` load CNN đã train, nhận ảnh, dự đoán cat/dog/person, ghi nhãn lên ảnh và trả kết quả cho Gradio.

### 📁 Tổ chức project thành các module

Mình tách code thành các module để `app.py` gọn:

```text
gradio_app_one/
├── app.py
├── requirements.txt
├── core/
│   ├── __init__.py
│   └── predict.py
└── model/
    ├── __init__.py
    └── cnn_128_model.pt
```

`__init__.py` (có thể rỗng) giúp thư mục `core/` và `model/` được coi là **package**, nhờ đó `app.py` import được. File `predict.py` chứa toàn bộ logic dự đoán; `model/` chứa file trọng số `.pt`.

Cập nhật `requirements.txt`:

```text
gradio
torch
torchvision
opencv-python
pillow
```

---

### 🧱 Class ImageClassifier: phần __init__

`__init__` lo những việc nặng, chạy **một lần** khi tạo object: chọn device, dựng kiến trúc, load trọng số, giữ class map và transform.

```python
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import cv2
import os

class ImageClassifier:
    def __init__(self, model_path, class_names=None):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        self.model = CustomCNNModel(input_dim=128, num_classes=3).to(self.device)
        self.model.load_state_dict(
            torch.load(model_path, map_location=self.device)
        )
        self.model.eval()

        self.class_names = {
            0: "person", 1: "cat", 2: "dog"
        } if class_names is None else class_names

        self.transform = transforms.Compose([
            transforms.Resize((128, 128)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),
        ])
```

Ba điểm cần chú ý:

* **Kiến trúc CNN phải có sẵn** — `torch.load` chỉ nạp trọng số, còn "blueprint" (class `CustomCNNModel`) phải được định nghĩa trong script, dù bạn không train ở đây.
* **`torch.load(..., map_location=self.device)`** nạp trọng số lên đúng CPU/GPU.
* **`model.eval()`** chuyển sang chế độ đánh giá (tắt dropout, cố định batch norm).

`class_names` cho phép truyền dictionary khác nếu bạn train bộ nhãn khác; mặc định dùng mapping của mình.

---

### 🔮 Hàm predict: từ ảnh tới nhãn

```python
    def predict(self, image_path):
        image = Image.open(image_path).convert("RGB")
        tensor = self.transform(image).unsqueeze(0).to(self.device)

        with torch.no_grad():
            output = self.model(tensor)
            _, predicted = torch.max(output, 1)

        label = self.class_names[predicted.item()]

        img = cv2.imread(image_path)
        cv2.putText(img, label, (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
        output_path = os.path.join(os.getcwd(), "labeled_image.jpg")
        cv2.imwrite(output_path, img)

        return label, output_path
```

Quy trình: mở ảnh bằng PIL (PyTorch mong đợi PIL/numpy), `.convert("RGB")` cho chắc. Áp `transform`, rồi **`.unsqueeze(0)`** thêm chiều batch vì model luôn nhận input theo batch — ảnh đơn là batch size 1. Đưa lên device, chạy trong `torch.no_grad()`, lấy `torch.max(output, 1)` để chọn lớp xác suất cao nhất.

Chỉ số dự đoán (`predicted.item()`) được tra qua `self.class_names` để ra chữ. Sau đó OpenCV đọc lại ảnh, ghi text lên góc trên trái tại tọa độ `(10, 30)` (gốc tọa độ OpenCV ở góc trên trái), font `FONT_HERSHEY_SIMPLEX`, màu `(255, 0, 0)`, độ dày 2. Lưu thành `labeled_image.jpg` và trả về cả **label** lẫn **đường dẫn ảnh đã ghi chữ**.

---

### 🖼️ Nối vào Gradio với input ảnh

Trong `app.py`, tạo object classifier rồi định nghĩa hàm wrapper mà Gradio gọi:

```python
import os
import gradio as gr
from PIL import Image
from core.predict import ImageClassifier

cwd = os.getcwd()
model_path = os.path.join(cwd, "model", "cnn_128_model.pt")
classifier = ImageClassifier(model_path=model_path, class_names=None)

def classify_image(image):
    image_path = "uploaded_image.jpg"
    image.save(image_path)
    label, output_path = classifier.predict(image_path)
    return label, Image.open(output_path)

demo = gr.Interface(
    fn=classify_image,
    inputs=gr.Image(type="pil"),
    outputs=[gr.Textbox(label="Prediction"), gr.Image(label="Labeled image")],
    title="Image Classification Gradio app",
    description="Upload an image to classify it as dog, cat or person.",
)

if __name__ == "__main__":
    demo.launch()
```

Lưu ý: `gr.Image(type="pil")` cho Gradio nhận **ảnh PIL** — cần vậy vì `image.save()` yêu cầu đối tượng PIL. Output là một list gồm **Textbox** (nhãn) và **Image** (ảnh đã ghi chữ).

---

### ▶️ Chạy thử và gỡ lỗi

Nếu chạy mà báo `No module named torch`, cài lại: `pip install -r requirements.txt`. Một lỗi khác tác giả gặp là `torch.cuda has no attribute available` — do gõ nhầm; đúng phải là **`torch.cuda.is_available()`**.

Chạy `python app.py`, mở local URL, kéo ảnh vào ô drop, bấm Submit: textbox hiện "person", ảnh hiện chữ "person". App đã chạy local — nhưng URL này chỉ máy bạn truy cập được. Bài sau mình sẽ deploy lên **Hugging Face Spaces** để ai cũng dùng được.
