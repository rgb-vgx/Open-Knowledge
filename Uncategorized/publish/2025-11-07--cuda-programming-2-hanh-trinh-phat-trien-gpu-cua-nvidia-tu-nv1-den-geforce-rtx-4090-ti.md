---
title: 'CUDA Programming 2: Hành Trình Phát Triển GPU của Nvidia — Từ NV1 đến GeForce
  RTX 4090 Ti'
date: '2025-11-07 17:02:45'
date_gmt: '2025-11-07 10:02:45'
modified: '2025-11-07 17:30:20'
status: publish
slug: cuda-programming-2-hanh-trinh-phat-trien-gpu-cua-nvidia-tu-nv1-den-geforce-rtx-4090-ti
wordpress_id: 533
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/11/07/cuda-programming-2-hanh-trinh-phat-trien-gpu-cua-nvidia-tu-nv1-den-geforce-rtx-4090-ti/
categories:
- Nvidia
- Uncategorized
tags: []
---

Chào mừng bạn trở lại với series **CUDA Programming**.  
Trong bài trước, chúng ta đã tìm hiểu sự khác nhau giữa **CPU và GPU**, từ đó hiểu tại sao GPU lại vượt trội trong các bài toán xử lý song song.

Trong bài này, chúng ta sẽ đi **ngược dòng thời gian**, khám phá **lịch sử hình thành và phát triển của GPU Nvidia** — công ty đang dẫn đầu thế giới trong lĩnh vực tính toán hiệu năng cao, đồ họa, và trí tuệ nhân tạo.

Việc hiểu **lịch sử phát triển GPU** sẽ giúp bạn:

- Nắm được **tư duy thiết kế phần cứng GPU**.
- Hiểu tại sao GPU ngày nay lại có hàng nghìn nhân xử lý.
- Biết được **quá trình tiến hóa của kiến trúc GPU**, phục vụ trực tiếp cho việc học CUDA sắp tới.

---

## 1️⃣ Nvidia ra đời như thế nào?

Nvidia được thành lập vào năm **1993** bởi **Jensen Huang** cùng các cộng sự.  
Vào thời điểm đó, máy tính cá nhân và game đang phát triển mạnh, nhưng phần cứng đồ họa còn hạn chế. Nvidia nhìn thấy cơ hội và bắt đầu nghiên cứu **bộ xử lý đồ họa chuyên dụng** — thứ ngày nay chúng ta gọi là **GPU (Graphics Processing Unit)**.

---

## 2️⃣ Sản phẩm đầu tiên: NV1 (1995)

Năm 1995, Nvidia tung ra thiết bị đầu tiên: **NV1**.

| Thông số | NV1 (1995) |
| --- | --- |
| Số lõi | **1 core** |
| Bộ nhớ | **2 MB** |
| Độ rộng bus | **64-bit** |
| Xung nhịp | **~75 MHz** |

Ở thời điểm đó, thiết bị này được xem là sáng tạo, nhưng chưa đủ mạnh để tạo ra sự bùng nổ trên thị trường. Tuy nhiên, nó đặt viên gạch đầu tiên cho kỷ nguyên GPU.

---

## 3️⃣ Nhảy vọt công nghệ: So sánh NV1 với RTX 4090 Ti

Hãy xem GPU hiện đại nhất **GeForce RTX 4090 Ti** để thấy sự thay đổi kinh khủng đến mức nào:

| Thông số | NV1 (1995) | RTX 4090 Ti (2023+) | Mức tăng trưởng |
| --- | --- | --- | --- |
| Số lõi | **1** | **~18.000** | **↑ 10.000x** |
| Bộ nhớ | **2 MB** | **48 GB** | **↑ 24.000x** |
| Xung nhịp | ~75 MHz | ~2.400 MHz | **↑ 32x** |

📌 Chỉ trong hơn 25 năm, GPU đã chuyển từ **một nhân xử lý đơn giản** sang **siêu máy tính thu nhỏ với hàng chục nghìn lõi**.

## 4️⃣ Bước ngoặt lớn: Riva 128 (1997)

Năm **1997**, Nvidia ra mắt **Riva 128 (NV3)** — thiết bị giúp họ **lần đầu tiên thành công trên thị trường**.

- Là một trong các GPU **đầu tiên hỗ trợ tăng tốc đồ họa 3D**.
- Bán được **1 triệu thiết bị chỉ trong 4 tháng**.
- Góp phần đưa Nvidia trở thành **công ty dẫn đầu lĩnh vực GPU**.

Từ đây, Nvidia chính thức **khẳng định tên tuổi** trong ngành đồ họa máy tính.

---

## 5️⃣ Cuộc cách mạng: Dòng GeForce (1998)

Một năm sau, năm **1998**, Nvidia ra mắt thế hệ GPU huyền thoại: **GeForce**.

Mẫu đầu tiên:

| Thông số | GeForce 256 (1998) |
| --- | --- |
| Số lõi | **4 cores** |
| Bộ nhớ | **32 MB** |
| Công năng | Hỗ trợ tăng tốc đồ họa 3D phần cứng |

So với NV1:

- Số lõi tăng từ **1 → 4** (gấp 4 lần)
- Bộ nhớ tăng từ **2 MB → 32 MB** (gấp 16 lần)

Đây được xem là **GPU khách hàng đầu tiên đúng nghĩa**, đặt nền móng cho cả dòng GeForce mà đến nay chúng ta vẫn sử dụng trên PC và laptop.

---

## 6️⃣ Nvidia ngày nay

Kể từ thế hệ GeForce đầu tiên, Nvidia không chỉ:

- Thống trị **thị trường gaming**,
- Mà còn trở thành trụ cột trong các lĩnh vực:
  - **AI / Machine Learning**
  - **High Performance Computing (HPC)**
  - **Data Center**
  - **Siêu máy tính**
  - **Xe tự lái**

Các siêu máy tính mạnh nhất thế giới hiện nay đều sử dụng GPU Nvidia như **A100** và **H100**.

> GPU giờ đây không chỉ dành cho chơi game — mà còn là **xương sống của trí tuệ nhân tạo toàn cầu**.

---

## 7️⃣ Tổng kết bài học

Qua bài học này, bạn đã hiểu:

- Nvidia phát triển GPU từ **một nhân duy nhất** → **hàng chục nghìn nhân song song**.
- GPU tăng tốc tính toán **không phải vì mỗi nhân mạnh**, mà vì **có rất nhiều nhân xử lý cùng lúc**.
- GPU ngày nay đóng vai trò trung tâm trong **AI, đồ họa và siêu máy tính**.

---

## 🎯 Tiếp theo trong series CUDA Programming

Trong **bài #3**, chúng ta sẽ đi vào **kiến trúc GPU Nvidia**:

- Streaming Multiprocessor (SM)
- Tensor Core, FP32 Core, INT32 Core
- Bộ nhớ trong GPU: Register, Shared Memory, L1/L2 Cache, Global Memory

Bài tới sẽ rất quan trọng vì nó liên quan trực tiếp đến **cách bạn viết kernel CUDA sao cho tối ưu**.
