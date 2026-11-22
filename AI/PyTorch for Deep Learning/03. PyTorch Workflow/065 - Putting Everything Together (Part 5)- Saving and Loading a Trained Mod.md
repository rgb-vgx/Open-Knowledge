---
title: 'Bài 65 — Ghép mọi thứ lại (Phần 5): Lưu và nạp model đã train'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 65
status: edited
source: '065 - Putting Everything Together (Part 5)- Saving and Loading a Trained Mod.md'
categories:
- AI
tags: []
---

# 💾 Ghép mọi thứ lại (Phần 5): Lưu và nạp model đã train

> Nguồn: `065 - Putting Everything Together (Part 5)- Saving and Loading a Trained Mod.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32775592)

Đã train xong hai model. Giờ khép vòng workflow bằng lưu và nạp model V2, lần này nhanh hơn vì đã quen. Điểm mới: model nằm trên GPU nên sau khi nạp phải đưa lại lên device.

### 🗂 Đường dẫn lưu

```python
from pathlib import Path

MODEL_PATH = Path("models")
MODEL_PATH.mkdir(parents=True, exist_ok=True)

MODEL_NAME = "01_pytorch_workflow_model_1.pth"
MODEL_SAVE_PATH = MODEL_PATH / MODEL_NAME
```

Familiar rồi: `parents=True, exist_ok=True` để không lỗi nếu thư mục đã có. Tên viết hoa `MODEL_PATH`, `MODEL_NAME` theo thói quen đặt hyperparameter viết hoa (như `EPOCHS`, `LR`).

Có thể đặt `exist_ok=False` nếu muốn báo lỗi khi thư mục đã tồn tại — tùy nhu cầu.

---

### 🔥 Lưu state dict

```python
print(f"Saving model to: {MODEL_SAVE_PATH}")
torch.save(obj=model_1.state_dict(), f=MODEL_SAVE_PATH)
```

Lưu **state dict** chứ không lưu nguyên model. Ưu/nhược điểm xem trong tài liệu "Saving and Loading Models for Inference". Với model hàng trăm layer, nhìn trực tiếp state dict không khả thi, nhưng bản chất vẫn là dictionary chứa tham số và trạng thái.

Trong thư mục `models/` sẽ có **hai** file nếu đã làm bài 58: bản của model 0 và bản của model 1.

---

### 📂 Nạp lại

```python
loaded_model_1 = LinearRegressionModelV2()
loaded_model_1.load_state_dict(torch.load(MODEL_SAVE_PATH))
```

Tạo instance mới với tham số ngẫu nhiên, rồi nạp state dict đã lưu vào. `load_state_dict` trả về `All keys matched successfully` nếu khớp kiến trúc.

---

### 🖥 Đưa model nạp lên device

Vì code đang dùng device-agnostic, model gốc nằm trên CUDA, nên model vừa nạp cũng phải đưa lên device:

```python
loaded_model_1.to(device)
next(loaded_model_1.parameters()).device   # cuda
```

Nếu bỏ bước này, khi so dự đoán với `X_test` (trên GPU) sẽ lại gặp lỗi device mismatch.

---

### ✅ Kiểm tra model nạp

```python
loaded_model_1.state_dict()
```

Cho đúng `weight`/`bias` đã train. Rồi so dự đoán:

```python
loaded_model_1.eval()
with torch.inference_mode():
    loaded_model_1_preds = loaded_model_1(X_test)

y_preds == loaded_model_1_preds
```

Tất cả `True` — model nạp cho ra dự đoán y hệt model gốc, cả hai đều trên `cuda`.

---

### 🌟 Nhìn lại cả chặng

Đã đi trọn workflow:

1. Tạo và chuẩn bị dữ liệu.
2. Build/pick model — lần này dùng `nn.Linear` lắp ghép.
3. Chọn loss function + optimizer.
4. Viết training loop, test loop.
5. Dự đoán, đánh giá.
6. Lưu và nạp model.

Đây cũng chính là bộ khung bạn sẽ dùng lại cho mọi model PyTorch sau khóa học. Sau này mình có thể **function hóa** các phần để gọn hơn, nhưng cấu trúc lõi không đổi.

---

### ✅ Tạm kết

Chúc mừng — bạn đã hoàn thành toàn bộ PyTorch Workflow. Video sau mình sẽ chỉ chỗ tìm bài tập và tài nguyên mở rộng cho phần này.
