---
title: 'OpenCV là gì và mục tiêu của section Image Basics'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 11
status: edited
source: '011 - Introduction to Images and OpenCV Basics.md'
categories:
- AI
tags: []
---

# 📷 Bắt đầu với OpenCV — mở ảnh và vẽ lên ảnh

> Nguồn: `011 - Introduction to Images and OpenCV Basics.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12291386)

Chào các bạn đến với section Image Basics. Đây là lúc mình bắt đầu dùng thư viện **OpenCV** để mở ảnh và vẽ lên ảnh, rồi từ từ đi lên những chức năng lớn hơn như object detection và object tracking.

### 👁️ Computer vision và OpenCV

**Computer vision** hiểu đơn giản là dùng máy tính để phân tích ảnh và video, theo cách gần giống con người nhìn một tấm ảnh — ví dụ xác định khuôn mặt của ai đó trong ảnh.

**OpenCV** viết tắt của **Open Source Computer Vision Library**, là một thư viện các hàm lập trình chủ yếu nhắm tới computer vision thời gian thực.

### 🕰️ Xuất xứ C++ và Python bindings

* OpenCV được Intel tạo ra từ năm **1999**.
* Thư viện được viết bằng **C++**, và vẫn đang được viết bằng C++.
* Trong khóa học, mình dùng **Python bindings** để gọi OpenCV trực tiếp từ Python, kết hợp được với các thư viện như **NumPy** hay **Matplotlib**.

Một điều cần lưu ý: khi các bạn Google tutorial về OpenCV, rất nhiều tài liệu vẫn là C++ chứ chưa phải Python. Người mới hay bối rối vì mở code ra thấy một ngôn ngữ hoàn toàn khác. Cả Python và C++ đều có tài liệu đầy đủ, chỉ cần để ý mình đang đọc bản nào.

### 🧠 Những gì đã có sẵn trong thư viện

OpenCV chứa sẵn nhiều thuật toán computer vision phổ biến, bao gồm cả các thuật toán **object detection** và **object tracking**. Vì vậy lộ trình của khóa là đi từ việc mở file, vẽ hình, rồi mới tiến tới hiểu cách thực hiện detection và tracking.

### 📚 Đọc tài liệu đúng ngôn ngữ

OpenCV có tài liệu đầy đủ cho cả **Python** và **C++**. Vì C++ vẫn rất phổ biến, khi tra Google các bạn sẽ gặp nhiều đoạn code C++ trông khác hẳn Python. Chỉ cần để ý mình đang đọc bản nào là đủ; đừng vội nghĩ rằng tài liệu sai.

### 🎯 Mục tiêu của section

1. Mở file ảnh bằng OpenCV trong cả **notebook** lẫn **Python script** — lý do khóa dùng JupyterLab là để có đủ cả hai môi trường.
2. Vẽ các hình học đơn giản lên ảnh. Khi làm object tracking, ta thường muốn đánh dấu vật thể bằng một hình chữ nhật bao quanh, nên phải biết vẽ lên ảnh và video.
3. Tương tác trực tiếp với ảnh qua **callback**: mở ảnh lên, click chuột vào và vẽ một đối tượng nào đó.

Đó là ba mục tiêu chính. Mình bắt đầu ngay ở bài sau với việc mở ảnh trong notebook.
