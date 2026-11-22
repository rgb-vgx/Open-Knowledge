---
title: 'Bài 123 — Model 2: mổ xẻ MaxPool2d từng bước'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 123
status: edited
source: '123 - Model 2- Breaking Down MaxPool2D Step by Step.md'
categories:
- AI
tags: []
---

# 🪣 Model 2: mổ xẻ `MaxPool2d` từng bước

> Nguồn: `123 - Model 2- Breaking Down MaxPool2D Step by Step.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32920356)

Nếu `Conv2d` học feature, thì `MaxPool2d` **nén** feature đó lại. Bài này mình chạy thử nó trên tensor nhỏ để thấy tận mắt phép "lấy max" hoạt động thế nào — và hiểu vì sao mạng tích chập cố tình làm mất thông tin.

### 📐 Docs nói gì?

`nn.MaxPool2d` "applies a 2D max pooling over an input signal composed of several input planes". Tham số chính:

* **`kernel_size`** — kích thước cửa sổ để lấy max.
* (còn `stride`, `padding`, `dilation`, `return_indices`, `ceil_mode` — mặc định cũng ổn).

Công thức đơn giản: với mỗi ô `kernel_size x kernel_size`, lấy **giá trị lớn nhất**.

### 🧪 Thử ngay với dữ liệu giả

```python
print(test_image.shape)          # torch.Size([3, 64, 64])
print(test_image.unsqueeze(0).shape)  # torch.Size([1, 3, 64, 64])

max_pool_layer = nn.MaxPool2d(kernel_size=2)
```

Cho ảnh đi qua convolution trước, rồi qua max pool:

```python
test_image_through_conv = conv_layer(test_image.unsqueeze(0))
print(test_image_through_conv.shape)
# torch.Size([1, 10, 62, 62])

test_image_through_conv_and_max_pool = max_pool_layer(test_image_through_conv)
print(test_image_through_conv_and_max_pool.shape)
# torch.Size([1, 10, 31, 31])
```

Với `kernel_size=2`, mỗi chiều **giảm một nửa** (làm tròn xuống). Nếu đổi conv sang `padding=0`, output conv là `62x62`, rồi max pool còn `31x31`. Nếu conv giữ `padding=1` cho ra `64x64`, max pool sẽ còn `32x32`. Xu hướng luôn là **nhỏ dần**.

### 🔬 Ví dụ "nhìn thấy được"

Dùng một tensor siêu nhỏ để thấy rõ phép toán:

```python
torch.manual_seed(42)

random_tensor = torch.randn(size=(1, 1, 2, 2))
print(random_tensor)
# tensor([[[[0.3367, 0.1288],
#           [0.2345, 0.2303]]]])

max_pool_layer = nn.MaxPool2d(kernel_size=2)
max_pool_tensor = max_pool_layer(random_tensor)

print(max_pool_tensor)
# tensor([[[[0.3367]]]])
print(max_pool_tensor.shape)
# torch.Size([1, 1, 1, 1])
```

Bốn số `0.3367, 0.1288, 0.2345, 0.2303`. Max là `0.3367`, và output chỉ còn đúng một số đó. Shape từ `2x2` xuống `1x1`.

### 🧠 Vì sao lại nén?

Câu trả lời hay nhất: **intelligence is compression**. Mạng nơ-ron cố biểu diễn dữ liệu trong một **không gian vector nhỏ hơn** nhưng vẫn giữ được pattern quan trọng để dự đoán dữ liệu mới.

`MaxPool2d` đặt câu hỏi: nếu lấy max của từng vùng, **pattern quan trọng nhất** có còn không? Trên CNN Explainer, sau max pool vẫn nhìn ra viền chiếc xe, chỉ hơi bị pixel hóa — tức feature quan trọng vẫn sống sót.

Nếu tăng `kernel_size=4`, output chia cho 4 — nén mạnh hơn nữa. Có hiệu quả hay không thì phải thử; đó là bản chất thực nghiệm của ML.

### 🔗 Ghép lại: 3 lớp, 3 vai

* **Conv2d** — học feature từ ảnh.
* **ReLU** — thêm phi tuyến, phòng khi dữ liệu cần đường cong.
* **MaxPool2d** — nén feature, giữ lại phần quan trọng nhất.

Lặp lại bộ ba này nhiều lần theo chiều sâu là ra một CNN.

### ✅ Tạm kết

`MaxPool2d` không có tham số học, chỉ lấy max theo cửa sổ, và giảm kích thước mỗi chiều theo `kernel_size`. Bài tập mở rộng: thử đưa ảnh của chính bạn vào CNN Explainer. Bài sau mình giải bài toán còn treo: tìm `in_features` cho classifier của Model 2.
