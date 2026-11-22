---
title: 'Compute capability và mức sử dụng GPU'
date: '2026-11-23'
course: 'cuda-mastering-gpu'
lesson: 10
status: edited
source: '010 - Compute capability and utilizations of the GPUs.md'
categories:
- Nvidia
tags: []
---

# 🏷️ Compute capability và mức sử dụng GPU

> Nguồn: `010 - Compute capability and utilizations of the GPUs.md` · [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda/learn/lecture/40590264)

**Compute capability (CC)** là con số nhỏ nhưng quyết định rất nhiều: GPU hỗ trợ tính năng gì, chạy được bản CUDA toolkit nào. Bài này giải thích cách đánh số CC, cách đọc bảng feature support, và mối liên hệ giữa CC với phiên bản CUDA.

### 🔢 Compute capability là gì

Compute capability — còn gọi là **CC number** hay **version number** — là cách Nvidia phân loại thiết kế GPU, phản ánh tính năng tổng quát và sức tính toán.

CC được biểu diễn dạng **3.0, 5.1, 7.5**:

* Số **trước dấu chấm**: thay đổi **kiến trúc lớn**.
* Số **sau dấu chấm**: cải tiến hoặc mở rộng **nhỏ**.

Ví dụ:

* **Volta** có CC **7.x** — thời điểm ra mắt gây chú ý với **tensor core**, tăng mạnh hiệu năng cho AI và deep learning.
* **Ampere** có CC **8.0**, đánh dấu cải tiến cả phần cứng lẫn phần mềm: tensor core hiệu quả hơn, băng thông memory lớn hơn, tiết kiệm năng lượng hơn.
* **Hopper** có CC **9.x**.

---

### 📋 Feature support: mỗi CC một tập tính năng

Các phiên bản CC khác nhau bật/tắt những tính năng khác nhau: loại phép toán, mức song song, khả năng truy cập memory...

Trong tài liệu lập trình CUDA có một bảng (bài giảng gọi là **Table 17**) liệt kê CC theo cột và tính năng theo hàng. Ví dụ:

* Với **CC 5.0**, quét dọc bảng sẽ thấy nhiều tính năng có/không xen kẽ. Cụ thể, GPU CC 5.0 **không hỗ trợ half precision**.
* **Tensor core** chỉ có từ **CC 7 trở lên**: bảng ghi "No" cho các cột dưới 7 và "Yes" từ 7.

Bảng **Table 18** có nội dung tương tự, các bạn tự tra thêm.

---

### 💻 Software compatibility: CC quyết định bản CUDA

Compute capability xác định GPU chạy được **phiên bản CUDA toolkit** nào. CC cao hơn hỗ trợ toolkit mới hơn, nhiều tính năng và tối ưu hơn.

Có thể hình dung **PTX** (bài giảng gọi là "RT") như một dạng assembly: một số instruction chỉ chạy trên GPU có CC nhất định, vì chúng phụ thuộc đơn vị phần cứng đặc thù. Ví dụ **warp shuffle** — cho phép thread trong một warp chia sẻ dữ liệu mà không cần shared/global memory — chỉ có trên thiết bị **CC 3.x trở lên** (theo CUDA C Programming Guide).

Liên hệ với phiên bản toolkit:

* **Hopper** (CC 9.x) cần CUDA **11.8 trở lên**. Dùng bản thấp hơn sẽ báo lỗi **incompatible CUDA version**.
* **Maxwell** (CC 5.x, cao nhất là **5.3**) cần CUDA **6.5 trở lên**.

Ví dụ thực tế: nếu dự án cần tính năng ML mới nhất hoặc mô phỏng phức tạp, CC của GPU quyết định bạn có dùng được toolkit mới với các tối ưu cần thiết hay không.

---

### ✅ Chốt lại

CC là "chứng chỉ" của GPU: nó nói GPU có tensor core hay half precision, và chạy được bản CUDA nào. Chọn phần cứng không chỉ là chọn GPU mạnh, mà là chọn GPU **tương thích với công cụ** mình cần. Bài sau mình sẽ chỉ cách đọc whitepaper — nguồn thông số gốc của mọi kết luận trên.
