# 🛡️ Middleware "giữ cửa" khu member & lấy đủ plan ID, plan, user trước khi subscribe

> Nguồn: `074-Getting-the-plan-id-the-plan-and-the-user.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32293246)

Handler `SubscribeToPlan` sẽ chạy khi người dùng bấm nút chọn gói trên trang plans. Việc đầu tiên mình nghĩ tới là lấy ID của gói được chọn — nhưng nghĩ kỹ lại thì chưa phải, mình phải chắc chắn **người dùng đã đăng nhập** trước đã. Thay vì copy nguyên đoạn kiểm tra session từ handler `chooseSubscription` sang, lần này mình viết hẳn một **middleware (phần mềm trung gian)** để dùng lại cho bất kỳ route nào cần bảo vệ. Nghe "middleware" hơi to tát, nhưng thật ra nó rất, rất đơn giản.

### 🛡️ Vì sao mình "đẩy" việc kiểm tra đăng nhập vào middleware

Ở trang plans, mình đã check đăng nhập thủ công trong handler. Nếu làm y hệt cho handler subscribe thì đoạn code đó bị lặp lại hai lần — mà các bạn biết đấy, mình là người rất ngại lặp code.

Nên mình viết một hàm trong `middleware.go`: receiver là `app *Config`, nhận một tham số `next http.Handler` và trả về `http.Handler`. Bên trong, mình trả về một `http.HandlerFunc` để có quyền truy cập cả response writer lẫn request:

```go
func (app *Config) Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !app.Session.Exists(r.Context(), "userID") {
			app.Session.Put(r.Context(), "error", "Log in first!")
			http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
			return
		}
		next.ServeHTTP(w, r)
	})
}
```

Cách hoạt động chỉ có vậy:

1. Kiểm tra session có key `userID` hay không bằng `Exists`.
2. Nếu chưa có: đặt thông báo `"Log in first!"` vào session, redirect người dùng về trang login với `http.StatusTemporaryRedirect`, rồi `return` — dừng luôn.
3. Nếu có: gọi `next.ServeHTTP(w, r)` để request đi tiếp trong chuỗi xử lý.

### 🔁 Router riêng cho khu vực member

Có middleware rồi, mình vào `routes.go` viết thêm một hàm router nữa — hàm này trả về `http.Handler` và tự dựng một `chi.NewRouter()` riêng:

* Gắn middleware lên router bằng `mux.Use(app.Auth)`.
* Đặt hai route cần bảo vệ vào đây: trang plans và route subscribe.
* Mount router này vào đường dẫn `/members` (chỉ thành viên đã đăng nhập mới xem được).

Đường dẫn thay đổi kéo theo hai chỗ phải sửa:

* Link trong **nav partial** (`nav` trên thanh điều hướng): `/plans` → `/members/plans`.
* Đoạn JavaScript ở cuối `plans.page.gohtml`: `window.location.href` đổi từ `/subscribe` → `/members/subscribe`.

Và một hệ quả rất dễ chịu: trong handler `chooseSubscription`, mình **xóa luôn** đoạn kiểm tra đăng nhập — middleware lo hết rồi.

| Tiêu chí | Check trong từng handler | Middleware + router riêng |
|---|---|---|
| Số nơi phải viết | Mỗi handler một lần, dễ quên | Một lần duy nhất |
| Thêm trang mới cần bảo vệ | Phải nhớ thêm check | Chỉ cần đặt route vào router member |
| Đường dẫn | `/plans`, `/subscribe` | `/members/plans`, `/members/subscribe` |

### 📥 Lấy plan ID rồi lấy plan từ database

Giờ mới tới ba việc đầu tiên trong handler. Bước một: lấy ID của gói mà người dùng chọn — nó đến từ **query parameter** tên `id` (đúng cái mà JavaScript đính kèm vào URL lúc bấm nút):

```go
id := r.URL.Query().Get("id")
planID, _ := strconv.Atoi(id)
plan, err := app.Models.Plan.GetOne(planID)
```

Mình chuyển `id` từ chuỗi sang số bằng `strconv.Atoi` và… **bỏ qua error** — các bạn đừng bắt chước thói xấu này nhé, đáng lẽ phải kiểm tra. Có `planID` rồi, mình gọi `app.Models.Plan.GetOne` để lấy plan từ database.

Nếu có lỗi (ví dụ không tìm thấy gói), mình ghi log, đặt thông báo `"Unable to find plan."` và đưa người dùng quay lại `/members/plans`.

### 👤 Lấy user từ session

Bước hai và bước ba: lấy user ra khỏi session. Mình dùng `app.Session.Get` với context từ request, xin key `"user"`, rồi **cast** (ép kiểu) sang `data.User`:

```go
user, ok := app.Session.Get(r.Context(), "user").(data.User)
```

Nếu `ok` là `false` — tức không lấy được user — thì khả năng cao là người dùng chưa đăng nhập, nên mình ghi log, đặt thông báo `"Log in first!"` và đưa họ về trang login.

Vậy là sau bài này chúng ta đã có đủ **plan ID, plan và user**. *Lưu ý nhỏ: code lúc này chưa compile được đâu, vì mấy biến vừa lấy còn chưa được dùng — chuyện hoàn toàn bình thường, mình sẽ dùng chúng ngay ở bài sau.* Việc còn lại là sinh hóa đơn và gửi email.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao mình chuyển việc kiểm tra đăng nhập vào middleware thay vì viết trong từng handler?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để tránh lặp code và chỉ cần gắn một lần cho cả nhóm route cần bảo vệ.

Giải thích: Middleware được viết một lần rồi áp cho bất kỳ route nào muốn "khóa cửa".

Tham chiếu: Mục Vì sao mình "đẩy" việc kiểm tra đăng nhập vào middleware.

</details>

**Câu 2:** Middleware `Auth` kiểm tra gì và làm gì khi người dùng chưa đăng nhập?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Kiểm tra session có key `userID`; nếu không có thì đặt thông báo `"Log in first!"` vào session, redirect về `/login` bằng `http.StatusTemporaryRedirect` rồi dừng.

Giải thích: Khi đã đăng nhập, middleware gọi `next.ServeHTTP(w, r)` để request đi tiếp.

Tham chiếu: Mục Vì sao mình "đẩy" việc kiểm tra đăng nhập vào middleware.

</details>

**Câu 3:** Hai route được chuyển vào router member có đường dẫn mới là gì, và những chỗ nào cần sửa theo?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `/members/plans` và `/members/subscribe`; cần sửa link trong nav partial và đoạn JavaScript ở cuối `plans.page.gohtml`.

Giải thích: Router member được mount tại prefix `/members`, nên URL cũ bị đổi tiền tố.

Tham chiếu: Mục Router riêng cho khu vực member.

</details>

**Câu 4:** Handler lấy plan ID bằng cách nào và xử lý ra sao khi không tìm thấy plan?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Lấy query parameter `id` bằng `r.URL.Query().Get("id")`, chuyển sang số với `strconv.Atoi`, rồi gọi `app.Models.Plan.GetOne(planID)`. Nếu lỗi, báo `"Unable to find plan."` và quay về `/members/plans`.

Giải thích: Mình thừa nhận đã bỏ qua error của `strconv.Atoi` — điều không nên làm.

Tham chiếu: Mục Lấy plan ID rồi lấy plan từ database.

</details>

**Câu 5:** User được lấy từ đâu và ép sang kiểu gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Lấy từ session với key `"user"` bằng `app.Session.Get`, rồi ép sang `data.User`.

Giải thích: Nếu không lấy được (`ok == false`), mình báo `"Log in first!"` và đưa về trang login.

Tham chiếu: Mục Lấy user từ session.

</details>

Chúng ta đã bảo vệ được các trang member và chuẩn bị đủ dữ liệu cho handler subscribe. Việc tiếp theo — cũng là phần thú vị nhất — là cho goroutine sinh hóa đơn chạy nền và gửi email. Hẹn gặp lại các bạn ở bài tiếp theo! 🚀
