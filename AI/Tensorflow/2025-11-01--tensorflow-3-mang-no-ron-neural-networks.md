---
title: 'Tensorflow 3: Mạng Nơ-ron (Neural Networks)'
date: '2025-11-01 11:56:46'
date_gmt: '2025-11-01 04:56:46'
modified: '2025-11-07 17:32:35'
status: publish
slug: tensorflow-3-mang-no-ron-neural-networks
wordpress_id: 473
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/tensorflow-3-mang-no-ron-neural-networks/
categories:
- Tensorflow
tags: []
---

## 🧠 Mạng Nơ-ron là gì? Giải mã Trái tim của Deep Learning

Như chúng ta đã thấy, mạng nơ-ron là thuật toán phổ biến nhất trong deep learning. Vậy, chính xác thì chúng là gì?

Nếu bạn tra cứu, bạn sẽ thấy những định nghĩa phức tạp như: "một mạng lưới các mạch hoặc nơ-ron, hoặc theo nghĩa hiện đại là một mạng lưới nút nhân tạo được cấu tạo từ các nơ-ron hoặc nút nhân tạo."

Tuy nhiên, đừng để những từ ngữ đó làm bạn rối. Hãy nhìn vào quy trình làm việc của một mạng nơ-ron:

### 4 Bước Biến Dữ liệu thành Thông tin Ý nghĩa

Cả quá trình của một mạng nơ-ron có thể được chia thành bốn bước đơn giản:

#### Bước 1: Dữ liệu (Inputs) → Mã hóa thành Số (Numerical Encoding)

Dù bạn có đang xử lý ảnh món ăn, đoạn văn bản, hay sóng âm thanh, bước đầu tiên là **biến dữ liệu đó thành các con số**.

- **Tại sao?** Máy tính và các mô hình deep learning chỉ hiểu được số.
- Quá trình này được gọi là **Mã hóa Số (Numerical Encoding)**.
- Tập hợp các con số này thường được gọi là **Tensor** (chúng ta sẽ sớm làm quen với thuật ngữ TensorFlow!).

> **Nhớ lại định nghĩa ML:** **"Biến dữ liệu thành số và tìm quy luật trong các con số."** Đây chính là bước "biến thành số"!

#### Bước 2: Tìm kiếm Quy luật (Patterns)

Các con số đại diện cho dữ liệu của bạn được đưa vào mạng nơ-ron.

- Mạng nơ-ron sẽ **tìm kiếm và học một biểu diễn** của các quy luật, đặc trưng (features), hoặc trọng số (weights) trong những con số đó.
- Tùy thuộc vào vấn đề (nhận dạng hình ảnh, dịch thuật, phân tích giọng nói), bạn sẽ chọn một loại mạng nơ-ron phù hợp.

#### Bước 3: Tạo Đầu ra Biểu diễn (Representation Outputs)

Sau khi tìm được quy luật, mạng nơ-ron sẽ tạo ra một bộ **Đầu ra Biểu diễn** mới.

- Đây là một tập hợp các con số đã được biến đổi, thể hiện các quy luật mà mô hình tìm thấy.
- Lúc này, những con số này vẫn **chưa có ý nghĩa** với con người. Nó giống như việc mô hình nói: "Đây là những quy luật tôi tìm được, dưới dạng số."

#### Bước 4: Chuyển đổi thành Đầu ra Con người hiểu được (Human-Understandable Outputs)

Đây là lúc chúng ta can thiệp!

- Chúng ta sẽ viết code để chuyển đổi những **Đầu ra Biểu diễn** phức tạp kia thành **Đầu ra rõ ràng** mà chúng ta muốn.
- **Ví dụ:**
  - Ảnh Ramen (Input) → Mã hóa số → Mạng Nơ-ron → Đầu ra Biểu diễn → **Nhãn: "Ramen"** (Output).
  - Sóng âm thanh câu nói → ... → **Văn bản: "Hey Siri, thời tiết hôm nay thế nào?"** (Output).

---

### 🔎 Giải phẫu Mạng Nơ-ron (Anatomy)

Một mạng nơ-ron thường có ba phần chính, được biểu thị bằng các "lớp" (layers) hoặc "nơ-ron" (neurons/nodes):

1. **Lớp Đầu vào (Input Layer):**
   - Là nơi dữ liệu dưới dạng số (Tensor) đi vào.
   - Thường chỉ có một lớp đầu vào.
2. **Lớp Ẩn (Hidden Layers):**
   - **Đây là nơi việc "học" diễn ra.** Các lớp ẩn tìm ra các quy luật, tính năng, và mối quan hệ phức tạp trong dữ liệu.
   - Có thể có **một** lớp ẩn hoặc **rất nhiều** lớp ẩn (từ đó sinh ra thuật ngữ **"Deep" Learning** - học *sâu*).
3. **Lớp Đầu ra (Output Layer):**
   - Tạo ra đầu ra cuối cùng, thường là **xác suất dự đoán** (ví dụ: 95% là Ramen, 5% là Spaghetti).
   - Số lượng nơ-ron ở lớp đầu ra phụ thuộc vào vấn đề của bạn (ví dụ: nếu bạn phân loại 101 món ăn, bạn cần 101 nơ-ron đầu ra).

> **Lưu ý về Thuật ngữ:** Khi tôi nói **"quy luật"** (patterns), bạn cũng có thể nghe thấy các thuật ngữ khác như **"embedding"**, **"trọng số" (weights)**, hoặc **"biểu diễn đặc trưng" (feature representation)**. Tất cả chúng đều đề cập đến những thông tin mà mô hình học được để làm việc.

---

### 📚 Các Loại Hình Học (Learning Types)

Ngoài cấu trúc, chúng ta còn cần biết mô hình học bằng cách nào. Có bốn loại hình học chính:

| Loại hình Học | Dữ liệu → Đặc điểm | Mục đích | Ví dụ |
| --- | --- | --- | --- |
| **Học có Giám sát (Supervised Learning)** | **Dữ liệu và Nhãn** (Labels) | Dự đoán một nhãn dựa trên dữ liệu. | Cho mô hình 10.000 ảnh và 10.000 nhãn kèm theo ("Ramen", "Spaghetti"). |
| **Học Bán Giám sát (Semi-Supervised Learning)** | Dữ liệu và **Một số** Nhãn | Tận dụng cả dữ liệu có nhãn và không nhãn. | 10.000 ảnh nhưng chỉ 1.000 ảnh có nhãn. Mô hình tự học từ số còn lại. |
| **Học Không Giám sát (Unsupervised Learning)** | **Chỉ có Dữ liệu** (Không có nhãn) | Tìm kiếm cấu trúc hoặc phân nhóm ẩn trong dữ liệu. | Cho mô hình 10.000 ảnh và yêu cầu nó tự nhóm chúng thành 5 nhóm dựa trên sự tương đồng. |
| **Học Chuyển giao (Transfer Learning)** | Tận dụng Kiến thức | Tái sử dụng kiến thức đã học được từ một vấn đề/tập dữ liệu khác. | Dùng một mô hình đã được huấn luyện với hàng triệu ảnh chung (của thế giới) để giúp giải quyết vấn đề phân loại *ảnh món ăn* của chúng ta. |

Trong khóa học này, chúng ta sẽ tập trung vào việc viết code cho **Học có Giám sát** và **Học Chuyển giao** - hai phương pháp phổ biến và mạnh mẽ nhất.

---

Bây giờ chúng ta đã biết Deep Learning là gì, tại sao nên dùng, và Mạng Nơ-ron hoạt động ra sao. Vậy câu hỏi lớn tiếp theo là:

**Deep Learning thực sự được sử dụng để làm gì trong thế giới thực?**
