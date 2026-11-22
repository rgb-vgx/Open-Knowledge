---
title: 'Tổng quan cách replicate một Vision Transformer'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 230
status: edited
source: '230 - Replicating a Vision Transformer - High Level Overview.md'
categories:
- AI
tags: []
---

# 🧠 Tổng quan cách replicate một Vision Transformer

> Nguồn: `230 - Replicating a Vision Transformer - High Level Overview.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975308)

Bài trước ta đã có một ảnh pizza xem được. Giờ bắt đầu dựng **Vision Transformer**. Mình sẽ dành vài bài bóc tách kiến trúc trước, rồi mới viết code khớp với phần tổng quan đó.

### 🧩 Bốn mảnh ghép cần lấy từ paper

Trong cả paper 22 trang, mình chỉ tập trung vào bốn chỗ:

1. **Figure 1** — sơ đồ trực quan của toàn bộ kiến trúc, có input và output rõ ràng.
2. **Section 3.1** — phần text mô tả method. Nếu chỉ đọc kỹ một chỗ trong paper, hãy đọc section này.
3. **Bốn phương trình** — tạo nên các layer, chủ yếu trong **transformer encoder**.
4. **Table 1** — các biến thể model và hyperparameter.

Mình sẽ dựng **ViT-Base**, bản nhỏ nhất, nhưng viết code sao cho có thể tăng hyperparameter lên các bản lớn hơn sau này.

---

### 🗺️ Bản đồ: inputs → layers → blocks → model

Cách mình tách mọi kiến trúc deep learning: **inputs, outputs, layers, blocks**.

* **Input**: dữ liệu số. Với mình là **batch ảnh** dạng tensor.
* **Output**: thứ model trả ra. Với mình là **nhãn phân loại** pizza, steak, sushi.
* **Layer**: nhận input, biến đổi bằng một hàm nội bộ. Ví dụ hàm đó là **self-attention**. Công thức self-attention lấy ba input **query, key, value**:

  ```
  Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k) · V
  ```

  Trong đó `d_k` là chiều của key/embedding. Điểm dễ nhầm: query, key, value đôi khi **giống hệt nhau** — đó là lý do gọi là **self**-attention.
* **Block**: một chồng layer. Số layer trong block là tùy ý — mình vẽ 3 cho đẹp, thực tế có thể 2, 5, 10. Ví dụ **transformer encoder block** trong ViT có thể gồm 4 layer: norm, multi-head attention, norm, MLP.
* **Model**: một chồng block. Block vẫn nhận input và trả output, nên model cũng vậy.

Điều quan trọng: model **học ánh xạ từ input sang output**. Dù trước mắt là 22 trang research code, nguyên lý vẫn y hệt mọi mạng neural đã dựng trong khóa.

---

### 🔎 Đi săn "kho báu" trong paper

Replicating giống đi tìm kho báu: phải lục đúng bảng, đúng figure để lấy nguyên liệu. Ví dụ **Table 3** cho ta:

* **batch size 4096** — quá lớn với phần cứng của mình.
* **image size 224 × 224** — đã dùng ở bài trước.
* **patch size 16** — sẽ dùng khi chia ảnh thành patch.

Mình không train trên ImageNet mà dùng bộ pizza/steak/sushi nhỏ hơn, nên các con số sẽ được thu nhỏ cho phù hợp. Các bạn muốn tìm hiểu thêm thì cứ lần theo từng tham số trong bảng.

---

### 🧱 Gom lại thành một câu

**Inputs → Layers (hàm biến đổi) → Blocks (chồng layer) → Model (chồng block) → Outputs.** Cứ ghép như xếp Lego.

---

### ✅ Chốt lại

Bài tập nhỏ: dành 2 phút nhìn lại sơ đồ inputs → layers → blocks → model và lần theo các mũi tên. Bài sau mình mổ xẻ **Figure 1** của paper ViT.
