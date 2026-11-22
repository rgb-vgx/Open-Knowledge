---
title: 'Deep learning nằm ở đâu trong bức tranh AI'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 2
status: edited
source: '002 - Course Welcome and What Is Deep Learning.md'
categories:
- AI
tags: []
---

# 🧠 Deep learning nằm ở đâu trong bức tranh AI?

> Nguồn: `002 - Course Welcome and What Is Deep Learning.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32932224)

Chào mừng các bạn đến với khóa deep learning bằng PyTorch. Bài này mình sẽ điểm qua thật nhanh **deep learning là gì**, đủ để các bạn có nền tảng bước vào phần thực hành. Mình không muốn sa đà vào định nghĩa — cái mình muốn là các bạn thấy mọi thứ vận hành ra sao.

### 🧠 Machine learning: biến mọi thứ thành con số

Định nghĩa gọn nhất: **machine learning là biến dữ liệu thành con số, rồi tìm pattern trong những con số đó**.

Dữ liệu có thể là gần như bất cứ thứ gì — ảnh, văn bản, bảng số, video, file âm thanh. Máy tính "yêu" con số, nên bước đầu luôn là chuyển mọi thứ về dạng số.

Ai tìm pattern? Không phải các bạn viết tay từng luật, mà là **thuật toán machine learning** — chính là thứ chúng ta sẽ xây trong khóa này. Bên dưới lớp code là toán học, nhưng khóa này tập trung vào **code**: các bạn viết code, code kích hoạt phần toán để tìm ra pattern.

### 🫧 Ba lớp bong bóng: AI, ML, Deep Learning

Hãy hình dung ba vòng tròn lồng nhau:

1. **Artificial intelligence (AI)** — chiếc bong bóng lớn ngoài cùng, gần như có thể định nghĩa theo bất kỳ cách nào các bạn muốn.
2. **Machine learning (ML)** — một tập con rộng bên trong AI.
3. **Deep learning** — tập con nằm trong ML, và đây chính là nơi khóa học tập trung, với PyTorch làm công cụ.

Thú thật, mình hay dùng lẫn hai khái niệm ML và deep learning. ML là chủ đề rộng hơn, deep learning tinh tế hơn một chút. Nhưng các bạn cứ tự hình thành định nghĩa riêng của mình — mình khuyến khích điều đó.

### 🥘 Lập trình truyền thống vs machine learning

Hãy lấy ví dụ món **gà nướng trứ danh của bà ngoại người Sicily**.

Trong **lập trình truyền thống**, các bạn có:

* **Input**: rau củ tươi, một con gà nuôi ở trại.
* **Rules**: viết tay từng bước — cắt rau, ướp gà, làm nóng lò, nướng 30 phút, thêm rau.
* **Output**: đĩa gà nướng hoàn hảo.

Các bạn tự viết toàn bộ luật, rồi input cộng rules ra output.

Với **machine learning**, cách làm đảo lại: các bạn đưa vào **input** và **output mong muốn**, thuật toán tự tìm ra **rules** — tức pattern nối input với output.

Đây thường được gọi là **supervised learning**: input còn có tên là **features**, output còn có tên là **labels**, và nhiệm vụ của thuật toán là tìm mối quan hệ giữa features và labels.

### 🍗 Nếu để máy học nấu món gà của bà

Các bạn sẽ thu thập thật nhiều input là nguyên liệu — rau củ, gà — và thật nhiều output là thành phẩm cuối cùng. Thuật toán machine learning sẽ tự tìm ra các bước để đi từ nguyên liệu đến đĩa gà.

Vậy là đủ để phân biệt lập trình truyền thống và machine learning. Phần còn lại của khóa học, chúng ta sẽ **encode** những thuật toán kiểu này bằng code.

### ❓ Câu hỏi để lại

Trước khi sang bài sau, mình muốn các bạn suy nghĩ: nếu phải tự mô tả toàn bộ các luật bằng tay, liệu việc đó có trở nên quá cồng kềnh không? Vì sao người ta lại chọn dùng machine learning thay vì lập trình truyền thống?

Các bạn ngẫm thử nhé, bài tiếp theo chúng ta sẽ trả lời.
