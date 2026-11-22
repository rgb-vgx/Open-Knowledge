---
title: 'Bài 128 — Deploy Gradio app lên Hugging Face Spaces và chia sẻ link'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 128
status: edited
source: '128 - Deploying gradio app on hugging face space.md'
categories:
- AI
tags: []
---

# 🚀 Push code và đưa app phân loại ảnh lên online

> Nguồn: `128 - Deploying gradio app on hugging face space.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49094327)

Chào các bạn! Chặng cuối của dự án: đưa Gradio app từ local lên **Hugging Face Spaces** để ai có link cũng upload ảnh và nhận dự đoán. Mình sẽ clone repo Space, chép code, push, xử lý lỗi xác thực, rồi kiểm tra app chạy thật.

### 📥 Clone repository của Space

Trong trang Space có **HTTPS URL** của remote repo. Mở Git Bash (hoặc terminal), clone về một thư mục riêng — **không** clone vào trong thư mục `gradio_app_one` hiện tại:

```bash
git clone https://huggingface.co/spaces/<username>/classification-gradio-cv
```

Mình clone ra một thư mục Survey/ngoài project để tách bạch code deploy.

### 📋 Chép đúng các file cần thiết

Từ project `gradio_app_one`, chép sang repo vừa clone:

* Thư mục **`core/`** (chứa `predict.py`, `__init__.py`).
* Thư mục **`model/`** (chứa `.pt` và `__init__.py`).
* File **`app.py`**.
* File **`requirements.txt`**.

Không cần chép `README.md` vì Gradio Space đã có sẵn. Nhắc lại điều kiện tiên quyết: **file chính phải tên `app.py`** — đúng như tài liệu Gradio yêu cầu.

### 🔧 Push code lên Space

```bash
cd classification-gradio-cv
git add .
git commit -m "Application files added"
git push
```

Khi push, git sẽ hỏi **username** và **access token** (đã tạo ở bài trước).

### 🔐 Gỡ lỗi xác thực

Lần push đầu mình gặp lỗi **authorization error / failed to push**. Nguyên nhân: hệ thống đã lưu token của một tài khoản khác, nên tài khoản hiện tại không khớp. Cách xử lý là đăng nhập lại bằng **Hugging Face CLI**:

```bash
pip install -U huggingface_hub
huggingface-cli login
```

`huggingface-cli login` sẽ hỏi **access token** (khi nhập sẽ không hiển thị ký tự). Dán token vào, xác nhận tài khoản đã liên kết đúng. Sau đó `git push` lại — lần này thành công.

### 🏗️ Space tự build và chạy

Sau khi push, trang Space **tự refresh** và bắt đầu build: nó đọc `requirements.txt`, cài các thư viện, tìm `app.py` và các module `core/`, `model/`. Theo dõi được ở **build logs** và **container logs**. Khi trạng thái chuyển **Running** (màu xanh), app đã live.

Giao diện trông y hệt bản local: ô **drop image**, **textbox prediction**, và vùng **ảnh đã ghi nhãn**. Thử kéo ảnh một người vào, bấm Submit → dự đoán "person" và ảnh hiện chữ "person". Thử ảnh con mèo → kết quả "cat". Mở rộng ảnh sẽ thấy chữ "cat" vẽ trên ảnh.

### 🎉 Chia sẻ thành quả

Từ đây, bạn chỉ cần **chia sẻ URL** của Space cho bất kỳ ai — họ mở bằng trình duyệt là dùng được, không cần cài gì.

Vậy là mình đã đi trọn hành trình của module PyTorch: tự dựng **custom Dataset/DataLoader** cho ảnh, thiết kế và **train CNN**, viết **script inference**, đóng gói backend, dựng **Gradio UI**, rồi **deploy** lên Hugging Face Spaces. Model giờ đã **live, tương tác được và chia sẻ được** — một cột mốc rất đáng tự hào. Hẹn gặp các bạn ở module tiếp theo!
