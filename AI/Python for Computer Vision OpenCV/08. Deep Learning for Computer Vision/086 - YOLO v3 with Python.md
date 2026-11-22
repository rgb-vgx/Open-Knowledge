---
title: 'Chạy YOLO v3 với Python: detect ảnh và video'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 86
status: edited
source: '086 - YOLO v3 with Python.md'
categories:
- AI
tags: []
---

# 🚗 Chạy YOLO v3 với Python trên ảnh và video

> Nguồn: `086 - YOLO v3 with Python.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12510592)

Bài cuối của section: nạp một model YOLO v3 **đã train sẵn** trên COCO và chạy detect trên ảnh do mình chọn. Không train lại — COCO có hơn **1,5 triệu object instance** thuộc **80 category**, train từ đầu sẽ tốn nhiều ngày trên GPU cao cấp, nên dùng weight có sẵn là lựa chọn duy nhất hợp lý. Chỉ riêng weight của mạng đã **hơn 200 MB**.

### 📥 Đặt weight đúng chỗ

1. Tải file `YOLO.h5` (khoảng 200 MB) từ link trong bài giảng.
2. Chép vào `Deep Learning/Computer Vision/YOLO v3/data/` — cùng thư mục với `COCOclasses.txt`.
3. Mở notebook `06-YOLO object detection`.

Trong `data/` còn có `COCOclasses.txt` — danh sách **80 class** của COCO. Có thể xem trực tiếp file này để biết mạng nhận được những gì.

### 🧩 Notebook gồm những gì

Các hàm đã được viết sẵn — tự lập trình lại toàn bộ là không thực tế vì chi phí train quá lớn:

* **`process_image`** — resize ảnh (thu nhỏ hoặc phóng) cho khớp kích thước mà mạng pretrained yêu cầu.
* **`get_classes_file`** — đọc `COCOclasses.txt` để lấy danh sách tên class.
* **`draw(image, boxes, scores, classes)`** — dùng `cv2` vẽ hình chữ nhật quanh vùng phát hiện, kèm nhãn class và phần trăm độ tin cậy.
* **`detect_image`** — gọi model YOLO dự đoán trên ảnh.
* **`detect_video`** — chạy `cv2.VideoCapture`, detect từng frame rồi ghi lại video kết quả. Bản chất là gọi `detect_image` cho **từng frame**, nên chạy sẽ khá lâu.

Bản thân mạng được định nghĩa trong `model/YOLOmodel.py` dưới dạng một **class** để dễ import:

```python
from model.YOLOmodel import YOLO

yolo = YOLO()
```

Class này vừa dựng kiến trúc Keras, vừa chứa phần vẽ box. Khi khởi tạo, nó nạp file H5 200 MB nên mất một lúc; warning "model chưa compile" là bình thường — model chỉ compile khi gọi `detect_image`.

### 🖼️ Detect trên một ảnh của bạn

Một nguồn ảnh miễn phí để thử là **unsplash.com**. Nên tìm những gì nằm trong danh sách class của COCO — ví dụ tìm "person car" để có cả người lẫn xe. Có thể xem trước các class trên **cocodataset.org**.

Lưu ảnh vào `YOLO v3/images/`, ví dụ `people_car.jpeg`, rồi:

```python
img = cv2.imread('images/people_car.jpeg')
yolo.detect_image(img, output_path='images/res/people_car.jpeg')
```

Kết quả lưu vào `images/res/`. Trong lần chạy mẫu (mất khoảng 6 giây):

* Person — **99%**
* Person — **75%** (người bị xe che mất một phần chân)
* Car — **98%**

Hai người còn lại trong ảnh không được phát hiện: một người quay mặt đi, chân bị che; người kia mất gần nửa người. Che khuất làm giảm độ tin cậy rất mạnh — người chỉ mất một chút bàn chân đã tụt từ mức gần như chắc chắn xuống còn 75%.

Thử ảnh thứ hai với bốn người rõ ràng và một hàng xe: mô hình bắt được **ba** người cùng một chiếc **truck** ở tiền cảnh (dù chỉ thấy nửa xe), nhưng bỏ sót người thứ tư.

### 🎚️ Hai ngưỡng có thể chỉnh

Class `YOLO` nhận hai tham số khi khởi tạo:

* **object threshold** — độ tin cậy tối thiểu để coi một box là object. Mặc định trong notebook là **0.6**.
* **NMS threshold** — ngưỡng thứ hai đi kèm.

Hạ object threshold xuống **0.3** rồi detect lại `four_people.jpeg` cho kết quả khác hẳn: người thứ tư được phát hiện với score **0.54** — trước đó bị loại vì dưới 0.6. Đổi lại, ngưỡng thấp dễ sinh ra phân loại nhầm.

Điều thú vị: người đó nhìn rõ không kém ba người còn lại nhưng chỉ được 0.54. Một lời nhắc rằng kể cả các mạng phức tạp cỡ YOLO cũng **không hoàn hảo**.

### 🎥 Video

`detect_video` chạy đúng logic trên cho từng frame rồi ghi lại video kết quả — dùng được để theo dõi người, xe... trong video. Vì phải detect toàn bộ frame nên thời gian chạy tỷ lệ thuận với độ dài video.

Đến đây là hết section Deep Learning: từ machine learning cơ bản, neuron, mạng neural, CNN, Keras, ảnh tự thu thập, cho tới object detection với YOLO. Việc đáng làm tiếp theo là tự thử YOLO với ảnh và video của bạn — chỉnh hai ngưỡng và xem mô hình phản ứng ra sao.
