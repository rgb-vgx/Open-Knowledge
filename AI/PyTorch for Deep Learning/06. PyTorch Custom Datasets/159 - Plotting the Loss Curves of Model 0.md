---
title: 'Vẽ loss curve của Model 0'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 159
status: edited
source: '159 - Plotting the Loss Curves of Model 0.md'
categories:
- AI
tags: []
---

# 📈 Vẽ loss curve của Model 0

> Nguồn: `159 - Plotting the Loss Curves of Model 0.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32748174)

Train xong nhưng kết quả chưa như ý. Trước khi tìm cách cải thiện, ta cần **nhìn** xem model học thế nào qua thời gian — bằng **loss curve**. Bài này mình viết hàm `plot_loss_curves` và giải thích cách đọc độ dốc của đường cong.

### 📉 Loss curve là gì?

**Loss curve** là cách theo dõi **tiến trình của model theo thời gian**. Trục dọc là **loss**, trục ngang là **số bước** (epoch hoặc batch). Cách đọc cơ bản:

* **Loss giảm dần** theo thời gian (đi từ trái-trên xuống phải-dưới) → model đang học tốt.
* **Accuracy tăng dần** theo thời gian → model đang cải thiện.

Đây là bước *evaluating* trong PyTorch workflow (kiểu giống TensorBoard, nhưng làm tay bằng Matplotlib).

### 🔥 Hàm `plot_loss_curves`

```python
def plot_loss_curves(results):
    """Plots training curves of a results dictionary."""
    loss = results["train_loss"]
    test_loss = results["test_loss"]

    accuracy = results["train_acc"]
    test_accuracy = results["test_acc"]

    epochs = range(len(results["train_loss"]))

    plt.figure(figsize=(15, 7))

    # Loss
    plt.subplot(1, 2, 1)
    plt.plot(epochs, loss, label="train_loss")
    plt.plot(epochs, test_loss, label="test_loss")
    plt.title("Loss")
    plt.xlabel("Epochs")
    plt.legend()

    # Accuracy
    plt.subplot(1, 2, 2)
    plt.plot(epochs, accuracy, label="train_accuracy")
    plt.plot(epochs, test_accuracy, label="test_accuracy")
    plt.title("Accuracy")
    plt.xlabel("Epochs")
    plt.legend()
```

### 🔍 Giải thích

* Lấy bốn list từ dict `results`: `train_loss`, `test_loss`, `train_acc`, `test_acc`.
* **`epochs = range(len(results["train_loss"]))`** — trục ngang là số epoch (bằng độ dài của list loss).
* **`subplot(1, 2, 1)`** — một hàng hai cột; ô 1 vẽ **loss** (train vs test), ô 2 vẽ **accuracy** (train vs test).
* **`legend()`** — hiện chú thích để phân biệt train/test.

### 👀 Đọc kết quả

```python
plot_loss_curves(model_0_results)
```

Với 5 epoch, đường **loss** có xu hướng **đi xuống** (đúng hướng), đường **accuracy** có xu hướng **đi lên** — nhưng còn thấp. Điều này khớp với con số định lượng: model chưa đạt như mong muốn. Nếu train lâu hơn, đường có thể tiếp tục đi đúng hướng — nhưng không ai biết chắc cho tới khi thử.

### 💡 Mục đích chính: xem xu hướng

Ở giai đoạn này, ta chủ yếu nhìn **trend**, chưa cần phân tích sâu. Xu hướng lý tưởng: loss giảm, accuracy tăng. Nhưng có nhiều kiểu loss curve khác nhau (underfitting, overfitting...) và cách đọc chúng — mình sẽ nói ở bài sau.

### ✅ Tạm kết

Loss curve của Model 0 đi đúng hướng nhưng còn thấp. Trước khi thử cải thiện, bài sau ta xem các **dạng loss curve** khác nhau: lý tưởng, underfitting, overfitting — và cách xử lý. Hẹn các bạn ở đó.
