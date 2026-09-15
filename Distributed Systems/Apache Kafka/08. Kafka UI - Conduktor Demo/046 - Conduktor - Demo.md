# Conduktor UI: Nhìn Lại Mọi Lệnh CLI Bằng Click Chuột

Suốt section CLI chúng ta gõ lệnh trong terminal mù: tạo topic, produce, consume, describe group, reset offset. Bài này đổi gió — mở Conduktor UI để thấy chính những thao tác đó hiện lên trực quan thế nào. Hiểu song song CLI ↔ UI giúp bạn đi nhanh gấp đôi: học bằng UI cho trực quan, vận hành production bằng CLI cho script hóa được.

---

## 1. Bài Toán: Khi Nào Dùng UI, Khi Nào Dùng CLI?

CLI mạnh khi SSH vào server, viết script CI/CD, xả lag hàng loạt lúc sự cố. UI mạnh khi học, khi cần soi một message cụ thể, khi reset offset mà muốn nhìn rõ kế hoạch trước khi bấm. Conduktor bao cả hai: mọi click trong UI đều tương ứng một lệnh CLI bạn đã học, và ngược lại.

Bài này đi một vòng các màn hình chính theo đúng thứ tự section CLI: cluster → topics → produce → consumer groups → mở rộng enterprise.

## 2. Home Và Quản Lý Cluster

Mở Conduktor, góc trái trên là bộ chọn cluster. Một Conduktor quản lý nhiều cluster cùng lúc (local, staging, production), chuyển qua lại không cần đổi terminal hay sửa `--bootstrap-server`.

Mỗi cluster khai báo 3 thứ — đúng 3 mảnh của lệnh CLI:

* Tên hiển thị + technical ID.
* Bootstrap servers (ví dụ `localhost:9092` hay URL Playground).
* Phương thức xác thực (SASL/SSL — chính là nội dung file `playground.config` ở bài Topics CLI).

Trang Home hiện trạng thái cluster, danh sách topic/subject xem gần đây. Có hướng dẫn kết nối sẵn cho từng loại Kafka (local, MSK, Confluent Cloud...) — đỡ phải đoán flag.

## 3. Topics: Soi Record, Produce Test, Tạo Topic Có Label

### 3.1. Xem record trong topic

Vào Topics → chọn `first_topic`. Bạn thấy bảng record với key, value, timestamp — tương đương lệnh:

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic first_topic --from-beginning \
  --formatter kafka.tools.DefaultMessageFormatter \
  --property print.timestamp=true \
  --property print.key=true \
  --property print.value=true \
  --property print.partition=true
```

Click vào một message cụ thể thấy thêm headers và metadata (partition, offset) — thứ mà CLI phải gõ formatter mới ra. Muốn xem riêng một partition (như demo lọc Partition 0 ở bài Consumer CLI), UI có bộ lọc partition sẵn, bấm Apply là xong.

Tính năng đáng tiền nhất khi debug: **reprocess message** — gửi lại message đó sang cùng topic hoặc topic khác trong một click. Bằng CLI bạn phải consume ra file rồi produce lại thủ công.

### 3.2. Produce test ngay trong UI

Tab Produce cho phép nhập key + value rồi bấm gửi — tương đương một dòng trong `kafka-console-producer.sh`. Chưa hết, UI còn hai chế độ CLI không có:

* **Generate ngẫu nhiên:** bấm generate là có chuỗi ngẫu nhiên cho key/value, khỏi nghĩ test data.
* **Produce liên tục theo nhịp:** bật chế độ tự động, interval 1 giây → mỗi giây một record chảy vào topic. Muốn test consumer chịu tải nhẹ hay demo lag tăng dần thì đây là cách nhanh nhất, không cần viết vòng lặp shell.

Kèm theo là cấu hình headers nếu cần — ngang với `--property` của console producer nhưng có form điền.

### 3.3. Tạo topic có label

Topics → Create: đặt tên, chọn partitions, replication factor, thêm cấu hình tùy biến — tương đương:

```bash
kafka-topics.sh --bootstrap-server localhost:9092 \
  --create --topic demo --partitions 3 --replication-factor 1
```

UI cộng thêm **labels** (ví dụ `team: dev`, `env: demo`) để lọc và gom nhóm hàng trăm topic trong công ty. CLI không có khái niệm label — đây là lớp quản trị của Conduktor phủ lên trên Kafka thuần. Tạo xong quay lại danh sách, refresh là thấy tag `team: dev` gắn trên topic mới.

## 4. Consumer Groups: Xem Lag Và Reset Không Cần Nhớ Flag

Mục Consumer Groups liệt kê mọi group — tương đương `kafka-consumer-groups.sh --list`. Click vào `my-first-application` thấy LAG từng partition, consumer nào ôm partition nào — chính là bảng `--describe` ở bài 043 nhưng tô màu, sort được.

Reset offset trong UI: chọn topic, chọn partition (hoặc tất cả), chọn strategy (`Earliest`, `Latest`, `Shift by`, `To datetime`...) rồi preview kết quả trước khi xác nhận. Tương đương cặp:

```bash
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --group my-first-application \
  --reset-offsets --to-earliest --topic third_topic --dry-run

kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --group my-first-application \
  --reset-offsets --to-earliest --topic third_topic --execute
```

Điểm hơn của UI: khó gõ nhầm tên group, khó quên `--topic`, luôn thấy preview NEW-OFFSET trước khi commit. Với thao tác nguy hiểm như reset, UI là lựa chọn an toàn hơn — đúng như kết luận bài 044.

Mục này hiện trống Schema Registry và Kafka Connect nếu cluster chưa cấu hình — bình thường ở môi trường học. Khi công ty bạn có, chúng sẽ hiện ở đây để quản trị tập trung.

## 5. Các Mảnh Enterprise: Gateway, Brokers, Bảo Mật, Quản Trị Chi Phí

Phần còn lại của menu là lý do công ty trả tiền cho Conduktor thay vì dùng tool miễn phí:

* **Kafka Gateway:** luật nâng cao — topic policy (ép mọi topic mới phải có replication factor 3), mã hóa từng field, audit ai đọc topic nào, bắt buộc message có schema ID. CLI không làm được lớp này.
* **Brokers:** xem có bao nhiêu broker, version, ai là controller, phân bố partition — thông tin mà CLI phải ghép từ `kafka-topics.sh --describe` nhiều topic mới ra.
* **Service accounts + Self-service:** tạo tài khoản cho từng ứng dụng, cho developer tự xin tạo topic theo quy trình phê duyệt thay vì xin admin gõ lệnh hộ.
* **ksqlDB:** chạy truy vấn stream SQL trực tiếp từ UI.
* **Chargeback:** thống kê team nào dùng Kafka nhiều nhất để chia chi phí — bài toán quản trị thuần túy, ngoài phạm vi CLI.
* **Rules:** luật chất lượng dữ liệu (ví dụ cấm message không có key lên topic thanh toán).

Học thì chưa cần đụng tới, nhưng biết chúng ở đâu để sau này không bỡ ngỡ khi vào công ty.

## Cạm Bẫy Thường Gặp

* **Học chỉ bằng UI rồi đứng hình khi SSH vào server production.** Mọi màn hình trên đều có lệnh CLI tương đương đã học từ bài 036 tới 044 — hãy tự dịch ngược mỗi click thành lệnh.
* **Dùng produce liên tục trong UI quên tắt.** Interval 1 giây chạy nền suốt buổi họp là topic đầy message rác, LAG các group phình to. Produce test xong thì dừng ngay.
* **Nhầm cluster khi thao tác (local vs production).** UI chuyển cluster chỉ bằng một click — nhanh nhưng nguy hiểm. Trước khi delete topic hay reset offset, liếc góc trái trên xác nhận đúng cluster, giống như kiểm tra `--bootstrap-server` trước khi Enter ở CLI.
* **Tin rằng UI thấy được tất cả.** Label, gateway policy, chargeback là dữ liệu của Conduktor, không nằm trong Kafka. Bỏ Conduktor thì mất chúng — còn topic, message, offset thì vẫn nguyên trên broker.

## Kết Luận

Tóm một câu: **Conduktor UI là mặt trực quan của đúng những lệnh CLI bạn đã học — soi record thay `--formatter`, produce test thay console producer, reset offset có preview thay `--dry-run/--execute` — cộng thêm lớp quản trị enterprise (label, gateway, chargeback) mà CLI thuần không có.**

Section CLI và UI tới đây khép lại: bạn đã tự tay tạo topic, bơm message, đọc theo group, soi lag và tua offset. Từ bài sau chúng ta nâng cấp hẳn: không gõ tay từng message nữa mà viết Producer và Consumer thật bằng Java SDK — bước vào phần lập trình Kafka.
