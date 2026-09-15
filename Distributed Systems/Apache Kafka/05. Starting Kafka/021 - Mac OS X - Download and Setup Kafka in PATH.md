# Mac: Cài Java + Kafka Binaries Và Đưa Vào PATH (Cách Thủ Công)

Bài này dành riêng cho **macOS**. Mục tiêu duy nhất: gõ được `kafka-topics.sh` từ bất kỳ thư mục nào để chọc vào cluster Kafka (dù cluster đó chạy bằng Docker ở bài `020` hay chạy tay ở bài `022`).

Đây là cách cài **thủ công** (tải ZIP từ apache.org). Nếu muốn nhanh gọn bằng brew thì xem bài `023`, nhưng nên đọc bài này trước để hiểu PATH là gì.

---

## 1. Chuẩn Bị: Hiểu Vì Sao Cần Bước Này

Kafka không có installer .dmg. Bạn tải một thư mục chứa sẵn các file `.sh` trong `bin/`, và bạn phải tự bảo macOS "nhớ" đường dẫn tới chúng qua biến môi trường `PATH`. Chưa có `PATH` thì mỗi lần chạy lệnh bạn phải gõ full đường dẫn dài ngoằng.

Checklist trước khi bắt đầu:

- macOS Intel hoặc Apple Silicon (M1/M2/M3 đều được, chỉ khác bản JDK khi tải).
- Đã có Terminal + quyền cài phần mềm.
- Kafka từ 4.0 trở lên (bản dùng KRaft, không cần ZooKeeper).

## 2. Bước 1 — Cài Java JDK 21 (Amazon Corretto)

Kafka viết bằng Java nên bắt buộc có JDK 21.

1. Google `java jdk corretto amazon`, mở trang Amazon Corretto.
2. Chọn **Download Corretto 21** (bản LTS mới nhất).
3. Kéo xuống chọn đúng **macOS** + đúng kiến trúc:
   - Mac M1/M2/M3: chọn **aarch64** (ARM64).
   - Mac Intel cũ: chọn **x64**.
   - Tải nhầm bản Intel trên máy M sẽ bị macOS đòi cài Rosetta — tải lại bản aarch64 là xong.
4. Mở file `.pkg` vừa tải, Next → Next để cài như app bình thường.

Kiểm tra ngay trong Terminal:

```bash
java --version
```

Thấy dòng kiểu `openjdk 21 ... Corretto` là đạt. Nếu vẫn thấy Java 8/11/17 cũ thì máy bạn đang có nhiều JDK — gỡ hoặc chỉnh `JAVA_HOME` để ưu tiên 21.

## 3. Bước 2 — Tải Và Giải Nén Kafka

1. Google `apache kafka download`, mở trang Downloads của kafka.apache.org.
2. Chọn version **4.0 trở lên**, mục **Binary downloads**, tải file `.tgz` (ví dụ `kafka_2.13-4.0.0.tgz`).
3. Mở thư mục Downloads, double-click để giải nén (hoặc dùng lệnh):

```bash
cd ~/Downloads
tar -xvzf kafka_2.13-4.0.0.tgz
```

4. Chuyển thư mục Kafka ra ngoài cho gọn, ví dụ ngay dưới home:

```bash
mv kafka_2.13-4.0.0 ~/
cd ~/
pwd
ls | grep kafka
```

Lệnh `pwd` lúc này in ra `/Users/<ten-ban>`, và `ls` phải thấy thư mục Kafka nằm ngay đó. Mở thử thư mục `bin` bạn sẽ thấy hàng loạt file `kafka-topics.sh`, `kafka-server-start.sh`... — đó chính là CLI chúng ta cần.

## 4. Bước 3 — Hiểu Vấn Đề PATH Trước Khi Sửa

Thử chạy lệnh bằng đường dẫn đầy đủ thì được:

```bash
~/kafka_2.13-4.0.0/bin/kafka-topics.sh
```

Nhưng gõ gọn thì thất bại:

```bash
kafka-topics.sh
# zsh: command not found: kafka-topics.sh
```

Lý do: shell chỉ tìm lệnh trong các thư mục liệt kê ở biến `PATH`. Thư mục `bin` của Kafka chưa có trong danh sách đó. Việc cần làm là append thêm nó vào `PATH`.

Lấy đường dẫn tuyệt đối tới `bin` trước:

```bash
cd ~/kafka_2.13-4.0.0/bin
pwd
```

Copy kết quả, ví dụ `/Users/thuyet/kafka_2.13-4.0.0/bin` — lát nữa dán vào file cấu hình.

## 5. Bước 4 — Thêm Kafka Vào `~/.zshrc`

macOS mới dùng shell `zsh`, file cấu hình là `~/.zshrc` (không phải `.bashrc` như Linux).

1. Mở file để sửa:

```bash
nano ~/.zshrc
```

2. Thêm một dòng duy nhất ở cuối file (thay đường dẫn bằng kết quả `pwd` của bạn):

```bash
export PATH="$PATH:/Users/thuyet/kafka_2.13-4.0.0/bin"
```

Giải thích ngắn: giữ nguyên `PATH` cũ (`$PATH:`), nối thêm thư mục `bin` của Kafka vào sau.

3. Lưu: `Ctrl + X`, nhấn `Y`, nhấn `Enter`. Kiểm tra lại:

```bash
cat ~/.zshrc
```

4. Đóng hết Terminal đang mở, mở một Terminal mới hoàn toàn (hoặc chạy `source ~/.zshrc`). Đây là bước nhiều người quên nhất — không mở terminal mới thì `PATH` mới chưa có hiệu lực.

Kiểm tra:

```bash
kafka-topics.sh
```

Không còn `command not found` mà in ra hướng dẫn sử dụng của `kafka-topics` là thành công. Thử autocomplete cho sướng tay:

```bash
kafka-<TAB><TAB>
```

Bạn sẽ thấy hàng chục lệnh `kafka-console-producer.sh`, `kafka-console-consumer.sh`... gọi được từ bất kỳ đâu.

## Lỗi Thường Gặp & Cách Fix

- **`java --version` vẫn ra Java 8/11:** máy có nhiều JDK. Fix: gỡ JDK cũ hoặc export `JAVA_HOME` trỏ về Corretto 21 trong `~/.zshrc` trước dòng PATH của Kafka.
- **Tải nhầm JDK Intel trên Mac M:** trình cài đặt đòi Rosetta hoặc chạy chậm. Fix: tải lại bản **aarch64** của Corretto 21.
- **Sửa `.bashrc` thay vì `.zshrc`:** PATH không có tác dụng vì Terminal mặc định chạy zsh. Fix: chuyển dòng export sang `~/.zshrc` rồi mở terminal mới.
- **Quên mở terminal mới / quên `source`:** vẫn `command not found`. Fix: `source ~/.zshrc` hoặc đóng mở lại Terminal.
- **Copy sai đường dẫn (thiếu `/bin`, sai version):** lệnh vẫn không tìm thấy. Fix: `pwd` lại trong đúng thư mục `bin` rồi dán lại.

## Kết Luận

Vậy là Mac của bạn đã có full Kafka CLI, sẵn sàng chọc vào broker Docker ở `127.0.0.1:9092` trong các bài thực hành sau.

Bài tiếp theo (`022`) chúng ta sẽ dùng chính binaries vừa cài để start một broker Kafka thật ở chế độ KRaft — dành cho bạn nào không muốn dùng Docker.
