---
title: 'Bài 336 — Thiết kế bốn thực nghiệm đo tốc độ torch.compile'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 336
status: edited
source: '336 - Discussing the Experiments We Are Going to Run for PyTorch 2.md'
categories:
- AI
tags: []
---

# 🧪 Bốn thực nghiệm: torch.compile nhanh hơn bao nhiêu?

> Nguồn: `336 - Discussing the Experiments We Are Going to Run for PyTorch 2.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745224)

Video trước ta đã chơi với set device toàn cục và context manager. Giờ quay lại nhân vật chính — `torch.compile`. Mình sẽ dựng **bốn thực nghiệm** để đo tốc độ. Nguyên tắc: không quan tâm accuracy hay performance của model, chỉ quan tâm **speed** — vì đó chính là thứ `torch.compile` hứa hẹn.

### 🖥️ Nhắc lại về GPU

Ta tập trung vào **GPU NVIDIA** vì đó là loại mình có nhiều quyền truy cập nhất (minh họa bằng A100). PyTorch 2.0 vẫn chạy trên mọi GPU chạy được bản trước đó; chỉ là **mức tăng tốc** rõ nhất khi GPU có **compute capability cao**. Muốn tra điểm của GPU mình, xem trang NVIDIA Developer.

---

### 🧩 Bốn thực nghiệm, cùng một setup

Cả bốn dùng **cùng model và dataset**:

* Model: **ResNet50** từ **torchvision**.
* Dataset: **CIFAR10**, cũng từ torchvision.
* Vì sao CIFAR10 chứ không phải thứ gì "xịn" hơn? Vì nếu PyTorch 2.0 không chạy tốt trên thực nghiệm đơn giản, thì sao chạy tốt trên thứ phức tạp.

| # | Mô tả |
|---|---|
| 1 | Một lần chạy ResNet50 — **không** `torch.compile` |
| 2 | Một lần chạy ResNet50 — **có** `torch.compile` |
| 3 | Chạy nhiều lần (3 lần × 5 epoch) — **không** compile |
| 4 | Chạy nhiều lần (3 lần × 5 epoch) — **có** compile |

Thực nghiệm 3 và 4 thực chất là 1 và 2 nhân ba, để lấy **trung bình** — tránh kết quả may rủi ("fluke").

---

### ⚙️ Các tham số giữ nguyên

* **Batch size: 128**
* **Image size: 224**
* **Epoch: 5** cho mỗi lần chạy (multi-run thì lặp 3 lần)

Mình dùng batch size khá lớn vì như đã bàn ở video intro: **tăng tốc của PyTorch 2.0 đến từ việc dùng càng nhiều GPU càng tốt**. Image size 224 cũng nhằm tăng tải cho GPU — mặc định của CIFAR10 chỉ **32×32** (có thể là 64×64, nhưng đều nhỏ hơn 224 rất nhiều).

> Đây là cấu hình cố ý nhắm tới A100 — đúng con GPU mà đội PyTorch dùng để benchmark. Nếu GPU của các bạn **ít bộ nhớ hơn**, hãy **giảm batch size và image size**. Ta sẽ làm việc này programmatically ở video sau.

---

### 💾 Kiểm tra bộ nhớ GPU bằng nvidia-smi

Cách nhanh để biết mình còn bao nhiêu VRAM: chạy `nvidia-smi`. A100 cho ra **40GB**, tức **40.960MB** — một trong những GPU lớn nhất có thể mua.

---

### 🔜 Bước tiếp: dựng model và transforms

Mình dán đoạn boilerplate import các dependency cần thiết (boilerplate chỉ là code mẫu hay dùng, không có gì mới). Tiếp theo là tạo **ResNet50** bằng **Weights API** mới của **torchvision 0.14 trở lên** — các bạn có thể thử tự viết trước, nhưng mình sẽ làm ở video sau.

> Gợi ý mở rộng: ResNet50 là **CNN**; các bạn có thể thử với **transformer** để xem mức tăng tốc tương đối có cao hơn không — PyTorch 2.0 có cải tiến riêng cho transformer.
