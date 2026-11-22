---
title: 'Matrix multiplication: tiling và shared memory'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 52
status: edited
source: '052 - Optimize the Matrix Multiplication using the shared memory.md'
categories:
- Nvidia
tags: []
---

# 🧱 Tiling: chia ma trận để dùng shared memory

> Nguồn: `052 - Optimize the Matrix Multiplication using the shared memory.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46549293)

Câu hỏi mở đầu: hàng đầu tiên của A được đọc từ global memory **bao nhiêu lần** để tính hết ma trận C? Câu trả lời là **N lần** — với N = 512 thì mỗi phần tử bị đọc lại 512 lần từ bộ nhớ chậm nhất. Tiling + shared memory cắt con số đó xuống, và đưa kernel từ 360 µs về **251 µs**.

### ❓ Vì sao L1 không cứu được

Phản biện tự nhiên: dữ liệu đọc từ global sẽ nằm trong L1, lần sau đọc nhanh hơn. Nhưng **không có gì bảo đảm** nó còn ở đó. L1 là **hardware-controlled cache**: khi nhiều block cùng chạy trên một SM, cache phải đuổi bớt dòng cũ để lấy chỗ. Hàng A vừa nạp có thể bị đẩy ra trước khi dùng lại, và lần sau phải xuống global memory (~300 cycle) một lần nữa.

Shared memory thì khác: **software-controlled**. Các bạn tự quyết định nạp gì, giữ gì, khi nào; dữ liệu nằm đó suốt vòng đời block với latency ~20–25 cycle. Đó là lý do dùng shared memory dù L1 đã tồn tại.

### 🧩 Tiling là gì

Chia ma trận **C** thành các ô vuông gọi là **tile**, mỗi tile do **một thread block** phụ trách. Tile size trong bài là **16×16** = 256 phần tử, khớp với 256 thread/block — mỗi thread tính một phần tử C.

Vì sao chia C chứ không chia A hay B? Vì một phần tử C cần **cả hàng** của A và **cả cột** của B, nên đơn vị công việc tự nhiên là ô của C. A và B cũng được chia theo cùng lưới, nhưng chỉ để biết cần nạp đoạn nào.

Với N = 512, tile 16:

* Grid: `(512 + 15) / 16 = 32` theo mỗi chiều → **32 × 32 = 1024 block**.
* Mỗi chiều thread trong block: `threadIdx.x`, `threadIdx.y` chạy 0…15.

Ràng buộc quan trọng: **tile phải vừa shared memory**. Shared memory giới hạn (A100 tới **164 KB** mỗi SM, RTX 3060 khoảng **100 KB**), nên không thể chọn tile 1 triệu phần tử.

### 🧮 Viết kernel

Khai báo hai mảng shared cho một tile:

```cuda
__shared__ float sA[TILE][TILE];
__shared__ float sB[TILE][TILE];
```

Dung lượng: `16 × 16 × 4 byte × 2 = 2 KB` — rất nhỏ so với giới hạn.

Toạ độ của thread trong ma trận C:

```cuda
int row = blockIdx.y * TILE + threadIdx.y;
int col = blockIdx.x * TILE + threadIdx.x;
```

Vòng lặp chính đi qua **các tile dọc chiều K**:

```cuda
int num_tiles = N / TILE;
float sum = 0.0f;

for (int t = 0; t < num_tiles; t++) {
    // 1. nạp tile A: hàng `row`, cột bắt đầu t*TILE
    sA[threadIdx.y][threadIdx.x] = A[row * N + (t * TILE + threadIdx.x)];

    // 2. nạp tile B: hàng bắt đầu t*TILE, cột `col`
    sB[threadIdx.y][threadIdx.x] = B[(t * TILE + threadIdx.y) * N + col];

    __syncthreads();

    // 3. nhân tích lũy trong tile
    for (int k = 0; k < TILE; k++)
        sum += sA[threadIdx.y][k] * sB[k][threadIdx.x];

    __syncthreads();
}

C[row * N + col] = sum;
```

Ba điểm cần nắm:

* **Nhân với `N` để nhảy hàng.** Ma trận lưu dạng phẳng một chiều, `row * N + col` là công thức đổi (hàng, cột) sang chỉ số. `t * TILE` là offset của tile hiện tại — tile thứ 0 bắt đầu ở cột 0, tile thứ 1 ở cột 16, tile thứ 2 ở cột 32…
* **Tile A nạp theo hàng, tile B nạp theo cột** — đúng bản chất phép nhân: A đi theo hàng `row`, B đi theo cột `col`.
* **Hai `__syncthreads()`** đều bắt buộc: cái đầu chờ mọi thread nạp xong tile trước khi tính; cái sau chờ mọi thread tính xong trước khi ghi đè tile ở vòng kế tiếp.

### 💾 Lượng đọc giảm bao nhiêu

Naive: mỗi phần tử A bị đọc **N lần** (512 lần). Tiling: mỗi phần tử A được đọc **một lần cho mỗi tile cột** — tức `N / TILE = 32` lần. Giảm 16 lần lượng đọc global, đổi lại là thêm hai barrier mỗi vòng.

### 🐛 Lỗi thường gặp khi viết

Bài giảng cố tình giữ lại các lỗi để thấy cách sửa:

1. **Đặt `__syncthreads()` sai chỗ**: nếu đặt barrier ngay trong thân vòng nạp, chương trình nạp lần lượt mọi tile rồi mới tính — và chỉ tính trên **tile cuối**. Kết quả sai hoàn toàn. Barrier phải nằm **sau khi nạp xong cả hai tile** và **trước phép nhân**.
2. Quên khai báo `int num_tiles` hay `float sum`.
3. Nhầm `c` với `C` (tên biến phân biệt hoa thường).

### 📊 Kết quả

| Cấu hình | Naive | Tiling + shared |
|---|---|---|
| N = 512 | 360 µs | **251 µs** |
| N = 1024 | ~3 ms | **~2 ms** |

Cải thiện khoảng **30–40%**. Thử tăng tile:

* **tile 32** → 2,1 ms: **chậm hơn** tile 16 (1,995 ms). Block 32×32 = 1024 thread, chạm trần, occupancy giảm.
* **tile 64** → *"No kernels were profiled"*. Không phải vì shared memory (64×64×4×2 = 32 KB vẫn vừa), mà vì block 64×64 = **4096 thread**, vượt giới hạn **1024 thread/block** của CUDA. Kernel không chạy, nên profiler không thấy gì.

Giới hạn 1024 thread/block là lý do tile lớn hơn phải làm theo cách khác: mỗi thread xử lý **nhiều** phần tử của tile, thay vì một thread một phần tử. Đó chính là hướng của bài tiếp theo — dùng `float4`.
