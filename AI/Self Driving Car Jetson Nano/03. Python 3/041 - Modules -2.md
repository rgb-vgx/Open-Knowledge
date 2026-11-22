---
title: 'Module có sẵn trong Python và cách tự tạo module của bạn'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 041
status: edited
source: '041 - Modules -2.md'
categories:
- AI
tags: []
---

# 🧰 Module có sẵn trong Python và cách tự tạo module của bạn

> Nguồn: `041 - Modules -2.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39601502)

Chào các bạn, bài trước mình đã biết cách import module. Bài này mình xem một số module có sẵn và cách tạo module của riêng mình.

### 📚 Vài module built-in quen thuộc

* **math** — thực hiện các phép toán.
* **datetime** — xử lý ngày và giờ.
* **random** — sinh số ngẫu nhiên.
* **json** — mã hóa và giải mã định dạng JSON.
* **tkinter** — tạo giao diện đồ họa (GUI).

Mỗi module chứa các hàm, biến hoặc nhóm chức năng khác nhau.

### 🛠️ Tự tạo module

Muốn có module riêng, các bạn chỉ cần tạo một file Python và định nghĩa các cấu trúc bên trong. Ví dụ file module có hai hàm: một hàm chào người dùng, một hàm tính bình phương của một số.

Để dùng lại, tạo một file Python khác và import tên file **không kèm phần mở rộng**:

```python
import mymodule

mymodule.greet("Yilmaz")
mymodule.square(5)
```

Sau khi import, mọi cấu trúc trong module đều dùng được qua cú pháp `tên_module.tên_cấu_trúc`. Ở đây hàm chào nhận một chuỗi, hàm bình phương nhận một số nguyên.

### 💡 Vì sao tách module

Tách code thành module giúp tái sử dụng và giữ file chính gọn hơn. Khi sang phần OpenCV, các bạn sẽ thấy thư viện cũng được nạp theo đúng cơ chế này.

---

Vậy là mình đã biết cả module có sẵn lẫn module tự viết. Bài sau mình thực hành với `math` và `time`.

> ⚠️ Cần kiểm chứng: transcript mô tả hàm `square` là "take the square root" (căn bậc hai), trong khi tên hàm `square` thường mang nghĩa bình phương. Transcript gốc không nêu rõ kết quả chạy, nên cần đối chiếu code mẫu trong khóa.
