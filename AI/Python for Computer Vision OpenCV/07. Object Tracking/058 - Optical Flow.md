---
title: 'Optical flow — dòng chảy chuyển động giữa hai frame'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 58
status: edited
source: '058 - Optical Flow.md'
categories:
- AI
tags: []
---

# 🌊 Optical Flow — dòng chảy chuyển động giữa hai frame

> Nguồn: `058 - Optical Flow.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12503637)

Mở đầu section Object Tracking, mình sẽ nói về **optical flow** — cách xác định một điểm đã di chuyển đi đâu giữa hai frame liên tiếp. Đây là nền móng cho mọi kỹ thuật tracking phía sau, nên các bạn nắm chắc phần khái niệm trước khi viết code.

### 🎯 Optical flow là gì?

Optical flow là **pattern of apparent motion** (mẫu chuyển động biểu kiến) của các đối tượng trong ảnh giữa hai frame liên tiếp, gây ra bởi chuyển động của vật thể hoặc của camera.

Từ "apparent" rất quan trọng: ta chỉ thấy chuyển động **trông như** đang xảy ra trên ảnh, chứ không biết chắc nguồn gốc.

### 📐 Hai giả định của optical flow

Các phương pháp trong bài đều dựa trên hai giả định:

1. **Cường độ pixel không đổi** giữa hai frame liên tiếp. Nếu đang track một bóng đèn bật/tắt liên tục, giả định này bị phá vỡ và thuật toán sẽ sai.
2. **Các pixel lân cận chuyển động giống nhau**. Nếu bạn track một điểm ở góc bóng đèn, thì toàn bộ pixel tạo nên bóng đèn cũng phải di chuyển theo — không phải một điểm đơn lẻ nhảy lung tung.

Hệ quả thực tế: nếu vật thể biến mất khỏi khung hình, optical flow không thể tiếp tục track điểm đó.

### 🔍 Ai quyết định điểm cần track?

Các hàm optical flow của OpenCV nhận vào **một tập điểm** và frame hiện tại, rồi cố tìm những điểm đó trong frame kế tiếp. Việc chọn điểm là do người dùng — có hai cách:

* Click tay lên frame đầu tiên để chọn điểm.
* Dùng **object detection** đã học (ví dụ phát hiện khuôn mặt) để lấy điểm, rồi để optical flow track tiếp.

Trong bài này mình sẽ dùng cách thứ hai: detect khuôn mặt trước, sau đó track các điểm của khuôn mặt.

### ⚡ Lucas-Kanade — sparse optical flow

Thuật toán mặc định trong hàm optical flow của OpenCV là **Lucas-Kanade**. Nó nhận **frame trước**, **các điểm trước đó** và **frame hiện tại**, rồi tìm vị trí mới của từng điểm.

Lucas-Kanade tính optical flow cho một **sparse feature set** — nghĩa là chỉ những điểm bạn chỉ định, thường vài chục điểm chứ không phải toàn bộ ảnh. Vì thế nó nhanh nhưng không cho bức tranh chuyển động đầy đủ.

Một điểm cần lưu ý về giới hạn của phương pháp: nhìn một clip bóng bay lên và sang phải, ta **không thể phân biệt** bóng đang bay hay camera đang di chuyển xuống và sang trái. Với các kỹ thuật primitive này, cả hai trường hợp cho kết quả giống nhau. Trong toàn bộ ví dụ của bài, camera được cố định.

### 🌈 Farneback — dense optical flow

Khi cần track **mọi pixel** trong ảnh, ta dùng thuật toán **Gunner Farneback**, cũng có sẵn trong OpenCV, để tính **dense optical flow**.

Cách hiển thị khá trực quan: nền đứng yên được tô đen, còn vùng đang chuyển động được tô màu theo **hướng** di chuyển so với frame trước. Vật đi hướng nào sẽ có màu tương ứng hướng đó.

### 💡 Trước khi vào code

* Lucas-Kanade cho tập điểm thưa; Farneback cho toàn ảnh.
* Cả hai đều là hàm dựng sẵn, gọi rất đơn giản.
* Muốn hiểu sâu phần toán bên dưới, các bạn cần nền tảng **linear algebra** vững; giảng viên có để link bài báo gốc trong tài nguyên khóa học.

Bài tiếp theo mình sẽ code Lucas-Kanade trước, rồi đến Farneback. Hẹn gặp các bạn ở bài sau.
