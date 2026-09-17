# ☁️ Cloud Computing là gì? 5 đặc điểm và 6 lợi ích bạn phải nhớ

> Nguồn: `006-What-is-Cloud-Computing.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20262744)

Tiếp nối bài trước, hôm nay chúng ta trả lời câu hỏi quan trọng nhất của section: **Cloud Computing là gì?** Đây là khái niệm nền tảng và chắc chắn xuất hiện trong đề thi **CLF-C02**, nên các bạn hãy đọc kỹ nhé.

---

### 📖 Định nghĩa Cloud Computing

**Cloud computing là việc cung cấp tài nguyên theo nhu cầu (on-demand delivery)** — gồm **compute power (sức mạnh tính toán)**, **database storage (lưu trữ cơ sở dữ liệu)**, **application (ứng dụng)** và nhiều **IT resource** khác.

Từ khóa quan trọng nhất là **on-demand**: bạn có tài nguyên khi bạn cần. Thông qua một **cloud service platform**, bạn nhận mô hình **pay-as-you-go (trả theo mức dùng)**: chỉ trả cho thứ mình yêu cầu, tại thời điểm yêu cầu; đến khi dùng xong thì không phải trả nữa.

Bạn có thể **provision (cấp phát) đúng loại và đúng kích cỡ** tài nguyên mình cần:

* Cần server to? Có. Cần server nhỏ? Cũng có.
* Cần 10 cái? Được. Ngày mai chỉ cần 2 cái? Tất nhiên.

Mọi thứ diễn ra **tức thì** — không cần báo trước 24 giờ hay 2 giờ, không phải đặt hàng trước; muốn một server, bạn có nó **trong vài giây**. Cloud còn cung cấp một **giao diện thuận tiện** để truy cập server, storage, database và các application service.

Với **AWS (Amazon Web Services)**: chính AWS sở hữu và vận hành phần cứng kết nối mạng cần thiết cho các dịch vụ này, còn bạn chỉ việc provision và dùng những gì mình cần qua **web application**.

So với traditional IT: thay vì tự xây data center, bạn dùng cloud — cũng là data center, nhưng **không phải của bạn**. Bạn dùng server 1, 2, 3... tùy nhu cầu và trả tiền đúng cho những gì đã dùng.

---

### 🌍 Thật ra bạn đã dùng cloud từ lâu rồi

Cloud **hiện diện khắp nơi nhưng không phải lúc nào cũng hữu hình**. Bạn đã dùng nó mà có thể không hề biết:

* **Gmail** — một email cloud service; bạn chỉ trả cho lượng email đã lưu, và không phải provision server nào cả.
* **Dropbox, Google Drive, Google Photos, iCloud** — các cloud storage service. *Fun fact: Dropbox ban đầu được xây dựng trên AWS đấy!*
* **Netflix** — được xây dựng **hoàn toàn trên AWS** và cung cấp dịch vụ video on-demand.

Những dịch vụ này rất khác AWS, nhưng trong khóa học các bạn sẽ hiểu **bên trong chúng có gì** và AWS giúp bạn tự xây những dịch vụ tương tự như thế nào.

---

### 🏢 Private, Public và Hybrid cloud

Có nhiều loại cloud khác nhau, và mình giới thiệu 3 loại chính:

| Tiêu chí | Private cloud | Public cloud | Hybrid cloud |
|---|---|---|---|
| Ai dùng | Một tổ chức duy nhất, không mở ra công chúng | Khách hàng qua Internet | Kết hợp cả hai |
| Ví dụ | Rackspace | Microsoft Azure, Google Cloud, AWS | Hạ tầng on-premises + AWS cloud |
| Kiểm soát | Toàn quyền, bảo mật cao cho ứng dụng nhạy cảm | Nhà cung cấp thứ ba sở hữu và vận hành | Kiểm soát tài sản nhạy cảm tại chỗ |
| Điểm mạnh | Riêng tư, an toàn | Linh hoạt, 6 lợi ích, cost-effective | Vừa kiểm soát vừa linh hoạt, tiết kiệm chi phí |

* **Private cloud** — cloud dùng riêng cho một tổ chức, không exposed ra công chúng; bạn có data center riêng nhưng do người khác quản lý. Phù hợp cho ứng dụng nhạy cảm với yêu cầu kinh doanh đặc thù. *Nội dung này nằm ngoài phạm vi khóa học nhưng vẫn đáng để biết.*
* **Public cloud** — tài nguyên do nhà cung cấp thứ ba sở hữu và vận hành, được cung cấp qua Internet; bạn yêu cầu thứ mình cần từ AWS khi muốn.
* **Hybrid cloud** — *khái niệm quan trọng cho đề thi*: bạn giữ một số server **on-premises (tại chỗ)** và mở rộng một phần năng lực lên cloud. Bạn kiểm soát tài sản nhạy cảm trong hạ tầng riêng, đồng thời có **flexibility (linh hoạt)** và **cost effectiveness (hiệu quả chi phí)** của public cloud.

---

### 🔑 Năm đặc điểm của cloud computing

1. **Fully on-demand và self-service** — người dùng tự provision và dùng tài nguyên mà **không cần bất kỳ ai từ AWS can thiệp**.
2. **Broad network access** — tài nguyên sẵn có qua network và truy cập được theo nhiều cách khác nhau.
3. **Multi-tenancy và resource pooling** — không chỉ bạn mà nhiều khách hàng AWS khác cùng chia sẻ hạ tầng và ứng dụng, nhưng vẫn đảm bảo **security and privacy (bảo mật và riêng tư)**; nhiều khách hàng được phục vụ từ **cùng một nguồn lực vật lý**.
4. **Rapid elasticity and scalability** — tự động và nhanh chóng **acquire (thu nhận)** và **dispose (giải phóng)** tài nguyên, scale dễ dàng theo nhu cầu. Đây là lợi thế lớn của cloud.
5. **Measured service** — mức dùng được đo lường, bạn trả **đúng những gì đã dùng**. Đây là bước chuyển lớn so với on-premises.

---

### 💰 Sáu lợi ích của cloud computing

1. **Trade CAPEX lấy OPEX** — không sở hữu phần cứng mà trả theo nhu cầu, giúp giảm **TCO (Total Cost of Ownership — tổng chi phí sở hữu)** và chi phí vận hành. Nói ngắn gọn: **thuê** thay vì **mua**.
2. **Massive economies of scale** — vì có rất nhiều khách hàng cùng dùng, AWS ngày càng vận hành hiệu quả và **giảm giá theo thời gian**.
3. **Stop guessing capacity** — không phải đoán và mua server trước rồi hy vọng đủ tải; hệ thống **tự scale theo mức dùng thực tế**.
4. **Increased speed and agility** — tạo và vận hành mọi thứ ngay lập tức, không còn rào cản.
5. **Stop spending money running and maintaining data centers** — bỏ khoản chi phí khổng lồ để vận hành và bảo trì data center.
6. **Go global in minutes** — một đội chỉ **5 người** có thể tạo ứng dụng toàn cầu **trong vài phút** nhờ tận dụng hạ tầng toàn cầu của AWS.

Nhờ cloud, chúng ta giải quyết được hàng loạt vấn đề: **linh hoạt hơn, tiết kiệm chi phí hơn, scalable** (thêm tài nguyên khi cần), **elastic** (scale out và scale-in), **high availability và fault tolerance** (không phụ thuộc một data center mà dựa vào cả "đội quân" data center toàn cầu), và **agile** (phát triển, test, launch ứng dụng nhanh chóng).

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Từ khóa quan trọng nhất trong định nghĩa cloud computing là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** On-demand.

Giải thích: Bạn nhận tài nguyên khi cần, không phải đặt trước hay chờ đợi.

Tham chiếu: Mục Định nghĩa Cloud Computing.

</details>

**Câu 2:** Mô hình pay-as-you-go nghĩa là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ trả cho những gì mình yêu cầu, trong lúc dùng; dùng xong thì ngừng trả tiền.

Giải thích: Đây là điểm khác biệt lớn so với việc mua phần cứng trả trước.

Tham chiếu: Mục Định nghĩa Cloud Computing.

</details>

**Câu 3:** Hybrid cloud là gì và vì sao cần chú ý cho đề thi?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là sự kết hợp giữa private và public cloud — giữ một số server on-premises và mở rộng một phần lên cloud.

Giải thích: Mô hình này cho bạn kiểm soát tài sản nhạy cảm tại chỗ, đồng thời có flexibility và cost effectiveness của public cloud.

Tham chiếu: Mục Private, Public và Hybrid cloud.

</details>

**Câu 4:** Multi-tenancy và resource pooling nghĩa là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nhiều khách hàng cùng chia sẻ hạ tầng và ứng dụng, được phục vụ từ cùng nguồn lực vật lý, nhưng vẫn đảm bảo security và privacy.

Giải thích: Đây là đặc điểm thứ ba trong 5 đặc điểm của cloud computing.

Tham chiếu: Mục Năm đặc điểm của cloud computing.

</details>

**Câu 5:** Lợi ích "trade CAPEX lấy OPEX" nghĩa là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không sở hữu phần cứng nữa mà thuê theo nhu cầu, giúp giảm TCO và chi phí vận hành.

Giải thích: Thay vì mua hardware trả trước, bạn trả tiền theo mức dùng cho AWS.

Tham chiếu: Mục Sáu lợi ích của cloud computing.

</details>

---

Vậy là các bạn đã nắm được định nghĩa, 5 đặc điểm và 6 lợi ích của cloud computing — những kiến thức "ruột" của đề thi. *Cứ đọc lại vài lần, mọi thứ sẽ tự khắc in vào đầu.*

Ở bài tiếp theo, chúng ta tiến thêm một bước để phân biệt **các loại cloud computing**: IaaS, PaaS và SaaS. Hẹn gặp các bạn ở đó! 🚀
