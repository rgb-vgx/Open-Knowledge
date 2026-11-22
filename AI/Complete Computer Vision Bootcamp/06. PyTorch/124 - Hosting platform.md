---
title: 'Bài 124 — Chọn hosting platform phù hợp với từng loại ứng dụng ML'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 124
status: edited
source: '124 - Hosting platform.md'
categories:
- AI
tags: []
---

# ☁️ Hosting platform: chọn đúng chỗ để đặt model

> Nguồn: `124 - Hosting platform.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49094165)

Chào các bạn! Có model và có UI rồi, câu hỏi tiếp theo là **host ở đâu**. Mỗi nền tảng sinh ra cho một mục đích khác nhau, chọn sai thì hoặc tốn tiền vô ích, hoặc không đáp ứng được nhu cầu. Bài này mình so sánh các lựa chọn phổ biến.

### 🎯 Mục đích của hosting platform

Hosting platform dùng để **đưa model machine learning lên online** cho người khác truy cập. Nhưng "online" chưa đủ — tùy quy mô và yêu cầu mà chọn nền tảng khác nhau.

---

### 🎈 Streamlit Cloud và Hugging Face Spaces

**Streamlit Cloud** miễn phí, phù hợp **data app**, nhưng chỉ deploy được **ứng dụng viết bằng Streamlit**.

**Hugging Face Spaces** cũng miễn phí, và linh hoạt hơn: chạy được cả ứng dụng **Gradio lẫn Streamlit**. Vì vậy giữa hai lựa chọn này, Spaces có lợi thế rõ ràng hơn.

---

### ☁️ Google Cloud Run, AWS SageMaker, Lambda, EC2

**Google Cloud Run** có khả năng **serverless** và **auto scaling**. Nó phù hợp khi bạn có model đóng gói trong **Docker image** (image này gồm Linux, Python và model), rồi đưa image đó cho Cloud Run — nó tự build endpoint API, tự scale, bạn không phải quản server.

Điều kiện của Cloud Run là bạn phải có **containerized deployment**: model được wrap trong Docker image. Đổi lại, bạn không cần tạo server, không cần lo cấu hình hạ tầng — giống tinh thần serverless của AWS Lambda, Cloud Run tự lo mọi thứ từ image trở đi.

**AWS** mạnh về hiệu năng với nhiều dịch vụ, nhưng **tốn tiền**. Cụ thể:

* **AWS SageMaker** — dùng khi cần **end-to-end ML pipeline**: có GPU để train, có nơi để infer, hỗ trợ auto scaling cho real-time inference. Phù hợp ứng dụng **production** quy mô lớn (ví dụ train/fine-tune ResNet cho phân loại ảnh y tế).
* **AWS Lambda** — **serverless inference**, event-driven. Model chỉ chạy khi có người gọi (ví dụ upload ảnh), xong thì tự tắt, tiết kiệm chi phí. Hợp với model nhỏ, không cần chạy thường trực. Lambda **tự scale và tự shutdown sau khi thực thi**, nên khi hệ thống "ngủ" bạn gần như không tốn chi phí; chỉ trả tiền cho lúc được gọi.
* **AWS EC2** — một **máy ảo** đầy đủ trên cloud (RAM, CPU, GPU như máy local). Phù hợp khi bạn muốn **toàn quyền kiểm soát** training và inference, tự viết API, tự viết mọi thứ.

---

### 🧮 Chọn theo loại ứng dụng

Quy tắc chọn gọn gàng:

| Nhu cầu | Nền tảng |
|---|---|
| Demo nhanh, ít người dùng, không muốn quản hạ tầng | Streamlit / Gradio trên Streamlit Cloud hoặc HF Spaces |
| Pipeline ML end-to-end, production, auto scaling | AWS SageMaker |
| Serverless, event-driven, model nhỏ, trả tiền theo lần gọi | AWS Lambda |
| Toàn quyền kiểm soát, tự viết API, tự train | AWS EC2 |
| Model đóng gói Docker, serverless, tự scale | Google Cloud Run |

Điểm cần nhớ: **Streamlit/Gradio** là để **demo**, không phải production quy mô lớn; **SageMaker/Lambda/EC2/Cloud Run** là cho nhu cầu production với mức kiểm soát và chi phí khác nhau.

Về chi phí, Streamlit Cloud và Hugging Face Spaces **miễn phí** ở mức cơ bản; AWS và GCP có nhiều dịch vụ mạnh nhưng **tốn tiền**. Vì vậy hãy bắt đầu bằng một nền tảng miễn phí cho demo, chỉ nâng cấp khi thực sự cần độ ổn định và quy mô production.

Với dự án của mình — một demo phân loại ảnh nhỏ, ít người dùng — **Hugging Face Spaces** là lựa chọn hợp lý nhất. Bài sau mình bắt tay setup Gradio app ở máy local.
