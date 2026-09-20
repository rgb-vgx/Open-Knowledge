# 🐹 Dựng khung web application cho dự án cuối khóa

> Nguồn: `043-Setting-up-a-simple-web-application.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32188432)

Hôm nay mình và các bạn chính thức gõ những dòng code đầu tiên cho dự án cuối khóa. Sẽ còn **vài bài nữa mới chạm tới concurrency**, vì trước hết chúng ta cần dựng xong khung web application. Mình hứa đi chậm rãi, từng bước một — các bạn cứ gõ theo là được.

### 🏗️ Tạo khung dự án và "vẽ trước" những việc cần làm

Mình mở một folder mới tên `final-project`, chạy `go mod init` và đặt tên module là `final-project`.

* Tạo folder `cmd` ở root — cách đặt tên rất phổ biến với dân Go.
* Trong `cmd`, tạo tiếp folder `web`.
* Trong `web`, tạo file `main.go` với `package main` và hàm `func main()`.
* Vì đây là web application, mình khai báo hằng số `webPort` bằng chuỗi `"80"` — ứng dụng sẽ lắng nghe ở cổng này.

Rồi trong `main()`, mình viết các comment "đánh dấu chỗ" cho những việc sắp tới:

* Kết nối tới **database**.
* Tạo các **channel** — chưa dùng ngay, nhưng sẽ là phần cốt lõi của concurrency sau này.
* Tạo **WaitGroup**.
* Set up **application config**.
* **Lắng nghe kết nối web**.
* Tạo **session** để quản lý đăng nhập.
* Set up **mail**.

Một chi tiết mình muốn làm rõ ngay: trang web này **render phía server**, không dùng React hay Vue gì cả. Vì mọi thứ được render ở server nên chúng ta **buộc phải quản lý session**.

Còn chuyện **WaitGroup**: vì ứng dụng sẽ gửi email **một cách đồng thời**, nên nếu chẳng may bạn phải restart ứng dụng để bảo trì, bạn **không muốn tắt phũ phàng** — bạn muốn đợi cho những email đang xếp hàng được gửi xong rồi hãy thoát. Đó là tình huống lý tưởng để dùng WaitGroup.

### 📦 Đi "chợ" package bằng `go get`

Mở terminal và chạy lần lượt:

```bash
go get github.com/jackc/pgconn
go get github.com/jackc/pgx/v4
go get github.com/alexedwards/scs/v2
go get github.com/alexedwards/scs/redisstore
go get github.com/go-chi/chi/v5
go get github.com/go-chi/chi/v5/middleware
```

Vài lưu ý từ mình:

* **Postgres driver:** có một driver Postgres khá phổ biến khác, nhưng ngay trang GitHub của nó đã khuyên bạn **đừng dùng nó mà hãy dùng `jackc/pgx`**. Vậy nên mình đi với `jackc/pgx`.
* **Phiên bản v4:** nếu lúc bạn học đã có `pgx` v5, cứ **cài v4**. Khi một dự án nhảy major version, thường là có **breaking changes** — dùng đúng v4 cho khóa học rồi nâng cấp sau sẽ dễ thở hơn nhiều.
* **Session manager:** mình chọn package của **Alex Edwards** — thứ chưa từng làm mình thất vọng. Tương tự, nếu có v3 thì cứ giữ v2 cho khóa này.
* **Router:** dân Go làm web hay dùng router bên thứ ba, và mình thích **chi**. Nhớ lấy kèm gói `/middleware` vì chúng ta sẽ dùng nó.

Cuối bài, mình thử thêm `github.com/jackc/pgx/v4/stdlib` cho chắc — hóa ra nó đã được cài sẵn, thành ra bước đó **hơi thừa một chút**, nhưng cũng chẳng hại gì.

### 🧠 Vì sao chọn những package này?

| Thành phần | Lựa chọn | Ghi chú |
|---|---|---|
| Driver database | `jackc/pgx/v4` | Chính driver Postgres phổ biến kia tự khuyên chuyển sang pgx; dùng v4 cho khóa học |
| Quản lý session | `alexedwards/scs/v2` | Chưa từng làm mình thất vọng; hỗ trợ nhiều nơi lưu session |
| Nơi lưu session | `scs/redisstore` + Redis | Redis là in-memory cache rất nhanh, dùng với session manager cực đơn giản |
| Router | `go-chi/chi/v5` | Kèm sẵn bộ middleware rất tiện |

Với session, điểm hay là `scs` cho phép **nhiều store khác nhau**: database, cookie... nhưng mình chọn **Redis** — nhanh, nhẹ, đúng bài.

Đến đây chúng ta đã có khung dự án và gần như đủ package cho một web application. Bài sau, mình dựng môi trường phát triển bằng **Docker** với Postgres, Redis và một mail server giả. Hẹn gặp lại các bạn! 🚀
