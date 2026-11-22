---
title: 'Bài 303 — Đưa Food Vision Mini lên sóng với Gradio'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 303
status: edited
source: '303 - Bringing Food Vision Mini to Life in a Live Web Application.md'
categories:
- AI
tags: []
---

# 🚀 Dựng giao diện Gradio và chạy Food Vision Mini

> Nguồn: `303 - Bringing Food Vision Mini to Life in a Live Web Application.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34093852)

Chào các bạn. Đây là video mình chờ nhất: biến hàm `predict` thành một web app thật, bấm là chạy. Mình có đủ ba mảnh — hàm dự đoán, `class_names`, và `example_list` — giờ chỉ cần ghép bằng `gr.Interface`.

### 📝 Viết title, description, article

Trước hết import Gradio và tạo phần "vỏ" cho app:

```python
import gradio as gr

title = "Food Vision Mini 🍕🥩🍣"
description = "An EfficientNetB2 feature extractor computer vision model to classify images as pizza, steak or sushi."
article = "Created at [09. PyTorch Model Deployment](https://www.learnpytorch.io/09_pytorch_model_deployment/)."
```

* **`title`** hiện phía trên phần input.
* **`description`** nói app làm gì; hỗ trợ markdown/HTML nên có thể chèn link.
* **`article`** là phần mở rộng phía dưới, thường để ghi nguồn hoặc link tới code.

Mình cố tình để link tới trang model deployment để ai muốn xem code thì tìm được.

---

### 🧱 Cấu hình `gr.Interface`

`Interface` là class chính của Gradio. Nó nhận một hàm ánh xạ input → output, cùng mô tả cho input và output:

```python
demo = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil"),
    outputs=[
        gr.Label(num_top_classes=3, label="Predictions"),
        gr.Number(label="Prediction time (s)"),
    ],
    examples=example_list,
    title=title,
    description=description,
    article=article,
)
```

Vài điểm đáng chú ý:

* `inputs=gr.Image(type="pil")` — ảnh được mở bằng thư viện **PIL**, đúng kiểu mà hàm `predict` đang nhận.
* `outputs` là **một list** vì app trả về hai output. `gr.Label(num_top_classes=3)` vẽ thanh xác suất cho 3 lớp; `gr.Number(label=...)` hiển thị thời gian dự đoán.
* Nếu có 1000 lớp, `num_top_classes=3` vẫn chỉ hiện 3 lớp tự tin nhất — tiện cho phần nhìn.

---

### 🌐 Launch và lấy link công khai

Gọi `launch()` để Gradio dựng web server:

```python
demo.launch(debug=False, share=True)
```

* `share=True` tạo một **public URL** dạng `*.gradio.app` để gửi cho bạn bè.
* `debug=True` sẽ in lỗi chi tiết trong Colab, hữu ích khi phát triển.

Sau khi chạy, app hiện ra với tiêu đề, mô tả, link, và ba ảnh mẫu. Bấm một ảnh sushi → model trả về `sushi`; bấm ảnh pizza → `pizza`. Upload ảnh steak tự chụp → `steak`. Nút **Flag** cho phép đánh dấu ảnh đoán sai để sau này xem lại — mình để phần đó làm bài tập mở rộng.

---

### ⏳ Giới hạn 72 giờ

Link `share=True` chỉ sống **72 giờ**, hết hạn là mở lên thấy "No interface is running right now". Với một buổi demo thì ổn, nhưng để đưa vào portfolio hay gửi cho nhà tuyển dụng thì không.

Mình còn thử một màn "meta": dùng ảnh steak do Stable Diffusion tạo ra, rồi đưa vào Food Vision Mini để phân loại — máy học tạo ảnh, rồi máy học nhận diện ảnh. Kết quả vẫn ra `steak`, rất vui.

---

Vậy là chỉ trong vài video, từ chỗ chưa biết Gradio, mình đã có một app chia sẻ được. Bước tiếp theo: **host lâu dài trên Hugging Face Spaces**, nơi link không còn hết hạn sau 72 giờ. Hẹn các bạn ở bài sau.
