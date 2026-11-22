---
title: 'Bài 299 — Gradio là gì và cài đặt ra sao'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 299
status: edited
source: '299 - Gradio Overview and Installation.md'
categories:
- AI
tags: []
---

# 🎛️ Gradio: biến model thành app web trong vài dòng

> Nguồn: `299 - Gradio Overview and Installation.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055241)

Đã chọn EfficientNet B2. Giờ là lúc "thổi hồn" cho Food Vision Mini bằng **Gradio** — thư viện giúp dựng giao diện web cho model cực nhanh. Bài này giải thích Gradio là gì, cài thế nào, và luồng input → function → output mà ta sắp code.

### 🤔 Gradio là gì?

Theo gradio.app: **"Gradio is the fastest way to demo your machine learning model with a friendly web interface so that anyone can use it, anywhere."**

Đúng thứ ta cần: một giao diện thân thiện để bất kỳ ai cũng dùng được model ở bất kỳ đâu. Ngày nay, khi công bố nghiên cứu ML, người ta thường kèm demo Gradio — ví dụ Salesforce tích hợp demo **BLIP** lên Hugging Face Spaces.

Luồng cốt lõi của Gradio rất đơn giản:

```text
Input  →  Function (model)  →  Output
```

Với Food Vision Mini: ảnh món ăn → model → nhãn pizza/steak/sushi.

### 📦 Cài đặt

```bash
pip install gradio
```

Trong Colab, chỉ cần chạy cell này. Transcript ghi nhận phiên bản **3.1.7** tại thời điểm quay — phiên bản hiện tại đã mới hơn nhiều, nhưng cú pháp cơ bản `gr.Interface` vẫn giữ nguyên.

> ⚠️ Cần kiểm chứng: các API cụ thể của Gradio có thể đổi giữa các major version (đặc biệt từ 3.x lên 4.x/5.x). Khi chạy, hãy đối chiếu với docs của bản đang cài.

### 🧩 Gradio hỗ trợ gì?

Rất nhiều loại input/output: `Textbox`, `Number`, `Slider`, `Checkbox`, `Radio`, `Image`, `Video`, `Audio`, `File`, `DataFrame`, `TimeSeries`, `Button`… Nên có thể demo gần như mọi loại model:

* **Text → Text** (dịch, phân loại).
* **Image → Label** (Food Vision Mini).
* **Text → Image** (Stable Diffusion).

### 🎨 Ví dụ đáng để xem

* **Image segmentation** — kéo ảnh vào, tô màu vùng nhận diện. Nhưng với ảnh món ăn thì kết quả không tốt vì model không train trên food.
* **Stable Diffusion** — nhập mô tả, sinh ảnh; chạy khá lâu vì tốn compute.
* **BLIP của Salesforce** — hỏi đáp/ sinh mô tả ảnh, chạy trên Hugging Face Spaces bằng Gradio.

---

Gradio mạnh nhưng học nhanh nhất là **code luôn**. Bài sau mình phác thảo hàm dự đoán sẽ gắn vào giao diện, rồi dựng app thật.
