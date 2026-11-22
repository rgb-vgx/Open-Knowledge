---
title: 'Bài 348 — Lưu kết quả thực nghiệm ra CSV kèm thông tin GPU'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 348
status: edited
source: '348 - Saving the Results of Experiment 1 and 2.md'
categories:
- AI
tags: []
---

# 💾 Lưu kết quả: đừng để mất công đo đạc

> Nguồn: `348 - Saving the Results of Experiment 1 and 2.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745248)

Video trước ta so sánh Experiment 1 và 2 (single run, 5 epoch, A100, CIFAR10, ResNet50, image 224, batch 128). Kết luận: train dài hơn chắc chắn có lợi cho bản compile; còn 5 epoch thì model **không compile nhỉnh hơn**, vì phí tối ưu epoch đầu chưa được bù. Nhưng multi-run có thể đổi cục diện. Giờ mình **lưu kết quả ra file** để khỏi mất công đo lại.

### 🖥️ Kết quả phụ thuộc phần cứng

Một điểm cần nhấn mạnh: nếu các bạn **không ra đúng số của mình**, đó là chuyện bình thường — kết quả phụ thuộc rất nhiều vào **phần cứng**. Mình dùng Colab Pro nên có nhiều CPU hơn. Chính vì vậy ta set mọi thứ **programmatically** để vẫn so sánh được bất kể máy nào.

---

### 📂 Lưu DataFrame thành CSV

Trong thư mục `pytorch_2_results`, ta tạo thêm thư mục cho single-run results, rồi lưu hai DataFrame:

```python
df.to_csv(
    "pytorch_2_results/single_run_results/"
    "single_run_non_compiled_results_cifar10_resnet50_nvidia_a100_40GB.csv",
    index=False
)

df_compiled.to_csv(
    "pytorch_2_results/single_run_results/"
    "single_run_compiled_results_cifar10_resnet50_nvidia_a100_40GB.csv",
    index=False
)
```

Tên file ghi rõ **dataset, model, GPU, dung lượng VRAM** — để sau này nhìn là biết kết quả từ cấu hình nào.

---

### 🔎 Vì sao cách đặt tên này quan trọng?

Trong tài liệu **Extras** của khóa, Daniel đã chạy thực nghiệm này trên **nhiều GPU khác nhau** rồi lưu lại. Đó là cách anh ấy biết chắc rằng tăng tốc rõ hơn trên A100 so với GPU desktop class. Các bạn có thể mở mục **PyTorch Deep Learning Extras → PyTorch 2 results → single run results** để xem. (Và "spoiler": sắp có cả multi-run results.)

---

### 🗂️ Xem lại figure

Figure đã lưu nằm ở `PyTorch 2 results/figures/single run...` — có thể xem ngay trong Colab hoặc tải về. Trên GitHub của khóa cũng có các ảnh tương tự.

---

### 🔜 Tiếp theo: multi-run

Chuyển sang **Section 4: đo model qua nhiều lần chạy**:

* **Experiment 3**: **3 × 5 epoch** — không `torch.compile`.
* **Experiment 4**: **3 × 5 epoch** — có `torch.compile`.

---

### 🎯 Thử thách mở rộng

* Tự chạy trước Experiment 3 và 4.
* Muốn thấy model compile có thực sự vượt model không compile không? Hãy train **25 epoch** (hoặc lâu hơn) — nhớ là sẽ tốn thời gian, vì ta đang train **ResNet50 đầy đủ** trên **toàn bộ CIFAR10** với ảnh **224×224**.

Hẹn các bạn ở video bắt đầu thực nghiệm 3 và 4.
