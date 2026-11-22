---
title: 'Deep learning được dùng cho những việc gì trong đời thực'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 13
status: edited
source: '013 - What Can Deep Learning Be Used For.md'
categories:
- AI
tags: []
---

# 🚀 Deep learning được dùng cho những việc gì?

> Nguồn: `013 - What Can Deep Learning Be Used For.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32656592)

Các bạn đã tự tìm hiểu về ứng dụng của deep learning chưa? Chắc hẳn các bạn đã thấy cả một kho báu. Bài này mình sẽ điểm qua vài ví dụ mình gặp trong đời sống hằng ngày, kèm theo cách phân loại các bài toán đó.

### 💡 Nhắc lại: có thể dùng cho bất cứ thứ gì chuyển được thành số

Vẫn là bình luận trên video **2020 Machine Learning Roadmap** của mình: bạn có thể dùng ML — và deep learning là một phần của ML — cho **bất cứ thứ gì**, miễn là chuyển được nó thành con số rồi lập trình để tìm pattern. Bất kỳ input hay output nào trong vũ trụ.

Liệu nó có **chạy được** không? Đó lại là chuyện khác. Machine learning và deep learning vừa là nghệ thuật, vừa là khoa học: nhà khoa học muốn thí nghiệm chắc chắn thành công, còn nghệ sĩ thì thấy hứng thú với chuyện "biết đâu nó chạy, biết đâu không".

Và nhớ rule số 1: nếu không cần thì đừng dùng. Nhưng nếu đã dùng, nó phục vụ được gần như mọi thứ.

### 🎬 Recommendation và translation

Mở YouTube lên, các bạn có còn gõ tìm kiếm nữa không? Trang **recommendation** giờ gợi ý hay đến mức nhiều khi không cần tìm. Tất cả đều nhờ deep learning.

Mười năm qua, dịch máy cũng tiến bộ vượt bậc — **Google Translate** giờ được vận hành hoàn toàn bằng deep learning.

### 🗣️ Speech recognition

Nếu các bạn nhờ trợ lý giọng nói dịch một câu, nó không chỉ hiển thị chữ mà còn đọc lên được. Đó là **speech recognition**, cũng nhờ deep learning.

### 👁️ Computer vision và object detection

Đây là câu chuyện thật của mình: một chiếc xe kéo rơ-moóc đâm vào sau xe mình đang đỗ trước tòa nhà, phá hỏng xe rồi bỏ chạy. Camera an ninh nhà hàng xóm có ghi lại được chiếc xe — nhưng lúc đó khoảng **3:30 sáng**, trời tối đen, và không đọc được biển số.

Mình mất cả tuần làm "thám tử". Và mình nghĩ: nếu camera đó có sẵn thuật toán **computer vision**, nó đã phát hiện được lúc xe đâm vào.

Cụ thể, đó là **object detection**: vẽ một khung bao quanh vùng pixel thể hiện rõ nhất vật thể cần tìm. Ta có thể huấn luyện object detector bắt các xe chạy qua một camera nhất định. Nếu ai đó gây tai nạn rồi bỏ chạy, bạn có bằng chứng — và hy vọng trời không tối đến mức không đọc được biển số.

### 📧 Natural language processing và lọc spam

Hộp thư của các bạn lọc spam khá tốt phải không? Một số hệ thống dùng deep learning, một số không — khó phân biệt những ngày này.

**Natural language processing (NLP)** là quá trình nhìn vào văn bản ngôn ngữ tự nhiên — email, truyện, tài liệu Wikipedia — và để thuật toán tìm pattern trong đó.

Ví dụ: một email "Khóa deep learning này tuyệt vời, mình không chờ được để áp dụng những gì đã học" là **không spam**. Còn "Chúc mừng, bạn trúng rất nhiều tiền" thì nhiều khả năng vào hộp spam.

### 🗂️ Phân loại các dạng bài toán

Đặt các ví dụ trên vào đúng loại bài toán:

* **Sequence-to-sequence (seq2seq)** — đưa một chuỗi vào, nhận một chuỗi ra. Dịch thuật là ví dụ; âm thanh (chuỗi sóng) thành văn bản cũng vậy.
* **Regression** — dự đoán một **con số**. Với object detection, đó là dự đoán tọa độ các góc của khung: cách mép trái bao nhiêu pixel theo trục x, cách mép trên bao nhiêu pixel theo trục y... rồi nối các góc lại thành khung.
* **Classification** — dự đoán xem thứ gì đó thuộc loại này hay loại kia. Với **multiclass classification** thì có thể nhiều hơn hai lớp. Email "không spam" là một class, email "spam" là một class khác.

### 🔜 Giờ thì đến PyTorch

Nền tảng đã xong. Chỉ còn một hướng để đi: bắt đầu nói về **PyTorch**. Hẹn gặp các bạn ở bài sau!
