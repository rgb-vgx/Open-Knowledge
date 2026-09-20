# 📝 Handler `postRegisterPage`: tạo user, ký URL, gửi email kích hoạt

> Nguồn: `067-Starting-on-the-handler-to-create-a-user.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32252810)

Hôm nay chúng ta viết handler `postRegisterPage` — hàm được gọi khi ai đó điền form đăng ký và bấm nút Register. Đây là bài khá dài, nhưng mạch đi rất rõ: **đọc form → tạo user → dựng và ký URL → gửi email → chuyển hướng**. Các bạn cứ thong thả, mình đi từng bước một.

### 🧾 Bắt đầu: đọc dữ liệu form POST

Vì đang xử lý một form POST, việc đầu tiên trong Go là gọi `r.ParseForm()` để đọc dữ liệu form, rồi kiểm tra lỗi:

```go
err := r.ParseForm()
if err != nil {
    app.errorLog.Println(err)
}
```

*Lỗi ở bước này gần như không bao giờ xảy ra* — mình log ra cho chắc, rồi đi tiếp. Trong file handler có sẵn vài comment khung; mình thêm một comment `TODO validate data` cho phần **kiểm tra dữ liệu**: thông thường bạn sẽ muốn chắc chắn user chưa đăng ký, đã điền đủ các thứ cần thiết... Một phần việc này đã được xử lý bằng **validate phía client bằng JavaScript**, và mình sẽ **bỏ qua bước validate** trong khóa học này — vì đây đâu phải khóa dạy xây dựng web app.

---

### 👤 Tạo user ở trạng thái inactive

Tiếp theo, mình tạo một biến kiểu `data.User` và điền các field mình biết. Vì đã gọi `ParseForm`, dữ liệu lấy ra qua `r.Form.Get` với đúng tên field trong form:

```go
u := data.User{
    Email:     r.Form.Get("email"),
    FirstName: r.Form.Get("first-name"),
    LastName:  r.Form.Get("last-name"),
    Password:  r.Form.Get("password"),
    Active:    0,
    IsAdmin:   0,
}
```

Hai field cuối nghe có vẻ thừa, vì `Active` và `IsAdmin` mặc định đã là `0`. Nhưng mình vẫn viết ra **cho rõ ý**: đây là user **không phải admin** và **chưa được kích hoạt**. Sau đó mình insert user vào database:

```go
_, err = app.models.User.Insert(u)
```

Mình bỏ qua ID trả về và chỉ quan tâm lỗi. Nếu có lỗi, mình đặt thông báo vào session với key `error` (để nó hiện lên trang), rồi **redirect về trang register** với `http.StatusSeeOther` và `return`. Không xong thì không đi tiếp.

---

### 🔗 Dựng URL kích hoạt và ký nó

Đây là phần cần đến hai thứ mình chuẩn bị ở bài trước: **template email** và **code signer**. Mình dựng URL bằng `fmt.Sprintf`:

```go
url := fmt.Sprintf("https://localhost/activate?email=%s", u.Email)
signedURL := GenerateTokenFromString(url)
app.infoLog.Println(signedURL)
```

Vài chi tiết đáng chú ý:

* URL được **hard-code** là `https://localhost`; nếu bạn chạy port khác thì nhớ thêm port vào. Trong thực tế, bạn sẽ đọc giá trị này từ **biến môi trường** hoặc file `.env`.
* Đường dẫn `/activate` **chưa tồn tại** — nhưng nó sẽ có trước khi bài này kết thúc.
* Mình quên import package `fmt` nên IDE nhắc ngay; thêm vào là xong. *Chuyện nhỏ mà, ai cũng từng gặp.*
* `GenerateTokenFromString` gọi vào code trong `signer.go`, **nối thêm một hash vào cuối URL**. Nhờ nhìn vào hash đó, chúng ta xác định được URL này có phải do mình tạo ra hay không — đây chính là thứ chống sửa đổi URL.
* Mình log signed URL ra console để **mắt thường cũng nhìn thấy** phần hash được nối vào.

---

### ✉️ Soạn email và gửi trong nền

Giờ là lúc tạo message và gửi. Mình chỉ quan tâm mấy field sau:

```go
msg := Message{
    To:       u.Email,
    Subject:  "Activate your account",
    Template: "confirmation-email",
    Data:     template.HTML(signedURL),
}
app.sendMail(msg)
```

* `Template` là **template tùy chỉnh** — đúng cặp `confirmation-email` mình tạo ở bài trước.
* `Data` có kiểu `any` nên chứa gì cũng được. Mình biết ít nhất bản HTML sẽ cần URL này, nên **cast sang `template.HTML`** để Go template hiểu đây là HTML hợp lệ và render đúng.
* `app.sendMail` là **hàm helper** từ section Sending Email Concurrently: nó tự tăng `WaitGroup` rồi đẩy message vào channel để việc gửi email diễn ra **trong nền**. Người dùng không phải ngồi chờ kết nối tới mail server.

Gửi xong, mình đặt flash message kiểu *"confirmation email sent. Check your email"*, rồi redirect người dùng sang trang **login** với `http.StatusSeeOther`. Còn comment bị viết sai chính tả "subscribe" trong handler — chuyện subscribe chưa xảy ra ở bước đăng ký, nên mình tạm dời nó xuống dưới để dùng sau.

---

### 🧪 Thử nghiệm với MailHog

Mình chạy `make restart` (Docker images vẫn đang chạy) rồi quay lại trình duyệt, đăng ký một tài khoản `me@here.com` với mật khẩu `test`, tên "Me Here". Kết quả:

1. Trang hiện flash message xác nhận đã gửi email.
2. Trong console của Visual Studio Code, **signed URL** xuất hiện: phần từ `https://` tới `me@here.com` là do mình chỉ định, phần còn lại là hash do signer package nối thêm.
3. Mở **MailHog** và refresh — email *"Activate your account"* đã nằm đó.

Các bạn có thể bấm vào link nếu muốn, nhưng hiện tại **chưa có route hay handler nào xử lý nó** — đó chính là nội dung của bài tiếp theo.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao việc đầu tiên trong handler POST là gọi `r.ParseForm()`?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để đọc được dữ liệu form qua `r.Form.Get(...)`.

Giải thích: Không parse form thì không lấy được email, tên, mật khẩu người dùng nhập.

Tham chiếu: Mục Bắt đầu: đọc dữ liệu form POST.

</details>

**Câu 2:** Vì sao user mới được tạo với `Active = 0` và `IsAdmin = 0` dù đó là giá trị mặc định?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để thể hiện rõ ý định: user chưa được kích hoạt và không phải admin.

Giải thích: Cả hai field mặc định đã là 0, nhưng viết ra cho code dễ đọc.

Tham chiếu: Mục Tạo user ở trạng thái inactive.

</details>

**Câu 3:** Vì sao phải cast signed URL sang `template.HTML` khi truyền vào message?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì field `Data` có kiểu `any`, và email ít nhất có một bản HTML cần render URL đúng cách.

Giải thích: Cast giúp Go template biết nội dung là HTML an toàn, không bị escape sai.

Tham chiếu: Mục Soạn email và gửi trong nền.

</details>

**Câu 4:** `app.sendMail` khác gì so với gửi email trực tiếp trong handler?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nó tự tăng `WaitGroup` và đẩy message vào channel để gửi email trong nền.

Giải thích: Nhờ vậy người dùng không phải chờ kết nối tới mail server.

Tham chiếu: Mục Soạn email và gửi trong nền.

</details>

**Câu 5:** Sau khi gửi email thành công, handler chuyển hướng đi đâu và vì sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Redirect sang trang login kèm flash message.

Giải thích: Sau một form POST thành công nên redirect để tránh người dùng submit lại form; đồng thời báo cho họ kiểm tra email.

Tham chiếu: Mục Soạn email và gửi trong nền.

</details>

Vậy là user đã nằm trong database ở trạng thái chờ kích hoạt, và email cũng đã lên đường. Trong bài tiếp theo, chúng ta viết handler `activateAccount` để link trong email thực sự hoạt động. Hẹn gặp lại các bạn! 🚀
