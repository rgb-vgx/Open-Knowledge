# 🗺️ Bước vào chuyên đề Architectural Patterns — khi kiến trúc định hình vận mệnh hệ thống

> Nguồn: `023-Introduction-to-Architectural-Patterns.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49456785)

Chào mừng các bạn quay trở lại. Sau khi đã xây xong phần nền tảng, chúng ta bước sang một chuyên đề mới: **Architectural Patterns (các mẫu kiến trúc)**. Trong chuyên đề này, mình và các bạn sẽ khám phá những mẫu kiến trúc quan trọng nhất trong hệ thống hiện đại, và xem mỗi mẫu định hình **scalability (khả năng mở rộng)**, **maintainability (khả năng bảo trì)** cùng các quyết định thiết kế thực tế như thế nào.

---

### 🏛️ Software architecture thực sự là gì?

Khi nghe từ "architecture", các kỹ sư thường nghĩ ngay tới **sơ đồ, các tầng (layer), hay những lựa chọn công nghệ**. Nhưng theo mình, software architecture thực chất là việc **đưa ra những quyết định nền tảng** — những quyết định định hình cách hệ thống hành xử khi nó lớn lên.

* Ở mức cốt lõi, kiến trúc định nghĩa **cấu trúc của hệ thống**, các **thành phần chính**, **trách nhiệm** của chúng, và cách chúng **tương tác** với nhau.
* Nó định hình mọi thứ: từ **data flow (luồng dữ liệu)**, **service communication (giao tiếp giữa các service)**, cho tới **module boundaries (ranh giới module)** và **dependencies (các phụ thuộc)**.

Nói cách khác, kiến trúc không phải là chuyện vẽ sơ đồ cho đẹp — đó là tập hợp các quyết định có hệ quả dài hạn.

---

### 🎯 Ba trăn trở lớn: scalability, maintainability và performance

Kiến trúc ảnh hưởng trực tiếp đến những phẩm chất trở nên cực kỳ quan trọng khi hệ thống chạy trong production. Hãy thử tự hỏi:

1. Khi traffic tăng, hệ thống có còn **xử lý hiệu quả** không?
2. Khi yêu cầu thay đổi, đội ngũ có thể **sửa mà không tạo rủi ro** không?
3. Khi tải lớn lên, hệ thống có thể **scale mà không cần thiết kế lại toàn bộ** không?

Từ đó dẫn ra ba trụ cột:

* **Scalability** — hệ thống có thể lớn lên cùng nhu cầu hay không.
* **Maintainability** — hệ thống có thể tiến hóa dễ dàng theo thời gian hay không.
* **Performance** — hệ thống phản hồi hiệu quả ra sao dưới tải thực tế.

*Điểm mấu chốt là ba trụ cột này luôn kéo nhau: cải thiện mặt này thường ảnh hưởng mặt kia. Vì vậy kiến trúc không bao giờ chỉ là chuyện công nghệ — nó luôn là chuyện **trade-off (đánh đổi)**.*

---

### 🧭 Bản đồ chuyên đề: chúng ta sẽ đi qua những đâu?

Trước khi lao vào từng mẫu, hãy nhìn tổng thể lộ trình. Chúng ta sẽ đi lần lượt:

1. Hiểu **architectural pattern là gì**, và vì sao các kiến trúc sư dựa vào chúng để giải những bài toán thiết kế lặp lại.
2. Khảo sát các **architectural style** phổ biến nhất cùng những trade-off khiến mỗi style phù hợp với một bối cảnh riêng.
3. Đi sâu vào **multi-tier architecture (kiến trúc đa tầng)** — xương sống của ứng dụng doanh nghiệp suốt nhiều thập kỷ.
4. Sang **microservices architecture (kiến trúc vi dịch vụ)**, hiểu vì sao hệ thống hiện đại chuộng các service triển khai độc lập.
5. Khám phá **event-driven architecture (kiến trúc hướng sự kiện)** — cách các hệ thống lớn dùng event để đạt **loose coupling (liên kết lỏng)**, scale cao và phản hồi nhanh.
6. Cuối cùng, gom tất cả lại thành **ứng dụng thực tế và cách ra quyết định kiến trúc**.

Mọi quyết định kiến trúc — chọn **monolith (khối đơn)** hay microservices, chọn chiến lược database, hay vạch **service boundary (ranh giới service)** — đều định hình cách hệ thống hành xử trong production. Mục tiêu thật sự của software architecture là biến **yêu cầu kinh doanh** thành một hệ thống có thể thành công cả hôm nay lẫn khi lớn lên ngày mai.

*Chọn kiến trúc đúng hiếm khi là tìm ra mẫu "tốt nhất" — mà là tìm ra mẫu phù hợp nhất cho một bài toán cụ thể.*

---

Vậy là các bạn đã nắm được mục tiêu và tấm bản đồ của chuyên đề. Đến cuối chuyên đề, các bạn sẽ không chỉ hiểu các architectural style, mà còn rèn được **quy trình suy luận** mà các kiến trúc sư dùng để đánh giá lựa chọn thiết kế trong hệ thống thực tế. Hẹn gặp lại các bạn ở bài tiếp theo! 🚀
