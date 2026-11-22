---
title: 'Perceptron: từ neuron sinh học đến neuron nhân tạo'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 69
status: edited
source: '069 - Understanding a Neuron.md'
categories:
- AI
tags: []
---

# 🧬 Perceptron: từ neuron sinh học đến neuron nhân tạo

> Nguồn: `069 - Understanding a Neuron.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12617948)

Trước khi ghép các neuron lại thành mạng, ta cần hiểu một neuron đơn lẻ hoạt động ra sao. Artificial neural network (ANN) lấy cảm hứng từ sinh học, nên bài này bắt đầu từ tế bào thần kinh thật, rồi đi tới mô hình **perceptron** và cách biểu diễn nó bằng toán.

### 🧫 Neuron sinh học truyền tín hiệu thế nào

Cách đơn giản hóa: neuron có nhiều **dendrite** (nhánh) đưa tín hiệu vào thân tế bào. Các tín hiệu điện đi qua dendrite vào thân, tổng hợp lại, rồi **một** tín hiệu điện duy nhất đi ra qua **axon** để nối tiếp sang các neuron khác.

Ý tưởng cốt lõi: nhiều input → một output. Neuron nhân tạo giữ đúng cấu trúc đó.

---

### 🔢 Perceptron với hai input

Mô hình đơn giản nhất của neuron nhân tạo là **perceptron**. Ví dụ trong bài có hai input và một output, đánh số từ 0 cho quen với index trong lập trình: `input 0` và `input 1`.

Input là các **feature value** của dữ liệu — có thể là số phòng trong nhà, hoặc độ tối của pixel trong ảnh. Với ví dụ này, gán đại hai số: `input 0 = 12`, `input 1 = 4`.

Bước tiếp theo là nhân mỗi input với một **weight**:

* `weight 0 = 0.5` cho `input 0`
* `weight 1 = -1` cho `input 1`

Weight thường được khởi tạo ngẫu nhiên — ở đây chỉ là số chọn ngẫu nhiên, không cần bận tâm ý nghĩa:

```text
12 * 0.5  = 6
4  * (-1) = -4
```

Cộng lại được `6 + (-4) = 2`.

---

### ⚡ Hàm activation đầu tiên: bước nhảy 0/1

Kết quả trên được đưa qua **activation function**. Có rất nhiều hàm để chọn, nhưng ở mức đơn giản nhất bài này dùng hàm bước:

* Nếu tổng input **dương** → trả về `1`.
* Nếu tổng input **âm** → trả về `0`.

Với tổng bằng `2` (dương), output là `1`.

---

### 🩹 Vấn đề input bằng 0 và bias term

Có một lỗ hổng: nếu các input ban đầu đều bằng `0` thì `0` nhân với bất kỳ weight nào cũng bằng `0`, tổng luôn bằng `0`, và output luôn là `0` dù chọn weight gì. Neuron "chết" ngay từ đầu.

Cách sửa: thêm **bias term**, ở ví dụ này chọn `bias = 1`. Nhờ vậy tổng không còn bị kẹt ở 0 khi input rỗng.

---

### 🧮 Biểu diễn bằng toán

Perceptron viết gọn lại rất đơn giản. Với `i` chạy từ `0` đến `n` (n là số input):

```text
y = Σ (w_i * x_i) + b
```

Tức là lấy từng weight nhân với input tương ứng, cộng hết lại, rồi cộng thêm bias. Đó là toàn bộ công thức.

Khi có nhiều perceptron xếp thành mạng, biểu diễn này mở rộng tự nhiên sang dạng **ma trận** — và đó là nội dung bài tiếp theo.

Tóm lại: neuron sinh học nhận nhiều tín hiệu vào, phát một tín hiệu ra; perceptron mô phỏng bằng cách nhân input với weight, cộng bias, rồi cho qua hàm activation. Bài sau sẽ nối nhiều perceptron lại thành neural network và đi sâu vào các hàm activation phổ biến.
