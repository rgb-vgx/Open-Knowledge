---
title: 'Volta, Pascal, Ampere: giải phẫu kiến trúc qua whitepaper'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 12
status: edited
source: '012 - Volta+Ampere+Pascal+SIMD (Don''t skip).md'
categories:
- Nvidia
tags: []
---

# 🧬 Volta, Pascal, Ampere: giải phẫu kiến trúc qua whitepaper

> Nguồn: `012 - Volta+Ampere+Pascal+SIMD (Don't skip).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/34009752)

Đây là bài dài và quan trọng nhất của section: mở whitepaper **V100** để xem Volta có gì mới, rồi đặt cạnh **Pascal** và **Ampere** qua bảng so sánh trong whitepaper A100. Mình sẽ đi từ transistor, SM được thiết kế lại, bốn partition bên trong SM, tới NVLink và các server DGX.

### 📄 Bắt đầu từ whitepaper V100

Whitepaper V100 mở đầu bằng mục **Key Features**, tổng hợp các cải tiến so với thế hệ trước: thiết kế SM mới, **NVLink thế hệ hai**, v.v. Whitepaper dành hẳn các mục riêng cho **AI và deep learning** — hợp lý vì Volta là nơi **tensor core** xuất hiện lần đầu.

Một điểm đáng chú ý: tiêu đề **"GPU Hardware Architecture in Depth"** không chỉ có ở Volta mà lặp lại ở whitepaper Pascal và Hopper — minh chứng cho cấu trúc nhất quán đã nói ở bài trước.

Về quy mô:

* **V100** có khoảng **21 tỷ transistor**.
* **H100** có **80 tỷ transistor** — gấp **4 lần** từ Volta lên Hopper.

Số transistor phản ánh tài nguyên tính toán: nhiều transistor thường đi với nhiều đơn vị phần cứng hơn.

---

### 🧠 SM của Volta được thiết kế lại

Các cải tiến chính trong SM mới:

1. **Tiết kiệm năng lượng hơn 50%** so với Pascal. Với hệ thống lớn như siêu máy tính, V100 có thể cắt đôi chi phí năng lượng mà không giảm sức tính toán.
2. **Cải thiện core single và double precision** với cùng mức công suất. Nghiên cứu về instruction latency cho thấy phép add/sub tốn **6 cycle** trên Pascal, **4 cycle** trên Volta, và chỉ **2 cycle** trên Ampere — trong khoảng 5–6 năm.
3. **Tensor core** cho AI: tăng tới **12 lần throughput** khi training và **6 lần** khi inference neural network. Latency của instruction tensor core khoảng **4–8 cycle**, tùy hình dạng/kích thước ma trận và kiểu dữ liệu — nhưng tensor core xử lý cả ma trận chứ không phải một phần tử.
4. **Integer và floating point chạy song song**: Pascal, Maxwell, Kepler, Fermi chỉ chạy được hoặc integer hoặc floating point tại một thời điểm; Volta tạo **đường độc lập** cho mỗi loại nên chạy đồng thời được.
5. **Gộp cache và shared memory** vào một đơn vị vật lý, đồng thời tăng tốc truy cập.
6. **Thread scheduling** tiên tiến (sẽ bàn ở phần CUDA), **NVLink thế hệ hai**, **global memory** nâng cấp, **Multi-Process Service (MPS)**, **unified memory** gộp memory GPU và CPU thành một không gian ảo, và cập nhật thư viện để tận dụng phần cứng mới.

Về memory bandwidth: Volta đạt **900 GB/s** so với khoảng **700 GB/s** của Pascal; Ampere lên khoảng **1.500 GB/s**. Với tensor core, V100 đạt **125 TFLOPS** — tăng mạnh so với khoảng **21 TFLOPS** của Pascal.

---

### 🏗️ GV100: các con số phần cứng

Cấu trúc phân cấp cần nhớ: **GPU → nhiều SM → nhiều đơn vị tính toán**.

Trong một SM của Volta:

* **64 core single precision**.
* **64 core integer**.
* **32 core double precision**.
* **8 tensor core**.

Volta có **84 SM**; nhân 84 với 64 cho ra tổng số core single precision toàn GPU. Tính tương tự cho các loại khác, tổng cộng khoảng **20.000 đơn vị tính toán**.

Ngoài SM, toàn GPU còn có:

* **L2 cache 6 MB**, mọi SM đều truy cập được.
* **Global memory HBM2**, nối với các SM qua memory controller.
* **Đơn vị NVLink** để giao tiếp với GPU/CPU khác, và **PCI interface** ở phía trên — NVLink nhanh hơn.

---

### 🧵 Bốn partition trong một SM

Mỗi SM chia thành **bốn partition**. Việc chia nhỏ giúp các block phần mềm nhỏ vẫn dùng được tài nguyên, thay vì để một block chiếm cả SM và lãng phí ba partition còn lại.

Mỗi partition gồm:

* **L0 instruction cache**: cache cấp 0 lưu instruction, tăng tốc truy cập instruction hay dùng. Đây là cache **instruction**, không phải data — data do **L1** đảm nhiệm.
* **Warp scheduler**: quản lý **warp** — nhóm **32 thread** trong một block. 32 thread trong warp thực thi **cùng một instruction** trên nhiều phần tử: **SIMT (Single Instruction Multiple Thread)**. Ví dụ cộng hai vector: một phép `add`, nhưng mỗi thread cộng một phần tử khác nhau. Scheduler xử lý cả warp trong **một cycle**, như một người quản lý đặt chiến lược.
* **Dispatcher**: thi hành chiến lược đó, phối hợp với scheduler để gửi instruction tới đúng đơn vị thực thi, cũng theo cả warp mỗi clock.
* **Register file**: nhiều register — nơi lưu rất nhanh, giữ dữ liệu tạm cho đơn vị thực thi.
* Các core: **16 core single precision**, **16 core integer**, **special function unit**, **tensor core**.

Bốn partition trong SM **dùng chung L1 cache, shared memory và texture memory**.

---

### 📊 Bảng so sánh Pascal, Volta, Ampere

Đọc bảng trong whitepaper A100 (thay vì bảng V100 có thêm Maxwell, Kepler):

| Thông số | Pascal | Volta | Ampere |
|---|---|---|---|
| Số SM | 56 | 80 | 108 |
| Core FP32 | ~3.500 | ~5.000 | ~7.000 |
| Core FP64 | thấp hơn | ở giữa | ~3.400 |
| Core integer riêng | không | ~5.000 | ~7.000 |
| Tensor core | không có | 640 | 432 |
| Boost clock | — | ~1.5 GHz | ~1.4 GHz |
| FP32 throughput | 21 TFLOPS | 31 TFLOPS | ~78 TFLOPS |
| Bus memory | — | ~4.000 bit | >5.000 bit |
| Dung lượng memory | — | 16/32 GB | 40 GB |
| Memory bandwidth | ~700 GB/s | 900 GB/s | ~1.500 GB/s |
| L2 cache | — | 6 MB | hơn 7 lần Volta |
| Transistor | — | 21 tỷ | ~54 tỷ (2.5 lần) |
| Tiến trình | — | — | 7 nm |

Hai điểm đáng lưu ý:

* **Ampere có ít tensor core hơn Volta (432 so với 640)** nhưng throughput FP16 cao hơn gấp đôi. Một tensor core Ampere có thể tương đương **hai** tensor core Volta — nhắc lại bài học: **không đánh giá bằng số lượng core**, phải xét cả năng lực/speed của từng core.
* **Pascal không có core integer riêng**, nên integer và floating point không chạy song song được; Volta và Ampere thì có.

Với **half precision + single precision accumulation**: operand FP16 nhưng kết quả lưu FP32, vì tích của hai số lớn có thể cần nhiều bit hơn 16. Ampere còn thêm kiểu **BF16** (sẽ bàn sau). Ampere cũng có **power dissipation** cao hơn, phản ánh tài nguyên lớn hơn.

Bên cạnh bảng phần cứng còn bảng **compute capability**, cần thiết khi viết ứng dụng CUDA: biết giới hạn số thread, số block tối đa. Nếu ứng dụng có 1 triệu thread mà GPU chỉ chạy được 500.000, có thể **chia thành hai kernel**.

---

### 🔗 NVLink và các server DGX

**NVLink** là interconnect tốc độ cao giữa GPU-GPU và GPU-CPU, băng thông lớn, tăng khả năng mở rộng.

* **Pascal (P100)**: NVLink thế hệ một, **một kết nối** giữa mỗi cặp GPU.
* **Volta**: thế hệ hai, **hai kết nối** giữa các GPU, cho phép nhận và truyền dữ liệu đồng thời. Tốc độ link cũng tăng, đưa băng thông GPU-GPU từ **160 GB/s** lên **300 GB/s**.

NVLink là tính năng chuẩn trên server **DGX**. **DGX Station** chứa **4 GPU V100** nối bằng NVLink, đạt **3 lần** hiệu năng so với workstation GPU nhanh nhất thời điểm đó. Bảng so sánh DGX-1 của Pascal và Volta cho thấy cả hai đều **8 GPU**, công suất **3.200 W** như nhau — nhưng Volta có nhiều tính toán hơn trên cùng mức năng lượng, nhờ tensor core và số core lớn hơn. Đó chính là ý nghĩa của "tiết kiệm 50% năng lượng": tính trên **mỗi phép tính**, không phải tổng công suất.

**Chốt lại.** Volta là bước ngoặt với **tensor core**, **SM tiết kiệm năng lượng**, integer và floating point song song, cùng NVLink thế hệ hai. Ampere nối tiếp với nhiều SM hơn, throughput cao hơn, bandwidth lớn hơn. Điều cần nhớ xuyên suốt: **đừng chỉ đếm core** — hãy nhìn throughput, khả năng từng đơn vị và cả chi phí năng lượng. Bài tiếp theo mình chuyển sang phần mềm: CUDA toolkit có gì.

> ⚠️ Cần kiểm chứng: con số core FP64 của Ampere trong transcript bị nhiễu âm thanh (nghe như "3004 hundred"); bài viết ghi khoảng 3.400 theo ngữ cảnh, cần đối chiếu lại bảng thông số whitepaper A100.
