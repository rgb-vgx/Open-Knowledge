# 🔑 SSM Parameter Store: Lưu cấu hình và secrets an toàn trên AWS

> Nguồn: `131-SSM-Parameter-Store.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/40515858)

Hôm nay chúng ta tìm hiểu **SSM Parameter Store** — dịch vụ giúp lưu trữ **configuration** (cấu hình) và **secrets** (thông tin bí mật) một cách an toàn trên AWS. Đây là dịch vụ rất dễ dùng nhưng cực kỳ hữu ích, và có thể xuất hiện trong đề thi.

Cùng mình xem nó lưu được gì và dùng như thế nào nhé!

---

### 📦 Parameter Store lưu được gì?

Bạn có thể lưu bất cứ thứ gì, ví dụ:

* **API keys**
* **Passwords** (mật khẩu)
* **Configurations** (cấu hình)

Các đặc điểm của dịch vụ:

* **Serverless** — bạn không cần cung cấp gì cả.
* **Scalable** — đáp ứng được rất nhiều API calls cùng lúc.
* **Durable** (bền bỉ) và **rất dễ dùng**.
* **Secure** — bạn kiểm soát quyền truy cập **từng parameter** bằng **IAM**.
* **Version tracking** — cấu hình và parameter có thể thay đổi theo thời gian, nên dịch vụ theo dõi phiên bản cho bạn.
* **Optional encryption** (mã hóa tùy chọn).

---

### 🛡️ Plain text hay mã hóa?

Ứng dụng hoặc người dùng có thể nhập cấu hình dạng **plain text** (văn bản thường), hoặc cấu hình **encrypted** (đã mã hóa) — khi đó dữ liệu được mã hóa bằng **KMS**. Nhờ vậy, bạn quản lý và lưu trữ cấu hình của nhiều ứng dụng **tập trung tại một nơi**.

---

### 🧪 Hands-on: Tạo parameter đầu tiên

Trong **Systems Manager**, chọn **Parameter Store** ở menu bên trái. Cách dùng cực kỳ đơn giản:

1. **Create parameter** và đặt tên, ví dụ `demo parameter`.
2. Chọn **tier**: **standard** hoặc **advanced** — bản **standard là miễn phí**, nên mình dùng standard.
3. Chọn **type**:
   * **String** — giá trị văn bản, ví dụ một cấu hình hoặc danh sách giá trị.
   * **SecureString** — dùng khi cần mã hóa, ví dụ API keys hay passwords.
4. Chọn **data type**: **text** hoặc **image of type EC2** — mình chọn **text**.
5. Nhập giá trị, ví dụ `my configuration parameter`, rồi **Create parameter**.

Sau khi tạo, bạn chỉ cần bấm vào parameter để **lấy giá trị**. Nếu chỉnh sửa, Parameter Store sẽ tạo **các version khác nhau** — rất hữu ích để theo dõi thay đổi theo thời gian. Xong việc thì có thể **delete parameter** để trở về trạng thái ban đầu.

---

### 📊 Nhìn nhanh các lựa chọn

| Lựa chọn | Khi nào dùng |
|---|---|
| String | Cấu hình văn bản hoặc danh sách giá trị |
| SecureString | API keys, passwords — cần mã hóa bằng KMS |
| Standard tier | Nhu cầu thông thường — miễn phí |
| Advanced tier | Nhu cầu nâng cao hơn |

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** SSM Parameter Store dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Lưu trữ configuration và secrets một cách an toàn trên AWS.

Giải thích: Bạn có thể lưu API keys, passwords, configurations...

Tham chiếu: Mục Parameter Store lưu được gì.

</details>

**Câu 2:** SecureString khác String ở điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** SecureString được mã hóa bằng KMS, phù hợp cho API keys và passwords.

Giải thích: String chỉ là giá trị văn bản thông thường, không mã hóa.

Tham chiếu: Mục Hands-on: Tạo parameter đầu tiên.

</details>

**Câu 3:** Tier nào miễn phí?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Standard tier.

Giải thích: Advanced tier dành cho nhu cầu nâng cao hơn.

Tham chiếu: Mục Hands-on: Tạo parameter đầu tiên.

</details>

**Câu 4:** Bạn kiểm soát quyền truy cập từng parameter bằng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bằng IAM.

Giải thích: Đây là một trong những đặc điểm bảo mật của Parameter Store.

Tham chiếu: Mục Parameter Store lưu được gì.

</details>

**Câu 5:** Khi parameter thay đổi, Parameter Store giúp bạn làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Theo dõi phiên bản (version tracking) của parameter.

Giải thích: Các version khác nhau được tạo ra mỗi lần chỉnh sửa, rất tiện tra cứu.

Tham chiếu: Mục Hands-on: Tạo parameter đầu tiên.

</details>

---

Vậy là xong Parameter Store — một dịch vụ đơn giản nhưng "đắt giá" trong công việc hằng ngày: **một nơi tập trung để lưu cấu hình và secrets, có IAM bảo vệ, có version tracking.**

Ở bài tiếp theo, chúng ta sẽ **tổng kết toàn bộ** các dịch vụ deployment và developer đã học — nhớ đón xem nhé! Hẹn gặp các bạn! 🚀
