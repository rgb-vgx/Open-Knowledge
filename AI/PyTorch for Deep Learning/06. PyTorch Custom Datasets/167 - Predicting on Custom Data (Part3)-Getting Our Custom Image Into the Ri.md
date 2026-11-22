---
title: 'Dự đoán trên dữ liệu mới (phần 3): đưa ảnh về đúng format'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 167
status: edited
source: '167 - Predicting on Custom Data (Part3)-Getting Our Custom Image Into the Ri.md'
categories:
- AI
tags: []
---

# 🔧 Dự đoán trên dữ liệu mới (phần 3): đưa ảnh về đúng format

> Nguồn: `167 - Predicting on Custom Data (Part3)-Getting Our Custom Image Into the Ri.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32775614)

Đây là bài "đau khổ" nhất nhưng cũng dạy nhiều nhất: đưa một ảnh custom qua model, ta lần lượt vấp **cả ba lỗi lớn** — dtype, shape, device — rồi cuối cùng cũng ra được một **logit dự đoán**. Quy tắc vàng: dữ liệu mới phải **đúng format như lúc train** (dtype `torch.float32`, shape `[1, 3, 64, 64]`, đúng device).

### ⚠️ Lỗi 1: dtype mismatch

```python
model_1.eval()
with torch.inference_mode():
    custom_image_pred = model_1(custom_image_uint8.to(device))
```

Báo **"Input type ... uint8"** trong khi model cần `float32`. Sửa bằng cách đọc lại ảnh và ép dtype:

```python
custom_image = torchvision.io.read_image(str(custom_image_path)).type(torch.float32)
```

---

### ⚠️ Lỗi 2: shape quá lớn

Ảnh gốc shape khoảng **4032×3024** — quá lớn. Ta resize về 64×64 bằng transform pipeline:

```python
from torchvision import transforms

custom_image_transform = transforms.Compose([
    transforms.Resize((64, 64)),
])
custom_image_transformed = custom_image_transform(custom_image)
```

Cũng lưu ý: giá trị pixel ban đầu là **0–255**; model train trên ảnh **0–1** (do `ToTensor()`). Nếu cần, chia cho **255** để đưa về [0, 1] — 255 là giá trị tối đa của kênh màu RGB.

---

### 👀 Hệ quả của resize

Từ ảnh nét cao (hàng nghìn pixel) xuống 64×64, ảnh trông **rất vỡ hạt**. Mình vẫn nhận ra là pizza (vì mình biết nó là pizza), nhưng model thì khó hơn. Đây là gợi ý cải thiện: có thể tăng kích thước ảnh train (ví dụ **224×224**) — nhìn 224×224 rõ hơn hẳn 64×64.

---

### ⚠️ Lỗi 3: device mismatch

```python
custom_image_pred = model_1(custom_image_transformed)  # lỗi device
```

Báo **"Expected all tensors on the same device"**. Ảnh ở CPU, model ở CUDA — đưa ảnh lên device.

---

### ⚠️ Lỗi 4: thiếu batch dimension

Sau khi đưa lên device vẫn lỗi, vì model cần **chiều batch**. `custom_image_transformed` có shape `[3, 64, 64]`; cần thành `[1, 3, 64, 64]`:

```python
custom_image_transformed_with_batch_size = custom_image_transformed.unsqueeze(dim=0)
print(custom_image_transformed.shape)               # [3, 64, 64]
print(custom_image_transformed_with_batch_size.shape)  # [1, 3, 64, 64]
```

Khi dự đoán một ảnh đơn, ta luôn phải thêm chiều batch = 1.

---

### ✅ Ra được kết quả

```python
model_1.eval()
with torch.inference_mode():
    custom_image_pred = model_1(custom_image_transformed_with_batch_size.to(device))

print(custom_image_pred)  # logits cho pizza, steak, sushi
```

Đây là các **logit** — chưa phải nhãn, chưa phải xác suất. Ta vẫn còn một bước chuyển thành tên lớp, nhưng đã đi được phần khó nhất.

---

### 💡 Ba lỗi sẽ theo bạn suốt

Bất kể ảnh, audio hay text, ba lỗi luôn rình rập:

1. **Sai dtype** (uint8 vs float32).
2. **Sai shape** (thiếu chiều batch, sai kích thước).
3. **Sai device** (CPU vs CUDA).

---

### ✅ Tạm kết

Code hiện nằm rải rác khoảng mười cell chỉ để dự đoán một ảnh. Bài sau mình **function hóa** toàn bộ thành một hàm `pred_and_plot_image` để tái sử dụng. Hẹn các bạn ở đó.
