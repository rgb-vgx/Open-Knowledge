# 🗺️ Toàn cảnh khóa học: Từ design pattern, protocol đến proxy và load balancer

Được rồi, chúng ta hãy cùng điểm qua **course outline (đề cương khóa học)** để biết chính xác các bạn sẽ đi qua những gì. Mình luôn muốn các bạn nhìn thấy tấm bản đồ trước khi lên đường.

Một việc nhỏ nhưng quan trọng trước tiên: sau khi học xong phần introduction, các bạn hãy vào **lecture stage** và **tải slides** xuống. Việc gom mọi thứ — nội dung, code, source code, slides — về một chỗ sẽ giúp các bạn theo dõi khóa học thuận tiện hơn rất nhiều.

---

### 🧩 Section 1: Backend Communication Design Patterns

Đây là một trong những section mình thích nhất. Mình tóm tắt cách **client kết nối tới backend** — và tin hay không, chỉ có **một vài cách** để client giao tiếp với backend mà thôi.

Các bạn sẽ đi qua:

* **Request/response (yêu cầu/phản hồi)** — một model đẹp và đơn giản bậc nhất.
* **Publish/subscribe (xuất bản/đăng ký)**.
* **Asynchronous vs synchronous (bất đồng bộ vs đồng bộ)** trong xử lý và giao tiếp — hai từ này sẽ được nhắc đi nhắc lại suốt khóa học, nên các bạn buộc phải nắm chắc chúng.
* **Stateful vs stateless (lưu trạng thái vs không lưu trạng thái)**: xây một protocol stateful khác gì một broker stateless? Cái nào tốt, cái nào xấu, vì sao chọn cái này thay vì cái kia?
* Các pattern mà **Kafka** và **RabbitMQ** sử dụng, cùng những mô hình khác như **pull model, push model, long polling, server-sent events**.

Tất cả những thứ này đều nhằm đạt **cùng một mục tiêu**, nhưng mỗi cách có ưu điểm và nhược điểm riêng. Và kinh nghiệm nhiều năm của mình cho thấy: backend nào rồi cũng rơi vào một hoặc vài pattern trong số này.

Section này còn có hai chủ đề đặc biệt:

* **Sidecar pattern (mẫu hình sidecar)** — được sinh ra từ thế giới service mesh và microservices. Suy cho cùng nó là một **proxy model** đơn giản, nhưng tinh tế tới mức mình dành hẳn một lecture riêng để nói về nó.
* **Multiplexing (ghép kênh)** — nghe thì thuần networking, low-level, nhưng nó xuất hiện khắp nơi trong backend: HTTP/1.1 (chuyện browser phân bổ request của client lên nhiều connection), **multipath TCP**, HTTP/2, QUIC, và cả trong browser khi ghép kênh các request.

---

### 📜 Section 2: Concrete Protocols — lăn vào bụi rậm

Sau đó chúng ta bước sang **các protocol cụ thể**. Nhưng trước khi nói về bất kỳ protocol nào, mình phải trả lời câu hỏi nền tảng: **một protocol thực chất là gì?** Các thuộc tính và quy tắc nào làm nên một protocol? Mình không sa đà vào định nghĩa hàn lâm, mục tiêu là để các bạn hiểu cái gì đang tồn tại ngoài kia.

Rồi đến **OSI model (mô hình OSI)** — với mình, đây là thứ không thể bỏ qua:

1. Không có một model, các bạn không thể đi tiếp.
2. Backend engineer cần nó để hiểu những khái niệm như **layer 4 proxy** vs **layer 3 switch** vs **layer 7 gRPC reverse proxy**.
3. OSI là chuẩn hiện hành, và hiểu nó khiến mọi thứ trở nên dễ liên hệ, rõ ràng hơn hẳn.

Tiếp theo là "chính chủ" các protocol:

* **UDP** — các bạn sẽ mổ xẻ xem **UDP datagram (gói dữ liệu UDP)** trông như thế nào.
* **TCP** — handshake (bắt tay) được thiết lập ra sao, **flow control (điều khiển luồng)**, **congestion control (điều khiển tắc nghẽn)**, và những thuộc tính của một kết nối **reliable (đáng tin cậy)**.
* **HTTP/1.1** với độ chi tiết cao, **HTTP/2**, **HTTP/3**, **QUIC**, **gRPC** và **WebRTC**.

Mình chọn những protocol phổ biến nhất; không thể phủ hết tất cả, có thể tương lai mình sẽ bổ sung thêm.

---

### 🔐 Section 3: HTTP/HTTPS và các cấu hình backend

Mình thêm hẳn một section riêng cho HTTP và đặc biệt là HTTPS — vì đây là protocol phổ biến bậc nhất, là thứ mà **toàn bộ web chạy trên đó**. Section này đi từng bước qua những cấu hình mà backend của các bạn có thể rơi vào khi nói về HTTPS:

* **HTTPS over TCP với TLS 1.2**, và nó khác gì so với **TLS 1.3**.
* Khi nào nên chọn cái này thay vì cái kia — cuộc tranh luận xoay quanh **QUIC**.
* **HTTP over QUIC với zero round trip (0-RTT)**, và zero-RTT vận hành ra sao với **TLS 1.3**.

*Section này mình rất thích, và mình tin các bạn cũng sẽ thích nó.*

---

### ⚙️ Section 4: Backend Execution Patterns — trái tim của khóa học

Đây là section mình thích nhất cho tới thời điểm này. Sau khi đã nói hết về protocol và nhận được dữ liệu đại diện cho request, chúng ta sẽ hỏi: **thật ra chuyện gì đang xảy ra under the hood (bên dưới nắp máy) trong ứng dụng backend của mình?**

* Ứng dụng **accept connection (chấp nhận kết nối)** như thế nào?
* Nó lấy **raw bytes (byte thô)** từ **kernel** vào **process** ra sao?

Các bạn sẽ hiểu tường tận:

* **Process (tiến trình)** là gì, **thread (luồng)** là gì, chúng khác nhau thế nào, và **shared memory model (mô hình bộ nhớ chia sẻ)**.
* Các ví dụ thực tế về cách những hệ thống khác nhau xử lý: **Nginx (Engine X)**, các cache engine, hay **RAMCloud**. Mỗi kiến trúc backend một khác — và chính những design choice đó quyết định cách backend thực thi.

Và đây là điều khiến mình thực sự hào hứng: các bạn sẽ thấy **kernel đang làm hộ chúng ta bao nhiêu việc**. Nó gánh một khối lượng khổng lồ. Học xong section này, nhiều khả năng các bạn sẽ thốt lên: *"Wow, kernel làm nhiều việc đến vậy sao?"*

*Điều đó cũng có nghĩa: rất nhiều vấn đề các bạn tưởng là lỗi của mình — hóa ra không phải. Có thể chỉ là cách kernel được thiết kế.* Ví dụ: client không kết nối được tới backend dù backend vẫn đang chạy — nguyên nhân có thể nằm ở những thứ xảy ra bên trong kernel. Hiểu rồi, các bạn có thể lách qua, sửa được, giải quyết được.

Mình còn đặt cược rằng sau section này, vài bạn sẽ nghĩ tới chuyện **đóng góp cho Linux kernel**. Vì các bạn sẽ phát hiện ra: Linux kernel hay OS nói chung **không hoàn hảo**. Có những giới hạn chưa được giải quyết cho tới tận hôm nay. Đội ngũ làm OS kernel biết rõ điều đó; còn mình, khi học được chuyện này gần đây, cảm giác như **bức màn được vén lên** vậy. Khi biết giới hạn nằm ở đâu, các bạn sẽ đưa ra quyết định tốt hơn. Đó mới là điều quan trọng.

Section này cũng đầy rẫy ví dụ về các kiến trúc backend khác nhau:

* Vì sao nên **spin up một listener** thay vì **nhiều listener**?
* Vì sao **nhiều thread** thay vì **một process**, hay **nhiều process** thay vì **một process**?
* Tất cả ảnh hưởng thế nào tới **thời gian thực thi, latency và performance**?

---

### 🔀 Section 5: Proxies & Load Balancers

Và cuối cùng — sẽ không còn là một khóa backend nữa nếu không nói về **proxies và load balancers (proxy và bộ cân bằng tải)**. Mình dành nguyên một section cho:

* **Layer 4 proxy** và **layer 7 proxy**.
* **Proxy** là gì, **reverse proxy** là gì — mình nhắc tới chúng suốt, và đây chính là lõi của backend engineering đích thực.
* Cách proxy phục vụ **API gateway**, **CDN**, và các kỹ thuật **load balancing (cân bằng tải)**.
* Góc nhìn hai mặt của một proxy: nó nói chuyện với **cả hai phía**, nên phải hiểu **hai ngôn ngữ** — một bên là HTTP, bên kia có thể là gRPC. Hiểu được điều này là hiểu một khái niệm cực kỳ then chốt.

Đó cũng là section khép lại khóa học. Dĩ nhiên, như mọi khóa học khác của mình, **mình luôn bổ sung nội dung mới** — nên khi các bạn xem, có thể sẽ thấy thêm những section mới. Còn đây là thiết kế ban đầu của khóa học.

Hy vọng các bạn thấy hứng khởi với tấm bản đồ này. Vậy thì... bắt đầu thôi, các bạn nhé! 🚀
