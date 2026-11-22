---
title: 'Bài 018 — Thực hành Functions qua loạt ví dụ thực tế'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 18
status: edited
source: '018 - More Coding Examples With Functions.md'
categories:
- AI
tags: []

---

# 🧪 Thực hành Functions qua loạt ví dụ thực tế

> Nguồn: `018 - More Coding Examples With Functions.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084983)

Chào các bạn! Lý thuyết function ở bài trước sẽ chỉ thực sự "ngấm" khi các bạn viết code. Vì vậy hôm nay mình cùng làm một loạt ví dụ thực tế: chuyển đổi nhiệt độ, kiểm tra độ mạnh mật khẩu, tính tiền giỏ hàng, kiểm tra palindrome, giai thừa bằng đệ quy, và đếm tần suất từ trong file. Mỗi ví dụ đều dùng lại kiến thức đã học — `if/elif`, vòng lặp, dictionary, list, chuỗi — nên vừa ôn vừa luyện.

### 🌡️ Ví dụ 1: Chuyển đổi nhiệt độ C ↔ F

Hàm `convert_temperature(temperature, unit)` nhận nhiệt độ và đơn vị muốn chuyển.

* Nếu `unit == "C"`: chuyển từ **Celsius sang Fahrenheit** bằng `temperature * (9/5) + 32`.
* Nếu `unit == "F"`: chuyển từ **Fahrenheit sang Celsius** bằng `(temperature - 32) * (5/9)`.
* Nếu không truyền đơn vị hợp lệ: `return None`.

Gọi `convert_temperature(25, "C")` cho ra 77 độ F, còn `convert_temperature(77, "F")` trả về 25 độ C. Các công thức này đúng như khi tra Google, và ví dụ này cho thấy cách kết hợp `if/elif` với `return` trong một hàm.

---

### 🔐 Ví dụ 2: Kiểm tra độ mạnh mật khẩu

Hàm `is_strong_password(password)` trả về `True`/`False`. Mình đặt lần lượt các tiêu chí, sai cái nào là `return False` ngay:

1. Độ dài phải **tối thiểu 8 ký tự** — `len(password) < 8` thì trả `False`.
2. Phải có **ít nhất một chữ số** — dùng `any(char.isdigit() for char in password)`; nếu không có thì `False`.
3. Phải có **ít nhất một chữ thường** — `any(char.islower() for char in password)`.
4. Phải có **ít nhất một chữ hoa** — `any(char.isupper() for char in password)`.
5. Phải có **ít nhất một ký tự đặc biệt**.

Nếu vượt qua hết thì `return True`. Ví dụ mật khẩu toàn chữ hoa/thường xen kẽ nhưng thiếu số và ký tự đặc biệt sẽ bị trả `False`; còn mật khẩu có đủ số, chữ hoa và ký tự đặc biệt như dấu `!` sẽ trả `True`. Chỉ với một function là đã có một bộ validate gọn gàng.

---

### 🛒 Ví dụ 3: Tính tổng tiền giỏ hàng

Hàm `calculate_total_cost(cart)` nhận một **list các dictionary**, mỗi item có `name`, `price`, `quantity`.

* Khởi tạo `total_cost = 0`.
* Duyệt `for item in cart`, cộng dồn `item["price"] * item["quantity"]` vào `total_cost`.
* Cuối cùng `return total_cost`.

Dữ liệu mẫu trong video gồm apple, banana, orange với giá và số lượng khác nhau; tổng in ra là **5.889**. Đây là ví dụ rất "đời": đọc dữ liệu từ cấu trúc lồng nhau và tính toán — đúng kiểu xử lý dữ liệu thực tế.

---

### 🪞 Ví dụ 4: Kiểm tra palindrome

**Palindrome** là chuỗi đọc xuôi hay ngược đều giống nhau. Hàm `is_palindrome(s)` làm rất gọn:

* Chuẩn hóa chuỗi: `s.lower()` để không phân biệt hoa thường, rồi `.replace(" ", "")` để bỏ khoảng trắng.
* So sánh chuỗi đã chuẩn hóa với bản đảo ngược `s[::-1]`.
* Nếu bằng nhau → `True`, ngược lại → `False`.

Thử với câu "a man a plan a canal panama" cho `True`, còn "hello" cho `False`. Chỉ nhờ thao tác slicing chuỗi đã học mà bài toán gọn bất ngờ.

---

### 🔄 Ví dụ 5: Giai thừa bằng đệ quy

**Đệ quy** là khi một function **tự gọi lại chính nó**. Giai thừa của `n` là `n * (n-1) * ... * 1`.

Hàm `factorial(n)`:

* Điều kiện dừng: nếu `n == 0` thì `return 1`.
* Ngược lại: `return n * factorial(n - 1)`.

Với `n = 5`, hàm lần lượt gọi `factorial(4)`, `factorial(3)`... cho tới `factorial(0)` trả `1`, rồi nhân ngược trở lên. Cứ thế function tự gọi mình cho đến khi chạm điều kiện dừng — đó chính là bản chất của đệ quy.

---

### 📄 Ví dụ 6: Đếm tần suất từ trong file

Hàm `count_word_frequency(file_path)` đọc file và đếm số lần xuất hiện của từng từ:

* Tạo dictionary rỗng `word_count = {}`.
* Mở file bằng `with open(file_path, "r") as file` — chế độ `"r"` là đọc.
* Với mỗi `line`, tách thành các từ bằng `line.split()`, rồi duyệt từng `word`: chuẩn hóa `.lower()` và `.strip()` để bỏ ký tự thừa.
* Cập nhật đếm bằng `word_count.get(word, 0) + 1` (dùng `get` như đã học ở bài dictionary).

Lúc đầu mình lỡ để sai thứ tự vòng lặp nên gặp lỗi *"cannot access local variable 'word'"*; sửa lại đúng thứ tự là chạy ngon. Bài học quen thuộc: **indentation và thứ tự vòng lặp** là chỗ dễ sai nhất.

Qua sáu ví dụ, các bạn đã thấy function len lỏi khắp nơi: từ toán học (nhiệt độ, giai thừa), xử lý chuỗi (palindrome, mật khẩu), tới xử lý dữ liệu (giỏ hàng, đọc file). Điểm chung là **logic rõ ràng, tái sử dụng được**.

Bài tập cuối: viết hàm **validate địa chỉ email** bằng **regular expression**. Mình đã đưa sẵn code mẫu trong video — các bạn cứ chạy thử với email hợp lệ và không hợp lệ để thấy kết quả `True`/`False`. Regular expression sẽ được nói kỹ hơn ở các bài sau. Hẹn gặp các bạn ở bài tiếp theo!
