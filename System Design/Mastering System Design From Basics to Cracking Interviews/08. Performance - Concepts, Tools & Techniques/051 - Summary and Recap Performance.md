# 🎓 Nhìn lại chặng Performance: Hiệu năng không đến từ một tối ưu duy nhất

> Nguồn: `051-Summary-and-Recap---Performance.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49601099)

Khi khép lại section Performance, có một điều rất đáng khắc cốt: **performance chưa bao giờ là kết quả của một tối ưu đơn lẻ** — nó là **kết quả cộng hưởng của rất nhiều quyết định kiến trúc cùng làm việc với nhau**. Hãy cùng mình điểm lại hành trình vừa qua và xem các mảnh ghép ăn khớp với nhau như thế nào.

---

### 🎯 Xuất phát điểm: hiệu năng định hình trải nghiệm người dùng

Chúng ta bắt đầu bằng việc hiểu những **khái niệm nền tảng của system performance**:

* **Latency (độ trễ)** và **throughput (thông lượng)** — hai thước đo cốt lõi của tốc độ hệ thống.
* **Scalability (khả năng mở rộng)** và **responsiveness (độ phản hồi)** — cách hệ thống hành xử khi tải tăng lên.

Chính những yếu tố này định hình **trải nghiệm người dùng** và hành vi của hệ thống dưới tải — đó là ngôn ngữ chung để chúng ta bàn về hiệu năng trước khi đi vào từng kỹ thuật cụ thể.

---

### 🧩 Những mảnh ghép chính của section

Từ nền tảng đó, chúng ta lần lượt đi qua 4 nhóm kỹ thuật lớn:

1. **Caching (bộ đệm)** — một trong những kỹ thuật hiệu năng thành công nhất: giữ **dữ liệu hay được truy cập ở gần ứng dụng hơn**, từ đó giảm mạnh latency và giảm áp lực lên các hệ thống phía sau.
2. **Messaging và queues (hàng đợi thông điệp)** — giúp **tách rời (decouple) các service**, hấp thụ các đợt traffic tăng vọt và cho phép **xử lý bất đồng bộ ở quy mô lớn**.
3. **Concurrency và parallelism** — cách hệ thống hiện đại **tối đa hóa việc dùng tài nguyên**, đồng thời tránh những thách thức như **race condition, contention và deadlock**.
4. **Database performance optimization** — bộ kỹ thuật gồm **indexing, replication, sharding, partitioning, query tuning và connection management**.

*Đây thường chính là khác biệt giữa một hệ thống chật vật và một hệ thống scale hiệu quả khi tăng trưởng.*

Cùng với nhau, tất cả những khái niệm này tạo nên **nền móng của high-performance system design** — và cũng là hành trang để các bạn tự tin phân tích, thiết kế hệ thống trong phỏng vấn.

---

### 🚀 Bước tiếp theo: từ tốc độ sang độ tin cậy

Section tiếp theo, chúng ta sẽ chuyển trọng tâm từ **speed (tốc độ)** sang **resilience (khả năng phục hồi)**: **reliability (độ tin cậy)**, **availability (tính sẵn sàng)**, **failover (chuyển đổi dự phòng)** và **recovery (khôi phục)**.

Lý do rất đơn giản và mình muốn các bạn nhớ nó: **hệ thống nhanh thì đáng giá, nhưng hệ thống đáng tin cậy mới là điều thiết yếu.** Suy cho cùng, một hệ thống nhanh đến mấy cũng không còn nhiều ý nghĩa nếu nó ngừng phục vụ người dùng khi có sự cố.

*Các bạn không cần nhớ máy móc từng kỹ thuật — điều quan trọng là nắm được bức tranh tổng thể: mọi quyết định hiệu năng đều là trade-off, và tư duy đúng sẽ giúp các bạn chọn đúng công cụ cho đúng bài toán.*

Vậy là chúng ta đã có bức tranh tổng quan về performance engineering. Hãy đảm bảo các bạn nắm chắc những trade-off trong section này trước khi bước sang chặng mới về resilience. Hẹn gặp lại các bạn ở bài tiếp theo! 🚀
