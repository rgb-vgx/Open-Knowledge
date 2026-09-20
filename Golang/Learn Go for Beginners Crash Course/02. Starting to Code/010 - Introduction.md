# 🐹 Bước vào phần "Starting to Code" — Học Go bài bản hơn qua hai dự án lớn

> Nguồn: `010-Introduction.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161748)

Chào các bạn! Ở phần trước, chúng ta vừa học vừa đủ để đưa chương trình Eliza chạy được, và đi qua một vài khái niệm quan trọng. Giờ là lúc "chậm lại một nhịp" để đi sâu hơn vào ngôn ngữ Go — học cách xây dựng và tổ chức một chương trình Go cho tử tế.

Đừng lo nếu các bạn chưa nắm hết mọi thứ ở phần trước; trong phần này mình sẽ giải thích kỹ càng từng bước.

---

### 📦 Đào sâu hơn về biến

Việc đầu tiên chúng ta làm là dành thêm thời gian cho **biến (variables)**. Lần trước các bạn mới chỉ gặp kiểu `string` và học vài cách khai báo biến, còn lần này sẽ là:

* **Variable scope (phạm vi của biến)** — biến được nhìn thấy và sử dụng ở đâu trong chương trình.
* **Các kiểu dữ liệu có sẵn (built-in types)** của Go.
* Cách **chọn đúng kiểu biến** cho từng tình huống cụ thể.
* Cách **tự định nghĩa kiểu dữ liệu (define our own types)** — một khái niệm quan trọng mà mình sẽ dành thời gian riêng.

---

### ⌨️ Nhập liệu từ người dùng và hiển thị kết quả

Chúng ta đã chạm vào việc **nhận input từ người dùng** trong chương trình Eliza, nhưng mới ở mức "chạy được" chứ chưa hiểu cơ chế. Lần này mình sẽ mổ xẻ kỹ hơn cách mọi thứ vận hành.

Bên cạnh đó, các bạn sẽ học những cách **hiển thị kết quả tinh tế hơn** với package `strings`, và dành thời gian cho việc **định dạng (formatting)** để mọi thứ trông thật đẹp mắt với người dùng. Với một **console application (ứng dụng dòng lệnh)**, đây là những kỹ năng quan trọng đấy.

---

### 🧩 Hai dự án sẽ đồng hành cùng các bạn

Xuyên suốt phần còn lại của khóa học, chúng ta sẽ liên tục cải tiến hai chương trình để xem mọi thứ ăn khớp với nhau thế nào:

* **Eliza** — chương trình các bạn đã gặp ở phần trước.
* **Hammurabi** — một dạng "tiền thân" của các game **Sim City** nổi tiếng.

Chúng ta sẽ vừa làm vừa nâng cấp chúng, dùng chúng làm ví dụ sống động cho các khái niệm mới.

---

### 🔍 Vì sao học qua ứng dụng hoàn chỉnh?

Khi tìm tài liệu trên mạng, các bạn thường gặp những đoạn code nhỏ, nằm tách biệt khỏi ngữ cảnh — đủ để có cảm giác về cách mọi thứ hoạt động, nhưng không hơn.

Ngược lại, khi các bạn làm việc với một ứng dụng hoàn chỉnh, hoặc tự tay xây một cái (điều chúng ta cũng sẽ làm), mọi thứ trở nên **dễ hiểu hơn hẳn**. Đó chính là cách chúng ta sẽ học trong phần này.

---

Thế là đủ phần giới thiệu rồi. Đừng lo nếu có thuật ngữ nào nghe mới lạ — *mình sẽ đi sâu ở các bài sau*. Giờ thì mở Visual Studio Code lên và chúng ta bắt đầu gõ code thôi! 🚀
