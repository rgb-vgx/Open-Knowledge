---
title: 'Dùng tracking API của OpenCV: selectROI, init và update'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 64
status: edited
source: '064 - Tracking APIs with OpenCV.md'
categories:
- AI
tags: []
---

# 🖱️ Chạy thử tracking API: chọn ROI, init, update

> Nguồn: `064 - Tracking APIs with OpenCV.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12505470)

Phần này không có gì phải code tay: cú pháp tracking API rất ngắn. Mình sẽ đi qua notebook mẫu của khóa học, gồm một hàm tiện ích cho chọn tracker và vòng lặp ba bước **chọn ROI → init → update**.

### 🧩 Hàm chọn tracker

Các tracker đều được tạo theo cùng một mẫu: `cv2.Tracker<Tên>_create()`. Notebook in ra menu và nhận lựa chọn 0–4:

```python
import cv2

def create_tracker():
    print("0: BOOSTING, 1: MIL, 2: KCF, 3: TLD, 4: MEDIANFLOW")
    choice = input("Select your tracker: ")

    if choice == '0':
        tracker = cv2.TrackerBoosting_create()
    elif choice == '1':
        tracker = cv2.TrackerMIL_create()
    elif choice == '2':
        tracker = cv2.TrackerKCF_create()
    elif choice == '3':
        tracker = cv2.TrackerTLD_create()
    else:
        tracker = cv2.TrackerMedianFlow_create()

    return tracker
```

Lưu ý: chỉ chạy cell này **một lần**. Nếu chạy lại khi chưa nhập input, notebook sẽ treo ở trạng thái chờ (dấu `*`) — khi đó vào menu **Kernel → Restart** rồi chạy lại.

---

### 🏷️ Lấy tên tracker để hiển thị

```python
tracker_name = str(tracker).split()[0][1:]
```

`str(tracker)` cho chuỗi dạng `<TrackerMedianFlow ...>`. Tách theo khoảng trắng, lấy phần tử đầu, rồi cắt ký tự `<` bằng `[1:]` để còn `TrackerMedianFlow`. Chuỗi này được dùng làm tiêu đề cửa sổ và nhãn trên ảnh.

---

### 🖱️ Chọn vùng cần track

```python
cap = cv2.VideoCapture(0)
ret, frame = cap.read()

roi = cv2.selectROI(frame, False)
```

**`cv2.selectROI()`** mở cửa sổ cho phép kéo chuột vẽ bounding box quanh đối tượng trên frame đầu, rồi nhấn **Enter**. Hàm trả về `(x, y, w, h)`.

Trước khi chạy, hãy nhìn thẳng vào camera và để đối tượng nằm trong frame đầu — nếu không, sẽ chẳng có gì để vẽ ROI.

---

### ▶️ Khởi tạo tracker

```python
ret = tracker.init(frame, roi)
```

`init()` nhận frame đầu và ROI vừa chọn. Từ đây tracker biết phải bám vùng pixel nào.

---

### 🔁 Cập nhật theo từng frame

```python
while True:
    ret, frame = cap.read()

    success, roi = tracker.update(frame)
    (x, y, w, h) = tuple(map(int, roi))

    if success:
        p1 = (x, y)
        p2 = (x + w, y + h)
        cv2.rectangle(frame, p1, p2, (0, 255, 0), 3)
    else:
        cv2.putText(frame, "Failure to Detect Tracking!", (100, 200),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)

    cv2.putText(frame, tracker_name, (20, 400),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)
    cv2.imshow(tracker_name, frame)

    k = cv2.waitKey(1) & 0xFF
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()
```

`update()` trả về hai thứ: **`success`** cho biết có track được không, và **ROI mới**. ROI là mảng bốn số thực, nên phải ép về `int` rồi đổi thành tuple trước khi vẽ.

Nếu `success` là `False` — ví dụ người quay mặt đi hoặc rời khỏi khung hình — ta ghi dòng chữ "Failure to Detect Tracking!" lên ảnh thay vì vẽ hình chữ nhật.

---

### 👀 Kết quả thực tế

Với **MedianFlow**, giảng viên quay mặt nghiêng và di chuyển nhanh để cố làm mất dấu; tracker báo thất bại đúng như lý thuyết. Với **Boosting**, tracker bám rất chắc, lắc đầu nhanh vẫn theo được và giữ tốc độ khung hình tốt.

---

### 💡 Ba bước cốt lõi

1. `cv2.selectROI()` — chọn vùng mục tiêu trên frame đầu.
2. `tracker.init(frame, roi)` — khởi tạo.
3. `tracker.update(frame)` — cập nhật mỗi frame, trả về `success` và ROI.

Chỉ vậy là đủ để đổi qua lại giữa các thuật toán tracking mạnh nhất của OpenCV.

> ⚠️ Cần kiểm chứng: từ OpenCV 4.5.1, các tracker kiểu cũ (`cv2.TrackerKCF_create`, `cv2.TrackerTLD_create`...) đã chuyển sang namespace `cv2.legacy`. Với bản OpenCV mới, dùng `cv2.legacy.TrackerKCF_create()` hoặc cài `opencv-contrib-python` đúng phiên bản.
