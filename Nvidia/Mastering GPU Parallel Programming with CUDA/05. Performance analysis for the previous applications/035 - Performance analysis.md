---
title: 'Phân tích hiệu năng theo block size'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 35
status: edited
source: '035 - Performance analysis.md'
categories:
- Nvidia
tags: []
---

# 📊 Phân tích hiệu năng theo block size

> Nguồn: `035 - Performance analysis.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46204947)

Bài này giữ nguyên kernel vector addition, chỉ thay đổi **block size** rồi đo lại các metric để xem thay đổi đó ảnh hưởng thế nào. Thay vì chạy tay hàng chục lần, một script Python chạy `ncu` cho block size từ 32 đến 1024, thu kết quả vào CSV và vẽ đồ thị.

### 🔁 Chuẩn bị ứng dụng

Kernel cộng hai vector và ghi vào vector thứ ba. Điểm khác so với các bài trước: block size đọc từ **tham số dòng lệnh** thay vì hard-code.

```bash
nvcc -o test.x "test_01.cu"
./test.x 256
```

Tham số `256` là số thread mỗi block. Không truyền tham số thì chương trình không chạy.

---

### 🐍 Script chạy nhiều cấu hình

Các metric cần đo:

* **Thời gian thực thi**.
* **Số active cycle** (đo thời gian bằng cycle thay vì giây).
* **L1 hit rate**, **L2 hit rate**.
* **Occupancy**.
* **Branch efficiency** — sẽ dùng ở phần divergence.
* **DRAM throughput** — GB/giây, nên phụ thuộc thời gian chạy.

Script lặp block size từ **32** đến **1024**, bước **32** (mỗi bước một warp):

```python
for block in range(32, 1024 + 1, 32):
    cmd = ["ncu", "--csv", "--metrics", ",".join(metrics),
           "./test.x", str(block)]
    out = subprocess.run(cmd, capture_output=True, text=True).stdout
    # tách dòng, lấy tên metric và giá trị, ghi vào CSV
```

Mỗi lần chạy lấy output dạng CSV, bỏ dấu phẩy và dấu ngoặc kép thừa, chỉ giữ **tên metric** và **giá trị**. Header CSV gồm block size và tên từng metric; sau đó vẽ mỗi metric theo trục x là block size.

Vì sao bắt đầu từ 32: **một warp = 32 thread**, đây là block size nhỏ nhất có nghĩa. Vì sao dừng ở 1024: whitepaper phần cứng quy định **tối đa 1024 thread/block**.

---

### 📉 Kết quả: block 32 thread chậm nhất

Đồ thị thời gian và active cycle cho thấy block size **32** có giá trị lớn nhất; các block size còn lại gần như bằng nhau và thấp hơn rõ rệt. Dùng một warp/block là cấu hình tệ nhất.

Hit rate:

* **L1 = 0** ở mọi block size — đổi block size không đổi cách truy cập global memory, nên cùng sector, cùng byte được đọc. Muốn thay đổi phải đổi **stride** giữa các phần tử, điều chưa làm ở đây.
* **L2 ≈ 33 %** ở mọi cấu hình, chỉ nhích nhẹ.

**DRAM throughput** và **warp occupancy** đi ngược với thời gian: block 32 thấp nhất, các cấu hình khác cao hơn. Vậy chỉ cần so block 32 với một cấu hình bất kỳ, ví dụ 64.

---

### 🌊 Số wave: vì sao block 64 nhanh hơn block 32

Lấy số liệu từ Nsight Compute cho block 32:

* Block size: **32**, grid size rất lớn (mỗi SM nhận hơn 13.000 block).
* **Allocated active blocks/SM: 16** (min của các block limit).
* Số SM của GPU: **38**.
* Số wave mỗi SM = grid size / (16 × 38) = **862**. Nsight Compute cũng báo đúng 862.

**Wave** là một lượt 16 block chạy đồng thời trên một SM. Hết wave, SM nhận wave tiếp theo. Trong lúc một wave đang chạy, không thể lấy thêm block dù các block đang stall.

Với block 32 thread (1 warp), mỗi wave có 16 warp. Với block 64 thread (2 warp), cùng 16 block active nhưng mỗi block 2 warp → **32 warp** chạy đồng thời. Khi warp này chờ memory (khoảng 30 cycle nếu trúng L1, 200 nếu trúng L2, 300–400 nếu ra global), scheduler có nhiều warp khác để chuyển sang, nhờ đó **ẩn latency** tốt hơn. Đó là lý do block 64 giảm thời gian thực thi so với block 32.

Cần phân biệt **assigned blocks** (có thể hàng nghìn mỗi SM) với **allocated active blocks** (chạy đồng thời, ở đây là 16).

---

### ✅ Chốt lại

Chỉ đổi block size đã đủ tạo khác biệt: một warp/block là cấu hình chậm nhất vì quá ít warp để ẩn độ trễ. L1 hit rate 0 và L2 khoảng 33 % không đổi theo block size, nên muốn cải thiện bộ nhớ phải đổi cách truy cập. Cách làm đáng học ở đây là tự động hóa: một script quét nhiều cấu hình, gom CSV và vẽ đồ thị, thay vì đọc thủ công từng bảng.
