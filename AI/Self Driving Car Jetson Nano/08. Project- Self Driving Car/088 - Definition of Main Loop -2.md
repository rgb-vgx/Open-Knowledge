---
title: 'Vòng lặp chính — điều khiển động cơ theo tâm contour'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 088
status: edited
source: '088 - Definition of Main Loop -2.md'
categories:
- AI
tags: []
---

# 🚗 Vòng lặp chính — điều khiển động cơ theo tâm contour

> Nguồn: `088 - Definition of Main Loop -2.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/44111270)

Chào các bạn, bài này mình hoàn tất **vòng lặp chính**: duyệt từng contour, tính diện tích, vẽ khung, rồi quyết định cho xe **đi thẳng, rẽ phải, rẽ trái hay dừng** dựa vào toạ độ tâm. Đây là phần "bộ não" điều khiển xe.

### 🔁 Duyệt từng contour và tính diện tích

Mình lặp qua từng contour trong danh sách **`contours`**.

* Với mỗi contour, tính diện tích bằng **`cv2.contourArea`**.
* In diện tích ra màn hình bằng **`print`**.

Việc này cho biết làn đường chiếm bao nhiêu pixel.

```python
for contour in contours:
    area = cv2.contourArea(contour)
    print(area)
```

---

### 📦 Vẽ khung bao quanh contour

Mình kiểm tra nếu **diện tích làn đường nằm trong khoảng 900 đến 2800 pixel**. Nếu thoả:

1. Dùng **`cv2.boundingRect`** để lấy **x, y, w, h** — toạ độ góc trên trái, chiều rộng và chiều cao của khung bao quanh contour.
2. Vẽ hình chữ nhật lên **frame gốc** bằng màu **xanh lá**, độ dày **2 pixel**.

Nhờ vậy, các bạn nhìn thấy trực quan contour nào đang được coi là làn đường.

```python
if 900 < area < 2800:
    x, y, w, h = cv2.boundingRect(contour)
    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
```

---

### 📍 Tính tâm hình chữ nhật

Mình tạo hai biến **`cx`** và **`cy`**:

* **`cx`** — toạ độ **x** của tâm hình chữ nhật.
* **`cy`** — toạ độ **y** của tâm hình chữ nhật.

Mình in **`cx`** ra màn hình, vì việc điều khiển động cơ dựa vào **toạ độ x của tâm contour** — tuỳ xe đang lệch sang phải hay trái mà quyết định rẽ.

```python
cx = x + w // 2
cy = y + h // 2
print(cx)
```

---

### 🕹️ Ba điều kiện điều khiển động cơ

Dựa vào **`cx`**, mình đặt các điều kiện:

1. **Đi thẳng** — nếu `cx` **nhỏ hơn 160 và lớn hơn 130**: đặt **motor1** throttle **-0,5** (tương đương 50% công suất) và motor phải throttle **0,5**. Xe chạy tới.
2. **Rẽ phải** — nếu `cx` **lớn hơn 160 và nhỏ hơn 230**: motor trái chạy **90%** công suất, motor phải **dừng**.
3. **Rẽ trái** — nếu `cx` **nhỏ hơn 130 và lớn hơn 90**: motor trái throttle **0** (dừng), motor phải chạy **90%** công suất.

```python
if 130 < cx < 160:
    motor1.throttle = -0.5
    motor2.throttle = 0.5
elif 160 < cx < 230:
    motor1.throttle = 0.9
    motor2.throttle = 0
elif 90 < cx < 130:
    motor1.throttle = 0
    motor2.throttle = 0.9
```

---

### 🛑 Điểm dừng và các hình vẽ trực quan

* Mình đánh dấu **tâm contour** bằng một **vòng tròn đỏ**.
* Đánh dấu một **điểm cố định** bằng **vòng tròn xanh dương**.
* Vẽ **đường đỏ** nối hai điểm bằng hàm **`line`** — nhìn vào sẽ thấy xe có đang ở **điểm giữa** hay không.

Và có thêm một điều kiện **`elif`**: nếu **diện tích contour lớn hơn 2800 pixel**, mình **dừng động cơ**. Đây là điểm kết thúc hành trình của xe.

---

### 🖍️ Vẽ contour và hiển thị bốn cửa sổ

Cuối cùng, mình vẽ tất cả contour bằng **`cv2.drawContours`** rồi hiển thị bốn cửa sổ:

1. Ảnh **threshold**.
2. Ảnh **gốc** (`frame`).
3. Ảnh **phát hiện biên Canny**.
4. Ảnh **ROI**.

```python
cv2.drawContours(frame, contours, -1, (0, 255, 0), 2)

cv2.imshow("threshold", thresh)
cv2.imshow("frame", frame)
cv2.imshow("canny", canny)
cv2.imshow("roi", roi(final))
```

---

Vậy là toàn bộ code đã hoàn chỉnh: từ frame, xử lý ảnh, tìm contour, tới điều khiển hai động cơ theo vị trí làn đường. Bài sau mình sẽ chạy thử dự án và kiểm tra xe trên sa bàn.
