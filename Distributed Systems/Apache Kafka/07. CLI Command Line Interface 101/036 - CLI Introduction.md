# Kafka CLI: Cửa Ngõ Thực Hành Mọi Lệnh Kafka

Bạn đã hiểu Topic, Partition, Offset về mặt lý thuyết. Từ bài này trở đi, mọi khái niệm đó sẽ được chạm tay trực tiếp qua **Kafka CLI** — bộ công cụ dòng lệnh đi kèm sẵn với Kafka binaries. Nắm vững CLI nghĩa là bạn làm chủ được Kafka ở bất kỳ môi trường nào, kể cả server không có UI.

---

## 1. Bài Toán: Tại Sao Phải Học CLI Khi Đã Có UI?

UI như Conduktor rất trực quan, nhưng thực tế production bạn sẽ gặp:

* Server staging / production chỉ cho SSH, không có UI.
* CI/CD cần script tạo topic, kiểm tra consumer lag tự động.
* Debug sự cố lúc 2h sáng: chỉ có terminal.

CLI giải quyết tất cả. Mọi thao tác UI làm được — tạo topic, produce, consume, xem group, reset offset — CLI đều làm được, lại còn script hóa được.

Bộ 4 lệnh bạn sẽ dùng xuyên suốt section này:

| Lệnh | Dùng để làm gì |
|---|---|
| `kafka-topics.sh` | Tạo, liệt kê, mô tả, sửa, xóa topic |
| `kafka-console-producer.sh` | Gửi message thủ công vào topic |
| `kafka-console-consumer.sh` | Đọc message thủ công từ topic |
| `kafka-consumer-groups.sh` | Liệt kê, mô tả, xóa group, reset offset |

## 2. Ba Biến Thể Lệnh Theo Hệ Điều Hành

Cùng một lệnh, hậu tố khác nhau tùy cách bạn cài Kafka:

```bash
# Linux / macOS / Windows WSL2 + Kafka binaries tải từ kafka.apache.org
kafka-topics.sh --version

# Windows thuần (không WSL2)
kafka-topics.bat --version

# Cài qua Homebrew (macOS) hoặc apt (Ubuntu)
kafka-topics --version
```

Giải thích:

* `.sh` là shell script cho Linux/macOS.
* `.bat` là batch script cho Windows CMD.
* Cài qua `brew` / `apt` thì lệnh được đăng ký vào `PATH` nên không cần hậu tố.

Từ đây trong toàn bộ bài học, mọi ví dụ viết dạng `.sh`. Nếu bạn dùng Windows thuần hãy tự đổi thành `.bat`, dùng Homebrew thì bỏ hậu tố — nội dung flag hoàn toàn giống nhau.

Kiểm tra nhanh cài đặt có đúng không:

```bash
kafka-topics.sh
```

Nếu ra một đoạn help dài liệt kê `--create`, `--list`, `--describe`... nghĩa là CLI đã chạy. Nếu báo `command not found`, chuyển sang mục 4 bên dưới.

## 3. `--bootstrap-server` Là Chuẩn Mới, Quên `--zookeeper` Đi

Mọi lệnh CLI đều cần biết "Kafka cluster ở đâu". Tham số đó là `--bootstrap-server`:

```bash
kafka-topics.sh --bootstrap-server localhost:9092 --list
```

* `--bootstrap-server localhost:9092` — địa chỉ một (hoặc vài) broker. Kafka sẽ tự discovery toàn bộ cluster từ đó.
* Các tài liệu cũ dùng `--zookeeper localhost:2181`. Từ Kafka 3.x trở đi, mọi lệnh đã chuyển sang `--bootstrap-server`. Zookeeper đang dần bị loại bỏ (KRaft mode).

Quy tắc nhớ:

> Luôn dùng `--bootstrap-server`. Thấy tài liệu nào còn `--zookeeper` thì đó là tài liệu cũ.

Với cluster có bảo mật (như Conduktor Playground), bạn cần thêm file cấu hình:

```bash
kafka-topics.sh --command-config playground.config \
  --bootstrap-server <playground-bootstrap-url> \
  --list
```

* `--command-config playground.config` — file chứa `sasl.username`, `sasl.password`, `security.protocol`. File này phải nằm đúng thư mục nơi bạn chạy lệnh.
* Với `localhost:9092` không bảo mật thì không cần flag này.

## 4. Lỗi `command not found`: PATH Chưa Đúng Hay Dùng Full Path?

Triệu chứng: gõ `kafka-topics.sh` báo không tìm thấy lệnh dù đã giải nén Kafka.

Nguyên nhân 99% là biến môi trường `PATH` chưa trỏ tới thư mục `bin` của Kafka.

Cách 1 — sửa PATH một lần cho xong (khuyến nghị). Thêm thư mục `bin` vào `PATH` theo hướng dẫn bài cài đặt.

Cách 2 — gọi full path mỗi lần (chữa cháy nhanh):

```bash
# Ví dụ giải nén tại ~/kafka_2.13-3.1.0
~/kafka_2.13-3.1.0/bin/kafka-topics.sh --bootstrap-server localhost:9092 --list
```

Miễn lệnh in ra help hoặc danh sách topic là bạn đã thông. Đừng mất cả buổi chỉ vì PATH — dùng full path để học tiếp, quay lại sửa PATH sau.

## 5. Giải Phẫu Một Lệnh CLI Chuẩn

Mọi lệnh Kafka CLI đều có cùng bộ khung:

```bash
kafka-topics.sh --command-config playground.config \
  --bootstrap-server <url> \
  --create --topic first_topic
```

* `kafka-topics.sh` — tên công cụ.
* `--command-config` + `--bootstrap-server` — "kết nối tới cluster nào".
* `--create --topic first_topic` — "hành động gì, lên đối tượng nào". Mỗi lệnh bắt buộc có ít nhất một action: `--create`, `--list`, `--describe`, `--alter`, `--delete`.

Mẹo chẩn đoán nhanh: nếu chạy lệnh mà nó chỉ in ra help thay vì thực thi, nghĩa là bạn thiếu action hoặc sai flag. Kéo lên đọc dòng lỗi đầu tiên — Kafka ghi rất rõ `Must include at least one action: create, list, describe, alter, delete`.

## Cạm Bẫy Thường Gặp

* **Copy lệnh Homebrew lên Windows nguyên xi.** Nhớ đổi hậu tố `.sh` / `.bat` / không hậu tố theo máy của bạn.
* **Dùng tài liệu cũ với `--zookeeper`.** Lệnh có thể vẫn chạy ở Kafka 2.x nhưng sẽ lỗi ở Kafka 3.x+. Luôn ưu tiên `--bootstrap-server`.
* **Quên `--bootstrap-server`.** Lệnh in help thay vì báo lỗi rõ ràng — người mới tưởng CLI hỏng, thực ra chỉ thiếu flag kết nối.
* **Chạy lệnh sai thư mục khi dùng `--command-config`.** File `playground.config` phải nằm cùng thư mục chạy lệnh, hoặc truyền đường dẫn tuyệt đối.

## Kết Luận

Tóm một câu: **Kafka CLI có 4 lệnh chính, luôn đi kèm `--bootstrap-server`, biến thể hậu tố tùy OS, và mọi lỗi "chỉ in help" đều do thiếu action hoặc thiếu flag kết nối.**

Bài tiếp theo chúng ta sẽ dùng `kafka-topics.sh` để tạo, liệt kê, mô tả và xóa topic thật — thao tác nền tảng trước khi gửi bất kỳ message nào.
