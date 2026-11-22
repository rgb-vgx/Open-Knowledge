---
title: 'Bài 90 — Dự đoán và đánh giá model phi tuyến đầu tiên'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 90
status: edited
source: '090 - Making Predictions with and Evaluating Our First Non-Linear Model.md'
categories:
- AI
tags: []
---

# 🎨 Dự đoán và đánh giá model phi tuyến đầu tiên

> Nguồn: `090 - Making Predictions with and Evaluating Our First Non-Linear Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32869498)

Model đầu tiên có "phép thuật" non-linearity đã train xong, và kết quả sau 1000 epoch **tốt hơn hẳn** mức đoán bừa 50% (dataset có 500 đỏ, 500 xanh cân bằng). Giờ mình đánh giá nó — bằng mắt. *Visualize, visualize, visualize.*

### 🔮 Dự đoán

```python
# Make predictions with model_3
model_3.eval()
with torch.inference_mode():
    y_preds = torch.round(torch.sigmoid(model_3(X_test).squeeze()))
```

Nhớ `.squeeze()` — chính chỗ gây lỗi shape ở bài trước. Lần này mình cẩn thận hơn.

```python
y_preds[:10], y_test[:10]
```

Hai bên giờ **cùng format**: đều trên **CUDA**, đều là **float**, đều là `0`/`1`. So sánh là so táo với táo. Nhìn nhanh thì phần lớn khớp, có một điểm model đoán sai — chuyện bình thường.

---

### 🗺️ Vẽ decision boundary: so sánh có và không có non-linearity

```python
plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.title("Train")
plot_decision_boundary(model_3, X_train, y_train)
plt.subplot(1, 2, 2)
plt.title("Test")
plot_decision_boundary(model_3, X_test, y_test)
```

Hàm `plot_decision_boundary` tự làm prediction trên lưới điểm rồi tô màu vùng. Kết quả của `model_3` cho thấy **ranh giới uốn cong** — hai vòng tròn được bao quanh, chứ không còn một đường thẳng cắt ngang.

Đặt cạnh nhau là thấy tương phản rõ:

* `model_1` — **không có non-linearity** → vẫn một đường thẳng, đoán bừa.
* `model_3` — **có ReLU** → ranh giới cong, bám dữ liệu.

Đây chính là sức mạnh của việc kết hợp **đường thẳng + đường cong** (linear + non-linear functions).

---

### 🧪 Chưa hoàn hảo — và đó là chỗ luyện tập

Model đạt khoảng **79% accuracy** trên test data. Tốt hơn nhiều, nhưng chưa tới đâu. Nếu để ý, vẫn có vài điểm bị phân loại sai.

---

### 🎯 Thử thách: vượt mốc 80%

Hãy cải thiện `model_3` để đạt **trên 80% accuracy** trên test. Gợi ý (đã học ở phần improving model):

* Thêm nhiều **layer** hơn — nhớ đặt **activation function** lên trên mỗi layer mới.
* Thêm **hidden unit**.
* **Fit lâu hơn** (nhiều epoch hơn).
* Hạ **learning rate** xuống dưới 0.1.

Mình tin các bạn làm được. Đây là bài tập mở rộng. Còn mình thì đi tiếp: bài sau viết code **tái tạo các hàm non-linear activation bằng PyTorch thuần** — để thấy tận mắt chúng là gì.
