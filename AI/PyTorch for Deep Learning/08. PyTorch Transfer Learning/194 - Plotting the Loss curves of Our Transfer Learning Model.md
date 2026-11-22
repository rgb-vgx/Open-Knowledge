---
title: 'Vẽ loss curve của model transfer learning'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 194
status: edited
source: '194 - Plotting the Loss curves of Our Transfer Learning Model.md'
categories:
- AI
tags: []
---

# 📈 Vẽ loss curve của model transfer learning

> Nguồn: `194 - Plotting the Loss curves of Our Transfer Learning Model.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33016302)

Chào các bạn! Ta vừa train model tốt nhất từ đầu khóa — gần **90% test accuracy** trong khoảng **13 giây**. Giờ ta kiểm tra xem "những con số trên giấy" có thực sự đẹp như vẻ ngoài không.

### 📉 Vì sao vẽ loss curve?

Số liệu cuối cùng chỉ là một điểm. **Loss curve** cho thấy xu hướng qua từng epoch:

* Loss có giảm đều không?
* Train và test có chênh lệch quá lớn không (overfitting)?
* Có dấu hiệu underfitting không?

---

### 📥 Tải `helper_functions.py`

Ta cần hàm `plot_loss_curves`. Nó nằm trong `helper_functions.py` trên GitHub của khóa.

Thử import trước:

```python
try:
    from helper_functions import plot_loss_curves
except:
    print("Couldn't find helper_functions.py, downloading...")
```

Vì file chưa có, import fail. Ta viết code tải về:

```python
from pathlib import Path
import requests

if not Path("helper_functions.py").is_file():
    print("Couldn't find helper_functions.py, downloading...")
    with open("helper_functions.py", "wb") as f:
        request = requests.get("https://raw.githubusercontent.com/mrdbourke/pytorch-deep-learning/main/helper_functions.py")
        f.write(request.content)

from helper_functions import plot_loss_curves
```

Cần dùng **raw URL** (không phải link trang GitHub), ghi file ở chế độ **binary** (`"wb"`), và ghi `.content` của response.

---

### 📊 Vẽ curve

```python
plot_loss_curves(results)
```

Kết quả: một hình 4 đường — **train loss**, **test loss** giảm dần; **train accuracy**, **test accuracy** tăng dần. Nhìn rất đẹp.

---

### 🥣 "Goldilocks loss curve"

Nhắc lại lý thuyết từ section trước:

* **Ideal** (Goldilocks): train loss và test loss **giảm tương tự nhau**.
* **Overfitting**: train loss **thấp hơn hẳn** test loss.
* **Underfitting**: cả hai loss đều còn **cao**, chưa hội tụ.

Với curve của ta: train loss và test loss **không chênh nhau nhiều**, và cùng giảm khá nhanh. Đó là dấu hiệu model đang làm rất tốt.

---

### 🔁 Liên hệ với "how to deal with overfitting"

Nếu train loss thấp hơn test loss đáng kể, một cách xử lý là **transfer learning** — dùng pretrained weight cho bài toán riêng. Và ta vừa thấy nó hiệu quả trong thực tế: transfer learning là một trong những kỹ thuật mạnh nhất để **giảm overfitting và underfitting**.

Bạn có thể quay lại phần lý thuyết cũ, đọc lại sau khi đã thấy curve thật — sẽ "vỡ" ra nhiều hơn.

---

### 🚀 Gợi ý mở rộng

* **Train lâu hơn** — tăng epoch, xem loss giảm tới đâu, accuracy lên tới đâu.
* **Thử fine-tuning** — mở khóa một phần base layer khi có nhiều dữ liệu hơn.
* **So sánh** curve với các model khác.

---

### ✅ Chốt lại

Loss curve xác nhận model học đúng hướng. Nhưng evaluation định lượng vẫn chưa đủ — video sau ta **dự đoán trên ảnh test thật** để đánh giá định tính. Hẹn gặp!
