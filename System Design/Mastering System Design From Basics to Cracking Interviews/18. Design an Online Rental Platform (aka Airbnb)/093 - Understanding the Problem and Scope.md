# 🏠 Design nền tảng cho thuê nhà: Hiểu bài toán & xác định phạm vi trước khi vẽ kiến trúc

> Nguồn: `093-Understanding-the-Problem-Defining-the-Scope.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49841677)

Chúng ta bắt đầu một case study mới: **thiết kế nền tảng cho thuê nhà trực tuyến**, kiểu Airbnb. Nhưng trước khi nghĩ đến database, API hay scalability, mình muốn các bạn dừng lại ở bước nền móng — **hiểu thật rõ bài toán đang cần giải**. Mọi thiết kế về sau chỉ có ý nghĩa khi nó phục vụ đúng bài toán này.

---

### 🎯 Bài toán & những tác nhân chính

Mục tiêu là xây một nền tảng cho thuê nhà trực tuyến, nơi **host (chủ nhà)** đăng chỗ ở và **guest (khách)** có thể khám phá, đặt và thanh toán cho những kỳ lưu trú ngắn hạn. Mọi thứ chúng ta thiết kế sau này đều phải phục vụ luồng nghiệp vụ cốt lõi đó.

Các năng lực thiết yếu ở trung tâm nền tảng:

* **Host** tạo listing (tin đăng), khai báo availability (lịch trống) và quản lý giá.
* **Guest** tìm kiếm nhanh, trực quan với bộ lọc như vị trí, giá, tiện nghi.
* Khi tìm được chỗ phù hợp, khách phải đặt được **với sự tin tưởng** — lịch trống chính xác và **double booking (đặt trùng)** bị ngăn chặn.
* Nền tảng xử lý **thanh toán an toàn**, hỗ trợ **review (đánh giá)** sau kỳ lưu trú, và cho host **tải lên ảnh/video chất lượng cao** giúp khách đưa ra quyết định đúng đắn.

Đây không phải những tính năng rời rạc — chúng phối hợp với nhau để tạo nên một trải nghiệm đặt phòng hoàn chỉnh.

```mermaid
flowchart LR
    H[Host tạo listing và giá] --> S[Guest tìm kiếm]
    S --> B[Guest đặt phòng]
    B --> P[Thanh toán]
    B --> R[Review sau kỳ lưu trú]
```

Các **tác nhân (actor)** tương tác với hệ thống gồm:

* **Guests** — tập trung vào việc khám phá và đặt chỗ ở.
* **Hosts** — quản lý tài sản, lịch, giá và media.
* **Hệ thống** — kiểm duyệt listing, xử lý người dùng bị báo cáo và thực thi chính sách, để nền tảng luôn đáng tin cậy.
* **Payment gateways (cổng thanh toán)** — xử lý giao dịch tài chính an toàn.
* **External calendar services (dịch vụ lịch bên ngoài)** như Google Calendar hay iCal — giữ lịch trống của host đồng bộ trên nhiều nền tảng đặt phòng.

Hiểu các tác nhân rất quan trọng, vì mỗi bên tương tác với hệ thống một kiểu khác nhau và đặt ra những yêu cầu khác nhau cho kiến trúc. Từ chính họ, ta sẽ suy ra những service cần xây, rồi định nghĩa ranh giới hệ thống và đưa ra các quyết định kiến trúc phù hợp.

---

### 🧩 Yêu cầu chức năng: hệ thống phải làm được gì?

**Functional requirements (yêu cầu chức năng)** là những năng lực cốt lõi mà nền tảng phải hỗ trợ, nhìn từ góc độ người dùng. Hãy để ý: đây là *cái gì*, chưa phải *làm thế nào*.

1. **Xác thực** — cả guest lẫn host đều tạo được tài khoản và đăng nhập an toàn.
2. **Host quản lý bất động sản** — tạo và cập nhật listing, tải lên ảnh/video, đặt giá và kiểm soát khả năng hiển thị. Nói cách khác, host có toàn quyền kiểm soát cách chỗ ở được giới thiệu và thời điểm có thể đặt.
3. **Guest khám phá và đặt chỗ** — tìm kiếm mạnh mẽ với bộ lọc, xem thông tin chi tiết cùng review, và trải nghiệm đặt phòng mượt mà kết thúc bằng thanh toán an toàn.
4. **Administrators (quản trị viên)** — duy trì chất lượng và độ tin cậy: quản lý người dùng, kiểm duyệt listing và review, xử lý nội dung bị báo cáo hoặc không phù hợp.

Ngoài ra còn những năng lực hỗ trợ rất cần thiết cho một nền tảng production-ready:

* **Calendar sync** với dịch vụ ngoài — giúp host tránh double booking khi quảng cáo cùng một chỗ ở trên nhiều nền tảng.
* **Notification (thông báo)** — giữ cả guest và host nắm được các sự kiện quan trọng: xác nhận booking, hủy, nhắc nhở và cập nhật thanh toán.

Các quyết định kiến trúc về sau — xây service nào, mở API nào, chọn database nào — sẽ đều được dẫn dắt bởi những yêu cầu chức năng này.

---

### ⚙️ Yêu cầu phi chức năng: hệ thống phải làm tốt đến mức nào?

Nếu yêu cầu chức năng nói hệ thống **làm gì**, thì **non-functional requirements (yêu cầu phi chức năng)** định nghĩa hệ thống phải **làm tốt đến đâu**. Trong thiết kế hệ thống quy mô lớn, những yêu cầu này thường ảnh hưởng đến kiến trúc còn mạnh hơn cả các tính năng.

* **Availability (tính sẵn sàng)** — nền tảng hoạt động quanh năm, người dùng đặt phòng ở mọi múi giờ. Vào dịp lễ hay cao điểm du lịch, downtime chuyển trực tiếp thành booking và doanh thu bị mất. Vì vậy high availability trở thành mục tiêu kiến trúc nền tảng.
* **Scalability (khả năng mở rộng)** — hệ thống phải chạy tốt từ vài nghìn đến hàng triệu người dùng, và tăng năng lực mà không cần thiết kế lại toàn bộ.
* **Security (bảo mật)** — nền tảng xử lý thông tin cá nhân lẫn giao dịch tài chính, nên bảo vệ dữ liệu người dùng và đảm bảo thanh toán an toàn là yêu cầu không thể thương lượng. *Bảo mật phải được đưa vào kiến trúc ngay từ đầu, chứ không phải gắn thêm về sau.*
* **Performance (hiệu năng)** — tìm kiếm là tính năng được dùng nhiều nhất và người dùng chờ kết quả gần như tức thì. Mục tiêu **dưới 300 milliseconds** cho các thao tác chính sẽ định hướng các quyết định về caching, indexing và truy cập dữ liệu.
* **Reliability (độ tin cậy)** — đặc biệt quan trọng với luồng booking: cùng một chỗ ở **không bao giờ** được đặt thành công bởi hai khách cho cùng một khoảng ngày. Duy trì logic booking nhất quán dưới độ đồng thời cao sẽ ảnh hưởng đến rất nhiều quyết định kiến trúc phía sau.
* **Localization (bản địa hóa)** — nền tảng toàn cầu: giá hiển thị theo nội tệ, ngày giờ theo múi giờ của người dùng, và giao diện theo ngôn ngữ họ chọn.

Điểm mấu chốt là: các yêu cầu phi chức năng này **không chỉ là những thuộc tính chất lượng**, chúng trở thành **architectural drivers (động lực kiến trúc)**. Gần như mọi quyết định lớn về sau — từ chọn service, xử lý dữ liệu đến mở rộng hệ thống — đều chịu ảnh hưởng của một hoặc nhiều yêu cầu trong số này.

---

### 📦 Giả định & ràng buộc: vẽ ranh giới cho thiết kế

Trong thiết kế hệ thống thực tế, không phải vấn đề nào cũng cần giải từ đầu. Một số trách nhiệm được giao cho hệ thống bên ngoài, số khác trở thành **ràng buộc** định hình kiến trúc.

* **Thanh toán do payment gateway bên thứ ba xử lý** — ta tích hợp với nhà cung cấp chuyên về xử lý thanh toán an toàn, thay vì tự xây và vận hành hạ tầng tài chính. Nhờ vậy thiết kế tập trung vào nền tảng cho thuê.
* **Review được kiểm duyệt bởi nền tảng** — nội dung do người dùng tạo cần đáng tin, nên admin phải có khả năng xem xét và xử lý nội dung không phù hợp hoặc mang tính lạm dụng.
* **Người dùng phải xác minh email** trước khi đặt phòng hoặc đăng listing — giúp giảm tài khoản giả và nâng cao độ tin cậy của marketplace.
* **Media lưu trong cloud object storage**, không nằm trong database ứng dụng — file media thường rất lớn, object storage phù hợp hơn hẳn để xử lý chúng một cách tin cậy và ở quy mô lớn.
* **Backend expose REST API** — người dùng truy cập từ cả web lẫn mobile, nên cần một giao diện nhất quán cho mọi client.
* **Nhất quán có chọn lọc** — kết quả tìm kiếm cần được cập nhật nhanh để người dùng khám phá listing theo thời gian thực; nhưng cập nhật availability sau một booking có thể chưa phản ánh tức thì ở mọi nơi. Một độ trễ nhỏ là chấp nhận được, *miễn là bản thân quá trình booking đảm bảo tính đúng đắn và ngăn double-booking*.

Những giả định này định nghĩa **ranh giới của hệ thống**: chúng đơn giản hóa một phần bài toán, đồng thời đặt kỳ vọng về cách hệ thống hành xử — cho phép ta tập trung các quyết định kiến trúc vào những vùng thực sự quan trọng.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Điều gì phải được đảm bảo để guest có thể đặt phòng "với sự tin tưởng"?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Lịch trống chính xác và double booking bị ngăn chặn.

Giải thích: Đây là hai điều kiện để trải nghiệm đặt phòng đáng tin cậy.

Tham chiếu: Mục Bài toán & những tác nhân chính.

</details>

**Câu 2:** Vì sao nền tảng cần calendar sync với các dịch vụ lịch bên ngoài?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì host có thể quảng cáo cùng chỗ ở trên nhiều nền tảng — sync giúp tránh double booking.

Giải thích: Google Calendar hay iCal là những dịch vụ được nhắc đến trong bài.

Tham chiếu: Mục Yêu cầu chức năng.

</details>

**Câu 3:** Mục tiêu hiệu năng cho các thao tác chính là bao nhiêu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dưới 300 milliseconds.

Giải thích: Mục tiêu này định hướng quyết định về caching, indexing và truy cập dữ liệu.

Tham chiếu: Mục Yêu cầu phi chức năng.

</details>

**Câu 4:** Giả định nào giúp thiết kế không phải tự xây hạ tầng tài chính?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Thanh toán được xử lý bởi payment gateway bên thứ ba.

Giải thích: Nhờ đó thiết kế tập trung vào nền tảng cho thuê thay vì hạ tầng thanh toán.

Tham chiếu: Mục Giả định & ràng buộc.

</details>

**Câu 5:** Vì sao media (ảnh, video) được lưu ở cloud object storage thay vì database?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì file media rất lớn, object storage phù hợp hơn để xử lý tin cậy và ở quy mô lớn.

Giải thích: Tách media khỏi storage có cấu trúc cũng giúp mỗi phần scale độc lập.

Tham chiếu: Mục Giả định & ràng buộc.

</details>

---

Vậy là chúng ta đã có nền móng: bài toán rõ ràng, tác nhân rõ ràng, yêu cầu và ràng buộc rõ ràng. Ở bài tiếp theo, chúng ta sẽ **ước lượng quy mô** của hệ thống — bao nhiêu người dùng, bao nhiêu listing, bao nhiêu terabyte media — và từ những con số đó nhận diện các điểm nghẽn. Hẹn gặp lại các bạn! 🚀
