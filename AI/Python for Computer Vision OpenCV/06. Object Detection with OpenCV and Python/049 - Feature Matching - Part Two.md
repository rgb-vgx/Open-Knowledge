---
title: 'Feature Matching với SIFT và FLANN: ratio test và vẽ match'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 49
status: edited
source: '049 - Feature Matching - Part Two.md'
categories:
- AI
tags: []
---

# 🎯 Feature Matching với SIFT và FLANN: ratio test và vẽ match

> Nguồn: `049 - Feature Matching - Part Two.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12331226)

ORB ở bài trước đã thất bại vì hộp ngũ cốc trong ảnh thật to nhỏ khác ảnh query và kệ có quá nhiều hộp giống nhau. Lần này ta dùng **SIFT** — thuật toán xử lý tốt khi ảnh khác **tỉ lệ** — kèm **ratio test** để loại match kém, rồi thử **FLANN** cho tốc độ.

### 📏 SIFT và lý do chọn nó

SIFT (Scale-Invariant Feature Transform) bền với thay đổi kích thước. Ảnh query Reese's Puffs lớn hơn nhiều so với hộp trong ảnh target — đúng kiểu khác biệt mà SIFT xử lý được, còn ORB thì không.

```python
sift = cv2.xfeatures2d.SIFT_create()

kp1, des1 = sift.detectAndCompute(reeses, None)
kp2, des2 = sift.detectAndCompute(cereals, None)
```

Quy trình giống hệt ORB: tạo object, rồi `detectAndCompute()` trên cả hai ảnh.

---

### 🔀 knnMatch và ratio test

```python
bf = cv2.BFMatcher()
matches = bf.knnMatch(des1, des2, k=2)
```

`knnMatch(des1, des2, k)` tìm **k match tốt nhất** cho mỗi descriptor của tập query. Với `k=2`, mỗi descriptor có hai ứng viên: `match1` (tốt nhất) và `match2` (tốt nhì).

Ý tưởng **ratio test**: nếu match tốt nhất và match nhì **gần nhau về distance**, đó là một đặc trưng đáng tin. Nếu match nhất tốt hẳn còn match nhì ở rất xa, descriptor đó không phân biệt được gì — nên bỏ.

```python
good = []

for match1, match2 in matches:
    if match1.distance < 0.75 * match2.distance:
        good.append([match1])
```

Chỉ giữ `match1` khi distance của nó **nhỏ hơn 75%** distance của `match2`. Nhớ rằng distance nhỏ = match tốt.

Với 1501 match ban đầu, sau ratio test còn khoảng **78** match tốt.

---

### 🖼️ drawMatchesKnn

Vì dùng `knnMatch`, phải dùng hàm vẽ tương ứng:

```python
sift_matches = cv2.drawMatchesKnn(reeses, kp1, cereals, kp2,
                                  good, None, flags=2)
```

Tham số giống `drawMatches`, chỉ khác danh sách match là `good` (mỗi phần tử là một list con).

Kết quả **khá hơn hẳn** ORB: phần lớn đường nối trỏ đúng vào hộp Reese's Puffs. Tuy vậy vẫn có một nhóm match dính vào chữ **"family size"** của hộp Honey Nut Cheerios — vì ảnh query có chữ đó còn hộp Reese's thật thì không. Với nhiều ảnh na ná nhau, lỗi kiểu này vẫn có thể xảy ra.

---

### ⚡ FLANN: nhanh hơn nhưng xấp xỉ

FLANN (Fast Library for Approximate Nearest Neighbors) nhanh hơn brute force, đổi lại chỉ tìm **hàng xóm gần đúng**, không phải tốt nhất tuyệt đối. Ta vẫn dùng SIFT để lấy descriptor, sau đó khai báo tham số:

```python
FLANN_INDEX_KDTREE = 0
index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
search_params = dict(checks=50)

flann = cv2.FlannBasedMatcher(index_params, search_params)
matches = flann.knnMatch(des1, des2, k=2)
```

* **`index_params`** — thuật toán chỉ mục `KDTREE`, `trees=5`.
* **`search_params`** — `checks=50`.

Đây là các giá trị mặc định; tăng `trees` có thể tăng độ chính xác nhưng làm chậm thuật toán. FLANN sinh ra để nhanh, đặc biệt khi có ảnh lớn hoặc nhiều ảnh.

Ratio test tương tự, lần này dùng **70%**:

```python
good = []
for match1, match2 in matches:
    if match1.distance < 0.7 * match2.distance:
        good.append([match1])
```

---

### 🎨 Vẽ match với màu tùy chỉnh và mask

Muốn chỉ tô màu đường nối tốt, còn các điểm đơn lẻ màu khác, ta dùng `matchesMask` và dictionary tham số.

Tạo mask toàn số 0, mỗi match là một cặp `[0, 0]`:

```python
matchesMask = [[0, 0] for i in range(len(matches))]

for i, (match1, match2) in enumerate(matches):
    if match1.distance < 0.7 * match2.distance:
        matchesMask[i] = [1, 0]
```

`enumerate` giữ lại index `i`, để bật `[1, 0]` tại đúng vị trí match tốt. Sau đó:

```python
draw_params = dict(matchColor=(0, 255, 0),
                   singlePointColor=(255, 0, 0),
                   matchesMask=matchesMask,
                   flags=0)

flann_matches = cv2.drawMatchesKnn(reeses, kp1, cereals, kp2,
                                   matches, None, **draw_params)
```

* **`flags=0`** — hiện **mọi** điểm tiềm năng, chỉ vẽ đường nối cho các match tốt.
* **`flags=2`** — chỉ hiện đường nối, không hiện điểm lẻ.
* `matchColor` là màu đường nối, `singlePointColor` là màu điểm đơn lẻ.

---

### ✅ Tóm lại

SIFT + `knnMatch(k=2)` + ratio test là công thức then chốt; FLANN thay brute force khi cần tốc độ, với ratio 70% và `matchesMask` để tô màu. Bài sau ta sang watershed algorithm để phân đoạn ảnh thành foreground và background.
