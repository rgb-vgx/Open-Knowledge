---
title: 'Setup môi trường code trong Google Colab'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 226
status: edited
source: '226 - Getting Setup for Coding in Google Colab.md'
categories:
- AI
tags: []
---

# ⚙️ Setup môi trường code trong Google Colab

> Nguồn: `226 - Getting Setup for Coding in Google Colab.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975300)

Đến lúc viết code rồi! Mình mở **Google Colab**, tạo notebook mới đặt tên `08_pytorch_paper_replicating`. Mục tiêu của notebook này: biến một **ML research paper** thành code dùng được — cụ thể là replicate **Vision Transformer** bằng PyTorch.

### 📦 Import code có sẵn thay vì viết lại

Toàn bộ phần code "hậu trường" mình đã viết ở section *PyTorch Going Modular*. Không viết lại, chỉ **clone GitHub repo** đó và import 

* `data_setup.py` — tạo DataLoader.
* `engine.py` — vòng train/test.
* `model_builder.py` — dựng model.
* `utils.py` — các hàm tiện ích.

Ngoài ra còn `helper_functions.py` với đủ thứ như duyệt thư mục, plot decision boundary, download data, plot loss curves — toàn những hàm đã viết trong khóa, chỉ gom lại một chỗ.

---

### 🧪 Kiểm tra phiên bản

Đoạn code setup sẽ import `torch` và `torchvision` kèm kiểm tra phiên bản:

* **PyTorch 1.12**
* **torchvision 0.13**

Đây là phiên bản tối thiểu (thời điểm tháng 7/2022). Nếu Colab chưa có, đoạn code sẽ tự cài — lưu ý có thể phải **restart runtime** sau khi cài. Bản mới hơn vẫn chạy được với code trong section này.

Nhớ bật GPU trước: **Runtime → Change runtime type → GPU**, rồi Save.

---

### 🔧 Cài thêm torchinfo

`torchinfo` không có sẵn trên Colab, nhưng là package mình rất thích để xem **model summary**. Cài bằng:

```bash
pip install torchinfo
```

---

### 🖥️ Device-agnostic code

Bước cuối của phần setup — viết code không phụ thuộc thiết bị:

```python
device = "cuda" if torch.cuda.is_available() else "cpu"
device
```

Kết quả trả về `'cuda'` — GPU đã sẵn sàng.

---

### ✅ Chốt lại

Setup xong: code cũ đã import, phiên bản đúng, GPU bật, device đã xác định. Bài sau mình đi lấy data cho **Food Vision Mini** — các bạn có thể thử trước nếu muốn.
