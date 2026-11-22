---
title: 'Bài 97 — Dự đoán và đánh giá model multiclass bằng decision boundary'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 97
status: edited
source: '097 - Making Predictions with and Evaluating Our Multi-Class Classification.md'
categories:
- AI
tags: []
---

# 📊 Dự đoán và đánh giá model multiclass bằng decision boundary

> Nguồn: `097 - Making Predictions with and Evaluating Our Multi-Class Classification.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32886184)

Sau một tràng lỗi data type và shape, model multiclass đã học được (loss giảm, accuracy tăng). Giờ mình đánh giá trực quan — và trả lời câu hỏi treo từ đầu: **dữ liệu này có cần non-linearity không?**

### 🔮 Dự đoán

```python
model_4.eval()
with torch.inference_mode():
    y_logits = model_4(X_blob_test)                     # logits
    y_pred_probs = torch.softmax(y_logits, dim=1)       # probabilities
    y_preds = torch.argmax(y_pred_probs, dim=1)         # labels
```

Dùng `torch.argmax` lẫn `y_pred_probs.argmax(dim=1)` đều cho cùng kết quả — chọn cách nào cũng được. Kiểm tra nhanh: index có xác suất cao nhất chính là lớp dự đoán, và nó khớp với `y_blob_test` (ví dụ `1, 3, 2, 1, 0, 3...`).

Sau ba bước, `y_preds` **cùng format** với test labels — đủ "apples to apples" để so sánh.

---

### 🗺️ Vẽ decision boundary

```python
plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.title("Train")
plot_decision_boundary(model_4, X_blob_train, y_blob_train)
plt.subplot(1, 2, 2)
plt.title("Test")
plot_decision_boundary(model_4, X_blob_test, y_blob_test)
```

Kết quả rất đẹp: bốn vùng màu được tách gần như hoàn hảo. Chỉ vài điểm nằm sâu trong vùng lớp khác là bị đoán sai — không tránh được vì các cụm chồng lấn (nhớ `cluster_std=1.5`).

---

### ❓ Thử bỏ non-linearity ra

Mình comment toàn bộ `nn.ReLU()` trong `BlobModel` rồi **retrain**. Kết quả bất ngờ: model **vẫn chạy tốt**! Lý do: **dataset blobs này linearly separable** — các cụm có thể tách bằng đường thẳng, nên không *bắt buộc* phải có non-linearity.

Nhìn kỹ, ranh giới lúc này là các **đường thẳng** hơn (ít uốn). Độ chính xác có thể lệch chút, nhưng không đáng kể vì bản chất dữ liệu tuyến tính.

---

### 🍕 Vì sao vẫn nên để non-linearity?

Dù dataset này không cần, **phần lớn dữ liệu thực tế cần cả linear lẫn non-linear**. Nhớ lại dữ liệu vòng tròn — nếu không có ReLU thì thua. Với ảnh pizza hay bất kỳ bài thị giác máy tính nào, chỉ đường thẳng gần như không đủ.

Và vì PyTorch cho phép thêm non-linearity **dễ như trở bàn tay** (uncomment một dòng), cứ để sẵn — nếu model không cần thì nó tự học ra trọng số phù hợp. Đó là vẻ đẹp của neural network: **model tự quyết định con số nào biểu diễn dữ liệu tốt nhất**.

Vậy là đã đi hết **binary → multiclass**. Còn một mảnh cuối: **các classification metric khác** ngoài accuracy. Bởi đánh giá model quan trọng ngang với train model — bài sau mình điểm qua.
