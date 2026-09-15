# Lộ Trình Kafka for Beginners: Học Gì, Học Với Ai, Bằng Công Cụ Nào?

Chào mừng bạn đến với **Kafka for Beginners** — cửa ngõ vào thế giới streaming dữ liệu. Trước khi chạm vào Topic hay Broker, hãy dành vài phút hiểu rõ khóa học này được xây dựng ra sao, ai dạy bạn, và vì sao cái tên Conduktor sẽ đi cùng bạn suốt khóa.

---

## 1. Vì Sao Đây Là Bản Thứ Ba Mà Vẫn Đáng Học Từ Đầu?

Khóa học này không phải bản quay một lần rồi để đó. Đây là **third edition** — bản ghi hình lại hoàn toàn lần thứ ba.

Con số đứng sau nó mới quan trọng:

* Hơn **130.000 học viên** đã học qua các bản trước.
* Hơn **30.000 review** gửi về, và giảng viên đã đọc để lặp lại khóa học.

Từ feedback đó, bản mới này thay đổi ba thứ:

1. **Sắp xếp lại thứ tự lecture** cho mạch lạc hơn — lý thuyết đi trước, thực hành nối ngay sau.
2. **Thêm section, thêm lecture mới** và nhiều bài tập gắn với tình huống thực tế, thay vì ví dụ đồ chơi.
3. **Cập nhật lên Apache Kafka 3+**, và định hướng tương thích tiếp với Kafka 4 khi nó ra mắt.

Nói theo ngôn ngữ engineer: khóa học này được refactor qua ba vòng dựa trên dữ liệu người dùng thật, không phải viết lại cho vui.

## 2. Giảng Viên Của Bạn Là Ai?

Thầy của bạn là **Stephane Maarek**, co-founder của **Conduktor**.

Vài dòng để bạn biết mình đang học từ ai:

* Online instructor chuyên sâu về **Apache Kafka** và **AWS**.
* Từng nằm trong **Program Committee của Kafka Summit 2019 và 2020** — hội nghị Kafka lớn nhất thế giới, nơi quyết định ai được lên sân khấu nói.
* Tác giả của cả **Apache Kafka Series**, không chỉ một khóa lẻ — từ beginner tới Connect, Streams, ksqlDB, Security, Monitoring, Admin.
* Viết blog cho **Confluent**, **Medium** và nhiều kênh khác trong hệ sinh thái Kafka.

Bạn có thể tìm thầy trên GitHub, LinkedIn, Medium, Twitter, Instagram nếu muốn follow thêm. Nhưng trong phạm vi khóa này, chỉ cần nhớ một điều: người dạy bạn là người vừa dạy, vừa làm sản phẩm Kafka enterprise mỗi ngày.

## 3. Conduktor Là Gì Và Vì Sao Nó Xuất Hiện Suốt Khóa Học?

**Conduktor** là công ty do Stephane đồng sáng lập, với một mục tiêu duy nhất: làm cho Apache Kafka dễ tiếp cận với tất cả mọi người, kể cả bạn.

Sản phẩm cốt lõi là một **giao diện đồ họa (GUI) cho Kafka và toàn bộ hệ sinh thái xung quanh nó**, cộng thêm nhiều lớp tính năng để đưa Kafka lên mức enterprise-ready.

Trong khóa học này, Conduktor đóng hai vai cụ thể:

1. **Kính hiển vi để học.** Thay vì chỉ gõ lệnh mù mờ, bạn nhìn thấy Topic nào có bao nhiêu Partition, message chảy ra sao, Consumer Group nào đang kẹt ở đâu.
2. **Sân chơi miễn phí để thực hành.** Bạn được cấp một **free personal Kafka cluster** để vọc tùy ý, và nếu muốn làm cùng đồng nghiệp thì có thêm **free Organization cluster**.

Một điểm quan trọng để bạn yên tâm: Conduktor hỗ trợ **bất kỳ Kafka cluster nào**, mọi cơ chế security, và kết nối tới gần như mọi thứ trong hệ sinh thái. Kỹ năng bạn học với Conduktor không bị khóa vào một vendor — học xong bạn vẫn làm việc nhanh hơn trên cluster của công ty mình.

## 4. Cách Học Để Không Bỏ Dở Giữa Chừng

Khóa này là **Volume 1: Kafka for Beginners** trong Apache Kafka Series. Nó cho bạn nền móng rất chắc: hiểu lý thuyết end-to-end, tự dựng Kafka, dùng CLI, viết Producer và Consumer đầu tiên.

Nhưng đừng nhầm nó là tất cả. Những khóa chuyên sâu hơn (Connect, Streams, ksqlDB, Confluent Components, Security, Monitoring, Cluster Setup & Administration) nằm ở các volume sau.

Analogy vui của người Việt: bản này giống như học lái xe số sàn cho vững — chưa phải đua F1, nhưng không vững số sàn thì đừng mơ tới F1.

## Cạm Bẫy Thường Gặp

* **Skip bài giới thiệu vì tưởng không có kiến thức.** Sai. Bỏ qua bài này là bạn mất bản đồ, học tới bài Streams sẽ không hiểu nó nằm ở đâu trong toàn cảnh.
* **Ảo tưởng học chay không cần cluster.** Kafka là hệ phân tán — đọc slide mà không nhìn cluster chạy thật thì kiến thức bay hết sau một tuần. Hãy nhận free cluster của Conduktor ngay từ đầu.
* **Đuổi theo version mới nhất mà quên nền tảng.** Khóa này dạy trên Kafka 3+, định hướng Kafka 4. Đừng mất thời gian cãi nhau 3.3 hay 3.7 — nắm chắc Topic, Partition, Broker, Replication thì version nào cũng sống được.

## Kết Luận

Tóm lại một câu: **đây là bản thứ ba của Kafka for Beginners, được mài qua 30.000+ review của 130.000+ học viên, dạy bởi Stephane Maarek trên nền Kafka 3+, với Conduktor vừa là kính hiển vi vừa là sân chơi miễn phí.**

Bài tiếp theo chúng ta sẽ trả lời câu hỏi lớn nhất: Kafka sinh ra để giải bài toán gì mà database và API thông thường bó tay — qua câu chuyện tích hợp dữ liệu N×M trong 5 phút.
