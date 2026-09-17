# 🧪 Thực hành IAM Policies — Tự gỡ quyền rồi gắn lại

> Nguồn: `016-IAM-Policies-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20208108)

Bài thực hành này rất hay: mình sẽ **tự gỡ quyền admin của chính mình**, xem lỗi **Access Denied** xuất hiện thế nào, rồi **sửa lại bằng policy gắn trực tiếp**. Qua đó các bạn sẽ thấy rõ **policy được thừa hưởng từ đâu**.

---

### 🧨 Gỡ user khỏi group admin

User **Stephane** đang nằm trong group **admin** nên có toàn quyền. Mình đăng nhập bằng user này, vào IAM console và thấy danh sách users bình thường. Sau đó mình vào group **admins** và **xóa user Stephane khỏi group**.

Kết quả sau khi refresh:

* Màn hình hiện **0 users**.
* Xuất hiện lỗi **Access Denied**: không có quyền gọi `iamListUsers`.

Bài học: quyền admin của Stephane đến từ **group** — mất group là mất quyền.

---

### 🔧 Gắn policy trực tiếp để sửa lỗi

Mình vào IAM → Users → Stephane (lúc này **0 permission policies**) và chọn **Add permissions → Attach policies directly**, gắn **IAMReadOnlyAccess**. Policy này cho phép Stephane **đọc mọi thứ trong IAM**.

Refresh lại: API call chạy được, xem users và groups ngon lành. Nhưng thử **tạo group developers** thì **không được** — vì chỉ có quyền read-only. Muốn tạo group phải có bộ quyền lớn hơn, ví dụ **IAM full access**.

---

### 🧩 Một user — ba nguồn quyền khác nhau

Tiếp theo, mình:

1. Tạo group **developers**, thêm Stephane và gắn đại một policy — ví dụ **AlexaForBusiness** (*policy nào cũng được, không quan trọng*).
2. Quay lại group **admin** và thêm Stephane trở lại.

Mở user Stephane, ta thấy **3 permission policies**:

* **AdministratorAccess** — kế thừa từ group **admin**.
* **AlexaForBusiness** — kế thừa từ group **developers**.
* **IAMReadOnlyAccess** — gắn **trực tiếp** vào user.

Cùng một user nhưng quyền đến từ 3 cách gắn khác nhau — đây là điều đề thi rất thích hỏi.

---

### 🔍 Mổ xẻ policy trong console

* **AdministratorAccess**: cho phép **mọi dịch vụ** AWS (danh sách dịch vụ có thể thay đổi theo thời gian). Xem tab JSON:

```json
{
  "Effect": "Allow",
  "Action": "*",
  "Resource": "*"
}
```

Dấu **`*`** trong AWS nghĩa là **anything** — allow mọi action trên mọi resource, đúng nghĩa administrator.

* **IAMReadOnlyAccess**: IAM được cấp **Full: List** và **Limited: Read**. Xem JSON: effect **allow**, danh sách API call được liệt kê, cùng **`Get*`**, **`List*`** trên `Resource*`:

```json
{
  "Effect": "Allow",
  "Action": [
    "iam:Get*",
    "iam:List*"
  ],
  "Resource": "*"
}
```

`Get*` nghĩa là mọi API bắt đầu bằng **Get** (get users, get groups...); `List*` tương tự. Dấu `*` giúp **gom nhiều API call** vào một dòng.

* **Tự tạo policy**: dùng **visual editor** hoặc **JSON editor**. Mình chọn IAM, tick **ListUsers** và **GetUser** (1 trong 38 action list, 1 trong 32 action read), áp trên **Resource `*`**, đặt tên **MyIAMPermissions** — policy này có thể gắn cho group hoặc user.

Xem JSON tương ứng, đúng như ta chọn: `iam:ListUsers` và `iam:getUser` trên `Resource*`.

---

### 🧹 Dọn dẹp tài nguyên

Cuối bài, mình **xóa group developers** (không cần nữa) và **gỡ IAMReadOnlyAccess** khỏi user Stephane. Giờ Stephane chỉ thuộc group **admin** với quyền administrator — kiểm tra lại danh sách users, mọi thứ hoạt động bình thường.

---

Vậy là các bạn đã thấy policy hoạt động "sống động" thế nào: gỡ là mất quyền, gắn là có quyền, và quyền có thể đến từ group lẫn gắn trực tiếp. Ở bài tiếp theo, chúng ta sẽ chuyển sang **bảo vệ tài khoản với MFA**. Hẹn gặp các bạn! 🚀
