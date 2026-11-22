---
title: 'Histogram ảnh: đọc phân bố màu với calcHist'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 30
status: edited
source: '030 - Histograms - Part One.md'
categories:
- AI
tags: []
---

# 📊 Histogram ảnh với cv2.calcHist

> Nguồn: `030 - Histograms - Part One.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257670)

Histogram là cách nhìn nhanh phân bố giá trị màu trong ảnh: ảnh tối, ảnh sáng, nhiều đỏ hay nhiều xanh đều để lại dấu vết rõ. Bài này giải thích histogram thường trước, rồi áp vào ảnh bằng `cv2.calcHist` với một kênh và ba kênh.

### 📊 Histogram thường là gì

Histogram là biểu diễn phân bố của một đặc trưng liên tục. Ví dụ với chiều cao cây:

* Trục x: các khoảng (bin) chiều cao, ví dụ 60–65, 65–70, 70–75 feet.
* Trục y: tần suất — có bao nhiêu cây rơi vào khoảng đó.

Có thể thay các cột bằng một đường **kernel density estimation** để thấy xu hướng mượt hơn.

### 🎨 Histogram ảnh

Với ảnh, ta đếm tần suất giá trị của từng kênh. Mỗi kênh R, G, B có giá trị 0–255, nên histogram có 256 bin. Vẽ ba histogram chồng lên nhau (thường tô màu tương ứng) sẽ cho biết ảnh nghiêng về tông nào.

Lưu ý: giá trị **0 là đen tuyệt đối**. Ảnh nhiều vùng đen sẽ có đỉnh lớn gần 0.

### 📥 Chuẩn bị ảnh: một bản BGR, một bản RGB

Bài dùng ba ảnh: ngựa, rainbow và tường gạch xanh. Với mỗi ảnh tạo hai biến:

* `dark_horse`, `rainbow`, `blue_bricks`: giữ nguyên thứ tự **BGR** để tính histogram bằng OpenCV.
* `show_horse`, `show_rainbow`, `show_bricks`: đã chuyển sang **RGB** để hiển thị đúng bằng Matplotlib.

```python
dark_horse = cv2.imread('DATA/horse.jpg')
show_horse = cv2.cvtColor(dark_horse, cv2.COLOR_BGR2RGB)

rainbow = cv2.imread('DATA/rainbow.jpg')
show_rainbow = cv2.cvtColor(rainbow, cv2.COLOR_BGR2RGB)

blue_bricks = cv2.imread('DATA/bricks.jpg')
show_bricks = cv2.cvtColor(blue_bricks, cv2.COLOR_BGR2RGB)
```

Tách hai bản như vậy để không phải chuyển đổi qua lại: OpenCV tính toán trên BGR, Matplotlib hiển thị trên RGB.

### 🧮 cv2.calcHist

```python
hist_values = cv2.calcHist(
    images=[blue_bricks],
    channels=[0],
    mask=None,
    histSize=[256],
    ranges=[0, 256],
)
```

Các tham số:

* `images`: ảnh truyền vào dưới dạng **list**.
* `channels`: kênh muốn tính, cũng là list. Với OpenCV, `0` là blue, `1` là green, `2` là red.
* `mask`: nếu chỉ muốn tính trên một vùng ảnh; `None` là toàn ảnh.
* `histSize`: số bin, `256`.
* `ranges`: khoảng giá trị `[0, 256]` — lấy đến nhưng không gồm 256, nên phủ đủ 0–255 và không cắt mất giá trị 255.

Kết quả có shape `(256, 1)`.

```python
plt.plot(hist_values)
```

Histogram kênh xanh của tường gạch có đỉnh quanh `150` và một đỉnh nữa quanh `225` — phù hợp với ảnh chủ yếu màu xanh.

### 🐴 So sánh với ảnh ngựa

```python
hist_values = cv2.calcHist([dark_horse], [0], None, [256], [0, 256])
plt.plot(hist_values)
```

Ảnh ngựa có rất nhiều nền đen và con ngựa màu nâu đỏ, nên kênh blue gần như bằng 0 ở hầu hết giá trị. Đúng như dự đoán từ việc nhìn ảnh.

### 🌈 Vẽ cả ba kênh

```python
img = blue_bricks
colors = ('b', 'g', 'r')

for i, col in enumerate(colors):
    histr = cv2.calcHist([img], [i], None, [256], [0, 256])
    plt.plot(histr, color=col)
    plt.xlim([0, 256])

plt.title('Histogram for blue bricks')
```

`enumerate` cho `i` chạy 0, 1, 2 tương ứng blue, green, red, còn `col` là ký tự màu để Matplotlib tô đúng. Kết quả: đóng góp của red rất ít, green và blue nhiều hơn — khớp với ảnh.

Làm tương tự với ảnh ngựa, đổi `img = dark_horse`, tiêu đề thành "for horse". Histogram gần như phẳng ở mọi kênh. Thu nhỏ `xlim` về `0–50` và đặt `ylim` khoảng `0–500000` sẽ thấy rõ các đỉnh nhỏ.

### ⚠️ Ảnh lớn làm lệch histogram

Ảnh ngựa có shape `1800 × 2700`, tổng cộng khoảng **14,5 triệu pixel**. Với ảnh lớn như vậy, số pixel đen tuyệt đối áp đảo và làm histogram bị lệch mạnh. Cần nhớ điều này khi so sánh histogram giữa các ảnh có kích thước rất khác nhau.

Phần hai sẽ đi tiếp hai chủ đề: tính histogram trên vùng **mask** và **histogram equalization**.
