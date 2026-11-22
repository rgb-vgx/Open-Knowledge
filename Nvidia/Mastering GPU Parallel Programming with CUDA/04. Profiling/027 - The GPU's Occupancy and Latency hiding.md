---
title: 'Occupancy và cơ chế ẩn độ trễ của GPU'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 27
status: edited
source: '027 - The GPU''s Occupancy and Latency hiding.md'
categories:
- Nvidia
tags: []
---

# 🧠 Occupancy và cơ chế ẩn độ trễ của GPU

> Nguồn: `027 - The GPU's Occupancy and Latency hiding.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/42389010)

**Occupancy** đo mức sử dụng tài nguyên GPU, và là một chỉ số quan trọng ngang với memory bandwidth hay instruction throughput. Vấn đề là phần lớn tài liệu chỉ nói về **theoretical occupancy** mà bỏ qua **achieved occupancy** — hai con số rất khác nhau. Bài này đọc giới hạn phần cứng, thí nghiệm đổi block size, rồi giải thích vì sao hai occupancy lệch nhau.

### 📐 Theoretical và achieved occupancy

**Theoretical occupancy** = số warp dùng trong kernel chia cho số warp tối đa mà một SM chứa được.

* Tử số thay đổi theo cấu hình ứng dụng.
* Mẫu số lấy từ whitepaper hoặc từ Runtime API.

**Achieved occupancy** là mức sử dụng thực tế trong lúc chạy, phụ thuộc hành vi động của các instruction.

Đọc mẫu số bằng hai cách:

```cuda
cudaDeviceProp prop;
cudaGetDeviceProperties(&prop, 0);
int maxThreadsPerSM = prop.maxThreadsPerMultiProcessor; // 1536 trên RTX 3090
int maxWarpsPerSM   = maxThreadsPerSM / 32;             // 48 warp

int value;
cudaDeviceGetAttribute(&value, cudaDevAttrMaxThreadsPerMultiProcessor, 0);
```

`cudaDeviceGetAttribute` nhận ba tham số: nơi lưu giá trị, tên thuộc tính và device ID. Trên RTX 3090: **1536 thread/SM**, tức **48 warp/SM**.

Ví dụ đơn giản: dùng 48 warp/SM → 48/48 = **100 %**; dùng 12 warp/SM → 12/48 = **25 %**.

---

### 🧪 Thí nghiệm đổi block size

Vector addition cấu hình **32 thread/block** (1 warp) cho kết quả:

* Theoretical occupancy: **33.33 %**.
* Achieved occupancy: khoảng **15 %**.

Đổi lên **64 thread/block** (2 warp), biên dịch và profile lại:

* Theoretical: **66.67 %** (gấp đôi).
* Achieved: tăng từ 15 % lên **51 %**.

Đổi tiếp lên **96 thread/block** (3 warp):

* Theoretical: **100 %**.
* Achieved: khoảng **73 %**.

Vì sao đổi? Số block active tối đa trên SM là **16**. Mỗi block 96 thread = 3 warp, nên 16 × 3 = **48 warp** — chạm đúng giới hạn 48 warp/SM. Với block 64 thread: 16 × 2 = 32 warp, tức 32/48 = 66.67 %. Với block 32 thread: 16 × 1 = 16 warp, 16/48 = 33.33 %.

Một lưu ý: block size phải là bội số của 32. Chọn 100 thread thì GPU vẫn chạy 128 thread (4 warp).

---

### ⚙️ Scheduler, dispatcher và stall cycle

Một SM Ampere/Volta có **4 partition**. Block chạy trên SM, còn **warp chạy trên partition**. Mỗi partition có **warp scheduler** (chọn warp mỗi cycle) và **dispatcher** (đưa instruction sẵn sàng tới đơn vị tính toán).

Giả sử mỗi partition chạy 4 warp, mỗi SM 4 partition → **16 warp/SM**. Nếu ứng dụng cũng dùng 16 warp thì theoretical occupancy là 100 %.

Trong một cycle không có memory request và không có dependency:

1. Scheduler hỏi các warp ai sẵn sàng.
2. Warp 0 nhận chạy `F multiply`.
3. Dispatcher phát instruction — thực chất là **32 instruction** cho 32 thread của warp, cùng lệnh nhưng khác thanh ghi.
4. Các warp còn lại lần lượt được phát ở các cycle tiếp theo.

Khi mỗi cycle đều có ít nhất một warp sẵn sàng, **achieved occupancy = 100 %** — bằng theoretical.

Ngược lại, nếu một cycle không warp nào sẵn sàng, đó là **stall cycle**. Khi có **load từ global memory** (giả sử 6 cycle cho đơn giản) và instruction sau phụ thuộc vào kết quả load, warp phải chờ. Nếu cả 4 warp đều đang chờ load, scheduler không tìm được warp nào → vài cycle bị stall.

Ví dụ bằng số: 100 cycle tổng, **85 cycle active**, 15 cycle stall → achieved occupancy = **85 %**, dù theoretical là 100 %.

Độ trễ bộ nhớ thực tế trong bài:

* Trúng **L1**: khoảng **30 cycle**.
* Trúng **L2**: khoảng **190–200 cycle**.
* Trượt cả hai, phải ra **global memory**: khoảng **300 cycle**.

---

### 🔄 Vì sao gọi là "ẩn độ trễ"

CPU ít core nên khi gặp dependency thường dùng **out-of-order execution**: đảo thứ tự để chen instruction không phụ thuộc vào chỗ trống. GPU không cần làm vậy vì có rất nhiều warp: warp này chờ thì scheduler chuyển sang warp khác có instruction sẵn sàng. Cứ thế xoay vòng, độ trễ bị "ẩn" sau công việc của warp khác.

Achieved occupancy của toàn GPU không tính trên một partition: nó được tính lặp cho cả **4 partition**, lấy trung bình được occupancy mỗi SM, rồi trung bình tiếp trên **toàn bộ SM**.

---

### ✅ Chốt lại

**Theoretical occupancy** chỉ phụ thuộc số warp trong cấu hình nên tính được bằng công thức; **achieved occupancy** phụ thuộc hành vi instruction lúc chạy nên không thể suy ra bằng phương trình. Tăng block size từ 32 lên 96 thread đã đẩy theoretical từ 33 % lên 100 %, nhưng achieved vẫn dừng quanh 73 % vì stall bộ nhớ và dependency. Hiểu hai chỉ số này là bước đầu để chẩn đoán điểm nghẽn.
