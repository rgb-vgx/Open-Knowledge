---
title: 'Machine learning là gì và quy trình học có giám sát'
date: '2026-11-23'
course: 'python-opencv-cv'
lesson: 66
status: edited
source: '066 - Machine Learning Basics.md'
categories:
- AI
tags: []
---

# 🧠 Machine learning là gì và quy trình học có giám sát

> Nguồn: `066 - Machine Learning Basics.md` · [Udemy](https://viettel.udemy.com/course/python-for-computer-vision-with-opencv-and-deep-learning/learn/lecture/12606856)

Trước khi đụng tới neural network hay YOLO, ta cần một chút trực giác về machine learning, cụ thể là **supervised learning** — kiểu học mà cả section này sẽ dùng. Bài này giữ phần toán ở mức nhẹ, tập trung vào ý tưởng và quy trình.

### 🔄 Đảo ngược cách lập trình

Từ đầu khóa tới giờ, mọi thao tác với ảnh đều theo hướng: đưa ảnh vào, bảo máy tính làm từng bước (thresholding, morphological operators, filter...), rồi nhận kết quả.

Machine learning lật ngược lại: ta đưa vào **input** và **output mong muốn** (ví dụ nhãn "dog" hay "cat"), thuật toán tự tìm ra cách xử lý tốt nhất ở giữa. Định nghĩa trong bài: machine learning là phương pháp phân tích dữ liệu tự động hóa việc xây dựng mô hình, dùng các thuật toán học lặp đi lặp lại từ dữ liệu để tìm ra những quy luật ẩn mà không cần lập trình tường minh.

Ứng dụng rộng hơn ảnh rất nhiều: phát hiện gian lận thẻ tín dụng, mô hình định giá, nhận dạng pattern và ảnh, phân tích cảm xúc văn bản, recommendation engine. Trong khóa này ta chỉ quan tâm phần áp dụng vào phân tích ảnh.

### 🐶 Supervised learning: học từ dữ liệu có nhãn

Thuật toán supervised learning được huấn luyện bằng các cặp **input – output đã biết**. Ví dụ: ảnh con chó được gắn nhãn "dog", ảnh con mèo gắn nhãn "cat", do con người dán nhãn thủ công.

Cách học diễn ra như sau:

1. Nhận một tập input kèm output đúng tương ứng.
2. So sánh output thực tế của mô hình với output đúng để tìm ra sai số.
3. Điều chỉnh mô hình theo sai số đó.

Sau khi huấn luyện xong, đưa vào một ảnh mới chưa có nhãn, mô hình sẽ dự đoán đó là chó hay mèo. Kiểu học này phù hợp khi dữ liệu quá khứ có thể dự đoán sự kiện trong tương lai — dữ liệu ảnh cũ dự đoán ảnh mới.

### 📋 Quy trình machine learning

Đây là phần cốt lõi của bài, và cũng là bộ khung lặp lại suốt section:

1. **Thu thập dữ liệu.** Với ảnh, dữ liệu có thể đến từ khách hàng upload ảnh phòng khách, hoặc từ cảm biến trên xe tự hành chụp mặt đường để làm lane detection. Trong khóa này dữ liệu đã được chuẩn bị sẵn.
2. **Làm sạch và định dạng dữ liệu.** Ảnh thực tế thường khác kích thước, khác định dạng, có ảnh bị xoay lệch. Keras có sẵn các công cụ cho việc này, đáng chú ý là **image data generator** có thể kéo giãn và resize ảnh theo nhu cầu.
3. **Chia train/test.** Tách dữ liệu thành hai phần, ví dụ 30% làm test set và 70% làm training set.
4. **Huấn luyện.** Xây dựng và fit mô hình chỉ trên training data.
5. **Đánh giá.** Chạy mô hình trên test data — tập mà ta đã biết nhãn đúng — rồi so sánh kết quả dự đoán với nhãn thật.
6. **Tinh chỉnh và lặp.** Nếu cần đổi tham số, quay lại bước huấn luyện, fit lại rồi test lại. Chu trình này lặp tới khi các độ đo đánh giá đạt mức hài lòng.
7. **Triển khai.** Dùng mô hình dự đoán trên dữ liệu mới, nằm ngoài tập ban đầu.

Phân loại và nhận dạng ảnh là ứng dụng rất phổ biến của deep learning với OpenCV và Keras, nên bài tiếp theo sẽ đào sâu vào hai bước quan trọng nhất của vòng lặp trên: huấn luyện mô hình và đánh giá mô hình bằng **classification metrics** — accuracy, precision, recall.
