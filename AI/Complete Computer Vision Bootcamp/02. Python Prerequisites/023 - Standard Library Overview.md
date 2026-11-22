---
title: 'Bài 023 — Tổng quan Standard Library trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 23
status: edited
source: '023 - Standard Library Overview.md'
categories:
- AI
tags: []

---

# 🧰 Tổng quan Standard Library trong Python

> Nguồn: `023 - Standard Library Overview.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086727)

Python có rất nhiều thư viện và package mã nguồn mở để các bạn dùng ngay khi làm dự án. Bài này mình sẽ điểm qua một loạt **standard library** (thư viện chuẩn) hay gặp nhất, từ mảng, số ngẫu nhiên, thao tác file/thư mục, JSON, CSV cho tới thời gian và biểu thức chính quy. Không thể kể hết — có tới hơn 300 nghìn thư viện — nhưng nắm được vài cái nền tảng là đủ để bắt đầu. Standard library là những thư viện đi kèm Python, hoàn toàn mã nguồn mở, dùng được luôn khi code; mỗi thư viện lo một nhóm việc riêng. Mình sẽ đi lần lượt từng cái kèm ví dụ nhỏ.

---

### 📊 `array` và ôn lại `math`

Bắt đầu với `array` — thư viện giúp tạo mảng. Cú pháp là `array.array(typecode, initializer)`, gồm hai tham số:

* Tham số đầu là **typecode** — ví dụ `"i"` nghĩa là kiểu integer (số nguyên).
* Tham số sau là **initializer** — danh sách giá trị ban đầu.

Ví dụ `array.array("i", [1, 2, 3, 4])` trả về một mảng mới gồm các số nguyên bị giới hạn theo typecode đã chọn.

Sau đó mình ôn lại `math` đã gặp ở bài trước: `math.sqrt(16)` cho căn bậc hai, `math.pi` cho giá trị pi. Không có gì mới, chỉ để các bạn thấy các thư viện chuẩn dùng chung một kiểu import.

---

### 🎲 `random`: số ngẫu nhiên và chọn phần tử

`random` là thư viện dùng rất thường xuyên. Sau `import random`, có hai hàm mình hay dùng:

* `random.randint(1, 10)` — trả về **một** số nguyên ngẫu nhiên trong khoảng từ 1 đến 10.
* `random.choice(["apple", "banana", "cherry"])` — chọn ngẫu nhiên **một** phần tử từ collection.

Điểm cần nhớ: chạy lại có thể ra kết quả khác, vì nó chọn ngẫu nhiên chứ không cố định.

---

### 🗂️ `os` và `shutil`: làm việc với file, thư mục

`os` dùng cho **truy cập file và thư mục**. Sau `import os`:

* `os.getcwd()` — in ra thư mục làm việc hiện tại (current working directory). Ví dụ nó cho biết các bạn đang đứng trong thư mục `5th_module`.
* `os.mkdir("test_dir")` — tạo một thư mục mới tên `test_dir`; chạy xong sẽ thấy thư mục xuất hiện.

Giảng viên để lại một bài tập nhỏ: tự tìm hàm dùng để **tạo file** trong `os` rồi thử làm.

Còn `shutil` dùng cho các thao tác mức cao trên file và tập hợp file. Sau `import shutil`, gọi `shutil.copyfile("source.txt", "destination.txt")` sẽ copy nội dung từ `source.txt` sang `destination.txt`. Mình tạo sẵn `source.txt` với vài dòng văn bản, chạy lệnh và thấy `destination.txt` được tạo ra với nội dung y hệt. Nhớ là phải đứng đúng thư mục làm việc.

---

### 🔄 `json`: serialize và deserialize dữ liệu

Chuyển dữ liệu kiểu dictionary thành **JSON** là việc rất hay gặp, nhất là khi làm việc với API hoặc cơ sở dữ liệu NoSQL — phản hồi trả về thường ở dạng JSON.

Mình có dictionary `{"name": "Krish", "age": 25}`. Sau `import json`:

* `json.dumps(data)` chuyển dictionary thành **chuỗi JSON**. Kiểm tra `type()` sẽ thấy kết quả là `str`.
* `json.loads(json_str)` chuyển ngược chuỗi JSON về lại **dictionary**. Lúc này `type()` là `dict`.

Quy trình thực tế: nhận JSON dạng chuỗi từ API, dùng `json.loads` để biến thành dictionary rồi xử lý tiếp. Đây chính là **serialize** và **deserialize**, và các bạn sẽ dùng rất nhiều về sau.

---

### 📄 `csv`, `datetime`, `time` và `re`

Bốn thư viện còn lại, mỗi cái một việc:

**CSV** — làm việc với file `.csv`. Sau `import csv`, mở file ở chế độ ghi `with open("example.csv", "w")`, rồi:

* `writer = csv.writer(file)` tạo đối tượng ghi.
* `writer.writerow(["Name", "Age"])` ghi dòng tiêu đề.
* `writer.writerow(["Krish", 32])` ghi dòng dữ liệu.

Muốn đọc lại, mở file ở chế độ `"r"`, tạo `reader = csv.reader(file)` và lặp `for row in reader: print(row)`. File CSV tạo ra mở được bằng Excel.

**datetime** — xử lý ngày giờ. `from datetime import datetime, timedelta`, sau đó `datetime.now()` cho thời điểm hiện tại. Muốn lùi một ngày, dùng `now - timedelta(days=1)`; in ra sẽ thấy cùng giờ nhưng của ngày hôm trước.

**time** — đo thời gian và tạm dừng chương trình. `time.time()` lấy mốc thời gian, `time.sleep(2)` cho chương trình ngủ 2 giây; gọi `time.time()` lần nữa sẽ thấy khoảng cách đúng bằng 2 giây.

**re** (regular expression) — khớp mẫu trong chuỗi. Đặt `pattern = r"\d+"` (`\d` là chữ số, `+` là một hoặc nhiều), cho `text = "There are 123 apples"`, rồi `re.search(pattern, text)`. Kết quả `match.group()` sẽ là `"123"`. Nếu phía sau còn dãy số khác như `1456`, nó dừng ở chỗ khớp đầu tiên — tức `123`.

---

### ✅ Tổng kết

Vậy là mình đã đi qua `array`, `math`, `random`, `os`, `shutil`, `json`, `csv`, `datetime`, `time` và `re` — mỗi thư viện một ví dụ nhỏ, đủ để các bạn hình dung cách dùng. Standard library không có giới hạn; điều quan trọng là cứ thực hành theo từng tình huống cụ thể. Bài sau mình sẽ đào sâu vào **thao tác file** — đọc, ghi, và cả file nhị phân.
