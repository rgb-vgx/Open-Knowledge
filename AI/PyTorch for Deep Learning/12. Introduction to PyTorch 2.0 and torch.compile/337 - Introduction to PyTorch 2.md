---
title: 'Bài 337 — Giải thích đầy đủ: vì sao torch.compile nhanh hơn'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 337
status: edited
source: '337 - Introduction to PyTorch 2.md'
categories:
- AI
tags: []
---

# 🧠 Bên dưới torch.compile: fusion, graph capture và 43%

> Nguồn: `337 - Introduction to PyTorch 2.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37835406)

Hôm nay là ngày PyTorch 2.0 chính thức ra mắt, cải tiến chính là **tốc độ**, và các bạn có nó qua **một dòng tương thích ngược**: `torch.compile`. Bài này mình đào sâu hơn bài giới thiệu: con số benchmark đến từ đâu, và cỗ máy bên dưới vận hành ra sao.

### 📈 Con số 43% đến từ đâu?

Đội PyTorch chạy thử trên **163 mô hình mã nguồn mở** từ **Hugging Face Transformers**, **TIMM** (torch image models) và **TorchBench** — tập code base phổ biến tuyển chọn trên GitHub — trộn giữa **AMP** (`float16`) và `float32`. Kết quả: `torch.compile` tăng tốc **trung bình 43% khi train** trên **A100**.

Nghe rất ấn tượng. Còn thực tế thì sao?

---

### 🔬 Mình tự đo lại

Khi thử `torch.compile` trong benchmark riêng, mình rút ra vài nhận xét:

* Hiệu quả rõ hơn khi **tận dụng tối đa GPU** — batch size và data size lớn.
* **Epoch đầu chậm hơn**, các epoch sau nhanh hơn, trên cả **RTX 40 local** lẫn **A100 trên Colab**.
* Mức tăng của mình **không lớn bằng** release notes — nhưng vẫn quanh **10% mỗi epoch**.
* Mình **chưa** khám phá mixed precision, kiến trúc transformer, hay các lần train dài — mà đó chính là nơi `torch.compile` có lẽ hiệu quả nhất.

---

### ⚙️ Bốn công nghệ phía sau

`torch.compile` được thiết kế "chỉ chạy được", nhưng phía sau là **TorchDynamo**, **AOTAutograd**, **PrimTorch** và **TorchInductor**. Release notes giải thích chi tiết. Ở mức cao, có **hai cải tiến chính**: **fusion** và **graph capture**.

---

### 🍹 Fusion: xay một lần thay vì từng nguyên liệu

**Operator fusion** giống phép fusion trong Dragon Ball Z: gộp nhiều phép toán thành một hoặc ít hơn.

GPU hiện đại **không thiếu compute** — nút cổ chai là tốc độ đưa dữ liệu từ CPU sang GPU, gọi là **memory bandwidth**. Thay vì tính, lưu bộ nhớ, tính, lưu bộ nhớ..., ta nối càng nhiều phép toán càng tốt để giảm chi phí bandwidth.

Hình dung máy xay sinh tố. Không fusion: cho từng nguyên liệu vào, xay lại sau mỗi lần thêm — điên rồ và tốn bandwidth, dù mỗi lần xay đều nhanh. Có fusion: cho tất cả vào từ đầu rồi xay một lần — mất chút thời gian chuẩn bị nhưng lấy lại toàn bộ thời gian bandwidth.

---

### 🗺️ Graph capture: đi đường quen

Graph capture (graph tracing) là đi qua chuỗi phép toán cần thực hiện — như các phép trong mạng neural — và **ghi lại trước** những gì sẽ phải làm.

Không graph capture giống như đến vùng lạ, đi theo chỉ dẫn từng ngã rẽ: vẫn lái được nhưng phải nghĩ từng khúc. Đó là việc PyTorch tra cứu mỗi phép ngay lúc chạy — nhanh nhưng vẫn có overhead khác 0.

Có graph capture giống như lái trong khu nhà mình: gần như không phải nghĩ, nhưng mất thời gian lúc đầu để nhớ đường. Đây là caveat: tốn thời gian ghi nhớ phép toán trước, đổi lấy tốc độ các lần sau.

> Đọc thêm về fusion, memory bandwidth và overhead: **"Making Deep Learning Go Brrrr From First Principles"** của Horace He.

---

### 📦 Những cập nhật khác của PyTorch 2.0

* **Faster Transformers** đã ở trạng thái stable — model transformer và scaled dot-product attention nhanh hơn.
* **Universal device setup** nhờ context manager hoặc global setting.
* Nhiều **Metal Performance Shaders** được cập nhật, cải thiện độ phủ trên Mac.
* Nâng cấp domain library: **torchvision**, **torchtext**, **torchrec**, **torchaudio**...

Đó là rất nhiều thứ, và mình để hết link trong mô tả cùng bài blog kèm video. Tiếp theo, ta sẽ đo đạc bằng thực nghiệm của chính mình.
