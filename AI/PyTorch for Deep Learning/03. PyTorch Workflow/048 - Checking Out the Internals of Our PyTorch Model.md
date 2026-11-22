---
title: 'Bài 48 — Xem bên trong model PyTorch vừa tạo'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 48
status: edited
source: '048 - Checking Out the Internals of Our PyTorch Model.md'
categories:
- AI
tags: []
---

# 🕵️ Xem bên trong model PyTorch vừa tạo

> Nguồn: `048 - Checking Out the Internals of Our PyTorch Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32699340)

Đã tạo model, giờ xem nó chứa gì. Bạn đoán được không? Nhìn vào `__init__` chắc cũng đoán ra phần nào. Nhưng câu hỏi hay hơn: làm sao *nhìn* vào bên trong model để kiểm tra?

### 🗺 Tô màu lại workflow

Trước khi soi model, mình gắn thêm nhãn cho từng bước workflow: `torchvision.transforms` và `torch.utils.data.Dataset`/`DataLoader` cho phần **dữ liệu**; `torch.nn` cho **build model**; `torchvision.models` nếu muốn dùng pre-trained model; `torch.optim` cho **optimizer**; `torchmetrics` cho **đánh giá**; `torch.utils.tensorboard` cho **thực nghiệm**. Đây là spoiler cho các phần sau, chưa cần hiểu hết bây giờ.

---

### 🔍 `.parameters()` — kho tham số

Cách đơn giản nhất để xem model có gì:

```python
torch.manual_seed(42)
model_0 = LinearRegressionModel()
print(model_0)
list(model_0.parameters())
```

Vì sao cần seed? Vì tham số được khởi tạo ngẫu nhiên. Không có seed thì mỗi lần chạy ra giá trị khác nhau. Đặt `torch.manual_seed(42)` (42 là "câu trả lời cho vũ trụ") để kết quả **tái lập được** — dù có thể vẫn lệch chút tùy phiên bản.

In `model_0` chỉ ra tên class, chẳng nói gì thêm. Gọi `model_0.parameters()` trả về một **generator**, nên bọc `list()` cho dễ nhìn. Kết quả trông như:

```text
[Parameter containing:
tensor([0.3367], requires_grad=True),
 Parameter containing:
tensor([0.1288], requires_grad=True)]
```

Hai tham số chính là `weight` và `bias`, giá trị ngẫu nhiên do `torch.randn`.

---

### 🗂 `.state_dict()` — đọc dễ hơn

Danh sách tham số khá khó đọc, nên mình thích dùng:

```python
model_0.state_dict()
```

Kết quả là một dictionary có tên và giá trị rõ ràng:

```text
OrderedDict([('weight', tensor([0.3367])), ('bias', tensor([0.1288]))])
```

Tên `weight`, `bias` đến từ chính hai thuộc tính trong `__init__`.

---

### 🎲 Vì sao tham số ngẫu nhiên?

Cứ nhấn đi nhấn lại: model khởi đầu bằng **giá trị ngẫu nhiên** cho weight và bias. Model có thể có hàng nghìn tham số, mình sẽ không tự đặt tay. Điều kỳ diệu của deep learning là:

1. Bắt đầu với giá trị ngẫu nhiên.
2. Nhìn vào dữ liệu (ở đây là chấm xanh).
3. Dùng gradient descent, backpropagation và dữ liệu để đẩy các giá trị đó lại gần **ideal values** nhất có thể.

Với dataset của mình thì biết trước đáp án (`weight=0.7`, `bias=0.3`), nhưng đa số trường hợp ngoài thực tế bạn không biết. Đây là nền tảng của toàn bộ deep learning.

---

### ✅ Tạm kết

Model đã có tham số ngẫu nhiên. Câu hỏi thú vị: đem model này đi dự đoán thì sẽ ra sao khi weight/bias còn lệch? Bài sau mình sẽ tạo dự đoán trên test data và xem kết quả. Hẹn gặp.
