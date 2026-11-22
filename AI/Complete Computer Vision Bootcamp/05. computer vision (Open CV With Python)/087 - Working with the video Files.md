---
title: 'Bài 087 — Làm việc với file video bằng OpenCV'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 87
status: edited
source: '087 - Working with the video Files.md'
categories:
- AI
tags: []
---

# 🎞️ Đọc, hiển thị và ghi video với OpenCV

> Nguồn: `087 - Working with the video Files.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/48420887)

Chào các bạn! Sau ảnh tĩnh, ta chuyển sang **video**. Bài này mình sẽ làm rõ video thực chất là gì, các khái niệm **FPS** và **codec**, rồi thực hành đọc, hiển thị và ghi video bằng OpenCV. Hiểu đúng mấy khái niệm nền này sẽ giúp các bạn không bị lúng túng khi vào code.

### 🎬 Video chỉ là chuỗi ảnh

Video không gì khác ngoài một **chuỗi ảnh** nối tiếp nhau; mỗi ảnh gọi là một **frame**. Khi phát liên tiếp đủ nhanh, chúng tạo ra **ảo giác chuyển động** — giống hệt một cuốn **flipbook**, lật từng trang thật nhanh.

**FPS (frames per second)** là số frame trong một giây. Lấy ví dụ **6 frame** `f1...f6`:

* Với **1 FPS**: mỗi giây chỉ phát một frame, nên 6 frame cho ra **video 6 giây**, trông giật, lag.
* Với **6 FPS**: cả 6 frame phát trong **một giây**, chuyển động mượt hơn nhiều.

Hãy hình dung một người bước đi: ở **1 FPS** bạn chỉ thấy vị trí `p0` rồi `p1`, không thấy gì ở giữa; còn ở **25 FPS** (mức điện thoại quay) bạn thấy gần như chuyển động liên tục. Các mức FPS phổ biến:

* **24 FPS** — chuẩn điện ảnh.
* **30 FPS** — TV show, Netflix, YouTube.
* **60 FPS** — thể thao, gaming; còn có **120**, **144 FPS**...
* **300 / 600 / 1200 FPS** — quay **slow motion**: chia 1200 frame trong một giây ra nhiều giây (ví dụ chia 6 → mỗi giây 200 frame) để có video quay chậm, nhưng cần máy rất mạnh.

---

### 🗜️ Codec và fourcc

**Codec** là **thuật toán nén và giải nén** file media. Ta không thể cứ lưu mãi các frame thô tới hàng trăm GB, nên cần cách lưu hiệu quả: giảm cường độ pixel, bớt đặc trưng... Mỗi codec dùng một thuật toán nén/giải nén riêng, gắn với các định dạng file như **MP4**, **AVI**, **MKV**.

Trong OpenCV, codec được chỉ định bằng **fourcc** (four character code). Một vài codec phổ biến:

| Codec (fourcc) | Đặc điểm | Định dạng ra |
|---|---|---|
| **`mp4v`** | Nén video đa dụng, dùng trong bài thực hành | `.mp4`, `.avi` |
| **`H265`** | Nén tốt cho độ phân giải cao **4K / 8K** | `.mp4`, `.mkv` |
| **`H264`** | Hiệu quả cao, mất chất lượng ít; bản cũ hơn H265 | `.mp4`, `.mkv` |

Khi làm bài toán thực tế với IP camera hay network camera, bạn có thể gặp video đầu vào là **H264** hoặc **H265**.

---

### ▶️ Đọc và hiển thị video

Mở VSCode, import thư viện rồi tạo **video capture object** bằng `cv2.VideoCapture`, truyền đường dẫn `./mountain.mp4`:

```python
import cv2

video = cv2.VideoCapture('./mountain.mp4')
```

Đối tượng này **không phải** bản thân video mà là công cụ giúp lấy từng frame một. Để hiển thị, ta lặp:

```python
while True:
    ret, frame = video.read()
    if not ret:
        break
    cv2.imshow('Video Frame', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video.release()
cv2.destroyAllWindows()
```

`video.read()` trả về hai giá trị: `ret` (True/False) và `frame` (mảng NumPy). Khi hết frame hoặc video lỗi, `ret` là `False` và vòng lặp dừng. Vì frame cũng là ảnh, ta hiển thị bằng chính `cv2.imshow`.

Còn `cv2.waitKey(1)` nghĩa là **chờ 1 mili-giây** trước khi hiện frame kế tiếp để video phát đúng nhịp. Nó trả về `-1` nếu không có phím nào được nhấn, ngược lại trả về mã phím; `& 0xFF` cắt giá trị xuống 8 bit để so sánh với `ord('q')`. Nhấn `q` sẽ thoát vòng lặp.

> Luôn nhớ gọi `video.release()` và `cv2.destroyAllWindows()` sau khi xong, nếu không kernel có thể treo và bạn phải khởi động lại.

---

### 💾 Ghi video ra đĩa

Để lưu video, ta tạo **video writer object** bằng `cv2.VideoWriter`. Cần bốn thông số: tên file, fourcc, FPS và kích thước `(width, height)` — kích thước phải khớp với frame ghi ra.

```python
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter('output.mp4', fourcc, fps, (width, height))
```

Lấy `fps` và kích thước từ chính video nguồn bằng các thuộc tính `CAP_PROP`:

```python
fps = video.get(cv2.CAP_PROP_FPS)
width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
```

Rồi lặp đọc từng frame và ghi:

```python
while True:
    ret, frame = video.read()
    if not ret:
        break
    out.write(frame)

video.release()
out.release()
```

Nếu quên `fps`, OpenCV sẽ báo lỗi kích thước frame. Lưu ý VSCode có thể không phát được một số codec — cứ mở file bằng trình xem video bên ngoài để kiểm tra.

---

### 🧪 Thử biến đổi frame

Muốn thấy rõ ta thực sự can thiệp vào dữ liệu, hãy cộng **20** vào mọi pixel của frame rồi lưu thành `output_new.mp4`:

```python
while True:
    ret, frame = video.read()
    if not ret:
        break
    frame = frame + 20
    out.write(frame)
```

Quan trọng: thao tác trên `frame` phải đặt **sau** điều kiện `if not ret`. Nếu đặt sau, ở frame cuối `frame` là `None`, phép `None + 20` sẽ lỗi. Mở `output_new.mp4`, bạn sẽ thấy hình bị "vỡ" màu — đó chính là dấu hiệu ta đã sửa dữ liệu frame và ghi thành công.

Vậy là các bạn đã biết đọc, hiển thị và ghi video. Nền tảng video này sẽ dùng lại rất nhiều khi ta theo dõi vật thể và xử lý luồng camera ở các bài sau.
