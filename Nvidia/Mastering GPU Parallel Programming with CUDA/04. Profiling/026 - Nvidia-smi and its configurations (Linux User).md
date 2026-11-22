---
title: 'nvidia-smi: giám sát và quản lý GPU'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 26
status: edited
source: '026 - Nvidia-smi and its configurations (Linux User).md'
categories:
- Nvidia
tags: []
---

# 🖥️ nvidia-smi: giám sát và quản lý GPU

> Nguồn: `026 - Nvidia-smi and its configurations (Linux User).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/34234622)

**NVIDIA System Management Interface** (`nvidia-smi`) là tiện ích dòng lệnh do NVIDIA cung cấp để theo dõi và quản lý GPU theo thời gian thực. Bài này đi qua ba nhóm chức năng: giám sát hiệu năng, quản lý thiết lập và truy vấn thông tin thiết bị — kèm các lệnh sẽ dùng lại suốt khóa học.

### 🧭 Ba nhóm chức năng

* **Performance monitoring**: theo dõi mức sử dụng tài nguyên GPU, bộ nhớ, nhiệt độ, công suất tiêu thụ.
* **Settings management**: chỉnh xung nhịp bộ nhớ và lõi, đặt giới hạn công suất.
* **Device information querying**: xem model GPU, phiên bản driver, phiên bản CUDA, xung nhịp hiện tại.

Chạy lệnh trơn `nvidia-smi`, ta nhận hai bảng. Bảng thứ nhất ba dòng: driver, CUDA, rồi tên chỉ số và giá trị. Bảng thứ hai liệt kê tiến trình đang chạy trên GPU.

---

### 📊 Đọc bảng giám sát

Trên máy giảng viên (RTX 3090):

* **Driver**: 546.12; **CUDA**: 12.3 — kiểm tra chéo bằng `nvcc --version` cũng ra 12.3.
* **GPU name**: GeForce RTX 3090; **GPU ID**: 0.
* **Power**: 31 W trên mức tối đa **350 W**.
* **Temperature**: 53 °C.
* **Memory usage**: 4 GB / 24 GB.
* **GPU utilization**: 42 % dù không chạy ứng dụng CUDA — vì ứng dụng ghi hình 4K đang dùng GPU.

Khi chạy một ứng dụng tính toán (matrix multiplication) trên terminal thứ hai:

* Tiến trình hiện trong bảng thứ hai với **PID 7440**, tên ứng dụng.
* Bộ nhớ tăng lên khoảng **8 GB**, utilization lên **100 %**.
* Công suất **318 W / 350 W**, nhiệt độ **63 °C**, quạt **100 %**.

Đây là mức tăng khoảng **10 lần** công suất so với lúc rảnh. Lưu ý: `nvidia-smi` không bắt ứng dụng ghi hình, chỉ bắt ứng dụng CUDA.

---

### 🔁 Giám sát liên tục và truy vấn chọn lọc

Chạy lặp mỗi 5 giây:

```bash
nvidia-smi -l 5
```

`-l` là loop, con số là số giây giữa hai lần đọc. Nhấn `Ctrl+C` để dừng.

Truy vấn vài chỉ số cụ thể, xuất CSV:

```bash
nvidia-smi --query-gpu=name,driver_version,temperature.gpu --format=csv
```

Có thể chuyển hướng ra file `.csv` rồi mở bằng Excel. Đây là cách ghi log hiệu năng gọn hơn đọc bảng.

---

### ⚙️ Quản lý thiết lập

Đặt giới hạn công suất:

```bash
nvidia-smi -i 0 -pl 200
```

`-pl` (power limit) nhận giá trị watt; cần kiểm tra GPU có hỗ trợ chỉnh hay không.

**Persistence mode** đôi khi phải bật trước khi đổi xung nhịp:

```bash
nvidia-smi -pm 1
# đổi clock ...
nvidia-smi -pm 0
```

Đọc xung nhịp hiện tại bằng `-q` (query) để xem clock của bộ nhớ và của lõi (SM).

Xung nhịp **không tăng tuyến tính vô hạn**: khi chạy ứng dụng, clock nhảy từ khoảng **570 MHz lên gần 1700 MHz** tùy tải. Muốn khóa một mức cụ thể, phải chọn trong danh sách **supported clocks** — không thể tự đặt giá trị tùy ý như 1216 thay cho 1215.

Xem toàn bộ tùy chọn:

```bash
nvidia-smi -h
```

Tại đây có `--gpu-reset` để trả GPU về mặc định, cùng `--reset-memory-clocks`, `--reset-applications-clocks` (đã deprecated) và các tùy chọn liên quan.

---

### ✅ Chốt lại

`nvidia-smi` là công cụ đầu tiên nên mở khi cần biết GPU đang làm gì: công suất, nhiệt độ, bộ nhớ, utilization và tiến trình. Nó vừa đọc được chỉ số vừa chỉnh được một số tham số, nhưng mọi thay đổi đều phụ thuộc khả năng hỗ trợ của GPU. Các bài profiling sau sẽ quay lại dùng `nvidia-smi` để đối chiếu số liệu.
