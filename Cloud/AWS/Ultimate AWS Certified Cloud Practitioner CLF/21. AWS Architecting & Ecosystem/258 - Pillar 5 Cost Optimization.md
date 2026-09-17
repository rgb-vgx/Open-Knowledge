# 💰 Pillar 5 — Cost Optimization: giá trị cao nhất với chi phí thấp nhất

> Nguồn: `258-Pillar-5-Cost-Optimization.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20241396)

Ai cũng quan tâm đến tiền — và hôm nay chúng ta đến với trụ cột thứ năm: **Cost Optimization (tối ưu chi phí)**. Đây là trụ cột cực kỳ thực dụng: vẫn chạy hệ thống, vẫn mang lại giá trị kinh doanh, nhưng với **mức giá thấp nhất có thể**.

*Đừng lo nếu bạn mới dùng AWS và sợ "cháy ví" — có rất nhiều công cụ giúp bạn kiểm soát.*

---

### 📌 Cost Optimization là gì?

Cost Optimization là **khả năng chạy hệ thống và mang lại giá trị kinh doanh ở mức giá thấp nhất có thể**. Nghe rất hợp lý, đúng không nào?

---

### 🧭 5 nguyên tắc thiết kế của Cost Optimization

1. **Chuyển sang mô hình tiêu dùng (consumption model):** trả tiền cho đúng thứ bạn dùng. Ví dụ, **AWS Lambda** — không dùng thì không trả tiền; ngược lại **RDS** — dù không dùng database, bạn vẫn trả tiền vì đã provisioning nó. Đây là một đánh đổi rất thú vị.
2. **Đo lường hiệu quả tổng thể:** dùng **CloudWatch** để biết bạn có đang tận dụng tài nguyên hiệu quả không.
3. **Ngừng chi tiền cho vận hành data center:** nhờ cloud, AWS lo hạ tầng cho bạn và bạn chỉ tập trung vào ứng dụng, hệ thống của mình.
4. **Phân tích và quy chi phí (analyze and attribute expenditure):** nếu không dùng **tags (thẻ)** trên tài nguyên AWS, bạn sẽ rất chật vật để biết ứng dụng nào đang "đốt" nhiều tiền. Tags giúp theo dõi chi phí từng ứng dụng, tối ưu theo thời gian và tính **ROI (tỷ suất hoàn vốn)** dựa trên số tiền nó mang lại.
5. **Dùng managed application-level services để giảm chi phí sở hữu:** vì dịch vụ managed vận hành ở **cloud scale (quy mô cloud)**, chúng có chi phí trên mỗi giao dịch/dịch vụ cực thấp. Chỉ cần **ba kỹ sư AWS** là có thể quản lý một ứng dụng phục vụ **5 triệu người** — sức mạnh của cloud scale là đây.

---

### 🛠️ Bộ công cụ tối ưu chi phí trên AWS

| Nhóm | Công cụ & cách dùng |
|---|---|
| Biết tiền đi đâu | AWS Budgets, các báo cáo chi phí tùy chỉnh, Cost Explorer, Reserved Instance reporting (đảm bảo Reserved Instance được dùng thật, không chỉ trả tiền cho chỗ không dùng) |
| Tài nguyên hiệu quả chi phí | Spot Instances (rẻ hơn đáng kể, có đánh đổi riêng), Reserved Instances (nếu biết dùng EC2 hơn một năm — thậm chí ba năm — thì tiết kiệm rất tốt), S3 Glacier (điểm giá thấp nhất cho dữ liệu archive) |
| Cân cung cầu | Auto Scaling, AWS Lambda cho hạ tầng serverless — tránh over-provisioning |
| Tối ưu theo thời gian | Trusted Advisor, Cost and Usage Report, đọc AWS News Blog |

Câu chuyện thật của mình về việc đọc News Blog: ngày trước, **ELB** nhận traffic HTTP và HTTPS nhưng **không thể redirect HTTP sang HTTPS**. Mình phải chạy thêm một ứng dụng phía sau chỉ để làm việc redirect, tốn tiền mỗi tháng. Rồi một ngày, News Blog thông báo: **ELB giờ có thể tự cấu hình redirect HTTP sang HTTPS**. Chỉ một tính năng mới mà tiết kiệm cho mình một khoản mỗi tháng — đọc tin tức cũng là cách tối ưu chi phí.

Một ví dụ nữa: nếu ứng dụng **DynamoDB** của bạn rất ít hoạt động, thay vì dùng **reserved capacity** với **WCU/RCU**, có thể dùng chế độ **on-demand** sẽ hợp lý hơn nhiều.

*Đừng lo nếu các khái niệm WCU/RCU còn mới — mình sẽ gặp lại chúng ở phần DynamoDB.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao Lambda thể hiện rõ mô hình "trả tiền cho thứ mình dùng"?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không dùng Lambda thì không trả tiền, trong khi RDS vẫn tính phí dù không dùng vì đã provisioning.

Giải thích: Đây là nguyên tắc consumption model.

Tham chiếu: Mục 5 nguyên tắc thiết kế của Cost Optimization.

</details>

**Câu 2:** Tags giúp gì cho quản lý chi phí?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Theo dõi chi phí của từng ứng dụng, tối ưu theo thời gian và tính ROI.

Giải thích: Không có tags thì rất khó biết ứng dụng nào tốn nhiều tiền.

Tham chiếu: Mục 5 nguyên tắc thiết kế của Cost Optimization.

</details>

**Câu 3:** Khi nào nên dùng Spot Instances?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khi cần tài nguyên rẻ hơn đáng kể và chấp nhận được các đánh đổi của nó.

Giải thích: Spot là lựa chọn cost-effective điển hình.

Tham chiếu: Mục Bộ công cụ tối ưu chi phí trên AWS.

</details>

**Câu 4:** Dịch vụ nào có mức giá thấp nhất cho dữ liệu archive?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** S3 Glacier.

Giải thích: Glacier được nhắc là điểm giá thấp nhất có thể.

Tham chiếu: Mục Bộ công cụ tối ưu chi phí trên AWS.

</details>

**Câu 5:** Khi ứng dụng DynamoDB ít hoạt động, nên chọn chế độ nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chế độ on-demand, thay vì reserved capacity với WCU/RCU.

Giải thích: Với ứng dụng ít hoạt động, on-demand hợp lý hơn về chi phí.

Tham chiếu: Mục Bộ công cụ tối ưu chi phí trên AWS.

</details>

---

Tới đây chúng ta đã đi qua **5 trong 6 trụ cột** — và mình hy vọng các bạn thấy Well-Architected Framework rõ ràng hơn nhiều. *Kỳ thi sẽ không hỏi quá sâu về khung này, nhưng hiểu nó là nền tảng rất tốt cho một kiến trúc sư giải pháp.*

Nếu tò mò, mình khuyến khích các bạn đọc thẳng **whitepaper** của AWS nhé.

Ở bài tiếp theo, chúng ta gặp trụ cột cuối cùng: **Sustainability**. Hẹn gặp các bạn ở đó! 🚀
