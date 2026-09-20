# 🧪 Nối route `/plans` và thử nghiệm: link navbar & trạng thái Current plan

> Nguồn: `071-Adding-a-route-and-trying-things-out-for-the-Plans-page.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32280840)

Bài này là "ngày hội thử nghiệm" của trang Plans: nối route, thử bấm nút, thêm link lên navbar, và làm logic hiển thị gói hiện tại. Nhưng trước hết, mình cần sửa **hai lỗi nhỏ** còn sót lại từ bài trước — *chuyện thường ngày ở huyện, các bạn đừng lo.*

### 🔧 Sửa hai lỗi nhỏ từ bài trước

1. Trong dòng chuyển hướng của hàm `selectPlan`, mình **thiếu dấu `=` trong query string**. Không có nó thì đoạn `?id=` không thành tham số hợp lệ, và handler sẽ không đọc được ID gói.
2. Trong template, câu lệnh range đang là `.Data.plan` nhưng key mình đặt trong handler là **`plans`** (số nhiều). Sửa lại cho khớp là xong.

---

### 🛣️ Thêm route `/plans` và chạy thử

Trong `routes.go`, mình thêm một dòng:

```go
mux.Get("/plans", app.chooseSubscription)
```

Rồi chạy `make start` (Docker images vẫn đang chạy nên database sẵn sàng). Mở trình duyệt vào `localhost` — các trang vẫn hoạt động bình thường. Vì chưa có link nào trỏ tới trang Plans, mình gõ thẳng `/plans` trên thanh địa chỉ:

* Đang đăng nhập → **trang Plans hiện ra** với bảng ba gói.
* Bấm thử nút Select của gói **Bronze** → dialog xác nhận hiện lên xinh xắn; bấm Cancel → quay lại trang.
* Đăng xuất rồi vào lại `/plans` → **warning hiện ra và bị chuyển hướng về trang login** đúng như thiết kế.

Mọi thứ chạy tốt. Giờ mình thêm đường dẫn chính thức cho trang.

---

### 🔗 Thêm link Plans lên navbar

Mở `nav.partial.gohtml` — thanh điều hướng trên cùng. Mình **nhân bản một dòng link có sẵn** và đổi thành Plans. Link này nằm trong nhánh dành cho user đã xác thực, nên **chỉ hiện với người đã đăng nhập**. Trong website thật, dĩ nhiên bạn sẽ có một trang plans công khai cho mọi người — *nhưng mục tiêu của mình là nhanh chóng tới phần viết logic concurrency*, nên cứ đơn giản vậy đã.

Mình đăng nhập lại bằng `admin@example.com` / `verysecret`, refresh trang và link Plans xuất hiện, bấm vào hoạt động ngay.

---

### 🏷️ Hiển thị "Current plan" cho gói đang dùng

Một chi tiết nhỏ nhưng đáng làm: khi user **đã mua một gói**, cạnh gói đó không nên hiện nút Select nữa mà nên là dòng *"Current plan"*. Nhớ lại bài trước: mình đã đưa thông tin user vào **mọi template được render**, nên việc này khá dễ.

Trong `plans.page.gohtml`, ngay sau dòng mở block `{{ define "content" }}`, mình tạo một biến cho gọn:

```html
{{ $user := .User }}
```

Sau đó, tại vị trí hiển thị nút Select, mình rẽ nhánh — nếu **user đã có plan** và **ID gói đó trùng với gói đang xét**:

```html
{{ if and $user.Plan (eq $user.Plan.ID .ID) }}
    <strong>Current plan</strong>
{{ else }}
    ...nút Select như cũ...
{{ end }}
```

---

### 🐝 Gán gói bằng Beekeeper Studio và bài học về session

Để thử nghiệm, mình mở **Beekeeper Studio**, kết nối tới database `concurrency`, xem bảng `users` để lấy ID (user số 1), rồi vào bảng `user_plans` **thêm thủ công một dòng**: `user_id` là 1, `plan_id` là 1 (gói Bronze), kèm ngày tạo `2022-05-17`. Apply là xong — user đã có gói.

Quay lại website refresh trang Plans thì... **lỗi!** Thông báo đại loại *"nil pointer evaluating \*data.Plan.ID"*. À, mình đã kiểm tra `$user.Plan.ID` trong khi **`$user.Plan` đang là `nil`** — con trỏ chưa trỏ tới đâu cả. Sửa lại bằng cách thêm điều kiện **`$user.Plan` khác nil** vào trước, đúng như đoạn code ở trên.

Refresh lần nữa — trang chạy, nhưng vẫn hiện nút Select thay vì "Current plan". Lý do rất đáng nhớ: **dữ liệu user trên trang này đến từ session**, và session được ghi lúc mình đăng nhập — thời điểm đó user chưa có gói. Cách xử lý: **đăng xuất rồi đăng nhập lại** bằng `admin@example.com` / `verysecret`, vào Plans — và lần này dòng **Current plan** hiện ra chính xác.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Hai lỗi nhỏ được sửa ở đầu bài là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Thiếu dấu `=` trong query string `?id=` của dòng chuyển hướng, và range sai key `plan` thay vì `plans`.

Giải thích: Sai key thì template không tìm thấy dữ liệu; thiếu `=` thì handler không đọc được tham số.

Tham chiếu: Mục Sửa hai lỗi nhỏ từ bài trước.

</details>

**Câu 2:** Vì sao điều kiện hiển thị "Current plan" cần kiểm tra `$user.Plan` trước?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì user mới đăng ký chưa có plan, `$user.Plan` là nil — truy cập `.ID` trên nil sẽ gây lỗi nil pointer.

Giải thích: Thêm `and $user.Plan` vào điều kiện để tránh lỗi này.

Tham chiếu: Mục Gán gói bằng Beekeeper Studio và bài học về session.

</details>

**Câu 3:** Vì sao vào `/plans` khi chưa đăng nhập lại bị chuyển hướng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì handler kiểm tra session `userID`, đặt warning và redirect về trang login.

Giải thích: Đây là logic bảo vệ đã viết trong `chooseSubscription`.

Tham chiếu: Mục Thêm route /plans và chạy thử.

</details>

**Câu 4:** Vì sao sau khi thêm dòng vào `user_plans`, trang vẫn hiện nút Select?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì dữ liệu user lấy từ session được ghi lúc đăng nhập — khi đó user chưa có gói.

Giải thích: Đăng xuất rồi đăng nhập lại thì trang hiển thị đúng "Current plan".

Tham chiếu: Mục Gán gói bằng Beekeeper Studio và bài học về session.

</details>

**Câu 5:** Link Plans trên navbar hiển thị khi nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ với user đã đăng nhập, vì nó nằm trong nhánh dành cho người đã xác thực của nav partial.

Giải thích: Trong website thật sẽ có trang plans công khai, nhưng ở đây mình ưu tiên đi nhanh tới phần concurrency.

Tham chiếu: Mục Thêm link Plans lên navbar.

</details>

Vậy là trang Plans đã hoàn chỉnh. Bài tiếp theo, chúng ta viết **stub handler cho việc chọn và subscribe gói** — cánh cửa dẫn vào phần concurrency thực sự của dự án. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [Beekeeper Studio — SQL Editor and Database Manager](https://www.beekeeperstudio.io/)
