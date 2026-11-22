---
title: 'GPU vs CPU: hiểu khác biệt cốt lõi trước khi viết CUDA'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 1
status: edited
source: '001 - GPU vs CPU (very important).md'
categories:
- Nvidia
tags: []
---

# ⚡ GPU vs CPU: hiểu khác biệt cốt lõi trước khi viết CUDA

> Nguồn: `001 - GPU vs CPU (very important).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/33558628)

Bài học đầu tiên của khóa đặt nền móng cho toàn bộ phần còn lại: CPU và GPU khác nhau ở đâu, vì sao không thể cứ viết code rồi ném xuống GPU là có hiệu năng tối ưu. Mình sẽ đi từ cấu trúc bên trong, tới cách hai thiết bị phối hợp trong một hệ thống, rồi mở một GPU thật là A100 để các bạn thấy các khối SM, core và cache được bố trí ra sao.

### 🧠 Vì sao phải hiểu phần cứng trước khi viết code

Câu hỏi mở đầu: có thể viết code rồi chạy thẳng trên GPU để đạt hiệu năng tối ưu không? Câu trả lời là **không**. Muốn khai thác hết GPU, các bạn phải hiểu từng unit và từng phân đoạn bên trong nó.

Giảng viên so sánh với một bác sĩ phẫu thuật mà không nắm giải phẫu cơ thể người: ca mổ có thể hỏng. Tương tự, không nắm phần cứng GPU thì không thể tối ưu ứng dụng — và đây chính là mục tiêu xuyên suốt của khóa học.

---

### 🖥️ CPU và GPU giống và khác nhau ở đâu

Nhìn vào hai hình so sánh, cả hai đều có **DRAM (global memory)**, đều có cache nhiều cấp và đều có đơn vị tính toán. Khác biệt nằm ở số lượng và độ phức tạp:

* **CPU** có ba cấp cache **L1, L2, L3**, với số **ALU (Arithmetic and Logic Unit)** hạn chế.
* **GPU** có hai cấp cache làm nhiệm vụ tương tự, nhưng sở hữu **hàng trăm đến hàng nghìn core** — tương đương ALU của CPU.

So sánh **1-1** (một ALU của CPU với một core của GPU) thì ALU của CPU mạnh và phức tạp hơn hẳn:

* CPU hiện đại chạy ở xung nhịp **3–4 GHz**.
* GPU **A100** (ra mắt 2020) có xung nhịp core **765–1200 MHz**; 1200 MHz = **1.2 GHz**, chỉ khoảng **một phần tư** tốc độ CPU trung bình.
* ALU của CPU thiết kế cho tác vụ **general purpose**, chạy **một thread thật nhanh**.
* Core của GPU chuyên biệt hóa, tối ưu cho **song song**: xử lý nhiều thread cùng lúc, rất hợp với rendering đồ họa — nơi cùng một phép toán áp lên rất nhiều phần tử.

---

### 🧵 Bài toán phụ thuộc và bài toán độc lập

Khác biệt về số core ảnh hưởng thế nào tới hiệu năng? Hãy xét hai kịch bản với ba lệnh add, multiply, divide:

1. `R1 = R2 + R3`
2. `R4 = R1 * R5`
3. Lệnh chia dùng `R4`

Ở đây các lệnh **phụ thuộc nhau**: phép nhân phải chờ phép cộng xong, phép chia phải chờ phép nhân. Đây là **sequential execution** — cần **3 bước**. Dù có ba core riêng cho add, multiply, divide thì chúng vẫn không chạy đồng thời được. Với hàng nghìn lệnh phụ thuộc, một số ít ALU như của CPU là lựa chọn tối ưu.

Ngược lại, nếu các lệnh **độc lập** — ví dụ add lấy `R2, R3` còn multiply lấy `R5, R6`, không liên quan nhau — thì có bao nhiêu core là có thể gán mỗi lệnh cho một core và chạy đồng thời. Với **1000 lệnh độc lập**, mỗi lệnh tốn 1 cycle:

* Trên **1000 core**: chạy song song, xong trong **1 cycle**.
* Trong trường hợp phụ thuộc: cần **1000 cycle**.

Từ đó rút ra: **CPU** sinh ra cho chuỗi lệnh tuần tự; **GPU** tỏa sáng khi có vô số lệnh độc lập. Có một lầm tưởng phổ biến là GPU luôn tốt hơn CPU trong mọi trường hợp — điều đó không đúng.

---

### 🔌 CPU và GPU cùng tồn tại trong một hệ thống

Trên bo mạch chủ thông thường có quạt tản nhiệt cho CPU, socket DRAM, cổng nguồn và đặc biệt là các **khe PCI**. GPU được cắm vào khe PCI và nối với CPU qua các đường mạch trên bo mạch.

Trong sơ đồ quen thuộc:

* **CPU** đi với **global memory/RAM** của nó, gắn trực tiếp qua socket và bus.
* **GPU** có **memory riêng** nằm trên bo mạch của card.
* Hai bên kết nối với nhau qua **PCI interface**.

---

### 🔬 Bên trong một GPU Nvidia

Khối màu xanh là card GPU. Bên trong có đơn vị quan trọng nhất: **SM (Streaming Multiprocessor)** — khái niệm sẽ xuất hiện liên tục trong khóa học.

Ngoài SM còn có **L2 cache**, **global memory**, **scheduler** và **dispatcher**. Mỗi SM chứa nhiều core chuyên biệt: core **floating point**, core **integer**, **tensor core** cho nhân ma trận, **special function unit** (ví dụ tính log), cùng **load/store unit** để đọc/ghi memory.

Với **A100**:

* Khoảng **108 SM**, mỗi SM có **64 core single precision** → toàn GPU khoảng **7.000 core single precision**.
* Thêm khoảng **7.000 core integer**.
* **L1 cache nằm trong SM**, còn **L2 cache nằm trong GPU** (không nằm trong SM).
* Hình trong whitepaper Ampere chỉ là **một phần tư của một SM**.

Sức tính toán này là lý do A100 có mặt trong nhiều siêu máy tính. Trên bảng **Top500**, A100 góp mặt trong **3 trong 10** hệ mạnh nhất, gồm **Leonardo** ở vị trí thứ 4, cùng các hệ thứ 8 và thứ 9. Meta cũng công bố dự án siêu máy tính dựa nhiều vào A100, và có đồn đoán sẽ tích hợp **H100** (ra mắt 2022, sau A100 hai năm).

Bài sau mình sẽ lùi lại lịch sử để xem Nvidia đã đi từ chiếc GPU một core tới những cỗ máy này như thế nào.
