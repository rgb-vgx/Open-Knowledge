---
title: 'Hello World CUDA: thread và block'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 19
status: edited
source: '019 - 001 Hello World program (threads - Blocks).md'
categories:
- Nvidia
tags: []
---

# 🖨️ Hello World CUDA: thread và block

> Nguồn: `019 - 001 Hello World program (threads - Blocks).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/28221646)

Dự án đầu tiên in ra **block ID** và **thread ID** — hai biến có sẵn trong kernel. Qua việc tăng dần số thread và block, các bạn sẽ thấy giới hạn phần cứng lộ ra: vượt **1024 thread/block** thì chương trình ngừng cho kết quả. Bài này cũng chỉ cách xử lý bằng nhiều block.

### 🧪 Tạo project CUDA trong Visual Studio

Trong Visual Studio, chọn **New Project → CUDA**, đặt tên (ví dụ `001`) rồi Create. File mặc định có sẵn `kernel.cu` và vài dòng code mẫu; giảng viên xóa hết để viết từ đầu, chỉ giữ khoảng 7–10 dòng include header.

Cấu trúc tối thiểu:

* **Hàm `main`**: mọi chương trình C/CUDA đều cần, chạy trên **CPU**.
* **Kernel**: một hàm chạy trên **GPU**. Dấu hiệu nhận biết là **`__global__`**. Cú pháp giống khai báo hàm C: kiểu trả về, tên, cặp ngoặc, danh sách tham số.

Trong `main`, có hai lệnh: gọi kernel và `return 0`.

---

### 📞 Gọi kernel với cấu hình

Cú pháp gọi kernel:

```cuda
kernel<<<1, 1>>>();
```

Hai tham số trong `<<<...>>>`:

1. **Số block** (grid size) — tổng số block của ứng dụng.
2. **Số thread mỗi block** — không phải tổng thread toàn ứng dụng.

---

### 🖨️ In block ID và thread ID

Trong kernel, dùng `printf`:

```cuda
printf("\nBlock ID: %d, Thread ID: %d",
       blockIdx.x, threadIdx.x);
```

* **`blockIdx`** là biến có sẵn chứa block ID; với 10 block sẽ in ra 0 đến 9.
* **`threadIdx`** chứa thread ID.
* Cả hai có ba chiều **x, y, z**; bài này chỉ dùng **`.x`**.

---

### 🔢 Thay đổi cấu hình và quan sát

* `<<<1, 1>>>`: in ra block 0, thread 0.
* `<<<1, 4>>>`: một block, thread 0–3.
* `<<<1, 32>>>`: một block, thread 0–31.
* `<<<2, 8>>>`: hai block (0 và 1), mỗi block 8 thread (0–7).

Lưu ý: **thứ tự in không đảm bảo**. Có lúc block 1 in trước block 0. Lý do: các thread chạy song song, thread nào xong trước thì in trước; ta không biết core nào hoàn thành đầu tiên.

Tương tự với 512 thread: các ID vẫn đủ mặt (0–511) dù màn hình hiển thị bắt đầu từ một số khác 0.

---

### ⚠️ Chạm giới hạn 1024 thread/block

* `<<<1, 1024>>>`: chạy tốt, in tới thread **1023**.
* `<<<1, 2048>>>`: **build thành công nhưng chạy không ra kết quả** — không có output, không lỗi biên dịch.

Nguyên nhân nằm trong whitepaper Ampere: **max thread block size = 1024** (số thread tối đa mỗi block). Giới hạn này áp dụng cho nhiều architecture, cả trước và sau Ampere.

Đây là lý do phải đọc bảng thông số phần cứng: code đúng cú pháp vẫn có thể sai ràng buộc phần cứng.

---

### 🧮 Cách xử lý: tăng số block

Giả sử cần cộng hai vector **2048 phần tử**. Không thể dùng 2048 thread trong một block, nhưng có thể dùng:

```cuda
kernel<<<2, 1024>>>();
```

Tổng thread = 2 × 1024 = 2048, vừa đủ số phần tử. Chương trình chạy đúng.

Còn giới hạn số block? Whitepaper ghi **tối đa 32 thread block mỗi SM**. Vì con số này tính **trên mỗi SM**, không phải toàn GPU, nên tổng block tối đa = **32 × số SM**. Với A100 có 108 SM: 32 × 108. Đó là lý do có thể khai báo hàng triệu block, miễn không vượt tổng giới hạn theo số SM.

**Chốt lại.** Kernel dùng `__global__`, gọi bằng `<<<blocks, threads>>>`, đọc ID qua `blockIdx.x` và `threadIdx.x`. Giới hạn cần nhớ: **1024 thread/block**, **32 block/SM**. Bài sau mình sẽ biên dịch và chạy trên Linux bằng nvcc, kèm một cái bẫy về đồng bộ khá thú vị.
