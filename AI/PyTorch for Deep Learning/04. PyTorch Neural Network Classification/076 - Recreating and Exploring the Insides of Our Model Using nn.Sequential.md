---
title: 'Bài 76 — Dựng lại model bằng nn.Sequential và soi bên trong nó'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 76
status: edited
source: '076 - Recreating and Exploring the Insides of Our Model Using nn.Sequential.md'
categories:
- AI
tags: []
---

# 🧬 Dựng lại model bằng `nn.Sequential` và soi bên trong nó

> Nguồn: `076 - Recreating and Exploring the Insides of Our Model Using nn.Sequential.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33051812)

Mình đã có `CircleModelV0` chạy được. Nó khá đơn giản — chỉ hai lớp — nên có một cách viết gọn hơn: **`nn.Sequential`**. Bài này mình dựng lại model bằng nó, rồi mở nắp xem bên trong PyTorch đã tạo ra những gì.

### ✨ Cách gọn: `nn.Sequential`

```python
# Replicate CircleModelV0 with nn.Sequential
model_0 = nn.Sequential(
    nn.Linear(in_features=2, out_features=5),  # upscale to 5 features
    nn.Linear(in_features=5, out_features=1)   # output 1 feature
).to(device)

model_0
```

So với bản subclass, chỉ khác mỗi cái tên — bên trong là `nn.Sequential` thay vì class của mình. Đúng như tên gọi, nó **lần lượt đi qua từng lớp theo thứ tự**: lớp 1 xong tới lớp 2. Nó tự lo luôn phần `forward()` mà mình phải viết tay trước đó.

---

### ⚖️ Vậy sao không dùng `Sequential` từ đầu?

Vì `nn.Sequential` có giới hạn: nó **chỉ bước tuần tự từng lớp**. Khi cần **forward pass phức tạp** — thứ các bạn sẽ phải viết cho những bài toán về sau — phải biết tự dựng **subclass `nn.Module`**. Với mạng đơn giản, `Sequential` là lựa chọn nhanh nhất; còn subclass thì mở rộng được lên mạng phức tạp.

Có thể trộn: gán hai lớp `nn.Linear` vào một `nn.Sequential` ngay bên trong `__init__`, rồi trong `forward()` chỉ cần gọi nó với `x`. Cùng một model, khác cách viết — PyTorch cho các bạn nhiều cách để làm một việc.

---

### 🔍 Mở nắp: `state_dict()`

```python
model_0.state_dict()
```

Kết quả là các cặp **weight** và **bias** tensor cho từng lớp:

* Lớp `0` có `weight` shape `[5, 2]` và `bias` shape `[5]` — vì `out_features=5` nên bias có **5 giá trị**, còn weight là **2 × 5 = 10** con số.
* Lớp `1` có `weight` shape `[1, 5]` và `bias` shape `[1]`.

Chỉ với mạng hai lớp mà đã ngần ấy con số. Thử tưởng tượng **50 layer × 128 feature** thì kinh khủng đến mức nào. Mình chỉ đổi một giá trị trong code mà số parameter phình ra ngay.

Điều quan trọng: các con số này khởi tạo **ngẫu nhiên**, và PyTorch tự tạo hết cho các bạn. Không đặt seed thì model của các bạn sẽ khác của mình — đừng lo. Khi chạy **backpropagation** và **gradient descent** trong training loop, optimizer sẽ dịch từng giá trị này một chút để model fit dữ liệu tốt hơn.

---

### 🔮 Dự đoán với model chưa train

```python
untrained_preds = model_0(X_test.to(device))
```

Nhớ đưa `X_test` lên **cùng device** với model, nếu không PyTorch sẽ báo lỗi.

```python
print(f"Length of predictions: {len(untrained_preds)}, Shape: {untrained_preds.shape}")
print(f"Length of test samples: {len(y_test)}, Shape: {y_test.shape}")
print(f"\nFirst 10 predictions:\n{untrained_preds[:10]}")
print(f"\nFirst 10 test labels:\n{y_test[:10]}")
```

Kết quả lộ hai khác biệt:

1. **Shape**: prediction là `[200, 1]`, còn `y_test` là `[200]` — lệch nhau một chiều.
2. **Giá trị**: label là số nguyên `0` hoặc `1`, còn prediction là **số thực** nằm đâu đó giữa khoảng 0 và 1.

---

### 🟡 Làm tròn xem sao?

Mình thử `torch.round(untrained_preds)` — kết quả **toàn số 0**. Với dữ liệu cân bằng hai lớp, đoán tất cả về một phía thì accuracy rơi vào khoảng **50%** — chẳng khác tung đồng xu. Model chưa được train, cộng thêm việc chưa có non-linearity, thì chuyện này cũng dễ hiểu.

---

### 🧹 Một thói quen xấu cần sửa

Lúc dự đoán, mình quên không dùng **inference mode** nên prediction còn dính **gradient tracking**. Bọc trong `torch.inference_mode()` là gradient tracking biến mất — đúng thói quen.

Điều cần nhớ: `Sequential` là cách tạo model đơn giản nhưng hạn chế; subclass thì linh hoạt hơn. Và dù cách nào, PyTorch vẫn tự tạo weight/bias tensor đúng shape cho từng lớp. Muốn model dự đoán ra hồn, phải chọn **loss function**, **optimizer** và xây **training loop** — đó là nội dung các bài tới.
