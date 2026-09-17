# 🧪 CloudTrail Hands-On: Tận mắt xem ai vừa làm gì trong tài khoản AWS

> Nguồn: `160-CloudTrail-Hands-On.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056224)

Được rồi, lý thuyết CloudTrail đã nắm, giờ chúng ta cùng mở console và làm một thí nghiệm nhỏ. Mục tiêu rất đơn giản: các bạn tự tay xóa một tài nguyên, rồi kiểm tra xem CloudTrail có "bắt" được hành động đó hay không.

*Bài thực hành này chỉ ở mức Practitioner, nhưng trải nghiệm thật sẽ giúp các bạn nhớ bài lâu hơn và trả lời câu hỏi thi tự tin hơn.*

---

### 🧭 Bắt đầu: Event History — 90 ngày gần nhất

Trong **CloudTrail console**, nhìn sang panel bên trái, các bạn sẽ thấy mục **Event history (lịch sử sự kiện)**.

Đây là lịch sử của **90 ngày gần nhất** các **management events (sự kiện quản lý)**. Tại đây hiển thị toàn bộ các **API call** được thực hiện theo thời gian trong tài khoản.

*Nhìn có thể hơi khô khan, nhưng tất cả hoạt động của tài khoản đều nằm ở đây — đó mới là điều quan trọng.*

---

### 🔬 Thực hành: Xóa một EC2 instance

Mình làm ví dụ như sau:

1. Mở **EC2 console** — trong tài khoản demo của mình đã có sẵn một instance.
2. **Right click** vào instance đó và chọn **Terminate**.
3. Instance bắt đầu bị **terminate (chấm dứt)**.
4. Giờ mình sẽ kiểm tra xem event này có xuất hiện trong CloudTrail hay không.
5. Chờ **khoảng 5 phút** rồi quay lại kiểm tra.

*Đúng vậy, CloudTrail không cập nhật tức thì — các bạn hãy kiên nhẫn một chút nhé.*

---

### 🕵️ Kiểm tra kết quả: Mọi chi tiết đều phơi bày

Sau khi refresh trang, mình thấy ngay **API call `terminate instances`** vừa được chạy. Và CloudTrail cho biết cực kỳ chi tiết:

* **Event source** — là **EC2**, tức sự kiện đến từ dịch vụ nào.
* **Access key** đã được dùng để thực hiện hành động.
* **Region** nơi hành động diễn ra.
* Và nhiều thông tin khác nữa.

Các bạn có thể xem **toàn bộ event** ngay tại đây. Đó chính là sức mạnh của CloudTrail: mọi event đều hiển thị trực tiếp trên giao diện này.

---

### ✅ Điều cần nhớ cho kỳ thi

Đây chỉ là phần giới thiệu ngắn ở **mức Practitioner**, nhưng như vậy là đủ để các bạn bắt đầu và trả lời câu hỏi trong đề:

* **Event history lưu 90 ngày management events.**
* Mỗi sự kiện cho biết **event source, access key, region** và toàn bộ chi tiết của API call.
* Tình huống thi: **tài nguyên bị xóa nhầm → tra CloudTrail**.

---

Vậy là các bạn đã tận mắt thấy CloudTrail hoạt động. *Một bài thực hành ngắn nhưng cực kỳ giá trị, vì đề thi rất thích hỏi "ai đã làm gì".*

Ở bài tiếp theo, chúng ta sẽ làm quen với một dịch vụ "thám tử" khác chuyên soi các request xuyên qua hệ thống phân tán: **AWS X-Ray**. Hẹn gặp các bạn ở đó! 🚀
