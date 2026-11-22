---
title: 'Bài 015 — Dictionary trong Python: dữ liệu dạng key-value'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 15
status: edited
source: '015 - Dictionaries In Python.md'
categories:
- AI
tags: []

---

# 🗂️ Dictionary trong Python: dữ liệu dạng key-value

> Nguồn: `015 - Dictionaries In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084971)

Chào các bạn! Đây là một trong những bài quan trọng nhất của phần Python: **dictionary**. Mình sẽ đi qua cách tạo, truy cập, sửa, xóa, các method hay dùng, cách duyệt, nested dictionary, dictionary comprehension, và kết thúc bằng hai ví dụ thực tế. Tất cả đều thực hành ngay trong notebook.

### 🧠 Dictionary là gì?

**Dictionary** là một collection **có thứ tự tự do** (unordered) lưu dữ liệu theo cặp **key-value**. Ba điểm cốt lõi:

1. **Key phải là duy nhất** — mỗi key chỉ xuất hiện một lần.
2. **Key phải immutable** (bất biến) — có thể là chuỗi, số hoặc tuple, nhưng không thể thay đổi sau khi định nghĩa.
3. **Value có thể là bất kỳ kiểu gì** — số, chuỗi, list, thậm chí dictionary khác.

Giảng viên nhấn mạnh: cách lưu key-value này giống hệt cách các database NoSQL như **MongoDB**, **Cassandra** lưu dữ liệu, nên hiểu dictionary là nền tảng để sau này làm việc với chúng.

---

### ⚙️ Tạo và truy cập dictionary

Có hai cách tạo **dictionary rỗng**: dùng cặp ngoặc nhọn `{}` (khác list dùng `[]`, tuple dùng `()`), hoặc dùng class `dict()` được gọi như một hàm. Cả hai đều cho một dictionary rỗng.

Dictionary có dữ liệu được viết bằng cặp `key: value`, ví dụ một bản ghi sinh viên:

* `student = {"name": "Krish", "age": 32, "grade": 24}`

Vì key phải duy nhất, nếu các bạn khai báo `name` hai lần thì **giá trị sau ghi đè giá trị trước**, và dict chỉ giữ một key `name` với giá trị mới nhất — không báo lỗi, chỉ là key bị gộp lại.

Có hai cách **truy cập** phần tử:

1. Gọi thẳng theo key: `student["grade"]`, `student["age"]`.
2. Dùng method `get()`: `student.get("grade")`.

Điểm khác biệt nằm ở key không tồn tại: `student["last_name"]` sẽ báo lỗi, còn `student.get("last_name")` trả về `None`. Muốn có giá trị mặc định, truyền thêm tham số thứ hai: `student.get("last_name", "not available")` sẽ trả `"not available"` thay vì `None`.

---

### ✏️ Thêm, sửa, xóa và shallow copy

Dictionary là **mutable**, nên có thể thêm, cập nhật và xóa phần tử:

* **Sửa giá trị** — gán lại theo key, ví dụ `student["age"] = 33`.
* **Thêm key mới** — chỉ cần gán một key chưa tồn tại, ví dụ `student["address"] = "India"`.
* **Xóa** — dùng từ khóa `del`, ví dụ `del student["grade"]` để gỡ cả cặp key-value.

Ba method lấy dữ liệu rất hay dùng:

* `student.keys()` — lấy toàn bộ key.
* `student.values()` — lấy toàn bộ value.
* `student.items()` — lấy toàn bộ cặp key-value, trả về dạng list các tuple `(key, value)`.

Phần **shallow copy** là chỗ giảng viên dặn phải cực kỳ cẩn thận. Nếu làm `student_copy = student` rồi sửa `student["name"]`, thì `student_copy` **cũng bị đổi theo** — vì hai biến cùng trỏ tới một đối tượng. Muốn có bản sao độc lập, phải dùng `student.copy()`; hàm này cấp một vùng nhớ khác, nên sửa bản gốc sẽ **không** ảnh hưởng bản copy. Đây là lỗi nhỏ nhưng rất dễ gặp khi làm dự án.

---

### 🔁 Duyệt dictionary và nested dictionary

**Duyệt** dictionary bằng vòng lặp `for`:

* `for key in student.keys()` — lặp qua các key.
* `for value in student.values()` — lặp qua các value.
* `for key, value in student.items()` — lặp qua cặp key-value, thường in bằng **f-string** để hiển thị dạng `key: value`.

**Nested dictionary** là dictionary lồng trong dictionary — đúng kiểu "nhiều bản ghi" mà MongoDB lưu. Ví dụ:

* `students = {"student1": {"name": "Krish", "age": 32}, "student2": {"name": "Peter", "age": 35}}`

Muốn truy cập dữ liệu lồng nhau, chỉ cần nối các key: `students["student2"]["name"]` trả `"Peter"`, `students["student2"]["age"]` trả `35`.

Còn khi **duyệt** nested dictionary, mình dùng hai vòng lặp lồng nhau:

1. `for student_id, info in students.items()` — mỗi `info` là một dictionary con.
2. Bên trong, `for key, value in info.items()` — duyệt tiếp từng cặp key-value của bản ghi đó.

Giảng viên lưu ý có thể lồng bao nhiêu cấp tùy ý, chỉ cần gọi đúng tên key là lấy được value.

---

### 🧪 Dictionary comprehension và ví dụ thực tế

**Dictionary comprehension** giống list comprehension nhưng kết quả là cặp key-value trong ngoặc nhọn. Ví dụ bình phương các số:

* `{x: x**2 for x in range(5)}` cho `{0: 0, 1: 1, 2: 4, 3: 9, 4: 16}`.

Có thể thêm điều kiện, ví dụ chỉ lấy số chẵn:

* `{x: x**2 for x in range(10) if x % 2 == 0}` cho `{0: 0, 2: 4, 4: 16, 6: 36, 8: 64}`.

Hai ví dụ thực tế:

**1. Đếm tần suất phần tử trong list.** Cho `numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]`, mình tạo `frequency = {}` rồi duyệt:

* Nếu `number in frequency` thì `frequency[number] += 1` (tăng thêm 1).
* Ngược lại, gán `frequency[number] = 1` cho lần xuất hiện đầu tiên.

Kết quả: `1` xuất hiện 1 lần, `2` hai lần, `3` ba lần, `4` bốn lần. Đây là bài tập giảng viên để các bạn tự làm trước khi xem lời giải.

**2. Gộp hai dictionary.** Với `dict1 = {"a": 1, "b": 2}` và `dict2 = {"b": 3, "c": 4}`, mình gộp bằng cú pháp `{**dict1, **dict2}`. Hai dấu `**` nhận mọi cặp key-value (gọi là **keyword argument**) và trộn vào một dictionary mới. Giảng viên hẹn sẽ giải thích kỹ hơn về `*` và `**` khi học phần **function**.

Vậy là mình đã đi hết dictionary từ A đến Z: tạo, truy cập, sửa, xóa, method, duyệt, nested, comprehension và ứng dụng. Các bạn nhớ thực hành lại các ví dụ trong notebook nhé. Hẹn gặp ở bài tiếp theo!
