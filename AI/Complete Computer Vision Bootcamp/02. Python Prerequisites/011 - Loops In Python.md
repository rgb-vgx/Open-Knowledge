---
title: 'Bài 011 — Vòng lặp trong Python: for, while và điều khiển luồng'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 11
status: edited
source: '011 - Loops In Python.md'
categories:
- AI
tags: []

---

# 🔁 Vòng lặp trong Python: for, while và điều khiển luồng

> Nguồn: `011 - Loops In Python.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084917)

Chào các bạn! Bài trước mình đã nói nhiều về `if`, `else` và các câu lệnh điều kiện. Hôm nay chúng ta sang **vòng lặp (loop)** — thứ giúp một khối code chạy đi chạy lại nhiều lần. Mình sẽ đi qua `for`, `while`, ba câu lệnh điều khiển `break` / `continue` / `pass`, vòng lặp lồng nhau, rồi làm vài bài tập thực hành và chỉ ra lỗi hay gặp.

### 🔁 for loop và hàm range

**for loop** dùng để lặp qua một chuỗi số hoặc một collection. Cú pháp cơ bản là `for i in range(5)`, trong đó `i` chỉ là biến tạm đại diện cho từng phần tử.

Hàm `range(5)` sinh ra các số từ **0 đến 4**. Điểm quan trọng: **số cuối không được tính**. Vì vậy khi chạy `for i in range(5)` rồi in `i`, các bạn thấy `0, 1, 2, 3, 4` — đúng **5 phần tử** nhưng dừng trước 5. Lý do nằm ở chỗ Python đánh index từ 0.

`range` nhận ba tham số theo thứ tự: **start**, **stop**, **step**.

* `range(1, 6)` cho các số từ 1 đến 5, vì 6 bị loại.
* Step mặc định là **1**, nên `range(1, 10)` in ra 1 đến 9.
* Đổi step thành **2** với `range(1, 10, 2)`, các bạn được `1, 3, 5, 7, 9` — nó nhảy hai bước một, bỏ qua các số ở giữa.
* Step âm để đếm ngược: `range(10, 1, -1)` đi từ 10 xuống, dừng trước 1; đổi thành `-2` thì bước nhảy lớn hơn, bỏ qua nhiều số hơn.

Mình nhấn mạnh lại quy tắc "bỏ số cuối" vì nó áp dụng cho mọi biến thể của `range`, kể cả khi step âm.

---

### 📝 Duyệt chuỗi ký tự

`for` không chỉ dành cho số. Một **string** thực chất là collection các ký tự, nên có thể duyệt từng ký tự bằng `for i in chuoi` rồi in `i`. Ví dụ với chuỗi tên "Krish Nayak", vòng lặp lần lượt in ra từng chữ cái, gồm cả dấu cách.

Điều này đúng với cả một câu hay một đoạn văn: các bạn có thể duyệt qua toàn bộ nội dung. Đây chính là điểm mạnh chung của `for` — hễ có một collection (list, dictionary, range, string...) thì `for` duyệt qua rất gọn.

---

### 🔄 while loop

**while loop** chạy liên tục **chừng nào điều kiện còn đúng**. Khác với `for` duyệt một tập hợp có sẵn, `while` phù hợp khi số lần lặp phụ thuộc vào trạng thái.

Ví dụ kinh điển: khởi tạo `count = 0`, rồi `while count < 5` thì in `count` và tăng `count` lên 1. Kết quả là `0, 1, 2, 3, 4`. Khi `count` chạm 5, điều kiện `5 < 5` sai, vòng lặp dừng.

Cái bẫy lớn nhất là **quên tăng biến đếm**. Mình thử `count = 0` rồi `while count % 2 == 0` và chỉ in `count` — vì `0 % 2 == 0` luôn đúng, số 0 được in mãi không dừng, phải can thiệp để ngắt. Thêm dòng `count = count + 1` vào thì vòng lặp chỉ in đúng **một lần**, vì lần sau `count` đã là 1 và điều kiện sai ngay. Đây là lỗi **vòng lặp vô hạn (infinite loop)** mà các bạn sẽ gặp rất nhiều khi mới học.

---

### 🛑 break, continue và pass

Ba câu lệnh điều khiển luồng này cho các bạn kiểm soát vòng lặp ở mức chi tiết hơn.

1. **`break`** thoát khỏi vòng lặp **ngay lập tức**. Ví dụ `for i in range(10)`, nếu `i == 5` thì `break` — vòng lặp không chạy tiếp, thoát hẳn ra ngoài.
2. **`continue`** **bỏ qua lần lặp hiện tại** và nhảy sang lần kế tiếp. Với `for i in range(10)`, nếu `i % 2 == 0` thì `continue`, các số chẵn bị bỏ qua và chỉ còn `1, 3, 5, 7, 9` được in. Lưu ý `continue` nhảy thẳng sang vòng sau, **không chạm tới câu lệnh in** phía dưới.
3. **`pass`** là **null operation** — không làm gì cả. Ví dụ `for i in range(5)`, nếu `i == 3` thì `pass`, rồi vẫn in `i`; mọi số vẫn hiện ra bình thường vì `pass` không thay đổi gì.

`pass` hữu ích khi các bạn cần một khối lệnh hợp lệ nhưng chưa muốn viết gì, chẳng hạn định nghĩa một **hàm rỗng** với `pass` bên trong để hàm không làm gì. Ba câu lệnh này sẽ còn quay lại nhiều lần trong các ví dụ sau.

---

### 🔂 Vòng lặp lồng nhau

**Nested loop** là vòng lặp đặt bên trong vòng lặp khác. Mình lấy `for i in range(3)` bọc ngoài và `for j in range(2)` bọc trong, rồi in bằng **f-string**: `f"i = {i}, j = {j}"`. Các biến được đặt trong cặp ngoặc nhọn `{}` — đó là cách f-string chèn giá trị vào chuỗi.

Cách chạy rất trực quan: với mỗi giá trị của `i`, vòng trong chạy hết một lượt. Kết quả lần lượt là `i = 0, j = 0`; `i = 0, j = 1`; rồi `i = 1, j = 0`; `i = 1, j = 1`; cuối cùng `i = 2, j = 0`; `i = 2, j = 1`. Vòng trong chạy 2 lần cho mỗi một giá trị của vòng ngoài, nên tổng cộng 6 dòng.

---

### 🧪 Bài tập: tổng n số tự nhiên và số nguyên tố

Bài đầu tiên: **tính tổng n số tự nhiên đầu tiên**, làm bằng cả `while` và `for`.

* Cách `while`: đặt `n = 10`, `sum = 0`, `count = 1`; chừng nào `count <= n` thì cộng `count` vào `sum` và tăng `count`. Kết quả **55**, đúng bằng 1 + 2 + ... + 10.
* Cách `for`: chỉ cần `for i in range(11)` rồi cộng dồn `sum = sum + i`, không phải tự tăng biến đếm vì `range` lo việc đó. Kết quả cũng là **55**.

Bài thứ hai: **in các số nguyên tố từ 1 đến 100**. Số nguyên tố chỉ chia hết cho 1 và chính nó. Mình duyệt `num` trong `range(1, 101)`; nếu `num > 1` thì lặp `i` trong `range(2, num)`, và nếu `num % i == 0` thì `break` vì đó không phải số nguyên tố. Nhánh `else` gắn với `for` sẽ chạy khi vòng lặp kết thúc mà **không gặp `break`** — lúc đó in `num`. Kết quả ra 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...

Điểm thú vị là Python cho phép gắn `else` vào `for`, dùng để chạy một khối khi vòng lặp "đi hết" mà không bị ngắt giữa chừng.

---

Vậy là các bạn đã nắm được **for**, **while**, bộ ba **break / continue / pass** và cách lồng vòng lặp. Loops rất mạnh: hiểu chúng cùng các câu lệnh điều khiển luồng là xử lý được rất nhiều bài toán một cách gọn gàng. Mình hẹn gặp các bạn ở bài sau, nơi chúng ta bắt đầu bước vào **data structures** với list — và sẽ có thêm nhiều ví dụ thực hành hơn nữa.
