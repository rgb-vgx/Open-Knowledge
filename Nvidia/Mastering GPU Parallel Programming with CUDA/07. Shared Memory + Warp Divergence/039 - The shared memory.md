---
title: 'Shared memory: bộ nhớ phần mềm trong Streaming Multiprocessor'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 39
status: edited
source: '039 - The shared memory.md'
categories:
- Nvidia
tags: []
---

# 🧠 Shared memory: bộ nhớ phần mềm bên trong SM

> Nguồn: `039 - The shared memory.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46320299)

Bài này gom lại toàn bộ bức tranh phân cấp bộ nhớ của GPU, rồi đi sâu vào **shared memory** — loại bộ nhớ duy nhất mà các bạn có thể lập trình trực tiếp trong CUDA. Trọng tâm là hai câu hỏi: shared memory khác L1 cache ở đâu, và **bank conflict** được tính như thế nào.

### 🧭 Ôn lại phân cấp bộ nhớ

* **Global memory**: mọi thread trong ứng dụng đều truy cập được, và cả **CPU** cũng đọc/ghi được vào global memory của GPU.
* **L2 cache**: dùng chung cho toàn bộ các **SM (Streaming Multiprocessor)** trong GPU — đó là lý do mọi thread đều truy cập được. Bản chất giống global memory nhưng nhỏ hơn và độ trễ thấp hơn.
* **L1 cache**: nằm bên trong từng SM. Thread ở SM 0 không truy cập trực tiếp được L1 của SM 1; chúng chỉ có thể "làm việc trên cùng dữ liệu" nếu dữ liệu đó nằm ở L2 hoặc global memory.
* **Register**: nhanh nhất, nhưng là **per-thread** — mỗi thanh ghi gắn với một thread, vòng đời bằng vòng đời thread. Chỉ có một ngoại lệ sẽ học ở bài shuffle operations.

L1 được gọi là **hardware cache**: tag, set, replacement policy… đều do phần cứng quản lý, code CUDA không can thiệp được.

### 🧩 Shared memory — cache phần mềm

Ngay cạnh L1 là **shared memory**, và đây là điểm khác biệt cốt lõi:

* L1 là cache do **phần cứng** quản lý, không khai báo trực tiếp được.
* Shared memory là **cache phần mềm** — các bạn khai báo bằng từ khóa `__shared__`, ví dụ `__shared__ float A;` là cấp một vùng cho một phần tử single precision.
* Với dữ liệu thường, các bạn phải cấp phát ở global memory rồi chờ phần cứng đưa lên L2, L1; không ai bảo đảm dữ liệu sẽ nằm trong L1. Với shared memory thì các bạn chủ động: số phần tử, stride, bank nào chứa giá trị nào.

Trên các kiến trúc gần đây — **Turing, Volta, Ampere, Hopper** — L1 và shared memory nằm trong **cùng một đơn vị vật lý**, và phần chia giữa hai bên do cấu hình hoặc compiler quyết định.

### ⏱️ Độ trễ và lợi ích tái sử dụng dữ liệu

Con số giảng viên nêu:

| Cấp bộ nhớ | Độ trễ xấp xỉ |
|---|---|
| Shared memory | 20–25 cycles |
| L1 cache | ~33 cycles |
| L2 cache | ~200 cycles |
| Global memory | hơn 300 cycles |

Shared memory nhanh hơn L1 dù cùng một đơn vị vật lý, vì truy cập L1 phải băm địa chỉ để tìm set, tag, bank — một bước "tìm kiếm" mà shared memory không cần.

Giá trị thực sự của shared memory là **data reuse**. Nếu nhiều thread cùng dùng một dữ liệu, nạp một lần vào shared memory rồi chia sẻ, thay vì mỗi thread đi xuống global memory. Điều này giảm **global memory traffic**, giảm nghẽn băng thông — đặc biệt quan trọng với ứng dụng **memory-bound**. Ví dụ điển hình là **vector reduction**: tổng của cả vector được dùng đi dùng lại qua nhiều thread, và sẽ được khai thác ở các bài sau.

### 🏗️ Shared memory trên Ampere (A100)

Trên **A100**, L1 và shared memory là một khối vật lý **192 KB** cố định. Các bạn chọn kích thước shared memory, phần còn lại thuộc về L1:

* Shared memory **0 KB** → L1 = 192 KB.
* Shared memory **8 KB** → L1 = 184 KB.
* Shared memory **100 KB** → L1 = 92 KB.
* Không thể chọn 192 KB cho shared memory, vì như vậy là xóa luôn L1. Kích thước tối đa là **164 KB**.

Compiler tự cân theo mức sử dụng shared memory của ứng dụng; có API cấu hình nhưng giảng viên khuyên để compiler lo.

### 🔢 Bank, cache line và cách truy cập

Khối vật lý chia thành các hàng, mỗi hàng **128 byte** gọi là một **cache line**. Mỗi cache line gồm **32 bank**, mỗi bank **4 byte** (128 / 32 = 4). Hay nhớ: **cache line là hàng, bank là cột**.

Quy tắc then chốt: **mỗi bank đọc/ghi được 4 byte mỗi cycle**. Nhìn theo cột, mỗi cycle chỉ lấy được **một** bank trong cột đó. Vì vậy một cycle lấy được 32 bank ở 32 cột khác nhau = 128 byte, tức trọn một cache line — miễn là các bank cần đọc nằm ở **các cột khác nhau**.

### ⚔️ Bank conflict: đếm theo cột

Bank conflict xảy ra khi hai thread cần đọc **hai bank trong cùng một cột** ở cùng cycle. Cách tính:

1. Với mỗi cột, đếm số bank cần truy cập.
2. Số cycle cần = **max** số bank trên một cột.
3. Số conflict = **max cycle − 1**.

Ví dụ ba bank cùng một cột: cycle đầu đọc một bank, hai bank còn lại chờ → **2 conflict**, không phải 3.

Ba trường hợp giảng viên phân tích, giả định một **warp = 32 thread**, mỗi thread đọc 4 byte (một `int` hoặc một `float`), tức một bank:

* **Coalesced, stride 0**: thread 0 → bank 0, thread 1 → bank 1… Cả 32 bank nằm trên một cache line, mỗi cột chỉ một bank → **0 conflict**, một cycle.
* **Nhiều cache line nhưng khác cột**: dù các bank nằm rải ở nhiều cache line, nếu không cột nào có hai bank thì vẫn đọc xong trong **một cycle**.
* **Broadcasting**: nhiều thread đọc **đúng cùng một bank** (cùng hàng, cùng cột) — phần cứng phát một lần cho tất cả, **không** tính là conflict.

### 🧮 Ví dụ stride 16 byte và double precision

**Stride 16 byte**: thread kế tiếp nhảy 4 bank (16 / 4). 32 thread phủ 32 bank nhưng trải trên **4 cache line**, mỗi cột nhận **4** yêu cầu → cần **4 cycle**, tức **3 conflict**.

**Double precision**: mỗi phần tử 8 byte nên mỗi thread chiếm **2 bank**. 32 thread × 8 byte = 256 byte → tối thiểu **2 cache line**, và dù xếp thế nào cũng **không thể** đọc hết trong một cycle. Với truy cập liền mạch, 16 thread đầu đọc cache line thứ nhất, 16 thread sau đọc cache line thứ hai.

### ⚠️ Khi Nsight Compute khác lý thuyết

Với ví dụ double precision ở trên, lý thuyết cho ít nhất 1 conflict, nhưng **Nsight Compute** lại báo metric bank conflict bằng **0**. Giảng viên lưu ý công cụ có vài chỗ không khớp định nghĩa lý thuyết — ví dụ Nsight Compute coi mọi thao tác ghi vào L2 là **hit** kể cả khi trượt. Cách xử lý: nắm chắc nguyên lý (conflict → thêm cycle → tăng thời gian chạy), còn các ca đặc biệt thì tra forum NVIDIA.

Hiểu bank conflict là bước đệm cho bài tiếp theo về **warp divergence** — cũng là một dạng "chia rẽ" khiến warp phải chạy nhiều lượt hơn cần thiết.
