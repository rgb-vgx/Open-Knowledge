# Dựng Kafka Localhost Bằng Docker: Zookeeper, Broker, Schema Registry Và Conduktor UI Trong Một Lệnh

Muốn học Producer nghiêm túc thì bạn cần một Kafka thật trên máy mình: gửi record đi, thấy nó nằm ở partition nào, consumer đọc lại được ngay. Cài tay từng thành phần — Zookeeper, Kafka, Schema Registry, UI — vừa lâu vừa dễ lệch config. Bài này giải quyết đúng một việc: dựng trọn bộ môi trường localhost bằng Docker Compose để từ bài sau chỉ việc code.

---

## 1. Vấn đề: Tại Sao Cần Docker Compose Cho Bài Lab Này?

Từ các phần trước bạn đã chạy Kafka bằng CLI hoặc một broker đơn lẻ. Sang phần Wikimedia Producer, nhu cầu tăng lên:

- Cần **Kafka + Zookeeper** chạy ổn định ở `localhost:9092`.
- Cần **Schema Registry** sẵn sàng cho các phần sau (dù phần này chưa dùng tới).
- Cần **Conduktor Platform** — UI để tạo topic, xem partition, đọc message trực quan thay vì chỉ dùng `kafka-console-consumer`.

Cài riêng từng thứ thì mỗi thứ một lệnh, một file config, một port. Docker Compose gom tất cả vào một file khai báo duy nhất: bốn container, đúng network, đúng biến môi trường, khởi động cùng nhau.

> Nếu bạn chỉ muốn Kafka + Zookeeper trần trụi không UI, có thể bỏ qua bài này và dùng CLI như cũ. Nhưng để theo đúng mạch demo (tạo topic bằng UI, soi message bằng UI), hãy làm theo bài này.

## 2. Cơ Chế: Docker Compose Khởi Động Gì?

Một file `docker-compose.yml` của Conduktor thường khai báo bốn service:

| Service | Vai trò | Port quan trọng |
|---|---|---|
| `zoo1` | Zookeeper — lưu metadata cluster, chọn controller | `2181` |
| `kafka1` | Broker Kafka duy nhất ở local | `9092` (client), `29092` (docker internal, tùy file) |
| `schema-registry` | Schema Registry — quản lý Avro/Protobuf schema | `8081` |
| `conduktor-platform` | UI quản trị: topic, consumer, broker config | `8080` |

Khi bạn nhấn Play (hoặc `docker compose up -d`), Docker sẽ pull image nếu chưa có, tạo network chung, rồi start theo thứ tự phụ thuộc. Kafka đăng ký với Zookeeper, Schema Registry trỏ về Kafka, Conduktor trỏ về cả hai. Bạn không phải nối tay bất cứ thứ gì.

## 3. Các Bước Triển Khai Chi Tiết

### 3.1. Dọn dẹp Kafka cũ để tránh đụng port

Nếu trước đó bạn đang chạy Kafka/Zookeeper bằng CLI (`zookeeper-server-start.sh`, `kafka-server-start.sh`), hãy tắt hết. Broker local chiếm `9092`, Zookeeper chiếm `2181` — để chúng sống song song với container là lỗi phổ biến nhất: producer báo `Connection refused` hoặc `Leader not available` mà không hiểu vì sao.

### 3.2. Cài Docker và kiểm tra Docker đang chạy

Cài đúng bản cho hệ điều hành của bạn: Docker Desktop for Mac / Windows, hoặc Docker Engine for Linux. Sau khi cài, mở Docker Desktop và xác nhận engine ở trạng thái Running. Lần đầu pull image Kafka + Conduktor có thể mất vài phút tùy mạng — hoàn toàn bình thường.

### 3.3. Khởi động bốn service

Trong thư mục chứa file `docker-compose.yml` của khóa học:

```bash
docker compose up -d
docker compose ps
docker compose logs -f conduktor-platform
```

Bạn sẽ thấy bốn container ở trạng thái `running`: `zoo1`, `kafka1`, `schema-registry`, `conduktor-platform`. Trong log của Conduktor, khi thấy dòng báo platform đã started là thành công.

Để dừng khi không dùng nữa:

```bash
docker compose stop
docker compose down
```

### 3.4. Đăng nhập Conduktor UI

Mở trình duyệt vào:

```text
http://localhost:8080
```

Thông tin đăng nhập mặc định được khai báo sẵn trong file Compose:

```text
Email:    admin@conduktor.io
Password: admin
```

Vào mục Console, bạn sẽ thấy nó đã kết nối sẵn tới local Kafka cluster. Từ đây có thể tạo topic, xem partition, đọc message, soi broker config — mọi thứ bạn từng làm bằng CLI giờ có UI.

### 3.5. Kiểm tra Kafka vẫn reachable từ code và CLI

UI chỉ là lớp nhìn. Producer Java của bạn vẫn kết nối như bình thường:

```java
props.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "127.0.0.1:9092");
```

Và CLI vẫn dùng được song song:

```bash
kafka-topics.sh --bootstrap-server localhost:9092 --list
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic wikimedia.recentchange
```

Nếu cả UI và CLI đều thấy cùng một cluster, môi trường của bạn đã chuẩn.

## 4. Code Và Config Tham Khảo

Không có code Java trong bài này, nhưng hãy ghi nhớ ba hằng số sẽ dùng xuyên suốt section:

```bash
# Broker cho producer/consumer
BOOTSTRAP_SERVERS=127.0.0.1:9092

# UI quản trị
CONDUKTOR_URL=http://localhost:8080  # admin@conduktor.io / admin

# Zookeeper (hầu như không cần đụng tới trực tiếp)
ZOOKEEPER=127.0.0.1:2181
```

## 5. Safe / High-Throughput Preset Liên Quan

Bài này chưa đụng tới `acks`, `retries` hay `compression.type`. Nhưng có một nguyên tắc môi trường ảnh hưởng trực tiếp tới độ safe ở bài sau: **local chỉ có 1 broker**, nên `replication.factor=1` và `min.insync.replicas=1`. Đừng bê nguyên preset production (`replication.factor=3`, `min.insync.replicas=2`) vào local — producer với `acks=all` sẽ báo `NotEnoughReplicasException` vì không đủ replica để ack.

## 6. Cạm Bẫy Thường Gặp

- **Đụng port 9092 / 2181 / 8080.** Triệu chứng: container restart liên tục hoặc producer không connect được. Cách fix: tắt Kafka CLI cũ, tắt ứng dụng đang chiếm 8080, rồi `docker compose up -d` lại.
- **Quên pull image lần đầu rồi tưởng treo.** Lần đầu tải vài trăm MB. Hãy xem tab Images/Containers trong Docker Desktop để biết tiến độ, đừng Ctrl+C giữa chừng.
- **Sửa password trong Compose nhưng đăng nhập bằng password cũ.** Credential nằm trong file Compose. Đổi ở file thì phải `docker compose up -d --force-recreate` thì container mới nhận.
- **Nhầm bootstrap address trong container vs ngoài host.** Code chạy trên máy host thì dùng `localhost:9092` / `127.0.0.1:9092`. Địa chỉ dạng `kafka1:29092` chỉ dùng cho container nói chuyện với nhau bên trong Docker network.
- **Để Docker ngủ (pause) trên laptop rồi producer timeout hàng loạt.** Khi máy sleep, broker trong container cũng đứng. Dậy lại thì `delivery.timeout.ms` có thể đã hết — đơn giản là restart producer.

## Kết Luận

Tóm lại một câu: **Docker Compose cho bạn một Kafka localhost hoàn chỉnh (Zookeeper + Broker + Schema Registry + Conduktor UI) trong một lệnh, để từ bài sau mọi demo producer đều chạy trên cùng một môi trường thống nhất.**

Bài tiếp theo chúng ta sẽ lấy "nguyên liệu" thật cho producer: stream thay đổi real-time của Wikimedia — một nguồn dữ liệu throughput cao, JSON text, chảy liên tục khoảng vài chục message mỗi giây, lý tưởng để demo mọi config producer phía sau.
