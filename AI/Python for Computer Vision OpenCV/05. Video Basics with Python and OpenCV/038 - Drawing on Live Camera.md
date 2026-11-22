---
title: 'Vẽ lên camera trực tiếp: hình chữ nhật tĩnh và vẽ tương tác bằng chuột'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 38
status: edited
source: '038 - Drawing on Live Camera.md'
categories:
- AI
tags: []
---

# 🖌️ Vẽ lên camera trực tiếp: hình chữ nhật tĩnh và vẽ tương tác bằng chuột

> Nguồn: `038 - Drawing on Live Camera.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257702)

Đã stream được camera và mở được file video, giờ ta vẽ lên chúng. Quy trình giống hệt vẽ trên ảnh tĩnh, chỉ khác là vẽ trên từng **frame**. Mình sẽ đi từ một hình chữ nhật cố định, rồi tới vẽ tương tác bằng chuột — kỹ năng nền cho object detection và tracking về sau.

### 🟥 Vẽ hình chữ nhật cố định

Lấy lại khung đọc camera, kèm `width`/`height` để tính tọa độ theo kích thước thật của khung hình:

```python
import cv2

cap = cv2.VideoCapture(0)
width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

while True:
    ret, frame = cap.read()

    x = width // 2
    y = height // 2
    w = width // 4
    h = height // 4

    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 4)
    cv2.imshow('frame', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

Vài điểm cần để ý:

* **`//` (floor division)** giữ tọa độ là **integer**. `10 / 5` trả về `2.0`, còn `10 // 5` trả về `2`. Tùy hệ điều hành, truyền float vào tọa độ có thể gây lỗi, nên luôn dùng `//`.
* **Điểm trên trái** đặt ở giữa khung hình: `width // 2`, `height // 2`.
* **Kích thước hình chữ nhật** bằng một phần tư khung hình: `width // 4`, `height // 4`; điểm dưới phải là `(x + w, y + h)`.
* Màu `(0, 0, 255)` là **đỏ** — OpenCV dùng thứ tự **BGR**, nên `255` nằm ở vị trí cuối. Độ dày `4` pixel.
* **Thứ tự bắt buộc**: vẽ lên `frame` trước, rồi mới `cv2.imshow()`. Đảo lại thì bạn đang hiển thị frame rồi mới vẽ — không thấy hình.

Cách tính theo `width`/`height` giúp code chạy được với mọi loại camera mà không phải sửa số.

---

### 🧩 Chuẩn bị cho vẽ tương tác

Giờ ta bỏ phần tính theo kích thước, thay bằng tọa độ do **click chuột** quyết định. Bốn bước:

1. Định nghĩa **callback function** để vẽ hình chữ nhật.
2. Định nghĩa các **global variable**.
3. Vẽ lên frame dựa trên các biến đó.
4. **Bind** callback vào cửa sổ.

Bốn biến toàn cục:

```python
pt1 = (0, 0)               # điểm trên trái
pt2 = (0, 0)               # điểm dưới phải
topLeft_clicked = False
botRight_clicked = False
```

Hai biến `clicked` là **tracker**: chúng cho biết đã click điểm trên trái và điểm dưới phải hay chưa. Khi cả hai cùng `True` nghĩa là đủ hai điểm để vẽ hình chữ nhật.

Callback có chữ ký chuẩn `(event, x, y, flags, param)`. Bind nó vào cửa sổ như sau:

```python
cap = cv2.VideoCapture(0)

cv2.namedWindow('test')
cv2.setMouseCallback('test', draw_rectangle)
```

Tên cửa sổ phải khớp với tên dùng trong `cv2.imshow('test', frame)`.

---

### 🔴 Vẽ dựa trên global variable

Trong vòng lặp, sau khi `cap.read()`:

```python
if topLeft_clicked:
    cv2.circle(frame, pt1, 5, (0, 0, 255), -1)

if topLeft_clicked and botRight_clicked:
    cv2.rectangle(frame, pt1, pt2, (0, 0, 255), 3)
```

* Đã click điểm đầu → vẽ một **chấm tròn nhỏ** tại `pt1`, bán kính `5`, màu đỏ. `thickness = -1` nghĩa là **tô đầy** chấm, để bạn thấy mình đã click ở đâu.
* Đủ cả hai điểm → vẽ hình chữ nhật nối `pt1` và `pt2`, độ dày `3`.

Biến `topLeft_clicked` đã là Boolean nên chỉ cần `if topLeft_clicked:`; viết `== True` cũng chạy nhưng dài hơn.

---

### 🖱️ Cập nhật biến trong callback

Đây là phần "não" của chương trình. Đầu tiên khai báo `global` cho cả bốn biến, rồi xử lý sự kiện click chuột trái:

```python
def draw_rectangle(event, x, y, flags, param):
    global pt1, pt2, topLeft_clicked, botRight_clicked

    if event == cv2.EVENT_LBUTTONDOWN:

        # 1. Đã có đủ 2 điểm -> reset để vẽ hình mới
        if topLeft_clicked and botRight_clicked:
            pt1 = (0, 0)
            pt2 = (0, 0)
            topLeft_clicked = False
            botRight_clicked = False

        # 2. Chưa có điểm trên trái -> gán điểm 1
        elif topLeft_clicked == False:
            pt1 = (x, y)
            topLeft_clicked = True

        # 3. Đã có điểm 1, chưa có điểm 2 -> gán điểm 2
        elif botRight_clicked == False:
            pt2 = (x, y)
            botRight_clicked = True
```

Ba trường hợp theo đúng thứ tự ưu tiên:

1. **Cả hai đã click** → hình đã vẽ xong, lần click này là để **xoá** và bắt đầu hình mới. Reset toạ độ về `(0, 0)` và hai tracker về `False`.
2. **Chưa click điểm trên trái** → gán `pt1` bằng `(x, y)` của lần click, bật `topLeft_clicked`.
3. **Đã có điểm 1, chưa có điểm 2** → gán `pt2`, bật `botRight_clicked`. Dùng `elif` để trường hợp này chỉ xảy ra khi điểm 1 đã có.

Chú ý phân biệt `=` (gán) và `==` (so sánh) — đây là chỗ dễ gõ nhầm nhất.

Luồng chạy thực tế: click lần một → hiện chấm đỏ; click lần hai → hiện hình chữ nhật; click lần ba → hình cũ biến mất, bắt đầu chấm mới; click lần bốn → hình mới xuất hiện.

---

### ✅ Tóm lại

Mọi thứ xoay quanh **global variable** và **callback**: callback cập nhật biến khi có sự kiện chuột, còn vòng lặp chính đọc biến để vẽ lên frame. Nhớ ba điều: vẽ **trước** khi `imshow`, dùng `//` để giữ toạ độ integer, và bind đúng tên cửa sổ. Nếu gặp lỗi, hãy chạy lại notebook mẫu trước — đoạn này rất nhiều chỗ có thể gõ nhầm. Bài tiếp theo là bài assessment để tự làm lại toàn bộ.
