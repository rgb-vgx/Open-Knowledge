---
title: 'Bài 313 — Upload app lên Hugging Face Spaces bằng Git'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 313
status: edited
source: '313 - Uploading Our Food Vision Mini App to Hugging Face Spaces Programmatic.md'
categories:
- AI
tags: []
---

# 🐙 Đẩy app lên Spaces bằng Git và Git LFS

> Nguồn: `313 - Uploading Our Food Vision Mini App to Hugging Face Spaces Programmatic.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34110722)

Chào các bạn. File zip đã nằm trong máy. Video này mình đi từng bước: tạo Space, clone repo, copy file vào, bật Git LFS cho model, rồi push. Các lệnh dưới đây mình chạy trên macOS; Windows có thể hơi khác.

### 1️⃣ Tạo tài khoản và Space

* Đăng ký tài khoản Hugging Face (có thể liên kết với GitHub).
* Bấm **New space**, đặt tên (ví dụ `food_vision_mini_video`), chọn license **MIT**, chọn **SDK: Gradio**, để **Public**, rồi **Create space**.

Space mới chỉ có một `README.md`. Trong phần cấu hình, SDK version và `app_file` mặc định là `app.py` — đúng thứ mình đã chuẩn bị.

---

### 2️⃣ Clone repo về máy

```bash
mkdir demos_video
cd demos_video
git clone https://huggingface.co/spaces/<username>/food_vision_mini_video
cd food_vision_mini_video
ls
```

Trong repo mới chỉ có `README.md`. Toàn bộ file app sẽ được đưa vào đây.

---

### 3️⃣ Copy file từ thư mục đã tải

Giải nén file zip, rồi copy **toàn bộ nội dung** vào repo vừa clone. Một cách gọn là dùng `cp -r`:

```bash
cp -r ~/Downloads/food_vision_mini/* .
ls
```

Sau lệnh này, trong repo có `app.py`, `model.py`, `requirements.txt`, `examples/` và file `.pth`. Kiểm tra remote:

```bash
git remote -v
```

Phải trỏ tới `https://huggingface.co/spaces/<username>/food_vision_mini_video`.

---

### 4️⃣ Bật Git LFS cho file lớn

Model nặng khoảng 29–30 MB, vượt ngưỡng ~10 MB nên cần Git LFS:

```bash
git lfs install
git lfs track "*.pth"
git add .gitattributes
```

`git lfs track` ghi pattern vào `.gitattributes`. Spaces thường đã tạo sẵn file này, nhưng track thêm `*.pth` cho chắc. Lệnh có thể báo `*.pth` đã được hỗ trợ — không sao.

---

### 5️⃣ Commit và push

```bash
git add .
git status
git commit -m "initial commit"
git push
```

`git add .` đưa toàn bộ file vào staging. `git status` để xem danh sách trước khi commit. Khi `git push`, phần upload LFS sẽ chạy — với model ~30 MB, tùy mạng có thể mất vài phút.

---

### ⏳ Sau khi push

Quay lại trang Space, bấm refresh: các file đã xuất hiện, trạng thái chuyển sang **Building**. Tab **Logs** cho thấy Spaces đang cài dependency (`torch`, `torchvision`, `gradio`, `matplotlib`...).

---

Lần build đầu có thể mất vài phút. Mình để video kết thúc ở đây như một cliffhanger — bài sau quay lại xem app đã **Running** chưa, và sửa lỗi nếu có.
