---
title: 'Bài 163 — Bắt đầu với YOLO (Ultralytics YOLO11)'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 163
status: edited
source: '163 - Getting started with YOLO.md'
categories:
- AI
tags: []
---
# 🚀 Chạy thử YOLO11 với model pre-trained

> Nguồn: `163 - Getting started with YOLO.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49111997)

Chào các bạn! Bài này mình chạy thử **YOLO** ở chế độ inference với model **pre-trained**, chưa huấn luyện gì. Ta sẽ cài **Ultralytics**, chạy các model từ **nano** đến **X** trên cùng một ảnh, rồi so sánh kết quả và tốc độ.

### ⚙️ Cài đặt Ultralytics

Mình dùng môi trường **CPU only** vì bài này chỉ inference, không train nên không cần GPU. Bước đầu tiên là cài package:

```bash
pip install ultralytics
```

Sau đó import và kiểm tra để chắc mọi thứ chạy ổn. Trong lúc chờ cài, mình ghé trang docs chính thức của **Ultralytics YOLO** — tại thời điểm quay bài giảng, docs giới thiệu **YOLO11**, phiên bản mới nhất khi đó trong dòng YOLO real-time detector của Ultralytics, với độ chính xác, tốc độ và hiệu quả được cải thiện.

### 🧩 Các mode và kích thước model

Ultralytics YOLO hỗ trợ nhiều tác vụ: **detection**, **segmentation**, **classification**, **pose**, **OBB**. Bài này chỉ tập trung **detection**. Các mode có sẵn gồm **train**, **val**, **predict**, **export**, **track**, **benchmark**.

Về kích thước, model có các biến thể **n, s, m, l, x** — càng về sau càng lớn, **mAP** càng cao. Nano là nhỏ nhất và nhẹ nhất; X là mạnh nhất (transcript dẫn mAP khoảng **54.7**). Trước khi chạy, mình viết một hàm `visualizer` dùng `cv2.imshow` để hiển thị ảnh dự đoán.

### 🖥️ Chạy inference bằng CLI

Mình dùng **command line interface** của Ultralytics (phần Python usage sẽ có sau). Câu lệnh để predict:

```bash
yolo predict model=yolo11n.pt source=<đường_dẫn_ảnh>
```

Trong đó `yolo` là lệnh, `predict` là tác vụ, `model=yolo11n.pt` chọn model nano, `source` là ảnh đầu vào (có thể là link). Lần đầu chạy, model sẽ được **tải về máy**. Kết quả được lưu trong thư mục `runs/detect/predict`.

Quan sát ảnh kết quả của nano: **nhiều người không được phát hiện** — model nhỏ nên dễ sai sót, dù nhìn chung vẫn khá ổn.

### 🔍 So sánh các model

Mình chạy lần lượt trên **cùng một ảnh** để dễ đối chiếu:

* **n (nano)** — nhẹ nhất, bỏ sót khá nhiều người.
* **s (small)** — ~**9 triệu** tham số, phát hiện thêm người, cả umbrella và chair; tốt hơn nano rõ rệt.
* **m (medium)** — ~**20 triệu** tham số; lần đầu tiên bắt được **potted plant**, thêm nhiều chair, tốt hơn small.
* **l (large)** — số potted plant tăng, thêm person, dining table; lại tốt hơn nữa.
* **x (extra-large)** — model mạnh nhất; bắt được nhiều object nhất, kể cả chiếc bàn (tuy gọi là "table" thay vì "dining table").

Model càng lớn càng nhiều tham số (và thường nhiều layer hơn), nên kết quả tốt hơn — đúng như mAP cao hơn mà docs ghi. Dù vậy, X vẫn bỏ sót một người chỉ lộ phần đầu, cho thấy không model nào hoàn hảo.

### 🧠 Nhận xét về YOLO

YOLO là **single-stage detector**, nên đôi khi phải "thoả hiệp" độ chính xác. Trên các ảnh có **object chồng lấn** nhiều, nó xử lý chưa tốt so với **Faster R-CNN**. Bù lại, tốc độ **real-time** của YOLO vượt trội; các phiên bản gần đây cũng cải thiện độ chính xác khi overlap. `source` không chỉ nhận ảnh mà còn nhận **video**.

---
### ✅ Tóm lại

`pip install ultralytics` rồi `yolo predict model=yolo11n.pt source=...` là cách nhanh nhất để thấy YOLO hoạt động. Model càng lớn càng chính xác nhưng nặng hơn; chọn size phụ thuộc bài toán. Bài sau mình sẽ **train custom** trên dữ liệu riêng. Hẹn gặp các bạn!
