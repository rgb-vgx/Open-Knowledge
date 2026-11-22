---
title: 'Tải lại code Going Modular đã viết'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 184
status: edited
source: '184 - Downloading Our Previously Written Code from Going Modular.md'
categories:
- AI
tags: []
---

# 📥 Tải lại code Going Modular đã viết

> Nguồn: `184 - Downloading Our Previously Written Code from Going Modular.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32987006)

Chào các bạn! Ta tiếp tục phần setup. Để khỏi viết lại toàn bộ code đã làm mấy section qua, mình **import code cũ** vào notebook.

### 🗂️ Nhắc lại section 05

Ở section going modular, ta đã tách code hữu ích vào thư mục `going_modular`, gồm các script:

* `data_setup.py`
* `engine.py`
* `model_builder.py`
* `predictions.py` (khá mới)
* `train.py`
* `utils.py`

Giờ ta cần các script này **có mặt trong notebook**.

---

### ⚙️ Lấy script vào Colab

Cách làm: **clone GitHub repo** của khóa, rồi tách đúng thư mục `going_modular` ra.

Trước hết, phần **regular imports** — mình copy từ notebook có sẵn thay vì gõ lại. Đoạn này:

* Import các thư viện thường dùng.
* Thử import **`torchinfo`** — package in **model summary** rất hữu ích (có trên GitHub). Colab không có sẵn nên nó sẽ `pip install` nếu thiếu.
* Thử import thư mục `going_modular`; nếu chưa có, **clone từ GitHub** rồi dọn bớt file thừa.

Logic tải:

1. `git clone` repo `pytorch-deep-learning`.
2. Di chuyển `pytorch-deep-learning/going_modular` vào thư mục hiện tại (`./`).
3. Xóa các file không cần.
4. `from going_modular.going_modular import data_setup, engine`.

---

### 🔍 Chạy thử

Chạy cell:

* Nó báo không tìm thấy `torchinfo` → cài bằng pip.
* Nó thử import `going_modular` → chưa có → clone repo.
* Quá trình clone hiện ra: "Cloning into 'pytorch-deep-learning'...", "Resolving deltas...", "Checking out files...".

Refresh thư mục: ta có `going_modular/going_modular/` chứa `data_setup.py` và `engine.py`. Tuyệt!

---

### 🔌 Kiểm tra autocomplete

```python
data_setup.create_dataloaders   # có autocomplete
engine.train                    # có autocomplete
```

Mở `engine.py` ra, thấy đúng hàm `train` đã viết ở section trước. Đó chính là lý do ta going modular: **không phải viết lại**.

---

### 💻 Bật GPU

Một trong nhiều lý do dùng Colab: **GPU miễn phí**. Không phải ai cũng có GPU ở máy local.

```python
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")
```

Kiểm tra GPU đang dùng:

```bash
!nvidia-smi
```

Ví dụ máy mình là **Tesla P100 16GB**. Mình dùng Colab Pro để có GPU mạnh hơn — bản free không phải lúc nào cũng được GPU nhanh nhất. Điều này hợp lý vì compute không miễn phí.

---

### ⚠️ Lưu ý

Nếu bạn nghỉ giữa chừng rồi quay lại notebook, **phải chạy lại các cell import và setup**. Colab không giữ trạng thái mãi.

---

### ✅ Chốt lại

Notebook đã có code going modular, `torchinfo`, và GPU. Video sau ta lấy dữ liệu pizza/steak/sushi để xây model transfer learning. Hẹn gặp các bạn!
