---
title: 'Tensor là gì và vai trò của nó trong deep learning'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 15
status: edited
source: '015 - What Are Tensors.md'
categories:
- AI
tags: []
---

# 🧱 Tensor là gì và vai trò của nó trong deep learning

> Nguồn: `015 - What Are Tensors.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656596)

Bài trước mình để lại câu hỏi "tensor là gì?" và giao các bạn tự tìm hiểu. Đây chính là tinh thần của khóa học: mình không muốn chỉ đưa đáp án, mà muốn khơi gợi để các bạn tự tìm ra. Giờ chúng ta cùng chốt lại.

### 🔢 Tensor: cách biểu diễn số của deep learning

Nhìn lại sơ đồ mạng neural: ta có input, một bước **numerical encoding**, rồi mạng neural, rồi output.

Dữ liệu đầu vào có thể là ảnh, văn bản, hay file âm thanh. Chúng không nhất thiết đi vào cùng một lúc: ảnh thì vào mạng chuyên cho ảnh, văn bản vào mạng chuyên cho văn bản, âm thanh vào mạng chuyên cho âm thanh. Ngành này cũng đang tiến tới những mạng xử lý được cả ba loại, nhưng trong khóa này mình sẽ bắt đầu nhỏ rồi mở rộng dần.

Nguyên lý vẫn vậy:

1. Có **input**.
2. **Numerical encode** nó thành một dạng nào đó.
3. Đưa vào **neural network** để học representation/pattern.
4. Nhận **output** là một representation.
5. Chuyển representation đó thành thứ con người hiểu được.

Và dạng số ở bước 2 và 4 chính là **tensor**.

### 🧩 Tensor có thể là gần như bất cứ thứ gì

Câu trả lời ngắn gọn: **một tensor có thể là gần như bất kỳ cách biểu diễn số nào**.

Đó cũng là **building block nền tảng của PyTorch** — bên cạnh các thành phần neural network, thứ cốt lõi chính là **`torch.Tensor`**. Chúng ta sẽ gặp nó ngay thôi.

Điểm cần nhớ: bạn có input data, bạn **numerically encode** nó thành một tensor — loại tensor tùy thuộc bài toán. Rồi bạn đưa tensor đó vào neural network, mạng thực hiện các phép toán trên tensor.

### ⚙️ PyTorch lo phần toán phía sau

Rất nhiều phép toán trong số đó được PyTorch xử lý ngầm. Chúng ta viết code để thực thi các phép toán trên tensor, còn phần tính toán phức tạp thì framework lo.

Sau đó, mạng neural — do bạn tự xây hoặc lấy sẵn để dùng cho bài toán của mình — **xuất ra một tensor khác**. Tensor này giống input về bản chất, nhưng đã được biến đổi theo cách ta lập trình.

Cuối cùng, ta lấy output tensor và chuyển thành thứ con người hiểu được.

### 🍜 Ví dụ: phân loại ramen hay spaghetti

Làm bài toán phân loại ảnh, cụ thể là phân biệt ảnh **ramen** và **spaghetti**:

* **Input**: ảnh.
* Chuyển ảnh thành số, biểu diễn bằng **tensor**.
* Đưa tensor đó vào **neural network** — có thể là rất nhiều tensor: 10.000 ảnh, một triệu ảnh, thậm chí nếu bạn là Google hay Facebook thì có thể là 300 triệu hay một tỷ ảnh một lúc.
* Mạng thực hiện phép toán trên các tensor, xuất ra tensor.
* Chuyển tensor đó thành kết quả con người đọc được: đây là ramen hay spaghetti.

Nguyên lý không đổi dù quy mô lớn đến đâu: **encode dữ liệu thành tensor → đưa vào mạng → nhận tensor ra → diễn giải**.

### 🎯 Chốt lại

Chúng ta đã chạm tới những nền tảng quan trọng: machine learning là gì, deep learning là gì, neural network là gì, vì sao dùng PyTorch, PyTorch là gì, và giờ là **tensor** — viên gạch cơ bản nhất của deep learning.

Bài tới mình sẽ nói cụ thể hơn về những gì chúng ta sẽ code trong module đầu tiên. Mình rất háo hức — sắp được code rồi! Hẹn gặp các bạn ở bài sau.
