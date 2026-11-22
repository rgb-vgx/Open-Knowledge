---
title: 'Các mức song song hóa: vector addition với vector cực lớn'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 24
status: edited
source: '024 - 005 levels of parallelization - Vector addition with Extra-large vecto.md'
categories:
- Nvidia
tags: []
---

# 🧩 Các mức song song hóa: vector addition với vector cực lớn

> Nguồn: `024 - 005 levels of parallelization - Vector addition with Extra-large vecto.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/42255560)

Đẩy vector lên hơn **400 triệu phần tử** thì chương trình vẫn chạy; lên hơn **1 tỷ** thì sập vì hết memory. Bài này chỉ cách tìm lỗi runtime bằng `printf`, tính dung lượng memory cần thiết, và giải pháp **chia vector thành nhiều chunk** để xử lý lần lượt — một tầng song song hóa ở mức ứng dụng.

### 📦 Vector hơn 400 triệu phần tử

Kích thước vector trong code:

```cuda
#define SIZE (1024 * 432 * 1024)
```

Tức hơn **400 triệu** phần tử. Cấu hình launch vẫn giữ **1024 thread/block** (mức tối đa), số block là **1024 × 432**, sao cho tích hai cấu hình bằng đúng số phần tử.

Chạy thử: biên dịch và chạy bình thường, không lỗi compile hay runtime, kết quả in ra đúng (kiểm tra `a + b = c` ở vài dòng).

---

### 💥 Nhân đôi lên hơn 1 tỷ thì sập

Đổi `432` thành `1024`:

```cuda
#define SIZE (1024 * 1024 * 1024)
```

Hơn **1 tỷ** phần tử. Compile **không lỗi**, nhưng chạy **không ra kết quả** — vòng `for` in kết quả không chạy, và terminal hiện **thông báo lỗi runtime**.

Đây là lỗi **runtime**, không phải compile. Không có dòng code nào bị compiler chỉ ra.

---

### 🐞 Tìm lỗi bằng printf

Với lỗi runtime, một kỹ thuật hiệu quả là rải **`printf`** ở nhiều vị trí, in các nhãn như `hello 00`, `hello 01`, `hello 02`, rồi xem nhãn nào **không** xuất hiện.

Kết quả trong video:

* `hello 00` in ra → lỗi không nằm trước mốc này.
* `hello 01` in ra → cấp phát memory trên **GPU** (`cudaMalloc`) ổn.
* `hello 02` **không** in → lỗi nằm trong ba instruction cấp phát trên **CPU** (`malloc`).

Khác với lỗi thiếu dấu chấm phẩy — compiler chỉ thẳng dòng lỗi. Lỗi runtime phải tự khoanh vùng.

---

### 🧮 Tính dung lượng memory

Mỗi vector hơn 1 tỷ phần tử, mỗi phần tử **4 byte** (kiểu `int`):

* Tổng byte mỗi vector = số phần tử × 4.
* Chia lần lượt cho 1024 để ra KB, MB, rồi GB → mỗi vector khoảng **4 GB**.
* Ba vector A, B, C cần khoảng **12 GB**.

Máy trong video có **16 GB RAM**, nhưng hệ điều hành và ứng dụng đang dùng khoảng **10 GB**, chỉ còn **5–6 GB** trống. Vì vậy `malloc` cho vector thứ hai/ba thất bại.

---

### 🧩 Giải pháp: chia thành chunk

Không cấp phát cả vector, mà chia mỗi vector thành các **chunk** nhỏ, xử lý lần lượt:

1. Chọn **chunk size** phù hợp dung lượng trống. Ví dụ 512 → mỗi vector **2 chunk**; 128 → **8 chunk** (1024 / 128 = 8).
2. Với mỗi chunk: khởi tạo chunk A, chunk B → copy lên GPU → launch kernel trên chunk → copy kết quả về chunk C → in hoặc chuyển tiếp.
3. **Giải phóng memory** của chunk trước khi sang chunk kế tiếp, để không tích lũy.
4. Dùng vòng `for` duyệt qua các chunk.

Kernel và hàm khởi tạo **không đổi**; chỉ thay `a, b, c` bằng `chunk_a, chunk_b, chunk_c`, và dùng `chunk_size` thay cho kích thước toàn vector khi `malloc`/`cudaMemcpy`.

---

### 📊 Kết quả

* In **offset** đầu mỗi chunk: chunk đầu offset 0, chunk sau bắt đầu đúng bằng bội số của chunk size.
* Có **8 offset** tương ứng 8 chunk.
* Memory quan sát được chỉ quanh **11 GB** khi chạy, và sau khi `free` quay về khoảng **9.4 GB** — chứng tỏ giải phóng đúng.
* Kết quả đúng, ví dụ **13 + 77 = 90**.

Lưu ý: nếu đổi kích thước vector mà **quên đổi cấu hình launch**, kết quả sẽ sai dù chương trình chạy — vì số thread không còn khớp số phần tử.

**Chốt lại.** Vector cực lớn dạy ba điều: giới hạn memory là thật (4 GB/vector, 12 GB cho ba vector), lỗi runtime phải truy bằng `printf`, và **chunking** là cách đưa bài toán vượt RAM về kích thước xử lý được. Đây là tầng song song hóa ở mức ứng dụng, nối tiếp các tầng thread → warp → block → grid đã học.
