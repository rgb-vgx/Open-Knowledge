# Linux: Cài Java + Kafka Binaries Và Đưa Vào PATH

Bài này dành riêng cho **Linux (Ubuntu/Debian)**. Mục tiêu duy nhất: gõ được `kafka-topics.sh` từ bất kỳ thư mục nào để chọc vào cluster Kafka — dù cluster đó chạy bằng Docker (bài `020`) hay chạy tay (bài `025`).

Nội dung tương đương bài Mac `021`, nhưng lệnh cài Java và file cấu hình shell khác (`~/.bashrc` thay vì `~/.zshrc`).

---

## 1. Chuẩn Bị

Checklist trước khi bắt đầu:

- Ubuntu (hoặc distro Debian-based). Distro RPM-based (Fedora/RHEL) thì chọn đúng tab hướng dẫn trên trang Corretto.
- Có quyền sudo.
- Kafka từ 4.0 trở lên (bản KRaft, không cần ZooKeeper).

Toàn bộ bài gồm 3 việc: cài JDK 21 → tải + giải nén Kafka → thêm `bin` vào PATH.

## 2. Bước 1 — Cài Java JDK 21 (Amazon Corretto)

Kafka bắt buộc chạy trên JDK 21.

1. Google `install Amazon Corretto`, mở trang chủ Corretto.
2. Chọn version **Corretto 21** (LTS mới nhất), sang tab **Linux**.
3. Chọn đúng sub-tab **Debian-based** (Ubuntu) — trang sẽ hiện 2-3 lệnh: thêm repo/key rồi `apt install`.

Chạy lần lượt trong Terminal (nhập password khi `sudo` hỏi):

```bash
# 1. Thêm repo Corretto (copy đúng lệnh trên trang chủ)
wget -O - https://apt.corretto.aws/corretto.key | sudo gpg --dearmor -o /usr/share/keyrings/corretto-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/corretto-keyring.gpg] https://apt.corretto.aws stable main" | sudo tee /etc/apt/sources.list.d/corretto.list

# 2. Cài Corretto 21
sudo apt update
sudo apt install -y java-21-amazon-corretto-jdk
```

> Lệnh thêm repo có thể thay đổi theo thời gian — luôn copy lệnh mới nhất trên trang Corretto, đừng học thuộc lệnh trong bài này.

Kiểm tra:

```bash
java -version
```

Thấy `openjdk 21 ... Corretto` là đạt. Nếu máy có nhiều JDK và lệnh trên ra version khác, chọn lại JDK mặc định:

```bash
sudo update-alternatives --config java
sudo update-alternatives --config javac
```

Chọn số tương ứng với Corretto 21 rồi `java -version` lại.

## 3. Bước 2 — Tải Và Giải Nén Kafka

1. Google `apache kafka download`, mở kafka.apache.org → Downloads.
2. Chọn version **4.0 trở lên**, mục **Binary downloads**, tải file `.tgz`.
3. File tải về nằm trong `~/Downloads` và thường đã tự bung (tùy trình duyệt). Nếu chưa bung, tự giải nén:

```bash
cd ~/Downloads
tar -xvzf kafka_2.13-4.0.0.tgz
```

4. Chuyển thư mục Kafka lên home cho gọn:

```bash
mv kafka_2.13-4.0.0 ~/
cd ~/
ls | grep kafka
```

Phải thấy thư mục Kafka nằm ngay dưới home. Ngó thử thư mục quan trọng nhất:

```bash
ls ~/kafka_2.13-4.0.0/bin | head
```

Thấy `kafka-topics.sh`, `kafka-server-start.sh`, `kafka-storage.sh`... là đúng.

## 4. Bước 3 — Hiểu Vấn Đề PATH Trước Khi Sửa

Thử gọi lệnh bằng đường dẫn đầy đủ thì được:

```bash
~/kafka_2.13-4.0.0/bin/kafka-topics.sh
```

Nhưng gõ gọn thì thất bại:

```bash
kafka-topics.sh
# command not found
```

Vì shell chỉ tìm lệnh trong các thư mục của biến `PATH`. Cần append thư mục `bin` của Kafka vào đó. Lấy đường dẫn tuyệt đối trước:

```bash
cd ~/kafka_2.13-4.0.0/bin
pwd
```

Copy kết quả, ví dụ `/home/thuyet/kafka_2.13-4.0.0/bin`.

## 5. Bước 4 — Thêm Kafka Vào `~/.bashrc`

Linux dùng bash, file cấu hình là `~/.bashrc` (Mac dùng `~/.zshrc` — đây là khác biệt hay gây nhầm nhất giữa hai bài).

1. Mở file:

```bash
nano ~/.bashrc
```

2. Cuộn xuống cuối file, thêm một dòng (thay đường dẫn bằng `pwd` của bạn):

```bash
export PATH="$PATH:/home/thuyet/kafka_2.13-4.0.0/bin"
```

3. Lưu: `Ctrl + X`, `Y`, `Enter`. Nạp lại cấu hình (hoặc đóng mở Terminal):

```bash
source ~/.bashrc
```

4. Kiểm tra từ một thư mục bất kỳ:

```bash
cd ~/
kafka-topics.sh
```

Không còn `command not found` mà in ra hướng dẫn sử dụng là thành công.

> Quy ước nhớ suốt khóa học: trên Linux/Mac-tải-tay/WSL2, mọi CLI Kafka đều **có đuôi `.sh`**. Chỉ bản brew trên Mac mới bỏ đuôi. Gõ sai là lệnh không chạy.

## Lỗi Thường Gặp & Cách Fix

- **Copy lệnh cài Corretto cũ trên mạng, `apt update` báo lỗi key/repo:** Corretto đổi key theo thời gian. Fix: lên trang chủ Corretto copy lại bộ lệnh mới nhất cho Debian-based.
- **`java -version` ra version cũ:** máy có nhiều JDK. Fix: `sudo update-alternatives --config java` (và `javac`) rồi chọn Corretto 21.
- **Sửa nhầm `~/.zshrc` hoặc `~/.profile`:** PATH không có tác dụng vì Terminal Ubuntu chạy bash đọc `~/.bashrc`. Fix: chuyển dòng export sang `~/.bashrc` rồi `source ~/.bashrc`.
- **Quên `source` / quên mở terminal mới:** vẫn `command not found`. Fix: `source ~/.bashrc` hoặc đóng mở Terminal.
- **Sai đường dẫn (thiếu `/bin`, sai tên version):** Fix: `pwd` lại trong đúng thư mục `bin` rồi dán lại.

## Kết Luận

Vậy là máy Linux đã có JDK 21 + full Kafka CLI, sẵn sàng chọc vào broker Docker ở `127.0.0.1:9092`.

Bài tiếp theo (`025`) chúng ta sẽ dùng chính binaries vừa cài để start một broker Kafka thật ở chế độ KRaft ngay trên Linux.
