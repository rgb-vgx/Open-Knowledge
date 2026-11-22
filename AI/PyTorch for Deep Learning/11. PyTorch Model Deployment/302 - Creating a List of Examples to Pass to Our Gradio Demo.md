---
title: 'Bài 302 — Tạo danh sách ảnh ví dụ cho demo Gradio'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 302
status: edited
source: '302 - Creating a List of Examples to Pass to Our Gradio Demo.md'
categories:
- AI
tags: []
---

# 🖼️ Chuẩn bị danh sách examples cho giao diện Gradio

> Nguồn: `302 - Creating a List of Examples to Pass to Our Gradio Demo.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34083986)

Chào các bạn. Bài trước mình đã có hàm `predict` trả về dictionary xác suất và thời gian dự đoán. Giờ mình chuẩn bị **examples** — vài ảnh mẫu để người dùng bấm thử ngay mà không cần tự upload.

### 💡 Vì sao cần examples?

Một demo mà người xem phải tự tìm ảnh mới thử được thì rất dễ bị bỏ qua. Có sẵn ví dụ thì họ chỉ cần bấm một cái là thấy model hoạt động. Đây cũng là cách giới thiệu "machine learning cooking show" của mình: món đã nấu sẵn, mời các bạn nếm thử.

Tùy loại demo mà examples sẽ khác — text thì là câu mẫu, audio thì là file âm thanh. Với Food Vision Mini, examples là **danh sách ảnh món ăn**.

### 📋 Định dạng mà Gradio nhận

Tham số `examples` của `gr.Interface` nhận **list of lists** — mỗi phần tử con là một bộ input cho một lần chạy. Mình cần đúng cấu trúc đó, nếu không Gradio sẽ báo lỗi.

### 🎲 Chọn ba ảnh ngẫu nhiên từ test set

Dùng lại `test_data_paths` đã tạo ở bài trước, lấy ngẫu nhiên 3 ảnh và chuyển `Path` thành string vì Gradio làm việc với string:

```python
example_list = [
    [str(path)] for path in random.sample(test_data_paths, k=3)
]
example_list
```

Kết quả là một list gồm ba list con, mỗi list con chứa một đường dẫn ảnh. Mỗi lần chạy lại sẽ ra ba ảnh khác nhau vì là random — hoàn toàn ổn.

Nếu muốn ảnh đẹp và mang tính minh họa hơn, các bạn có thể tự chọn tay một ảnh pizza, một steak, một sushi thay vì random.

### 🧩 Còn thiếu gì nữa?

Giờ mình đã có đủ ba mảnh:

1. Hàm `predict` map ảnh → dictionary xác suất + thời gian.
2. Danh sách `class_names`.
3. `example_list` để gắn vào giao diện.

### 🚀 Thử thách: tự dựng `gr.Interface`

Đây có thể là thử thách lớn nhất từ đầu khóa vì mình chưa từng dùng Gradio. Manh mối: dùng class `Interface`, truyền vào `fn=predict`, `inputs` là một component ảnh (`gr.Image`), `outputs` là **hai** thứ — nhãn và thời gian — nên phải đặt trong một list, và `examples=example_list`.

Các bạn thử tự ghép trước nhé. Nếu bí thì bài sau mình làm cùng nhau và đưa Food Vision Mini lên sóng.
