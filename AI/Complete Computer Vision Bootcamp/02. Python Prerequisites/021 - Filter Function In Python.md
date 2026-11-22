---
title: 'Bài 021 — Hàm Filter trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 21
status: edited
source: '021 - Filter Function In Python.md'
categories:
- AI
tags: []

---

# 🧹 Hàm Filter trong Python

> Nguồn: `021 - Filter Function In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49085005)

Chào các bạn! Sau khi đã làm quen với **lambda** và **map**, bài này mình đến với **filter function** — hàm chuyên chọn ra những phần tử thỏa một điều kiện nào đó. Nếu map biến đổi mọi phần tử, thì filter giữ lại đúng những phần tử các bạn cần.

### 🧹 Filter làm gì?

**Filter** tạo ra một **iterator** từ các phần tử của một iterable mà tại đó hàm kiểm tra trả về `True`. Nói cách khác, nó dùng để **lọc bỏ** các item trong list dựa trên một điều kiện.

Cú pháp quen thuộc gồm hai tham số:

1. **Hàm** dùng để kiểm tra điều kiện.
2. **Iterable** — tập dữ liệu cần lọc.

Chỉ những phần tử khiến hàm trả về `True` mới được giữ lại.

---

### ✅ Lọc số chẵn với hàm thường

Mình bắt đầu bằng hàm `even(num)` kiểm tra số chẵn: nếu `num % 2 == 0` thì trả về `True`. Gọi `even(24)` được `True` vì 24 là số chẵn — đây là dạng hàm các bạn đã gặp nhiều lần.

Giờ mình có list các số từ **1 đến 12** và muốn giữ lại những số thỏa điều kiện chẵn. Cách thủ công là lặp qua từng phần tử, kiểm tra rồi append vào list khác. Nhưng với filter, mình chỉ cần gọi `filter(even, numbers)` rồi bọc `list(...)`.

Kết quả là toàn bộ các số chẵn trong list. Cơ chế rất rõ: filter lấy từng phần tử, đưa vào hàm `even`; phần tử nào trả về `True` thì được giữ, còn lại bị loại.

---

### 🎯 Filter đi cùng lambda

Giống map, filter kết hợp rất tự nhiên với **lambda**. Giả sử mình có list số từ **1 đến 9** và muốn lấy các số **lớn hơn 5**.

Các bạn viết `list(filter(lambda x: x > 5, numbers))`. Lambda nhận `x`, biểu thức là `x > 5`; filter áp điều kiện đó lên từng phần tử và chỉ giữ những số thỏa mãn. Kết quả là các số lớn hơn 5 trong list.

Chỉ với một dòng logic ngắn gọn, các bạn đã lọc xong dữ liệu mà không cần vòng lặp.

---

### 🧩 Nhiều điều kiện trong một lambda

Filter còn cho phép gộp **nhiều điều kiện** bằng toán tử logic. Ví dụ mình muốn lấy các số **vừa chẵn vừa lớn hơn 5** từ list 1 đến 9.

Lambda lúc này là `lambda x: x > 5 and x % 2 == 0`. Hai điều kiện được nối bằng `and`:

* `x > 5` — lớn hơn 5.
* `x % 2 == 0` — là số chẵn.

Gọi `list(filter(lambda x: x > 5 and x % 2 == 0, numbers))`, kết quả chỉ còn **6 và 8**. Các phần tử còn lại hoặc là số lẻ, hoặc nhỏ hơn 5, nên đều bị loại.

---

### 🗂️ Lọc trên list dictionary

Filter không chỉ dành cho list số. Mình thử áp nó lên **list dictionary** — ví dụ lọc những người có tuổi lớn hơn **25**.

Dữ liệu gồm ba bản ghi: **Krish** tuổi **32**, **Jack** tuổi **33**, và **John** tuổi **25**. Mình viết hàm kiểm tra nhận vào một dictionary `person` và trả về `person['age'] > 25`.

Sau đó gọi `list(filter(age_greater_than_25, people))`. Filter duyệt qua từng bản ghi, giữ lại những người thỏa điều kiện. Kết quả là bản ghi của **Krish** và **Jack** (tuổi 32 và 33); John với tuổi 25 không lớn hơn 25 nên bị loại.

---

### 📌 Kết luận

**Filter** là công cụ mạnh để tạo ra các iterator đã được lọc từ một iterable, dựa trên một hàm điều kiện. Nó thường được dùng cho **data cleaning**, lọc object và loại bỏ những phần tử không mong muốn.

Thành thạo filter giúp các bạn viết code xử lý và thao tác collection ngắn gọn, hiệu quả hơn. Đến đây các bạn đã đi qua một vòng các loại hàm quan trọng: hàm thường, **anonymous function (lambda)**, **map** và **filter**. Những kiến thức này sẽ được tái sử dụng xuyên suốt khóa học. Hẹn gặp các bạn ở bài tiếp theo!
