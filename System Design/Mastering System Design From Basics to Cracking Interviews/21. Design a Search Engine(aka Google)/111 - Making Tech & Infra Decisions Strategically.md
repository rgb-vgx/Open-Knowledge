# ⚙️ Chọn công nghệ cho search engine: Công cụ phục vụ yêu cầu, không vì phổ biến

> Nguồn: `111-Making-Tech-Infra-Decisions-Strategically.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49938837)

Kiến trúc đã xong, bước cuối cùng là **chọn công nghệ và hạ tầng** hỗ trợ tốt nhất cho thiết kế đó. Nhớ rằng **không có một technology stack đúng duy nhất** — điều quan trọng hơn là chọn công cụ **thỏa mãn các yêu cầu của hệ thống**. Hãy cùng đi qua từng lớp của search engine.

---

### 🕷️ Hạ tầng crawler và lưu trữ

* Vì crawling là workload **song song hóa cao**, ta dùng kiến trúc phân tán nơi các task crawl được chia sẻ giữa nhiều worker, với những công nghệ như **Kafka** và **Celery**. Chạy các worker này trên hạ tầng cloud cho phép **linh hoạt mở rộng crawler** khi workload tăng.
* Về lưu trữ, mỗi loại dữ liệu có yêu cầu khác nhau:
  * **Search index** hưởng lợi từ **NoSQL database** nhờ schema linh hoạt và tra cứu nhanh.
  * **Trang web thô đã crawl** phù hợp hơn với **object storage** — nơi lưu trữ khối lượng lớn, mở rộng tốt và tiết kiệm chi phí.

---

### 🧱 Indexing engine: tự xây hay dùng giải pháp có sẵn?

Với indexing engine, chúng ta có hai lựa chọn:

1. **Tự xây một giải pháp indexing tùy chỉnh** để kiểm soát hoàn toàn.
2. **Dùng search engine có sẵn như Elasticsearch** để tăng tốc phát triển.

Lựa chọn đúng phụ thuộc vào **mức độ tùy biến bạn muốn** và **độ phức tạp vận hành bạn sẵn sàng tự gánh**. Dù chọn hướng nào, pipeline indexing cũng nên chạy **liên tục** để nội dung mới crawl trở nên tìm kiếm được càng nhanh càng tốt.

---

### 🔎 Ranking, search API và caching

* **Ranking:** kết hợp nhiều tín hiệu liên quan — **TF-IDF** đo mức khớp giữa document và truy vấn, **PageRank** nắm bắt uy tín (authority) của trang, còn **Freshness** đảm bảo nội dung mới cập nhật nhận được ưu tiên thích đáng.
* **Search API:** đặt **load balancer (bộ cân bằng tải)** phía trước service để phân phối traffic đến đều đặn.
* **Caching:** cache các truy vấn phổ biến bằng **Redis** hoặc **Memcached** để những lượt tìm kiếm lặp lại được phục vụ với độ trễ rất thấp.

---

### 🛡️ Mở rộng ngang và chịu lỗi

Toàn bộ hệ thống được thiết kế cho **horizontal scaling (mở rộng ngang) và fault tolerance (chịu lỗi)**: khi dữ liệu và traffic tăng, ta **thêm máy mới thay vì dựa vào server to hơn**. **Replication (nhân bản)** và **automatic failover (chuyển đổi dự phòng tự động)** đảm bảo search engine vẫn sẵn sàng ngay cả khi từng thành phần gặp lỗi.

| Hạng mục | Lựa chọn tiêu biểu | Vì sao phù hợp |
|---|---|---|
| Hạ tầng crawler | Kafka, Celery, cloud | Song song hóa, mở rộng linh hoạt |
| Search index | NoSQL database | Schema linh hoạt, tra cứu nhanh |
| Trang crawl thô | Object storage | Khối lượng lớn, chi phí tốt |
| Indexing engine | Tự xây hoặc Elasticsearch | Tùy mức tùy biến và độ phức tạp chấp nhận |
| Ranking | TF-IDF, PageRank, Freshness | Kết hợp nhiều tín hiệu liên quan |
| Search API | Load balancer | Phân phối traffic đều |
| Caching | Redis, Memcached | Độ trễ rất thấp cho truy vấn phổ biến |
| Mở rộng | Horizontal scaling, replication, failover | Thêm máy, luôn sẵn sàng khi có lỗi |

---

### 💡 Bài học: công nghệ luôn theo sau yêu cầu kiến trúc

Điểm mấu chốt: **lựa chọn công nghệ phải luôn đi theo yêu cầu kiến trúc**. Chúng ta không chọn Kafka, Elasticsearch, Redis hay cloud vì chúng phổ biến — chúng ta chọn vì chúng **giải những thách thức cụ thể về khả năng mở rộng, hiệu năng và độ tin cậy** của một search engine quy mô lớn.

Ở bài tiếp theo — cũng là bài cuối của case study — chúng ta sẽ ghép mọi thứ lại và xem **kiến trúc cuối cùng** của search engine vận hành end-to-end như thế nào. Hẹn gặp lại các bạn! 🚀
