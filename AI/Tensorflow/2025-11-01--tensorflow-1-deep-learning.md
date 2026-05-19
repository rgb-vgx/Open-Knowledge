---
title: 'TensorFlow 1: Deep Learning'
date: '2025-11-01 11:11:19'
date_gmt: '2025-11-01 04:11:19'
modified: '2025-11-07 17:32:40'
status: publish
slug: tensorflow-1-deep-learning
wordpress_id: 468
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/tensorflow-1-deep-learning/
categories:
- Tensorflow
tags: []
---

### 🧐 "Deep Learning" chính xác là gì?

Giống như bất kỳ ai trong chúng ta, khi có một câu hỏi, việc đầu tiên là... hỏi Google!

Google nói:

> "Deep learning là một loại hình machine learning (học máy) dựa trên mạng nơ-ron nhân tạo, trong đó nhiều lớp xử lý được sử dụng để trích xuất các đặc trưng cấp cao hơn từ dữ liệu."

Chà. Nghe có vẻ phức tạp quá nhỉ!

Bạn có thể nghĩ, "Tại sao chúng ta lại tra Google ngay khi vừa bắt đầu?" Vâng, đối với những câu hỏi về định nghĩa, tôi muốn bạn làm quen với việc tự mình tìm kiếm và nghiênch cứu.

Tại sao? Bởi vì trong hành trình này, chúng ta sẽ tập trung vào **thực hành càng nhanh càng tốt.** Chúng ta sẽ viết rất nhiều code.

---

### 🚀 Một định nghĩa đơn giản (và thực tế) hơn

Vì vậy, hãy đến với định nghĩa "dễ hiểu" hơn mà chúng ta sẽ sử dụng:

> **Machine learning (Học máy) là biến mọi thứ (dữ liệu) thành các con số và tìm kiếm các quy luật (patterns) trong những con số đó.**

Vậy việc "tìm kiếm quy luật" này xảy ra như thế nào?

Máy tính sẽ tự làm phần này thông qua **code và toán học**. Và chúng ta sẽ viết rất nhiều code—cụ thể là code deep learning với TensorFlow—để thực hiện điều đó.

### AI, Machine Learning, và Deep Learning

Lúc này, bạn có thể thắc mắc: "Này Daniel, tôi đăng ký học deep learning, sao anh lại nói về machine learning?"

Đó là một câu hỏi tuyệt vời. Hãy nhìn vào bức tranh toàn cảnh.

Bạn có thể tìm thấy nhiều biểu đồ trên Google mô tả mối quan hệ này. Về cơ bản, nó trông như thế này:

- **Trí tuệ nhân tạo (Artificial Intelligence - AI)** là một lĩnh vực rộng lớn, với mục tiêu chung là làm cho máy móc "suy nghĩ" hoặc "hành động" như con người.
- **Machine Learning (ML)** là một **tiểu lĩnh vực (subfield) của AI**. Thay vì lập trình rõ ràng cho máy tính mọi quy tắc, ML cho phép máy tính tự học các quy luật từ dữ liệu.
- **Deep Learning (DL)** là một **tiểu lĩnh vực của Machine Learning**. Nó sử dụng các cấu trúc cụ thể (gọi là mạng nơ-ron sâu) để tìm ra các quy luật phức tạp hơn, đặc biệt hiệu quả với dữ liệu như hình ảnh, âm thanh và văn bản.

Vì vậy, khi chúng ta học deep learning, chúng ta cũng đang học machine learning, vốn là một phần của AI. Hiện tại, đó là tất cả những gì bạn cần biết!

---

### 🧑‍🍳 Lập trình truyền thống vs. Lập trình Machine Learning

Đây là điểm mấu chốt. Cách "lập trình" của machine learning khác biệt cơ bản so với lập trình truyền thống.

Hãy tưởng tượng bạn muốn làm món gà nướng theo công thức gia truyền của bà.

#### Lập trình truyền thống (Công thức của Bà)

Với lập trình truyền thống, bạn bắt đầu với **Nguyên liệu (Inputs)** và **Quy tắc (Rules)**.

- **Inputs:** Gà, rau củ, gia vị.
- **Rules (Công thức):**
  1. Cắt rau củ.
  2. Ướp gà.
  3. Làm nóng lò nướng ở 180°C.
  4. Nướng gà trong 30 phút.
  5. Thêm rau củ và nướng thêm 15 phút.
- **Outputs (Kết quả):** Một món gà nướng tuyệt hảo!

Nói tóm lại: **Inputs + Rules = Outputs**

---

#### Lập trình Machine Learning (Học từ Kết quả)

Với machine learning (hoặc deep learning), bạn lật ngược tình thế. Bạn bắt đầu với **Nguyên liệu (Inputs)** và **Kết quả lý tưởng (Outputs)**.

- **Inputs:** Hàng ngàn bức ảnh về gà sống và rau củ.
- **Outputs:** Hàng ngàn bức ảnh tương ứng về món gà nướng đã hoàn thành, trông thật ngon mắt.

Bạn cung cấp cho thuật toán machine learning cả hai thứ này và nói: "Này, đây là đầu vào và đây là kết quả tôi muốn. **Giờ hãy tự tìm ra các Quy tắc (Rules) để biến cái này thành cái kia.**"

Nói tóm lại: **Inputs + Outputs = Rules**

Đây chính là sự khác biệt cốt lõi. Trong suốt hành trình của mình, chúng ta sẽ liên tục làm quen với khái niệm "Inputs" và "Outputs" này. Thuật toán sẽ tự mình tìm ra các quy tắc lý tưởng (hy vọng là vậy!) để đi từ đầu vào đến đầu ra mong muốn.

Đó là machine learning và deep learning trong một vỏ hạt dẻ!

Trong bài viết tiếp theo, chúng ta sẽ trả lời câu hỏi: **Tại sao chúng ta lại muốn sử dụng machine learning/deep learning ngay từ đầu?** Hẹn gặp lại!
