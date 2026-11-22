---
title: 'Phát hiện biên với thuật toán Canny'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 069
status: edited
source: '069 - Edge Detection Algorithm (Slide).md'
categories:
- AI
tags: []
---

# 🧠 Phát hiện biên với thuật toán Canny

> Nguồn: `069 - Edge Detection Algorithm (Slide).md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39900114)

Chào các bạn, bài này mình sẽ nói về thuật toán phát hiện biên **Canny** — thuật toán đóng vai trò then chốt nếu các bạn muốn xe tự lái nhận ra vạch kẻ đường trên cao tốc. Mình sẽ đi từ ý tưởng, lý do phải chuyển ảnh sang ảnh xám, cho tới ba tham số của hàm **Canny** trong OpenCV.

### 🚗 Vì sao lane tracking cần Canny

* Muốn phát hiện **lane** trên đường cao tốc, cách làm là dùng thuật toán phát hiện biên **Canny**.
* Thuật toán này tìm ra các **biên sắc nét** (sharp edge) trong ảnh.
* Đây là phương pháp lọc được phát triển năm **1986** bởi **John F. Canny** và hiện được dùng rất rộng rãi.
* Các lĩnh vực thường gặp: **robot vision**, camera an ninh, và đặc biệt là **medical imaging** — ví dụ ảnh **X-ray** và **ultrasound**.

Với dự án của mình, Canny là bước đầu tiên để biến khung hình camera thành những đường biên rõ ràng của vạch đường.

---

### 🎨 Phải chuyển ảnh sang ảnh xám trước

Trước khi phát hiện biên, mình cần thay đổi ảnh đầu vào — cụ thể là chuyển sang **grayscale**.

* Ảnh xám cung cấp **đủ thông tin** để phát hiện biên.
* Đồng thời quá trình xử lý trở nên **đơn giản hơn** rất nhiều so với ảnh màu.

Các bạn đã biết cách chuyển ảnh xám bằng **`cv2.cvtColor`** ở các bài trước. Tuy nhiên không cần gọi hàm đó mỗi lần, vì có một mẹo gọn hơn: đặt **tham số thứ hai của hàm đọc ảnh bằng 0**.

```python
import cv2

img = cv2.imread("image.jpeg", 0)
```

Chỉ cần vậy là biến **img** đã ở định dạng ảnh xám, sẵn sàng cho bước phát hiện biên — dùng được cho cả ảnh tĩnh lẫn webcam.

---

### ⚙️ Hàm Canny và ba tham số

Hàm cần dùng tên là **`cv2.Canny`**, nhận **ba tham số**:

1. **Ảnh đầu vào** — ma trận ảnh sẽ thực hiện phát hiện biên (ví dụ biến `image`).
2. **Ngưỡng thứ nhất** (low threshold) — mô tả **mật độ pixel** được chấp nhận là biên. Pixel có cường độ **dưới** ngưỡng này sẽ không được vẽ là biên. Ví dụ đặt **150** thì các pixel nhỏ hơn 150 không được tính.
3. **Ngưỡng thứ hai** (high threshold) — cường độ pixel **cao** hơn giá trị này được xem là biên. Ví dụ đặt **200** thì các giá trị lớn hơn 200 được coi là biên.

```python
edges = cv2.Canny(image, 150, 200)
```

Có ảnh đầu vào, chạy qua Canny là mình nhận được ảnh đầu ra chỉ còn các đường biên — đúng thứ cần cho việc bám làn đường.

---

Vậy là các bạn đã nắm ý tưởng của Canny, mẹo đọc ảnh xám bằng tham số `0`, và ý nghĩa hai ngưỡng. Bài sau mình sẽ viết code Canny hoàn chỉnh bằng Python trên Jetson Nano để các bạn thấy kết quả thực tế.
