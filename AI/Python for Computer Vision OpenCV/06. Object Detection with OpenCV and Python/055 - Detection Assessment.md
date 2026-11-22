---
title: 'Bài tập Detection: tự động làm mờ biển số xe Nga'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 55
status: edited
source: '055 - Detection Assessment.md'
categories:
- AI
tags: []
---

# 🚗 Bài tập Detection: tự động làm mờ biển số xe Nga

> Nguồn: `055 - Detection Assessment.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257864)

Project cuối section ghép gần như mọi thứ đã học thành một ứng dụng chạy được thật: phát hiện **biển số xe Nga** trong ảnh rồi **làm mờ** đúng vùng đó. Bài này là tổng quan đề bài; lời giải nằm ở bài sau.

### 🎯 Mục tiêu

Cho một ảnh chụp từ dashcam (lấy từ YouTube), tìm biển số xe và làm mờ nó đi để không đọc được. Không làm mờ cả ảnh — chỉ vùng biển số.

Dữ liệu đi kèm gồm ảnh `carplate.jpg` và một file XML **đã huấn luyện sẵn cho biển số Nga** (không phải biển Mỹ, nên mới chọn ảnh này). File XML nằm trong thư mục `data`.

---

### 🛣️ Ba cách tiếp cận

1. **Tự làm từ đầu** — chỉ đọc mô tả "hãy làm mờ biển số Nga", không mở notebook guide. Khó nhất, dùng file `carplate.jpg` và XML để tự dựng hàm.
2. **Dùng guide (khuyến nghị)** — notebook có sẵn danh sách các task chính cần hoàn thành.
3. **Code-along** — nhảy thẳng sang bài solutions và gõ theo.

---

### 📋 Các bước trong guide

1. Import các thư viện quen thuộc (`cv2`, NumPy, matplotlib).
2. Đọc file `carplate.jpg`.
3. Viết hàm hiển thị ảnh ở kích thước lớn hơn — chắc bạn đã quen với việc này.
4. Nạp file XML biển số Nga từ thư mục `data`.
5. Viết hàm `detect_plate` nhận ảnh, phát hiện biển số và **vẽ hình chữ nhật** quanh nó. Bước này **chưa blur** — chỉ giống hệt face detection ở bài trước.
6. Sửa hàm thành `detect_and_blur_plate` để **làm mờ** vùng vừa phát hiện.

Notebook có sẵn các gợi ý cho bước 6. Mấu chốt là nắm **NumPy slicing** — đọc kỹ phần hint.

---

### ✅ Kết quả mong đợi

Ảnh gốc là một frame dashcam ngày mưa, hơi mờ. Biển số đọc được là `033PA`. Sau khi chạy qua `detect_and_blur_plate`:

* Hàm tự tìm đúng vùng biển số.
* Vùng đó bị làm mờ tới mức không đọc được nữa.
* Phần còn lại của ảnh **giữ nguyên**, không bị mờ theo.

Có thể dùng bất kỳ cơ chế blur nào; **median blur** là dễ nhất.

---

### 💡 Gợi ý

Bài này kết hợp kiến thức từ nhiều section: đọc ảnh, xử lý ảnh, detect bằng cascade, và cắt/thay vùng ảnh bằng NumPy. Nếu bí, hãy thử làm bước 5 (chỉ vẽ rectangle) trước, xác nhận phát hiện đúng, rồi mới chuyển sang blur.

---

### ✅ Tóm lại

Mục tiêu gói gọn: detect biển số Nga bằng Haar cascade → vẽ rectangle → thay vùng đó bằng bản blur của chính nó. Hãy tự thử trước khi xem lời giải ở bài sau.
