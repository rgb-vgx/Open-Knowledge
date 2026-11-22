---
title: 'Feature Matching với ORB: tìm vật thể không cần ảnh mẫu trùng khít'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 48
status: edited
source: '048 - Feature Matching - Part One.md'
categories:
- AI
tags: []
---

# 🥣 Feature Matching với ORB: tìm vật thể không cần ảnh mẫu trùng khít

> Nguồn: `048 - Feature Matching - Part One.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257850)

Template matching đòi hỏi một **bản sao chính xác** của vật thể nằm trong ảnh đích — điều hiếm khi có ngoài đời thực. Feature matching giải quyết đúng điểm yếu đó: nó trích các **key point đặc trưng**, rồi dùng khoảng cách để ghép chúng giữa hai ảnh, kể cả khi vật bị xoay, đổi kích thước hay chụp khác góc.

### 🧠 Ý tưởng

Ảnh **query** là thứ ta muốn tìm; ảnh **target** là ảnh lớn để dò. Thuật toán:

1. Trích key point + descriptor từ mỗi ảnh.
2. So khớp descriptor bằng một độ đo khoảng cách.
3. Những cặp khớp tốt sẽ chỉ về cùng một vật thể.

Trong phần này ta thử ba cách: **ORB brute force**, **SIFT brute force + ratio test**, và **FLANN**. Bài này làm cách đầu tiên.

---

### 🛒 Chuẩn bị dữ liệu

```python
import cv2
import numpy as np

reeses = cv2.imread('data/reeses_puffs.png', 0)   # query
cereals = cv2.imread('data/many_cereals.jpg', 0)   # target
```

Ảnh query là mặt trước hộp ngũ cốc Reese's Puffs (không phải ảnh chụp thật, chỉ là hình in). Ảnh target là **ảnh thật chụp kệ ngũ cốc** trong siêu thị, với hộp Reese's nằm ở góc dưới bên trái, hơi nghiêng và không đối diện camera. Đặc biệt, hộp trong ảnh thật **không có chữ "family size"**, còn ảnh query thì có — chi tiết này sẽ gây nhiễu về sau.

Đọc với cờ `0` để có ảnh xám.

---

### 🔑 ORB detectAndCompute

```python
orb = cv2.ORB_create()

kp1, des1 = orb.detectAndCompute(reeses, None)
kp2, des2 = orb.detectAndCompute(cereals, None)
```

`cv2.ORB_create()` tạo detector. `detectAndCompute(ảnh, mask)` vừa tìm key point vừa tính descriptor; tham số thứ hai là mask, ở đây `None` vì không che vùng nào. Hàm trả về hai thứ:

* **`kp`** — danh sách key point.
* **`des`** — descriptor tương ứng.

---

### 🔗 BFMatcher và sắp xếp theo distance

```python
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = bf.match(des1, des2)
matches = sorted(matches, key=lambda x: x.distance)
```

* **`cv2.BFMatcher()`** — brute force matcher, thử mọi cặp descriptor. Truyền `cv2.NORM_HAMMING` vì ORB dùng descriptor nhị phân; `crossCheck=True` là các tham số mặc định.
* **`bf.match(des1, des2)`** — trả về danh sách các **match object**.
* **`sorted(..., key=lambda x: x.distance)`** — sắp xếp theo thuộc tính `distance` của từng match.

Mỗi match object có thuộc tính **`distance`**: distance càng **nhỏ** thì cặp khớp càng tốt, càng lớn càng kém. Đây là lý do phải sort — để lấy những cái tốt nhất lên đầu.

---

### 🖼️ drawMatches

```python
reeses_matches = cv2.drawMatches(reeses, kp1,
                                 cereals, kp2,
                                 matches[:25], None, flags=2)
```

`cv2.drawMatches()` nhận ảnh query, key point query, ảnh target, key point target, danh sách match, mask (`None`) và `flags=2`. Nó tự ghép hai ảnh cạnh nhau và vẽ đường nối các cặp khớp.

Ở đây có **265 match** — quá nhiều để nhìn, nên chỉ lấy `matches[:25]`. `flags=2` quy định kiểu vẽ đường nối.

---

### 😕 Kết quả: chưa tốt

Với ORB brute force, **không có đường nối nào trỏ đúng vào hộp Reese's Puffs**. Nguyên nhân:

* Ảnh query có chữ **"family size"** mà hộp thật không có.
* Hộp trong ảnh bị xoay, nằm ở đáy ảnh.
* Kệ có rất nhiều hộp ngũ cốc trông tương tự.

Đây là lý do cần những phương pháp tinh vi hơn. ORB **không phải lúc nào cũng thất bại**, nhưng khi ảnh query khác biệt nhiều so với target thì nó dễ bị lạc.

---

### ✅ Tóm lại

Quy trình bốn bước: tạo detector (`cv2.ORB_create()`) → `detectAndCompute()` cho cả hai ảnh → `cv2.BFMatcher().match()` rồi sort theo `distance` → `cv2.drawMatches()` để xem. Bài sau, SIFT + ratio test và FLANN sẽ khắc phục điểm yếu về khác biệt tỉ lệ và độ chính xác.
