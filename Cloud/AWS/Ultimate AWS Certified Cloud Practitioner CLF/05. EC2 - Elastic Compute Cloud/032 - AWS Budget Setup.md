# 💰 Thiết lập Budget và cảnh báo chi phí trên AWS — đừng để hóa đơn bất ngờ

> Nguồn: `032-AWS-Budget-Setup.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20053448)

Trước khi bước vào phần thực hành EC2, mình muốn đảm bảo các bạn **không tiêu đồng nào (hoặc không tiêu quá nhiều)** trong khóa học này. Cách tốt nhất là thiết lập **budget (ngân sách) và cảnh báo** ngay từ đầu. Đây cũng là một kỹ năng thực tế các bạn sẽ dùng suốt khi làm việc với AWS.

---

### 🧾 Vì sao IAM user không xem được Billing?

Để vào trang billing, các bạn bấm vào **góc trên bên phải màn hình** rồi chọn **Billing and Cost Management**.

Điều thú vị: khi đăng nhập bằng **IAM user** (ví dụ user `Stephane` của mình), dù có **quyền administrator**, các bạn vẫn thấy **access denied** khi vào billing. Đây là cơ chế mặc định của AWS, và cách xử lý như sau:

1. Đăng nhập bằng **root account** (tài khoản gốc).
2. Vào **Accounts**, kéo xuống tìm mục **IAM user and role access to billing information**.
3. Mặc định mục này đang **deactivated (vô hiệu hóa)** — hãy **activate IAM access**, từ đó các IAM user có quyền admin mới xem được thông tin billing.
4. Quay lại trang billing và refresh — có thể mất một chút thời gian mới thấy dữ liệu.

*Lưu ý nhỏ: phần forecast có thể báo "data unavailable" nếu tài khoản chưa đủ dữ liệu lịch sử — chuyện bình thường, đừng lo.*

---

### 📊 Đọc hiểu trang Billing và Bills

Ở trang billing, các bạn thấy **chi phí tháng này (month-to-date)**, **tổng chi phí dự báo (forecasted) cho tháng hiện tại**, **tổng chi phí tháng trước**, và biểu đồ phân tích chi phí theo tháng.

Khi tài khoản bắt đầu phát sinh chi phí, hãy vào tab **Bills**:

1. Chọn tháng muốn xem (ví dụ tháng 12/2023).
2. Kéo xuống dưới cùng tới **charges by service (chi phí theo từng dịch vụ)**.
3. Xem **số lượng dịch vụ đang hoạt động** — tài khoản ví dụ của mình có **28 dịch vụ**.
4. Ví dụ **Elastic Compute Cloud (EC2)** tốn **43 USD ở EU Ireland**, trong đó **Amazon Elastic Compute NatGateway chiếm 35 USD**, phần còn lại là **EBS**, **Elastic IP**...

Nhờ đó các bạn dễ dàng "mổ xẻ" hóa đơn và biết tiền đang đi đâu. Nếu thấy chi phí lạ, cứ vào **Bills → đúng tháng → charges by service** để điều tra.

---

### 🆓 Đừng quên dashboard Free Tier

Ở menu bên trái có mục **Free Tier**: nơi hiển thị **mức sử dụng hiện tại**, **mức dự báo**, và giải thích free tier là gì.

Điểm cần nhớ: nếu mức dự báo **vượt quá free tier**, phần đó **chuyển sang màu đỏ** và các bạn **sẽ bị tính phí**. Khi đó hãy **tắt mọi tài nguyên đang bật** có khả năng phát sinh tiền. Đây là dashboard cực kỳ hữu ích.

---

### 🔔 Tạo Budget cảnh báo tự động

Vào **Budgets** ở menu trái → **Create budget**, mình dùng **template simplified (mẫu đơn giản)**. Có 2 kiểu budget đáng dùng:

| Tiêu chí | Zero Spend Budget | Monthly Cost Budget |
|---|---|---|
| Mục đích | Cảnh báo ngay khi phát sinh | Giới hạn chi tiêu theo tháng |
| Ngưỡng | Chạm **1 cent** là có email | Ví dụ **10 USD/tháng** |
| Cảnh báo | 1 email | 85% thực tế, 100% thực tế, 100% dự báo |

1. **Zero spend budget:** đặt tên `My Zero Spend Budget`, nhập email (mình dùng `stephane@example.com`). Chỉ cần tiêu **1 cent** là có email gửi tới ngay.
2. **Monthly cost budget:** đặt ngân sách **10 USD/tháng** cho khóa học, cùng email nhận cảnh báo. Mình cấu hình nhận email khi **chi tiêu thực tế đạt 85%**, **đạt 100%**, và khi **chi tiêu dự báo đạt 100%** — tổng cộng tối đa **3 email**.

Thú vị là budget zero spend của mình **đã bị vượt ngay** vì tháng này đã phát sinh chi phí — thế nên email cảnh báo tới liền. Đó chính là tác dụng của nó!

*Nếu các bạn học đúng theo khóa, các bạn sẽ không mất đồng nào — nhưng cứ đặt budget cho chắc, lỡ có sai sót cũng không bị hóa đơn lớn "ập" vào mặt.*

---

### 🎯 Chốt bài

**Budget + Free Tier + Bills breakdown** là bộ ba công cụ giúp các bạn tự gỡ rối mọi vấn đề chi phí trên AWS — một kỹ năng bắt buộc khi dùng cloud.

Ở bài tiếp theo, chúng ta sẽ chính thức bước vào **EC2** — trái tim của AWS. Hẹn gặp các bạn! 🚀
