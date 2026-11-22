---
title: 'Bài 333 — Cài đặt và xác minh PyTorch 2.0'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 333
status: edited
source: '333 - Getting Setup for PyTorch 2.md'
categories:
- AI
tags: []
---

# ⚙️ Kiểm tra và cài PyTorch 2.0 trước khi code

> Nguồn: `333 - Getting Setup for PyTorch 2.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745218)

Video trước mình đã nói về API `torch.compile` và việc nó tối ưu model bên dưới như thế nào. Giờ ta chuyển sang code. Nhưng trước hết, các bạn cần chắc chắn mình thật sự có PyTorch 2.0.

### 📊 Mức tăng tốc trung bình là bao nhiêu?

Theo tài liệu tham khảo, mức tăng tốc trung bình của `torch.compile`:

* **~38%** với **TIMM** (torch image models).
* **~76%** với **TorchBench**.
* **~52%** với model **Hugging Face Transformers**.

Làm sao nó làm được vậy? Có một bài tổng quan dài ba phút giải thích **operator fusion** — như mình bàn ở video intro — và **graph capture**. Các bạn đọc thêm trong phần tài nguyên.

---

### ✅ Xác minh phiên bản PyTorch

Coi như ta vừa làm xong phần tổng quan 30 giây. Giờ hãy giả vờ chưa có sẵn PyTorch 2.0 và kiểm tra xem máy có không.

Nếu chạy **local**, các bạn có thể cần **nâng cấp** PyTorch để dùng được tính năng 2.x. Còn **Google Colab** hiện mặc định đã có PyTorch 2.0.

Mình lấy đoạn code kiểm tra từ **learnpytorch.io → PyTorch 2 intro** dán vào notebook. Nó sẽ:

1. **Kiểm tra phiên bản** PyTorch.
2. **Cài bản mới nhất** nếu cần.
3. **In ra vài thông tin hữu ích** về môi trường.

Chạy xong là ta đã sẵn sàng.

---

### 🔜 Bước tiếp theo: lấy thông tin GPU

Video sau, mình sẽ lấy một loạt đặc điểm của GPU. Vì sao cần biết thông tin GPU? Vì như đã bàn, tính năng chính của PyTorch 2.0 — `torch.compile` — **chạy tốt nhất trên GPU NVIDIA đời mới**, do phần mềm tận dụng phần cứng mới hơn.

Hẹn các bạn ở video đó.
