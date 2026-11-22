---
title: 'Bài 276 — Các công cụ và nơi chốn để deploy model'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 276
status: edited
source: '276 - Some Tools and Places to Deploy Machine Learning Models.md'
categories:
- AI
tags: []
---

# 🧰 Các công cụ và nơi chốn để deploy machine learning model

> Nguồn: `276 - Some Tools and Places to Deploy Machine Learning Models.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055218)

Có rất nhiều nơi để đặt model và nhiều công cụ để đưa nó tới đó. Không có "một lựa chọn đúng" — nó phụ thuộc vào use case của bạn. Bài này điểm qua các nhóm chính để khi gặp lại bạn biết mình đang nhìn cái gì.

### 📱 On-device, mobile, edge

* **ML Kit** của Google — cho thiết bị di động nói chung.
* **Core ML** của Apple — cho thiết bị Apple. Có package Python **coremltools** để **chuyển model** từ thư viện train bên thứ ba (TensorFlow, PyTorch) sang **ML package** dùng được trên thiết bị Apple.

---

### ☁️ Cloud

* **Google Cloud Vertex AI**
* **Amazon Web Services SageMaker**
* **Hugging Face**
* **Azure Machine Learning**
* **Gradient** — điểm cộng rất hợp với Hugging Face, và bật mí luôn: đây là thứ chúng ta sẽ dùng trong phần còn lại của section.

---

### 🔌 Giải pháp tổng quát dạng API

* **FastAPI** — deploy model thành **API**.
* **torchserve** (TorchServe) — công cụ của PyTorch để serving model ở **eager mode** và **torchscript**. Theo mô tả chính thức: "PyTorch is performant, flexible and easy to use tool for serving PyTorch eager mode and torchscripted models" — câu này khá dài dòng, nhưng hiểu đơn giản:

  * **PyTorch eager mode** là kiểu model chúng ta vẫn viết từ đầu khóa — đưa dữ liệu vào, nhận kết quả ra.
  * **torchscript** là hướng khác cho deployment: một chương trình torchscript có thể được lưu từ process Python và load trong process **không phụ thuộc Python**.

> ⚠️ Cần kiểm chứng: transcript không nêu rõ chi tiết cú pháp/tên lệnh của `torch.jit.script` hay `torch.jit.trace`; phần này chỉ ở mức khái niệm.

---

### 🌐 Muốn chạy mọi nơi: ONNX

**ONNX** (Open Neural Network Exchange) là **chuẩn mở cho khả năng tương tác của machine learning**. Một trong những ứng dụng hay nhất là **onnxruntime web runtime** để chạy model ngay trong **browser**.

| Nhóm | Công cụ tiêu biểu |
|---|---|
| Edge / mobile | ML Kit (Google), Core ML (Apple) + coremltools |
| Cloud | Vertex AI, SageMaker, Hugging Face, Azure ML, Gradient |
| API serving | FastAPI, TorchServe |
| Interoperability | ONNX / onnxruntime (web runtime) |

---

### 🧭 Chọn cái nào?

Mình chỉ điểm qua ở mức cao vì mỗi công cụ có thể ngốn hàng tuần, hàng tháng để học sâu. Điều quan trọng là **biết chúng tồn tại**, rồi đi vào docs khi cần.

* Làm app ảnh (như Food Vision Mini) → cân nhắc hướng edge/mobile hoặc một nền tảng cloud có sẵn hosting.
* Làm app sinh ảnh → có thể cần hạ tầng khác hẳn.
* Chỉ muốn "deploy model thành API" → bắt đầu với **FastAPI**, rồi lên **TorchServe** nếu cần nhiều tính năng chuyên cho ML hơn.
* Muốn model chạy gần như ở đâu cũng được → **ONNX**.

Ngoài ra, khi đi làm bạn có thể gặp AWS ở công ty này, FastAPI ở công ty khác — nên kỹ năng quan trọng là đọc docs và thích nghi.

---

Đủ lý thuyết rồi. Bài sau mình sẽ chốt lại những gì sắp làm và bắt tay vào thực hành — có một "spoiler" nho nhỏ mình để dành. Hẹn gặp các bạn ở đó.
