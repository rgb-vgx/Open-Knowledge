---
title: 'Khám phá kết quả model trong TensorBoard'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 208
status: edited
source: '208 - Exploring Our Single Models Results with TensorBoard.md'
categories:
- AI
tags: []
---

# 🔍 Khám phá kết quả model trong TensorBoard

> Nguồn: `208 - Exploring Our Single Models Results with TensorBoard.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33111092)

How'd you go? Bạn đã thử xem kết quả training bằng TensorBoard trong Colab chưa? Nếu rồi thì tuyệt, chưa thì cùng xem nhé. Ta có dictionary `results` có thể vẽ được loss curve, nhưng mục đích của experiment tracking là track **programmatic** — nên hãy dùng TensorBoard.

### 🛣️ Ba cách xem kết quả

1. **Ngay trong notebook** (Jupyter/Colab) — cách ta chọn.
2. **Trong VS Code** — có hướng dẫn riêng trong sách online (extracurricular).
3. **Upload lên TensorBoard.dev** để công khai.

Ta tập trung vào cách đầu tiên.

---

### 🪄 Magic command `%load_ext tensorboard`

```python
%load_ext tensorboard
%tensorboard --logdir runs
```

Lưu ý: cách này cần cài TensorBoard nếu chạy local (có thể `pip install tensorboard`). Nhưng **Colab đã cài sẵn** TensorBoard — một lợi thế của Colab. Tham số `--logdir runs` trỏ tới thư mục mặc định của `SummaryWriter` (ta chưa đổi gì).

Chạy xong, đợi vài giây "Launching TensorBoard", giao diện hiện ra — trông rất mượt, lại có cả **dark mode** mặc định của trình duyệt. Có nút **refresh** vì TensorBoard có thể cập nhật trực tiếp khi model đang train dài.

---

### 📈 Tab Scalars

Mình đang ở tab **Scalars** — đúng nơi dữ liệu từ `writer.add_scalars` hiện ra. Việc đầu tiên: **tắt smoothing** (kéo về 0) để xem giá trị **thô** thay vì bị làm mượt. Rồi lọc chỉ giữ các đường test:

* Giữ `test_loss`, bỏ `train_loss`.
* Giữ `test_acc`, bỏ `train_acc`.

Kết quả: test accuracy cuối cùng khá cao hơn train loss. Có thể zoom bằng **Alt + cuộn chuột**. Khi bật smoothing thì các đường mượt hơn nhiều.

---

### 🧐 Đọc dấu hiệu overfitting

Khi zoom ra và bật lại cả train, ta thấy: loss curve nhìn chung đi hướng tốt, nhưng **test loss có vẻ tăng nhẹ về cuối** — dấu hiệu của **overfitting** (khi train loss thấp hơn test loss). Mình nhắc lại phần "ideal loss curve" ở section trước để so sánh, và gợi ý bạn tìm hiểu cách xử lý overfitting.

---

### 🔎 Lọc và lọc lại

Khi có nhiều run, ta có thể toggle từng cái. Search box cho phép lọc theo tên — ví dụ chỉ xem run train **20 epochs**. Cạnh mỗi run có các cột như số epoch, số step, thời gian chạy, thời gian compute tương đối — rất tiện so sánh.

---

### 🕸️ Tab Graphs

Mở tab **Graphs** ta thấy kiến trúc model: input `32×3×224×224`, rồi EfficientNet với 3 khối (**Sequential** features, **AdaptiveAvgPool**, **Classifier**). Mở rộng classifier thấy **Dropout** và **Linear**; nhấp vào node để xem weight/bias đi vào, output đi ra. Mở tiếp `Sequential` thấy `Conv2d`, `BatchNorm2d`, `SiLU`... Đây là cách tuyệt vời để inspect kiến trúc model.

Muốn hiểu `BatchNorm2d` là gì? Search "PyTorch BatchNorm2d" ra tài liệu: áp batch normalization trên input 4D, kèm cả paper gốc. Đây chính là tinh thần **experiment, experiment, experiment** — không chỉ train model, mà còn *inspect* model.

---

### ✅ Tạm kết

TensorBoard còn hỗ trợ `add_image`, `add_images`, `add_figure`, `add_video`, `add_audio`, `add_text`... — bạn cứ khám phá. Nhưng ta vừa xem experiment của **một** model. Làm sao xem **nhiều** experiment cùng lúc? Video sau mình sẽ sửa `train` function để nhận tham số `writer`, cho phép cập nhật writer linh hoạt. Hẹn gặp!
