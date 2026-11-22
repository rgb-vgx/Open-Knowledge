---
title: 'Vector reduction: shared memory và unrolling bước cuối'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 48
status: edited
source: '048 - Optimization using shared memory and unrolling.md'
categories:
- Nvidia
tags: []
---

# 🗃️ Shared memory + unrolling: từ 18 MB ghi xuống dưới 1 MB

> Nguồn: `048 - Optimization using shared memory and unrolling.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46548913)

Bài này thử hai tối ưu cuối của reduction: đưa dữ liệu vào **shared memory**, và **unroll** các bước cuối để bỏ `__syncthreads()`. Kết quả trái với kỳ vọng thông thường: shared memory một mình **không** giúp gì, còn unrolling mới là thứ cắt được 13 µs.

### 🧠 Vì sao shared memory không "thần kỳ"

Suốt các bài trước, dữ liệu nằm ở global memory — nhưng mỗi lần đọc, nó vẫn đi qua **L2** rồi **L1**. Bước sau đọc lại phần tử 0 đã có sẵn trong L1 (hit rate 91% ở bài profiling). Tức là **L1 đã làm sẵn việc của shared memory**, chỉ chậm hơn ~30 cycle so với ~23–25 cycle.

Vì thế đổi từ global sang shared chỉ tiết kiệm được khoảng **10–20%**, không phải 50–80%. Muốn ăn nhiều hơn phải **ghép** shared memory với một kỹ thuật khác.

### 🧱 Chuyển kernel sang shared memory

Kernel trước (mỗi block 512 phần tử, 256 thread) thêm ba thay đổi:

1. **Cấp phát**: `__shared__ float sdata[256];` — **per block**, không phải per kernel. Mỗi block có vùng riêng 256 phần tử, đúng bằng block size.
2. **Nạp**: bước gộp đầu tiên vẫn đọc global memory, nhưng ghi kết quả vào `sdata[tid]` thay vì `d_input[index]`:
   ```cuda
   sdata[tid] = (index < n ? d_input[index] : 0.0f)
              + (index + blockDim.x < n ? d_input[index + blockDim.x] : 0.0f);
   __syncthreads();
   ```
3. **Tính**: vòng lặp đọc/ghi trên `sdata` với index là **`tid`** (0…255), không phải `index` toàn cục. Vì shared memory của mỗi block là riêng, không cần offset theo block.
4. **Ghi ra**: chỉ **một lần** duy nhất, `d_input[blockIdx.x] = sdata[0];` — lấy kết quả block từ shared memory ghi xuống global.

Điểm mấu chốt là bước 4: trước đây **mỗi thread** đều ghi global memory, giờ cả block chỉ ghi một giá trị.

### 🛡️ Toán tử ba ngôi để tránh rác

Lần đầu chạy, kết quả sai ngay từ phần tử đầu. Nguyên nhân: thread có `index` vượt biên vẫn ghi vào shared memory, để lại **giá trị rác** mà các bước sau cộng vào.

Sửa bằng cách nạp **0** khi ngoài biên:

```cuda
index < n ? d_input[index] : 0.0f
```

Toán tử `condition ? a : b` trả `a` nếu đúng, `b` nếu sai. Hoặc đơn giản hơn: khởi tạo toàn bộ 256 phần tử shared memory bằng 0 trước khi nạp. Không xử lý chỗ này thì tổng sai lệch hoàn toàn — đây là lỗi im lặng điển hình của CUDA.

### 📉 Lượng dữ liệu ghi giảm 20 lần

Đây mới là lợi ích thật:

| | Global-only | Dùng shared memory |
|---|---|---|
| Dữ liệu ghi ra global | **18–19 MB** mỗi lượt | **dưới 1 MB** |
| Shared memory request | 0 | ~70.000 |
| Dữ liệu L1 → L2 | lớn | ~128 KB (chỉ thread cuối block ghi) |

Nhưng thời gian chạy **103 µs**, so với 100 µs của bản global-only → **không cải thiện, thậm chí nhích lên**. Lý do: chi phí nạp vào shared memory và barrier bù lại đúng phần tiết kiệm được. Bài học: tối ưu bộ nhớ chỉ có lợi khi bottleneck thực sự nằm ở bộ nhớ.

### ⚔️ Bank conflict kiểm tra bằng Nsight Compute

Trong **Memory Workload Analysis → Memory Tables** có số **bank conflict**. Với vòng lặp stride **giảm dần** (bắt đầu `blockDim.x / 2`, chia đôi), kết quả là **0 conflict**. Nếu đảo lại — bắt đầu stride 1 và nhân đôi — sẽ thấy **hàng chục conflict** và thời gian tăng lên ~115 µs. Đây là lý do kỹ thuật cho việc chọn chiều vòng lặp, bổ sung cho kết quả đo ở bài trước.

### 🔄 Unrolling: bỏ 5 barrier cuối

Quan sát: mỗi vòng lặp đều có `__syncthreads()` — với block 256 thread, stride đi 128, 64, 32, 16, 8, 4, 2, 1, tức **8 barrier**. Nhưng khi stride xuống **dưới 32**, mọi thread còn lại nằm trong **một warp duy nhất**. Trong một warp, các lane đã chạy lockstep, **không cần barrier nữa**.

Cách làm:

1. Vòng lặp chỉ chạy khi `stride >= 32`.
2. Phần còn lại giao cho một hàm **`__device__`** — hàm chỉ gọi được từ kernel khác, không gọi từ `main`.
3. Hàm đó cộng dồn tuần tự trên shared memory với offset **32 → 16 → 8 → 4 → 2 → 1**, không barrier giữa các bước.

```cuda
__device__ void warp_reduce(float* sdata, int tid) {
    sdata[tid] += sdata[tid + 32];
    sdata[tid] += sdata[tid + 16];
    sdata[tid] += sdata[tid + 8];
    sdata[tid] += sdata[tid + 4];
    sdata[tid] += sdata[tid + 2];
    sdata[tid] += sdata[tid + 1];
}
```

Gọi hàm này khi `tid < 32`, sau khi vòng lặp chính dừng. Phần tính toán bị "trải phẳng" (unroll) thành các lệnh liên tiếp, mất hẳn 5 barrier — và barrier chính là thứ đắt, không phải phép cộng.

Kết quả: **90 µs**, cải thiện khoảng **10%** so với 100 µs. Cộng dồn tuần tự nghe chậm, nhưng đọc shared memory mất ~25 cycle nên vẫn rẻ hơn nhiều so với 5 lần đồng bộ toàn block.

### 🎚️ Chọn block size bằng thực nghiệm

Cuối bài, thử đổi block size:

* **512 thread**: chậm hơn — bỏ.
* **256 thread**: 90 µs.
* **128 thread**: **82 µs** — tốt nhất trong ba.

Không có công thức chọn block size; phải thử và đo trên GPU cụ thể. Đây cũng là lời kết cho cả section: bốn kỹ thuật — bỏ modulo, tăng việc mỗi thread, shared memory, unrolling — đã đưa kernel đầu từ **283 xuống 82 µs**, và đều áp dụng được cho ứng dụng CUDA khác.

Với template, giảng viên nhắc thêm một mẹo: dùng template để chọn kiểu dữ liệu lúc **biên dịch** thay vì `if` lúc chạy, tránh sinh thêm divergence.
