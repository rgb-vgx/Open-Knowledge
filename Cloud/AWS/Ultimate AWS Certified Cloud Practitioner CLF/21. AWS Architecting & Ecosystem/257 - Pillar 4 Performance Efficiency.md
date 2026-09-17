# ⚡ Pillar 4 — Performance Efficiency: hiệu năng tốt, nhưng luôn có đánh đổi

> Nguồn: `257-Pillar-4-Performance-Efficiency.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20241394)

Trụ cột thứ tư của Well-Architected Framework là **Performance Efficiency (hiệu quả hiệu năng)**. Đây là câu chuyện về việc dùng tài nguyên tính toán một cách thông minh, và giữ được sự hiệu quả đó khi nhu cầu thay đổi và công nghệ tiến hóa.

*Đừng lo nếu phần này có nhiều lựa chọn khiến bạn rối — mình sẽ chỉ ra cách tư duy thay vì bắt bạn nhớ hết.*

---

### 📌 Performance Efficiency là gì?

Trụ cột này bao gồm **khả năng sử dụng tài nguyên tính toán hiệu quả để đáp ứng yêu cầu của hệ thống, và duy trì hiệu quả đó khi nhu cầu thay đổi cũng như khi công nghệ tiến hóa**.

Tinh thần cốt lõi: **thích nghi và mang lại hiệu năng tốt nhất có thể**.

---

### 🧭 5 nguyên tắc thiết kế của Performance Efficiency

1. **Dùng công nghệ tiên tiến (advanced technologies):** phổ cập hóa chúng cho team — khi dịch vụ mới ra đời, biết đâu nó sẽ giúp ích cho sản phẩm của bạn, nên hãy theo dõi.
2. **Go global trong vài phút:** nếu cần deploy ở nhiều region, thời gian phải tính bằng phút chứ không phải bằng ngày — ví dụ nhờ **CloudFormation**.
3. **Dùng serverless:** đây là **"trạng thái vàng" (golden state)** — bạn không phải quản lý server nào cả, mọi thứ tự scale cho bạn.
4. **Thử nghiệm thường xuyên hơn:** hôm nay thứ gì đó chạy tốt, nhưng có thể không chịu nổi tải gấp 10 lần — hãy thử kiến trúc serverless xem sao. Cứ thử đi!
5. **Mechanical sympathy (thấu hiểu công cụ):** phải biết về các dịch vụ AWS. Việc này rất khó — ngay cả mình cũng khó theo kịp mọi thứ — nhưng học khóa này và đọc blog là cách đúng để luôn "trên đỉnh cuộc chơi", vì thay đổi mới có thể làm thay đổi hoàn toàn kiến trúc giải pháp của bạn.

---

### 🛠️ Bốn nhóm việc: Selection — Review — Monitoring — Tradeoffs

**1. Selection (chọn công cụ):** Auto Scaling, Lambda, EBS, S3, RDS... — quá nhiều lựa chọn với các kiểu scale khác nhau. Lambda cho serverless, Auto Scaling cho EC2, EBS khi cần ổ đĩa (có thể quản lý hiệu năng qua loại volume **gp2** hoặc **io1**), S3 khi muốn scale toàn cầu, RDS khi provisioning database — và biết đâu sau này bạn muốn migrate lên **Aurora**.

**2. Review (xem xét lại):** CloudFormation giúp đảm bảo bạn có đúng thứ mình cần trước khi tạo; cập nhật cải tiến hiệu năng qua **AWS News Blog** — mình đọc nó mỗi tuần để biết có gì mới.

**3. Monitoring (giám sát):** **CloudWatch** với **CloudWatch Alarms**, **metrics**, **dashboards** giúp hiểu rõ hệ thống đang chạy ra sao; cùng với **AWS Lambda** — đảm bảo function không bị throttle và chạy trong thời gian tối thiểu.

**4. Tradeoffs (đánh đổi):** luôn tồn tại, và đây là bảng mình muốn các bạn ghi nhớ:

| Lựa chọn | Được gì | Đánh đổi gì |
|---|---|---|
| Snowball | Di chuyển rất nhiều dữ liệu với tốc độ cao | Có thể mất khoảng một tuần dữ liệu mới đến nơi; hoặc dùng hết băng thông mạng nếu muốn dữ liệu ngay |
| ElastiCache | Tăng hiệu năng đáng kể | Dữ liệu trong cache có thể cũ (stale) |
| CloudFront | Go global trong vài phút | Nội dung có thể bị cache tới một ngày trên máy người dùng — cập nhật website sẽ lâu đến tay người xem |
| RDS vs Aurora | Nhiều lựa chọn database phù hợp nhu cầu | Phải cân nhắc chi phí và tính năng giữa các lựa chọn |

*Đừng lo nếu bạn chưa dùng qua Snowball hay ElastiCache — điều quan trọng là nhớ: mọi quyết định hiệu năng đều có giá của nó.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** "Golden state" của Performance Efficiency là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dùng serverless — không quản lý server nào và mọi thứ tự scale.

Giải thích: Đây là nguyên tắc thiết kế thứ ba.

Tham chiếu: Mục 5 nguyên tắc thiết kế của Performance Efficiency.

</details>

**Câu 2:** "Đi global trong vài phút" ám chỉ điều gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Deploy ở nhiều region chỉ mất vài phút, không phải vài ngày — có thể nhờ CloudFormation.

Giải thích: Đây là nguyên tắc thiết kế thứ hai.

Tham chiếu: Mục 5 nguyên tắc thiết kế của Performance Efficiency.

</details>

**Câu 3:** Đánh đổi của ElastiCache là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hiệu năng tốt hơn nhưng dữ liệu trong cache có thể bị cũ (stale).

Giải thích: Bạn phải chọn giữa tốc độ và độ mới của dữ liệu.

Tham chiếu: Mục Bốn nhóm việc Selection — Review — Monitoring — Tradeoffs.

</details>

**Câu 4:** Vì sao CloudFront có thể làm chậm việc cập nhật website?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì nội dung có thể được cache tới một ngày trên laptop người dùng.

Giải thích: Go global nhanh nhưng phải chấp nhận độ trễ cache.

Tham chiếu: Mục Bốn nhóm việc Selection — Review — Monitoring — Tradeoffs.

</details>

**Câu 5:** "Mechanical sympathy" khuyên bạn điều gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Luôn nắm bắt các dịch vụ AWS (qua khóa học, blog...) vì công nghệ mới có thể thay đổi kiến trúc của bạn.

Giải thích: Đây là nguyên tắc thiết kế thứ năm.

Tham chiếu: Mục 5 nguyên tắc thiết kế của Performance Efficiency.

</details>

---

Vậy là trụ cột Performance Efficiency đã rõ: chọn đúng công cụ, theo dõi liên tục, cập nhật công nghệ và luôn ý thức về đánh đổi. *Hiệu năng nên nằm ở giữa mọi suy nghĩ khi bạn thiết kế giải pháp.*

Ở bài tiếp theo, chúng ta sẽ đến với trụ cột **Cost Optimization** — tối ưu chi phí. Hẹn gặp các bạn ở đó! 🚀
