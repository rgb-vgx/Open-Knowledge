---
title: 'Bài 013 — Ví dụ thực tế với List trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 13
status: edited
source: '013 - Preactical Exmaples Of List.md'
categories:
- AI
tags: []

---

# 📋 Ví dụ thực tế với List trong Python

> Nguồn: `013 - Preactical Exmaples Of List.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084939)

Chào các bạn! Sau khi đã nắm cú pháp Python, bài này mình sẽ cùng các bạn áp **list** vào những ví dụ thực tế. Mục tiêu không phải dựng một dự án hoàn chỉnh, mà để thấy rõ **list** được dùng ở đâu trong đời sống lập trình và vì sao nó là cấu trúc dữ liệu xuất hiện khắp nơi.

### 🧠 Vì sao list có mặt ở khắp nơi

Các bạn dùng ứng dụng mỗi ngày, và đằng sau rất nhiều module nhỏ là **list**. Giảng viên nhấn mạnh: đây là cấu trúc dữ liệu chung của mọi ngôn ngữ lập trình, không riêng Python — vì nó cho phép **thêm**, **xóa** và **duyệt** phần tử một cách linh hoạt.

Trong bài này mình sẽ đi qua ba ví dụ: ứng dụng to-do list, quản lý điểm sinh viên và quản lý inventory. Mỗi ví dụ đều dùng những method quen thuộc như `append()` và `remove()`.

---

### ✅ Ví dụ 1 — Ứng dụng to-do list

Đây là ví dụ đầu tiên: một danh sách các việc cần làm. Mình tạo biến `to_do_list` chứa ba việc ban đầu:

* `"buy groceries"` — đi mua đồ tạp hóa.
* `"clean the house"` — dọn nhà.
* `"pay bills"` — thanh toán hóa đơn.

Khi phát sinh việc mới, mình dùng `to_do_list.append(...)` để thêm vào cuối danh sách. Giảng viên thêm hai việc: `"schedule a meeting"` (hẹn họp) và `"go for a run"` (đi chạy bộ).

Sau khi hoàn thành một việc — ví dụ đã dọn nhà xong — ứng dụng sẽ gọi `to_do_list.remove("clean the house")` để gỡ việc đó khỏi danh sách. Đây chính là logic "khi người dùng tick hoàn thành thì xóa khỏi list" trong các app thật.

Tiếp theo là kiểm tra còn việc gì chưa làm bằng toán tử `in`:

* Nếu `"pay bills" in to_do_list` thì in lời nhắc: `"don't forget to pay the utility bills"`.

Cuối cùng, mình duyệt và in các việc còn lại bằng `for task in to_do_list`, kết hợp **f-string** để định dạng câu in (giảng viên gọi f-string là "formatting string").

Khi chạy, kết quả cho thấy đúng như mong đợi:

* Có câu nhắc thanh toán hóa đơn, vì `"pay bills"` vẫn còn trong list.
* Danh sách còn lại gồm `"buy groceries"`, `"pay bills"`, `"schedule a meeting"`, `"go for a run"` — `"clean the house"` đã bị gỡ.

Qua ví dụ này, các bạn thấy rõ: thêm bằng `append()`, xóa bằng `remove()`, kiểm tra bằng `in`, duyệt bằng `for`. Một chiếc to-do list thật sự được xây từ đúng những thao tác đó.

---

### 📊 Ví dụ 2 — Quản lý điểm sinh viên

Ví dụ thứ hai là quản lý điểm. Mình có một list `grades` gồm `85, 92, 78, 90, 88`. Khi có điểm mới, chỉ cần `grades.append(...)` để thêm vào.

Từ list này, mình tính các chỉ số thống kê bằng hàm có sẵn của Python:

1. **Điểm trung bình**: `sum(grades) / len(grades)` — cộng tổng rồi chia cho số phần tử.
2. **Điểm cao nhất**: `max(grades)`.
3. **Điểm thấp nhất**: `min(grades)`.

Giảng viên nhấn mạnh các hàm như `sum()` được áp dụng trực tiếp lên collection, cụ thể là list ở đây. Nhờ vậy chỉ vài dòng là ra ngay điểm trung bình, cao nhất và thấp nhất của cả lớp — đúng kiểu tính toán mà app quản lý điểm nào cũng cần.

---

### 📦 Ví dụ 3 — Quản lý inventory

Ví dụ thứ ba là quản lý inventory (tồn kho), thứ mà mọi trang thương mại điện tử đều phải xử lý. Mình có list `inventory` gồm `"apples"`, `"bananas"`, `"oranges"`, `"grapes"`.

Các thao tác mô phỏng vòng đời hàng hóa:

* Khi nhập thêm hàng — ví dụ `"strawberries"` — mình `inventory.append("strawberries")`.
* Khi có người đặt và đã giao xong — ví dụ `"bananas"` — mình `inventory.remove("bananas")` để trừ khỏi kho.
* Kiểm tra tồn kho: nếu `item == "oranges"` và `item in inventory` thì in `"in stock"`, ngược lại in `"out of stock"`.
* Cuối cùng in toàn bộ inventory còn lại.

Khi chạy, kết quả in ra `"oranges are in stock"` (vì cam vẫn còn trong kho) và list còn lại là `"apples"`, `"oranges"`, `"grapes"`, `"strawberries"`.

Giảng viên lưu ý: với hệ thống thật, lượng dữ liệu sẽ rất lớn, nhưng bên trong vẫn là những cấu trúc dữ liệu như list đang được dùng để quản lý.

---

### 🚀 Bài tập dành cho các bạn

Mình để lại một bài tập nhỏ: hãy tự thử một ví dụ tương tự bằng list và xem mình đã hiểu cách thêm, xóa, kiểm tra phần tử chưa. Các bạn cứ mở notebook, tạo list của riêng mình rồi thực hành `append()`, `remove()` và `in` — học bằng cách làm là cách nhớ lâu nhất. Hẹn gặp các bạn ở bài tiếp theo, nơi ta chuyển sang một cấu trúc dữ liệu mới: **set**.
