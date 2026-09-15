# Windows: Cài WSL2 + Ubuntu (Bước Bắt Buộc Trước Mọi Bài Kafka)

Bài này dành riêng cho **Windows 10 (bản 2004 trở lên) / Windows 11**. Đây là bước bắt buộc: mọi bài Kafka sau trên Windows đều chạy **bên trong Ubuntu trên WSL2**, không chạy native trên PowerShell.

Nếu bạn dùng Mac hay Linux thì bỏ qua bài này.

---

## 1. Vì Sao Bắt Buộc WSL2?

Kafka chạy native trên Windows rất bất ổn: không xóa được Topic (`KAFKA-8811`), segment bị xóa sau ~1 tuần là broker chết (`KAFKA-1194`). Chạy Kafka trong WSL2 (một máy Linux thật bên trong Windows) thì ổn định như chạy trên Ubuntu thật, đồng thời CLI, Docker, file config đều dùng cú pháp Linux thống nhất với giáo trình.

Điều kiện duy nhất: Windows 10 version 2004+ hoặc Windows 11. Windows cũ hơn không cài được WSL2 — khi đó con đường duy nhất ổn định là chạy Kafka bằng Docker (bài `020`).

## 2. Bước 1 — Cài WSL2 + Ubuntu Bằng Một Lệnh

1. Mở **PowerShell với quyền Administrator** (chuột phải → Run as administrator).
2. Chạy duy nhất một lệnh:

```powershell
wsl --install
```

Lệnh này làm 3 việc hộ bạn: bật tính năng Windows Subsystem for Linux, cài WSL2, và cài Ubuntu mặc định.

3. Chờ tải + cài xong. Máy có thể yêu cầu **restart** — cứ restart rồi mở lại PowerShell chạy tiếp `wsl --install` nếu nó chưa xong.
4. Mẹo khi thấy màn hình đứng yên lâu: đừng gõ thêm lệnh mới, chỉ nhấn `Enter` 1-2 lần xem tiến trình có chạy tiếp không.

Kiểm tra WSL đã nhận Ubuntu chưa (PowerShell thường):

```powershell
wsl --list --verbose
```

Thấy Ubuntu ở trạng thái Running hoặc Stopped là đạt.

## 3. Bước 2 — Tạo Tài Khoản Ubuntu Lần Đầu

Lần đầu Ubuntu khởi động, nó hỏi:

1. **Unix username:** đặt tên thường viết liền, ví dụ `thuyet`.
2. **Password + retype:** nhập 2 lần (gõ không hiện ký tự nào là bình thường).

Tạo xong bạn sẽ rơi vào prompt Linux kiểu `thuyet@DESKTOP:~$` — từ giờ bạn đang ở trong Linux thật, mọi lệnh Kafka sau gõ ở đây chứ không phải PowerShell.

Thoát ra và vào lại để quen tay:

```bash
exit
```

Rồi từ Start Menu gõ `Ubuntu`, mở app Ubuntu — bạn lại vào đúng máy Linux đó. Ghim app này ra taskbar vì sẽ dùng suốt khóa học.

## 4. Bước 3 — Verify Môi Trường

Trong terminal Ubuntu, chạy thử vài lệnh để chắc mọi thứ ổn:

```bash
whoami
pwd
cat /etc/os-release | head -5
```

Thấy username vừa tạo, home `/home/<ten-ban>`, và dòng `Ubuntu 22.04` (hoặc 24.04) là xong.

Từ giờ quy ước trong mọi bài Windows-WSL2:

- **PowerShell** chỉ dùng để `wsl --install`, `wsl --list`, mở Docker Desktop.
- **Terminal Ubuntu** dùng cho mọi việc còn lại: cài Java, tải Kafka, sửa PATH, start broker.

## Lỗi Thường Gặp & Cách Fix

- **Windows báo WSL không hỗ trợ:** máy bạn dưới Windows 10 bản 2004. Fix: update Windows lên bản mới nhất, hoặc chuyển sang dùng Docker thuần (bài `020`).
- **`wsl --install` báo đã cài nhưng không thấy Ubuntu:** chạy `wsl --list --online` để xem danh sách distro, rồi `wsl --install -d Ubuntu` để cài riêng Ubuntu.
- **Màn hình cài đặt đứng yên:** nhấn `Enter` 1-2 lần, đợi thêm. Đừng mở thêm PowerShell khác chạy chồng lệnh.
- **Quên password Ubuntu:** trong PowerShell chạy `wsl -u root passwd <username>` để đặt lại.
- **Mở nhầm PowerShell thay vì Ubuntu để chạy lệnh Kafka:** các lệnh `apt`, `nano ~/.bashrc`, `./bin/*.sh` chỉ chạy trong Ubuntu. Fix: mở app Ubuntu từ Start Menu.

## Kết Luận

Vậy là Windows của bạn giờ đã có một máy Ubuntu thật bên trong. Mọi bài tiếp theo (`027`, `028`, `029`) đều thao tác trong terminal Ubuntu này.

Bài tiếp theo (`027`) chúng ta sẽ cài Java 21 + Kafka binaries + PATH — ngay trong Ubuntu vừa cài, các bước giống hệt Linux.
