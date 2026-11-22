---
title: 'Bài 91 — Tự viết lại các hàm non-linear activation bằng PyTorch thuần'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 91
status: edited
source: '091 - Replicating Non-Linear Activation Functions with Pure PyTorch.md'
categories:
- AI
tags: []
---

# 🧩 Tự viết lại các hàm non-linear activation bằng PyTorch thuần

> Nguồn: `091 - Replicating Non-Linear Activation Functions with Pure PyTorch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32869502)

Mình đã thấy non-linear activation hoạt động. Giờ mình **viết lại chúng bằng tay** để thấy chúng chẳng có gì bí hiểm. Bản chất neural network: mình không bảo model phải học gì, mà **trao cho nó công cụ** — các hàm tuyến tính và phi tuyến — để nó tự tìm pattern. Thử thách của bài 90 (vượt 80% accuracy) các bạn cứ để dành luyện — tinh thần data scientist là *experiment, experiment, experiment*.

### 🧱 Bắt đầu từ một tensor

```python
# Create a tensor
A = torch.arange(-10, 10, 1, dtype=torch.float32)
A.dtype
# torch.float32
```

Một chi tiết thú vị: nếu bỏ `dtype=torch.float32`, tensor sẽ là **`torch.int64`** — vì `arange` với bước **1** sinh ra số nguyên. PyTorch mặc định **integer → int64**, nhưng **float → float32**. Với các phép toán sắp tới, phải là **float32**, nếu không sẽ dễ văng lỗi dtype.

Vẽ `A` ra: đó là một **đường thẳng** từ -10 đến 10. Linear thì ra đường thẳng — dễ hiểu.

---

### 🔦 ReLU: `max(0, x)`

```python
def relu(x: torch.Tensor) -> torch.Tensor:
    return torch.maximum(x, torch.tensor(0.0))
```

ReLU = **maximum giữa 0 và input**. Vì `torch.maximum` so từng phần tử với 0:

* Input âm → 0 lớn hơn → trả về **0**.
* Input dương → input lớn hơn → giữ **nguyên giá trị**.

So sánh:

```python
plt.plot(torch.relu(A))     # ReLU có sẵn của PyTorch
plt.plot(relu(A))           # ReLU tự viết
```

Hai đường trùng khít — **replicate thành công**. Và để thấy rõ tác dụng: `A` có giá trị âm, sau ReLU tất cả thành 0; phần dương giữ nguyên.

---

### 🌀 Sigmoid: `1 / (1 + e^(-x))`

Hàm sigmoid kinh điển có công thức:

```text
sigmoid(x) = 1 / (1 + exp(-x))
```

```python
def sigmoid(x: torch.Tensor) -> torch.Tensor:
    return 1 / (1 + torch.exp(-x))
```

So lại với hàm built-in:

```python
plt.plot(torch.sigmoid(A))
plt.plot(sigmoid(A))
```

Hai đường **cong trùng nhau** — lại replicate đúng. `torch.sigmoid` về bản chất chỉ là công thức kia được tối ưu.

---

### 🧱 Vậy là mình đã tự dựng model từ đầu

Tính đến giờ mình đã tự viết lại:

* **`nn.Linear`** — phép biến đổi tuyến tính (ở các phần trước).
* **ReLU** — non-linearity.
* **Sigmoid** — non-linearity.

Tức là về lý thuyết, có thể viết **toàn bộ model** từ đầu bằng tay. Nhưng dùng layer của PyTorch dễ hơn nhiều, lại giống **xếp Lego**: ghép các layer có sẵn. Chúng đã được **kiểm thử lỗi**, tính toán **nhanh nhất có thể**, tận dụng **GPU** — rất nhiều lợi ích.

---

### 🎬 Điều model thực sự làm

Ghép lại toàn bộ bức tranh: model **kết hợp các lớp tuyến tính và phi tuyến** — chính những hàm mình vừa tự viết — để **giảm loss** và **tăng accuracy**, học ra pattern của dữ liệu. Nguyên lý này giống nhau từ dataset tí hon như hai vòng tròn cho tới model khổng lồ.

Đã xong **binary classification**! Giờ chuyển sang bài toán lớn hơn: **multiclass classification**. Bài sau mình ghép mọi bước của workflow lại và làm một ví dụ nhiều lớp.
