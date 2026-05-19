---
title: 'Tensorflow 6: Tensor là gì?'
date: '2025-11-01 13:43:43'
date_gmt: '2025-11-01 06:43:43'
modified: '2025-11-07 17:32:26'
status: publish
slug: tensorflow-6-tensor-la-gi
wordpress_id: 482
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/tensorflow-6-tensor-la-gi/
categories:
- Tensorflow
tags: []
---

## 🔢 Tensor là gì? Nền tảng của Deep Learning

Tensor là một khái niệm nghe có vẻ phức tạp nhưng trên thực tế, nó là nguyên tắc cơ bản và cực kỳ đơn giản.

Hãy nhớ lại định nghĩa của chúng ta về machine learning: **"Biến dữ liệu thành số và tìm quy luật trong các con số đó."**

### Tensor: Cách Biểu diễn Số của Dữ liệu

Định nghĩa cơ bản nhất về **Tensor** là:

> **Tensor là cách biểu diễn dữ liệu dưới dạng số.**

Nói cách khác, khi bạn chuyển đổi bất kỳ loại dữ liệu nào (hình ảnh, văn bản, âm thanh) thành một dạng mã hóa số để máy tính có thể xử lý, thì bạn đang tạo ra một **Tensor**.

### 🌊 TensorFlow: Dòng chảy của các Tensor

Đây là cách mà Tensor hoạt động trong mạng nơ-ron, giải thích cho cái tên **TensorFlow (Dòng chảy của Tensor)**:

1. **Input Tensor:** Dữ liệu đầu vào của bạn (ví dụ: ảnh món ăn) được chuyển thành **Mã hóa Số (Numerical Encoding)**—chính là **Tensor** đầu tiên.
2. **Flow:** Tensor này được đưa (flow) vào mạng nơ-ron của bạn.
3. **Học quy luật:** Mạng nơ-ron xử lý Tensor này để tìm ra các quy luật.
4. **Output Tensor:** Mạng nơ-ron tạo ra một **Tensor** khác, đại diện cho những quy luật mà nó đã học được (Đầu ra Biểu diễn).
5. **Flow Ra ngoài:** Chúng ta lấy Tensor đầu ra này và chuyển đổi nó thành một kết quả mà con người hiểu được (ví dụ: nhãn "Ramen").

Tất cả quá trình từ đầu vào số, qua mạng nơ-ron, và đến đầu ra số là một **Dòng chảy (Flow)** của các **Tensor**.

---

### Mức độ Tensors

Nếu bạn muốn hiểu rõ hơn (bài tập về nhà của bạn!), một Tensor về mặt toán học là một **mảng đa chiều (multidimensional array)**. Tùy thuộc vào loại dữ liệu, Tensor sẽ có số chiều (dimension) khác nhau:

| Dữ liệu | Tên gọi Tensor | Số chiều (Dimension) | Hình dung |
| --- | --- | --- | --- |
| Số đơn lẻ (Độ vô hướng) | **Scalar** | 0 chiều | Một số: 5 |
| Danh sách số | **Vector** | 1 chiều | Một danh sách: [1, 2, 3] |
| Bảng tính (Rows, Columns) | **Ma trận (Matrix)** | 2 chiều | Ảnh đen trắng, Bảng dữ liệu: [13​24​] |
| Ảnh màu (Rộng, Cao, Kênh màu) | **Tensor** | 3 chiều trở lên | Ảnh màu, Dữ liệu Video, Âm thanh |

Tensor là một thuật ngữ bao trùm tất cả các cấp độ biểu diễn số này.

---

### 🎬 Bài tập về nhà

Để mở rộng kiến thức, tôi khuyến khích bạn xem video này trên YouTube. Đây là một trong những lời giải thích trực quan nhất về Tensor từ một góc độ toán học:

> ---
>
> **"What is a Tensor?"** (Tìm kiếm video của Dan Fletcher trên YouTube)

Hãy xem giải thích của Dan (một Dan khác!) và đối chiếu với những gì chúng ta đã học. Bạn sẽ thấy mọi thứ khớp nhau một cách hoàn hảo!

---

Chúng ta đã bao quát: Deep Learning là gì, Mạng Nơ-ron là gì, Tại sao dùng DL, TensorFlow là gì và Tensor là gì.

Trong bài học tiếp theo, chúng ta sẽ xem xét lộ trình của khóa học này và tìm hiểu những gì chúng ta sẽ bắt tay vào xây dựng! **Bạn đã sẵn sàng để bắt đầu hành trình thực hành chưa?**
