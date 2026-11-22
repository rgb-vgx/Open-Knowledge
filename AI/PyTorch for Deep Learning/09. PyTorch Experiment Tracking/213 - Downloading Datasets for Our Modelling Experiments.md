---
title: 'Tải dataset cho loạt experiment'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 213
status: edited
source: '213 - Downloading Datasets for Our Modelling Experiments.md'
categories:
- AI
tags: []
---

# 📦 Tải dataset cho loạt experiment

> Nguồn: `213 - Downloading Datasets for Our Modelling Experiments.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33120480)

You ready to run some experiments? Ta đã bàn xong loạt experiment: bắt đầu với 10% dữ liệu, EfficientNet-B0, 5 epoch, rồi tăng dần — **tăng gấp đôi dữ liệu, gấp đôi model size, gấp đôi số epoch**. Bắt đầu nhỏ, scale lên khi cần. Giờ chuẩn bị hai bộ dữ liệu: 10% và 20%.

### 🧠 Vì sao vẫn giữ mọi thứ nhỏ?

Mục tiêu cuối là một model **chạy tốt nhưng đủ nhỏ** để chạy trên mobile/web, để Food Vision Mini thành hiện thực. Chạy càng nhanh càng tốt để sớm biết cái gì không hiệu quả, dồn thời gian cho cái hiệu quả.

Một ghi chú triết lý — nếu bạn có **vô hạn compute và thời gian**, về cơ bản nên luôn chọn model **to nhất** và dataset **lớn nhất** có thể. Đó là tinh thần của **"The Bitter Lesson"** (một bài viết nổi tiếng) — bạn xem như extra curriculum.

---

### ⬇️ Tải hai bộ dữ liệu

Ta đã có bộ 10%, nhưng vì đầy đủ quy trình nên tải lại. Nếu muốn, có thể tải **toàn bộ Food 101** bằng `torchvision.datasets.Food101`, nhưng mình vẫn khuyên **tách ngẫu nhiên một phần nhỏ** để bắt đầu — vì Food 101 có **101.000 ảnh**, chờ train sẽ rất lâu. Khi đã tìm ra cái chạy tốt, lúc đó hãy để model train cả ngày rồi đi gym hay đi dạo.

Trên GitHub có sẵn hai bộ: **pizza_steak_sushi** (10%) và **pizza_steak_sushi_20_percent** (20%), tạo từ Food 101 bằng notebook `extras/custom_data_creation`. Nhớ dùng link **raw** khi tải.

Dùng lại hàm `download_data` đã viết ở bài trước:

```python
# Tải bộ 10% (sẽ skip vì đã có)
data_10_percent_path = download_data(
    source="https://github.com/mrdbourke/pytorch-deep-learning/raw/main/data/pizza_steak_sushi.zip",
    destination="pizza_steak_sushi")

# Tải bộ 20%
data_20_percent_path = download_data(
    source="https://github.com/mrdbourke/pytorch-deep-learning/raw/main/data/pizza_steak_sushi_20_percent.zip",
    destination="pizza_steak_sushi_20_percent")
```

Chạy xong: bộ 10% bị **skip** vì thư mục đã có, bộ 20% được tải và giải nén. Giờ ta có cả hai thư mục `pizza_steak_sushi` và `pizza_steak_sushi_20_percent`.

> Lưu ý: cẩn thận gõ đúng chữ "percent" trong tên thư mục — mình suýt gõ sai.

---

### ✅ Tạm kết và thử thách

Bước tiếp theo: biến hai dataset thành **DataLoader**. Và nhớ: **dùng chung một test set** cho mọi experiment — nên chỉ cần tạo **một** test DataLoader. Script `data_setup.py` với `create_dataloaders` đã sẵn sàng giúp. Bạn thử trước, video sau ta làm cùng nhau. Hẹn gặp!
