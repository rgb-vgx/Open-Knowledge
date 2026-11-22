---
title: 'Bài 305 — Cấu trúc thư mục của một app Gradio khi deploy'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 305
status: edited
source: '305 - Outlining the File Structure of Our Deployed App.md'
categories:
- AI
tags: []
---

# 🗂️ Bố cục file cho app Food Vision Mini trên Spaces

> Nguồn: `305 - Outlining the File Structure of Our Deployed App.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34093936)

Chào các bạn. Muốn deploy lên Hugging Face Spaces thì trước hết phải biết Space cần những file gì. Bài này mình bóc tách cấu trúc thư mục chuẩn, cũng là bản thiết kế mình sẽ dựng ở các video sau.

### 🔍 Space thực chất là một git repo

Theo tài liệu Spaces: *"Under the hood, Spaces stores your code inside a git repository, just like the model and dataset repositories."* Nghĩa là mọi công cụ Git quen thuộc đều dùng được — cộng thêm **Git LFS** (Large File Storage) cho file lớn.

Git LFS thay các file lớn (âm thanh, video, dataset, model) bằng một **text pointer** trong Git, còn nội dung thật được lưu riêng. Với app của mình, model EffNetB2 nặng khoảng **29 MB**, vượt ngưỡng ~10 MB, nên sẽ cần Git LFS.

### 📁 Cấu trúc đích

Mình gom mọi thứ vào một thư mục duy nhất:

```text
demos/
└── food_vision_mini/
    ├── app.py
    ├── model.py
    ├── examples/
    │   ├── example_1.jpg
    │   ├── example_2.jpg
    │   └── example_3.jpg
    ├── 09_pretrained_effnetb2_feature_extractor_pizza_steak_sushi_20_percent.pth
    └── requirements.txt
```

* **`app.py`** — file mặc định mà Spaces tìm và chạy. Vì Gradio viết hoàn toàn bằng Python, toàn bộ giao diện + hàm `predict` có thể nằm gọn trong đây.
* **`model.py`** — định nghĩa kiến trúc model (hàm `create_effnetb2_model`) để `app.py` import.
* **`examples/`** — ảnh mẫu phục vụ demo.
* **`*.pth`** — state dict của model đã train, lưu bằng Git LFS.
* **`requirements.txt`** — khai báo dependency để Spaces cài khi build.

### ⚙️ Vì sao `app.py`?

`app.py` là tên file mặc định Hugging Face Spaces dùng để khởi chạy app. Có thể đổi trong README, nhưng mình giữ mặc định cho đơn giản. Trên Space thật của mình, bấm **Files and versions** sẽ thấy đúng cấu trúc này: thư mục `examples`, file model lưu bằng Git LFS, `README`, `app.py`, `model.py`, `requirements.txt`.

### 🔁 Từ Colab đến thư mục

Luồng đi là: **Colab → thư mục chứa toàn bộ file Gradio → upload lên Hugging Face Spaces → Spaces tự deploy**. Nghe giống phần *going modular* của khóa: gom những cell hữu ích thành script Python, rồi đóng gói cả thư mục để tái sử dụng.

---

Các bạn thử tự dựng lại cấu trúc này trước cũng được. Bài sau mình bắt đầu tạo thư mục `demos/food_vision_mini` bằng code.
