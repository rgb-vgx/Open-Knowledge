---
title: 'Train và đánh giá Model 0 với các hàm đã viết'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 158
status: edited
source: '158 - Training and Evaluating Model 0 With Our Training Functions.md'
categories:
- AI
tags: []
---

# 🏋️ Train và đánh giá Model 0 với các hàm đã viết

> Nguồn: `158 - Training and Evaluating Model 0 With Our Training Functions.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32748168)

Giờ phút quan trọng: train **Model 0** trên custom dataset pizza/steak/sushi. Ta chỉ cần tạo model, chọn **loss function** và **optimizer**, rồi gọi hàm `train` đã viết. Kết quả khá "khiêm tốn" — và mình sẽ giải thích vì sao con số đó chưa nói lên nhiều.

### 🎲 Đặt seed

```python
torch.manual_seed(42)
torch.cuda.manual_seed(42)
```

Mình lưu ý một điều: seed ở đây để **mang tính giáo dục** — giúp số liệu trên máy mình và máy các bạn gần giống nhau. Trong thực tế người ta **thường không** cố định seed, vì mong model hoạt động ổn định **bất kể** seed.

---

### 🏗️ Tạo model, loss, optimizer

```python
model_0 = TinyVGG(
    input_shape=3,               # ảnh màu
    hidden_units=10,
    output_shape=len(class_names),  # 3 lớp
).to(device)

loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(params=model_0.parameters(), lr=0.001)
```

* **`CrossEntropyLoss`** — loss chuẩn cho **multiclass classification**.
* **`Adam`** với `lr=0.001` — chính là **learning rate mặc định** của Adam (`10^-3`). Nhiều optimizer trong PyTorch có default tốt, dùng được cho nhiều bài toán.

---

### ⏱️ Train có bấm giờ

```python
from timeit import default_timer as timer

start_time = timer()

model_0_results = train(
    model=model_0,
    train_dataloader=train_dataloader_simple,
    test_dataloader=test_dataloader_simple,
    optimizer=optimizer,
    loss_fn=loss_fn,
    epochs=5,
)

end_time = timer()
print(f"Total training time: {end_time - start_time:.3f} seconds")
```

Lúc chạy, mình gõ nhầm thành `train_data` thay vì `train_dataloader_simple` và bị lỗi — sửa lại là chạy được, progress bar hiện lên. `epochs=5` để thí nghiệm **nhanh**; sau này có thể tăng lên 10, 20.

---

### 📉 Đọc kết quả — con số chưa nói lên nhiều

Sau 5 epoch:

* **Train accuracy**: khoảng **40%**.
* **Test accuracy**: khoảng **50%**.

Nghe có vẻ thấp — nhưng với **3 lớp**, đoán mò ngẫu nhiên đã đạt ~**33%** (ví dụ luôn đoán pizza). Vậy model chỉ **hơn mức đoán mò không đáng kể**. Con số này có thể cao hơn nếu train lâu hơn, nhưng rõ ràng còn nhiều dư địa để cải thiện.

---

### 🔧 Hướng cải thiện (từ section "improving a model")

* **Thêm layer** — ví dụ thêm `conv_block_3`.
* **Tăng hidden units** — hiện là 10, thử gấp đôi.
* **Train lâu hơn** — 10, 20 epoch.
* **Đổi activation function** — ReLU có thể chưa tối ưu.
* **Đổi learning rate**, **đổi loss function** (cross entropy đã khá tốt cho multiclass).

Ba hướng đầu dễ thử nhanh nhất.

---

### ✅ Tạm kết

Model 0 đã chạy hết vòng train và trả về dict kết quả. Cách tốt nhất để "nhìn" quá trình học là **vẽ loss curve** — bài sau mình làm việc đó. Hẹn các bạn ở đó.
