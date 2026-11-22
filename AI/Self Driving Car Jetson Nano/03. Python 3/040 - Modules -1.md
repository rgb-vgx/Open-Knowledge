---
title: 'Module trong Python: import, from … import và đặt bí danh as'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 040
status: edited
source: '040 - Modules -1.md'
categories:
- AI
tags: []
---

# 📦 Module trong Python: import, from … import và đặt bí danh as

> Nguồn: `040 - Modules -1.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39601246)

Chào các bạn, bài này mình học **module**. Module là những file Python do các nhà phát triển viết sẵn, giúp công việc code nhẹ đi rất nhiều. Ví dụ cần một công thức toán mà không muốn tự xây, ta dùng module `math` có sẵn.

Python có nhiều module đi kèm, và cũng có thể tải thêm module khác về dùng. Sau này mình sẽ dùng module **OpenCV** cho phần lane tracking.

### 🧩 Module là gì

Trong Python, module là một file chứa các định nghĩa và câu lệnh Python: hàm, class, biến và code khác, có thể được chương trình khác dùng thông qua **import**. Đây là nền của cách lập trình theo module trong Python, giúp tái sử dụng code, tổ chức gọn và tách bạch trách nhiệm.

### ⬇️ Cách 1: import cả module

Dùng từ khóa `import`, sau đó là tên module:

```python
import math

print(math.pi)
```

Gọi một thành phần trong module thì viết tên module trước, dấu chấm, rồi tên thành phần. Ở đây `pi` là hằng số π.

### 🎯 Cách 2: from … import

Nếu chỉ cần vài thành phần, không cần nạp cả module:

```python
from math import pi

print(pi)
```

Lúc này gọi trực tiếp `pi` mà không cần tiền tố `math.`. Lưu ý: chỉ những thành phần đã khai báo mới dùng được — ví dụ đã `from math import pi` thì không còn dùng được các thành phần khác qua tên `math`.

### ✂️ Cách 3: đặt bí danh bằng as

Khi tên module quá dài, dùng `as` để rút gọn:

```python
import math as m

print(m.pi)
```

Sau đó gọi thành phần qua bí danh `m`.

---

Ba cách import này các bạn sẽ gặp liên tục, đặc biệt khi làm việc với OpenCV. Bài sau mình xem thêm ví dụ về module.
