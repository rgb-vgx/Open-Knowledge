# 🧪 Health Dashboard Hands-On: Phân biệt Service Health và Account Health

> Nguồn: `163-AWS-Health-Dashboard---Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/35725080)

Được rồi, chúng ta cùng mở **Health Dashboard** và xem tận mắt sự khác nhau giữa **Service Health** và **Account Health**. Bài thực hành này sẽ giúp các bạn nhớ bài cực nhanh, vì mọi thứ đều hiển thị trực quan trên console.

---

### 🔎 Mở Health Dashboard

Thao tác rất nhanh:

1. Gõ **Health** vào ô tìm kiếm (search box).
2. Bấm chọn **AWS Health Dashboard**.

Vậy là xong, chúng ta bắt đầu xem phần đầu tiên: **Service Health**.

---

### 🌍 Service Health & Service History

Bấm vào **Service History**, các bạn sẽ thấy **tình trạng dịch vụ của toàn bộ các dịch vụ AWS, theo region và theo từng ngày**.

Ví dụ, với khu vực **North America**, mình xem thử **Amazon EventBridge Scheduler**:

* Hôm nay nó hoạt động tốt.
* Hôm qua cũng tốt.
* Và cứ thế...

Bạn có thể **cuộn xuống xem tất cả các dịch vụ** — và sẽ thấy AWS khá là ổn định (stable).

Ngoài ra:

* Bạn có thể tìm một **dịch vụ cụ thể** hoặc một **region cụ thể** để xem chi tiết.
* Nếu đang có **open issues (sự cố đang mở)**, chúng sẽ hiển thị ngay tại đây — xác nhận rằng có thể bạn đang gặp vấn đề với một dịch vụ, và những khách hàng khác cũng vậy.

*Nhưng nhớ nhé: phần này chỉ là thông tin chung.*

---

### 🔔 Account Health — Open and Recent Issues

Đối với **tài khoản của bạn**, những vấn đề liên quan đến bạn nằm ở mục **Open and Recent Issues**.

* Khi có sự cố, **biểu tượng chuông (bell)** sẽ hiện thêm một **icon nhỏ**.
* Hiện tại trong tài khoản demo của mình **không có gì**: không open issues, không scheduled changes, không notifications nào khác.
* Nếu có, chiếc chuông sẽ cho bạn biết **những issue đang ảnh hưởng đến bạn ngay lúc này**.

Tại đây có các tab đáng chú ý:

* **Scheduled Changes** — ví dụ AWS sắp **bảo trì EBS volumes** và việc đó sẽ ảnh hưởng đến bạn.
* **Other Notifications** — các thông báo khác.
* **Event Log** — nơi bạn tìm thấy những issue **đã từng mở và đã đóng**, kèm **thời điểm bắt đầu (start time)** và **thời điểm cập nhật cuối (last update time)**.

---

### 🗂️ Xem chi tiết một sự cố trong Event Log

Những issue trong Event Log **chỉ áp dụng cho mình** vì mình đang dùng các dịch vụ bên dưới.

Ví dụ, khi xem các **operational issues của EC2**, mình có thể:

1. Bấm vào issue để xem nó **bắt đầu khi nào**.
2. Xem **nó đã được khắc phục (resolved)** hay chưa.
3. Đọc **mô tả (description)** và cách nó **ảnh hưởng đến mình**.
4. Bấm vào **Affected Resources** để xem **những tài nguyên nào bị ảnh hưởng** bởi issue đó.

*Đến đây thì các bạn đã thấy rõ sự khác biệt giữa Service Health và Account Health rồi chứ?*

---

### 🏢 Organizational Health & Automation

Cuối cùng, còn có **Organizational Health**, nơi bạn có thể cấu hình để có **tầm nhìn toàn tổ chức (organization-wide visibility)** về sức khỏe của **tất cả các tài khoản**.

Và nếu muốn tự động hóa (automations), bạn có thể **tích hợp Health với Amazon EventBridge**.

---

Vậy là các bạn đã thực hành xong Health Dashboard. *Nhớ nhanh: Service History xem toàn cảnh, còn Open and Recent Issues và Event Log mới là những gì ảnh hưởng trực tiếp đến bạn.*

Ở bài tiếp theo, chúng ta sẽ cùng **tổng kết toàn bộ section Cloud Monitoring** để chuẩn bị bước vào kỳ thi với hành trang vững chắc. Hẹn gặp các bạn ở đó! 🚀
