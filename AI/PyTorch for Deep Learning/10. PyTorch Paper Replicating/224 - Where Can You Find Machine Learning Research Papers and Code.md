---
title: 'Tìm machine learning research paper và code ở đâu?'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 224
status: edited
source: '224 - Where Can You Find Machine Learning Research Papers and Code.md'
categories:
- AI
tags: []
---

# 🔎 Tìm machine learning research paper và code ở đâu?

> Nguồn: `224 - Where Can You Find Machine Learning Research Papers and Code.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33975296)

Bài trước mình đã nói vì sao nên replicate paper. Giờ đến câu hỏi thực dụng: tìm paper ở đâu? Một lưu ý trước đã — **có quá nhiều thứ để đọc**. Machine learning đang bùng nổ, và mình nói thẳng: có khi mình không hiểu nổi 90% những gì đang diễn ra trên các feed đó. Cách mình làm là lọc xuống đúng thứ liên quan tới bài toán của mình.

### 🗂️ arXiv — kho paper gốc

Nơi tập trung nhiều nhất là **arXiv** (trong transcript tự động gọi thành "archive", nhưng đó là arxiv.org). Vào mục **Computer Science**, gõ `machine learning` là ra một rừng paper mới công bố mỗi ngày. Ví dụ ngay trên trang chủ có *An Image is Worth 16x16 Words* — chính là paper ViT mình đang replicate. Đây cũng là nơi lưu các bản PDF khoa học gốc.

Mẹo của mình: đừng cố đọc hết. Lọc theo chủ đề — ví dụ **computer vision** khi đang làm Food Vision Mini — rồi chỉ bới trong đó.

---

### 🐦 Feed đã lọc trên Twitter

Có một tài khoản Twitter tên **AK** (có thể đọc là "Akil") chuyên đăng lại các paper mới, kiểu một **filtered feed** của arXiv. Lướt qua sẽ thấy đủ thứ: demo, thông tin, paper của DeepMind, neural radiance fields, vector quantized image-to-image translation... Phần lớn mình không hiểu hết, nhưng luôn nhặt ra được thứ liên quan tới việc đang làm.

---

### 💻 Repo tái lập trên GitHub

**lucidrains/vit-pytorch** là nguồn cảm hứng lớn cho code trong module này. Đây không phải nơi tìm paper, mà là nơi xem người ta dịch paper thành code trông thế nào — một **ViT** đơn giản, dùng được. Tài khoản **lucidrains** có cả một bộ sưu tập: AlphaFold bằng PyTorch, DALL·E 2 bằng PyTorch... Toàn bộ đều mã nguồn mở, để người khác học theo. Đáng để bookmark.

---

### 🏆 Papers with Code — nguồn tổng hợp nhất

**paperswithcode.com** có lẽ là nguồn đầy đủ nhất: paper mới nhất kèm code. Có cả TensorFlow, Hugging Face Transformers, PyTorch. Trang **Browse State of the Art** cho phép đi vào **Computer Vision → Image Classification** và xem model nào đang dẫn đầu. Ở đó các bạn sẽ thấy các dòng kiểu `ViT-H/14` — đúng là vision transformer mình đang làm, và bấm vào là ra paper gốc *An Image is Worth 16x16 Words*.

---

### 📌 Tóm lại bốn nguồn

* **arXiv** — hub của mọi paper kỹ thuật, nơi có bản PDF gốc.
* **Twitter (AK)** — feed paper đã lọc.
* **GitHub (lucidrains)** — các bản tái lập paper bằng code, chủ yếu PyTorch.
* **Papers with Code** — paper + code + bảng xếp hạng state of the art.

---

### ✅ Chốt lại

Bốn nguồn trên là đủ để bắt đầu. Bài sau mình sẽ chốt cụ thể những gì sẽ làm trong section này, rồi vào code luôn.
