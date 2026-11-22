---
title: 'Kết nối camera và ghi video stream ra file với OpenCV'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 36
status: edited
source: '036 - Connecting to Camera.md'
categories:
- AI
tags: []
---

# 🎥 Kết nối camera và ghi video ra file với OpenCV

> Nguồn: `036 - Connecting to Camera.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257692)

Bài này mình sẽ nối OpenCV vào camera USB hoặc webcam có sẵn trên laptop, đọc từng frame và hiển thị lên cửa sổ. Sau đó ta thêm ba dòng để ghi nguyên luồng video đó ra một file MP4.

### ⚠️ Trước khi chạy: chỉ mở một kernel

Khi làm việc với camera và video, đừng để nhiều notebook và nhiều kernel cùng đọc từ một nguồn video. Các kernel sẽ giành nhau kết nối tới USB camera và gây ra lỗi rất khó hiểu.

Cách kiểm tra: mở file viewer của JupyterLab, notebook nào đang chạy sẽ có **chấm xanh lá** cạnh tên. Chỉ giữ đúng một notebook đang chạy; các cái khác có thể right-click và **shut down kernel** thủ công.

---

### 📷 Mở camera và lấy kích thước khung hình

Kết nối camera chỉ là một lệnh duy nhất. Truyền vào `0` để lấy camera mặc định:

```python
import cv2

cap = cv2.VideoCapture(0)

width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
```

`cap.get()` nhận vào thuộc tính `CAP_PROP_...`; ngoài `FRAME_WIDTH` và `FRAME_HEIGHT` còn có `FRAMERATE`, `FRAME_COUNT`... Giá trị trả về là **float**, ví dụ `1080.0` với video 1080p. Muốn dùng để tính toán (như tìm điểm giữa khung hình) thì nên ép về **int** bằng `int()`.

Hai biến `width`, `height` ở đây chưa dùng tới, nhưng sẽ cần cho `VideoWriter` ở phần sau, nên mình lấy luôn từ bây giờ.

---

### 🔁 Đọc frame và hiển thị

Toàn bộ video chỉ là một chuỗi ảnh cập nhật liên tục, nên mọi thao tác trên ảnh đều dùng lại được cho từng **frame**:

```python
while True:
    ret, frame = cap.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    cv2.imshow('frame', gray)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

* `cap.read()` trả về một tuple, nên ta **tuple unpacking** thành `ret, frame`.
* `cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)` đổi frame màu sang grayscale — y như làm với ảnh tĩnh.
* `cv2.waitKey(1)` chờ 1ms; so sánh với `ord('q')` để thoát khi bấm **q**. Có thể dùng `27` nếu muốn phím Escape.

Muốn xem ảnh màu gốc thì bỏ dòng `cvtColor` và truyền thẳng `frame` vào `cv2.imshow()`.

> Trên macOS hoặc Linux, có thể bạn phải chạy đoạn này như một Python script riêng thay vì trong notebook.

---

### 💾 Ghi luồng video ra file

Để lưu lại những gì camera ghi được, thêm ba phần: tạo **writer**, ghi từng frame, và release writer.

```python
writer = cv2.VideoWriter('mysupervideo.mp4',
                         cv2.VideoWriter_fourcc(*'DIVX'),
                         20,
                         (width, height))
```

`cv2.VideoWriter()` nhận bốn tham số:

1. **Đường dẫn file** — ví dụ `mysupervideo.mp4`. Nếu chỉ ghi tên file, file sẽ nằm cùng chỗ notebook/script đang chạy; gõ `pwd` trong một cell mới để biết đang ở đâu. Đường dẫn tới thư mục không tồn tại sẽ báo lỗi. Nên đặt tên file độc nhất để không ghi đè dữ liệu cũ.
2. **`cv2.VideoWriter_fourcc(*'DIVX')`** — **codec** dùng để ghi file, quan trọng nhất và cũng dễ sai nhất.
3. **Số frame/giây** — nên đặt trong khoảng **20–30**, vì hầu hết USB camera chỉ bắt được quanh 30 fps. Càng nhiều fps thì file càng lớn.
4. **Kích thước `(width, height)`** — chính là hai biến đã lấy ở trên.

Về **fourcc** — mã 4 byte chỉ định codec, danh sách đầy đủ ở `fourcc.org`:

| Hệ điều hành | Codec |
|---|---|
| Windows | `DIVX` |
| Ubuntu, Fedora, macOS | `XVID` |

Cú pháp là một dấu `*` rồi tới chuỗi codec, ví dụ `cv2.VideoWriter_fourcc(*'XVID')`. Chọn sai codec thì chương trình vẫn chạy, chỉ có file không được lưu — đây là lỗi rất hay gặp với người mới. Trên Linux/macOS nếu `XVID` báo lỗi thì thử nghiệm các codec khác.

Sau khi có writer, ghi từng frame bên trong vòng lặp, sau khi đã làm xong mọi thao tác (vẽ, detect, tracking...):

```python
    writer.write(frame)   # đặt trong while True, sau khi xử lý frame
```

Cuối cùng, sau khi thoát vòng lặp, release cả capture và writer:

```python
cap.release()
writer.release()
cv2.destroyAllWindows()
```

---

### ✅ Tóm lại

Ba dòng cốt lõi để ghi video là: **tạo `VideoWriter`**, **`writer.write(frame)` mỗi frame**, và **`writer.release()`** khi xong. Phần khó nhất không phải code mà là chọn đúng **fourcc** theo hệ điều hành. Bài sau ta sẽ chuyển sang mở các file video có sẵn thay vì stream trực tiếp từ camera.
