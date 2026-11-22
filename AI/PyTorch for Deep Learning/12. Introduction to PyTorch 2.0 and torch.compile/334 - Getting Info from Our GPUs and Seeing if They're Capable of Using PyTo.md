---
title: 'Bài 334 — Đọc thông tin GPU và kiểm tra khả năng chạy PyTorch 2.0'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 334
status: edited
source: "334 - Getting Info from Our GPUs and Seeing if They're Capable of Using PyTo.md"
categories:
- AI
tags: []
---

# 🖥️ GPU của bạn có đủ mới cho PyTorch 2.0?

> Nguồn: `334 - Getting Info from Our GPUs and Seeing if They're Capable of Using PyTo.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745220)

Đã setup xong, giờ mình cùng xem thông tin GPU. Vì `torch.compile` — tính năng chính của PyTorch 2.0, tối ưu model qua fusion và graph capture — **chạy tốt nhất trên GPU NVIDIA đời mới**. Vậy "đời mới" nghĩa là gì? Đây cũng là lý do lúc đầu mình đổi runtime type sang **class premium** trên Colab Pro, để tận dụng tối đa PyTorch 2.0.

### 🔎 Tra cứu compute capability

Cách kiểm tra: tìm **"NVIDIA GPU compatibility score"** (danh sách CUDA GPU của NVIDIA). Ở đó có bảng cho biết **compute capability** của từng GPU.

Một vài con số để so sánh:

* **A100** (GPU mình đang dùng trên Colab): **8.0**
* **H100** đời mới: **9.0**
* **L4**: **8.9**
* **T4** (hay gặp trên Colab): **7.5**
* **V100**: **7.0**
* **Titan RTX** (máy cá nhân của mình): **7.5**
* **RTX 4090** (consumer grade): thuộc nhóm GeForce, điểm rất cao

Quy luật: **compute capability càng cao thì GPU càng mới và càng mạnh**.

### 🚦 Ngưỡng 8.0

* GPU có điểm **8.0 trở lên**: tận dụng được **hầu hết, nếu không nói là toàn bộ** tính năng mới của PyTorch 2.0.
* GPU **dưới 8.0**: vẫn dùng được PyTorch 2.0 (nhờ tương thích ngược), nhưng **mức cải thiện có thể không rõ rệt** bằng.

### 🏢 Desktop class và data center class

Có hai kiểu GPU:

* **Desktop class** — loại gắn trong máy desktop của các bạn (ví dụ RTX 3090).
* **Data center class** — loại nối vào trong data center, như Google Cloud, AWS hay Lambda Cloud, tức một kho máy khổng lồ ở đâu đó.

Đội PyTorch có ghi rõ: trên GPU desktop class như **NVIDIA 3090**, mức tăng tốc **thấp hơn** so với GPU server class như **A100**. Lý do: dù cùng kiến trúc **Ampere**, A100 là data center class nên có **khả năng phần cứng khác** so với RTX 3090.

### 🐍 Code kiểm tra bằng PyTorch

Mình dùng hàm có sẵn của PyTorch là **`torch.cuda.get_device_capability`** (có trong tài liệu chính thức) để lấy thông tin. Đoạn code sẽ:

1. Lấy thông tin qua **`nvidia-smi`** và lưu vào một string.
2. Lấy **tên GPU**.
3. Lấy **điểm** qua `torch.cuda.get_device_capability` — hàm này trả về một **tuple** gồm phần **major** và **minor**.

Nếu điểm **≥ 8.0**, thông báo sẽ là các tính năng tăng tốc của PyTorch 2.x **khả dụng**. Nếu dưới 8.0, các bạn vẫn chạy được PyTorch 2.0, chỉ là mức tăng tốc có thể không ấn tượng bằng.

> Lưu ý thêm: GPU data center class có thể cho mức tăng tốc rõ rệt hơn desktop class, do thiết kế phần cứng phía sau.

---

Ta đã có thông tin hữu ích. Video sau, mình sẽ khám phá một trong những tính năng mới yêu thích nhất của PyTorch 2.0 — không phải `torch.compile`.
