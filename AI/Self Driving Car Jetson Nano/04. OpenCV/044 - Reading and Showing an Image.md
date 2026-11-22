---
title: 'Đọc và hiển thị ảnh với OpenCV'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 044
status: edited
source: '044 - Reading and Showing an Image.md'
categories:
- AI
tags: []
---

# 🖼️ Đọc và hiển thị ảnh bằng OpenCV

> Nguồn: `044 - Reading and Showing an Image.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39615054)

Chào các bạn, bài này mình sẽ cùng làm quen với thư viện **OpenCV** qua hai thao tác nền tảng nhất: đọc một file ảnh vào biến và hiển thị nó lên màn hình. Đây là nền móng cho toàn bộ phần xử lý ảnh về sau, nên các bạn cứ làm chậm và chắc từng bước.

### 🧩 Ảnh số được tạo thành từ pixel

* Ảnh được tạo nên từ những đơn vị nhỏ nhất gọi là **pixel**.
* Trong môi trường số, mỗi pixel lưu một con số, và con số đó đại diện cho sắc độ màu.
* Ví dụ với ảnh **8 bit**: giá trị **0** là màu đen, **255** là màu trắng.

Hiểu điều này sẽ giúp các bạn dễ hình dung vì sao về sau mình đọc và xử lý ảnh chủ yếu là thao tác trên các con số.

### 📥 Tải một ảnh mẫu từ Pexels

1. Mở Google, truy cập **pexels.com**.
2. Dùng ô tìm kiếm, gõ một từ khóa ảnh miễn phí, ví dụ **puppy**.
3. Chọn một ảnh ưng ý, vào mục **free download**.
4. Ở phần **custom size**, đặt kích thước **500 x 500**, rồi bấm **download selected size**.
5. Kéo file ảnh vừa tải ra **Desktop**.

### 🐍 Tạo project Python và import cv2

1. Mở **Visual Studio Code**, bấm **Open Folder**.
2. Tạo folder mới, đặt tên ví dụ **OpenCV_basics**, rồi mở folder đó và bấm **Trust**.
3. Kéo file ảnh vừa tải vào project folder, đổi tên thành **image** (giữ đuôi `.jpg`).
4. Trong project, tạo file Python mới, đặt tên ví dụ **reading_displaying.py**.

Để dùng OpenCV trong Python, các bạn import module **cv2**. Mình cũng in luôn phiên bản để kiểm tra:

```python
import cv2

print(cv2.__version__)
```

Chạy thử, mình thấy in ra **4.1.4** — đây là phiên bản OpenCV đang dùng trong bài.

### 📖 Đọc ảnh bằng `cv2.imread`

Tạo một biến mới, ví dụ **image**, rồi gọi hàm **imread**. Hàm này nhận đúng **một tham số**: tên file kèm phần mở rộng, dạng **chuỗi**.

```python
import cv2

image = cv2.imread("image.jpg")
print(image)
```

Chạy code không báo lỗi, và khi in biến **image** ra các bạn sẽ thấy dữ liệu ảnh đã được đọc thành công.

### 👁️ Hiển thị ảnh bằng `imshow` và `waitKey`

Để hiển thị, mình dùng hàm **imshow** với **hai tham số**:

1. **Tên cửa sổ** — dạng chuỗi, ví dụ `"image"`.
2. **Biến ảnh** muốn hiển thị, ví dụ `image`.

```python
cv2.imshow("image", image)
cv2.waitKey(0)
```

Nếu chỉ gọi `imshow` mà chạy ngay, ảnh sẽ bật lên rồi tắt liền, vì chưa có lệnh giữ cửa sổ lại. Hàm **`cv2.waitKey`** (chữ **K** viết hoa) giải quyết việc đó: tham số là số **millisecond** muốn giữ ảnh trên màn hình.

* Đặt **`0`**: ảnh mở ra và chỉ đóng khi các bạn bấm một phím bất kỳ.
* Đặt ví dụ **`2000`**: ảnh mở đúng **2 giây** rồi tự đóng.

---

Vậy là các bạn đã biết đọc một ảnh bằng `cv2.imread` và hiển thị nó bằng `cv2.imshow` kết hợp `cv2.waitKey`. Bài sau mình sẽ đi tiếp vào các phép xử lý ảnh cơ bản, bắt đầu với việc thay đổi kích thước ảnh.
