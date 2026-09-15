# [Archive] Windows WSL2: Start Kafka Kèm ZooKeeper (Chế Độ Cũ, Chỉ Để Tham Khảo)

> Bài thuộc section **Archive**: chế độ Kafka + ZooKeeper đã bị loại bỏ từ Kafka 4.0. Nếu bạn học mới hoàn toàn, hãy dùng chế độ **KRaft** ở bài `028` và bỏ qua bài này. Chỉ đọc tiếp khi bạn phải维护 cluster cũ vẫn chạy ZooKeeper.

Bài này dành riêng cho **Windows đã có WSL2 + Ubuntu**. Toàn bộ thao tác chạy **trong terminal Ubuntu** — các lệnh y hệt bài Linux `033` vì WSL2 bản chất là Ubuntu. Điểm cần cẩn thận duy nhất là **phải khớp version Kafka trong đường dẫn config**.

---

## 1. Mục Tiêu Và Chuẩn Bị

Hết bài này bạn có: ZooKeeper chạy ở cửa sổ Ubuntu thứ nhất, Kafka chạy ở cửa sổ Ubuntu thứ hai, broker nghe ở `localhost:9092` (từ góc nhìn Ubuntu).

Điều kiện:

- Đã cài Java + Kafka 3.x + PATH trong Ubuntu (bài `027`, nhưng dùng bản 3.x còn ZooKeeper).
- Mở **2 cửa sổ Ubuntu** (mở app Ubuntu 2 lần, không phải PowerShell), cả hai để mở suốt buổi thực hành.

## 2. Bước 1 — Start ZooKeeper (Ubuntu Thứ Nhất)

Trong cửa sổ Ubuntu đầu tiên:

```bash
cd ~/kafka_2.13-3.1.0
bin/zookeeper-server-start.sh config/zookeeper.properties
```

Lưu ý hay gây lỗi nhất bài này: đường dẫn `kafka_2.13-3.1.0/config/zookeeper.properties` chứa **version Kafka**. Máy bạn tải bản nào thì gõ đúng bản đó — copy lệnh mẫu mà sai version là báo `No such file` ngay. Không chắc thì `ls ~` để xem tên thư mục thực tế rồi gõ lại.

File `zookeeper.properties` này tải kèm sẵn trong Kafka, không cần sửa gì khi học. Đợi log bind port 2181, không ERROR, là thành công. Giữ nguyên cửa sổ.

## 3. Bước 2 — Start Kafka (Ubuntu Thứ Hai)

Trong cửa sổ Ubuntu thứ hai:

```bash
cd ~/kafka_2.13-3.1.0
bin/kafka-server-start.sh config/server.properties
```

Cũng kiểm tra version trong đường dẫn như Bước 1 (ví dụ `3.1.0` vs `3.6.0`). Đợi tới `Kafka Server started` là xong.

Verify ở cửa sổ thứ ba:

```bash
kafka-topics.sh --bootstrap-server localhost:9092 --list
```

Không lỗi kết nối là đạt.

## 4. Bước 3 (Tùy Chọn) — Đổi Nơi Lưu Data

Ngó hai file cấu hình để biết data nằm đâu:

```bash
grep "^dataDir" ~/kafka_2.13-3.1.0/config/zookeeper.properties
grep "^log.dirs" ~/kafka_2.13-3.1.0/config/server.properties
```

Mặc định:

```bash
dataDir=/tmp/zookeeper
log.dirs=/tmp/kafka-logs
```

Muốn giữ data lâu thì sửa hai dòng này sang thư mục ổn định rồi restart cả hai (ZooKeeper trước, Kafka sau). Học thì để mặc định.

## Lỗi Thường Gặp & Cách Fix

- **Sai version trong đường dẫn config:** `No such file or directory`. Fix: `ls ~` xem tên thư mục Kafka thực tế, sửa lại version trong lệnh.
- **Start Kafka trước ZooKeeper:** Kafka thoát vì không tìm thấy ZooKeeper. Fix: đúng thứ tự ZooKeeper trước.
- **Gõ lệnh trong PowerShell thay vì Ubuntu:** báo không tìm thấy `bin/...`. Fix: mọi lệnh bài này chỉ chạy trong Ubuntu.
- **Dùng Kafka 4.x:** không còn ZooKeeper. Fix: quay về bài `028` dùng KRaft.
- **Lỗi mạng cross-boundary (ngoài Ubuntu không kết nối được):** bug IPv6 WSL2. Fix: xem bài `029` (sửa `listeners` trong `server.properties`).

## Kết Luận

Vậy là bạn đã dựng được cluster Kafka + ZooKeeper kiểu cũ ngay trong WSL2.

Bài tiếp theo (`035`) là trường hợp đặc biệt nhất: chạy Kafka **native trên Windows không qua WSL2** — chỉ nên đọc để biết vì sao không nên dùng.
