---
title: 'Bài 091 — Flip, xoay và crop ảnh với OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 91
status: edited
source: '091 - Flip, Rotate and Crop Images.md'
categories:
- AI
tags: []
---

# 🔄 Flip, xoay và crop ảnh với OpenCV

> Nguồn: `091 - Flip, Rotate and Crop Images.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48421157)

Chào các bạn! Bài này mình làm ba phép biến đổi cơ bản: **flip**, **rotate** và **crop**. Đây là nền tảng cho **image augmentation** — kỹ thuật giúp model deep learning tổng quát hóa tốt hơn, và cũng là bước đệm cho các phép biến đổi nâng cao như **affine** và **projective** ở các bài sau.

### 🪞 Flip: lật ảnh theo trục nào?

Có ba kiểu lật, và cái dễ nhầm nhất là trục lật:

* **Horizontal flip** — lật quanh **trục dọc** (giống ảnh trong gương, trái ↔ phải).
* **Vertical flip** — lật quanh **trục ngang** (trên ↔ dưới).
* **Flip both axes** — lật cả hai, tức horizontal rồi vertical.

Nói cách khác: "horizontal flip" cho ra ảnh đối xứng trái–phải, "vertical flip" cho ảnh đối xứng trên–dưới.

Trong OpenCV, tham số thứ hai của `cv2.flip` quy định hướng:

```python
flip_horizontal = cv2.flip(image, 1)    # 1  -> lật quanh trục dọc
flip_vertical = cv2.flip(image, 0)      # 0  -> lật quanh trục ngang
flip_both = cv2.flip(image, -1)         # -1 -> lật cả hai trục
```

---

### 🔁 Rotate: xoay 90, 180, 270 độ

Đây là **basic rotation** — xoay **không** kèm affine transformation, chỉ các góc **90°, 180°, 270°**. Cách này nhanh và đơn giản vì không phải nội suy hay dùng ma trận biến đổi.

```python
rot_90_cw = cv2.rotate(image_rgb, cv2.ROTATE_90_CLOCKWISE)
rot_90_ccw = cv2.rotate(image_rgb, cv2.ROTATE_90_COUNTERCLOCKWISE)
rot_180 = cv2.rotate(image_rgb, cv2.ROTATE_180)
```

Một điểm thú vị: xoay **180°** tương đương **flip vertical + flip horizontal** cộng lại. Còn affine/perspective transformation (học sau) cũng xoay được nhưng phức tạp hơn nhiều.

---

### ✂️ Crop: cắt vùng quan tâm

**Cropping** là chọn một vùng cụ thể của ảnh và bỏ phần còn lại. Để cắt một hình chữ nhật, chỉ cần **hai cặp tọa độ**: `(x1, y1)` và `(x2, y2)`.

Quy trình gồm ba bước:

1. Xác định vùng cần cắt bằng tọa độ.
2. Trích vùng đó bằng **NumPy array slicing**.
3. Lưu ảnh mới.

Ảnh đọc bằng OpenCV là **NumPy array**, nên slicing hoạt động trực tiếp. Nhưng cẩn thận thứ tự: slicing theo **`[y_start:y_end, x_start:x_end]`** — **y trước, x sau**.

```python
cropped_image = image_rgb[y_start:y_end, x_start:x_end]
```

Nếu nhầm thứ tự (đưa x vào vị trí của y), vùng cắt sẽ sai — có thể ra ảnh rỗng hoặc cắt nhầm phần ảnh, vì chiều rộng và chiều cao khác nhau.

---

### 💻 Ghép code và hiển thị

Sau khi đọc ảnh và chuyển sang RGB để vẽ bằng matplotlib, mình gom ảnh và tiêu đề vào hai list rồi vẽ lưới **2×2**:

```python
images = [image_rgb, flip_horizontal_rgb, flip_vertical_rgb, flip_both_rgb]
titles = ["Original image", "Horizontal flip", "Vertical flip", "Flip both axes"]

plt.figure(figsize=(12, 8))
for i in range(4):
    plt.subplot(2, 2, i + 1)
    plt.imshow(images[i])
    plt.title(titles[i])
    plt.axis("off")
plt.tight_layout()
plt.show()
```

Với rotation cũng dùng lại khung plot tương tự, chỉ thay danh sách ảnh thành ba ảnh xoay. Riêng crop thì vẽ **1 hàng × 2 cột**: ảnh gốc bên trái, ảnh đã cắt bên phải.

---

### 🧭 Nhắc lại hệ tọa độ khi crop

Khi crop, nhớ rằng **OpenCV** đặt gốc `(0, 0)` ở **góc trên-trái**, trục **x** chạy sang phải, trục **y** chạy xuống dưới. Vì vậy tọa độ mình chọn để crop được tính từ góc trên-trái đó — bài sau sẽ nói kỹ hơn về hệ tọa độ này.

---

### ✅ Chốt bài

Tóm gọn công dụng: **flip** để tạo ảnh mirror/augment dữ liệu, **rotate** để căn chỉnh ảnh, **crop** để tập trung vào vùng quan tâm và bỏ chi tiết thừa. Ba phép này tuy đơn giản nhưng là nền móng cho toàn bộ pipeline augmentation về sau. Hẹn các bạn ở bài tiếp theo về hệ tọa độ trong OpenCV!
