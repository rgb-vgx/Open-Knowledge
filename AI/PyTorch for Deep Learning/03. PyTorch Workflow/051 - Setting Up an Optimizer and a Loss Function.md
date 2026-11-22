---
title: 'Bài 51 — Thiết lập optimizer và loss function'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 51
status: edited
source: '051 - Setting Up an Optimizer and a Loss Function.md'
categories:
- AI
tags: []
---

# ⚖️ Thiết lập optimizer và loss function

> Nguồn: `051 - Setting Up an Optimizer and a Loss Function.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32708224)

Đây là chặng thú vị nhất từ đầu khóa: chuẩn bị train model đầu tiên. Nhìn người khác train thì như phép thuật, nhưng tự viết code thì còn vui hơn. Mục tiêu của training loop là **giảm loss** — và giảm loss thì chấm đỏ mới tiến về phía chấm xanh lá.

### 📉 Chọn loss function: `L1Loss`

PyTorch có cả chục loss function trong `torch.nn`. Không cần học hết một lúc, chỉ cần biết chia nhóm:

* **Regression** (dự đoán ra một con số): `L1Loss`, `MSELoss`...
* **Classification**: cross entropy — sẽ dùng ở phần sau.

Bài toán của mình là regression nên chọn `L1Loss`. Tài liệu PyTorch mô tả nó đo **mean absolute error** giữa từng phần tử của input và target.

Cái tên hơi rối: `L1Loss` chính là MAE, còn `MSELoss` là mean squared error và được gọi là L2. Mỗi thư viện đặt tên một kiểu, cần thời gian làm quen.

```python
loss_fn = nn.L1Loss()
```

Có thể viết tay bằng `torch.mean(torch.abs(...))`, nhưng dùng phiên bản của `torch.nn` được khuyến nghị.

Khi chấm đỏ trùng khít chấm xanh lá, loss sẽ bằng **0** — điểm lý tưởng.

---

### ⚙️ Chọn optimizer: `SGD`

Loss function và optimizer làm việc cùng nhau, nên thường được chọn chung một bước. Optimizer lấy loss rồi chỉnh `weight`/`bias` để loss nhỏ lại.

`torch.optim` chứa đủ loại thuật toán. Nổi tiếng nhất là **SGD — stochastic gradient descent** ("stochastic" nghĩa là ngẫu nhiên). Có các biến thể như Adam cũng rất phổ biến. Chọn cái nào là một phần nghệ thuật, một phần khoa học, phải thử.

Mình bắt đầu với SGD vì phổ biến nhất:

```python
optimizer = torch.optim.SGD(params=model_0.parameters(), lr=0.01)
```

Hai tham số cần truyền:

* `params` — những tham số nào cần tối ưu.
* `lr` — **learning rate** (tốc độ học).

`lr` là tham số **bắt buộc, phải tự truyền** với `SGD` trong phiên bản PyTorch của khóa học (1.10) — lúc đó nó không có giá trị mặc định.

---

### 🎚 Learning rate quan trọng cỡ nào?

Gần như là **hyperparameter quan trọng nhất**. Phân biệt cho rõ:

* **Parameter**: giá trị model tự học (weight, bias).
* **Hyperparameter**: giá trị *bạn* — người làm dữ liệu — tự đặt (learning rate).

Learning rate quyết định optimizer bước lớn hay nhỏ mỗi lần chỉnh tham số:

* `lr` lớn → mỗi bước nhảy lớn.
* `lr` nhỏ → thay đổi nhỏ, chậm mà chắc.

Không có công thức chọn `lr`; kinh nghiệm và thử nghiệm sẽ dạy bạn.

---

### 🔄 SGD hoạt động ra sao?

SGD thử chỉnh tham số theo hướng ngẫu nhiên, thấy hướng nào giảm loss thì tiếp tục đi theo hướng đó. Ví dụ: tăng `weight` thấy loss giảm → tiếp tục tăng đến khi loss không giảm nữa (ví dụ dừng ở `0.65`) thì thôi. Với `bias` cũng vậy, nếu giảm mà loss tăng thì đổi sang tăng.

---

### ✅ Tạm kết

Đã có đủ cặp bài trùng: `L1Loss` để đo cái sai, `SGD` để sửa tham số. Bước tiếp theo trong workflow là **training loop** — nơi mọi thứ ráp lại. Hẹn các bạn ở bài sau.
