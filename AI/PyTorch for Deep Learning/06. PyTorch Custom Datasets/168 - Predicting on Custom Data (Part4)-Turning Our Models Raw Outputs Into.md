---
title: 'Dự đoán trên dữ liệu mới (phần 4): biến logit thành nhãn dự đoán'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 168
status: edited
source: '168 - Predicting on Custom Data (Part4)-Turning Our Models Raw Outputs Into.md'
categories:
- AI
tags: []
---

# 🎯 Dự đoán trên dữ liệu mới (phần 4): biến logit thành nhãn dự đoán

> Nguồn: `168 - Predicting on Custom Data (Part4)-Turning Our Models Raw Outputs Into.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32775616)

Bài trước ta đã có **logit** thô từ model. Bài này ngắn gọn: chuyển logit → **xác suất** (softmax) → **nhãn** (argmax) → **tên lớp**. Qua đó thấy rõ vì sao model hiện tại chỉ dự đoán đúng "nhờ may mắn".

### 🔥 Logit → xác suất → nhãn

```python
# Logit -> prediction probabilities
custom_image_pred_probs = torch.softmax(custom_image_pred, dim=1)
print(custom_image_pred_probs)

# Probabilities -> prediction labels
custom_image_pred_label = torch.argmax(custom_image_pred_probs, dim=1)
print(custom_image_pred_label)
```

`dim=1` vì ta lấy softmax/argmax **theo chiều lớp** (chiều trong cùng).

### 👀 Xác suất bị "dàn đều"

Các xác suất ra khá **dàn trải** giữa ba lớp. Điều này **không lý tưởng**: model tốt nên gán xác suất **cao** cho lớp đúng (ví dụ > 0.8). Dàn đều phản ánh việc model của ta chưa train tốt.

### 🏷️ Ra tên lớp — và lỗi device

```python
print(class_names[custom_image_pred_label])   # pizza
```

Có thể phải đưa `custom_image_pred_label` về **CPU** trước (`.cpu()`) mới index được, vì tensor vẫn nằm trên **CUDA**. Kết quả ra `pizza` — đúng, nhưng theo mình là "may như đoán mò" vì xác suất thấp và dàn đều.

### ✅ Thử thách của bài

Gộp toàn bộ mười cell rải rác thành **một hàm**: nhận **đường dẫn ảnh**, xử lý (đọc, đổi dtype, đổi shape, đổi device), dự đoán, rồi **vẽ ảnh kèm dự đoán** ở tiêu đề. Đây là bước "đóng gói" quan trọng. Các bạn thử trước nhé — bài sau mình làm cùng.
