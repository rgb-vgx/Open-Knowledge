---
title: 'Bài 314 — Chạy thử Food Vision Mini trên Spaces và sửa lỗi'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 314
status: edited
source: '314 - Running Food Vision Mini on Hugging Face Spaces and Trying it Out.md'
categories:
- AI
tags: []
---

# ✅ App đã lên sóng — và bài học sửa lỗi ngay trên Spaces

> Nguồn: `314 - Running Food Vision Mini on Hugging Face Spaces and Trying it Out.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34112130)

Chào các bạn. Sau khi push, Space vẫn đang build. Video này mình chờ nó xong, xử lý lỗi phát sinh, và thử app thật trên internet.

### 🐞 Lỗi đầu tiên: `share=True` không được hỗ trợ

Refresh vài lần, app báo lỗi ngay trong log:

```text
Share is not supported when you are in Spaces
```

Nguyên nhân nằm ở dòng cuối `app.py`:

```python
demo.launch(debug=False, share=True)
```

Trên Spaces, app đã có URL công khai sẵn, nên `share=True` là thừa và bị chặn. Mình sửa thành:

```python
demo.launch()
```

Điểm hay là có thể sửa **trực tiếp trên web**: vào **Files and versions** → mở `app.py` → sửa → commit. Space sẽ tự **rebuild**. Lần build thứ hai thường nhanh hơn vì đã cache dependency.

### 🔁 Đồng bộ thay đổi về máy

Vì thư mục local là một git repo, chạy:

```bash
git pull
```

là thay đổi trên web được kéo về. Từ giờ có thể sửa local rồi push lên, hoặc ngược lại — cả hai chiều đều được.

### 🟢 Thành quả

Sau khi build xong, trạng thái chuyển **Running** (xanh). App hiện đủ tiêu đề, mô tả, ba ảnh mẫu. Bấm pizza → `pizza`, steak → `steak`, sushi → `sushi`. Upload ảnh steak tự chụp → vẫn ra `steak` với thời gian dự đoán hiển thị rõ.

### 🖼️ Nhúng app vào notebook bằng iframe

Có thể nhúng demo vào notebook (hoặc trang portfolio) bằng `IFrame`:

```python
from IPython.display import IFrame

IFrame(
    src="https://huggingface.co/spaces/<username>/food_vision_mini_video/embed",
    width=900,
    height=600,
)
```

Đường dẫn `/embed` là dạng Gradio cung cấp để nhúng Space. Cách này rất tiện nếu muốn dựng một notebook vừa giải thích cách train, vừa cho người xem thử model ngay tại chỗ.

### 💡 Bài học

Gặp lỗi ngay lần deploy đầu không phải chuyện xấu — đó là cách thấy được quy trình sửa trên môi trường thật: đọc log, sửa file, commit, rebuild. Lần sau gặp lỗi tương tự các bạn sẽ xử lý nhanh hơn nhiều.

---

Food Vision Mini đã chạy ổn định. Giờ mình "tăng độ khó": mở rộng từ 3 lớp lên **101 lớp** của Food101. Bài sau là bản phác thảo cho Food Vision Big.
