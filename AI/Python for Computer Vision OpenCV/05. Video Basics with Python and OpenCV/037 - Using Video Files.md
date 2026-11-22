---
title: 'Đọc và phát lại file video có sẵn bằng OpenCV'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 37
status: edited
source: '037 - Using Video Files.md'
categories:
- AI
tags: []
---

# 📼 Đọc và phát lại file video có sẵn bằng OpenCV

> Nguồn: `037 - Using Video Files.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257698)

Bài trước ta stream trực tiếp từ USB camera. Lần này ta mở một file video đã có sẵn — ví dụ video tải từ YouTube, hoặc file `mysupervideo.mp4` vừa ghi được — rồi xử lý từng frame. Cách làm gần như y hệt.

### 📂 Mở file và kiểm tra lỗi ngay

Vẫn là `cv2.VideoCapture`, chỉ khác là truyền **đường dẫn file** thay vì `0`:

```python
import cv2

cap = cv2.VideoCapture('mysupervideo.mp4')

if cap.isOpened() == False:
    print('ERROR FILE NOT FOUND! OR WRONG CODEC USED!')
```

OpenCV khá dễ dãi: nếu đường dẫn sai, nó không ném exception mà chỉ trả về một object rỗng. Vì vậy phải kiểm tra `cap.isOpened()` và in cảnh báo. Thông báo được cố tình gộp hai nguyên nhân:

* **File không tồn tại** — gõ nhầm đường dẫn.
* **Sai codec** — đúng là bài trước: nếu file được ghi bằng codec không đúng với hệ điều hành, OpenCV có thể tạo ra thứ trông như file nhưng không mở lại được. Nếu chắc chắn file có đó mà vẫn lỗi, hãy thử ghi lại bằng codec khác.

---

### 🔁 Đọc frame cho tới khi hết video

```python
while cap.isOpened():
    ret, frame = cap.read()

    if ret == True:
        cv2.imshow('frame', frame)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
    else:
        break

cap.release()
cv2.destroyAllWindows()
```

Điểm mới so với bài camera là nhánh **`else: break`**. Nhánh này gắn với `if ret == True`:

* Còn frame (`ret == True`) → hiển thị, cho phép bấm **q** để thoát sớm. Với video dài, luôn nên có đường thoát để không phải ngồi xem hết.
* Hết frame (`ret` không còn `True`) → đã chiếu xong toàn bộ video, thoát vòng lặp.

---

### ⏱️ Vì sao video phát nhanh như tua

Chạy đoạn trên, video sẽ chạy **cực nhanh**. Lý do: `VideoCapture` không được thiết kế để phát video cho người xem. Nó chỉ đọc thật nhanh từng frame để máy xử lý, vì máy "xem" nhanh hơn người rất nhiều. Điều này lại có lợi — muốn xử lý một video dài cả tiếng, ta không phải chờ đúng một tiếng.

Nếu muốn xem ở tốc độ thật, thêm **delay** bằng module `time` có sẵn của Python:

```python
import time

# bên trong vòng lặp, sau cv2.imshow(...)
time.sleep(1 / 20)   # 20 = frame rate của video
```

`time.sleep()` nhận số **giây** cần chờ. Chờ `1 / fps` giây mỗi frame sẽ tái tạo đúng số frame/giây ban đầu — ở đây là 20 fps, đúng fps lúc ta ghi file. Có thể lấy fps thật của video theo cách đã lấy `width`/`height` ở bài trước.

Lưu ý: chỉ dùng `sleep` khi **thật sự muốn xem** video. Nếu chỉ chạy xử lý mà không cần nhìn, đừng sleep — nếu không, thời gian xử lý sẽ kéo dài đúng bằng thời gian xem, rất kém hiệu quả.

---

### ✅ Tóm lại

Mở file video giống hệt mở camera, chỉ đổi `0` thành đường dẫn. Nhớ kiểm tra `cap.isOpened()` vì OpenCV trả về object rỗng thay vì báo lỗi, và nhớ nhánh `else: break` để thoát khi hết frame. Còn tốc độ phát chỉ là chuyện thêm `time.sleep(1 / fps)`. Bài tiếp theo ta sẽ học cách vẽ lên video đang phát.
