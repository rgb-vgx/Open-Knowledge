---
title: 'Bài 70 — Kiến trúc điển hình của một neural network phân loại'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 70
status: edited
source: '070 - Typical Architecture of a Classification Neural Network (Overview).md'
categories:
- AI
tags: []
---

# 🏗️ Kiến trúc điển hình của một neural network phân loại

> Nguồn: `070 - Typical Architecture of a Classification Neural Network (Overview).md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32775608)

Bài trước chốt lại hai điều: input của model classification phải là **numerical representation**, còn output thường là **prediction probability**. Bài này mình vẽ ra bản sơ đồ tổng quát của một model như vậy. Toàn bộ nội dung này cũng có trong bản sách của khóa, mục "Architecture of a classification neural network".

### 🧩 Các hyperparameter chính

Một model classification có vài núm vặn mà **chính các bạn quyết định** — vì thế chúng là **hyperparameter**:

| Thành phần | Binary classification | Multiclass classification |
|---|---|---|
| **Input layer shape** (`in_features`) | Số feature đầu vào | Số feature đầu vào |
| **Hidden layers** | Tùy chọn, có thể nhiều lớp | Tùy chọn, có thể nhiều lớp |
| **Neurons mỗi hidden layer** (`out_features`) | Tùy chọn | Tùy chọn |
| **Output layer shape** | **1** | Một output cho **mỗi lớp** |
| **Hidden activation** | ReLU (hoặc loại khác) | ReLU (hoặc loại khác) |
| **Output activation** | **Sigmoid** | **Softmax** |
| **Loss function** | Binary cross entropy | Cross entropy |

---

### 🔢 Input layer: `in_features`

`in_features` do các bạn chọn, bằng **số feature** của bài toán. Ví dụ dự đoán ai đó có bệnh tim hay không, mình có thể dùng 5 feature:

* **age** — một con số, ví dụ 28.
* **sex** — mã hóa thành 0 hoặc 1 (nam/nữ). Nhớ: máy cần số.
* **height** — con số, ví dụ 180 cm.
* **weight** — con số, ví dụ khoảng 75 kg.
* **smoking status** — 0 hoặc 1.

Với bài toán ảnh, `in_features` có thể là **3** — số colour channels.

---

### 🧠 Hidden layers và số neuron

Mỗi lớp là một phép toán, và trong PyTorch **mọi thứ gần như đều là layer**. Cú pháp các bạn sẽ gặp khi định nghĩa một lớp là `nn.Linear(...)`, rồi tới `nn.ReLU()`, rồi `nn.Linear(...)` nữa.

* Số **hidden layer** là tùy ý — muốn bao nhiêu cũng được.
* **Neurons mỗi layer** (tức `out_features`) cũng tùy ý. Đặt 100 thì PyTorch sẽ tự tạo 100 "vòng tròn" nhỏ, mỗi vòng là một phép toán.
* Đây là lý do mình thích dạy bằng code: các bạn chỉnh được mọi thứ linh hoạt, thay vì nhìn một hình vẽ cố định.

Để thấy độ lớn của chuyện này, cứ nhìn **ResNet**: bản 34 layer đã dày đặc, còn có **ResNet-152** với 152 layer. Mình chưa tới đó, nhưng đang xây đủ công cụ để đi tới.

---

### 🎚️ Activation: chỗ "phép màu" non-linearity xuất hiện

* **Hidden layer activation** thường là **ReLU** (rectified linear unit) — nhưng PyTorch còn rất nhiều hàm non-linear khác. Mình chỉ gieo hạt giống ở đây thôi; hãy tưởng tượng một đường **non-linear** khác đường thẳng ra sao. Nó sẽ là **super power** cho bài toán classification.
* **Output activation**: **sigmoid** cho binary, **softmax** cho multiclass.

Những cái tên này giờ chỉ là chữ trên trang giấy — mình sẽ dạy xen kẽ lúc gặp trong code.

---

### 📉 Loss function và optimizer

**Loss function** đo model sai bao nhiêu so với dự đoán lý tưởng.

* Binary classification → **binary cross entropy**.
* Multiclass classification → **cross entropy** (không phải bản binary). Đúng như tên gọi: classification nhị phân đi với binary cross entropy.

**Optimizer** để tối ưu loss. Mình đã gặp **SGD** (stochastic gradient descent) trước đây; một lựa chọn phổ biến khác là **Adam**. Gói `torch.optim` còn nhiều optimizer khác nữa.

---

### 🍱 Ví dụ: mạng multiclass cho Food Vision

Bản sơ đồ mình vừa mô tả là một bài **multiclass** vì có **ba output feature** — tương ứng food, person, dog. Với Food Vision thì ba lớp là **sushi, steak, pizza**: ba output, mỗi lớp một prediction probability.

Các bạn để ý chữ **`nn.Sequential`** trong sơ đồ: nó đúng nghĩa đen — đi lần lượt qua từng bước của mạng.

Đủ chữ trên slide rồi. Bài sau mình mở **Google Colab** ra code thật.
