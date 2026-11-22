---
title: 'Toán tử logic and, or, not và ứng dụng ra quyết định'
date: '2026-11-23'
course: 'self-driving-car'
lesson: 024
status: edited
source: '024 - Operators -2.md'
categories:
- AI
tags: []
---

# 🧠 Toán tử logic and, or, not và ứng dụng ra quyết định

> Nguồn: `024 - Operators -2.md` · [Udemy](https://viettel.udemy.com/course/self-driving-car-with-jetson-nano-lane-tracking-opencv/learn/lecture/39529284)

Chào các bạn, bài này mình học **toán tử logic**. Hãy hình dung xe tự hành gặp hai vật thể khác nhau: nó phải ưu tiên một vật và điều khiển động cơ tương ứng. Những lúc như vậy, ta cần kiểm soát hai hoặc nhiều trạng thái cùng lúc — đó là việc của toán tử logic.

Python có ba toán tử logic: **and**, **or** và **not**.

### 🔗 Toán tử and

**and** chỉ trả về `True` khi **tất cả** các điều kiện đều đúng. Mọi trường hợp còn lại trả về `False`.

* `True and True` → `True`.
* `5 > 0` là `True`, nhưng `"a" == "A"` là `False`; ghép bằng `and` → `False`, vì vế thứ hai sai.
* `False and True` → `False`.
* `False and False` → `False`.

Tóm lại chỉ cần một vế sai là kết quả sai.

---

### 🔀 Toán tử or

**or** trả về `True` nếu **ít nhất một** điều kiện đúng, và chỉ trả về `False` khi tất cả đều sai.

* `5 > 4` và `2 == 2` đều đúng → `True`.
* `5 > 0` đúng, `"a" == "A"` sai → `True or False` = `True`.
* Một vế `20 != 5` đúng → kết quả `True`.
* `False or False` → `False`.

---

### 🔄 Toán tử not

**not** đảo ngược giá trị logic:

* `not True` → `False`.
* `not False` → `True`.

---

### 🚗 Vì sao xe tự hành cần toán tử logic

Khi có nhiều điều kiện cùng lúc — ví dụ phải ưu tiên vật thể này và vẫn giữ điều khiển động cơ — các bạn sẽ ghép các điều kiện bằng `and`, `or`. Nắm chắc ba toán tử này là nền để viết phần ra quyết định sau này.

---

Vậy là mình đã đi hết toán tử logic. Bài sau mình sẽ thực hành chúng ngay trong môi trường code.
