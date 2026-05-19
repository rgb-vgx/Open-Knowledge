---
title: 'Docker CLI Hands-on: Khởi Chạy Container &amp; Cơ Chế Port Mapping'
date: '2026-02-02 00:58:06'
date_gmt: '2026-02-01 17:58:06'
modified: '2026-02-02 00:59:23'
status: publish
slug: docker-cli-hands-on-khoi-chay-container-co-che-port-mapping
wordpress_id: 651
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/02/02/docker-cli-hands-on-khoi-chay-container-co-che-port-mapping/
categories:
- Uncategorized
tags: []
---

## 1. Kiểm tra kiến trúc: Client và Server

Trước khi chạy container, hãy hiểu công cụ bạn đang dùng. Chạy lệnh sau:

```
docker version
```

Kết quả sẽ trả về hai phần riêng biệt: **Client** và **Server (Engine)**.

- **Client (Docker CLI):** Đây là nơi bạn gõ lệnh (`docker run`, `docker build`...). Trên Windows/Mac, nó có thể là `docker.exe`.
- **Server (Docker Daemon):** Tiến trình chạy ngầm thực sự thực thi các tác vụ (tạo container, quản lý mạng, v.v.).

Khi bạn gõ lệnh, Client sẽ gọi API (qua Socket hoặc TCP) tới Daemon.

---

## 2. Khởi chạy Container đầu tiên (Apache Web Server)

Chúng ta sẽ chạy một web server Apache (httpd). Thay vì cài đặt lằng nhằng trên OS, chỉ cần một câu lệnh duy nhất:

```
docker run -d -p 8800:80 httpd
```

### Phân tích cú pháp (Command Breakdown)

Đây là câu lệnh quan trọng nhất bạn cần nhớ. Hãy mổ xẻ các flag:

- **`docker run`**: Lệnh khởi tạo và chạy container từ image.
- **`-d` (Detach)**: Chạy container ở chế độ nền (background).
  - *Best Practice:* Luôn dùng `-d` cho các service (web, db) để không bị chiếm dụng terminal. Nếu muốn xem log, hãy dùng `docker logs <container_id>`.
- **`-p 8800:80` (Publish Port)**: Mapping port từ máy Host vào Container.
  - **8800 (Host Port):** Cổng trên máy tính của bạn.
  - **80 (Container Port):** Cổng mặc định mà Apache lắng nghe bên trong container.
- **`httpd`**: Tên của Image (Docker sẽ tự động tải từ Docker Hub nếu máy chưa có).

### Điều gì xảy ra "Under the Hood"?

Khi bạn nhấn Enter, Docker Engine thực hiện một chuỗi phức tạp:

1. **Pull:** Kiểm tra xem image `httpd` có ở local không. Nếu không, nó tải các layer từ Registry về.
2. **Network Setup:** Tạo một card mạng ảo (Virtual Interface) và cấp IP riêng cho container.
3. **Filesystem:** Tạo hệ thống file (dựa trên Union Mounts), nạp các file từ image vào.
4. **Start:** Khởi chạy tiến trình Apache (PID 1) trong không gian cô lập (Namespace) của container đó.

---

## 3. Kiểm chứng & Port Mapping

Để kiểm tra server đã chạy chưa, bạn có thể dùng trình duyệt hoặc `curl` ngay trên terminal:

```
curl localhost:8800
# Output: <html><body><h1>It works!</h1></body></html>
```

### Tại sao phải Mapping Port?

Mặc định, container hoàn toàn khép kín. Nó có IP riêng, nhưng IP này nằm trong mạng ảo của Docker, máy bên ngoài không thể gọi trực tiếp vào Port 80 của nó.

Flag `-p` hoạt động như một quy tắc "Forwarding" trên Router:

> *"Mọi traffic đi vào cổng 8800 của máy chủ -> Chuyển tiếp vào cổng 80 của container Apache."*

Để xem danh sách container đang chạy, sử dụng:

```
docker ps
```

---

## 4. Tính cô lập (Isolation) & Scaling

Sức mạnh thực sự của Docker nằm ở khả năng chạy nhiều bản sao (replicas) của cùng một ứng dụng mà không gây xung đột.

Hãy thử chạy thêm một Apache container nữa:

```
docker run -d -p 8801:80 httpd
```

**Lưu ý kỹ thuật:**

1. **Host Port phải khác nhau:** Bạn phải đổi port host sang `8801` (hoặc số khác). Nếu dùng lại `8800`, Docker sẽ báo lỗi "Port already in use".
2. **Container Port giữ nguyên (80):** Bên trong container mới, Apache vẫn lắng nghe ở port 80. Điều này không gây xung đột vì mỗi container có không gian mạng (Network Namespace) riêng biệt.

Bây giờ `docker ps` sẽ hiển thị 2 container đang chạy song song, hoàn toàn độc lập. Bạn thay đổi file trong Container 1, Container 2 sẽ không hề hay biết.

---

## 5. Góc nhìn thực chiến: Docker không phải là "Phép thuật"

Nhiều người mới tiếp cận thấy Docker như một "black box". Nhưng thực tế, Docker chỉ là công cụ giúp tự động hóa việc sử dụng các tính năng có sẵn trong Linux Kernel (và hiện nay là Windows):

- **Namespaces:** Tạo sự cô lập về Process ID, Network, Mount point (khiến container tưởng nó là máy duy nhất).
- **Cgroups (Control Groups):** Giới hạn tài nguyên (Container này chỉ được dùng tối đa 512MB RAM).
- **Union File Systems:** Cho phép xếp chồng các layer image thành một hệ thống file thống nhất.
- **Virtual Ethernet (veth) & IP Tables:** Xử lý việc định tuyến gói tin ra/vào container.

### Kết luận

Qua bài thực hành nhỏ này, bạn đã nắm được workflow cơ bản:

1. **Docker CLI** gửi lệnh.
2. **Docker Engine** xử lý tải image và tạo môi trường.
3. **Port Mapping** mở cửa cho container giao tiếp với thế giới bên ngoài.
4. **Isolation** cho phép chạy nhiều ứng dụng song song an toàn.

Ở các phần sau, chúng ta sẽ đi sâu vào việc cài đặt Docker trên server production và viết Dockerfile để đóng gói ứng dụng của riêng bạn.
