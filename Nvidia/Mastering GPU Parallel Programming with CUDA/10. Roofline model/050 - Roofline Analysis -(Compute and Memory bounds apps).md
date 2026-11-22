---
title: 'Roofline model: ứng dụng bị giới hạn bởi compute hay memory'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 50
status: edited
source: '050 - Roofline Analysis -(Compute and Memory bounds apps).md'
categories:
- Nvidia
tags: []
---

# 📈 Roofline model: chọn đúng hướng tối ưu

> Nguồn: `050 - Roofline Analysis -(Compute and Memory bounds apps).md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46677493)

Trước khi tối ưu bất cứ thứ gì, cần biết ứng dụng đang bị chặn ở đâu. Nếu nó **memory-bound** thì tối ưu phép tính là vô nghĩa, và ngược lại. **Roofline model** trả lời câu hỏi đó bằng một con số duy nhất — **arithmetic intensity** — đặt lên một đồ thị có "mái nhà" là giới hạn phần cứng.

### 🧮 Hai thông số cần đo

1. **Memory bandwidth** — bao nhiêu byte mỗi giây đọc/ghi được. Đơn vị thực tế là **GB/s** hoặc **TB/s**. Ví dụ Ampere A100 (bản 40 GB) đạt khoảng **1.5 TB/s** (chính xác là 1555 GB/s; bản 80 GB là 2039 GB/s).
2. **Instruction throughput** — bao nhiêu phép tính mỗi giây, **riêng cho từng kiểu dữ liệu**: half, single (FP32), double (FP64), integer. Từ whitepaper A100: FP32 **19.5 TFLOPS**, FP64 **9.7 TFLOPS**, INT32 **19.5 TOPS**, tính trên **core thường** (không dùng tensor core). Dùng tensor core thì con số lên hàng trăm TFLOPS.

Hai con số này là **peak** — giới hạn trên lý thuyết của phần cứng.

---

### ❗ Vì sao không thể đánh giá bằng một con số

Biết ứng dụng đạt 1 TB/s **không** nói được nó tốt hay xấu: phải so với peak. Tệ hơn, đạt peak bandwidth có thể vì chương trình làm **quá nhiều** thao tác bộ nhớ, kéo theo ít phép tính hữu ích.

GPU có hai đường ống độc lập — bộ nhớ và tính toán. Đẩy một đường lên 100% không có nghĩa đường kia được dùng. Cần một chỉ số **gộp cả hai**.

---

### 🧠 Arithmetic intensity (AI)

$$\text{AI} = \frac{\text{instruction throughput (FLOP/s)}}{\text{memory bandwidth (byte/s)}} = \frac{\text{FLOP}}{\text{byte}}$$

Đơn vị là **FLOP mỗi byte**: trung bình mỗi byte lấy từ bộ nhớ thì làm được bao nhiêu phép tính. Giây ở tử và mẫu triệt tiêu nhau.

Cách đọc — và đây là chỗ dễ nhầm:

* **AI thấp** (ít phép tính trên mỗi byte) → ứng dụng **memory-bound**. Phải tối ưu bộ nhớ: coalescing, shared memory, hit rate, stride.
* **AI cao** (nhiều phép tính trên mỗi byte) → ứng dụng **compute-bound**. Phải tối ưu tính toán: tăng song song, gỡ phụ thuộc giữa instruction, fast math.

AI cao **không** có nghĩa là "cần tối ưu bộ nhớ" — ngược lại, khi AI cao thì bộ nhớ đã dư sức, nút cổ chai nằm ở core.

---

### 🏔️ Điểm chuyển tiếp (ridge point)

Điểm mà ứng dụng đạt **đồng thời** peak FLOPs và peak bandwidth gọi là **transition point**:

$$\text{AI}_{ridge} = \frac{\text{peak FLOPs}}{\text{peak bandwidth}} = \frac{19.5 \times 10^{12}}{1.555 \times 10^{12}} \approx 12.5\ \text{FLOP/byte}$$

Với A100 FP32, ridge nằm ở khoảng **12.5 FLOP/byte**. Mỗi tổ hợp (kiểu dữ liệu × có/không tensor core) có một ridge riêng, nên có nhiều đồ thị roofline — không dùng chung một cái.

---

### 📐 Vẽ đồ thị

Công thức mô hình:

$$\text{Performance} = \min\big(\text{peak FLOPs},\ \text{AI} \times \text{bandwidth}\big)$$

Hàm `min` là bắt buộc: nếu `AI × bandwidth` vượt peak thì ứng dụng **không thể** chạy nhanh hơn peak, nên lấy peak.

Cách dựng:

1. Trục **x**: AI (FLOP/byte). Trục **y**: performance (FLOP/s).
2. Chọn vài giá trị AI mẫu: 0.1, 0.5, 1, 2 … 32.
3. Tính `AI × peak bandwidth` cho từng điểm — đường **tuyến tính** đi lên (vì bandwidth là hằng số).
4. Chặn trên bằng peak FLOPs → đường **nằm ngang**.
5. Giao của hai đường chính là **ridge point**. Nếu lấy mẫu ở 8 và 16 thì đường ngang bắt đầu trông như ở 16, nhưng điểm thật là **12.5** — đó là lý do phải tính ridge chứ không đọc mắt.

Hình thu được giống "mái nhà": dốc bên trái, phẳng bên phải.

---

### 🎯 Đọc kết quả cho một ứng dụng

1. Vẽ mái nhà bằng **peak** (biên giới lý thuyết của phần cứng).
2. Chạy ứng dụng, lấy từ **Nsight Compute** hai giá trị thực đo: memory bandwidth đạt được và số phép tính.
3. Tính AI thực, đặt điểm lên đồ thị.
4. Điểm nằm **bên trái** ridge → memory-bound. **Bên phải** → compute-bound.
5. Tối ưu xong, điểm phải **dịch lên trên**, tiến về ridge — đó là mục tiêu.

Roofline có thể vẽ cho từng tầng bộ nhớ: **DRAM**, **L2**, **L1**. Chỉ khác nhau ở bandwidth dùng trong công thức — peak DRAM, peak L2 hay peak L1.

---

### 🔬 Áp vào vector reduction

Chạy baseline (file `01`) và mở **GPU Speed of Light → Roofline** trong Nsight Compute. Chọn biểu đồ **single precision** (tensor core trống vì code không dùng).

* Điểm của baseline: **AI ≈ 0,12 FLOP/byte**, performance khoảng **15 GFLOP/s**.
* Ridge point trên RTX 3060: **AI ≈ 30,9** (đọc từ tool; peak card khác A100 nên ridge khác 12.5).
* Điểm **0,12 nằm rất xa bên trái 30,9** → vector reduction là **memory-bound**.

Điều này khớp với toàn bộ section trước: mọi tối ưu đã làm — bỏ modulo, tăng việc mỗi thread, shared memory, unrolling, shuffle — đều là **tối ưu bộ nhớ**. Nếu là compute-bound thì chúng đã không hiệu quả.

Chạy tiếp phiên bản đã tối ưu (`03`):

* AI tăng từ **0,12 lên 0,66** — khoảng **5 lần**.
* Performance đọc được **177 GFLOP/s**.

Điểm dịch sang phải và lên cao, tiến gần ridge — đúng như kỳ vọng của một tối ưu đúng hướng.

---

### ✅ Chốt

Roofline không phải công cụ để "chấm điểm" mà để **chọn đường**. Đo AI, xác định bên nào của ridge, rồi mới chọn kỹ thuật. Với vector reduction, mọi kỹ thuật trong section 9 đều hợp lý vì AI của nó thấp hơn ridge gần 250 lần.
