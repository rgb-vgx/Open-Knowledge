# 🧪 Hands-on: Tạo CloudWatch Metric và Alarm đầu tiên

> Nguồn: `154-CloudWatch-Metrics-CloudWatch-Alarms-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056182)

Được rồi, lý thuyết đã đủ — giờ chúng ta cùng mở **AWS console** và làm thật. Bài hands-on này sẽ đưa các bạn đi từ xem metric, tạo alarm, cho tới tạo **billing alarm** ở us-east-1. Các bạn hãy mở CloudWatch và làm theo mình nhé.

---

### 🔍 Xem metric có sẵn trên CloudWatch

Vào **CloudWatch** → menu bên phải → **Metrics** → **All metrics** (có thể thử giao diện mới). Ở đây hiển thị mọi metric đã tạo trong khóa học — màn hình của các bạn có thể khác, nhưng sẽ thấy rất nhiều service đang publish metric vào CloudWatch.

* Bấm **SQS → Queue Metrics** và xem queue demo: **Number of messages received** có 1 data point, **Number of messages deleted** chưa có gì, **Number of messages sent** có 1, rồi **Number of Empty Received**... SQS cho rất nhiều thông tin.
* Bấm **EC2 → Per-instance Metric** rồi xem **CPU utilization** của instance vừa launch. Vì instance mới chạy, dữ liệu còn ít — cần chạy lâu hơn mới có thông tin đầy đủ.

*Điểm mấu chốt: chỉ trong một dashboard, các bạn xem được metric của rất nhiều dịch vụ khác nhau.*

---

### 🚨 Tạo alarm đầu tiên từ CloudWatch

1. Vào **All alarms** → **Create alarm**.
2. **Select metric**: tìm **CPU utilization** của EC2 instance.
3. Cấu hình thống kê **average**, period **5 phút**, điều kiện **CPU > 80%** thì chuyển sang trạng thái **ALARM**.
4. Gửi notification vào **SNS topic mới** tên **Default_CloudWatch_Alarms_Topic**, người nhận email là `stephan@example.com` → tạo topic.
5. AWS còn cho chọn thêm **Auto Scaling actions, EC2 actions, Systems Manager actions** — nhưng để đơn giản, mình chỉ dùng notification.
6. **Next** → đặt tên **DemoAlarm** → **Next**. Màn hình hiển thị **đường ngưỡng màu đỏ** và **điểm giá trị thực tế màu xanh** (đang thấp hơn ngưỡng) → **Create alarm**. Xong alarm đầu tiên!

---

### 🖥️ Tạo alarm ngay trong EC2 console

Có một cách khác: tạo alarm trực tiếp từ **EC2 console**.

1. Vào EC2 console, chọn instance vừa tạo → tab **Monitoring**: xem CPU utilization, status checks...
2. Cuộn sang bên phải, mục **Alarm status**, bấm nút dấu **+** để tạo alarm.
3. Chọn notification gửi tới topic đã tạo, chọn alarm action là **recover my EC2 instance**.
4. Ở phần data to sample, ban đầu mình chọn **Status check failed: either** nhưng AWS báo lỗi — cần chọn metric cụ thể, nên mình đổi thành **Status check failed: system** rồi **Create**. *Đôi khi bị sai một chút cũng là cách học rất tốt!*
5. Tạo alarm thứ ba: cùng topic, action **reboot**, điều kiện **CPU > 95% trong 3 period liên tiếp, mỗi period 5 phút** → giả định instance bị kẹt trong vòng lặp CPU → tự động reboot.
6. Quay lại CloudWatch và refresh, các bạn sẽ thấy **3 alarm** gắn với EC2 instance.

---

### 💰 Billing alarm — chỉ tạo được ở us-east-1

Có một loại alarm không tạo được ở mọi region: **billing alarm**. Nó **chỉ tồn tại ở us-east-1**.

1. Đổi **region selection** sang **us-east-1** → menu bên trái xuất hiện mục **Billing**.
2. **Create alarm** trên metric **Estimated charges USD**, điều kiện **> 8 USD**.
3. Gửi notification vào một **SNS topic mới** — phải tạo lại topic vì **gần như mọi resource trong AWS đều scoped theo region** — người nhận `stephan@example.com`.
4. Đặt tên **DemoBillingAlarm** rồi hoàn tất.

*Nhớ kỹ chi tiết này nhé: billing data chỉ có ở us-east-1 — nó có thể xuất hiện trong đề thi đấy!*

---

### 🧹 Dọn dẹp tài nguyên

Cuối bài hands-on luôn nhớ dọn dẹp:

* Xóa **billing alarm** ở us-east-1.
* Quay lại region bạn đang làm việc (của mình là **Ireland**).
* Chọn **Actions → Delete** để xóa **3 alarm**.
* Vào EC2 **terminate instance** đã tạo.

Như vậy là các bạn đã biết cách dùng metric và alarm để tự động hóa việc giám sát trên AWS. Ở bài tiếp theo, chúng ta sẽ chuyển sang **CloudWatch Logs**. Hẹn gặp các bạn! 🚀
