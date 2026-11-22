---
title: 'Allocated active blocks per SM: giới hạn nào quyết định?'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 28
status: edited
source: '028 - Allocated active blocks per SM (important).md'
categories:
- Nvidia
tags: []
---

# 📦 Allocated active blocks per SM: giới hạn nào quyết định?

> Nguồn: `028 - Allocated active blocks per SM (important).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/42845852)

**Allocated active blocks per SM** là số block thực sự chạy đồng thời trên một SM — khác với số block được gán. Nó ngang tầm quan trọng với occupancy và trực tiếp quyết định mức sử dụng GPU. Bài này lấy bảng giới hạn phần cứng của Ampere, đi qua từng ràng buộc, rồi lấy giá trị nhỏ nhất.

### 📋 Bốn dòng giới hạn của Ampere (A100)

Bảng từ whitepaper A100:

| Giới hạn | Giá trị |
|---|---|
| Thread block tối đa mỗi SM | **32 block** |
| Warp tối đa mỗi SM | **64 warp** |
| Register tối đa mỗi SM | **65 536** |
| Shared memory mỗi SM | (giới hạn riêng) |

Điểm cốt lõi: **giới hạn warp điều khiển số block active mỗi SM**. Có thể gán hàng trăm, hàng nghìn block, nhưng chỉ 32 hoặc ít hơn chạy cùng lúc.

---

### 🧵 Warp limit ép số block

Giả sử ứng dụng gán **32 block/SM**, mỗi block **4 warp** → tổng **128 warp**, vượt mức 64.

Trình biên dịch hiểu rằng block limit là 32 nhưng warp limit là 64, nên **giảm số block active từ 32 xuống 16**: 16 × 4 = **64 warp**, vừa giới hạn. Khái niệm này hiện trong Nsight Compute dưới tên **Block Limit Warps**.

Con số block tối đa trên toàn GPU có thể lên tới hàng triệu (kiểm tra bằng Runtime API). Chia cho 108 SM của A100 thì mỗi SM có thể nhận hơn 1000 block — nhưng chỉ 32 hoặc ít hơn chạy đồng thời.

---

### 💾 Register limit và register spilling

Giới hạn register A100 hơn **65 000** mỗi SM. Xét ứng dụng dùng **1 block/SM**, block 1024 thread, mỗi thread cần **100 register** → 1024 × 100 = hơn **100 000 register**, vượt mức.

Vì chỉ có một block, không thể giảm số block; cách duy nhất là **giảm số thread mỗi block**. Nếu không, register tràn ra **local memory** — hiện tượng **register spilling**. Local memory chậm hơn register nên hiệu năng giảm; cần kiểm tra ứng dụng có phụ thuộc nhiều vào spilling không.

Ví dụ tính số block active theo register:

1. Block size = **512 thread**, mỗi thread cần **16 register**.
2. Register mỗi block = 512 × 16 = **8192**.
3. Giới hạn SM = 65 536 → 65 536 / 8192 = **8 block**.

Vậy dù bảng ghi 32 block/SM, SM chỉ chọn **8 block** chạy đồng thời.

---

### 🔻 Lấy giá trị nhỏ nhất trong bốn ràng buộc

Giả sử:

* Block limit tổng: **32**
* Block limit do warp: **4**
* Block limit do register: **8**
* Block limit do shared memory: **16**

SM chọn **min(32, 4, 8, 16) = 4 block**. Đây chính là lý do khi tính theoretical occupancy ta luôn lấy giá trị nhỏ nhất trong bốn con số.

---

### 🔬 Profile vector addition trên RTX 3090

Mở section **Occupancy** của Nsight Compute, bốn chỉ số đầu là:

* Block Limit Warps: **16**
* Block Limit Shared Memory: **16**
* Block Limit Registers: **42**

Giá trị nhỏ nhất là **16**, nên allocated active blocks/SM = 16. Không phải 32 vì đây là **RTX 3090**, không phải A100.

Với block size **96 thread** (3 warp) và 16 block: 16 × 3 = **48 warp**, đúng bằng số warp tối đa mỗi SM của RTX 3090 → theoretical occupancy **100 %**.

---

### ✅ Chốt lại

Số block chạy đồng thời trên một SM là **giá trị nhỏ nhất** trong bốn giới hạn: số block tối đa, warp, register và shared memory. Hiểu điều này giải thích vì sao occupancy tính theo min, và vì sao cùng một kernel nhưng chạy trên A100 và RTX 3090 lại ra con số khác nhau.
