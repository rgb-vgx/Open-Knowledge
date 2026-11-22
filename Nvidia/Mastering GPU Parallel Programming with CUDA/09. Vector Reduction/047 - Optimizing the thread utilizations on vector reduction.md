---
title: 'Vector reduction: tăng việc mỗi thread, occupancy lên 90%'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 47
status: edited
source: '047 - Optimizing the thread utilizations on vector reduction.md'
categories:
- Nvidia
tags: []
---

# 🧵 Giao nhiều việc hơn cho mỗi thread

> Nguồn: `047 - Optimizing the thread utilizations on vector reduction.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46545257)

Nguyên tắc tối ưu áp dụng cho **mọi** ứng dụng CUDA, không riêng reduction: **tăng khối lượng việc mỗi thread** để dùng hết phần cứng. Ở reduction, một nửa thread đang ngồi không — sửa chỗ đó đưa kernel đầu từ 176 µs xuống **100 µs**, occupancy lên gần **90%**.

### ❓ Vấn đề: nửa số thread vô ích

Với block 256 thread và vector 256 phần tử mỗi block, số thread bằng số phần tử. Nhưng chỉ thread chẵn làm việc, vì mỗi thread xử lý **hai** phần tử liền nhau. Tức 128 thread idle trong mỗi block — phần cứng vẫn cấp slot cho chúng, occupancy và SM utilization bị kéo xuống.

### ➗ Ý tưởng: mỗi block "gánh" 512 phần tử

Cho mỗi block 512 phần tử thay vì 256, vẫn 256 thread. Kernel có thêm một bước đầu:

1. **Bước gộp**: 512 phần tử chia đôi. Cộng nửa sau vào nửa trước: `a[i] += a[i + 256]`.
2. Kết quả còn **256** phần tử — đúng bằng block size.
3. Từ đây chạy y nguyên kernel cũ: 256 phần tử, 256 thread, block 256.

Không cần sửa gì trong vòng lặp! Chỉ thêm vài dòng trước nó. Đó là điểm hay của cách làm: bước gộp biến bài toán về đúng dạng cũ.

### 🧮 Index và stride của bước gộp

Stride giữa hai phần tử cần cộng chính là **block size** (256): phần tử `i` cộng với `i + 256`.

Vì mỗi block xử lý 512 phần tử, block 1 bắt đầu ở phần tử 512 chứ không phải 256. Công thức index:

```cuda
int index = blockDim.x * blockIdx.x * 2 + threadIdx.x;  // nhân 2
```

Nhân **2** vì số thread chỉ bằng **một nửa** số phần tử. Không nhân 2 thì block 1 sẽ ghi đè lên vùng của block 0.

Bước gộp:

```cuda
d_input[index] += d_input[index + blockDim.x];
```

Sau lệnh này, mỗi thread đã cộng hai phần tử cách nhau `blockDim.x`, nên dữ liệu đã "dồn" về nửa đầu của chunk. Vòng lặp giảm dần stride như cũ chạy trên phần đầu đó.

### 📉 Grid size giảm một nửa, ít wave hơn

Cùng vector 1 triệu phần tử:

* Cấu hình cũ: 256 phần tử/block → **4096 block**.
* Cấu hình mới: 512 phần tử/block → **2048 block**.

Trong `main`, cả `block_size` lẫn cổng tính grid đều phải phản ánh việc mỗi block gánh 512 phần tử. Grid giảm nửa nghĩa là **số wave mỗi SM giảm nửa** — đây là nguồn lợi chính, không phải bản thân con số grid.

### 📊 Kết quả

| Phiên bản | Kernel 1 | Ghi chú |
|---|---|---|
| Baseline | 283 µs | có bộ lọc modulo |
| Bỏ bộ lọc | 176 µs | nhanh hơn ~38% |
| Tăng việc/thread | **100 µs** | thêm bước gộp, grid giảm nửa |

* **Occupancy ~90%** — cao hơn hẳn các phiên bản trước.
* Compute utilization khoảng **66%**.
* Đáng chú ý: **~19 MB dữ liệu ghi từ L1 ra L2**. Mỗi thread đọc/ghi global memory nhiều hơn, và đây là chi phí mới xuất hiện. Giảm lượng ghi này chính là lý do dùng **shared memory** ở bài sau.
* Shared memory vẫn **0 request** vì chưa dùng.

### 🔁 Thử đảo chiều vòng lặp — và vì sao nó chậm hơn

Một biến thể phổ biến trong tài liệu NVIDIA: chạy stride **giảm dần** thay vì tăng dần.

```cuda
for (int stride = blockDim.x / 2; stride > 0; stride >>= 1) { ... }
```

Ý tưởng: cộng hai nửa xa nhau trước, mỗi lần đọc gần nhau hơn, tận dụng cache tốt hơn. Nhưng trên GPU của giảng viên, kết quả **tệ hơn**: **150 µs** so với 100 µs. Ông nhấn mạnh đây là ví dụ điển hình của việc "tài liệu nói nhanh hơn" không có nghĩa đúng trên máy bạn — phải đo.

Lưu ý giá trị khởi đầu: `blockDim.x / 2`, không phải `blockDim.x`, vì stride bằng block size thì không còn cặp nào để cộng.

### ⚡ Thay phép chia bằng phép shift

Vòng lặp giảm dần dùng `/ 2` — lại là phép chia, thứ đã chứng minh đắt ở bài trước, và lần này **mỗi thread** đều chạy nó. Thay bằng dịch bit:

```cuda
stride >>= 1;   // tương đương stride / 2
```

Dịch phải 1 bit = chia 2; dịch trái 1 bit = nhân 2. Kết quả: **98–99 µs**, cải thiện khoảng **2%** so với 100 µs. Con số nhỏ, và giảng viên cảnh báo nhiễu đo: chạy Nsight Compute hai lần trên cùng code có thể lệch vài phần trăm. Vẫn nên thử cả hai kiểu trên GPU của mình rồi chọn.

### 🎯 Chốt lại

Ba tối ưu tích lũy đã đưa kernel đầu từ **283 → 100 µs**, chủ yếu nhờ bỏ modulo và tăng việc mỗi thread. Nhưng chi phí bộ nhớ (19 MB ghi ra L2) vẫn còn nguyên — đó là lúc shared memory bước vào.
