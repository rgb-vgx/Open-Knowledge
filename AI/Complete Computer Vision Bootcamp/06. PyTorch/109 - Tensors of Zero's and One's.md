---
title: 'Bài 109 — Tạo tensor toàn số 0 và toàn số 1 trong PyTorch'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 109
status: edited
source: "109 - Tensors of Zero's and One's.md"
categories:
- AI
tags: []
---

# 🧱 Tensor toàn số 0 và toàn số 1: nền móng khởi tạo trong PyTorch

> Nguồn: `109 - Tensors of Zero's and One's.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48482007)

Chào các bạn! Hôm nay mình học cách tạo ra các tensor được lấp đầy bằng **số 0** hoặc **số 1**. Nghe có vẻ đơn giản, nhưng đây chính là "xương sống" để **khởi tạo model**, tạo **placeholder** hay sinh **dữ liệu test** trong PyTorch. Mình sẽ đi từ vector một chiều đến ma trận hai chiều, rồi trực quan hóa chúng bằng matplotlib.

### 🧮 Tạo tensor toàn số 0

Mọi thứ bắt đầu bằng việc import thư viện:

```python
import torch
```

Hàm cần dùng là `torch.zeros`. Mình truyền vào số phần tử mong muốn — ví dụ `5` để có một **vector 1 chiều** gồm 5 giá trị:

```python
zeros_tensor = torch.zeros(5)
print(zeros_tensor)
```

Kết quả là một tensor mà mọi phần tử đều bằng **0**.

Nếu muốn tensor **đa chiều**, mình chỉ cần đổi shape. Ví dụ tạo ma trận `256 x 256`:

```python
zeros_tensor = torch.zeros(256, 256)
print(zeros_tensor.shape)   # torch.Size([256, 256])
print(zeros_tensor.ndim)    # 2
```

Thuộc tính `.shape` cho biết kích thước từng chiều, còn `.ndim` cho biết tensor có **2 chiều** — tức đây là một ma trận.

---

### 🖼️ Trực quan hóa tensor bằng matplotlib

Vì ma trận `256 x 256` thực chất là một ảnh xám, mình có thể hiển thị nó. Đầu tiên import:

```python
import matplotlib.pyplot as plt
```

Rồi gọi `plt.imshow` trên tensor đã chuyển sang numpy:

```python
plt.imshow(zeros_tensor.numpy(), cmap='gray', vmin=0, vmax=1)
plt.title('Dark Image')
plt.axis('off')
plt.show()
```

Có một điểm rất quan trọng mình cần nhớ: mặc định matplotlib sẽ **tự chuẩn hóa** dữ liệu về khoảng `0..1`. Nếu không khai báo gì, ảnh toàn số 0 sẽ vẫn hiển thị được, nhưng để **kiểm soát** cách hiển thị mình nên chỉ định rõ `vmin` và `vmax` — tức giá trị nhỏ nhất và lớn nhất mình mong đợi từ tensor.

Với `vmin=0, vmax=1` thì **0 là đen**, còn **1 là trắng**. Vì vậy tensor toàn 0 cho ra một ảnh đen hoàn toàn — đúng như tên "Dark Image".

---

### ⚪ Tạo tensor toàn số 1

Cú pháp y hệt, chỉ đổi `torch.zeros` thành `torch.ones`:

```python
ones_tensor = torch.ones(5)
print(ones_tensor)
```

Mọi phần tử trong vector 1 chiều giờ đều bằng **1**. Làm tương tự với ma trận `256 x 256`:

```python
ones_tensor = torch.ones(256, 256)
print(ones_tensor.shape)   # torch.Size([256, 256])
print(ones_tensor.ndim)    # 2
```

Vẫn là tensor **2 chiều**, shape `256 x 256`, chỉ khác là toàn số 1.

---

### 🧪 Vì sao ảnh toàn 1 lại "trắng trơn"?

Mình dùng lại đúng đoạn code vẽ ảnh, thay `zeros_tensor` bằng `ones_tensor`, giữ `vmin=0, vmax=1`:

```python
plt.imshow(ones_tensor.numpy(), cmap='gray', vmin=0, vmax=1)
plt.title('White Image')
plt.axis('off')
plt.show()
```

Kết quả là một ảnh trắng. Lý do: trong ảnh xám đã chuẩn hóa về `0..1`, **cường độ sáng nhất là 1 = trắng**, và nền của figure mặc định cũng là trắng — nên gần như không thấy ranh giới, chỉ còn dòng tiêu đề nổi lên.

> Mẹo nhỏ: `vmin`/`vmax` chính là "chìa khóa" để bạn không bị matplotlib tự ý co giãn độ sáng. Muốn ảnh hiển thị đúng như dữ liệu, hãy luôn đặt chúng.

---

### ✅ Chốt lại

* `torch.zeros(size)` tạo tensor toàn **0**, `torch.ones(size)` tạo tensor toàn **1**.
* Truyền một số → **vector 1D**; truyền nhiều số → **ma trận/đa chiều**.
* `.shape` xem kích thước, `.ndim` xem số chiều.
* Ma trận 2 chiều có thể hiển thị như **ảnh xám** bằng `plt.imshow(..., cmap='gray')`.
* Luôn đặt `vmin`/`vmax` khi muốn kiểm soát độ sáng thay vì để matplotlib tự chuẩn hóa.

Bài sau mình sẽ đào sâu vào **các kiểu dữ liệu (dtype)** của tensor — yếu tố ảnh hưởng trực tiếp tới bộ nhớ, tốc độ và độ chính xác. Hẹn gặp lại các bạn!
