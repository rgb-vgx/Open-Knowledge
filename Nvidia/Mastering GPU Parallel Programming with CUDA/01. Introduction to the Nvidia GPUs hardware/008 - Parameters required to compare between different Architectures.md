---
title: 'Các tham số cần thiết để so sánh các architecture'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 8
status: edited
source: '008 - Parameters required to compare between different Architectures.md'
categories:
- Nvidia
tags: []
---

# 📊 Các tham số cần thiết để so sánh các architecture

> Nguồn: `008 - Parameters required to compare between different Architectures.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/33929696)

Từ Fermi đến Hopper, throughput tăng hơn **300 lần** — nhưng đó chỉ là một métric. Bài này đi qua những tham số cốt lõi để đánh giá một architecture: **memory bandwidth**, **instruction throughput**, **tiêu thụ năng lượng** và **đơn vị phần cứng mới**. Đây là nền để đọc whitepaper ở các bài sau.

### 📶 Memory bandwidth: bao nhiêu dữ liệu mỗi giây

**Memory bandwidth** là lượng dữ liệu memory xử lý được mỗi giây, đo bằng **GB/s**.

Ví dụ trực quan: một GPU có global memory băng thông **32 bit/giây**, và **4 core**, mỗi core cần đọc **32 bit** → tổng **128 bit**. Với băng thông 32 bit/giây, memory chỉ phục vụ được **một request mỗi giây**, nên mất **4 giây** cho cả bốn request.

Nếu memory có băng thông **128 bit/giây**, nó trả lời cả bốn request trong **1 giây**. Đó là lý do băng thông quan trọng với ứng dụng nặng dữ liệu như dựng video, render 3D, hay gaming — nơi từng mili-giây đều đáng giá.

---

### 🛣️ Bus width và memory clock

Băng thông phụ thuộc vào **bus width** và **tốc độ memory**:

* **Bus width** giống số làn đường. Bus 2 bit = đường 2 làn, mỗi làn 1 xe/giây → 2 xe/giây. Bus 4 bit = 4 làn → 4 xe/giây. Đường càng rộng, băng thông càng cao.
* Tăng bus width từ **32 lên 64 bit** sẽ tăng dữ liệu truyền mỗi lúc — **với điều kiện tốc độ memory giữ nguyên**.
* **Memory clock speed** giống tốc độ của nhân viên soát vé: nhân viên soát nhanh hơn thì nhiều xe qua hơn trong cùng thời gian. Memory chạy nhanh hơn thì xử lý nhiều giao dịch hơn, tức băng thông tăng.

Ngoài ra còn **công nghệ memory**: DDR4, DDR5, DDR6, và **HBM** (sẽ bàn kỹ ở Ampere).

---

### 🆚 A100 và RTX 3090: cùng Ampere, khác băng thông

Dù cùng architecture Ampere:

* **A100** (Tesla) có bus memory **hơn 5.000 bit**, dùng **HBM2**.
* **RTX 3090** (GeForce) có bus khoảng **400 bit**, dùng **GDDR6**.
* Tốc độ memory hai bên xấp xỉ nhau.

Chênh lệch bus hơn **10 lần** cộng với công nghệ memory khác nhau khiến **A100 vượt trội rõ rệt** về memory bandwidth.

---

### 🧮 Instruction throughput: core count không nói hết

**Throughput** ở đây là tổng số instruction mỗi giây toàn GPU thực thi. Nó phụ thuộc **số core** và **tốc độ core**.

Ví dụ 200 instruction, GPU 100 core vs 200 core:

* GPU 100 core: mỗi core một instruction, chạy **2 cycle**.
* GPU 200 core: mỗi core một instruction, chạy **1 cycle** → nhanh gấp đôi.

Nhưng nếu **thời lượng mỗi cycle** khác nhau thì kết luận đảo chiều. Nếu cycle là 1 giây ở cả hai: 2 giây vs 1 giây. Nếu GPU 100 core có cycle 1 giây còn GPU 200 core có cycle 4 giây: **2 giây vs 4 giây** — GPU ít core lại thắng. Vì vậy phải xét **cân bằng giữa core count và clock speed**.

Nhờ throughput, khi đọc whitepaper ta có thể tập trung vào con số này thay vì tự nhân core với xung nhịp. Tuy vậy, clock speed vẫn quan trọng cho **tiêu thụ năng lượng**.

---

### 🔋 Bài toán năng lượng

Giả sử GPU A có nhiều core hơn **và** xung nhịp cao hơn GPU B. A có luôn tốt hơn? Không hẳn: nhiều core và xung nhịp cao đi kèm **tiêu thụ điện lớn hơn**. Nếu ưu tiên hiệu quả năng lượng (thường gắn với tiết kiệm chi phí), công ty có thể chọn GPU B.

Vì thế, khi được hỏi "GPU nào mạnh hơn?", câu trả lời đúng nên là một câu hỏi ngược: **trong ngữ cảnh nào — hiệu quả năng lượng hay sức tính toán?**

---

### 🆕 Đơn vị phần cứng mới

Một tiêu chí quan trọng khi đánh giá architecture mới là nó có **đơn vị phần cứng mới** nào không. Ví dụ **tensor core** xuất hiện từ **Volta (2017)**: hiệu năng tăng khoảng **8 lần** từ Pascal lên Volta cho cùng ứng dụng. Một tác vụ AI tốn **8 ngày** trên Pascal có thể xong trong **1 ngày** nhờ tensor core của Volta.

**Chốt lại.** Bốn nhóm tham số cần nhớ: **memory bandwidth** (phụ thuộc bus width, memory clock, công nghệ), **instruction throughput** (core count × tốc độ, nhưng còn tùy cycle), **năng lượng**, và **đơn vị phần cứng mới**. Trong whitepaper, **TFLOPS** = 10¹² instruction/giây. Bài sau mình sẽ nói về các kiểu số: half, single và double precision.
