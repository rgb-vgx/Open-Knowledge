# Safe Producer: Một Preset Chuẩn Cho Mọi Pipeline Không Được Phép Mất Dữ Liệu

Bốn bài vừa rồi (067–069) mỗi bài cho một mảnh: `acks`, `retries`, `enable.idempotence`. Bài này gom tất cả thành một preset duy nhất để tra cứu nhanh: Kafka 3.0 đã safe sẵn ra sao, Kafka ≤ 2.8 phải set tay những gì, và phía broker cần gì đi kèm.

---

## 1. Vấn đề: Mỗi Config Đúng Riêng Vẫn Có Thể Sai Chung

Rất nhiều pipeline mất dữ liệu dù đã set `acks=all` — vì quên `enable.idempotence` nên retry đẻ duplicate; hoặc đã bật idempotence nhưng `min.insync.replicas` vẫn là 1 nên leader đơn độc vẫn ack. Durability là bài toán của cả chùm config producer + broker, không phải một núm vặn.

Giải pháp: chốt một preset Safe duy nhất, áp cho mọi producer quan trọng, và kiểm tra nó như checklist thay vì nhớ từng bài.

## 2. Cơ Chế: Vì Sao Kafka 3.0 An Toàn Hơn Hẳn 2.8?

Bước ngoặt là Kafka 3.0 đổi default của producer:

| Config | Default client ≤ 2.8 | Default client ≥ 3.0 | Ý nghĩa của thay đổi |
|---|---|---|---|
| `acks` | `1` (chỉ leader) | `all` (`-1`) | Từ "leader ghi xong là xong" thành "đủ ISR mới ack" |
| `enable.idempotence` | `false` | `true` | Từ "retry có thể trùng/lộn" thành "retry an toàn" |
| `retries` | `0` (≤ 2.0) / lớn nhưng không idempotent | `Integer.MAX_VALUE` | Retry tới khi hết `delivery.timeout.ms` |
| `max.in.flight.requests.per.connection` | `5` nhưng nguy hiểm khi retry | `5` + an toàn nhờ idempotence | Giữ throughput mà vẫn đúng thứ tự |

Nói cách khác: lên client 3.0+, bạn có safe producer mà không cần viết thêm dòng nào. Ở client cũ, bạn phải set tay từng dòng để mô phỏng đúng bộ default mới này. Khuyến nghị số một vì vậy không phải một config nào — mà là **nâng Kafka client lên bản mới nhất có thể**.

## 3. Config Chi Tiết: Preset Safe Đầy Đủ Để Tra Cứu

### 3.1. Bảng preset (dán lên tường)

| Config | Giá trị Safe | Cấp | Giải thích một dòng |
|---|---|---|---|
| `acks` | `all` | Producer | Chờ mọi ISR ghi xong mới ack (bài 067) |
| `enable.idempotence` | `true` | Producer | PID + sequence chống duplicate, giữ ordering (bài 069) |
| `retries` | `Integer.MAX_VALUE` | Producer | Retry lỗi retriable tới khi hết deadline (bài 068) |
| `delivery.timeout.ms` | `120000` (2 phút) | Producer | Deadline tổng cho mọi retry (bài 068) |
| `max.in.flight.requests.per.connection` | `5` | Producer | Pipeline đầy mà vẫn đúng thứ tự nhờ idempotence (bài 068) |
| `replication.factor` | `3` | Topic/Broker | Mỗi partition có 3 bản copy |
| `min.insync.replicas` | `2` | Topic/Broker | Ít nhất leader + 1 follower mới được ack |

Công thức availability nhắc lại: chịu được `N - M = 3 - 2 = 1` broker down mà vẫn ghi được.

### 3.2. Từng config khi nào cần đụng tới

- **`acks=all`**: luôn set tường minh dù client 3.x đã default. Người đọc code thấy ngay yêu cầu durability; người chạy client cũ được bảo vệ.
- **`enable.idempotence=true`**: luôn bật cho dữ liệu quan trọng. Tự nó ép `acks=all` + `retries=MAX` nếu bạn quên — nhưng đừng ỷ lại, hãy viết đủ.
- **`retries=MAX_VALUE` + `delivery.timeout.ms=120000`**: giữ nguyên cặp này. Hạ deadline chỉ khi muốn fail fast về DLQ; tăng chỉ khi network xuyên region p99 đã đo là cao.
- **`max.in.flight=5`**: giữ 5 khi đã idempotent. Hạ về 1 chỉ là thuốc của thời tiền-idempotence.
- **`replication.factor=3` + `min.insync.replicas=2`**: set ở mức topic khi tạo (production). Local 1 broker thì **bắt buộc** RF=1, M=1 — đừng bê số production về.

## 4. Code Ví Dụ: Khối Safe Hoàn Chỉnh

```java
import org.apache.kafka.clients.producer.ProducerConfig;
import java.util.Properties;

Properties props = new Properties();
props.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "127.0.0.1:9092");
props.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
        "org.apache.kafka.common.serialization.StringSerializer");
props.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG,
        "org.apache.kafka.common.serialization.StringSerializer");

// ===== SAFE PRESET - copy nguyên khối này cho mọi producer quan trọng =====
props.setProperty(ProducerConfig.ACKS_CONFIG, "all");
props.setProperty(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true");
props.setProperty(ProducerConfig.RETRIES_CONFIG, Integer.toString(Integer.MAX_VALUE));
props.setProperty(ProducerConfig.DELIVERY_TIMEOUT_MS_CONFIG, "120000");
props.setProperty(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, "5");
// ==========================================================================

// Phía broker/topic (production) - tạo topic kèm:
// --replication-factor 3 --config min.insync.replicas=2
```

Đối chiếu sau khi chạy: mở log khởi động, phải thấy `acks = -1`, `enable.idempotence = true`, `retries = 2147483647`, `max.in.flight.requests.per.connection = 5`. Thiếu dòng nào là preset chưa vào.

```bash
# Kiểm tra phía server (production)
kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic wikimedia.recentchange
kafka-configs.sh --bootstrap-server localhost:9092 --entity-type topics --entity-name wikimedia.recentchange --describe
```

## 5. Safe / High-Throughput Preset Tóm Tắt

Bài này chính là preset Safe — dùng nguyên khối code mục 4:

```java
// SAFE (chốt - dùng cho bài 071 và giữ xuyên suốt 072-076):
// acks=all, enable.idempotence=true, retries=MAX,
// delivery.timeout.ms=120000, max.in.flight=5
// + broker: RF=3, min.insync.replicas=2 (local: RF=1, M=1)
```

Chưa có throughput. Preset này có thể tăng latency nhẹ so với `acks=1` — phần tăng tốc ở bài 072–074 sẽ bù lại mà không chạm vào 5 dòng này.

## 6. Cạm Bẫy Thường Gặp

- **Nâng broker lên 3.x nhưng giữ client 2.8.** Default safe nằm ở *client*, không phải broker. Broker mới + client cũ = vẫn `acks=1`, `idempotence=false`. Nâng client mới là việc quyết định.
- **Set đủ 5 dòng producer nhưng quên phía broker.** `acks=all` + `min.insync.replicas=1` thì leader đơn độc vẫn ack — durability chỉ bằng một nửa kỳ vọng.
- **Bê `min.insync.replicas=2` về local 1 broker.** Mọi write fail với `NotEnoughReplicasException`. Quy tắc: M không bao giờ được lớn hơn số broker thực tế.
- **Tưởng safe là không bao giờ fail.** Safe nghĩa là *không mất lặng lẽ*: khi hết deadline hay thiếu ISR, producer fail **to** và báo lỗi rõ ràng để bạn xử lý (retry ở tầng app, DLQ, alert). Hãy viết callback xử lý fail.
- **Áp safe cho cả metric phụ rồi than chậm.** `acks=all` + idempotence có chi phí latency/CPU thật. Dữ liệu mất được (sampling, debug log) cứ dùng nhẹ hơn — safe là lựa chọn, không phải tôn giáo.

## Kết Luận

Tóm lại một câu: **safe producer = `acks=all` + `enable.idempotence=true` + `retries=MAX` + `delivery.timeout.ms=120s` + `max.in.flight=5` ở client, đi cùng `replication.factor=3` + `min.insync.replicas=2` ở broker — client 3.0 có sẵn, client cũ phải set tay.**

Bài tiếp theo chúng ta áp nguyên preset này vào Wikimedia producer thật: sửa code, đọc log xác nhận từng giá trị đổi, và thấy vì sao local 1 broker phải giữ `min.insync.replicas=1`.
