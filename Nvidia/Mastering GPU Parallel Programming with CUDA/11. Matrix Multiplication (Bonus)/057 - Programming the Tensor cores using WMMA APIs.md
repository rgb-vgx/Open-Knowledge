---
title: 'WMMA API: lập trình tensor core ở mức warp'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 57
status: edited
source: '057 - Programming the Tensor cores using WMMA APIs.md'
categories:
- Nvidia
tags: []
---

# 🧩 WMMA API: điều khiển tensor core từ C++

> Nguồn: `057 - Programming the Tensor cores using WMMA APIs.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/48364935)

**WMMA** (*Warp Matrix Multiply Accumulate*) là API C++ trong CUDA cho phép gọi tensor core trực tiếp. Điểm khác biệt lớn nhất so với các bài trước: đơn vị công việc là **warp**, không phải block, và dữ liệu được nạp vào **register fragment**, không qua shared memory.

### 🔁 Bốn bước của mọi kernel matmul

Dù dùng core thường hay tensor core, cấu trúc vẫn gồm bốn bước:

1. **Partition / tiling**: chia A, B, C thành các tile.
2. **Load**: đưa tile A và B từ global memory vào bộ nhớ nhanh. C không load, chỉ store.
3. **Execute**: nhân và tích lũy kết quả vào một biến trung gian.
4. **Store**: ghi kết quả từ bộ nhớ nhanh ra C ở global memory.

Khác biệt ở bước 2 và 3: bản core thường nạp vào **shared memory**, bản WMMA nạp thẳng vào **register fragment**.

### 🧠 Vì sao là "Warp"

Gọi là `Warp Matrix Multiply Accumulate` vì mỗi tile gắn với **một warp** (32 thread), không phải một block.

Hệ quả kỹ thuật: CUDA **không có biến dựng sẵn `warpId`** như `threadIdx` hay `blockIdx` — phải tự tính. Công thức (grid 1 chiều):

```cuda
int warp_id = (threadIdx.x / 32) + blockIdx.x * (blockDim.x / 32);
```

Với grid 2 chiều, gộp `blockIdx.x` và `blockIdx.y` thành một chỉ số tuyến tính trước:

```cuda
int bid = blockIdx.x + blockIdx.y * gridDim.x;
int warp_id = (threadIdx.x / 32) + bid * (blockDim.x / 32);
```

Kiểm tra bằng ví dụ block 128 thread: `warp_id` của block 0 là 0…3 vì `threadIdx.x / 32` cho 0 đến 3. Sang block 1, `threadIdx.x` lại bắt đầu từ 0, nên phải cộng thêm `1 * (128/32) = 4` để warp đầu của block 1 thành warp 4. Thiếu số hạng này thì hai block sẽ tranh nhau cùng bốn tile.

Sau khi có `warp_id`, gán tile:

```cuda
int tiles_per_row = N / 16;
int tile_row = warp_id / tiles_per_row;
int tile_col = warp_id % tiles_per_row;
```

### 📦 Fragment

**Fragment** là một lớp (overload class) chứa một phần ma trận, **phân tán trên toàn bộ thread của warp**. Không phải mảng thông thường — mỗi thread giữ vài phần tử, và phần cứng biết cách phối hợp chúng khi thực hiện MMA. Đó là lý do không thể tự `fragment[i]` để truy cập từng phần tử.

Kích thước fragment phải thuộc danh sách **được hỗ trợ**, không tùy ý như tile của core thường. Với half precision, CUDA C Programming Guide liệt kê `16×16×16`, `32×8×16`, `8×32×16`. Bảng kiểu dữ liệu cũng cố định: half × half → **float accumulator** (hoặc half), không có tùy chọn khác.

### 🗂️ Layout: row-major và column-major

**Row-major**: cả hàng nằm liền nhau — `a, b, c, d, e, f`.
**Column-major**: cả cột nằm liền nhau — `a, d, b, e, c, f`.

Vì sao quan trọng: matmul cần đọc A **theo hàng** và B **theo cột**. Nếu B lưu column-major thì cột của B nằm liền nhau trong bộ nhớ, một request lấy được cả cột. Nếu B lưu row-major, ba phần tử của cùng một cột cách nhau đúng `N` phần tử, phải ba request riêng và dễ cache miss.

Trong WMMA, layout được khai báo lúc tạo fragment:

```cpp
wmma::fragment<wmma::matrix_a,    16, 16, 16, half, wmma::row_major>    a_frag;
wmma::fragment<wmma::matrix_b,    16, 16, 16, half, wmma::col_major>    b_frag;
wmma::fragment<wmma::accumulator, 16, 16, 16, float>                   c_frag;
```

### 🛠️ Các hàm chính

| Hàm | Việc |
|---|---|
| `wmma::fill_fragment(frag, 0.0f)` | Khởi tạo fragment bằng hằng số |
| `wmma::load_matrix_sync(frag, ptr, lda)` | Nạp tile từ bộ nhớ vào fragment |
| `wmma::mma_sync(d, a, b, c)` | `d = a*b + c` trên tensor core |
| `wmma::store_matrix_sync(ptr, frag, ldc, layout)` | Ghi fragment ra bộ nhớ |

Kernel điển hình:

```cuda
wmma::fill_fragment(c_frag, 0.0f);

for (int k = 0; k < K; k += 16) {
    wmma::load_matrix_sync(a_frag, a_ptr + k, lda);
    wmma::load_matrix_sync(b_frag, b_ptr + k * ldb, ldb);
    wmma::mma_sync(c_frag, a_frag, b_frag, c_frag);
}

wmma::store_matrix_sync(c_ptr, c_frag, ldc, wmma::mem_row_major);
```

`mma_sync` nhận **cả C làm tham số thứ tư** — đó là ý nghĩa "accumulate": kết quả mới cộng dồn vào kết quả cũ, thay vì ghi đè.

### 📏 Tham số `lda`, `ldb`, `ldc` — leading dimension

Địa chỉ một tile không chỉ phụ thuộc vị trí tile mà còn **số phần tử mỗi hàng** của ma trận gốc. Muốn nhảy từ hàng này sang hàng kế tiếp phải cộng **`lda`** (leading dimension). Trong đa số trường hợp ma trận vuông không pad thì `lda = N`, nhưng nếu ma trận được đệm (padding) để căn hàng thì `lda > N`.

Vì vậy `lda`, `ldb`, `ldc` là tham số bắt buộc của kernel, không thể hard-code `N`.

Cộng offset theo tile:

* Cột thứ `k` của tile: `a + k + tile_row * 16 * lda` — `k` chạy theo bước 16.
* Hàng tương ứng bên B: `b + k * ldb + tile_col * 16`.

### ⚠️ Yêu cầu kiến trúc

WMMA cần **compute capability ≥ 7.0** (Volta trở lên), đơn giản vì trước Volta GPU không có tensor core. Biên dịch không đặt `-arch=sm_70` trở lên sẽ báo lỗi `nvcuda::wmma` không tồn tại — đúng lỗi đã gặp ở bài trước.

### 🎯 Vì sao học WMMA

Tài liệu online hầu hết chỉ nói về cuBLAS/CUTLASS và bỏ qua WMMA. Nhưng hiểu WMMA là hiểu **cơ chế**: fragment, layout, leading dimension, warp-level tiling. Đó chính là những thứ CUTLASS tinh chỉnh ở mức cực đoan để đạt hiệu năng cao nhất. Bài sau sẽ chạy một ví dụ WMMA hoàn chỉnh.
