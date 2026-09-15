# [Archive] Windows Không WSL2: Chạy Kafka Native (Không Nên Dùng)

> Bài thuộc section **Archive** và là bài **không nên làm theo**. Chạy Kafka native trên Windows (không qua WSL2, không qua Docker) dính hai lỗi fatal `KAFKA-8811` và `KAFKA-1194` không có cách fix triệt để. Đọc bài này để hiểu vì sao, rồi quay về con đường đúng: **Docker (bài `020`)** hoặc **WSL2 (bài `026` → `029`)**.

Bài này dành cho **Windows không có WSL2** (Windows cũ) — trường hợp duy nhất còn phải nhắc tới cách native.

---

## 1. Vì Sao Không Nên Chạy Native Trên Windows?

Hai lỗi đã biết, tra Google theo mã là ra chi tiết:

| Lỗi | Khi nào dính | Hậu quả |
|---|---|---|
| `KAFKA-8811` | Xóa một Topic bất kỳ | Broker báo lỗi, không phục hồi được |
| `KAFKA-1194` | Chạy quá ~1 tuần (segment bị xóa theo retention) | Broker chết, phải xóa sạch data + start lại từ đầu |

Conduktor xây tính năng chạy Kafka trong Docker một phần để né đúng hai lỗi này (tắt topic deletion, giữ data lâu). Nếu máy bạn chạy được Docker hay WSL2 thì không có lý do gì để chịu hai lỗi trên.

Phần còn lại của bài là quy trình native đầy đủ — chỉ thực hiện khi bạn không còn lựa chọn nào khác.

## 2. Chuẩn Bị

- Windows có quyền cài phần mềm + sửa biến môi trường.
- Sẽ cần: Java JDK (Corretto), Kafka 3.x Scala 2.13, WinRAR/7-Zip (Windows không giải nén `.tgz` tốt), PowerShell.

## 3. Bước 1 — Cài Java JDK (Amazon Corretto)

1. Google `Amazon Corretto download`, mở trang chủ.
2. Chọn bản **Windows x64 MSI** (JDK 11 cho Kafka 3.x thời đó; Kafka mới cần JDK 21 — chọn theo version Kafka bạn dùng).
3. Tải về, chạy file MSI, Next → Next → Finish.

Kiểm tra trong Command Prompt hoặc PowerShell **mới**:

```powershell
java -version
```

Thấy `openjdk ... Corretto` là đạt.

## 4. Bước 2 — Tải Và Giải Nén Kafka Về Thẳng `C:\`

1. Google `download kafka`, chọn version 3.x Scala 2.13, tải file `.tgz` về Downloads.
2. Windows giải nén `.tgz` rất tệ nên cài thêm **WinRAR** hoặc **7-Zip** trước.
3. Chuột phải file `.tgz` → Extract ra, bạn sẽ thấy thư mục lồng 2 cấp (thư mục trong thư mục) — lấy thư mục trong cùng.
4. **Cut** thư mục đó dán thẳng vào `C:\`, ví dụ thành `C:\kafka_2.13-3.1.0`. Lý do: đường dẫn Windows càng ngắn càng tốt — đường dẫn dài + khoảng trắng (như `C:\Users\Tên Có Dấu\...`) hay làm script `.bat` của Kafka lỗi linh tinh.

Kết quả mong muốn:

```powershell
dir C:\kafka_2.13-3.1.0
```

Phải thấy hai thư mục `bin` và `config`.

## 5. Bước 3 — Hiểu Khác Biệt `bin\windows` Trước Khi Chạy Lệnh

Trên Linux/Mac lệnh nằm ở `bin/*.sh`. Trên Windows native, binaries nằm riêng ở **`bin\windows\*.bat`**. Gõ `bin\kafka-topics.sh` trong PowerShell là sai chắc chắn — phải là:

```powershell
cd C:\kafka_2.13-3.1.0
.\bin\windows\kafka-topics.bat
```

Thấy in ra hướng dẫn sử dụng là đúng. Nhớ quy ước này cho mọi lệnh sau: cứ lệnh nào cũng có bản `.bat` trong `bin\windows`.

## 6. Bước 4 — Thêm Kafka Vào PATH Của Windows

Để gõ `kafka-topics` từ mọi nơi:

1. Copy đường dẫn đầy đủ tới thư mục windows, ví dụ `C:\kafka_2.13-3.1.0\bin\windows`.
2. Start Menu gõ `environment` → mở **Edit the system environment variables** → nút **Environment Variables** → mục **Path** → **Edit** → **New** → dán đường dẫn vừa copy → OK hết.
3. **Đóng hết PowerShell đang mở, mở lại cửa sổ mới** (biến môi trường chỉ nạp khi mở shell mới).

Kiểm tra từ thư mục bất kỳ:

```powershell
kafka-topics.bat
```

Hết lỗi `not recognized`, in ra hướng dẫn sử dụng là thành công.

## 7. Bước 5 — Start ZooKeeper Rồi Start Kafka (2 Cửa Sổ PowerShell)

Mở **2 cửa sổ PowerShell**, cả hai `cd` vào thư mục Kafka, cả hai **để mở suốt buổi học**.

Cửa sổ 1 — start ZooKeeper trước:

```powershell
cd C:\kafka_2.13-3.1.0
.\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
```

Đợi ZooKeeper bind port 2181. Giữ nguyên cửa sổ.

Cửa sổ 2 — start Kafka:

```powershell
cd C:\kafka_2.13-3.1.0
.\bin\windows\kafka-server-start.bat .\config\server.properties
```

Đợi tới `Kafka Server started` là xong. Từ giờ `kafka-topics.bat` và mọi CLI khác gọi được từ PowerShell bất kỳ.

## Lỗi Thường Gặp & Cách Fix

- **`'kafka-topics' is not recognized`:** PATH chưa ăn (quên mở PowerShell mới) hoặc dán thiếu `\bin\windows`. Fix: mở PowerShell mới, kiểm tra lại biến Path.
- **Gõ nhầm `.sh` thay vì `.bat`:** PowerShell không chạy được script shell Linux. Fix: luôn dùng bản `.bat` trong `bin\windows`.
- **Đặt Kafka ở đường dẫn dài / có dấu / có khoảng trắng:** script `.bat` lỗi khó hiểu. Fix: chuyển về `C:\kafka_2.13-3.1.0` như Bước 4.
- **Dính `KAFKA-8811` (sau khi xóa Topic) hoặc `KAFKA-1194` (sau ~1 tuần):** không fix được, phải xóa sạch data (`/tmp/kafka-logs`, `/tmp/zookeeper` hoặc `log.dirs`/`dataDir` tương ứng) rồi start lại từ đầu — và từ đó **đừng xóa Topic nữa**. Fix triệt để duy nhất: chuyển sang Docker hoặc WSL2.
- **Start Kafka trước ZooKeeper:** Kafka thoát ngay. Fix: ZooKeeper trước, Kafka sau.

## Kết Luận

Vậy là bạn đã biết toàn bộ quy trình native — và quan trọng hơn là biết **vì sao không nên dùng nó**. Trừ khi máy quá cũ không cài nổi WSL2/Docker, hãy quên cách này đi.

Tới đây section setup Kafka khép lại. Từ bài sau trở đi chúng ta làm việc thật với Topic, Producer, Consumer trên cluster đã dựng — và mọi lệnh mẫu trong khóa học đều dùng cú pháp Linux (`*.sh`), khớp với Docker / Mac / Linux / WSL2.
