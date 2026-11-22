---
title: 'Bài 58 — Viết code lưu model PyTorch'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 58
status: edited
source: '058 - Writing Code to Save a PyTorch Model.md'
categories:
- AI
tags: []
---

# 💾 Viết code lưu model PyTorch

> Nguồn: `058 - Writing Code to Save a PyTorch Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32723802)

Bạn đã từng quay lại Colab sau khi uống cà phê và phát hiện notebook ngắt kết nối chưa? Toàn bộ biến, model đã train tan biến, phải `Runtime → Run all` lại từ đầu. Với dataset nhỏ thì không sao, nhưng model lớn mà train hàng giờ thì đó là thảm họa. May thay, PyTorch có cách lưu model xuống file.

### 🗂 Ba phương thức cần biết

PyTorch có ba phương thức chính cho lưu/nạp model (lưu rồi thì phải có nạp):

1. `torch.save` — lưu object PyTorch theo **định dạng pickle** của Python.
2. `torch.load` — nạp object đã lưu.
3. `nn.Module.load_state_dict` — nạp **state dict** đã lưu vào model.

---

### 📖 `state_dict` là gì?

Theo tài liệu PyTorch: các **learnable parameters** (weight, bias) của một `nn.Module` nằm trong `model.parameters()`. **State dict** là một **Python dictionary** ánh xạ từng layer tới parameter tensor của nó.

```python
model_0.state_dict()
```

Model nhỏ thì dễ đọc; model triệu tham số thì nhìn vào rối mắt, nhưng nguyên lý vẫn vậy. Optimizer cũng có `state_dict()` riêng — cần biết để sau này lưu checkpoint.

---

### ✅ Cách được khuyến nghị: lưu state dict

Tài liệu PyTorch (mục "Saving and Loading Models for Inference") khuyến nghị lưu **state dict**. Có thể lưu cả nguyên model, nhưng để dành làm extra curriculum — tự đọc và so sánh ưu/nhược điểm.

---

### 🔥 Code lưu model

Bước 1: tạo thư mục chứa model bằng `pathlib`:

```python
from pathlib import Path

# 1. Create models directory
MODEL_PATH = Path("models")
MODEL_PATH.mkdir(parents=True, exist_ok=True)
```

`parents=True` cho phép tạo cả thư mục cha, `exist_ok=True` tránh lỗi nếu thư mục đã có.

Bước 2: đặt tên và tạo đường dẫn:

```python
# 2. Create model save path
MODEL_NAME = "01_pytorch_workflow_model_0.pth"
MODEL_SAVE_PATH = MODEL_PATH / MODEL_NAME
```

Quy ước phổ biến là dùng đuôi `.pth` hoặc `.pt`; cả hai đều ổn, miễn **đường dẫn lúc lưu và lúc nạp khớp nhau**.

Bước 3: lưu state dict:

```python
print(f"Saving model to: {MODEL_SAVE_PATH}")
torch.save(obj=model_0.state_dict(), f=MODEL_SAVE_PATH)
```

`torch.save` nhận `obj` (object cần lưu) và `f` (file-like object, string, hoặc os.PathLike chứa tên file). Ở đây object là state dict, còn đường dẫn là `MODEL_SAVE_PATH`.

Kiểm tra bằng terminal:

```bash
ls models
```

Sẽ thấy file `01_pytorch_workflow_model_0.pth`. Từ Colab có thể tải file về máy hoặc lưu lên Google Drive.

---

### ⚠️ Lưu trong Colab cẩn thận

File lưu trong Colab sẽ mất khi runtime ngắt kết nối. Muốn giữ lâu, tải về máy hoặc lưu lên Google Drive.

---

### ✅ Tạm kết

Model đã được lưu. Bài tập: đọc trước tài liệu `torch.load`, thử tự nạp model trở lại xem có hoạt động không. Bài sau mình sẽ làm việc đó cùng nhau.
