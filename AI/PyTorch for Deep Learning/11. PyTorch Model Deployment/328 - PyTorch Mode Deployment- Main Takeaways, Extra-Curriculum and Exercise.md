---
title: 'Bài 328 — Tổng kết Milestone Project 3 và hướng đi tiếp'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 328
status: edited
source: '328 - PyTorch Mode Deployment- Main Takeaways, Extra-Curriculum and Exercise.md'
categories:
- AI
tags: []
---

# 🏁 Tổng kết: từ dự đoán đường thẳng đến hai app ML trên internet

> Nguồn: `328 - PyTorch Mode Deployment- Main Takeaways, Extra-Curriculum and Exercise.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34142074)

Chào các bạn. Các bạn nên tự hào vì đã đi hết chặng này. Từ chỗ dự đoán một đường thẳng bằng PyTorch ở phần fundamentals, giờ mình đã deploy **hai** model computer vision lên internet cho mọi người dùng.

### 🎯 Takeaway 1: deployment quan trọng ngang training

Khi có một model chạy tốt, câu hỏi tiếp theo nên là: *"Làm sao deploy nó và cho người khác dùng?"* Vì chỉ khi ra thế giới thật, model mới được kiểm tra bằng **ultimate test set** — dữ liệu không nằm trong train/test của bạn.

Và trước khi train, hãy luôn hỏi: *"Có model pretrained cho bài toán này chưa?"* Hugging Face, torchvision và các thư viện domain của PyTorch là nơi tìm.

### 🧭 Ba câu hỏi lớn của model deployment

1. **Use case lý tưởng** của model là gì? Nghĩ từ đó rồi làm ngược lại.
2. Model **chính xác đến đâu**?
3. Model **nhanh đến đâu**?

Với Food Vision, use case là chạy trên **mobile**, cần nhanh và dự đoán **real-time**. Có nhiều lựa chọn triển khai:

* **On-device (Edge)** — chạy ngay trên thiết bị.
* **Cloud** — chạy trên máy khác, không phải thiết bị của người dùng.
* Kết hợp với **online prediction (real-time)** hoặc **offline prediction (batch)**.

### 🛠️ Công cụ đã dùng

* **Hugging Face Spaces** — cách dễ nhất để bắt đầu, đồng thời là nơi tuyệt vời để dựng **portfolio ML**.
* **Gradio** — dựng giao diện demo nhanh.

Mình đã có Food Vision Mini và Food Vision Big trên Hugging Face. Các bạn có thể tiếp tục xây portfolio theo hướng này.

### 🔬 Không ngừng thí nghiệm

Ngay trong Milestone này, mình đã thử:

* Hai kiến trúc: **EffNetB2** và **ViT**.
* Dùng **20%** Food101 thay vì toàn bộ.

Hướng mở rộng tự nhiên: dùng **100% dữ liệu** Food101 (chú ý thời gian train sẽ tăng khoảng 5 lần). Kết quả hiện tại khoảng **57–58%** accuracy.

### 🧩 Bài học cuối: ML Ops

Model deployment là một phần của **MLOps** (Machine Learning Operations) — mở rộng của **DevOps**. MLOps bao gồm mọi phần kỹ thuật quanh việc train model:

* Thu thập và lưu trữ dữ liệu.
* Xử lý dữ liệu.
* Deploy model.
* Monitoring, versioning...

Khóa này chưa đi hết các mảng đó, nhưng các bạn đã **thực hành deploy một model ra thế giới thật** — điều quan trọng nhất để bắt đầu.

### 📚 Tài nguyên và bài tập

* Phần **PyTorch Extra Resources** trong ebook: sách ML/DL, thư viện PyTorch, nơi tìm dataset, công cụ theo domain (CV, NLP, speech, time series...), và cả hướng dẫn tìm việc ML engineer.
* **Template notebook** và **solutions notebook** cho bài tập, kèm video walkthrough trên YouTube.
* Bài viết mình thích: *"Moving ML Inference from the Cloud to the Edge"* — gợi ý đọc thêm.

---

Cảm ơn các bạn đã đồng hành hết Milestone Project 3. Giờ các bạn đã có hai demo ML sống trên internet — hãy chia sẻ link, thử ảnh của mình, và tiếp tục phá thử giới hạn của model. Hẹn gặp ở phần tiếp theo!
