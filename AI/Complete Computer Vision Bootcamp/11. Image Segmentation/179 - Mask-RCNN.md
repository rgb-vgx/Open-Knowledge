---
title: 'Bài 179 — Mask R-CNN và ROI Align'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 179
status: edited
source: '179 - Mask-RCNN.md'
categories:
- AI
tags: []
---
# 🎭 Mask R-CNN: instance segmentation

> Nguồn: `179 - Mask-RCNN.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49231527)

Chào các bạn! Sau semantic segmentation với FCN/U-Net, ta chuyển sang **instance segmentation** với **Mask R-CNN**. Nó dựa trên Faster R-CNN, thêm một nhánh dự đoán **mask**, và thay **ROI pooling** bằng **ROI align** để không mất chi tiết. Cuối bài mình chạy demo bằng PyTorch.

### 🧩 Mask R-CNN là gì?

Mask R-CNN là model cho **instance segmentation**, xây trên nền **Faster R-CNN** (một **two-stage detector**) và mở rộng thêm **nhánh dự đoán mask**. Output gồm ba thứ:

1. **Bounding box**,
2. **Class label**,
3. **Mask**.

Nhờ vậy nó không chỉ nói “đây là car/person” mà còn **tách từng instance** — đếm được có bao nhiêu chiếc xe, điều semantic segmentation không làm được. Ứng dụng: object detection thuần (bỏ mask), instance segmentation, đếm đối tượng.

### 🏗️ Kiến trúc

* **Backbone** (VGG16 hoặc ResNet18/50/101) + **FPN (Feature Pyramid Network)** trích feature map.
* **RPN** sinh **region proposals** (tối đa khoảng 2000).
* **ROI Align** đưa mỗi vùng về kích thước cố định **3×3×512**.
* **Fully connected layers** → hai head: **bbox regression** (4 giá trị `x, y, x, y`) và **softmax classification** (số neuron = số class).
* **Nhánh mask** (mới): từ output ROI Align qua thêm các conv block (ResNet18/50/101), cuối cùng **conv 1×1** với **số channel = số class** để ra mask.

### 🔺 FPN — vì sao cần?

**Feature pyramid** là component phát hiện object ở **nhiều scale**. Ảnh đi qua các tầng downsampling; feature ở tầng sâu mang thông tin trừu tượng, hợp với **object lớn**, còn feature ở tầng sớm giữ chi tiết, hợp với **object nhỏ**. FPN kết hợp các mức này (lấy feature mức sâu rồi gộp với mức nông hơn) để tạo ra các level feature dùng cho dự đoán.

Lý do: kết hợp nhiều mức → phát hiện được nhiều object hơn.

### 🔍 ROI Pooling vs ROI Align

Giả sử input **224×224**, VGG cho feature **16×16×512** — tức **downsample 32 lần**: mỗi pixel feature "nhìn" 32×32 pixel ảnh gốc.

**ROI Pooling** có hai lần mất mát:

1. Toạ độ ROI chia 32 rồi **quantization/làm tròn** để khớp grid 16×16 → mất phần lẻ.
2. Ép vùng bất kỳ về **3×3** → tiếp tục mất thông tin.

**ROI Align** khắc phục:

1. **Bỏ quantization** — không làm tròn toạ độ.
2. Chia ROI thành **3×3 cell**, mỗi cell lấy **4 điểm sampling**, dùng **bilinear interpolation** với các cell lân cận để tính giá trị.
3. Lấy **max** của 4 giá trị trong mỗi cell → ma trận **3×3**.

Nhờ lấy thông tin từ cả vùng xung quanh, ROI Align có **receptive field lớn hơn**, giữ chi tiết — rất quan trọng cho segmentation. Đây là lý do Mask R-CNN dùng **ROI Align** thay **ROI Pooling**.

### 💻 Demo bằng PyTorch

```python
import torch
from torchvision.models.detection import maskrcnn_resnet50_fpn, MaskRCNN_ResNet50_FPN_Weights

weights = MaskRCNN_ResNet50_FPN_Weights.DEFAULT
model = maskrcnn_resnet50_fpn(weights=weights).eval()
```

Model nặng khoảng **170 MB**, train trên **COCO**. Ảnh qua `ToTensor`, `unsqueeze(0)` thành input tensor; chạy trong `torch.no_grad()`. Output nằm ở `output[0]` với `boxes`, `labels`, `scores`, `masks`.

Hậu xử lý:

* Lọc **score > 0.6** (bỏ dự đoán yếu, ví dụ score 0.38).
* Với mask, lấy **> 0.5** để nhị phân hoá.
* Vẽ box + label bằng OpenCV; tạo **colored mask** (`np.zeros_like`) đổ vào một channel, overlay bằng `cv2.addWeighted` lên ảnh gốc.

Kết quả là ảnh với vùng mask màu (ví dụ màu xanh) đúng theo hình dạng người, kèm box và nhãn. Lưu ra `output.png`.

---
### ✅ Tóm lại

Mask R-CNN = Faster R-CNN + nhánh mask + **ROI Align** (không quantization, bilinear sampling). Nó cho cả box, class và mask từng instance. Bài sau ta chuyển sang **YOLO11 instance segmentation** — cách hiện đại, nhanh hơn. Hẹn gặp!
