---
title: 'Vector reduction (baseline): cộng dồn vector chỉ với global memory'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 43
status: edited
source: '043 - Vector Reduction using global memory only (baseline).md'
categories:
- Nvidia
tags: []
---

# ➕ Vector reduction: bài toán và phiên bản baseline

> Nguồn: `043 - Vector Reduction using global memory only (baseline).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46482873)

**Vector reduction** là bài toán cộng toàn bộ phần tử của một vector thành một giá trị duy nhất. Đây là bài đầu của section quan trọng nhất khóa học: mọi kỹ thuật tối ưu về sau — shared memory, unrolling, shuffle — đều được dạy trên chính bài này, và reduction cũng xuất hiện lại trong matrix multiplication.

### 🧩 Reduction khác vector addition ở đâu

* **Vector addition**: hai vector `A`, `B`, cộng từng cặp phần tử, ghi ra `C`. Mỗi thread lo một index, số thread = số phần tử.
* **Vector reduction**: chỉ **một** vector. Cộng tất cả phần tử, ghi tổng vào phần tử đầu tiên (hoặc phần tử cuối). Ví dụ 16 phần tử cộng lại được `41` và lưu vào index 0.

Bài này gọi là **reduce in place** vì ghi kết quả ngược vào chính vector đầu vào. Có biến thể dùng hai vector, nhưng baseline ở đây chỉ một.

---

### 🌳 Tree-based approach

Cách làm là chia đôi liên tiếp:

1. Bước 1: 16 phần tử, mỗi thread xử lý **hai** phần tử liền kề: `input[i] += input[i+1]`. Chỉ các thread chẵn (0, 2, 4…) làm việc; thread lẻ **idle**.
2. Bước 2: còn 8 giá trị, lại cộng cặp → 4 giá trị, dùng 4 thread.
3. Bước 3: 4 giá trị → 2, dùng 2 thread.
4. Bước cuối: 2 giá trị → 1, kết quả nằm ở `input[0]`.

Vì sao vẫn cấp 16 thread mà chỉ một nửa dùng? Vì cần số thread của **bước đầu** cho cả block, và vì bước sau vẫn lấy thread từ chính block đó theo index tăng dần — code giữ một block cố định.

Mỗi bước, **stride** tăng gấp đôi: 1 → 2 → 4 → 8. Đó là cơ sở cho vòng lặp `for` về sau.

Các giá trị trung gian ở vị trí lẻ không còn dùng nữa, nên việc tính chúng là "phép toán thừa" — vẫn chạy, vẫn tốn tài nguyên, nhưng không ảnh hưởng kết quả. Đây chính là chỗ để tối ưu ở bài sau.

---

### 🧱 Vấn đề: không có đồng bộ giữa các block

Vector lớn phải chia thành nhiều **chunk**, mỗi block xử lý một chunk. Mỗi block cho ra một **partial sum** — tổng của riêng phần mình, chưa phải tổng toàn vector.

Muốn cộng các partial sum lại phải chờ **tất cả** block xong. Nhưng CUDA **không có đồng bộ toàn cục giữa các thread block**: đồng bộ chỉ có ở mức warp, mức block (`__syncthreads()` bên trong một block) và mức kernel. Lý do NVIDIA đưa ra: đồng bộ toàn cục rất đắt trên GPU nhiều processor.

**Giải pháp: chia thành nhiều kernel.**

1. **Kernel 1**: nhiều block, mỗi block reduce một chunk → ghi partial sum.
2. Đồng bộ tự động ở ranh giới kernel (kernel trước xong mới chạy kernel sau).
3. **Kernel 2**: một block, nhận mảng partial sum và reduce tiếp thành tổng cuối.

Vector càng lớn càng có thể cần ba kernel; ví dụ trong bài chỉ cần hai. Grid size hai kernel khác nhau (8 block so với 1 block), block size có thể giống hoặc khác.

---

### 🧮 Bộ lọc thứ nhất: chỉ thread chẵn

Code lõi:

```cuda
if (tid % 2 == 0) {
    input[tid] += input[tid + 1];
}
```

`tid % 2 == 0` lọc đúng nửa số thread. Không có bộ lọc này thì thread lẻ cũng cộng dồn vào vị trí không ai dùng — vô hại về kết quả nhưng tốn công.

---

### 🛡️ Bộ lọc thứ hai: chặn tràn biên

Với 16 phần tử, thread 15 sẽ thực hiện `input[15] += input[16]` — index 16 **không tồn tại**, đó là **memory violation**. Vì vậy phải kiểm tra cả `tid + 1`, không chỉ `tid`:

```cuda
if (tid + 1 < n && tid % 2 == 0) {
    input[tid] += input[tid + 1];
}
```

Đây là lý do kernel nhận thêm tham số `n` (kích thước vector).

---

### 🔁 Vòng lặp với stride

Gộp cả bốn bước vào một vòng lặp, điều kiện lọc đổi từ `tid % 2` thành `tid % (2 * stride)`:

```cuda
int tid = threadIdx.x;
for (int stride = 1; stride < blockDim.x; stride *= 2) {
    if (tid % (2 * stride) == 0 && tid + stride < n) {
        input[tid] += input[tid + stride];
    }
    __syncthreads();
}
```

* `stride` bắt đầu bằng 1 và nhân đôi mỗi bước.
* Vòng lặp dừng khi `stride >= blockDim.x` — vì lúc đó không còn cặp nào để cộng.
* `__syncthreads()` bắt buộc: bước sau phải đọc giá trị **đã cập nhật** của bước trước. Thiếu barrier, thread có thể đọc dữ liệu cũ.

---

### 📦 Gom partial sum về vị trí liền nhau

Sau kernel 1, partial sum của block 1 nằm ở vị trí `8` chứ không phải vị trí `1`. Muốn kernel 2 chạy trên mảng gọn, phải dồn chúng về đầu vector:

```cuda
input[blockIdx.x] = input[blockIdx.x * blockDim.x];
```

Block 0 giữ nguyên vị trí 0; block 1 lấy giá trị ở `1 * 8 = 8` đưa về vị trí 1; block 2 lấy ở `2 * 8 = 16` đưa về vị trí 2… Kết quả là mảng partial sum **liên tục**, kích thước đúng bằng **số block**, sẵn sàng làm input cho kernel 2.

Phiên bản này **không** dùng shared memory, **không** dùng shuffle — chỉ đọc ghi global memory, nên gọi là baseline. Các bài tiếp theo sẽ đo nó bằng profiler rồi tối ưu dần.
