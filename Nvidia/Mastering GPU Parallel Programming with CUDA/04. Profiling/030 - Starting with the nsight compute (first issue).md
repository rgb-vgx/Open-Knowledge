---
title: 'Chạy ncu trên Windows/WSL: lỗi quyền truy cập performance counter'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 30
status: edited
source: '030 - Starting with the nsight compute (first issue).md'
categories:
- Nvidia
tags: []
---

# 🔧 Chạy ncu trên Windows/WSL: lỗi quyền truy cập performance counter

> Nguồn: `030 - Starting with the nsight compute (first issue).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/42862696)

Trước khi profiling bằng **Nsight Compute**, có một lỗi rất hay gặp trên Windows/WSL: chạy `ncu` báo hàng loạt lỗi dù driver và GPU đều ổn. Bài này đi từng bước chẩn đoán và cách cấp quyền cho **GPU performance counters**.

### ▶️ Hiện tượng

Ứng dụng vector add chạy bình thường, thời gian khoảng **6.8 ms**:

```bash
./vector_add
```

Nhưng khi gọi profiler:

```bash
ncu ./vector_add
```

thì xuất hiện **5 lỗi**. Lỗi đầu tiên nói về driver, vài lỗi sau nói về quyền truy cập.

Lưu ý: `ncu` được cài kèm **CUDA Toolkit**; chỉ khi báo `ncu: command not found` mới cần cài riêng.

---

### 🖥️ Kiểm tra driver trước

Chạy `nvidia-smi`. Nếu driver có vấn đề, bảng thông tin sẽ không hiện. Ở đây bảng hiện đầy đủ: driver, phiên bản CUDA và **GeForce RTX 3090**. Vậy lỗi không phải do driver.

Đọc kỹ lỗi thứ hai: profiler thất bại vì **driver resource không khả dụng** — đây là hệ quả, không phải nguyên nhân gốc.

---

### 🔑 Nguyên nhân: quyền truy cập GPU performance counters

Lỗi then chốt: **user không có quyền truy cập GPU performance counters**. Trên Windows, khi cài driver, quyền này mặc định chỉ cấp cho **admin**. Đang chạy với quyền user thường nên `ncu` bị chặn.

Chạy bằng `sudo` cũng không giải quyết: khi đó lại gặp lỗi `ncu: command not found`, vì môi trường của root khác.

---

### ⚙️ Cách sửa trong NVIDIA Control Panel

1. Mở **NVIDIA Control Panel**.
2. Vào menu **Desktop**, bật **Developer Settings**.
3. Chọn **Manage GPU Performance Counters**.
4. Chuyển từ "chỉ admin" sang **allow access to all users**.
5. Apply — màn hình sẽ nháy một lần.
6. Khởi động lại hệ thống: `sudo reboot`.

Nếu dùng **WSL**, sau khi reboot cần chờ khoảng **một phút** rồi mở lại Ubuntu bằng `wsl`.

---

### ✅ Kiểm tra lại

Sau reboot, vào thư mục bài học và chạy lại:

```bash
cd cuda_course
ncu ./vector_add
```

Lỗi đã biến mất, `ncu` trả về bảng kết quả gồm:

* **DRAM frequency**, **memory throughput**, **L2 cache throughput**, **active cycles**.
* Cấu hình: **block size**, **grid size**, **số register mỗi thread**.
* Section **Occupancy** với các giới hạn và **achieved occupancy**.

Các chỉ số này sẽ được phân tích ở bài sau; bài này chỉ nhằm giải quyết lỗi chạy `ncu` trên Windows.

---

### ✅ Chốt lại

Khi `ncu` báo lỗi hàng loạt dù driver bình thường, hãy nghi ngờ **quyền truy cập performance counters**. Bật Developer Settings trong NVIDIA Control Panel, cấp quyền cho mọi user rồi reboot là xong. Trên WSL nhớ chờ khoảng một phút trước khi mở lại.
