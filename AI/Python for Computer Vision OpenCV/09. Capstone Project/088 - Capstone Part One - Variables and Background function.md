---
title: 'Capstone phần 1 — biến toàn cục và hàm tính nền trung bình'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 88
status: edited
source: '088 - Capstone Part One - Variables and Background function.md'
categories:
- AI
tags: []
---

# 🖐️ Capstone phần 1 — dựng nền trung bình để tách bàn tay

> Nguồn: `088 - Capstone Part One - Variables and Background function.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12787367)

Bắt đầu capstone: mình sẽ làm chương trình đếm số ngón tay giơ lên trong một ô ROI. Phần 1 lo hai việc nền tảng — khai báo biến toàn cục và viết hàm cập nhật **nền trung bình** (running average background), để sau này phát hiện khi bàn tay đi vào vùng ROI.

### 🗺️ Chiến lược tổng thể

1. Lấy **region of interest** — ô chữ nhật đỏ trong video demo.
2. Tính **giá trị nền trung bình** qua khoảng 60 frame đầu.
3. Khi bàn tay đi vào ROI, dùng threshold để tách bàn tay khỏi nền.
4. Vẽ **convex hull** quanh bàn tay.
5. Tính tâm bàn tay, rồi dùng khoảng cách và góc tới các điểm cực trị để suy ra số ngón đang giơ.

Convex hull lý thuyết sẽ có các đỉnh tương ứng đầu ngón tay. Ngón duỗi ra thì đỉnh nằm xa tâm; ngón co lại thì đỉnh nằm gần tâm.

Phương pháp này **không hoàn hảo**. Ví dụ kiểu giơ tay chữ V của Spock (5 ngón) sẽ bị đếm thành 3, vì thuật toán không nhận ra khoảng trống giữa ngón trỏ/giữa và ngón áp út/út. Đó là giới hạn của cách làm đơn giản này.

---

### 📦 Import và biến toàn cục

```python
import cv2
import numpy as np
from sklearn.metrics import pairwise

background = None
accumulated_weight = 0.5

roi_top, roi_bottom = 20, 300
roi_right, roi_left = 300, 600
```

`pairwise` từ **scikit-learn** sẽ dùng ở phần đếm ngón để tính khoảng cách Euclid; thư viện này có sẵn khi cài Anaconda.

`background` khởi tạo `None` — chưa có frame nào để làm nền. `accumulated_weight = 0.5` là trọng số cập nhật, điểm giữa 0 và 1.

Bốn biến `roi_*` định nghĩa hình chữ nhật đỏ. Các con số này phụ thuộc camera; nếu ô quá sát mép, các bạn chỉnh lại hoặc tính theo chiều rộng/cao của luồng video.

---

### 🧮 Hàm cập nhật nền trung bình

```python
def calc_accum_avg(frame, accumulated_weight):
    global background

    if background is None:
        background = frame.copy().astype(float)
        return None

    cv2.accumulateWeighted(frame, background, accumulated_weight)
```

Lần gọi đầu tiên, `background` là `None`, nên hàm sao chép frame, ép sang `float` rồi trả về `None` — chưa có gì để trung bình.

Từ lần thứ hai, **`cv2.accumulateWeighted()`** tính tổng có trọng số giữa frame hiện tại (`src`) và accumulator (`dst`). Kết quả là `background` trở thành trung bình động của chuỗi frame. Hàm không trả về gì; nó cập nhật trực tiếp biến toàn cục.

---

### 💡 Vì sao phải dùng nền trung bình?

Camera luôn có nhiễu và ánh sáng thay đổi nhẹ. Nếu lấy đúng một frame làm nền, hiệu ảnh sẽ đầy đốm nhiễu. Trung bình qua nhiều frame cho một nền "sạch" hơn, nhờ đó khi bàn tay xuất hiện, `absdiff` sẽ làm nổi bật đúng vùng thay đổi.

---

### ✅ Chốt phần 1

Ta đã có import, biến toàn cục và hàm `calc_accum_avg`. Phần 2 sẽ viết hàm **segment** để tách bàn tay khỏi nền bằng `cv2.absdiff`, threshold và `findContours`.

Hẹn các bạn ở bài sau.
