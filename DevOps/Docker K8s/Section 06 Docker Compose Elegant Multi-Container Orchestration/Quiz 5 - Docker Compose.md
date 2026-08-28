# Quiz 5: Kiến Thức Docker Compose

## Câu Hỏi

### Câu 1
Docker Compose sử dụng định dạng file nào để cấu hình multi-container application?

A. JSON
B. TOML
C. YAML
D. XML

### Câu 2
Lệnh nào dùng để khởi chạy tất cả services trong Docker Compose?

A. `docker compose start`
B. `docker compose up`
C. `docker compose run`
D. `docker compose launch`

### Câu 3
Tùy chọn nào trong Docker Compose tương đương với `-it` trong `docker run`?

A. `interactive: true`
B. `tty: true`
C. `stdin_open: true` và `tty: true`
D. `terminal: true`

### Câu 4
Khi chạy `docker compose down`, điều gì xảy ra với volumes?

A. Tất cả volumes bị xóa
B. Chỉ anonymous volumes bị xóa
C. Volumes không bị xóa (cần thêm `-v` để xóa)
D. Named volumes bị xóa, bind mount giữ nguyên

### Câu 5
Tại sao cần khai báo `depends_on` trong Docker Compose?

A. Để chỉ định image cần sử dụng
B. Để đảm bảo thứ tự khởi chạy giữa các services
C. Để share volumes giữa containers
D. Để tạo network riêng cho services

### Câu 6
Lệnh nào dùng để build images mà không khởi chạy containers?

A. `docker compose build`
B. `docker compose up`
C. `docker compose create`
D. `docker compose prepare`

### Câu 7
Named volume trong Docker Compose cần được khai báo ở đâu?

A. Chỉ trong service
B. Ở level top-level cùng cấp với `services`
C. Trong file `.env`
D. Không cần khai báo

### Câu 8
Khi dùng `build: ./backend` trong Docker Compose, nó sẽ tìm Dockerfile ở đâu?

A. Thư mục gốc dự án
B. Thư mục `backend` được chỉ định
C. Thư mục `.docker`
D. Thư mục `src`

---

## Đáp Án

1. **C. YAML** — Docker Compose sử dụng định dạng YAML cho file cấu hình
2. **B. `docker compose up`** — Lệnh chính để khởi chạy services
3. **C. `stdin_open: true` và `tty: true`** — Kết hợp hai tùy chọn này tương đương `-it`
4. **C. Volumes không bị xóa** — Cần thêm `-v` nếu muốn xóa volumes
5. **B. Để đảm bảo thứ tự khởi chạy** — Services con khởi chạy trước service phụ thuộc
6. **A. `docker compose build`** — Chỉ build images, không chạy containers
7. **B. Ở level top-level** — Cùng cấp với `services`, có cấu trúc rỗng hoặc driver options
8. **B. Thư mục `backend`** — Docker Compose tìm Dockerfile trong thư mục được chỉ định
