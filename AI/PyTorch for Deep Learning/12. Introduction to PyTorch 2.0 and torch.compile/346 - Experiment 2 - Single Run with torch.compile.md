---
title: 'Bài 346 — Experiment 2: train với torch.compile và cái bẫy một chữ cái'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 346
status: edited
source: '346 - Experiment 2 - Single Run with torch.compile.md'
categories:
- AI
tags: []
---

# 🥈 Experiment 2: torch.compile và bài học debug thật

> Nguồn: `346 - Experiment 2 - Single Run with torch.compile.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/37745244)

Video trước là baseline chưa compile. Giờ ta chạy **Experiment 2** — y hệt Experiment 1, chỉ thêm **một dòng** `torch.compile`. Đây là lúc tính năng mới của PyTorch 2.0 phát huy tác dụng, và cũng là lúc mình gặp hai lỗi rất đời. Cùng xem.

### 🧱 Setup giữ nguyên

Tạo model bằng `create_model`, đưa lên device, dùng **CrossEntropyLoss** và **Adam** như cũ. Mọi thứ giữ nguyên để so sánh công bằng — đây là nguyên tắc vàng của thực nghiệm.

---

### ⏱️ Đo thời gian compile

Mình bấm giờ luôn cú compile, chỉ vì tò mò:

```python
import time

compile_start_time = time.time()
compiled_model = torch.compile(model)   # cần PyTorch 2.0+
compile_end_time = time.time()
compile_time = compile_end_time - compile_start_time
print(f"Time to compile: {compile_time:.3f}s")
```

Kết quả: **0.002 giây**. Nghe như chớp mắt — nhưng đó là vì dòng `torch.compile` chỉ **đăng ký** việc tối ưu. Optimization (graph capture, operator fusion) thực sự diễn ra **trong epoch đầu**, khi nó đã biết các phép tính cần làm.

> Lưu ý: lần đầu compile một model, **epoch đầu có thể lâu hơn** do tối ưu chạy sau hậu trường.

---

### 🐞 Lỗi 1: "Found two different devices"

Lần chạy đầu, mình nhận lỗi **"Found two different devices"**. Nguyên nhân: `compiled_model` không nằm trên đúng device.

Cách sửa: đảm bảo compiled model ở đúng device (ví dụ gán lại `compiled_model = compiled_model.to(device)`, hoặc compile sau khi đã `.to`). Đây là lỗi debug trực tiếp trong video — và đúng kiểu bạn sẽ gặp khi code thật.

---

### 🐞 Lỗi 2: accuracy đứng ở 0

Sau khi hết lỗi device, chạy xong thì **cả train accuracy lẫn test accuracy đều bằng 0** — model không học gì. Tốc độ thì đúng như kỳ vọng, nhưng model dở thì nhanh cũng vô nghĩa.

Mình đối chiếu với notebook đã chạy ổn bằng **text-compare.com** và tìm ra thủ phạm: **một chữ cái**.

```python
compiled_model = torch.compile(model)
```

Mình đã lỡ train biến **`model`** (bản chưa compile) thay vì **`compiled_model`** (bản đã compile). Một ký tự `d`/`e` gì đó khiến tốc độ và accuracy rối tung — mà code vẫn chạy không báo lỗi.

> Bài học: **luôn kiểm tra kỹ code**. Colab không cảnh báo; dùng IDE có lẽ đã bắt được lỗi này ngay. Sửa lại biến, mình lấy lại hiệu năng bình thường.

---

### 📊 Kết quả

Sau khi sửa:

* **Epoch đầu chậm hơn** — vì tối ưu bên dưới. Epoch đầu của Experiment 1 là **75 giây**; với `torch.compile` còn chậm hơn một chút do phải graph capture và fusion.
* **Các epoch sau nhanh hơn**, khoảng **10%**: ví dụ **71 giây** (không compile) xuống **63 giây** (có compile) cho một epoch train.
* **Test epoch** cũng nhanh hơn một chút.

Với lần train ngắn 5 epoch, mức tăng ~10% nghe nhỏ; nhưng với **train dài hơn**, lợi ích sẽ rõ hơn nhiều.

---

### 🔍 Chốt lại

* `torch.compile` chỉ mất **mili-giây** để gọi, nhưng tối ưu thật diễn ra ở **epoch đầu**.
* Một lỗi đánh máy có thể khiến kết quả sai **mà không báo lỗi** — hãy so sánh code cẩn thận.
* Tăng tốc ~10% mỗi epoch sau khi "khởi động".

Ta đã có kết quả Experiment 1 và 2. Video sau, mình so sánh chúng một cách trực quan.
