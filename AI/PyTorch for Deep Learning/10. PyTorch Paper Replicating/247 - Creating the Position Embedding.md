---
title: 'Tạo position embedding cho Vision Transformer'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 247
status: edited
source: '247 - Creating the Position Embedding.md'
categories:
- AI
tags: []
---

# 📍 Tạo position embedding cho Vision Transformer

> Nguồn: `247 - Creating the Position Embedding.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34001596)

Chúng ta đang chạy rất bon. Vừa làm xong **class token** và gắn nó vào đầu chuỗi patch embeddings, giờ là mảnh cuối của **Equation 1**: **position embedding** (embedding vị trí). Mục tiêu bài này là tạo một loạt **1D learnable position embeddings** rồi cộng vào chuỗi patch, để mô hình giữ được thông tin vị trí của từng patch.

### 🖼️ Nhìn lại chặng đường đã qua

Điểm xuất phát của ta là một chuỗi **patch embeddings** có shape `(196, 768)` — 196 patch, mỗi patch 768 chiều embedding. Sau đó:

* Tạo một **learnable class token**, ban đầu để `nn.Parameter` với `torch.ones` chỉ để minh họa.
* Gắn class token vào **đầu** chuỗi patch embeddings.

Kết quả là shape đổi từ `196` thành `197`, và **embedding dimension** giữ nguyên `768`.

Mình nhấn mạnh một điều: sau này ta sẽ dùng `torch.randn` để khởi tạo ngẫu nhiên. Vì bản chất của deep learning là **bắt đầu từ ngẫu nhiên rồi tối ưu** dần.

---

### 🧩 Vì sao cần position embedding?

Khi biến ảnh thành patch bằng `Conv2d`, rồi **flatten** thành chuỗi, **thông tin không gian bị mất**. Position embedding ra đời để "nhắc" mô hình thứ tự các patch: patch này nằm cạnh patch kia, và cứ thế.

Trong paper, ký hiệu là **E_pos**, một phần tử số thực có shape `(N + 1, D)`, với `N` là số patch và `D` là embedding dimension. Với ta, đó là `197 × 768`. Đây chính là chỗ cái tên **patch + position embedding** xuất phát.

---

### 🔢 Tính số patch và embedding dimension

Nguyên tắc là **không hard-code** những gì mô hình có thể tự suy ra. Số patch tính bằng công thức:

```python
num_patches = int((height * width) / patch_size**2)
# 196
```

Lấy embedding dimension từ chiều cuối của tensor đã có class token:

```python
embedding_dimension = patch_embedded_image_with_class_embedding.shape[-1]
# 768
```

---

### ⚙️ Tạo learnable 1D position embedding

Rất giống cách làm class token, chỉ khác **shape**: class token chỉ là một biến đơn, còn position embedding trải khắp toàn bộ chuỗi.

```python
position_embedding = nn.Parameter(
    torch.ones(1, num_patches + 1, embedding_dimension)
)

position_embedding.shape
# torch.Size([1, 197, 768])
```

`nn.Parameter` mặc định có `requires_grad=True`, tức là **learnable** — đúng như ta cần.

---

### ➕ Cộng position embedding vào chuỗi

Vì shape khớp nhau, chỉ cần cộng trực tiếp:

```python
patch_and_position_embedding = (
    patch_embedded_image_with_class_embedding + position_embedding
)

patch_and_position_embedding.shape
# torch.Size([1, 197, 768])
```

Shape không đổi, nhưng **giá trị thay đổi**: vì position embedding khởi tạo bằng `torch.ones`, mỗi phần tử trong tensor kết quả tăng thêm **1**. Ta kiểm tra output sau mỗi lớp chính là vì thế — mạng nơ-ron suy cho cùng chỉ là output lớp này làm input lớp kia.

---

### ✅ Chốt lại

Ta vừa hoàn thành **Equation 1**: tạo patch embeddings, thêm class token, rồi cộng position embedding. Tensor cuối cùng `(1, 197, 768)` này chính là **biểu diễn ảnh** sẽ đi vào **transformer encoder**.

Thử thách cho bạn: gộp cả quy trình vào một cell duy nhất, đi từ ảnh gốc → patch embedding class → class token → position embedding. Bài sau mình sẽ làm đúng như vậy.
