---
title: 'Biên dịch CUDA trên Linux'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 20
status: edited
source: '020 - Compiling Cuda on Linux.md'
categories:
- Nvidia
tags: []
---

# 🛠️ Biên dịch CUDA trên Linux

> Nguồn: `020 - Compiling Cuda on Linux.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/42255550)

Bài này dùng lại project 001 nhưng chuyển sang Linux: mở file `.cu`, biên dịch bằng **nvcc**, chạy file thực thi. Điểm đáng chú ý là hiện tượng **lúc có output, lúc không** — và cách sửa bằng `cudaDeviceSynchronize`.

### 📁 Mở project và kiểm tra nvcc

Mở thư mục chứa project của section, project đầu là **001**. File có thể mở bằng editor bất kỳ, ví dụ **Visual Studio Code**. Trong file là kernel in **block ID, thread ID và warp ID**, launch với hai block và 64 thread mỗi block.

Mở terminal Linux (qua `wsl` nếu đang ở Windows), vào thư mục project, dùng `ls` để xem file. Kiểm tra compiler:

```bash
nvcc --version
```

Kết quả hiển thị nvcc đã cài và release của toolkit (trong video là bản 11.5).

---

### ⚙️ Biên dịch bằng nvcc

```bash
nvcc -o project001 project001.cu
```

* `-o` chỉ định tên file thực thi đầu ra, đồng thời ghi đè nếu file đã tồn tại. Giảng viên khuyên luôn dùng `-o`.
* `project001.cu` là file nguồn CUDA.

Sau khi biên dịch, `ls` sẽ thấy file `project001`.

---

### ▶️ Chạy và hiện tượng mất output

```bash
./project001
```

Lần chạy đầu có thể **không in gì**, dù chương trình đúng. Chạy lại thì có output, chạy tiếp lại có thể mất. Nguyên nhân:

* CPU chạy `main` tuần tự. Khi gặp lệnh launch kernel, CPU **gửi kernel sang GPU rồi đi tiếp** ngay, **không chờ** GPU xong.
* Nếu `main` kết thúc trước khi GPU in xong, output có thể không kịp hiện.

Cách sửa: thêm **`cudaDeviceSynchronize()`** sau lệnh launch, để CPU **chờ GPU hoàn thành kernel**. Sau khi thêm, mọi lần chạy đều có output ổn định.

Điểm này áp dụng cho **cả Windows lẫn Linux**, không riêng Linux.

---

### 🐞 Đọc lỗi biên dịch

Thử xóa một dấu chấm phẩy rồi biên dịch: nvcc báo lỗi kèm số dòng, ví dụ "expected ... on line 2022". Nếu dòng được báo **không** có vấn đề, hãy kiểm tra **dòng trước đó** — dấu chấm phẩy thiếu thường nằm ở cuối instruction trước. Thêm vào, lưu, biên dịch lại là hết lỗi.

---

### ✅ Chốt lại

Quy trình Linux: `nvcc -o <tên> <file>.cu` → `./<tên>`. Nhớ **`cudaDeviceSynchronize()`** nếu cần chắc chắn có output, và khi đọc lỗi biên dịch thì nhìn cả dòng trước dòng được báo. Bài sau mình sẽ in thêm **warp ID** — thứ không có biến dựng sẵn như block/thread.
