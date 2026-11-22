---
title: 'Bài 085 — Giới thiệu OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 85
status: edited
source: '085 - Introduction to OpenCV.md'
categories:
- AI
tags: []
---

# 👁️ OpenCV và vị trí của nó trong computer vision

> Nguồn: `085 - Introduction to OpenCV.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48420803)

Chào các bạn! Bài này mình sẽ mở màn chặng **OpenCV** bằng hai câu hỏi: computer vision làm được những gì, và **OpenCV** nằm ở đâu trong bộ công cụ của người làm computer vision. Mình sẽ bắt đầu từ một ví dụ đời thường rồi đi dần xuống bức tranh kỹ thuật.

### 📱 Computer vision mạnh tới mức nào?

Hãy tưởng tượng bạn đang lướt Instagram và bắt gặp một chiếc váy đẹp. Bạn muốn biết mua ở đâu, giá bao nhiêu, có màu khác không — nhưng hiện tại bạn chưa biết gì cả. Thay vì đi hỏi từng cửa hàng, bạn chỉ cần chụp ảnh và đưa vào một app có AI như **Google Lens**, **Apple Visual Intelligence** hay **Bixby Vision**. Nó cho bạn biết nơi bán, giá trên nhiều website, thậm chí cả các màu khác. Đó chính là sức mạnh của computer vision.

Nhưng một robot "nhìn" khác con người ra sao? Con người thấy màu sắc — núi, trời xanh, hoa hồng. Còn robot chỉ thấy **những con số**. Một bức ảnh con chó được camera biến thành ma trận số, rồi thuật toán computer vision phân tích để trả về những thông tin hữu ích:

* Màu của con chó hay vật thể trong ảnh.
* Phân loại trong ảnh có chó hay mèo.
* Đếm xem có bao nhiêu con chó và chúng nằm ở đâu.
* **Segmentation** — tách từng vùng, sẽ học ở các bài sau.

---

### ⚽ Từ ảnh tĩnh tới video và hiệu ứng

Nâng lên một mức, khi phân tích một trận bóng, computer vision có thể phát hiện cầu thủ và theo dõi chuyển động của họ. Chưa hết — nó còn theo dõi được cả quả bóng: chiếc hộp đỏ bám theo bóng vì thuật toán dựa vào **vận tốc** và **quỹ đạo trước đó** để dự đoán bóng sẽ ở đâu trong khung hình **t + 1**. Nhờ vậy mới xử lý được các pha tranh cãi kiểu việt vị: tất cả nằm trong dữ liệu.

Với ảnh chân dung, các thuật toán phức tạp như **segmentation** cho phép làm mờ hậu cảnh kiểu **portrait mode** ngay trên ảnh thường, tăng độ mờ cho kịch tính hơn, thay hẳn hậu cảnh (ví dụ "ngồi chơi ở Paris"), hoặc đơn giản là chuyển ảnh màu sang **đen trắng**. Từ detection, segmentation, tracking cho tới filter grayscale — computer vision làm được hết.

---

### 🧰 Ba tầng công cụ của computer vision

Ma thuật cần công cụ. Mình hình dung computer vision ở giữa, xung quanh là ba tầng:

| Tầng | Công cụ | Vai trò |
|---|---|---|
| **1 — Nền tảng ảnh** | **OpenCV**, **scikit-image**, **Pillow** | Các phương thức cơ bản để xử lý bài toán thị giác |
| **2 — Deep learning** | **PyTorch**, **TensorFlow** | Định nghĩa kiến trúc mạng, data pipeline để train model; vẫn dựa trên các thư viện tầng 1 |
| **3 — Bài toán cụ thể** | **Hugging Face**, **Detectron2**, **YOLO**, **fast.ai** | Lớp bọc trên PyTorch/TensorFlow cho detection, classification, segmentation... |

Tầng 1 lo phần nền tảng của chính bức ảnh, tầng 2 lo framework deep learning, tầng 3 giải các bài toán như object detection, classification, segmentation.

---

### 🎯 Vì sao chọn OpenCV?

Có một nguyên tắc: **dùng nơi luật lệ tốt hơn học máy**. Việc gì giải được bằng logic thì không cần tới machine learning hay deep learning. Computer vision cũng vậy — bài nào giải được bằng computer vision truyền thống thì không nên đem deep learning vào.

Về độ mạnh, tốc độ và cộng đồng, **OpenCV** nổi bật so với các đối thủ. Nó làm được:

* Đọc và ghi ảnh lẫn video.
* **Edge detection**, theo dõi vật thể (như ví dụ bóng đá ở mức đơn giản).
* Thao tác ảnh: crop, xoay, lật, thêm nhiễu.
* **Đa nền tảng**: chạy trên Linux, Mac, Windows; ban đầu viết cho C++ rồi mới có binding Python.
* **Augmented reality**: filter Snapchat như ria mép, mũ, tóc đổi màu, hình xăm.
* Phát hiện khuôn mặt và các **key point** trên mặt.
* **Color filtering** — loại bỏ một vùng màu và thay bằng đối tượng khác.
* **Object detection** — như phát hiện cầu thủ trên sân.

---

### ✅ Ranh giới: OpenCV không làm được tất cả

Cần thành thật: tracking, object detection hay augmented reality của OpenCV chạy được vì kịch bản còn **ít phức tạp**. Khi độ phức tạp tăng lên, những công cụ này sẽ không đủ — lúc đó cần **deep learning**, vốn được sinh ra cho việc **generalization** bài toán.

Vì thế, OpenCV hôm nay thường nằm trong **hệ hybrid**: OpenCV lo các tác vụ cơ bản (resize, edge detection, đọc ảnh, đọc từ stream video/camera), còn deep learning lo phần phức tạp như hiểu cảm xúc trên khuôn mặt. Hiểu rõ ranh giới này sẽ giúp các bạn chọn đúng công cụ ở các bài tiếp theo, khi chúng ta bắt tay vào đọc, hiển thị và ghi ảnh bằng OpenCV.
