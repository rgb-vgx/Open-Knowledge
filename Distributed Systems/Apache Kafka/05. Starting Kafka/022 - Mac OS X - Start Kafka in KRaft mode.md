# Mac: Start Kafka Ở Chế Độ KRaft (Không Cần ZooKeeper)

Bài này dành riêng cho **macOS đã cài binaries ở bài `021`**. Chúng ta sẽ start một broker Kafka thật chạy trực tiếp trên Mac ở chế độ **KRaft** — chế độ mặc định từ Kafka 4.0, không cần ZooKeeper nữa.

Nếu broker Docker ở bài `020` của bạn vẫn chạy tốt thì bài này là tùy chọn. Nhưng nên làm một lần để hiểu Kafka khởi động ra sao.

---

## 1. Mục Tiêu Và Chuẩn Bị

Hết bài này bạn có: 1 broker Kafka chạy foreground trong Terminal, lắng nghe ở `localhost:9092`, dữ liệu lưu ở `/tmp/kraft-combined-logs`.

Điều kiện tiên quyết:

- Đã làm xong bài `021`: có thư mục Kafka (ví dụ `~/kafka_2.13-4.0.0`) và `kafka-topics.sh` gọi được từ mọi nơi.
- Đã tắt broker Docker cũ nếu muốn tránh đụng port 9092, hoặc để nguyên và chấp nhận chỉ chạy 1 trong 2.
- Biết rằng cửa sổ chạy Kafka phải **để mở suốt buổi thực hành** — tắt là broker dừng.

Tài liệu gốc của các lệnh dưới đây nằm ở trang **Get Started → Quickstart** trên kafka.apache.org. Các lệnh trong bài này bám đúng thứ tự đó.

## 2. Bước 1 — Vào Đúng Thư Mục Kafka

Mọi lệnh format và start đều dùng đường dẫn tương đối (`bin/...`, `config/...`) nên bắt buộc phải đứng trong thư mục Kafka trước:

```bash
cd ~/kafka_2.13-4.0.0
pwd
```

Kiểm tra nhanh hai file quan trọng còn nguyên:

```bash
ls bin/kafka-storage.sh config/server.properties
```

Cả hai đều phải tồn tại. Mất một trong hai là bạn đang đứng nhầm thư mục.

## 3. Bước 2 — Sinh Cluster ID

KRaft yêu cầu mỗi cluster có một ID duy nhất. Lệnh sau vừa sinh UUID ngẫu nhiên vừa lưu vào biến môi trường `KAFKA_CLUSTER_ID`:

```bash
KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"
echo $KAFKA_CLUSTER_ID
```

Thấy in ra một chuỗi UUID dạng `8a1f...` là đạt. Lưu ý: biến này chỉ sống trong terminal hiện tại — đừng đóng terminal giữa chừng, nếu đóng thì làm lại từ bước này.

## 4. Bước 3 — Format Thư Mục Log

Lệnh này khởi tạo thư mục dữ liệu theo đúng cluster ID vừa sinh:

```bash
bin/kafka-storage.sh format --standalone -t $KAFKA_CLUSTER_ID -c config/server.properties
```

Thấy log báo `Formatting ... with metadata ...` và không có ERROR là xong. Hiểu đơn giản: Kafka đang "định dạng ổ cứng" của nó trước khi ghi dữ liệu.

Muốn biết dữ liệu sẽ nằm ở đâu, ngó nhanh file cấu hình:

```bash
grep "^log.dirs" config/server.properties
```

Mặc định là:

```bash
log.dirs=/tmp/kraft-combined-logs
```

> Nhược điểm của mặc định này: `/tmp` trên Mac có thể bị dọn khi reboot — mất sạch data. Học thì không sao, nhưng muốn giữ data lâu dài thì sửa `log.dirs` sang đường dẫn ổn định. Chỉ cần biết vậy, chưa cần sửa ngay.

## 5. Bước 4 — Start Broker

Chạy broker ở foreground:

```bash
bin/kafka-server-start.sh config/server.properties
```

Đợi log chạy một lúc, tới khi thấy dòng `Kafka Server started` (kèm version 4.x) là thành công. Đừng `Ctrl + C`, đừng đóng cửa sổ này.

Mở **một Terminal thứ hai** để verify broker đang nghe:

```bash
kafka-topics.sh --bootstrap-server localhost:9092 --list
```

Lần đầu chưa có topic nào nên lệnh trả về rỗng — rỗng mà không báo lỗi kết nối chính là thành công. Muốn chắc hơn thì tạo thử một topic rồi xóa (cách làm chi tiết ở các bài Topic sau).

Dừng broker khi không cần nữa: quay lại cửa sổ chạy Kafka, nhấn `Ctrl + C`.

## Lỗi Thường Gặp & Cách Fix

- **`KAFKA_CLUSTER_ID: parameter null or not set` khi format:** bạn mở terminal mới sau bước 2 nên biến môi trường bị mất. Fix: làm lại từ Bước 2 trong cùng một terminal.
- **`Address already in use` / port 9092 bị chiếm:** broker Docker ở bài `020` vẫn đang chạy. Fix: `docker compose down` trong thư mục stack, hoặc dừng container Kafka trong Docker Desktop rồi start lại.
- **`java.lang.UnsupportedClassVersionError`:** Java đang dùng không phải 21. Fix: `java --version` để kiểm tra, cài lại Corretto 21 theo bài `021`.
- **Mất data sau khi restart máy:** do `log.dirs` nằm ở `/tmp`. Đây là hành vi mặc định, không phải bug. Muốn giữ data thì sửa `log.dirs` trong `config/server.properties` sang thư mục khác rồi format + start lại từ đầu.
- **`command not found: kafka-topics.sh` ở terminal thứ hai:** PATH chưa có hiệu lực ở cửa sổ mới. Fix: mở terminal mới hoàn toàn hoặc `source ~/.zshrc`.

## Kết Luận

Vậy là bạn đã tự tay sinh cluster ID, format storage và start broker KRaft trên Mac — đúng 3 việc mà Docker trước đây làm hộ bạn.

Bài tiếp theo (`023`) chúng ta xem con đường tắt hơn trên Mac: cài Kafka bằng `brew`, khỏi tải ZIP thủ công.
