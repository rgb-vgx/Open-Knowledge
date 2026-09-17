# 📊 Theo dõi chi phí cloud: Billing Dashboard, Cost Allocation Tags và các báo cáo

> Nguồn: `220-Tracking-Costs-in-the-Cloud---Billing-Dashboard-Cost-Allocat.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20118368)

Sau khi đã biết ước tính chi phí, hãy chuyển sang kỹ năng quan trọng không kém: **theo dõi (track) chi phí thực tế** trong tài khoản AWS. Bài này khá dài nhưng cực thực dụng — mình sẽ đi qua Billing Dashboard, Cost Allocation Tags, Cost and Usage Report, Cost Explorer và cả Data Exports.

---

### 🧾 Billing Dashboard — bức tranh mức cao

**Billing Dashboard** cho bạn xem toàn bộ chi phí trong tháng, số **forecast (dự báo)** và số **month-to-date (từ đầu tháng đến nay)**. Đây là công cụ mức cao (high level), rất phù hợp để có cái nhìn tổng quan nhanh.

Cách truy cập: bấm vào góc trên bên phải → **Billing and Cost Management**, hoặc gõ **billing** vào thanh tìm kiếm. Trong dashboard, các bạn sẽ thấy:

* **Biểu đồ chi phí theo tháng** kèm thông tin month-to-date.
* **Chi phí tháng trước** và **tổng dự báo**.
* **Bảng chi tiết chi phí theo dịch vụ, theo tháng** — ví dụ tài khoản demo của mình phát sinh chi phí Amazon RDS trong tháng 11 và 12.
* Bộ lọc để **group by service, account, region...** và drill down sâu hơn.

---

### 🏷️ Cost Allocation Tags và Resource Groups

Muốn phân tích chi tiết hơn nữa, các bạn dùng **cost allocation tags (tag phân bổ chi phí)**. Tag giúp bạn theo dõi chi phí ở mức chi tiết, nhóm các khoản chi lại, rồi **export báo cáo chi phí theo category ra file Excel**.

Có hai loại tag:

* **AWS-generated tags** — AWS tự động gắn vào tài nguyên bạn tạo, bắt đầu bằng prefix `aws:`, ví dụ `aws:createdBy`.
* **User tags** — do bạn tự định nghĩa, bắt đầu bằng prefix `user:`.

Nhờ đó bạn có thể nhóm chi phí theo **cost center, tag, owner, stack, application**... Tag còn dùng để **tổ chức tài nguyên**: EC2 instances, images (AMI), load balancers, security groups, RDS databases, VPC resources, Route 53, IAM users... Đặc biệt, tài nguyên tạo qua **CloudFormation** sẽ được gắn tag giống nhau — như các bạn đã thấy ở bài hands-on CloudFormation.

Cách đặt tên tag là tự do, nhưng các tên phổ biến gồm: **name, environment, team, cost center**. Từ các tag này, bạn tạo **resource groups (nhóm tài nguyên)** để quản lý và xem một tập tài nguyên chung tag, đồng thời chỉnh sửa bằng **Tag Editor**.

Trong console, mình gõ **resource groups** để vào **Resource Groups & Tag Editor**:

1. Mở **Tag Editor**, chọn resource type là **security groups của EC2**.
2. Search resources → tìm thấy các security group.
3. **Manage tags** cho các tài nguyên đã chọn → thêm tag **department = IT** → **Review and apply**.

Sau đó tạo **resource group dạng tag-based**: chọn resource type (hoặc all resource types), điều kiện tag **department = IT**, preview thấy **5 security group** vừa gắn tag, đặt tên nhóm là **IT-resources** rồi bấm **Create group**. Cuối cùng, vào mục **Cost Allocation Tags** ở menu bên trái để **activate** tag — từ đó bạn có thể generate report theo đúng tag do mình định nghĩa.

---

### 📑 Cost and Usage Report — bộ dữ liệu đầy đủ nhất

**Cost and Usage Report (CUR)** cho bạn "đào sâu" vào chi phí và mức sử dụng, và đây là **bộ dữ liệu cost & usage toàn diện nhất trên AWS**:

* Bao gồm toàn bộ **metadata** về dịch vụ, giá cả và reservation — ví dụ thông tin sử dụng **EC2 Reserved Instances**.
* Chi tiết mức sử dụng của từng **service category** theo từng account và IAM user, dưới dạng **line item theo giờ hoặc theo ngày**.
* Kèm mọi tag bạn đã activate cho mục đích cost allocation.
* Có thể **tích hợp và phân tích bằng Athena, Redshift hoặc QuickSight** (công cụ dashboard).

Vì là báo cáo **chi tiết nhất (most granular)**, nó mô tả mọi khoản chi: **khi nào phát sinh, vì sao phát sinh** và mô tả của khoản chi đó — cực hữu ích khi bạn cần hiểu một dòng hóa đơn đến từ đâu.

---

### 🎛️ Cost Explorer — trực quan và dự báo 12 tháng

**Cost Explorer** là công cụ **trực quan hơn**, giúp visualize, hiểu và quản lý chi phí theo thời gian. Bạn có thể tạo **custom report**, xem tổng chi phí theo tất cả account, theo tháng, theo giờ hoặc theo từng tài nguyên.

Điểm "ăn tiền" nhất: **Cost Explorer dự báo mức sử dụng tới 12 tháng** dựa trên dữ liệu quá khứ — *đây chính là một câu hỏi trong đề thi!* Nếu đề hỏi "công cụ nào dự báo hóa đơn 12 tháng tới?", đáp án là **Cost Explorer**.

Ngoài ra, Cost Explorer còn gợi ý **Savings Plans tối ưu** để giảm hóa đơn — một lựa chọn thay thế cho Reserved Instances.

| Tiêu chí | Cost Explorer | Cost and Usage Report |
|---|---|---|
| Thế mạnh | Trực quan, dễ đọc | Chi tiết và đầy đủ nhất |
| Mức độ | Tổng quan (high level) | Từng line item theo giờ/ngày |
| Dự báo | Tới 12 tháng | Không |
| Phân tích kèm | Gợi ý Savings Plans | Athena, Redshift, QuickSight |

---

### 📤 Data Exports và report library

Trong mục **Cost Analysis** có **Data Exports** — nơi export cost and usage report. Quy trình:

1. Tạo một **exporting dashboard**.
2. Chọn **standard data export**, đặt **export name**.
3. Chọn nội dung cần export, **time granularity** và các **cột** muốn có.
4. Chọn định dạng file — **CSV hoặc Parquet**, có ghi đè file cũ hay không.
5. Chọn **S3 bucket** đích — thế là xong.

Dữ liệu này có thể phân tích bằng công cụ bạn thích hoặc **Athena**. Còn nếu chỉ muốn dùng công cụ chuẩn của AWS, hãy dùng **Cost Explorer**: xem chi phí theo thời gian, tải bảng CSV, đổi tham số báo cáo, và **lưu báo cáo vào report library** để truy cập nhanh từ menu bên trái.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Công cụ nào cho phép dự báo chi phí tới 12 tháng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cost Explorer.

Giải thích: Đây là điểm rất hay được hỏi trong đề thi.

Tham chiếu: Mục Cost Explorer.

</details>

**Câu 2:** Tag do AWS tự động gắn bắt đầu bằng prefix nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `aws:` — ví dụ `aws:createdBy`.

Giải thích: User tags do bạn tự định nghĩa thì bắt đầu bằng `user:`.

Tham chiếu: Mục Cost Allocation Tags.

</details>

**Câu 3:** Báo cáo nào là bộ dữ liệu đầy đủ nhất và phân tích được bằng Athena, Redshift, QuickSight?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cost and Usage Report (CUR).

Giải thích: Đây là báo cáo chi tiết nhất (most granular) trên AWS.

Tham chiếu: Mục Cost and Usage Report.

</details>

**Câu 4:** Billing Dashboard hiển thị những thông tin gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Tổng quan chi phí trong tháng, month-to-date, chi phí tháng trước và tổng dự báo.

Giải thích: Đây là công cụ mức cao để nhìn nhanh tình hình.

Tham chiếu: Mục Billing Dashboard.

</details>

**Câu 5:** Data Exports hỗ trợ những định dạng file nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** CSV hoặc Parquet.

Giải thích: Bạn chọn định dạng, cột, time granularity và S3 bucket đích khi export.

Tham chiếu: Mục Data Exports.

</details>

---

Vậy là các bạn đã nắm được bộ công cụ theo dõi chi phí: từ cái nhìn tổng quan với Billing Dashboard, phân loại chi tiết bằng tag, cho đến các báo cáo chuyên sâu.

Ở bài tiếp theo, chúng ta chuyển sang **giám sát chi phí với Billing Alarms và AWS Budgets** — để AWS tự cảnh báo khi hóa đơn vượt ngưỡng. Hẹn gặp các bạn ở đó! 🚀
