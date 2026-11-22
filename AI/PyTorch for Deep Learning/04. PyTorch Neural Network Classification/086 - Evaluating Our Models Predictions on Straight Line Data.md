---
title: 'Đánh giá dự đoán trên dữ liệu đường thẳng: model có học thật'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 86
status: edited
source: '086 - Evaluating Our Models Predictions on Straight Line Data.md'
categories:
- AI
tags: []
---

# ✅ Đánh giá trên dữ liệu đường thẳng: model có học thật

> Nguồn: `086 - Evaluating Our Models Predictions on Straight Line Data.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32865826)

Loss đã giảm, nhưng loss giảm chưa đủ thuyết phục — phải **nhìn** dự đoán. Bài này mình vẽ ra để xác nhận model thực sự học được.

### 🔮 Dự đoán

```python
# Turn on evaluation mode
model_2.eval()

# Make predictions (inference)
with torch.inference_mode():
    y_preds = model_2(X_test_regression)
```

Nhắc lại thói quen: khi dự đoán thì `eval()` model và bọc trong `torch.inference_mode()`. "Prediction" và "inference" ở đây là một — machine learning có nhiều tên cho cùng một thứ.

### 📊 Vẽ bằng `plot_predictions`

```python
plot_predictions(train_data=X_train_regression.cpu(),
                 train_labels=y_train_regression.cpu(),
                 test_data=X_test_regression.cpu(),
                 test_labels=y_test_regression.cpu(),
                 predictions=y_preds.cpu())
```

### ⚠️ Lỗi `TypeError`: CUDA tensor không sang NumPy được

Lần đầu mình chạy, plot văng lỗi kiểu **"can't convert cuda:0 device type tensor to numpy"**. Nguyên nhân: hàm plot dùng **matplotlib**, mà matplotlib ở dưới đáy gọi **NumPy** — thư viện chạy trên **CPU**, không phải GPU. Tensor của mình đang nằm trên CUDA nên không chuyển được.

Cách sửa: gọi `.cpu()` trên mọi tensor trước khi đưa vào plot. Đúng như câu hỏi mình đặt ở bài trước — data và model ở **hai device khác nhau** luôn sinh lỗi, chỉ là lần này "device khác" là CUDA so với CPU của NumPy.

Đây là **cùng một bản chất lỗi device mismatch** như lúc đưa model lên GPU nhưng quên đưa data theo. Nhớ kỹ: *khi dùng numpy/matplotlib với tensor CUDA, luôn `.cpu()` trước*.

### 🎉 Nhìn vào hình: các chấm đỏ bám sát chấm xanh

Sau khi sửa, các điểm dự đoán (đỏ) nằm **rất sát** các điểm ground truth (xanh). Model **thực sự học được** — khi dữ liệu là đường thẳng.

Kết luận: code train của mình không sai. Kiến trúc `ModelV2` có **capacity** để học. Chỉ cần đổi dataset sang đường thẳng, đổi `in_features`, đổi loss (`L1Loss`) và chỉnh learning rate một chút, là mọi thứ chạy ngon.

### 🔍 Vậy vấn đề nằm ở đâu?

Không phải **data** vòng tròn có vấn đề. Mà là **model** — vì nó chỉ gồm các phép **linear**, tức đường thẳng. Dữ liệu vòng tròn có tính **phi tuyến** — nên một đường thẳng không bao giờ tách nổi hai vòng.

Bí mật lớn nhất mình giữ suốt từ đầu module nằm ngay trong `torch.nn`: những **non-linear activation**. Và bật mí: các bạn **đã thấy một trong số đó** rồi — nằm ngay trong module này. Giờ thì mình đi tìm nó. Bắt đầu với non-linearity.
