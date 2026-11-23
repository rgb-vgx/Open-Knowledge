---
title: 'Bài 131 — Đánh giá dự đoán của model bằng confusion matrix'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 131
status: edited
source: '131 - Evaluating Our Best Models Predictions with a Confusion Matrix.md'
categories:
- AI
tags: []
---

# 🟦 Đánh giá dự đoán của model bằng confusion matrix

> Nguồn: `131 - Evaluating Our Best Models Predictions with a Confusion Matrix.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32881836)

Accuracy chỉ cho một con số. Confusion matrix cho thấy **model nhầm lớp nào với lớp nào** — và đó là một trong những cách đánh giá classification mình thích nhất. Bài này ta tạo ma trận bằng `torchmetrics` rồi vẽ bằng `mlxtend`.

### 🧮 Tạo ma trận

```python
from torchmetrics import ConfusionMatrix
from mlxtend.plotting import plot_confusion_matrix

confmat = ConfusionMatrix(task="multiclass", num_classes=len(class_names))
confmat_tensor = confmat(
    preds=y_pred_tensor,
    target=test_data.targets,
)

print(confmat_tensor)
```

* **`ConfusionMatrix(task="multiclass", num_classes=...)`** — khai báo bài toán multiclass và số lớp bằng `len(class_names)`.
* **`confmat(preds=..., target=...)`** — truyền nhãn dự đoán và nhãn thật. `test_data.targets` là toàn bộ nhãn của test set (PyTorch gọi là "targets", mình hay gọi là "labels").
* Kết quả là một tensor `10 x 10`.

> Ghi chú: code gốc tại thời điểm quay khóa viết `ConfusionMatrix(num_classes=len(class_names))`. Các bản `torchmetrics` mới **yêu cầu** tham số `task`, nên ở đây đã thêm `task="multiclass"` để chạy được với bản hiện tại.

Cách đọc: **hàng** là nhãn thật, **cột** là nhãn dự đoán. Ô `[i, j]` là số mẫu thật lớp `i` bị dự đoán thành lớp `j`.

---

### 🎨 Vẽ ma trận

```python
fig, ax = plot_confusion_matrix(
    conf_mat=confmat_tensor.numpy(),
    class_names=class_names,
    figsize=(10, 7),
)
```

* Matplotlib thích làm việc với NumPy, nên `.numpy()` trước khi vẽ.
* `class_names` để dán nhãn hàng/cột bằng chữ.
* `figsize=(10, 7)` — kích thước vừa đẹp trong Colab.

---

### 📖 Đọc kết quả

**Đường chéo lý tưởng:** nếu model hoàn hảo, toàn bộ số liệu nằm trên đường chéo, các ô còn lại bằng 0. Ở đây đường chéo rất đậm — model khá tốt — nhưng vẫn có ô lệch đáng chú ý.

Các nhầm lẫn nổi bật:

* **Shirt ↔ T-shirt/top** — dự đoán `shirt` khi thật là `t-shirt/top` và ngược lại. Đúng như ta đã thấy khi nhìn ảnh.
* **Shirt ↔ Coat** — dự đoán `shirt` khi thật là `coat`.
* **Pullover ↔ Coat / Shirt** — nhầm giữa các loại áo khoác/áo dài tay.
* **Sneaker ↔ Ankle boot** — nhầm hai loại giày.

---

### 🧠 Những nhầm lẫn này có "hợp lý" không?

Phần lớn là **hợp lý về mặt thị giác**: áo khoác và áo pullover trông giống nhau, sneaker và ankle boot đều là giày. Model nhầm ở chỗ người cũng có thể nhầm.

Điều này gợi ý hai hướng:

* Nhãn có thể cần **gộp** hoặc định nghĩa rõ hơn.
* Hoặc chấp nhận rằng đây là giới hạn của bài toán ảnh xám 28x28.

---

### 🔬 Confusion matrix dùng để làm gì?

* Không chỉ biết "sai bao nhiêu %", mà biết **sai kiểu gì**.
* Phát hiện nhóm lớp dễ nhầm → ưu tiên cải thiện (thêm dữ liệu, đổi kiến trúc).
* Kiểm tra xem lỗi có "hợp lý" không, hay model đang học sai hoàn toàn.

---

### 📚 Muốn thêm metric?

Ngoài confusion matrix, `torchmetrics` còn precision, recall, F1… — rất đáng đọc qua, nhất là khi làm bài toán mà accuracy không đủ (ví dụ dữ liệu mất cân bằng).

---

### ✅ Tạm kết

Confusion matrix xác nhận: model tốt nhưng nhầm các lớp na ná nhau — đúng như dự đoán từ lúc xem ảnh. Phần đánh giá gần xong. Việc cuối cùng của một quy trình chuẩn: **lưu model** để dùng lại. Đó là nội dung bài sau.
