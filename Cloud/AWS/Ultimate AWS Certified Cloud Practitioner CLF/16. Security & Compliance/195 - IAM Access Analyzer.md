# 🔎 IAM Access Analyzer: Phát hiện tài nguyên bị chia sẻ ra bên ngoài

> Nguồn: `195-IAM-Access-Analyzer.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/36566096)

Chia sẻ tài nguyên cho bên ngoài đôi khi là cố ý, nhưng cũng có khi là **vô tình quên** — và đó là rủi ro bảo mật lớn. **IAM Access Analyzer** ra đời để giúp bạn phát hiện chính xác những tài nguyên nào đang bị chia sẻ ra ngoài. Cùng tìm hiểu nhé!

---

### 🎯 Access Analyzer là gì?

Đây là dịch vụ nằm **trong IAM console**, dùng để tìm ra **tài nguyên nào đang được chia sẻ ra bên ngoài (shared externally)**. Nó hỗ trợ các tài nguyên:

* **S3 buckets**.
* **IAM Roles**.
* **KMS Keys**.
* **Lambda Functions and Layers**.
* **SQS Queues**.
* **Secrets Manager Secrets**.

Các tài nguyên này có thể có **resource policy** gắn kèm hoặc được **chia sẻ với tài khoản khác**. Vấn đề là đôi khi bạn **quên mất việc chia sẻ đó**, khiến ứng dụng của bạn có thể bị truy cập từ bên ngoài — một rủi ro bảo mật cho công ty.

---

### 🛡️ Zone of trust — trái tim của Access Analyzer

Bạn định nghĩa một **zone of trust (vùng tin cậy)**, tương ứng với **các AWS account của bạn** hoặc **toàn bộ AWS organization** của bạn. Quy tắc rất rõ ràng:

* Bất kỳ thứ gì **ngoài zone of trust** mà có quyền truy cập vào các tài nguyên nói trên → **được báo cáo thành findings**.
* Bạn xem findings trong console và quyết định hành động nếu thấy đây là rủi ro.

Ví dụ với S3 bucket: bạn có thể chia sẻ bucket cho một **role**, một **user**, một **account**, hoặc một **external client** theo **IP** hay **VPC endpoint**. Nếu zone of trust được đặt là các account của bạn — và role, user, VPC endpoint đều nằm trong account — thì **account khác và external client sẽ bị gắn cờ (flagged) như findings**.

---

### 🧪 Hands-on: tạo analyzer và xử lý findings

1. Trong IAM console, chọn **Access Analyzer** ở menu bên trái và tạo analyzer đầu tiên.
2. Đặt tên cho analyzer; việc bật là **miễn phí**. **Zone of trust** = **current account** của bạn; findings sẽ được báo khi nằm ngoài vùng tin cậy. Có thể thêm tags nhưng không bắt buộc.
3. Tạo analyzer → hệ thống sinh ra một **service-linked role** để analyzer tương tác với tài nguyên thay bạn.
4. Khi scan xong: có **3 active findings** — **1 SQS queue** và **2 S3 buckets** đang **chia sẻ với all principals**. Một cái chia sẻ qua **bucket policy**, một cái không rõ cách; có cái là **write access**, có cái là **read access**.
5. Ví dụ SQS queue tên **demo S3 notification**: policy cho phép **anyone gửi message** — "anyone" có thể là người từ tài khoản bên ngoài. Bạn sang **SQS console**, sửa/loại bỏ policy, save, rồi **rescan** → trạng thái chuyển thành **resolved** vì quyền truy cập không còn được phép. Findings giảm còn **2**.
6. Với S3 buckets public: nếu là **intended access (chia sẻ có chủ đích)**, bạn có thể **archive** findings; chúng sẽ chuyển sang cột **archived**. Ngoài ra còn có **archive rules** — bạn tạo rule riêng để **tự động** đánh dấu findings theo tiêu chí mình đặt.

*Mẹo nhỏ: hãy xem mỗi finding là một cơ hội kiểm tra lại xem việc chia sẻ đó có thật sự nằm trong kế hoạch của bạn không.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** IAM Access Analyzer dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tìm ra tài nguyên nào đang được chia sẻ ra bên ngoài.
Giải thích: Nó nằm trong IAM console. Tham chiếu: Mục Access Analyzer là gì.

</details>

**Câu 2:** Kể tên 4 loại tài nguyên được Access Analyzer theo dõi.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Ví dụ: S3 buckets, IAM Roles, KMS Keys, SQS Queues, Lambda Functions and Layers, Secrets Manager Secrets.
Giải thích: Đây là các tài nguyên có thể có resource policy. Tham chiếu: Mục Access Analyzer là gì.

</details>

**Câu 3:** Zone of trust là gì và findings được tạo khi nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là vùng tin cậy gồm các account của bạn hoặc cả organization; bất kỳ truy cập nào ngoài vùng này đều thành finding.
Giải thích: Giúp phân biệt chia sẻ nội bộ với chia sẻ ra ngoài. Tham chiếu: Mục Zone of trust.

</details>

**Câu 4:** Sau khi sửa policy của SQS queue và rescan, trạng thái finding thay đổi thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chuyển thành resolved vì quyền truy cập không còn được phép; số findings giảm từ 3 còn 2.
Giải thích: Access Analyzer cập nhật lại khi bạn quét lại. Tham chiếu: Mục Hands-on.

</details>

**Câu 5:** Nếu một S3 bucket public là chia sẻ có chủ đích, bạn nên làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Archive finding, hoặc tạo archive rule để tự động archive theo tiêu chí.
Giải thích: Findings được chuyển sang cột archived. Tham chiếu: Mục Hands-on.

</details>

---

Vậy là bạn đã nắm được **IAM Access Analyzer: S3, IAM Roles, KMS Keys, Lambda, SQS, Secrets Manager + zone of trust + findings**. *Càng ít tài nguyên bị chia sẻ ngoài ý muốn, tài khoản của bạn càng an toàn.*

Ở bài tiếp theo — cũng là bài cuối của section này — chúng ta sẽ **tổng kết toàn bộ Security & Compliance** để ôn thi thật gọn. Hẹn gặp các bạn! 🚀
