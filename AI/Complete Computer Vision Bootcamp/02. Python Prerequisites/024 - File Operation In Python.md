---
title: 'Bài 024 — Thao tác với File trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 24
status: edited
source: '024 - File Operation In Python.md'
categories:
- AI
tags: []

---

# 🗂️ Thao tác với File trong Python

> Nguồn: `024 - File Operation In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086739)

Bài này mình sẽ cùng các bạn thao tác file bằng Python: tạo file, ghi nội dung, đọc lại, làm việc với cả **text file** lẫn **binary file**. Tất cả đều xoay quanh hàm `open()` cùng các mode khác nhau — nắm được mode nào làm gì là các bạn làm chủ phần này.

---

### 📂 `open()` và các mode

Hàm `open(path, mode)` nhận hai tham số: tên file và mode. Các mode mình dùng trong bài:

* `"r"` — chỉ đọc (read).
* `"w"` — chỉ ghi (write).
* `"a"` — nối thêm vào cuối file (append).
* `"w+"` — vừa đọc vừa ghi.
* `"rb"` / `"wb"` — đọc/ghi ở dạng **binary** (byte).

Mình thường dùng kèm `with open(...) as file:` để file tự đóng sau khi dùng xong, khỏi phải gọi `close()` thủ công.

---

### 📖 Đọc toàn bộ file và đọc từng dòng

Đầu tiên là đọc cả file. Mình viết `with open("example.txt", "r") as file:` rồi `content = file.read()` — `read()` trả về toàn bộ nội dung file.

Nhưng lúc này file `example.txt` chưa tồn tại, nên chạy sẽ gặp lỗi **No such file or directory: 'example.txt'**. Đây là lỗi quen thuộc khi đọc một file chưa có; mình tạo file `example.txt` với vài dòng văn bản rồi chạy lại, thế là đọc được toàn bộ nội dung. Lưu ý: mở ở mode `"r"` thì **không ghi được**.

Muốn đọc **từng dòng**, mình lặp qua file vì file là một iterable:

`for line in file: print(line)`

Kết quả in ra có kèm ký tự xuống dòng nên trông như có khoảng trắng thừa. Muốn bỏ ký tự đó, gọi `line.strip()`. Vậy `strip()` dùng để **loại bỏ khoảng trắng ở hai đầu**, bao gồm cả ký tự newline (và tab, dấu cách).

---

### ✍️ Ghi file: `"w"` ghi đè, `"a"` nối thêm, `writelines`

Mở file ở mode `"w"` và gọi `file.write("Hello world\n")` sẽ ghi nội dung mới. Nhưng cẩn thận: mode `"w"` coi như file **rỗng hoàn toàn** và **ghi đè** toàn bộ nội dung cũ. Mình chạy thử và thấy đúng là nội dung cũ bị xoá sạch — đây là điều không nên làm tuỳ tiện.

Muốn ghi mà **không ghi đè**, dùng mode `"a"` (append). Mở file ở mode này rồi `file.write("Append operation taking place")`, nội dung sẽ được nối vào cuối file cũ. Muốn xuống dòng thì thêm `\n` vào chuỗi trước khi ghi.

Còn khi có **nhiều dòng** cần ghi, dùng `file.writelines(lines)` với `lines` là một list. Ví dụ list gồm ba chuỗi `"This is my first line\n"`, `"second line\n"`, `"third line\n"`; mở file ở mode `"a"` rồi gọi `writelines(lines)`, cả ba dòng được nối vào file.

---

### 🔢 File nhị phân với `"rb"` / `"wb"`

Binary file thường có đuôi `.bin`. Với file nhị phân, dữ liệu là **byte**, nên mode cũng đổi theo: `"wb"` để ghi byte, `"rb"` để đọc byte.

Mình mở `with open("example.bin", "wb") as file:` rồi ghi dữ liệu; sau đó đọc lại bằng `"rb"` và `file.read()`, kết quả hiển thị dưới dạng byte/hex. Đó chính là nội dung mình đã ghi, chỉ là được nhìn ở mức byte.

---

### 🔁 Copy file và bài tập đếm dòng, từ, ký tự

Một thao tác thực tế: đọc nội dung từ **source file** rồi ghi sang **destination file**. Mình đọc `example.txt` lấy `content`, rồi mở `destination.txt` ở mode ghi và `write(content)`. Chạy xong, `destination.txt` tự được tạo ra với nội dung y hệt file nguồn.

Giảng viên còn giao một bài tập quan trọng: **đọc một text file và đếm số dòng, số từ, số ký tự**. Các bạn thử tự làm trước, đại ý là đọc các dòng, rồi cộng dồn lại để ra ba con số. Đây là bài luyện tốt để quen với việc đọc file.

---

### 🎯 Mode `"w+"` và `seek(0)`

Mode `"w+"` mở file cho **cả đọc lẫn ghi**: nếu file chưa tồn tại thì tạo mới, nếu đã tồn tại thì **cắt nội dung cũ** (ghi đè).

Điểm cần nhớ nằm ở con trỏ file (file cursor). Sau khi `file.write(...)` vài dòng, con trỏ đang ở **cuối file**. Nếu gọi `file.read()` ngay, các bạn sẽ **không đọc được gì**, vì con trỏ đã ở cuối.

Cách xử lý là `file.seek(0)` — đưa con trỏ về **đầu file** (vị trí 0). Sau đó `file.read()` mới trả về đầy đủ nội dung vừa ghi. Vì vậy, mỗi khi vừa ghi vừa đọc, hãy nhớ `seek(0)` trước khi đọc.

Bài này khá nhiều thứ, nhưng gói lại chỉ mấy ý: `open()` với mode `"r"`, `"w"`, `"a"`, `"w+"`, `"rb"`, `"wb"`; đọc bằng `read()` hoặc lặp từng dòng với `strip()`; ghi bằng `write()` và `writelines()`; và nhớ `seek(0)` khi cần đọc lại sau khi ghi. Nắm chắc mấy điều này, các bạn đã sẵn sàng cho những bài thao tác dữ liệu phức tạp hơn ở các section sau.
