---
title: 'Vì sao L1 hit rate bằng 0?'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 38
status: edited
source: '038 - Why L1 Hit-rate is zero.md'
categories:
- Nvidia
tags: []
---

# 🧊 Vì sao L1 hit rate bằng 0?

> Nguồn: `038 - Why L1 Hit-rate is zero.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46223079)

Ứng dụng cộng ma trận cho **L1 hit rate 0 %** và L2 chỉ khoảng **33 %**. Nhìn qua tưởng code sai, nhưng đây là hệ quả tất yếu của cách truy cập. Bài này đi từ phân cấp bộ nhớ, tới cách warp gom request, và giải thích vì sao L2 lại ra 33 % chứ không phải 0.

### 🗂️ Phân cấp bộ nhớ Ampere

* **HBM** (High Bandwidth Memory) — tầng cuối, bộ nhớ toàn cục. Bus của A100 rộng **hơn 5000 bit**, băng thông khoảng **1.5 TB/s**, lớn hơn nhiều so với bus 64 bit thường thấy trên CPU.
* **L2 cache** — chia thành **hai partition**, **dùng chung cho mọi SM**. Nối với HBM qua memory controller và các partition nối với nhau.
* **L1 cache** — nằm trong từng SM, **không chia sẻ giữa các SM**. L1 data cache **dùng chung đơn vị vật lý với shared memory**; trên A100, tổng dung lượng cấu hình được tối đa **192 kB**, có thể chia ví dụ 100 kB cho shared memory và 92 kB cho L1.

Luồng truy cập: lõi (ALU, tensor core, FP32/FP64/INT) phát request → load/store unit → L1. Trúng L1 thì dữ liệu về ngay; trượt thì hỏi L2; trượt tiếp thì xuống HBM.

---

### 1️⃣ Mỗi phần tử chỉ đọc một lần

Phép cộng ma trận cần: đọc `A[i]`, đọc `B[i]`, ghi `C[i]`. Mỗi phần tử được dùng đúng **một lần**, không có lần đọc thứ hai để mà trúng cache.

Vì vậy hit rate L1 = **0 %** là đúng. Toàn bộ là **compulsory miss** — lần đầu chạm dữ liệu thì chưa thể có trong cache.

So sánh với **nhân ma trận** (sẽ học ở mức sau): hàng đầu của A được nhân với mọi cột của B, nên hàng đó được đọc lại nhiều lần; cột của B cũng được dùng lại cho từng hàng. Chính việc đọc lại tạo ra hit ở L1 và L2.

Tuy vậy, cấu hình block 2 chiều vẫn có thể làm thay đổi các con số này.

---

### 2️⃣ Warp gom request thế nào

Một warp có **32 thread**, mỗi thread load một `float` **4 byte**. Nếu dữ liệu nằm liên tiếp, tổng cần:

```text
32 × 4 byte = 128 byte
```

**Cache line của L1 là 128 byte**, đúng bằng lượng dữ liệu một warp cần. Load/store unit nhận 32 request từ 32 thread, **coalesce** thành **một request** lấy trọn một cache line. Đây là trường hợp lý tưởng; stride lớn sẽ làm request bị xé thành nhiều sector.

Mỗi **sector** là **32 byte**, nên một cache line 128 byte gồm 4 sector. Con số sector xuất hiện nhiều trong metric của Nsight Compute.

---

### 3️⃣ Vì sao L2 hit rate lại là 33 %

Kết quả thực đo: **L1 = 0 %**, **L2 ≈ 33.3 %**. Nếu mọi thứ đều là compulsory miss thì L2 cũng phải 0 %. Lý do nằm ở cách Nsight Compute định nghĩa hit rate:

> Trong L2 cache, Nsight Compute coi **mọi thao tác ghi là hit**, kể cả khi thực tế không trúng.

Với ba ma trận: A và B là **load**, C là **store**. Giả sử 100 load A, 100 load B, 100 store C:

* 200 load đều miss.
* 100 store được tính là 100 hit.
* Hit rate = 100 / 300 ≈ **33 %**.

Đó là toàn bộ lý do con số 33 % xuất hiện, và nó giống hệt ở vector addition (hai vector đọc, một vector ghi).

Có thể kiểm chứng bằng cách đo riêng hit rate của thao tác đọc:

```bash
ncu --metrics lts__t_sector_op_read_hit_rate,lts__t_sector_op_write_hit_rate ./app
```

Kết quả read hit gần **0 %**, còn write hit luôn **100 %** — đúng như cách Nsight Compute quy ước.

---

### ⚖️ Đánh giá L2 cho đúng

Vì write luôn bị tính là hit, **tổng hit rate của L2 không phản ánh trung thực hiệu năng bộ nhớ**. Khi đánh giá L2, nên xem **read hit rate**, không xem tổng. Quy ước này chỉ áp dụng cho L2; L1 không có hành vi bất thường đó.

---

### ✅ Chốt lại

L1 hit 0 % vì mỗi phần tử chỉ được đọc một lần — không có cơ hội trúng cache. L2 hiện 33 % chỉ vì Nsight Compute tính mọi store là hit, không phải vì dữ liệu thực sự nằm trong L2. Muốn đánh giá đúng, hãy đo **read hit rate**. Hiểu điều này tránh việc "tối ưu" nhầm vào một chỉ số bị thổi phồng.

> ⚠️ Cần kiểm chứng: số liệu L1/shared lấy theo whitepaper A100 (GA100) và RTX 3090 (GA102) tại thời điểm quay khóa — **192 kB** gộp trên A100 (GA100), **128 kB** trên RTX 3090 (GA102). Quy ước "store được tính là hit" trong L2 là quan sát của giảng viên trên Nsight Compute; tài liệu Nsight Compute không nêu rõ quy ước này, và metric Nsight Compute phụ thuộc phiên bản, nên đối chiếu lại với bản đang dùng.
