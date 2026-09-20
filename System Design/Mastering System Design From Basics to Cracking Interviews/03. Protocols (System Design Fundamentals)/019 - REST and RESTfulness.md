# 🧩 REST và RESTfulness — Nguyên tắc thiết kế API bền vững

> Nguồn: `019-REST-RESTfulness---API-Design-Principles.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49426845)

Trong bài này, mình và các bạn sẽ khám phá **REST và RESTfulness** — bộ nguyên tắc kiến trúc đã thay đổi cách thiết kế API, giúp web service trở nên **scalable (mở rộng được)**, **predictable (dễ đoán)** và dễ tích hợp giữa các hệ phân tán. Đây cũng là chủ đề phỏng vấn system design rất hay gặp, bởi nó kiểm tra tư duy thiết kế hơn là trí nhớ.

---

### 🧩 REST là gì và vì sao nó quan trọng?

REST trở nên phổ biến vì nó **tận dụng chính kiến trúc của web** thay vì phát minh một mô hình giao tiếp mới. Thay vì tạo ra giao thức riêng, REST xây trên `HTTP` và coi **mọi thứ là tài nguyên (resource)** — có thể được truy cập, tạo, cập nhật hoặc xóa thông qua một bộ thao tác nhất quán.

Một trong những lợi thế kiến trúc lớn nhất của REST là **statelessness (tính phi trạng thái)**: mỗi request mang theo đầy đủ ngữ cảnh cần thiết để xử lý, nên server **không cần giữ session state của client** giữa các request. Ở quy mô lớn, điều này:

* Đơn giản hóa **load balancing (cân bằng tải)**.
* Cải thiện **fault tolerance (khả năng chịu lỗi)**.
* Cho phép request được định tuyến tới **bất kỳ server instance nào** mà không cần phối hợp đặc biệt.

Điều làm mô hình REST của **Roy Fielding** trở nên có sức ảnh hưởng là nó ưu tiên **simplicity (đơn giản), scalability và interoperability (khả năng tương tác)**. Các hệ thống, công nghệ và ngôn ngữ lập trình khác nhau có thể giao tiếp bằng cùng những nguyên tắc dựa trên HTTP, giúp việc tích hợp dễ dàng hơn nhiều so với các cách tiếp cận gắn chặt (tightly coupled); *khi kiến trúc sư chọn REST, họ không chỉ chọn một phong cách API — họ chọn một bộ nguyên tắc thiết kế thúc đẩy scalability, loose coupling (tách rời lỏng) và maintainability (khả năng bảo trì)*. Đó cũng là lý do REST trở thành nền tảng của API web hiện đại và vẫn là một trong những khái niệm quan trọng nhất trong system design.

REST quan trọng vì nó giải quyết một bài toán mà **mọi hệ thống đang lớn lên đều gặp**: làm sao để hàng nghìn, thậm chí hàng triệu client giao tiếp với backend một cách **đơn giản, dễ đoán và mở rộng được**?

Thành công của REST đến từ việc **hòa mình vào chính web**:

* Vì xây trên HTTP chuẩn, lập trình viên **không cần học mô hình giao tiếp độc quyền** nào. Cùng một bộ nguyên tắc áp dụng cho mobile app, web app, tích hợp đối tác hay cloud service — sự nhất quán này giảm mạnh độ phức tạp phát triển và vận hành.
* **Interoperability**: client viết bằng Java, .NET, Python, JavaScript hay bất kỳ ngôn ngữ nào cũng tương tác được với cùng một REST API, vì hợp đồng giao tiếp dựa trên **chuẩn web được hiểu phổ quát**. Loose coupling cho phép các hệ thống **tiến hóa độc lập** mà không phá vỡ tích hợp.
* Về kiến trúc, REST **scale rất tốt**: request stateless cho phép phân tán traffic qua nhiều server với phối hợp tối thiểu, còn **caching** giảm các lời gọi mạng không cần thiết và hạ tải backend. Tất cả cùng cải thiện **performance** lẫn **reliability** khi nhu cầu tăng lên.

Chính sự kết hợp giữa **đơn giản, interoperability và scalability** đã đưa REST thành lựa chọn mặc định cho thiết kế API.

---

### 🏛️ Năm ràng buộc cốt lõi của REST

Sức mạnh của REST không đến từ HTTP đơn thuần, mà từ một **bộ ràng buộc kiến trúc** phối hợp với nhau để tạo ra hệ thống scalable và dễ bảo trì. Hãy coi đây là những "luật thiết kế" phân biệt một API **thực sự RESTful** với một API chỉ đơn thuần dùng HTTP:

1. **Client-server** — tách giao diện người dùng khỏi business logic và quản lý dữ liệu, để team frontend và backend tiến hóa độc lập. Sự tách biệt này càng giá trị khi ứng dụng càng phức tạp.
2. **Statelessness** — mỗi request **tự chứa đủ** nên bất kỳ server instance nào cũng xử lý được. Không phụ thuộc vào một máy cụ thể đang giữ session, giúp **horizontal scaling (mở rộng ngang)** và phục hồi lỗi đơn giản hơn rất nhiều.
3. **Cacheability** — nhiều request trả về cùng dữ liệu lặp lại; cho phép cache response sẽ **giảm latency cho người dùng** và bảo vệ backend khỏi tải không cần thiết.
4. **Layered system** — ứng dụng hiện đại hiếm khi giao tiếp trực tiếp với backend: REST thường đi qua **load balancer, gateway, proxy, lớp bảo mật, lớp caching**. Ràng buộc này cho phép mọi hệ trung gian tồn tại mà **không thay đổi trải nghiệm client**.
5. **Uniform interface** — cách nhất quán để định danh tài nguyên và tương tác với chúng giúp API **dễ đoán, dễ học và dễ tích hợp** giữa các team, các nền tảng.

Tổng hợp lại, chính những ràng buộc này giữ cho REST API vẫn hiệu quả khi hệ thống mở rộng từ vài người dùng lên **hàng triệu request mỗi ngày**.

---

### 🧱 Thiết kế RESTful API — resource là trung tâm

Thiết kế REST API không chỉ là phơi ra endpoint; đó là tạo một **interface giữ nguyên tính trực quan và bảo trì được khi hệ thống tiến hóa**. Thiết kế tốt giảm ma sát tích hợp, thiết kế kém tạo ra độ phức tạp dài hạn cho mọi bên tiêu thụ.

* **Nghĩ theo resource thay vì action.** Users, orders, products, invoices đều là tài nguyên; HTTP method mô tả thao tác được thực hiện lên tài nguyên đó. Sự tách biệt này tạo ra mô hình API sạch, dễ đoán mà lập trình viên hiểu được **không cần tài liệu dài dòng**.
* **Chọn đúng HTTP method.** Khi `GET` luôn truy xuất dữ liệu và `DELETE` luôn xóa tài nguyên, API trở nên **self-descriptive (tự mô tả)**. Tính nhất quán này cho phép lập trình viên, công cụ, gateway và hệ thống monitoring suy luận hành vi **mà không cần quy tắc riêng**.
* **Tương tác stateless** càng củng cố scalability: vì mỗi request chứa ngữ cảnh cần thiết — thường gồm cả **authentication token** — server xử lý request độc lập, giúp horizontal scaling, load balancing và phục hồi lỗi dễ hơn trong môi trường phân tán.
* **Nhất quán trong thiết kế URL** giúp API lớn dễ quản lý: đặt tên tài nguyên dễ đoán, **tránh endpoint kiểu action**, và **versioning (đánh phiên bản)** khi hợp đồng thay đổi để ngăn nhầm lẫn và breaking change.

Một REST API thiết kế tốt phải **có tính khám phá (discoverable)**: lập trình viên thường đoán được hành vi của endpoint trước cả khi đọc tài liệu. Khi review API, kiến trúc sư thường đánh giá đúng những phẩm chất này — **thiết kế xoay quanh resource, dùng đúng ngữ nghĩa HTTP, statelessness và tính nhất quán**.

Về **resource và endpoint**: resource đại diện cho **thực thể nghiệp vụ** trong hệ thống, còn endpoint là **địa chỉ** để client tương tác với thực thể đó. Hệ thống quản lý người dùng xoay quanh users; nền tảng thương mại điện tử xoay quanh products và orders; ứng dụng ngân hàng xoay quanh accounts và transactions. REST khuyến khích phơi trực tiếp các khái niệm domain này thay vì tạo API kiểu action.

*Endpoint trả lời câu hỏi "tôi đang làm việc với resource nào?"; HTTP method trả lời "tôi muốn làm gì với nó?". Sự tách biệt này tạo ra thiết kế sạch và dễ đoán — và cách nhanh nhất để nhận ra một REST API được thiết kế tốt là **mô hình resource của nó phản chiếu sát domain nghiệp vụ**. Hãy dành nhiều thời gian mô hình hóa resource đúng hơn là định nghĩa endpoint; mô hình resource mạnh sẽ tự nhiên dẫn tới API sạch, scalable và trực quan.*

---

### 📦 JSON vs XML trong REST API

Khi REST mới xuất hiện, cả **JSON** và **XML** đều được dùng rộng rãi để trao đổi dữ liệu giữa các hệ thống. Theo thời gian, JSON trở thành lựa chọn thống trị vì khớp với nhu cầu của ứng dụng web và mobile hiện đại.

| Tiêu chí | JSON | XML |
|---|---|---|
| Kích thước payload | Cấu trúc gọn, payload nhỏ, ít overhead mạng | Cồng kềnh hơn |
| Trải nghiệm lập trình viên | Cấu trúc map tự nhiên với object, serialize/deserialize rất đơn giản | Phức tạp hơn, khó làm việc hơn |
| Thế mạnh riêng | Hiệu năng, hệ sinh thái rộng khắp | Khả năng validation schema mạnh, hỗ trợ cấu trúc tài liệu phức tạp |
| Khi nào chọn | Mặc định cho REST API mới nhờ đơn giản, hiệu năng và hệ sinh thái | Tích hợp legacy, yêu cầu tuân thủ, hệ thống enterprise hiện hữu |

Lợi thế lớn nhất của JSON là **hiệu quả**: payload nhỏ hơn nghĩa là ít overhead mạng và truyền dữ liệu nhanh hơn. Ở quy mô lớn, **chỉ giảm một chút kích thước payload cũng có thể tạo cải thiện đáng kể** về latency, băng thông và chi phí hạ tầng. JSON cũng dễ làm việc hơn vì cấu trúc của nó ánh xạ tự nhiên vào object và cấu trúc dữ liệu trong hầu hết ngôn ngữ lập trình.

Dù vậy, XML vẫn có chỗ đứng trong môi trường doanh nghiệp: nhiều tổ chức lớn vận hành hệ thống legacy xây quanh tích hợp dựa trên XML; XML cũng cung cấp **khả năng validation schema mạnh mẽ** và hỗ trợ **cấu trúc tài liệu phức tạp** — điều có giá trị trong các ngành bị quản lý chặt chẽ.

*Từ góc nhìn kiến trúc, lựa chọn thường khá rõ: xây REST API mới hôm nay → JSON thường là mặc định; XML được chọn khi yêu cầu tích hợp, tuân thủ hoặc hệ thống enterprise hiện hữu buộc phải dùng. Cả hai cùng giải quyết một bài toán — trao đổi dữ liệu — nhưng JSON thắng thế vì làm được điều tương tự với ít phức tạp hơn và hiệu năng tốt hơn cho hệ phân tán hiện đại.*

---

### ⚙️ Ngữ nghĩa HTTP method trong REST

Đến đây chắc các bạn đã biết `GET`, `POST`, `PUT`, `PATCH`, `DELETE` làm gì. Câu hỏi quan trọng hơn là: **vì sao chọn đúng HTTP method lại quan trọng đến vậy?** Trong REST, method không chỉ là hành động — chúng **truyền đạt hành vi và kỳ vọng**. Khi API tuân theo ngữ nghĩa HTTP chuẩn, client, gateway, cache, công cụ monitoring và lập trình viên đều tương tác với nó một cách dễ đoán.

* **Safe vs unsafe** — các method **an toàn** như `GET` và `HEAD` chỉ dùng để đọc dữ liệu, **không được thay đổi trạng thái hệ thống**. Nhờ đó browser, cache và proxy yên tâm tối ưu request mà không sợ tác dụng phụ.
* **Idempotency** — thao tác idempotent cho **cùng kết quả dù chạy một lần hay nhiều lần**. `GET`, `PUT` và `DELETE` được thiết kế với tính chất này. Điều đó cực kỳ giá trị trong hệ phân tán, nơi lỗi mạng có thể khiến request **bị retry tự động**.
* **PUT vs PATCH** — `PUT` là **thay thế hoàn toàn** một tài nguyên, còn `PATCH` chỉ **sửa một số trường cụ thể**. Hiểu rõ khác biệt giúp tránh mất dữ liệu ngoài ý muốn và tạo hợp đồng API rõ ràng hơn.

Với kiến trúc sư, những ngữ nghĩa này quan trọng vì chúng ảnh hưởng trực tiếp tới **reliability, retry, hành vi caching và trải nghiệm lập trình viên**. Một REST API thiết kế tốt không chỉ phơi endpoint — nó **giao tiếp ý định qua việc dùng đúng HTTP method**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao tính stateless của REST giúp hệ thống mở rộng tốt?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì mỗi request tự chứa đủ ngữ cảnh, server không cần giữ session state nên bất kỳ server instance nào cũng xử lý được request.

Giải thích: Điều này đơn giản hóa load balancing, cải thiện fault tolerance và cho phép định tuyến tự do giữa các server.

Tham chiếu: Mục REST là gì và vì sao nó quan trọng.

</details>

**Câu 2:** Kể tên năm ràng buộc cốt lõi của REST.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Client-server, statelessness, cacheability, layered system, uniform interface.

Giải thích: Đây là bộ "luật thiết kế" phân biệt API thực sự RESTful với API chỉ dùng HTTP.

Tham chiếu: Mục Năm ràng buộc cốt lõi của REST.

</details>

**Câu 3:** Endpoint và HTTP method trả lời hai câu hỏi nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Endpoint trả lời "resource nào?"; method trả lời "làm gì với nó?".

Giải thích: Sự tách biệt này tạo thiết kế sạch, dễ đoán và dễ tích hợp.

Tham chiếu: Mục Thiết kế RESTful API.

</details>

**Câu 4:** Vì sao JSON thay thế XML, và khi nào XML vẫn hợp lý?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** JSON thắng nhờ payload nhỏ hơn, hiệu năng tốt hơn và dễ làm việc; XML vẫn hợp lý cho hệ legacy, yêu cầu validation schema mạnh hoặc tuân thủ nghiêm ngặt.

Giải thích: Ở quy mô lớn, payload nhỏ hơn giúp giảm latency, băng thông và chi phí hạ tầng.

Tham chiếu: Mục JSON vs XML trong REST API.

</details>

**Câu 5:** Vì sao idempotency quan trọng trong hệ phân tán?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì lỗi mạng có thể khiến request bị retry tự động; thao tác idempotent như GET, PUT, DELETE cho cùng kết quả dù chạy một hay nhiều lần.

Giải thích: Nhờ đó API giữ được reliability và tránh tác dụng phụ ngoài ý muốn.

Tham chiếu: Mục Ngữ nghĩa HTTP method trong REST.

</details>

---

Vậy là các bạn đã nắm trọn REST: từ triết lý xây trên chính kiến trúc web, năm ràng buộc cốt lõi, đến các nguyên tắc thiết kế resource, lựa chọn JSON/XML và ngữ nghĩa method. *Nhớ nhé: API tốt là những hợp đồng scalable, đáng tin cậy và trực quan cho cả con người lẫn hệ thống.* Ở bài tiếp theo, chúng ta sẽ rẽ sang một lớp bài toán khác — **giao tiếp thời gian thực**, với các giao thức vận hành live update, chat, cộng tác và notification. Hẹn gặp lại các bạn! 🚀
