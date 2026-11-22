---
title: 'Bài 052 — Chain rule của đạo hàm trong lan truyền ngược'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 52
status: edited
source: '052 - Chain Rule Of Derivatives.md'
categories:
- AI
tags: []
---

# ⛓️ Chain rule: mắt xích để cập nhật mọi weight

> Nguồn: `052 - Chain Rule Of Derivatives.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49095883)

Chào các bạn! Ta đã có công thức cập nhật weight `w_new = w_old - lr * (∂loss/∂w_old)`. Nhưng với các lớp nằm sâu phía trước, đạo hàm không tính trực tiếp được — phải bung ra bằng **chain rule of derivatives**. Đây là chìa khóa để hiểu vì sao backpropagation lan được về tận lớp đầu.

### 🔁 Nhắc lại công thức gốc

```text
w_new = w_old - learning_rate * (∂loss / ∂w_old)
```

Mạng trong ví dụ: **input layer** → **hidden layer** (một neuron, gọi là L1) → **output layer**. Forward propagation tạo ra output `O1` sau neuron ẩn, rồi `O2` sau neuron output; tính loss từ `O2`, rồi mới backward propagation.

---

### ✂️ Chain rule cho W4

Với `W4` (weight nối hidden → output), loss phụ thuộc vào `O2`, và `O2` phụ thuộc vào `W4`. Ta tách đạo hàm:

```text
∂loss/∂W4 = (∂loss/∂O2) * (∂O2/∂W4)
```

Hai số hạng `∂O2` triệt tiêu nhau, còn lại đúng `∂loss/∂W4`. Việc **tách một đạo hàm phức thành tích các đạo hàm thành phần** chính là **chain rule**. Từng mảnh được tính riêng, nhân với learning rate, rồi trừ vào weight cũ.

---

### 🪜 Chain rule cho W1 — sâu hơn một tầng

Với `W1` (nối input → hidden), đường phụ thuộc dài hơn: loss → `O2` → `O1` → `W1`. Vậy:

```text
∂loss/∂W1 = (∂loss/∂O2) * (∂O2/∂O1) * (∂O1/∂W1)
```

Lý do: `O2` phụ thuộc `O1` (vì `O1` được nhân với `W4` rồi qua activation function), còn `O1` phụ thuộc `W1`. Cứ thế nối mắt xích cho tới weight cần cập nhật.

---

### 🧩 Thử thách: mạng hai hidden layer

Ví dụ nâng cao: mạng có **hidden layer 1** (1 neuron → `O1_1`), **hidden layer 2** (2 neuron → `O2_1`, `O2_2`), rồi **output layer** (1 neuron → `O3_1`). Vì output là nhị phân nên lớp cuối chỉ một neuron.

Câu hỏi: cập nhật `W1` (nối input → neuron ở hidden layer 1) thế nào? `W1` ảnh hưởng tới **cả hai neuron** của hidden layer 2, nên đạo hàm phải **cộng hai nhánh**:

```text
∂loss/∂W1 = ∂loss/∂O3_1 * [ (∂O3_1/∂O2_1)*(∂O2_1/∂O1_1)
                          + (∂O3_1/∂O2_2)*(∂O2_2/∂O1_1) ]
           * (∂O1_1/∂W1)
```

Mỗi nhánh là một chuỗi mắt xích riêng; vì `O1_1` góp vào cả `O2_1` lẫn `O2_2`, ta **cộng** đạo hàm của hai nhánh. Đây đúng là tinh thần chain rule: tính đạo hàm cục bộ từng chặng rồi nhân dồn lại.

---

### 🧠 Vì sao phần này quan trọng

Toàn bộ **backpropagation** là việc áp chain rule qua từng lớp. Ở mỗi bước ta chỉ cần tìm độ dốc (slope) cục bộ — và **optimizers** lo việc dùng độ dốc đó để cập nhật weight hiệu quả.

Mình để lại hai bài tập: tự viết chain rule cho `W2` và `W3`, rồi thử bung đạo hàm cho mạng hai hidden layer ở trên. Các bạn thử trước khi xem đáp án.

Bài sau ta bước sang phần hấp dẫn hơn: **loss functions**, **activation functions** và **optimizers** — vì sao chỉ sigmoid là chưa đủ, ưu nhược điểm của từng loại. Hẹn gặp lại!
