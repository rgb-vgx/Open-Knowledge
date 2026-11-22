---
title: 'Bài 164 — Bắt đầu với Detectron2'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 164
status: edited
source: '164 - Getting started with Detectron2.md'
categories:
- AI
tags: []
---
# 🧠 Detectron2: chạy model pre-trained trong Colab

> Nguồn: `164 - Getting started with Detectron2.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49112009)

Chào các bạn! Sau YOLO, mình chuyển sang **Detectron2** — thư viện của **Facebook AI Research** (FAIR) cung cấp các thuật toán detection và segmentation hiện đại. Bài này ta chạy notebook "Getting Started" chính thức, dùng model pre-trained để dự đoán trên một ảnh COCO.

### 🏗️ Detectron2 là gì?

Detectron2 là thế hệ kế tiếp của **Detectron**, tập trung vào **state-of-the-art detection và segmentation**. Ở đây mình ưu tiên phần **detection**; segmentation sẽ quay lại sau. Phiên bản mình dùng là **0.6**.

Cách nhanh nhất là chạy trên **Google Colab** với notebook chính thức. Trên **Linux** việc cài đặt rất thuận; trên **Windows** cần workaround, nên mình khuyên dùng Colab.

### 📦 Cài đặt

Notebook cài đặt theo các bước:

1. Cài package **pyyaml**.
2. Import `os` và các thư viện cần thiết.
3. **Clone** repo GitHub chính thức của Detectron2.
4. Chạy `setup.py` trong thư mục repo để cài đặt.

Xong xuôi thì kiểm tra bằng một dòng `import` — nếu không lỗi là ổn. Tiếp theo mình setup **logger** mặc định của Detectron2 cùng **numpy**, **json**, **cv2** để hiển thị kết quả.

### 🧰 Các utility quan trọng

Detectron2 có vài thành phần cốt lõi các bạn cần nhớ:

* **Model zoo** — bộ sưu tập model như **ResNet-50**, **ResNet-101**, các biến thể ResNet X. Mỗi model là một file **pickle**; click vào là tải về.
* **DefaultPredictor** — class lo engine dự đoán.
* **DefaultTrainer** — class lo việc huấn luyện.
* **get_cfg** — lấy cấu hình cho một model cụ thể chọn từ model zoo.
* **Visualizer** — vẽ kết quả lên ảnh.
* **MetadataCatalog** — quản lý metadata dựa trên file annotation.
* **DatasetCatalog** — quản lý toàn bộ ảnh/dataset.

### 🔮 Dự đoán với model có sẵn

1. Tải một ảnh COCO mẫu và đọc bằng `cv2`.
2. Tạo cấu hình:

```python
from detectron2.config import get_cfg
cfg = get_cfg()
cfg.merge_from_file("path/to/config.yaml")
cfg.MODEL.WEIGHTS = "path/to/model_weights.pkl"
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5
```

Notebook mặc định nạp config **Mask R-CNN**; vì đang làm detection, mình đổi sang config detection. Config và weight lấy từ trang **model zoo** trên GitHub — click model tương ứng là thấy đường dẫn.

3. Khởi tạo predictor và chạy:

```python
from detectron2.engine import DefaultPredictor
predictor = DefaultPredictor(cfg)
outputs = predictor(image)
```

Trong `outputs`, hai thứ quan trọng là **class** (`pred_classes`) và **boxes** (`pred_boxes` — các bounding box). Với ảnh mẫu, model nhận ra nhiều **person**, **horse** cùng các object khác.

4. Dùng **Visualizer** để vẽ kết quả:

```python
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog

metadata = MetadataCatalog.get(cfg.DATASETS.TEST[0])
v = Visualizer(image[:, :, ::-1], metadata=metadata)
out = v.draw_instance_predictions(outputs["instances"].to("cpu"))
```

`print` classes và boxes giúp các bạn thao tác kết quả về sau.

### 🎬 Mở rộng

Notebook còn demo **custom training** nhưng cho tác vụ segmentation, nên mình chưa đi sâu ở đây — sẽ quay lại kỹ hơn trong các bài Detectron2 sau, gồm cả cách dùng dataset riêng để train. Detectron2 cũng chạy được **panoptic segmentation**, và có thể xử lý trực tiếp trên **video** (kể cả video YouTube; đôi khi gặp lỗi xác minh bot thì cần xử lý phía mình).

---
### ✅ Tóm lại

Detectron2 cho ta một pipeline gọn: `get_cfg` → `merge_from_file` → `DefaultPredictor` → `Visualizer`. Bài này mới là bước làm quen với model pre-trained; phần custom dataset và đi sâu thuật toán sẽ ở các bài sau. Hẹn gặp các bạn!
