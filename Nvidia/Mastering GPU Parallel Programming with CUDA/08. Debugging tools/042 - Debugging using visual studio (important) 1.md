---
title: 'Gỡ lỗi CUDA trong Visual Studio với Nsight Integration'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 42
status: edited
source: '042 - Debugging using visual studio (important) 1.md'
categories:
- Nvidia
tags: []
---

# 🐞 Gỡ lỗi kernel CUDA ngay trong Visual Studio

> Nguồn: `042 - Debugging using visual studio (important) 1.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46425093)

Sang section mới, ứng dụng là vector reduction — phức tạp hơn vector addition nhiều. Vì vậy thay vì profiler, bài này dùng **debugger**: đặt breakpoint trong kernel để dừng đúng instruction, xem giá trị biến, thanh ghi, bộ nhớ và cả assembly. Công cụ là **NVIDIA Nsight Integration**, một extension gắn vào Visual Studio.

### 🧭 Vì sao cần debugger chứ không chỉ profiler

Ở level trước, **Nsight Compute** đủ dùng: đo thời gian chạy, **SM utilization**, **occupancy**, **memory bandwidth**, hit rate của L1/L2, xuất đồ thị tìm bottleneck. Nhưng profiler không cho dừng chương trình ở một dòng cụ thể. Khi cần biết "đến instruction này thì biến `A` bằng mấy, thanh ghi nào đang giữ gì", phải có debugger.

**Nsight Integration** là tên gọi vì nó tích hợp vào Visual Studio, khác với các tool standalone như Nsight Compute, Nsight Systems, Nsight Graphics.

---

### ⚙️ Cài đặt

Có hai đường: cài từ trong Visual Studio, hoặc qua Marketplace. Cách làm trong bài:

1. **Extensions → Manage Extensions**, tìm "Nsight".
2. Chọn **NVIDIA Nsight Integration** (bản 64-bit, hoặc 32-bit nếu hệ điều hành 32-bit) → **Install**.
3. Đóng Visual Studio rồi mở lại, hoàn tất các bước cài đặt.

Sau đó trong menu **Extensions** sẽ có submenu **Nsight**. Mục quan trọng thứ hai là **Nsight Visual Studio Edition** — bản standalone cài thêm; chính nó mang lại khả năng xem memory, warp, thanh ghi GPU và assembly ngay trong IDE. Cần cài cả hai trước khi bắt đầu.

Ba mục đầu trong submenu Nsight (Compute, Graphics, Systems) chỉ xuất hiện khi tool tương ứng đã có trên máy — thường được cài kèm **CUDA Toolkit**.

---

### 🔴 Đặt breakpoint và chạy debug

Ví dụ trên vector addition. Trước hết chạy bình thường để chắc kết quả đúng: `0+2=2`, `1+3=4`, `2+4=6`…

Sau đó:

1. Click vào lề dòng cần dừng để đặt **breakpoint**.
2. Vào **Extensions → Nsight** và khởi động debug từ đó — **không** dùng menu Debug thường, vì menu đó chủ yếu dành cho phía CPU.
3. Cửa sổ debug hiện ra; phần thread GPU là thứ cần quan tâm, các thread CPU nằm ngoài phạm vi bài.

---

### 📋 Launch details — đọc cấu hình grid/block

Cửa sổ **Launch Details** cho biết kernel được phóng với cấu hình gì:

* **block ID** và **thread ID** (bắt đầu từ 0),
* **grid dim** = số block mỗi grid,
* **block dim** = số thread mỗi block — ví dụ **96 thread/block = 3 warp**,
* **grid ID** — ứng dụng này chỉ có một grid nên bằng 1.

---

### 💾 Xem biến và bộ nhớ

Bấm **Step Over** để chạy từng dòng. Cửa sổ biến hiện `A`, `B`, `C`, biến chỉ số `i`, cùng các biến dựng sẵn như thread ID, block ID.

Muốn xem bộ nhớ: **Debug → Windows → Memory**. Trong cửa sổ này:

* Mỗi dòng hiển thị **nhiều** địa chỉ chứ không phải một — địa chỉ in dạng **hexadecimal**, khoảng 12 địa chỉ mỗi dòng.
* Gõ tên mảng (`A`) rồi Enter để nhảy tới đầu mảng.
* `A` là mảng `int`, mỗi phần tử **4 byte = 8 chữ số hex**. Giá trị nhỏ như 0, 1, 2 chỉ chiếm byte đầu, nên phần lớn ô nhớ hiện `00`; đi xuống sẽ thấy giá trị tăng dần `33`, `34`, `35`… tới `ff` rồi tràn sang byte kế.
* Kết quả `C` chỉ có vài phần tử đầu khác 0 vì chương trình đang **dừng giữa chừng** — các warp sau chưa chạy. Bấm Continue/Step để warp kế tiếp ghi kết quả, các ô đỏ mới xuất hiện.
* Sau khi kernel kết thúc và bộ nhớ được `free`, cửa sổ Memory không còn dữ liệu.

---

### 🔧 Đọc assembly của kernel

**Debug → Windows → Disassembly** hiện mã assembly tương ứng từng dòng CUDA. Kernel GPU bắt đầu từ chỗ có `__global__`; phía trên là code CPU, bỏ qua.

Những điểm đáng chú ý:

* Đầu kernel có các lệnh **`mov`** để nạp tham số: địa chỉ các con trỏ `a`, `b`, `c` và `n`.
* `tid` trong assembly là **thread ID**; **`CTA`** (*Cooperative Thread Array*) là **block**.
* Dòng tính index được dịch thành chuỗi: đọc thread ID, đọc block ID, đọc block size, nhân, rồi cộng.
* Câu `if` thành so sánh **`ISETP.LT`** (integer set predicate, less than) + lệnh nhảy: đúng thì vào nhánh, sai thì nhảy tới địa chỉ cuối kernel.
* Một dòng CUDA có thể sinh **nhiều** instruction assembly — một phần do compiler **unroll** vòng lặp. Assembly của NVIDIA là **closed source**, không có tài liệu đầy đủ, nên chỉ cần đọc ở mức ý nghĩa.

Đọc assembly có ích thực tế: khi thấy latency cao, tìm xem có **barrier** (`__syncthreads`) trong code không — barrier thường là nguồn trễ. Vector addition này không có barrier.

---

### 🚀 Mở profiler từ Visual Studio

Cách cũ khó hơn: mở terminal, attach ứng dụng vào process đang chạy, mở Nsight Compute, cấu hình, rồi Launch. Giờ chỉ cần **Extensions → Nsight → Compute → Profile**: Visual Studio tự mở Nsight Compute và điền sẵn **application executable** cùng **working directory**. Chỉ cần đặt tên **output file** cho report rồi **Launch**.

Trong kết quả có các mục quen thuộc: **Speed of Light**, **roofline**, **PM sampling**, **compute workload**, đồ thị **GPU throughput** (SM utilization, memory bandwidth), **average active warps per cycle**, hit rate L1/L2, pipeline utilization (ALU, FMA, double precision). Với vector reduction, chỉ số cần theo dõi nhất là **duration** để so sánh giữa các phiên bản tối ưu.

**Interactive Profile** khác **Profile** ở chỗ không ghi report ra file mà xem trực tiếp.

---

### 🕒 Nsight Systems — nhìn theo timeline

**Nsight Systems** khác Nsight Compute ở chỗ tập trung vào **timing**: nó dựng timeline của các API, của CPU và GPU, của việc copy dữ liệu host↔device, của occupancy theo thời gian. Chọn workspace, chọn metric cần thu (GPU metrics, **CUDA trace**, GPU context switch, cả phía CPU), rồi **Start**.

Trong timeline:

* Đường **GPC clock frequency** — **GPC (Graphics Processing Cluster)** nằm giữa GPU và các SM: mỗi GPC chứa nhiều SM dùng chung một tần số.
* Tần số **tăng giảm** trong lúc chạy, không cố định — khi SM rảnh, GPU hạ xung để giảm công suất.
* Có thể xem **warp occupancy** thay đổi theo thời gian, `Ctrl` + cuộn chuột để zoom.
* Phần **instructions** cho biết khi nào SM thực sự active; các khoảng trống là lúc chỉ đang copy dữ liệu host→GPU hoặc memory→SM. Tensor core instruction bằng 0 vì ứng dụng chưa dùng tensor core.

Timeline này là công cụ tìm bottleneck theo thời gian, bổ sung cho ảnh chụp từng kernel của Nsight Compute. Từ đây trở đi giảng viên dùng Visual Studio thay cho VS Code.
