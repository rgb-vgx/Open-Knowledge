---
title: 'Half, single và double precision trong GPU'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 9
status: edited
source: '009 - Half, single and double precision operations.md'
categories:
- Nvidia
tags: []
---

# 🔢 Half, single và double precision trong GPU

> Nguồn: `009 - Half, single and double precision operations.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/40809376)

Chọn đúng kiểu số giống như chọn đúng dụng cụ trong hộp đồ nghề: quyết định độ chính xác và chi phí tính toán. Bài này đi từ integer tới **FP16/FP32/FP64**, kèm số cycle thực thi và số chữ số biểu diễn được của số pi.

### 🔢 Integer: 8, 16, 32 và 64 bit

Với số nguyên, ta có thể dùng **8, 16, 32 hoặc 64 bit**. Càng nhiều bit, số lưu được càng lớn:

* **8 bit unsigned**: 0 đến 255.
* **8 bit signed**: khoảng −128 đến 127.
* **64 bit**: lên tới khoảng **18 quintillion**.

Trong C/CUDA:

* `int` dùng **32 bit**; `long` thường dùng **64 bit**.
* `float` dùng **32 bit**; `double` dùng **64 bit**.

---

### 🎯 Ba mức floating point

Với số có dấu thập phân, ta có ba kích thước:

| Tên | Tên khác | Số bit | Đặc điểm |
|---|---|---|---|
| Half precision | **FP16** | 16 bit (2 byte) | Độ chính xác thấp, tốn ít tài nguyên |
| Single precision | **FP32** | 32 bit | Cân bằng tốc độ và độ chính xác |
| Double precision | **FP64** | 64 bit | Độ chính xác cao nhất |

* **FP16** phù hợp cho **machine learning** và xử lý đồ họa, nơi không cần độ chính xác cao.
* **FP32** là lựa chọn mặc định cho phần lớn tác vụ tính toán.
* **FP64** dành cho **scientific computing** và mô phỏng phức tạp, nơi từng chữ số thập phân đều có thể gây hiệu ứng cánh bướm — ví dụ mô phỏng khí hậu hay cấu trúc phân tử.

---

### ⏱️ Số cycle thực thi

Một nghiên cứu về các kiểu dữ liệu GPU cho thấy:

* Tính toán **double precision** cần **4 cycle**.
* Tính toán **single precision** chỉ cần **2 cycle**.

Ví dụ với đoạn code:

```cuda
float x = 10.3, y = 5.8, z;
z = x + y;
```

Phép cộng này tốn **2 cycle**. Nếu thay `float` bằng `double`, cùng phép cộng tốn **4 cycle** — chậm hơn nhưng chính xác hơn.

---

### 🔬 Số pi qua từng mức precision

Cách biểu diễn số **pi** cho thấy rõ khác biệt:

* **Half precision**: chỉ **2 chữ số** sau dấu thập phân.
* **Single precision**: **7 chữ số**.
* **Double precision**: **15 chữ số**.

Hệ quả: một số rất nhỏ sẽ **bị xấp xỉ thành 0** trong half precision, vì FP16 chỉ giữ được khoảng **2–3 chữ số** sau dấu thập phân. Đó là lý do half precision không phù hợp với các giá trị quá mịn.

---

### ✅ Chốt lại

Chọn kiểu số là đánh đổi giữa **tốc độ/tài nguyên** và **độ chính xác**: FP16 cho ML và đồ họa, FP32 cho đa số tác vụ, FP64 cho mô phỏng khoa học. Hiểu số cycle và số chữ số biểu diễn giúp các bạn dự đoán được chi phí tính toán trước khi viết kernel.
