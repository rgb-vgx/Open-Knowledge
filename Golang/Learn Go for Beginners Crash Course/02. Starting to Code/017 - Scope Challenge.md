# 🏋️ Scope Challenge: Bài tập nhỏ để hiểu sâu phạm vi biến

> Nguồn: `017-Scope-Challenge.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161786)

Đã đến lúc cho một thử thách mới, lần này xoay quanh **scope** của cả biến lẫn hàm. Đề bài chỉ gồm vài dòng khai báo và một lời gọi hàm, nhưng sẽ giúp các bạn "khắc" kiến thức của bài trước vào trí nhớ.

### 🧹 Dọn sạch dự án để bắt đầu

Mình vẫn đang mở project `scope` từ bài trước, và mình dọn nó về trạng thái trống:

1. Xóa toàn bộ nội dung trong hàm `main`.
2. Xóa luôn hàm `myFunc`.
3. Xóa biến đã khai báo ở cấp package — nghĩa là chương trình cũng không còn import nào cả.
4. File `package.go` vẫn giữ lại, nhưng nội dung cũng được xóa sạch.

Vậy là chúng ta bắt đầu với một chương trình hoàn toàn trống.

---

### 📋 Đề bài của bạn

Trong file `main.go`, mình viết các yêu cầu dưới dạng comment, và việc của các bạn là biến chúng thành code:

1. Khai báo một **biến package level** cho package `main`, tên là `myVar`.
2. Khai báo một **biến block level** trong hàm `main`, tên là `blockVar`.
3. Khai báo một **biến package level** trong package `packageOne`, tên là `PackageVar`.
4. Tạo một **exported function** trong package `packageOne`, tên là `PrintMe`.
5. Trong hàm `main`, in giá trị của `myVar`, `blockVar` và `packageVar` **trên cùng một dòng**, sử dụng hàm `PrintMe` trong `packageOne`.

Nếu ghép lại, đề bài chỉ có vậy: đặt đúng loại biến ở đúng nơi, và để hàm đúng chỗ "nói chuyện" với chúng.

---

### 💪 Vài lời trước khi các bạn bắt tay

Các bạn hãy **dành thời gian làm thử trước khi xem bài giải** của mình ở bài sau. Đừng bỏ qua bước này nhé.

Lý do rất đơn giản: **bạn học lập trình bằng cách viết chương trình**, chứ không phải bằng cách xem người khác viết. Mọi kiến thức cần thiết cho đề bài này các bạn đều đã có trong tay; nếu cần, chỉ cần xem lại một hai video trước đó là đủ.

*Mình không nói đề bài này khó đâu, chỉ là hãy thử sức một chút.* Hẹn gặp các bạn ở bài giải! 🚀
