---
title: 'Bài 347 — So sánh kết quả Experiment 1 và 2'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 347
status: edited
source: '347 - Comparing the Results of Experiment 1 and 2.md'
categories:
- AI
tags: []
---

# 📊 Vẽ đồ thị so sánh: compile vs không compile

> Nguồn: `347 - Comparing the Results of Experiment 1 and 2.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745246)

Video trước ta đã train xong Experiment 2 (kèm màn debug một chữ cái). Giờ là phần thú vị: **so sánh kết quả** hai thực nghiệm. Lỗi mình cố ý để lại trong video là để các bạn thấy lập trình thật ra sao — chính là trial and error.

### 🧾 Từ dict sang DataFrame

Kết quả hai lần chạy đang nằm trong dict. Ta chuyển sang **pandas DataFrame** cho dễ nhìn:

```python
import pandas as pd

single_run_no_compile_results_df = pd.DataFrame(single_run_no_compile_results)
single_run_compile_results_df = pd.DataFrame(single_run_compile_results)
```

Mỗi bảng có **5 hàng** — 5 epoch. Model chưa compile và compile có kết quả accuracy khá tương đồng (nhưng ta không chăm accuracy).

### 👀 Nhìn nhanh vào xu hướng

* Thời gian mỗi epoch của bản **không compile** khá ổn định, chỉ epoch đầu hơi lâu hơn một chút.
* Với bản **có compile**, **epoch đầu chậm hơn rõ rệt** — vì nó đang tối ưu model và code train sau hậu trường.
* Các epoch sau của bản compile **nhanh hơn**.

Nếu train **20 epoch** thay vì 5, mức tăng tốc trung bình sẽ rõ hơn nhiều, vì cái "phí" epoch đầu được chia đều cho nhiều epoch hơn.

### 📈 Hàm vẽ đồ thị

Mình viết sẵn một hàm `plot_mean_epoch_times` (vì bài sau còn dùng cho multi-run). Nó nhận:

* `non_compiled_results`, `compiled_results` — hai DataFrame.
* `multi_runs` (bool) — phân biệt single-run và multi-run.
* `num_runs` (int) — số lần chạy trong multi-run.
* `save_path`, và `save` (bool).
* Các thông tin: dataset name (CIFAR10), model name, số epoch, image size, batch size.

Bên trong hàm:

1. Tính **mean** thời gian train/test epoch của model **không** compile.
2. Tính mean của model **có** compile.
3. Tính **phần trăm chênh lệch**.
4. Vẽ **bar chart** so sánh 4 cột: train epoch time và test epoch time, của bản compile và không compile.
5. Tự tạo tiêu đề cho single/multi-run, và lưu figure nếu muốn.

### 📁 Tạo thư mục lưu figure

```python
import os

dir_to_save_figures_in = "pytorch_2_results/figures"
os.makedirs(dir_to_save_figures_in, exist_ok=True)
```

Sau này quay lại xem kết quả vẫn còn. (Nếu muốn quản lý thực nghiệm bài bản hơn, cân nhắc **TensorBoard** như phần Experiment Tracking đã học.)

### 🎯 Kết quả: bất ngờ ở test epoch

Vẽ xong, đồ thị cho thấy:

* **Mean train epoch time**: chênh lệch **khoảng tương đương** (có compile nhanh hơn chút).
* **Mean test epoch time**: bản **compile lại chậm hơn** — hơi lạ!

Vì sao? Vì **epoch đầu quá chậm** (do tối ưu) kéo trung bình xuống khi chỉ chạy 5 epoch.

### 🧮 Nếu train dài hơn thì sao?

Trên 5 epoch, lợi ích chưa lộ ra. Nhưng train thật thường **hàng trăm epoch**. Các model state-of-the-art của torchvision trên blog PyTorch train tới **600 epoch**.

Nếu trung bình tiết kiệm khoảng `71 - 64 = 7` giây/epoch, với 600 epoch: `600 × 7 = 4200` giây `= 70` phút tiết kiệm.

> ⚠️ Cần kiểm chứng: trong transcript gốc Daniel nói "70 giờ" cho phép tính này, nhưng `4200 giây ÷ 60 = 70 phút`, không phải 70 giờ. Con số đúng theo công thức của anh ấy là khoảng **70 phút**. Dù vậy, ý chính vẫn đúng: train càng dài, cái phí của epoch đầu càng được bù lại.

Vì không thể chờ 600 epoch, ta giữ thực nghiệm nhỏ. Nhưng chính vì **epoch đầu tốn thời gian tối ưu**, single-run chưa cho thấy lợi thế rõ. Để kiểm chứng chắc hơn, ta sẽ làm **multi-run**.

---

Video sau, mình lưu kết quả ra file để dùng lại về sau.
