# Linux: Start Kafka Ở Chế Độ KRaft (Không Cần ZooKeeper)

Bài này dành riêng cho **Linux đã cài binaries ở bài `024`**. Chúng ta sẽ start một broker Kafka thật chạy trực tiếp trên Linux ở chế độ **KRaft** — mặc định từ Kafka 4.0, không cần ZooKeeper.

Nếu broker Docker ở bài `020` vẫn chạy tốt thì bài này là tùy chọn. Nhưng nên làm một lần để hiểu 3 thao tác khởi động cốt lõi: sinh cluster ID → format storage → start server.

---

## 1. Mục Tiêu Và Chuẩn Bị

Hết bài này bạn có: 1 broker Kafka chạy foreground trong Terminal, version 4.x, lắng nghe ở `localhost:9092`, dữ liệu lưu ở `/tmp/kraft-combined-logs`.

Điều kiện tiên quyết:

- Đã làm xong bài `024`: có thư mục Kafka dưới home và `kafka-topics.sh` gọi được từ mọi nơi.
- Chỉ chạy **một broker tại một thời điểm**: nếu Docker (`020`) đang chiếm port 9092 thì `docker compose down` trước.
- Cửa sổ chạy Kafka phải **để mở suốt buổi thực hành**.

Tài liệu gốc: trang **Get Started → Quickstart** trên kafka.apache.org. Các lệnh dưới đây bám đúng thứ tự đó.

## 2. Bước 1 — Vào Đúng Thư Mục Kafka

Mọi lệnh format/start dùng đường dẫn tương đối (`bin/...`, `config/...`) nên phải đứng trong thư mục Kafka:

```bash
cd ~/kafka_2.13-4.0.0
pwd
ls bin/kafka-storage.sh config/server.properties
```

Cả hai file đều phải tồn tại. (Tên thư mục có thể khác version, ví dụ `kafka_2.13-4.1.0` — thay cho đúng máy bạn.)

## 3. Bước 2 — Sinh Cluster ID

KRaft yêu cầu mỗi cluster có một ID duy nhất:

```bash
KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"
echo $KAFKA_CLUSTER_ID
```

Thấy in ra chuỗi UUID là đạt. Biến này chỉ sống trong terminal hiện tại — đừng đóng terminal giữa chừng.

## 4. Bước 3 — Xem File Cấu Hình Rồi Format Storage

Trước khi format, ngó nhanh file cấu hình để biết data sẽ đi đâu:

```bash
cat config/server.properties | grep "^log.dirs"
```

Mặc định:

```bash
log.dirs=/tmp/kraft-combined-logs
```

> Nhớ điểm này: `/tmp` có thể bị dọn khi reboot — mất sạch data. Học thì không sao, production thì phải sửa `log.dirs` sang ổ ổn định.

Giờ format thư mục log theo cluster ID vừa sinh:

```bash
bin/kafka-storage.sh format --standalone -t $KAFKA_CLUSTER_ID -c config/server.properties
```

Thấy log `Formatting ... with metadata ...` và không có ERROR là xong.

## 5. Bước 4 — Start Broker Và Verify

Chạy broker ở foreground (có thể gọi từ mọi nơi vì PATH đã setup, nhưng nhớ trỏ đúng file config):

```bash
kafka-server-start.sh ~/kafka_2.13-4.0.0/config/server.properties
```

Đợi log tới dòng `Kafka Server started` (kèm `Kafka version 4.x`) là thành công. Giữ nguyên cửa sổ này.

Mở **Terminal thứ hai** để verify:

```bash
kafka-topics.sh --bootstrap-server localhost:9092 --list
```

Trả về rỗng mà không lỗi kết nối chính là broker đã sống (chưa có topic nào nên list rỗng là đúng).

Dừng broker khi xong: quay lại cửa sổ chạy Kafka, `Ctrl + C`.

## Lỗi Thường Gặp & Cách Fix

- **`KAFKA_CLUSTER_ID: parameter null or not set`:** mở terminal mới sau Bước 2 nên biến môi trường mất. Fix: làm lại từ Bước 2 trong cùng một terminal.
- **Port 9092 đã dùng (`Address already in use`):** broker Docker hoặc một broker tay khác vẫn chạy. Fix: `docker compose down` hoặc kill tiến trình cũ, chỉ giữ một broker.
- **`UnsupportedClassVersionError`:** Java không phải 21. Fix: `java -version`, cài lại Corretto 21 theo bài `024` và chọn đúng JDK bằng `update-alternatives`.
- **Đứng nhầm thư mục khi chạy lệnh tương đối:** báo `No such file or directory` cho `bin/...` hoặc `config/...`. Fix: `cd` về đúng thư mục Kafka rồi chạy lại, hoặc dùng đường dẫn tuyệt đối + `kafka-server-start.sh` từ PATH.
- **Mất data sau reboot:** hành vi mặc định do `log.dirs=/tmp/...`, không phải bug. Muốn giữ data: sửa `log.dirs` sang thư mục khác rồi format + start lại từ đầu.

## Kết Luận

Vậy là bạn đã tự start được broker KRaft trên Linux bằng đúng 3 lệnh gốc của Apache Kafka.

Chuỗi Linux tới đây là xong. Bài tiếp theo (`026`) chúng ta đổi sang **Windows**: cài WSL2 + Ubuntu — bước bắt buộc trước khi làm bất kỳ bài Kafka nào trên Windows.
