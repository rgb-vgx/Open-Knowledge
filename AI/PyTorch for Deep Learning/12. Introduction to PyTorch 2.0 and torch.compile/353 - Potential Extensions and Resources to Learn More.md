---
title: 'Bài 353 — Hướng mở rộng và tài nguyên học PyTorch 2.0'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 353
status: edited
source: '353 - Potential Extensions and Resources to Learn More.md'
categories:
- AI
tags: []
---

# 🧭 Đi xa hơn: AMP, transformer, train dài và tài nguyên

> Nguồn: `353 - Potential Extensions and Resources to Learn More.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37846692)

Ta đã đi qua một loạt cải tiến PyTorch 2.0 và làm bốn thực nghiệm có/không `torch.compile`. Video cuối chương này, mình gom lại các hướng mở rộng đáng thử và tài nguyên để học sâu hơn. (Video trước mình ghi rồi lưu bị lỗi, nên lần này đọc từ ghi chú sẵn — các bạn thông cảm.)

### 1️⃣ Dùng càng nhiều GPU càng tốt

Một trong những cách tốt nhất để cải thiện deep learning là **tận dụng tối đa GPU** — nạp càng nhiều dữ liệu càng tốt qua **batch size lớn hơn** hoặc **CPU mạnh hơn**.

Colab từng mặc định **2 CPU**; lên Colab Pro hoặc tier cao hơn có thể được nhiều hơn (như ta thấy, 12 CPU). Điều này phụ thuộc máy và loại CPU, nhưng nguyên tắc giữ nguyên: đưa càng nhiều data lên GPU càng tốt thì tốc độ train tương đối càng tăng.

### 2️⃣ Automatic Mixed Precision (AMP)

Đây là kỹ thuật ta mới nhắc mà chưa làm. **AMP** trộn `float32` và `float16` trong training:

* Dữ liệu thường biểu diễn bằng `float32`.
* Nhưng **tính toán** bằng `float16` — ít số hơn khi biểu diễn, nên xử lý nhanh hơn.

Tài liệu PyTorch có hướng dẫn **"Use mixed precision training"**. Cơ chế chính là **`torch.cuda.amp.GradScaler`** giúp **gradient scaling** — cải thiện hội tụ cho mạng có gradient `float16`.

> Theo kinh nghiệm của mình, **AMP có lẽ là mức tăng tốc lớn nhất** mà các bạn sẽ thấy.

### 3️⃣ Transformer có thể hưởng lợi nhiều hơn CNN

CNN đã có từ lâu, phần cứng NVIDIA GPU được tối ưu cho phép tích chập. Nhưng PyTorch 2.0 có **"Accelerated PyTorch 2 Transformers"**.

Cơ chế **attention** (đã học ở phần Paper Replicating, nền tảng của Vision Transformer) được tăng tốc qua **scaled dot-product attention** — hàm chính của attention, tính trên **query, key, value** và nhận **attention mask** tùy chọn:

```python
torch.nn.functional.scaled_dot_product_attention(query, key, value, attn_mask=None)
```

PyTorch 2.0 **tự chọn kernel nhanh nhất** sau hậu trường — **flash attention**, **memory-efficient attention**, hoặc **implementation C++ của PyTorch** — khớp với công thức trên. "Kernel" ở đây hiểu đơn giản là **phép toán / cách hiện thực phép toán**.

Nếu model của các bạn dùng transformer và tận dụng scaled dot-product attention, sẽ thấy tăng tốc tương đối.

### 4️⃣ Train lâu hơn

Trong thực nghiệm, ta chỉ train **5 epoch** — đã thấy cải thiện với 3×5 epoch. Tưởng tượng train **600 epoch** như series state-of-the-art computer vision của PyTorch: tăng tốc tương đối sẽ **lớn hơn nhiều** so với lần chạy ngắn.

### 📚 Tài nguyên mình thích nhất

* **Launch blog post** của PyTorch 2.0.
* **Release notes** chính thức.
* Tài liệu về **default device context manager**.
* Video giới thiệu PyTorch 2.0 của mình trên YouTube (các bạn đã xem ở đầu series).
* Bài của **Sebastian Raschka** về tăng tốc model từ **8.4 xuống 5.6 phút** với `torch.compile`.

Tất cả có trong **ebook PyTorch 2.0 tutorial**, mục **Section 5: Possible improvements and extensions**.

### 🤝 Góp ý và hỏi đáp

Có câu hỏi thì lên **repo PyTorch for Deep Learning** mở Discussion. Thấy lỗi (chắc chắn có vài typo đâu đó) hay muốn cải thiện thì gửi **pull request**. Mình, người khác, hoặc "a chic" sẽ hỗ trợ.

---

Vậy là hết chương PyTorch 2.0. Chúc các bạn **happy deep learning** — và vui vẻ với PyTorch 2.0. Hẹn gặp lần sau!
