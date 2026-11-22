---
title: 'Bài 322 — Tải ảnh ví dụ và move model Food Vision Big'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 322
status: edited
source: '322 - Downloading an Example Image and Moving Our Food Vision Big Model File.md'
categories:
- AI
tags: []
---

# 🍕 Tải ảnh mẫu và đưa model vào thư mục demo

> Nguồn: `322 - Downloading an Example Image and Moving Our Food Vision Big Model File.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34125258)

Chào các bạn. Khung thư mục đã có. Giờ mình bỏ vào hai thứ: một ảnh ví dụ và file model đã train. Cả hai đều làm bằng lệnh shell cho nhanh.

### 🖼️ Ảnh ví dụ: `04-pizza-dad.jpeg`

Mình dùng lại ảnh pizza Dad quen thuộc từ section 4. Tải bằng `wget`:

```bash
wget https://raw.githubusercontent.com/mrdbourke/pytorch-deep-learning/main/images/04-pizza-dad.jpeg
```

Rồi move vào thư mục examples với tên rõ ràng:

```bash
mv 04-pizza-dad.jpeg demos/food_vision_big/examples/04-pizza-dad.jpeg
```

Kiểm tra:

```bash
ls demos/food_vision_big/examples/
```

Phải thấy `04-pizza-dad.jpeg`.

Các bạn có thể dùng ảnh khác — ảnh tự chụp, ảnh món ăn yêu thích — miễn nằm trong nhóm lớp của Food101. Thậm chí có thể cố tình chọn ảnh "khó" để xem model sai ở đâu; mình sẽ nói thêm về trường hợp này ở phần deploy.

---

### 📦 Move model vào thư mục

File model đang ở `models/`. Move sang `demos/food_vision_big/`:

```bash
mv models/09_pretrained_effnetb2_feature_extractor_food101_20_percent.pth \
   demos/food_vision_big/
```

Kiểm tra lại bằng `ls`, file `.pth` phải nằm cạnh `app.py` (sau này) và `examples/`.

---

### ⚠️ Lưu ý khi chạy lại

Nếu chạy lệnh `mv` lần thứ hai, nó sẽ **báo lỗi** vì file nguồn không còn. Với Food Vision Mini, mình đã viết `try`/`except` để xử lý chuyện này. Ở đây mình chấp nhận chạy một lần, hoặc các bạn có thể bọc tương tự nếu muốn notebook chạy lại được từ đầu:

```python
try:
    shutil.move(src=model_path, dst=demo_dir / model_path.name)
    print("[INFO] Model move complete.")
except FileNotFoundError:
    print("[INFO] No model at source, perhaps already moved.")
```

---

### ✅ Trạng thái

`demos/food_vision_big/` hiện có:

* `examples/04-pizza-dad.jpeg`
* `09_pretrained_effnetb2_feature_extractor_food101_20_percent.pth`

---

Còn `class_names.txt`, `model.py`, `app.py`, `requirements.txt`. Bài sau mình lưu 101 tên lớp ra file text và đọc lại — thứ mới so với Food Vision Mini.
