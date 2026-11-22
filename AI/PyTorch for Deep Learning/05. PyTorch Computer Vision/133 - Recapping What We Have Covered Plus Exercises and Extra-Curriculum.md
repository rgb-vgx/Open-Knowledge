---
title: 'Bài 133 — Tổng kết chặng computer vision, bài tập và tài liệu mở rộng'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 133
status: edited
source: '133 - Recapping What We Have Covered Plus Exercises and Extra-Curriculum.md'
categories:
- AI
tags: []
---

# 🏁 Tổng kết chặng computer vision, bài tập và tài liệu mở rộng

> Nguồn: `133 - Recapping What We Have Covered Plus Exercises and Extra-Curriculum.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32865834)

Nhìn lại xem ta đã viết bao nhiêu code computer vision. Từ con số 0 đến một CNN end-to-end, biết đánh giá, biết visualize, biết lưu model. Bài này mình điểm lại toàn bộ hành trình và đưa ra bài tập để các bạn tự đi tiếp.

### 🗺️ Hành trình đã qua

* Xem reference notebook và online book của section.
* Tìm hiểu các thư viện computer vision trong PyTorch — chính là `torchvision`.
* Lấy dataset **FashionMNIST** qua `torchvision.datasets`.
* Chuẩn bị **DataLoader**, chia dữ liệu thành batch.
* Dựng **baseline model** (Model 0) — bước quan trọng vì nó là mốc để cải thiện.
* Dự đoán, đánh giá, đo thời gian; phát hiện **GPU không phải lúc nào cũng nhanh hơn** với dataset nhỏ, do overhead copy dữ liệu.
* Thử **phi tuyến** (Model 1) và thấy nó **không cải thiện** baseline.
* Mang "hàng nặng": **CNN TinyVGG** (Model 2), học lại từ CNN Explainer.
* So sánh kết quả: CNN tốt nhất nhưng train lâu nhất.
* Vẽ dự đoán ngẫu nhiên và **confusion matrix** để hiểu model nhầm ở đâu.
* Lưu và tải model, kiểm tra kết quả không đổi.

### 💡 Ba bài học lớn nhất

1. **Shape và device là gốc rễ của mọi lỗi.** Shape mismatch, device mismatch, dtype mismatch — nắm ba cái này là sửa được phần lớn bug.
2. **Không có model tốt nhất tuyệt đối, chỉ có trade-off.** CNN chính xác hơn nhưng chậm hơn; baseline đơn giản có khi là lựa chọn đúng.
3. **Visualize là bắt buộc.** Accuracy là con số; ảnh dự đoán và confusion matrix mới cho biết model thực sự hiểu gì, và dataset có vấn đề gì.

### 📝 Bài tập

Ở online book, section 3 có phần **Exercises**. Tất cả đều luyện đúng code trong section này — có bài code, có bài trả lời lý thuyết.

Vài gợi ý:

* **Ba lĩnh vực công nghiệp** đang dùng computer vision là gì?
* Thử toàn bộ quy trình trên một dataset khác trong `torchvision.datasets`.
* Tăng `hidden_units` của TinyVGG, đổi kernel size, thử train lâu hơn — xem accuracy đổi ra sao.

Có **exercise template notebook** trong repo (`extras/exercises`) để điền code. Và trong `extras/solutions` có cả **video walkthrough** Daniel tự giải từng bài — nhưng hãy tự làm trước, rồi mới xem.

### 📚 Tài liệu mở rộng (extra curriculum)

* **MIT Introduction to Deep Computer Vision** — hiểu sâu hơn những gì diễn ra bên trong CNN. Rất đáng xem vì section này tập trung vào code.
* Dành 10 phút click qua các mục trong thư viện **torchvision**.
* Xem các **CNN phổ biến nhất** trong `torchvision.models` (ResNet, VGG, EfficientNet…).
* Tìm hiểu **`timm`** (Torch Image Models) — thư viện với rất nhiều pretrained model cho computer vision, sẽ gặp khi đi sâu.

### 🎯 Quay lại CNN Explainer

Lời khuyên chân thành: quay lại **CNN Explainer** nhiều lần. Daniel còn quay lại nó khi làm tài liệu cho section này. Càng chơi với các hyperparameter, bạn càng hiểu vì sao `padding=1` giữ nguyên kích thước, `stride=2` giảm một nửa, `kernel_size=3` giảm hai pixel…

### ✅ Tạm kết

Chúc mừng — các bạn đã đi hết một bài toán computer vision end-to-end. Section tiếp theo sẽ là **PyTorch custom datasets**: tự làm dataset từ dữ liệu của mình. Không spoil thêm. Hẹn gặp ở đó!
