---
title: 'Lộ trình khóa học Computer Vision với OpenCV'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 3
status: edited
source: '003 - Course Curriculum Overview.md'
categories:
- AI
tags: []
---

# 🧭 Lộ trình khóa học Computer Vision với OpenCV

> Nguồn: `003 - Course Curriculum Overview.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257464)

Trước khi bước vào phần kỹ thuật, mình muốn các bạn nắm được bức tranh tổng thể: khóa học đi qua những chặng nào, vì sao lại bắt đầu từ những thứ nhỏ nhất, và mỗi chặng chuẩn bị cho điều gì. Hiểu lộ trình sẽ giúp các bạn không bị hụt hẫng khi thấy mình chưa làm được ngay một ứng dụng thực tế.

### 🎯 Mục tiêu của khóa học

Mục tiêu lớn nhất là các bạn hiểu được các ứng dụng **computer vision**, và càng học càng nối được kiến thức với ứng dụng thực tế — ví dụ tự viết phần mềm làm mờ biển số xe (license plate blurring), hay hiểu cách **deep learning** phân loại ảnh hoạt động ra sao.

Mục tiêu thứ hai là biết dùng **OpenCV** và **Python** để làm việc với **image** và **video**, quan trọng hơn là áp dụng được vào dự án của chính mình.

Điểm mấu chốt: nếu nhảy thẳng vào deep learning, các bạn có thể làm được đúng những project trong khóa, nhưng sẽ thiếu kỹ năng để tự triển khai trên dữ liệu riêng. Vì vậy khóa học xây dựng từ nền tảng đi lên, để cuối khóa các bạn thật sự làm chủ được công cụ.

---

### 🐍 Chặng đầu tiên: NumPy

Khóa học mở màn bằng thư viện **NumPy** — thứ mà sau này mọi dữ liệu ảnh đều được biểu diễn bằng nó. Nếu các bạn đã học các khóa khác của mình thì có thể đã quen NumPy, nhưng ở đây chỉ tập trung đúng hai việc:

1. Làm việc với **array**, gồm cả **slicing** và **indexing** — đây là kiểu dữ liệu chính mà NumPy nắm giữ.
2. Đọc và hiển thị **image** bằng NumPy.

---

### 📷 Image basics với OpenCV

Sau NumPy là phần image basics với thư viện **OpenCV** (Open Computer Vision). Ở đây các bạn bắt đầu làm việc với những thao tác ảnh cơ bản nhất, ví dụ vẽ lên ảnh bằng những lệnh đơn giản.

Khi đã nắm nền tảng của cả NumPy lẫn OpenCV và biết làm việc với ảnh bằng hai thư viện này, khóa học mới chuyển sang các chức năng **image processing** phức tạp và nâng cao hơn — những thao tác thực sự hữu ích cho ứng dụng thực tế.

---

### 🎥 Video processing

Khi đã xử lý ảnh ổn, các bạn quay lại từ đầu nhưng lần này với dữ liệu **video**: làm việc với các file video có sẵn như **MP4** hay **AVI**, và cả video streaming từ **webcam** — tất cả đều qua OpenCV.

---

### 🔍 Object detection và object tracking

Tiếp theo là **object detection**: học nhiều phương pháp phát hiện đối tượng trong ảnh và video. Khóa học đi từ **template matching** cơ bản — cho một ảnh, tìm xem nó nằm ở đâu trong một ảnh lớn hơn — rồi tiến dần lên **face detection**, tức phát hiện khuôn mặt trong ảnh và video.

Sau detection là **object tracking**, mở rộng trực tiếp từ phần trước: detection cho phép phát hiện trong một ảnh đơn, còn tracking giúp duy trì việc phát hiện đó qua nhiều **frame** và theo dõi đối tượng trong video.

---

### 🧠 Deep learning cho computer vision

Phần gần cuối là **deep learning** trong computer vision. Đây là lúc kết hợp toàn bộ kiến thức các phần trước với những công cụ, thư viện hiện đại như **Keras** và **TensorFlow** để làm các ứng dụng deep learning tiên tiến. Các bạn cũng sẽ tải về những **neural network** hiện đại để thực hiện **image classification** trên bộ dữ liệu của riêng mình.

Toàn bộ khóa học là một quá trình tích lũy rất từ từ. Mình biết nhiều bạn muốn nhảy ngay vào deep learning, nhưng những chủ đề này khá nâng cao — cứ đi chậm và chắc thì cuối cùng các bạn mới áp dụng được vào dự án thật.

---

### ✅ Tóm lại

Lộ trình đi theo thứ tự: **NumPy → image basics với OpenCV → image processing nâng cao → video → object detection → object tracking → deep learning**. Mỗi chặng là viên gạch cho chặng sau. Bài tiếp theo sẽ giúp các bạn cài đặt mọi thứ cần thiết để mở notebook và chạy được môi trường của khóa học.
