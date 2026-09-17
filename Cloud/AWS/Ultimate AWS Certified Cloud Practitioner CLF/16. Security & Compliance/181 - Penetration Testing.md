# 🧪 Penetration Testing trên AWS: Được phép làm gì, cấm làm gì?

> Nguồn: `181-Penetration-Testing.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056314)

**Penetration testing (kiểm thử xâm nhập)** là khi bạn tự tấn công hạ tầng của chính mình để kiểm tra độ bảo mật. AWS hoàn toàn ủng hộ việc này — nhưng có những giới hạn bạn bắt buộc phải biết để không vi phạm.

---

### 🎯 Pen testing trên cloud là gì?

Hiểu đơn giản: bạn **tấn công hạ tầng của chính bạn** để xem nó có chịu được không. Khách hàng AWS **được hoan nghênh** thực hiện các đánh giá bảo mật và kiểm thử xâm nhập nhắm vào hạ tầng của mình.

Điểm quan trọng nhất về thủ tục: với một số dịch vụ nhất định, bạn **không cần xin phép trước** — nhưng với những hành vi nhìn giống tấn công thật, bạn sẽ bị coi là đang tấn công hạ tầng của AWS.

---

### ✅ Được phép test không cần xin phép trước

AWS cho phép bạn thực hiện security assessment và penetration testing **không cần approval (phê duyệt) trước** với **8 nhóm dịch vụ** sau:

* **Amazon EC2 instances** — máy chủ ảo
* **NAT Gateways** và **Elastic Load Balancers**
* **Amazon RDS**
* **CloudFront**
* **Aurora**
* **API Gateway**
* **Lambda** và **Lambda@Edge functions**
* **Lightsail resources** và **Elastic Beanstalk environments**

*Giảng viên nhấn mạnh danh sách này có thể tăng theo thời gian, và đây không phải nội dung bạn bị hỏi chi tiết trong đề thi — chỉ cần nhớ rằng nhóm dịch vụ này không cần xin phép trước.*

---

### 🚫 Những hành vi bị cấm

Ngược lại, các hoạt động sau **không được phép** vì với AWS, chúng trông như bạn đang tấn công hạ tầng của họ:

* **DNS zone walking** qua **Amazon Route 53 Hosted Zone**.
* **Distributed attack** trên hệ thống của bạn — bao gồm **DoS**, **DDoS**, **Simulated DoS** hoặc **Simulated DDoS**. Bạn không được dùng tấn công từ chối dịch vụ lên chính hạ tầng của mình.
* **Port flooding**.
* **Protocol flooding** và **request flooding** — các biến thể của tấn công.

Với **mọi hoạt động khác**, bạn cần **liên hệ đội ngũ security của AWS** để được phê duyệt trước khi thực hiện.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Bạn có được phép penetration testing trên hạ tầng của chính mình không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Có — AWS hoan nghênh khách hàng thực hiện security assessment và pen testing trên hạ tầng của mình.
Giải thích: Một số dịch vụ còn không cần xin phép trước, nhưng luôn có giới hạn cần tuân thủ.
Tham chiếu: Mục Pen testing trên cloud là gì.

</details>

**Câu 2:** Kể tên một vài dịch vụ bạn được pen test không cần xin phép trước.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** EC2, NAT Gateway, ELB, RDS, CloudFront, Aurora, API Gateway, Lambda và Lambda@Edge, Lightsail, Elastic Beanstalk.
Giải thích: Danh sách này có thể tăng theo thời gian và không bị hỏi chi tiết trong đề thi.
Tham chiếu: Mục Được phép test không cần xin phép trước.

</details>

**Câu 3:** DNS zone walking qua Route 53 Hosted Zone có được phép không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không được phép.
Giải thích: Với AWS, hành vi này trông giống như bạn đang tấn công hạ tầng của họ.
Tham chiếu: Mục Những hành vi bị cấm.

</details>

**Câu 4:** Bạn có thể tự chạy DDoS hoặc simulated DDoS lên hệ thống của mình không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không — mọi dạng distributed attack, DoS/DDoS và biến thể mô phỏng đều bị cấm.
Giải thích: Các hành vi này cũng gồm port flooding, protocol flooding, request flooding.
Tham chiếu: Mục Những hành vi bị cấm.

</details>

**Câu 5:** Nếu muốn thực hiện một hoạt động không nằm trong danh sách được phép, bạn cần làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Liên hệ đội ngũ security của AWS để được phê duyệt trước.
Giải thích: Chỉ khi có approval của AWS bạn mới nên tiến hành các hoạt động đó.
Tham chiếu: Mục Những hành vi bị cấm.

</details>

---

Tóm lại: **pen testing trên cloud là hợp lệ**, nhưng bất cứ thứ gì trông giống tấn công thật — **DDoS, DNS zone walking, port flooding** — đều **không được phép**. Các bạn chỉ cần nhớ nguyên tắc này là đủ cho đề thi.

Bài tiếp theo, chúng ta sẽ bước vào thế giới **mã hóa** với **KMS** và **CloudHSM**. Hẹn gặp các bạn ở đó! 🚀
