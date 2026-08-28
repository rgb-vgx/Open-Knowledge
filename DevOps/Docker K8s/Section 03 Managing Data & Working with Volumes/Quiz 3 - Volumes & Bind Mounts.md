# Quiz 3: Volumes & Bind Mounts - Kiến Thức Cơ Bản

## Câu hỏi kiểm tra kiến thức

### Câu 1: Dữ liệu trong container
Dữ liệu được ghi trong container sẽ lưu ở đâu?
- A. Trong image
- B. Trong read-write layer của container
- C. Trên host machine
- D. Trong volume

**Đáp án: B** — Dữ liệu được ghi trong read-write layer, KHÔNG phải trong image.

### Câu 2: Anonymous Volume
Anonymous volume sẽ xảy ra điều gì khi container bị xóa với `--rm`?
- A. Vẫn tồn tại
- B. Bị xóa cùng container
- C. Được rename
- D. Được chuyển sang container khác

**Đáp án: B** — Anonymous volume bị xóa tự động khi dùng `--rm`.

### Câu 3: Named Volume
Điều gì xảy ra với named volume khi container bị xóa?
- A. Vẫn tồn tại trên host
- B. Bị xóa cùng container
- C. Chỉ tồn tại trong 24h
- D. Được gắn vào container khác

**Đáp án: A** — Named volume tồn tại vĩnh viễn直到 bạn xóa thủ công.

### Câu 4: Bind Mount
Để mount thư mục hiện tại vào `/app` trong container, lệnh nào đúng?
- A. `-v /app:$(pwd)`
- B. `-v $(pwd):/app`
- C. `-v app:$(pwd)`
- D. `--mount /app:$(pwd)`

**Đáp án: B** — Cú pháp `-v host-path:container-path`.

### Câu 5: Dockerfile VOLUME
Instruction `VOLUME ["/app/data"]` trong Dockerfile:
- A. Tạo named volume
- B. Tạo bind mount
- C. Tạo anonymous volume
- D. Không làm gì cả

**Đáp án: C** — `VOLUME` trong Dockerfile tạo anonymous volume.

### Câu 6: ReadOnly Volume
Làm thế nào để mount bind mount ở chế độ read-only?
- A. `-v $(pwd):/app:rw`
- B. `-v $(pwd):/app:ro`
- C. `--mount type=bind,source=$(pwd),target=/app`
- D. `-v $(pwd):/app,readonly`

**Đáp án: B** — Thêm `:ro` sau container path.

### Câu 7: .dockerignore
File `.dockerignore` dùng để:
- A. Bỏ qua các lệnh trong Dockerfile
- B. Loại file không cần thiết khỏi build context
- C. Tạo volume mới
- D. Cấu hình networking

**Đáp án: B** — `.dockerignore` loại file khỏi build context.

### Câu 8: ENV vs ARG
Biến nào tồn tại trong container đang chạy?
- A. ARG
- B. ENV
- C. Cả hai
- D. Không có cái nào

**Đáp án: B** — ENV tồn tại trong container, ARG chỉ khi build.

### Câu 9: Docker volume prune
Lệnh `docker volume prune` làm gì?
- A. Xóa tất cả volumes
- B. Xóa volumes không sử dụng
- C. Tạo volume mới
- D. Backup volumes

**Đáp án: B** — Prune xóa volumes không gắn với container nào.

### Câu 10: Khi nào dùng bind mount?
- A. Production database
- B. Development với live code updates
- C. Lưu trữ user uploads
- D. Sharing data giữa containers

**Đáp án: B** — Bind mount lý tưởng cho development với live updates.
