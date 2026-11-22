---
title: 'Cách xác định architecture và generation của một GPU'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 4
status: edited
source: '004 - How to know the Architecture and Generation.md'
categories:
- Nvidia
tags: []
---

# 🔎 Cách xác định architecture và generation của một GPU

> Nguồn: `004 - How to know the Architecture and Generation.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/40734902)

Biết một GPU thuộc generation nào, architecture nào là kỹ năng tra cứu cơ bản. Bài này chỉ cách dùng **TechPowerUp** để đọc thông số của A100 và RTX 3090, rồi rút ra một dấu hiệu trực quan để phân biệt GPU Tesla với GeForce.

### 🔎 Tra cứu trên TechPowerUp

**TechPowerUp** là website lưu cơ sở dữ liệu GPU của nhiều hãng. Cách tra rất đơn giản: gõ lên Google **"A100 GPU techpowerup"**, mở kết quả đầu tiên; làm tương tự với **"RTX 3090 techpowerup"**.

Trên trang thông số, các bạn sẽ thấy:

* **Tên chip điện tử**: A100 dùng chip **GA100**.
* **Số core**: A100 khoảng **7.000 core**; RTX 3090 **hơn 10.000 core**.
* Nhiều thông số khác về khả năng của từng GPU.

Một lưu ý quan trọng: con số **6.192 core** hiển thị cho A100 **chỉ dành cho single precision**, không phải tổng số core cho mọi loại phép toán. A100 còn có core cho **integer** và **double precision** — phần này sẽ được mổ xẻ từ whitepaper ở các bài sau.

---

### 🧭 Đọc ra generation và architecture

Với **RTX 3090**:

* **Generation**: **GeForce 30** (ở đây chỉ cần nhớ tên **GeForce**).
* **Architecture**: **Ampere**.

Với **A100**:

* **Generation**: **Tesla** — dành cho server HPC và siêu máy tính.
* **Architecture**: cũng là **Ampere**.

Điểm đáng chú ý: hai GPU **cùng architecture Ampere** nhưng phục vụ hai mục đích hoàn toàn khác nhau.

---

### ❄️ Dấu hiệu trực quan: có quạt hay không

Làm sao xác nhận nhanh một GPU là Tesla hay GeForce khi chỉ nhìn ảnh?

* **Tesla** thường **không có quạt tản nhiệt onboard**. A100, P100, V100 — xem ảnh đều không thấy quạt.
* **GeForce** như dòng RTX thường **có quạt tích hợp**.

Lý do nằm ở môi trường vận hành:

1. GPU Tesla được lắp trong **server HPC và siêu máy tính**, nơi đã có hệ thống làm mát ngoài mạnh và phức tạp hơn nhiều.
2. GPU GeForce chạy trong **desktop, laptop, workstation** thông thường, cần quạt riêng để tản nhiệt.

---

### ✅ Chốt lại

Bảng ghi nhớ nhanh hai ví dụ trong bài:

| GPU | Chip | Generation | Architecture | Quạt |
|---|---|---|---|---|
| RTX 3090 | — | GeForce 30 | Ampere | Có |
| A100 | GA100 | Tesla | Ampere | Không |

Ba bước để xác định một GPU: tra **TechPowerUp** theo tên GPU, đọc **tên chip** và **số core**, rồi xem mục **generation/architecture**. Muốn xác nhận nhanh bằng mắt thì nhìn quạt tản nhiệt. Bài sau mình sẽ phân biệt **GPU** với **GPU chip** — hai thứ mà nhiều người vẫn dùng thay nhau.
