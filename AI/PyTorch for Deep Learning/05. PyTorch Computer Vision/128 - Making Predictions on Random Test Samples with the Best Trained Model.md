---
title: 'Bài 128 — Dự đoán trên các mẫu test ngẫu nhiên với model tốt nhất'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 128
status: edited
source: '128 - Making Predictions on Random Test Samples with the Best Trained Model.md'
categories:
- AI
tags: []
---

# 🎲 Dự đoán trên các mẫu test ngẫu nhiên với model tốt nhất

> Nguồn: `128 - Making Predictions on Random Test Samples with the Best Trained Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32889538)

Số liệu đã có, nhưng đây là computer vision — phải **nhìn** mới hiểu. Bài này mình viết hàm `make_predictions`, bốc 9 ảnh ngẫu nhiên từ test set, cho model dự đoán, rồi chuẩn bị dữ liệu để vẽ ở bài sau.

### 🧭 Nhắc lại bối cảnh

Model 0 (linear) 83.4%, Model 1 (phi tuyến) kém hơn, Model 2 (CNN) tốt nhất nhưng train lâu nhất. Một điều đáng nói: chạy lại notebook có thể ra thời gian train khác — tùy Google Colab cấp phần cứng nào. Vì vậy cứ đo và ghi lại, đừng so sánh tuyệt đối giữa các lần.

---

### 🛠️ Hàm `make_predictions`

```python
def make_predictions(
    model: torch.nn.Module,
    data: list,
    device: torch.device = device,
):
    pred_probs = []
    model.to(device)
    model.eval()

    with torch.inference_mode():
        for sample in data:
            sample = torch.unsqueeze(sample, dim=0).to(device)

            pred_logit = model(sample)
            pred_prob = torch.softmax(pred_logit.squeeze(), dim=0)

            pred_probs.append(pred_prob.cpu())

    return torch.stack(pred_probs)
```

Đi từng bước:

* **`pred_probs = []`** — danh sách hứng xác suất dự đoán.
* **`model.eval()` + `torch.inference_mode()`** — chế độ đánh giá, tắt autograd.
* **`torch.unsqueeze(sample, dim=0)`** — thêm chiều batch, vì mỗi mẫu chỉ là `[1, 28, 28]`.
* **`softmax(..., dim=0)`** — từ **logit** (output thô) sang **xác suất**.
* **`.cpu()`** — Matplotlib không làm việc với tensor trên GPU, nên phải kéo về CPU.
* **`torch.stack(pred_probs)`** — gộp list các tensor thành một tensor.

---

### 🎯 Bốc mẫu ngẫu nhiên

```python
import random
random.seed(42)

test_samples = []
test_labels = []

for sample, label in random.sample(list(test_data), k=9):
    test_samples.append(sample)
    test_labels.append(label)

print(test_samples[0].shape)  # torch.Size([1, 28, 28])
print(test_labels[0])         # ví dụ: 5 (Sandal)
```

Lưu ý: đây là `test_data` (dataset gốc), **không phải** `test_dataloader`. `random.sample(..., k=9)` chọn 9 mẫu — chọn 9 vì lát nữa vẽ lưới 3x3.

Mỗi phần tử của `test_data` là một tuple `(image, label)`, nên `for sample, label in ...` tách được cả hai. Xem thử ảnh:

```python
plt.imshow(test_samples[0].squeeze(), cmap="gray")
plt.title(class_names[test_labels[0]])
```

Kết quả: một chiếc giày cao gót, nhãn `Sandal`.

---

### 🔢 Chuyển xác suất thành nhãn

```python
pred_probs = make_predictions(model=model_2, data=test_samples)
pred_classes = pred_probs.argmax(dim=1)

print(pred_classes)
```

`argmax(dim=1)` lấy vị trí xác suất cao nhất — chính là **nhãn dự đoán**. Giờ `pred_classes` cùng định dạng với `test_labels`, so sánh được trực tiếp.

Đây là bước quan trọng: không so xác suất với nhãn, mà so **nhãn với nhãn**, "apples to apples".

---

### 💡 Vì sao phải set seed?

Để bạn và mình bốc ra cùng 9 ảnh, dễ đối chiếu. Muốn thật sự ngẫu nhiên thì comment `random.seed(42)`.

---

### ✅ Tạm kết

Đã có `test_samples`, `test_labels`, `pred_probs` và `pred_classes`. Bài sau mình vẽ 9 ảnh kèm nhãn thật và nhãn dự đoán — tô xanh nếu đúng, đỏ nếu sai — để "nhìn thấy" model đang nghĩ gì.
