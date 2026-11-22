---
title: 'Bài 301 — Viết hàm predict cho Food Vision Mini'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 301
status: edited
source: '301 - Creating a Predict Function to Map Our Food Vision Mini Inputs to Outp.md'
categories:
- AI
tags: []
---

# 🧪 Viết hàm `predict`: từ ảnh món ăn đến nhãn và thời gian

> Nguồn: `301 - Creating a Predict Function to Map Our Food Vision Mini Inputs to Outp.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34083984)

Chào các bạn. Video trước mình mới phác thảo workflow cho demo Gradio: đưa ảnh món ăn vào, cho qua một hàm `predict`, rồi trả ra **tuple** gồm dictionary `{tên lớp: xác suất}` và **thời gian dự đoán**. Giờ mình cùng điền nốt các chỗ trống và chạy thử hàm đó.

### 🔁 Nhắc lại đầu ra mong muốn

Input là ảnh món ăn. Output gồm hai phần:

* Một **dictionary** tên lớp → xác suất, ví dụ steak `0.61`, sushi `0.30`, pizza `0.09`. Định dạng này để Gradio tự vẽ thanh xác suất cho đẹp.
* **Prediction time** — thời gian model dự đoán, vì tiêu chí của Food Vision Mini là model phải **nhanh**.

---

### ⏱️ Bắt đầu timer và transform ảnh

Đầu tiên khởi động bộ đếm:

```python
start_time = timer()
```

Ảnh đầu vào thường **không có batch dimension**, nên mình transform theo đúng chuẩn của EffNetB2 rồi thêm chiều batch ở vị trí 0 bằng `unsqueeze(0)`:

```python
img = effnetb2_transforms(img).unsqueeze(0)
```

Đây là bước dễ sai nhất — thiếu batch dimension là model báo lỗi shape ngay.

---

### 🧠 Chạy inference và chuyển sang xác suất

Chuyển model sang chế độ eval, tắt gradient bằng `torch.inference_mode()`, rồi đưa ảnh qua model. Output thô là logits, nên mình bọc thêm `torch.softmax(..., dim=1)` để biến thành xác suất trên **chiều 1** (chiều của các lớp):

```python
effnetb2.eval()
with torch.inference_mode():
    pred_probs = torch.softmax(effnetb2(img), dim=1)
```

---

### 📊 Đổ xác suất vào dictionary tên lớp

Dùng list comprehension để map từng xác suất với `class_names`:

```python
pred_labels_and_probs = {
    class_names[i]: float(pred_probs[0][i])
    for i in range(len(class_names))
}
```

Với mỗi ảnh, `pred_probs[0]` là vector xác suất của ba lớp pizza, steak, sushi; mình lấy đúng index tương ứng. Cuối cùng chốt thời gian, làm tròn 4 chữ số thập phân:

```python
pred_time = round(timer() - start_time, 4)
return pred_labels_and_probs, pred_time
```

---

### 🔍 Thử với ảnh ngẫu nhiên trong test set

Lấy danh sách đường dẫn ảnh test bằng `Path(...).glob("*/*.jpg")`, rồi chọn ngẫu nhiên một ảnh:

```python
import random
from PIL import Image

test_data_paths = list(Path(test_dir).glob("*/*.jpg"))
random_image_path = random.sample(test_data_paths, k=1)[0]
image = Image.open(random_image_path)

pred_dict, pred_time = predict(img=image)
```

Kết quả in ra dạng `{'pizza': 0.02, 'steak': 0.93, 'sushi': 0.05}` — model đoán đúng steak với thời gian khoảng `0.13` giây. Thử vài lần nữa, có lúc ra sushi, có lúc ra pizza, lần nào xác suất cao nhất cũng rơi đúng lớp. Vậy là đã có hàm map ảnh → output đúng như mong muốn.

---

Còn một mảnh ghép trước khi dựng giao diện: **danh sách ảnh ví dụ**, để ai chưa có ảnh sẵn vẫn bấm thử được demo. Mình làm tiếp ở bài sau.
