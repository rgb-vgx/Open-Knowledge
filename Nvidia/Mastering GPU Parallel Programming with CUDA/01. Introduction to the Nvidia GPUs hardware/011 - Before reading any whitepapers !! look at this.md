---
title: 'Đọc whitepaper Nvidia đúng cách'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 11
status: edited
source: '011 - Before reading any whitepapers !! look at this.md'
categories:
- Nvidia
tags: []
---

# 📄 Đọc whitepaper Nvidia đúng cách

> Nguồn: `011 - Before reading any whitepapers !! look at this.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/34149372)

Whitepaper là **datasheet** kỹ thuật của một architecture — nguồn thông số đáng tin nhất. Bài này chỉ cách tìm đúng file PDF, nhận ra cấu trúc chuẩn mà mọi whitepaper Nvidia đều theo, và đọc phần quan trọng nhất: **cấu trúc bên trong SM**.

### 🔍 Tìm whitepaper chính thức

Whitepaper là tài liệu mô tả chi tiết architecture, thông số và khả năng của GPU; rất hữu ích khi so sánh các architecture.

Cách tìm: lên Google, gõ **tên chip + "white paper"**. Tên chip lấy từ bảng architecture (ví dụ **GF100**, **GA100**). Kết quả cần tìm là **file PDF chính thức**, không phải bài tóm tắt. Với Ampere, tìm **"GA100 white paper"**.

---

### 🔁 Cấu trúc lặp lại giữa các whitepaper

Nvidia có thói quen so sánh architecture mới với các architecture trước ngay trong whitepaper. Vì thế, whitepaper A100 (Ampere) thường có bảng so sánh với **Volta** và **Pascal** (V100, P100).

Điều thú vị: cùng một bảng đơn vị và metric có thể xuất hiện ở whitepaper **P100, V100, A100 và H100**. Sự nhất quán này nghĩa là chỉ cần hiểu cách đọc **một** whitepaper Nvidia là đủ để đọc các whitepaper còn lại.

---

### 🧭 Bốn phần chuẩn của một whitepaper

1. **Giới thiệu tính năng mới**: công nghệ và cải tiến nổi bật — ví dụ tensor core cho AI, công nghệ shading cải tiến cho đồ họa, hoặc cải tiến phần mềm/phần cứng.
2. **Cấu trúc bên trong SM (Streaming Multiprocessor)**: thiết kế chi tiết của SM mới.
3. **Benchmark và so sánh hiệu năng**: so sánh với các architecture tiền nhiệm.
4. **Thông số kỹ thuật**: số core, dung lượng memory, memory bandwidth, công nghệ memory, yêu cầu nguồn.

---

### 🔬 Phần SM qua các thế hệ

Đây là phần đáng đọc nhất. Qua các whitepaper:

* **Pascal (GP100)**: có ảnh toàn GPU, bảng so sánh chung, rồi sơ đồ SM chi tiết cùng các thành phần như **CUDA core** và **memory hierarchy**. Chưa có tensor core.
* **Volta (V100)**: bố cục tương tự, nhưng thêm **tensor core** — điểm khác biệt lớn so với Pascal.
* **Ampere (A100)**: vẫn có ảnh toàn GPU và chi tiết SM; bảng so sánh được chuyển sang phần khác nhưng vẫn nằm trong whitepaper. Cấu trúc SM trông khá giống Volta, không thay đổi lớn.
* **Hopper (H100)**: ảnh toàn GPU, rồi chi tiết SM. Khác biệt chính so với các bản trước là **số core trong mỗi SM** — có thể đếm số core FP32 để so với A100.

---

### ✅ Chốt lại

Checklist khi mở một whitepaper:

1. Xác nhận đúng **file PDF chính thức** của chip cần đọc.
2. Xem phần **Key Features** để nắm cải tiến mới.
3. Đọc kỹ **sơ đồ SM** và các đơn vị bên trong.
4. Đối chiếu **bảng benchmark** với architecture tiền nhiệm.
5. Ghi lại **thông số kỹ thuật**: core, memory, bandwidth, nguồn.

Một lưu ý khi tìm tài liệu: kết quả tìm kiếm thường lẫn **bài tóm tắt** với **whitepaper gốc**. Whitepaper gốc là file PDF dài, chứa đầy đủ thông số và sơ đồ; bài tóm tắt có thể thiếu hoặc sai lệch. Hãy mở PDF và kiểm tra có đúng tên chip/architecture mình cần không trước khi trích số liệu.

Với người mới, cách an toàn là chọn một whitepaper quen (ví dụ V100) để học cấu trúc, sau đó mở các whitepaper khác và đối chiếu từng mục. Vì bố cục gần như giống nhau, việc đọc sẽ nhanh dần theo thời gian.

Mỗi whitepaper viết cho một GPU cụ thể, nhưng cấu trúc và loại thông tin đều theo một khuôn: **tính năng mới → SM → benchmark → thông số**. Nắm khuôn này giúp các bạn theo kịp công nghệ mới và so sánh architecture một cách có hệ thống. Bài sau mình sẽ mổ xẻ trực tiếp whitepaper **V100/Volta**, có đối chiếu Pascal và Ampere.
