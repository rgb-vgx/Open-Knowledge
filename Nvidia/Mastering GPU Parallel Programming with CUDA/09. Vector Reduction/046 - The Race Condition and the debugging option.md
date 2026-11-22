---
title: 'Race condition và cái bẫy của cờ -G khi biên dịch CUDA'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 46
status: edited
source: '046 - The Race Condition and the debugging option.md'
categories:
- Nvidia
tags: []
---

# 🏁 Race condition: khi bỏ bộ lọc lại thành sai

> Nguồn: `046 - The Race Condition and the debugging option.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/46756093)

Bài trước bỏ bộ lọc modulo và kết quả vẫn đúng — nhưng đó là **may mắn**, không phải vì code đúng. Một sinh viên chạy đúng đoạn code đó và ra kết quả khác. Truy nguyên ra hai thứ: **race condition** trong thuật toán, và cờ **`-G`** của `nvcc` vô tình che mất lỗi.

### 🧵 Vì sao bỏ bộ lọc lại sinh race

Xét 16 phần tử, bước 1, `stride = 1`. Nếu giữ bộ lọc, chỉ thread chẵn chạy: `a[0] += a[1]`, `a[2] += a[3]`… Các vị trí bị sửa là 0, 2, 4, 6 — còn 1, 3, 5, 7 giữ nguyên. Bước 2 chỉ đọc 0, 2, 4, 6 với `stride = 2`, nên giá trị ở vị trí lẻ không ai dùng.

Bỏ bộ lọc, **mọi** thread đều chạy `a[i] += a[i+1]`:

* Thread 0: `a[0] += a[1]` → đọc `a[1]` rồi ghi `a[0]`.
* Thread 1: `a[1] += a[2]` → **ghi `a[1]`**.

Nếu thread 1 chạy **trước** thread 0, thì khi thread 0 đọc `a[1]`, giá trị đã là `9` (8 + 1) thay vì `1`. Kết quả thành `10 + 9 = 19` thay vì `11`. Kết quả phụ thuộc **thứ tự thực thi** — đúng định nghĩa **race condition**: đổi thứ tự thì ra đáp án khác, và ta không kiểm soát được thứ tự.

Lỗi nằm ở **bước 1**; nếu bước 1 sai thì các bước sau cũng sai theo, và vì thứ tự thực thi không kiểm soát được nên bug có thể "ẩn" trên máy này nhưng hiện trên máy khác.

---

### 🎛️ Vì sao video trước không thấy lỗi

Giảng viên quay lại hai môi trường, Windows (Visual Studio) và Linux (`nvcc`), chạy cùng code **không có bộ lọc**:

* Bản Windows: kết quả khớp CPU (chênh chữ số cuối do `float` khác chuẩn IEEE giữa CPU và GPU, không phải lỗi).
* Bản Linux: cũng lệch.

Sự khác biệt nằm ở cờ biên dịch. Trên Linux, dòng build có `-G`; trên Windows, tùy chọn tương ứng là **CUDA → Device → Generate GPU Debug Information = Yes**, và nó chèn `-G` vào command line.

Bỏ `-G` ở cả hai bên thì kết quả lại **đổi hẳn**, lệch tới cả bậc `10^11` so với `10^10` — race lộ ra rõ ràng.

---

### 📘 `-G` và `-g` khác nhau thế nào

Theo trang **CUDA Compiler Driver NVCC** của NVIDIA:

| Cờ | Tác dụng |
|---|---|
| `-g` | Sinh thông tin debug cho **host code** |
| `-G` | Sinh thông tin debug cho **device code**, và **tắt toàn bộ tối ưu trên device code** |

Chính vế sau mới là thủ phạm. Bình thường compiler tối ưu device code, trong đó có **đổi thứ tự instruction** khi không có phụ thuộc dữ liệu, để tăng song song. `-G` tắt hết, giữ nguyên thứ tự — vô tình che race condition. Debug xong, build release không có `-G` là bug quay lại.

Hệ quả thực hành:

* Code có race **có thể** chạy đúng khi build debug và sai khi build release. Đừng lấy "chạy đúng khi debug" làm bằng chứng code đúng.
* Bỏ bộ lọc modulo chỉ an toàn khi có **barrier đúng chỗ**; ở bài này nó không an toàn về mặt lý thuyết, chỉ nhanh hơn.
* `__syncthreads()` có ở cuối mỗi vòng lặp, nhưng nó chỉ chặn giữa các bước, **không** chặn được đọc/ghi chen nhau bên trong cùng một bước.

---

### 🖥️ Compute capability trong Visual Studio

Cùng chỗ cấu hình có mục **Code Generation**. Giá trị mặc định thường là **`compute_52`** — kiến trúc cũ, không tối ưu cho card mới. Máy trong bài là **RTX 3060**, kiến trúc **Ampere**, nên phải đổi sang đúng kiến trúc của card.

Nếu để mặc định `52`, code vẫn chạy nhưng không dùng hết khả năng phần cứng, và kết quả số học có thể khác.

> ⚠️ Cần kiểm chứng: transcript nói RTX 3060 có compute capability **80** (`sm_80`). Theo bảng CUDA GPUs của NVIDIA, RTX 3060 (GA106) là **8.6**, còn A100 mới là 8.0. Khi đặt `arch`/`code`, hãy tra đúng mã của card mình.

---

### 📝 Bài tập giảng viên giao

Chạy cùng một code trong **bốn** tổ hợp: có/không bộ lọc × có/không `-G`. Với mỗi tổ hợp ghi lại kết quả và thời gian chạy. Mục đích là thấy tận mắt hai điều: `-G` làm chậm chương trình, và nó có thể biến một kết quả sai thành "đúng".

Bài học lớn hơn cả bài học về tốc độ: **kiểm chứng bằng so sánh CPU/GPU trên nhiều cấu hình build**, đừng tin một lần chạy.
