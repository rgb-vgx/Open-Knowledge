---
title: 'Ví dụ WMMA hoàn chỉnh: 388 µs cho ma trận 1024'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 58
status: edited
source: '058 - Practical example on the WMMA APIs.md'
categories:
- Nvidia
tags: []
---

# 🏃 Chạy WMMA thực tế: 6,5 lần nhanh hơn naive

> Nguồn: `058 - Practical example on the WMMA APIs.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/48364941)

Bài này ghép mọi thứ thành chương trình chạy được: kernel WMMA cho ma trận 1024×1024, kiểm chứng với CPU, và đo thời gian. Kết quả **388 µs** so với **2,5 ms** của naive — khoảng **6,5 lần**.

### ⚙️ Thông số

* A, B, C đều vuông **1024 × 1024**.
* **Tile = 16**, đúng kích thước fragment WMMA cho half precision.
* Input **half** (FP16), output **float** (FP32) — kernel tên `matrix_multiplication_tensor_cores_fp32` vì accumulator là FP32.
* **128 thread mỗi block** = **4 warp** mỗi block.

---

### 🧵 Phần đầu kernel

```cuda
int warp_id = (threadIdx.x >> 5) + (blockIdx.x + blockIdx.y * gridDim.x) * (blockDim.x >> 5);
int tiles_per_row = N / TILE;
int num_tiles = tiles_per_row * tiles_per_row;
if (warp_id >= num_tiles) return;
```

* `threadIdx.x >> 5` = `threadIdx.x / 32` — warp thứ mấy trong block.
* Số hạng thứ hai dịch chuyển sang block kế tiếp (mỗi block 128 thread = 4 warp).
* **Kiểm tra `warp_id >= num_tiles` là bắt buộc.** Nếu grid có nhiều warp hơn số tile, warp dư sẽ tính chỉ số ngoài mảng và gây **segmentation fault**. Hàm `main` cũng kiểm tra để bảo đảm tổng số warp khớp số tile trước khi launch.

Vị trí tile:

```cuda
int tile_row = warp_id / tiles_per_row;
int tile_col = warp_id % tiles_per_row;
```

---

### 🔁 Thân kernel

```cuda
wmma::fragment<wmma::matrix_a, TILE, TILE, TILE, half,  wmma::row_major> a_frag;
wmma::fragment<wmma::matrix_b, TILE, TILE, TILE, half,  wmma::col_major> b_frag;
wmma::fragment<wmma::accumulator, TILE, TILE, TILE, float> c_frag;

wmma::fill_fragment(c_frag, 0.0f);

for (int k = 0; k < N; k += TILE) {
    wmma::load_matrix_sync(a_frag, a + k + tile_row * TILE * lda, lda);
    wmma::load_matrix_sync(b_frag, b + k + tile_col * TILE * ldb, ldb);
    wmma::mma_sync(c_frag, a_frag, b_frag, c_frag);
}

wmma::store_matrix_sync(c + tile_row * TILE * ldc + tile_col * TILE,
                        c_frag, ldc, wmma::mem_row_major);
```

Bốn điểm cần nhớ:

* **A row-major, B col-major** — để cột của B nằm liền nhau trong bộ nhớ.
* **`fill_fragment` đặt accumulator về 0** trước khi cộng dồn.
* **`mma_sync(c, a, b, c)`** — accumulator vừa là input vừa là output, đó là nghĩa của "accumulate".
* **`store_matrix_sync` chỉ gọi một lần** sau vòng lặp, ghi toàn bộ tile C ra global.

---

### 🧱 Phần main

1. Kiểm tra `N % TILE == 0`; nếu không thì dừng — tile 16 không xử lý được ma trận 15 cột.
2. Cấp phát host `h_a`, `h_b`, `h_c`, device `d_a`, `d_b`, `d_c`.
3. Khởi tạo A, B bằng hàm random; xóa C bằng **`cudaMemset`**.
4. Copy A, B lên device.
5. Tính grid/block: **128 thread/block**, grid phủ đủ số tile.
6. Launch, rồi **`cudaDeviceSynchronize()`** — không có nó, CPU copy kết quả về trước khi kernel xong.
7. Chạy hàm CPU để có kết quả đối chiếu; in **10 phần tử đầu** của cả hai để so.
8. Giải phóng bộ nhớ.

Lưu ý về `cudaMemset`: nó xóa C toàn cục về 0 **trước** kernel. Accumulator trong register vẫn phải khởi tạo bằng `fill_fragment(0)` trước vòng lặp đầu, trừ khi code load sẵn C từ bộ nhớ vào fragment.

---

### 🧯 Lỗi biên dịch quen thuộc

```bash
nvcc -o tensor2 tensor2.cu
```

Báo `fragment is undefined`, mọi hàm `wmma::` đều "not defined". Không phải thiếu `#include` mà là **kiến trúc đích quá cũ**:

```bash
nvcc -arch=sm_80 -o tensor2 tensor2.cu
```

`nvcc` không có `-arch` thường chọn `sm_52` — trước Volta, không có tensor core, nên toàn bộ API WMMA không tồn tại. Máy trong bài là **RTX 3060 Ti** (Ampere), nên dùng `sm_80`; card Ampere phổ thông thực tế là 8.6, dùng `sm_86` cũng được.

Giảng viên nhấn mạnh: nên đặt `-arch` cho **mọi** chương trình CUDA, không riêng bài tensor core — thiếu nó, compiler bỏ qua các tối ưu riêng của kiến trúc.

---

### 📊 Kết quả

| Phiên bản | N = 1024 |
|---|---|
| Naive | 2,5 ms |
| **WMMA tensor core** | **388 µs** |

**~6,5 lần** nhanh hơn naive. Nếu so với bản tiling + shared memory (251 µs ở N = 512, tương đương khoảng 2 ms ở N = 1024), WMMA vẫn nhanh hơn khoảng 5 lần.

Bài tập giảng viên giao: so WMMA với **tất cả** các phiên bản đã làm — naive, shared memory, float4 — trên cùng kích thước, để thấy mỗi kỹ thuật đóng góp bao nhiêu. Còn một hướng nữa chưa thử: gọi thẳng **cuBLAS**, nơi NVIDIA đã tối ưu đến giới hạn của phần cứng.
