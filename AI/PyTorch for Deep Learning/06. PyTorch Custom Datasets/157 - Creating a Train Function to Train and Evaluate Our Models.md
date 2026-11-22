---
title: 'Viết hàm train gộp train_step và test_step'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 157
status: edited
source: '157 - Creating a Train Function to Train and Evaluate Our Models.md'
categories:
- AI
tags: []
---

# 🔂 Viết hàm `train` gộp `train_step` và `test_step`

> Nguồn: `157 - Creating a Train Function to Train and Evaluate Our Models.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32748166)

Bài này hiện thực hóa thử thách: một hàm **`train`** gọi cả `train_step` lẫn `test_step` trong vòng lặp `epoch`, đồng thời **ghi lại kết quả** từng epoch vào dict, và hiện **progress bar** bằng `tqdm`. Viết một lần, dùng cho mọi model về sau.

### 📊 `tqdm` cho progress bar

```python
from tqdm.auto import tqdm
```

Không gì thú vị bằng ngồi nhìn neural network train — progress bar cho biết đang ở epoch nào.

---

### 🔥 Hàm `train`

```python
from tqdm.auto import tqdm

def train(model, train_dataloader, test_dataloader,
          optimizer, loss_fn=nn.CrossEntropyLoss(),
          epochs=5, device=device):
    # 1. Dict kết quả
    results = {
        "train_loss": [], "train_acc": [],
        "test_loss": [], "test_acc": [],
    }

    # 2. Lặp qua từng epoch
    for epoch in tqdm(range(epochs)):
        train_loss, train_acc = train_step(model, train_dataloader, loss_fn, optimizer, device)
        test_loss, test_acc = test_step(model, test_dataloader, loss_fn, device)

        print(
            f"Epoch: {epoch+1} | "
            f"train_loss: {train_loss:.4f} | train_acc: {train_acc:.4f} | "
            f"test_loss: {test_loss:.4f} | test_acc: {test_acc:.4f}"
        )

        results["train_loss"].append(train_loss)
        results["train_acc"].append(train_acc)
        results["test_loss"].append(test_loss)
        results["test_acc"].append(test_acc)

    return results
```

---

### 🔍 Giải thích

* **`loss_fn=nn.CrossEntropyLoss()`** — mặc định hợp lý cho bài **multiclass classification**; có thể truyền loss khác nếu muốn.
* **`epochs=5`** — mặc định train 5 epoch.
* **Gọi `train_step`** với `train_dataloader`, rồi **`test_step`** với `test_dataloader`, cả hai đều nhận `loss_fn` và `device` (test không cần optimizer).
* **`results` dict** — mỗi list bốn khóa `train_loss`, `train_acc`, `test_loss`, `test_acc`; `.append()` mỗi epoch để vẽ loss curve sau này.
* **Format `:.4f`** — in 4 chữ số thập phân cho gọn.

Ban đầu mình để type annotation `epochs: int = 5` thì Colab báo lỗi kiểu `Epochs is not defined`, nên đã bỏ annotation đi. Chuyện thường ngày.

---

### ⚖️ Lưu ý

Đây chỉ là **một cách** triển khai, không phải "gold standard". Theo thời gian các bạn sẽ cần thêm chức năng (logging, early stopping, lưu checkpoint...) và tự viết thêm. Nhưng hàm này đủ để train model ngay.

---

### ✅ Tạm kết

Ta đã có dữ liệu (đã thành tensor), có model (TinyVGG), có vòng train. Còn thiếu **loss function** và **optimizer**. Bài sau mình chọn hai thứ đó rồi dùng chính hàm `train` để huấn luyện **Model 0** trên custom dataset. Hẹn các bạn ở đó.
