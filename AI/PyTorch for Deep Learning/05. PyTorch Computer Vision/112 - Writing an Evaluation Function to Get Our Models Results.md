---
title: 'Bài 112 — Viết hàm đánh giá để lấy kết quả model'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 112
status: edited
source: '112 - Writing an Evaluation Function to Get Our Models Results.md'
categories:
- AI
tags: []
---

# 📊 Viết hàm đánh giá để lấy kết quả model

> Nguồn: `112 - Writing an Evaluation Function to Get Our Models Results.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920332)

Bài trước viết xong training loop nhưng chưa chạy. Bài này mình chạy thử — gặp lỗi indentation kinh điển — rồi rút ra kết quả baseline đầu tiên. Sau đó mình **function hóa** phần đánh giá để tái sử dụng cho nhiều model.

### 🐛 Lần chạy đầu: lỗi một dấu cách

Bấm chạy và… `IndentationError`. Hóa ra một dòng bị thụt lề lệch đúng một space. Cả khối code đúng, chỉ sai mỗi khoảng trắng. Bài học: khi gặp lỗi lạ, kiểm tra indentation trước.

---

### 🎉 Chạy lại và kết quả

Sau khi sửa, progress bar chạy. Kết quả baseline:

* **Train loss**: 0.4550
* **Test loss**: 0.4766
* **Test accuracy**: khoảng **83.4%**
* **Thời gian train**: khoảng 21–22 giây (trên CPU)

83.4% chỉ với hai linear layer và không có phi tuyến — khá ấn tượng cho một baseline.

Lưu ý quan trọng: **số của bạn có thể khác**. Do tính ngẫu nhiên, kể cả set manual seed vẫn có thể lệch chút. Cùng "realm" là được: accuracy quanh 83% thì bình thường; rơi xuống 25% thì có gì đó sai.

Thời gian train phụ thuộc rất nhiều vào phần cứng (Daniel dùng Colab Pro, CPU nhanh hơn bản free). Nếu thời gian của bạn gấp mười lần thì nên xem lại code; nhanh hơn mười lần thì cứ tận hưởng phần cứng xịn.

---

### 🧰 Function hóa phần đánh giá

Ta sắp có nhiều model (0, 1, 2…), nên cần một hàm nhận model + dataloader và trả về kết quả. Quy tắc chung: **code viết nhiều lần thì function hóa**.

```python
def eval_model(
    model: torch.nn.Module,
    data_loader: torch.utils.data.DataLoader,
    loss_fn: torch.nn.Module,
    accuracy_fn,
):
    """Returns a dictionary containing the results of model predicting on data_loader."""
    loss, acc = 0, 0
    model.eval()
    with torch.inference_mode():
        for X, y in data_loader:
            y_pred = model(X)

            loss += loss_fn(y_pred, y)
            acc += accuracy_fn(y_true=y, y_pred=y_pred.argmax(dim=1))

        loss /= len(data_loader)
        acc /= len(data_loader)

    return {
        "model_name": model.__class__.__name__,  # chỉ hoạt động nếu model tạo từ class
        "model_loss": loss.item(),
        "model_acc": acc,
    }
```

---

### 🔍 Vài điểm đáng chú ý

* **Tham số `model`** thay cho `model_0` cứng — hàm dùng được với bất kỳ model nào.
* **`model.__class__.__name__`** lấy tên class của model. Chỉ hoạt động nếu model được tạo từ một class có tên riêng — lý do nên đặt tên class khác nhau cho từng model.
* **`.item()`** chuyển tensor một phần tử thành số Python thuần, dễ đọc và so sánh.
* **Trả về dictionary** thay vì in — nhờ vậy có thể gom kết quả nhiều model lại và so sánh sau này.

---

### 📈 Chạy thử

```python
model_0_results = eval_model(
    model=model_0,
    data_loader=test_dataloader,
    loss_fn=loss_fn,
    accuracy_fn=accuracy_fn,
)

model_0_results
# {'model_name': 'FashionMNISTModelV0', 'model_loss': 0.4766..., 'model_acc': 83.42...}
```

Thêm `tqdm` quanh `data_loader` cũng được, nhưng chỉ 313 batch nên chạy rất nhanh.

---

### ✅ Tạm kết

Baseline đạt **83.4% accuracy**. Đây là mốc để các model sau vượt qua. Còn một việc quan trọng: model đang chạy trên CPU. Bài sau mình viết device-agnostic code để đẩy lên GPU — và xem nó có nhanh hơn thật không.
