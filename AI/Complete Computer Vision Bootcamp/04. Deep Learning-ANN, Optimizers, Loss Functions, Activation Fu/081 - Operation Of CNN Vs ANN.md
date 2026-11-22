---
title: 'Bài 081 — So sánh phép toán của CNN và ANN'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 81
status: edited
source: '081 - Operation Of CNN Vs ANN.md'
categories:
- AI
tags: []
---

# ⚖️ CNN vs ANN: cùng tinh thần, khác phép toán

> Nguồn: `081 - Operation Of CNN Vs ANN.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979407)

Chào các bạn! ANN và CNN dùng chung khung **forward → loss → backward → cập nhật weights**, nhưng phép toán ở lớp đầu khác nhau: ANN nhân **weights**, CNN nhân với **filter**. Bài này mình đặt hai bên cạnh nhau để thấy điểm giống và khác — và giải thích **vì sao CNN hay đi kèm ReLU**.

### 🧱 Nhắc lại ANN

Trong mạng hai lớp (input → hidden → output), mỗi neuron làm:

1. `Z = WᵀX + b`
2. Áp **activation function** (ví dụ ReLU) → `O`

Rồi forward propagation tính loss, optimizer cập nhật weights.

### 🔲 CNN thay weights bằng filter

Ở CNN, ảnh đi qua **các filter**. Mỗi filter đóng vai trò như **một lớp V1/V2/V3…** trong visual cortex:

* V1 → tìm **cạnh**.
* V2 → **màu sắc**, pattern.
* V3/V4/V5 → **phân loại, object detection, pattern recognition**.

Tương tự, mỗi filter trích một loại thông tin: **vertical edge**, rồi filter khác bắt horizontal, pattern, hình dạng… Bạn có thể dùng **bao nhiêu filter tùy ý**, kích thước **3×3, 5×5**… Mỗi filter cho ra **một output** (ví dụ mỗi filter cho một ảnh `4×4`).

Điểm mấu chốt: giống weights của ANN, **giá trị filter được khởi tạo ngẫu nhiên** khi train từ đầu, rồi **cập nhật qua forward/backward propagation** — mạng tự học filter nào hữu ích.

### ⚡ Vì sao sau convolution là ReLU

Ngay sau phép convolution, ta áp **ReLU** (`max(0, x)`) lên **từng giá trị** của output.

Lý do: khi backpropagate để học giá trị filter, cần **đạo hàm**. **Đạo hàm của ReLU là `0` hoặc `1`** — nên:

* Tính đạo hàm dễ dàng.
* **Không dính vanishing gradient**.

Nhờ vậy filter được cập nhật ổn định. (Bạn có thể dùng **biến thể của ReLU** — Leaky ReLU, PReLU… — miễn là lấy đạo hàm được.)

```text
ANN:  Z = WᵀX + b     →  ReLU   (trong hidden neuron)
CNN:  ảnh * filter    →  ReLU   (trên output convolution)
```

### 🔗 Điểm tương đồng

Cả hai đều:

1. Forward propagation với một phép biến đổi tuyến tính.
2. Áp **ReLU** ngay sau đó.
3. Dùng **cùng kỹ thuật backpropagation** để học tham số (weights ở ANN, filter ở CNN).

Khác biệt chỉ ở **bản chất tham số và phép toán**: ANN nhân vector weights, CNN trượt filter qua ảnh. Kể cả khi ảnh là **RGB 3 channel**, filter vẫn được học qua backpropagation như vậy.

### ➡️ Tiếp theo

Sau convolution và ReLU, bước tiếp theo trong CNN là **max pooling**. Bài sau ta xem nó làm gì. Hẹn gặp lại!
