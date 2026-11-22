---
title: 'Bài 170 — Train YOLO11 trên dataset tùy biến'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 170
status: edited
source: '170 - Custom Object Detection with YOLOv11.md'
categories:
- AI
tags: []
---
# 🚀 Custom Object Detection với YOLO11

> Nguồn: `170 - Custom Object Detection with YOLOv11.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49195929)

Chào các bạn! Bài này mình đi trọn quy trình **custom training** với YOLO11: tải dataset có sẵn annotation, train, validate, inference và export sang định dạng khác để chạy nhanh hơn. Mình dùng **Google Colab** với GPU **T4**.

### 🧰 Chuẩn bị môi trường

1. Chọn runtime **GPU T4** (đủ cho bài này).
2. Cài Ultralytics bằng `pip install ultralytics` — mất hơn một phút.
3. Chọn dataset và tải về.

Dataset mình lấy từ **Roboflow Universe** (kho khổng lồ, hơn 5 triệu dataset và 350 triệu ảnh). Mình chọn bộ **rock-paper-scissors** với **3 class**: `rock`, `paper`, `scissors`. Dataset đã được **annotate sẵn**, không cần tự gán nhãn. Tải theo định dạng **YOLOv11** (file ZIP), upload lên Google Drive, mount Drive trong Colab rồi giải nén.

Sau khi giải nén, thư mục có các folder `train`/`valid`/`test` (bên trong là `images`) cùng file **`data.yml`** — file quan trọng nhất. Mở ra sẽ thấy đường dẫn tới train/valid/test và `nc` (number of classes) = 3.

### 📝 Chỉnh `data.yml`

Mình đổi các đường dẫn sang **absolute path**, trỏ vào thư mục `images` của từng split:

```yaml
train: /content/drive/MyDrive/YOLO_datasets/train/images
val: /content/drive/MyDrive/YOLO_datasets/valid/images
test: /content/drive/MyDrive/YOLO_datasets/test/images
nc: 3
names: [rock, paper, scissors]
```

Nếu dùng relative path thì phải đảm bảo dataset nằm đúng chỗ; dùng absolute path an toàn hơn.

### 🏋️ Train bằng CLI

```bash
yolo train model=yolo11m.pt data=/content/drive/MyDrive/YOLO_datasets/data.yml epochs=25 imgsz=640
```

Mình chọn model **medium (`m`)** — không quá nhỏ như nano/small, cũng không nặng như large/X. Tham số:

* `epochs=25` — số vòng huấn luyện,
* `imgsz=640` — ảnh được resize về 640.

Dataset khá lớn: khoảng **6445 ảnh train** và **576 ảnh validation**. Trên T4, 25 epoch mất hơn **90 phút** (khoảng 1.6 giờ), GPU dùng gần **8 GB**. Logging mặc định qua **TensorBoard**, và YOLO11 còn tích hợp **Comet ML**.

Kết quả lưu trong `runs/detect/train`: có `last.pt` (epoch cuối) và **`best.pt`** (epoch có loss thấp nhất).

### ✅ Validate và predict

Validate có thể chạy tự động trong lúc train, nhưng vẫn có thể làm thủ công:

```bash
yolo val model=runs/detect/train/weights/best.pt data=/content/drive/MyDrive/YOLO_datasets/data.yml
```

Predict:

```bash
yolo predict model=runs/detect/train/weights/best.pt source=<đường_dẫn_ảnh>
```

Ảnh kết quả lưu ở `runs/detect/predict`; model nhận diện đúng các nắm tay (rock).

### 📦 Export để inference nhanh hơn

Model mặc định là PyTorch (`.pt`), nhưng có thể export sang định dạng khác:

```bash
yolo export model=best.pt format=onnx
yolo export model=best.pt format=engine
```

* **ONNX** — hợp cho inference trên **CPU**, chạy với ONNX Runtime (nhanh hơn nhiều so với PyTorch thuần).
* **engine** — định dạng **TensorRT**, tận dụng GPU cho tốc độ rất cao; cần cài `tensorrt` và `onnxruntime-gpu`.
* Ngoài ra còn OpenVINO cho CPU.

### 🐍 Cách dùng bằng Python

Nếu không muốn gõ CLI, dùng Python API:

```python
from ultralytics import YOLO

model = YOLO("yolo11n.pt")          # model pre-trained
model.train(data=".../data.yml", epochs=1)
results = model.predict(source=".../image.jpg")
```

Mình chạy thử với **nano** chỉ 1 epoch (3–4 phút) để minh hoạ. Dù train ít, model vẫn phát hiện được các nắm tay — đủ thấy pipeline hoạt động.

---
### ✅ Tóm lại

Quy trình: dataset có annotation → `data.yml` → `yolo train` (CLI hoặc Python API) → `val` → `predict` → `export`. Nhớ chọn model size và số epoch phù hợp tài nguyên. Các bạn thử với dataset khác nhé. Hẹn gặp ở bài sau — custom detection với Detectron2!
