---
title: 'Các kiến trúc GPU Nvidia từ Fermi đến Hopper'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 7
status: edited
source: '007 - Nvidia GPU architectures From Fermi to hopper.md'
categories:
- Nvidia
tags: []
---

# 🚀 Các kiến trúc GPU Nvidia từ Fermi đến Hopper

> Nguồn: `007 - Nvidia GPU architectures From Fermi to hopper.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/33394974)

Bài này đi qua các architecture chính từ **Fermi (2010)** trở đi: chip đại diện, GPU tiêu biểu cho HPC và cho người dùng, cùng hai thông số hiệu năng là **throughput** và **clock speed**. Mình sẽ chỉ ra vì sao không thể đánh giá GPU bằng một con số duy nhất.

### 📋 Cách đọc bảng so sánh

Bảng trong bài có các cột: tên **architecture**, **ngày phát hành**, một **chip đại diện**, hai **GPU mẫu** (một cho **HPC**, một cho **người dùng phổ thông**), và hai thông số hiệu năng:

* **Throughput**: số phép toán floating point mỗi giây.
* **Clock speed**: xung nhịp.

Với mỗi thông số, thường có một giá trị cho GPU HPC và một cho GPU phổ thông.

---

### ⚙️ Fermi (2010)

* Chế tạo trên tiến trình **40 nm**.
* Chip đại diện: **GF100**.
* GPU HPC: **Tesla X2070** — throughput **1.2 TFLOPS**, xung nhịp **655 MHz**.
* GPU phổ thông: **GeForce GTX 480** — throughput **1.3 TFLOPS**, xung nhịp **701 MHz**.

Thoạt nhìn, GTX 480 có vẻ "nhỉnh" hơn X2070. Nhưng đánh giá GPU không đơn giản vậy:

* Throughput và clock speed chỉ là **một phần**; hiệu năng tổng thể phụ thuộc nhiều yếu tố.
* Xung nhịp cao hơn có thể **tăng tiêu thụ điện năng**, điều không mong muốn ở một số hệ thống.
* Con số TFLOPS nêu trên là cho **single precision**, không phải toàn bộ core.

Xét **double precision** trên TechPowerUp: X2070 đạt khoảng **582 GFLOPS**, còn GTX 480 chỉ **168 GFLOPS** — X2070 nhanh gần **4 lần** ở các tác vụ như mô phỏng khoa học. Ngược lại, ở **texture rate** và **pixel rate** (cần single precision), GTX 480 lại nhỉnh hơn, đúng với mục đích đồ họa, gaming.

---

### 🧱 Kepler (2012)

* Tiến trình **28 nm** (so với 40 nm của Fermi).
* Chip **GK210** gắn với **Tesla K80**.
* Điểm đặc biệt: K80 dùng **hai chip** trên một board. Tổng throughput khoảng **8.2 TFLOPS**, gấp **6 lần** Fermi; mỗi chip đóng góp khoảng **4.1 TFLOPS**.
* Ngoài K80, không có nhiều GPU phổ biến dùng riêng chip này; phần lớn GPU Kepler cho người dùng dùng chip khác.

Nvidia cũng phát hành **bản nâng cấp** của Kepler trong **2013–2015**. Vì vậy TechPowerUp ghi GK210 phát hành **2014**, khác mốc **2012** của phiên bản đầu tiên.

---

### 🔋 Maxwell (2014)

* Vẫn **28 nm**.
* Chip chủ lực **GM200**, dùng trong **Tesla M60** (HPC).
* GPU gaming: **GeForce GTX 980 Ti**.
* Throughput: M60 đạt **9.7 TFLOPS**, GTX 980 Ti đạt **6.1 TFLOPS**.
* Xung nhịp: M60 **557 MHz**, GTX 980 Ti **1000 MHz**.

Một lần nữa, GPU HPC có xung nhịp **thấp hơn**, gắn với mức tiêu thụ điện thấp hơn.

---

### 🧭 Pascal (2016) và quy ước đặt tên

Từ Pascal, GPU HPC theo mẫu **chữ cái + 100**: **P100** (P = Pascal). Quy ước này tiếp diễn với **V100** (Volta), **A100** (Ampere), **H100** (Hopper). Chip cũng theo mẫu tương ứng: **GP100, GV100, GA100, GH100**.

Pascal được sản xuất trên **16 hoặc 14 nm**. Có hai tiến trình trong cùng architecture vì thời điểm đó các hãng có mức công nghệ khác nhau: một số làm được **14 nm**, số khác còn ở **16 nm**, nhưng vẫn cùng architecture Pascal.

---

### 📈 Hopper và bức tranh tổng thể

Chỉ cần so throughput Hopper với Fermi là thấy bước nhảy: từ **1.2 TFLOPS** lên **378 TFLOPS** — hơn **300 lần**. Con số **51 TFLOPS** xuất hiện trong bảng sẽ được giải thích kỹ trong bài về Hopper.

Bài sau mình sẽ hệ thống hóa các **tham số dùng để so sánh architecture**: memory bandwidth, instruction throughput, tiêu thụ năng lượng và các đơn vị phần cứng mới.
