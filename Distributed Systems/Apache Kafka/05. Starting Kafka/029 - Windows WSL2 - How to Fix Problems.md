# Windows WSL2: Fix Lỗi Mạng Khiến CLI Ngoài Ubuntu Không Kết Nối Được Broker

Bài này dành riêng cho **Windows WSL2 đã start broker ở bài `028`**. Hiện tượng: chạy `kafka-topics.sh` **trong Ubuntu thì được**, nhưng chạy cùng lệnh từ **PowerShell, Java code, hay Conduktor ngoài Ubuntu** thì dính lỗi `node not available` / timeout — dù broker vẫn đang chạy ngon lành.

Nguyên nhân là bug networking IPv6 của WSL2 + cấu hình `listeners` mặc định. Bài này hướng dẫn cả hai cách fix — chỉ cần một cách có tác dụng là dừng.

---

## 1. Tái Hiện Lỗi Để Chắc Bạn Gặp Đúng Bệnh

Trong Ubuntu (broker đang chạy), lệnh này thành công:

```bash
kafka-topics.sh --bootstrap-server localhost:9092 --list
```

Nhưng cùng câu lệnh tương đương chạy từ PowerShell ngoài (sau khi đã cài binaries Windows + PATH), hoặc từ Java client / Conduktor trỏ về `localhost:9092`, lại phun lỗi kiểu:

```bash
# Ví dụ lỗi điển hình
WARN [AdminClient] - Connection to node -1 (localhost/127.0.0.1:9092) could not be established. Node may not be available.
```

Nhớ kỹ: lỗi chỉ xảy ra **cross-boundary** (ngoài Ubuntu chọc vào broker trong Ubuntu). Lệnh trong Ubuntu vẫn chạy thì broker không hề hỏng — đừng xóa data hay cài lại Kafka.

## 2. Chuẩn Bị: Dừng Broker Trước Khi Sửa

Mọi cách dưới đây đều sửa file `config/server.properties` nên phải dừng broker trước:

1. Quay lại cửa sổ Ubuntu đang chạy Kafka, nhấn `Ctrl + C`.
2. Đợi log dừng hẳn rồi mới sửa file.

## 3. Cách 1 — Tắt IPv6 + Ghim `listeners` Về `localhost` (Khuyên Dùng)

Đây là cách đơn giản nhất và đủ cho toàn bộ khóa học.

Chạy hai lệnh sau trong Ubuntu để tắt IPv6 (có thể hỏi password sudo):

```bash
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1
```

Thấy in ra `net.ipv6.conf.all.disable_ipv6 = 1` là lệnh có tác dụng. Nếu lệnh báo lỗi / không hỗ trợ trên WSL của bạn thì bỏ qua cũng được — chỉ cần bước sửa `listeners` dưới đây là đủ (xem mục lỗi thường gặp).

Tiếp theo, sửa file cấu hình broker:

```bash
nano ~/kafka_2.13-4.0.0/config/server.properties
```

Tìm dòng `listeners` (thường bị comment bằng `#`), sửa/ thêm thành:

```bash
listeners=PLAINTEXT://localhost:9092
```

Lưu: `Ctrl + X`, `Y`, `Enter`. Verify lại:

```bash
grep "^listeners" ~/kafka_2.13-4.0.0/config/server.properties
```

Phải thấy đúng `listeners=PLAINTEXT://localhost:9092`.

Start broker lại:

```bash
cd ~/kafka_2.13-4.0.0
bin/kafka-server-start.sh config/server.properties
```

Đợi `Kafka Server started`, kiểm tra log lúc khởi động có dòng `listeners = PLAINTEXT://localhost:9092` — đó là bằng chứng config mới đã ăn. Giờ thử lại lệnh từ PowerShell / Java / Conduktor: hết lỗi `node not available` là xong.

## 4. Cách 2 — Giữ IPv6, Dùng Loopback Address `::1` (Nếu Không Muốn Tắt IPv6)

Nếu bạn không muốn đụng tới IPv6 hệ thống, làm ngược lại Cách 1:

1. Bật lại IPv6 (nếu đã tắt ở Cách 1):

```bash
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=0
sudo sysctl -w net.ipv6.conf.default.disable_ipv6=0
```

2. Dừng broker (`Ctrl + C`), mở lại `server.properties`:

```bash
nano ~/kafka_2.13-4.0.0/config/server.properties
```

3. Sửa `listeners` thành địa chỉ loopback IPv6 (ngoặc vuông là bắt buộc):

```bash
listeners=PLAINTEXT://[::1]:9092
```

4. Lưu, start broker lại như Cách 1.
5. Từ giờ mọi client ngoài Ubuntu phải trỏ bootstrap server về `[::1]:9092` thay vì `localhost:9092`:

```bash
kafka-topics.sh --bootstrap-server "[::1]:9092" --list
```

Cách này lằng nhằng hơn (phải nhớ đổi bootstrap server ở mọi lệnh và mọi đoạn code), nên chỉ dùng khi bạn có lý do riêng phải giữ IPv6.

## 5. Khi Cả Hai Cách Đều Không Ăn

1. Đọc lại trang troubleshooting networking WSL2 trên conduktor.io (link trong video gốc) — WSL update có thể đổi hành vi mạng.
2. Nếu vẫn bó tay: bỏ chạy broker tay trong WSL2, chuyển sang chạy broker bằng **Docker + Conduktor** (bài `020`). Docker Desktop tự xử lý networking host↔container ổn định hơn nhiều, CLI trong Ubuntu vẫn chọc vào `localhost:9092` bình thường.

## Lỗi Thường Gặp & Cách Fix

- **Lệnh `sysctl` báo lỗi / `permission denied`:** quên `sudo`, hoặc kernel WSL của bạn không cho đổi tham số này. Fix: thêm `sudo` phía trước; nếu vẫn lỗi thì bỏ qua lệnh `sysctl`, chỉ sửa `listeners` — nhiều máy chỉ cần vậy là đủ.
- **Sửa `server.properties` mà broker vẫn log `listeners` cũ:** bạn sửa nhầm file (sai version thư mục) hoặc quên restart broker. Fix: `grep "^listeners"` đúng file vừa sửa, rồi `Ctrl + C` + start lại.
- **Sửa xong thì cả trong Ubuntu cũng không kết nối được:** gõ sai cú pháp `listeners` (thiếu `PLAINTEXT://`, sai port, sai ngoặc `[::1]`). Fix: copy đúng `listeners=PLAINTEXT://localhost:9092` (Cách 1) rồi restart.
- **Cách 2 vẫn timeout:** quên đổi bootstrap server sang `[::1]:9092` ở phía client. Fix: client ngoài Ubuntu và client trong Ubuntu lúc này dùng địa chỉ khác nhau — kiểm tra lại từng lệnh.
- **Nhầm lẫn giữa PowerShell và Ubuntu khi verify:** luôn nhớ broker chạy ở đâu thì verify trong đó trước (`localhost:9092` trong Ubuntu), rồi mới verify cross-boundary từ PowerShell.

## Kết Luận

Tóm lại: lỗi này không phải do bạn cài sai — đó là bug mạng WSL2. **Cách 1 (tắt IPv6 + `listeners=PLAINTEXT://localhost:9092`)** giải quyết được cho đại đa số học viên.

Section Windows WSL2 tới đây là hết. Bài tiếp theo chúng ta rời phần setup, bắt đầu làm việc thật với Topic, Producer và Consumer trên cluster vừa dựng.
