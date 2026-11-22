---
title: 'Vector reduction: bỏ bộ lọc modulo để tăng tốc 40%'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 45
status: edited
source: '045 - Optimizing the vector reduction (removing the filter).md'
categories:
- Nvidia
tags: []
---

# 🚀 Tối ưu đầu tiên: xóa phép chia lấy dư

> Nguồn: `045 - Optimizing the vector reduction (removing the filter).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46502267)

Tối ưu đầu tiên của vector reduction không đụng đến bộ nhớ, cũng không đụng đến cách chia block. Nó chỉ xóa **một** phép toán: `tid % (2 * stride)`. Kết quả là kernel đầu nhanh hơn gần 40%, và bài học rút ra là trên GPU, phép chia lấy dư đắt hơn nhiều so với tưởng.

### 🔁 Gộp ba lần launch thành while loop

Trước khi tối ưu, code được dọn lại cho gọn: ba lần gọi kernel viết tay (grid 4096 → 16 → 1) thay bằng vòng lặp.

```cuda
int grid_size = (n + block_size - 1) / block_size;
reduce_in_place<<<grid_size, block_size>>>(d_input, n);
cudaDeviceSynchronize();

while (grid_size > 1) {
    n = grid_size;
    grid_size = (n + block_size - 1) / block_size;
    reduce_in_place<<<grid_size, block_size>>>(d_input, n);
    cudaDeviceSynchronize();
}
```

Cách vòng lặp chạy với `n` ban đầu 1.048.576, block 256:

1. Trước vòng lặp: `grid_size = 4096`, chạy kernel 1 với `n = 1.048.576`.
2. `4096 > 1` → `n = 4096`, grid mới = `(4096 + 255) / 256 = 16`, chạy kernel 2.
3. `16 > 1` → `n = 16`, grid mới = `(16 + 255) / 256 = 1`, chạy kernel 3 (một block).
4. `1 > 1` sai → thoát. Đúng ba lượt kernel, khớp kết quả đo.

Điều kiện dừng `grid_size > 1` tương đương "khi số block còn lớn hơn 1 thì vẫn cần giảm tiếp". Build lại và so CPU/GPU để chắc vòng lặp không làm sai kết quả — chạy đúng, thời gian không đổi: **283 / 16 / 13 µs**.

---

### ❓ Bộ lọc đang làm gì

Bộ lọc `tid % (2 * stride) == 0` chọn đúng nhóm thread cần chạy ở mỗi bước: bước 1 là `0, 2, 4…14`, bước 2 là `0, 4, 8, 12`, bước 3 là `0, 8`, bước cuối là `0`.

Nếu bỏ bộ lọc, **mọi** thread đều chạy `input[i] += input[i + stride]`. Thread lẻ cũng cộng dồn vào vị trí của nó, ví dụ `input[1]` thành `9` thay vì giữ `1`. Nhưng bước sau chỉ đọc các vị trí `0, 2, 4…` với stride 2 — **không ai đọc `input[1]` nữa**. Vậy giá trị "rác" ở vị trí lẻ không ảnh hưởng tổng cuối.

Kết luận: bộ lọc chỉ để tiết kiệm công, không cần cho tính đúng. Mà công nó tiết kiệm thì ít hơn nhiều so với cái giá nó gây ra.

---

### 💸 Modulo đắt thế nào

Trong bài báo giảng viên dẫn về latency instruction trên GPU:

| Phép toán | Latency |
|---|---|
| Cộng | ~2–4 cycles |
| Nhân | ~4–9 cycles |
| Chia / lấy dư | **~290 cycles** |

`%` và `/` đắt hơn cộng vài chục đến cả trăm lần. Với vòng lặp chạy nhiều bước và mỗi thread đều phải tính modulo, chi phí này nhân lên theo số thread.

---

### 📉 Kết quả đo

Bỏ `tid % (2 * stride) == 0`, chỉ giữ kiểm tra biên `tid + stride < n`:

* Kernel 1: **283 µs → 176 µs**, nhanh hơn **~40%**.
* Kernel 2 và 3: nhanh hơn gần **100%** (thời gian gần như giảm một nửa).
* **L1 throughput tăng ~134%**.

Trong Nsight Compute, dùng **Add Baseline** để so report hiện tại (B, không lọc) với baseline (A, có lọc): cột xanh là hiện tại, cột xanh lá là baseline; giá trị duration âm nghĩa là nhanh hơn.

---

### 🔬 Bằng chứng trong assembly

So assembly của hai phiên bản:

* **Có bộ lọc**: khối `if` sinh ra **hơn 50–60 instruction** — branching, step, move, thậm chí cả đồng bộ — chỉ để tính modulo. Lệnh load dữ liệu nằm tận **dòng 131**.
* **Không bộ lọc**: `if` chỉ còn **6 instruction** (dòng 42–47), lệnh load lên **dòng 66**. Riêng lệnh load này chiếm **~9%** stall.

Điều thú vị: khối `if` nhỏ vậy mà vẫn chiếm **~60%** stall của ứng dụng — vì nó chứa **lệnh load từ global memory**, thứ luôn chậm. Bỏ modulo chỉ làm khối `if` gọn lại; nút cổ chai bộ nhớ vẫn còn, và đó là mục tiêu của các bài sau.

Phần còn lại giải thích vì sao một dòng CUDA sinh nhiều assembly: compiler **unroll** vòng lặp. Chưa cần hiểu sâu ở bước này.

---

### 🐞 Kiểm chứng bằng debugger

Đặt breakpoint trong kernel, chạy **Start CUDA Debugging**, xem mảng `input` trong cửa sổ Memory sau khi warp đầu chạy xong:

* **Có bộ lọc**: chỉ phần tử 0, 2, 4… đổi giá trị (ô đỏ cách quãng).
* **Không bộ lọc**: **mọi** phần tử đều đổi.

Đúng như dự đoán, và tổng cuối vẫn khớp CPU — xác nhận tối ưu này an toàn.
