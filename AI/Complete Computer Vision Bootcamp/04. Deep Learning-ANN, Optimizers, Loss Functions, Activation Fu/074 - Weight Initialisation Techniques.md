---
title: 'Bài 074 — Các kỹ thuật khởi tạo trọng số'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 74
status: edited
source: '074 - Weight Initialisation Techniques.md'
categories:
- AI
tags: []
---

# 🌱 Khởi tạo weights đúng để tránh exploding gradient

> Nguồn: `074 - Weight Initialisation Techniques.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979307)

Chào các bạn! Exploding gradient đến từ việc khởi tạo weights **quá lớn**. Bài này mình đi qua các **kỹ thuật khởi tạo weights** đã được nghiên cứu chứng minh: **uniform**, **Xavier/Glorot** và **Kaiming He**. Mấu chốt là hiểu vì sao chúng ra đời, còn công thức thì các thư viện đã lo sẵn.

### 📏 Ba nguyên tắc khi khởi tạo

1. **Weights phải nhỏ** — nếu lớn sẽ dính **exploding gradient**.
2. **Weights không được giống nhau** — nếu mọi neuron có weights y hệt, chúng xử lý giống hệt nhau, mất khả năng "nghĩ" khác nhau.
3. **Weights phải có variance tốt** — các giá trị cần khác biệt, bổ trợ cho nhau.

### 🎲 1. Uniform distribution

Mỗi weight `W_ij` lấy từ phân phối **uniform** với cận dưới/trên:

```text
a = -1 / sqrt(input)      b = 1 / sqrt(input)
```

Ví dụ input = 3 → `[-1/sqrt(3), 1/sqrt(3)]`. Dùng hàm uniform của Python với hai cận này là khởi tạo được toàn bộ weights cho các hidden neuron.

### 🧮 2. Xavier / Glorot initialization

Do nhà nghiên cứu **Xavier Glorot** đề xuất, có hai biến thể:

* **Xavier normal**: weights lấy từ **normal distribution** với `mean = 0`, `std = sigma`:

```text
sigma = sqrt( 2 / (input + output) )
```

Ví dụ input = output = 3 → `sigma = sqrt(2/6) = sqrt(1/3)`.

* **Xavier uniform**: weights lấy từ **uniform distribution** với:

```text
a = -sqrt(6 / (input + output))      b = sqrt(6 / (input + output))
```

### 🧮 3. Kaiming He initialization

Do **Kaiming He** đề xuất, cũng hai biến thể:

* **He normal**: `mean = 0`, `std`:

```text
sigma = sqrt(2 / input)
```

Ví dụ input = 3 → `sigma = sqrt(2/3)`.

* **He uniform**: uniform với:

```text
a = -sqrt(6 / input)      b = sqrt(6 / input)
```

### 🧾 Tổng hợp

| Kỹ thuật | Phân phối | Tham số |
|---|---|---|
| **Uniform** | uniform | `±1/sqrt(input)` |
| **Xavier normal** | normal | `std = sqrt(2/(in+out))` |
| **Xavier uniform** | uniform | `±sqrt(6/(in+out))` |
| **He normal** | normal | `std = sqrt(2/in)` |
| **He uniform** | uniform | `±sqrt(6/in)` |

---

### 📌 Ghi nhớ

Không cần thuộc công thức — các library đều có sẵn. Điều cần nắm là **lý do**: khởi tạo đúng để **không dính exploding gradient** và giữ weights có **variance** hợp lý. Ba kỹ thuật nổi tiếng nhất là **Xavier**, **Kaiming He** và **uniform**; chúng sẽ xuất hiện lại ở phần thực hành.

Bài sau ta sang **dropout layer** — kỹ thuật chống **overfitting**. Hẹn gặp lại!
