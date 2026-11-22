---
title: 'Cộng ma trận với block và thread 2 chiều'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 37
status: edited
source: '037 - Matrices addition using 2D of blocks and threads.md'
categories:
- Nvidia
tags: []
---

# 🧮 Cộng ma trận với block và thread 2 chiều

> Nguồn: `037 - Matrices addition using 2D of blocks and threads.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/42973934)

Từ đầu khóa đến giờ mọi thứ đều một chiều: vector, block 1D, thread 1D. Bài này mở mức tiếp theo — **block 2 chiều và thread 2 chiều** — áp dụng vào cộng hai ma trận. Phần khó không phải code mà là ánh xạ ba hệ tọa độ: chỉ số ma trận, địa chỉ bộ nhớ, và `threadIdx`/`blockIdx`.

### 🧱 Từ 1D sang 2D

Với 1D, `blockDim.x` là số thread mỗi block, `gridDim.x` là số block trong grid. Tổng thread = `blockDim.x × gridDim.x`.

Với 2D, thêm chiều y:

```cuda
dim3 block(32, 32);   // 32 thread theo x, 32 theo y
dim3 grid(128, 128);  // 128 block theo x, 128 theo y
```

Ràng buộc quan trọng: **tích các chiều của block không được vượt 1024**. `32 × 32 = 1024` hợp lệ; `1024 × 2 = 2048` sẽ biên dịch được nhưng không chạy. Có thể hoán đổi, ví dụ `64 × 16`, `1 × 512`, `2 × 512`, `512 × 2`, miễn tích ≤ 1024. Cách chia ảnh hưởng hiệu năng nên cần thử.

Grid 2D tương tự: `1024 × 1024` block, nhân lại hơn 1 triệu block.

---

### 💾 Ma trận nằm trong bộ nhớ 1 chiều

Ma trận 2D nhưng bộ nhớ là 1D, nên phải chọn cách xếp. **Row-major**: từng hàng được lưu liên tiếp. **Column-major**: từng cột liên tiếp. Bài dùng **row-major**.

Ví dụ ma trận 6 hàng × 8 cột (chỉ số hàng 0–5, cột 0–7). Phần tử ở hàng `i`, cột `j` có địa chỉ:

```text
index = j + i * row_size    // row_size = số cột = 8
```

Kiểm tra với phần tử hàng 3, cột 1: `1 + 3 × 8 = 25`? Công thức trong bài viết theo thứ tự `j × row_size + i` với `i` là cột, `j` là hàng — tức hoán đổi tên biến. Điều cốt lõi: **chỉ số tuyến tính = chỉ số hàng × số cột + chỉ số cột**. Với hàng 3, cột 1 và 8 cột: `3 × 8 + 1 = 25`.

Ví dụ thứ hai trong bài: phần tử có tọa độ (3, 1) trên ma trận 5 cột cho ra index **8**, tính bằng `1 × 5 + 3`. Cùng một quy tắc, chỉ khác cách gọi tên trục.

---

### 🔗 Ánh xạ thread/block sang chỉ số

Với 1D, công thức quen thuộc:

```cuda
int ix = threadIdx.x + blockIdx.x * blockDim.x;
```

Với 2D, áp dụng cho từng chiều:

```cuda
int ix = threadIdx.x + blockIdx.x * blockDim.x;  // cột
int iy = threadIdx.y + blockIdx.y * blockDim.y;  // hàng
int index = iy * Nx + ix;                        // Nx = số cột
```

`ix` chọn phần tử trong hàng, `iy` chọn hàng, `Nx` là kích thước ma trận theo x (số cột).

Ví dụ trong bài: ma trận **6 hàng × 8 cột**; grid **3 × 2 = 6 block**; mỗi block **blockDim = (4, 2)** nên 8 thread. Xét phần tử có index bộ nhớ **44**:

1. `threadIdx.x = 0`, `blockIdx.x = 1`, `blockDim.x = 4` → `ix = 0 + 1×4 = 4`.
2. `threadIdx.y = 1`, `blockIdx.y = 2`, `blockDim.y = 2` → `iy = 1 + 2×2 = 5`.
3. `index = 5 × 8 + 4 = 44`. Khớp.

Tóm gọn trong hai câu: **thread ID + block ID cho ra `ix`, `iy`; đem `iy`, `ix` ghép với số cột cho ra memory index**.

---

### ⌨️ Code kernel khác gì

Chỉ thêm phần tính `iy` và đổi cách index:

```cuda
__global__ void matrixAdd(float* a, float* b, float* c, int nx, int ny) {
    int ix = threadIdx.x + blockIdx.x * blockDim.x;
    int iy = threadIdx.y + blockIdx.y * blockDim.y;
    int index = iy * nx + ix;
    c[index] = a[index] + b[index];
}
```

Trong `main`, kích thước cấp phát là `nx * ny * sizeof(float)`, khác vector chỉ nhân một chiều. Grid size tính bằng công thức làm tròn lên:

```cuda
dim3 block(32, 32);
dim3 grid((nx + block.x - 1) / block.x,
          (ny + block.y - 1) / block.y);
matrixAdd<<<grid, block>>>(d_a, d_b, d_c, nx, ny);
```

In hai phần tử đầu của A, B, C để kiểm tra, ví dụ `8.4 + 7.8`.

---

### 📊 Kết quả profiling

Với ma trận **4096 × 4096** và block **32 × 32**:

* Block = 1024 thread, grid = **128 × 128 = 16 384 block**.
* Tổng thread = 16 384 × 1024 = **16 777 216**, đúng bằng số phần tử `4096 × 4096`.
* Occupancy: **50 %**.
* **Block limit warps = 1** → mỗi SM chỉ chạy một block. Lý do: mỗi block đã dùng 32 warp, gần chạm giới hạn warp của SM.

Đổi sang block **16 × 16** (256 thread):

* Block limit warps = **6** → 6 block/SM.
* Occupancy: **74 %**.
* Thời gian thực thi (script `run_inside.sh`): **478 µs**.

Quay lại **32 × 32**, thời gian lớn hơn. Hit rate L1 gần 0 %, L2 khoảng 33 % ở cả hai trường hợp.

---

### ✅ Chốt lại

Cộng ma trận bằng 2D chỉ khác vector ở chỗ thêm `iy` và ghép index. Điều đáng nhớ là ràng buộc `blockDim.x × blockDim.y ≤ 1024` và cái giá của block quá lớn: 1024 thread/block khiến mỗi SM chỉ chạy một block, occupancy 50 %. Giảm xuống 16 × 16 cho 6 block/SM và occupancy 74 %, nhanh hơn rõ rệt. Bài sau sẽ đào vào câu hỏi vì sao L1 hit rate lại bằng 0.
