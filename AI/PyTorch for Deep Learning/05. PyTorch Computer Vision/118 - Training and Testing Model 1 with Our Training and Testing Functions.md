---
title: 'Bài 118 — Huấn luyện và kiểm thử Model 1 bằng hai hàm vừa viết'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 118
status: edited
source: '118 - Training and Testing Model 1 with Our Training and Testing Functions.md'
categories:
- AI
tags: []
---

# 🚀 Huấn luyện và kiểm thử Model 1 bằng hai hàm vừa viết

> Nguồn: `118 - Training and Testing Model 1 with Our Training and Testing Functions.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920344)

Đây là lúc thu hoạch: dùng `train_step` và `test_step` để train Model 1, đo thời gian trên GPU, rồi so với baseline. Kết quả sẽ dạy ta một bài học khá bất ngờ về GPU.

### ⚙️ Setup

```python
torch.manual_seed(42)

train_time_start_on_gpu = timer()
epochs = 3
```

Giữ epochs = 3 và các tham số giống baseline để thí nghiệm chỉ khác đúng **kiến trúc** và **device**.

### 🔁 Optimization loop

```python
for epoch in tqdm(range(epochs)):
    print(f"Epoch: {epoch}\n---------")
    train_step(
        model=model_1,
        data_loader=train_dataloader,
        loss_fn=loss_fn,
        optimizer=optimizer,
        accuracy_fn=accuracy_fn,
    )
    test_step(
        model=model_1,
        data_loader=test_dataloader,
        loss_fn=loss_fn,
        accuracy_fn=accuracy_fn,
    )
```

Cả một optimization loop gói trong vài dòng. Nếu muốn, có thể đưa hai hàm này vào `helper_functions.py` để tái sử dụng ở project khác.

### 🐛 Lỗi gặp phải

Lần chạy đầu báo `train_step() got an unexpected keyword argument 'loss'`. Hóa ra mình gõ thiếu tên tham số — phải là `loss_fn=loss_fn`. Sửa xong là chạy.

Đây là kiểu lỗi rất hay gặp khi function hóa: tên tham số phải khớp chính xác.

### 📉 Kết quả: GPU không "thần thánh" như tưởng

Sau 3 epoch:

* Model 1 **không vượt** được baseline về accuracy.
* Thời gian train **chỉ nhanh hơn một chút** so với CPU.

Vì sao? Vài lý do hợp lý:

* Dataset nhỏ (60.000 ảnh 28x28), model cũng nhỏ (rất ít layer, ít tham số).
* **Overhead copy dữ liệu/model giữa CPU và GPU** có thể lớn hơn lợi ích tính toán mà GPU mang lại.

Đây là điều nhiều người mới học bất ngờ, nên mình ghi hẳn thành note:

> Tùy dữ liệu và phần cứng, model có thể train **nhanh hơn trên CPU** so với GPU.

### 🧠 Chi tiết hơn về trade-off

Hai lý do chính khiến GPU chậm hơn:

1. **Overhead copy** — dữ liệu mặc định nằm trên CPU, phải copy sang GPU memory, rồi kết quả quay lại. Thời gian đi-về này có khi lớn hơn phần tính toán tiết kiệm được.
2. **CPU của bạn mạnh hơn GPU** — hiếm hơn, nhưng có. GPU hiện đại thường nhanh hơn CPU cho deep learning, nhưng phụ thuộc phần cứng cụ thể.

GPU phát huy lợi thế lớn nhất khi model **to hơn**, dữ liệu **lớn hơn**, và có nhiều layer **tốn compute**. Với bài "đồ chơi" như FashionMNIST, khác biệt không đáng kể.

Để hiểu sâu, có bài viết kinh điển *"Making Deep Learning Go Brrrr From First Principles"* của Horace He (làm việc trên PyTorch), bàn về **compute**, **memory bandwidth cost** (chi phí di chuyển dữ liệu) và **overhead**.

### ✅ Tạm kết

Model 1 có phi tuyến, chạy GPU, nhưng **chưa đánh bại baseline** — và GPU chỉ nhanh hơn chút. Thí nghiệm thất bại cũng là kết quả có giá trị: nó cho ta biết phi tuyến chưa phải chìa khóa ở bài này. Bài sau mình sẽ so sánh gọn kết quả Model 0 và Model 1.
