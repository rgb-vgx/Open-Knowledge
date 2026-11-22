---
title: 'Viola-Jones và Haar Cascade: lý thuyết face detection'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 53
status: edited
source: '053 - Introduction to Face Detection.md'
categories:
- AI
tags: []
---

# 🧠 Viola-Jones và Haar Cascade: lý thuyết face detection

> Nguồn: `053 - Introduction to Face Detection.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257862)

Trước khi code, cần hiểu cơ chế bên dưới. Bài này giải thích **Viola-Jones object detection framework** (Paul Viola và Michael Jones, 2001) và **Haar cascade** — bộ phân loại mà OpenCV dùng sẵn cho face detection. Điểm mấu chốt: đây là **face detection**, không phải face recognition.

### 🔎 Detection khác recognition

* **Detection** — ảnh có khuôn mặt không, và ở đâu. Rất nhanh, chỉ cần nói "đây là mặt người".
* **Recognition** — khuôn mặt đó là **của ai**. Cần dataset lớn và deep learning.

Bài này và bài sau chỉ làm detection. Muốn nhận diện danh tính, phải đợi tới phần deep learning của khóa.

---

### 🧩 Ba loại Haar feature

Mọi thứ bắt đầu từ những đặc trưng rất đơn giản:

* **Edge feature** — vùng trắng cạnh vùng đen, theo ngang hoặc dọc.
* **Line feature** — một dải tối kẹp giữa hai vùng sáng, ngang hoặc dọc.
* **Four-rectangle feature** — bốn hình chữ nhật xen kẽ sáng/tối.

Giá trị của một feature = **tổng pixel vùng trắng trừ tổng pixel vùng đen**.

Với một cạnh lý tưởng (đen tuyệt đối cạnh trắng tuyệt đối), hiệu trung bình là `1 - 0 = 1`. Ảnh thật không hoàn hảo như vậy. Ví dụ trong bài: trung bình vùng tối khoảng **0.81**, vùng sáng **0.15**, hiệu là `0.6625`. Càng gần `1` thì feature càng rõ. Ta đặt một **ngưỡng** (ví dụ `0.5`) để quyết định feature đó "đạt" hay không.

---

### ⚡ Integral image: tính tổng trong O(1)

Duyệt mọi tổ hợp feature trên toàn ảnh sẽ cực kỳ tốn kém. Viola-Jones giải quyết bằng **integral image**, còn gọi là **summed area table**.

Cách dựng rất đơn giản: cộng dồn theo hàng và cột. Ví dụ giá trị `31`, rồi `33 = 31 + 2`, rồi `37 = 33 + 4`, rồi `70 = 37 + 33`... Mỗi ô của bảng là tổng mọi pixel phía trên và bên trái nó.

Nhờ bảng này, tổng của **bất kỳ hình chữ nhật nào** chỉ cần tra vài ô ở góc — ví dụ hình chữ nhật 3x2 có tổng `101` đọc thẳng từ góc dưới phải. Nhờ vậy thuật toán chạy với thời gian gần như **hằng số** bất kể kích thước vùng, cực nhanh.

---

### 🚦 Cascade of classifiers

Một hiểu nhầm phổ biến: thuật toán quét toàn ảnh tìm mặt. Thực tế nó **không** quét kiểu đó vì quá chậm. Nó đưa ảnh qua một **chuỗi (cascade) classifier**, mỗi cái là một feature đơn giản.

Quy trình:

1. Ảnh phải là **ảnh xám**, người nhìn **thẳng về phía camera** (hơi lệch vẫn được) — đây là kiểu ảnh bộ phân loại được huấn luyện.
2. Xét feature đầu tiên, thường là **vùng mắt tối hơn vùng má**.
3. Nếu **trượt** feature này → kết luận ngay "không có mặt ở đây", không cần xét hàng nghìn feature còn lại.
4. Nếu **đạt** → sang feature tiếp theo (thường là sống mũi), rồi lông mày, miệng...
5. Đạt đủ phần lớn classifier → kết luận có mặt.

Đây là một phễu: đa số vùng ảnh bị loại từ rất sớm, nên tốc độ rất cao.

---

### 📦 Dùng bộ phân loại có sẵn

Ý tưởng này áp dụng được cho nhiều loại vật thể, không chỉ mặt — khóa học còn dùng bộ **eye detector**. Nhược điểm: tự huấn luyện Haar cascade cần **dataset khổng lồ**.

May mắn là đã có sẵn nhiều bộ **pre-trained**. OpenCV đi kèm rất nhiều file **XML** cho các Haar cascade khác nhau. Trong khóa, các file này nằm trong thư mục `data`. Vì chi phí huấn luyện Haar cascade quá lớn, phần deep learning sau này sẽ dạy cách tự huấn luyện classifier cho ảnh của riêng bạn.

---

### ✅ Tóm lại

Viola-Jones dùng các **Haar feature** đơn giản (edge, line, four-rectangle), tính cực nhanh nhờ **integral image**, và lọc ảnh qua **cascade classifier** để loại vùng không phải mặt từ rất sớm. Ta chỉ cần dùng các file XML có sẵn. Bài sau sẽ mở Jupyter và code face detection thực tế.
