---
title: 'Bài 182 — Tổng quan dự án Image Search với YOLO'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 182
status: edited
source: '182 - Project Intro Overview.md'
categories:
- AI
tags: []
---
# 🛰️ Dự án: Image Search bằng Computer Vision

> Nguồn: `182 - Project Intro Overview.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/52794353)

Chào các bạn! Đây là bài mở đầu **Project 001**: xây ứng dụng **image search** tìm ảnh theo *nội dung*. Thay vì tìm theo tên file, ta tìm "ảnh có con chó", "ảnh có hai con chó", "ảnh có frisbee", hay "ảnh có cả chó lẫn frisbee". Bài này mình demo sản phẩm hoàn chỉnh và phác thảo các phần sẽ làm.

### 🎯 Ý tưởng

Ứng dụng cho phép **tìm kiếm ảnh theo thứ có trong ảnh**. Có hai kiểu điều kiện:

* **OR** — ảnh chứa *bất kỳ* class nào được chọn (dog **hoặc** cat).
* **AND** — ảnh chứa *đồng thời* các class (dog **và** frisbee trong cùng ảnh).

Ta còn giới hạn được **số lượng** object, ví dụ tối đa 1 `apple` và tối đa 4 `bus`.

---

### 🧠 Công nghệ

* **YOLO11** cho object detection — theo góc nhìn giảng viên, YOLO11 có nhiều khả năng vượt trội dù YOLOv12 đã ra mắt.
* Model **base YOLO**, nhận diện **80 class COCO**.
* Dữ liệu demo: **500 ảnh COCO** tải từ website COCO.
* Ứng dụng chạy **local**, inference trên **GPU**, phục vụ ở **localhost:8501** (port mặc định của Streamlit).

Vì chạy local và có GPU, quá trình inference rất nhanh.

---

### 🔄 Hai chế độ: xử lý ảnh mới hay nạp metadata

1. **Process new images** — nhập **project path** (thư mục 500 ảnh), bấm **Start Inference**. Hệ thống chạy object detection trên toàn bộ ảnh và sinh ra **`metadata.json`**.
2. **Load metadata** — nhập đường dẫn tới `metadata.json` có sẵn. Không cần chạy lại inference.

Điểm hay: `metadata.json` **chia sẻ được** cho đồng nghiệp/teammate, họ dùng ngay mà không phải inference lại. Khi nạp thành công, giao diện báo "successfully loaded metadata for 500 images".

---

### 🔍 Giao diện tìm kiếm

* Chọn các class từ danh sách lấy ra từ `metadata.json` (ví dụ `apple`, `bus`).
* Chọn điều kiện **Any (OR)** hoặc **All (AND)**.
* Đặt **số lượng tối đa** cho mỗi class (ví dụ tối đa 1 apple, tối đa 4 bus).
* Bấm **Search** → hiển thị các ảnh khớp kèm **bounding box** và **confidence** (ví dụ Apple 61%), cùng **count** object trong ảnh.

Có checkbox **highlight matching classes**: bật thì chỉ tô các class đã chọn; tắt thì hiện mọi class model dự đoán (banana, person, refrigerator, bottle… — đều thuộc COCO).

---

### 📤 Xuất kết quả

Cuối trang có **Export**. Bấm **Download results** để tải JSON chỉ gồm các ảnh khớp. Mỗi ảnh có `detections` với **confidence, class, box** và **count**. File này hữu ích để:

* gửi cho team annotation,
* chuẩn bị dữ liệu cho phiên bản model tiếp theo,
* tái sử dụng cho pipeline khác.

---

### 🧱 Phạm vi kỹ thuật

Vì là AI engineer, ta **không** làm front-end từ đầu — **CSS đã dựng sẵn**. Trọng tâm là:

* **backend** và **modular coding** bằng Python,
* đọc/ghi **metadata JSON**,
* chạy **inference**,
* tổ chức luồng dữ liệu cho ứng dụng.

Dự án giúp các bạn luyện cả computer vision, phát triển ứng dụng lẫn thiết kế UI ở mức tổng thể.

---
### ✅ Tóm lại

Ta sẽ xây một search engine ảnh: inference 500 ảnh bằng YOLO11 → `metadata.json` → lọc theo class/số lượng với điều kiện OR/AND → hiển thị box + confidence → export JSON. Các bài tiếp theo sẽ đi từng bước: cài đặt, Streamlit, luồng dự án và ba phase implementation. Hẹn gặp!
