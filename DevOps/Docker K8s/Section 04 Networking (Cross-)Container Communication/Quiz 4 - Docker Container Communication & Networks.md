# Quiz 4: Docker Container Communication & Networks

## Câu hỏi trắc nghiệm

### Câu 1: Container-to-WWW Communication
Container của bạn cần gọi REST API bên thứ ba. Cần cấu hình gì đặc biệt?
- A) Cấu hình DNS server
- B) Publish port bằng -p flag
- C) Không cần cấu hình gì — hoạt động tự động
- D) Tạo Docker network riêng

**Đáp án:** C) Không cần cấu hình gì — hoạt động tự động

### Câu 2: Container-to-Host Communication
Domain nào giúp container truy cập service chạy trên host machine?
- A) localhost
- B) 127.0.0.1
- C) host.docker.internal
- D) gateway.docker.internal

**Đáp án:** C) host.docker.internal

### Câu 3: Docker Networks
Lệnh nào tạo custom Docker network?
- A) docker network create my-net
- B) docker network new my-net
- C) docker create network my-net
- D) docker network init my-net

**Đáp án:** A) docker network create my-net

### Câu 4: Container Discovery
Khi hai containers cùng network, làm thế nào container A tìm container B?
- A) Dùng IP address của container B
- B) Dùng tên container B
- C) Dùng MAC address của container B
- D) Cả A và B đều đúng

**Đáp án:** D) Cả A và B đều đúng

### Câu 5: Network Drivers
Driver nào là mặc định khi tạo Docker network?
- A) host
- B) overlay
- C) bridge
- D) none

**Đáp án:** C) bridge

### Câu 6: Port Publishing
Khi nào cần publish port bằng `-p` flag?
- A) Container → Container (cùng network)
- B) Container → Host
- C) Cả A và B
- D) Không bao giờ

**Đáp án:** B) Container → Host

### Câu 7: host.docker.internal
Trên Linux, làm thế nào sử dụng host.docker.internal?
- A) Hoạt động tự động
- B) Cần thêm --add-host flag
- C) Không thể sử dụng trên Linux
- D) Cần cài đặt package bổ sung

**Đáp án:** B) Cần thêm --add-host flag

## Câu hỏi tự luận

### Câu 8: Tại sao user-defined bridge network tốt hơn default bridge network?

**Gợi ý:** Liệt kê ít nhất 3 lý do.

### Câu 9: Giải thích cách Docker IP resolution hoạt động mà không thay đổi source code.

**Gợi ý:** Đề cập đến network layer và DNS resolution.

### Câu 10: Thiết kế multi-container architecture cho một ứng dụng web gồm frontend, backend API, và database. Viết docker run commands phù hợp.

**Gợi ý:** Sử dụng Docker Networks và aliases.