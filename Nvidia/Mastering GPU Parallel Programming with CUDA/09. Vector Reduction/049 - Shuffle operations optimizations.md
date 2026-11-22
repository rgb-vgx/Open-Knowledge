---
title: 'Shuffle operations: reduction trong register, nhanh gấp 4 lần'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 49
status: edited
source: '049 - Shuffle operations optimizations.md'
categories:
- Nvidia
tags: []
---

# 🃏 Shuffle operations: nói chuyện giữa các register

> Nguồn: `049 - Shuffle operations optimizations.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46668965)

Register là bộ nhớ nhanh nhất, nhưng có một giới hạn chí mạng: **mỗi register thuộc về một thread duy nhất**, không thread nào đọc được register của thread khác. Reduction cần đúng cái đó — cộng giá trị của thread này vào thread kia. **Shuffle operations** là lời giải, và nó đưa kernel đầu từ 82 µs xuống **17 µs**.

### 🧱 Giới hạn của register

Xét thứ tự bộ nhớ từ chậm đến nhanh: global (~300 cycle) → L2 (~200) → L1 / shared (~25–33) → **register** (vài cycle).

`__shared__ float sdata[256]` cấp 256 vị trí **cho cả block**, mọi thread trong block đọc/ghi được — nên gọi là *shared*. Còn khai báo `float sum;` trong kernel là **per-thread**: block 256 thread sẽ có **256 register** tên `sum`, mỗi cái gắn với một thread. Thread 0 **không** đọc được `sum` của thread 1.

Reduction luôn cần chuyển giá trị giữa các thread. Với shared memory thì làm được nhưng phải ghi ra rồi đọc lại mỗi bước. Muốn giữ dữ liệu trong register thì cần cơ chế khác.

### 🔀 Bốn phép shuffle

Theo **CUDA C Programming Guide**, shuffle trao đổi biến **giữa các thread trong cùng một warp**:

| Phép | Lấy dữ liệu từ |
|---|---|
| `__shfl_sync` | lane có ID chỉ định |
| `__shfl_up_sync` | lane có ID **thấp hơn** (`lane - delta`) |
| `__shfl_down_sync` | lane có ID **cao hơn** (`lane + delta`) |
| `__shfl_xor_sync` | lane `lane ^ delta` |

Cú pháp chung: `(mask, var, delta, width)`, trong đó:

* **mask**: bitmask các lane tham gia — dùng `0xffffffff` cho cả warp.
* **var**: biến cần lấy giá trị.
* **delta**: độ lệch, tương đương **stride** trong reduction.
* **width**: số lane tham gia, mặc định `warpSize` = **32**, nên thường bỏ qua.

Reduction cần thread ID thấp nhận giá trị từ thread ID cao, nên dùng **`__shfl_down_sync`**. Với `delta = 1`, thread 1 đưa giá trị cho thread 0, thread 3 cho thread 2… với `delta = 2`, thread 2 cho thread 0, bỏ qua thread 1. Đúng bằng mô hình tree reduction với stride 1, 2, 4…

### 🔢 Lane, không phải thread ID

Shuffle chạy ở mức **warp**, nên phải đánh lại số thứ tự trong warp:

* **Lane** = thread ID **trong warp**, chạy 0…31. Block 256 thread có 8 warp, mỗi warp có lane 0…31.
* **Lane ID** dễ tính: `threadIdx.x % 32` — hay `threadIdx.x & 31`.

Đây là điểm khác lớn so với các bài trước: vòng lặp không còn chạy trên toàn block mà **trên từng warp**.

```cuda
unsigned mask = 0xffffffff;
for (int offset = warpSize / 2; offset > 0; offset >>= 1) {
    sum += __shfl_down_sync(mask, sum, offset);
}
```

Vòng lặp bắt đầu ở `warpSize / 2 = 16`, giảm còn 8, 4, 2, 1. Sau khi xong, **lane 0 của mỗi warp** giữ tổng của 32 phần tử — một **partial sum cấp warp**.

### 🧩 Vẫn cần shared memory một chút

Vẫn còn vấn đề: mỗi warp có partial sum riêng, mà kernel phải trả về **một** giá trị mỗi block. Không thể giữ tất cả trong register rồi tự cộng — vẫn cần chỗ trung gian nhanh.

Cách làm hai tầng:

1. **Gom**: lane 0 của mỗi warp ghi partial sum vào shared memory tại vị trí liên tiếp — tức chỉ số `threadIdx.x / 32` (0, 1, 2…7). Mỗi warp đóng góp một phần tử.
2. `__syncthreads()` để chắc mọi warp đã ghi.
3. **Reduce tầng hai**: warp đầu tiên (lane 0…7) đọc 8 partial sum từ shared memory vào `sum`, rồi chạy **cùng vòng shuffle** một lần nữa. Lần này chỉ 8 lane có dữ liệu, nên khởi tạo offset ở 4 thay vì 16.
4. **Ghi ra**: `if (tid == 0) d_input[blockIdx.x] = sum;` — một giá trị mỗi block.

Dùng warp đầu tiên, không phải warp khác, vì dữ liệu được gom ở các vị trí 0, 1, 2… nằm trong warp 0. Warp khác muốn đọc phải qua shared memory nhiều lần hơn.

Kết quả: toàn bộ phép cộng chạy trong register, shared memory chỉ còn **8 phần tử** và một lần barrier — thay vì 256 phần tử và 8 barrier như bài trước.

### 📊 Đo bằng cả hai cách

**Command line** (khuyến nghị cho Linux server):

```bash
ncu --metrics gpu__time_duration.sum ./test06.exe
```

Metric `gpu__time_duration` trả về thời gian kernel. Kết quả: **17,6 µs**.

**Giao diện Nsight Compute** (cần chạy ứng dụng rồi attach process): kernel 1 mất **17,4 µs**, hai kernel sau **3 µs** mỗi cái — vì chúng chỉ xử lý 2048 rồi 8 phần tử.

| Phiên bản | Kernel 1 |
|---|---|
| Baseline | 283 µs |
| Bỏ modulo | 176 µs |
| Tăng việc/thread | 100 µs |
| Unrolling + block 128 | 82 µs |
| **Shuffle** | **17 µs** |

Nhanh gấp khoảng **4 lần** so với phiên bản tốt nhất trước đó, và gần **16 lần** so với baseline.

### 🔧 Vài ghi chú thực hành

* `__shfl_*_sync` chỉ có từ **CUDA 9** trở lên (kiến trúc Volta); bản cũ dùng `__shfl` không có `_sync`. Nếu Visual Studio báo lỗi biên dịch với shuffle, kiểm tra **Code Generation** — phải đặt `compute_XX` đúng kiến trúc GPU (transcript ghi RTX 3060 là `80`, thực tế là **8.6** theo bảng CUDA GPUs của NVIDIA).
* Khi attach bằng GUI, phải trỏ đúng file có đuôi `.exe`, nếu không Nsight Compute không thấy.
* Trong code vẫn còn phép chia (`threadIdx.x / 32` và `blockDim.x` chia đôi ở bước gộp). Có thể thay bằng `>>` và `& 31` — giảng viên để làm bài tập.
