---
title: Chu trình giải quyết vấn đề trong phỏng vấn kỹ thuật
date: '2025-10-26 15:28:12'
date_gmt: '2025-10-26 08:28:12'
modified: '2025-10-26 15:28:12'
status: publish
slug: chu-trinh-giai-quyet-van-de-trong-phong-van-ky-thuat
wordpress_id: 425
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/chu-trinh-giai-quyet-van-de-trong-phong-van-ky-thuat/
categories:
- Uncategorized
tags: []
---

Đây là chu trình giúp bạn nhất quán trong các buổi phỏng vấn.

### 1. Hiểu rõ đề bài (Understanding the Problem Statement)

Đây là bước cơ bản và quan trọng nhất.

#### 🎯 **Mục tiêu:**

- Đảm bảo bạn thực sự hiểu vấn đề cần giải quyết.

#### ⚠️ **Sai lầm phổ biến:**

- Vội vàng lao vào giải quyết vấn đề ngay lập tức. Các vấn đề thực tế thường mơ hồ và không rõ ràng.
- Giải quyết sai vấn đề, lãng phí thời gian.

#### 📝 **Các bước thực hiện:**

1. **Đọc kỹ đề bài:** Đọc một cách cẩn thận để chắc chắn hiểu rõ.
2. **Đơn giản hóa và diễn giải lại:** Nếu đề bài không rõ ràng, hãy thử đơn giản hóa, diễn giải lại bằng lời của bạn.
3. **Xác nhận với người phỏng vấn:** Hỏi lại người phỏng vấn để xác nhận bạn đã hiểu đúng nhiệm vụ cần làm.

#### 💡 **Ví dụ:**

- Đề bài có thể rất ngắn gọn: "Cho một cây tìm kiếm nhị phân (Binary Search Tree), hãy tính toán một cây tìm kiếm nhị phân cân bằng mới."
- Người phỏng vấn có thể cung cấp ví dụ về cây cũ và cây cân bằng mới.
- Đôi khi, người phỏng vấn chỉ giải thích miệng, điều này cần bạn đặc biệt chú ý để làm rõ.

### 2. Đặt câu hỏi đúng (Asking the Right Questions)

Sau khi bạn nghĩ rằng đã hiểu vấn đề, bước tiếp theo là đặt câu hỏi để làm rõ.

#### 🎯 **Mục tiêu:**

- Làm rõ các yêu cầu mơ hồ, thiếu sót.
- Thể hiện khả năng giao tiếp và tư duy phản biện của bạn. Người phỏng vấn có thể cố tình đưa ra vấn đề mơ hồ để xem bạn có đặt câu hỏi không.

#### ⚠️ **Cảnh báo:**

- **KHÔNG đưa ra giả định (Don't make assumptions):** Luôn giao tiếp với người phỏng vấn.

#### 📝 **Các bước thực hiện:**

1. **Hỏi về những điểm không rõ ràng/thiếu sót:** Nếu có bất kỳ điều gì không rõ ràng hoặc thiếu sót, hãy hỏi.
2. **Truyền đạt các giả định của bạn:**
   - Thay vì tự giả định, hãy nói rõ giả định của bạn và hỏi người phỏng vấn liệu nó có đúng không.
   - Ví dụ: "Tôi giả định vector sẽ có các giá trị không âm. Điều này có đúng không?" hoặc "Ma trận có giá trị trùng lặp không?"

#### 🧠 **Những điều cần cân nhắc khi đặt câu hỏi:**

- **Đối với vector/list:**
  - Có thể rỗng không?
  - Có giá trị dương, âm, trùng lặp không?
- **Đối với kết quả trả về:**
  - Có thể rỗng không?
  - Nếu là số, kết quả có vừa với kiểu dữ liệu `integer` không (quan trọng với C++, không quan trọng với Python)?
- **Đối với chuỗi (string):**
  - Có chữ thường, chữ hoa, chữ số, dấu câu, khoảng trắng không?
  - Có phải là Unicode không? (Unicode có phạm vi ký tự lớn hơn nhiều so với chỉ 26 chữ cái thường).
- **Đối với đồ thị (graph):**
  - Có phải là cây (tree) không?
  - Có phải là DAG (Directed Acyclic Graph) không?
  - Có nhiều cạnh với chi phí khác nhau không?
  - Các cạnh có giá trị không âm không?
  - Có tự lặp (self-loops) không?
  - Có nhiều cạnh giữa hai đỉnh không?

#### 🗣️ **Phản ứng của người phỏng vấn:**

- Trong nhiều trường hợp, người phỏng vấn sẽ nói bạn có thể giả định mọi thứ là đơn giản và sẽ xem xét các biến chứng sau.
- Tuy nhiên, việc chủ động truyền đạt các câu hỏi và giả định sớm là rất tốt.

### 3. Định nghĩa chữ ký hàm và các ràng buộc (Defining Function Signature and Constraints)

Trong phỏng vấn, bạn thường sẽ phải tự định nghĩa chữ ký hàm (khác với LeetCode thường cung cấp sẵn).

#### 📝 **Các bước thực hiện:**

1. **Định nghĩa tham số và giá trị trả về:**
   - Nói rõ các tham số đầu vào và kiểu giá trị trả về mà bạn dự định sử dụng.
   - Ví dụ: "Tôi giả định đây là các tham số và đây là giá trị trả về."
2. **Truyền đạt giả định về tham số/giá trị trả về:**
   - Nếu có bất kỳ giả định nào về các đối số đầu vào hoặc giá trị trả về, hãy trao đổi chúng.
3. **Hỏi về các ràng buộc bổ sung:**
   - Có bất kỳ ràng buộc nào khác về hiệu suất, bộ nhớ, hoặc giới hạn giá trị không?

### 4. Xử lý các đối số không hợp lệ và hàm tiện ích bên ngoài (Handling Invalid Arguments and External Utility Functions)

#### 🛡️ **Xác thực đối số của hàm của bạn:**

- Trong hầu hết các trường hợp, bạn **không cần** phải xác thực các đối số đầu vào của hàm của mình, trừ khi người phỏng vấn yêu cầu rõ ràng.
- Bạn có thể đưa ra giả định an toàn (ví dụ: "Tôi giả định đây là một số nguyên không âm") và trao đổi với người phỏng vấn.
- Ví dụ: Hàm `power(a, b)`: Nếu `b` là số âm, cách xử lý sẽ khác và cần phải hỏi rõ.

#### ⚠️ **Xác thực giá trị trả về từ hàm tiện ích bên ngoài (API/library):**

- **Đây là một trường hợp đặc biệt quan trọng cần cẩn thận.**
- Nếu bạn sử dụng một hàm tiện ích có sẵn (không phải built-in) do công ty cung cấp, hãy luôn hỏi liệu bạn có nên giả định giá trị trả về của hàm đó là hợp lệ hay không.
- Rất có thể người phỏng vấn sẽ nói rằng bạn **không thể** đưa ra giả định đó.
- **Hành động:**
  - Bạn cần xử lý đúng đắn giá trị trả về, bao gồm cả việc xử lý ngoại lệ (exception handling).
  - Sử dụng `try-catch` (hoặc cơ chế tương đương) xung quanh lời gọi hàm đó.
  - Thực hiện xác minh giá trị trả về.
  - Người phỏng vấn sẽ mong đợi bạn làm điều này.
