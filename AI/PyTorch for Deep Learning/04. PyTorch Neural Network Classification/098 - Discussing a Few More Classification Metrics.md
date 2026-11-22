---
title: 'Bàn thêm vài metric đánh giá model phân loại'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 98
status: edited
source: '098 - Discussing a Few More Classification Metrics.md'
categories:
- AI
tags: []
---

# 📏 Bàn thêm vài metric đánh giá model phân loại

> Nguồn: `098 - Discussing a Few More Classification Metrics.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32896492)

Dataset blobs hoá ra **linearly separable**, nên model chạy tốt cả khi không có non-linearity. Nhưng đa số dữ liệu thật cần cả linear lẫn non-linear — vì vậy non-linearity vẫn đáng để có. Giờ sang phần cuối: **đánh giá model phân loại** bằng nhiều metric hơn accuracy.

### 🎯 Accuracy — metric mặc định (nhưng có bẫy)

Accuracy = trong 100 mẫu, model đoán đúng bao nhiêu. Model của mình đạt **gần 100%** trên test — gần hoàn hảo, chỉ sai vài mẫu khó nằm lẫn trong cụm khác.

Nhưng có **lưu ý quan trọng**: accuracy **không tốt với dữ liệu mất cân bằng**. Ví dụ có **1000 mẫu lớp 1** nhưng chỉ **10 mẫu lớp 0** — model đoán "lớp 1" tất cả vẫn được accuracy cao, trong khi thực chất vô dụng với lớp 0.

### ⚖️ Precision và Recall

Hai metric quan trọng khi các lớp có **số lượng mẫu khác nhau**:

* **Precision** = `TP / (TP + FP)`. Precision cao → **ít false positive**.
* **Recall** = `TP / (TP + FN)`. Recall cao → **ít false negative**.

*(TP = true positive, TN = true negative, FP = false positive, FN = false negative.)*

Nếu **false positive** là thứ không muốn (ví dụ báo động giả), ưu tiên **precision**. Nếu **false negative** là thứ không muốn (bỏ sót bệnh nhân), ưu tiên **recall**.

Nhưng có **precision-recall trade-off**: tăng precision thường làm giảm recall và ngược lại. Các bạn sẽ thấy điều này qua thực nghiệm.

Tài liệu mình khuyến khích đọc thêm: bài *"Beyond Accuracy: Precision and Recall"* của Will Koehrsen — giải thích rất hay khi nào dùng cái nào.

### 🎼 F1-score, confusion matrix, classification report

* **F1-score** — kết hợp precision và recall, hữu ích khi muốn một con số **cân bằng** giữa hai phía.
* **Confusion matrix** — bảng đối chiếu nhãn thật với nhãn dự đoán, thấy rõ model nhầm lớp nào với lớp nào.
* **Classification report** (của scikit-learn) — tổng hợp mọi metric trên vào một báo cáo.

Có sẵn ở cả **scikit-learn** (`precision_score`, `recall_score`, `f1_score`, `confusion_matrix`, `classification_report`) lẫn **TorchMetrics** (`torchmetrics.functional.precision`, `recall`…). Để dành làm bài tập mở rộng.

### 🔧 `torchmetrics` trong thực tế

Cài và dùng:

```python
!pip install torchmetrics

from torchmetrics import Accuracy

torchmetric_accuracy = Accuracy(task="multiclass", num_classes=4).to(device)
torchmetric_accuracy(y_preds, y_blob_test)
```

Kết quả: **99.5%** — khớp với hàm accuracy tự viết. `torchmetrics` cung cấp rất nhiều metric "kiểu PyTorch" (xem module `torchmetrics.classification`).

### ⚠️ Bẫy device với torchmetrics

Lần đầu chạy, mình lại văng lỗi quen thuộc: **"Expected all tensors to be on the same device, but found at least two devices"**. Vì metric object mặc định nằm trên **CPU**, còn `y_preds`/`y_blob_test` nằm trên **CUDA**. Vì `torchmetrics` viết theo kiểu PyTorch, nó cũng phải tuân thủ quy tắc device-agnostic — nhớ `.to(device)` cho metric object.

### 🏁 Tổng kết hành trình

Đến đây mình đã đi trọn **workflow PyTorch cho classification** — cả **binary** lẫn **multiclass**: data → model → loss/optimizer → training loop → đánh giá. Nhưng hành trình chưa dừng: *building* và *evaluating* quan trọng như nhau. Hai khẩu hiệu song hành:

* **Visualize, visualize, visualize** — của người khám phá dữ liệu.
* **Experiment, experiment, experiment** — của người làm machine learning.

Bài sau là phần **bài tập** để các bạn tự luyện.
