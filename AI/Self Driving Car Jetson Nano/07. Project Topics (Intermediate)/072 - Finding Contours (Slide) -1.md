---
title: 'Tìm contour — khái niệm và hàm findContours'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 072
status: edited
source: '072 - Finding Contours (Slide) -1.md'
categories:
- AI
tags: []
---

# 🔍 Tìm contour — khái niệm và hàm `findContours`

> Nguồn: `072 - Finding Contours (Slide) -1.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/43668128)

Chào các bạn, bài này mình sẽ nói về **contour** — cấu trúc dùng để tìm và phân tích đường bao của vật thể trong ảnh. Đây là khái niệm rất quan trọng, vì chính nó giúp xe của mình bám được một làn đường duy nhất.

### 🧩 Contour là gì

* **Contour** là một đường cong nối tất cả các điểm liên tục nằm trên **đường bao** có cùng màu hoặc cùng cường độ.
* Contour là công cụ hữu ích cho **shape analysis**, **object detection** và **object recognition**.
* Với dự án xe tự lái, contour là thứ giúp mình xác định vùng của làn đường trong khung hình.

Nói cách khác, sau khi có ảnh biên, contour là bước gom các điểm biên rời rạc thành những đường bao có ý nghĩa.

---

### 🔁 Quá trình tìm contour gồm hai bước

Quá trình này diễn ra theo hai bước:

1. **Tìm contour** (finding) — phải dùng một **ảnh đã phát hiện biên**; đây là cách cho kết quả chính xác nhất.
2. Các bước xử lý tiếp theo dựa trên contour vừa tìm được (bài sau mình sẽ vẽ chúng).

Điểm cần nhớ: contour được tìm từ **ảnh biên**, thường là đầu ra của thuật toán phát hiện biên như **Canny**.

---

### ⚙️ Hàm `findContours` và ba tham số

Hàm tìm contour tên là **`cv2.findContours`**, nhận **ba tham số**:

1. **Ảnh biên** (edge) — ảnh dùng để tìm contour, thông thường lấy từ Canny.
2. **`cv2.RETR_EXTERNAL`** — chỉ lấy các contour **ngoài cùng**, bỏ qua đường bao của các vật thể lồng nhau bên trong.
3. **`cv2.CHAIN_APPROX_SIMPLE`** — phương pháp lưu điểm của contour: nén các đoạn thẳng, bỏ bớt điểm dư, biểu diễn contour bằng ít điểm hơn.

Hàm trả về **hai giá trị**: danh sách **contours** và **cấu trúc phân cấp** (hierarchy).

```python
contours, hierarchy = cv2.findContours(
    canny,
    cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE,
)
```

---

### 📦 Chỉ giữ contours, bỏ hierarchy

Trong thực tế mình thường chỉ quan tâm tới contours, không cần hierarchy. Vì vậy mình gán dấu gạch dưới **`_`** cho giá trị thứ hai để bỏ qua nó, còn contours lưu vào một biến riêng.

```python
contours, _ = cv2.findContours(
    canny,
    cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE,
)
```

Biến **contours** giờ đây chứa toàn bộ contour tìm được trong ảnh — nguyên liệu để vẽ hoặc đo đạc ở các bước sau.

---

Vậy là các bạn đã hiểu contour là gì và cách tìm chúng bằng `cv2.findContours` với ba tham số quen thuộc. Bài sau mình sẽ học cách vẽ contour lên ảnh bằng `cv2.drawContours`.
