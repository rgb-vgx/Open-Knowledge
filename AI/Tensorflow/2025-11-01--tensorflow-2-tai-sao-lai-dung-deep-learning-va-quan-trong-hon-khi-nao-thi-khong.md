---
title: 'Tensorflow 2: Tại sao lại dùng Deep Learning? (Và quan trọng hơn: Khi nào
  thì KHÔNG?)'
date: '2025-11-01 11:13:09'
date_gmt: '2025-11-01 04:13:09'
modified: '2025-11-07 17:32:37'
status: publish
slug: tensorflow-2-tai-sao-lai-dung-deep-learning-va-quan-trong-hon-khi-nao-thi-khong
wordpress_id: 470
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/tensorflow-2-tai-sao-lai-dung-deep-learning-va-quan-trong-hon-khi-nao-thi-khong/
categories:
- Tensorflow
tags: []
---

Ở bài trước, chúng ta đã có cái nhìn tổng quan (rất nhanh) về deep learning là gì. Giờ là lúc cho câu hỏi tiếp theo: **Tại sao chúng ta lại muốn sử dụng machine learning (ML) hoặc deep learning (DL)?**

Câu trả lời đơn giản có thể là: "Tại sao không? Nó ngầu mà!"

Bạn có thể đã nghe nói về sức mạnh của AI, về những điều phi thường mà deep learning có thể làm. Và với vô số vấn đề trên thế giới, tại sao chúng ta không dùng nó để giải quyết?

Đó là một lý do, nhưng có một lý do khác còn tốt hơn.

### Lý do thực sự: Các vấn đề quá phức tạp

Hãy quay lại ví dụ về công thức nấu ăn của người bà Sicilian. Bạn hoàn toàn có thể lập trình các quy tắc cho món đó: "làm nóng lò", "cắt rau củ", "nướng gà 30 phút".

Nhưng bây giờ, hãy tưởng tượng bạn đang lập trình cho một chiếc **xe tự lái**.

Bạn có thể viết ra *tất cả* các quy tắc không?

- Quy tắc khi gặp đèn đỏ là gì?
- Quy tắc khi gặp đèn vàng?
- Quy tắc khi có một chiếc xe khác tạt đầu?
- Quy tắc khi trời mưa? Khi có sương mù? Khi có một đứa trẻ chạy ra đường?

Bạn có thể thấy vấn đề nhanh chóng vượt khỏi tầm kiểm soát như thế nào. Đối với những vấn" đề cực kỳ phức tạp mà bạn không thể liệt kê hết mọi quy tắc, deep learning có thể là giải pháp.

### Một quy tắc "thần kỳ" cần nhớ

Tôi tìm thấy một bình luận tuyệt vời trên YouTube từ một người xem tên là Yesui. Anh ấy nói:

> "Tôi nghĩ bạn có thể dùng ML cho **BẤT CỨ ĐIỀU GÌ**... miễn là bạn có thể **biến nó thành những con số** và lập trình cho nó tìm ra các quy luật."

Đây là một câu nói cực kỳ đắt giá. "Bất cứ điều gì từ vũ trụ... miễn là bạn có thể biến nó thành những con số." Hãy giữ câu nói đó trong đầu bạn. Chúng ta sẽ thực hành điều này rất nhiều.

---

### 🛑 Khoan đã! Khi nào KHÔNG nên dùng Machine Learning?

Đây là phần cực kỳ quan trọng. Đừng vội vã dùng deep learning cho mọi thứ.

Có một quy tắc vàng, thực tế là **Quy tắc số 1** trong Sổ tay Machine Learning của Google:

> **"Nếu bạn có thể xây dựng một hệ thống dựa trên quy tắc đơn giản mà không cần ML, thì hãy làm điều đó."**

Nếu bạn có thể giải quyết vấn đề của mình bằng một vài câu lệnh `if-else` hoặc một hệ thống quy tắc rõ ràng, thì hãy làm vậy. Nó sẽ nhanh hơn, dễ bảo trì hơn và dễ dự đoán hơn. Đừng dùng "súng" deep learning chỉ để "bắn một con ruồi".

---

### Tóm tắt nhanh: Deep Learning Tốt & Không Tốt cho việc gì?

Để giúp bạn dễ hình dung hơn, đây là một bản tóm tắt nhanh:

#### ✅ Deep Learning Tốt cho:

- **Các vấn đề có danh sách quy tắc dài vô tận:** Như xe tự lái hoặc nhận dạng hình ảnh. (Thử tưởng tượng bạn viết quy tắc để nhận diện 101 món ăn khác nhau xem!)
- **Các môi trường liên tục thay đổi:** Các mô hình DL có thể "học" (thích ứng) với dữ liệu mới khi vấn đề của bạn thay đổi.
- **Khám phá thông tin chi tiết (insights) từ các bộ dữ liệu khổng lồ:** Tìm kiếm các quy luật ẩn mà con người khó có thể nhìn thấy.

#### ❌ Deep Learning (thường) Không Tốt cho:

- **Khi bạn cần "Khả năng giải thích" (Explainability):** Các quy luật mà mô hình DL học được thường rất phức tạp và khó để con người diễn giải ("tại sao nó lại đưa ra quyết định này?").
- **Khi phương pháp truyền thống tốt hơn:** Nhắc lại Quy tắc số 1 của Google!
- **Khi lỗi lầm là không thể chấp nhận được:** Đầu ra của mô hình DL không phải lúc nào cũng có thể dự đoán 100%. Nếu bạn cần một hệ thống luôn làm *chính xác* một việc, một hệ thống dựa trên quy tắc có thể tốt hơn.
- **Khi bạn không có nhiều dữ liệu:** Các mô hình DL thường yêu cầu một lượng lớn dữ liệu để cho ra kết quả tốt. (Tuy nhiên, chúng ta sẽ học các kỹ thuật để giải quyết vấn đề này!)

---

### "Học Nông" vs. "Học Sâu": Chọn vũ khí nào?

Vậy, khi nào thì dùng "machine learning truyền thống" (còn gọi là các thuật toán "nông" - shallow algorithms) và khi nào dùng "deep learning"?

Đây là một quy tắc phân loại đơn giản nhưng cực kỳ hữu ích:

#### 1. Machine Learning (Cổ điển/Nông): Dành cho Dữ liệu có cấu trúc

- **Dữ liệu có cấu trúc (Structured Data)** là gì? Hãy nghĩ đến một bảng tính Excel hoặc Google Sheets. Nó có các hàng và các cột rõ ràng.
- **Ví dụ:** Một file Excel về doanh số bán xe hơi. Bạn có các cột: `Hãng xe`, `Màu sắc`, `Số km đã đi`, `Số cửa`, và cột cuối cùng là `Giá bán`.
- **Thuật toán:** Random Forest, Naive Bayes, Support Vector Machines (SVM), v.v.
- **Mục tiêu:** Bạn có thể muốn dự đoán `Giá bán` dựa trên các cột còn lại. Các thuật toán ML truyền thống thường hoạt động cực kỳ tốt với loại dữ liệu này.

#### 2. Deep Learning (Học sâu): Dành cho Dữ liệu Phi cấu trúc

- **Dữ liệu phi cấu trúc (Unstructured Data)** là gì? Là mọi thứ còn lại. Những thứ không dễ dàng để đưa vào các hàng và cột gọn gàng.
- **Ví dụ:**
  - **Văn bản:** Một bài báo Wikipedia, một bình luận trên mạng xã hội.
  - **Hình ảnh:** Ảnh chụp món ăn trong ứng dụng "101 Món ăn" của chúng ta.
  - **Âm thanh:** Các file nhạc, đoạn ghi âm giọng nói.
- **Thuật toán:** Neural Networks (Mạng nơ-ron)!
  - Mạng nơ-ron tích chập (CNN)
  - Mạng nơ-ron hồi quy (RNN)
  - Kiến trúc Transformer
- **Mục tiêu:** Deep learning (và các mạng nơ-ron) tỏa sáng khi xử lý các loại dữ liệu phức tạp này.

Trong khóa học này, chúng ta sẽ tập trung xây dựng 4 loại mạng nơ-ron nền tảng này bằng TensorFlow.

### Bước tiếp theo là gì?

Chúng ta đã nói rất nhiều về "mạng nơ-ron". Nhưng...

**Chính xác thì "Mạng nơ-ron" (Neural Networks) là gì?**

Đó chính là chủ đề cho bài viết tiếp theo của chúng ta. Hẹn gặp lại!
