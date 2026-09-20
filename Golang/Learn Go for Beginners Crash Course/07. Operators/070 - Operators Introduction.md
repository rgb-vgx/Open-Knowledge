# 🧮 Mở màn chương Operators — khi lập trình bắt đầu "làm toán"

> Nguồn: `070-Introduction.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162290)

Chào các bạn, chúng ta đang tiến bộ rất đều trên hành trình Go. Hôm nay mình mở đầu chương **Operators (toán tử)** — nơi chúng ta sẽ tìm hiểu cách Go xử lý các phép tính và thứ tự thực hiện của chúng. Nếu có những thứ bây giờ đã "sáng" hơn hồi đầu khóa, thì đó chính là điều mình mong đợi.

---

### 🎉 Nhìn lại chặng đường: các bạn đã đọc được code thật rồi

Đây là một cột mốc nhỏ đáng mừng:

* Các bạn đã có thể mở dự án **Hammer Bitcoin** và đọc hiểu phần lớn đoạn code trong đó — điều mà khi mới bắt đầu khóa học, chưa chắc các bạn đã làm được.
* Riêng **Eliza** thì có thể vẫn còn khó một chút, vì Eliza xử lý rất nhiều thứ liên quan tới **chuỗi (strings)**. Chúng ta sẽ bàn kỹ về chuỗi ở chương kế tiếp, nên các bạn cứ yên tâm.

Nói cách khác, nền tảng các bạn đang xây rất chắc — và nó đang bắt đầu "trả lãi".

---

### ➗ Chương này làm toán — nhưng đừng lo

Đúng vậy, lần này chúng ta sẽ dành thời gian **làm một chút toán**. Nhưng nghe mình nói đã:

* Đây **không nhất thiết** là kiểu toán các bạn từng học ở trung học phổ thông.
* Chúng ta sẽ **không** làm đại số tuyến tính (linear algebra), cũng không giải phương trình bậc hai (quadratic equations).

Việc duy nhất cần làm là hiểu **cách toán hoạt động trong Go**: chúng ta chỉ cần biết dùng syntax nào để "nhờ" máy tính thực hiện một phép toán cho mình.

---

### 🧩 Toán tử và precedence — hai thứ đi cùng nhau

Các bạn đã từng chạm vào một vài toán tử rồi, ví dụ dấu **cộng `+`** hoặc **`++`**. Nhưng Go còn cả một danh sách các toán tử mà các bạn cần biết, và chúng ta sẽ đi qua lần lượt trong chương này.

Đi kèm với đó là **precedence (thứ tự ưu tiên)** — bộ quy tắc quyết định biểu thức được tính theo thứ tự nào. Hai thứ này luôn đi cùng nhau:

* Biết **toán tử** để viết đúng câu lệnh,
* hiểu **precedence** để đoán đúng kết quả.

Đây là kiến thức nền cực kỳ quan trọng, và cũng là thứ giúp các bạn đọc code của người khác dễ dàng hơn hẳn.

*Đừng lo nếu các bạn chưa hình dung hết ngay bây giờ* — mình sẽ đi từng bước, từ đơn giản đến phức tạp. Chúng ta bắt đầu thôi! 🚀
