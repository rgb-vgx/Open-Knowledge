---
title: 'Bài 331 — Bắt đầu với PyTorch 2.0 trên Google Colab'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 331
status: edited
source: '331 - Getting Started with PyTorch 2 in Google Colab.md'
categories:
- AI
tags: []
---

# 🧪 Khởi động notebook PyTorch 2.0 trong Colab

> Nguồn: `331 - Getting Started with PyTorch 2 in Google Colab.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745214)

Chào mừng các bạn trở lại với một notebook Colab hoàn toàn mới. Mình sẽ đặt tên nó là **PyTorch 2 intro**, gắn tag video, thêm tiêu đề — và quan trọng hơn, kiểm tra xem Colab đang chạy PyTorch phiên bản nào.

### 🧷 Dựng notebook và gắn tài liệu

Mình tạo một cell tiêu đề "PyTorch 2 quick intro" rồi đặt vào đó các link tham khảo:

* **Reference notebook** — notebook đi kèm chương.
* **Reference book chapter** — chương sách tương ứng.
* **PyTorch 2.0 release notes** — từ đội ngũ PyTorch chính thức, mình rất khuyến khích các bạn tự đọc.

### 📌 torch.compile là API chính của PyTorch 2.0

Thay vì đọc release notes nguyên văn, mình tóm tắt ý chính: **`torch.compile`** là API chính mới của PyTorch 2.0, **bọc model của bạn và trả về một compiled model**.

Compiled model thực chất **vẫn là một PyTorch model bình thường**, chỉ khác là có một loạt tối ưu chạy bên dưới để nhanh hơn.

Điểm quan trọng: đây là tính năng **thuần bổ sung (fully additive)**. Nghĩa là mọi code PyTorch cũ của các bạn vẫn chạy với PyTorch 2.0 — nó **tương thích ngược 100%** theo định nghĩa. Nếu các bạn đã học hết khóa này, code cũ vẫn hoạt động, và các bạn dùng được tính năng mới ngay lập tức.

### 🔢 Kiểm tra phiên bản và bật GPU

Mình quay video vào tháng 4/2023. Hãy in ra phiên bản PyTorch:

```python
import torch
print(torch.__version__)
```

Khi đó Colab mặc định đã là **2.0.0** trở lên. Nếu các bạn xem sau này, có thể sẽ là bản mới hơn.

Có một việc mình quên làm: **đổi runtime type**. Mình vào phần cứng, đặt **hardware accelerator** thành **GPU**, và chọn luôn một **premium class**.

### 💳 Vì sao cần GPU xịn?

Premium class chỉ có với gói **Colab Pro**. Lý do: nhiều tốc độ mới của PyTorch 2.0 đến từ **GPU đời mới**. Không có nghĩa là các bạn không làm được tutorial nếu không có Colab Pro hay GPU mới — vẫn làm được — nhưng phần lớn tăng tốc nhắm vào phần cứng mới.

Kiểm tra bằng `nvidia-smi`, mình nhận được **A100** — một GPU server class.

### ⚠️ Lưu ý về GPU và backend inductor

Trong bài blog ra mắt, đội PyTorch nói rõ: kết quả của họ được đo trên **A100**. Trên GPU desktop như **NVIDIA 3090**, mức tăng tốc đo được **thấp hơn** so với GPU server class như A100.

Về backend mặc định là **TorchInductor**:

* Hỗ trợ **CPU**, GPU NVIDIA kiến trúc **Volta** và **Ampere**, cùng GPU **AMD**.
* **Chưa** hỗ trợ các GPU khác hoặc GPU NVIDIA đời cũ hơn.

Tóm lại: tăng tốc của PyTorch 2.0 chủ yếu dành cho GPU đời mới. Hẹn các bạn ở video sau, nơi mình bắt đầu code thật.
