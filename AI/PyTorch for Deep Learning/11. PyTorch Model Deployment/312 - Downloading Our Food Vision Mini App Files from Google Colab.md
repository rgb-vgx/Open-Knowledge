---
title: 'Bài 312 — Nén và tải app Food Vision Mini từ Colab'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 312
status: edited
source: '312 - Downloading Our Food Vision Mini App Files from Google Colab.md'
categories:
- AI
tags: []
---

# 🗜️ Zip thư mục demo và tải về máy

> Nguồn: `312 - Downloading Our Food Vision Mini App Files from Google Colab.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34108718)

Chào các bạn. Thư mục `demos/food_vision_mini` đã đủ file. Bước tiếp theo là đưa nó từ Colab về máy để upload lên Hugging Face. Mình sẽ nén cả thư mục thành một file `.zip` rồi tải bằng code.

### 🛠️ Ba cách upload lên Hugging Face

* **Web UI** — kéo thả file trên trang Space.
* **Terminal / Git** — clone repo rồi `git push` (cách mình sẽ dùng).
* **Hugging Face Hub Python library** — upload bằng code (để dành làm extra).

Bài này chỉ giải quyết khâu trung gian: lấy file ra khỏi Colab.

---

### 📦 Nén bằng lệnh `zip`

Colab chạy trên Linux, nên dùng được `zip`. Mình `cd` vào trong thư mục rồi nén từ bên trong, để file zip chứa đúng cấu trúc con:

```bash
cd demos/food_vision_mini && zip -r food_vision_mini.zip * \
  -x "*.pyc" "*.ipynb" "*__pycache__*" "*.ipynb_checkpoints*"
```

Giải thích:

* `-r` — nén **đệ quy** mọi file trong thư mục.
* `*` — lấy toàn bộ nội dung thư mục hiện tại.
* `-x` — **loại trừ** các file không cần: bytecode `.pyc`, notebook `.ipynb`, thư mục cache.

Kết quả là `demos/food_vision_mini.zip`. Bên trong gồm `app.py`, `model.py`, `requirements.txt`, thư mục `examples/` và file model `.pth`.

---

### ⬇️ Tải bằng code

Có thể bấm nút download trên Colab, nhưng mình thích làm bằng code để chạy lại được:

```python
try:
    from google.colab import files
    files.download("demos/food_vision_mini.zip")
except:
    print("[INFO] Not running in Google Colab, please download food_vision_mini.zip manually.")
```

Lần đầu chạy, trình duyệt có thể hỏi có cho phép tải file từ Colab không — cứ **Allow**. File sẽ nằm trong thư mục Downloads, giải nén ra là thấy đúng cấu trúc app.

---

### ✅ Kiểm tra sau khi giải nén

Mở file zip, các bạn sẽ thấy:

```text
food_vision_mini/
├── app.py
├── model.py
├── requirements.txt
├── examples/
└── 09_pretrained_....pth
```

Nếu có lẫn file `.pyc` hay `__pycache__`, nghĩa là lệnh `-x` chưa khớp — kiểm tra lại pattern.

---

Giờ file đã ở máy. Bài sau mình tạo Space, clone repo và đẩy toàn bộ file lên bằng Git + Git LFS.
