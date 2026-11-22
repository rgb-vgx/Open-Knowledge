---
title: 'Đọc luồng hình từ CSI camera trên Jetson Nano'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 053
status: edited
source: '053 - Usage of CSI Camera.md'
categories:
- AI
tags: []
---

# 📷 Đọc luồng hình từ CSI camera trên Jetson Nano

> Nguồn: `053 - Usage of CSI Camera.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39615466)

Chào các bạn, bài này mình sẽ lấy khung hình trực tiếp từ **CSI camera** gắn trên Jetson Nano bằng OpenCV. Đây là bước rất quan trọng vì toàn bộ dự án xe tự lái sẽ ăn ảnh từ chính camera này.

### 🔌 Gắn CSI camera vào board

1. Đẩy phần **clip** (phần nhựa đen) hướng lên trên.
2. Gắn cáp CSI camera vào cổng trên Jetson Nano sao cho **phần màu xanh của đầu nối quay ra ngoài**.
3. Cắm cáp vào, kiểm tra lại cho chắc chắn.

### 🧾 Vì sao phải dùng chuỗi cấu hình

Camera của mình **không kết nối qua USB**, nên không thể mở bằng cách truyền số hiệu camera đơn thuần. Mình cần dùng đúng **chuỗi cấu hình (string)** dành cho CSI camera và truyền vào lớp **`cv2.VideoCapture`**.

* Trong chuỗi cấu hình có **width** và **height**: tăng hai giá trị này thì khung hình lớn hơn nhưng **xử lý rất chậm**, nên tốt nhất là để mặc định.
* Có thêm phương thức **flip** để đổi hướng camera: đặt **0** sẽ lật dọc so với ảnh bình thường; giảng viên đặt giá trị **2** để có kết quả như mong muốn. Transcript gốc không nêu rõ vị trí đặt giá trị này, nên các bạn đối chiếu lại chuỗi cấu hình được cung cấp trong khóa.

### 🐍 Viết script đọc frame

Trên Jetson Nano, mở **Visual Studio Code**, tạo file Python mới, ví dụ **camera.py**:

```python
import cv2

camera = cv2.VideoCapture("<chuỗi cấu hình CSI camera>")

while True:
    control, frame = camera.read()
    cv2.imshow("CSI camera", frame)

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break
```

Cách hoạt động:

1. **`cv2.VideoCapture`** nhận chuỗi cấu hình đã copy, trả về đối tượng camera.
2. Trong vòng lặp **`while True`**, gọi **`camera.read()`**: biến thứ nhất là **boolean** (đọc thành công hay không), biến thứ hai là **frame**.
3. **`cv2.imshow`** hiển thị frame trong cửa sổ tên `"CSI camera"`.
4. Điều kiện **`cv2.waitKey(10) & 0xFF == ord('q')`** cho phép bấm phím **q** để thoát vòng lặp — đây là cấu trúc mặc định nên mình giữ nguyên.

### ▶️ Chạy thử

Lưu file bằng **Ctrl + S**, mở terminal và chạy:

```bash
python3 camera.py
```

Lần đầu mình gõ sai tên file nên Python báo không mở được file — chỉ cần gõ đúng tên là chạy. Khi chạy đúng, các bạn sẽ thấy luồng hình từ camera hiện lên cửa sổ, và hình ảnh trông ổn định.

---

Vậy là mình đã gắn CSI camera và đọc được frame liên tục bằng `cv2.VideoCapture`. Phần OpenCV cơ bản đến đây là đủ dùng; tiếp theo mình sẽ chuyển sang tìm hiểu các module điều khiển động cơ DC.
