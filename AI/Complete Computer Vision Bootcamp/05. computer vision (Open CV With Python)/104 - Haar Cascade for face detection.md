---
title: 'Bài 104 — Haar Cascade: phát hiện khuôn mặt theo thời gian thực'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 104
status: edited
source: '104 - Haar Cascade for face detection.md'
categories:
- AI
tags: []
---

# 🙂 Haar Cascade — phát hiện khuôn mặt, mắt và miệng

> Nguồn: `104 - Haar Cascade for face detection.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48481531)

Chào các bạn! Bài này là một cú chuyển mình thú vị: từ các phép xử lý ảnh "thủ công", mình sang một thuật toán **học máy** để phát hiện khuôn mặt — **Haar Cascade**. Các bạn sẽ thấy nó nhẹ đến mức chạy real-time trên webcam, và cuối bài mình mở rộng để phát hiện cả mắt lẫn miệng.

### 🧠 Haar Cascade là gì?

**Haar Cascade** là thuật toán **object detection dựa trên học máy**, do **Paul Viola và Michael Jones** giới thiệu năm **2001**. Nó dựa trên hai thành phần: **Haar-like features** và **cascade of classifiers** — một chuỗi các classifier xếp tầng.

Bên trong, đây là các **boosted ML algorithm** — cụ thể là một **boosted cascade of weak classifiers**. Nghĩa là không có classifier nào thật mạnh; nhiều classifier yếu được xếp nối tiếp, cái sau bù cho cái trước. Theo tài liệu OpenCV, có bốn kiểu boosting để chọn: **DAB** (discrete AdaBoost), **RAB** (real AdaBoost), **LP** (logit boost) và **GAB** (gentle AdaBoost).

Ưu điểm lớn nhất là **rất nhẹ**, nên hay dùng ở hệ thống ít năng lực tính toán. Ví dụ:

* **Selfie camera trên điện thoại đời cũ** — vẽ khung xanh quanh mặt, theo dõi người, hoặc tự chụp khi thấy người cười. Camera app vốn đã nặng vì xử lý liên tục từng frame, nên dùng deep learning sẽ quá tải; Haar Cascade vừa đủ.
* **Hệ thống an ninh thông minh** — phát hiện người và xe, vẽ bounding box.
* **Robot tương tác** — thấy người thì tự động chào, theo dõi người, hoặc phát hiện tường để tránh va chạm.

---

### 🔲 Haar-like features — những ô chữ nhật so sánh độ sáng

**Haar-like features** là các **mẫu hình chữ nhật** dùng để so sánh cường độ sáng giữa các vùng kề nhau. Chúng giúp phát hiện **contrast** trong cường độ pixel, từ đó nhận ra cạnh, đường và kết cấu. Có sáu mẫu cơ bản (và có thể có nhiều hơn):

* **Edge features** — phân biệt vùng tối với vùng sáng, ví dụ cạnh mũi, với mẫu trắng–đen hoặc đen–trắng.
* **Line features** — phát hiện đường ngang hoặc dọc, ví dụ sống mũi hay môi, với mẫu trắng–đen–trắng.
* **Four-rectangle features** — phát hiện khác biệt theo đường chéo, thường dùng cho mắt.

Cách tính rất trực quan: **cộng cường độ các pixel vùng trắng rồi trừ tổng vùng đen**. Ví dụ mình có một mẫu chia làm 8 ô, chuẩn hóa cường độ về **0–1**. Với một ảnh đầu vào, mình cộng các pixel "sáng" (≥ **0.5**) và trừ các pixel "tối": kết quả được **1.9**. Lật ảnh đó 180 độ hoặc lật ngang, cùng mẫu cho ra **-1.9**.

Vậy ảnh nào "khớp" với Haar feature hơn? Giá trị **1.9** gần với mẫu hơn hẳn **-1.9**. Cơ chế này được lặp trên một **sliding window**: trượt cửa sổ qua toàn ảnh, mỗi lần so một nhóm pixel với feature, chỗ nào cho giá trị đủ gần thì coi như tìm thấy mẫu.

---

### 🪜 Cascade of classifiers — loại dần theo từng tầng

Thuật toán áp **nhiều tầng classifier tuần tự** — gọi là **cascade**. Nếu một vùng ảnh **trượt** ở bất kỳ tầng nào, nó bị **loại ngay** và không được đưa sang các tầng sau. Nhờ vậy Haar Cascade rất hiệu quả về tính toán: phần lớn vùng "không phải mặt" bị loại từ tầng đầu.

Ví dụ với khuôn mặt:

* **Stage 1** kiểm tra những feature tổng quát: vùng lông mày (đen–trắng–đen), sống mũi (đen–trắng–đen), môi. Chỉ cần một trong các kiểm tra này sai là kết luận "không có mặt".
* **Stage 2** kiểm tra kỹ hơn — cả hai lông mày, mắt trái/phải với feature chéo (ảnh bên kia lấy mẫu đảo hoặc xoay 180 độ).
* **Stage 3** kiểm tra chi tiết hơn nữa, ví dụ mắt và môi.

Nếu tất cả các tầng đều qua, kết luận **face detected** và trả về bounding box `x, y, w, h`. Ngược lại chỉ cần một tầng fail (ví dụ stage 3 nếu mắt nhắm) là dừng và báo không có mặt. Số tầng và loại kiểm tra là do người huấn luyện quyết định; với khuôn mặt, OpenCV đã huấn luyện sẵn.

---

### 📷 Cài đặt face detection với webcam

OpenCV cài kèm sẵn các file XML của Haar Cascade, nên chỉ cần trỏ tới chúng. File dùng cho mặt chính diện là `haarcascade_frontalface_default.xml` (trong repo OpenCV, thư mục `data/haarcascades`; file này có **25 stage** đã huấn luyện sẵn).

```python
import cv2

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

cam = cv2.VideoCapture(0)

while True:
    ret, frame = cam.read()
    if not ret:
        print('Failed to grab frame')
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        cv2.putText(frame, 'Face Detected', (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2, cv2.LINE_AA)

    cv2.imshow('Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cam.release()
cv2.destroyAllWindows()
```

Hai tham số của `detectMultiScale` cần hiểu:

* **`scaleFactor = 1.3`** — cho phép dò mặt ở nhiều kích thước khác nhau, nên mặt gần hay xa camera đều bắt được.
* **`minNeighbors = 5`** — giảm **false positive**. Tăng giá trị này làm detection "nghiêm khắc" hơn nhưng tốn tính toán và có thể bỏ sót mặt.

---

### 👀 Mở rộng: face + eyes + mouth

Mắt và miệng chỉ có ý nghĩa khi đã thấy mặt, nên mình chỉ dò chúng **bên trong vùng mặt** đã phát hiện, thay vì trên toàn frame. Cần thêm hai cascade: `haarcascade_eye.xml` và `haarcascade_smile.xml` (dù tên là smile nhưng nó dò miệng).

Ý tưởng: cắt vùng mặt (**ROI** — region of interest) từ ảnh xám và ảnh màu bằng slicing `gray[y:y+h, x:x+w]`, rồi đưa ROI đó vào `eye_cascade` và `smile_cascade`. Điểm mấu chốt khi vẽ lại: tọa độ trả về là **tương đối so với ROI**, nên phải **cộng thêm `x, y` của mặt** để quy về ảnh gốc. Nếu mặt ở `(x, y)` và mắt trong ROI ở `(ex, ey)`, thì trên frame gốc mắt nằm ở `(x + ex, y + ey)`.

Lần chạy đầu, mô hình dò ra rất nhiều mắt và miệng "ảo" — dấu hiệu của false positive. Cách xử lý là **tăng `minNeighbors`** cho cascade miệng, ví dụ từ **5** lên **20**; kết quả chính xác hơn hẳn dù không đổi một dòng code nào khác.

Các bạn cũng nên nhớ: độ chính xác còn phụ thuộc **ánh sáng**. Nếu muốn cải thiện detection khuôn mặt, hãy tăng độ nghiêm ngặt tương tự hoặc đảm bảo ánh sáng tốt hơn. Vậy là mình đã hiểu từ nền tảng Haar-like features, cascade of classifiers, đến ứng dụng thực tế face/eye/mouth — tất cả đều chạy real-time và không cần deep learning. Hẹn gặp ở phần tiếp theo của khóa học!
