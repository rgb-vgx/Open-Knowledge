---
title: 'Capstone phần 3 — đếm ngón tay bằng convex hull và đường tròn 90%'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 90
status: edited
source: '090 - Capstone Part Three - Counting and ConvexHull.md'
categories:
- AI
tags: []
---

# 🖐️ Capstone phần 3 — đếm ngón tay bằng convex hull

> Nguồn: `090 - Capstone Part Three - Counting and ConvexHull.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12787373)

Đây là phần "ăn não" nhất của capstone. Từ contour bàn tay, mình vẽ **convex hull**, tìm 4 điểm cực trị, suy ra tâm bàn tay, dựng một đường tròn bán kính bằng 90% khoảng cách xa nhất, rồi đếm các contour cắt qua vành đường tròn — đó là các ngón đang duỗi.

### 📐 Convex hull hoạt động thế nào?

Convex hull nối các điểm ngoài cùng của một tập điểm (hoặc contour) thành một đa giác bao. Với bàn tay, các đỉnh đa giác rơi đúng vào đầu ngón tay: ngón duỗi thì đỉnh xa tâm, ngón co thì đỉnh gần tâm.

Vì bàn tay đi vào từ phía dưới, phần cổ tay cũng tạo ra các điểm ở đáy đa giác. Ta phải loại các điểm này ra, nếu không sẽ đếm nhầm cổ tay thành ngón.

---

### 🧭 Tìm tâm bàn tay

Ý tưởng: lấy 4 điểm **trên, dưới, trái, phải** cực trị, rồi tâm là trung điểm của cặp trên–dưới và trái–phải.

```python
cX = (left[0] + right[0]) // 2
cY = (top[1] + bottom[1]) // 2
```

Dùng `//` để giữ kết quả là số nguyên.

Việc trích 4 điểm cực trị từ `conv_hull` khá rắc rối vì cấu trúc mảng lồng nhau; giảng viên nói thẳng đây là đoạn nên **tra tài liệu** phần contour features của OpenCV chứ không cần tự suy ra. Cách làm là dùng `argmin`/`argmax` trên trục x hoặc y rồi lấy phần tử `[0]`:

```python
top = tuple(conv_hull[conv_hull[:, :, 1].argmin()][0])
bottom = tuple(conv_hull[conv_hull[:, :, 1].argmax()][0])
left = tuple(conv_hull[conv_hull[:, :, 0].argmin()][0])
right = tuple(conv_hull[conv_hull[:, :, 0].argmax()][0])
```

---

### 📏 Bán kính và đường tròn tham chiếu

```python
distance = pairwise.euclidean_distances(
    [(cX, cY)], Y=[left, right, top, bottom])[0]

max_distance = distance.max()
radius = int(0.9 * max_distance)
circumference = 2 * np.pi * radius
```

`pairwise.euclidean_distances()` tính khoảng cách Euclid từ tâm tới 4 điểm; lấy `[0]` để được mảng khoảng cách ứng với điểm đầu vào. Điểm xa nhất cho `max_distance`.

Bán kính lấy **90%** khoảng cách xa nhất. Con số này tùy chỉnh: người có ngón ngắn có thể cần giảm xuống 80%, vì ngón duỗi không nhô ra đủ xa so với ngón co.

Chu vi đường tròn dùng để giới hạn số điểm contour được phép coi là một ngón.

---

### ⭕️ Mask hình tròn và contour bên ngoài

```python
circular_roi = np.zeros(thresholded.shape[:2], dtype="uint8")
cv2.circle(circular_roi, (cX, cY), radius, 255, 10)

circular_roi = cv2.bitwise_and(thresholded, thresholded,
                               mask=circular_roi)

contours, hierarchy = cv2.findContours(
    circular_roi.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
```

Mask tròn chỉ dùng để tính, không hiển thị. `cv2.circle()` với `thickness=10` vẽ **viền** đường tròn dày 10 pixel (không tô kín), nên `cv2.bitwise_and()` chỉ giữ lại các pixel bàn tay nằm đúng trên vành tròn đó. Ngón duỗi vượt qua bán kính 90% sẽ cắt vành tròn và để lại một đoạn contour ngắn; ngón co nằm gọn bên trong nên không tạo contour. Vì vậy `findContours()` trên ảnh đã mask trả về các mảnh contour tương ứng với ngón duỗi.

Lần này dùng `CHAIN_APPROX_NONE` để giữ **toàn bộ** điểm trên contour, vì ta cần đếm số điểm.

---

### 🔢 Đếm ngón với hai điều kiện

```python
count = 0
for cnt in contours:
    (x, y, w, h) = cv2.boundingRect(cnt)

    out_of_wrist = (cY + (cY * 0.25)) > (y + h)
    limit_points = (circumference * 0.25) > cnt.shape[0]

    if out_of_wrist and limit_points:
        count += 1

return count
```

Hai bộ lọc:

* **`out_of_wrist`** — nếu contour nằm quá thấp, dưới tâm bàn tay cộng thêm 25%, thì nhiều khả năng đó là cổ tay hoặc cẳng tay, không phải ngón.
* **`limit_points`** — contour có số điểm vượt quá 25% chu vi đường tròn thì bị loại, vì đó thường là mảng nhiễu lớn nằm ngoài bàn tay chứ không phải một ngón.

Contour nào vượt qua cả hai điều kiện thì cộng 1 vào `count`.

---

### 💡 Ghép lại toàn bộ hàm

```python
def count_fingers(thresholded, hand_segment):
    conv_hull = cv2.convexHull(hand_segment)
    # ... tìm top/bottom/left/right, tâm, bán kính, mask tròn ...
    # ... đếm contour thỏa out_of_wrist và limit_points ...
    return count
```

Pipeline: convex hull → 4 điểm cực trị → tâm → khoảng cách lớn nhất → đường tròn 90% → mask → đếm contour cắt vành tròn, có loại cổ tay và nhiễu.

Phần cuối sẽ ghép tất cả hàm này vào vòng lặp camera để chương trình chạy thật.

> ⚠️ Cần kiểm chứng: transcript ghi ba giá trị trả về của `cv2.findContours` (API OpenCV 3); với OpenCV 4 hàm trả về hai giá trị như code trên. Ngoài ra `convexHull` trả về mảng có shape phức tạp, nên đoạn indexing 4 điểm cực trị cần đối chiếu lại với phiên bản OpenCV đang dùng — transcript cho biết đoạn này được giảng viên copy-paste từ notes chứ không đọc từng dòng, nên code trong bài là bản dựng lại theo mô tả.
