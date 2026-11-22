---
title: 'Training setup của ta thiếu gì so với paper ViT?'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 263
status: edited
source: '263 - Discussing what Our Training Setup Is Missing.md'
categories:
- AI
tags: []
---

# 🔎 Training setup của ta thiếu gì so với paper ViT?

> Nguồn: `263 - Discussing what Our Training Setup Is Missing.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34049486)

Lần đầu train ViT custom, kết quả tệ nhất trong cả dự án Food Vision Mini. Kiến trúc ta replicate **đúng** rồi — vậy quy trình train khác gì paper? Đây là những gì mình phát hiện.

### 📊 Khác biệt lớn nhất: dữ liệu

Paper dùng những bộ dữ liệu khổng lồ để khảo sát khả năng mở rộng của model:

* **ImageNet-1k**: 1000 lớp, **1,3 triệu ảnh**.
* **ImageNet-21k**: 21.000 lớp, **14 triệu ảnh**.
* **JFT**: bộ dữ liệu nội bộ của Google, khoảng **303 triệu ảnh** độ phân giải cao.

Trong khi đó Food Vision Mini chỉ có khoảng **200-225 ảnh** — ít hơn hàng **triệu lần**. Model cùng quy mô, nhưng paper có nhiều "cơ hội học" hơn rất nhiều. Trong deep learning, **nhiều dữ liệu hơn gần như luôn tốt hơn**.

Nếu muốn thử: có thể tải **toàn bộ Food 101** (101.000 ảnh, 101 lớp) vào Colab và train với cùng setup — chỉ cần chuẩn bị lại train/test dataloader. Nhưng cẩn thận, nó sẽ train lâu hơn đáng kể.

---

### 🔁 Khác biệt thứ hai: số epoch

Ta chỉ train **10 epoch**, còn paper train tùy theo dataset:

* Dataset càng lớn thì càng ít epoch.
* ImageNet-21k (14 triệu ảnh): **90 epoch**.
* ImageNet-1k (1,3 triệu ảnh): **300 epoch**.

Bạn có thể thử train 100 epoch để xem sao — đáng để thử.

---

### 🎛️ Ba kỹ thuật ta chưa dùng

Paper còn dùng thêm ba thứ (mà ta bỏ qua):

1. **Learning rate warmup** — bắt đầu với lr nhỏ rồi tăng dần tới giá trị mong muốn (paper dùng 10k steps).
2. **Learning rate decay** — giảm dần lr khi tiến gần kết quả tốt, kiểu **linear** hoặc **cosine**.
3. **Gradient clipping** — chặn độ lớn của gradient để SGD không nhảy quá mạnh vào vùng loss cao, "phá" những gì đã học được.

Cả ba chủ yếu để **chống overfitting** (regularization). PyTorch có sẵn: `torch.nn.utils.clip_grad_norm_` cho gradient clipping, và `torch.optim.lr_scheduler` cho lr decay (linear, cosine).

---

### 🎢 Overfitting và underfitting: đi trên dây

Đây gần như là toàn bộ machine learning — giữ thăng bằng giữa **overfitting** (train loss thấp hơn test loss) và **underfitting** (chưa chạm tới tiềm năng).

Cách thêm dữ liệu để giảm underfitting, nhưng nếu thêm quá nhiều mà model có **quá nhiều tham số** (learning capacity lớn) thì lại overfit. Vì vậy ta dùng regularization để ghìm lại.

---

### 💡 Cách mình thích train

**Overfit trước, regularize sau.** Train với càng nhiều dữ liệu và tham số càng tốt để chạm trần năng lực, rồi áp regularization (warmup, lr decay, gradient clipping) để kéo overfitting xuống. Model hiện tại của ta đang **underfit** nhiều hơn overfit, nên ưu tiên đầu tiên là **thêm dữ liệu**.

---

### ✅ Tiếp theo

Ta sẽ **vẽ loss curve**, rồi áp một kỹ thuật mình rất thích đã học ở Section 6 — đó là **transfer learning**. Hẹn gặp ở bài sau!
