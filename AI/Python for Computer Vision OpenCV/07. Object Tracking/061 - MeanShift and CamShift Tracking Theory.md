---
title: 'MeanShift và CamShift — lý thuyết tracking theo histogram màu'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 61
status: edited
source: '061 - MeanShift and CamShift Tracking Theory.md'
categories:
- AI
tags: []
---

# 🧠 MeanShift và CamShift — trượt cửa sổ tới vùng giống nhất

> Nguồn: `061 - MeanShift and CamShift Tracking Theory.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12598246)

Bài này mình tìm hiểu hai thuật toán tracking cơ bản nhất: **MeanShift** và **CamShift** (continuously adaptive MeanShift). Ý tưởng chung rất gọn: biểu diễn mục tiêu bằng histogram màu, rồi trượt cửa sổ tìm kiếm về phía vùng có phân bố màu giống nhất.

### 📊 MeanShift như một thuật toán phân cụm

Trước khi áp vào ảnh, hãy xem MeanShift ở dạng thuần túy: cho một tập điểm, ta muốn gom chúng thành các cụm.

Với mỗi điểm, thuật toán tính **hướng tới centroid gần nhất** bằng cách xem các điểm xung quanh tập trung ở đâu — tức là tính một **weighted mean**. Mỗi vòng lặp, các điểm dịch dần về phía đa số, cho tới khi hội tụ thành tâm cụm.

Trong ví dụ của bài, sau vòng đầu các điểm đã co về hai cụm dưới và một vùng trên chưa rõ tách hay gộp. Sang vòng hai, cụm dưới gần như hội tụ; đến vòng ba, thuật toán chốt **ba cụm**, và các vòng sau không còn dịch chuyển nữa.

---

### ⚠️ MeanShift không cho chọn số cụm

Điểm cần nhớ: MeanShift **tự quyết định số cụm**, người dùng không truyền vào `k`. Vì vậy kết quả có thể không phải con số "hợp lý" theo mắt người. Trong ví dụ trên, nhìn bằng mắt có thể thấy 4 cụm hợp lý hơn (hai cụm ở trên thay vì một cụm lớn), nhưng thuật toán vẫn gộp thành 3.

Đây là khác biệt với **K-means** — thuật toán họ hàng bên machine learning, nơi bạn được chọn trước số cụm `k`.

---

### 🎯 Áp MeanShift vào object tracking

Khi dùng để track, MeanShift được cấp một **target** cần theo dõi. Nó sẽ:

1. Tính **color histogram** của vùng mục tiêu.
2. Trượt cửa sổ tracking tới vị trí có histogram khớp nhất — chính là "cluster center" theo nghĩa màu sắc.

Trong animation của bài, cửa sổ ban đầu đặt trên khuôn mặt; qua từng vòng lặp, vị trí cửa sổ được cập nhật theo weighted mean cho tới khi hội tụ. Nếu khuôn mặt di chuyển, cửa sổ sẽ tiếp tục bám theo.

---

### 🔄 CamShift — thêm khả năng đổi kích thước

Hạn chế của MeanShift: **kích thước cửa sổ không đổi**. Khi mục tiêu tiến lại gần camera (to lên) hoặc lùi ra xa (nhỏ đi), cửa sổ vẫn giữ nguyên.

**CamShift** khắc phục bằng cách:

1. Chạy MeanShift như bình thường.
2. Khi MeanShift hội tụ, tính lại **region of interest** với kích thước mới.
3. Tính thêm **hướng** của ellipse khớp nhất với ROI mới.
4. Lặp lại MeanShift với cửa sổ đã scale và vị trí cũ, cho tới khi đạt độ chính xác yêu cầu.

Toàn bộ quá trình này OpenCV lo hết phía sau; ta chỉ gọi một hàm.

---

### 💡 Chốt lại

* MeanShift trượt cửa sổ kích thước cố định về vùng màu giống mục tiêu.
* CamShift = MeanShift + tự điều chỉnh kích thước và hướng.
* Cả hai dựa trên histogram màu, nên rất nhạy với ánh sáng và vật thể cùng màu.

Bài sau mình code cả hai với OpenCV, bắt đầu bằng việc detect khuôn mặt trên frame đầu rồi để thuật toán track vùng pixel đó.
