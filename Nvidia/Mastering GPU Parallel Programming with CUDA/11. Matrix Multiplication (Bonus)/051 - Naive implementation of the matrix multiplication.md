---
title: 'Matrix multiplication (naive): baseline đầu tiên'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 51
status: edited
source: '051 - Naive implementation of the matrix multiplication.md'
categories:
- Nvidia
tags: []
---

# ✖️ Matrix multiplication: bản naive và baseline

> Nguồn: `051 - Naive implementation of the matrix multiplication.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46549287)

Section bonus này dựng lại phép nhân ma trận từ con số 0 rồi tối ưu dần đến tensor core. Bài đầu là **naive implementation** — chỉ dùng global memory, không tiling, không shared memory — và đo baseline: **325 µs** cho ma trận 512×512.

### 🌍 Vì sao matmul quan trọng

* **Khoa học tính toán**: mô phỏng, tối ưu hóa, đại số tuyến tính — gần như bài nào cũng quy về nhân ma trận.
* **Deep learning**: mỗi layer của neural network thường viết được dưới dạng phép nhân ma trận; tăng tốc nó là tăng tốc train và inference.
* **Mô phỏng vật lý**: dòng chảy, cơ học lượng tử — hệ phương trình tuyến tính lớn, solver lặp, tất cả là matmul hoặc matvec.
* **Xử lý ảnh và tín hiệu**: lọc ảnh, biến đổi, phân tích tín hiệu — nhân ma trận ảnh với ma trận filter.

Chính vì vậy các hãng lớn đều có cả **thư viện** lẫn **phần cứng** chuyên dụng.

---

### 📚 Thư viện có sẵn

| Thư viện | Hãng | Đặc điểm |
|---|---|---|
| **cuBLAS** | NVIDIA | Kernel GEMM tối ưu sẵn, ít tùy biến |
| **CUTLASS** | NVIDIA | Template C++, linh hoạt, tự viết được kernel riêng |
| **Tensile** | AMD | Thư viện **cấu hình**, không viết kernel — chọn tham số rồi sinh mã |

**GEMM** = **GE**neral **M**atrix **M**ultiply. Với Tensile, các tham số cần chọn gồm kích thước ma trận, cách chia ma trận cho các SM, có prefetch hay không, có dùng shared memory hay không.

Viết kernel tay cho hiểu cơ chế; dùng thư viện khi cần hiệu năng ngay.

---

### ⚡ Tensor core so với core thường

Phần cứng chuyên dụng: NVIDIA gọi là **tensor core**, AMD gọi là **matrix core** — cùng chức năng.

Core thường xử lý một phép cộng/nhân trên vài phần tử. Tensor core xử lý **cả một khối** phần tử mỗi instruction, nên throughput chênh lệch rất lớn. Số liệu từ whitepaper A100:

| Kiểu | Tensor core | Core thường |
|---|---|---|
| FP16 | 312 TFLOPS (624 với sparsity) | 78 TFLOPS |
| TF32 | 156 TFLOPS (312 với sparsity) | — |
| FP32 | — | 19.5 TFLOPS |

Một SM của A100 có **4 tensor core**. Một instruction tensor core tốn khoảng **4 cycle** — latency cao hơn lệnh thường — nhưng số phần tử xử lý trong một lệnh nhiều gấp hàng chục lần, nên throughput ròng vẫn vượt trội. Một instruction làm việc trên cả một khối phần tử — ví dụ **16×16** phần tử half precision (2 byte mỗi phần tử) — nên dữ liệu được nạp theo khối lớn từ global memory vào shared memory, thay vì từng phần tử như lệnh add thường. Việc nhân-tích lũy thật sự do tensor core thực hiện trên các register fragment.

---

### 🧮 Công thức và hai cách lập trình

Chuẩn kích thước: **A** là **M×K**, **B** là **K×N**, **C** là **M×N**.

Điểm khác biệt cốt lõi với vector addition:

* Vector addition: **một** phần tử A + **một** phần tử B → một phần tử C.
* Matmul: **cả một hàng** của A và **cả một cột** của B → một phần tử C. Ví dụ `C[0][0] = A[0][0]·B[0][0] + A[0][1]·B[1][0] + A[0][2]·B[2][0]` — 3 nhân, 2 cộng.

**CPU** cần ba vòng lặp: `i` duyệt hàng, `j` duyệt cột, `k` duyệt chiều trong:

```cpp
for (int i = 0; i < N; i++)
  for (int j = 0; j < N; j++) {
    int sum = 0;
    for (int k = 0; k < N; k++)
      sum += A[i * N + k] * B[k * N + j];
    C[i * N + j] = sum;
  }
```

Dùng biến `sum` cục bộ rồi ghi `C` **một lần**, thay vì cộng dồn trực tiếp vào `C` mỗi vòng — tránh nhiều lần truy cập bộ nhớ.

**GPU**: bỏ hai vòng ngoài, thay bằng **thread ID**. Đó là lý do dùng **grid 2 chiều** và **block 2 chiều**:

```cuda
int row = blockIdx.y * blockDim.y + threadIdx.y;   // thay cho i
int col = blockIdx.x * blockDim.x + threadIdx.x;   // thay cho j
```

Vòng `k` **không bỏ được** — mỗi thread vẫn phải tự cộng dồn theo chiều K. Nhìn kỹ: `A` truy cập theo **hàng** (`row`), `B` theo **cột** (`col`), `C` theo cả hai.

Đây gọi là **naive** vì không có tối ưu nào: global memory, không shared memory, không tiling.

---

### 🧱 Phần main

Bảy bước quen thuộc, áp cho ma trận vuông `N = 512` (dùng một tham số thay cho M, K, N):

1. Cấp phát `h_a`, `h_b`, `h_c` bằng `new int[N*N]`; `d_a`, `d_b`, `d_c` bằng `cudaMalloc(...)`.
2. Khởi tạo random trên host, **`h_c` phải bằng 0** vì kernel cộng dồn vào `C`.
3. `cudaMemcpy(..., cudaMemcpyHostToDevice)` cho A và B.
4. Cấu hình và launch.
5. Copy `d_c` → `h_c_gpu`.
6. Kiểm chứng.
7. Giải phóng (`cudaFree`, `delete[]`).

Cấu hình kernel:

```cuda
dim3 block_size(16, 16);              // 256 thread/block
dim3 grid_size((N + 15) / 16, (N + 15) / 16);
mm_naive<<<grid_size, block_size>>>(d_a, d_b, d_c, N);
```

Cần **hai** mảng kết quả trên host: `h_c` cho CPU tính, `h_c_gpu` cho kết quả GPU copy về. Không thể dùng chung — kết quả phải giữ riêng để so sánh. Cũng không thể đọc thẳng `d_c` từ CPU, trừ khi dùng managed memory (chưa học).

Kiểm chứng bằng cách cộng **giá trị tuyệt đối hiệu** hai ma trận; bằng 0 nghĩa là khớp:

```cpp
int temp = 0;
for (int i = 0; i < N * N; i++)
    temp += abs(h_c_gpu[i] - h_c[i]);
if (temp == 0) std::cout << "Results are correct\n";
else           std::cout << "Wrong results\n";
```

Với `float` thì gần như **không bao giờ** bằng 0 tuyệt đối; phải in `temp` ra và chấp nhận sai số nhỏ.

---

### 📊 Kết quả và baseline

* Kernel naive với `int`, N = 512: **325 µs** (đo bằng Nsight Compute, chính xác hơn API runtime).
* Bản `float`: **360 µs** — dùng để có roofline single precision, vì Nsight Compute **không** có roofline cho integer.
* So sánh CPU/GPU ở N = 1024: CPU khoảng **7000 ms**, GPU **28 ms**. Chênh hàng trăm lần — nhưng chỉ với ma trận đủ lớn, vì GPU còn overhead copy dữ liệu host↔device.

Nhận xét từ profiler: compute và memory throughput đều đạt **95–97%** — trông như đã tối ưu hết. Nhưng roofline cho thấy điểm nằm **bên phải ridge point**, nghĩa là ứng dụng vừa compute-bound vừa gần trần bộ nhớ, cần tối ưu **cả hai phía**. Đó là lý do bài sau dùng **tiling + shared memory**: giảm lượng đọc global memory, đồng thời tái sử dụng dữ liệu đã nạp.

Với `N = 512`, mỗi phần tử của A được đọc lại **N lần** từ global memory — đây chính là chỗ tiling sẽ cắt.
