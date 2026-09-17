# 🛒 Thực hành đặt hàng AWS Snow Family: Chọn thiết bị, cấu hình và vận chuyển

> Nguồn: `085-AWS-Snow-Family-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24682482)

Bài này chúng ta sẽ đi qua **toàn bộ quy trình order một thiết bị Snow Family** trên console để hiểu các lựa chọn. Mình sẽ không đặt hàng thật, nhưng các bạn sẽ thấy rõ từng bước — từ tên job, chọn thiết bị, tới địa chỉ vận chuyển.

---

### 🧾 Bước 1: Tạo job và chọn loại công việc

1. Đặt **job name** — ví dụ "my import job" — và **job title**.
2. Chọn loại công việc:
   * **Import vào Amazon S3** — AWS ship Snowball đến cho bạn, bạn load dữ liệu rồi gửi trả AWS. Đây là use case rất phù hợp.
   * **Export từ Amazon S3** — dữ liệu từ S3 được nạp vào Snowball và gửi đến bạn.
   * **Local compute and storage only** — chỉ tính toán và lưu trữ cục bộ, tức edge computing.

---

### 📦 Bước 2: Chọn thiết bị Snow

* Hiện có **hai lựa chọn**:
  * **Snowball Edge Storage Optimized** — 210 TB
  * **Snowball Edge Compute Optimized**
* Lưu ý: danh sách thiết bị có thể thay đổi theo thời gian và **nhiều thiết bị cũ đã bị discontinued (ngừng cung cấp)**. Từ góc độ thi cử, chỉ cần nắm hai lựa chọn này là đủ.

| Thiết bị | Ghi chú |
|---|---|
| Storage Optimized | 210 TB |
| Compute Optimized | Dùng cho nhu cầu tính toán |

---

### 💳 Bước 3: Pricing, bucket và service role

* Chọn **pricing on-demand theo ngày**.
* Cấu hình **S3 data transfer** và **bucket** mà bạn muốn chuyển dữ liệu về.
* Phần **security**: chọn cách mã hóa dữ liệu và kiểu truy cập service.
* Chọn **service role** — role này có quyền truy cập Amazon S3, cho phép tạo **ServiceLink role** để thiết bị Snow có quyền ghi vào bucket của bạn.

---

### 🚚 Bước 4: Vận chuyển và hoàn tất

1. Nhập **shipping address** — nơi bạn muốn nhận thiết bị Snow.
2. Chọn tốc độ vận chuyển: **one-day shipping** hoặc **two-day shipping**.
3. Bật **notifications** để theo dõi trạng thái job.
4. Xem lại **job summary** và hoàn tất.

Sau đó, bạn sẽ nhận Snowball Edge, **load dữ liệu lên thiết bị**, rồi gửi trả AWS bằng **shipping label** có sẵn trong kiện hàng.

*Khóa học không thực sự order vì quá phức tạp — nhưng các bạn đã thấy trọn vẹn luồng hoạt động của Snow Family.*

---

Vậy là các bạn đã biết cách một job Snow Family được tạo ra: từ tên job, loại import/export, chọn thiết bị, pricing, service role cho tới vận chuyển. *Chỉ cần ghi nhớ hai thiết bị chính là đủ cho kỳ thi Cloud Practitioner.*

Bài tiếp theo chúng ta sẽ "mổ xẻ" phần **pricing của Snowball Edge** — chỗ này có một con số miễn phí rất dễ hỏi trong đề. Hẹn gặp các bạn ở đó! 🚀
