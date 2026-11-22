---
title: 'Vẽ contour với drawContours và ứng dụng'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 073
status: edited
source: '073 - Drawing Contours (Slide) -2.md'
categories:
- AI
tags: []
---

# 🖍️ Vẽ contour với `drawContours` và ứng dụng

> Nguồn: `073 - Drawing Contours (Slide) -2.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/43676508)

Chào các bạn, tiếp nối bài tìm contour, bài này mình sẽ nói về bước thứ hai: **vẽ contour** lên ảnh. Chỉ khi vẽ ra, các bạn mới nhìn thấy contour mình tìm được có đúng làn đường hay không.

### 🔧 Điều kiện trước khi vẽ

* Muốn vẽ contour thì **trước hết phải tìm được contour** — mình đã làm việc này ở bài trước.
* Hàm vẽ cần dùng trong OpenCV là **`cv2.drawContours`**.
* Hàm này vẽ contour lên một ảnh chỉ định; contours đầu vào thường lấy từ **`cv2.findContours`** hoặc phương pháp tương tự.

---

### ⚙️ Năm tham số của `drawContours`

Hàm nhận **năm tham số**:

1. **Image** — ảnh mà contour sẽ được vẽ lên.
2. **Contours** — danh sách/mảng các contour cần vẽ; mỗi contour là một chuỗi điểm mô tả đường bao vật thể.
3. **Contour index** — chỉ số contour muốn vẽ. Giá trị **`-1`** nghĩa là vẽ **tất cả** contour; muốn vẽ một contour cụ thể thì truyền đúng chỉ số của nó.
4. **Color** — màu contour, dạng tuple **BGR**. Ví dụ màu xanh lá trong không gian BGR.
5. **Thickness** — độ dày nét vẽ; ví dụ **2** tương ứng nét dày 2 pixel.

```python
cv2.drawContours(image, contours, -1, (0, 255, 0), 2)
```

Với `-1`, toàn bộ contour tìm được sẽ được tô viền cùng một màu xanh.

---

### 👕 Ví dụ: đo size áo từ contour

Trong bài giảng có một ví dụ rất trực quan: một ảnh chiếc **áo phông**.

* Sau khi phát hiện biên và tìm contour trên ảnh áo, mình có được phiên bản contour của chiếc áo.
* Từ contour đó có thể **tính toán size quần áo** — ví dụ **L**, **XL**, v.v.

Đây là minh hoạ cho ý "contour dùng để phân tích hình dạng": đường bao của vật thể mang thông tin về kích thước của nó.

---

### ✋ Ví dụ: điều khiển bằng cử động tay

Ví dụ thứ hai là ảnh bàn tay:

* Khi tìm được contour của **bàn tay**, mình có thể **điều khiển các bo mạch điện tử** dựa trên cử động tay.
* Đây là hướng ứng dụng thú vị của contour trong điều khiển không chạm.

Và trong dự án chính của khoá, mình sẽ dùng contour để **phát hiện làn đường**.

---

Vậy là các bạn đã biết cách vẽ contour bằng `cv2.drawContours` với năm tham số, và thấy hai ứng dụng thực tế của contour. Bài sau mình sẽ ghép toàn bộ quy trình — đọc ảnh, chuyển xám, Canny, tìm contour, vẽ contour — vào một file Python hoàn chỉnh.
