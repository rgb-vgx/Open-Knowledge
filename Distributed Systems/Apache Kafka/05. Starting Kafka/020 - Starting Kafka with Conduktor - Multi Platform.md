# Khởi Động Kafka Bằng Docker: Một Lệnh Có Cả Broker + UI Conduktor

Bài này dành cho **mọi OS (Mac, Linux, Windows)**. Đây là cách được khuyên dùng nhất trong khóa học: một lệnh Docker Compose là bạn có sẵn 1 broker Kafka chạy ở `127.0.0.1:9092` kèm UI Conduktor ở `localhost:8080` để quản lý Topic trực quan.

Xong bài này bạn vẫn cần làm thêm bài cài Kafka binaries + PATH đúng OS để có CLI — bài này chỉ lo phần broker + UI.

---

## 1. Chuẩn Bị: Cài Docker Desktop

Lên Google gõ `install docker desktop`, mở trang chủ Docker và chọn đúng bản:

- **Mac:** chọn Apple Silicon hay Intel tùy máy.
- **Windows:** bắt buộc chọn backend **WSL2** khi cài (không dùng Hyper-V). Lý do: Kafka và mọi bài thực hành sau tương thích tốt nhất với WSL2, và đằng nào bạn cũng phải cài WSL2.
- **Linux:** làm theo hướng dẫn Docker Engine / Docker Desktop cho distro của bạn.

Cài xong thì khởi động Docker Desktop. Lần đầu chưa có container nào cũng không sao, miễn là Docker đang ở trạng thái Running.

Mẹo nhỏ trong Settings → Resources: cấp tối thiểu **8 GB RAM và 2 vCPU**. Máy khỏe thì cho hơn, Kafka + Conduktor ăn RAM khá nhiều.

Kiểm tra Docker đã sống chưa:

```bash
docker --version
docker ps
```

Cả hai lệnh đều chạy không báo lỗi là đạt.

## 2. Lấy Stack `kafka-stack-docker-compose`

Stack này do Conduktor chuẩn bị sẵn trên GitHub: `conduktor/kafka-stack-docker-compose`. Bạn không cần hiểu hết file compose, chỉ cần đúng file `conduktor-kafka-single`.

Các bước thực hiện:

1. Mở repo trên GitHub, tải ZIP hoặc clone nếu quen Git:

```bash
git clone https://github.com/conduktor/kafka-stack-docker-compose.git
cd kafka-stack-docker-compose
```

2. Tìm file compose tên `conduktor-kafka-single.yml` (hoặc tên tương tự theo README hiện tại). File này đã cấu hình sẵn 3 thứ: PostgreSQL, Conduktor Console, và 1 broker Kafka ở chế độ KRaft.
3. Mở README trong repo, kéo tới mục **Single Kafka, KRaft mode + Conduktor** để lấy đúng lệnh start. Về bản chất chỉ là:

```bash
docker compose -f conduktor-kafka-single.yml up -d
```

Lần đầu chạy sẽ tải nhiều image nên hơi lâu. Những lần sau chạy lại sẽ nhanh vì image đã cache.

## 3. Kiểm Tra: Kafka + UI Có Lên Không?

1. Mở trình duyệt vào `http://localhost:8080`. Bạn sẽ thấy màn hình đăng nhập Conduktor Console. Tạo tài khoản local (ví dụ `stephane@example.com`) rồi đăng nhập.
2. Nhìn góc màn hình phải thấy cluster **My Local Kafka** ở trạng thái healthy. Nếu chưa healthy ngay thì đợi 1-2 phút cho broker khởi động xong rồi refresh.
3. Sanity check nhanh: vào mục Topics → tạo Topic mới tên `demo_topic` → quay lại danh sách thấy `demo_topic` là Kafka đang hoạt động tốt.
4. Dọn dẹp để có cluster sạch cho các bài sau: xóa `demo_topic` vừa tạo (gõ `DELETE` xác nhận).

Từ giờ broker của bạn luôn lắng nghe ở:

```bash
# Bootstrap server dùng cho mọi CLI và code sau này
127.0.0.1:9092
```

## Lỗi Thường Gặp & Cách Fix

- **Docker Desktop chưa chạy mà đã `docker compose up`:** báo lỗi `Cannot connect to the Docker daemon`. Fix: mở Docker Desktop, đợi icon chuyển xanh rồi chạy lại.
- **Port 8080 hoặc 9092 đã bị chiếm:** compose báo `port is already allocated`. Fix: tắt service cũ đang chiếm port, hoặc đổi port mapping trong file compose.
- **Windows dùng Hyper-V thay vì WSL2:** broker vẫn lên nhưng CLI ngoài PowerShell và Conduktor hay chập chờn kết nối. Fix: chuyển Docker Desktop sang WSL2 backend, cài đặt lại theo bài `026`.
- **Máy yếu, container Conduktor cứ restart:** thường do thiếu RAM. Fix: tăng RAM trong Docker Settings lên 8 GB, chạy lại `docker compose up -d`.
- **UI khóa học trông hơi khác UI bạn thấy:** bình thường. Conduktor đã update giao diện sau khi quay video, nhưng nút Topics, Produce, Consume vẫn ở vị trí tương đương.

## Kết Luận

Vậy là bạn đã có Kafka + UI xịn chỉ bằng một lệnh Docker, không cần đụng tới Java hay file properties. Giữ nguyên stack này chạy xuyên suốt khóa học.

Nhưng CLI thì chưa có — bài tiếp theo cho Mac (`021`) chúng ta sẽ cài Java 21 + Kafka binaries và đưa vào PATH để gõ `kafka-topics.sh` từ bất kỳ đâu. Dùng Linux thì nhảy sang bài `024`, Windows WSL2 thì sang bài `026`.
