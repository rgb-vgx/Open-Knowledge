---
title: 'Bài 034 — Tự tạo custom exception trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 34
status: edited
source: '034 - Custom Exception Handling.md'
categories:
- AI
tags: []
---

# 🧨 Custom exception — lỗi riêng cho nghiệp vụ riêng

> Nguồn: `034 - Custom Exception Handling.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086845)

Ai làm dự án thật cũng sẽ viết **custom exception**: loại lỗi do chính nghiệp vụ của ứng dụng sinh ra, không phải lỗi kỹ thuật của Python. Bài này mình dựng một form đăng ký thi với ràng buộc độ tuổi **20–30**, và ném ra exception riêng khi người dùng nhập sai.

### 🧱 Xây cây exception riêng

Trước hết tạo một class lỗi gốc, kế thừa `Exception`:

```python
class Error(Exception):
    pass
```

Sau đó tạo exception cụ thể cho nghiệp vụ "ngày sinh không hợp lệ", kế thừa từ `Error` chứ không phải trực tiếp từ `Exception`:

```python
class DOBException(Error):
    pass
```

Vì sao cần class gốc `Error` trung gian? Để mọi custom exception của dự án cùng nằm dưới một gốc chung — sau này có thể bắt `except Error` để xử lý toàn bộ lỗi do ứng dụng tự sinh ra, tách biệt với lỗi hệ thống.

---

### 📝 Nghiệp vụ: form thi giới hạn tuổi 20–30

```python
try:
    dob = int(input("Please enter your year of birth: "))
    current_year = 2024
    age = current_year - dob

    if 20 <= age <= 30:
        print("The age is valid. You can apply for the exam.")
    else:
        raise DOBException
except DOBException:
    print("Your age should be between 20 and 30 for this competitive exam.")
```

Điểm mấu chốt:

* `input()` luôn trả về **string**, nên phải `int(...)` để tính toán.
* Tuổi = năm hiện tại (2024) − năm sinh.
* Nếu tuổi ngoài khoảng 20–30 → **`raise DOBException`** — chủ động ném lỗi của mình.
* Lỗi đó được bắt ngay bởi `except DOBException` và in thông báo thân thiện.

Vì sao phải đặt trong `try`? Vì khi **tự raise** exception thì cũng cần **tự catch** nó. Nếu để `raise` trong khối if/else trần, exception sẽ nổi lên và làm sập chương trình kèm traceback khó hiểu.

---

### 🧪 Chạy thử

Nhập năm sinh `1987` → tuổi 37, nằm ngoài khoảng → hiện:

```text
Your age should be between 20 and 30 for this competitive exam.
```

Nhập năm sinh hợp lệ (ví dụ 2000) → tuổi 24 → thông báo hợp lệ và được đăng ký thi.

---

### 💡 Vì sao custom exception quan trọng trong dự án thật

* **Thông điệp hướng người dùng**: người dùng cuối không hiểu `ValueError: invalid literal for int()`; họ hiểu "tuổi của bạn phải từ 20 đến 30".
* **Phân tách trách nhiệm**: lỗi do người dùng nhập sai khác với lỗi do code. Custom exception giúp phân loại rõ ràng.
* **Kết hợp logging**: trong ứng dụng end-to-end, nơi có cả exception handling lẫn logging, bạn thường raise custom exception rồi ghi log kèm thông tin nghiệp vụ.

> ⚠️ Cần kiểm chứng: transcript đọc điều kiện tuổi không rõ ràng (nghe như "less than or equal to 30" và "greater than or equal to 2020"), trong khi thông điệp lỗi nói tuổi phải trong khoảng 20–30. Bài viết dùng điều kiện `20 <= age <= 30` theo đúng ràng buộc được nêu ở đầu video.

---

Tự tạo exception là bước đệm để viết code "biết nói": báo lỗi đúng chỗ, đúng người, đúng ngữ cảnh. Bài sau mình quay lại một chủ đề nền tảng của Python — **iterator**, cơ chế đứng sau mọi vòng `for`.
