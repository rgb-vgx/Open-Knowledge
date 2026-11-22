---
title: 'Bài 102 — Contours: tìm đường bao vật thể bằng OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 102
status: edited
source: '102 - Contours.md'
categories:
- AI
tags: []
---

# 🧩 Contours — dạy máy tìm đường bao của vật thể

> Nguồn: `102 - Contours.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48481463)

Chào các bạn! Hôm nay mình học **contour** — cách OpenCV tìm đường bao quanh vật thể. Đây là nền tảng cho rất nhiều bài toán sau này: đếm vật thể, phân tích hình dạng, và cả **object detection** kiểu cổ điển. Mình sẽ đi từ khái niệm, qua ba cách tạo mask khác nhau, rồi cuối cùng vẽ bounding box.

### 📌 Contour là gì?

**Contour** là những đường cong nối các điểm liên tục trên một biên có cùng màu hoặc cùng cường độ. Điều quan trọng nhất: contour phải là **đường cong khép kín (closed)**. Nếu đường bạn vẽ quanh vật thể không khép kín, OpenCV sẽ **không** coi đó là contour. Nói cách khác, contour chính là biên của vật thể trong ảnh.

Vì vậy, nếu `findContours` trả về ba contour, nghĩa là ảnh có ba biên khép kín — tức ba vật thể. Hãy hình dung contour như những nét bút chì bạn vẽ vòng quanh từng đồ vật trong bức ảnh.

---

### 🎯 Ba ứng dụng chính

1. **Object detection** — tìm contour của vật thể để biết có bao nhiêu vật, và có thể vẽ bounding box quanh chúng.
2. **Shape analysis** — dựa vào hình dạng contour để đoán đó là tam giác (3 cạnh), hình vuông/chữ nhật (4 cạnh, rộng và cao gần bằng nhau), hay hình tròn (dùng diện tích và chu vi).
3. **Đo thuộc tính vật thể** — từ contour tính được **diện tích (area)** và **chu vi (perimeter)**, hoặc tỉ lệ diện tích vật thể so với toàn ảnh.

---

### ⚙️ Thuật toán tìm contour

Quy trình gồm các bước:

1. **Chuyển ảnh sang grayscale** — vì contour làm việc trên ảnh một kênh.
2. **Tạo mask nhị phân** bằng edge detection hoặc thresholding — contour cần ảnh nhị phân chỉ có đen và trắng.
3. **Gọi `cv2.findContours`** để trích xuất contour.
4. **Vẽ contour hoặc tạo bounding box**, rồi tính các thuộc tính như diện tích, chu vi.

---

### 🧪 Mask bằng Canny

Mình đọc ảnh `shapes.jpg` (ảnh có nhiều hình), chuyển sang grayscale, rồi dùng **Canny** với hai ngưỡng **80** và **150**. Ngưỡng dưới là mức gradient bị coi là nhiễu và bỏ qua; ngưỡng trên là mức gradient được coi là biên mạnh.

```python
import cv2
import matplotlib.pyplot as plt

image = cv2.imread('images/shapes.jpg')
image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

mask = cv2.Canny(image_gray, 80, 150)
contours, hierarchy = cv2.findContours(mask, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
```

Hai tham số của `findContours` cần nhớ:

* **`mode`** (retrieval mode) — quyết định quan hệ phân cấp giữa các contour. Mình dùng `cv2.RETR_LIST` để lấy **tất cả** contour mà không quan tâm phân cấp. Ngoài ra còn `cv2.RETR_TREE`, `cv2.RETR_EXTERNAL`, `cv2.RETR_CCOMP`.
* **`method`** — cách lưu điểm của contour. `cv2.CHAIN_APPROX_SIMPLE` nén các đoạn ngang, dọc, chéo và chỉ giữ các điểm đầu mút.

Sau đó mình copy ảnh gốc ra một bản mới trong bộ nhớ (`image.copy()`) rồi vẽ contour bằng `cv2.drawContours`. Tham số **`-1`** nghĩa là vẽ **tất cả** contour; màu `(0, 255, 0)` là xanh lá, độ dày **5**.

```python
contour_image = image.copy()
cv2.drawContours(contour_image, contours, -1, (0, 255, 0), 5)
```

Kết quả: ảnh gốc, mask Canny và ảnh contour đặt cạnh nhau. Mask chỉ là các cạnh rời, còn ảnh contour cho thấy đường bao khép kín của **9 vật thể** rõ ràng.

---

### 🔀 Mask bằng thresholding và bằng HSV

Bài giảng thử thêm hai cách tạo mask. Thứ hai là **thresholding**: dùng `cv2.threshold` với ngưỡng **200** và kiểu `cv2.THRESH_BINARY`, biến mọi pixel trên 200 thành trắng, dưới 200 thành đen. Mask này tuy khác mask Canny nhưng vẫn cho ra cùng bộ contour.

Thứ ba là **`cv2.inRange`** trên ảnh **HSV** — chỉ nhắm một dải màu cụ thể (ví dụ màu xanh dương/tím). Mình khai báo `lower_bound` và `upper_bound` bằng `np.array(..., dtype=np.uint8)` rồi lọc. Cách này không dựa vào biên mà dựa hoàn toàn vào màu, rất hữu ích khi muốn tách một vật theo màu. Lưu ý: cần chỉnh lower/upper cho phù hợp từng ảnh; với ảnh xám thì chỉ cần một kênh, ví dụ lấy vùng **200–255**.

Một mẹo hay: nếu truyền **độ dày `-1`** cho `drawContours`, nó sẽ **tô đầy** toàn bộ vùng contour thay vì chỉ vẽ viền.

---

### 📦 Sắp xếp contour và vẽ bounding box

Vấn đề gặp phải: mask thường coi cả **viền ảnh** là một contour, nên contour lớn nhất bao trùm toàn ảnh. Cách xử lý là **sắp xếp contour theo diện tích giảm dần** rồi bỏ phần tử đầu.

```python
sorted_contours = sorted(contours, key=cv2.contourArea, reverse=True)
```

Ảnh có tổng cộng **32 contour**. Contour lớn nhất (vị trí 0) là cả bức ảnh; lấy từ vị trí **1 đến 10** sẽ được **9 vật thể** thật sự. Với mỗi contour, `cv2.boundingRect` trả về `x, y, w, h`, rồi dùng `cv2.rectangle` vẽ hình chữ nhật từ `(x, y)` tới `(x + w, y + h)`:

```python
for contour in sorted_contours[1:10]:
    x, y, w, h = cv2.boundingRect(contour)
    cv2.rectangle(contour_image, (x, y), (x + w, y + h), (0, 0, 255), 2)
```

Màu `(0, 0, 255)` là đỏ (theo thứ tự BGR). Từ đây các bạn có thể đếm số bounding box, hoặc ghi số thứ tự lên từng vật. Vậy là mình đã biết tìm contour, lọc bớt contour thừa và khoanh vùng vật thể — những viên gạch đầu tiên cho object detection. Hẹn gặp ở bài sau với **image segmentation**.
