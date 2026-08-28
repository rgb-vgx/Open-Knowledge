# Section 02: Docker Images & Containers - The Core Building Blocks

## Ghi chú bài giảng tổng hợp

---

## MỤC LỤC

1. [Khái niệm Image & Container](#1-khái-niệm-image--container)
2. [Docker Hub & Pre-built Images](#2-docker-hub--pre-built-images)
3. [PID 1 & Vòng đời Container](#3-pid-1--vòng-đời-container)
4. [Tương tác với Container (-it)](#4-tương-tác-với-container--it)
5. [Xây Custom Image với Dockerfile](#5-xây-custom-image-với-dockerfile)
6. [Build & Run Container](#6-build--run-container)
7. [Image Layers & Copy-on-Write](#7-image-layers--copy-on-write)
8. [Layer Caching & Tối ưu Dockerfile](#8-layer-caching--tối-ưu-dockerfile)
9. [Quản lý Images & Containers](#9-quản-lý-images--containers)
10. [Attached vs Detached Mode](#10-attached-vs-detached-mode)
11. [Interactive Mode](#11-interactive-mode)
12. [Xóa Images & Containers](#12-xóa-images--containers)
13. [Tự động xóa Container](#13-tự-động-xóa-container)
14. [Inspect Image](#14-inspect-image)
15. [Copy files vào/ra Container](#15-copy-files-vàora-container)
16. [Naming & Tagging](#16-naming--tagging)
17. [Sharing Images - Docker Hub](#17-sharing-images---docker-hub)
18. [Best Practices & Pitfalls](#18-best-practices--pitfalls)

---

## 1. Khái niệm Image & Container

### Docker Image (Khuôn mẫu - The Class)

Image là **bản mẫu chỉ đọc (read-only template)** chứa mọi thứ cần thiết để chạy ứng dụng:

- **Source code** (mã nguồn)
- **Runtime** (Node.js, Python, Go, JVM...)
- **Thư viện phụ thuộc** (dependencies)
- **Hệ điều hành base** (Alpine, Ubuntu...)
- **Biến môi trường & cấu hình**

**Đặc tính quan trọng:**
- **Read-only (Chỉ đọc):** Khi build xong, không thể thay đổi nội dung. Muốn sửa code → phải build lại image mới.
- **Immutable (Bất biến):** Image khi build xong trên máy bạn, đẩy lên server staging hay production đều hoạt động chính xác 100% giống nhau.

### Docker Container (Thực thể - The Object/Instance)

Container là **phiên bản đang chạy (runnable instance)** của một Image.

- Container là một **process đang chạy** dựa trên khuôn mẫu của Image.
- Docker cấp cho container một **không gian sống riêng biệt:** CPU, RAM, Network (IP riêng), Read-Write Layer.
- Container có cô lập hoàn toàn nhờ **Linux Namespaces** và **Cgroups**.

### Mối quan hệ Image - Container

```
┌─────────────────────────────┐
│     Docker Image            │
│  ┌───────────────────────┐  │
│  │ Layer 4: CMD/ENTRY    │  │  ← Container Layer (Read-Write)
│  ├───────────────────────┤  │
│  │ Layer 3: RUN npm inst │  │
│  ├───────────────────────┤  │
│  │ Layer 2: COPY . /app  │  │  ← Image Layers (Read-Only)
│  ├───────────────────────┤  │
│  │ Layer 1: FROM node:14 │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

- Từ **MỘT** Image, bạn có thể tạo **HÀNG TRĂM** Containers độc lập.
- Container **KHÔNG copy** code từ Image → chỉ sử dụng chung và thêm layer Read-Write mỏng ở trên cùng.

---

## 2. Docker Hub & Pre-built Images

**Docker Hub** (`hub.docker.com`) là "siêu thị" Image lớn nhất thế giới:
- Tương tự GitHub cho mã nguồn, hay NPM cho thư viện.
- Các tổ chức lớn (Node.js, MongoDB, Nginx, Redis) duy trì **Official Images** tại đây.
- Thay vì tự build từ đầu, bạn chỉ cần tìm kiếm và kéo về sử dụng.

### Các lệnh cơ bản

```bash
# Tải image từ Docker Hub
docker pull redis:7.0-alpine

# Kiểm tra danh sách images
docker images
# Hoặc
docker image ls

# Khởi chạy container từ image
docker run -d --name local_redis -p 6379:6379 redis:7.0-alpine
```

---

## 3. PID 1 & Vòng đời Container

**Quy tắc sống còn:** Một Docker Container chỉ sống chừng nào **Tiến trình chính (PID 1)** bên trong nó còn hoạt động.

### Tại sao container vừa chạy đã tắt?

```bash
docker run node
# Container tự tắt ngay lập tức!
```

**Nguyên nhân:**
1. Lệnh mặc định trong image `node` là khởi chạy Node REPL.
2. Khi chạy `docker run node` ở chế độ detached, không gắn STDIN/STDOUT.
3. Node REPL nhận EOF → kết thúc → PID 1 chết → Container tắt.

### Bằng chứng về tính cô lập

```bash
# Trên máy host (có thể Node v14 hoặc không có)
node -v
# Output: v14.7.0 hoặc "command not found"

# Bên trong container (dùng environment trong image)
docker run -it node node -v
# Output: v20.x.x (phiên bản trong image)
```

→ Container sử dụng **100% môi trường** được đóng gói sẵn trong Image, không can thiệp vào Host OS.

---

## 4. Tương tác với Container (-it)

Để giữ container "sống" và tương tác trực tiếp:

```bash
docker run -it node
```

**Giải thích cờ:**
- `-i` (`--interactive`): Giữ STDIN mở, cho phép nhập dữ liệu.
- `-t` (`--tty`): Cấp phát terminal ảo (TTY).
- `-it` (kết hợp): Cho phép tương tác hai chiều qua terminal.

**Khi muốn thoát:** Nhấn `Ctrl + C` → tiến trình kết thúc → Container tự động chuyển sang trạng thái `Exited`.

---

## 5. Xây Custom Image với Dockerfile

### Mục tiêu
Từ một Base Image chính thức (ví dụ: `node:14`), "đắp" code của mình lên trên để tạo Custom Image mới.

### Cấu trúc dự án mẫu

```
project/
├── server.js          # Trái tim ứng dụng (HTTP Server lắng nghe port 80)
├── package.json       # Metadata & dependencies (express, body-parser)
├── public/
│   └── styles.css     # File giao diện tĩnh
└── Dockerfile         # Bản thiết kế đóng gói
```

### Quy trình trước khi Dockerize

1. **Xóa** thư mục `node_modules` (nếu có).
2. **Xóa** file `package-lock.json`.
3. Chỉ còn lại: `server.js`, `package.json`, `public/`.

### Dockerfile - Từng dòng lệnh

```dockerfile
# 1. Chọn Base Image nền tảng
FROM node:14

# 2. Thiết lập thư mục làm việc nội bộ
WORKDIR /app

# 3. Copy toàn bộ mã nguồn vào container
COPY . /app

# 4. Cài đặt các thư viện phụ thuộc (Layer tĩnh)
RUN npm install

# 5. Khai báo port ứng dụng sử dụng
EXPOSE 80

# 6. Khởi chạy tiến trình chính khi Container bắt đầu
CMD ["node", "server.js"]
```

### Giải thích từng chỉ thị

| Chỉ thị | Thời điểm thực thi | Vai trò |
|---------|-------------------|---------|
| `FROM` | Build time | Chọn base image (OS + runtime) |
| `WORKDIR` | Build time | Thiết lập thư mục làm việc (`cd /app`) |
| `COPY` | Build time | Chép code từ Host vào Container |
| `RUN` | Build time | Thực thi lệnh hệ thống (cài dependencies) |
| `EXPOSE` | Documentation | Khai báo port (chỉ là ghi chú, KHÔNG mở port) |
| `CMD` | Run time | Lệnh chạy khi Container khởi động |

### Sự khác biệt RUN vs CMD

- **`RUN`**: Chạy trong quá trình **BUILD IMAGE** → kết quả được "đóng băng" thành layer tĩnh.
- **`CMD`**: Lệnh chạy khi **CONTAINER BẮT ĐẦU** → tạo ra PID 1.

### Exec form vs Shell form

```dockerfile
# Exec form (khuyến khích) - truyền tín hiệu trực tiếp đến process
CMD ["node", "server.js"]

# Shell form - qua shell trung gian
CMD node server.js
```

**Tại sao dùng Exec form?** Giúp bắt được tín hiệu tắt an toàn (SIGTERM) khi dừng container trên production.

---

## 6. Build & Run Container

### Build Image

```bash
# Đứng tại thư mục chứa Dockerfile
docker build -t my-node-app:v1 .

# -t my-node-app:v1: Gắn tên (tag) cho image
# . (dấu chấm): Build context = thư mục hiện tại
```

### Run Container

```bash
# Chạy container từ custom image
docker run -d --name web_server -p 3000:80 my-node-app:v1

# -d: Detached mode (chạy ngầm)
# --name: Đặt tên container
# -p 3000:80: Map port Host:Container
```

### EXPOSE vs -p (Publish)

- **`EXPOSE 80`** trong Dockerfile: Chỉ là **documentation**, KHÔNG mở port.
- **`-p 3000:80`** khi run: **THỰC SỰ mở port** bằng cách tạo rule NAT chuyển hướng traffic.

### Trick gõ ID rút gọn

```bash
# Không cần copy toàn bộ ID dài
docker stop abcdefg12345
# Chỉ cần:
docker stop abc

# Nếu không có ID nào khác bắt đầu bằng "a":
docker stop a
```

Áp dụng cho: `stop`, `rm`, `rmi`, `logs`, `start`...

---

## 7. Image Layers & Copy-on-Write

### Kiến trúc phân lớp

Mỗi câu lệnh trong Dockerfile tạo ra một **layer** riêng biệt:

```
┌─────────────────────────────┐
│ Layer 5: CMD ["node", ...]  │  ← Container Layer (R/W)
├─────────────────────────────┤
│ Layer 4: RUN npm install    │  ← Image Layers (R/O)
├─────────────────────────────┤
│ Layer 3: COPY . /app        │
├─────────────────────────────┤
│ Layer 2: WORKDIR /app       │
├─────────────────────────────┤
│ Layer 1: FROM node:14       │
└─────────────────────────────┘
```

### Copy-on-Write (CoW)

- 10 containers chạy từ cùng 1 image → **chia sẻ chung** toàn bộ layers Read-Only.
- Mỗi container chỉ sở hữu lớp Read-Write mỏng ở trên cùng.
- **Kết quả:** Spin-up hàng chục instances trong < 1 giây, chi phí tài nguyên gần như bằng 0.

### Container Layer

Khi chạy container từ image, Docker phủ thêm một lớp mỏng (**Container Layer**) Read-Write lên trên cùng. Đây là lớp đại diện cho ứng dụng đang chạy.

---

## 8. Layer Caching & Tối ưu Dockerfile

### Cơ chế Caching

- Docker tự động lưu kết quả thực thi của từng layer sau lần build đầu tiên.
- Rebuild mà không thay đổi gì → kích hoạt `using cache` → cực kỳ nhanh.

### Hiệu ứng Domino khi Invalidate Cache

```
COPY . .          ← Thay đổi code → HỦY CACHE
RUN go mod download  ← BỊ HỦY CACHE → phải chạy lại!
RUN go build -o main .  ← BỊ HỦY CACHE → phải chạy lại!
```

**Quy tắc:** Khi một layer bị hủy cache → **tất cả layers phía sau** cũng bị hủy.

### Best Practice: Tách Dependency và Source Code

```dockerfile
FROM golang:1.22-alpine
WORKDIR /app

# BƯỚC 1: Copy file dependency TRƯỚC
COPY go.mod go.sum ./
RUN go mod download          # Layer này được CACHE

# BƯỚC 2: Copy source code SAU
COPY . .
RUN go build -o main .       # Chỉ rebuild khi code thay đổi
CMD ["./main"]
```

**Kết quả:** Mỗi lần sửa code, Docker vẫn giữ cache bước `go mod download` (bước tốn thời gian nhất).

### Cạm bẫy phổ biến

```dockerfile
# SAI - Người mới hay viết
COPY . .
RUN go mod download   # Mỗi lần sửa code → phải tải lại toàn bộ!
```

---

## 9. Quản lý Images & Containers

### Lệnh quản lý Container

```bash
# Xem containers ĐANG CHẠY
docker ps

# Xem TẤT CẢ containers (kể cả đã stop)
docker ps -a

# Dừng container (gửi SIGTERM)
docker stop <container_id_or_name>

# Khởi động lại container đã dừng
docker start <container_id_or_name>

# Xóa container (chỉ xóa được khi đã stop)
docker rm <container_id_or_name>

# Xem logs của container
docker logs <container_id_or_name>

# Theo dõi logs real-time
docker logs -f <container_id_or_name>
```

### Lệnh quản lý Image

```bash
# Liệt kê images
docker images
# Hoặc
docker image ls

# Xóa image
docker rmi <image_id>

# Xóa nhiều images
docker rmi <id1> <id2> <id3>

# Xóa images chưa được dùng bởi container nào
docker image prune
```

### Mẹo hữu ích

```bash
# Luôn có thể xem help cho bất kỳ lệnh nào
docker --help
docker run --help
docker ps --help
```

---

## 10. Attached vs Detached Mode

### Attached Mode (Mặc định của `docker run`)

- Container chạy **ở foreground** (phía trước terminal).
- Terminal **bị chặn** bởi tiến trình container.
- Bạn thấy output/log trực tiếp trên terminal.

```bash
docker run node   # Attached mode - terminal bị chặn
```

### Detached Mode (Cờ `-d`)

- Container chạy **ở background** (phía sau).
- Terminal **không bị chặn**, bạn có thể nhập lệnh khác.
- Không thấy output trực tiếp.

```bash
docker run -d node   # Detached mode - terminal tự do
```

### Chuyển đổi giữa hai chế độ

```bash
# Chạy detached, sau đó attach lại
docker attach <container_name_or_id>

# Xem logs mà không cần attach
docker logs <container_name_or_id>
docker logs -f <container_name_or_id>   # Theo dõi real-time
```

### Khi nào dùng chế độ nào?

| Chế độ | Khi nào dùng |
|--------|--------------|
| Attached | Debug, xem logs real-time, test nhanh |
| Production | Luôn dùng `-d` để chạy ngầm |

---

## 11. Interactive Mode

### Ứng dụng cần user input

Ví dụ: App Python đọc min/max từ terminal, tính số ngẫu nhiên.

```dockerfile
FROM python:3
WORKDIR /app
COPY . .
CMD ["python", "rng.py"]
```

```bash
# LỖI: Container chạy nhưng crash vì không có input
docker run <image>

# ĐÚNG: Dùng -it để tương tác
docker run -it <image>
```

### Giải thích cờ `-it`

- `-i` (`--interactive`): Giữ STDIN mở → cho phép nhập dữ liệu.
- `-t` (`--tty`): Cấp phát terminal ảo → tạo thiết bị nhập/xuất.

### Restart container ở Interactive Mode

```bash
# Restart với attached mode
docker start -a <container_name>

# Restart với interactive mode
docker start -ai <container_name>
```

**Lưu ý:** Docker ghi nhớ flag `-t` từ lần chạy đầu tiên, nên khi restart chỉ cần thêm `-a` và `-i`.

---

## 12. Xóa Images & Containers

### Nguyên tắc

- Container **phải stop trước** khi xóa.
- Image **không được dùng bởi container nào** (kể cả stopped) mới xóa được.

```bash
# Không xóa được container đang chạy
docker rm <running_container>   # → Lỗi!

# Phải stop trước
docker stop <container>
docker rm <container>

# Xóa image
docker rmi <image_id>

# Xóa nhiều items
docker rm <c1> <c2> <c3>
docker rmi <i1> <i2> <i3>

# Xóa tất cả images chưa dùng
docker image prune
```

---

## 13. Tự động xóa Container

```bash
# Container tự xóa khi stop
docker run -d --rm --name my-app -p 3000:80 my-image:v1
```

**Cờ `--rm`:** Tự động xóa container khi nó dừng.

**Khi nào dùng?**
- Container chỉ dùng 1 lần (test, build temporary).
- Sau khi stop → rebuild image mới → chạy container mới.
- Rất phổ biến trong CI/CD pipeline.

---

## 14. Inspect Image

```bash
docker image inspect <image_id_or_name>
```

**Thông tin trả về:**
- Full ID của image.
- Ngày tạo.
- Configuration (ports, env vars, entrypoint).
- Docker version.
- OS base.
- Các layers (từ Dockerfile + base image).

---

## 15. Copy files vào/ra Container

### Copy từ Host vào Container

```bash
docker cp <host_path> <container_name>:<container_path>

# Ví dụ
docker cp ./dummy/. my-container:/test
```

### Copy từ Container ra Host

```bash
docker cp <container_name>:<container_path> <host_path>

# Ví dụ
docker cp my-container:/test/dummy.txt ./dummy/
```

### Use cases

- **Copy vào:** Thêm config file, patch tạm thời.
- **Copy ra:** Trích xuất log files từ container black box.

**Lưu ý:** Không nên dùng `docker cp` để update code production → dùng rebuild image hoặc Bind Mounts.

---

## 16. Naming & Tagging

### Đặt tên Container

```bash
docker run -d --name my-goals-app -p 3000:80 my-image:v1
```

**Lợi ích:** Không cần nhớ/generated ID → dễ quản lý, stop, restart.

### Đặt Tag cho Image

```bash
docker build -t goals:latest .
docker build -t my-app:v1 .
docker build -t my-app:v2 .
```

**Cấu trúc tag:** `repository:tag` (ví dụ: `node:14`, `my-app:v1`)

**Lợi ích:**
- Versioning rõ ràng.
- Dễ dàng rollback khi cần.
- Tránh nhầm lẫn giữa các phiên bản.

### Docker Hub Tags

```bash
docker pull node:14
docker pull node:20-alpine
docker pull node:lts
docker pull node:slim
```

---

## 17. Sharing Images - Docker Hub

### Push Image lên Docker Hub

```bash
# Login vào Docker Hub
docker login

# Đặt tag đúng format Docker Hub
docker tag my-app:v1 username/my-app:v1

# Push lên Docker Hub
docker push username/my-app:v1
```

### Pull & Sử dụng Shared Image

```bash
# Pull image từ Docker Hub
docker pull username/my-app:v1

# Chạy container
docker run -d -p 3000:80 username/my-app:v1
```

---

## 18. Best Practices & Pitfalls

### Pitfall 1: "Rác thải Docker"

```bash
# Mỗi lần build tạo layer mới → image cũ thành "dangling"
# Container đã stop nhưng chưa rm → tích tụ rác

# Giải pháp: Định kỳ dọn dẹp
docker system prune -f
```

### Pitfall 2: Lạm dụng Tag `:latest`

```bash
# SAI: Không xác định version
docker pull ubuntu
docker pull node

# ĐÚNG: Luôn chỉ định version cụ thể
docker pull node:20-alpine
docker pull golang:1.21-alpine
```

**Lý do:** `:latest` thay đổi liên tục → có thể phá vỡ application trên production.

### Pitfall 3: Hiểu nhầm Persistence

- Container layer Read-Write **gắn liền với vòng đời container**.
- Khi `docker rm` → toàn bộ dữ liệu trong container **biến mất vĩnh viễn**.

**Giải pháp:** Dùng **Volumes** để lưu trữ dữ liệu bền vững.

### Pitfall 4: Vi phạm tính bất biến (Immutability)

```bash
# SAI: Vào container sửa code trực tiếp
docker exec -it <container> /bin/bash
# → vi server.js → save → THẢM HỌA!

# ĐÚNG: Sửa code ở Host → Rebuild → Rerun
# 1. Sửa code ở Host
# 2. docker stop <container>
# 3. docker rm <container>
# 4. docker build -t my-app:v2 .
# 5. docker run -d --name my-app-v2 -p 3000:80 my-app:v2
```

### Best Practices Summary

| Principle | Implementation |
|-----------|---------------|
| Specific Tags | Luôn dùng version cụ thể, không dùng `:latest` |
| Immutable Infrastructure | Không sửa code trong container → rebuild image mới |
| Layer Optimization | Tách dependency trước, source code sau |
| Auto-cleanup | Dùng `--rm` hoặc `docker system prune` |
| Persistence | Dùng Volumes cho dữ liệu quan trọng |
| Security | Không commit secrets/keys vào image |
| Naming | Luôn đặt tên rõ ràng cho container và tag image |

---

## Cheat Sheet - Lệnh Docker Cơ Bản

```bash
# === IMAGES ===
docker images                    # Liệt kê images
docker pull <image>              # Tải image
docker build -t <name>:<tag> .   # Build image
docker rmi <image>               # Xóa image
docker image inspect <image>     # Kiểm tra image
docker image prune               # Xóa images không dùng

# === CONTAINERS ===
docker run -d --name <n> -p <H>:<C> <image>  # Chạy container
docker ps                        # Containers đang chạy
docker ps -a                     # Tất cả containers
docker stop <container>          # Dừng container
docker start <container>         # Khởi động lại
docker rm <container>            # Xóa container
docker logs <container>          # Xem logs
docker logs -f <container>       # Logs real-time
docker attach <container>        # Attach vào container
docker exec -it <container> /bin/bash  # Vào container
docker cp <src> <dest>           # Copy files
docker inspect <container>       # Kiểm tra container
docker system prune -f           # Dọn dẹp hệ thống

# === FLAGS HỮU ÍCH ===
-d        # Detached mode
-it       # Interactive + TTY
--rm      # Tự động xóa khi stop
--name    # Đặt tên container
-p <H>:<C>  # Publish port
-v <H>:<C>  # Bind mount volume
```

---

*Ghi chú tổng hợp từ Section 02: Docker Images & Containers - The Core Building Blocks*
