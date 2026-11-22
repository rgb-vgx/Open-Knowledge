---
title: 'Histogram trên vùng mask và histogram equalization'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 31
status: edited
source: '031 - Histograms - Part Two - Histogram Eqaulization.md'
categories:
- AI
tags: []
---

# 🎭 Histogram có mask và histogram equalization

> Nguồn: `031 - Histograms - Part Two - Histogram Eqaulization.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12316874)

Bài này gồm hai phần: tính histogram chỉ trên một vùng ảnh (mask), và **histogram equalization** — điều chỉnh độ tương phản dựa trên histogram. Phần equalization là nội dung chính.

### 🎭 Tạo mask bằng NumPy

```python
mask = np.zeros(image.shape[:2], dtype=np.uint8)
mask[300:400, 100:400] = 255
plt.imshow(mask, cmap='gray')
```

`mask` chỉ cần hai chiều không gian, không cần ba kênh màu, nên lấy `image.shape[:2]`. Mặc định toàn 0 (đen); gán một vùng bằng `255` (trắng) để đánh dấu vùng quan tâm. Vùng chọn ở đây là `y = 300..400`, `x = 100..400`.

Không có đáp án đúng/sai cho việc chọn vùng — tùy mục đích.

### 🔗 Áp mask bằng bitwise_and

```python
masked_image = cv2.bitwise_and(image, image, mask=mask)
show_masked_image = cv2.bitwise_and(show_rainbow, show_rainbow, mask=mask)
```

Tạo hai bản:

* `masked_image`: dùng cho tính histogram (thứ tự kênh BGR của OpenCV).
* `show_masked_image`: dùng để hiển thị đúng màu trong Matplotlib.

Kết quả chỉ còn vùng được mask; phần còn lại thành đen. Vùng này của ảnh rainbow ít đỏ hơn toàn ảnh, nên histogram kênh đỏ cũng sẽ phản ánh điều đó.

### 📊 calcHist với mask

```python
hist_mask_values_red = cv2.calcHist(
    [rainbow], [2], mask, [256], [0, 256]
)

hist_values_red = cv2.calcHist(
    [rainbow], [2], None, [256], [0, 256]
)
```

Kênh đỏ là index `2` trong thứ tự BGR. Bản thứ nhất truyền `mask`, bản thứ hai truyền `None` để so sánh toàn ảnh.

```python
plt.plot(hist_mask_values_red)
plt.title('RED HISTOGRAM FOR MASKED RAINBOW')

plt.plot(hist_values_red)
plt.title('RED HISTOGRAM FOR NORMAL RAINBOW')
```

Histogram có mask có rất ít giá trị đỏ, phần lớn gần 0. Histogram toàn ảnh có nhiều đỏ hơn hẳn, nhờ vùng tím và violet ở phần còn lại của rainbow.

Thực tế khóa học ít khi tính histogram có mask, nhưng khi cần thì quy trình chỉ gồm: tạo mask đen, tô trắng vùng quan tâm, rồi truyền mask vào `calcHist`.

### ⚖️ Histogram equalization là gì

Equalization là phương pháp **điều chỉnh độ tương phản** dựa trên histogram. Nếu gamma correction chỉnh độ sáng, equalization chỉnh độ tương phản.

Ví dụ với ảnh gồm toàn các mức xám:

* Ảnh gốc có min = `52`, max = `154` — không có đen tuyệt đối lẫn trắng tuyệt đối, histogram dồn trong khoảng giữa.
* Sau equalization, min thành `0`, max thành `255`.
* Số mức xám trung gian giảm, ảnh tương phản cao hơn: vòng tròn trắng nổi rõ, viền rõ.

Histogram sau equalization trải rộng khắp 0–255 và phẳng hơn, nhưng **không phẳng hoàn toàn**. Mục tiêu thực sự là làm **cumulative histogram** (histogram tích lũy) trở nên gần tuyến tính hơn. Đó là phần toán đằng sau thuật toán, dựa trên cumulative distribution function.

Trên ảnh phong cảnh đồi núi:

* Histogram giá trị xám tô đỏ.
* Đường màu đen là histogram tích lũy, cộng dồn khi giá trị tăng.
* Sau equalization, đường tích lũy gần như tuyến tính và ảnh có tương phản cao hơn rõ rệt.

Bài tiếp theo sẽ áp equalization bằng OpenCV trên ảnh xám và ảnh màu.
