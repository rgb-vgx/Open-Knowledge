---
title: 'Equation 2 (tiếp): LayerNorm và cầu thang đều bước'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 250
status: edited
source: '250 - Equation 2- Layernorm Overview.md'
categories:
- AI
tags: []
---

# 📏 Equation 2 (tiếp): LayerNorm và cầu thang đều bước

> Nguồn: `250 - Equation 2- Layernorm Overview.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34006518)

Bài trước ta đã nắm ý tưởng lớn của multi-head self attention: trong một chuỗi, phần tử nào nên chú ý tới chính nó nhiều nhất. Với ảnh, đó là câu hỏi "patch nào liên quan mật thiết tới patch nào". Ta đưa cơ chế này vào mạng nơ-ron vì ta muốn **mối quan hệ đó được học** — và nếu học được quan hệ giữa các patch, mô hình gián tiếp học được **biểu diễn tốt của nội dung ảnh**.

### 🧱 Nhắc lại Q, K, V

Trong Figure 1, chỗ LayerNorm có **ba mũi tên** vì đầu ra của nó được dùng làm **query, key, value**. Ta lấy embedding của patch (gọi là `x`), đưa qua norm layer, rồi `Q`, `K`, `V` đều bằng `x`, `x`, `x`. Đó chính là "self" attention: ba thành phần cùng một nguồn.

Layer `nn.MultiheadAttention` của PyTorch nhận đúng ba input `query, key, value` — khớp với ba mũi tên này.

---

### 📖 LayerNorm là gì?

Theo tài liệu: layer normalization là kỹ thuật **chuẩn hóa phân bố của các layer trung gian**, giúp gradient mượt hơn, train nhanh hơn và tổng quát hóa tốt hơn.

Cách hiểu đơn giản: chuẩn hóa nghĩa là làm cho mọi thứ có **cùng mean và cùng standard deviation**.

`nn.LayerNorm` của PyTorch áp dụng chuẩn hóa trên **mini-batch input**, với mean và standard deviation được tính trên **D chiều cuối cùng**, trong đó D là **dimension của normalized shape**. Trong trường hợp của ta, D chính là **embedding dimension** — `768`.

Nghĩa là ta chuẩn hóa dọc theo chiều embedding:

* Ảnh đầu vào có **3 kênh màu** (C).
* Conv layer project lên **out channels**.
* Patch embedding đi tới **768 chiều**.
* LayerNorm chuẩn hóa trên đúng chiều **768** đó.

---

### 🪜 Phép so sánh cầu thang

Đây là cách mình hay hình dung normalization. Hãy tưởng tượng bạn bước xuống một cầu thang — gradient descent cũng giống vậy: cố đi xuống đáy của **loss curve**.

Nhưng nếu mỗi bậc thang có **chiều cao, chiều rộng, hình dạng khác nhau**, mỗi bậc là một mẫu dữ liệu với tham số lệch lạc — bạn sẽ bước rất chậm và phải dò dẫm từng bước.

Còn nếu **chuẩn hóa** để mọi bậc có cùng chiều cao và chiều rộng — tức cùng mean và standard deviation trên chiều embedding — bạn bước xuống nhanh, gần như không cần nghĩ.

Ánh xạ lại:

* Bước xuống cầu thang nhanh = **train nhanh hơn** nhờ gradient ổn định.
* Không phải chỉnh từng bậc = **generalize tốt hơn**, vì mô hình không phải thích nghi riêng cho từng mẫu.

---

### ✅ Chốt lại

Ta vừa gom đủ hai mảnh của Equation 2: **layer norm** và **multi-head self attention**. Chưa viết code, nhưng các mảnh ghép đang khớp vào nhau rất đẹp: D chính là embedding dimension, và LayerNorm chuẩn hóa đúng trên chiều đó.

Thử thách bài sau: tự viết class **`MultiHeadSelfAttentionBlock`** kế thừa `nn.Module`, khởi tạo một `nn.MultiheadAttention` và một `nn.LayerNorm`, rồi trong `forward` lần lượt cho `x` qua norm layer và attention layer. Cứ thử đi, bài sau ta làm cùng nhau.
