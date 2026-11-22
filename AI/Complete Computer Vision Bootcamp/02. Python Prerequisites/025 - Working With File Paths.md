---
title: 'Bài 25 — Làm việc với đường dẫn file trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 25
status: edited
source: '025 - Working With File Paths.md'
categories:
- AI
tags: []

---

# 📁 Làm việc với đường dẫn file bằng module `os`

> Nguồn: `025 - Working With File Paths.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086753)

Sau khi đã đọc/ghi file, bước tiếp theo là quản lý thư mục và đường dẫn — thứ mà dự án thực tế nào cũng cần. Trong bài này mình đi qua các thao tác quen thuộc nhất của module **`os`**: tạo thư mục, liệt kê nội dung, ghép đường dẫn, kiểm tra tồn tại và phân biệt đường dẫn tương đối với tuyệt đối.

### 🗂️ Tạo thư mục mới với `os.mkdir`

Mình bắt đầu bằng việc import `os` rồi tạo một thư mục mới ngay trong thư mục đang làm việc:

```python
import os

new_directory = "package"
os.mkdir(new_directory)
print(f"Directory {new_directory} created")
```

Chạy xong, thư mục `package` xuất hiện ngay trong thư mục hiện tại và câu thông báo in ra: **"Directory package created"**. Đây là cách nhanh nhất để tạo một thư mục bằng code.

### 📋 Liệt kê file và thư mục bằng `os.listdir`

Muốn biết trong thư mục hiện tại có những gì, mình dùng:

```python
import os

items = os.listdir(".")
print(items)
```

Dấu `.` nghĩa là đang trỏ vào **thư mục làm việc hiện tại**. Kết quả trả về gồm cả file lẫn thư mục — ví dụ `example.txt`, `destination.txt`, thư mục `bin`, `package`… Thao tác này rất hữu ích khi dự án cần đọc toàn bộ file trong một thư mục để xử lý hàng loạt.

### 🔗 Ghép đường dẫn với `os.path.join`

Đây là tính năng quan trọng nhất của `os`, vì cách viết đường dẫn trên **Windows** và **Linux/Mac** khác nhau — hard-code dấu phân cách sẽ hỏng khi đổi hệ điều hành. `os.path.join` lo phần đó:

```python
import os

directory_name = "folder"
file_name = "file.txt"

full_path = os.path.join(directory_name, file_name)
print(full_path)
```

Kết quả là đường dẫn `folder/file.txt`. Nếu muốn thấy cả vị trí thư mục hiện tại, mình ghép thêm `os.getcwd()`:

```python
import os

full_path = os.path.join(os.getcwd(), directory_name, file_name)
print(full_path)
```

`os.getcwd()` trả về **current working directory**. Còn nếu chỉ cần đường dẫn tương đối thì dùng hai biến ban đầu là đủ.

### ✅ Kiểm tra tồn tại, là file hay là thư mục

Trước khi mở file, nên kiểm tra xem nó có thật không. `os.path.exists` làm việc này:

```python
import os

path = "example1.txt"

if os.path.exists(path):
    print(f"The path {path} exists")
else:
    print(f"The path {path} does not exist")
```

Nếu file chưa có, mình có thể tạo mới bằng `open` (như các bài trước). Kiểu kiểm tra này rất quan trọng mỗi khi code đưa ra giả định về một đường dẫn.

Ngoài ra còn hai hàm phân biệt loại đối tượng:

```python
import os

path = "example.txt"

if os.path.isfile(path):
    print("This path is a file")
elif os.path.isdir(path):
    print("This path is a directory")
else:
    print("This path is neither a file nor a directory")
```

Với `example.txt` đang tồn tại, kết quả là **"This path is a file"**.

### 🧭 Relative path và absolute path

* **Relative path**: đường dẫn tính từ vị trí hiện tại, ví dụ file `file.txt` nằm trong thư mục `folder`.
* **Absolute path**: đường dẫn đầy đủ từ gốc hệ thống.

Muốn lấy đường dẫn tuyệt đối từ một đường dẫn tương đối, dùng `os.path.abspath`:

```python
import os

relative_path = "folder/file.txt"
absolute_path = os.path.abspath(relative_path)
print(absolute_path)
```

Cách khác là tự ghép bằng `os.path.join` với tên thư mục, nhưng theo giảng viên thì `abspath` gọn và tiện hơn.

---

Các thao tác trên là phần lõi khi làm việc với file trong dự án end-to-end: đọc hàng loạt file, duyệt thư mục, dựng đường dẫn an toàn đa nền tảng. Các bạn nên tự tạo thư mục, liệt kê, ghép và kiểm tra đường dẫn vài lần cho quen tay — bài sau mình chuyển sang xử lý lỗi với **exception handling**.
