---
title: Hiểu Về Big O – Nền Tảng Của Phân Tích Thuật Toán
date: '2025-10-26 01:01:42'
date_gmt: '2025-10-25 18:01:42'
modified: '2025-10-26 15:15:44'
status: publish
slug: hieu-ve-big-o-nen-tang-cua-phan-tich-thuat-toan
wordpress_id: 397
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/26/hieu-ve-big-o-nen-tang-cua-phan-tich-thuat-toan/
categories:
- Algorithm
- C++
- Uncategorized
tags: []
---

Khi bước vào thế giới **Data Structures & Algorithms (DSA)**, khái niệm đầu tiên mà bạn sẽ nghe đến chính là **Big O**. Đây là một chủ đề cực kỳ quan trọng – gần như không thể thiếu trong mọi buổi phỏng vấn lập trình.

Vậy **Big O** là gì và tại sao nó lại quan trọng đến vậy?

---

## **1. Big O – Thước đo hiệu suất của chương trình**

Hãy tưởng tượng bạn có hai đoạn code: **Code 1** và **Code 2**.  
Cả hai đều thực hiện cùng một nhiệm vụ, ví dụ như sắp xếp một mảng.

Làm thế nào để biết đoạn nào “tốt hơn”?

- Có thể **Code 1** dễ đọc hơn, rõ ràng hơn.
- Hoặc **Code 2** ngắn gọn hơn, ít dòng hơn.

Nhưng khi nói về **hiệu suất**, ta cần một cách **so sánh mang tính toán học** – đó chính là **Big O notation**.

Big O cho phép ta đánh giá **độ hiệu quả của thuật toán** dựa trên **tốc độ chạy (time complexity)** và **mức tiêu thụ bộ nhớ (space complexity)**.

---

## **2. Time Complexity – Độ phức tạp về thời gian**

Giả sử bạn bật một chiếc **đồng hồ bấm giờ**, chạy **Code 1** → mất 15 giây.  
Sau đó bạn chạy **Code 2** → mất 60 giây.

Dễ thấy **Code 1** nhanh hơn. Tuy nhiên, nếu bạn chạy hai đoạn code này trên một máy tính mạnh gấp đôi, cả hai đều sẽ chạy nhanh hơn, nhưng **tỉ lệ giữa chúng vẫn không thay đổi**.

→ Vì vậy, ta **không đo thời gian thực**, mà đo **số lượng phép toán cần thực hiện** để hoàn thành nhiệm vụ.

Ví dụ:

- Thuật toán tuyến tính (**O(n)**) chạy lâu gấp đôi nếu đầu vào tăng gấp đôi.
- Thuật toán bậc hai (**O(n²)**) thì thời gian tăng theo bình phương kích thước đầu vào.

---

## **3. Space Complexity – Độ phức tạp về bộ nhớ**

Không chỉ thời gian, đôi khi **bộ nhớ** cũng là yếu tố quan trọng.

Ví dụ:

- **Code 1** chạy cực nhanh nhưng tiêu tốn rất nhiều RAM.
- **Code 2** chạy chậm hơn nhưng dùng ít bộ nhớ hơn.

Nếu bạn đang làm việc trên một hệ thống nhúng hoặc thiết bị có tài nguyên hạn chế, **Code 2** có thể là lựa chọn tốt hơn.

Trong phỏng vấn, người ta thường hỏi:

> “Nếu thời gian không phải ưu tiên hàng đầu mà bộ nhớ mới là vấn đề chính, bạn sẽ chọn cách nào?”

Đây chính là lúc bạn cần hiểu rõ cả **time** và **space complexity**.

---

## **4. Vì sao Big O quan trọng trong phỏng vấn lập trình**

Khi tham gia phỏng vấn kỹ thuật, đặc biệt ở các công ty lớn như Google, Meta, hay Amazon, bạn **chắc chắn sẽ gặp câu hỏi về Big O**.  
P/s: Bây giờ ghế ít đít nhiều, start-up cũng hỏi rồi :))  
Anh em chịu khó học, không là oẳng.

Người phỏng vấn muốn biết bạn **hiểu bản chất của thuật toán** chứ không chỉ biết viết code chạy được.  
Việc đánh giá độ phức tạp giúp bạn chọn **giải pháp tối ưu nhất** trong từng tình huống.

---

## **5. Kết luận**

Big O không chỉ là công cụ để so sánh tốc độ chương trình — mà còn là **ngôn ngữ chung của dân lập trình** để mô tả và đánh giá hiệu quả thuật toán.

Hiểu được Big O, bạn sẽ:

- Viết code tối ưu hơn
- Giải thích rõ ràng hơn trong phỏng vấn
- Và quan trọng nhất: **tư duy như một kỹ sư phần mềm thực thụ**. Tất nhiên kỹ sư nó còn cần nhiều skill khác
