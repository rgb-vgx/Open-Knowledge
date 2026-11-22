---
title: 'Bài 010 — Câu lệnh điều kiện if, elif, else trong Python'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 10
status: edited
source: '010 - Conditional Statements(if,elif,else).md'
categories:
- AI
tags: []

---

# 🚦 Câu lệnh điều kiện if, elif, else trong Python

> Nguồn: `010 - Conditional Statements(if,elif,else).md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49084913)

Chào các bạn! Chúng ta đã đi qua biến, kiểu dữ liệu và toán tử. Giờ bước sang một chủ đề mới của **control flow**: **câu lệnh điều kiện**. Bài này tập trung vào `if`, `elif`, `else`, cách lồng chúng, cùng vài ví dụ thực tế như kiểm tra năm nhuận hay tính giá vé. Vòng lặp sẽ để bài khác.

### ✅ `if`: điều kiện đúng thì chạy

Câu `if` đánh giá một điều kiện; nếu điều kiện **đúng**, khối code bên trong được thực thi. Khối đó được xác định bằng **thụt lề** (indentation).

Ví dụ của giảng viên: gán `age = 20`, rồi viết `if age >= 18:` và in ra dòng "You are allowed to vote in the elections". Vì `20 >= 18` là `True`, chương trình in đúng câu đó.

Muốn kiểm tra điều kiện, các bạn có thể chạy riêng biểu thức `age >= 18` trong cell mới và thấy `True`. Khi điều kiện sai, Python bỏ qua toàn bộ khối bên trong — không có gì được in.

---

### 🔀 `else`: nhánh dự phòng

`else` chạy khối code của nó khi điều kiện trong `if` là **sai**. Nói cách khác, nếu `if` không thỏa thì chương trình nhảy xuống `else`.

Giảng viên đổi sang `age = 16`. Với `if age >= 18:` in "You are eligible for voting", lần chạy này **không in gì**, vì điều kiện sai và chưa có nhánh dự phòng.

Thêm `else:` và in "You are a minor". Bây giờ chạy lại, chương trình in ra "You are a minor". Đây là hành vi mặc định: không điều kiện nào thỏa thì rơi vào `else` ở cuối.

---

### 🪜 `elif`: kiểm tra nhiều mức

`elif` là viết tắt của **else if**, cho phép kiểm tra **nhiều điều kiện** nối tiếp nhau. Python xét từ trên xuống, gặp điều kiện đúng đầu tiên thì chạy khối đó rồi dừng.

Ví dụ phân loại tuổi với `age = 20`:

1. `if age < 13:` in "You are a child".
2. `elif age < 18:` in "You are a teenager".
3. `else:` in "You are an adult".

Với `20`, hai điều kiện đầu sai nên rơi vào `else` và in "You are an adult". Đổi `age = 17`: điều kiện đầu sai, điều kiện `17 < 18` đúng nên in "You are a teenager".

Điểm cần nhớ: thứ tự các nhánh rất quan trọng, vì nhánh đúng đầu tiên sẽ "chặn" các nhánh phía sau.

---

### 🧩 Câu lệnh điều kiện lồng nhau

Các bạn có thể đặt một (hoặc nhiều) câu `if`/`elif`/`else` **bên trong** một câu `if`/`elif`/`else` khác — gọi là **nested conditional statement**.

Bài toán ví dụ: nhập một số, cho biết số đó **dương hay không dương**, và nếu dương thì **chẵn hay lẻ**. Giảng viên dùng `int(input("Enter the number"))` để lấy số.

Cấu trúc:

* `if number > 0:` in "The number is positive". Bên trong nhánh này, kiểm tra tiếp `number % 2 == 0`: đúng thì in "The number is even", ngược lại `else` in "The number is odd".
* `else:` của khối ngoài in "The number is zero or negative".

Chạy thử ba lần:

* Nhập `12` → "The number is positive" và "The number is even".
* Nhập `11` → "The number is positive" nhưng "The number is odd".
* Nhập `-1` → rơi vào nhánh ngoài, in "The number is zero or negative".

Đây chính là ý tưởng của lồng điều kiện: mỗi tầng thu hẹp thêm phạm vi trước khi kiểm tra tầng tiếp theo.

---

### 📅 Thực hành: kiểm tra năm nhuận

Bài tập thực tế đầu tiên: xác định một năm có phải **năm nhuận** hay không, dùng điều kiện lồng nhau. Giảng viên nhắc quy tắc: năm chia hết cho `4` (dư `0`) là ứng viên năm nhuận.

Chương trình nhập năm bằng `input`, rồi kiểm tra theo các tầng:

1. Nếu `year % 4 == 0`, đi tiếp; ngược lại in "not a leap year".
2. Bên trong, nếu `year % 100 == 0`, đi tiếp; ngược lại vẫn là năm nhuận.
3. Bên trong nữa, nếu `year % 400 == 0` thì in "is a leap year"; ngược lại in "not a leap year".

Chạy thử: nhập `2022` → "2022 is not a leap year"; nhập `2024` → "2024 is a leap year". Các bạn nên tự gõ lại trước khi xem lời giải — giảng viên khuyến khích đúng tinh thần đó.

---

### 🧪 Bài tập và lỗi thường gặp

Hai assignment giảng viên để lại:

* **Máy tính đơn giản**: nhập hai số bằng `float(input(...))`, nhập phép toán (`+`, `-`, `*`, `/`, `%`), dùng `if`/`elif` để chọn phép tính. Cần xử lý trường hợp chia cho `0`. Buổi demo nhập `12` và `24` với phép `+`, kết quả là `36.0`.
* **Giá vé theo tuổi**: nhập tuổi và trả lời có phải student hay không. Theo lời giảng: dưới `5` tuổi miễn phí; dưới `12` tuổi giá `$10`; dưới `17` tuổi, nếu là student giá `$12`, ngược lại `$15`.

Về lỗi, giảng viên nhấn mạnh hai điều: **thiếu dấu hai chấm `:`** sau `if`/`elif`/`else`, và **thụt lề không đúng**. Chỉ cần thụt lề chuẩn, khối điều kiện sẽ chạy gọn gàng.

Hẹn gặp các bạn ở bài tiếp theo, khi chương trình không chỉ rẽ nhánh một lần mà còn biết lặp lại công việc.

> ⚠️ Cần kiểm chứng: đoạn giá vé trong transcript không đọc rõ mức giá của từng nhánh (phần "else if $15" bị caption cắt cụt); bài ghi lại theo cách hiểu sát lời giảng nhất, các bạn đối chiếu code mẫu của khóa.
