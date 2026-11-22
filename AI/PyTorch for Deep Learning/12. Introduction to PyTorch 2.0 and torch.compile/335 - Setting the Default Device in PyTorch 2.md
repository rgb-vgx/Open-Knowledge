---
title: 'Bài 335 — Đặt device mặc định toàn cục trong PyTorch 2.0'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 335
status: edited
source: '335 - Setting the Default Device in PyTorch 2.md'
categories:
- AI
tags: []
---

# 🎯 Quên `.to(device)` đi: set device mặc định kiểu mới

> Nguồn: `335 - Setting the Default Device in PyTorch 2.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745222)

Video trước ta đã xem thông tin GPU. Mình đang dùng **NVIDIA A100** trên Colab Pro; nếu GPU của các bạn dưới 8.0 thì vẫn học được, chỉ là mức tăng tốc không rõ bằng. Giờ mình giới thiệu một tính năng mình rất thích ở PyTorch 2.0: **set device mặc định**. Một cập nhật nhỏ nhưng cải thiện chất lượng cuộc sống lập trình viên khá nhiều.

### 💡 Đau đầu với `.to(device)`

Trước đây, muốn đưa tensor hay model lên GPU, ta phải gọi `.to(device)` ở mọi nơi. Lặp đi lặp lại, khá mệt. PyTorch 2.0 có **hai cách** để bỏ thói quen đó:

* **Context manager** — chỉ trong một khối code.
* **Global device** — set một lần cho toàn bộ script.

---

### 🧭 Cách 1: context manager

Vẫn kiểm tra device như cũ:

```python
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
print(device)  # A100 nên ra "cuda"
```

Giờ set device bằng context manager — API mới của PyTorch 2.x, nếu chưa lên 2.0 thì sẽ lỗi:

```python
with torch.device(device):
    layer = torch.nn.Linear(20, 30)
    print("Layer weights on:", layer.weight.device)

    data = torch.randn(128, 20)
    print("Layer creating data on:", data.device)
```

Mọi tensor hay đối tượng PyTorch tạo **bên trong** `with` sẽ nằm trên device đích mà **không cần** `.to(device)`.

Kết quả mình nhận được: cả layer weights lẫn data đều ở `cuda:0`. Không cần `.to` — đúng là thật.

> Các bạn có thể đã quen chuyện này nếu từng dùng TensorFlow (framework thường tự xử lý device). Tự động và thủ công đều có ưu điểm riêng, tùy trường hợp.

---

### 🌍 Cách 2: global default device

Muốn set một lần ở đầu script/notebook:

```python
torch.set_default_device(device)
```

Cũng là API mới, cần PyTorch 2.0 trở lên. Sau dòng này, mọi đối tượng PyTorch tạo ra **từ đó về sau** đều nằm trên device đích — kể cả khi **ngoài** context manager.

Chạy lại đoạn code tạo layer và tensor phía trên, các bạn sẽ thấy chúng vẫn ở `cuda:0` dù không hề gọi `.to`.

---

### 🔄 Đổi ngược về CPU

Muốn quay lại CPU thì đơn giản:

```python
torch.set_default_device("cpu")
```

Chạy lại là mọi thứ về CPU bình thường. Muốn quay lại GPU thì set `"cuda"` tương tự. Trong phần còn lại mình sẽ giữ device mặc định và tiếp tục dùng `.to`, nhưng các bạn đã biết tính năng mới này.

---

### 📖 Tài nguyên đáng đọc

* Tất cả tài nguyên trong video nằm ở mục **Resources to learn more → release notes**, phần **default device type**.
* Riêng với Mac, có mục **PyTorch for Mac** riêng để xem.
* Muốn chọn GPU để học deep learning (build PC riêng, rời Colab...), mình rất khuyên đọc bài **"Which GPU for Deep Learning"** của **Tim Dettmers** — một trong những bài mình thích nhất, có cả phân tích hiệu năng/giá và flowchart chọn GPU, được cập nhật thường xuyên.

---

Set device đã xong. Giờ ta bắt đầu dựng thực nghiệm để đo xem `torch.compile` nhanh hơn bao nhiêu.
