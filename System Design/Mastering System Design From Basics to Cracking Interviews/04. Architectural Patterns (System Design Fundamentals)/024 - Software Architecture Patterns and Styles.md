# 🏛️ Các mẫu kiến trúc phần mềm phổ biến — và vì sao không có lựa chọn nào "tốt nhất"

> Nguồn: `024-Software-Architecture-Patterns-Styles.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49456787)

Trong bài này, mình và các bạn sẽ đi qua những **software architecture pattern và style** phổ biến nhất: chúng sinh ra để giải bài toán gì, đánh đổi điều gì, và các kiến trúc sư chọn chúng dựa trên cơ sở nào. Đây là nền tảng để các bạn **suy luận thay vì học thuộc** — điều cực kỳ quan trọng trong phỏng vấn system design.

---

### 🏛️ Kiến trúc phần mềm — bản thiết kế của hệ thống

Khi nói về software architecture, chúng ta **không nói đến chi tiết triển khai ở mức code**, mà nói đến **cấu trúc bậc cao** của hệ thống: các **thành phần chính**, **trách nhiệm** của chúng, và cách chúng **phối hợp để mang lại giá trị kinh doanh**.

Các bạn có thể hình dung kiến trúc như **blueprint (bản thiết kế)** của một phần mềm. Giống như bản vẽ công trình quyết định cách tòa nhà được xây, mở rộng và bảo trì, kiến trúc phần mềm quyết định cách hệ thống tiến hóa theo thời gian. Nó thiết lập **ranh giới**, **mẫu giao tiếp**, và **cách tổ chức tổng thể** của giải pháp.

Vì sao điều này quan trọng? Vì rất nhiều phẩm chất chúng ta quan tâm trong production được quyết định phần lớn bởi kiến trúc, chứ không phải từng quyết định code riêng lẻ:

* Hệ thống có chịu được **lượng traffic gấp 10 lần** không?
* Đội ngũ có thể **thay đổi an toàn và nhanh chóng** không?
* Ứng dụng có giữ được **hiệu năng chấp nhận được** dưới tải không?

Qua nhiều năm, giới kỹ sư đã phát triển nhiều **architectural style** để giải các dạng bài toán khác nhau: **monolithic** (cả hệ thống là một đơn vị triển khai duy nhất), **layered** (tách biệt các mối quan tâm thành từng tầng), **client-server** (phân định rõ trách nhiệm giữa bên dùng và bên cung cấp service), **microservices** (các service độc lập, scale riêng) và **event-driven** (ưu tiên loose coupling, giao tiếp bất đồng bộ).

*Và đây là điều quan trọng nhất: không style nào tốt hơn style nào một cách phổ quát. Mỗi kiến trúc là một tập trade-off giữa **simplicity (đơn giản)**, **scalability**, **maintainability**, **operational complexity (độ phức tạp vận hành)** và **performance**.*

---

### 🧱 Monolithic — đơn giản là lợi thế, cho đến khi hệ thống lớn lên

**Monolithic architecture (kiến trúc khối đơn)** thường là nơi nhiều hệ thống bắt đầu — kể cả một số sản phẩm thành công nhất thế giới. Vì sao? Vì ở giai đoạn đầu, **sự đơn giản thường có giá trị hơn sự tinh vi về kiến trúc**.

Trong kiến trúc monolith, toàn bộ ứng dụng được xây và triển khai như **một đơn vị duy nhất**: giao diện người dùng, business logic, lớp truy cập dữ liệu và các chức năng phụ trợ cùng nằm trong một codebase, thường dùng chung một quy trình triển khai.

* **Điểm mạnh lớn nhất: sự đơn giản.** Dev, test, deploy và debug đều dễ hơn vì không có **distributed communication (giao tiếp phân tán)**, không cần **service discovery (cơ chế tìm service)**, không phải quản lý phụ thuộc giữa các service.
* Với **startup và đội ngũ nhỏ** muốn đi nhanh, sự đơn giản này là lợi thế rất lớn.
* Nhưng khi hệ thống lớn lên, chính ưu điểm đó biến thành giới hạn: **scale kém hiệu quả** vì chỉ một module gặp tải cao cũng buộc phải scale toàn bộ ứng dụng.
* Codebase lớn dần trở nên **khó hiểu, khó test, khó chỉnh sửa**, làm tăng rủi ro thay đổi chỗ này ảnh hưởng chỗ kia.
* Vì mọi thứ chạy như một khối, **một bug nghiêm trọng hay một sự cố có thể ảnh hưởng đến toàn bộ ứng dụng**.

Vì vậy, monolith phù hợp làm điểm khởi đầu cho doanh nghiệp nhỏ, startup và những hệ thống đơn giản. *Monolith không hề tệ về bản chất — nó chỉ được tối ưu cho **sự đơn giản và tốc độ**. Vấn đề nảy sinh khi hệ thống vượt qua giả định ban đầu mà monolith được thiết kế.*

---

### 📚 Layered N-Tier — tách trách nhiệm để quản lý phức tạp

**Layered architecture**, còn gọi là **N-tier architecture**, ra đời từ một vấn đề rất thực tế: khi ứng dụng lớn lên, việc trộn code giao diện, business rule và logic database vào cùng một chỗ trở nên cực kỳ khó quản lý. Giải pháp là **tách trách nhiệm thành các tầng riêng biệt**, mỗi tầng tập trung vào một mối quan tâm.

Trong một hệ thống layered điển hình:

* **Presentation layer** — xử lý tương tác với người dùng.
* **Business logic layer** — chứa các rule và workflow cốt lõi của ứng dụng.
* **Data layer** — quản lý giao tiếp với database và nơi lưu trữ ngoài.

Mỗi tầng có trách nhiệm được định nghĩa rõ ràng và giao tiếp qua những **interface được kiểm soát**, tạo nên cấu trúc có tổ chức và dễ bảo trì hơn.

* **Điểm mạnh lớn nhất: separation of concern (tách biệt mối quan tâm).** Trách nhiệm được chia rõ thì đội ngũ làm việc hiệu quả hơn, code dễ hiểu hơn, và thay đổi thường chỉ gói gọn trong một tầng.
* **Trade-off:** request phải đi qua nhiều tầng trước khi tới database rồi quay lại theo đúng lộ trình đó, có thể **tăng thêm latency (độ trễ)**. Theo thời gian, các tầng cũng có thể phụ thuộc chặt vào nhau, khiến việc thay đổi khó hơn thiết kế ban đầu mong muốn.

Dù vậy, layered architecture vẫn là một trong những pattern được dùng rộng rãi nhất: **CRM, hệ thống ngân hàng, các ứng dụng doanh nghiệp lớn** thường dùng cách tiếp cận này vì nó mang lại cấu trúc dễ dự đoán, cân bằng giữa maintainability, scalability và hiệu quả phát triển dài hạn.

*Điểm mấu chốt: layered architecture không nhằm mục đích chính là scalability — nó nhằm **quản lý độ phức tạp**.*

---

### 🧩 Microservices, event-driven và bài toán chọn kiến trúc

**Microservices architecture** trở nên phổ biến khi nhiều tổ chức nhận ra rằng một ứng dụng đơn khối rốt cuộc trở thành **nút thắt**, không chỉ cho hệ thống mà còn cho chính đội ngũ xây dựng nó. Khi sản phẩm lớn lên, các mảng kinh doanh khác nhau tiến hóa với tốc độ khác nhau, scale khác nhau và cần giải pháp kỹ thuật khác nhau.

Microservices giải quyết điều này bằng cách chia hệ thống thành **một tập hợp các service nhỏ, được quản lý độc lập**, mỗi service chịu trách nhiệm cho một **business capability (năng lực kinh doanh)** cụ thể — chẳng hạn nền tảng thương mại điện tử có các service riêng cho product, inventory, orders, payments và notification. Mỗi service có thể được **phát triển, triển khai, scale và bảo trì độc lập**, giúp đội ngũ đi nhanh hơn mà không phải phối hợp mọi thay đổi trên toàn hệ thống. Điểm mạnh chính là **sự độc lập**: scale theo tải riêng, chọn công nghệ phù hợp với domain, và cô lập lỗi thay vì để nó lan ra toàn ứng dụng.

Trade-off thì rất rõ: microservices **đổi độ phức tạp của ứng dụng lấy độ phức tạp của hệ phân tán**. Một lời gọi hàm đơn giản trước đây giờ thành **network call**; đội ngũ phải xử lý **service discovery, network latency, retry, monitoring, distributed tracing (truy vết phân tán)** và **data consistency** giữa nhiều service. **Operational excellence trở nên quan trọng ngang ngửa việc phát triển ứng dụng** — microservices thành công nhất khi có DevOps mạnh, tự động hóa, observability và đội ngũ trưởng thành.

**Event-driven architecture** ra đời để trả lời câu hỏi: làm sao cho nhiều phần của hệ thống **phản ứng với một sự việc** mà không cần kết nối chặt tất cả lại? Thay vì một component gọi component khác và chờ phản hồi, các component giao tiếp bằng cách **đẩy event (sự kiện)** — service chỉ thông báo rằng "đã có chuyện gì đó xảy ra", và những service quan tâm sẽ phản ứng độc lập. Ví dụ: khi một đơn hàng được đặt, event đó có thể kích hoạt cập nhật inventory, xử lý payment, gửi notification, phân tích dữ liệu và quy trình shipping — tất cả mà **order service không cần biết ai đang lắng nghe**.

* **Loose coupling là điểm mạnh lớn nhất:** các component tiến hóa độc lập, thêm consumer mới mà không phải sửa service hiện có.
* **Xử lý bất đồng bộ** giúp hệ thống vẫn phản hồi tốt dưới tải nặng — rất hiệu quả với môi trường traffic cao và thời gian thực.
* **Trade-off:** khó nắm bắt trọn vẹn luồng nghiệp vụ, debug cần distributed tracing và observability mạnh, và **data consistency** khó hơn — dẫn tới **eventual consistency (nhất quán sau cùng)** thay vì nhất quán tức thì.

Bảng đối chiếu nhanh bốn style chính:

| Kiến trúc | Đặc trưng | Điểm mạnh | Trade-off chính |
|---|---|---|---|
| Monolithic | Một đơn vị triển khai duy nhất | Đơn giản, dev/test/deploy dễ | Scale kém linh hoạt, khó bảo trì khi lớn |
| Layered N-Tier | Tách tầng presentation, business, data | Separation of concern, dễ tiến hóa | Thêm latency, tầng có thể phụ thuộc chặt |
| Microservices | Nhiều service độc lập theo nghiệp vụ | Scale và triển khai độc lập, cô lập lỗi | Phức tạp hệ phân tán, vận hành nặng |
| Event-driven | Giao tiếp qua event, bất đồng bộ | Loose coupling, phản hồi tốt dưới tải | Eventual consistency, khó debug |

Cuối cùng, **điều gì quyết định lựa chọn kiến trúc?** Sai lầm lớn nhất trong system design là **bắt đầu từ một kiến trúc rồi đi tìm bài toán cho nó**. Kiến trúc sư có kinh nghiệm làm ngược lại: **bắt đầu từ yêu cầu** và để yêu cầu dẫn dắt quyết định.

1. **Business need (nhu cầu kinh doanh)** — yếu tố đầu tiên và quan trọng nhất. Một startup đang kiểm chứng ý tưởng và một nền tảng toàn cầu phục vụ hàng triệu người có thể giải bài toán kinh doanh tương tự, nhưng cần cách tiếp cận kiến trúc rất khác nhau.
2. **Scalability** — không phải hệ thống nào cũng cần xử lý hàng triệu request mỗi giây. Cần hiểu traffic dự kiến, khối lượng dữ liệu, dự báo tăng trưởng và tải đỉnh. *Over-engineering cho tương lai cũng tốn kém chẳng kém gì under-engineering cho hiện tại.*
3. **Performance** — mỗi hệ thống có kỳ vọng khác nhau: người dùng có thể chờ vài giây khi tạo báo cáo, nhưng không thể chờ khi thanh toán hay đặt lệnh giao dịch. Yêu cầu hiệu năng phải được hiểu sớm.
4. **Maintainability** — phần mềm dành nhiều thời gian để bị chỉnh sửa hơn là được xây lần đầu; kiến trúc nên **hỗ trợ thay đổi thay vì chống lại nó**.

*Bài học then chốt: chọn kiến trúc bản chất là một bài tập trade-off. Không có kiến trúc tốt nhất cho mọi nơi — chỉ có kiến trúc cân bằng tốt nhất giữa nhu cầu kinh doanh, yêu cầu scale, kỳ vọng hiệu năng và khả năng bảo trì dài hạn cho một hệ thống cụ thể. Các kiến trúc sư giỏi không bắt đầu từ giải pháp; họ bắt đầu từ yêu cầu.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao monolithic architecture thường là điểm khởi đầu tốt cho nhiều hệ thống?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì sự đơn giản — dev, test, deploy, debug đều dễ, không có giao tiếp phân tán hay service discovery.

Giải thích: Với startup và đội ngũ nhỏ, sự đơn giản có giá trị hơn sự tinh vi kiến trúc.

Tham chiếu: Mục Monolithic — đơn giản là lợi thế, cho đến khi hệ thống lớn lên.

</details>

**Câu 2:** Layered architecture được thiết kế chủ yếu để giải quyết điều gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Quản lý độ phức tạp thông qua separation of concern — không phải chủ yếu để tăng scalability.

Giải thích: Trách nhiệm tách theo tầng presentation, business, data với interface được kiểm soát.

Tham chiếu: Mục Layered N-Tier — tách trách nhiệm để quản lý phức tạp.

</details>

**Câu 3:** Microservices đánh đổi điều gì để có được sự độc lập?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Đổi độ phức tạp ứng dụng lấy độ phức tạp hệ phân tán — network call, service discovery, latency, retry, tracing, data consistency.

Giải thích: Operational excellence trở nên quan trọng ngang với phát triển ứng dụng.

Tham chiếu: Mục Microservices, event-driven và bài toán chọn kiến trúc.

</details>

**Câu 4:** Điểm mạnh lớn nhất của event-driven architecture là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Loose coupling — service chỉ thông báo sự việc đã xảy ra, bên quan tâm tự phản ứng, thêm consumer mới không phải sửa service cũ.

Giải thích: Xử lý bất đồng bộ giúp hệ thống vẫn phản hồi tốt dưới tải nặng.

Tham chiếu: Mục Microservices, event-driven và bài toán chọn kiến trúc.

</details>

**Câu 5:** Kiến trúc sư có kinh nghiệm chọn kiến trúc bắt đầu từ đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bắt đầu từ yêu cầu (business need, scalability, performance, maintainability) rồi để yêu cầu dẫn dắt quyết định.

Giải thích: Bắt đầu từ một kiến trúc rồi đi tìm bài toán cho nó là sai lầm lớn nhất.

Tham chiếu: Mục Microservices, event-driven và bài toán chọn kiến trúc.

</details>

---

Vậy là các bạn đã nắm được bức tranh tổng quan về các mẫu kiến trúc: monolith, layered N-tier, microservices và event-driven — mỗi mẫu tối ưu cho một loại bài toán, và không có mẫu nào thắng tuyệt đối. Ở bài tiếp theo, chúng ta sẽ đi sâu vào **multi-tier architecture** — pattern đã trụ vững trong phần mềm doanh nghiệp suốt nhiều thập kỷ. Hẹn gặp lại các bạn! 🚀
