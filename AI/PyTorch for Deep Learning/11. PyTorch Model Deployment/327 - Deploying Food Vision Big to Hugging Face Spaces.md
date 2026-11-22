---
title: 'Bài 327 — Deploy Food Vision Big lên Spaces qua giao diện web'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 327
status: edited
source: '327 - Deploying Food Vision Big to Hugging Face Spaces.md'
categories:
- AI
tags: []
---

# 🚀 Đưa Food Vision Big lên internet bằng Web UI

> Nguồn: `327 - Deploying Food Vision Big to Hugging Face Spaces.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34142072)

Chào các bạn. Lần này mình deploy bằng **giao diện web** thay vì Git, để có thêm một cách làm. Quy trình tương tự Food Vision Mini, chỉ đổi file.

### 🆕 Tạo Space mới

* Vào Hugging Face, bấm **New space**.
* Đặt tên (ví dụ `food_vision_big_video`), chọn license MIT, **SDK: Gradio**, để Public.
* Bấm **Create space**.

Space mới chỉ có `README.md`. Mình đổi emoji trong README cho vui (ví dụ 🌮) rồi commit.

### 📤 Upload từng file

Mở file zip đã tải ở bài trước, rồi dùng **Add file → Upload file**, kéo các file vào:

* `app.py`
* `model.py`
* `class_names.txt`
* `requirements.txt`
* file `.pth`

Có thể upload `app.py` trước, Space sẽ bắt đầu build và **báo lỗi** vì thiếu file phụ thuộc — chuyện bình thường, cứ upload tiếp các file còn lại.

File model khoảng **31.8 MB**, sẽ upload chậm hơn vì Hugging Face dùng **Git LFS** phía sau. Sau khi xong, file hiện nhãn "stored with Git LFS".

### 📁 Mẹo tạo thư mục `examples/` trên UI

UI chưa cho upload cả thư mục. Cách xử lý:

1. **Create new file**, đặt tên `examples/demo_file_delete_later.txt`, commit — thao tác này tạo ra thư mục `examples/`.
2. Upload `04-pizza-dad.jpeg` vào đường dẫn `examples/`.
3. Xoá file `demo_file_delete_later.txt`.

Đúng là một mẹo hơi "hack", nhưng hoạt động. Với Food Vision Mini mình làm hoàn toàn bằng Git nên không gặp vấn đề này.

### 🔧 Khởi động lại khi cần

Sau khi đủ file, app có thể vẫn báo lỗi dù mọi thứ đã đúng. Vào **Settings → Factory reboot this space** để khởi động lại. Trên máy mình, chỉ cần restart là app chạy.

### 🟢 Thành quả

Food Vision Big chạy với trạng thái **Running**. Thử ảnh pizza → `pizza`. Thử ảnh **beignets** do Stable Diffusion tạo → model nhận đúng. Một món mình còn chưa biết tên trước khi làm project này.

### 🧪 Khám phá giới hạn của model

Deploy không chỉ để khoe — nó giúp tìm **failure point**. Ví dụ: upload ảnh một chiếc **Tesla Cybertruck** (không phải đồ ăn) thì model đoán... `ice cream`. Vì model chỉ được train trên 101 lớp món ăn, nó buộc phải chọn một lớp gần nhất.

Đây là bài tập mở rộng hay:

* Thêm một lớp món ăn mới ngoài Food101 (cần thêm ảnh).
* Xử lý trường hợp input không phải đồ ăn.
* Thử **Gradio Blocks** để dựng UI nâng cao hơn.

---

Chúc mừng các bạn — hai app ML đã được deploy trong cùng một section. Bài cuối mình tổng kết các bài học chính và hướng đi tiếp.
