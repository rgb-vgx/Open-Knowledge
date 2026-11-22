---
title: 'Bài 014 — Set trong Python: dữ liệu không trùng lặp'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 14
status: edited
source: '014 - Sets In Python.md'
categories:
- AI
tags: []

---

# 🧩 Set trong Python: dữ liệu không trùng lặp

> Nguồn: `014 - Sets In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084947)

Chào các bạn! Sau list, dict và tuple, hôm nay mình đến với một cấu trúc dữ liệu rất hay dùng: **set**. Bài này mình sẽ đi từ định nghĩa, cách tạo, các thao tác thêm/xóa, tới những phép toán tập hợp và vài ứng dụng thực tế — tất cả đều chạy trực tiếp trong notebook.

### 🧠 Set là gì?

Theo định nghĩa giảng viên đưa ra: **set** là kiểu dữ liệu có sẵn (built-in) trong Python, dùng để lưu một tập hợp các phần tử **duy nhất**. Có ba điểm cần nhớ ngay:

1. **Không trùng lặp** — mỗi phần tử chỉ xuất hiện một lần.
2. **Không có thứ tự** — phần tử không theo một trật tự cố định nào.
3. **Kiểm tra membership rất nhanh** — hợp để hỏi "phần tử này có trong tập không?".

Set đặc biệt hữu ích khi các bạn cần **loại bỏ phần tử trùng** hoặc thực hiện các **phép toán tập hợp** như union (hợp), intersection (giao), difference (hiệu) và symmetric difference (hiệu đối xứng). Đây là cấu trúc được dùng phổ biến chỉ sau list, dict và tuple.

---

### ⚙️ Tạo set và các thao tác cơ bản

**Tạo set** bằng cặp ngoặc nhọn `{}`, giống dict nhưng chỉ chứa giá trị chứ không có cặp key-value. Ví dụ `my_set = {1, 2, 3, 4, 5}` rồi `print(my_set)` và `type(my_set)` sẽ cho thấy kiểu `set`.

Một điểm rất quan trọng: muốn tạo **set rỗng** thì phải dùng `set()`, chứ **không** dùng `{}` — vì `{}` là dictionary rỗng. Ngoài ra có thể ép kiểu từ list hoặc tuple sang set bằng `set(...)`, ví dụ `set([1, 2, 3, 4, 5, 6])`. Đây là cách nhanh để biến một collection bất kỳ thành set.

Vì set không cho trùng lặp, nếu khai báo `{1, 2, 3, 4, 5, 6, 5, 6}` thì các giá trị `5` và `6` lặp lại sẽ bị bỏ qua, chỉ còn `{1, 2, 3, 4, 5, 6}`.

Các thao tác thêm/xóa:

* `my_set.add(7)` — thêm phần tử. Nếu thêm phần tử đã có, set bỏ qua, không báo lỗi.
* `my_set.remove(3)` — xóa phần tử. Nếu phần tử **không tồn tại**, Python ném `KeyError`.
* `my_set.discard(10)` — xóa nếu có, **không** báo lỗi khi phần tử vắng mặt. Đây là lựa chọn an toàn khi không chắc phần tử còn hay không.
* `my_set.pop()` — xóa và trả về một phần tử bất kỳ.
* `my_set.clear()` — xóa sạch, trả về set rỗng.

Kiểm tra membership bằng `in`: `3 in my_set` trả `True`, `10 in my_set` trả `False`.

> **Ghi chú:** giảng viên mô tả `pop()` như kiểu "first in first out", nhưng theo tài liệu Python, `set.pop()` xóa và trả về một phần tử **bất kỳ** (arbitrary), vì set vốn không có thứ tự. Các bạn cứ nhớ là `pop()` lấy ra một phần tử bất kỳ, không đảm bảo thứ tự.

---

### ➗ Các phép toán tập hợp

Đây là phần mạnh nhất của set. Mình lấy hai set để minh họa: `set1 = {1, 2, 3, 4, 5, 6}` và `set2 = {4, 5, 6, 7, 8, 9}`.

* **Union (hợp)** — `set1.union(set2)` gộp mọi phần tử của cả hai, kết quả `{1, 2, 3, 4, 5, 6, 7, 8, 9}`.
* **Intersection (giao)** — `set1.intersection(set2)` chỉ giữ phần tử chung, kết quả `{4, 5, 6}`.
* **Intersection update** — `set1.intersection_update(set2)` tính giao rồi **ghi đè kết quả vào chính `set1`**, nên `set1` trở thành `{4, 5, 6}`.
* **Difference (hiệu)** — `set1.difference(set2)` lấy phần tử có trong `set1` mà không có trong `set2`, kết quả `{1, 2, 3}`.
* **Difference update** — `set1.difference_update(set2)` tính hiệu rồi cập nhật thẳng vào `set1`.
* **Symmetric difference (hiệu đối xứng)** — `set1.symmetric_difference(set2)` giữ các phần tử chỉ thuộc một trong hai set, bỏ phần chung, kết quả `{1, 2, 3, 7, 8, 9}`.

Giảng viên nhấn mạnh quy tắc chung: bất kỳ method nào có đuôi **`_update`** đều "làm phép toán rồi ghi kết quả vào một trong hai set", khác với bản không có `_update` là trả về set mới.

Các bạn cũng có thể đảo chiều, ví dụ `set2.difference(set1)` sẽ cho `{7, 8, 9}`, và `set2.symmetric_difference(set1)` cho kết quả y hệt bản đảo của `set1`.

---

### 🔗 Quan hệ tập con

Ngoài các phép toán, set còn có method kiểm tra quan hệ bao hàm. Lấy `set1 = {1, 2, 3}` và `set2 = {3, 4, 5}`:

* `set1.issubset(set2)` — hỏi "mọi phần tử của `set1` có nằm trong `set2` không?". Kết quả `False`, vì `1` và `2` không có trong `set2`.
* `set1.issuperset(set2)` — hỏi "`set1` có chứa trọn `set2` không?". Kết quả cũng `False`.

Nếu đổi `set1` thành `{3, 4, 5}` bằng `set2`, thì `set1` trở thành superset của `set2` (một tập bằng nhau vừa là subset vừa là superset của chính nó). Giảng viên dặn: set còn rất nhiều method khác, các bạn nên tự luyện thêm để quen tay.

---

### ✅ Ứng dụng thực tế

**Loại bỏ phần tử trùng trong list.** Cho list `[1, 2, 2, 3, 4, 4, 5]`, chỉ cần gọi `set([1, 2, 2, 3, 4, 4, 5])` là nhận về `{1, 2, 3, 4, 5}` — gọn và nhanh.

**Đếm số từ duy nhất trong một câu.** Giảng viên lấy câu: `"In this tutorial we are discussing about sets"`. Cách làm:

1. `text.split()` — tách câu thành list các từ.
2. `set(words)` — ép sang set để lấy các từ duy nhất, gán vào `unique_words`.
3. In `unique_words`, rồi in `len(unique_words)` để đếm số từ duy nhất.

Kết quả là **8** từ duy nhất trong câu trên. Một ứng dụng nhỏ nhưng cho thấy sức mạnh của set khi cần lọc trùng và đếm nhanh.

Mình đã đi hết định nghĩa, cách tạo, thêm/xóa, membership, các phép toán tập hợp và vài ứng dụng. Hẹn các bạn ở bài tiếp theo — nơi ta khám phá **dictionary**, cấu trúc lưu dữ liệu theo cặp key-value.
