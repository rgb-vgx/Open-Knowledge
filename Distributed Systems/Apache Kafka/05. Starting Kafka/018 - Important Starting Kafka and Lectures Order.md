# Khởi Động Kafka: Đọc Bản Đồ Toàn Section Trước Khi Chạy Một Lệnh Nào

Bài này không cài gì cả. Bài này giúp bạn **chọn đúng đường đi** trong cả section "Starting Kafka" — dùng Mac, Linux hay Windows — dùng Docker hay chạy tay bằng binaries — để không bị lạc giữa hàng chục video setup.

Dành cho: tất cả học viên, mọi OS. Đọc bài này trước, rồi mới nhảy tới bài đúng với máy của bạn.

---

## 1. Mục Tiêu Của Cả Section

Hết section này bạn phải có 2 thứ chạy được trên máy:

1. **Một Kafka broker đang chạy** để thực hành — hoặc qua Docker, hoặc chạy trực tiếp bằng binaries.
2. **Kafka CLI tools** (`kafka-topics.sh`, `kafka-console-producer.sh`, `kafka-console-consumer.sh`...) gọi được từ bất kỳ thư mục nào, để tương tác với cluster qua `localhost:9092`.

Mô hình chuẩn mà khóa học hướng tới:

- **Broker**: 1 broker duy nhất, chạy ở `127.0.0.1:9092`, đủ cho mục đích học.
- **UI**: Conduktor Console ở `localhost:8080` (chỉ có nếu bạn dùng cách Docker).
- **CLI**: cài từ Apache Kafka binaries trên đúng OS của bạn.

> Bạn không cần dựng multi-broker cluster. Muốn dựng production cluster on-premise hay cloud là một khóa riêng.

## 2. Hai Con Đường: Docker (Khuyên Dùng) vs Binaries Thuần

### Con đường A — Docker + Conduktor (khuyên dùng nhất)

Ưu điểm: một lệnh là có cả Kafka + UI quản lý Topic, cluster. Không phải vật lộn với Java, PATH, file properties.

Lộ trình:

1. Cài và khởi động **Docker Desktop** (bài `020`).
2. Chạy stack `conduktor-kafka-single` bằng `docker compose` (bài `020`).
3. Vẫn phải cài **Kafka binaries + PATH** trên đúng OS để có CLI:
   - Mac thủ công: bài `021`.
   - Mac bằng brew: bài `023`.
   - Linux: bài `024`.
   - Windows WSL2: bài `026` + `027`.

### Con đường B — Binaries thuần, không Docker, không UI

Dành cho máy yếu không chạy nổi Docker, hoặc bạn muốn hiểu sâu cách Kafka khởi động.

Lộ trình:

1. Cài binaries + PATH (Mac: `021` hoặc `023`, Linux: `024`, Windows WSL2: `026` + `027`).
2. Tự start Kafka ở chế độ **KRaft** (mặc định từ Kafka 4.0, không cần ZooKeeper):
   - Mac: bài `022`.
   - Linux: bài `025`.
   - Windows WSL2: bài `028`.

Nhược điểm của con đường B: không có UI. Trong khóa học giảng viên thao tác nhiều trên UI Conduktor, bạn sẽ phải tự đối chiếu bằng CLI.

## 3. Thứ Tự Học Theo OS Của Bạn

**Nếu dùng Mac:**

- `020` (Docker, tùy chọn nhưng khuyên dùng) → `021` (cài Java + Kafka + PATH thủ công) → `022` (start Kafka KRaft) → `023` (cách thay thế bằng brew — đọc để biết, không bắt buộc).

**Nếu dùng Linux (Ubuntu/Debian):**

- `020` (Docker) → `024` (cài Java Corretto 21 + Kafka + PATH) → `025` (start Kafka KRaft).

**Nếu dùng Windows 10 (bản 2004+) / Windows 11:**

- Chỉ dùng **WSL2**. Đừng chạy Kafka native trên Windows.
- `020` (Docker Desktop với backend WSL2) → `026` (cài WSL2 + Ubuntu) → `027` (cài Java + Kafka trong Ubuntu) → `028` (start Kafka KRaft) → `029` (đọc khi gặp lỗi mạng WSL2).

**Nếu dùng Windows cũ (không có WSL2):**

- Cách duy nhất ổn định là Docker (bài `020`). Phần `06. Archive` có bài Windows non-WSL2 nhưng chỉ để tham khảo — chạy native trên Windows sẽ gặp lỗi `KAFKA-8811` (không xóa được Topic) và `KAFKA-1194` (segment bị xóa sau ~1 tuần), phải xóa sạch data mới chạy lại được.

## 4. KRaft vs ZooKeeper: Vì Sao Có Section Archive?

- Từ **Kafka 4.0 trở đi, KRaft là chế độ mặc định**. Bạn chỉ cần format storage + start 1 tiến trình `kafka-server-start`.
- Chế độ cũ **Kafka + ZooKeeper** (2 tiến trình riêng) đã bị loại bỏ. Toàn bộ section `06. Archive Starting Kafka with Zookeeper` chỉ còn giá trị lịch sử / tham khảo khi bạn phải维护 cluster cũ.
- Nếu bạn đang học mới hoàn toàn: **bỏ qua section 06**, chỉ học section `05`.

## Lỗi Thường Gặp & Cách Fix

- **Nhảy thẳng vào bài theo OS mà bỏ qua bài Docker:** vẫn chạy được broker nhưng không có UI, về sau xem video demo trên UI sẽ khó theo. Fix: quay lại làm bài `020`.
- **Cài CLI nhưng quên setup PATH:** gõ `kafka-topics.sh` báo `command not found`. Fix: làm đúng bài PATH của OS mình, mở terminal mới rồi thử lại.
- **Windows không bật WSL2 backend cho Docker:** Kafka trong container vẫn chạy nhưng CLI từ PowerShell và Conduktor ngoài host không kết nối được. Fix: bật WSL2 backend trong Docker Desktop, xem lại bài `020` và `029`.

## Kết Luận

Tóm lại: **máy nào cũng nên đi qua Docker trước (bài 020), rồi cài CLI đúng OS, rồi mới start Kafka KRaft**. Windows thì bắt buộc WSL2.

Bài tiếp theo chúng ta sẽ làm con đường khuyên dùng nhất: dựng Kafka + Conduktor UI bằng một lệnh Docker Compose duy nhất.
