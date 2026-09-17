# 🧪 Hands-on: Tạo KMS key và mã hóa EBS volume

> Nguồn: `183-Encryption-with-KMS-CloudHSM-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24692312)

Đã đến lúc thực hành! Trong bài này, mình sẽ đưa các bạn vào **KMS console**, tự tay mã hóa một **EBS volume**, kiểm chứng cơ chế mã hóa mặc định của **CloudTrail**, rồi tạo một **customer managed key** của riêng bạn.

*Bạn cứ xem mình làm trước cũng được — vì việc tạo key sẽ tốn một khoản phí nhỏ, nên chỉ làm theo khi bạn thực sự muốn.*

---

### 🎯 Ba loại key trong KMS console

Mình gõ **KMS** vào ô tìm dịch vụ và vào **Key Management Service**. Ở đây có **3 loại key**:

* **Customer managed keys** — do bạn tạo, nhưng sẽ **tốn một khoản tiền**.
* **AWS managed keys** — do AWS tạo cho các dịch vụ của họ.
* **Custom key store** — dùng một **cluster CloudHSM** mà bạn phải tự tạo, sở hữu và quản lý. Vì CloudHSM khá đắt, mình sẽ không demo phần này — nhưng các bạn thấy đấy, tùy chọn custom key store vẫn hiển thị trong console.

---

### 🔐 Mã hóa EBS volume bằng AWS managed key

Mình muốn cho các bạn thấy cách dùng key do AWS quản lý hoạt động ra sao. Trước tiên, xem key **aws/ebs**, rồi chuyển sang **EC2 console**:

1. Vào mục **Volumes** ở menu bên trái, chọn **Create volume**.
2. Đặt dung lượng **1 gigabyte**.
3. Bật tùy chọn **encrypt this volume**.
4. Chọn **master key**: có thể là **default master key của AWS** cho dịch vụ, hoặc key của riêng bạn. Ở thời điểm này mình chưa có key nào, nên chỉ có một lựa chọn — dùng **default AWS master key**.
5. Bấm **Create volume**.

Vậy là mình đã có một **encrypted volume** — được bảo vệ trước việc bị giải mã trái phép. Đây là ví dụ cho kiểu mã hóa **opt-in (tự chọn bật)**.

---

### 🔍 CloudTrail và bất ngờ về mã hóa mặc định

Nhớ lại bài trước: có những dịch vụ **mã hóa mặc định**, ví dụ **CloudTrail** hay **S3 Glacier**. Mình vào **CloudTrail** với một **demo-trail**:

* Ở phần **encryption**, console ghi là **disabled**.
* Nhưng thực tế, mã hóa **đã được bật sẵn trong S3 bucket**.

Kiểm chứng bằng cách vào **S3**, tìm bucket của CloudTrail ở region **us-east-1**, mở file log ra và xem thuộc tính **encryption**: giá trị là **AES256**. Nghĩa là file CloudTrail này **thực sự đã được mã hóa trong Amazon S3**, dù phần encryption hiển thị "disabled". Mình không đi sâu lý do, chỉ cần nhớ: **CloudTrail mặc định mã hóa mọi file, không ngoại lệ**.

---

### 🔑 Tự tạo customer managed key

Bây giờ là phần thú vị nhất — tạo key của riêng bạn. *Lưu ý trước: việc này sẽ tốn **1 USD**, nên nếu không muốn thì bạn chỉ cần xem mình làm.*

1. Chọn loại key: **symmetric** hoặc **asymmetric** — mình chọn **symmetric** cho đơn giản.
2. Chọn **origin của key**: **generate từ KMS**, **external** (import key của bạn), hoặc **custom key store** (CloudHSM — khi đó mọi mã hóa/giải mã diễn ra trong CloudHSM).
3. Mình tạo key từ KMS, đặt **alias** là **demokey**, rồi bấm **Next**.
4. Có thể định **key administrators** và **key users** — mình bỏ qua, cứ Next tiếp.
5. **Review key policy**, thấy ổn thì **Finish**.

Xong rồi, mình có **demokey** đang ở trạng thái **enabled**. Vào **key rotation**, mình tick chọn xoay khóa **mỗi năm một lần** để tăng cường bảo mật.

Giờ quay lại **EBS** và tạo thêm một volume 1 gigabyte, bật encrypt, lần này chọn **demokey** làm master key. Kết quả: trong console có **2 volume đều đã được mã hóa**, nhưng theo hai cách khác nhau — một dùng **key do AWS quản lý**, một dùng **key của chính mình**.

---

### 🧹 Dọn dẹp tài nguyên

Sau khi thực hành xong, các bạn nhớ **xóa các volume** để không phát sinh chi phí. Còn nếu đã tạo key, khoản **1 USD/tháng** vẫn được tính, nhưng bạn có thể:

1. **Disable key** (tắt khóa).
2. **Schedule key deletion** (lên lịch xóa khóa).

---

Vậy là các bạn đã tận mắt thấy KMS vận hành: mã hóa opt-in, mã hóa mặc định, và quyền kiểm soát key nằm trong tay bạn. *Hãy nhớ dọn dẹp tài nguyên sau mỗi bài hands-on nhé!*

Bài tiếp theo, chúng ta sẽ tìm hiểu **AWS Certificate Manager (ACM)** — dịch vụ giúp website của bạn có HTTPS. Hẹn gặp các bạn ở đó! 🚀
