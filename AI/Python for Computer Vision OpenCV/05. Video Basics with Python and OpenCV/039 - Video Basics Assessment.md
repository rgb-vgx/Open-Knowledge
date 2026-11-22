---
title: 'Bài tập Video Basics: click đâu vẽ vòng tròn xanh dương ở đó'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 39
status: edited
source: '039 - Video Basics Assessment.md'
categories:
- AI
tags: []
---

# 🎯 Bài tập Video Basics: click đâu vẽ vòng tròn xanh dương ở đó

> Nguồn: `039 - Video Basics Assessment.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257706)

Khép lại section Video Basics bằng một project nhỏ. Bài này mình giới thiệu đề bài và kết quả mong đợi; phần lời giải nằm ở bài kế tiếp.

### 📋 Đề bài

Chỉ có một yêu cầu: viết chương trình **đọc live stream từ camera** trên máy bạn. Nếu không có USB camera thì mở một **file video** có sẵn cũng được.

Sau đó, **bất kỳ chỗ nào bạn click chuột trái**, chương trình vẽ một **vòng tròn màu xanh dương** ngay tại điểm vừa click.

Kết quả đúng trông như thế này: video vẫn chạy liên tục, và mỗi lần click, một vòng tròn rỗng màu xanh dương hiện ra tại vị trí con trỏ.

---

### 🧭 Các mức độ thử thách

Notebook assessment có sẵn một file guide. Bạn chọn một trong ba cách:

1. **Khó nhất** — chỉ đọc mô tả đề bài, mở notebook mới, tự làm từ đầu, không xem guide.
2. **Trung bình** — xem guide để lấy vài gợi ý về các bước cần làm.
3. **Dễ nhất** — cuộn xuống, guide có sẵn các dòng code với comment mô tả từng bước tiếp theo.

Ngoài ra có thể coi đây là một **code-along**: nhảy thẳng sang bài solutions và gõ theo.

---

### 💡 Gợi ý lớn nhất

Project này **rất giống** phần vẽ hình chữ nhật đỏ ở bài trước. Khác biệt duy nhất là thay vì vẽ hình chữ nhật, bạn vẽ **vòng tròn xanh dương**. Mọi mảnh ghép — global variable, callback chuột, vòng lặp đọc frame, `imshow`, phím thoát — đều đã có trong bài "Vẽ lên camera trực tiếp".

---

### ✅ Tóm lại

Đề bài ngắn nhưng gói trọn toàn bộ section: camera hoặc video, xử lý sự kiện chuột, vẽ lên frame. Cứ thử làm trước rồi hãy xem lời giải ở bài sau — tự vật lộn một chút sẽ nhớ lâu hơn.
