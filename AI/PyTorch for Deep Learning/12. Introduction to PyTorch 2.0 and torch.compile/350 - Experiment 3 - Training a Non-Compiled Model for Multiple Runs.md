---
title: 'Bài 350 — Experiment 3: multi-run không compile'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 350
status: edited
source: '350 - Experiment 3 - Training a Non-Compiled Model for Multiple Runs.md'
categories:
- AI
tags: []
---

# 🔁 Experiment 3: chạy ba lần để loại may rủi

> Nguồn: `350 - Experiment 3 - Training a Non-Compiled Model for Multiple Runs.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745252)

Video trước ta đã "function hóa" mọi thứ — điều mình rất thích. Khi mới dựng notebook, mấy hàm này chưa tồn tại; mình chạy thực nghiệm bằng code khá "hack". Nhưng quay lại và biến cả loạt thực nghiệm thành vài dòng gọi hàm thì sướng hơn nhiều. Giờ chạy **Experiment 3**: multi-run, **không** compile.

### 🎯 Vì sao chạy nhiều lần?

Kết quả single-run có thể là **outlier** — do lỗi, do phần cứng "khởi động" (theo nghĩa nhiệt độ thật), hoặc may rủi. Chạy nhiều lần để xem kết quả có phải "xạo" không. Đúng tinh thần của mình: **experiment, experiment, experiment**.

```python
num_runs = 3
num_epochs = 5
non_compile_results_multiple_runs = []

for i in tqdm(range(num_runs), desc="Non-compiled runs"):
    print(f"Run {i+1} of {num_runs} for non-compiled model")
    results = create_and_train_non_compiled_model(
        epochs=num_epochs,
        disable_progress_bar=True,
    )
    non_compile_results_multiple_runs.append(results)
```

`tqdm` là thư viện thanh tiến trình — một trong những thư viện Python mình thích nhất.

### 🔇 Vì sao tắt progress bar?

Progress bar nằm ở **ba tầng**: trong train step, test step, và hàm `train` tổng. Khi chạy 3 run × 5 epoch, để nguyên sẽ rối màn hình. `disable_progress_bar=True` tắt bar ở **train step** và **test step**, nhưng **giữ** bar tổng ở cấp epoch — mỗi epoch in ra một dòng thay vì ba progress bar chồng nhau.

> Đây là tùy chọn, các bạn có thể để `False` nếu thích xem. Mình thì thích thấy số nhảy lên xuống trên màn hình lắm.

### ⌛ Thời gian chạy

> Cảnh báo: một single-run mất ~7 phút trên A100, nên **3 run có thể mất ~20 phút**. Máy yếu hơn thì lâu hơn, GPU mới hơn trong tương lai có thể nhanh hơn.

Đây cũng là một trong những điều vừa đẹp vừa đau của machine learning: **model train rất lâu**. Đây là model lớn nhất ta train gần như suốt khóa. Thời gian đó đủ để đi dạo một vòng quanh khu nhà — mình đúng là làm vậy.

Kết quả từng epoch trong run đầu: train **~70 giây**, test **~7.5 giây**.

### 🧮 Gộp 3 run thành một DataFrame

Mỗi run trả về một dict. Ta tạo list các DataFrame rồi `pd.concat`:

```python
import pandas as pd

non_compile_results_dfs = []
for result in non_compile_results_multiple_runs:
    result_df = pd.DataFrame(result)
    non_compile_results_dfs.append(result_df)

non_compile_results_multiple_runs_df = pd.concat(non_compile_results_dfs)
```

Bảng có **15 hàng** (3 run × 5 epoch). Train epoch time khá ổn định **~70.5 giây**, test **~7.5 giây**.

### 📐 Lấy trung bình

Để có con số đại diện, ta **gom theo index** (số thứ tự epoch) rồi lấy mean:

```python
non_compile_results_multiple_runs_df = (
    non_compile_results_multiple_runs_df
    .groupby(level=0)
    .mean()
)
```

> Lúc đầu mình quên `.mean()` và tự trách "Daniel ơi, làm tốt hơn đi chứ" — thêm vào là có ngay trung bình qua nhiều run cho model không compile.

### 🔜 Thử thách: Experiment 4

Giờ đến lượt multi-run **có** compile. Ta đã có `create_compiled_model` và `train_compiled_model`. Yêu cầu: **compile model một lần**, rồi train nó **ba lần** qua các run. Thử trước nhé — video sau ta làm cùng.
