# Windows WSL2: Cài Java + Kafka Binaries Và Đưa Vào PATH (Trong Ubuntu)

Bài này dành riêng cho **Windows đã cài WSL2 + Ubuntu ở bài `026`**. Toàn bộ thao tác dưới đây chạy **trong terminal Ubuntu**, không phải PowerShell. Mục tiêu: gõ được `kafka-topics.sh` từ bất kỳ đâu trong Ubuntu.

Các bước giống hệt bài Linux `024` (vì WSL2 bản chất là Ubuntu), chỉ khác cách tải file Kafka: dùng `wget` + `tar` thay vì click trình duyệt.

---

## 1. Chuẩn Bị

Checklist:

- App Ubuntu mở được từ Start Menu, đăng nhập được (bài `026`).
- Có quyền sudo trong Ubuntu (nhập đúng password khi được hỏi, nếu không lệnh sẽ treo).
- Kafka từ 4.0 trở lên (bản KRaft).

Mở terminal Ubuntu và làm lần lượt 3 việc: cài JDK 21 → tải + giải nén Kafka → thêm vào PATH.

## 2. Bước 1 — Cài Java JDK 21 (Amazon Corretto) Trong Ubuntu

Kafka bắt buộc chạy trên JDK 21. Vì Ubuntu là Debian-based nên làm theo tab Debian trên trang Corretto.

1. Google `Amazon Corretto 21`, mở trang download, sang tab **Linux → Debian-based**.
2. Copy bộ lệnh thêm repo + cài đặt mới nhất trên trang (lệnh dưới đây là ví dụ, luôn ưu tiên lệnh trên trang chủ):

```bash
wget -O - https://apt.corretto.aws/corretto.key | sudo gpg --dearmor -o /usr/share/keyrings/corretto-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/corretto-keyring.gpg] https://apt.corretto.aws stable main" | sudo tee /etc/apt/sources.list.d/corretto.list
sudo apt update
sudo apt install -y java-21-amazon-corretto-jdk
```

Lưu ý khi nhập password sudo: gõ không hiện ký tự nào là bình thường, cứ gõ xong nhấn `Enter`. Nếu lệnh treo sau khi hỏi password thì 99% là bạn chưa nhập password.

Kiểm tra:

```bash
java --version
```

Thấy `openjdk 21 ... Corretto` là đạt. Nếu ra version khác do máy có nhiều JDK:

```bash
sudo update-alternatives --config java
```

Chọn số tương ứng Corretto 21.

## 3. Bước 2 — Tải Kafka Bằng `wget` Và Giải Nén Bằng `tar`

Trong Ubuntu không có trình duyệt click-tải như Windows, nên copy link rồi tải bằng lệnh.

1. Trên trình duyệt Windows, mở trang Downloads của kafka.apache.org, chọn version **4.0+**, mục **Binary downloads**, **chuột phải → Copy link** file `.tgz`.
2. Sang terminal Ubuntu, tải về (dán link vừa copy):

```bash
cd ~/
wget https://downloads.apache.org/kafka/4.0.0/kafka_2.13-4.0.0.tgz
```

3. Giải nén:

```bash
tar -xvzf kafka_2.13-4.0.0.tgz
ls | grep kafka
```

(Tên file/version thay theo link bạn copy — làm đúng version đã tải, đừng gõ y nguyên ví dụ.)

Thấy thư mục `kafka_2.13-4.0.0` hiện ra là xong. Kiểm tra thư mục quan trọng nhất:

```bash
ls ~/kafka_2.13-4.0.0/bin | head
```

Phải thấy `kafka-topics.sh`, `kafka-server-start.sh`, `kafka-storage.sh`...

## 4. Bước 3 — Thêm Kafka Vào PATH (`~/.bashrc`)

Thử gọi gọn thì thất bại là đúng ở bước này:

```bash
kafka-topics.sh
# command not found
```

Gọi bằng đường dẫn đầy đủ thì được:

```bash
~/kafka_2.13-4.0.0/bin/kafka-topics.sh
```

Để gọi gọn được từ mọi nơi, thêm thư mục `bin` vào PATH. Lấy đường dẫn tuyệt đối trước:

```bash
cd ~/kafka_2.13-4.0.0/bin
pwd
```

Copy kết quả, ví dụ `/home/thuyet/kafka_2.13-4.0.0/bin`. Rồi về home sửa file cấu hình bash:

```bash
cd ~/
nano ~/.bashrc
```

Cuộn xuống cuối file, thêm một dòng (thay đường dẫn bằng `pwd` của bạn):

```bash
export PATH="$PATH:/home/thuyet/kafka_2.13-4.0.0/bin"
```

Lưu: `Ctrl + X`, `Y`, `Enter`. Nạp lại cấu hình (Ubuntu mới mở cũng tự nạp, nhưng làm ngay cho chắc):

```bash
source ~/.bashrc
```

Kiểm tra từ thư mục bất kỳ:

```bash
cd ~/
kafka-topics.sh
```

Hết `command not found`, in ra hướng dẫn sử dụng là thành công.

## Lỗi Thường Gặp & Cách Fix

- **Lệnh `sudo ...` treo không chạy tiếp:** bạn chưa nhập password sudo. Fix: gõ password Ubuntu rồi `Enter` (gõ mù, không hiện sao).
- **`wget: command not found`:** Ubuntu minimal chưa có wget. Fix: `sudo apt update && sudo apt install -y wget`.
- **Copy link Kafka bản cũ (3.x) thay vì 4.x:** vẫn chạy nhưng các lệnh KRaft ở bài sau khác nhau. Fix: quay lại trang Downloads chọn bản **4.0+**, mục Binary downloads.
- **Giải nén sai tên file:** `tar` báo `No such file`. Fix: `ls *.tgz` để xem tên file thực tế vừa tải rồi gõ lại cho khớp.
- **Sửa PATH trong PowerShell thay vì Ubuntu:** không có tác dụng. Fix: mọi thao tác PATH làm trong Ubuntu với `~/.bashrc`, rồi `source ~/.bashrc` hoặc mở lại terminal Ubuntu.
- **Mở terminal Ubuntu mới mà lệnh lại `not found`:** dòng export chưa được lưu hoặc lưu nhầm file. Fix: `tail -3 ~/.bashrc` xem dòng export có ở cuối file không.

## Kết Luận

Vậy là Ubuntu trong Windows của bạn đã có JDK 21 + full Kafka CLI — hoặc dùng với broker Docker ở bài `020`, hoặc start broker tay ngay trong WSL2.

Bài tiếp theo (`028`) chúng ta sẽ start một broker Kafka thật ở chế độ KRaft ngay trong Ubuntu này.
