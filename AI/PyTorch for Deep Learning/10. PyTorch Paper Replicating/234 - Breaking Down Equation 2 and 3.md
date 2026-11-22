---
title: 'Mổ xẻ Equation 2 và 3: MSA block và MLP block'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 234
status: edited
source: '234 - Breaking Down Equation 2 and 3.md'
categories:
- AI
tags: []
---

# 🧮 Mổ xẻ Equation 2 và 3: MSA block và MLP block

> Nguồn: `234 - Breaking Down Equation 2 and 3.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975320)

Equation 2 và 3 khá giống nhau nên mình gộp một bài. Cả hai đều nằm trong **transformer encoder** — khối xám trong Figure 1.

### 🧱 Transformer encoder gồm gì

Transformer encoder là các layer xen kẽ:

* **MSA** — multi-head self-attention (khối nhỏ trong figure).
* **MLP** — multi-layer perceptron block.

Giữa mỗi MSA và MLP là một **layer norm**, áp **trước** mỗi block. Trong PyTorch có sẵn `nn.LayerNorm` và `nn.MultiheadAttention` — đây là gợi ý cho code sau này. Ngoài ra, mỗi block còn có **residual connection** (còn gọi là **skip connection**), chính là các dấu `+` trong figure.

---

### ➕ Residual connection là gì?

Với MSA block: input `z` vừa đi qua Norm + MSA, vừa có một nhánh tắt (skip) cộng thẳng vào output. Viết theo ký hiệu paper:

```text
output = MSA(LN(input)) + input
```

Ý tưởng: khi xếp nhiều layer, các con số có thể teo nhỏ dần và mất ổn định số học. Cộng input vào output giúp giữ lại tín hiệu gốc, tránh **gradient/loss** bùng nổ hoặc biến mất. Định nghĩa chính thống nói residual connection giúp layer học **residual function** so với input thay vì học hàm từ đầu — nếu identity mapping là tối ưu thì đẩy residual về 0 dễ hơn là fit nguyên một identity qua chồng layer phi tuyến.

---

### 📐 Equation 2: MSA block

Equation 2 = một Norm + multi-head self-attention + residual, gói lại thành:

```text
z'_ℓ = MSA(LN(z_{ℓ-1})) + z_{ℓ-1}
```

---

### 📐 Equation 3: MLP block

Equation 3 nhận output của MSA block làm input, cấu trúc y hệt nhưng thay MSA bằng MLP:

```text
z_ℓ = MLP(LN(z'_ℓ)) + z'_ℓ
```

Ghép hai phương trình vào pseudocode:

```text
# Equation 2
x_output = MSA(LN(x_input)) + x_input

# Equation 3
x_output = MLP(LN(x_output)) + x_output
```

---

### 📚 Muốn đào sâu

Appendix A của paper định nghĩa MSA: với mỗi phần tử trong sequence `z ∈ R^(N×D)`, tính **weighted sum** trên các **value `V`**, với **attention weight** dựa trên độ tương đồng cặp đôi giữa **query `Q`** và **key `K`** của từng phần tử. Muốn hiểu kỹ hơn, đọc thêm *The Illustrated Transformer* (Jay Alammar) và các bài giải thích multi-head attention — link nằm trong tài nguyên của section.

---

### ✅ Chốt lại

Equation 2 là MSA block, Equation 3 là MLP block; cả hai đều có dạng `Block(LN(x)) + x`. Còn Equation 4 — thử tự đoán xem nó mô tả khối nào. Bài sau giải cùng nhau.
