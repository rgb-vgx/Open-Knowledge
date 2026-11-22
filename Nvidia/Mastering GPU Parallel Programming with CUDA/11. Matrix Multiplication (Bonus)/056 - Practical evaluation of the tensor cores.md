---
title: 'Đo thực tế: tensor core nhanh gấp 4–7 lần core thường'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 56
status: edited
source: '056 - Practical evaluation of the tensor cores.md'
categories:
- Nvidia
tags: []
---

# 📏 Đo thực tế: tensor core so với core thường

> Nguồn: `056 - Practical evaluation of the tensor cores.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46549329)

Lý thuyết ở bài trước nói tensor core nhanh hơn nhiều. Bài này chạy hai chương trình y hệt nhau về kích thước ma trận và kiểu dữ liệu, chỉ khác một dùng core thường và một dùng tensor core, rồi đo. Không tối ưu gì thêm — để thấy phần cứng tự nó cho bao nhiêu.

### ⚙️ Điều kiện so sánh

* Cùng ma trận vuông **1024 × 1024**.
* Cùng độ chính xác **half precision (FP16)**.
* Cùng dùng shared memory, cùng cấu trúc tiling.
* Khác duy nhất: bản thứ hai gọi **WMMA API** — thư viện C++ của CUDA để phát instruction tensor core.

---

### 🧯 Lỗi biên dịch và cách sửa

Build bản WMMA bằng:

```bash
nvcc -o tensor tensor.cu
```

Compiler báo `name followed by '::' must be a class or a namespace` — như thể `nvcuda::wmma` không tồn tại. Nguyên nhân không phải code sai mà là **kiến trúc biên dịch mặc định quá cũ**.

Sửa bằng cách chỉ định compute capability:

```bash
nvcc -arch=sm_80 -o tensor tensor.cu
```

* `sm_80` ứng với **Ampere** (A100). Với GPU khác phải đổi số: Turing `sm_75`, Volta `sm_70`, Ada `sm_89`.
* Không chỉ định, `nvcc` có thể chọn `sm_50` — kiến trúc **trước 2017**, không có tensor core, nên mọi khai báo WMMA đều không tồn tại.
* Dùng thêm `-code=sm_80` để chắc chắn sinh mã cho đúng kiến trúc đích.

Đây là lý do phần cứng ở đầu khóa học quan trọng: biết GPU của mình là kiến trúc nào thì mới đặt đúng cờ biên dịch.

---

### 📊 Kết quả đo

| Kích thước | Core thường | Tensor core | Tăng tốc |
|---|---|---|---|
| **1024 × 1024** | 2,45 ms | **577 µs** | **~4,25×** |
| **2048 × 2048** | 20,17 ms | **2,73 ms** | **~7,4×** |

Hai điều đáng chú ý:

* Ma trận càng lớn, khoảng cách càng rộng (4,25× → 7,4×). Với ma trận nhỏ, overhead khởi tạo và nạp dữ liệu chiếm tỷ trọng lớn, nên lợi thế tensor core bị pha loãng.
* Con số này **thấp hơn** mức 9× trên A100 vì máy chạy là **RTX 3060** — card phổ thông, tensor core ít hơn và xung thấp hơn A100. Trên A100, mức tăng thường rơi vào **7–9×**.

---

### 🧠 Đọc kết quả đúng cách

Đây là so sánh **công bằng ở mức code**: cùng thuật toán, cùng tiling, cùng shared memory, chỉ đổi đơn vị tính toán. Nó trả lời câu hỏi "phần cứng cho thêm bao nhiêu?" chứ chưa phải "tối đa được bao nhiêu?".

Nếu áp thêm các tối ưu đã học — chọn tile khớp số SM, tránh bank conflict, unroll hợp lý — mức tăng còn cao hơn nữa. Ngược lại, dùng tensor core mà tile/bước nạp không phù hợp thì có thể tệ hơn cả core thường, vì tensor core cần dữ liệu được tổ chức đúng khuôn (fragment).

---

### 🎓 Hướng tiếp theo

Hai bài sau lần lượt giới thiệu **WMMA API** — cách viết kernel dùng tensor core trực tiếp, thứ mà hầu hết tài liệu online bỏ qua và chỉ nói về thư viện — và **cuBLAS**, cách gọi thư viện có sẵn. Hiểu WMMA giúp hiểu vì sao CUTLASS/cuBLAS nhanh: chúng làm đúng những bước này nhưng tinh chỉnh ở mức cực đoan.
