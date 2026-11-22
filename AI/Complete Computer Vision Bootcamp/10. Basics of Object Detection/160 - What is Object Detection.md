---
title: 'Bài 160 — Object Detection là gì?'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 160
status: edited
source: '160 - What is Object Detection.md'
categories:
- AI
tags: []
---
# 👁️ Object Detection là gì?

> Nguồn: `160 - What is Object Detection.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49110333)

Chào các bạn! Bài này mở màn module **object detection**. Mình sẽ làm rõ object detection khác gì so với image classification, input/output của bài toán gồm những gì, và cách dữ liệu huấn luyện — ảnh cộng file annotation — được tạo ra bằng các công cụ gán nhãn.

### 🎯 Detection khác Classification ở đâu?

**Object detection** là một tác vụ computer vision nhận diện *và* định vị nhiều object trong một ảnh hoặc một video. Vì video chỉ là một chuỗi ảnh, nên bản chất vẫn là xử lý trên từng frame.

* **Image classification** chỉ gán một nhãn cho cả ảnh — câu hỏi là *"cái gì?"*.
* **Object detection** trả lời cả *"cái gì?"* lẫn *"ở đâu?"*, bằng cách vẽ một **bounding box** quanh object được phát hiện.

Trong ảnh minh hoạ có bốn chiếc xe, mỗi chiếc có một box riêng; xe đạp, đèn giao thông, xe tải cũng vậy. Ý tưởng cốt lõi: bên trong mỗi bounding box phải chứa đúng object đó.

### 📥 Input và 📤 Output

**Input** của một pipeline object detection thường là:

* một ảnh,
* một frame của video, hoặc
* một batch ảnh.

**Output** gồm ba thành phần:

1. **Bounding box** — toạ độ/vị trí của object trong ảnh.
2. **Class label** — tên lớp của object (phần này image classification cũng có).
3. **Confidence score** — giá trị xác suất trong khoảng **0 đến 1**, thể hiện độ tin cậy của model vào object được phát hiện.

### 📦 Bounding Box — hình chữ nhật định vị object

Ta tưởng tượng một ảnh có một object (ví dụ một người). Bounding box là hình chữ nhật bao quanh object, và nó **xác định vị trí của object trong ảnh**. Ảnh có thể có nhiều object, mỗi object một box.

Cách biểu diễn quen thuộc là **corner format** với bốn toạ độ:

* `x_min`, `y_min` — góc trên bên trái,
* `x_max`, `y_max` — góc dưới bên phải.

Chỉ cần bốn giá trị này là có thể vẽ ra hình chữ nhật. Trong lúc train, ta cũng phải cung cấp bounding box cho model để nó học; lúc dự đoán, model sẽ trả ra chính các toạ độ này.

### 🧾 Dữ liệu huấn luyện và Annotation

Với image classification, dữ liệu chỉ cần **ảnh + nhãn lớp**. Với object detection, nhãn phải giàu hơn: mỗi ảnh đi kèm một file **annotation** chứa:

* **class label** của object, và
* **bounding box** (viết tắt là **bbox**) của object đó.

Có ảnh và annotation là có thể bắt đầu train. Để tạo annotation, người ta dùng các công cụ gán nhãn. Transcript kể tên vài lựa chọn như **Labelbox**, **Roboflow** (bản trả phí) và **Supervisely** (tên đọc từ auto-caption nên các bạn đối chiếu lại khi dùng).

### 🧪 Demo với MakeSense

Để thấy annotation trông thế nào, mình mở công cụ online **MakeSense** — miễn phí, open source, chạy thẳng trên browser, không cần cài đặt.

1. Bấm **Get Started**, kéo thả một ảnh (mình chọn ảnh con rắn).
2. Chọn chế độ **Object Detection** thay vì image recognition.
3. Tạo một label, đặt tên `snake`.
4. Click và kéo để vẽ bounding box quanh con rắn, rồi gán label vừa tạo.
5. Mở **Actions → Export Annotations** để tải về file ZIP.

File ZIP có thể xuất theo **YOLO**, **VOC** hoặc một file CSV. Mình chọn **YOLO** vì lát nữa sẽ thực hành YOLO. Mở file ra, dòng đầu tiên là **class index** — `0` ứng với `snake`; nếu có thêm lớp person thì person sẽ là `1`, tức **index bắt đầu từ 0**. Phần còn lại là các toạ độ, nhưng ở định dạng YOLO chúng được biểu diễn hơi khác (sẽ nói kỹ ở bài sau).

Với **VOC**, file là XML chứa: thư mục chứa ảnh, tên ảnh, đường dẫn ảnh, **width/height** của ảnh, **depth** (ảnh RGB), và cuối cùng là bounding box với `x_min`, `y_min`, `x_max`, `y_max`. Nhờ file này, khi train model hiểu được object là gì và nằm ở đâu, từ đó học feature và pattern tốt hơn.

---
### ✅ Tóm lại

Object detection = **định vị + phân loại**: input là ảnh/video/batch, output là bounding box, class label và confidence score. Dữ liệu cần ảnh kèm annotation chứa cả class lẫn toạ độ box. Bài tiếp theo mình sẽ mổ xẻ chi tiết các **định dạng bounding box**. Hẹn gặp các bạn!
