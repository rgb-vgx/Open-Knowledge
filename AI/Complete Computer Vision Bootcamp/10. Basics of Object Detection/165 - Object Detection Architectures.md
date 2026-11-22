---
title: 'Bài 165 — Các kiến trúc Object Detection'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 165
status: edited
source: '165 - Object Detection Architectures.md'
categories:
- AI
tags: []
---
# 🏗️ Ba họ kiến trúc Object Detection

> Nguồn: `165 - Object Detection Architectures.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49150695)

Chào các bạn! Qua nhiều năm, object detection đã sinh ra rất nhiều kiến trúc, mỗi cái cải thiện độ chính xác, tốc độ và độ bền. Bài này mình phân loại chúng thành **ba họ**: **two-stage**, **one-stage** và **transformer-based**, và điểm qua từng kiến trúc tiêu biểu.

### 🧭 Hai việc song song: classification và localization

Trong object detection có hai nhiệm vụ diễn ra song song:

* **Classification** — xác định *object là gì*.
* **Localization** — xác định *object nằm ở đâu*, thường qua bounding box.

Mọi kiến trúc bên dưới đều xoay quanh việc giải hai bài toán này.

### 🐢 Họ Two-Stage Detectors

Đặc điểm chung: dùng **region proposal** để đề xuất vùng nghi có object, rồi mới phân loại. Chúng chậm, **không real-time**, nhưng **độ chính xác cao** hơn one-stage.

**R-CNN (2014)** — tác giả chính là **Girshick**. Kiến trúc dùng **selective search** (một phương pháp CV cổ điển, không thuần deep learning) để chọn nhiều vùng trong ảnh, rồi đưa từng vùng qua **CNN**.

**Fast R-CNN (2015)** — cùng tác giả, phát triển từ R-CNN và **nhanh hơn nhiều** cả lúc train lẫn inference. Điểm mấu chốt là **ROI pooling**, giúp trích xuất feature và **chia sẻ convolution feature map**. Nhược điểm vẫn còn: region proposal vẫn dùng **selective search**.

**Faster R-CNN (2015)** — thay **selective search** bằng **RPN (Region Proposal Network)**, đưa region proposal vào deep learning. Nhanh hơn Fast R-CNN, và đến nay vẫn được dùng trong các framework như **Detectron**. Hạn chế: **không real-time**, tốc độ inference thấp.

**Mask R-CNN (2017)** — thêm **nhánh thứ ba** cho **segmentation** (phân loại từng pixel), bên cạnh classification và localization. Dùng cho **instance segmentation**, nhưng vẫn làm được object detection. Đây là kiến trúc rất phổ biến cho bài toán segmentation.

### ⚡ Họ One-Stage Detectors

One-stage **bỏ hẳn bước region proposal**, dự đoán trực tiếp bounding box và class label — nhờ vậy nhanh hơn nhiều.

**YOLO — You Only Look Once (2016)** — tác giả chính **Redmon**; nay là một *họ* với nhiều phiên bản từ v1 đến các bản mới nhất (transcript nhắc tới v12). Một-stage nên cực nhanh.

**SSD — Single Shot MultiBox Detector (2016)** — rất nhanh, **xử lý object nhỏ tốt hơn** Faster R-CNN (vốn yếu ở object nhỏ). Được dùng rộng rãi đến khoảng 2019–2020. Nhược điểm: **kém chính xác hơn** Faster R-CNN.

**RetinaNet (2017)** — dùng **FPN (Feature Pyramid Network)** và **multi-scale detection**. Ưu điểm: **độ chính xác cao với tốc độ real-time**; cân bằng precision/recall tốt hơn YOLO và SSD thời đó. Nhược điểm: **tốn tính toán hơn YOLO**. Tuy vậy, các bản YOLO mới (như YOLO11 dùng trong khoá) đã thu hẹp khoảng cách.

| Kiến trúc | Năm | Đặc điểm chính |
|---|---|---|
| R-CNN | 2014 | selective search + CNN |
| Fast R-CNN | 2015 | ROI pooling, nhanh hơn R-CNN |
| Faster R-CNN | 2015 | RPN thay selective search |
| Mask R-CNN | 2017 | thêm nhánh segmentation |
| YOLO | 2016 | one-stage, real-time |
| SSD | 2016 | nhanh, tốt với object nhỏ |
| RetinaNet | 2017 | FPN, multi-scale |

### 🤖 Họ Transformer-Based

Đây là hướng mới, dựa trên **transformer** — nặng về layer và tham số.

**DETR (Detection Transformer, 2020)** — do **Facebook AI** giới thiệu. Dùng **CNN** để trích feature, rồi **encoder–decoder transformer** với **self-attention** để tìm quan hệ giữa các object. DETR **loại bỏ NMS (Non-Max Suppression)** và **anchor**, cho phép **end-to-end detection** không anchor. Nhược điểm: **rất tốn tính toán**, không real-time.

**Deformable DETR (2021)** — dùng **deformable attention** để chỉ tập trung vào **vùng liên quan**, giúp DETR hiệu quả hơn.

**DINO** — viết tắt của *DETR with Improved deNoising anchOr boxes* (transcript mô tả là "DETR with improved noisy optimization"). DINO cải thiện **hội tụ khi train** và **độ chính xác detection**.

---
### ✅ Tóm lại

Two-stage (R-CNN → Faster R-CNN → Mask R-CNN) chính xác nhưng chậm; one-stage (YOLO, SSD, RetinaNet) nhanh, phù hợp real-time; transformer (DETR, Deformable DETR, DINO) end-to-end, bỏ anchor/NMS nhưng nặng. Còn **CenterNet** cũng tồn tại nhưng ít dùng nên mình không đưa vào. Bài sau ta mổ xẻ từng kiến trúc, bắt đầu với **R-CNN**. Hẹn gặp!
