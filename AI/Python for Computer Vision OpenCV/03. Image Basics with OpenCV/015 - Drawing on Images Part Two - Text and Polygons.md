---
title: 'Viết chữ và vẽ polygon tùy biến trên ảnh'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 15
status: edited
source: '015 - Drawing on Images Part Two - Text and Polygons.md'
categories:
- AI
tags: []
---

# 🔤 Viết chữ và vẽ polygon tùy biến

> Nguồn: `015 - Drawing on Images Part Two - Text and Polygons.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12291690)

Phần hai khép lại chủ đề vẽ trên ảnh với hai việc: ghi chữ bằng `cv2.putText` và tự dựng một polygon từ danh sách đỉnh bằng `cv2.polylines`.

### ✍️ Viết chữ với cv2.putText

Trước hết phải chọn font. OpenCV chỉ cho dùng các font **tích hợp sẵn trong cv2** — gõ `.FONT` rồi nhấn Tab để xem danh sách. Các font trông khá giống nhau và không được đẹp lắm; font đơn giản nhất là **Hershey Simplex**.

```python
font = cv2.FONT_HERSHEY_SIMPLEX

cv2.putText(
    blank_img,
    text='hello',
    org=(10, 500),
    fontFace=font,
    fontScale=4,
    color=(255, 255, 255),
    thickness=3,
    lineType=cv2.LINE_AA,
)
plt.imshow(blank_img)
```

Các tham số:

* `img`: ảnh cần ghi chữ.
* `text`: chuỗi cần viết.
* `org`: **góc dưới bên trái** của chuỗi trong ảnh.
* `fontFace`: font đã chọn.
* `fontScale`: cỡ chữ; phải thử theo kích thước ảnh.
* `color`: màu chữ, ở đây là trắng `(255, 255, 255)`.
* `thickness`: độ dày nét chữ.
* `lineType`: kiểu đường; thường chọn `cv2.LINE_AA`, các kiểu 4 và 8 ít dùng vì bị ghi đè khi thickness lớn hơn.

Với `org=(10, 500)`, chữ "hello" nằm sát góc dưới bên trái vì mốc tính là góc dưới trái của khung chữ.

---

### 🔺 Tự dựng polygon — bước 1: chọn vertices

```python
blank_img = np.zeros(shape=(512, 512, 3), dtype=np.int32)

vertices = np.array(
    [[100, 300],
     [200, 200],
     [400, 300],
     [200, 400]],
    dtype=np.int32,
)
```

Polygon cần thiết khi hình dạng không có sẵn như rectangle hay circle — ví dụ bao quanh biển stop, hoặc vẽ tam giác. Mỗi phần tử là một cặp `[x, y]`.

Lưu ý:

* Các đỉnh phải là **số nguyên**, không để bị chuyển thành float, nên chỉ định `dtype=np.int32`.
* Nếu các đỉnh cắt nhau hoặc sắp xếp vô lý, polygon sẽ méo hoặc gây lỗi.

---

### 📐 Bước 2: reshape về (-1, 1, 2)

`vertices` đang có shape `(4, 2)`, nhưng OpenCV yêu cầu dữ liệu ba chiều:

```python
pts = vertices.reshape((-1, 1, 2))
pts.shape   # (4, 1, 2)
```

`reshape((-1, 1, 2))` giữ nguyên thông tin, chỉ thêm một lớp chiều có kích thước 1 — tương ứng với các kênh màu. Công thức này gần như luôn dùng được, không cần hiểu sâu, chỉ cần nhớ **phải reshape** trước khi gọi `polylines`, nếu không OpenCV sẽ báo lỗi.

---

### 🔗 Bước 3: cv2.polylines

```python
cv2.polylines(
    blank_img,
    [pts],
    isClosed=True,
    color=(255, 0, 0),
    thickness=5,
)
plt.imshow(blank_img)
```

Có hai điểm hơi lạ trong cách gọi:

1. Tham số thứ hai là **một list chứa mảng points**, tức `[pts]`.
2. `isClosed=True` để nối điểm cuối về điểm đầu, tạo thành polygon khép kín.

Màu đỏ và độ dày `5` cho kết quả dễ nhìn. Có thể kiểm tra lại từng đỉnh trên ảnh, ví dụ `(100, 300)` hay `(200, 200)` đều khớp với vị trí đã chọn.

---

### 💡 Điều thực sự cần nhớ

Polygon tùy biến không xuất hiện thường xuyên trong khóa. Thứ các bạn sẽ dùng nhiều là **`cv2.rectangle`** — ví dụ khi phát hiện khuôn mặt, ta vẽ hình chữ nhật bao quanh. Chỉ cần nắm chắc cấu trúc: ảnh, góc trên trái, góc dưới phải, màu, độ dày.

Bài tiếp theo mở ra phần thú vị hơn: tương tác với ảnh bằng chuột thông qua **event callback** của OpenCV.
