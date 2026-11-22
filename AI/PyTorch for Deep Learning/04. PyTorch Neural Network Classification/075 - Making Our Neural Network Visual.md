---
title: 'Bài 75 — Nhìn cho rõ bên trong mạng neural bằng hình ảnh'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 75
status: edited
source: '075 - Making Our Neural Network Visual.md'
categories:
- AI
tags: []
---

# 👀 Nhìn cho rõ bên trong mạng neural bằng hình ảnh

> Nguồn: `075 - Making Our Neural Network Visual.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32820608)

Mình vừa tạo mạng neural nhiều lớp đầu tiên. Nhưng hiện tại nó chỉ là code trên trang giấy. Thực ra, phần lớn công việc xây model PyTorch sau này diễn ra đúng như vậy: tạo vài lớp, rồi dùng chúng trong **forward computation** để tạo **forward pass**. Bài này mình làm mọi thứ trực quan hơn.

### 🕹️ TensorFlow Playground: nhìn mạng bằng mắt

TensorFlow là framework deep learning khác, tương tự PyTorch — code để xây neural network, fit vào dữ liệu, tìm pattern, rồi dùng model trong ứng dụng. **playground.tensorflow.org** cho phép train một mạng ngay trong trình duyệt.

Mình chọn dataset dạng vòng tròn (gần giống dữ liệu của mình), chỉnh lên **5 neuron**. Kết quả: **2 feature** đầu vào (x1, x2) → **một hidden layer 5 neuron** → output.

Đó chính xác là model mình vừa dựng:

* `in_features=2` → `out_features=5`
* rồi `in_features=5` → `out_features=1`

Tương ứng từng lớp một.

---

### 🤔 Vì sao loss đứng ở 0.5?

Mình để **learning rate 0.01**, chạy cỡ 3000 epoch với activation **linear** (vì mình đang giữ tuyến tính). Test loss đứng quanh **0.5** — tức khoảng **50% loss**.

Nếu loss hoàn hảo là **0** và tệ nhất là **1**, thì 50% nghĩa là gì? Với **binary classification** có số mẫu mỗi lớp bằng nhau, một model **đoán bừa** — như tung đồng xu — cũng ra khoảng 50%. Fit 3000 epoch mà loss không giảm chút nào là dấu hiệu rất đáng nghi. Liệu mạng của mình có bị y vậy không? Mình sẽ kiểm ở các bài sau.

---

### ✏️ Vẽ tay bằng FigJam

Để thấy rõ hơn, mình mở **FigJam** — một whiteboard browser, không cần cầu kỳ. Sơ đồ đơn giản:

* **Input**: `x1`, `x2` (hai chấm tròn, hai feature).
* **Hidden layer**: 5 neuron, mỗi input nối tới **tất cả** neuron.
* **Output**: một giá trị `y`.

Khi nhìn code dễ tưởng chỉ có input → một hidden layer → output. Nhưng thực chất đây đúng là hình dạng đó — mọi input nối tới mọi hidden unit, rồi tất cả đổ về output.

---

### 📌 Quy tắc xuyên suốt

Dù dataset gì, các bạn luôn phải "chế" ra input layer khớp với dữ liệu: 10 feature thì 10 input, 4 feature thì 4 input. Muốn mạng mạnh hơn thì tăng **số hidden unit** (tức `out_features` của layer). Ràng buộc duy nhất: **layer sau phải nhận đúng số feature mà layer trước xuất ra** — nếu không sẽ có lỗi shape.

Mình có một output vì `y` chỉ là một giá trị.

---

### 🎯 Thử thách nhỏ

Vào **playground.tensorflow.org**, dựng lại mạng này và xem nó có fit được dữ liệu vòng tròn không. Các bạn đoán sao? Câu trả lời nằm ở vài bài tới. Bài sau mình sẽ chỉ cách tạo đúng model này bằng **ít code hơn nhiều** — `nn.Sequential`.
