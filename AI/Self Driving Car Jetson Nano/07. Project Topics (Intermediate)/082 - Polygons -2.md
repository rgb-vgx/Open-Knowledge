---
title: 'Mask bằng polygon với fillPoly và bitwise_and'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 082
status: edited
source: '082 - Polygons -2.md'
categories:
- AI
tags: []
---

# 🎭 Mask bằng polygon với `fillPoly` và `bitwise_and`

> Nguồn: `082 - Polygons -2.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/43858634)

Chào các bạn, bài này mình tiếp tục từ polygon đã tạo ở bài trước: giờ mình dựng một **ma trận zero** rồi tô polygon lên đó để làm **mask**. Kết quả là chỉ vùng làn đường được giữ lại, mọi pixel thừa bị chặn.

### 🧱 Tạo ma trận zero cùng kích thước ảnh

Đây chính là quá trình **mask**: mình chỉ chuyển vùng liên quan sang ma trận zero (nền đen), nhờ vậy chặn được các pixel không cần thiết.

Tạo biến **mask** bằng **`np.zeros_like`**, truyền vào ảnh chính **img** — hàm sẽ tạo ma trận zero có cùng kích thước với ảnh.

```python
mask = np.zeros_like(img)
```

### 🖌️ Tô polygon bằng `fillPoly`

Hàm **`cv2.fillPoly`** dùng để tô bên trong polygon bằng một màu cụ thể — rất phổ biến trong xử lý ảnh và thị giác máy tính. Hàm nhận **ba tham số**:

1. **Ảnh để vẽ** — thường là mảng NumPy, ở đây là **mask**.
2. **Danh sách các đỉnh polygon** — mỗi polygon là một mảng NumPy, ở đây là **polygons**.
3. **Màu tô** — tuple ba số nguyên theo **BGR**, hoặc một số nguyên nếu là ảnh xám. Vì mình làm phép toán nhị phân nên dùng **255**.

```python
cv2.fillPoly(mask, polygons, 255)
```

Sau lệnh này, vùng đa giác trên nền đen trở thành màu trắng.

### 🔗 Cắt ảnh bằng `bitwise_and`

Tạo biến **masked_image**. Hàm **`cv2.bitwise_and`** thực hiện phép AND bit giữa hai ảnh, hoặc giữa một ảnh và một mask. Hàm nhận **hai tham số**:

1. **Ảnh chính** — biến **img**.
2. **Ma trận zero dùng làm mask** — biến **mask**.

```python
masked_image = cv2.bitwise_and(img, mask)
```

Kết quả: chỉ phần nằm trong polygon còn giữ nguyên, phần ngoài bị đen hoá.

### ▶️ Hàm trả về và khối main

Trong hàm `roi`, mình **return masked_image** — kết quả của phép mask.

Ở khối main, mình đọc ảnh **img.jpg**, gọi hàm `roi` với ảnh nguồn, rồi hiển thị ảnh gốc và ảnh đã mask.

```python
def roi(img):
    height = img.shape[0]
    polygons = np.array([[
        (310, 225),
        (390, 225),
        (390, height),
        (310, height),
    ]])
    mask = np.zeros_like(img)
    cv2.fillPoly(mask, polygons, 255)
    masked_image = cv2.bitwise_and(img, mask)
    return masked_image


image = cv2.imread("img.jpg")
final = roi(image)

cv2.imshow("original", image)
cv2.imshow("masked image", final)
cv2.waitKey(0)
```

Khi chạy, cửa sổ **original** là ảnh ban đầu, cửa sổ **masked image** chỉ còn vùng làn đường và mặt đường cao tốc — phần còn lại đã bị chặn.

---

Vậy là các bạn đã biết tạo polygon bằng OpenCV và dùng nó làm mask. Bài sau mình sẽ bắt tay vào dự án cuối khoá: dựng đường chạy thử và viết chương trình hoàn chỉnh cho xe tự lái.
