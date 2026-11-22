---
title: 'Watershed Algorithm (phần 1): ý tưởng và vì sao cách cũ thất bại'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 50
status: edited
source: '050 - Watershed Algorithm - Part One.md'
categories:
- AI
tags: []
---

# 🌊 Watershed Algorithm (phần 1): ý tưởng và vì sao cách cũ thất bại

> Nguồn: `050 - Watershed Algorithm - Part One.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257854)

Watershed là thuật toán phân đoạn ảnh (image segmentation) mạnh, đặc biệt ở những ca mà các phương pháp thông thường bó tay: các vật thể **dính liền nhau** trên nền tương phản. Bài này mình giải thích trực giác đằng sau nó, rồi chứng minh bằng thực nghiệm rằng chuỗi blur → threshold → contour quen thuộc không giải quyết được bài toán.

### 🗺️ Watershed nhìn từ địa lý

Trong địa lý, **watershed** là vùng đất dẫn nước mưa về các suối, sông rồi ra biển. Vẽ bản đồ địa hình, bạn thấy các đường phân thủy chia vùng này với vùng khác.

Thuật toán watershed mượn đúng phép loại suy đó cho ảnh xám:

* **Độ sáng** của mỗi pixel đóng vai **độ cao**.
* Vùng sáng mạnh là **đỉnh/núi**, vùng tối là **thung lũng**.
* Thuật toán "bơm nước" vào từng thung lũng (local minimum) với một **nhãn** màu khác nhau.

Khi nước dâng lên, các vùng nước khác nhau sẽ gặp nhau. Để chúng không hòa làm một, thuật toán dựng **barrier** tại chỗ gặp — barrier chính là **biên phân đoạn**. Kết quả: mỗi vật thể được tô một màu riêng.

Nó cũng cho phép ta tự đặt **seed** (hạt giống) để chỉ định trước vùng nào thuộc về đâu. Ví dụ, click vài điểm vào bầu trời, vào cỏ, vào tảng đá, rồi để watershed tự lan ra và phân vùng toàn ảnh theo seed.

---

### 🪙 Bài toán: sáu đồng xu dính nhau

Ảnh `pennies.jpeg` chụp sáu đồng xu đặt sát nhau trên nền trắng. Mắt người thấy rõ sáu đồng riêng biệt, nhưng nhiều thuật toán CV chỉ thấy **một khối đen lớn** trên nền trắng — không rõ là một vật hay sáu vật. Mục tiêu: chia ảnh thành **bảy vùng** (sáu đồng xu + nền).

Ảnh rất lớn: **4000 x 3000** pixel.

---

### 🔧 Thử bằng những gì đã biết

Quy trình quen thuộc gồm bốn bước:

```python
import cv2

sep_coins = cv2.imread('data/pennies.jpg')

sep_blur = cv2.medianBlur(sep_coins, 35)          # kernel lớn vì ảnh rất to
gray = cv2.cvtColor(sep_blur, cv2.COLOR_BGR2GRAY)
ret, sep_thresh = cv2.threshold(gray, 160, 255, cv2.THRESH_BINARY_INV)
```

* **`cv2.medianBlur`** — xóa các chi tiết nhỏ như mặt in trên đồng xu, chỉ giữ hình tròn. Bài giảng không nêu con số kernel cụ thể ở phần này; sang phần hai, giảng viên dùng **35** cho chính ảnh này.
* **`cv2.cvtColor`** — chuyển sang ảnh xám.
* **`cv2.threshold(..., 160, 255, cv2.THRESH_BINARY_INV)`** — nhị phân hóa, đảo ngược để **foreground thành trắng**. Ngưỡng `160` được chọn vì hạ xuống thấp hơn (ví dụ 127) sẽ làm lộ mặt in trên đồng xu.

Rồi tìm contour ngoài như bài Contour Detection:

```python
img, contours, hierarchy = cv2.findContours(sep_thresh.copy(),
                                            cv2.RETR_CCOMP,
                                            cv2.CHAIN_APPROX_SIMPLE)

for i in range(len(contours)):
    if hierarchy[0][i][3] == -1:
        cv2.drawContours(sep_coins, contours, i, (0, 0, 255), 10)
```

---

### ❌ Kết quả: một contour khổng lồ

Vì các đồng xu **chạm nhau**, ảnh threshold vẫn là một khối liền. `findContours` chỉ trả về **một contour ngoài duy nhất** — không tách được sáu đồng.

Có thể nghĩ tới **erosion** để bào mòn chỗ nối, nhưng erosion ăn mòn **mọi** biên, làm méo bán kính các đồng xu và hỏng kết quả. Đây chính là giới hạn của chuỗi thao tác ảnh cơ bản: nó không có cơ chế "hiểu" rằng khối đó gồm nhiều vật thể.

---

### ✅ Tóm lại

Watershed coi ảnh như bản đồ địa hình và bơm nước từ các thung lũng để tách vùng, dựng barrier ở nơi nước gặp nhau. Với sáu đồng xu dính nhau, blur + threshold + contour chỉ cho một khối duy nhất, còn erosion thì phá hình dạng. Bài sau ta sẽ chạy đúng thuật toán watershed, qua các bước distance transform và marker, để tách ra sáu đồng xu.
