---
title: 'Dự đoán trên dữ liệu mới (phần 1): tải một ảnh về'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 165
status: edited
source: '165 - Predicting on Custom Data (Part 1)- Downloading an Image.md'
categories:
- AI
tags: []
---

# 📥 Dự đoán trên dữ liệu mới (phần 1): tải một ảnh về

> Nguồn: `165 - Predicting on Custom Data (Part 1)- Downloading an Image.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32763714)

Đây là một trong những phần thú vị nhất của deep learning: **dự đoán trên ảnh hoàn toàn mới** — không nằm trong tập train lẫn test. Hãy tưởng tượng app nhận diện món ăn (kiểu Nutrify): chụp ảnh đồ ăn, app phân loại và trả về thông tin dinh dưỡng. Bài này ta tải một ảnh về để chuẩn bị cho quy trình đó.

### 🍕 Workflow thực tế

Ảnh mẫu là "Pizza Dad" — bố của Daniel giơ hai ngón cái với chiếc pizza. Trong app thật, khi upload ảnh này, model sẽ dự đoán `pizza`, rồi trả về macronutrient và thời gian xử lý. Ta sẽ làm lại quy trình tương tự với model PyTorch đã train — dù kết quả có thể chưa tốt vì model còn cần cải thiện.

---

### 🔥 Tải ảnh bằng code

Có thể upload thủ công qua nút trong Colab, nhưng file sẽ mất khi Colab ngắt kết nối. Viết code thì chạy lại lúc nào cũng được:

```python
import requests
from pathlib import Path

custom_image_path = data_path / "04-pizza-dad.jpeg"

if not custom_image_path.is_file():
    with open(custom_image_path, "wb") as f:
        request = requests.get("https://raw.githubusercontent.com/mrdbourke/pytorch-deep-learning/main/images/04-pizza-dad.jpeg")
        print(f"Downloading {custom_image_path}...")
        f.write(request.content)
else:
    print(f"{custom_image_path} already exists, skipping download.")
```

Điểm quan trọng: với GitHub phải dùng link **raw** (`raw.githubusercontent.com`), không phải link `blob` — bài học từ lúc tải dataset. Ảnh nằm trong thư mục `images/` của repo khóa học (không phải `extras/`).

---

### ✅ Tạm kết

Ảnh đã có trong Colab. Còn hai việc để đưa nó qua model: **biến thành tensor** đúng shape/dtype như dữ liệu train, và đưa lên **đúng device**. Bài sau mình bắt đầu với việc đọc ảnh bằng PyTorch. Hẹn các bạn ở đó.
