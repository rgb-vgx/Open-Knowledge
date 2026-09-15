# [Archive] Mac: Start Kafka Kèm ZooKeeper (Chế Độ Cũ, Chỉ Để Tham Khảo)

> Bài thuộc section **Archive**: chế độ Kafka + ZooKeeper đã bị loại bỏ từ Kafka 4.0. Nếu bạn học mới hoàn toàn, hãy dùng chế độ **KRaft** ở bài `022` và bỏ qua bài này. Chỉ đọc tiếp khi bạn phải维护 cluster cũ vẫn chạy ZooKeeper.

Bài này dành riêng cho **macOS**, dựng 1 broker + 1 ZooKeeper chạy trực tiếp bằng binaries, không Docker, không UI.

---

## 1. Mục Tiêu Và Chuẩn Bị

Hết bài này bạn có: 2 tiến trình chạy song song — ZooKeeper ở cửa sổ trái, Kafka ở cửa sổ phải — broker nghe ở `localhost:9092`.

Điều kiện:

- Đã cài binaries + PATH theo bài `021` (bản 3.x có ZooKeeper; bản 4.x đã gỡ ZooKeeper nên không làm được bài này).
- Chuẩn bị **2 cửa sổ Terminal** đặt cạnh nhau: trái cho ZooKeeper, phải cho Kafka. Cả hai phải **để mở suốt buổi thực hành**.

## 2. Bước 1 — Start ZooKeeper (Terminal Trái)

ZooKeeper cần một file cấu hình, may là Kafka đóng gói sẵn: `config/zookeeper.properties`. Không cần sửa gì, giữ nguyên mặc định là đủ học.

Trong terminal trái, đứng ở thư mục Kafka rồi start:

```bash
cd ~/kafka_2.13-3.1.0
bin/zookeeper-server-start.sh config/zookeeper.properties
```

Giải thích ngắn: `zookeeper-server-start.sh` là script khởi động ZooKeeper, tham số phía sau là file properties chỉ nó cách chạy (port, nơi lưu data...). Gõ thiếu tham số này là lệnh báo lỗi ngay — đó là hành vi đúng, không phải bug.

Đợi log chạy tới khi không còn ERROR, thấy ZooKeeper bind port 2181 là thành công. **Giữ nguyên cửa sổ này**, mở terminal phải làm tiếp.

Muốn ngó file cấu hình cho biết:

```bash
cat config/zookeeper.properties
```

Dòng đáng chú ý nhất là `dataDir=/tmp/zookeeper` — nơi ZooKeeper lưu data, mặc định ở `/tmp` nên reboot là mất (học thì không sao).

## 3. Bước 2 — Start Kafka (Terminal Phải)

Trong terminal phải, cũng đứng ở thư mục Kafka rồi start broker, trỏ vào `config/server.properties`:

```bash
cd ~/kafka_2.13-3.1.0
bin/kafka-server-start.sh config/server.properties
```

Đợi log tới dòng `Kafka Server started` là xong. Vậy là bạn có cluster mini: Kafka (phải) đăng ký với ZooKeeper (trái).

Verify nhanh bằng cửa sổ thứ ba (hoặc dùng lệnh ở bài Topic sau):

```bash
kafka-topics.sh --bootstrap-server localhost:9092 --list
```

Không lỗi kết nối là đạt.

## 4. Bước 3 (Tùy Chọn) — Đổi Nơi Lưu Data

Mặc định cả hai đều lưu ở `/tmp` (`dataDir=/tmp/zookeeper` cho ZooKeeper, `log.dirs=/tmp/kafka-logs` cho Kafka). Muốn giữ data lâu dài thì sửa hai dòng đó trong 2 file properties sang thư mục ổn định, rồi restart cả hai tiến trình theo đúng thứ tự: ZooKeeper trước, Kafka sau.

Học trong khóa này thì không cần — cứ để mặc định.

## Lỗi Thường Gặp & Cách Fix

- **Quên truyền file `.properties`:** lệnh báo lỗi thiếu config. Fix: luôn kèm `config/zookeeper.properties` (ZooKeeper) và `config/server.properties` (Kafka).
- **Start Kafka trước ZooKeeper:** Kafka báo không kết nối được ZooKeeper rồi thoát. Fix: đúng thứ tự — ZooKeeper lên trước, Kafka sau.
- **Đóng nhầm một trong hai cửa sổ:** broker hoặc ZooKeeper dừng theo, cluster chết. Fix: start lại tiến trình đã tắt, giữ cả hai cửa sổ mở.
- **Dùng Kafka 4.x làm theo bài này:** báo không tìm thấy `zookeeper-server-start.sh` vì bản 4.x đã gỡ ZooKeeper. Fix: đây là bài archive — quay về bài `022` dùng KRaft, hoặc tải bản Kafka 3.x nếu bắt buộc thực hành ZooKeeper.
- **Port 2181/9092 bị chiếm:** ZooKeeper/Kafka cũ hoặc Docker vẫn chạy. Fix: tắt bớt, chỉ giữ một bộ tại một thời điểm.

## Kết Luận

Vậy là bạn đã dựng được cluster Kafka + ZooKeeper kiểu cũ trên Mac: 2 terminal, 2 tiến trình, start đúng thứ tự.

Bài tiếp theo (`033`) là phiên bản tương tự trên **Linux** — nội dung gần như giống hệt, chỉ khác môi trường chạy.
