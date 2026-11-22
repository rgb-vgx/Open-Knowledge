---
title: 'Các cách cải thiện model khi kết quả chưa ưng ý'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 81
status: edited
source: '081 - Discussing Options to Improve a Model.md'
categories:
- AI
tags: []
---

# 🛠️ Các cách cải thiện model khi kết quả chưa ưng ý

> Nguồn: `081 - Discussing Options to Improve a Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32822684)

Hàm `helper_functions.py` cho mình thấy rõ ràng: model chỉ đang vẽ **đường thẳng**, mà dữ liệu thì **vòng tròn**. Giờ bước sang bước số năm của workflow: **improving a model**. Khi kết quả chưa hài lòng, có những nút vặn nào để thử? Bài này mình điểm qua các lựa chọn — góc nhìn **từ phía model**.

### 🧱 Thêm layer

Model hiện tại chỉ có hai layer, vài chục parameter. Nếu có **10 layer** như vậy, số parameter tăng gấp mười, cho model **nhiều cơ hội học pattern** hơn. Nhưng nhớ: dataset của mình rất đơn giản — thêm nhiều layer quá có khi model cố học những thứ **quá phức tạp** so với dữ liệu, phải chỉnh quá nhiều con số cho một bài dễ.

### 🔢 Thêm hidden unit

Thay vì mỗi layer 5 hidden unit, có thể tăng lên **10**, **128**, **256**… Nguyên tắc y hệt: càng nhiều parameter để biểu diễn dữ liệu thì *có thể* học tốt hơn — "có thể" thôi, không phải lúc nào cũng vậy. Và luôn nhớ ràng buộc shape: **`out_features` của layer trước phải khớp `in_features` của layer sau**.

Các con số như 128, 256 không ngẫu nhiên: **bội số của 8** thường hiệu quả trong deep learning.

### ⏳ Fit lâu hơn

Mỗi **epoch** là một lần đi qua toàn bộ dữ liệu. 100 lần nhìn dataset có thể chưa đủ — thử **1000 epoch** (đúng thử thách bài trước).

### 🎚️ Đổi activation function

Hiện model dùng **sigmoid** ở output — chuẩn cho binary classification. Nhưng còn có **activation function đặt bên trong model** nữa. Đây là gợi ý lớn cho thứ còn thiếu — sẽ bàn kỹ sau.

### 📈 Đổi learning rate

Learning rate là **mức optimizer chỉnh parameter mỗi epoch**.

* Quá **nhỏ** → model học quá chậm, gần như không nhúc nhích.
* Quá **lớn** → bước cập nhật quá lớn, model có thể "nổ". Đây là **exploding gradient problem** — các con số phình to. Ngược lại có **vanishing gradient problem** — gradient về gần 0 quá nhanh.

### 🎯 Đổi loss function

Nhưng với bài này, **sigmoid + binary cross entropy** đã khá chuẩn rồi. Mình sẽ tập trung vào **thêm layer**, **thêm hidden unit**, **fit lâu hơn**, có thể chỉnh **learning rate**.

### 🔬 Bài học về cách làm thí nghiệm

Mình sắp đổi **cả ba** thứ cùng lúc (số hidden unit, số layer, số epoch). Đặt mũ nhà khoa học lên: nếu kết quả tốt hơn, các bạn có biết **cái nào** tạo ra cải thiện không? Không.

> Khi làm thí nghiệm machine learning, chỉ nên **đổi một giá trị tại một thời điểm** rồi theo dõi kết quả.

Đó gọi là **experiment tracking** — mình sẽ gặp lại công cụ **TensorBoard** của PyTorch để giám sát thí nghiệm. Trong bài tới, mình cố ý đổi nhiều thứ cùng lúc chỉ để minh họa, chứ thực tế nên thay đổi từng biến một.

Workflow hiện tại: đã fit model, dự đoán, đánh giá bằng hình ảnh và thấy chưa ổn → đang ở bước **improve through experimentation**. Chưa cần lưu model, vì chưa có model nào đáng lưu.
