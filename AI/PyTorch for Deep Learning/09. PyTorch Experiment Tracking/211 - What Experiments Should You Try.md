---
title: 'Nên thử những experiment nào?'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 211
status: edited
source: '211 - What Experiments Should You Try.md'
categories:
- AI
tags: []
---

# 🧠 Nên thử những experiment nào?

> Nguồn: `211 - What Experiments Should You Try.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33120474)

Chào mừng trở lại. Bài trước ta kết thúc bằng thử thách dựng **hai** experiment EfficientNet-B0 (5 epoch và 10 epoch) rồi so sánh. Bài này mình không làm đúng hai cái đó — ta dựng hẳn một loạt lớn hơn, vì... tại sao không nhỉ? Trước hết cùng bàn xem có những loại experiment nào để thử.

### ♾️ Số experiment gần như vô hạn

Số experiment bạn có thể chạy cũng nhiều như số model bạn có thể build — gần như **không giới hạn**. Nhưng ta không thể test hết mọi thứ. Vậy nên test cái gì?

Trả lời: **bất cứ thứ gì là một dạng hyperparameter** mà bạn tưởng tượng được.

---

### 🎛️ Danh sách các "núm vặn"

* **Số epoch** — thay đổi thời gian train.
* **Số hidden layer / unit** — đổi độ phức tạp model.
* **Lượng dữ liệu** — hiện ta dùng 10% Food 101 cho pizza/steak/sushi. Tăng lên, hoặc tự thu thập thêm dữ liệu.
* **Cách tạo dữ liệu** — repo có `extras/` với notebook tạo bộ 10% pizza/steak/sushi từ **Food 101** (dataset của torchvision), có cả bản 20% để bạn chạy thí nghiệm lớn hơn.
* **Learning rate** — thử giá trị khác `0.001`, hoặc dùng **learning rate scheduling** (đổi learning rate theo thời gian).
* **Data augmentation** — thêm biến đổi ảnh.
* **Kiến trúc model** — đổi sang model pretrained khác trong torchvision, không chỉ EfficientNet.
* **Số layer / hidden unit** — gắn liền với kiến trúc model.

---

### 🔬 Vì sao bắt đầu với dữ liệu nhỏ?

Mình giải thích lý do chọn bộ 10%: **muốn experiment đầu tiên chạy thật nhanh** trước khi scale lên. Nếu scale lên rồi compute tốn thời gian mà kết quả lại tệ, bạn vừa mất kha khá thời gian. Vì vậy ta tiến từng bước: chạy trong vài giây tới vài phút, rồi mới đến toàn bộ Food 101.

Nói chung, **nhiều dữ liệu hơn thường tốt hơn** — đây là một trong những việc hiệu quả nhất trong machine learning.

---

### 💡 Tại sao transfer learning mạnh?

Có rất nhiều thứ để theo dõi, nhưng đó chính là thế giới machine learning thú vị: **câu hỏi lớn nhất là "cái gì làm nên model tốt nhất?"** — toàn bộ nghiên cứu đều xoay quanh nó. Và đó là lý do mình rất ủng hộ **transfer learning**: bạn có một working model để áp lên bài toán của mình, thay vì bắt đầu từ số 0.

---

### ✅ Tạm kết

Tóm lại, muốn cải thiện model thì cứ thay đổi hyperparameter: epoch, dữ liệu, learning rate, augmentation, kiến trúc... Không có "silver bullet". Trong vài video tới ta sẽ thiết kế experiment xoay quanh chính những núm vặn này. Hẹn gặp!
