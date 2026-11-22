---
title: 'Bài 020 — Hàm Map trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 20
status: edited
source: '020 - Map Functions In Python.md'
categories:
- AI
tags: []

---

# 🔁 Hàm Map trong Python

> Nguồn: `020 - Map Functions In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084999)

Chào các bạn! Bài này mình sẽ nói kỹ về **map function** — công cụ giúp áp một hàm lên toàn bộ phần tử của một iterable mà không cần viết vòng lặp thủ công. Đây là kỹ năng rất thực dụng, các bạn sẽ gặp lại nó liên tục khi xử lý dữ liệu Python.

### 🔁 Map làm chính xác điều gì?

Theo định nghĩa trong bài: **map** áp một hàm cho trước lên **tất cả các item** trong một input list hoặc bất kỳ iterable nào, rồi trả về một **map object** — một **iterator**. Cách này đặc biệt hữu ích khi các bạn muốn biến đổi dữ liệu trong list một cách gọn gàng.

Nói ngắn gọn: thay vì tự lặp và xử lý từng phần tử, các bạn giao việc đó cho `map`.

---

### 🧪 Từ vòng lặp for đến map

Mình bắt đầu với một hàm `square` nhận một input, nhân nó với chính nó rồi trả kết quả. Gọi `square(4)` được **16**, `square(10)` được **100** — đơn giản và dễ hiểu.

Bây giờ giả sử mình có một list các số `1, 2, 3, 4, 5, 6, 7, 8` (hoặc một tuple) và muốn áp phép bình phương lên **từng số**. Cách quen thuộc là tạo một list rỗng, lặp qua từng phần tử, tính toán trong vòng `for` rồi `append` vào list mới.

Cách đó phải làm khá nhiều bước. Thay vào đó, mình gọi `map` với hai tham số:

1. **Tên hàm** — ở đây là `square`.
2. **Iterable** — list các số cần xử lý.

Chạy `map(square, numbers)`, Python tạo ra một **map object** tại một địa chỉ bộ nhớ. Để xem toàn bộ giá trị dưới dạng list, mình bọc thêm `list(...)`. Kết quả nhận được là **1, 4, 9, 16, 25, 36, 49, 64**: map đã lấy từng số, gọi hàm `square` và trả về bình phương tương ứng.

---

### ✨ Map đi cùng lambda

Map càng gọn hơn khi dùng với **lambda**. Nhớ lại bài trước: hàm chỉ có một biểu thức thì có thể viết thành lambda.

Với cùng list số, mình viết `list(map(lambda x: x * x, numbers))`. Tham số đầu tiên của `map` giờ là một **anonymous function**; tham số thứ hai vẫn là list các số. Kết quả không đổi — vẫn là bình phương từng phần tử.

Các bạn có thể thay biểu thức bằng bất kỳ phép toán nào: cộng thêm **10**, cộng thêm **100**, nhân, chia... miễn là nó gói gọn trong một biểu thức lambda.

---

### ➕ Map với nhiều iterable

Câu hỏi đặt ra: **map có nhận nhiều iterable cùng lúc không?** Câu trả lời là có.

Giả sử `numbers_one = [1, 2, 3]` và `numbers_two = [4, 5, 6]`. Mình muốn cộng từng cặp phần tử theo vị trí để được **5, 7, 9**. Cách làm:

`list(map(lambda x, y: x + y, numbers_one, numbers_two))`

Lambda nhận hai tham số `x, y`, biểu thức là `x + y`; phía sau là hai iterable được truyền lần lượt. Kết quả đúng như mong đợi: **5, 7, 9**.

---

### 🧰 Map với hàm có sẵn và list dictionary

Map không bắt buộc đi với lambda. Các bạn có thể truyền **hàm có sẵn** như `int`, `str.upper`... miễn là nhớ một quy tắc: khi truyền hàm vào map, **không dùng dấu ngoặc** — chỉ đưa tên hàm.

Ví dụ chuyển list chuỗi số sang số nguyên: `list(map(int, string_numbers))`. Typecasting được áp lên toàn bộ các chuỗi trong list chỉ với một dòng.

Với list từ `['apple', 'banana', 'cherry']`, mình dùng `list(map(str.upper, words))` để viết hoa toàn bộ — kết quả là **APPLE, BANANA, CHERRY**.

Cuối cùng là ví dụ trên **list dictionary**. Mình có hàm `get_name(person)` trả về `person['name']`. Dữ liệu gồm hai bản ghi: một người tên **Krish**, tuổi **32**, và một người tên **Jack**, tuổi **33**. Gọi `list(map(get_name, people))`, map áp `get_name` lên từng dictionary và trả về list tên: **Krish, Jack**.

---

### ✅ Kết luận

**Map** là công cụ mạnh để áp các phép biến đổi lên cấu trúc dữ liệu dạng iterable. Nó dùng được với hàm thường, với **lambda**, và thậm chí với **nhiều iterable** cùng lúc — rất linh hoạt cho xử lý dữ liệu trong Python.

Hiểu và dùng thành thạo map giúp các bạn viết code hiệu quả và dễ đọc hơn: một dòng thay cho cả vòng lặp, vẫn đảm bảo hiệu năng. Ở bài sau, mình sẽ giới thiệu **filter** — người anh em còn lại trong bộ đôi map/filter. Hẹn gặp các bạn!
