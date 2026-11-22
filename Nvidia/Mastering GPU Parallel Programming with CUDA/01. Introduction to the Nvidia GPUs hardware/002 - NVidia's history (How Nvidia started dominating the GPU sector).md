---
title: 'Lịch sử Nvidia: từ NV1 đến GeForce'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 2
status: edited
source: '002 - NVidia''s history (How Nvidia started dominating the GPU sector).md'
categories:
- Nvidia
tags: []
---

# 🏛️ Lịch sử Nvidia: từ NV1 đến GeForce

> Nguồn: `002 - NVidia's history (How Nvidia started dominating the GPU sector).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/40606346)

Trước khi đi vào kiến trúc, bài này kể lại chặng đường của Nvidia qua vài cột mốc phần cứng. Nhìn những con số của chiếc GPU đầu tiên đặt cạnh một card hiện đại, các bạn sẽ thấy rõ quy mô thay đổi của ngành GPU trong khoảng 25 năm.

### 🏭 Những năm đầu và chiếc NV1

Nvidia được thành lập năm **1993** bởi Jensen Huang. Chỉ **hai năm** sau, năm 1995, hãng ra mắt sản phẩm đầu tiên: **NV1**.

Cấu hình của NV1 rất đơn giản:

* **2 MB** bộ nhớ.
* Bus width **64 bit**.
* **Một core** duy nhất.

Đặt cạnh một GPU gần đây là **GeForce RTX 4090 Ti**, khoảng cách hiện ra ngay:

| Thông số | NV1 (1995) | RTX 4090 Ti | Mức tăng |
|---|---|---|---|
| Số core | 1 | khoảng 18.000 | khoảng 10.000 lần |
| Bộ nhớ | 2 MB | 48 GB | khoảng 24.000 lần |
| Xung nhịp | 75 MHz | khoảng 2.400 MHz | khoảng 32 lần |

Đây là minh chứng cho sự tiến hóa của công nghệ GPU trong 25 năm.

---

### 🎮 Riva 128 và cú hích thị trường

Năm **1997**, Nvidia giới thiệu **Riva 128**, còn gọi là **NV3**. Đây là một trong những GPU đầu tiên đưa **tăng tốc 3D** ra thị trường tiêu dùng, nhờ đó thành công hơn người tiền nhiệm NV1.

Riva 128 là **thành công thương mại lớn đầu tiên** của Nvidia, giúp hãng khẳng định vị thế: khoảng **1 triệu unit** bán ra chỉ trong **4 tháng**.

---

### 🚀 Thế hệ GeForce và bước ngoặt 1998

Năm **1998**, Nvidia ra mắt thế hệ **GeForce** — cái tên quen thuộc có mặt trong rất nhiều desktop và laptop. Đây là bước chuyển mang tính cách mạng của ngành GPU.

So với NV1, chiếc GPU GeForce đầu tiên:

* Có **4 core** xử lý, thay vì 1 core — với năm 1998, bốn core trong một thiết bị là một cuộc cách mạng.
* Bộ nhớ tăng từ **2 MB lên 32 MB**, tức **16 lần**.

Từ đó tới nay, Nvidia là cái tên phổ biến nhất trong ngành GPU, vừa dẫn dắt mảng tăng tốc tính toán, vừa thống trị mảng gaming.

---

### ✅ Chốt lại

Dòng thời gian để nhớ nhanh:

* **1993**: Nvidia được thành lập.
* **1995**: NV1 — 1 core, 2 MB, bus 64 bit, xung 75 MHz.
* **1997**: Riva 128 (NV3) — tăng tốc 3D, bán khoảng 1 triệu unit trong 4 tháng.
* **1998**: GeForce — 4 core, 32 MB.

Ba cột mốc cần nhớ: **NV1 (1995)** với 1 core và 2 MB; **Riva 128 (1997)** đưa 3D ra đại chúng; **GeForce (1998)** với 4 core và 32 MB. Bài tiếp theo mình sẽ tách hai khái niệm rất dễ nhầm: **architecture** và **generation**.
