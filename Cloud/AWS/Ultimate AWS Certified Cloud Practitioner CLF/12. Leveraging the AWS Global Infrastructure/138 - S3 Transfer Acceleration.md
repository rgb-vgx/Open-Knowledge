# 🚄 S3 Transfer Acceleration: Tăng tốc upload xuyên lục địa

> Nguồn: `138-S3-Transfer-Acceleration.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20056132)

Như các bạn đã biết, **S3 bucket chỉ gắn với một region duy nhất**. Vậy nếu bạn muốn truyền file từ khắp nơi trên thế giới vào một bucket cụ thể thì sao? Câu trả lời là **S3 Transfer Acceleration** — và bài này khá ngắn gọn nhưng rất hay gặp trong đề thi.

*Tên dịch vụ đã nói lên tất cả: transfer (truyền file) acceleration (tăng tốc).*

---

### 📦 Vấn đề: bucket nằm ở một region duy nhất

Vì mỗi S3 bucket thuộc về một region, khi bạn có người dùng ở xa bucket — ví dụ upload từ Mỹ lên bucket đặt tại Australia — đường truyền sẽ chậm và kém ổn định hơn. Khi nhu cầu là **transfer file từ khắp thế giới về một bucket**, bạn cần một cách để tăng tốc.

---

### ⚡ S3 Transfer Acceleration hoạt động như thế nào?

Cách hoạt động rất thông minh:

1. File từ Mỹ **không được upload trực tiếp** tới bucket ở Australia.
2. Thay vào đó, file được upload vào **edge location gần người dùng nhất** (gần Mỹ).
3. Từ edge location, file được truyền tới **S3 bucket ở Australia qua mạng nội bộ của AWS** — kết nối **nhanh và đáng tin cậy hơn** nhiều.

```mermaid
flowchart LR
    U[Người dùng tại Mỹ] --> E[Edge Location gần nhất]
    E -->|Mạng nội bộ AWS| S3[S3 Bucket tại Australia]
```

Điểm cần nhớ: tính năng này **chỉ dùng khi bạn upload hoặc download file từ một bucket ở xa bạn**. Bucket càng xa, lợi ích càng rõ.

---

### 🧪 Kiểm chứng bằng công cụ speed test

AWS có sẵn một **công cụ speed test** cho phép bạn đo mức cải thiện thực tế. Công cụ sẽ chạy so sánh:

* Upload **trực tiếp** vào S3 bucket ở **US East 1**.
* Upload bằng **S3 accelerated transfer**.

Mình đang ghi hình từ **châu Âu**, nên **Northern Virginia** khá xa — do đó mình kỳ vọng transfer acceleration sẽ nhanh hơn. Nhưng các bạn lưu ý: **kết quả còn phụ thuộc vào vị trí của bạn và chất lượng đường truyền Internet** — có người sẽ thấy lợi ích rõ, có người thì không nhiều.

Kết quả thực tế của mình:

* Với Virginia, dùng S3 Transfer Acceleration **nhanh hơn khoảng 13%**.
* Công cụ tiếp tục test ở nhiều region khác: **San Francisco, Oregon, Dublin, Frankfurt, Tokyo, Seoul, Mumbai, Ohio, Canada**...
* Sau khi test xong, mình thấy tốc độ nhanh hơn ở **San Francisco, Oregon, Dublin** — *gần như nhanh hơn ở mọi nơi!*

---

### 💡 Khi nào nên dùng?

S3 Transfer Acceleration là cách rất tốt để **tăng tốc cả upload lẫn download vào Amazon S3**. Use case điển hình: bạn có một **ứng dụng toàn cầu cần upload file vào một S3 bucket cụ thể** — hãy bật transfer acceleration và để AWS lo phần còn lại.

*Nhớ nhé: bucket ở xa + cần truyền file toàn cầu = S3 Transfer Acceleration.*

---

Vậy là các bạn đã nắm được cách S3 Transfer Acceleration đưa file qua edge location rồi vào mạng nội bộ AWS để tới bucket đích. *Một dịch vụ nhỏ nhưng cực kỳ hữu ích cho ứng dụng toàn cầu.*

Ở bài tiếp theo, chúng ta tìm hiểu **AWS Global Accelerator** — dịch vụ giúp cải thiện availability và performance của ứng dụng toàn cầu. Hẹn gặp các bạn ở đó! 🚀
