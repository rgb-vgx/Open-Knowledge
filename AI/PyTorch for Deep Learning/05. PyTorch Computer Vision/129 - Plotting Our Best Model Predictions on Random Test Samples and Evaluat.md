---
title: 'Bài 129 — Vẽ dự đoán của model tốt nhất và đánh giá bằng mắt'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 129
status: edited
source: '129 - Plotting Our Best Model Predictions on Random Test Samples and Evaluat.md'
categories:
- AI
tags: []
---

# 🖼️ Vẽ dự đoán của model tốt nhất và đánh giá bằng mắt

> Nguồn: `129 - Plotting Our Best Model Predictions on Random Test Samples and Evaluat.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32886182)

Accuracy 88% nghe tốt, nhưng nó tốt ở đâu và sai ở đâu? Bài này mình vẽ lưới 3x3 ảnh, mỗi ảnh kèm nhãn thật và nhãn dự đoán — **xanh nếu đúng, đỏ nếu sai**. Đây là cách nhanh nhất để "làm một với dự đoán của model".

### 🧱 Dựng lưới ảnh

```python
fig = plt.figure(figsize=(9, 9))
rows, cols = 3, 3

for i, sample in enumerate(test_samples):
    fig.add_subplot(rows, cols, i + 1)

    plt.imshow(sample.squeeze(), cmap="gray")

    pred_label = class_names[pred_classes[i]]
    truth_label = class_names[test_labels[i]]

    title_text = f"Pred: {pred_label} | Truth: {truth_label}"

    if pred_label == truth_label:
        plt.title(title_text, fontsize=10, c="g")
    else:
        plt.title(title_text, fontsize=10, c="r")

    plt.axis(False)
```

Điểm cần chú ý:

* **`figsize=(9, 9)`** — 9 ảnh, lưới 3x3.
* **`i + 1`** — subplot index bắt đầu từ 1, không phải 0.
* **`sample.squeeze()`** — bỏ chiều channel cỡ 1 trước khi `imshow`.
* **`c="g"` / `c="r"`** — tô tiêu đề xanh/đỏ tùy dự đoán đúng/sai.
* **`plt.axis(False)`** — tắt trục cho gọn.

### ✅ Lần đầu: đúng hết

Với seed 42, kết quả khá đẹp: sandal/true sandal, trouser/true trouser… cả 9 ảnh đều đúng. Nhìn ảnh cùng dự đoán trực quan dễ chịu hơn hẳn bảng số.

Nhưng thế chưa đủ hay — cái đáng xem là **khi model sai**.

### ❌ Bỏ seed, tìm ca sai

Comment `random.seed(42)`, chạy lại phần bốc mẫu. Lần này model sai một ảnh: dự đoán **dress** nhưng thật ra là **coat**. Nhìn ảnh, mình thấy cũng hợp lý — chiếc áo đó trông dài như váy.

Thêm vài lần nữa:

* Dự đoán **dress**, thật là **shirt** — ảnh hơi dài so với áo sơ mi thông thường, nhưng vẫn hiểu được.
* Dự đoán **pullover**, thật là **coat** — có thể chính nhãn trong dataset cũng có vấn đề.
* Dự đoán **T-shirt/top**, thật là **shirt** — đúng cặp lớp dễ nhầm nhất.

### 🔍 Dataset cũng có lỗi

Đây là insight lớn: dataset rất lớn thường có **nhãn sai** vì "luật số lớn". Vì vậy khi nhìn dự đoán, đôi khi model sai mà thực ra **nhãn mới sai**. Muốn biết model thực sự tốt hay tệ hơn con số accuracy, phải xem ảnh.

Có khi accuracy báo 88% nhưng nhìn ảnh thấy tệ hơn — và ngược lại. Visualization giúp phát hiện chênh lệch đó.

### 🧠 Model dạy ta về dữ liệu

Cặp `T-shirt/top` và `Shirt` làm cả người lẫn máy lúng túng. Đây là gợi ý: **nhãn có thể cần gộp hoặc định nghĩa lại**. Model không chỉ dự đoán — nó còn phơi ra vấn đề của chính dữ liệu.

### ✅ Tạm kết

Nhìn ảnh giúp thấy model đúng/sai ở đâu, và dataset có "gai" gì. Ta đã nhận ra model hay nhầm `T-shirt/top` với `Shirt`. Câu hỏi tự nhiên: còn những cặp lớp nào hay nhầm nữa? Để trả lời toàn diện, bài sau mình sẽ **vẽ confusion matrix**.
