---
title: 'Experiment tracking là gì và vì sao phải theo dõi thí nghiệm'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 200
status: edited
source: '200 - What Is Experiment Tracking and Why Track Experiments.md'
categories:
- AI
tags: []
---

# 🧪 Experiment tracking là gì và vì sao phải theo dõi thí nghiệm

> Nguồn: `200 - What Is Experiment Tracking and Why Track Experiments.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/33022814)

Chào các bạn, chào mừng đến với **experiment tracking** (theo dõi thí nghiệm) với PyTorch. Đây là một chủ đề cực kỳ quan trọng trong machine learning — mình còn coi nó như **Milestone Project số 1** của khóa học. Cả section này mình sẽ gom mọi thứ đã học lại thành một dự án lớn: theo dõi nhiều experiment cho **Food Vision Mini** và tìm ra model nào làm tốt nhất.

### 🆘 Khi bí thì làm gì?

Trước khi vào bài, mình nhắc lại quy trình tự cứu mình:

1. **Follow along với code** — cố gắng gõ theo và chạy thử. Khẩu hiệu: *if in doubt, run the code*.
2. **Đọc docstring** — bấm **Shift + Command + Space** (Windows dùng **Control**) để xem input/output của hàm.
3. **Search** — dán thông báo lỗi lên Google, thường gặp Stack Overflow hoặc tài liệu PyTorch chính thức.
4. **Thử lại** — quay lại đọc code thêm lượt nữa.
5. Cuối cùng mới **đặt câu hỏi** trên trang Discussions của khóa học, bấm **New discussion**, ghi rõ bạn đang làm gì.

Notebook của section này là **07 PyTorch experiment tracking**, có trên GitHub và có cả bản "sách" tìm kiếm được ở **Learn PyTorch** (mục số 7).

---

### 🧠 Vậy experiment tracking là gì?

Ta đã build khá nhiều model. Đầu tiên thử **TinyVGG** — không ăn thua. Sang **transfer learning** thì chạy tốt. Vậy câu hỏi đặt ra: **làm sao biết model nào trong số đó làm tốt nhất?** Experiment tracking chính là câu trả lời.

Nó nối tiếp đúng tinh thần của khóa học — code theo, thử nghiệm, visualize, hỏi, làm bài tập và chia sẻ. Ba câu khẩu hiệu vẫn theo ta:

* **If in doubt, run the code.**
* **Experiment, experiment, experiment.**
* **Visualize, visualize, visualize.**

Section này đào sâu vào khẩu hiệu thứ hai: **experiment**. Mặc áo khoa học gia vào, mình bắt đầu track các modeling experiment cho Food Vision Mini.

---

### 🎛️ Vì sao phải track experiment?

Nếu chỉ build vài model thì không sao. Nhưng thử tưởng tượng bạn có một dictionary `results`, rồi model 1, model 2, model 1 v2, model 2 v2, model 2 v3... Cứ thế nhân lên. Chỉ **13 model** đã rối tung rồi, mà thực tế khi làm dự án riêng các bạn sẽ build nhiều hơn thế rất nhiều.

Vậy nên cần một cách **đáng tin cậy** để lưu lại và quay về điều tra. Nhìn vào đám kết quả đó, ta tự hỏi: cái nào ổn, cái nào tệ, **nên làm ít đi cái gì và thử nhiều hơn cái gì?** Đó chính là mục đích:

> Tìm ra cái **không** hiệu quả, để rồi tìm ra cái **có** hiệu quả.

---

### 🛠️ Các cách track experiment

Có vài hướng phổ biến:

* **Cách thủ công** — Python dictionary, file CSV, hoặc in ra màn hình, đúng kiểu ta vẫn làm.
* **TensorBoard** — gắn sẵn trong PyTorch, đây là thứ ta dùng trong section này.
* **Weights & Biases (W&B)** — dịch vụ bên thứ ba mình rất thích, giao diện đẹp, xem được accuracy, loss curve, validation accuracy, cả lượng CPU đang dùng.
* **MLflow** — thư viện open source cho gần như toàn bộ workflow machine learning.

Nếu bạn search "track machine learning experiments" sẽ thấy vô số công cụ. Trong **extra curriculum** có bài về experiment tracking của **Goku Mohandas** trên Made With ML — mình khuyên đọc cả bộ tài nguyên Made With ML nếu muốn tìm hiểu sâu.

---

### 🗺️ Section này sẽ làm gì

Dù tập trung vào TensorBoard, các nguyên tắc tracking đều áp dụng được cho mọi dịch vụ. Kế hoạch:

1. **Get set up** — import lại code đã viết ở các section trước.
2. **Giới thiệu experiment tracking** với PyTorch và TensorBoard.
3. **Build vài modeling experiment** cho Food Vision Mini.
4. **Đánh giá** các experiment bằng TensorBoard.
5. **Dự đoán** bằng model tốt nhất trên dữ liệu custom của bạn.

Ta vừa mặc áo khoa học gia, vừa đội mũ đầu bếp — vì machine learning là **nửa nghệ thuật, nửa khoa học**. Vậy nên mình sẽ "nấu" thật nhiều code.

---

### ✅ Tạm kết

Điểm mấu chốt: đừng nhìn một đống số rồi đoán mò — hãy track có hệ thống, để biết cái gì đáng theo đuổi và cái gì nên bỏ. Bài sau mình sẽ vào Google Colab, chuẩn bị môi trường và bắt đầu code. Hẹn các bạn ở đó!
