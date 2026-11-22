---
title: 'Bài 180 — Train YOLO11 Instance Segmentation'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 180
status: edited
source: '180 - Training Yolov11 Instance Segmentation.md'
categories:
- AI
tags: []
---
# 🧵 Train YOLO11 cho Instance Segmentation

> Nguồn: `180 - Training Yolov11 Instance Segmentation.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49231787)

Chào các bạn! Bài này mình train **YOLO11** cho **instance segmentation** trên dataset crack detection. Ta sẽ chuẩn bị dataset trên Roboflow, train bằng Python API của Ultralytics (nhanh, ít code), và đọc kết quả trong thư mục `runs`.

### 🚀 Vì sao chọn YOLO11?

YOLO11 là phiên bản mới trong dòng YOLO của **Ultralytics**. Key features:

* **Feature extraction tốt hơn** so với YOLOv8, v10.
* **Tối ưu hiệu quả và tốc độ** (train, inference).
* **Đa năng**: classification, detection, segmentation, pose, OBB.

Có **YOLOv12** dùng **transformer backend** để trích feature, nhưng theo transcript, **YOLO11 vẫn nhỉnh hơn**: inference nhanh hơn và độ chính xác tốt hơn. Vì vậy khoá học chọn YOLO11.

### 🛠️ GitHub hay CLI?

Hai cách dùng YOLO11:

* **GitHub** — khi cần tải source code, đóng góp cho project, truy cập tính năng mới nhất, sửa code, hoặc đọc tài liệu.
* **CLI / package** — khi chỉ cần train, inference, export nhanh mà không viết nhiều Python.

Ta chọn cách thứ hai: `pip install ultralytics` là đủ dependency, rồi dùng Python API:

```python
from ultralytics import YOLO
```

Package pip có thể chậm hơn GitHub vài tính năng mới, nhưng đủ cho train/inference — và các bản cập nhật rồi cũng được đưa lên package.

### 🏷️ Chuẩn bị dataset

Trên **Roboflow**:

1. Tạo **project mới** kiểu **instance segmentation**.
2. Upload ảnh, chọn **manual labeling** cho chính mình.
3. Dùng **polygon tool** hoặc **smart polygon** để vẽ viền object, đặt tên class (ví dụ `person`).
4. Lưu, **Add images to dataset**, chia train/valid.
5. Tạo **version** (có thể bỏ preprocessing/augmentation).
6. Tải về định dạng **YOLOv11** (ZIP).

Dataset thực tế dùng để train là **crack detection** từ Roboflow Universe — một class `crack`, mask đánh dấu các vết nứt trên tường/đường/bê tông.

### 📂 Cấu trúc và `data.yaml`

Sau khi giải nén:

```text
dataset/
  train/{images,labels}
  valid/{images,labels}
  test/{images,labels}
  data.yaml
```

`data.yaml` chứa đường dẫn **train/valid/test** (relative) và:

```yaml
nc: 1
names: [crack]
```

Quan trọng: mỗi split phải có **cả `images` lẫn `labels`**, nếu thiếu sẽ báo lỗi. Thống kê dataset:

* train — **3717** ảnh / **3717** label,
* valid — **200** / **200**,
* test — **112** / **112**.

### 🏋️ Train

```python
from ultralytics import YOLO

model = YOLO("yolo11n-seg.pt")
model.train(
    data="dataset/data.yaml",
    epochs=35,
    imgsz=640,
    batch=4,
    val=True,
    cache="disk",
    plots=True,
    project="YOLO11_test",
    patience=5,
)
```

* **`yolo11n-seg.pt`** — model segmentation size **nano** (weights chỉ khoảng **5.9 MB**). Các size khác: `s/m/l/x-seg`.
* **`cache="disk"`** — cache ảnh/label xuống disk (không phải RAM) để train nhanh hơn.
* **`plots=True`** — sinh confusion matrix, biểu đồ loss…
* **`patience=5`** — nếu loss không cải thiện trong 5 epoch liên tiếp thì dừng sớm (early stopping). Đây là cách tránh train vô ích khi đã tới local minima.
* **`project="YOLO11_test"`** — thư mục lưu kết quả.

Training dùng optimizer **AdamW** (momentum 0.9). Với batch ảnh, các loss được in gồm:

* **box loss**, **segmentation loss**, **classification loss**, **DFL loss**.

Trên T4, mỗi epoch mất khoảng **1 phút 41 giây**, GPU dùng khoảng **1.5 GB**. Mỗi batch có số **instance** khác nhau (tùy ảnh có 1 hay nhiều vết nứt).

### 📊 Đọc kết quả

Trong thư mục project có:

* `weights/` — checkpoint (best/last),
* `results.png` — loss curves,
* **F1 curve**, **confidence curve**, **mask curve**,
* **confusion matrix**,
* `train_batch*.jpg`, `val_batch*_pred.jpg` — ảnh minh hoạ augmentation và dự đoán.

Confusion matrix cho thấy model dự đoán `crack` khá tốt nhưng còn nhầm background, gợi ý dataset còn vấn đề. Điều này bình thường; mục tiêu bài này là nắm **quy trình train**.

---
### ✅ Tóm lại

Quy trình: dataset Roboflow (polygon mask) → `data.yaml` → `YOLO("yolo11n-seg.pt").train(...)` → đọc plots/weights. `patience` giúp early stopping, `plots` giúp đánh giá. Bài sau ta **test/inference** model đã train. Hẹn gặp!
