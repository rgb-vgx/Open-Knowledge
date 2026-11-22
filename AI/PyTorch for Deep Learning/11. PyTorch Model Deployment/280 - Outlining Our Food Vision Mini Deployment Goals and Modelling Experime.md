---
title: 'Bài 280 — Đặt mục tiêu deploy và phác thảo thực nghiệm cho Food Vision Mini'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 280
status: edited
source: '280 - Outlining Our Food Vision Mini Deployment Goals and Modelling Experime.md'
categories:
- AI
tags: []
---

# 🎯 Mục tiêu deploy và phác thảo thực nghiệm Food Vision Mini

> Nguồn: `280 - Outlining Our Food Vision Mini Deployment Goals and Modelling Experime.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055222)

Đến Milestone Project 3 không có nghĩa là ngừng thực nghiệm — ngược lại, nếu chỉ nhớ một điều từ khóa này thì hãy nhớ: **experiment, experiment, experiment**. Bài này biến ba câu hỏi deploy thành con số cụ thể, rồi chọn ra hai thực nghiệm để chạy.

### 📏 "Tốt và nhanh" nghĩa là bao nhiêu?

Với ba class, mình muốn model **ít nhất 95% accuracy** — 50% thì chẳng khác gì tung đồng xu. Ngưỡng này thay đổi theo bài toán: phát hiện gian lận giao dịch có thể cần tới **99%**.

Về tốc độ, hãy lấy mốc **real-time** từ mắt người: mắt người nhận khoảng **30–60 khung hình/giây (FPS)**. Chọn đầu thấp 30 FPS làm benchmark, nghĩa là model cần dự đoán trong:

```text
1 / 30 ≈ 0.033 giây
```

Transcript làm tròn thành **30 ms** và gọi đây là **latency** — thời gian để một prediction diễn ra. Nếu app đạt 30 FPS, mắt người gần như không phân biệt được đó là tức thì.

Mục tiêu chốt lại:

* **Accuracy ≥ 95%**
* **≥ 30 FPS**, tức latency khoảng 30 ms

### 🧪 Hai thực nghiệm sẽ chạy

Hai model tốt nhất từ trước đến giờ:

1. **EfficientNet B2 feature extractor** — như ở section 07 (PyTorch Experiment Tracking).
2. **ViT (Vision Transformer) feature extractor** — như ở section 08 (PyTorch Paper Replicating).

Cả hai train trên **cùng bộ 20% pizza/steak/sushi**, lấy metrics rồi so sánh, sau đó **deploy model sát mục tiêu nhất**.

### ⚖️ Ưu tiên tốc độ

Có vô số model để thử, nhưng thử quá nhiều trước khi deploy là bẫy. **Deployment quan trọng ngang training** — cần có thứ chạy được sớm.

Và khi phải chọn, mình nghiêng về **speed** vì "a slow app is boring". Ví dụ:

| Model | Accuracy | FPS |
|---|---|---|
| A | ~90% | 25 |
| B | 98% | 2 |

Thì có thể vẫn chọn **A** — chậm quá thì app chán, dù chính xác hơn.

### 🔁 Quy trình

```text
Đặt mục tiêu (95%+, 30 FPS)
        ↓
Train EffNetB2 + ViT trên cùng dataset
        ↓
Lấy metrics, so sánh
        ↓
Deploy model gần mục tiêu nhất
```

---

Giới hạn ở vài thực nghiệm để nhanh có sản phẩm chạy được; sau đó muốn thử thêm thì thoải mái. Bài sau mình bắt tay dựng **EfficientNet B2 feature extractor** — các bạn có thể tự thử trước, vì ta đã làm việc này ở section 07 và dataset đã sẵn sàng.
