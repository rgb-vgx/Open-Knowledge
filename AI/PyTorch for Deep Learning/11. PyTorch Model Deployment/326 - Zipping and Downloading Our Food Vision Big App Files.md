---
title: 'Bài 326 — Hoàn tất requirements.txt và nén app Food Vision Big'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 326
status: edited
source: '326 - Zipping and Downloading Our Food Vision Big App Files.md'
categories:
- AI
tags: []
---

# 🗜️ Chốt file cuối và đóng gói Food Vision Big

> Nguồn: `326 - Zipping and Downloading Our Food Vision Big App Files.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34138026)

Chào các bạn. Chỉ còn `requirements.txt`, sau đó nén cả thư mục và tải về máy — y như quy trình của Food Vision Mini.

### 📋 `requirements.txt` không đổi

Food Vision Big dùng đúng bộ thư viện của Food Vision Mini, vì chỉ scale model lên chứ không thêm gì mới:

```python
%%writefile demos/food_vision_big/requirements.txt
torch==1.12.0
torchvision==0.13.0
gradio==3.1.4
```

### ✅ Cấu trúc hoàn chỉnh

```text
demos/food_vision_big/
├── app.py
├── model.py
├── class_names.txt
├── examples/
│   └── 04-pizza-dad.jpeg
├── 09_pretrained_effnetb2_feature_extractor_food101_20_percent.pth
└── requirements.txt
```

Đủ cả 6 thành phần.

### 📦 Nén thư mục

```bash
cd demos/food_vision_big && zip -r food_vision_big.zip * \
  -x "*.pyc" "*.ipynb" "*__pycache__*" "*.ipynb_checkpoints*"
```

Lệnh này lặp lại y hệt bài 312, chỉ đổi tên thư mục và file zip. Kết quả: `demos/food_vision_big.zip`.

### ⬇️ Tải về máy

```python
try:
    from google.colab import files
    files.download("demos/food_vision_big.zip")
except:
    print("[INFO] Not running in Google Colab, please download food_vision_big.zip manually.")
```

Nếu không chạy trên Colab, chỉ cần tải file zip bằng tay.

### 🧩 Chuẩn bị cho bước deploy

Các bạn có thể tự thử deploy trước bằng cách làm lại các bước ở bài 313 (upload qua Git) hoặc dùng giao diện web. Mình sẽ đi theo hướng **Web UI** trong video sau để có thêm một cách làm khác.

---

Mọi file đã sẵn sàng. Bài sau mình tạo Space mới, upload từng file qua giao diện web, và xử lý một mẹo nhỏ để tạo được thư mục `examples/` trên UI.
