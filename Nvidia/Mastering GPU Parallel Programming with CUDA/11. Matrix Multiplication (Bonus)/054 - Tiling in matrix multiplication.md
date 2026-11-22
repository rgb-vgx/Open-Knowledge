---
title: 'Chọn tile size sao cho khớp số Streaming Multiprocessor'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 54
status: edited
source: '054 - Tiling in matrix multiplication.md'
categories:
- Nvidia
tags: []
---

# 🎯 Chọn tile: bài toán khớp phần cứng

> Nguồn: `054 - Tiling in matrix multiplication.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46549331)

Tile 16×16 tốt hơn 32×32 trong ví dụ trước — nhưng đó chỉ là một điểm dữ liệu, không phải quy tắc. Bài này đưa ra tiêu chí chọn tile: **số tile phải là bội của số SM**. Chọn sai, một nửa GPU ngồi không ở lượt chạy cuối.

### 📋 Ba tham số chi phối

1. **Kích thước ma trận** — vuông hay chữ nhật, có chia hết cho tile không.
2. **Số SM của GPU** — quyết định cần bao nhiêu tile để lấp đầy phần cứng.
3. **Tile size** — ảnh hưởng trực tiếp hiệu năng và phải vừa shared memory.

Số thứ hai hay bị bỏ qua. Ví dụ GPU có **16 SM** mà tile chia ra **50 tile**: lượt đầu 16 SM chạy 16 tile, lượt hai 16 tile, lượt ba 16 tile, lượt bốn chỉ còn 2 tile — 14 SM ngồi không. Tổng thời gian bị kéo dài bởi lượt cuối lẻ loi đó.

Nguyên tắc: **số tile nên là bội số của số SM**, và nếu có thể thì đúng bằng số SM để mỗi SM chạy đúng một tile trong một wave.

### ✅ Trường hợp tốt nhất: 40×40, 16 SM, tile 10×10

* `40 / 10 = 4` tile mỗi chiều → `4 × 4 = 16` tile.
* 16 tile / 16 SM = **1 wave**, mỗi SM một tile, không SM nào rảnh.

Đây là cấu hình lý tưởng. Nhưng không chỉ cần "chia hết" — phải kiểm cả hai điều kiện:

* Tile **4×4** cũng chia hết (`40/4 = 10` → `10 × 10 = 100` tile). Nhưng 100 không phải bội của 16 → lượt cuối 4 tile, 12 SM rảnh. **Không tốt.**
* Tile **24** → 2 tile mỗi SM ở lượt đầu (32), còn 24 − 16 = 8 tile ở lượt sau → nửa số SM rảnh. **Không tốt.**
* Tile **32** → 16 tile chia 16 SM, nhưng nếu ma trận lớn hơn nhiều thì tile 32 lớn có thể không vừa shared memory.

Ba tham số ràng buộc lẫn nhau — chọn tile là bài toán cân bằng, không có công thức đóng.

### 📐 Ma trận không chia hết: đệm cột 0

Ma trận 31 cột không chia được cho tile 16 hay 10. Hai hướng:

* **Đệm (pad)**: thêm cột (hoặc hàng) toàn **0** cho đủ bội của tile. Phần đệm không ảnh hưởng kết quả vì nhân với 0. Đây là cách phổ biến trong thư viện thật (cuBLAS, CUTLASS đều pad).
* **Đổi tile size**: chọn tile mà kích thước ma trận chia hết, rồi kiểm lại số tile có phải bội của SM.

Lưu ý: đệm xong vẫn phải kiểm điều kiện thứ hai. 32 không chia hết cho 10, nên phải chọn tile khác.

### ❌ Ba kiểu tiling tệ

Giả định GPU có **16 SM**:

| Ma trận | Tile | Số tile | Vấn đề |
|---|---|---|---|
| 40×40 | 10×10 | 16 | ✅ hoàn hảo, 1 wave |
| 40×50 | 10×10 | 4 × 5 = 20 | Lượt 2 chỉ 4 tile → **12 SM rảnh** |
| 40×41 | 10×10 | 4 × 5 = 20 (chia nguyên) | Như trên, **và** tile cuối chỉ có **1 cột** |

Trường hợp 40×41 tệ nhất: vừa lệch bội số, vừa sinh tile rỗng. Tile cuối chỉ một phần tử nghĩa là một block 256 thread chỉ tính được một giá trị C — lãng phí gần như toàn bộ.

Với 40×50, kích thước chia hết tile (điều kiện 1 đạt) nhưng số tile 20 không phải bội của 16 (điều kiện 2 hỏng). Đây là kiểu sai dễ mắc nhất, vì chỉ nhìn "chia hết" là tưởng ổn.

### 🔢 Tile không nhất thiết vuông

Với ma trận chữ nhật, không cần tile vuông. Có thể dùng **32×16**, **32×8**, **8×16**… miễn:

* Kích thước mỗi chiều của ma trận chia hết cho kích thước tile tương ứng (hoặc pad).
* Tổng số tile là bội của số SM.

Ví dụ ma trận **64×32**, chia x thành 4 phần (`64/4 = 16` cột mỗi tile), y thành 8 phần (`32/8 = 4` hàng mỗi tile):

* Tile size = **16×4**, số tile = `4 × 8 = 32`.
* Nếu GPU có **32 SM** (hoặc bội của 32) → một wave hoàn hảo.

Đừng nhầm **tile size** với **số tile** — hai con số khác nhau và đều quan trọng.

### 📈 Vẽ biểu đồ trước khi chọn

Giảng viên khuyên vẽ thời gian chạy theo từng phương án tile (16, 24, 32…). Đồ thị thường có dạng răng cưa: phương án chia đẹp cho thời gian thấp, phương án lẻ cho thời gian cao đột biến. Nhìn đồ thị nhanh hơn thử mò.

Các ví dụ trong bài lấy từ **GTC (GPU Technology Conference)** của NVIDIA — hàng trăm lecture mỗi năm về tính toán khoa học, AI, LLM, công cụ. Bản ghi cũ có ở **GTC on demand**.

### ⚡ Vì sao bài sau chuyển sang tensor core

Trên Ampere, tensor core cho phép nhân ma trận nhanh gấp **khoảng 9 lần** so với core thường. Vì thế trong thực tế gần như mọi matmul hiệu năng cao đều dùng tensor core, còn các kỹ thuật tiling/shared memory ở đây là nền tảng để hiểu cách chúng hoạt động bên dưới.
