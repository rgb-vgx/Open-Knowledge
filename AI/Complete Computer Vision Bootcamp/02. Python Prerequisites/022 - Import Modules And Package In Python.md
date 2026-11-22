---
title: 'Bài 022 — Import Module và Package trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 22
status: edited
source: '022 - Import Modules And Package In Python.md'
categories:
- AI
tags: []

---

# 📦 Import Module và Package trong Python

> Nguồn: `022 - Import Modules And Package In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49086713)

Hôm nay mình và các bạn sẽ nói về **module** và **package** trong Python — thứ giúp chúng ta không phải viết lại mọi thứ từ đầu. Python là ngôn ngữ mã nguồn mở với rất nhiều package, bên trong mỗi package có sẵn vô số hàm dựng sẵn. Chỉ cần `import` đúng chỗ, các bạn dùng được ngay những hàm đó để viết code nhanh hơn rất nhiều.

---

### 📦 Module và package giúp gì?

Module và package sinh ra để **tổ chức và tái sử dụng code**. Thay vì tự viết từ con số 0, các bạn import một package có sẵn và gọi những hàm bên trong nó. Có rất nhiều module, và trong các bài sau mình sẽ dần dần giới thiệu thêm nhiều package khác nữa.

Có hai kiểu import mình sẽ đi qua:

1. Import **package/module dựng sẵn** như `math`, `numpy`.
2. Tự tạo **module/package của riêng mình** rồi import lại ở file khác.

---

### 🔤 Ba cách import cơ bản

Cách đầu tiên là `import` cả package rồi gọi hàm qua tên package:

* `import math` — `math` ở đây đóng vai trò như một package/module, bên trong có sẵn các hàm toán học.
* Gọi `math.sqrt(16)` sẽ cho ra `4`, tức căn bậc hai của 16.

Cách thứ hai là import trực tiếp từng hàm bằng `from ... import ...`:

* `from math import sqrt, pi` — chỉ lấy đúng hai thứ cần dùng.
* Sau đó gọi thẳng `sqrt(16)` → `4`, `sqrt(25)` → `5`, và `print(pi)` → khoảng `3.141`.

Cách thứ ba là import tất cả bằng dấu sao:

* `from math import *` — lấy toàn bộ hàm có trong `math`.
* Lúc này không cần viết `math.` nữa, gọi `sqrt(16)` là ra `4`, `pi` dùng được ngay.

Ngoài ra còn có **alias** (bí danh) với từ khóa `as`. Ví dụ `import numpy as np` nghĩa là từ giờ mình gọi `np.` thay vì phải viết đầy đủ `numpy.` mỗi lần — code gọn hơn mà vẫn rõ ràng.

---

### 🧮 Thực hành với `math` và cài `numpy`

Phần `math` mình vừa chạy ở trên là ví dụ cho package dựng sẵn. Còn `numpy` là một package tuyệt vời để làm việc với **array** (mảng); mình sẽ có bài riêng về numpy và pandas sau.

Điều thú vị là nếu các bạn gõ `import numpy as np` khi chưa cài, Python sẽ báo lỗi dạng **No module named 'numpy'**. Lý do: khi tạo môi trường ảo Python, chỉ một số module mặc định được cài, không phải tất cả.

Cách xử lý:

1. Thêm `numpy` vào file `requirements.txt` rồi lưu lại.
2. Mở terminal, vào đúng thư mục chứa file đó và chạy `pip install -r requirements.txt`.
3. Hoặc cài trực tiếp bằng `pip install numpy`.

Sau khi cài xong, package được cài vào môi trường ảo (virtual environment), và `import numpy as np` sẽ chạy thành công. Thử tạo một array bằng `np.array([1, 2, 3, 4])`, các bạn sẽ nhận lại một mảng gồm bốn phần tử.

---

### 🗂️ Tự tạo package đầu tiên với `__init__.py`

Đây là phần quan trọng nhất: làm sao tạo **package của riêng mình** để gọi ở file khác. Mình tạo một thư mục, ví dụ `packages`, và đây sẽ là package.

Bên trong thư mục đó, file bắt buộc phải có là `__init__.py`. Đây là **file đặc biệt** dùng để định nghĩa package và khởi tạo namespace. Nó có thể để trống, nhưng **phải tồn tại**, nếu không thư mục chỉ là thư mục thường chứ không thành package.

Tiếp theo mình tạo file `maths.py` trong package, định nghĩa:

* `addition(a, b)` trả về `a + b`.
* `subtraction(a, b)` trả về `a - b`.

Giờ có hai cách gọi trong notebook:

* `from package.maths import addition` rồi gọi `addition(2, 3)`.
* Hoặc `from package import maths` rồi gọi `maths.addition(2, 3)`.

Lưu ý: file gọi và package phải nằm **cùng một vị trí thư mục** thì mới import được.

---

### 🧩 Sub-package: package lồng trong package

Giảng viên còn đi thêm một bước: tạo **sub-package** (package con) bên trong package. Mình tạo thư mục `sub_packages` nằm trong `packages`, và **cũng phải có `__init__.py`** thì thư mục đó mới được nhận diện là package.

Trong sub-package, mình tạo file `mult.py` với hàm `multiply(a, b)` trả về `a * b`.

Cách import lúc này đi từng tầng một:

`from package.sub_packages.mult import multiply`

Đọc theo thứ tự: vào `package`, xuống `sub_packages`, mở `mult`, rồi lấy hàm `multiply`. Gọi `multiply(4, 5)` sẽ cho `20`.

Điểm mấu chốt: chỉ khi có `__init__.py` thì thư mục mới được coi là package, và các bạn mới import được như trên.

---

### ✅ Chạy thử từ file `.py` và tổng kết

Khi làm dự án thật, chúng ta thường gọi các module từ một file `.py` chứ không chỉ trong notebook. Mình tạo `test.py` cùng thư mục, viết `from package.maths import *`, rồi in kết quả:

* `addition(2, 3)` → `5`.
* `subtraction(4, 3)` → `1`.
* `multiply(4, 5)` → `20`.

Để chạy, phải **đứng trong đúng thư mục chứa file** rồi gõ `python test.py`. Nếu không ở đúng chỗ, import sẽ lỗi.

Tóm lại, bài này các bạn đã nắm hai việc: một là import **package dựng sẵn** (`math`, `numpy`) và cài thêm bằng `pip` khi thiếu; hai là tự tạo **package/module riêng** với `__init__.py`, kể cả sub-package lồng nhau. Hẹn các bạn ở bài tiếp theo, khi mình đi qua loạt thư viện chuẩn thường dùng trong Python.
