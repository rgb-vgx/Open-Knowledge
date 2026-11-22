---
title: 'Giải phẫu mạng neural: input, hidden layer và output'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 11
status: edited
source: '011 - Anatomy of Neural Networks.md'
categories:
- AI
tags: []
---

# 🧬 Giải phẫu mạng neural: input, hidden layer và output

> Nguồn: `011 - Anatomy of Neural Networks.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656588)

Bài trước mình để lại câu hỏi "neural network là gì?" và giao các bạn tự Google. Hôm nay chúng ta cùng trả lời, rồi mổ xẻ xem một mạng neural được cấu tạo ra sao.

### 🔍 Có hàng trăm định nghĩa

Nếu các bạn gõ "what are neural networks?" lên Google, sẽ thấy vô số kết quả: bài giải thích, định nghĩa, video "neural network trong 5 phút"... Các bạn đọc mười cái, năm cái, ba cái rồi tự rút ra định nghĩa cho mình.

Về phần mình, trong khóa này mình định nghĩa neural network theo cách thực dụng nhất: **một cỗ máy nhận dữ liệu, biến nó thành số, tìm pattern, rồi cho ra output**.

---

### 🔢 Bước một: biến mọi thứ thành số

Giả sử ta có dữ liệu: ảnh món ăn, tweet, hay file âm thanh. Con người nhìn ảnh ramen hay spaghetti là nhận ra ngay sau một hai lần; nghe nhạc hay, nghe bạn nói qua điện thoại cũng vậy.

Nhưng máy tính thì chưa. Trước khi dùng được trong neural network, dữ liệu phải được chuyển thành **con số**. Mình gọi bước này là **numerical encoding** hay **representation**.

Những dấu ngoặc vuông trong hình minh họa cho biết đó là một **matrix** hoặc **tensor** — thứ chúng ta sẽ thao tác rất nhiều trong khóa.

---

### 🕸️ Bước hai: đi qua mạng neural

Sau khi đã thành số, dữ liệu được đưa qua neural network. Một hình vẽ mạng neural có thể rất rối, nhưng tất cả đều theo cùng một cấu trúc cơ bản:

1. **Input layer** — nơi dữ liệu đi vào.
2. **Hidden layers** — một hoặc nhiều lớp, thực hiện các phép toán trên con số. Mỗi chấm nhỏ trong hình là một **node** (còn gọi là neuron hay unit).
3. **Output layer** — nơi cho ra kết quả.

Số node, số layer, cái gì đi vào, cái gì đi ra — tất cả đều **tùy biến được**.

---

### 🧠 Mạng tự học representation

Điều quan trọng: mạng neural **tự học ra representation**, chúng ta không định nghĩa nó học cái gì. Nó thao tác trên pattern trong dữ liệu theo cách của nó.

Representation này còn được gọi bằng nhiều tên:

* **patterns** trong dữ liệu
* **features**
* **weights**
* **learned representation**
* **weight matrix** / **weight tensor**

Ví dụ một feature có thể là chuyện chữ "do" thường đứng sau "how" trong nhiều ngôn ngữ. Nhưng nói chung, feature có thể là gần như bất cứ thứ gì — và mạng tự học lấy.

Cuối cùng, mạng xuất ra một **output**: một tập số (có thể là features, weight matrix, hay learned representation). Những con số này có thể lên tới hàng triệu — hình minh họa chỉ có chín số mà mình đã thấy choáng. Vì thế ta cần một bước chuyển chúng thành thứ con người hiểu được.

---

### 🍜 Ví dụ đầu-cuối

Với ảnh món ăn: input là ảnh, mạng học representation phân biệt ramen và spaghetti, rồi ta chuyển output thành câu trả lời "ảnh này là ramen" hay "spaghetti".

Với một tweet: mạng học pattern rồi cho ra phán đoán "đây là tweet về thảm họa thiên nhiên" hay "không phải".

---

### 🏗️ Kiến trúc mạng neural 101

Ghép tất cả lại, ta có **architecture** (kiến trúc) của mạng:

* **Input layer** — số **unit/neuron/node** tùy dữ liệu (ví dụ 2).
* **Hidden layers** — có thể một hoặc rất nhiều. Chữ "deep" trong deep learning đến từ đây. Ví dụ mạng như **ResNet-34** có 34 layer, **ResNet-152** có 152 layer — một kiến trúc computer vision rất phổ biến.
* **Output layer** — cho ra learned representation hoặc xác suất dự đoán.

Kiến trúc là mô tả **toàn bộ các layer cộng lại**: input, hidden (có thể nhiều hơn một), và output.

---

### 📐 Mỗi layer là gì?

Về mặt kỹ thuật, mỗi layer thường là sự kết hợp của hai loại hàm:

* **Linear** — đường thẳng.
* **Nonlinear** — đường không thẳng.

Nếu mình yêu cầu các bạn vẽ bất cứ thứ gì bằng các đường thẳng và đường cong không giới hạn, các bạn sẽ vẽ được đủ kiểu pattern. Ở tầng cơ bản nhất, neural network làm đúng như vậy: **dùng sự kết hợp của đường thẳng và đường cong để vẽ ra pattern trong dữ liệu**.

Chúng ta sẽ thấy điều này bằng code ở phần sau.

---

### 🔜 Tiếp theo

Đã biết neural network là gì và cấu tạo ra sao, bài tới mình sẽ điểm qua các **paradigm học khác nhau** — tức những cách mà mạng neural học. Hẹn gặp các bạn!
