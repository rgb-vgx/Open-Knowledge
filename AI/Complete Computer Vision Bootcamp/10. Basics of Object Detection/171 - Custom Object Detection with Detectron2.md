---
title: 'Bài 171 — Custom Object Detection với Detectron2'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 171
status: edited
source: '171 - Custom Object Detection with Detectron2.md'
categories:
- AI
tags: []
---
# 🛠️ Train Detectron2 trên dataset riêng

> Nguồn: `171 - Custom Object Detection with Detectron2.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49195933)

Chào các bạn! Nối tiếp bài Detectron2, lần này mình **train một object detector riêng** trên dataset tải từ Roboflow, rồi đánh giá bằng **mAP**. Ta sẽ thấy Detectron2 dùng `register_coco_instances`, `DefaultTrainer` và cách **resume** training.

### ⚙️ Cài đặt

Chạy trên Colab với **GPU** (cần cho training). Cài Detectron2, kiểm tra bằng `import` — phiên bản **0.6**, có sẵn **Torch** và **CUDA**. Sau đó setup logger, các thư viện quen thuộc, `get_cfg`, `DefaultPredictor`, visualizer cùng **MetadataCatalog** và **DatasetCatalog**.

### 📥 Dataset

Mình dùng bộ **hard hat workers** trên Roboflow, gồm **3 class**: `person`, `head`, `helmet`. Dataset đã gán nhãn sẵn; mình tải định dạng **COCO** (file JSON annotation), upload ZIP lên Google Drive, mount Drive và giải nén.

Annotation JSON chứa các trường như **image ID**, **category ID** và **bounding box** cho từng object. Metadata có **4 category**, nhưng chỉ **3 class** có mẫu (`person`, `head`, `helmet`); category `workers` không có instance nào.

### 🗂️ Đăng ký dataset

Đăng ký ba split bằng `register_coco_instances`, mỗi split một tên:

```python
from detectron2.data.datasets import register_coco_instances
register_coco_instances("exp_train", {}, "train/annotations.json", "train/images")
register_coco_instances("exp_val",   {}, "valid/annotations.json", "valid/images")
register_coco_instances("exp_test",  {}, "test/annotations.json",  "test/images")
```

Sau đó có thể lấy dữ liệu qua `DatasetCatalog.get("exp_train")` và metadata qua `MetadataCatalog.get("exp_train")` để visualize thử vài ảnh gán nhãn.

### 🏋️ Cấu hình training

Dùng **Faster R-CNN R50-FPN** với cấu hình COCO detection:

```python
from detectron2.config import get_cfg
cfg = get_cfg()
cfg.merge_from_file(".../faster_rcnn_R_50_FPN_3x.yaml")
cfg.DATASETS.TRAIN = ("exp_train",)
cfg.DATASETS.TEST  = ("exp_val",)
cfg.DATALOADER.NUM_WORKERS = 2
cfg.SOLVER.BASE_LR = 0.0025
cfg.SOLVER.MAX_ITER = 300
cfg.MODEL.ROI_HEADS.NUM_CLASSES = 3
cfg.OUTPUT_DIR = "./output"
```

Các tham số chính:

* **learning rate = 0.0025**,
* **max iterations = 300** (thực tế có thể tăng lên 500 hoặc 1000),
* **số class = 3**,
* `IMS_PER_BATCH` (batch size) = 128 — tuỳ GPU; GPU mạnh có thể tăng,
* **workers = 2**.

### ▶️ Chạy và resume

```python
from detectron2.engine import DefaultTrainer
trainer = DefaultTrainer(cfg)
trainer.resume_or_load(resume=True)
trainer.train()
```

* Log kết quả sau **mỗi 20 iteration**.
* Loss khởi đầu **1.77** và giảm dần — dấu hiệu đi đúng hướng.
* 300 iteration mất khoảng **2 phút 12 giây** trên GPU.

Điểm hay: nếu muốn train thêm, chỉ cần tăng `MAX_ITER` lên **500** rồi chạy lại với `resume=True` — training **tiếp tục từ iteration 299**, không chạy lại từ đầu. Đây là lợi thế lớn khi train dài.

### 💾 Lưu model và đánh giá

Detectron2 tự lưu checkpoint **`model_final.pth`** trong `cfg.OUTPUT_DIR`. Visualize vài kết quả cho thấy model nhận đúng `helmet`/`head`.

Đánh giá trên tập **test** (khoảng **706 ảnh**): dùng `exp_test` cùng model đã train. Kết quả **mAP**:

* `head` — khoảng **58%**,
* `helmet` — khoảng **51%**,
* `person` — thấp do ít instance,
* `workers` — không có mẫu nên **None**.

Dataset khá mất cân bằng (person xuất hiện ít), nên mAP chưa cao là điều dễ hiểu.

### 📤 Dùng model về sau

Để predict trên máy khác, cần hai thứ:

1. **`model_final.pth`** — tải từ Google Drive.
2. **`config.yml`** — dump từ `cfg` ra file, đi kèm model.

Có hai file này là có thể load lại model và xây web app. Các bài sau mình sẽ làm **web app cho cả Detectron2 và YOLO11**.

---
### ✅ Tóm lại

Detectron2 custom training: đăng ký COCO dataset → cấu hình Faster R-CNN (LR, iterations, num classes) → `DefaultTrainer` (có resume) → lưu `model_final.pth` → đánh giá mAP → xuất `config.yml` kèm model. Hẹn gặp các bạn ở module **Image Segmentation**!
