---
title: 'Bài 166 — R-CNN: bước ngoặt của Object Detection'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 166
status: edited
source: '166 - RCNN.md'
categories:
- AI
tags: []
---
# 🕰️ R-CNN — đưa deep learning vào Object Detection

> Nguồn: `166 - RCNN.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49150727)

Chào các bạn! Bài này mình mổ xẻ **R-CNN** — kiến trúc năm 2014 đánh dấu lần đầu deep learning được đưa vào object detection. Ta sẽ xem nó ghép CNN với selective search ra sao, pipeline chạy thế nào, và vì sao nó nhanh chóng bị thay thế.

### 📜 Trước R-CNN: thời của CV cổ điển

Trước 2014, object detection dùng các phương pháp **computer vision truyền thống**, không có deep learning:

* **HOG (Histogram of Oriented Gradients)**
* **SIFT (Scale-Invariant Feature Transform)**
* **Selective search**

Nhược điểm chung: **không chính xác và không hiệu quả**. R-CNN ra đời giữ lại selective search nhưng thêm **CNN** — tức đưa deep learning vào.

---

### 🧩 Bài toán: classification + regression

Object detection gồm hai phần:

* **Localization** — tìm toạ độ object, bản chất là **regression**.
* **Classification** — xác định object là gì.

R-CNN tách việc rõ ràng: **CNN trích feature**, còn **region proposal** (selective search) lo việc đề xuất vùng nghi có object.

---

### 🔄 Pipeline của R-CNN

1. **Region proposal** — selective search đề xuất khoảng **2000 candidate object locations** dưới dạng bounding box. Đây chỉ là *ứng viên*: có thể có object, có thể không.
2. **Resize** — mỗi vùng được đưa về kích thước cố định mà CNN yêu cầu, ví dụ **224×224×3** với **VGG** (hoặc **AlexNet**).
3. **CNN feature extraction** — từng vùng đi qua CNN để trích feature.
4. **Classification bằng SVM** — feature được đưa qua **Support Vector Machine** để phân loại. Đây là kỹ thuật cũ, không phải softmax.
5. **Bounding box regression** — một model regression **tinh chỉnh toạ độ** box cho khớp object.

Kết quả cuối là ghép phần classification và phần localization.

---

### ⚠️ Ba hạn chế lớn

* **Inference chậm** — phải xử lý tuần tự 2000 vùng qua CNN. Trên GPU mất khoảng **50 giây/ảnh**, trên CPU gần **2 phút** — không thể real-time.
* **Tốn bộ nhớ** — feature được trích và lưu cho **từng vùng riêng lẻ**, tức 2000 bộ feature.
* **Không train end-to-end** — region proposal, feature extraction và classification được **train tách rời** rồi ghép lại, khiến pipeline kém hiệu quả.

---

### 🧭 Vì sao vẫn phải học R-CNN?

R-CNN đã **deprecated**, khoá học không thực hành kiến trúc này. Nhưng hiểu nó giúp các bạn thấy **object detection tiến hoá từng bước** thế nào. Thực hành trong khoá sẽ tập trung vào **Faster R-CNN** (chạy trực tiếp qua framework **Detectron** của Facebook) và các kiến trúc **YOLO**.

---
### ✅ Tóm lại

R-CNN = selective search (2000 vùng) + CNN trích feature + SVM phân loại + bbox regression. Ý tưởng đột phá nhưng chậm, tốn bộ nhớ và không end-to-end. Bài sau ta xem **Fast R-CNN** sửa những điểm này ra sao. Hẹn gặp!
