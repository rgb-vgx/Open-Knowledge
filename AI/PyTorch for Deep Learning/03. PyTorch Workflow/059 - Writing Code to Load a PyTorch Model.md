---
title: 'Bài 59 — Viết code nạp lại model PyTorch'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 59
status: edited
source: '059 - Writing Code to Load a PyTorch Model.md'
categories:
- AI
tags: []
---

# 📂 Viết code nạp lại model PyTorch

> Nguồn: `059 - Writing Code to Load a PyTorch Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32725748)

Đã lưu model dưới dạng state dict. Giờ nạp lại. Điểm mấu chốt: vì chỉ lưu **state dict** chứ không lưu nguyên model, ta phải tạo một instance mới của class rồi nhét state dict đã lưu vào đó.

### 🧩 Tạo instance mới với tham số ngẫu nhiên

```python
loaded_model_0 = LinearRegressionModel()
loaded_model_0.state_dict()
```

Lúc này `loaded_model_0` được khởi tạo bằng **tham số ngẫu nhiên**, chưa liên quan gì đến model đã train. Đây là bước chuẩn bị.

---

### 🔥 Nạp state dict

Vì `LinearRegressionModel` là subclass của `nn.Module`, ta gọi được `load_state_dict` trên instance:

```python
loaded_model_0.load_state_dict(torch.load(f=MODEL_SAVE_PATH))
```

`torch.load` đọc object đã lưu bằng `torch.save`. Theo tài liệu, nó dùng cơ chế unpickling của Python, nhưng xử lý **storage** (phần dữ liệu bên dưới tensor) đặc biệt: storage được giải tuần tự trên **CPU** trước, rồi mới chuyển sang **device** mà nó được lưu từ trước. Điểm này quan trọng khi sau này chuyển sang GPU.

Kết quả in ra `All keys matched successfully` — state dict khớp hoàn toàn với kiến trúc model.

Giờ `loaded_model_0.state_dict()` cho đúng các giá trị đã train, ví dụ `weight ≈ 0.6990`, `bias ≈ 0.2990`.

---

### 🎯 Kiểm tra bằng dự đoán

Đặt model ở eval mode và dùng inference mode:

```python
loaded_model_0.eval()
with torch.inference_mode():
    loaded_model_preds = loaded_model_0(X_test)
```

Làm tương tự với model gốc:

```python
model_0.eval()
with torch.inference_mode():
    y_preds = model_0(X_test)
```

Rồi so sánh:

```python
y_preds == loaded_model_preds
```

---

### 🐛 Một phen troubleshoot

Lần đầu so sánh ra toàn `False` — hóa ra `y_preds` đang giữ giá trị cũ từ cell trước, không phải dự đoán mới của `model_0`. Sửa bằng cách chạy lại cell tạo `y_preds` với `model_0` hiện tại. Sau đó phép so sánh trả về `True` ở mọi phần tử, xác nhận hai model cho ra dự đoán **giống hệt nhau**.

Đây là kiểu lỗi rất hay gặp khi làm việc trong notebook: biến cũ còn sót từ lần chạy trước. Cách chắc ăn là chạy lại đúng cell cần thiết.

---

### ✅ Tạm kết

Quy trình lưu/nạp hoàn chỉnh:

1. Lưu: `torch.save(model.state_dict(), path)`.
2. Nạp: tạo instance mới → `instance.load_state_dict(torch.load(path))`.
3. Kiểm tra: so sánh dự đoán của model gốc và model nạp.

Còn một phương án lưu cả nguyên model, để dành đọc thêm trong tài liệu "Saving and Loading Models". Vài bài tới mình sẽ tổng hợp tất cả những gì đã làm vào một ví dụ end-to-end.
