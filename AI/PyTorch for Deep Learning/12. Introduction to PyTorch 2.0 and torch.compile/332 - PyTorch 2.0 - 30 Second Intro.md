---
title: 'Bài 332 — PyTorch 2.0 trong 30 giây: thêm một dòng là xong'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 332
status: edited
source: '332 - PyTorch 2.0 - 30 Second Intro.md'
categories:
- AI
tags: []
---

# ⏱️ PyTorch 2.0 trong 30 giây: bọc model bằng torch.compile

> Nguồn: `332 - PyTorch 2.0 - 30 Second Intro.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745216)

Bài trước mình đã setup notebook và nói qua rằng PyTorch 2.0 tập trung vào GPU server class đời mới. Nếu các bạn không thấy tăng tốc, đừng lo — mình đang dùng **A100** trên Colab Pro; không có Pro thì code vẫn chạy, chỉ là mức tăng tốc sẽ không rõ bằng. Giờ mình điểm qua nhanh nhất có thể: bản nâng cấp chính của PyTorch 2.0 trong **30 giây**.

### 🕰️ Trước PyTorch 2.0

Với **PyTorch 1.x** — bản chúng ta dùng suốt khóa này — các bạn dựng model theo kiểu quen thuộc. Ví dụ, có thể là bất kỳ model nào:

```python
import torch
import torchvision

model = torchvision.models.resnet50()
```

Rồi viết code train và test bình thường. Đây chính là điều đẹp của PyTorch 2.0: nếu các bạn đã quen PyTorch 1.x, các bạn **100% đủ sức** dùng tính năng mới.

---

### ⚡ Sau PyTorch 2.0

Vẫn code y hệt phía trên, chỉ thêm một bước — bọc model vào `torch.compile`:

```python
import torch
import torchvision

model = torchvision.models.resnet50()
compiled_model = torch.compile(model)
```

Chạy cell đó, PyTorch sẽ thực hiện vài bước tối ưu bên dưới, thế là xong. Sau đó các bạn dùng `compiled_model` với code train/test như bình thường. Model giờ đã được compile.

Một điểm hay nữa: PyTorch 2.0 được thiết kế để **chạy với mọi model** — đó là một trong những mục tiêu của nó. Model của các bạn có thể là bất cứ thứ gì, không chỉ ResNet50.

---

### ⚠️ Vài caveat cần biết

Có một số hạn chế, mình để các bạn tự đọc trong bài blog kèm theo. Mình không đi sâu vì đội PyTorch hứa sẽ sửa nhanh trong các bản sau:

* Vấn đề lớn nhất nằm ở **exporting** — inference và export.
* Nếu các bạn compile model rồi export, có thể **không chạy được trên một số thiết bị**.
* Vài tính năng PyTorch 2.0 có thể **cản trở việc deploy** model.

Vì vậy mình chỉ nói ở mức cảnh báo: hiện tại còn vài trục trặc khi export, nhưng chúng sẽ được khắc phục trong các phiên bản tới.

---

Đó là toàn bộ tinh thần của chương này. Video sau mình sẽ kiểm tra xem máy các bạn đã có PyTorch 2.0 chưa.
