# Windows WSL2: Start Kafka Ở Chế Độ KRaft (Trong Ubuntu)

Bài này dành riêng cho **Windows đã xong bài `026` + `027`** (có Ubuntu + Java + Kafka binaries + PATH). Toàn bộ thao tác chạy **trong terminal Ubuntu**. Chúng ta sẽ start một broker Kafka thật ở chế độ **KRaft**, không cần ZooKeeper.

Nếu broker Docker ở bài `020` vẫn chạy tốt thì bài này là tùy chọn — nhưng nên làm một lần để hiểu quy trình khởi động chuẩn của Kafka 4.x.

---

## 1. Mục Tiêu Và Chuẩn Bị

Hết bài này bạn có: 1 broker Kafka chạy foreground trong terminal Ubuntu, version 4.x, nghe ở `localhost:9092` (từ góc nhìn của Ubuntu), dữ liệu ở `/tmp/kraft-combined-logs`.

Điều kiện:

- `kafka-topics.sh` gõ từ mọi nơi trong Ubuntu đều được (bài `027`).
- Chỉ chạy **một broker tại một thời điểm**: Docker đang chiếm 9092 thì `docker compose down` trước.
- Cửa sổ Ubuntu chạy Kafka phải **để mở suốt buổi thực hành**; muốn gõ lệnh khác thì mở thêm một cửa sổ Ubuntu thứ hai.

Tài liệu gốc: trang **Get Started → Quickstart** trên kafka.apache.org.

## 2. Bước 1 — Vào Đúng Thư Mục Kafka

Các lệnh format/start dùng đường dẫn tương đối nên phải đứng trong thư mục Kafka:

```bash
cd ~/kafka_2.13-4.0.0
pwd
ls bin/kafka-storage.sh config/server.properties
```

Cả hai file đều phải tồn tại (tên version có thể khác máy bạn — thay cho đúng).

## 3. Bước 2 — Sinh Cluster ID

```bash
KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"
echo $KAFKA_CLUSTER_ID
```

Thấy in ra chuỗi UUID là đạt. Biến này chỉ sống trong terminal hiện tại — đừng đóng terminal giữa chừng, mất là phải sinh lại.

## 4. Bước 3 — Xem File Cấu Hình Rồi Format Storage

Ngó nhanh file cấu hình broker để biết data sẽ đi đâu:

```bash
cat config/server.properties | grep "^log.dirs"
```

Mặc định:

```bash
log.dirs=/tmp/kraft-combined-logs
```

> `/tmp` trong WSL2 đủ dùng để học, nhưng reboot hoặc WSL shutdown có thể mất data — hành vi mặc định, không phải bug. Muốn giữ data lâu thì sửa `log.dirs` sang chỗ khác.

Format thư mục log theo cluster ID vừa sinh:

```bash
bin/kafka-storage.sh format --standalone -t $KAFKA_CLUSTER_ID -c config/server.properties
```

Thấy `Formatting ... with metadata ...`, không ERROR là xong.

## 5. Bước 4 — Start Broker Và Verify

Chạy broker ở foreground:

```bash
bin/kafka-server-start.sh config/server.properties
```

Đợi log tới dòng `Kafka Server started` (kèm `Kafka version 4.x`) là thành công. Giữ nguyên cửa sổ này.

Mở **cửa sổ Ubuntu thứ hai** để verify (mở app Ubuntu thêm lần nữa, không phải PowerShell):

```bash
kafka-topics.sh --bootstrap-server localhost:9092 --list
```

Trả về rỗng mà không lỗi kết nối là broker đã sống. Dừng broker: `Ctrl + C` ở cửa sổ chạy Kafka.

## Lỗi Thường Gặp & Cách Fix

- **`KAFKA_CLUSTER_ID: parameter null or not set`:** mở terminal mới sau Bước 2 nên biến môi trường mất. Fix: làm lại từ Bước 2 trong cùng một terminal.
- **Port 9092 đã dùng:** broker Docker hoặc broker cũ vẫn chạy. Fix: tắt bớt, chỉ giữ một broker.
- **`UnsupportedClassVersionError`:** Java trong Ubuntu không phải 21. Fix: `java --version`, cài lại Corretto 21 theo bài `027`.
- **Gõ lệnh Kafka trong PowerShell thay vì Ubuntu:** báo không tìm thấy lệnh hoặc sai đường dẫn. Fix: mọi lệnh `bin/...`, `kafka-topics.sh` chỉ chạy trong Ubuntu.
- **Lỗi kết nối lạ khi chọc vào broker từ PowerShell / Java / Conduktor ngoài Ubuntu:** đây là bug mạng IPv6 của WSL2, không phải bạn làm sai. Fix: xem ngay bài `029` để fix `listeners` + IPv6.

## Kết Luận

Vậy là bạn đã start được broker KRaft ngay trong WSL2 — đúng quy trình chuẩn sẽ dùng xuyên suốt khóa học.

Bài tiếp theo (`029`) là bài "cứu hộ": fix lỗi mạng WSL2 khiến CLI ngoài Ubuntu không kết nối được vào broker — đọc ngay khi gặp lỗi `node not available` hoặc timeout dù broker vẫn chạy.
