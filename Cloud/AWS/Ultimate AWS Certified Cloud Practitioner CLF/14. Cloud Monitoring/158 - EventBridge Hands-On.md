# 🧪 Hands-on: Tạo schedule và rule trên Amazon EventBridge

> Nguồn: `158-EventBridge-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20237174)

Được rồi, chúng ta cùng bắt đầu với **Amazon EventBridge** và tạo rule đầu tiên. Bài này sẽ dùng **EventBridge Schedule** để chạy Lambda mỗi giờ, rồi tạo các **rule với event pattern** để nhận cảnh báo khi có sign in và khi EC2 instance bị terminate. Mở console lên và làm theo mình nhé!

---

### ⏰ Tạo schedule chạy Lambda mỗi 1 giờ

Trong EventBridge có nhiều lựa chọn, nhưng mình chọn **EventBridge Schedule**. Lưu ý: **Scheduled rule** là cách làm cũ, mình không dùng; **EventBridge Schedule** mới là cách được AWS hỗ trợ cho tương lai. Các bước:

1. **Create schedule** → mục tiêu là chạy **Lambda function** `demo-lambda` **mỗi 1 giờ**. Đặt tên **InvokeLambdaFunctionEveryOneHour**.
2. Giữ các thiết lập mặc định, chọn loại schedule **Recurring** (định kỳ) thay vì chạy một lần.
3. Chọn kiểu **rate-based** (hoặc **cron-based** nếu bạn muốn nhập cron expression) — đơn giản nhất là rate 1 giờ. Các tùy chọn **flexible time window** và **daylight saving time** cứ để mặc định.
4. **Next** → chọn target: có sẵn các **templated target** và cả danh sách API. Chọn **Lambda → demo-lambda**. Phần **version/alias** và input document là tùy chọn, bỏ qua.
5. **Next** → bật schedule, không cần retry, không cần **dead-letter queue**, không cần encryption. EventBridge Scheduler sẽ **tự tạo một role** có quyền **invoke** function.
6. **Create schedule** — AWS sẽ thiết lập mọi thứ để Lambda chạy mỗi giờ.

Trong mục **Schedules**, các bạn xem được tất cả schedule trong account; tạo bao nhiêu cũng được, một lần hay lặp lại đều được.

---

### 📨 Rule cảnh báo khi có người sign in

Quay lại **EventBridge quick start**, chọn **Create Rule with event pattern** — dùng khi muốn phản ứng với những gì xảy ra trong account. Có **builder mới**; nếu muốn dùng giao diện cũ thì tắt builder đi.

1. Bên trái bấm **Events** → **AWS Service Events** — có rất nhiều event, kèm các event phổ biến, nhóm theo service.
2. Tìm **AWS Console Sign In via CloudTrail** và kéo vào — nghĩa là **mỗi khi có người sign in qua CloudTrail, rule sẽ kích hoạt**.
3. Chọn target là **SNS topic** để nhận **email notification**.
4. Đặt tên rule **DemoSignInAlert**, giữ **default event bus**, bật rule → **Create**. Lúc này AWS báo **invalid** vì chưa cấu hình target.
5. Bấm vào event để xem thông tin: **schema** hiển thị dạng **tree** hoặc **code**, xem được **sample event** và **test event pattern**.
6. Bấm vào target SNS topic, chọn topic **demo-ccp**, dùng execution role do EventBridge tự tạo cho resource này. Có thể cấu hình **retry policy** và **dead-letter queue**, nhưng không bắt buộc.
7. **Create** → rule **DemoSignInAlert** được tạo và **enabled**, với event pattern cùng target đã cấu hình.

---

### 🖥️ Rule cảnh báo khi EC2 instance bị terminate

Mình tạo thêm một rule rất thường gặp: **EC2 Instance State-change Notification** — kích hoạt mỗi khi **state của EC2 instance thay đổi**.

1. Chọn loại event này, vào **Event Filter → Event Pattern Filter**.
2. Lọc theo state: chọn **equals** và nhập giá trị **terminated** — mỗi khi instance chuyển sang trạng thái terminated, rule sẽ chạy.
3. Có thể **test event pattern** với các sample event; sample số 6 chính là **instance state terminated**.
4. Target vẫn là **SNS topic** như trước → **Create**.
5. Đặt tên rule **InstanceTerminatedNotification**.

---

### 🎯 Thực hành và dọn dẹp

Vậy là chúng ta đã tạo **hai rule** trong Amazon EventBridge để nhận alert khi có **sign in** và khi **instance bị terminate**:

* Các bạn có thể giữ rule lại, hoặc **disable** nếu không dùng nữa.
* Nên thử thực tế: **terminate một instance** xem rule có chạy không, hoặc **sign in lại vào console** xem có nhận được email không.

Như vậy là các bạn đã biết cách dùng EventBridge để tự động phản ứng với sự kiện trên AWS. Hẹn gặp các bạn ở bài giảng tiếp theo! 🚀
