# 🧩 Challenge: In ra thứ tự các triết gia kết thúc bữa ăn

> Nguồn: `029-Challenge-Printing-out-the-order-in-which-the-meal-is-finish.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/33849952)

Lần này mình có một challenge nhỏ cho các bạn. *Không khó lắm đâu, và nếu có khó thì cũng chẳng sao — mình sẽ giải ở bài sau.*

### 🖥️ Hiện trạng chương trình

Chạy chương trình hiện tại, các bạn sẽ thấy đủ thứ thông tin được in ra và mọi thứ trông đúng như thiết kế:

* Ngay phần đầu, cả năm triết gia đều đã ngồi vào bàn — đúng vị trí quy định, còn **thứ tự ngồi** thì tùy **Go scheduler** quyết định lịch chạy cho từng goroutine.
* Sau đó là các thông báo trong bữa ăn: lấy nĩa, ăn, suy nghĩ, đặt nĩa xuống...
* Cuối cùng mọi người ăn xong, rời bàn và chương trình kết thúc.

Thứ còn thiếu nằm ở phần cuối: thứ tự kết thúc của từng người.

### 🎯 Đề bài

Yêu cầu của mình: in ra **thứ tự các triết gia kết thúc bữa ăn (diner)**, đặt ngay **trước hoặc ngay sau** dòng "The table is empty" ở cuối chương trình.

Ví dụ trong một lần chạy, mình quan sát được thứ tự kết thúc như sau:

**Locke → Pascal → Socrates → Aristotle → Plato**

Nhưng đừng kỳ vọng lần chạy sau sẽ giống hệt — **thứ tự này sẽ khác nhau mỗi lần chạy**, hoặc ít nhất là có tiềm năng khác nhau, vì ai xong trước phụ thuộc hoàn toàn vào việc **Go scheduler** lập lịch cho các goroutine chạy theo trình tự nào.

### 🧠 Hai gợi ý từ mình

1. Để làm được, các bạn sẽ cần **khoá (lock) một thứ gì đó** ở một điểm nào đó trong chương trình.
2. Và tất nhiên, cần **in thêm một thông báo cuối cùng** để trả về kết quả.

### 💪 Đến lượt các bạn

Hãy thử sức, sửa code và chạy xem kết quả in ra có đúng thứ tự các triết gia rời bàn không. Chạy vài lần liên tiếp để thấy thứ tự thay đổi cũng là một phần thú vị của bài toán này.

*Đừng lo nếu bạn thấy bí — chuyện rất bình thường, và mình sẽ chỉ cách mình giải trong bài giảng kế tiếp.* Chúc các bạn gõ code vui vẻ, hẹn gặp lại ở bài... lời giải! 🚀
