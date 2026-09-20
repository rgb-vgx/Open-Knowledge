# 💾 Backup & Recovery — "lưới an toàn" cho dữ liệu khi mọi thứ khác thất bại

> Nguồn: `054-Backup-Recovery-Strategies.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49632065)

Bài này chúng ta sẽ tìm hiểu cách những chiến lược **backup (sao lưu)** và **recovery (khôi phục)** hiệu quả bảo vệ dữ liệu, giảm thiểu downtime và đảm bảo hệ thống phục hồi nhanh sau lỗi hoặc thảm họa. Đây là lớp phòng thủ cuối cùng của mọi kiến trúc — và cũng là chủ đề xuất hiện rất nhiều trong phỏng vấn system design.

---

### 🔍 Backup & recovery là gì? Vì sao replication một mình chưa đủ

Có một hiểu lầm phổ biến rằng **chỉ replication là đủ để bảo vệ dữ liệu** — không đúng. Nếu dữ liệu xấu bị nhân bản, hoặc **ransomware (mã độc tống tiền)** mã hóa file của bạn, **mọi replica đều có thể dính cùng vấn đề**. Đó là lúc backup và recovery trở nên thiết yếu.

* **Backup** tạo ra một **bản sao tại một thời điểm (point-in-time copy)** tách biệt của dữ liệu.
* **Recovery** là quá trình **khôi phục dữ liệu đó** khi có sự cố.

Cùng nhau, chúng tạo thành **lớp phòng thủ cuối cùng** chống lại việc xóa nhầm, hỏng dữ liệu, lỗi phần cứng và cả thảm họa quy mô lớn. Nói cách khác: **replication giữ service luôn sẵn sàng, còn backup và recovery đảm bảo dữ liệu thực sự có thể được mang trở lại khi mọi thứ khác thất bại**. Một kiến trúc kiên cường cần cả hai vận hành cùng nhau.

Vì sao backup quan trọng đến vậy? Vì **lỗi là điều tất yếu — vấn đề chỉ là khi nào, chứ không phải có hay không**. Disk hỏng, bug phần mềm làm hỏng dữ liệu, và cả server có thể đột ngột ngừng hoạt động. Không có backup, dữ liệu đó có thể **mất vĩnh viễn**.

Đáng chú ý là **không phải sự cố nào cũng đến từ công nghệ** — lỗi con người là một trong những nguyên nhân quan trọng nhất gây mất dữ liệu: một lần xóa nhầm, một cập nhật sai, hay một script cấu hình lỗi có thể **xóa sạch thông tin quan trọng trong vài giây**. Bên cạnh đó là các mối đe dọa bên ngoài: ransomware mã hóa dữ liệu production, thiên tai như hỏa hoạn, lũ lụt hay mất điện có thể hạ gục cả data center — trong cả hai trường hợp, **backup thường là cách duy nhất để phục hồi đáng tin cậy**.

Cuối cùng, backup không chỉ để phục hồi — nó còn là **yêu cầu tuân thủ (compliance)**. Nhiều ngành yêu cầu tổ chức lưu dữ liệu hàng tháng hoặc hàng năm; một chiến lược backup được thiết kế tốt giúp đáp ứng nghĩa vụ pháp lý, đồng thời đảm bảo doanh nghiệp tự tin phục hồi sau sự cố bất ngờ.

---

### 📦 Ba loại backup: full, incremental và differential

Khi thiết kế chiến lược backup, các bạn luôn phải cân bằng **ba yếu tố: chi phí lưu trữ, thời gian backup và tốc độ phục hồi**. Mỗi loại backup dưới đây tối ưu cho một ưu tiên khác nhau:

* **Full backup** — sao chép **toàn bộ dữ liệu mỗi lần**. Phục hồi rất đơn giản vì chỉ cần một bộ backup duy nhất, nhưng trade-off là **tốn dung lượng lưu trữ hơn và thời gian backup lâu hơn**.
* **Incremental backup** — chỉ lưu **các thay đổi kể từ lần backup gần nhất**, bất kể lần đó là full hay một incremental khác. Backup nhanh và tiết kiệm dung lượng hơn nhiều, nhưng **phục hồi phức tạp hơn**: bạn cần bản full gần nhất **cộng với mọi bản incremental tạo ra sau đó**.
* **Differential backup** — nằm giữa hai loại trên: lưu **tất cả thay đổi kể từ lần full gần nhất**. Càng nhiều ngày trôi qua, bản differential càng lớn, nhưng bù lại **phục hồi đơn giản hơn** — chỉ cần bản full gần nhất và bản differential mới nhất.

| Loại backup | Lưu gì | Backup | Phục hồi |
|---|---|---|---|
| Full | Toàn bộ dữ liệu mỗi lần | Lâu, tốn dung lượng | Đơn giản, chỉ cần 1 bộ |
| Incremental | Thay đổi từ lần backup gần nhất | Nhanh, tiết kiệm | Phức tạp: full + mọi incremental sau đó |
| Differential | Thay đổi từ lần full gần nhất | Lớn dần theo ngày | Đơn giản: full + differential mới nhất |

Trong hệ thống production, người ta rất thường **kết hợp các cách tiếp cận này**. Ví dụ: **full backup hàng tuần kèm incremental hàng ngày** tạo ra sự cân bằng thực tế giữa hiệu quả lưu trữ, hiệu năng backup và thời gian phục hồi.

---

### ♻️ Ba kiểu recovery: cold, warm và hot

Recovery không chỉ là khôi phục dữ liệu — nó còn là việc **doanh nghiệp có thể hoạt động trở lại nhanh đến đâu**. Chiến lược phù hợp phụ thuộc vào mức downtime tổ chức chịu được và mức đầu tư sẵn sàng bỏ ra:

* **Cold recovery** — backup được lưu an toàn, nhưng **hạ tầng chưa sẵn sàng**. Sau sự cố, server, database và ứng dụng phải được **dựng lại trước khi khôi phục dữ liệu**. Đây là lựa chọn **tiết kiệm chi phí nhất**, nhưng cũng có **downtime dài nhất**.
* **Warm recovery** — giải pháp trung gian: **một phần hạ tầng đã được cấp phát sẵn** và có thể đưa lên nhanh, phần còn lại được khôi phục từ backup. Cách này giảm thời gian phục hồi mà không tốn chi phí duy trì một môi trường standby hoạt động đầy đủ.
* **Hot recovery** — một **môi trường thứ cấp được đồng bộ hoàn toàn, luôn chạy và sẵn sàng tiếp quản ngay lập tức**. Downtime tối thiểu, là lựa chọn ưu tiên cho hệ thống mission-critical — đổi lại là **chi phí hạ tầng và vận hành cao nhất**.

| Kiểu recovery | Hạ tầng dự phòng | Downtime | Chi phí |
|---|---|---|---|
| Cold | Chưa sẵn sàng, phải dựng lại | Dài nhất | Thấp nhất |
| Warm | Một phần đã cấp phát sẵn | Trung bình | Trung bình |
| Hot | Môi trường đồng bộ, luôn chạy | Tối thiểu | Cao nhất |

Suy cho cùng, chọn cold, warm hay hot recovery là **một quyết định kinh doanh**: hệ thống càng chịu được downtime nhiều thì chi phí phục hồi càng thấp. Với những hệ thống mà **mỗi phút outage đều gây ảnh hưởng tài chính hoặc vận hành đáng kể**, đầu tư vào hot recovery thường là hoàn toàn hợp lý.

---

### 🎯 RTO, RPO và những trade-off không thể tránh

**RTO và RPO** là hai chỉ số quan trọng nhất trong disaster recovery, vì chúng định nghĩa **thế nào là phục hồi thành công từ góc nhìn kinh doanh**. Hai câu hỏi khác nhau nhưng quan trọng như nhau:

* **RTO (Recovery Time Objective)** — về **thời gian**: hệ thống phải được khôi phục **nhanh đến mức nào** sau outage. Nếu doanh nghiệp chỉ chịu được 1 giờ downtime, kiến trúc, automation và quy trình phục hồi của bạn phải đáp ứng được mục tiêu đó.
* **RPO (Recovery Point Objective)** — về **dữ liệu**: lượng dữ liệu tối đa bạn sẵn sàng **mất đi**. Ví dụ RPO 15 phút nghĩa là backup hoặc replication phải đảm bảo rằng, xấu nhất, chỉ 15 phút dữ liệu gần nhất có thể bị mất.

Hai mục tiêu này ảnh hưởng trực tiếp đến kiến trúc: **RTO và RPO càng ngắn càng đòi hỏi backup thường xuyên hơn, cơ chế phục hồi nhanh hơn, thêm hạ tầng và nhiều automation hơn**. Vì vậy, kiến trúc sư không xuất phát từ công nghệ — họ **bắt đầu từ yêu cầu kinh doanh**, rồi thiết kế giải pháp đáp ứng mục tiêu đó với chi phí chấp nhận được.

Không có chiến lược backup nào phù hợp cho mọi hệ thống, vì **mọi quyết định đều là trade-off** — và mục tiêu của kiến trúc sư không phải loại bỏ trade-off, mà là **chọn đúng trade-off cho doanh nghiệp**:

* **Chi phí vs tốc độ phục hồi**: phục hồi nhanh hơn thường cần backup thường xuyên hơn, thêm hạ tầng hoặc môi trường standby — tất cả đều làm tăng chi phí vận hành. Giải pháp rẻ hơn có thể hoàn toàn chấp nhận được nếu doanh nghiệp chịu được thời gian phục hồi dài hơn.
* **Độ phức tạp theo thời gian**: quyết định backup bao lâu một lần, giữ bao lâu, và **xác minh backup thực sự khôi phục được** ngày càng khó khi hệ thống lớn lên. Chiến lược backup nên **gắn với ưu tiên kinh doanh**: hệ thống hướng khách hàng quan trọng thường xứng đáng đầu tư cao hơn; yêu cầu kinh doanh quyết định chính sách lưu trữ; và độ trưởng thành của hạ tầng quyết định mức automation mà đội ngũ có thể vận hành thực tế.

Và đây là những **best practice** đã được kiểm chứng:

1. **Tự động hóa cả backup lẫn kiểm thử restore** — automation loại bỏ lỗi thủ công, còn kiểm thử restore thường xuyên xác nhận backup thực sự dùng được. *Một backup không thể khôi phục được thì thực chất không phải là backup.*
2. **Bảo mật** — backup nên được **mã hóa cả khi lưu (at rest) và khi truyền (in transit)**, và mọi job backup phải được giám sát: thành công, thất bại và dung lượng lưu trữ đều nên tạo alert để phát hiện vấn đề trước khi thành sự cố thật.
3. **Quy tắc 3-2-1** — duy trì **3 bản sao dữ liệu**, trên **ít nhất 2 loại lưu trữ khác nhau**, với **1 bản đặt off-site**. Chiến lược đơn giản này bảo vệ bạn khỏi lỗi phần cứng, xóa nhầm, ransomware và cả thảm họa toàn site.

```mermaid
flowchart LR
    A[3 bản sao dữ liệu] --> B[Ít nhất 2 loại lưu trữ]
    B --> C[1 bản đặt off-site]
```

Mục tiêu cuối cùng không chỉ là tạo ra backup — mà là đảm bảo tổ chức của bạn có thể **phục hồi nhanh, an toàn và tự tin** mỗi khi có sự cố.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao replication một mình không đủ để bảo vệ dữ liệu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì dữ liệu xấu hoặc ransomware có thể lan tới mọi replica, khiến tất cả đều dính cùng vấn đề.

Giải thích: Backup tạo bản sao point-in-time tách biệt; replication giữ service available nhưng không đảm bảo mang dữ liệu trở lại.

Tham chiếu: Mục Backup & recovery là gì? Vì sao replication một mình chưa đủ.

</details>

**Câu 2:** Để phục hồi từ incremental backup, bạn cần những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bản full gần nhất cộng với mọi bản incremental được tạo ra sau đó.

Giải thích: Vì vậy recovery phức tạp hơn, đổi lại backup nhanh và tiết kiệm dung lượng.

Tham chiếu: Mục Ba loại backup.

</details>

**Câu 3:** RTO và RPO khác nhau ở điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** RTO là mục tiêu về thời gian khôi phục hệ thống; RPO là lượng dữ liệu tối đa sẵn sàng mất.

Giải thích: RTO 1 giờ nghĩa là kiến trúc phải khôi phục trong 1 giờ; RPO 15 phút nghĩa là xấu nhất chỉ mất 15 phút dữ liệu.

Tham chiếu: Mục RTO, RPO và những trade-off không thể tránh.

</details>

**Câu 4:** Kiểu recovery nào đắt nhất và vì sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hot recovery — vì phải duy trì môi trường thứ cấp đồng bộ hoàn toàn, luôn chạy sẵn sàng tiếp quản.

Giải thích: Đổi lại, downtime ở mức tối thiểu nên đây là lựa chọn cho hệ thống mission-critical.

Tham chiếu: Mục Ba kiểu recovery.

</details>

**Câu 5:** Quy tắc 3-2-1 trong backup là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** 3 bản sao dữ liệu, trên ít nhất 2 loại lưu trữ khác nhau, với 1 bản đặt off-site.

Giải thích: Cách này bảo vệ khỏi lỗi phần cứng, xóa nhầm, ransomware và thảm họa toàn site.

Tham chiếu: Mục RTO, RPO và những trade-off không thể tránh.

</details>

---

Vậy là các bạn đã nắm được bức tranh backup & recovery: **backup là lưới an toàn cho dữ liệu**, các loại backup **full, incremental, differential** cân bằng giữa chi phí, thời gian và tốc độ phục hồi, còn **cold, warm, hot recovery** cùng **RTO/RPO** định hình mức đầu tư phù hợp với nghiệp vụ. Hãy nhớ câu chốt quan trọng nhất: **backup chỉ tốt bằng khả năng khôi phục của chúng — hãy kiểm thử restore thường xuyên.**

Ở bài tiếp theo, chúng ta sẽ đưa những khái niệm này vào thực tế: **disaster recovery trong production**, cách các tổ chức thiết kế chiến lược phục hồi hoàn chỉnh cho hệ thống thật. Hẹn gặp lại các bạn! 🚀
