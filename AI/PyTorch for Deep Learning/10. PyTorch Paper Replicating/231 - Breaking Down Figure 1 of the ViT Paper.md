---
title: 'Mổ xẻ Figure 1 của paper ViT'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 231
status: edited
source: '231 - Breaking Down Figure 1 of the ViT Paper.md'
categories:
- AI
tags: []
---

# 🖼️ Mổ xẻ Figure 1 của paper ViT

> Nguồn: `231 - Breaking Down Figure 1 of the ViT Paper.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975312)

Bài trước ta đã có bản đồ inputs → layers → blocks → model. Giờ áp nó vào paper thật. Bốn mảnh ghép của puzzle: **Figure 1** (sơ đồ kiến trúc), **bốn phương trình** (hàm của từng layer), **Table 1** và **Table 3** (hyperparameter), và phần **text** xung quanh.

### 🧩 Figure 1: input và output trước đã

Việc đầu tiên khi gặp một kiến trúc lạ: xác định cái gì đi vào, cái gì đi ra.

* **Input**: một ảnh, được cắt thành các **patch** kích thước cố định.
* Mỗi patch được **linearly embed**, rồi cộng thêm **position embedding**.
* Chuỗi vector kết quả được đưa vào **standard transformer encoder**.
* **Output**: class name. Trong paper gốc là các class ImageNet như `bird`, `ball`, `car`; với Food Vision Mini sẽ là `pizza`, `steak`, `sushi`.

Nhìn vậy là đã map xong input/output — và biết ngay đây là một **classification model**.

### 🔤 Từ khóa cần hiểu: embedding

Trong figure có vài cụm "extra learnable...", "linearly embed...". Quy tắc chung: chỗ nào có **learnable** hay **embedding** thì đó là một **learnable representation** — bắt đầu bằng số ngẫu nhiên rồi được cải thiện dần trong quá trình train. Thay vì ném thẳng giá trị pixel vào transformer encoder, ta biến ảnh thành biểu diễn học được.

**Embedding** là một trong những khái niệm mạnh nhất của machine learning. Định nghĩa gọn: *embedding = learnable representation, khởi tạo ngẫu nhiên và tinh chỉnh dần*.

Paper còn thêm một **class token** học được vào đầu chuỗi: "we use the standard approach of adding an extra learnable classification token to the sequence". Chỗ này sẽ làm rõ khi code.

### 🧱 Các layer bên trong

Mỗi mảnh trong figure là một layer:

* **Norm** — normalization layer.
* **Multi-head attention** — nhiều head self-attention.
* **Norm** thứ hai.
* **MLP** — multi-layer perceptron, thường là vài layer chồng nhau; trong paper là **hai** layer.

Để ý các mũi tên vòng: output của một nhóm layer được **cộng** vào input của chính nó. Đó là **skip connection** hay **residual connection**.

Ghép layer thành block:

* **MSA block** — một Norm + multi-head attention.
* **MLP block** — Norm + MLP.
* Các block này hợp thành **transformer encoder**, rồi xếp nhiều transformer encoder lên nhau thành **model** hoàn chỉnh.

### 🍕 Chuyển sang Food Vision Mini

Ảnh pizza → cắt patch → qua chuỗi layer/block → hy vọng ra class `pizza`. Đó chính là thứ mình sẽ dựng.

---

### ✅ Chốt lại

Figure 1 trông rối nhưng đã tách được thành input, các layer, các block và output. Bài sau mình điểm qua bốn phương trình ở mức tổng quan, rồi bắt tay vào code.
