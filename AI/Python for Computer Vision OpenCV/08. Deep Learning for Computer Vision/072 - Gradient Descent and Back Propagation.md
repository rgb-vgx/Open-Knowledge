---
title: 'Gradient descent và backpropagation trong mạng neural'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 72
status: edited
source: '072 - Gradient Descent and Back Propagation.md'
categories:
- AI
tags: []
---

# 🎯 Gradient descent và backpropagation

> Nguồn: `072 - Gradient Descent and Back Propagation.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12618036)

Bài này khép lại phần lý thuyết bằng hai thuật ngữ chắc hẳn các bạn đã nghe đâu đó: **gradient descent** và **backpropagation**. Mục tiêu chỉ là hiểu ý tưởng ở mức cao, không đi sâu vào toán — phần toán sẽ được làm lại khi giải ví dụ cụ thể.

### ⛰️ Gradient descent: đi xuống đáy

Gradient descent là thuật toán tối ưu dùng để tìm **điểm cực tiểu** của một hàm. Trong ngữ cảnh này hàm cần tối thiểu chính là **cost function**.

Ví dụ một chiều trong bài:

* Trục tung là **cost** — kết quả của cost function.
* Trục hoành là **một weight** cụ thể mà ta đang cần chọn.

Weight ban đầu được chọn ngẫu nhiên, ứng với điểm xanh trên đồ thị. Ta muốn chỉnh weight sao cho cost nhỏ nhất — nhìn bằng mắt thì đó là **đáy của parabol**. Nhưng máy không "nhìn" được, nên cách làm là:

1. Tính **gradient** — đạo hàm của hàm tại điểm hiện tại.
2. Xem hướng nào là hướng **âm** của gradient.
3. Bước từng bước nhỏ theo hướng đó, lặp lại cho tới khi chạm đáy.

Nói gọn: lấy bước tiến tỷ lệ với **âm của gradient**.

---

### 🧮 Vì sao phải dùng thư viện

Với một chiều thì tìm cực tiểu bằng mắt rất dễ. Nhưng mạng thật có **rất nhiều tham số**, không thể vẽ đồ thị hay nhìn bằng trực giác được nữa. Khi đó phải dùng các **thư viện đại số tuyến tính** có sẵn trong deep learning library, ví dụ tìm giá trị tốt nhất cho toàn bộ weight đầu vào của các neuron.

---

### 🔁 Backpropagation: sửa mọi weight cùng lúc

Gradient descent ở trên mới chỉ minh họa cho **một** weight. Câu hỏi còn lại: làm sao điều chỉnh **toàn bộ** weight trong cả mạng cùng một lúc?

Đó là vai trò của **backpropagation**:

* Nó tính **phần đóng góp lỗi của từng neuron** sau khi một batch dữ liệu được xử lý.
* Nó dựa nhiều vào **chain rule** (quy tắc chuỗi) trong giải tích để lan ngược qua mạng và tính các lỗi này.
* Cách chạy: tính lỗi ở **output**, rồi phân phối ngược qua từng layer.
* Nó **cần biết output mong muốn cho mỗi input** — tức là phải có nhãn, đúng bản chất **supervised learning**. Không có gì để so sánh thì không có lỗi để tính.

---

### 🏦 Bài thực hành tiếp theo

Lý thuyết đến đây là đủ để bắt tay vào Keras. Bài code đầu tiên dùng bộ dữ liệu **phân biệt tiền thật và tiền giả** (counterfeit vs real bills), lưu ý là dữ liệu này chỉ gồm các **feature dạng số**, chưa phải ảnh.

Muốn làm trực tiếp trên ảnh — file JPEG hay PNG thật sự — thì phải chờ tới phần **convolutional neural network**. Đó cũng chính là bước tiếp theo sau khi làm quen Keras.
