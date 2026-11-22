---
title: 'Phân tích hiệu năng bằng Nsight Compute dòng lệnh'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 33
status: edited
source: '033 - Nsight Compute performance using command line analysis.md'
categories:
- Nvidia
tags: []
---

# 🔬 Phân tích hiệu năng bằng Nsight Compute dòng lệnh

> Nguồn: `033 - Nsight Compute performance using command line analysis.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/33395236)

Mọi profiler đều có hai cách phân tích: **command line** và **GUI**. Nsight Compute có cả hai. Bài này đi sâu vào dòng lệnh — cách nhanh để lấy đúng vài metric của một đơn vị phần cứng, và cách đọc tên metric để không lạc giữa hàng trăm nghìn chỉ số.

### 🧭 Khi nào dùng dòng lệnh

* Cần thu vài metric để đánh giá một đơn vị phần cứng cụ thể → dòng lệnh là đủ và gọn.
* Cần cái nhìn sâu, roofline, biểu đồ, mức dùng từng đơn vị → dùng GUI.

Cú pháp cơ bản:

```bash
ncu ./vector_add
ncu --export profile ./vector_add
```

`--export` ghi kết quả ra file. Mặc định lệnh đơn giản in ra **bốn section**.

---

### 🗂️ Section: chọn nhóm phân tích

Bốn section mặc định:

1. **GPU Speed Of Light Throughput** — throughput của DRAM, L1/L2, mức dùng SM.
2. **Launch Statistics** — block size, grid size, register/thread, shared memory.
3. **Occupancy** — theoretical và achieved occupancy.
4. **GPU and Memory Workload Distribution** — active cycle của DRAM, L1, L2.

Không chỉ có bốn. Bộ section đầy đủ đánh số từ 4 đến 27, tức khoảng **23 section**, mỗi section có **identifier** dùng trên dòng lệnh. Ví dụ chạy riêng launch statistics:

```bash
ncu --section LaunchStats ./vector_add
```

Section khác đáng chú ý: **SchedulerStats** (liên quan warp scheduler trong từng partition), **WarpStateStats**, **MemoryWorkloadAnalysis**, **ComputeWorkloadAnalysis**, và section cho NVLink.

---

### 📊 Metric: cấu trúc tên

Nsight Compute có khoảng **100 000 metric** (file query ra hàng trăm nghìn dòng, trừ dòng trống còn khoảng 100 nghìn). Không đọc hết, chỉ cần hiểu quy tắc đặt tên:

```text
<hardware_unit>__<metric>.<modifier>
```

* Phần trước `__`: **đơn vị phần cứng** — `dram`, `gpu`, `l1tex` (L1 texture cache), `lts` (L2 cache), `sm` (streaming multiprocessor).
* Phần sau `__`: **metric**, ví dụ `bytes`, `t_sectors`, `active_cycles`, `inst_executed`.
* Sau dấu `.`: một trong bốn modifier — **min**, **max**, **avg**, **sum**.

Modifier hiểu như sau: min/max là nhỏ nhất/lớn nhất trên các SM; **avg** là trung bình trên các SM; **sum** là tổng trên toàn GPU.

Ví dụ thực tế:

```bash
ncu --metrics l1tex__t_sector_hit_rate.pct ./vector_add
```

Kết quả là **0 %** — hit rate L1 cực thấp, nghĩa là gần như mọi truy cập đều phải ra global memory (hàng trăm cycle) thay vì trúng L1 (khoảng 30 cycle). Ứng dụng có vấn đề về bộ nhớ.

---

### 🧮 Đọc nhanh một khối metric

Khi query toàn bộ, mỗi metric thường xuất hiện thành bốn dòng liên tiếp: **avg**, **max**, **min**, **sum**, rồi mới sang metric kế tiếp. Nắm nhịp này thì đọc file vài trăm nghìn dòng vẫn nhanh: xác định metric, đọc unit, rồi chọn modifier cần.

Có thể lấy cả bộ modifier bằng cách bỏ phần `.modifier`. Ví dụ:

```bash
ncu --metrics sm__inst_executed ./vector_add
```

sẽ trả về avg, max, min, sum cùng lúc. Lưu ý: `sum` xấp xỉ `avg × số SM` — giảng viên đối chiếu đúng hệ thức này với số SM của GPU.

Vài metric đáng nhớ:

* `gpu__time_duration.sum` — thời gian chạy kernel.
* `dram__bytes.sum` — số byte truy cập DRAM.
* `lts__t_sector_hit_rate.pct` — hit rate L2.
* `sm__inst_executed` — số instruction thực thi trên SM.

Mỗi sector trong GPU NVIDIA là **32 byte**, nên từ số sector suy ra số byte.

---

### 📤 Xuất CSV và lọc theo regex

Xuất bảng ra CSV để mở bằng Excel:

```bash
ncu --csv --metrics l1tex__t_sector_hit_rate.pct ./vector_add > out.csv
```

Lọc toàn bộ metric của một đơn vị phần cứng bằng regex:

```bash
ncu --metrics "regex:.*shared.*" --csv ./vector_add > shared.csv
```

Có thể thay `shared` bằng `l1tex`, `lts`, `sm`... Kết quả là toàn bộ metric liên quan, hàng nghìn dòng. Với `regex`, tên metric vẫn chứa phần đơn vị, nên dễ kiểm tra mình đang xem đúng nhóm.

---

### ✅ Chốt lại

Dòng lệnh của Nsight Compute xoay quanh hai thứ: **section** để chọn nhóm phân tích và **metric** để chọn chỉ số. Tên metric theo mẫu `đơnvị__metric.modifier`, với min/max/avg/sum. Chỉ cần nhớ vài metric chủ chốt — thời gian, hit rate L1/L2, byte DRAM, instruction — là đủ cho phần lớn phân tích. Bài sau sẽ chuyển sang GUI để thấy cùng dữ liệu dưới dạng biểu đồ.
