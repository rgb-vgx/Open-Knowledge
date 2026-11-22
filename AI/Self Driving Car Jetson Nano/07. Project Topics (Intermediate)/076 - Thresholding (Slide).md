---
title: 'Thresholding — tách pixel đen trắng để làm rõ vạch đường'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 076
status: edited
source: '076 - Thresholding (Slide).md'
categories:
- AI
tags: []
---

# ⚫ Thresholding — tách pixel đen trắng để làm rõ vạch đường

> Nguồn: `076 - Thresholding (Slide).md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/43782626)

Chào các bạn, bài này mình sẽ nói về **thresholding** — kỹ thuật giúp các đường kẻ trở nên rõ rệt hơn khi xe tự lái bám làn. Đây là bước bổ trợ rất đắc lực cho Canny mà các bạn vừa học.

### 💡 Thresholding là gì

* Thresholding là kỹ thuật dùng nhiều trong **image processing** và phân tích ảnh.
* Về bản chất, nó tách các pixel trong ảnh xám thành **hai lớp** bằng cách so sánh với một **giá trị ngưỡng**: nhóm nhỏ hơn ngưỡng và nhóm lớn hơn ngưỡng.
* Nhờ vậy, quá trình này **tăng độ tương phản** (contrast) hoặc **giảm nhiễu** (noise), giúp nhận ra vật thể hoặc đặc trưng trong ảnh dễ hơn.

Với đường cao tốc, thresholding giúp mình chỉ giữ lại phần **đen và trắng** — tức là vạch kẻ và mặt đường.

---

### ⚙️ Hàm `threshold` và hai giá trị trả về

Hàm cần dùng tên là **`cv2.threshold`**. Hàm trả về **hai giá trị**:

1. Giá trị đầu tiên — **không quan trọng**, mình thường không dùng, nên gán cho dấu gạch dưới **`_`**.
2. Giá trị thứ hai — **rất quan trọng**: đây là ma trận kết quả của phép thresholding (biến kiểu `threshold_image`).

---

### 🔢 Bốn tham số của hàm

Hàm nhận **bốn tham số**:

1. **Ảnh xám** — ảnh sẽ thực hiện phép threshold.
2. **Ngưỡng thứ nhất** — ví dụ **127**. Mỗi pixel được so với ngưỡng này: nhỏ hơn thì thành **đen**, lớn hơn thì thành **trắng**.
3. **Giá trị pixel lớn nhất** — giá trị tối đa dùng cho ảnh đen trắng kết quả; pixel vượt ngưỡng được gán thành trắng, không vượt thì thành đen.
4. **Kiểu threshold** — ví dụ **`cv2.THRESH_BINARY`**: pixel vượt ngưỡng được gán bằng giá trị lớn nhất **255**, pixel không vượt được gán bằng giá trị nhỏ nhất **0**.

```python
_, threshold_image = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
```

Kết quả là một ảnh nhị phân: chỉ còn hai mức đen và trắng, làm nổi bật những vùng sáng như vạch kẻ đường.

---

### 🖼️ Nhìn kết quả trên ảnh xám

Khi áp dụng thresholding lên một ảnh xám mẫu, mình nhận được ảnh kết quả chỉ gồm các mảng đen trắng tương phản rõ rệt. Đó chính là dạng ảnh mình muốn đưa vào bước tìm làn đường.

---

Vậy là các bạn đã nắm nguyên lý thresholding, hai giá trị trả về và bốn tham số của `cv2.threshold`. Bài sau mình sẽ áp dụng vào code Python trên Jetson Nano để các bạn thấy rõ từng bước.
