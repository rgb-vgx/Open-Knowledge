---
title: 'Cài đặt CUDA trên Windows'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 14
status: edited
source: '014 - Installing CUDA on Windows.md'
categories:
- Nvidia
tags: []
---

# 🪟 Cài đặt CUDA trên Windows

> Nguồn: `014 - Installing CUDA on Windows.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/28888420)

Trên Windows, bộ đôi cần thiết là **Visual Studio** (editor) và **CUDA toolkit** (compiler). Bài này ghi lại đúng thứ tự cài, các lựa chọn khi chạy installer, và vài điểm dễ vấp như dung lượng ổ C hay driver.

### 🧑‍💻 Bước 1: cài Visual Studio trước

Tìm **Visual Studio** trên Google, mở trang chủ và tải bản **Enterprise**. Chạy file cài, quá trình mất vài phút.

Trong phần chọn workload, cần chọn nhóm **C và C++** (development tools). Dung lượng cài khoảng **21 GB** trên ổ C, thời gian khoảng **20 phút** hoặc hơn.

Visual Studio đóng vai **editor** để viết code; khi cài CUDA, nó sẽ được tích hợp để vừa là editor vừa gọi compiler.

---

### ⬇️ Bước 2: tải CUDA toolkit

Mở trang tải CUDA toolkit, chọn hệ điều hành **Windows 11**, rồi chọn bản **local** — khoảng **3 GB**, cần mạng nhanh. Bản trong video là **CUDA 12.3**.

Một lưu ý quan trọng: **đừng cài CUDA trước khi có Visual Studio**. Thứ tự đúng là Visual Studio xong rồi mới tới CUDA.

---

### 🛠️ Bước 3: chạy installer

* Đồng ý điều khoản.
* Chọn **Express** hoặc **Custom**: Express cài tất cả; Custom cho phép chọn thành phần.
* Trong video chọn **Express** rồi Next.
* Bước chuẩn bị mất khoảng **3–5 phút** để kiểm tra hệ thống tương thích.
* Nếu thiếu dung lượng ổ C, installer sẽ báo; cần giải phóng chỗ rồi chạy lại. Trong video, sau khi dọn còn khoảng **20–21 GB** thì cài được.

Trong quá trình này, installer có thể yêu cầu cài **driver**. Đây là lý do nên chuẩn bị dung lượng và kiểm tra driver trước.

---

### 🎮 Kiểm tra driver với GeForce Experience

Sau khi cài, có thể mở **GeForce Experience** để xem thông tin hệ thống: driver Nvidia và GPU đang dùng. Trong video, máy dùng **GTX 1070**.

GeForce Experience yêu cầu đăng nhập hoặc tạo tài khoản Nvidia. Từ tab **Drivers**, các bạn xem được phiên bản driver. Việc giữ driver CUDA mới là quan trọng cho lập trình — nên kiểm tra định kỳ.

---

### ✅ Chốt lại

Checklist cài đặt:

* [ ] Tải và cài **Visual Studio**, chọn workload **C/C++**.
* [ ] Đảm bảo ổ C còn đủ chỗ (Visual Studio ~21 GB, bộ cài CUDA ~3 GB).
* [ ] Tải **CUDA toolkit 12.3** bản local cho Windows 11.
* [ ] Cài CUDA **sau** Visual Studio, chọn Express hoặc Custom.
* [ ] Mở **GeForce Experience** kiểm tra driver và GPU.

GeForce Experience chủ yếu để xem thông tin hệ thống và driver; nó **không bắt buộc** cho việc lập trình. Thứ bắt buộc là **Visual Studio** và **CUDA toolkit** — thiếu một trong hai thì không build được project CUDA.

Thứ tự trên Windows: **Visual Studio (C++) → CUDA toolkit → kiểm tra driver**. Khi build trong Visual Studio, nó sẽ gọi **nvcc** ở bên dưới, nên các bạn không phải gõ lệnh — nhưng bài sau mình sẽ hướng dẫn cách biên dịch bằng dòng lệnh trên Linux.
