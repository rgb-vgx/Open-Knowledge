---
title: 'Bài 132 — Lưu và tải model tốt nhất'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 132
status: edited
source: '132 - Saving and Loading Our Best Performing Model.md'
categories:
- AI
tags: []
---

# 💾 Lưu và tải model tốt nhất

> Nguồn: `132 - Saving and Loading Our Best Performing Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32869510)

Model 2 đã được đánh giá và đạt kết quả tốt. Bước cuối của một quy trình chuẩn: **lưu ra file** để dùng nơi khác, rồi **tải lại** và kiểm tra kết quả không đổi. Bài này mình làm cả hai, kèm cách kiểm tra bằng `torch.isclose`.

### 📁 Tạo thư mục để lưu

```python
from pathlib import Path

MODEL_PATH = Path("models")
MODEL_PATH.mkdir(parents=True, exist_ok=True)

MODEL_NAME = "03_pytorch_computer_vision_model_2.pth"
MODEL_SAVE_PATH = MODEL_PATH / MODEL_NAME

print(f"Saving model to: {MODEL_SAVE_PATH}")
# models/03_pytorch_computer_vision_model_2.pth
```

* `Path("models")` tạo đối tượng đường dẫn.
* `mkdir(parents=True, exist_ok=True)` tạo thư mục (và thư mục cha nếu cần); nếu đã tồn tại thì không báo lỗi.
* Đuôi `.pth` hoặc `.pt` đều là quy ước phổ biến cho file PyTorch.

Tổ chức thư mục gọn gàng — `data/` cho dữ liệu, `models/` cho model, file helper riêng — là thói quen tốt.

---

### 💾 Lưu `state_dict`

```python
torch.save(obj=model_2.state_dict(), f=MODEL_SAVE_PATH)
```

`state_dict()` là **dictionary các tham số đã học**: toàn bộ weight và bias. Khi mới khởi tạo, chúng là số ngẫu nhiên; sau khi train, chúng đã được cập nhật để biểu diễn dữ liệu. Lưu `state_dict` là cách khuyến nghị (nhẹ, linh hoạt hơn lưu cả model).

Chạy xong, mở thư mục `models/` sẽ thấy file `.pth`.

---

### 📥 Tải lại: phải tạo instance trước

Vì chỉ lưu `state_dict`, cần dựng lại **cùng kiến trúc** rồi nạp tham số vào:

```python
torch.manual_seed(42)

loaded_model_2 = FashionMNISTModelV2(
    input_shape=1,
    hidden_units=10,
    output_shape=len(class_names),
).to(device)

loaded_model_2.load_state_dict(torch.load(f=MODEL_SAVE_PATH))
```

Điều kiện tiên quyết: **các tham số khởi tạo phải khớp** model gốc (`input_shape=1`, `hidden_units=10`, `output_shape=10`). Nếu không khớp, `load_state_dict` sẽ báo lỗi shape mismatch.

---

### ✅ Đánh giá model vừa tải

```python
loaded_model_2_results = eval_model(
    model=loaded_model_2,
    data_loader=test_dataloader,
    loss_fn=loss_fn,
    accuracy_fn=accuracy_fn,
    device=device,
)

print(loaded_model_2_results)
```

Kết quả phải **gần như trùng** `model_2_results`. Chỉ cần nhìn loss và accuracy thấy khớp là ổn; nếu lệch nhiều thì phải kiểm tra lại (xem phần dưới).

---

### 🔬 Kiểm tra bằng code thay vì bằng mắt

```python
torch.isclose(
    torch.tensor(model_2_results["model_loss"]),
    torch.tensor(loaded_model_2_results["model_loss"]),
    atol=1e-8,
)
```

* `torch.isclose` so sánh hai tensor gần bằng nhau.
* `atol` là **absolute tolerance** — sai số tuyệt đối cho phép. `1e-8` rất chặt; nếu không qua, nới ra `1e-2` hoặc `1e-3`.

Nếu kết quả lệch nhiều (không chỉ vài chữ số thập phân), hãy xem lại: đã set seed chưa, thứ tự cell chạy đúng chưa, kiến trúc lúc load có khớp không.

---

### 💡 Vì sao phải kiểm tra?

Đánh giá model sau khi lưu/tải **quan trọng ngang lúc train**. Nếu deploy một model lưu hỏng, kết quả sẽ tệ mà không rõ nguyên nhân. Kiểm tra trước khi deploy là bước không được bỏ.

---

### ✅ Tạm kết

Model đã được lưu, tải lại, và xác nhận cho kết quả tương đương. Vậy là trọn vẹn một workflow computer vision: data → model → loss/optimizer → train → evaluate → visualize → save. Bài cuối mình tổng kết và đưa bài tập mở rộng.
