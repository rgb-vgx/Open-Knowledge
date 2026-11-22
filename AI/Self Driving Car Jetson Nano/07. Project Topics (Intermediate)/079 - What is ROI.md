---
title: 'ROI — Region of Interest là gì và cách cắt vùng ảnh'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 079
status: edited
source: '079 - What is ROI.md'
categories:
- AI
tags: []
---

# 🎯 ROI — Region of Interest là gì và cách cắt vùng ảnh

> Nguồn: `079 - What is ROI.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/43816698)

Chào các bạn, bài này mình sẽ nói về **ROI** — viết tắt của **Region of Interest**, tức "vùng quan tâm". Đây là khái niệm rất hay gặp trong xử lý ảnh và thị giác máy tính, và là chìa khoá để xe tự lái chỉ xử lý phần đường phía trước thay vì cả khung hình.

### 🧭 ROI được dùng để làm gì

* ROI dùng để xác định một **vùng cụ thể** trên ảnh và chỉ thực hiện thao tác trên vùng đó.
* Nói cách khác, ROI là phần ảnh mà một phép phân tích hoặc xử lý hướng tới.
* Cách làm này cho phép phân tích **tập trung và hiệu quả hơn**, tăng hiệu năng tính toán và giảm xử lý dữ liệu thừa.

Với xe tự lái, đó là vùng mặt đường ngay trước camera — nơi chứa vạch kẻ cần bám.

---

### 🐍 Cắt ROI bằng slicing của NumPy

Định nghĩa ROI thực chất là **chọn một tập con của ảnh**. Trong OpenCV, việc này dùng **toạ độ** cụ thể, và mảng NumPy cho phép cắt rất gọn.

Mình tạo file Python mới, ví dụ **roi.py**, rồi import hai module: **cv2** và **numpy** (đặt tên tắt **np**).

```python
import cv2
import numpy as np

img = cv2.imread("img.jpg")
```

---

### ✂️ Cú pháp slicing bốn giá trị

Coi ma trận ảnh như một mảng: trước tiên là **hàng** (row), sau đó là **cột** (column) — tương ứng trục **y** và **x**.

```python
row = img[50:150, 100:200]
```

Bốn giá trị trong ngoặc vuông lần lượt là:

* **Điểm bắt đầu y** — ví dụ **50**.
* **Điểm kết thúc y** — ví dụ **150**.
* **Điểm bắt đầu x** — ví dụ **100**.
* **Điểm kết thúc x** — ví dụ **200**.

Có thể hiểu đơn giản: lấy các pixel nằm giữa **y = 50 đến 150** và **x = 100 đến 200**.

---

### 👁️ Hiển thị ROI và ảnh gốc

Mình hiển thị vùng vừa cắt ở cửa sổ **roi**, ảnh gốc ở cửa sổ **original**, và giữ cả hai bằng `waitKey(0)`.

```python
cv2.imshow("roi", row)
cv2.imshow("original", img)
cv2.waitKey(0)
```

Khi chạy, một cửa sổ là phần ảnh được cắt ra, cửa sổ còn lại là ảnh ban đầu — các bạn sẽ thấy rõ vùng ROI nằm ở đâu.

---

Vậy là các bạn đã biết ROI là gì và cách cắt vùng ảnh bằng slicing bốn toạ độ. Bài sau mình sẽ nói thêm vì sao ROI lại cải thiện cả tốc độ lẫn độ chính xác của quá trình xử lý.
