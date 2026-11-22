---
title: 'Bài 109 — Tạo loss function và optimizer cho Model 0'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 109
status: edited
source: '109 - Creating a Loss Function- an Optimizer for Model 0.md'
categories:
- AI
tags: []
---

# ⚙️ Tạo loss function và optimizer cho Model 0

> Nguồn: `109 - Creating a Loss Function- an Optimizer for Model 0.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920326)

Trước khi train, cần ba thứ: **loss function** (đo model sai bao nhiêu), **optimizer** (chỉnh weight để giảm loss) và **evaluation metric** (đo độ chính xác). Bài này mình chọn cả ba, kèm một kỹ năng thực chiến: tải file helper function về notebook.

### 🔍 Model 0 đang chứa gì?

```python
model_0.state_dict()
```

In ra thấy mỗi linear layer có một **weight tensor** và một **bias**. Ban đầu chúng là số ngẫu nhiên. Toàn bộ mục đích của deep learning là cho dữ liệu chạy qua model, rồi dùng optimizer chỉnh các số ngẫu nhiên đó để chúng biểu diễn tốt hơn **feature** trong dữ liệu.

"Feature" có thể là bất cứ gì: với một cái bag, feature có thể là quai tròn ở trên, mép hai bên… Nhưng mình **không nói** cho model phải học feature nào. Cái hay của ML là nó tự tìm ra. Weight và bias chính là nơi các feature đó được lưu.

---

### 🎯 Chọn loss và optimizer

Bài toán là **multiclass classification**, nên:

* **Loss**: `nn.CrossEntropyLoss()` — chuẩn cho bài phân loại nhiều lớp.
* **Optimizer**: `torch.optim.SGD` — Stochastic Gradient Descent, optimizer "nhập môn".
* **Metric**: **accuracy** — metric cơ bản nhất của classification.

```python
loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.SGD(params=model_0.parameters(), lr=0.1)
```

`lr=0.1` là learning rate — mức "tweak" weight sau mỗi bước. Đặt cao vì dữ liệu đơn giản (28x28, 60.000 ảnh). Nếu không ổn thì chỉnh và thử lại.

---

### 📏 Accuracy lấy từ đâu?

Có hai lựa chọn:

* Dùng **`torchmetrics`** — thư viện metric chuẩn PyTorch, có sẵn accuracy, precision, recall, F1, confusion matrix…
* Tự viết hàm `accuracy_fn`. Notebook section 2 đã viết một hàm như vậy, và file `helper_functions.py` trong repo cũng có.

Mình chọn cách tải file helper về notebook, vì đây là kỹ năng thực tế: trong project Python lớn, người ta tách hàm dùng chung ra file `.py` rồi import, khỏi phải viết lại.

---

### 📥 Tải `helper_functions.py` bằng code

```python
import requests
from pathlib import Path

if Path("helper_functions.py").is_file():
    print("helper_functions.py already exists, skipping download")
else:
    print("Downloading helper_functions.py")
    request = requests.get("<raw URL của file helper_functions.py trên GitHub>")
    with open("helper_functions.py", "wb") as f:
        f.write(request.content)
```

Giải thích:

* `Path(...).is_file()` — kiểm tra file đã tồn tại chưa, tránh tải lại.
* Phải dùng **raw URL** (bấm nút *Raw* trên GitHub), không phải URL trang web.
* `open(..., "wb")` mở file ở chế độ **write binary**; `f` chỉ là biến đại diện cho file.
* `f.write(request.content)` ghi nội dung vừa tải vào file.

Sau đó import hàm:

```python
from helper_functions import accuracy_fn
```

Colab có thể báo "could not be resolved" — cứ chạy thử, nếu hàm hoạt động khi train thì ổn. Docstring của `accuracy_fn` mô tả nó tính accuracy giữa nhãn thật và dự đoán.

---

### 💡 Vì sao tách helper function?

Vì ta đã viết training loop và accuracy nhiều lần rồi. Viết một lần cho đúng, lưu vào `.py`, lần sau import — đỡ lỗi và đỡ lặp.

---

### ✅ Tạm kết

Đã có `loss_fn`, `optimizer` và `accuracy_fn`. Còn một mảnh ghép nữa trước khi train: đo thời gian chạy. Bài sau mình viết hàm bấm giờ bằng `timeit`.
