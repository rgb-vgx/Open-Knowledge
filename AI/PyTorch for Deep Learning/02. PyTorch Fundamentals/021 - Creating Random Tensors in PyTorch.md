---
title: 'Tạo tensor ngẫu nhiên và vì sao neural network cần số random'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 21
status: edited
source: '021 - Creating Random Tensors in PyTorch.md'
categories:
- AI
tags: []
---

# 🎲 Tạo tensor ngẫu nhiên và vì sao neural network cần số random

> Nguồn: `021 - Creating Random Tensors in PyTorch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656954)

Bài trước chúng ta đã tạo tensor bằng tay. Bài này mình sẽ giới thiệu **random tensor** — và lý do vì sao chúng lại là một phần cốt lõi của neural network, chứ không chỉ để cho vui.

### 🔠 Nhắc lại quy ước đặt tên

Trước khi đi tiếp, một mẹo về nomenclature (cách gọi tên):

* **Scalar, vector** thường được đặt biến **chữ thường**, ví dụ `y`.
* **Matrix, tensor** thường được đặt biến **chữ in hoa**, ví dụ `MATRIX`, `TENSOR`.

Mình không chắc vì sao lại thành quy ước, nhưng các bạn sẽ thấy điều này khắp code machine learning và các paper nghiên cứu. Đó cũng là lý do mình viết hoa tên biến tensor ở bài trước.

Và nhắc lại để nhớ:

| Tên | Số chiều |
|---|---|
| Scalar | 0 (một con số) |
| Vector | 1 (có hướng) |
| Matrix | 2 |
| Tensor | tùy ý |

---

### 🎲 Vì sao cần random tensor?

Đây là ý tưởng lớn của neural network:

> Mạng neural **bắt đầu bằng những tensor chứa số ngẫu nhiên**, rồi điều chỉnh những số đó để biểu diễn dữ liệu tốt hơn.

Lặp đi lặp lại: **bắt đầu với số random → nhìn dữ liệu → cập nhật số → nhìn dữ liệu → cập nhật số...** Đó chính là cốt lõi của neural network.

Nên random tensor không phải trò chơi — nó là điểm khởi đầu của quá trình học.

---

### 🛠️ Tạo random tensor với `torch.rand`

```python
random_tensor = torch.rand(3, 4)
random_tensor
```

Kết quả là một tensor kích thước `3 × 4` toàn số ngẫu nhiên. Trong PyTorch, **size** và **shape** được dùng lẫn cho nhau, cùng nghĩa.

Kiểm tra số chiều:

```python
random_tensor.ndim
```

Trả về `2` — vì có hai cặp ngoặc vuông.

Có thể thử các kích thước khác:

```python
torch.rand(10, 10).ndim        # 2 chiều
torch.rand(10, 10, 10).ndim    # 3 chiều, 10 * 10 * 10 = 1000 phần tử
```

Khi tensor lên tới hàng trăm nghìn hay hàng triệu phần tử, PyTorch sẽ lo phần tạo ra chúng phía sau.

---

### 🖼️ Random tensor giống một ảnh

Một ứng dụng rất hay: tạo tensor có **cùng shape với tensor ảnh**.

Khi chuyển ảnh thành tensor, shape thường gồm **height, width và số color channel**:

```python
height = 224
width = 224
color_channels = 3

random_image_tensor = torch.rand(height, width, color_channels)
random_image_tensor.shape
random_image_tensor.ndim
```

Kết quả: `torch.Size([224, 224, 3])`, `ndim = 3` — một chiều cho height, một cho width, một cho color channels.

Ba channel là **red, green, blue (RGB)** — chỉ với ba màu này có thể tạo ra gần như mọi màu. Một cách rất phổ biến để biểu diễn ảnh là tách ảnh thành các color channel rồi biểu diễn dưới dạng tensor.

Có lúc các bạn sẽ thấy color channels đứng **đầu** (`[3, 224, 224]`), có lúc đứng **cuối** (`[224, 224, 3]`). Trong code có thể đổi qua lại dễ dàng — phần này sẽ học sau.

---

### 🎯 Chốt lại

Bài học lớn: **gần như mọi dữ liệu đều có thể biểu diễn thành tensor**, và với ảnh, shape thường là `height × width × color_channels`. PyTorch cho phép tạo tensor ngẫu nhiên rất dễ bằng `torch.rand`.

Và tại sao random tensor quan trọng? Vì neural network **khởi đầu bằng số ngẫu nhiên**, nhìn dữ liệu (như tensor ảnh), điều chỉnh những con số đó cho khớp hơn, rồi lặp lại.

Bài tập: tự tạo một random tensor với kích thước tùy thích — ví dụ `torch.rand(5, 10, 10)` — xem nó trông thế nào. Hẹn gặp các bạn ở bài sau!
