---
title: 'Cấu hình webcam và hàm ROI cho dự án'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 086
status: edited
source: '086 - Definition of Webcam Prop and Roi.md'
categories:
- AI
tags: []
---

# 📷 Cấu hình webcam và hàm ROI cho dự án

> Nguồn: `086 - Definition of Webcam Prop and Roi.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/44093168)

Chào các bạn, bài này mình sẽ chỉnh các thuộc tính của **webcam** gắn trên Jetson Nano, rồi viết hàm **ROI** dùng polygon cho dự án thật. Phần này quyết định khung hình đầu vào có sáng, đủ nhỏ và đúng vùng hay không.

### 🎥 Mở webcam bằng `VideoCapture`

Mình tạo biến **cap** và gọi class **`cv2.VideoCapture`** để mở webcam.

Ở các bài trước mình đã dùng **CSI camera**. Lần này dùng webcam nên tham số khác một chút: cần truyền **giá trị 0** trực tiếp.

* Camera nối vào cổng **CSI** của Jetson Nano có thể truy cập bằng các con số.
* Giá trị có thể là **1** hoặc **2** tùy **camera ID**.
* Camera của giảng viên chạy với giá trị **0** — các bạn chú ý chỉnh theo camera của mình.

```python
cap = cv2.VideoCapture(0)
```

### ☀️ Chỉnh độ sáng

Mình gọi hàm **`set`** để đặt thuộc tính camera. Môi trường thử nghiệm có **độ sáng thấp**, nên cần chỉnh **brightness**.

```python
cap.set(cv2.CAP_PROP_BRIGHTNESS, 100)
```

### 📐 Giảm kích thước khung hình

Mình chỉnh thêm **width** và **height**, vì các board như **Jetson Nano** hay **Raspberry Pi** không có khả năng xử lý quá mạnh. Giảm kích thước ảnh giúp xử lý **nhanh và chính xác hơn**.

```python
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 360)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 240)
```

Kết quả là khung hình **360 x 240** — nhẹ hơn nhiều so với độ phân giải gốc.

### 🎯 Hàm ROI với polygon

Chuyển sang hàm **ROI**: hàm nhận **một tham số** là ảnh đang xử lý (dạng nhị phân).

1. Lấy **chiều cao** của ảnh.
2. Tạo **polygon** cho xe tự lái — các giá trị này phụ thuộc vào **đường đã vẽ** và **vị trí camera**. Các bạn có thể phải chỉnh lại theo setup của mình.
3. Tạo biến **mask** là **ma trận zero** cùng kích thước ảnh cần chuyển nhị phân; biến này dùng khi vẽ polygon.
4. Thực hiện phép **AND bit** để lấy đúng **nền đen và vạch trắng** — thấy rõ trong **`fillPoly`** và biến **masked_image**.
5. Trả về **masked_image**.

```python
def roi(image):
    height = image.shape[0]
    polygons = np.array([[
        (310, 225),
        (390, 225),
        (390, height),
        (310, height),
    ]])
    mask = np.zeros_like(image)
    cv2.fillPoly(mask, polygons, 255)
    masked_image = cv2.bitwise_and(image, mask)
    return masked_image
```

Cách làm giống hệt bài polygon trước, nên các bạn sẽ không gặp khó khăn — chỉ cần đặt polygon đúng với đường và camera của mình là chạy tốt.

---

Vậy là webcam đã được cấu hình và hàm ROI đã sẵn sàng. Bài sau mình sẽ đi vào **vòng lặp chính** — nơi mọi bước xử lý được ghép lại thành một chu trình chạy liên tục.
