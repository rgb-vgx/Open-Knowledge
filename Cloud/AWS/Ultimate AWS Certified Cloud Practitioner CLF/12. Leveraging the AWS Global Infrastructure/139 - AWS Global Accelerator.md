# 🌍 AWS Global Accelerator: Tăng tốc ứng dụng toàn cầu qua mạng riêng của AWS

> Nguồn: `139-AWS-Global-Accelerator.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056140)

Sau khi đã làm quen với edge location và mạng toàn cầu của AWS, giờ là lúc nói về **AWS Global Accelerator** — dịch vụ giúp cải thiện **khả năng sẵn sàng (availability)** và **hiệu năng (performance)** của ứng dụng toàn cầu. *Đây là chủ đề rất hay gặp trong đề thi, đặc biệt ở dạng so sánh với CloudFront*, nên các bạn chú ý nhé.

---

### 🚀 Global Accelerator hoạt động như thế nào?

Ý tưởng cốt lõi: request của người dùng được **định tuyến qua mạng nội bộ (internal network) của AWS** thay vì đi loanh quanh trên public internet, giúp **tối ưu route khoảng 60%**.

Ví dụ: ứng dụng của bạn deploy ở **Ấn Độ**, người dùng khắp thế giới truy cập. Với Global Accelerator:

* Người dùng kết nối tới **edge location gần nhất**.
* Edge location định tuyến traffic **trực tiếp về Ấn Độ**.
* Traffic trên public internet chỉ diễn ra giữa người dùng và edge location gần nhất — phần còn lại đi trên mạng riêng AWS, nhanh hơn nhiều.

Điều này đúng cho cả người dùng ở châu Âu, châu Úc hay bất kỳ đâu.

```mermaid
flowchart LR
    U[Người dùng toàn cầu] --> E[Edge location gần nhất]
    E --> N[Mạng riêng AWS]
    N --> A[Ứng dụng trong region]
```

---

### 📍 Hai static IP và cơ chế Anycast

Một điểm rất đặc biệt: bạn truy cập ứng dụng chỉ qua **hai static IP (IP tĩnh)** gọi là **Anycast IPs**.

* Với hai IP tĩnh này, người dùng được **tự động chuyển hướng** tới đúng edge location.
* Edge location sau đó gửi traffic về ứng dụng của bạn.

---

### ⚖️ Global Accelerator khác CloudFront ở đâu?

Đây là câu hỏi mình nhận được rất nhiều. Điểm chung trước tiên: cả hai đều dùng **mạng toàn cầu của AWS** và **edge location**, và đều **tích hợp với AWS Shield để chống DDoS**.

| Tiêu chí | CloudFront | Global Accelerator |
|---|---|---|
| Bản chất | Content Delivery Network (CDN) | Tăng tốc request qua mạng AWS |
| Cache tại edge | Có — cache images, videos, websites | Không cache |
| Luồng traffic | Nội dung được phục vụ ngay tại edge | Request đi tiếp về application trong region |
| Phù hợp với | Phân phối nội dung tĩnh | TCP/UDP, HTTP, cần static IP và failover nhanh |
| Chống DDoS | AWS Shield | AWS Shield |

Nói ngắn gọn: **CloudFront là CDN, cache nội dung tại edge**; còn **Global Accelerator không cache, giúp request đi nhanh hơn qua mạng nội bộ AWS**. Global Accelerator đặc biệt phù hợp khi bạn có **HTTP use case**, cần **static IP address**, hoặc cần **fast deterministic regional failover** cùng hiệu năng tốt.

---

### 📊 Đo tốc độ thực tế với công cụ so sánh

AWS có **speed comparison tool** cho phép upload/download file **5 MB** ở nhiều region, so sánh public internet với Global Accelerator. Mình đang ở châu Âu, và đây là kết quả:

* **Northern Virginia:** internet mất **1.293 ms**, Global Accelerator chỉ **1.002 ms — nhanh hơn 23%**.
* **Oregon:** cải thiện **31%**.
* **Ireland** (ngay cạnh mình): hiệu năng **như nhau** — vì "hàng xóm" thì đi đường nào cũng nhanh.
* **Frankfurt, Tokyo:** đều cho kết quả tốt hơn.
* **Singapore:** nhanh hơn **34%** — 5.000 ms so với 3,4 giây.
* **Sydney:** nhanh hơn tới **53%**.

Kết luận: region càng xa bạn, lợi ích của Global Accelerator càng lớn — vì request được đưa lên mạng riêng AWS càng sớm càng tốt.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Global Accelerator giúp tối ưu route khoảng bao nhiêu phần trăm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khoảng 60%.

Giải thích: Nhờ định tuyến qua mạng nội bộ AWS thay vì public internet.

Tham chiếu: Mục Global Accelerator hoạt động như thế nào.

</details>

**Câu 2:** Global Accelerator cung cấp cho bạn bao nhiêu IP tĩnh, gọi là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hai static IP, gọi là Anycast IPs.

Tham chiếu: Mục Hai static IP và cơ chế Anycast.

</details>

**Câu 3:** Khác biệt cốt lõi giữa CloudFront và Global Accelerator là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** CloudFront là CDN, cache nội dung tại edge; Global Accelerator không cache, chuyển request từ edge về application trong region.

Tham chiếu: Mục Global Accelerator khác CloudFront ở đâu.

</details>

**Câu 4:** Khi test file 5 MB, Sydney nhanh hơn bao nhiêu phần trăm với Global Accelerator?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 53%.

Tham chiếu: Mục Đo tốc độ thực tế.

</details>

**Câu 5:** Khi nào nên chọn Global Accelerator thay vì CloudFront?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khi cần static IP address, fast deterministic regional failover và hiệu năng tốt cho nhiều loại traffic TCP/UDP — đặc biệt khi không cần cache nội dung.

Tham chiếu: Mục Global Accelerator khác CloudFront ở đâu.

</details>

---

Vậy là các bạn đã nắm được cách Global Accelerator tăng tốc ứng dụng toàn cầu và phân biệt nó với CloudFront. *Nếu thấy hơi nhiều số liệu, đừng lo — chỉ cần nhớ nguyên lý: ra edge sớm, đi mạng riêng AWS, không cache.*

Ở bài tiếp theo, chúng ta sẽ tìm hiểu **AWS Outposts** — cách mang chính cloud AWS về data center của bạn. Hẹn gặp các bạn ở đó! 🚀
