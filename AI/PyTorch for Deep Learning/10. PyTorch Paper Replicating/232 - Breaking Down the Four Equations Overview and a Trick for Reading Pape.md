---
title: 'Bốn phương trình của ViT và mẹo đọc paper'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 232
status: edited
source: '232 - Breaking Down the Four Equations Overview and a Trick for Reading Pape.md'
categories:
- AI
tags: []
---

# 🧮 Bốn phương trình của ViT và mẹo đọc paper

> Nguồn: `232 - Breaking Down the Four Equations Overview and a Trick for Reading Pape.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975316)

Figure 1 đã được tách thành inputs/layers/blocks. Tiếp theo là **bốn phương trình** — mỗi phương trình định nghĩa chính xác thứ xảy ra bên trong một khối màu trong figure. Nếu chưa quen ký hiệu toán, đừng lo: nó cũng là một ngôn ngữ, học được như học lập trình.

### 📖 Đọc Section 3.1 trước, phương trình sau

Mẹo lớn nhất của mình: **Section 3.1** giải thích bằng lời đúng những gì bốn phương trình biểu diễn. Paper viết:

> The standard Transformer receives as input a 1D sequence of token embeddings.

Với ảnh 2D, ta reshape ảnh `x ∈ R^(H×W×C)` — chính là **height × width × color channels**. Rồi chuyển thành "a sequence of flattened 2D patches": `x_p ∈ R^(N × (P²·C))`.

Các ký hiệu:

* `H, W` — resolution ảnh gốc, ví dụ **224 × 224**.
* `C` — số color channels.
* `P` — resolution của mỗi patch (patch vuông nên là `P × P`).
* `N` — **số patch**, tính bằng `H·W / P²`. Đây cũng là **độ dài sequence** đưa vào transformer.

Giống quy ước thường gặp: chữ thường thường là **vector**, chữ hoa thường là **matrix** — dù trong paper này cách đặt tên hơi lẫn lộn, nên cứ hiểu `x` là ảnh input.

### 🧩 Phương trình 1: patch embeddings

Đoạn text nói tiếp: transformer dùng **constant latent vector size `D`** xuyên suốt các layer. Ta flatten các patch rồi map sang `D` chiều bằng một **trainable linear projection**. Theo đúng nghĩa đen: "trainable linear projection" = **learnable embedding**.

Output của projection này gọi là **Patch embeddings** — và đó chính là nội dung **Equation 1**. Sau đó còn cộng thêm **position embedding** và **class token embedding** (sẽ làm sau).

### 🧠 Phương trình 2 và 3: transformer encoder

Transformer encoder (Vaswani et al., 2017 — paper *Attention Is All You Need*) gồm các layer xen kẽ:

* **MSA** — multi-head self-attention (trong transcript đọc thành "MSA/NLP", nhưng đúng là **MLP**).
* **MLP** block.

Đây là nội dung **Equation 2** và **Equation 3**. Thêm một chi tiết quan trọng từ text: **layer norm áp trước mỗi block, residual connection sau mỗi block**.

### 🛠️ Mẹo: đưa text paper vào notebook bằng Mathpix

Cách mình làm khi replicate paper: lấy nguyên đoạn text Section 3.1 vào nơi đang code. Copy thẳng từ PDF thì ra một "blob" ký hiệu lộn xộn, khó đọc.

Công cụ mình thích là **Mathpix** (mathpix.com). Chụp màn hình đoạn công thức, dán vào Mathpix, nó dùng **OCR** để chuyển thành **LaTeX** editable. Colab hỗ trợ LaTeX trong cell **Markdown** nên chỉ cần dán vào là có công thức đẹp.

Ví dụ, chụp đoạn 3.1 sẽ cho ra LaTeX với các lệnh kiểu `\mathrm{}` (math roman), `\mathbf{}` (math bold font). Không cần thuộc LaTeX — cứ để công cụ lo.

Một mẹo phụ: khi chèn ảnh vào notebook, mình dùng thẻ **HTML `<img>`** thay vì Markdown image, để chỉnh được `width` và thêm `alt` — giúp **screen reader** đọc được nội dung ảnh.

---

### ✅ Chốt lại

Bốn phương trình không đến theo thứ tự trong text: đoạn giải thích Eq 1, rồi Eq 2–3, rồi Eq 4. Bài tập: đọc trọn Section 3.1 một lượt, đừng bận tâm nếu chưa hiểu hết ký hiệu. Vài bài tới mình sẽ mổ từng phương trình.
