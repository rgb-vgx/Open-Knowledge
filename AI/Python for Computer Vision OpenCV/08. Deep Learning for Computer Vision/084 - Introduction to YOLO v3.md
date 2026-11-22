---
title: 'YOLO v3: object detection trong một lần nhìn'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 84
status: edited
source: '084 - Introduction to YOLO v3.md'
categories:
- AI
tags: []
---

# 🎯 YOLO v3: nhìn ảnh một lần, vẽ bounding box

> Nguồn: `084 - Introduction to YOLO v3.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12607500)

Từ phân loại ảnh — cả ảnh là một nhãn — ta chuyển sang **object detection**: tìm vị trí vật thể trong ảnh bằng **bounding box** kèm nhãn. **YOLO** (You Only Look Once) là một trong những thuật toán detection tốt nhất, và khóa học dùng **phiên bản 3** — bản mới nhất tại thời điểm ghi hình, cải thiện cả tốc độ lẫn độ chính xác so với bản gốc.

### 🖼️ YOLO làm được gì

Đưa một ảnh vào, YOLO vẽ bounding box quanh những gì nó nhận ra, kèm nhãn lớp. Điểm đáng chú ý: nó vẫn hoạt động khá tốt khi vật thể **bị che khuất một phần** — thứ mà các phương pháp truyền thống thường vấp.

### 🔄 Khác biệt cốt lõi so với các detector trước

Các hệ thống detection trước đây thường **tái sử dụng classifier hoặc localizer**:

* Chạy mô hình trên ảnh tại **nhiều vị trí** và **nhiều scale** khác nhau.
* Lấy những vùng cho điểm cao và coi đó là detection.

Cách này chậm vì phải đánh giá mô hình rất nhiều lần cho một ảnh.

YOLO làm ngược lại — và cái tên bắt nguồn từ đây:

1. Áp **một mạng neural duy nhất** lên **toàn bộ ảnh**, chỉ nhìn một lần.
2. Mạng **chia ảnh thành các vùng** (region) và dự đoán bounding box cùng xác suất cho từng vùng.
3. Việc chia vùng diễn ra **bên trong** mạng, nên không cần quét ảnh nhiều lần từ bên ngoài.
4. Các bounding box được **cân theo xác suất dự đoán**.

### 🎚️ Ngưỡng tin cậy do ta chọn

Mỗi dự đoán đi kèm một xác suất. Ví dụ YOLO báo "70% chắc bounding box này chứa một người". Ta tự đặt **ngưỡng** (threshold) cho xác suất đó:

* Ngưỡng cao → chỉ nhận detection rất chắc chắn.
* Ngưỡng thấp hơn, ví dụ **50%** → mô hình dễ dãi hơn, có thể bắt được cả những người khó thấy trong ảnh, đổi lại dễ có báo nhầm.

### ⚡ Vì sao YOLO nhanh

Ba ưu điểm chính so với các hệ thống dựa trên classifier:

1. **Nhìn toàn ảnh** ngay lúc test, nên dự đoán được hưởng lợi từ **bối cảnh toàn cục**, không chỉ một vùng cục bộ.
2. **Một lần đánh giá mạng** cho mỗi ảnh, trong khi **R-CNN** cần tới hàng nghìn lần đánh giá cho một ảnh.
3. **Tốc độ**: nhanh hơn R-CNN hơn **1.000 lần**, và nhanh hơn cả **Fast R-CNN** (bản "nhanh" của R-CNN) khoảng **100 lần**.

Chính tốc độ này khiến YOLO cực kỳ phổ biến trong thực tế.

### 🧰 Chuẩn bị cho bài code

Bài tiếp theo sẽ dùng một YOLO model **đã train sẵn**, áp lên cả ảnh lẫn video. Công việc chuẩn bị duy nhất: tải file **weights** của mô hình. Notebook đã được dựng sẵn để dùng ngay sau khi có weight — quá trình tải và nạp model sẽ được đi từng bước ở bài kế.
