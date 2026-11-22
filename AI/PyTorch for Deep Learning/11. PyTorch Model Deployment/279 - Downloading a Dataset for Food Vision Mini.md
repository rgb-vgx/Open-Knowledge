---
title: 'Bài 279 — Tải dataset pizza, steak, sushi cho Food Vision Mini'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 279
status: edited
source: '279 - Downloading a Dataset for Food Vision Mini.md'
categories:
- AI
tags: []
---

# 📥 Tải dataset Food Vision Mini và lý do dùng 20% dữ liệu

> Nguồn: `279 - Downloading a Dataset for Food Vision Mini.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055221)

Muốn deploy thì phải có model, muốn có model thì phải có dữ liệu. Bài này tải lại bộ **pizza, steak, sushi (20% của Food101)** — lần này ở mức 20% để so sánh **EfficientNet B2** và **Vision Transformer** một cách công bằng. Một chi tiết nhỏ nhưng cực quan trọng khi làm thực nghiệm.

### 🔍 Vì sao phải tải lại đúng 20%?

Ở section trước (08 — PyTorch Paper Replicating), chúng ta train Vision Transformer và so với EfficientNet B2 đã train ở section 07. Nhưng có một vấn đề: **EfficientNet B2 được train trên 20%** dữ liệu pizza/steak/sushi, còn **ViT train trên 10%**.

So sánh như vậy là "không cùng hệ quy chiếu". Muốn **apples to apples**, phải tải cùng bộ **20% pizza, steak, sushi** rồi train lại cả hai — vì đây là hai model tốt nhất cho bài toán Food Vision Mini. Mục tiêu: chạy thêm một thực nghiệm trên cùng dataset để xem model nào **hợp use case** hơn.

---

### 📂 Tái dùng hàm `download_data`

Hàm này nằm trong **`helper_functions.py`** trên GitHub của khóa, được viết từ section 07 (PyTorch experiment tracking). Thay vì viết lại, ta import và gọi nó: nó tải file zip từ GitHub rồi **tự giải nén**.

Sau khi xong, cấu trúc thư mục:

```text
data/
└── pizza_steak_sushi_20_percent/
    ├── train/
    └── test/
```

---

### 🗂️ Trỏ đường dẫn train/test

Code thiết lập đường dẫn:

```python
train_dir = "data/pizza_steak_sushi_20_percent/train"
test_dir = "data/pizza_steak_sushi_20_percent/test"
```

Mình làm lại vài lần những bước này để tạo phản xạ: lấy data → trỏ `train_dir`/`test_dir` → tạo DataLoader. **Đơn giản và lặp lại** là cách luyện tập tốt.

---

Giờ đã có dữ liệu và đường dẫn tới thư mục `train`/`test`. Bài sau mình phác thảo thực nghiệm chính trước khi tạo DataLoader và deploy — để biết rõ ta đang đo cái gì.
