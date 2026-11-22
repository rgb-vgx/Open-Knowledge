---
title: 'Equation 2 và multi-head self attention (MSA)'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 249
status: edited
source: '249 - Equation 2- Multihead Attention Overview.md'
categories:
- AI
tags: []
---

# 🧠 Equation 2 và multi-head self attention (MSA)

> Nguồn: `249 - Equation 2- Multihead Attention Overview.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34003994)

Ta đang chạy rất đà, đừng dừng lại nhé! Equation 1 đã xong, ta đã biến ảnh thành chuỗi patch embeddings phẳng. Giờ nhìn lại **Figure 1**: xong phần "patchify + linear projection", ta bước vào **transformer encoder**. Encoder gồm bốn layer nhưng chia thành **hai block chính**: block định nghĩa bởi **Equation 2** và block định nghĩa bởi **Equation 3**.

### 🔍 Equation 2 nói gì?

Equation 2 là **MSA block** (Multi-Head Self Attention). Nhìn công thức có vẻ rối, nhưng gồm đúng ba thành phần:

* **Multi-Head Self Attention (MSA)** bọc quanh input của layer trước.
* **LayerNorm** áp dụng **trước** mỗi block (nên nằm bên trong ngoặc).
* **Residual / skip connection**: cộng input vào output của block.

Transformer encoder chính là sự xen kẽ giữa các block MSA (Equation 2) và block MLP (Equation 3), với layer norm đứng trước và residual cộng sau mỗi block.

### 📚 Attention đến từ đâu?

MSA được giới thiệu lần đầu trong paper **"Attention Is All You Need"** (Vaswani và cộng sự, 2017, Google Brain). Nếu muốn hiểu sâu, tra cứu "what is multi-head self attention" sẽ ra rất nhiều tài liệu.

Điều thú vị: paper ViT không tự nghĩ ra attention — nó dựa trên một chùm nghiên cứu của khoảng **30-40 paper khác**. Vì vậy paper replicating là một thử thách thật sự: bạn không chỉ đọc một paper, mà cả hệ sinh thái phía sau nó.

### ⚙️ Attention nhìn từ góc độ code

Định nghĩa trong paper: attention là ánh xạ từ một **query** và tập **key-value** sang output, trong đó output là **weighted sum của các value**, còn trọng số tính bằng một "compatibility function" giữa query và key tương ứng.

Nghe rất hàn lâm, nhưng bên dưới compatibility function chỉ là **phép nhân ma trận**. Quy trình **scaled dot-product attention**:

1. Nhân `Q` với `K` chuyển vị: `Q @ K.T`.
2. Chia cho căn bậc hai của `d_k` (embedding dimension) để scale.
3. Áp `softmax` — ta đã gặp hàm này trong `torch.softmax`.
4. Nhân kết quả với `V`.

Đó là **scaled dot-product attention**. Với **multi-head attention**, ta làm y hệt nhưng lặp trên **nhiều head** (thêm một chiều "depth"), rồi ghép kết quả lại.

### 🖼️ Từ text sang ảnh

Attention sinh ra cho **text**. Ví dụ câu "The animal didn't cross the street because it was too tired" — self attention cho biết từ "it" nên gắn với "the animal" mạnh nhất. Ý tưởng cốt lõi: **trong cùng một chuỗi, phần tử nào nên chú ý tới phần tử nào?**

Với ảnh, ta coi chuỗi patch embeddings như một chuỗi "từ". Ta không định nghĩa bằng tay patch nào liên quan patch nào — ta muốn **attention tự học** mối quan hệ đó trong quá trình train.

### 🧩 "Self" trong self attention nghĩa là gì?

Đây là chỗ mình từng vướng. Trong **self attention**, **query, key và value đều là các instance của cùng một vector** — tức là cùng xuất phát từ chính chuỗi input. Vì thế nó mới gọi là "self": chuỗi tự hỏi "tôi nên chú ý tới chính tôi thế nào".

Với ta, chuỗi đó là các patch ảnh: mỗi patch tự hỏi nên chú ý nhất tới patch nào khác trong cùng ảnh.

### ✅ PyTorch đã có sẵn

Tin vui: PyTorch có sẵn layer `nn.MultiheadAttention` cho đúng việc này, nhận vào `query, key, value`. Những layer dùng phổ biến thường được PyTorch hiện thực sẵn, nên không cần chép tay từng equation.

Bài sau ta bắt đầu viết code. Thử thách trước khi xem: tự tra **"what is layer norm"** và **`nn.LayerNorm`** trong PyTorch — y như ta vừa làm với MSA. Khi thấy code, mọi thứ sẽ sáng tỏ hơn nhiều.
