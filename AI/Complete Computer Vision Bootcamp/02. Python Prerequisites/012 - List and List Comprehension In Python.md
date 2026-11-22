---
title: 'Bài 012 — List và list comprehension trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 12
status: edited
source: '012 - List and List Comprehension In Python.md'
categories:
- AI
tags: []

---

# 📋 List và list comprehension trong Python

> Nguồn: `012 - List and List Comprehension In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084925)

Chào các bạn! Hôm nay chúng ta bắt đầu bước vào **data structures** trong Python, và bài này dành trọn cho **list** — một trong những kiểu dữ liệu dùng nhiều nhất. Mình sẽ đi từ cách tạo, truy cập, sửa phần tử, các method hay dùng, slicing, duyệt list, cho tới **list comprehension** và **nested list comprehension**, kèm nhiều ví dụ thực hành.

### 📋 List là gì và tạo như thế nào?

Định nghĩa gọn: list là **collection có thứ tự và có thể thay đổi (ordered mutable collection)**. "Mutable" nghĩa là các phần tử bên trong có thể sửa được. Ngoài ra list còn chứa được **nhiều kiểu dữ liệu khác nhau** cùng lúc.

Tạo list chỉ cần cặp ngoặc vuông `[]`. Nếu để rỗng rồi in `type()` ra, các bạn thấy nó là class `list` — một list rỗng. Muốn có dữ liệu thì đặt phần tử vào giữa hai ngoặc, ví dụ một danh sách tên gồm nhiều chuỗi, hay một list các số.

Mình cũng tạo thử một **mixed list**: phần tử đầu là số nguyên, tiếp theo là string, rồi float, cuối cùng là boolean. Python chấp nhận hết — không bắt mọi phần tử phải cùng kiểu. Đó là hai thuộc tính cốt lõi cần nhớ: **có thứ tự, sửa được, đa kiểu**.

---

### 🔍 Truy cập phần tử và slicing

Với list `fruits` gồm `apple, banana, cherry, kiwi, guava`, mỗi phần tử nằm ở một **index** bắt đầu từ **0**: apple ở index 0, banana ở 1, cherry ở 2, kiwi ở 3, guava ở 4. Mình có nhắc tới R — ngôn ngữ đó đánh index từ 1, còn Python luôn từ 0.

* `fruits[0]` cho `apple`, `fruits[2]` cho `cherry`.
* **Index âm** đếm từ cuối: `fruits[-1]` trả về `guava`, tức phần tử cuối cùng.

**Slicing** dùng dấu hai chấm để lấy một đoạn:

* `fruits[1:]` lấy từ index 1 **tới hết**, ra `banana, cherry, kiwi, guava`.
* `fruits[1:3]` lấy từ index 1 **tới trước index 3**, nên chỉ có `banana` và `cherry` — phần tử ở index 3 (kiwi) không được tính.

Mình thử cả trường hợp index âm như `fruits[-1:-3]` và thấy kết quả gây rối, nên tạm gác lại — giảng viên hẹn sẽ nói kỹ ở các video sau trong series. Các bạn cứ nắm chắc quy tắc "start được tính, stop bị loại" trước đã.

---

### ✏️ Sửa phần tử và các list method

Vì list mutable, gán thẳng vào index là sửa được: `fruits[1] = 'watermelon'` biến `banana` thành `watermelon`.

Mình thử gán cả một đoạn bằng `fruits[1:] = 'watermelon'` và gặp một điều bất ngờ: kết quả không phải một từ `watermelon` mà là từng **ký tự** được đưa vào. Lý do là chuỗi cũng là một iterable, nên Python tách nó ra từng chữ cái. Muốn thêm nguyên một phần tử, nên dùng các method bên dưới.

Các method quan trọng của list:

* `append('orange')` — thêm phần tử vào **cuối** list.
* `insert(1, 'watermelon')` — chèn vào **vị trí index** chỉ định; tham số đầu là index, tham số sau là phần tử.
* `remove('banana')` — xoá phần tử theo giá trị, và chỉ xoá **lần xuất hiện đầu tiên**.
* `pop()` — lấy ra và **trả về phần tử cuối**, đồng thời xoá nó khỏi list (ví dụ `popped_fruit = fruits.pop()` lấy `orange`).
* `index('cherry')` — trả về index của phần tử, ở đây là **3**.
* `count('banana')` — đếm số lần phần tử xuất hiện; sau khi chèn thêm, list có **2** quả banana nên trả về 2.
* `sort()` — sắp xếp list theo thứ tự **tăng dần**.
* `reverse()` — đảo ngược thứ tự các phần tử.
* `clear()` — xoá **toàn bộ** phần tử, để lại list rỗng.

---

### ✂️ Slicing nâng cao và duyệt list

Với list `numbers` từ 1 đến 10:

* `numbers[2:5]` lấy các index 2, 3, 4, ra `3, 4, 5`.
* `numbers[5:]` lấy từ index 5 tới hết list.
* **Hai dấu hai chấm** cho phép chỉ định **step**: `numbers[::2]` nhảy hai bước, ra `1, 3, 5, 7, 9`; `numbers[::3]` nhảy ba bước, ra `1, 4, 7, 10`.
* `numbers[::-1]` đảo ngược toàn bộ list; `numbers[::-2]` đi từ cuối và bỏ cách một phần tử, tức lấy mỗi hai số một từ phía sau.

Duyệt list thì vẫn dùng `for`: `for number in numbers` in lần lượt từng phần tử. Khi cần **cả index lẫn giá trị**, dùng hàm **`enumerate`**: `for index, number in enumerate(numbers)`. Kết quả cho thấy 1 nằm ở index 0, 2 ở index 1, 3 ở index 2... cứ thế tới 10 ở index 9.

---

### ⚡ List comprehension

Đặt vấn đề: mình muốn bình phương mọi số trong `range(10)`. Cách thường là tạo list rỗng, chạy `for x in range(10)`, rồi `append(x * x)` — mất 3-4 dòng. Kết quả được `0, 1, 4, 9, 16, 25, 36, 49, 64, 81`.

**List comprehension** gói gọn tất cả trong **một dòng**, ngay bên trong cặp ngoặc vuông, không cần tạo list rỗng rồi `append` từng phần tử. Theo lời giảng viên, cách này cũng đỡ tốn bộ nhớ và chạy nhanh hơn.

Cú pháp cơ bản:

* `[expression for item in iterable]` — biểu thức đứng trước, vòng lặp đứng sau.
* Có điều kiện thì thêm `if` ở cuối: `[expression for item in iterable if condition]`.

Ví dụ bình phương: `[num * num for num in range(10)]`. Ví dụ lọc số chẵn: `[num for num in range(10) if num % 2 == 0]`, chỉ một dòng thay cho cả đoạn tạo list rỗng rồi append. Giảng viên nhấn mạnh cách này còn chạy **nhanh hơn**.

---

### 🧱 Nested list comprehension và bài tập

**Nested list comprehension** duyệt **hai iterable** cùng lúc: `[expression for item in iterable1 for item2 in iterable2]`.

Mình lấy `list1 = [1, 2, 3]` và `list2 = ['a', 'b', 'c', 'd']`, rồi ghép cặp bằng tuple `(i, j)` — tuple thì chưa học nhưng cứ tạm dùng để gói hai giá trị. Kết quả là toàn bộ cặp: `1a, 1b, 1c, 1d, 2a, 2b, 2c, 2d, 3a, 3b, 3c, 3d`. Cách viết vòng lặp lồng thông thường sẽ dài hơn nhiều dòng, còn comprehension gói lại rất gọn.

Comprehension cũng gọi được **hàm**. Với `words = ['hello', 'world', 'Python', 'list', 'comprehension']`, viết `[len(word) for word in words]` là ra ngay độ dài từng từ. Các bạn có thể thay bằng hàm tự định nghĩa, nguyên tắc vẫn vậy.

Cuối bài, giảng viên để lại một **assignment**: tìm cách dùng `else` trong list comprehension. Phần này chưa được nêu cú pháp cụ thể, và sẽ được nói tiếp khi học về tuple.

---

Tóm lại, list là cấu trúc dữ liệu nền tảng: **có thứ tự, sửa được, chứa đa kiểu**, với bộ method phong phú và slicing mạnh. Còn **list comprehension** thì ngắn gọn, cô đọng, thay được những vòng lặp dài dòng và giúp code sạch hơn, chạy hiệu quả hơn. Điều quan trọng nhất vẫn là **thực hành thật nhiều** — càng làm ví dụ nhiều thì càng quen. Hẹn các bạn ở bài sau với data structure tiếp theo.
