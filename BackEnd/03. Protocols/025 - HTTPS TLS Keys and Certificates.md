# 🛡️ HTTPS, TLS, Keys và Certificates: Chuyện gì thực sự xảy ra sau ổ khóa trên thanh địa chỉ?

Chào các bạn! Hôm nay mình sẽ mổ xẻ **HTTPS**, **TLS**, chuyện khóa và **certificate (chứng chỉ số)** — và mình hứa sẽ cho các bạn thấy đằng sau cái ổ khóa nhỏ xíu trên thanh địa chỉ là *rất nhiều* công việc đang diễn ra. Hiểu được tầng này, các bạn sẽ không bao giờ còn coi bảo mật là một "hộp đen" nữa.

### 🛡️ HTTPS mã hóa... đến đâu? Đừng tin vào cảm giác an toàn

HTTPS vẫn là HTTP, chỉ thêm chữ **S** — thông qua giao thức **TLS (Transport Layer Security, bảo mật tầng vận chuyển)**. Nếu xếp TLS vào mô hình OSI thì nó nằm quanh tầng 6–7, ngay trước tầng application. Khi ứng dụng gửi request qua TLS: dữ liệu được mã hóa trước, rồi mới đẩy xuống **TCP của kernel**. Kernel chỉ biết IP và port — nó gửi bytes, bất kể bytes đó đã mã hóa hay chưa. *Kernel không quan tâm, hệ điều hành không quan tâm.*

Nhưng đây là điều nhiều người hiểu lầm: HTTPS **không phải lúc nào cũng mã hóa đầu-cuối**. Mã hóa chỉ kéo dài từ bạn đến **điểm dừng đầu tiên**. Nếu phía sau là một **CDN** kiểu Cloudflare, Cloudflare phải **giải mã** để cache nội dung, rồi mã hóa lại và gửi tiếp vào backend thật. Proxy hay API gateway cũng vậy — chúng phải **terminate TLS (kết thúc TLS)** để đọc được nội dung. Nên nhớ: có HTTPS không có nghĩa là mọi thứ trên đường đi đều được mã hóa toàn trình.

---

### 🔑 Hai thế giới mã hóa: đối xứng và bất đối xứng

Có hai loại mã hóa, và đây là điều quan trọng nhất cần nắm:

* **Mã hóa đối xứng (symmetric)**: **một khóa** vừa mã hóa vừa giải mã. Cực nhanh vì chỉ dùng các lệnh CPU đơn giản — hoàn hảo cho khối lượng dữ liệu lớn. Thuật toán có thể đơn giản chỉ là XOR, có loại phức tạp hơn, có thể mã hóa theo từng block rồi chain chúng lại để khó phá. Nhưng thách thức nằm ở chỗ: làm sao hai bên *có chung* khóa đó? Gọi điện đọc số thì phải tin nhà mạng; gửi thư thì phải tin bưu điện; gửi bằng bồ câu đưa thư thì... thôi bỏ đi.
* **Mã hóa bất đối xứng (asymmetric)**: hai khóa — **public key (khóa công khai)** ai cũng xem được và **private key (khóa riêng)** chỉ mình bạn biết. Trong ví dụ của mình, khóa công khai sẽ được tô màu đỏ.

Quy tắc vàng về khóa:
1. Từ **private key** có thể sinh ra public key tương ứng — lỡ mất public key thì sinh lại, không sao.
2. Nhưng **không bao giờ** suy ngược được private key từ public key. Trừ khi bạn có toàn bộ sức mạnh tính toán của thế giới, còn không thì bất khả thi.
3. Khóa thực chất chỉ là những **con số khổng lồ**: 256, 512, 1024, 2048, 4096 bit. RSA 1024 giờ dễ phá, 2048 cũng không còn an toàn tuyệt đối, nên người ta phải đẩy lên 4000+ — và máy tính lượng tử thì ngày càng đáng gờm.

Hai chiều sử dụng bất đối xứng đều có ứng dụng riêng:
* **Mã hóa bằng public key → chỉ người giữ private key đọc được.** Ai cũng có public key của bạn, nhưng chỉ bạn giải mã được. Đây là **xác thực người nhận**.
* **Mã hóa bằng private key → ai có public key cũng đọc được.** Nghe vô dụng? Không hề — đây là **chữ ký số (digital signature)**. Mình công bố một tuyên bố và ký nó bằng private key; bất kỳ ai dùng public key của mình để xác minh chữ ký đều biết đó đúng là mình. Thực tế người ta ký lên **hash** của tài liệu. Nếu hacker sửa nội dung, chúng không thể ký lại vì không có private key — chữ ký không khớp hash, thế là lộ ngay.

*Và đây là lý do bất đối xứng không dùng để mã hóa dữ liệu lớn: nó rất chậm và nặng máy. Muốn mã hóa cả trang web thì phải dùng mã hóa đối xứng — nhưng khóa đối xứng thì trao đổi cách nào? Chờ chút, chúng ta sẽ tới đó.*

---

### 📜 Certificate (chứng chỉ số): tấm hộ chiếu của public key

Khi bạn kết nối tới example.com, làm sao biết đó *thực sự* là example.com mà không phải kẻ mạo danh? Bạn cần **xác thực (authentication)**. Và **certificate (chứng chỉ số)** chính là cách làm điều đó — bản chất nó là một gói **metadata để vận chuyển public key**.

Bên trong certificate có: version, thuật toán ký, chữ ký số, **tên nhà phát hành (issuer)**, tên chủ thể (subject), và quan trọng nhất — **Subject Alternative Name**: chính là tên website. Vào example.com, bạn phải nhận được certificate có SAN khớp với example.com. Chuẩn hiện đại cho certificate là **X.509**.

Quy trình tạo certificate khá đơn giản: sinh cặp khóa → đặt **public key** vào certificate → ghi tên website → ký certificate bằng **private key**. *Tuyệt đối không nhét private key vào certificate* — làm thế thì hết ý nghĩa, chỉ cần gửi chữ ký thôi.

* Certificate **tự ký (self-signed)** là khi bạn lấy chính khóa nằm trong certificate ký nó — thường không được tin tưởng, nhưng chạy server local thì quá ổn.
* Cách hợp lệ trên Internet là để **CA (tổ chức chứng thực – certificate authority)** dùng private key của họ ký certificate cho bạn.
* CA lại được CA khác ký, cứ thế thành **chuỗi tin cậy (chain of trust)** sâu 1, 2, 3 hay 5 tầng, cho đến khi gặp **root certificate** — self-signed nhưng được cả thế giới tin, chỉ khoảng **13** cái. Chúng nằm sẵn trong **certificate store** được cài cùng hệ điều hành.

Khi kiểm tra, đầu tiên bạn nhận **leaf certificate**: nó ghi issuer là CA nào, bạn tra CA đó trong store, xem ai ký CA đó, lần ngược lên tới root — tìm thấy và tin cậy thì xong. Server có thể gửi **toàn bộ chuỗi (full chain)** — file nặng hơn nhưng phục vụ được nhiều client hơn, vì có client không có sẵn CA trung gian trong store. Còn nếu root không có trong store thì... thôi xong.

Vài chuyện "drama" quanh chứng chỉ:
* Có những chứng chỉ **cross-signing** — được ký bởi hai root khác nhau. Client cũ chỉ đi **depth-first** một nhánh, nhánh đó hết hạn là fail, dù nhánh còn lại vẫn hợp lệ — nên client phải biết dò tìm rộng.
* Có trình duyệt **không tin certificate store của hệ điều hành**, họ tự dùng store riêng.
* Ví dụ đáng sợ: máy tính nhập từ Trung Quốc hay Kazakhstan cài sẵn root certificate "xấu". ISP độc hại chặn traffic, tự sinh certificate giả danh google.com ký bởi root của họ — máy bạn tra thấy "tin cậy" thế là toàn bộ traffic bị giải mã. *Đúng là chính phủ Kazakhstan từng làm trò này.* Bạn có thể tắt kiểm tra chứng chỉ (ví dụ `--insecure` khi dùng curl), nhưng nói thẳng: tắt rồi thì bạn đang tự nguyện làm nạn nhân man-in-the-middle.

---

### 🤝 Bắt tay TLS: từ RSA đến Diffie-Hellman

TLS mã hóa bằng **khóa đối xứng** — gọi là **session key (khóa phiên)**, sinh mới cho từng kết nối. Vì mình nói chuyện với website mới mỗi ngày, mình không thể biết trước khóa của họ, nên phải **trao đổi khóa trong mỗi phiên TLS**, trên nền kết nối TCP.

**Cách cũ (TLS 1.2 với RSA — đến nay không còn dùng, nhưng đáng để hiểu):**
1. Client gửi **Client Hello**, server trả về **certificate X.509** chứa public key.
2. Client kiểm tra certificate (đi hết chuỗi tin cậy), rồi tin tưởng public key đó.
3. Client tự sinh **khóa đối xứng "vàng"**, mã hóa nó bằng public key của server rồi gửi đi.
4. Server dùng private key giải mã, lấy được khóa đối xứng. Cả hai đổi sang mã hóa đối xứng và bắt đầu truyền dữ liệu.

Cách này tốn **hai vòng round-trip (hai lần bắt tay)**. Nhưng vấn đề chí mạng: **không có perfect forward secrecy**. Kẻ tấn công chỉ cần ghi lại toàn bộ traffic mã hóa rồi chờ đợi — một ngày đẹp trời private key bị lộ, thế là cả kho dữ liệu ghi được bị giải mã. Vụ **Heartbleed năm 2014** chính là một cú như thế: gửi payload độc hại vào server, server trả về... rác trong bộ nhớ, mà trong bộ nhớ thì có cả private key. *Đó là lý do người ta không ưa RSA key exchange nữa.*

**Diffie-Hellman ra đời để giải quyết:** không gửi khóa đối xứng đi đâu cả, mà **hai bên tự sinh ra nó từ các tham số chung**. Cùng chơi trò toán học nhé:
1. Client sinh số bí mật **x**, còn **G và N** là tham số công khai, ngẫu nhiên, phải là số nguyên tố và thật lớn.
2. Hai bên trao đổi G và N (ai nghe lén cũng được, không sao cả).
3. Mỗi bên tính `G^x mod N` (lấy G mũ x rồi mod N) và gửi kết quả cho nhau.
4. Nhận được giá trị của đối phương, mỗi bên lấy nó mũ với số bí mật của mình. *Kỳ diệu thay nhờ toán học:* `(G^x)^y` và `(G^y)^x mod N` cho ra **cùng một con số** — chính là khóa phiên, mà không ai phải gửi khóa đi.

Kẻ tấn công có G, N và các giá trị trung gian nhưng **không thể tìm ra x hay y** — bài toán log rời rạc quá khó phá.

Nhưng vẫn còn **man-in-the-middle**: kẻ tấn công Z chặn giá trị public của X, tự sinh khóa riêng z, gửi `G^z mod N` cho X. X tưởng là Y nên mũ X lên, Z cũng lấy về mũ Z lên — cả hai ra cùng một khóa, và cuộc trò chuyện bị nghe trọn. **Không có certificate thì mọi thứ sụp đổ** — lại phải nhờ chữ ký số xác thực.

**TLS 1.3** làm tất cả gọn hơn: gửi mọi thứ **một lần duy nhất**, server có luôn khóa đối xứng sau **một vòng round-trip**. Server **ký tham số DH bằng private key** (chỉ ký, không gửi khóa), client kiểm tra chuỗi chứng chỉ, xác minh chữ ký bằng public key, rồi cả hai đổi khóa. Vẫn còn *cả rừng* thứ chưa kể: extension, SNI, thuật toán ký, thuật toán sinh khóa, kích thước khóa, certificate phía client, mutual TLS... không khóa học nào ôm hết nổi.

---

### 🧪 Thực hành: Node.js, OpenSSL và cái kết "curl không tin mình"

Node cần **certificate + private key** — hai thứ bắt buộc. Phần còn lại giống hệt HTTP, chỉ khác là bạn tốn thêm chi phí mã hóa và xác thực chứng chỉ.

Với **OpenSSL** (thư viện mã nguồn mở; SSL là tên gọi cũ của TLS), mình sinh khóa riêng bằng `openssl genrsa` — cụ thể mình dùng **4096 bit cho chắc** — ra file `private-key.pem`. *Đừng bao giờ đẩy private key lên GitHub, không cần phải bàn.* Sau đó dùng `openssl req -new -x509` với khóa riêng để sinh public key và certificate, đặt hạn dùng (mình để 365 ngày), rồi trả lời vài câu hỏi về country, state, locality... **quan trọng nhất là Subject Name** — với demo thì để `localhost` là được. À, ngoài ra còn **Let's Encrypt** nếu bạn muốn tự ký đồ của mình.

Node server chỉ việc **đọc key và cert từ đĩa** rồi lắng nghe — mình chạy trên port **8443**. Request được **giải mã ngay trước khi lọt vào handler**; mọi logic SSL đã chạy xong từ trước. *Muốn chạy HTTP/2 thì buộc phải có server HTTPS — nhớ nhé.*

Chạy `curl https://localhost:8443` liền ăn lỗi: **curl không tin mình**, vì certificate là self-signed. Hai cách xử:
1. Dùng `--insecure` để bỏ qua bước xác thực (chỉ nên dùng khi thử nghiệm).
2. **Import certificate vào certificate store** của hệ điều hành (Mac, Linux, Windows mỗi nơi một kiểu), hoặc bảo Node tin certificate đó khi gửi request.

Về phía client thì bạn **không cần certificate** — đó là việc của server. Việc của client là xác thực server, không phải ngược lại (dù có tùy chọn client certificate nếu muốn, và có server xác thực client).

Cuối cùng là bài **test hiệu năng** quen thuộc với agent HTTPS: kết quả y hệt bản HTTP nhưng **chậm hơn một chút** — mỗi request tốn thêm công đoạn mã hóa. Có thể tăng nhanh tốc độ mở socket, nhưng phần việc phụ trội thì vẫn ở đó.

Nếu các bạn chạy `curl -v https://...`, sẽ thấy **đầy đủ mọi thứ chúng ta vừa nói**: danh sách IP, Client Hello, Server Hello, các extension mã hóa, certificate, chữ ký xác thực bằng private key, thuật toán public key đã dùng, ALPN và cả việc thương lượng HTTP/2.

Tổng kết: chúng ta đã đi qua mã hóa, TLS, certificate, Node HTTPS và tự tay sinh khóa bằng OpenSSL. Ở bài tới, mình sẽ mang **Wireshark** ra để đo **cái giá** của TLS: sau TCP handshake lại thêm một TLS handshake nữa — nhiều việc hơn, tốn hơn, ảnh hưởng tới hiệu năng. Hẹn gặp lại các bạn! 🚀
