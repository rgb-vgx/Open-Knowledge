---
title: 'Bài 42 — Tạo dataset đơn giản bằng công thức hồi quy tuyến tính'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 42
status: edited
source: '042 - Creating a Simple Dataset Using the Linear Regression Formula.md'
categories:
- AI
tags: []
---

# 🧮 Tạo dataset đơn giản bằng công thức hồi quy tuyến tính

> Nguồn: `042 - Creating a Simple Dataset Using the Linear Regression Formula.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32686048)

Đây là bước đầu tiên trong workflow PyTorch: chuẩn bị và nạp dữ liệu. Mình sẽ cùng các bạn tạo một dataset "biết trước đáp án" bằng công thức hồi quy tuyến tính, để sau này có cái mà huấn luyện model học lại. Mấu chốt nằm ở chỗ: mọi thứ trong machine learning rồi cũng phải quy về con số.

### 🎯 Machine learning là trò chơi hai phần

Dữ liệu có thể là gần như bất cứ thứ gì: bảng Excel, ảnh, video, âm thanh, podcast, thậm chí DNA hay text. Nhưng dù là gì, machine learning cũng chỉ gồm hai phần:

1. **Đưa dữ liệu về dạng biểu diễn số** — numerical representation, cụ thể là `tensor`.
2. **Xây một model để học pattern** trong biểu diễn số đó.

Phần còn lại chỉ là làm hai việc này phức tạp lên thôi. Với dataset của bài này, phần 1 đã được làm sẵn: mình biết trước dữ liệu, nên việc của model là học lại biểu diễn đó.

---

### 📐 Công thức hồi quy tuyến tính

Dạng đơn giản nhất của đường thẳng là:

```text
y = a + b * x
```

Trong đó:

* `x` là biến giải thích (**explanatory variable**).
* `y` là biến phụ thuộc (**dependent variable**).
* `b` là độ dốc (**slope**), còn gọi là **gradient**.
* `a` là **intercept** — giá trị của `y` khi `x = 0`.

Trong ngôn ngữ neural network, người ta gọi `b` là **weight** và `a` là **bias**. Và **parameter** chính là thứ model học được — một từ các bạn sẽ nghe rất nhiều.

---

### 🔥 Code ra dataset với tham số biết trước

Mình chọn weight `0.7` và bias `0.3` (chỉ vì thích số 7 và 3, đổi số khác cũng được, nguyên lý không đổi).

```python
import torch

weight = 0.7
bias = 0.3
start = 0
end = 1
step = 0.02

X = torch.arange(start, end, step).unsqueeze(dim=1)
y = weight * X + bias
```

`torch.arange(start, end, step)` tạo dãy số từ `0` đến `1`, mỗi bước `0.02`, cho ra **50 giá trị**. Chữ `X` viết hoa vì trong machine learning `X` thường là matrix hoặc tensor (chữ thường là vector) — tuy hiện tại `x` vẫn là vector, nhưng giữ ký hiệu viết hoa cho quen dần.

Còn `unsqueeze(dim=1)` thì **thêm một chiều** vào tensor. Bỏ nó đi thì tensor không có cặp ngoặc vuông lồng nhau; giữ nó lại vì sau này khi đưa vào model mình sẽ cần đúng shape đó.

---

### 🔍 Nhìn qua dữ liệu vừa tạo

```python
print(X[:10])
print(y[:10])
print(len(X))
print(len(y))
```

Ta có 50 giá trị `X` và 50 giá trị `y`, quan hệ 1-1. Điều quan trọng cần nhớ: trong thực tế các bạn sẽ **không** biết quan hệ giữa `X` và `y` như ở đây. Toàn bộ tiền đề của machine learning là để model tự tìm ra biểu diễn của input và cách nó ánh xạ sang output.

---

### ✅ Tạm kết

Vậy là đã có dữ liệu để làm việc. Nếu thấy hơi rối thì cứ yên tâm, mình sẽ code tiếp để các bạn thấy model học pattern ra sao. Nhưng hiện tại đây mới chỉ là những con số trên trang giấy — câu hỏi là làm sao nhìn cho trực quan hơn? Khẩu hiệu của dân khám phá dữ liệu là gì nhỉ: **visualize, visualize, visualize**. Hẹn các bạn ở bài sau.
