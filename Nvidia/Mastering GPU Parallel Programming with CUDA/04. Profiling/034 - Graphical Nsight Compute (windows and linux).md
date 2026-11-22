---
title: 'Nsight Compute GUI: đọc profile trực quan'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 34
status: edited
source: '034 - Graphical Nsight Compute (windows and linux).md'
categories:
- Nvidia
tags: []
---

# 📈 Nsight Compute GUI: đọc profile trực quan

> Nguồn: `034 - Graphical Nsight Compute (windows and linux).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/42973896)

Sau khi đã quen dòng lệnh, bài này chuyển sang **giao diện đồ họa của Nsight Compute**. Cùng một bộ metric, nhưng GUI trình bày bằng biểu đồ, cho thấy ngay ứng dụng **memory bound** hay **compute bound**, và chỉ ra instruction nào gây stall. Đây là bài dài nhất của section nên mình đi theo thứ tự thao tác.

### 🛠️ Cài đặt và mở project

Nsight Compute có trong **CUDA Toolkit**; nếu thiếu thì tải từ trang NVIDIA (có thể phải đăng ký email). Bản trong bài là 2024.1 và 2024.3.

Mở công cụ → **New Project** → đặt tên. Cần chuẩn bị **file thực thi**, ví dụ:

```bash
nvcc -o a.exe "vector_add.cu"
```

Trong phần cấu hình:

* **Application executable**: trỏ tới file `a.exe`.
* **Working directory**: chọn thư mục chứa ứng dụng.
* **CPU call stack**, profiling CPU–GPU, **cache flush** (xóa dữ liệu cũ trong cache), clock control.
* **Output folder** cho kết quả.

---

### 🔗 Attach vào tiến trình đang chạy

Không thể profile một tiến trình chưa tồn tại. Có hai cách: bấm **Launch** để GUI tự chạy, hoặc khởi chạy tiến trình ở chế độ chờ rồi **Attach**.

Chế độ `--mode=launch` của `ncu` khởi động ứng dụng và tạm dừng ở API call đầu tiên, giữ tiến trình sống để profiler gắn vào. Sau đó trong GUI chọn **Attach**, chọn đúng process ID và tên file thực thi.

---

### ☑️ Chọn section cần profile

Trong tab **Metrics Selection**, chọn các nhóm:

* Speed of Light (throughput, roofline chart, hierarchical roofline).
* Compute Workload Analysis.
* Instruction Statistics.
* Launch Statistics.
* Occupancy.
* GPU and Memory Workload Distribution.
* Warp State Statistics, Scheduler Statistics, Memory Workload Analysis.

Mỗi mục tương ứng một **section** đã gặp ở bài dòng lệnh. Sau khi chọn, bấm **Profile kernel**; GUI chạy lại ứng dụng và thu metric.

---

### 📊 Summary và Details

**Summary** hiển thị nhanh occupancy: theoretical **100 %**, achieved **81 %** — khớp với kết quả dòng lệnh.

**Details** chứa toàn bộ section đã chọn. Với vector addition:

* GPU Speed of Light: throughput **16 %**; memory throughput **95 %**.
* L1 cache throughput khoảng **21 %**, L2 khoảng **40 %**.
* L1 hit rate **0 %**, L2 hit rate **33 %**.
* Duration: **970 ns** (hiển thị microseconds ở chỗ khác); metric tương ứng bên dòng lệnh là `gpu__time_duration.sum`.

Với duration, các modifier min/max/avg/sum bằng nhau vì thời gian của toàn GPU là một giá trị. Với số cycle hay số byte mỗi SM thì chúng khác nhau.

---

### 🔎 Expand Sections: nhìn ra bottleneck

Đây là điểm mạnh nhất của GUI. Bấm **View → Expand Sections**, dữ liệu được vẽ thành biểu đồ.

Biểu đồ quan trọng nhất đặt cạnh nhau hai thanh:

* **Compute (SM) throughput**: 16 %.
* **Memory throughput**: 95 %.

Kết luận rút ra ngay: ứng dụng **memory bound**. Nó chỉ dùng 16 % ALU nhưng dùng 95 % băng thông bộ nhớ. Điều này không "tốt" như con số 95 % gợi ý — trúng băng thông tối đa nghĩa là truy cập global memory quá nhiều, cần giảm bằng cách tăng hit rate L1/L2.

Biểu đồ **Compute Workload Analysis** cho thấy mức dùng từng đơn vị: FMA khoảng **3.55 %**, ALU khoảng **4 %** (tính theo active cycle hoặc theo peak instruction), load/store unit cao hơn hẳn — dấu hiệu memory bottleneck.

Biểu đồ **Memory Workload Analysis** vẽ luồng dữ liệu giữa các tầng. Ví dụ L2 → L1 khoảng **268 MB**; chiều ngược lại nhỏ hơn vì đọc hai vector nhưng chỉ ghi một. L1 hit 0 %, L2 hit 33 %, shared memory không có request vì ứng dụng không dùng shared memory.

---

### 🧵 Warp stalls và dependency

Section **Warp State Statistics**:

* Mỗi warp bị stall trung bình **111 cycle**, chờ **scoreboard dependency** — tức chờ dữ liệu từ memory.
* Tổng cộng khoảng **47 K stall**, con số cho toàn GPU.
* 32 thread/warp, gần như toàn bộ thread không bị "predicated off".

Tab **Source** hiển thị mã SASS. Tại dòng lệnh cộng, tooltip báo dòng này chịu **84 %** tổng stall warp, và **99.7 %** stall của chính nó. Lý do: phép cộng phải chờ hai lệnh load nạp `R3`, `R4`. Các mũi tên tam giác trên SASS vẽ chuỗi phụ thuộc giữa các thanh ghi. Tab **Warp Stall Sampling** xác nhận cùng instruction đó chiếm khoảng **93 %** stall.

Điều này khớp với bức tranh tổng: hit rate L1/L2 thấp → load kéo dài hàng trăm cycle → warp chờ → stall.

---

### 📐 Occupancy calculator và API statistics

Section occupancy có biểu đồ cho thấy:

* Với **16 register/thread**, có thể tăng lên khoảng **40** mà không giảm warp occupancy. Vượt 40 sẽ bắt đầu hại.
* Với **96 thread/block**, tăng lên **128** không ảnh hưởng occupancy; tăng tới **224** giảm nhẹ; tới **800** giảm mạnh (khoảng 48 xuống 24).
* Tăng shared memory/block cũng làm giảm occupancy.

**Occupancy calculator** cho phép kéo các con số và xem occupancy thay đổi ngay.

Tab **API Statistics** thống kê thời gian từng Runtime API: `cudaMemcpy` khoảng **40 ms**, `cudaMalloc` khoảng **7 ms**. Phần này tách khỏi thời gian chạy kernel, giúp thấy chi phí copy và cấp phát.

Cuối cùng có thể export kết quả ra PDF/ảnh, đặt một kernel làm **baseline** để so sánh, hoặc collapse section để chỉ xem số.

---

### ✅ Chốt lại

GUI không tạo ra metric mới — nó vẽ cùng dữ liệu theo cách dễ đọc hơn. Giá trị lớn nhất là cặp biểu đồ compute/memory throughput (16 % so với 95 %) để gọi tên bottleneck, và Source view nối stall về đúng instruction gây ra. Bài sau sẽ dùng chính những con số này để phân tích ảnh hưởng của block size.
