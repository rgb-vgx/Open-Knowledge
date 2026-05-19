---
title: 'Cuda Programming 1: CPU vs GPU – Hiểu sâu để khai mở sức mạnh của GPU'
date: '2025-11-01 00:55:03'
date_gmt: '2025-10-31 17:55:03'
modified: '2025-11-07 16:40:38'
status: publish
slug: cuda-programming-1-cpu-vs-gpu-hieu-sau-de-khai-mo-suc-manh-cua-gpu
wordpress_id: 396
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/01/cuda-programming-1-cpu-vs-gpu-hieu-sau-de-khai-mo-suc-manh-cua-gpu/
categories:
- Nvidia
- Uncategorized
tags: []
---

Trong bài viết hôm nay, chúng ta sẽ đi sâu tìm hiểu sự khác biệt giữa CPU và GPU. Đây là một chủ đề cực kỳ quan trọng, vì khi hiểu rõ nó, bạn sẽ có kiến thức nền tảng để nắm bắt kiến trúc phần cứng GPU, đặc biệt là các thiết kế của Nvidia, nhằm tối ưu hóa hiệu năng cho các ứng dụng của mình.

---

## 🧐 Tại sao phải hiểu rõ phần cứng GPU?

Một câu hỏi thường gặp là: "Chúng ta không thể cứ viết code và chạy nó trên GPU để có hiệu năng tối ưu sao?"

Câu trả lời đáng ngạc nhiên là **không**.

Để khai thác tối đa hiệu năng của GPU, việc hiểu rõ từng đơn vị và thành phần bên trong nó là điều bắt buộc. Hãy tưởng tượng một bác sĩ phẫu thuật mà không có kiến thức toàn diện về giải phẫu cơ thể con người; ca phẫu thuật đó rất có thể sẽ thất bại. Tương tự, để mở khóa toàn bộ tiềm năng của GPU, chúng ta phải "thông thuộc" phần cứng của nó.

Đó chính là mục tiêu của bài viết này.

---

## 🔬 So sánh Kiến trúc CPU và GPU

Thoạt nhìn, cả CPU và GPU dường như chứa các thành phần tương tự nhau:

![](https://com994947723.wordpress.com/wp-content/uploads/2025/11/image.png?w=795)

- Cả hai đều có **DRAM** (hay Bộ nhớ Toàn cục - Global Memory).
- Cả hai đều có nhiều cấp **bộ nhớ đệm (Cache)**. CPU thường có L1, L2, L3; GPU cũng có các cấp cache (như L1, L2) thực hiện các tác vụ tương tự.
- Cả hai đều có các đơn vị xử lý (ALU).

Đây là lúc sự khác biệt cốt lõi xuất hiện:

- **CPU (Central Processing Unit):** Có một số lượng hạn chế các đơn vị xử lý được gọi là **ALU** (Arithmetic and Logic Unit - Đơn vị Số học và Logic).
- **GPU (Graphics Processing Unit):** Có hàng trăm, thậm chí hàng nghìn đơn vị tương tự gọi là **Lõi (Cores)**.

### Sức mạnh Lõi (ALU) vs. Số lượng Lõi (Core)

Nếu so sánh 1-1 (một ALU của CPU - một Lõi của GPU), ALU của CPU mạnh mẽ và phức tạp hơn đáng kể.

**Sức mạnh ở đây nghĩa là gì?**

Hãy nói về **tốc độ (tần số)**. Một CPU hiện đại có thể hoạt động ở tần số 3 hoặc 4 GHz. Trong khi đó, một GPU mạnh mẽ như Nvidia A100 (ra mắt năm 2020) có tần số lõi chỉ khoảng 1.2 GHz, chỉ bằng khoảng 1/4 so với CPU.

**Tại sao lại có sự khác biệt này?**

- **CPU** được thiết kế cho các **tác vụ đa năng (general purpose)**. Các ALU của nó tập trung vào việc thực thi một luồng (single thread) nhanh nhất có thể.
- **GPU** được thiết kế cho **tính toán song song (parallelism)**. Các lõi của nó chuyên biệt hơn, được tối ưu để xử lý hàng nghìn luồng đồng thời.

---

## Sequential vs. Parallel: Khi nào dùng CPU, Khi nào dùng GPU?

Sự khác biệt về thiết kế này ảnh hưởng trực tiếp đến hiệu năng ứng dụng. Chúng ta hãy xem hai kịch bản.

### Kịch bản 1: Tác vụ Tuần tự (Sequential Execution)

Giả sử chúng ta có các lệnh **phụ thuộc lẫn nhau**, nghĩa là lệnh sau cần kết quả của lệnh trước.

**Ví dụ:**

1. `ADD R1, R2, R3` (Cộng R2 và R3, lưu vào R1)
2. `MUL R4, R1, R5` (Nhân R1 với R5, lưu vào R4)
3. `DIV R6, R4, R7` (Chia R4 cho R7, lưu vào R6)

Bạn có thể thấy:

- Lệnh `MUL` (2) phải chờ lệnh `ADD` (1) hoàn thành vì nó cần giá trị trong `R1`.
- Lệnh `DIV` (3) phải chờ lệnh `MUL` (2) hoàn thành vì nó cần giá trị trong `R4`.

Đây gọi là **thực thi tuần tự**. Ngay cả khi chúng ta có 3 lõi riêng biệt, chúng cũng không thể chạy đồng thời. Lệnh 2 vẫn phải đợi lệnh 1, và lệnh 3 vẫn phải đợi lệnh 2.

> **Kết luận:** Trong kịch bản này, một vài ALU mạnh mẽ của **CPU là lý tưởng nhất**. Hàng nghìn lõi của GPU không mang lại lợi ích gì.

### Kịch bản 2: Tác vụ Song song (Parallel Execution)

Bây giờ, hãy tưởng tượng các lệnh **độc lập với nhau**.

**Ví dụ:**

1. `ADD R1, R2, R3`
2. `MUL R4, R5, R6`
3. `DIV R7, R8, R9`

Không có lệnh nào phụ thuộc vào kết quả của lệnh nào. Nếu chúng ta có 3 lõi, chúng ta có thể gán mỗi lệnh cho một lõi và **thực thi tất cả chúng cùng một lúc**.

Hãy mở rộng điều này: Nếu bạn có 1000 lệnh độc lập và một GPU với 1000 lõi, bạn có thể hoàn thành tất cả chỉ trong 1 chu kỳ. Trong khi đó, nếu chạy tuần tự (như kịch bản 1), bạn sẽ mất 1000 chu kỳ.

> **Kết luận:** Khi xử lý các tác vụ có vô số lệnh độc lập (như render đồ họa, tính toán ma trận trong AI), **GPU tỏa sáng** nhờ khả năng chạy hàng nghìn lệnh đồng thời.

Điều quan trọng cần nhớ là: **Không có chuyện GPU luôn tốt hơn CPU trong mọi trường hợp.** Chúng được thiết kế cho các mục đích khác nhau.

---

## 🌍 Chúng "Sống chung" trong Hệ thống như thế nào?

Trong hầu hết các máy tính, CPU và GPU cùng tồn tại trên bo mạch chủ (motherboard).

- **CPU** được gắn vào socket của nó, kết nối trực tiếp với bộ nhớ chính của hệ thống (RAM).
- **GPU** (thường là card đồ họa rời) được cắm vào khe cắm **PCI Express (PCIe)**.
- Giao diện PCIe này tạo ra một liên kết trực tiếp, cho phép CPU và GPU giao tiếp với nhau.

![](https://com994947723.wordpress.com/wp-content/uploads/2025/11/image-1.png?w=554)

Một điểm quan trọng:

- CPU sử dụng **DRAM của hệ thống** (RAM mà bạn thường thấy).
- GPU có **DRAM chuyên dụng của riêng nó** (thường gọi là VRAM hoặc Bộ nhớ Toàn cục), được tích hợp ngay trên bo mạch của GPU.

---

## 🚀 Giải phẫu GPU Nvidia: Bên trong "Cỗ máy"

Bây giờ, hãy tập trung vào kiến trúc GPU của Nvidia.

![](https://com994947723.wordpress.com/wp-content/uploads/2025/11/image-7.png?w=1011)

Thành phần cốt lõi và quan trọng nhất bên trong một GPU Nvidia được gọi là **Streaming Multiprocessor (SM)**. Bạn sẽ nghe thấy thuật ngữ "SM" này rất thường xuyên.

Một GPU được tạo thành từ nhiều SM.

### Bên trong một SM có gì?

Một SM là một cỗ máy phức tạp chứa:

- **Bộ nhớ đệm L1 (L1 Cache):** Nằm bên trong SM. (Lưu ý: Bộ nhớ đệm L2 (L2 Cache) thường nằm bên ngoài các SM, được chia sẻ bởi toàn bộ GPU).
- **Scheduler và Dispatcher:** Các bộ phận lập lịch và điều phối tác vụ.
- **Registers:** Các thanh ghi.
- **Load/Store Units:** Đơn vị chịu trách nhiệm đọc và ghi dữ liệu từ bộ nhớ.
- **Các lõi (Cores) chuyên dụng:**
  - **Lõi Floating Point (FP Cores):** Xử lý các phép toán dấu phẩy động.
  - **Lõi Integer (INT Cores):** Xử lý các phép toán số nguyên.
  - **Tensor Cores:** Lõi chuyên dụng cho các phép toán nhân ma trận (cực kỳ quan trọng cho AI).
  - **Special Function Units (SFU):** Các đơn vị chức năng đặc biệt (ví dụ: tính log, sin, cos).

### Ví dụ thực tế: Nvidia A100

![](https://com994947723.wordpress.com/wp-content/uploads/2025/11/image-8.png?w=629)

Hãy nhìn vào GPU Nvidia A100 (kiến trúc Ampere, ra mắt năm 2020) để thấy sức mạnh của nó:

- Toàn bộ GPU A100 có khoảng **108 SM**.
- Mỗi SM chứa **64 lõi FP32** (lõi dấu phẩy động đơn).
- Tổng cộng: 108 SM \* 64 lõi/SM = **~7.000 lõi FP32**.

Và đó mới chỉ là lõi FP32! GPU này cũng chứa hàng nghìn lõi INT, cùng với hàng trăm Tensor Core. Sức mạnh tính toán khổng lồ này là lý do tại sao A100 (và người kế nhiệm của nó là H100) là thành phần trung tâm trong vô số siêu máy tính hiệu suất cao trên toàn thế giới (ví dụ: siêu máy tính Leonardo, hay các hệ thống của Meta).

---

## Tóm kết

Hy vọng qua bài viết này, bạn đã có cái nhìn rõ ràng hơn về sự khác biệt cơ bản giữa CPU và GPU:

- **CPU:** Ít lõi (ALU) nhưng rất mạnh. Tối ưu cho các tác vụ **tuần tự (sequential)** và độ trễ thấp.
- **GPU:** Hàng nghìn lõi đơn giản hơn. Tối ưu cho các tác vụ **song song (parallel)** và thông lượng cao.

Hiểu được sự phân biệt này là bước đầu tiên và quan trọng nhất để viết các chương trình có thể khai thác toàn bộ sức mạnh đáng kinh ngạc của phần cứng GPU hiện đại.
