---
title: 'Bài 130 — Dự đoán toàn bộ test set và cài thư viện vẽ confusion matrix'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 130
status: edited
source: '130 - Making Predictions and Importing Libraries to Plot a Confusion Matrix.md'
categories:
- AI
tags: []
---

# 🧮 Dự đoán toàn bộ test set và cài thư viện vẽ confusion matrix

> Nguồn: `130 - Making Predictions and Importing Libraries to Plot a Confusion Matrix.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32884880)

Muốn vẽ confusion matrix thì cần dự đoán trên **toàn bộ** 10.000 ảnh test, không chỉ 9 mẫu. Bài này mình dự đoán hết test set, cài `torchmetrics` + `mlxtend`, và vấp vài trục trặc Colab rất thực tế.

### 🎯 Ba bước để có confusion matrix

1. Dự đoán trên toàn bộ test set.
2. Tạo ma trận bằng `torchmetrics`.
3. Vẽ bằng `mlxtend` (`plot_confusion_matrix`).

`torchmetrics` là thư viện metric "chuẩn PyTorch": accuracy, precision, recall, F1, confusion matrix… hơn 25 metric cho classification. `mlxtend` là thư viện tiện ích, có sẵn hàm vẽ confusion matrix rất đẹp.

### 🔁 Dự đoán toàn bộ test set

```python
from tqdm.auto import tqdm

y_preds = []
model_2.eval()

with torch.inference_mode():
    for X, y in tqdm(test_dataloader, desc="Making predictions"):
        X, y = X.to(device), y.to(device)

        y_logit = model_2(X)
        y_pred = torch.softmax(y_logit, dim=1).argmax(dim=1)

        y_preds.append(y_pred.cpu())

y_pred_tensor = torch.cat(y_preds)
```

* **`desc="Making predictions"`** — chữ hiển thị cạnh progress bar.
* **`softmax(dim=1)`** — trên batch `[32, 10]`, xác suất chuẩn hóa theo chiều lớp.
* **`argmax(dim=1)`** — nhãn dự đoán cho từng ảnh trong batch.
* **`torch.cat(y_preds)`** — nối list các tensor thành một tensor dài.

Kết quả `len(y_pred_tensor) == 10000` — đúng một dự đoán mỗi ảnh test.

> ⚠️ Cần kiểm chứng: transcript gốc mô tả bước `squeeze()` rồi "arg max across the first dimension". Với batch `[32, 10]`, `argmax(dim=0)` sẽ gộp nhầm theo chiều batch và không thể ra 10.000 dự đoán. Muốn mỗi ảnh một nhãn, phải dùng `dim=1` như code trên. Bạn hãy tự in shape trước/sau để kiểm chứng.

Nếu `softmax` chỉ để lấy nhãn thì có thể bỏ qua và lấy thẳng `argmax` trên logit — kết quả nhãn y hệt. Làm cả softmax cho đủ bước, và để có **xác suất** dùng cho việc khác.

### 📦 Cài `torchmetrics` và `mlxtend`

Colab thời điểm đó chưa có `torchmetrics`, và `mlxtend` mặc định là bản cũ (0.14), trong khi `plot_confusion_matrix` cần **0.19.0+**.

```python
try:
    import torchmetrics, mlxtend
    assert int(mlxtend.__version__.split(".")[1]) >= 19
except:
    !pip install -q torchmetrics -U mlxtend
    import torchmetrics, mlxtend
    print(mlxtend.__version__)
```

Giải thích ý tưởng:

* `try` — nếu đã có đủ thì bỏ qua bước cài.
* `assert` — kiểm tra "minor version" của `mlxtend` (phần giữa hai dấu chấm) phải ≥ 19.
* `except` — nếu thiếu/sai version thì `pip install -q torchmetrics -U mlxtend` (`-q` im lặng, `-U` nâng cấp).

### 🔄 Restart runtime cho chắc

Sau khi nâng cấp `mlxtend`, Colab thường yêu cầu **restart runtime** để nạp đúng version. Sau restart:

1. **Run all** để chạy lại mọi cell.
2. Notebook sẽ dừng ở cell gặp lỗi device mismatch (từ bài 119). Bỏ qua cell đó và chọn **Run after**.
3. Chờ model train lại, rồi quay lại cell cài đặt.

Kiểm tra lại: `print(mlxtend.__version__)` phải ra `0.19.0` hoặc cao hơn.

### 💡 Bài học thực chiến

Cài/nâng cấp package trong Colab là kỹ năng sẽ dùng suốt sự nghiệp. Quy trình chuẩn: thử import → kiểm tra version → cài nếu thiếu → restart nếu cần → chạy lại.

### ✅ Tạm kết

Đã có `y_pred_tensor` chứa 10.000 dự đoán, và môi trường đã sẵn sàng để vẽ. Bài sau mình tạo confusion matrix và đọc nó để tìm ra những cặp lớp model hay nhầm nhất.
