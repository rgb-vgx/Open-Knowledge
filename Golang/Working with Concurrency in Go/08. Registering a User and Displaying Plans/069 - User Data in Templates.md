# 🙋 Đưa dữ liệu user vào mọi template: mở khóa cho trang Plans

> Nguồn: `069-Giving-user-data-to-our-templates.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32269302)

Chúng ta đã đăng ký được user, kích hoạt được tài khoản — bước tiếp theo là cho user **chọn một trong ba gói** của website giả định: **Bronze, Silver hoặc Gold**. Nhưng trước khi hiển thị trang Plans, mình cần trả một "món nợ" nhỏ đã ghi lại từ lâu trong code.

### 🧩 Nhớ lại "món nợ" trong defaultData

Hồi trước, khi viết hàm `defaultData` trong `render.go`, mình để lại comment **`TODO get more user information`**. Lý do: khi user đăng nhập, chúng ta đã lưu thông tin của họ vào session — giờ là lúc **lấy ra và đưa cho template**, nhưng chỉ khi user đã xác thực.

Vậy mình xóa comment đó và thay bằng một đoạn check đơn giản.

---

### 🔍 Lấy user ra khỏi session

Mình viết một dòng "hai trong một": lấy dữ liệu và kiểm tra luôn có lấy được hay không:

```go
user, ok := app.session.Get(r.Context(), "user").(data.User)
```

* `app.session.Get` đọc giá trị với key `user` từ session, dùng context lấy từ request.
* Kết quả được **cast sang `data.User`** — và nhớ kỹ: cast sang `data.User`, **không phải con trỏ** `*data.User`.
* Biến `ok` sẽ là `true` nếu lấy được, `false` nếu không.

Nếu `!ok`, mình ghi một dòng vào **info logger**: *"can't get the user from session"*. Đây thuần túy là thông tin nội bộ — *không ai nhìn thấy dòng này trên website đâu, các bạn cứ yên tâm.*

---

### 📤 Gắn user vào default data

Ở nhánh ngược lại — tức là lấy được user — mình cuộn lên đầu file và **bỏ comment dòng thêm user vào dữ liệu** mà mọi template đều nhận. Sau đó, ở chỗ xử lý phía dưới, mình gán:

```go
td.User = &user
```

Lưu ý nhỏ nhưng quan trọng: `td.User` **phải là con trỏ**. Mình không thể đặt nguyên object user vào đó, mà phải truyền **tham chiếu tới user**. Kết quả: mọi trang mà user đã đăng nhập ghé thăm đều có quyền truy cập **toàn bộ thông tin trong kiểu dữ liệu user** — họ tên, email, và cả gói đăng ký nếu có.

Vậy là dữ liệu đã "chảy" tới template. Giờ chúng ta có thể bắt tay vào hiển thị danh sách các gói mà user có thể subscribe ngay sau khi đăng ký xong. Hẹn gặp lại các bạn ở bài tiếp theo! 🚀
