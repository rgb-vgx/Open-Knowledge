---
title: 'Bài 293 — Phác thảo hàm dự đoán và đo thời gian inference'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 293
status: edited
source: '293 - Outlining the Steps for Making and Timing Predictions for Our Models.md'
categories:
- AI
tags: []
---

# ⏱️ Phác thảo hàm dự đoán và đo thời gian inference

> Nguồn: `293 - Outlining the Steps for Making and Timing Predictions for Our Models.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055235)

Cả hai model đều đã vượt mốc **95% accuracy**. Giờ đến tiêu chí thứ hai: **tốc độ**. Mục tiêu là **≥30 FPS**, tức khoảng **30ms/prediction**. Bài này phác thảo từng bước để viết hàm `pred_and_store()` — vừa dự đoán, vừa đo thời gian, vừa lưu kết quả.

### 🎯 Mục tiêu

* Performance: ≥95% test accuracy — **cả hai model đều đạt**.
* Speed: ≥30 FPS.
* Cách đo: lặp qua toàn bộ ảnh test, đo thời gian mỗi prediction, lấy trung bình.

### 📂 Lấy danh sách đường dẫn ảnh test

```python
from pathlib import Path

test_data_paths = list(Path(test_dir).glob("*/*.jpg"))
```

`glob("*/*.jpg")` quét mọi thư mục con (pizza, steak, sushi) và lấy file **`.jpg`**. Kết quả là danh sách đường dẫn ảnh test. (Lưu ý: phần mở rộng thực tế là `.jpg`; transcript đọc thành "dot JPEG".)

### 🧩 Thiết kế hàm `pred_and_store()`

Hàm nhận vào:

* `paths` — danh sách đường dẫn ảnh.
* `model` — model PyTorch đã train.
* `transform` — transforms tương ứng với model.
* `class_names` — danh sách tên class.
* `device` — thiết bị đích (CPU/CUDA).

Trả về: **danh sách dictionary**, mỗi dictionary ứng với một prediction. Cấu trúc "list of dicts" rất thuận tiện để kiểm tra và phân tích dữ liệu sau này.

### 📝 Các bước bên trong vòng lặp

1. Tạo list rỗng để chứa kết quả.
2. Với mỗi ảnh, tạo **dictionary rỗng** cho thống kê của mẫu đó.
3. Lấy **đường dẫn** và **ground truth** (nhãn thật) từ đường dẫn file.
4. Mở ảnh bằng **Pillow** (`PIL.Image.open`) và bắt đầu tính giờ.
5. Áp `transform` để đưa ảnh về định dạng model cần.
6. Đưa `model` lên `device`, gọi `model.eval()`.
7. Bật `torch.inference_mode()` để tắt các cơ chế không cần thiết khi inference.
8. Forward pass → **logits** → `softmax` ra **prediction probability** → `argmax` ra **prediction class**.
9. Lưu `pred_prob` và `pred_class` vào dictionary.
10. Dừng timer, thêm **thời gian** vào dictionary.
11. So sánh `pred_class` với ground truth → đánh dấu đúng/sai.
12. Append dictionary vào list, cuối cùng trả về list.

```python
# Khung hàm (sẽ hoàn thiện ở bài sau)
def pred_and_store(paths, model, transform, class_names, device):
    pred_list = []
    # ... loop, open image, transform, forward, timing, append
    return pred_list
```

Không có gì mới — từng mảnh đều đã học trong khóa: mở ảnh, transforms, `eval()`, `inference_mode`, `softmax`, `argmax`, đo thời gian.

---

Ghép tất cả lại: danh sách đường dẫn test + hai model và transforms + `class_names` + `device`. Thử tự viết `pred_and_store()` trước, rồi bài sau mình code cùng và chạy cho cả EffNetB2 lẫn ViT.
