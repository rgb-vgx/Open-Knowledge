# 🔐 KMS và CloudHSM: Ai giữ chìa khóa mã hóa của bạn?

> Nguồn: `182-Encryption-with-KMS-CloudHSM.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056318)

Mã hóa là trái tim của bảo mật trên cloud. Trong bài này, mình sẽ chính thức hóa khái niệm **encryption (mã hóa)** và giới thiệu hai dịch vụ quan trọng nhất: **KMS** và **CloudHSM**. Các bạn sẽ thấy chúng khác nhau ở một điểm rất dễ hỏi thi: **ai đang giữ chìa khóa**.

---

### 🎯 Hai trạng thái mã hóa: at rest và in transit

Trong AWS có **2 loại mã hóa** diễn ra:

* **Encryption at rest (mã hóa khi lưu trữ)** — dữ liệu được lưu hoặc archive trên một thiết bị vật lý. Ví dụ: **hard drive/hard disk**, **RDS instance** (vì là database), **S3 Glacier Deep Archive**, mọi loại **S3 bucket**, hay **EFS network drive**. "At rest" nghĩa là dữ liệu **không di chuyển** — nó đã được ghi ở đâu đó.
* **Encryption in transit (mã hóa khi truyền)** — mã hóa **trong lúc dữ liệu di chuyển từ nơi này sang nơi khác**. Ví dụ: truyền dữ liệu từ **on-premises data center lên AWS**, từ **EC2 instance đến bảng DynamoDB**, hoặc từ **EFS sang Amazon S3**.

Hai loại dùng kỹ thuật khác nhau. Lý tưởng nhất, vì muốn dữ liệu được bảo vệ mọi lúc, bạn nên mã hóa ở **cả hai trạng thái**.

Để làm điều đó, chúng ta dùng **encryption keys (khóa mã hóa)**. *Ở cấp độ CCP, bạn chưa cần biết khóa hoạt động thế nào* — chỉ cần hiểu: ai không có khóa thì dù lấy được dữ liệu cũng **không thể giải mã và đọc** được.

---

### 🔑 KMS — dịch vụ mã hóa trung tâm của AWS

**KMS (Key Management Service — dịch vụ quản lý khóa)** là dịch vụ mã hóa trung tâm của AWS. **Mỗi khi nghe nói đến encryption của một dịch vụ, khả năng rất cao đó là KMS.**

Cách hoạt động: **AWS quản lý khóa cho chúng ta**, và bạn chỉ định **ai được truy cập** vào các khóa đó.

Với KMS, một số dịch vụ cho phép bạn **opt-in (tự chọn bật) mã hóa**:

* **EBS volumes** — chọn mã hóa bằng KMS.
* **S3 buckets** — bật **server-side encryption** cho objects.
* **Redshift** — mã hóa database.
* **RDS** — tương tự.
* **EFS** — mã hóa files.

Trong khi đó, có những dịch vụ **tự động mã hóa bất kể bạn muốn hay không**: **CloudTrail Logs**, **S3 Glacier** và **Storage Gateway**.

---

### 🛡️ CloudHSM — phần cứng mã hóa chuyên dụng

Nếu KMS do AWS quản lý phần mềm mã hóa, thì **CloudHSM** chỉ **cấp cho bạn phần cứng mã hóa**, còn **bạn tự quản lý khóa của mình**.

* Thiết bị phần cứng chuyên dụng đó gọi là **HSM module (Hardware Security Module)**.
* AWS đặt thiết bị trong hạ tầng của họ, nhưng **khóa hoàn toàn do bạn quản lý**, không phải AWS.
* Thiết bị **tamper resistant (chống can thiệp)** — ai cố mở/phá nó thì nó sẽ hỏng, nhờ đó không ai lẻn vào data center AWS để lấy khóa được.
* Đạt chứng nhận **FIPS 140-2 Level 3** — một tiêu chuẩn bảo mật.

Cách dùng: AWS quản lý **thiết bị**, còn bạn dùng **CloudHSM service** kết hợp **CloudHSM clients** để quản lý khóa. Kết nối giữa client và CloudHSM **được mã hóa** để thao tác an toàn.

| Tiêu chí | KMS | CloudHSM |
|---|---|---|
| Ai quản lý khóa | AWS | Bạn |
| Phần cứng | Dùng chung, AWS quản lý | HSM chuyên dụng |
| Tiêu chuẩn | — | FIPS 140-2 Level 3 |
| Mức độ kiểm soát | Định ai được truy cập | Toàn quyền với khóa |

---

### 🗂️ Bốn loại key trong thế giới KMS

**1. Customer-managed key** — do **khách hàng tạo, quản lý và sử dụng**. Bạn có thể bật/tắt key, đặt **key rotation policy** (ví dụ tạo key mới mỗi năm, key cũ vẫn được giữ), và có thể **bring your own key** (mang khóa của riêng bạn vào).

**2. AWS-managed key** — do **AWS tạo, quản lý và sử dụng thay mặt khách hàng**. Bạn gặp loại này mỗi khi một dịch vụ AWS có mã hóa do AWS quản lý; tên khóa có dạng **aws/s3**, **aws/ebs**... Cứ thấy tiền tố **aws/** là key do AWS quản lý.

**3. AWS-owned key** — tập hợp key do **một dịch vụ sở hữu và quản lý**, dùng cho nhiều tài khoản. AWS có thể dùng các key này để bảo vệ tài nguyên trong tài khoản của bạn, nhưng **bạn hoàn toàn không có quyền xem** chúng.

**4. CloudHSM keys / custom key store** — key được tạo từ **thiết bị CloudHSM của chính bạn**, và **mọi thao tác mã hóa/giải mã diễn ra bên trong cluster CloudHSM**.

*Mẹo thi: KMS "AWS quản lý khóa", CloudHSM "bạn quản lý khóa trên phần cứng riêng" — chỉ cần nhớ đúng cặp đối lập này.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Hai loại mã hóa trong AWS là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Encryption at rest và encryption in transit.
Giải thích: Một loại bảo vệ dữ liệu đang lưu, một loại bảo vệ dữ liệu đang di chuyển.
Tham chiếu: Mục Hai trạng thái mã hóa.

</details>

**Câu 2:** Dịch vụ mã hóa trung tâm của AWS tên là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** KMS (Key Management Service).
Giải thích: Khi nghe đến encryption của một dịch vụ, khả năng cao là KMS; AWS quản lý khóa, bạn định ai được truy cập.
Tham chiếu: Mục KMS — dịch vụ mã hóa trung tâm.

</details>

**Câu 3:** Điểm khác biệt cốt lõi giữa KMS và CloudHSM là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** KMS do AWS quản lý khóa; CloudHSM cấp phần cứng và bạn tự quản lý khóa.
Giải thích: HSM là thiết bị chuyên dụng, tamper resistant, đạt FIPS 140-2 Level 3.
Tham chiếu: Mục CloudHSM — phần cứng mã hóa chuyên dụng.

</details>

**Câu 4:** Key có tên bắt đầu bằng "aws/" thuộc loại nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS-managed key.
Giải thích: Loại key này do AWS tạo, quản lý và dùng thay mặt bạn, ví dụ aws/s3, aws/ebs.
Tham chiếu: Mục Bốn loại key trong thế giới KMS.

</details>

**Câu 5:** Dịch vụ nào tự động mã hóa mà không cần bạn bật?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** CloudTrail Logs, S3 Glacier và Storage Gateway.
Giải thích: Trong khi EBS, S3 bucket, Redshift, RDS, EFS là dạng opt-in (tự chọn bật).
Tham chiếu: Mục KMS — dịch vụ mã hóa trung tâm.

</details>

---

Vậy là các bạn đã nắm được bức tranh mã hóa trên AWS: **at rest vs in transit**, và cặp đôi **KMS vs CloudHSM**. Hãy nhớ kỹ 4 loại key — đây là kiến thức nền cho các section sau.

Ở bài tiếp theo, chúng ta sẽ **thực hành hands-on**: tự tay tạo KMS key và mã hóa EBS volume. Hẹn gặp các bạn ở đó! 🚀
