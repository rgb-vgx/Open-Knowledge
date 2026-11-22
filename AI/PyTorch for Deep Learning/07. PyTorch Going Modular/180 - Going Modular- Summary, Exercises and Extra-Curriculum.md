---
title: 'Tổng kết Going Modular, bài tập và tài nguyên mở rộng'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 180
status: edited
source: '180 - Going Modular- Summary, Exercises and Extra-Curriculum.md'
categories:
- AI
tags: []
---

# 🏁 Tổng kết Going Modular, bài tập và tài nguyên mở rộng

> Nguồn: `180 - Going Modular- Summary, Exercises and Extra-Curriculum.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/32852232)

Chào các bạn! Video trước ta tạo `train.py` — script tận dụng mọi script khác, mà các script đó lại tận dụng toàn bộ code viết qua các section, để train model trong **một dòng code**. Chúng ta đã **going modular**: chuyển từ code notebook sang code Python script.

### 🔄 Cell mode → Script mode

Ta lấy part 1 (cell mode), biến nó thành part 2 (script mode). Mình sẽ không dài dòng so sánh hai bản — mình muốn các bạn **tự mở ra xem** và ngẫm.

Nếu muốn đọc lại lý thuyết: mục `05_pytorch_going_modular` trong sách giải thích vì sao nên going modular, ưu nhược điểm notebook vs Python script, và workflow mình dùng. Đó chính là workflow vừa thực hành: **Colab để thí nghiệm, script để dùng lại**.

Code PyTorch ngoài đời thường ở dạng script — nên quen với script mode là rất đáng.

---

### 📝 Ba bài tập

1. **Biến phần "get data" thành script.** Cell section 1 (tải dữ liệu) chưa được tách. Gợi ý: dùng code rất giống phần tạo script ta vừa làm.
2. **Dùng module `argparse` của Python** để truyền hyperparameter tùy chỉnh vào `train.py`. Hơi khó một chút, nhưng làm được. Tài nguyên: tài liệu `argparse` chính thức và hướng dẫn của Real Python về xây CLI bằng `argparse`.
3. **Viết script `predict.py`** để dự đoán trên một ảnh cho trước đường dẫn, dùng model đã lưu. Nhớ lại section 04 ta đã dự đoán trên custom image — hãy lấy code đó đóng gói thành script.

---

### 📦 Template và lời giải

* Notebook template bài tập nằm ở `extras/exercises/05_pytorch_going_modular_exercise_template.ipynb`.
* Notebook lời giải mẫu ở `extras/solutions`.
* Mình cũng có **video walkthrough** giải bài tập trực tiếp trên YouTube — xem cách mình xử lý từng bài.
* Link đầy đủ nằm cuối bản sách của khóa.

---

### 📚 Tài nguyên mở rộng

* **Structuring a Python project** — nếu muốn hiểu vì sao đặt `going_modular/going_modular/` rồi script bên trong, đọc bài này.
* **PyTorch style guide của Igor Susmelj** — nguồn cảm hứng cho cách mình viết code trong khóa.
* **Repo PyTorch vision references** — xem `train.py` thật dùng để train state-of-the-art model. Model của ta còn nhỏ, nhưng code train này chính là thứ đưa các model ảnh của PyTorch tới kết quả SOTA.

---

### 💡 Chốt lại

Model của ta hiện chưa chạy tốt lắm. Làm sao nâng cấp? Gợi ý: nó nằm ở section tiếp theo. Nếu bạn thấy việc train model PyTorch bằng một dòng code đã thú vị, thì section sau sẽ còn thú vị hơn.

Toàn bộ tài liệu ở mục `05` của sách hoặc repo GitHub. Đây là going modular — hẹn gặp các bạn ở section tiếp theo!
