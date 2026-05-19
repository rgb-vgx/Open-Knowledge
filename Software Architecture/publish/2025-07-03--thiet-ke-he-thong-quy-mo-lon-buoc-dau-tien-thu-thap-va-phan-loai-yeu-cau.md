---
title: Hiểu về Requirements trong Thiết kế Hệ thống Lớn
date: '2025-07-03 00:28:35'
date_gmt: '2025-07-02 17:28:35'
modified: '2025-08-17 23:30:28'
status: publish
slug: thiet-ke-he-thong-quy-mo-lon-buoc-dau-tien-thu-thap-va-phan-loai-yeu-cau
wordpress_id: 49
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/03/thiet-ke-he-thong-quy-mo-lon-buoc-dau-tien-thu-thap-va-phan-loai-yeu-cau/
categories:
- Software Architecture
tags: []
---

Khi bắt đầu một dự án **large-scale system (hệ thống quy mô lớn)**, bước quan trọng đầu tiên chính là **gathering (thu thập), classifying (phân loại) và analyzing requirements (phân tích yêu cầu)**. Đây không chỉ là việc ghi chép lại mong muốn của khách hàng, mà còn là nền tảng để định hình toàn bộ kiến trúc phần mềm.

---

## Vì sao Requirements lại quan trọng đến vậy?

Trong các bài toán nhỏ như viết **method** hay **class**, ta thường đã biết rõ **input – output** và bị giới hạn bởi ngôn ngữ lập trình sẵn có. Nhưng ở cấp độ cao hơn, như thiết kế **module**, **library**, hay thậm chí **application**, phạm vi trở nên quá rộng khiến việc hình dung giải pháp trở nên khó khăn.

Ví dụ: Nếu được yêu cầu thiết kế một **file storage system (hệ thống lưu trữ tệp)**, **video streaming solution (giải pháp phát video trực tuyến)** hay **ride sharing service (dịch vụ gọi xe)** phục vụ hàng triệu người dùng mỗi ngày, rất dễ bị choáng ngợp.

Bên cạnh đó, **ambiguity (tính mơ hồ)** của yêu cầu cũng là một thử thách lớn:

- **Nguồn gốc yêu cầu**: thường đến từ khách hàng hoặc product manager, không hẳn là kỹ sư. Do đó, yêu cầu ban đầu có thể chỉ ở mức ý tưởng.
- **Khách hàng không biết chính xác mình cần gì**: Họ chỉ biết vấn đề muốn giải quyết. Chính việc làm rõ yêu cầu cũng đã là một phần của giải pháp.

Ví dụ: Với dịch vụ **hitchhiking (đi nhờ xe có trả phí)**, ta cần đặt thêm nhiều câu hỏi:

- Có phải là **real-time service (dịch vụ thời gian thực)** không?
- Sử dụng **mobile app hay desktop app**, hay cả hai?
- Thanh toán qua hệ thống hay trả trực tiếp cho tài xế?

Việc đặt câu hỏi chính là một phần trong quá trình tìm ra giải pháp phù hợp.

---

## Rủi ro khi không xác định đúng Requirements

Khác với việc viết vài dòng code có thể sửa đi sửa lại dễ dàng, các hệ thống lớn có đặc điểm:

- Tốn **thời gian** (nhiều tháng, nhiều nhóm kỹ sư).
- Tốn **chi phí** (nhân lực, phần cứng, license phần mềm).
- Có **cam kết hợp đồng** và ràng buộc pháp lý.
- Sai lầm có thể gây **ảnh hưởng thương hiệu** và **mất uy tín**.

Do đó, việc xác định đúng requirements **ngay từ đầu** là yếu tố sống còn.

---

## Phân loại Requirements

Requirements thường được chia thành 3 nhóm chính, còn gọi là **architectural drivers (yếu tố điều hướng kiến trúc)**:

1. **Functional Requirements (Yêu cầu chức năng)**
   - Mô tả **hệ thống làm gì**.Ví dụ:
     - Khi rider đăng nhập vào app, hiển thị bản đồ với các tài xế gần đó trong bán kính 5 miles.Khi chuyến đi hoàn tất, hệ thống tự động trừ tiền thẻ của rider và chuyển cho driver sau khi trừ phí dịch vụ.👉 Functional requirements giống như xem hệ thống như một **black box (hộp đen)**: input là hành động của user, output là phản hồi của hệ thống. VD: ***After a user uploads a file, they will get a unique link that they can share with other users. Any user with that link can download the file.***
2. **Non-Functional Requirements (Yêu cầu phi chức năng / Quality Attributes)**
   - Mô tả **hệ thống có đặc tính gì**, chứ không phải nó làm gì. VD: ***The link should become active no later than 1 second after the file is uploaded. Download speeds should be at least 50 Mbit/sec.***
   - Bao gồm: **scalability (khả năng mở rộng), availability (tính sẵn sàng), reliability (độ tin cậy), security (bảo mật), performance (hiệu năng)**, …
   - Khác với functional requirements, non-functional requirements **trực tiếp ảnh hưởng đến kiến trúc hệ thống**.
3. **System Constraints (Ràng buộc hệ thống)**
   - Là những giới hạn bắt buộc phải tuân theo.
   - Ví dụ: deadline chặt chẽ, ngân sách hạn chế, số lượng kỹ sư ít.
   - Những constraints này buộc chúng ta phải **trade-off (đánh đổi)** trong thiết kế.
   - Ví dụ: ***have to support at least PDF and JPG file formats, as well as the following web browsers: Google Chrome, Mozilla Firefox, and Microsoft Edge.***

---

## Kết luận

- **Requirements** là nền tảng của mọi thiết kế hệ thống lớn.
- Thách thức chính: **phạm vi quá rộng** và **yêu cầu mơ hồ**.
- Sai lầm ở giai đoạn requirements sẽ dẫn đến thiệt hại lớn về **thời gian, chi phí và uy tín**.
- Ba loại requirements chính – **functional, non-functional, constraints** – chính là **architectural drivers**, điều hướng mọi quyết định thiết kế kiến trúc.

👉 Nắm chắc và phân loại đúng requirements ngay từ đầu sẽ giúp chúng ta tự tin hơn khi bước vào các bước tiếp theo trong **system design (thiết kế hệ thống)**.
