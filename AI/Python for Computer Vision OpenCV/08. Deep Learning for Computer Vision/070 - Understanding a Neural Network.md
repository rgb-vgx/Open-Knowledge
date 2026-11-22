---
title: 'Neural network: xếp các perceptron thành mạng và các hàm activation'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 70
status: edited
source: '070 - Understanding a Neural Network.md'
categories:
- AI
tags: []
---

# 🕸️ Neural network: input, hidden, output và các hàm activation

> Nguồn: `070 - Understanding a Neural Network.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12617952)

Một perceptron chỉ là một neuron. Ghép nhiều perceptron lại qua input và output của chúng, ta có **neural network**. Bài này nói về cách mạng được chia lớp, và về các **activation function** quyết định đầu ra của từng neuron.

### 🏗️ Ba loại layer

Mạng gồm các lớp perceptron nối tiếp nhau:

1. **Input layer** — lớp ngoài cùng bên trái. Đây là các giá trị thật của dữ liệu, nơi nhận dữ liệu gốc.
2. **Hidden layer** — các lớp nằm giữa input và output. Chúng "không nhìn thấy bên ngoài": không nhận dữ liệu trực tiếp, cũng không xuất kết quả cuối.
3. **Output layer** — lớp ngoài cùng bên phải, đưa ra kết quả ước lượng cuối cùng.

Hai quy tắc cần nhớ:

* Nếu có **ba hidden layer trở lên**, mạng được gọi là **deep network**.
* Càng nhiều layer, **mức trừu tượng càng tăng** — mạng học được biểu diễn ngày càng phức tạp.

### 📉 Vì sao hàm bước 0/1 không đủ tốt

Hàm activation của bài trước chỉ trả `0` hoặc `1` tùy dấu của tổng `w·x + b`. Để tiện, người ta đặt:

```text
z = w * x + b
```

và vẽ trục hoành theo `z`. Hàm này có nhược điểm lớn: **thay đổi nhỏ không được phản ánh**. `z` nhích từ `0.5` lên `0.6` vẫn ra `1`; `z` nhảy từ `-1` xuống `-1000` vẫn ra `0`. Không có độ phân giải nào để học — cần hàm "mượt" hơn.

### 📈 Sigmoid

Đường cong màu đỏ trong bài là **sigmoid**, cho output liên tục thay vì bật 0/1:

```text
f(x) = 1 / (1 + e^(-x))
```

Thay `x` bằng `z = w * x + b`, hàm activation trở thành:

```text
f(z) = 1 / (1 + e^(-z))
```

Đổi activation function có thể có ích tùy bài toán, và sẽ được bàn kỹ hơn khi code mạng thật.

### 📐 Tanh

Hàm phổ biến tiếp theo là **tanh** (hyperbolic tangent), cũng nhận `z = w * x + b`. Hình dạng rất giống sigmoid nhưng **miền giá trị là -1 đến 1**, thay vì 0 đến 1. Hành vi tương tự, chỉ khác khoảng output.

### 📏 ReLU

**ReLU** (rectified linear unit) đơn giản hơn nhiều: đưa `z` vào phép `max`:

```text
f(z) = max(0, z)
```

Nghĩa là:

* `z` âm → trả `0`.
* `z` dương → trả chính `z`.

Trên đồ thị, phần âm nằm phẳng ở 0, phần dương là đường thẳng — nên mới gọi là "linear unit". Đơn giản nhưng cực kỳ thông dụng.

Kinh nghiệm trong bài: **ReLU** và **tanh** thường cho kết quả tốt nhất, nên khóa học tập trung vào hai hàm này. May mắn là Keras đã có sẵn mọi activation function — chỉ cần truyền chuỗi như `relu` là xong, không phải tự viết công thức.

Phần còn lại của loạt bài lý thuyết sẽ nói về **cost function** — đo mức độ "tốt" của mạng — rồi tới gradient descent và back propagation.
