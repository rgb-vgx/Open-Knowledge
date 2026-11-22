---
title: 'Bài 46 — Mổ xẻ model hồi quy tuyến tính PyTorch'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 46
status: edited
source: '046 - Breaking Down What''s Happening in Our PyTorch Linear regression Model.md'
categories:
- AI
tags: []
---

# 🔍 Mổ xẻ model hồi quy tuyến tính PyTorch

> Nguồn: `046 - Breaking Down What's Happening in Our PyTorch Linear regression Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32699336)

Bài trước mình đã viết xong model đầu tiên kế thừa `nn.Module`. Giờ mình muốn đi chậm lại, giải thích từng khối code một lần nữa theo kiểu trực quan, để các bạn thấy rõ PyTorch đang làm gì giúp mình ở hậu trường.

### 🎬 Kế thừa `nn.Module` — khối nền

Khi build model trong PyTorch, class của bạn kế thừa `nn.Module` — nơi chứa toàn bộ building block cho neural network. Trong `__init__`, mình khởi tạo các **model parameters**. Với model lớn sau này, sẽ không phải lúc nào cũng tự tay tạo weight/bias, mà có thể khởi tạo cả một layer, một danh sách layer, hay thậm chí là hàm; nhưng bản chất vẫn là tạo các biến mà model cần dùng.

Đây là đoạn code đang được mổ xẻ:

```python
class LinearRegressionModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.weight = nn.Parameter(torch.randn(1,
                                              requires_grad=True,
                                              dtype=torch.float))
        self.bias = nn.Parameter(torch.randn(1,
                                             requires_grad=True,
                                             dtype=torch.float))

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.weight * x + self.bias
```

Đọc theo ba khối: kế thừa `nn.Module`, khởi tạo tham số trong `__init__`, định nghĩa phép tính trong `forward`.

---

### 🧠 `requires_grad=True` và `torch.autograd`

Mình đặt tường minh `requires_grad=True` cho hai tham số. Điều này khiến PyTorch theo dõi gradient của chúng để phục vụ `torch.autograd` — module cung cấp cơ chế **automatic differentiation**, tức tự động tính gradient, và là nền tảng cho gradient descent.

Với rất nhiều module PyTorch, `requires_grad=True` vốn đã là mặc định. Mình vẫn ghi rõ ra để giữ mọi thứ ở mức căn bản và dễ hiểu nhất.

---

### ⚙️ `forward` — phép tính của model

Bất kỳ class con nào của `nn.Module` đều cần một hàm `forward`. Tài liệu PyTorch nói rõ: `forward` **định nghĩa phép tính được thực hiện ở mỗi lần gọi**.

Nói cách khác, khi bạn gọi `model(data)`, chính `forward` là phép toán mà module thực hiện. Với model của mình, đó là công thức hồi quy tuyến tính `weight * x + bias`.

Nếu kế thừa `nn.Module`, bạn **phải override** `forward`. Mình sẽ cho các bạn thấy điều này bằng code rất sớm.

---

### 🧩 Model đơn giản, tham số định nghĩa thủ công

Cần nhớ: đây là dataset đơn giản do mình tự tạo, nên mình **định nghĩa** luôn hai tham số cần ước lượng. Với dữ liệu thu thập từ ngoài (ví dụ ảnh), bạn thường không tự định nghĩa tham số; một module khác trong `nn` sẽ lo việc đó và tự tìm ra giá trị phù hợp.

Còn hiện tại, model khởi đầu bằng giá trị **ngẫu nhiên**, được phép cập nhật qua gradient descent, và dùng `float32`.

---

### 🎥 Tài nguyên thêm

Mình có gắn hai video của kênh **3Blue1Brown** về gradient descent và backpropagation như tài nguyên extracurricular. Xem hết series đó rất đáng — dù chưa hiểu hết ngay, bạn sẽ có trực giác cho đoạn code PyTorch sắp viết. Phần lớn những gì PyTorch lo giúp mình ở hậu trường chính là hai thuật toán này.

---

### ✅ Tạm kết

Đã hiểu rõ hơn model hoạt động ra sao. Bước tiếp theo để thực sự nắm vấn đề là **kiểm tra bên trong model** và **tạo dự đoán** với nó. Hẹn các bạn ở các bài sau.
