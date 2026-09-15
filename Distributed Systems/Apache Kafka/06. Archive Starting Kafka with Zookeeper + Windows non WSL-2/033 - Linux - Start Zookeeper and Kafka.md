# [Archive] Linux: Start Kafka Kèm ZooKeeper (Chế Độ Cũ, Chỉ Để Tham Khảo)

> Bài thuộc section **Archive**: chế độ Kafka + ZooKeeper đã bị loại bỏ từ Kafka 4.0. Nếu bạn học mới hoàn toàn, hãy dùng chế độ **KRaft** ở bài `025` và bỏ qua bài này. Chỉ đọc tiếp khi bạn phải维护 cluster cũ vẫn chạy ZooKeeper.

Bài này dành riêng cho **Linux (Ubuntu/Debian)**, dựng 1 broker + 1 ZooKeeper bằng binaries. Nội dung giống hệt bài Mac `032`, chỉ khác môi trường chạy.

---

## 1. Mục Tiêu Và Chuẩn Bị

Hết bài này bạn có: 2 tiến trình song song — ZooKeeper ở terminal trái, Kafka ở terminal phải — broker nghe ở `localhost:9092`.

Điều kiện:

- Đã cài binaries + PATH theo bài `024` (bản Kafka 3.x còn ZooKeeper).
- Chuẩn bị **2 terminal** cạnh nhau, cả hai **để mở suốt buổi thực hành**.

## 2. Bước 1 — Start ZooKeeper (Terminal Trái)

ZooKeeper cần file cấu hình có sẵn `config/zookeeper.properties`, không cần sửa gì khi học.

Trong terminal trái:

```bash
cd ~/kafka_2.13-3.1.0
bin/zookeeper-server-start.sh config/zookeeper.properties
```

Gõ thiếu tham số config là lệnh báo lỗi ngay — đó là hành vi đúng. Đợi log đứng yên ở trạng thái bind port 2181, không ERROR, là thành công. Giữ nguyên cửa sổ này.

Ngó nhanh cấu hình cho biết:

```bash
cat config/zookeeper.properties
```

Dòng quan trọng: `dataDir=/tmp/zookeeper` — nơi ZooKeeper lưu data (mặc định `/tmp`, reboot là mất).

## 3. Bước 2 — Start Kafka (Terminal Phải)

Trong terminal phải:

```bash
cd ~/kafka_2.13-3.1.0
bin/kafka-server-start.sh config/server.properties
```

Đợi tới dòng `Kafka Server started` là xong. Cluster mini của bạn: Kafka (phải) đã đăng ký vào ZooKeeper (trái).

Verify ở terminal thứ ba:

```bash
kafka-topics.sh --bootstrap-server localhost:9092 --list
```

Không lỗi kết nối là đạt.

## 4. Bước 3 (Tùy Chọn) — Đổi Nơi Lưu Data

Mặc định: `dataDir=/tmp/zookeeper` (ZooKeeper) và `log.dirs=/tmp/kafka-logs` (Kafka). Muốn giữ data lâu thì sửa hai dòng này sang thư mục ổn định rồi restart cả hai theo thứ tự ZooKeeper trước, Kafka sau. Học thì cứ để mặc định.

## Lỗi Thường Gặp & Cách Fix

- **Quên truyền file `.properties`:** báo lỗi thiếu config. Fix: luôn kèm đúng file config cho từng lệnh.
- **Start Kafka trước ZooKeeper:** Kafka không tìm thấy ZooKeeper, thoát ngay. Fix: ZooKeeper trước, Kafka sau.
- **Đóng nhầm một cửa sổ:** cluster chết theo. Fix: start lại tiến trình đã tắt.
- **Dùng Kafka 4.x:** không còn `zookeeper-server-start.sh`. Fix: quay về bài `025` dùng KRaft, hoặc tải Kafka 3.x nếu bắt buộc.
- **Port 2181/9092 bị chiếm:** tiến trình cũ hoặc Docker vẫn chạy. Fix: tắt bớt, chỉ giữ một bộ.

## Kết Luận

Vậy là bạn đã dựng được cluster Kafka + ZooKeeper kiểu cũ trên Linux.

Bài tiếp theo (`034`) là phiên bản tương tự trên **Windows WSL2** — các lệnh y hệt vì WSL2 bản chất cũng là Ubuntu.
