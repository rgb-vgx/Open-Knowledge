---
title: 'Bài 68 — Phân loại bằng neural network: bài toán lớn thứ hai của machine learning'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 68
status: edited
source: '068 - Introduction to Machine Learning Classification With PyTorch.md'
categories:
- AI
tags: []
---

# 🧠 Phân loại bằng neural network: bài toán lớn thứ hai của ML

> Nguồn: `068 - Introduction to Machine Learning Classification With PyTorch.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32775600)

Chào các bạn! Mình quay lại với một module cực kỳ hào hứng: **neural network classification với PyTorch**. Nếu module trước là **regression** — dự đoán một con số, thì module này là **classification** — dự đoán một thứ (một lớp). Gộp hai module lại, các bạn đã nắm được hai bài toán lớn nhất của machine learning.

### 🆘 Bí kíp khi bị kẹt

Trước khi vào code, mình muốn nói về cách tự cứu mình. Đây là thứ mình nhấn mạnh nhất trong cả khóa:

1. **Follow along với code** — có code thì gõ theo, chạy thử, viết lại bằng tay. Không gì quan trọng hơn việc này.
2. Vẫn kẹt? Bấm **Shift + Command + Space** (Windows thì là **Control**) để đọc **docstring** của bất kỳ hàm nào đang chạy.
3. Vẫn kẹt? **Search lỗi** — copy nguyên văn thông báo lỗi dán vào Google. Mình cũng làm y vậy. Các bạn sẽ gặp StackOverflow và tài liệu chính thức của PyTorch.
4. Vẫn kẹt? Cứ chạy lại code lần nữa.
5. Cuối cùng mới là **đặt câu hỏi** — chỗ tốt nhất là trang Discussions của repo GitHub khóa học. Nhớ ghi **số video + timestamp** và chọn mục Q&A.

Notebook của module này dựa trên **chương 2** của cuốn *Zero to Mastery Learn PyTorch for Deep Learning* — phần "Neural Network Classification with PyTorch". Toàn bộ code dạng text nằm trong repo `mrdbourke/pytorch-deep-learning`.

---

### 🔍 Classification là gì?

Classification là một trong những bài toán chính của machine learning, và các bạn gặp nó mỗi ngày:

* **Email này có phải spam không?** Hộp thư của các bạn đằng sau luôn có một model (có thể là neural network, có thể không) quyết định thư nào vào spam. Đây là **binary classification** — một trong hai: spam (1) hoặc không spam (0).
* **Bức ảnh này là sushi, steak hay pizza?** Có hơn hai lựa chọn thì đó là **multiclass classification**. Có thể là 10 món, 100 món, hay cả nghìn lớp như **ImageNet** — bộ dữ liệu computer vision nổi tiếng với **1000 object classes**.

---

### 🏷️ Multiclass khác multi-label chỗ nào?

Lúc mới học machine learning, mình từng nhầm hai khái niệm này suốt, nên nói cho rõ:

| Loại | Ý nghĩa | Ví dụ |
|---|---|---|
| **Multiclass** | Nhiều lớp nhưng mỗi mẫu chỉ nhận **một** nhãn | Sushi / steak / pizza → mỗi ảnh là một món |
| **Multi-label** | Nhiều lớp và mỗi mẫu có thể nhận **nhiều** nhãn | Bài Wikipedia "deep learning" gắn các category: deep learning, artificial neural networks, artificial intelligence, emerging technologies |

Nếu xây model đọc một bài viết rồi trả về các tag phù hợp, bài đó có thể dính 1, 3 hay 10 tag — đó là **multi-label classification**, chứ không phải chọn một lớp duy nhất.

---

### 🐶🐱 Binary và multiclass trên đời thật

Thử tưởng tượng mình huấn luyện model phân biệt ảnh hai chú chó của mình (Seven và một chú nữa) với ảnh chú mèo Bella mà mình và bạn đời nhận nuôi. Cho model xem 10.000 ảnh chó và 10.000 ảnh mèo, rồi đưa một ảnh lạ vào hỏi "chó hay mèo?" — đó là **binary classification**.

Rồi một ngày các bạn ra trang trại chụp thêm ảnh gà, cập nhật model. Giờ lựa chọn không còn là hai nữa, mà là chó / mèo / gà — bài toán chuyển thành **multiclass classification**.

---

### 🗺️ Chúng ta sẽ đi qua những gì

Mình điểm nhanh lộ trình của module:

* Kiến trúc của một **neural network classification model**.
* **Input shape** và **output shape** — tức features và labels. Model luôn thích đầu vào dạng số, và các số đó thường nằm trong **tensor** với shape tùy loại dữ liệu.
* Tự tạo dữ liệu để **view, fit và predict**.
* Ôn lại các bước modelling và xây model cho classification (khác regression một chút, nhưng không đến mức "khác trời khác đất").
* Cách dựng **loss function** và **optimizer** cho model phân loại.
* Viết lại **training loop** và **evaluation/testing loop**.
* Lưu và load model.
* Khai thác sức mạnh của **non-linearity** — các bạn đoán được rồi đấy: đường thẳng là linear, còn non-linear là phá khỏi đường thẳng đó.
* Các phương pháp **đánh giá** model classification.

Cả module này mình sẽ vừa nấu code, vừa làm hóa học gia, vừa làm nghệ sĩ, vừa làm khoa học — nhưng mình thích nhất vai đầu bếp. Bài sau, trước khi gõ code, mình sẽ soi kỹ input và output của một bài classification trông ra sao.
