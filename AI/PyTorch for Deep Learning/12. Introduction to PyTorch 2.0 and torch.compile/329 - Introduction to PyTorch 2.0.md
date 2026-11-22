---
title: 'Bài 329 — PyTorch 2.0 và torch.compile: nhanh hơn nhờ một dòng code'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 329
status: edited
source: '329 - Introduction to PyTorch 2.0.md'
categories:
- AI
tags: []
---

# 🚀 PyTorch 2.0 ra mắt: tốc độ đến từ torch.compile

> Nguồn: `329 - Introduction to PyTorch 2.0.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37847320)

Hôm nay là một ngày đáng ăn mừng: PyTorch 2.0 chính thức ra mắt, và cải tiến chính là **tốc độ**. Điều hay nhất là các bạn có được nó chỉ với **một dòng code tương thích ngược**. Cùng mình xem nó nhanh hơn bao nhiêu và vì sao lại nhanh.

### ⚡ Một dòng code: torch.compile

Sau khi tạo model, các bạn truyền nó vào `torch.compile` và nhận lại một **compiled model** — rồi có thể kỳ vọng tốc độ tăng khi train và inference trên các GPU đời mới.

Nhưng nói suông thì không đủ. Nhanh hơn bao nhiêu, thật sự?

Đội PyTorch đã chạy thử trên **163 mô hình mã nguồn mở** từ Hugging Face Transformers, TIMM (torch image models) và TorchBench — một tập code base phổ biến được tuyển chọn trên khắp GitHub — trộn giữa **AMP** (automatic mixed precision / `float16`) và train `float32`. Kết quả: `torch.compile` cho **tốc độ nhanh hơn trung bình 43% khi train** trên GPU NVIDIA A100.

---

### 🧪 Mình thử trên máy của mình

Mình cũng đem `torch.compile` chạy thử trong benchmark riêng, và thấy vài điều:

* `torch.compile` có vẻ hiệu quả hơn khi các bạn dùng **càng nhiều GPU càng tốt**, ví dụ `batch size` và data size lớn.
* **Epoch đầu chậm hơn**, nhưng các epoch sau nhanh hơn — cả trên RTX 40 local lẫn A100 trên Google Colab.
* Mức tăng tốc của mình không lớn như con số trong release notes, nhưng vẫn quanh **10% mỗi epoch train**.

Mình chưa thử mixed precision hay kiến trúc kiểu transformer, các lần train dài — mà đây chính là chỗ mình nghĩ `torch.compile` sẽ phát huy mạnh nhất.

---

### 🔍 Bên trong có gì: fusion và graph capture

`torch.compile` được thiết kế để "chỉ chạy được thôi", nhưng phía sau là vài công nghệ: **TorchDynamo**, **AOTAutograd**, **PrimTorch** và **TorchInductor**. Release notes của PyTorch 2.0 giải thích kỹ hơn. Ở mức cao, có **hai cải tiến chính**: **fusion** và **graph capture**.

---

### 🍹 Fusion — trộn mọi thứ trong một lần xay

**Operator fusion** là một trong những cách tốt nhất để làm model deep learning chạy nhanh. Nó giống phép fusion trong Dragon Ball Z: gộp nhiều phép toán thành một, hoặc thành ít hơn.

Lý do: GPU hiện đại có quá nhiều sức tính, nên chúng thường **không bị giới hạn bởi compute**. Nút cổ chai chính là tốc độ đưa dữ liệu từ CPU sang GPU — gọi là **bandwidth** (bộ nhớ). Các bạn muốn giảm chi phí bandwidth và nạp càng nhiều dữ liệu càng tốt cho GPU "đói dữ liệu".

Thay vì làm một phép toán trên một mẩu dữ liệu rồi lưu kết quả vào bộ nhớ, tính, lưu, tính, lưu... các bạn nối càng nhiều phép toán càng tốt bằng fusion.

Ví dụ dễ hiểu: dùng máy xay sinh tố. Máy xay giỏi xay nguyên liệu giống như GPU giỏi nhân ma trận. Không có fusion thì giống như cho từng nguyên liệu vào và xay lại mỗi lần thêm một thứ — điên rồ và tốn bandwidth. Bản thân mỗi lần xay thì nhanh, nhưng các bạn mất thời gian vì thêm từng thứ một. Có fusion thì giống như cho tất cả nguyên liệu vào từ đầu rồi xay một lần: mất chút thời gian lúc đầu nhưng lấy lại toàn bộ thời gian đã mất vào bandwidth.

---

### 🗺️ Graph capture — đi đường mà không phải nghĩ

Graph capture (hay graph tracing) là đi qua một chuỗi phép toán cần thực hiện — như các phép trong mạng neural — và **ghi lại trước** những gì sẽ phải làm.

Không có graph capture thì giống như đến một vùng mới và đi theo chỉ dẫn từng khúc: bạn vẫn lái được, nhưng phải nghĩ về từng ngã rẽ. Đó là việc PyTorch phải tra xem mỗi phép làm gì ngay lúc thực hiện — nhanh, nhưng vẫn có overhead khác 0.

Có graph capture thì giống như lái trong khu nhà mình: gần như không phải nghĩ. Nhưng các bạn mất chút thời gian lúc đầu để nhớ đường về nhà. Đây là điều cần lưu ý: graph capture tốn thời gian gom trước, đổi lấy tốc độ những lần sau.

> Muốn đọc thêm về fusion, memory bandwidth và overhead, mình gợi ý bài **"Making Deep Learning Go Brrrr From First Principles"** của Horace He.

---

### 📦 Những cập nhật khác của PyTorch 2.0

Ngoài `torch.compile`, có nhiều thứ đáng chú ý:

* **Faster Transformers** giờ đã ở trạng thái stable — model dùng kiến trúc transformer hoặc scaled dot-product attention sẽ nhanh hơn.
* **Universal device setup** giờ đã làm được nhờ một context manager hoặc global setting.
* Một loạt **Metal Performance Shaders (MPS)** được cập nhật, cải thiện độ phủ của PyTorch trên Mac.
* Nhiều domain library nâng cấp cùng PyTorch 2.0: **torchvision**, **torchtext**, **torchrec**, **torchaudio**...

Mình để hết link trong phần mô tả và bài blog kèm video. Còn giờ, hãy nhớ: tăng tốc này chủ yếu dành cho GPU đời mới — và mình sẽ chứng minh bằng thực nghiệm ngay phần sau.
