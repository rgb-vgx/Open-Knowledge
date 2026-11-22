---
title: 'Bài 351 — Experiment 4: multi-run với torch.compile'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 351
status: edited
source: '351 - Experiment 4 - Training a Compiled Model for Multiple Runs.md'
categories:
- AI
tags: []
---

# 🚀 Experiment 4: compile một lần, chạy ba lần

> Nguồn: `351 - Experiment 4 - Training a Compiled Model for Multiple Runs.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745254)

Experiment 3 cho kết quả khá ổn định: khoảng **70.5 giây/epoch train** và **7.5 giây/epoch test** trên A100 (12 CPU). Giờ là **Experiment 4** — multi-run có compile. Và điểm cốt lõi: **compile một lần duy nhất**, ngoài vòng lặp.

### 💡 Compile một lần, dùng nhiều lần

Với `torch.compile`, ta chỉ muốn model được compile **một lần** ở đầu training. Tương tự khi deploy: compile model, chạy vài epoch test với dữ liệu giả để "warm up", rồi mới chạy inference production. Đừng compile lại trong mỗi run.

---

### 🔁 Vòng lặp train

```python
compiled_model = create_compiled_model()   # compile NGOÀI loop — chỉ một lần
compiled_results_multiple_runs = []

for i in tqdm(range(num_runs)):
    print(f"Run {i+1} of {num_runs} for compiled model")
    results = train_compiled_model(
        model=compiled_model,
        epochs=num_epochs,
        disable_progress_bar=True,
    )
    compiled_results_multiple_runs.append(results)
```

Chú ý: bước compile **không nằm trong loop**. Model chỉ được compile một lần, và việc tối ưu thật sự diễn ra ở **epoch đầu của run đầu tiên** — khi PyTorch đã biết nó cần làm những phép toán gì trên dữ liệu nào.

---

### ⌛ Thời gian chạy

Tổng cộng mất **khoảng 18–19 phút** cho 3 run trên A100. Lại là câu nói mình thích:

> Một trong những điều đau nhất của machine learning là model train rất lâu. Và một trong những điều đẹp nhất của machine learning cũng là model train rất lâu — vì bạn có thời gian đi dạo. (Mình thì đi hút bụi 15–20 phút.)

---

### 📊 Kết quả

* **Epoch đầu tiên của run đầu tiên** mất lâu nhất (~**77 giây**) — đây là lúc compile/tối ưu chạy.
* **Các epoch sau**: khoảng **64 giây** — so với baseline ~**70.5 giây**, tức **nhanh hơn ~10%**.
* **Test epoch đầu** cũng lâu nhất, sau đó nhanh hơn.

Có thể tóm gọn: **epoch đầu chậm hơn ~10%, các epoch sau nhanh hơn ~10%**.

---

### 🧮 Gộp kết quả 3 run

Tương tự Experiment 3:

```python
compile_results_dfs = []
for result in compiled_results_multiple_runs:
    compile_results_dfs.append(pd.DataFrame(result))

compiled_results_multiple_runs_df = pd.concat(compile_results_dfs)

# Trung bình theo từng epoch (gom các hàng cùng index)
compiled_results_multiple_runs_df = (
    compiled_results_multiple_runs_df
    .groupby(level=0)
    .mean()
)
```

Sau khi gộp, ta có **5 hàng** (trung bình 3 run cho mỗi epoch). Và các con số xác nhận lý thuyết: epoch đầu chậm, các epoch sau nhanh.

---

### ✅ Mọi thứ đang khớp lại

Đây chính là lý do ta làm multi-run: kết quả **không phải may rủi**. Epoch đầu chậm vì compile, nhưng các epoch sau nhanh đều. Với train dài, lợi ích sẽ rõ hơn nữa.

---

### 🔜 Thử thách

Dùng lại hàm `plot_mean_epoch_times` đã viết ở bài 347, nhưng lần này cho **Experiment 3 và 4** (đặt `multi_runs=True`). Thử trước — video sau ta so sánh hai thực nghiệm multi-run.
