---
title: 'Bài tập Image Basics: năm task và một bonus'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 19
status: edited
source: '019 - Image Basics Assessment.md'
categories:
- AI
tags: []
---

# 📝 Bài tập Image Basics — năm task và một bonus

> Nguồn: `019 - Image Basics Assessment.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257638)

Đây là bài assessment kết thúc section Image Basics. Mở notebook `04-image-basics-assessment` để làm; bài sau sẽ đi qua notebook lời giải. Các task nằm trong notebook dưới dạng chữ in đậm.

### 1️⃣ Mở ảnh và sửa thứ tự màu

Mở ảnh `dog_backpack.jpeg` trong thư mục **data** và hiển thị trong notebook.

Gợi ý: nếu đọc ảnh bằng OpenCV rồi hiển thị ngay, kênh đỏ và xanh có thể bị hoán đổi. Cần đọc đúng thứ tự và dùng hàm chuyển đổi color space đã học để sửa.

---

### 2️⃣ Lật ngược ảnh

Lật ảnh **upside down** và hiển thị trong notebook. Đây chính là thao tác flip quanh trục ngang.

---

### 3️⃣ Vẽ rectangle quanh mặt chó

Vẽ một hình chữ nhật **rỗng, màu đỏ** bao quanh mặt chú chó, rồi hiển thị ảnh.

Không cần căn chính xác tuyệt đối; chỉ cần ước lượng tọa độ hai góc dựa trên trục X và Y của ảnh. Mục tiêu là luyện việc chọn `pt1` (trên trái) và `pt2` (dưới phải).

---

### 4️⃣ Vẽ tam giác xanh ở giữa ảnh

Vẽ một hình tam giác **màu xanh dương** ở khoảng giữa ảnh, quanh vùng mặt chó. Vị trí có thể cao hoặc thấp hơn, không cần chính xác.

Kích thước và góc của tam giác tùy ý. Trong ví dụ, giảng viên dùng **tam giác đều** vì dễ nhất: hai điểm đáy có cùng giá trị Y, khoảng `700`.

---

### 🎁 Bonus: tô kín tam giác

Câu hỏi thêm: làm sao **fill** được tam giác? Việc này cần một hàm khác chưa xuất hiện trong bài giảng, nên phải tự tra Stack Overflow hoặc Google. Gợi ý: tam giác được dựng bằng **polyline**, sau đó tìm cách tô kín đối tượng polyline đó. Notebook có sẵn một link gợi ý mạnh nếu bị kẹt.

---

### 5️⃣ Task cuối: vẽ circle bằng chuột phải

Tạo một **script** mở ảnh dog backpack và cho phép vẽ các hình tròn **rỗng, màu đỏ** mỗi khi nhấn **chuột phải**.

Lưu ý: trên macOS hoặc Linux có thể phải chạy task này dưới dạng script thay vì trong notebook. Kết quả mong đợi là ảnh chú chó, click chuột phải ở đâu thì có hình tròn đỏ ở đó.

Chúc các bạn làm bài tốt. Bài tiếp theo sẽ giải từng task.
