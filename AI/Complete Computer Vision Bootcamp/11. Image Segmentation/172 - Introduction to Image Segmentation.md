---
title: 'Bài 172 — Image Segmentation là gì?'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 172
status: edited
source: '172 - Introduction to Image Segmentation.md'
categories:
- AI
tags: []
---
# 🎨 Image Segmentation: hiểu từng pixel

> Nguồn: `172 - Introduction to Image Segmentation.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49214081)

Chào các bạn! Đây là bài mở đầu module **segmentation**. Ta đã đi qua image classification và object detection; giờ mình giải thích **image segmentation** là gì, nó giải quyết vấn đề gì, và ba loại segmentation khác nhau — **semantic**, **instance**, **panoptic**.

### 📖 Định nghĩa

**Image segmentation** là kỹ thuật computer vision **chia ảnh thành nhiều segment/region** để đơn giản hoá biểu diễn và làm phân tích có ý nghĩa hơn.

Hãy nhớ lại hai bài toán cũ:

* **Image classification** — đưa ảnh vào CNN, nhận một **label** cho cả ảnh (dog, cat, person…).
* **Object detection** — đưa ảnh vào detector, nhận **nhiều** entity, mỗi entity gồm `xyxy` (box), **confidence** và **class label**. Ảnh có 2 con chó thì nhận 2 box cho chó.

Còn segmentation **gán nhãn cho từng pixel**, tạo **mask** mô tả chính xác hình dạng object. Nói cách khác: **classification ở mức pixel**.

---

### 🔍 Vì sao cần segmentation?

Ảnh được cấu tạo từ nhiều pixel. Trong segmentation, mỗi pixel được phân loại thuộc `dog`, `cat`, hay `person`.

Với object detection, box bao quanh con chó vẫn **chứa cả pixel không phải chó** (nền, vật khác). Segmentation biết chính xác **pixel nào thuộc object nào** — đó là "thực sự nhìn thấy thế giới". Ví dụ xe tự hành: box quanh xe và người có thể lẫn cả đường, cây, vật che khuất; mask thì không.

Ba nhóm vấn đề segmentation giải quyết:

1. **Ranh giới object chính xác** — hiểu hình dạng và đường viền (contour).
2. **Tách foreground/background** — phân biệt rõ vùng cần và không cần.
3. **Feature detection** — trích đặc trưng chi tiết cho các **downstream task**.

---

### 🌍 Ứng dụng thực tế

* **Medical imaging** — nơi segmentation được dùng nhiều nhất.
* **Xe tự hành** — biết xe có đúng làn không, hiểu môi trường quanh xe.
* **Nông nghiệp** — phát hiện bệnh trên cây, đo diện tích lá bị ảnh hưởng.
* **Ảnh vệ tinh** — phân loại land cover: rừng, nước, nhà, chính xác từng pixel.
* **Augmented reality** — đặt vật thể ảo đúng vị trí trong cảnh thật.

---

### 🧪 Từ thresholding đến segmentation thật

Trong module OpenCV, ta đã làm một dạng segmentation đơn giản: ảnh grayscale, nếu pixel **> threshold** thì gán 1, ngược lại 0 — tạo **mask** chỉ gồm hai giá trị 0/1, dùng để tách nền. Nhưng cách này **không tách được người**: không có một ngưỡng duy nhất nào cho người. Vì vậy ta cần **thuật toán CV** phân loại từng pixel thành person, dog, cat… tuỳ dataset.

---

### 🧩 Ba loại segmentation

**1. Semantic segmentation** — phân loại mỗi pixel vào một **category**.
Đầu ra là một **ảnh mask** cùng kích thước ảnh gốc (hoặc nhỏ hơn tuỳ kiến trúc), có thể là **binary** hoặc **multi-label**. Tất cả person cùng một nhãn (ví dụ 1/trắng), background là 0/đen; các class khác nhau có màu khác nhau. 10 chiếc xe đều chung nhãn 2.

**2. Instance segmentation** — làm mọi thứ semantic làm, **cộng thêm** việc tách từng **instance riêng lẻ**. Nó hoạt động như object detection rồi sinh thêm **mask**: output gồm **bbox + class + mask**. Nhờ đó ta **đếm được** số người trong ảnh, điều semantic không làm được. Instance segmentation **không** phân loại background vì chỉ xử lý vùng trong box.

**3. Panoptic segmentation** — **kết hợp** instance + semantic. Phân loại pixel-level trên **toàn bộ ảnh** (kể cả background) đồng thời giữ thông tin instance. Không bắt buộc có box.

Tóm gọn quan hệ:

* Instance segmentation = **object detection + semantic segmentation**.
* Panoptic segmentation = **instance + semantic**.

---

### 🏭 Dùng loại nào trong thực tế?

Phần lớn use case dùng **instance** hoặc **semantic**; **panoptic** khó xây và bảo trì, use case hạn chế (xe tự hành, robotics, scene parsing). Một lợi thế quan trọng: từ **instance** có thể **chuyển thành semantic** bằng post-processing (các instance cùng class gán cùng màu), nhưng từ **semantic không chuyển được** ngược lại vì thiếu thông tin instance. Vì vậy mình khuyên dùng instance segmentation khi có thể.

---
### ✅ Tóm lại

Segmentation = phân loại từng pixel; semantic gán nhãn theo class, instance tách từng đối tượng kèm mask, panoptic gộp cả hai. Bài sau ta sẽ học **downsampling** — nền tảng kiến trúc của các mạng segmentation. Hẹn gặp!
