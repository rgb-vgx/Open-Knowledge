---
title: 'Mổ xẻ Equation 1: patch embeddings, class token, position embedding'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 233
status: edited
source: '233 - Breaking Down Equation 1.md'
categories:
- AI
tags: []
---

# 🧮 Mổ xẻ Equation 1: patch embeddings, class token, position embedding

> Nguồn: `233 - Breaking Down Equation 1.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975318)

Paper đọc nguyên bản khá ngợp, nên ta đang bẻ nhỏ từng mảnh. Bài này đến **Equation 1** — phương trình tạo ra input cho transformer encoder. Trước đó nhắc lại hai công cụ: **Mathpix** (mathpix.com) để chụp công thức thành text editable, và **LaTeX** để viết công thức — Colab chạy Markdown nhưng vẫn hỗ trợ LaTeX giữa hai dấu `$`.

### 🧷 Equation 1 gồm những gì

Ta chia ảnh thành các patch cố định, embed chúng, và đó là ý chính của Equation 1. Nhưng bên trong còn hai thứ nữa. Viết theo ký hiệu của paper:

* `x_class` — **learnable class token**, thêm vào **đầu** sequence (ký hiệu dấu sao trong figure).
* `x_p^1·E, x_p^2·E, ..., x_p^N·E` — các **patch embedding**; `E` là phép chiếu tuyến tính học được, `N` là số patch, `P` là kích thước patch, `x` là input.
* `E_pos` — **position embedding**, cộng vào để giữ thông tin thứ tự.

Gộp lại:

```text
z0 = [ x_class ; x_p^1·E ; x_p^2·E ; ... ; x_p^N·E ] + E_pos
```

Trong đó `D` là **latent vector size** (embedding size) giữ nguyên xuyên suốt các layer — trong **Table 1** gọi là **hidden size**. Các patch được flatten rồi map sang `D` chiều bằng **trainable linear projection**; output của phép chiếu gọi là **Patch embeddings**.

### 🔢 Vì sao cần position embedding

Text paper nói rõ: position embedding được cộng vào patch embedding "to retain positional information". Nghĩa là giữ **thứ tự** của từng patch trong ảnh. Paper dùng **learnable 1D position embeddings** vì "we have not observed significant performance gains from using more advanced 2D-aware position embeddings" (xem Appendix D).

Figure minh họa dùng 9 patch với vị trí đánh số 0–9; con số thực tế phụ thuộc số patch của bạn.

### 🪜 Viết lại bằng pseudocode

Mình hay chuyển phương trình sang pseudocode cho dễ hình dung:

```text
input = [class_token, image_patch_1, image_patch_2, ..., image_patch_N]
input = input + [position_embedding_class_token,
                 position_embedding_patch_1,
                 ...,
                 position_embedding_patch_N]
output = transformer_encoder(input)
```

Ba thành phần cần nhớ:

1. **Class token** — learnable, đứng đầu sequence.
2. **Patch embeddings** — learnable linear projection của các patch đã flatten.
3. **Position embeddings** — giữ vị trí của class token và từng patch.

Toàn bộ vector này là input của transformer encoder.

---

### ✅ Chốt lại

Equation 1 = patch embeddings + class token + position embeddings. Thử thách: tự map Equation 2 (**MSA**), Equation 3 (**MLP**) và Equation 4 (**LN**) vào các block tương ứng trong Figure 1. Bài sau mình mổ Equation 2.
