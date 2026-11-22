---
title: 'Transformer encoder: xếp chồng MSA, MLP và residual connection'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 255
status: edited
source: '255 - Transformer Encoder Overview.md'
categories:
- AI
tags: []
---

# 🏛️ Transformer encoder: xếp chồng MSA, MLP và residual connection

> Nguồn: `255 - Transformer Encoder Overview.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34033726)

Ta đã biến Equation 1, 2, 3 thành code PyTorch tái sử dụng. Giờ là lúc ghép **Equation 2 và 3** lại thành **transformer encoder** — trái tim của Vision Transformer. Nhưng còn một mảnh ghép cả hai block đều đang thiếu: **residual connection**.

### 🧩 Encoder là gì?

Tra cứu "what is an encoder in machine learning" sẽ thấy nhiều tài liệu về **encoder-decoder**, **autoencoder**, **machine translation**. Ta có thể tự suy ra ý nghĩa:

* **Encoder**: biến một chuỗi thành **learnable representation**.
* **Decoder**: từ biểu diễn đã học, tái tạo lại một chuỗi.

Ví dụ Google Translate: câu tiếng Anh được encoder chuyển thành số, decoder dựng các số đó thành câu tiếng Nhật. Đó là mô hình **sequence-to-sequence (seq2seq)**, phổ biến trong NLP. Cái tên **transformer encoder** xuất phát từ đây, vì paper "Attention Is All You Need" vốn ra đời cho bài toán **text**.

---

### 🖼️ Nhưng ta đang làm ảnh

Đầu vào của ta là một **chuỗi patch ảnh**. Transformer encoder biến chuỗi đó thành biểu diễn dễ học hơn qua nhiều lớp. Khác với dịch máy, ta **không có decoder** trong kiến trúc ViT, vì mục tiêu là **phân loại ảnh** — output là **một tên lớp**, chứ không phải một chuỗi.

---

### 🔁 Residual connection

Định nghĩa gọn: residual connection **cộng input của một layer vào output ngay sau nó**. Lợi ích:

* Cho phép xây **mạng sâu hơn**.
* Ngăn **weight update bị co nhỏ dần** (vanishing gradient).

Trong cả MSA block và MLP block ta đều chưa code phần này. Ta có thể thêm vào `forward` của từng block, hoặc thêm khi ghép encoder — mình chọn cách thứ hai để hai block giữ nguyên khả năng tái sử dụng.

---

### 📝 Giả mã transformer encoder

```text
input = x
msa_out = MSA_block(input)          # Equation 2
msa_out = msa_out + input           # residual
mlp_out = MLP_block(msa_out)        # Equation 3
mlp_out = mlp_out + msa_out         # residual
return mlp_out
```

Thực ra đây là một chuỗi phép cộng liên tiếp, nên kết quả cuối vẫn là một tensor duy nhất. LayerNorm đã nằm sẵn **bên trong** mỗi block (nhớ lại: norm đứng trước mỗi block), nên encoder block chỉ cần ghép chúng lại và chèn residual.

---

### ✅ Nhìn lại bức tranh

Theo mục 3.1 của paper: transformer encoder gồm các layer **MSA và MLP xen kẽ**, layer norm **trước mỗi block**, residual **sau mỗi block**. Ta đã có:
* `MultiHeadSelfAttentionBlock` (Equation 2).
* `MLPBlock` (Equation 3).

Giờ chỉ còn thiếu lớp keo dính chúng lại.

---

### 🎯 Thử thách

Tự viết class **`TransformerEncoderBlock`** (hoặc đặt tên `block` tùy bạn) kế thừa `nn.Module`, trong `forward`:

1. Cho `x` qua MSA block.
2. Cộng `x` vào output (residual).
3. Cho kết quả qua MLP block.
4. Cộng tiếp input của bước 2 vào output (residual).

Thử đi! Bài sau ta viết transformer encoder hoàn chỉnh cùng nhau.
