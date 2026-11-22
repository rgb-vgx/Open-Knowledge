---
title: 'Bài 323 — Lưu 101 tên lớp ra file text và đọc lại'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 323
status: edited
source: '323 - Saving Food 101 Class Names to a Text File and Reading them Back In.md'
categories:
- AI
tags: []
---

# 📝 `class_names.txt`: lưu và đọc 101 nhãn lớp

> Nguồn: `323 - Saving Food 101 Class Names to a Text File and Reading them Back In.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34126426)

Chào các bạn. Với 101 lớp, viết cả list vào `app.py` thì quá rối. Mình lưu ra file text, mỗi dòng một tên, rồi đọc lại khi app chạy. Bài này cũng là ví dụ gọn về đọc/ghi file trong Python.

### 📍 Đường dẫn file

```python
food_vision_big_class_names_path = food_vision_big_demo_path / "class_names.txt"
```

Kết quả: `demos/food_vision_big/class_names.txt`.

### ✍️ Ghi class names ra file

Mỗi tên lớp nằm trên một dòng, nối bằng ký tự xuống dòng `"\n"`:

```python
with open(food_vision_big_class_names_path, "w") as f:
    print(f"[INFO] Saving Food101 class names to {food_vision_big_class_names_path}")
    f.write("\n".join(food101_class_names))
```

Mở file ra sẽ thấy:

```text
apple_pie
baby_back_ribs
baklava
...
```

Đúng định dạng mong muốn.

### 📖 Đọc ngược lại thành list

```python
with open(food_vision_big_class_names_path, "r") as f:
    food101_class_names_loaded = [food.strip() for food in f.readlines()]
```

`f.readlines()` trả về list các dòng, nhưng **giữ ký tự xuống dòng** `\n` ở cuối mỗi phần tử. Vì vậy phải gọi `.strip()` để bỏ khoảng trắng/newline hai đầu:

```python
food101_class_names_loaded[:5]
```

```text
['apple_pie', 'baby_back_ribs', 'baklava', 'beef_carpaccio', 'beef_tartare']
```

Nếu bỏ `.strip()`, bạn sẽ thấy `'apple_pie\n'` — nhìn thì giống nhưng khi so sánh chuỗi sẽ sai.

### 🧠 Vì sao dùng file thay vì list?

Không bắt buộc — hoàn toàn có thể hard-code list 101 phần tử. Nhưng để `app.py` gọn và dễ đọc, tách ra file là hợp lý. Đọc file text rất nhanh, không ảnh hưởng hiệu năng app.

### ✅ Đã có gì

* `examples/04-pizza-dad.jpeg`
* model `.pth`
* `class_names.txt`

---

Còn `model.py`, `app.py`, `requirements.txt`. `model.py` giống hệt bản Food Vision Mini, chỉ đổi thư mục ghi file. Bài sau mình tái sử dụng và chỉnh lại.
