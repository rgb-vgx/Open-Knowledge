---
title: 'Một image là gì dưới góc nhìn của máy tính?'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 7
status: edited
source: '007 - What is an image.md'
categories:
- AI
tags: []
---

# 🖼️ Một image là gì dưới góc nhìn của máy tính?

> Nguồn: `007 - What is an image.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12278154)

Đã nắm NumPy array, giờ ta cần hiểu máy tính lưu một **image** như thế nào. Bài này giải thích vì sao ảnh lại chính là array, giá trị pixel nằm trong khoảng nào, và ảnh màu được biểu diễn bằng ba kênh ra sao.

### 📷 Vì sao phải hiểu cách máy tính lưu ảnh

Hãy tưởng tượng ta muốn viết phần mềm phân loại thư theo **zip code** viết tay trên phong bì. Thư thường viết tay, nên ta cần **computer vision** để đọc dữ liệu ảnh của các chữ số. Dữ liệu đó thường là một bức ảnh chụp phong bì — file **PNG** hoặc **JPEG**. Vậy máy tính biểu diễn dữ liệu ảnh đó như thế nào?

---

### 🔢 Ảnh xám chính là một array

Mỗi ảnh một chữ số có thể biểu diễn thành một array. Ví dụ một chữ số được biểu diễn bởi ảnh **28 × 28 pixel**. Càng nhiều pixel thì **resolution** càng mịn.

Với ảnh **grayscale** (chỉ đen, trắng hoặc các sắc xám), array có giá trị từ **0 đến 1**:

* Nơi tối nhất (nét chữ) được biểu diễn bằng `1`.
* Nơi trắng hoàn toàn được biểu diễn bằng `0`.

---

### 💡 Giá trị 0–255 và cách chuẩn hóa

Ảnh mặc định khi đọc vào thường có giá trị từ **0 đến 255**: `255` là sáng nhất, `0` là tối nhất. Khoảng này liên quan đến cách máy tính lưu số **8-bit** — chi tiết đó nằm ngoài phạm vi khóa học và không cần hiểu sâu. Giảng viên có để vài link tham khảo ở cuối bài nếu các bạn muốn đọc thêm.

Nếu muốn đưa giá trị về khoảng 0–1, chỉ cần chia cho giá trị lớn nhất `255`. Khóa học sẽ có ví dụ về việc chuẩn hóa này ở phần sau.

---

### 🌈 Ảnh màu là tổ hợp ba kênh RGB

Ảnh màu được biểu diễn bằng sự kết hợp của **red, green, blue**. Nhờ **additive color mixing**, chỉ cần trộn các lượng khác nhau của **RGB** là tạo ra được rất nhiều màu.

Có một khái niệm gọi là **color triangle**: chỉ những màu nằm trong tam giác này mới tái tạo được bằng cách trộn ba màu gốc; màu nằm ngoài hiển thị thành xám. Điểm trắng ở giữa gọi là **white point** (D65) — nó cho biết biên giới của dải màu tạo được. Con người cũng có giới hạn về màu nhìn thấy, nhưng RGB vẫn bao được một dải khá rộng. Về sau khóa học sẽ nói tới các **color mapping** khác ngoài RGB.

Mỗi kênh màu có **intensity value** — giống các thanh trượt RGB mà các bạn từng thấy trong phần mềm đồ họa, với giá trị từ 0 đến 255.

Muốn nghịch thử, các bạn có thể Google **"RGB sliders"** để kéo ba thanh giá trị; giảng viên cũng gợi ý đọc bài Wikipedia **"RGB color model"** để biết thêm lịch sử và chi tiết.

---

### 🧠 Shape của ảnh màu khi đọc vào

Khi đọc một ảnh màu bằng Python (và bằng máy tính nói chung), ảnh có **ba chiều**: chiều cao, chiều rộng, và một chiều cho ba kênh màu red, green, blue.

Nếu đọc thành NumPy array, `shape` sẽ có dạng như `(1280, 720, 3)` — tức chiều cao pixel, chiều rộng pixel, rồi ba kênh màu.

Điều quan trọng: bản thân máy tính **không biết** kênh nào là đỏ. Nó chỉ biết có ba kênh cường độ, tương đương ba ảnh grayscale. Chính phần mềm của các bạn phải quy định kênh nào ứng với màu nào và trộn chúng lại để ra ảnh màu hoàn chỉnh.

---

### ✅ Tóm lại

* Ảnh xám = array hai chiều, mỗi pixel là một giá trị cường độ.
* Giá trị pixel thường nằm trong **0–255**; chia cho 255 để chuẩn hóa về 0–1.
* Ảnh màu = ba kênh **RGB**, mỗi kênh là một ảnh grayscale cùng kích thước, gộp lại thành array ba chiều `(height, width, 3)`.

Bài tiếp theo ta sẽ áp dụng ngay những điều này với **NumPy và Python**: mở một ảnh thật và tách từng kênh màu.

> ⚠️ Cần kiểm chứng: transcript nói vùng tối nhất được biểu diễn bằng `1` và vùng trắng bằng `0`; quy ước grayscale thông thường (và `cmap='gray'` của Matplotlib) là `0` = đen, giá trị lớn nhất = trắng. Cần đối chiếu slide gốc.
