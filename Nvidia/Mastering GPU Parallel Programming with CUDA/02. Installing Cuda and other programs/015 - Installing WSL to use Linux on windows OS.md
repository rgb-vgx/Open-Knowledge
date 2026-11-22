---
title: 'Cài WSL để dùng Linux trên Windows'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 15
status: edited
source: '015 - Installing WSL to use Linux on windows OS.md'
categories:
- Nvidia
tags: []
---

# 🐧 Cài WSL để dùng Linux trên Windows

> Nguồn: `015 - Installing WSL to use Linux on windows OS.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/34013870)

Nếu chưa quen Linux hoặc không muốn cài lại máy, **WSL (Windows Subsystem for Linux)** là cách gọn nhất để có một bản Linux chạy ngay trong Windows. Bài này đi qua lệnh cài, một lỗi thường gặp và cách xử lý bằng cách tra cứu.

### 🐧 WSL là gì

WSL cho phép cài một **distribution Linux** (Ubuntu, Debian...) ngay trên Windows. Với người mới hoặc người không muốn thay hệ điều hành, đây là lựa chọn phù hợp để theo khóa học — vì phần biên dịch CUDA trên Linux sẽ dùng tới.

---

### ⌨️ Cài bằng dòng lệnh

Mở **Command Prompt** (cmd) và chạy:

```bash
wsl --install
```

Lệnh này hiển thị các distribution có sẵn như **Ubuntu**, **Debian**... Để chỉ định distribution, dùng `-d`:

```bash
wsl --install -d Ubuntu
```

Trong video, lần đầu giảng viên gõ thiếu `-d` nên lệnh không chạy đúng; thêm `-d` vào trước tên distribution thì mới đúng cú pháp.

---

### ⚠️ Khi gặp lỗi "distribution failed"

Sau khi thêm `-d` và chạy, installer vẫn báo lỗi **distribution failed with error...**. Cách xử lý:

1. **Copy nguyên văn thông báo lỗi** và tìm trên Google.
2. Thử một distribution khác (ví dụ bản **20.04**) để loại trừ lỗi do distribution — trong video cả hai đều lỗi giống nhau.
3. Đọc các kết quả tìm được. Trong video, một bài giải thích lỗi và một comment đưa cách sửa.
4. Làm theo hướng dẫn: chạy lệnh **update** cho WSL, sau đó **set default version** sang **WSL 2** (bản mới nhất).
5. Cài lại distribution.

---

### ✅ Tạo user và kiểm tra

Sau khi cài xong, mở distribution Linux. Lần đầu sẽ yêu cầu:

* Nhập **username**.
* Nhập **password** và nhập lại để xác nhận.

Khi báo cài đặt thành công, các bạn đã có một terminal Ubuntu 20.04 ngay trong Windows, dùng được các lệnh tương thích với bản Ubuntu đó.

---

### ✅ Chốt lại

Ba bước: `wsl --install` (kèm `-d <distro>`), xử lý lỗi bằng cách tra thông báo và cập nhật WSL lên **version 2**, rồi tạo user. Bài sau mình sẽ cài **CUDA toolkit** bên trong Linux này.
