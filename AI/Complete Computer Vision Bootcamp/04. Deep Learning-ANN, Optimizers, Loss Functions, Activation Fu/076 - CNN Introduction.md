---
title: 'Bài 076 — Giới thiệu Convolutional Neural Network (CNN)'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 76
status: edited
source: '076 - CNN Introduction.md'
categories:
- AI
tags: []
---

# 👁️ CNN: khi mạng neuron học nhìn ảnh

> Nguồn: `076 - CNN Introduction.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/47979343)

Chào các bạn! Hết chặng **ANN**, ta bước vào **CNN** (convolutional neural network). Toàn bộ kiến thức cũ — optimizers, loss function, activation function — vẫn được tái sử dụng; chỉ khác là đầu vào giờ là **ảnh**. Bài này là cái nhìn tổng quan trước khi mổ xẻ từng lớp.

### 🧱 ANN vs CNN: khác nhau ở loại đầu vào

Với **ANN**, input là các **input feature** dạng số hoặc categorical (có thể mã hóa sang số). Ví dụ bộ **fashion MNIST** có **784 feature**. Cùng một output feature, ANN giải được cả **classification** và **regression** của supervised learning.

Với **CNN**, input là **ảnh**. Từ ảnh, CNN giải được:

* **Image classification** — phân loại ảnh.
* **Object detection** — phát hiện vật thể (kỹ thuật CNN nâng cao).
* **Segmentation** — tách vùng từng pixel.
* Và nhiều bài toán khác.

### 🧠 CNN lấy cảm hứng từ não người

Cách CNN xử lý ảnh **dựa trên cách bộ não người xử lý ảnh**. Nhìn thấy con mèo hay cái camera, não nhận ra ngay — đó là điều CNN muốn bắt chước. Không cần hiểu não như bác sĩ, chỉ cần nắm luồng xử lý.

Trong bản đồ các vùng não, hai vùng quan trọng với ảnh là:

* **Cerebral cortex** (vùng số 12) — phụ trách **eye movement and orientation**.
* **Occipital lobe** — nơi **visual area**, tức **sight image recognition** và **image perception** diễn ra, nằm ở **phía sau** não.

### 🔀 Luồng tín hiệu trong não

Khi mắt nhìn một vật (ví dụ cái camera):

1. Tín hiệu từ **retina** đi tới **cerebral cortex**.
2. Cerebral cortex chuyển tiếp sang **visual cortex** nằm trong **occipital lobe**.
3. Visual cortex — nơi **tiếp nhận, tích hợp và xử lý** thông tin thị giác — chia thành nhiều lớp **V1 đến V5**.
4. Sau khi xử lý qua các lớp, ảnh được **nhận diện/hình dung** ở vùng chẩm.

```text
Mắt (retina) → Cerebral cortex → Visual cortex (V1..V5) → Occipital lobe: nhận diện
```

### 🌍 Ý tưởng lớn

Các công ty/robot hiện đại đang **sao chép chức năng từng vùng não** vào máy — ví dụ vùng điều khiển cơ vận động (vùng số 3) được mô phỏng để robot đứng và thực hiện động tác. CNN, object detection cũng đi theo tinh thần đó: tái tạo cách não "nhìn".

Bài sau ta sẽ đi sâu **cerebral cortex, visual cortex và các lớp V1–V5** — nền tảng để hiểu vì sao CNN có các lớp convolution và pooling. Hẹn gặp lại!
