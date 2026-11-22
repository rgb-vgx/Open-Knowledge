---
title: 'Vector addition: đánh index block/thread và hiệu năng GPU'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 23
status: edited
source: '023 - 004 - Vector addition + blocks and thread indexing + GPU performance.md'
categories:
- Nvidia
tags: []
---

# 📐 Vector addition: đánh index block/thread và hiệu năng GPU

> Nguồn: `023 - 004 - Vector addition + blocks and thread indexing + GPU performance.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/34013954)

Tăng vector lên **2048 phần tử** buộc phải dùng nhiều block, và từ đây xuất hiện công thức index quan trọng nhất của khóa: `index = threadIdx.x + blockIdx.x * blockDim.x`. Bài này còn đặt câu hỏi về **GPU utilization**: 2 block trên GPU 108 SM chỉ dùng chưa tới 2% tài nguyên, và cách cấu hình lại để chạy nhanh hơn.

### 📏 Vì sao phải dùng nhiều block

Với vector 2048 phần tử, không thể dùng một block 2048 thread: whitepaper Ampere ghi **tối đa 1024 thread/block**. Vậy phải tăng số block (grid size).

Quy tắc bắt buộc: **tổng số thread toàn ứng dụng phải bằng số phần tử lớn nhất của vector**. Nếu tăng block thì phải giảm thread/block để tổng vẫn là 2048.

Cách đơn giản nhất: **2 block × 1024 thread**.

* Block ID 0 xử lý nửa đầu (chỉ số 0–1023), thread ID 0–1023.
* Block ID 1 xử lý nửa sau (chỉ số 1024–2047), thread ID cũng 0–1023.

---

### 🧮 Công thức index

Nửa đầu, thread ID trùng chỉ số vector. Nửa sau thì không: thread 0 của block 1 phải ứng với phần tử **1024**. Công thức:

```cuda
int index = threadIdx.x + blockIdx.x * blockDim.x;
```

Trong đó `blockDim.x` là số thread mỗi block theo chiều x.

Kiểm chứng:

* Phần tử thứ ba của nửa đầu: `blockIdx.x = 0`, `threadIdx.x = 2` → index **2**. Đúng.
* Phần tử đầu của nửa sau: `blockIdx.x = 1`, `threadIdx.x = 0`, `blockDim.x = 1024` → index **1024**. Đúng.

Công thức này sẽ là thành phần cốt lõi của mọi kernel về sau.

---

### ⚡ GPU utilization: 2 block là quá ít

Cấu hình 2 block × 1024 thread chạy đúng, nhưng hiệu năng đáng bàn:

* Mỗi **block chạy trên một SM**; **warp trên một partition**; **thread trên một core**; **grid trên toàn GPU**.
* Với **2 block**, chỉ **2 SM** tham gia, trong khi A100 có **108 SM**.
* Tỷ lệ dùng SM dưới **2%** — 106 SM còn lại **nhàn rỗi**.

Đây là **GPU utilization**, chỉ số quan trọng của hiệu năng. Utilization thấp nghĩa là lãng phí phần cứng.

---

### 🚀 Tăng utilization mà không tăng vector

Không được tăng tổng thread (vì phải khớp 2048 phần tử), nên chiến lược là **tăng số block, giảm thread mỗi block**.

* Số thread tối thiểu mỗi block là **32**, tương đương **một warp**.
* 2048 / 32 = **64 block**.
* Cấu hình: **64 block × 32 thread**. Lúc này **64 SM** cùng chạy thay vì 2.

---

### ⏱️ Đo thời gian thực thi

Có hai cách: dùng **API của CUDA** hoặc dùng **profiler** (Nsight Systems, Nsight Compute). Bài này dùng API:

```cuda
cudaEvent_t start, stop;
cudaEventCreate(&start);
cudaEventCreate(&stop);
cudaEventRecord(start);
// launch kernel
cudaEventRecord(stop);
float ms;
cudaEventElapsedTime(&ms, start, stop);
```

`cudaEventCreate` chuẩn bị biến, `cudaEventRecord` ghi mốc thời gian, `cudaEventElapsedTime` tính chênh lệch (mili-giây).

Kết quả: thời gian **thay đổi giữa các lần chạy** — đúng như giảng viên cảnh báo, cách này **kém chính xác**; profiler là lựa chọn tốt hơn. Dù vậy, khi so hai cấu hình, **64 block × 32 thread chạy nhanh hơn** 2 block × 1024 thread.

---

### 🔬 Vì sao block nhỏ lại nhanh hơn

* Cả hai trường hợp, **mỗi SM chỉ chạy một block** (tối đa 1 block/SM), các block chạy song song.
* Thời gian phụ thuộc **độ lớn của block**: block 1024 thread phải làm nhiều việc hơn block 32 thread.
* Block nhỏ chia đều cho nhiều SM hơn → tổng thời gian giảm.

**Chốt lại.** Hai điều cần nhớ: công thức **`index = threadIdx.x + blockIdx.x * blockDim.x`**, và **cấu hình block/thread quyết định utilization**. Muốn dùng nhiều SM, hãy chia nhỏ block. Bài sau mình sẽ đẩy vector lên hơn **400 triệu phần tử** và đụng giới hạn memory.
