# 🚗 Sidecar Pattern: Nâng Cấp Giao Thức Mà Không Đổi Một Dòng Code

Mình cũng từng lưỡng lự khi thêm **sidecar (container phụ trợ)** vào phần design pattern, nhưng kiến trúc của nó thật sự "nói chuyện" với mình. Nó giải một bài toán rất thật: mỗi giao thức đều cần một library, và library thì ngày càng phình to, ngày càng khó nâng cấp. Sidecar là cách bạn **đẩy toàn bộ trách nhiệm giao tiếp sang một app khác** — và mọi thứ trở nên nhẹ nhõm.

### 🧱 Mỗi giao thức cần một library — và library làm app phình to

Muốn nói HTTP, HTTP/2, gRPC, Apache Thrift, SOAP, TCP hay UDP thuần, bạn **phải nói đúng ngôn ngữ của giao thức đó**. Library bạn dùng phải biết:

* Cách **ghi** vào socket theo đúng ngôn ngữ giao thức.
* Cách **đọc** và parse ngược lại.

Với các giao thức phức tạp như gRPC hay HTTP/2, HTTP/3, chuyện này cực kỳ rắc rối. Phía client được che chắn: bạn gọi fetch hay Axios, bạn không cần biết bên dưới là HTTP/2 hay HTTP/3 — miễn là library trong browser hiểu sự khác biệt **dưới đường truyền (under the wire)**.

Ngay cả HTTP/1.1 cũng cần library: app Python phải import một HTTP library; C# có library của Microsoft; C++ có library HTTP phong phú; Python thì vô số lựa chọn. Library sống **bên trong app**, và khi bạn viết một dòng đơn giản như `GET /where`, nó được dịch thành một thứ hoàn toàn khác trên đường truyền: dòng request, cách viết header, đo kích thước body, ghi body, kết thúc request... **Curl chính là ví dụ hoàn hảo** — một client library biết nói HTTP/1.1 theo một cách rất cụ thể.

Phía server cũng vậy: library parse request rồi đưa cho application xử lý. Và mỗi library chồng lên library khác: HTTP/2 library phải gọi TLS library để mã hoá, TLS library gọi tiếp OpenSSL để làm crypto... Càng nhiều giao thức, **client càng dày (thick), backend càng dày hơn**.

À, và chuyện chọn giao thức cũng có nghệ thuật riêng: client và server **thương lượng** với nhau qua **ALPN (application layer protocol negotiation)** — một TLS extension. Client dâng lên "tôi hỗ trợ HTTP/2 và HTTP/1.1", server chọn một. Sau đó hai bên nói chuyện bằng một giao thức hoàn toàn khác trên đường truyền: streams, magic stream number, đủ thứ phức tạp.

---

### 🔗 Library chồng library: OpenSSL, Log4j và cái giá của việc nâng cấp

Đây là phần khiến mình trăn trở nhất:

* **Bạn ở trong tay library.** OpenSSL từng dính một lỗ hổng rò rỉ dữ liệu lớn đến khó tin. Log4j cũng vậy — một library bị compromise thì **hàng loạt người dùng bị ảnh hưởng**.
* **App và library phải cùng ngôn ngữ.** App Python phải dùng package Python; app Node.js dùng package WebSocket của Node.js. Có tricks với C API, interop shim... nhưng phần lớn thời gian là vậy. Java đi với Java, C# đi với C#.
* **Đổi library rất khó.** Bạn phải **retest lại toàn bộ** — mà retesting thì không hề dễ: breaking change, backward compatibility, thêm tính năng mới... Tất cả đều là nghệ thuật.
* **Hậu quả:** microservices chịu trận, và đây chính là một trong những vấn đề mà kiến trúc microservices ra đời để giải quyết.

---

### 🐦 Twitter 2010 và Finagle: khi bạn tự trói mình vào một library

Câu chuyện này mình lấy từ một podcast của một nhân viên Twitter — mình không làm ở Twitter và không bịa ra đâu nhé.

Khoảng năm 2010, đúng dịp **World Cup**, mọi người ùn ùn tweet cùng lúc. Backend Twitter không tải nổi. Họ đang chạy **VM**; VM cứ thế **crash**, và thời gian để spin up một VM mới phục vụ load balancing thì quá lâu — trong lúc đó VM còn lại cũng sập nốt.

Twitter chuyển từ **monolith trên VM** sang **microservices**: tách tweet API, read API và các API khác thành nhiều service. Rồi họ phát hiện các service cần nói chuyện với nhau — thế là họ xây library riêng tên **Finagle** để giao tiếp giữa các microservice.

Điểm mấu chốt: **mọi người buộc phải dùng library đó**, và vì library thường chỉ có một phiên bản cho một ngôn ngữ, **bạn bị khóa vào ngôn ngữ đó** (mình nhớ mang máng là Scala). Với Twitter thì điều đó ổn — *nếu nó chạy được thì cứ để nó chạy*. Nhưng hệ quả là bạn **không thể** viết microservice bằng ngôn ngữ khác, vì mọi logic networking, retry, circuit breaking... đều nằm trong library đó.

---

### 🚗 Sidecar pattern: để proxy nói chuyện thay bạn

Đây là trick: **giao việc giao tiếp cho một app khác — một proxy**.

* Proxy sở hữu **library "béo" (rich library)**.
* Client chỉ cần một library **cực mỏng** để nói chuyện với proxy — và HTTP/1.1 thì **không bao giờ thay đổi**, một thiết kế đẹp và bền.
* Proxy muốn nói gì với backend, bằng ngôn ngữ nào, giao thức nào — mặc kệ nó.

Cụ thể với mô hình đơn giản: client HTTP/1.1 cần gọi HTTP/1.1 server. Bạn cấu hình trong app rằng **mọi request HTTP sẽ đi qua sidecar proxy**. Vì sao gọi là "sidecar"? Vì nó **nằm ngay trong cùng máy** — cả hai nói chuyện qua **loopback**. Đây cũng chính là cách các proxy debug như **Fiddler hay Charles** hoạt động: dựng một proxy lên, cho request chảy qua đó để log lại.

Cách vận hành:

1. Client gửi request, sidecar proxy nhận — nó biết đích đến cuối từ **Host header**.
2. Client không cần biết proxy sẽ nói chuyện với server bằng gì: HTTP/2 chẳng hạn, kết nối bảo mật, TLS 1.3 mới nhất.
3. Phía server cũng có một sidecar proxy, nhận request rồi chuyển cho server thật (proxy này cũng thường nằm cùng máy; trong kiến trúc container người ta gọi là **sidecar container**, chia sẻ loopback với app/host). Nó không bắt buộc phải cùng máy — bạn có thể đặt ở container khác, IP khác rồi cấu hình — nhưng loopback tiện hơn vì **không bao giờ thay đổi**, còn IP thì đổi.
4. Response quay ngược lại đúng con đường cũ, về đúng connection đã gửi request ban đầu.

Client vẫn tưởng mình đang gọi trực tiếp đích cuối, nhưng thực tế request **đi qua hai hop** — mọi thứ phức tạp đã bị "ẩn" đi. *Bạn vừa có một giao thức hoàn toàn mới mà không cần nâng cấp bất cứ thứ gì của app.*

*Lưu ý: cả proxy phía client lẫn phía server đều nhìn thấy toàn bộ dữ liệu — nên bạn phải tin tưởng chúng.* Đây chính là nền tảng của **service mesh** — Envoy, Linkerd, Istio — nơi các proxy nói chuyện với nhau. Ai sở hữu sidecar, người đó lo việc nâng cấp.

---

### ⚖️ Ưu và nhược: polyglot, tracing... đổi bằng complexity và latency

**Ưu điểm:**

* **Không phụ thuộc ngôn ngữ** — kiến trúc polyglot. Microservice Python nói chuyện với microservice JavaScript thoải mái, vì sidecar (ví dụ Linkerd viết bằng Rust) lo hết phần giao tiếp; giữa các proxy vẫn dùng HTTP/2.
* **Nâng cấp giao thức bất cứ lúc nào**: muốn lên HTTP/3 kèm QUIC? Chỉ cần nâng cấp sidecar — **code của bạn không đổi một dòng**.
* **Bảo mật**: kể cả khi từng service đang chạy không mã hoá, bạn vẫn có thể "bọc" bảo mật ở tầng sidecar. Phát hiện TLS library dùng cipher yếu, cấu hình proxy "đừng dùng cipher đó nữa" là xong — **mọi application nhận được thay đổi mới nhất**.
* **Tracing & monitoring**: mọi request chảy qua một mối, các sidecar proxy nói chuyện với nhau, và có một **control plane** tập trung điều khiển mọi thứ: giám sát, quy định service nào được nói chuyện với service nào. Muốn biết request đi qua A → B → C → D → E → F mất bao lâu? Service mesh **tự gắn trace ID** và theo dấu request cho bạn. Không dùng service mesh thì... quên đi, bạn phải dạy từng service hiểu trace ID là gì.
* **Service discovery**: proxy tự nói chuyện với hệ thống DNS tập trung để tìm service — bạn không cần nghĩ về nó.
* **Caching**: sidecar cũng có thể làm cache.

**Nhược điểm:**

* **Độ phức tạp**: hệ thống phức tạp hơn, khó hiểu hơn, khó biết cái gì đang hỏng. *Chúc may mắn khi debug một hệ microservices.*
* **Latency**: bạn vừa thêm **hai hop** không hề tồn tại trước đó — một hop tới proxy phía client, một hop tới reverse proxy phía server. Dù các hop này là local, vẫn tốn chi phí: viết lại request, hiểu request, nâng cấp giao thức, tracing, service discovery, caching... **không có gì miễn phí cả**.

Đó cũng là bài cuối cùng của section này. Sidecar phải là **layer 7** — nó decrypt mọi thứ, nhìn thấy mọi thứ, rồi mã hoá lại phía backend; bản chất nó chính là application. Layer 7 và layer 4 khác nhau ra sao là chuyện mình sẽ đào sâu ở **phần protocol** — vì theo mình, **mô hình OSI là một trong những thứ quan trọng nhất của backend engineering**. Hẹn gặp các bạn ở đó! 🚀
