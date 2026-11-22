---
title: 'Bài 40 — Giới thiệu workflow PyTorch và chỗ tìm trợ giúp'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 40
status: edited
source: '040 - Introduction and Where You Can Get Help.md'
categories:
- AI
tags: []
---

# 🗺 Giới thiệu workflow PyTorch và chỗ tìm trợ giúp

> Nguồn: `040 - Introduction and Where You Can Get Help.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32686044)

Chào mừng các bạn quay lại module **PyTorch Workflow**. Bài này mình điểm qua toàn bộ quy trình sẽ đi trong phần này, rồi chỉ cho các bạn những chỗ nên tìm trợ giúp khi bí. Không có gì phức tạp — chỉ là tấm bản đồ trước khi lên đường.

### 🧭 Workflow PyTorch gồm những gì?

Đây là một trong nhiều cách làm, và là cách phổ biến nhất: chuẩn bị dữ liệu, biến nó thành `tensor`, rồi xây model để học pattern. Cụ thể:

1. **Chuẩn bị dữ liệu** — đưa về dạng `tensor` (tensor biểu diễn được gần như mọi loại dữ liệu).
2. **Chọn hoặc build model** — dùng model có sẵn hoặc tự dựng.
3. **Chọn loss function và tối ưu nó** — chưa biết là gì cũng không sao, sẽ học ngay sau đây.
4. **Build training loop** — fit model với dữ liệu.
5. **Dự đoán và đánh giá model**.
6. **Cải thiện bằng thực nghiệm**.
7. **Lưu và nạp lại model đã train** — cần khi muốn mang model ra khỏi notebook dùng chỗ khác.

Animation trong video mô tả quy trình này; đây chỉ là một trong nhiều biến thể, nhưng khung chung là vậy.

---

### 🧩 Vì sao mọi thứ phải thành tensor?

Vì `tensor` biểu diễn được gần như **mọi loại dữ liệu**: bảng Excel (dạng hàng cột), ảnh, video, âm thanh, text, thậm chí cả DNA. Một khi dữ liệu đã ở dạng số, model mới học pattern trong đó được.

Khi bước vào deep learning, bạn sẽ thấy có **rất nhiều cách** để làm cùng một việc. Đừng lo nếu thấy rối — cứ bám theo một quy trình mạch lạc trước, các biến thể sẽ tự sáng tỏ dần.

---

### 🆘 Bốn cách gỡ khi bí

Theo thứ tự từ đơn giản đến "cầu cứu":

1. **Chạy code đi đã.** Phương châm số một: *If in doubt, run the code.* Tự viết, chạy sai, sửa, chạy lại — đó là cách mình học hiệu quả nhất.
2. **Đọc docstring.** Trên Mac: `Shift + Command + Space`; trên Google Colab hoặc Windows: có thể là `Ctrl + ...`. Docstring cho biết hàm dùng thế nào.
3. **Tìm kiếm.** Sẽ gặp Stack Overflow hoặc tài liệu chính thức của PyTorch — `pytorch.org/docs` là **ground truth** cho mọi thứ về PyTorch.
4. **Đặt câu hỏi.** Vào tab **Discussions** của repo `mrdbourke/pytorch-deep-learning` trên GitHub. Nhớ kèm video và đoạn code đang chạy để người khác hiểu bối cảnh.

---

### 📚 Tài nguyên đi kèm

Toàn bộ tài liệu khóa học nằm trong repo GitHub — đó là ground truth của cả khóa, gồm tài liệu và notebook đi kèm. Mình sẽ chỉ chỗ cụ thể khi cần.

Ngoài ra còn có bản **sách** (ebook) của khóa, tên là *Learn PyTorch*. Khi bạn xem video, sách có thể đã đủ chương tương ứng với từng video. Sách chỉ để tham khảo thêm — các video được xây dựng dựa trên nội dung đó, nhưng trọng tâm vẫn là code cùng nhau.

Cách dùng hợp lý: xem video để code theo, mở sách khi muốn đọc lại hoặc đào sâu phần lý thuyết.

---

### ✅ Tạm kết

Có bản đồ trong tay rồi. Nguyên tắc xuyên suốt: **code trước, lý thuyết sau**. Bài sau mình mở Colab và bắt tay vào việc.
