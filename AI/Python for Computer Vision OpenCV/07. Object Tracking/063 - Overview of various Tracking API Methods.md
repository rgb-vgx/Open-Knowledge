---
title: 'So sánh các tracking API dựng sẵn trong OpenCV: Boosting, MIL, KCF, TLD, MedianFlow'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 63
status: edited
source: '063 - Overview of various Tracking API Methods.md'
categories:
- AI
tags: []
---

# 🧰 Tổng quan 5 tracking API dựng sẵn của OpenCV

> Nguồn: `063 - Overview of various Tracking API Methods.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12504838)

Nếu tự cài đặt từng thuật toán tracking thì phải mất cả một khóa học. May mắn là OpenCV đã đóng gói nhiều phương pháp thành **API một dòng**, cho phép hoán đổi qua lại tùy video và đối tượng. Bài này mình điểm qua năm tracker phổ biến cùng ưu nhược điểm của chúng.

### 🚀 Boosting tracker

Đây là tracker dựa trên **AdaBoost** — chính thuật toán nền của bộ phát hiện khuôn mặt **HAAR Cascade** mà ta đã dùng. Việc đánh giá được thực hiện qua nhiều frame.

* **Ưu điểm**: thuật toán rất nổi tiếng, được nghiên cứu kỹ, có nhiều tài liệu.
* **Nhược điểm**: không biết khi nào tracking đã thất bại. Khuôn mặt rời khỏi video mà nó vẫn tưởng đang track một thứ gì đó. Ngoài ra đã có nhiều phương pháp tốt hơn, nên Boosting hiếm khi là lựa chọn đầu tiên.

---

### 🎯 MIL tracker

**Multiple Instance Learning** là bản cải tiến của Boosting. Thay vì một điểm, nó xét một **vùng lân cận** quanh vị trí hiện tại để tạo ra nhiều instance — đó là nguồn gốc cái tên.

* **Ưu điểm**: hiệu năng tốt, ít bị drift hơn Boosting. Nên dùng MIL thay cho Boosting.
* **Nhược điểm**: vẫn không báo lại khi mất dấu đối tượng, và không thể phục hồi sau khi bị che khuất hoàn toàn.

---

### ⚡ KCF tracker

**Kernelized Correlation Filters** khai thác đặc điểm là các instance của MIL thường **chồng lấn** nhau, dùng các hàm toán học thuận lợi trên vùng chồng lấn để track nhanh và chính xác hơn.

Có thể thấy chuỗi cải tiến: MIL tốt hơn Boosting, KCF tốt hơn MIL. KCF là **lựa chọn đầu tiên** mình khuyên dùng — nếu nó đáp ứng nhu cầu thì không cần tìm tracker phức tạp hơn.

* **Ưu điểm**: hiệu năng cao, nhanh, độ chính xác tốt.
* **Nhược điểm**: khó phục hồi sau khi bị che khuất hoàn toàn; nếu đối tượng di chuyển quá nhanh hoặc bị vật khác che, nó báo thất bại và có thể không bắt lại được khi đối tượng quay lại.

---

### 🔄 TLD tracker

**Tracking, Learning and Detection** phối hợp ba thành phần:

1. **Tracker** theo đối tượng qua từng frame.
2. **Detector** định vị mọi hình dạng đã quan sát được và sửa lại tracker khi cần.
3. **Learning** ước lượng lỗi của detector và cập nhật để tránh lặp lại lỗi.

* **Ưu điểm**: hoạt động tốt khi bị che khuất hoặc khi vật di chuyển nhanh, thay đổi scale lớn (ví dụ ô tô lao lại gần camera).
* **Nhược điểm**: sinh nhiều **false positive** — đôi khi track nhầm thứ không còn là đối tượng ban đầu. Đó là cái giá phải trả cho khả năng chống che khuất.

---

### 📏 MedianFlow tracker

Tracker này chạy đối tượng theo cả **chiều thuận và chiều ngược thời gian**, rồi đo sai lệch giữa hai quỹ đạo.

* **Ưu điểm**: báo thất bại rất tốt — mất đối tượng là biết ngay; đặc biệt hợp với chuyển động **dự đoán được** (xe chạy trên đường đua, vật lặp lại cùng quỹ đạo).
* **Nhược điểm**: thất bại khi có **large motion**, tức bước nhảy lớn giữa hai frame — hiểu đơn giản là vật di chuyển quá nhanh.

---

### 📊 Bảng so sánh nhanh

| Tracker | Nền tảng | Mạnh nhất | Yếu nhất |
|---|---|---|---|
| Boosting | AdaBoost | Nhiều tài liệu | Không biết khi mất dấu |
| MIL | Boosting + multiple instances | Ít drift | Không phục hồi sau che khuất |
| KCF | Correlation filters | Nhanh, chính xác | Không phục hồi sau che khuất |
| TLD | Track + learn + detect | Chống che khuất, đổi scale | Nhiều false positive |
| MedianFlow | Thuận/ngược thời gian | Báo thất bại tốt | Thất bại khi chuyển động lớn |

---

### 💡 Chọn tracker nào?

Bắt đầu với **KCF**. Chỉ khi gặp vấn đề cụ thể — che khuất nhiều thì thử TLD, chuyển động đều đặn thì MedianFlow — mới cần đổi. Bài sau mình mở notebook mẫu để chạy thử từng tracker và tận mắt thấy sự khác biệt.
