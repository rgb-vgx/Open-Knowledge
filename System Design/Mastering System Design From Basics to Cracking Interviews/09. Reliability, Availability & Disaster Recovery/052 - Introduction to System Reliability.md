# 🛡️ Introduction to System Reliability — vì sao "không bao giờ lỗi" là mục tiêu sai lầm

> Nguồn: `052-Introduction-to-System-Reliability.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49632061)

Chào mừng các bạn đến với section mới: **Reliability, Availability & Disaster Recovery**. Trong section này, chúng ta sẽ cùng tìm hiểu cách những hệ thống hiện đại vẫn vận hành bất chấp lỗi — bắt đầu từ **reliability (độ tin cậy)**, rồi đi tới **high availability (tính sẵn sàng cao)**, **fault tolerance (khả năng chịu lỗi)** và **disaster recovery (khôi phục sau thảm họa)**. Mở màn, mình sẽ giúp các bạn hiểu reliability thực sự là gì, đo nó bằng gì, và vì sao nó là một quyết định kiến trúc chứ không phải thứ thêm vào cuối dự án.

---

### 🎯 Vì sao reliability là yêu cầu kinh doanh, không phải "tính năng cho vui"

Khi hệ thống lớn lên, **reliability không còn là thứ "có thì tốt"** — nó trở thành **yêu cầu sống còn của doanh nghiệp**.

* Người dùng không quan tâm đến kiến trúc bên trong. Họ chỉ mong ứng dụng **luôn sẵn sàng, phản hồi nhanh và đáng tin cậy** mỗi lần sử dụng.
* Dù là **online banking**, **e-commerce** hay **messaging**, chỉ vài phút downtime cũng đủ gây **thiệt hại tài chính, tổn thất uy tín** và — quan trọng nhất — **mất niềm tin của người dùng**.

Nhưng có một điều mình muốn các bạn ghi nhớ ngay: **reliability không phải là xây hệ thống không bao giờ lỗi** — điều đó là không thực tế. Trong **distributed systems (hệ phân tán)**, lỗi là điều tất yếu: server sập, network chập chờn, các dependency (thành phần phụ thuộc) ngừng hoạt động. Điều phân biệt một hệ thống được thiết kế tốt là **cách nó xử lý lỗi một cách duyên dáng** và **tốc độ khôi phục** sau lỗi. Đó chính là tư duy mà chúng ta sẽ xây dựng xuyên suốt section này.

*Đừng thiết kế cho một thế giới nơi không có gì lỗi — hãy thiết kế cho một thế giới nơi lỗi được dự liệu trước, được cô lập, và được khôi phục với ảnh hưởng tối thiểu tới người dùng.*

---

### 🧩 Reliability là gì? Và availability khác durability ở đâu?

Reliability là một phẩm chất mà người dùng **hiếm khi để ý khi mọi thứ chạy tốt**, nhưng **nhận ra ngay khi có vấn đề**. Ở tầng cốt lõi, reliability là **khả năng hệ thống tiếp tục vận hành đúng theo thời gian**, kể cả khi điều kiện thay đổi và lỗi xảy ra.

Điều đó vượt xa việc "giữ cho hệ thống online". Một hệ thống reliable phải:

* **Cho ra kết quả đúng**, hành xử nhất quán giữa các request.
* **Chịu được lỗi của từng thành phần** mà không gây outage (gián đoạn) diện rộng.
* **Duy trì uptime cao** để người dùng có thể tin tưởng bất cứ khi nào họ cần.

Hãy xem đây là những phẩm chất **bổ trợ cho nhau**, không phải các mục tiêu tách rời: một hệ thống luôn sẵn sàng nhưng trả về **dữ liệu sai** thì không reliable; một hệ thống chạy hoàn hảo nhưng **sập liên tục** cũng không reliable. Chỉ khi tất cả đặc tính này cùng vận hành, hệ thống mới mang lại **trải nghiệm đáng tin cậy** cho người dùng.

Một cặp khái niệm rất dễ bị nhầm lẫn là **availability** và **durability** — chúng giải quyết hai bài toán hoàn toàn khác nhau:

* **Availability** trả lời câu hỏi: *"Người dùng có truy cập được hệ thống ngay bây giờ không?"* Nếu ứng dụng online, phản hồi nhanh và đang phục vụ request, nó được coi là available.
* **Durability** trả lời câu hỏi khác: *"Dữ liệu còn an toàn không?"* Kể cả khi server sập hay cả service offline, hệ thống durable đảm bảo **dữ liệu đã ghi (committed data) không bị mất hoặc hỏng**.

| Tiêu chí | Availability | Durability |
|---|---|---|
| Câu hỏi | Người dùng truy cập được ngay bây giờ? | Dữ liệu còn an toàn? |
| Bảo vệ | Trải nghiệm người dùng | Dữ liệu người dùng |
| Khi server sập | Hệ thống có thể vẫn phục vụ | Dữ liệu đã ghi không mất, không hỏng |

Cách nhớ đơn giản: **availability bảo vệ trải nghiệm người dùng, durability bảo vệ dữ liệu của người dùng**. Lý tưởng nhất là có cả hai — một hệ thống sẵn sàng cao nhưng mất dữ liệu là điều không thể chấp nhận, còn một hệ thống durable hoàn hảo nhưng liên tục offline thì cũng chẳng ích gì. Xây hệ thống reliable chính là **thiết kế cho cả dịch vụ liên tục lẫn bảo vệ dữ liệu dài hạn**.

---

### 📊 Đo reliability bằng gì? MTBF, MTTR và SLA

Khi nói về reliability, kỹ sư không dựa vào cảm nhận — họ dựa vào **các chỉ số đo lường được**. Hai chỉ số quan trọng nhất là **MTBF** và **MTTR**:

* **MTBF (Mean Time Between Failures — thời gian trung bình giữa các lần lỗi)**: đo hệ thống vận hành được bao lâu trước khi gặp lỗi. MTBF càng cao thường cho thấy hệ thống càng ổn định và kiên cường.
* **MTTR (Mean Time to Recovery — thời gian phục hồi trung bình)**: đo tốc độ hệ thống được khôi phục sau khi lỗi xảy ra. Vì lỗi là tất yếu trong hệ phân tán, **giảm thời gian phục hồi quan trọng không kém việc ngăn lỗi ngay từ đầu**.

Các hệ thống reliable nhất **cân bằng cả hai chỉ số**: chúng ít lỗi, và khi lỗi thì phục hồi nhanh với ảnh hưởng tối thiểu. Vì vậy, cải thiện reliability không chỉ là giảm số lần lỗi — mà còn là **thiết kế để phục hồi nhanh và hiệu quả**.

Tiếp theo là **SLA (Service Level Agreement — thỏa thuận mức dịch vụ)**. SLA định nghĩa mức dịch vụ mà nhà cung cấp cam kết. Nó không chỉ là một mục tiêu kỹ thuật, mà là **lời hứa có thể đo lường với khách hàng**, kèm kỳ vọng hiệu năng rõ ràng. Ba chỉ số SLA phổ biến nhất là **availability** (truy cập được bao thường xuyên), **response time** (phản hồi nhanh đến mức nào) và **error rate** (xử lý request đáng tin đến đâu).

Điều quan trọng là phải hiểu những con số này thực sự nghĩa là gì: mục tiêu **99.9% availability** nghe rất cao, nhưng vẫn cho phép khoảng **8.76 giờ downtime mỗi năm**. Đó là lý do nhiều hệ thống mission-critical (trọng yếu) nhắm tới **99.99% hoặc thậm chí 99.999%**.

Với vai trò kiến trúc sư, SLA giúp chúng ta **dịch kỳ vọng kinh doanh thành mục tiêu kỹ thuật**. SLA ảnh hưởng trực tiếp đến các quyết định thiết kế về **redundancy (dư thừa), monitoring (giám sát), failover (chuyển đổi dự phòng) và recovery (khôi phục)** để hệ thống luôn đáp ứng đúng mức dịch vụ đã hứa.

---

### 🏗️ Reliability là quyết định kiến trúc — từ distributed đến cloud-native

Reliability **không phải thứ bạn thêm vào cuối dự án** — nó là thứ bạn thiết kế ngay từ đầu. Mọi quyết định kiến trúc lớn đều ảnh hưởng đến cách hệ thống hành xử khi lỗi xảy ra:

* **Redundancy** loại bỏ single point of failure (điểm lỗi đơn) bằng cách chạy nhiều instance và bật automatic failover.
* **Health check & monitoring** giúp phát hiện vấn đề sớm để quá trình khôi phục bắt đầu trước khi người dùng bị ảnh hưởng đáng kể.
* **Retry mechanisms** phục hồi từ các lỗi tạm thời khi giao tiếp với dịch vụ bên ngoài.
* **Circuit breakers (ngắt mạch)** ngăn lỗi lặp lại lan rộng ra toàn hệ thống.
* **Replication và quorum (đa số phiếu)** giữ dữ liệu sẵn sàng và kiên cường kể cả khi một số node trở nên không khả dụng.

Reliable systems không được xây từ một kỹ thuật duy nhất — chúng là kết quả của **nhiều pattern kiến trúc phối hợp cùng nhau** để dự liệu lỗi, cô lập ảnh hưởng và phục hồi nhanh với ít gián đoạn nhất.

**Trong hệ phân tán**, failures không còn là ngoại lệ — chúng là điều được chờ đợi. Khác với ứng dụng chạy trên một server, các bạn có nhiều máy giao tiếp qua network có thể chậm, không đáng tin, hoặc tạm thời không khả dụng. Những thách thức phổ biến gồm **network partitions** (chia cắt khiến một phần hệ thống bị cô lập), **node failures** (node hỏng làm service ngừng hoạt động), và **bài toán cân bằng giữa consistency (tính nhất quán) và availability**.

Trong nhiều hệ thống quy mô lớn, các bạn cũng sẽ gặp **eventual consistency (nhất quán sau cùng)**, khi các cập nhật lan truyền dần qua các replica thay vì xuất hiện tức thì ở mọi nơi. Thiết kế hệ phân tán reliable nghĩa là **chấp nhận những thực tế này thay vì cố loại bỏ chúng**: đưa ra quyết định thiết kế có chủ đích, cô lập lỗi để chúng không lan rộng, và nhân bản dữ liệu quan trọng. Với những thao tác cần nhiều node đồng thuận trên một trạng thái chung, các **thuật toán đồng thuận như Paxos và Raft** cung cấp cách phối hợp an toàn ngay cả khi có lỗi.

Điểm mấu chốt rất đơn giản: **trong hệ phân tán, reliability không đạt được bằng cách ngăn lỗi — mà bằng cách thiết kế hệ thống tiếp tục vận hành đúng bất chấp lỗi.**

**Trong kiến trúc cloud-native**, cách tư duy về reliability lại khác hơn nữa. Ở môi trường truyền thống, lỗi được coi là sự kiện hiếm gặp; trên cloud, chúng được **chờ đợi**. Virtual machine có thể biến mất, container có thể khởi động lại, network gặp sự cố tạm thời, và service có thể ngừng phục vụ không báo trước. Vì vậy, ứng dụng cloud-native được xây để **tự động xử lý lỗi tạm thời**: dùng **retries, timeouts và circuit breakers** thay vì thất bại ngay lập tức; dựa vào **auto-scaling** để thích ứng với tải thay đổi; và dùng **self-healing** để tự động thay thế instance không khỏe mạnh mà không cần can thiệp thủ công.

Và còn một thực hành quan trọng nữa: **kiểm chứng các giả định của bạn**. **Chaos engineering** chủ động đưa lỗi có kiểm soát vào môi trường giống production để xác minh hệ thống hành xử như mong đợi — giúp đội ngũ **phát hiện điểm yếu trước khi người dùng thật gặp phải**.

*"Đừng thiết kế hệ thống với giả định mọi thứ sẽ chạy tốt. Hãy thiết kế với giả định rằng sẽ có thứ gì đó lỗi."* Khi chấp nhận tư duy đó, hệ thống của các bạn sẽ trở nên kiên cường hơn hẳn trong môi trường production thực tế.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** MTBF đo điều gì và chỉ số cao có ý nghĩa gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** MTBF đo thời gian trung bình hệ thống vận hành trước khi gặp lỗi; MTBF cao cho thấy hệ thống ổn định và kiên cường hơn.

Giải thích: MTBF là một trong hai chỉ số đo reliability mà kỹ sư dùng thay cho cảm nhận.

Tham chiếu: Mục Đo reliability bằng gì? MTBF, MTTR và SLA.

</details>

**Câu 2:** Vì sao MTTR quan trọng không kém việc ngăn lỗi?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì trong hệ phân tán lỗi là tất yếu, nên tốc độ khôi phục quyết định mức ảnh hưởng tới người dùng.

Giải thích: Các hệ thống reliable nhất ít lỗi và khi lỗi thì phục hồi nhanh với ảnh hưởng tối thiểu.

Tham chiếu: Mục Đo reliability bằng gì? MTBF, MTTR và SLA.

</details>

**Câu 3:** Mục tiêu availability 99.9% thực chất cho phép bao nhiêu downtime mỗi năm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khoảng 8.76 giờ downtime mỗi năm.

Giải thích: Con số này nghe rất cao nhưng vẫn cho phép gần 9 giờ gián đoạn, nên hệ thống mission-critical thường nhắm 99.99% hoặc 99.999%.

Tham chiếu: Mục Đo reliability bằng gì? MTBF, MTTR và SLA.

</details>

**Câu 4:** Availability và durability trả lời hai câu hỏi khác nhau như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Availability hỏi "người dùng có truy cập được hệ thống ngay bây giờ không?"; durability hỏi "dữ liệu còn an toàn không?".

Giải thích: Availability bảo vệ trải nghiệm người dùng, durability bảo vệ dữ liệu người dùng — lý tưởng là có cả hai.

Tham chiếu: Mục Reliability là gì? Và availability khác durability ở đâu?

</details>

**Câu 5:** Chaos engineering giúp gì cho reliability?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chủ động đưa lỗi có kiểm soát vào môi trường giống production để xác minh hệ thống hành xử đúng và phát hiện điểm yếu trước người dùng thật.

Giải thích: Đây là cách kiểm chứng giả định — thay vì tin rằng mọi thứ sẽ chạy tốt, ta giả định sẽ có thứ gì đó lỗi.

Tham chiếu: Mục Reliability là quyết định kiến trúc — từ distributed đến cloud-native.

</details>

---

Vậy là chúng ta đã có nền tảng đầu tiên: **reliability là khả năng vận hành đúng bất chấp lỗi**, được đo bằng **MTBF, MTTR và SLA**, và là một **quyết định kiến trúc** chứ không phải phần thêm vào sau cùng. Hãy nhớ thông điệp lớn nhất: reliability không được định nghĩa bởi việc lỗi có xảy ra hay không, mà bởi **hệ thống của bạn tiếp tục phục vụ người dùng tốt đến đâu khi lỗi xảy ra**.

Ở bài tiếp theo, chúng ta sẽ xây tiếp trên nền tảng này với ba kỹ thuật cốt lõi giúp hệ thống hiện đại vẫn vận hành khi các thành phần gặp lỗi: **high availability, fault tolerance và failover**. Hẹn gặp lại các bạn! 🚀
