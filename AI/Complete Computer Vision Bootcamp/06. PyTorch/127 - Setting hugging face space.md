---
title: 'Bài 127 — Tạo tài khoản và setup Hugging Face Space cho Gradio'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 127
status: edited
source: '127 - Setting hugging face space.md'
categories:
- AI
tags: []
---

# 🤗 Setup Hugging Face Space: tài khoản, SDK và access token

> Nguồn: `127 - Setting hugging face space.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49094319)

Chào các bạn! App Gradio đã chạy ngon ở local. Giờ mình đưa nó lên **Hugging Face Spaces** để ai có link cũng dùng được. Bài này là phần chuẩn bị: tạo tài khoản, tạo Space chọn SDK **Gradio**, và tạo **access token** để push code.

### 🌐 Khám phá Hugging Face Spaces

Mở trình duyệt, vào **huggingface.co/spaces**. Bạn sẽ thấy rất nhiều demo cộng đồng đã đóng góp: image generation, video generation, text generation, dịch ngôn ngữ, text-to-speech, 3D modeling, object detection, image editing… Mục tiêu của mình là tạo một Space tương tự, chứa ứng dụng phân loại ảnh của riêng mình.

---

### 👤 Đăng ký và xác minh tài khoản

Bấm **Sign up**, nhập email và mật khẩu, rồi đặt **username** và **full name** cho Hugging Face (điền các trường bắt buộc). Đọc **Terms of Service** và **Code of Conduct**, tick đồng ý rồi tạo tài khoản. Hệ thống có thể yêu cầu **xác minh người dùng** (chọn các hình theo yêu cầu). Sau đó mở email, bấm link xác nhận; khi đã xác minh, thông báo nhắc xác nhận sẽ biến mất sau khi reload.

---

### 🧱 Tạo Space mới

Vào mục **Spaces**, bấm **Create new space**:

1. **Owner** — username của bạn.
2. **Space name** — ví dụ `classification-gradio-cv`.
3. **Description** — mô tả ngắn, ví dụ "An image classification application".
4. **License** — chọn **Apache 2.0** (hoặc MIT).
5. **Space SDK** — chọn **Gradio** (có cả Streamlit; chọn Gradio vì mình dựng app bằng Gradio).
6. **Template** — chọn **Blank**.
7. Phần cứng CPU miễn phí cho **2 vCPU và 16 GB RAM** — quá đủ cho demo này.

Không bật **dev mode**, bấm **Create Space**.

---

### 📦 Space là một git repository

Sau khi tạo, Hugging Face cấp cho bạn một **git repository** (host trên Hugging Face, không phải GitHub). Bạn sẽ **clone** repo này về máy, chép code Gradio vào, rồi **push** lên. Space có sẵn một file `app.py` mẫu — và lưu ý quan trọng: **file chính phải tên là `app.py`**, vì Gradio SDK tìm đúng file này để chạy.

Quy trình tổng quát khi đã có repo:

1. Clone repo của Space về máy.
2. Chép toàn bộ code Gradio (`app.py`, `core/`, `model/`, `requirements.txt`) vào.
3. `git add .`, `git commit`, rồi `git push` — kèm username và access token.

Ngay sau khi push thành công, Space sẽ tự build và load ứng dụng mà không cần thao tác gì thêm.

---

### 🔑 Tạo access token

Trước khi push, cần **access token**. Vào phần **Access Tokens**, bấm tạo token mới, đặt tên (ví dụ `test-one-demo`). Cấp quyền:

* **Repository** — toàn quyền (để push code).
* **Inference** — toàn quyền.

Các quyền khác không cần. Bấm tạo, rồi **copy token và lưu lại** (notepad, hoặc file trên desktop) — vì khi push git sẽ hỏi username và token.

Lưu ý bảo mật: token này dùng xong nên **xoá/invalidate**. Trong dashboard token có menu ba chấm cho phép refresh hoặc delete; tác giả xoá sau khi demo để người khác không dùng được Space của mình.

---

### ✅ Chuẩn bị xong

Đến đây mình đã có: tài khoản Hugging Face đã xác minh, một **Space** với SDK Gradio, **remote git URL** để push, và **access token**. Bài sau mình sẽ clone repo, chép code, push và xem app tự build trên cloud.
