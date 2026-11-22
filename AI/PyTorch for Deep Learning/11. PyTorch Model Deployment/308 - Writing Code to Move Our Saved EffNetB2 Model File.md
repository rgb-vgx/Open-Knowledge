---
title: 'Bài 308 — Move file model đã train vào thư mục demo'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 308
status: edited
source: '308 - Writing Code to Move Our Saved EffNetB2 Model File.md'
categories:
- AI
tags: []
---

# 📦 Di chuyển model `.pth` bằng code Python

> Nguồn: `308 - Writing Code to Move Our Saved EffNetB2 Model File.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34097872)

Chào các bạn. Thư mục demo đã có ảnh mẫu, giờ cần đưa **state dict** của EffNetB2 vào. Mình làm bằng code để chạy lại notebook vẫn đúng, thay vì kéo thả tay.

### 📍 Xác định nguồn và đích

File model được lưu ở section trước trong thư mục `models/`:

```python
import shutil
from pathlib import Path

effnetb2_food_vision_mini_model_path = Path(
    "models/09_pretrained_effnetb2_feature_extractor_pizza_steak_sushi_20_percent.pth"
)

effnetb2_food_vision_mini_model_destination = (
    food_vision_mini_demo_path / effnetb2_food_vision_mini_model_path.name
)
```

`Path.name` lấy tên file cuối (`....pth`), ghép vào thư mục demo. Kết quả đích là `demos/food_vision_mini/09_pretrained_....pth`.

---

### 🔀 Move có xử lý trường hợp đã move rồi

Nếu chạy cell lần thứ hai, file nguồn không còn nữa. Mình bọc trong `try`/`except` để lần chạy lại không gãy:

```python
try:
    print(f"[INFO] Attempting to move {effnetb2_food_vision_mini_model_path} "
          f"to {effnetb2_food_vision_mini_model_destination}")
    shutil.move(
        src=effnetb2_food_vision_mini_model_path,
        dst=effnetb2_food_vision_mini_model_destination,
    )
    print("[INFO] Model move complete.")
except:
    print(f"[INFO] No model found at {effnetb2_food_vision_mini_model_path}, "
          f"perhaps it's already been moved?")
    print(f"[INFO] Model exists at {effnetb2_food_vision_mini_model_destination}: "
          f"{effnetb2_food_vision_mini_model_destination.exists()}")
```

`shutil.move` nhận `src` và `dst`; nếu đích là thư mục có sẵn thì file được đặt vào trong đó, còn nếu là đường dẫn file thì nó đổi tên luôn.

---

### 🔄 Kiểm tra hành vi chạy lặp

* **Lần đầu:** file biến mất khỏi `models/`, xuất hiện trong `demos/food_vision_mini/`, in ra `Model move complete.`
* **Lần hai:** in ra `No model found at ... perhaps it's already been moved?` và `Model exists at ...: True`.

Đúng như mong đợi — code **idempotent** ở mức chấp nhận được: chạy lại không làm hỏng gì.

---

### ✅ Trạng thái thư mục

Sau bài này, `demos/food_vision_mini/` đã có:

* `examples/` với ba ảnh.
* file model `.pth`.
* (chưa có) `app.py`, `model.py`, `requirements.txt`.

---

Bước tiếp theo là `model.py` — chuyển hàm `create_effnetb2_model` từ notebook thành script để `app.py` import được. Các bạn thử tự làm trước nhé; nếu cần gợi ý thì xem lại phần *going modular*. Bài sau mình làm cùng nhau.
