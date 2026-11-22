---
title: 'Bài 016 — Tuple trong Python: bất biến nhưng cực kỳ tiện'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 16
status: edited
source: '016 - Tuples In Python.md'
categories:
- AI
tags: []

---

# 📦 Tuple trong Python — bất biến mà vẫn linh hoạt

> Nguồn: `016 - Tuples In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084953)

Chào các bạn! Sau khi đã "quậy" thoải mái với list ở bài trước, hôm nay mình giới thiệu **tuple** — người anh em gần giống list nhưng có một điểm khác biệt cốt lõi: **bất biến (immutable)**. Chúng ta sẽ tạo tuple, truy cập phần tử, làm các phép toán, nắm tính bất biến, dùng `count`/`index`, rồi học **packing/unpacking** và **nested tuple** — tất cả đều qua code thực hành.

### 🧱 Tạo tuple và chuyển đổi qua lại với list

**Tuple** là tập hợp có thứ tự, các phần tử **không thể thay đổi** sau khi gán. Về cơ bản nó giống list, chỉ khác ở tính bất biến.

* Tuple rỗng: dùng cặp ngoặc tròn `()`.
* List rỗng: dùng cặp ngoặc vuông `[]`.
* Cả hai đều tạo được bằng cách gọi lớp trực tiếp `tuple()` và `list()` — cách này mình chưa kịp nói ở bài list nên nhân đây bổ sung.

Điểm hay là **chuyển đổi hai chiều**:

* `tuple([1, 2, 3, 4, 5, 6])` biến một list thành tuple.
* `list((1, 2, 3, 4, 5, 6))` biến một tuple thành list.

Tuple cũng chứa được **nhiều kiểu dữ liệu** trong cùng một "hộp": số nguyên, chuỗi, số thực, boolean — thoải mái như list.

---

### 🔍 Truy cập phần tử: index và slicing

Cách truy cập giống hệt list:

* `numbers[0]` lấy phần tử đầu (index 0).
* `numbers[-1]` lấy phần tử cuối.
* `numbers[0:4]` lấy các phần tử từ index 0 đến trước index 4.
* `numbers[::-1]` đảo ngược tuple.

Một điểm cần nhớ: kết quả của **slicing trên tuple vẫn là tuple**, không phải list. Các thao tác index/slicing đã học ở list áp dụng nguyên si cho tuple.

---

### ➕ Phép nối và phép lặp

Tuple hỗ trợ **concatenation**, **repetition** và **slicing**.

* **Nối:** `numbers + mixed_tuple` ghép hai tuple thành một. Ví dụ `1..6` nối với `1, "hello", 3.14, True` cho ra `1, 2, 3, 4, 5, 6, 1, "hello", 3.14, True`.
* **Lặp:** `mixed_tuple * 3` lặp lại toàn bộ tuple ba lần. `numbers * 3` cũng cho `123456` lặp lại ba lần.

Lưu ý: phép `*` ở đây **lặp cả tuple**, chứ không nhân từng số bên trong. Muốn nhân từng phần tử thì phải vòng lặp lấy từng giá trị rồi tính.

---

### 🔒 Tính bất biến — điểm khác biệt cốt lõi

Đây là phần quan trọng nhất. Với **list**, các bạn đổi được phần tử: `my_list[0] = "Krish"` chạy ngon, vì list là **mutable**.

Với **tuple**, làm y vậy sẽ báo lỗi kiểu *"tuple object does not support item assignment"*. Đó chính là **immutability** — phần tử không đổi được sau khi đã gán.

Nếu thật sự cần sửa, có một mẹo: **chuyển tuple sang list → sửa phần tử → chuyển lại thành tuple**. Nhưng mặc định, hãy nhớ tuple là bất biến.

---

### 🛠️ Hai method dùng nhiều nhất: count và index

Tuple chỉ có hai method thực dụng thường gặp:

* `numbers.count(1)` — đếm số lần giá trị xuất hiện. Với `(1, 2, 3, 4, 5, 6)`, `count(1)` trả về `1`.
* `numbers.index(3)` — trả về **index đầu tiên** của giá trị. Với tuple trên, `index(3)` trả về `2`.

Hai hàm này nhỏ nhưng cực tiện khi xử lý dữ liệu.

---

### 🎁 Packing, unpacking và nested tuple

**Packing:** chỉ cần viết các giá trị ngăn bằng dấu phẩy, Python tự gói chúng vào một tuple. Ví dụ `packed = 1, "hello", 3.14` tạo ra tuple ba phần tử.

**Unpacking:** gán ngược tuple cho nhiều biến cùng lúc: `a, b, c = packed` → `a = 1`, `b = "hello"`, `c = 3.14`.

**Unpacking với dấu sao:** khi có nhiều phần tử hơn số biến, dùng `*` để "hứng" phần còn lại:

* `first, *middle, last = numbers` với `numbers = (1, 2, 3, 4, 5, 6)`.
* Kết quả: `first = 1`, `middle` ôm các phần tử `2, 3, 4, 5`, `last = 6`.

**Nested tuple** — tuple lồng trong tuple — truy cập bằng index chồng index:

* `nested_tuple[0]` lấy cả tuple con đầu tiên, ví dụ `(1, 2, 3)`.
* `nested_tuple[1][2]` lấy phần tử thứ ba trong tuple con thứ hai (ví dụ chữ `"c"`).
* Duyệt toàn bộ bằng vòng lặp lồng: `for sub_tuple in nested_tuple:` rồi `for item in sub_tuple:`.

Tuple là cấu trúc **linh hoạt và hữu ích** ở những nơi cần một tập hợp **bất biến, có thứ tự**: dùng làm khóa cho dictionary, đóng gói tham số và giá trị trả về của hàm, hay xử lý dữ liệu khi phân tích. Nắm chắc tuple sẽ giúp code Python của các bạn gọn và dễ đọc hơn.

Hẹn các bạn ở bài tiếp theo, khi mình cùng khám phá cấu trúc dữ liệu kế tiếp: **set**.
