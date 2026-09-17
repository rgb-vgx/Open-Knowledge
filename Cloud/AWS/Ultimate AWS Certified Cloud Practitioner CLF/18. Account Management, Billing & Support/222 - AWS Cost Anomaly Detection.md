# 🧠 AWS Cost Anomaly Detection: Bắt trọn mọi khoản chi bất thường

> Nguồn: `222-AWS-Cost-Anomaly-Detection.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/36566072)

Bài này ngắn thôi nhưng cực kỳ thú vị: **AWS Cost Anomaly Detection** — đúng như tên gọi, dịch vụ này giúp bạn phát hiện những khoản chi "lạ" trong tài khoản AWS. *Đây là dạng câu hỏi rất dễ xuất hiện trong đề, nên các bạn chú ý nhé.*

---

### 🔍 Học từ chính lịch sử chi tiêu của bạn

**AWS Cost Anomaly Detection** liên tục **giám sát dữ liệu chi phí và mức sử dụng** của bạn, rồi dùng **machine learning (học máy)** để phát hiện các khoản chi bất thường.

Điểm hay là dịch vụ này **tự học**:

* Nó học **các pattern (mẫu) chi tiêu lịch sử riêng** của bạn.
* Từ đó phát hiện **cost spike một lần (one-time cost spikes)** và/hoặc **mức tăng chi phí liên tục (continuous cost increases)**.
* Bạn **không cần định nghĩa gì cả** — không cần đặt threshold (ngưỡng). Dịch vụ tự biết điều gì là "bất thường".

---

### 🎯 Giám sát phạm vi rộng

Cost Anomaly Detection có thể theo dõi:

* **AWS services** của bạn.
* **Member accounts (tài khoản thành viên)** trong tổ chức.
* **Cost allocation tags**.
* **Cost categories**.

Nhờ đó, dù chi phí bất thường đến từ dịch vụ nào hay tài khoản nào, bạn đều có cơ hội phát hiện kịp thời.

---

### 📬 Báo cáo và thông báo

Khi phát hiện bất thường, dịch vụ sẽ gửi **anomaly detection report** kèm **root cause analysis (phân tích nguyên nhân gốc)** — cho bạn biết chuyện gì đang xảy ra trong tài khoản.

Bạn có thể chọn cách nhận thông báo:

* **Individual alerts (cảnh báo riêng lẻ)** cho từng sự việc.
* **Daily hoặc weekly summary (tổng hợp hằng ngày/hằng tuần)** — cả hai đều dùng **SNS**.

Tóm lại: dùng machine learning, bạn xem được chi phí, nhận cảnh báo và phân tích nguyên nhân nhanh chóng — tất cả trong một dịch vụ.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Cost Anomaly Detection dùng công nghệ gì để phát hiện bất thường?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Machine learning (học máy).

Giải thích: Dịch vụ học pattern chi tiêu lịch sử của bạn để nhận diện điều bất thường.

Tham chiếu: Mục Học từ lịch sử chi tiêu.

</details>

**Câu 2:** Bạn có phải đặt threshold cho dịch vụ này không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không — dịch vụ tự biết điều gì là bất thường.

Giải thích: Đây là điểm khác biệt so với billing alarm hay budget.

Tham chiếu: Mục Học từ lịch sử chi tiêu.

</details>

**Câu 3:** Dịch vụ phát hiện những loại bất thường nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cost spike một lần và/hoặc mức tăng chi phí liên tục.

Giải thích: Cả hai kiểu biến động đều được theo dõi.

Tham chiếu: Mục Học từ lịch sử chi tiêu.

</details>

**Câu 4:** Dịch vụ giám sát những phạm vi nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** AWS services, member accounts, cost allocation tags và cost categories.

Giải thích: Phạm vi giám sát khá rộng trong tài khoản.

Tham chiếu: Mục Giám sát phạm vi rộng.

</details>

**Câu 5:** Bạn nhận thông báo qua những hình thức nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Individual alerts hoặc daily/weekly summary, đều thông qua SNS.

Giải thích: Bạn chọn cách nhận phù hợp với nhu cầu.

Tham chiếu: Mục Báo cáo và thông báo.

</details>

---

Vậy là chỉ với vài phút, các bạn đã nắm được một dịch vụ nhỏ nhưng rất "đắt giá" trong đề thi: **phát hiện chi tiêu bất thường bằng machine learning, không cần cấu hình threshold**.

Ở bài tiếp theo, chúng ta sẽ nói về **AWS Service Quotas** — làm sao để không bị "chạm trần" giới hạn dịch vụ. Hẹn gặp các bạn ở đó! 🚀
