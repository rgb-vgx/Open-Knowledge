---
title: 'Bài kiểm tra nhỏ: NumPy và Image'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 9
status: edited
source: '009 - NumPy and Image Assessment Test.md'
categories:
- AI
tags: []
---

# 📝 Bài kiểm tra nhỏ về NumPy và Image

> Nguồn: `009 - NumPy and Image Assessment Test.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12257490)

Đã đủ kiến thức về NumPy và Image để làm một bài assessment ngắn. Mục đích chỉ là kiểm tra xem các bạn đã nắm vài khái niệm chính trong các bài vừa rồi chưa. Bài này mô tả đề bài; bài tiếp theo sẽ là lời giải chi tiết.

### 📋 Cách làm

Notebook nằm trong thư mục **NumPy Image Basics**, tên là `03-NumPy Image Assessment`. Các bạn có hai lựa chọn:

* Tự làm bài assessment trước, rồi đối chiếu với bài solutions.
* Hoặc coi bài solutions như một buổi code-along.

Nhiệm vụ là hoàn thành các yêu cầu được in đậm trong notebook.

---

### ✅ Danh sách bài tập

1. **Import NumPy.**
2. **Tạo array 5 × 5 mà toàn bộ giá trị là 10.**
3. **Chạy cell tạo array số ngẫu nhiên và tìm hiểu xem nó hoạt động thế nào.**
4. **Tìm giá trị lớn nhất và nhỏ nhất trong array.**
5. **Dùng PIL và Matplotlib để đọc và hiển thị ảnh chú cún (puppy).**
6. **Chuyển ảnh sang NumPy array.**
7. **Dùng slicing đặt kênh đỏ và kênh xanh lá của ảnh về 0, rồi dùng `imshow` để chỉ hiển thị kênh xanh dương.**

---

### 💡 Gợi ý

Với bài tạo array 5 × 5 toàn số 10: ta đã biết cách tạo array toàn số 1 bằng `np.ones`. Từ array toàn 1, chỉ cần **nhân với một số** là có thể ra array toàn số đó — phép nhân được áp dụng trên từng phần tử (element-wise).

Với cell số ngẫu nhiên: hãy đọc documentation (Shift + Tab) để hiểu dòng lệnh đang làm gì, rồi tự tìm max và min.

Các bài còn lại gần như lặp lại thao tác trong hai bài trước: đọc ảnh bằng PIL, chuyển bằng `np.asarray`, và tách kênh bằng slicing. Bài trước ta tách kênh **đỏ**; lần này là kênh **xanh dương** — quy trình tương tự.

---

### 🧭 Vì sao bài này dễ

Đây là bài assessment đầu tiên và được thiết kế như một bước khởi động: các câu hỏi bám sát những lệnh đã làm trong hai bài trước, nên chỉ cần xem lại notebook của bài giảng là làm được. Các bài assessment sau sẽ sáng tạo hơn và không lấy trực tiếp từ bài giảng nữa.

---

### ✅ Tóm lại

Bài tập ôn lại đúng những viên gạch quan trọng nhất: tạo array, random, max/min, mở ảnh bằng PIL, chuyển sang NumPy, và tách kênh màu bằng slicing. Làm xong (hoặc xem xong) thì chuyển sang bài **solutions** để đối chiếu từng bước.
