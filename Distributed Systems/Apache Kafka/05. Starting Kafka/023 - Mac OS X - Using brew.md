# Mac: Cài Và Chạy Kafka Bằng Brew (Con Đường Tắt)

Bài này dành riêng cho **macOS**. Đây là cách thay thế cho hai bài thủ công `021` + `022`: dùng **Homebrew** để cài Java + Kafka chỉ bằng vài lệnh, khỏi tải ZIP và giải nén bằng tay.

Chọn một trong hai đường: hoặc thủ công (`021` + `022`), hoặc brew (bài này). Đừng trộn cả hai trên cùng một máy trừ khi bạn hiểu rõ PATH đang trỏ về đâu.

---

## 1. Mục Tiêu Và Chuẩn Bị

Hết bài này bạn có: Kafka 4.x do brew quản lý, CLI gọi **không cần đuôi `.sh`** (ví dụ `kafka-topics` thay vì `kafka-topics.sh`), broker start được bằng một lệnh duy nhất.

Điều kiện:

- macOS có quyền sudo (brew sẽ hỏi password).
- Nếu trước đó đã làm cách thủ công (`021`), bạn sẽ cần comment dòng PATH cũ đi ở Bước 4 để tránh xung đột.

## 2. Bước 1 — Cài Homebrew

Mở trang `brew.sh`, copy lệnh cài đặt (dạng `/bin/bash -c "$(curl ...)"`) rồi chạy trong Terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Nhập password macOS khi được hỏi và chờ cài xong. Brew là package manager cho Mac — hiểu nôm na như `apt` trên Ubuntu: gõ một lệnh là nó tự tải + cài + cấu hình hộ bạn.

Cài xong mà gõ `brew` vẫn báo `command not found` thì bạn thiếu bước đưa brew vào PATH. Trình cài đặt sẽ in ra 2-3 lệnh `echo ... >> ~/.zprofile` và `eval ...` — chạy đúng từng lệnh đó, rồi kiểm tra:

```bash
brew --version
```

## 3. Bước 2 — Cài Kafka Bằng Brew

Chỉ một lệnh, brew sẽ tự kéo cả JDK về nếu máy chưa có:

```bash
brew install kafka
```

Chờ tải xong. Kiểm tra version:

```bash
kafka-topics --version
```

Điểm khác biệt lớn nhất so với cách thủ công: mọi lệnh của brew **không có đuôi `.sh`**. `kafka-topics` thay vì `kafka-topics.sh`, `kafka-server-start` thay vì `kafka-server-start.sh`. Nhớ kỹ để các bài sau không bị gõ sai.

Tìm xem binaries brew nằm ở đâu:

```bash
which kafka-topics
```

Kết quả thường là `/opt/homebrew/bin/kafka-topics` (Mac M) hoặc `/usr/local/bin/kafka-topics` (Mac Intel).

## 4. Bước 3 — Hiểu File Cấu Hình Và Thư Mục Data Của Brew

Cách brew sắp xếp file khác cách tải ZIP:

- File cấu hình: `/opt/homebrew/etc/kafka/server.properties` (Mac M; Intel thì `/usr/local/etc/kafka/server.properties`).
- Thư mục data: trỏ tới nơi ổn định dưới `/opt/homebrew/var/...`, **không phải `/tmp`** như bản ZIP.

Ngó nhanh để xác nhận:

```bash
cat /opt/homebrew/etc/kafka/server.properties | grep "^log.dirs"
```

Đây là ưu điểm của brew: data không nằm ở `/tmp` nên reboot máy không bị mất sạch như cách thủ công. Không cần sửa gì ở đây, chỉ cần biết để sau này tìm data khi cần.

## 5. Bước 4 — Dọn Xung Đột PATH Nếu Từng Cài Thủ Công

Nếu bạn đã thêm dòng `export PATH=...kafka...bin` của bản ZIP vào `~/.zshrc` ở bài `021`, giờ có hai bộ Kafka trên máy — shell sẽ gọi bộ nào đứng trước trong PATH, rất dễ nhầm version.

Mở file cấu hình và comment dòng cũ lại:

```bash
nano ~/.zshrc
```

Thêm dấu `#` vào đầu dòng PATH của bản ZIP cũ, ví dụ:

```bash
# export PATH="$PATH:/Users/thuyet/kafka_2.13-4.0.0/bin"
```

Lưu (`Ctrl + X`, `Y`, `Enter`), đóng mở lại Terminal rồi verify bạn đang dùng đúng bản brew:

```bash
which kafka-topics
```

Phải ra đường dẫn `/opt/homebrew/...` (hoặc `/usr/local/...`). Nếu vẫn ra bản cũ thì kiểm tra lại file `~/.zshrc`.

## 6. Bước 5 — Start Broker

Bản brew đã được format storage sẵn nên **bỏ qua** bước sinh cluster ID + format ở bài `022`. Chỉ cần một lệnh, trỏ đúng file cấu hình của brew:

```bash
kafka-server-start /opt/homebrew/etc/kafka/server.properties
```

(Mac Intel đổi `/opt/homebrew` thành `/usr/local`.)

Đợi log tới dòng `Kafka Server started` là xong. Giữ nguyên cửa sổ này, mở Terminal thứ hai để verify:

```bash
kafka-topics --bootstrap-server localhost:9092 --list
```

Trả về rỗng mà không lỗi kết nối là broker đã sống. Dừng broker: `Ctrl + C` ở cửa sổ chạy Kafka.

## Lỗi Thường Gặp & Cách Fix

- **`brew: command not found` sau khi cài:** chưa chạy các lệnh `echo >> ~/.zprofile` mà trình cài đặt in ra. Fix: cuộn lên copy đúng 2-3 lệnh đó, chạy lại, đóng mở Terminal.
- **Gõ `kafka-topics.sh` báo không tìm thấy:** đúng rồi — bản brew bỏ đuôi `.sh`. Fix: gõ `kafka-topics` (không `.sh`).
- **Broker báo port 9092 đã dùng:** broker Docker (`020`) hoặc broker thủ công (`022`) vẫn chạy. Fix: tắt bớt một cái, chỉ giữ một broker tại một thời điểm.
- **Lệnh gọi ra bản Kafka cũ:** do PATH còn cả hai bản. Fix: `which kafka-topics` để xem đang gọi bản nào, comment PATH cũ như Bước 4.
- **Sai đường dẫn config (`/opt/homebrew` vs `/usr/local`):** Mac M dùng `/opt/homebrew`, Mac Intel dùng `/usr/local`. Fix: `brew --prefix` để xem máy bạn dùng tiền tố nào rồi ghép tiếp `/etc/kafka/server.properties`.

## Kết Luận

Vậy là bạn đã biết cả hai cách cài Kafka trên Mac: thủ công (hiểu sâu) và brew (nhanh gọn). Từ đây về sau mọi bài thực hành đều dùng được với broker nào cũng được, miễn là nó nghe ở `localhost:9092`.

Bài tiếp theo (`024`) chúng ta đổi sân sang **Linux**: cài Java Corretto 21 + Kafka binaries + PATH trên Ubuntu.
