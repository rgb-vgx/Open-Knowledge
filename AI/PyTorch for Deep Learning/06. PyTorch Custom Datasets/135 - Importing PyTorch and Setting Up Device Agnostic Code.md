---
title: 'Import PyTorch và thiết lập device-agnostic code'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 135
status: edited
source: '135 - Importing PyTorch and Setting Up Device Agnostic Code.md'
categories:
- AI
tags: []
---

# ⚙️ Import PyTorch và thiết lập device-agnostic code

> Nguồn: `135 - Importing PyTorch and Setting Up Device Agnostic Code.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32708236)

Chào mừng trở lại với "torch cooking show". Bài này mình mở một notebook mới trên Google Colab, import PyTorch và — quan trọng hơn — thiết lập **device-agnostic code** ngay từ đầu. Đây là best practice: nếu có GPU CUDA thì model và dữ liệu sẽ tự chạy trên đó, không thì rơi về CPU.

### 📓 Tạo notebook mới

Mình vào `colab.research.google.com`, bấm **New Notebook**, đổi tên thành notebook cho section **PyTorch Custom Datasets** (bản `video` ghi lại code trong lúc quay). Notebook này nằm trong thư mục `video_notebooks` của repo PyTorch Deep Learning. Mình cũng đính kèm hai link tài nguyên:

* Bản **sách online** của tài liệu khóa học.
* Bản **ground truth notebook** — notebook tham chiếu cho cả section.

---

### 🧭 Vì sao lại là custom dataset?

Toàn bộ ý tưởng của section: trước giờ ta dùng dataset có sẵn của PyTorch, còn giờ làm sao đưa **dữ liệu của chính mình** vào PyTorch? Một cách là dùng **custom dataset**. Và nhắc lại: tùy domain — vision, text, audio, recommendation — mà tìm tới **domain library** tương ứng (`torchvision`, `torchtext`, `torchaudio`, `torchrec`) để lấy hàm nạp dữ liệu có sẵn hoặc hàm nạp dữ liệu tùy biến.

Với bài toán vision của mình, ta dùng `torchvision`. Bộ bước sẽ tương tự cho bài toán text khi các bạn làm sau này: có một dataset nằm ở đâu đó, việc của ta là đưa nó vào PyTorch để build model.

---

### 🔥 Import thư viện

```python
import torch
from torch import nn

torch.__version__
```

Transcript lưu ý: khóa học yêu cầu **PyTorch 1.10.0+**. Nếu chạy Colab về sau này, các bạn có thể có bản PyTorch mới hơn — cứ kiểm tra `torch.__version__` để chắc chắn.

---

### 💻 Thiết lập device-agnostic code

Đây là đoạn mình muốn làm ngay từ đầu vì nó là best practice:

```python
device = "cuda" if torch.cuda.is_available() else "cpu"
device
```

Với cách này, nếu có **CUDA device** thì model sẽ dùng GPU và dữ liệu cũng được đưa lên GPU; không thì chạy CPU.

---

### 🖥️ Bật GPU trên Colab

Colab mới khởi tạo mặc định chạy **CPU**. Để đổi, vào **Runtime → Change runtime type → Hardware accelerator → GPU**. Ở đây mình đang dùng **Colab Pro** nên được ưu tiên GPU nhanh hơn — nhưng mình nhấn mạnh: **không cần Pro** để hoàn thành khóa, bản miễn phí vẫn dùng được.

Sau khi bật GPU, kiểm tra bằng `torch.cuda.is_available()` và xem loại GPU qua lệnh:

```bash
!nvidia-smi
```

Máy mình lúc quay là **Tesla P100, 16GB memory** — quá đủ cho bài toán trong section này.

---

### ✅ Tạm kết

Vậy là đã có môi trường, đã bật GPU, đã sẵn sàng device-agnostic code. Bước tiếp theo là lấy dữ liệu — vì làm custom dataset mà không có data thì chịu. Hẹn các bạn ở bài sau, mình đi tải ảnh pizza, steak, sushi về.
