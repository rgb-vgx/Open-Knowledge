# 🔐 JWT — "Viên đạn bạc" của xác thực stateless và cái giá không hề rẻ

Chào các bạn! Xác thực người dùng là bài toán mà ai làm backend cũng phải giải, và mình đã chứng kiến cả một thế hệ đi từ **session-based authentication** sang **JWT** rồi lại vật lộn với refresh token. Hôm nay mình sẽ kể cho các bạn toàn bộ câu chuyện đó: session cũ có gì hay, JWT sinh ra để giải quyết gì, refresh token và asymmetric JWT là gì, kèm một ví dụ code Postgres + Express mình tự viết — và cuối cùng là pros/cons thẳng thắn.

*Không có công nghệ nào hoàn hảo. Trong software engineering, mọi thứ đều có pros và cons, và bạn với vai trò kỹ sư phải đánh giá use case của mình rồi chọn cái phù hợp nhất. Đừng bao giờ gắn chặt vào một công nghệ.*

---

### 🧠 Session-based Authentication — ông tổ vẫn chạy rất tốt

Mô hình quen thuộc: client đi qua một reverse proxy/load balancer, vào một trong hai service backend, và phía sau là Postgres. Bảng người dùng có `username`, `password`, `role` — password tất nhiên không phải plain text mà là hash rồi salt đàng hoàng.

Luồng đăng nhập diễn ra như sau:

1. Client gửi POST request để login. Bạn thấy password gửi đi trông như rõ, nhưng không sao cả: client và server đang nằm trong một TLS session (cổng 443), nên toàn bộ đã được mã hóa — về mặt kỹ thuật nó không phải plain text.
2. Server xác thực với database. Xong xuôi, server sinh ra **một chuỗi random thật dài** gọi là `session_id` và lưu vào bảng, kèm càng nhiều metadata càng tốt: username, role, là admin hay user thường, session hết hạn khi nào, lần cuối đăng nhập là khi nào...
3. Server trả `session_id` về cho client.

Từ đây, **client chịu trách nhiệm gửi kèm session ID trong mọi request** — vì HTTP là **stateless (không lưu trạng thái)**: request đầu tiên mình biết bạn là ai, nhưng request thứ hai có thể rơi vào một server hoàn toàn khác, nên bạn phải tự "điểm danh" mỗi lần. Gửi bằng cookie, auth header, POST body hay GET parameter đều được, mỗi cách có pros/cons riêng.

Server nhận session ID → query database → biết đó là Edmund, role admin, chưa hết hạn → xác thực xong. Bạn không phải gửi username/password mỗi request. Cái giá phải trả là: **mỗi request tốn thêm một hop xuống database và thêm latency**. Kể cả là Postgres đọc rất nhanh, thời gian đó vẫn là thật.

---

### 🏗️ "Stateful system nhưng stateless application" — hiểu cho đúng

Có một misconception rất phổ biến: người ta nói session-based authentication là stateful rồi bỏ qua nó. Câu trả lời đúng là **vừa đúng vừa sai**:

* **Hệ thống là stateful**: state — tức session ID — được lưu trong database.
* **Nhưng application là stateless**: mình có thể destroy một server, client không hề bị bắt đăng nhập lại. Server mới chỉ cần database là resume được ngay, vì database chính là state thật. Nhân bản (replicate) database thì scale ngang thoải mái.

Người ta thử cache session ở tầng application để khỏi query database mỗi lần. Nhưng làm vậy là **biến application thành stateful trở lại**, và nảy sinh vấn đề: làm sao biết cache còn đúng? Session bị hijack, bạn xóa session dưới database nhưng cache vẫn giữ bản cũ → **inconsistent state**, rất tệ. Có nhiều cách giải nhưng nằm ngoài phạm vi bài này.

Thế là người ta phát minh ra **JWT (JSON Web Token — token xác thực dạng JSON)**: một hệ thống **hoàn toàn stateless**, đến mức bạn có thể mang token sang một service khác không hề có quyền truy cập database mà nó vẫn xác thực được người dùng. Bằng cách nào? Phép thuật mã hóa, chia làm ba phần.

---

### 🧩 Cấu trúc JWT: header, payload và signature

JWT gồm ba phần: **header**, **payload** (dữ liệu), và **signature (chữ ký)**.

* **Header** cho biết token được ký bằng thuật toán gì — ví dụ HMAC-SHA256.
* **Payload** chứa dữ liệu thật: username, role, thời điểm hết hạn. Ví dụ của mình là Edmund Dantes với role admin. Cứ nhét tối đa thông tin **không nhạy cảm** vào đây, vì token sẽ là công khai.
* **Signature** là phần trả lời câu hỏi: "Nếu tôi tự sửa payload thành admin thì sao?" — signature sẽ chặn lại, vì chỉ server mới có secret để tạo ra chữ ký hợp lệ. Client không bao giờ biết secret.

Signature có thể là **symmetric** hoặc **asymmetric**:

* **Symmetric**: cùng một key vừa dùng để tạo vừa dùng để verify token — ví dụ HMAC-SHA256 với một secret. Secret chỉ server biết.
* **Asymmetric**: ký bằng private key, verify bằng public key — ví dụ RSA. Public key có thể chia sẻ thoải mái vì nó **không thể tạo ra token mới**, chỉ validate được. Đổi lại, thuật toán asymmetric **chậm hơn** symmetric, đặc biệt nếu token của bạn có dữ liệu lớn.

Và đây là điều cực kỳ quan trọng mà nhiều người hiểu sai: **JWT bản thân nó không được mã hóa, nó chỉ được ký.** Payload là base64 nhưng bản chất vẫn là plain text, ai cũng đọc được trực tiếp mà không cần giải mã; chỉ có signature là phần được mã hóa. Đừng bao giờ để thông tin nhạy cảm trong token.

---

### 🔑 Luồng đăng nhập JWT, bài toán chia sẻ secret và chuyện token bị đánh cắp

Đăng nhập thì vẫn y hệt session: vẫn phải query database để kiểm tra username/password, vẫn dùng TLS, rồi server tạo token và trả về cho client. Client vẫn chịu trách nhiệm gửi token kèm mỗi request — qua `Authorization: Bearer`, qua cookie, gửi sao cũng được. Cách mình khuyên là **HTTP-only cookie + same-site strict**, và nếu muốn paranoid hơn nữa thì thêm `Secure`.

Khác biệt nằm ở bước verify: server chỉ cần secret để kiểm tra signature, **hoàn toàn không hit database**. *"I didn't even have to query a database to trust you"* — đó là sức mạnh thật sự của JWT. Mang token sang bất kỳ service nào hiểu JWT, họ tự verify được; OAuth 2 cũng chạy theo cách này: bạn xác thực với Google, Google trả bạn một JWT, và bạn mang đi đâu cũng verify được cho tới khi nó hết hạn.

Nhưng **nothing is free**. Secret phải được chia sẻ với mọi service muốn verify token — và ai có secret thì có thể tự tạo token cho chính mình, thậm chí tạo token không bao giờ hết hạn. Vì vậy trong kiến trúc microservices, đặc biệt là **zero trust (không ai tin ai)**, gần như không ai dùng symmetric key. Giải pháp là **asymmetric JWT**: chỉ authentication service giữ private key, còn các service khác chỉ cần public key — kể cả service bạn không tin tưởng cũng không thể làm gì ngoài việc verify.

Rồi đến điểm gãy lớn nhất: **token bị đánh cắp thì không thể thu hồi**. Nếu session ID bị đánh cắp, bạn vào database xóa session đó là xong — vì sự thật nằm ở một chỗ tập trung. Còn JWT bị đánh cắp thì "tough luck": không có database, không thể tuyên bố token vô hiệu, ai cầm token cũng verify thành công. Nói cách khác, **khái niệm log out gần như không tồn tại** — muốn vô hiệu hóa token thì phải chờ nó hết hạn hoặc giết refresh token.

Đường bị đánh cắp thực tế trông thế nào? Man-in-the-middle gần như bất khả thi vì mọi thứ đã được TLS mã hóa, trừ khi attacker phát hành certificate giả cho bạn — cực kỳ khó xảy ra. Thực tế hơn là chính client bị tấn công: **XSS (cross-site scripting — chèn script độc hại vào trang)** và **CSRF (cross-site request forgery — lợi dụng phiên đăng nhập của nạn nhân)**. CSRF đang dần biến mất nhờ same-site cookie, nhưng XSS vẫn là chuyện thật.

Workaround cho vấn đề token sống quá lâu là **refresh token (token làm mới)**:

* Access token sống ngắn — 10 đến 15 phút — để nếu bị đánh cắp thì thiệt hại có giới hạn.
* Refresh token sống dài, thường không có expiry hoặc khoảng một ngày, và **được lưu trong database** — đúng, nó kéo hệ thống về lại stateful.
* Khi access token hết hạn, client gửi POST kèm refresh token (mình khuyên để trong auth header hoặc body, đừng để trong cookie). Server **phải hit database** để kiểm tra refresh token còn hợp lệ, có bị blacklist hay bị đánh cắp không, rồi mới cấp access token mới.

Hệ thống lại trở nên centralized, nhưng vẫn tốt hơn session truyền thống vì **chỉ hit database mỗi 15 phút thay vì mỗi request**. *Còn mình thì nói thẳng: refresh token là session trá hình.*

Trong ví dụ code Postgres + Express mình viết:

* **Bản session**: bảng `session_auth` gồm username, password, role, session_id. Register user `test`/`test` (password hash bằng Bcrypt), login trả về session ID rất dài và set HTTP-only cookie với `same-site: lax`. Refresh trang là được chào đúng tên; login bằng admin thì UI đổi màu; logout là vô hiệu hóa session — hiệu lực ngay lập tức.
* **Bản JWT**: bảng `jwt_auth` có thêm cột token để lưu refresh token. Login trả **cả hai**: refresh token (mình để trong local storage) và access token (để trong cookie). Access token chỉ sống 30 giây và có script tự renew liên tục. Nhưng logout thì chỉ null được refresh token — access token vẫn sống tới khi hết hạn, và phải một lúc sau trang mới đá bạn ra.

Một lưu ý nữa: mình để secret ngay trong code — **bad idea, đừng bao giờ làm vậy**. Secret phải nằm trong environment variable hoặc tốt hơn hết là một key management system. JWT không hề miễn phí.

---

### ⚖️ Pros, cons và quan điểm thẳng thắn của mình

**Pros:**

* **Stateless đúng nghĩa** với access token: mang token tới bất kỳ đâu có secret hoặc public key, hệ thống tự xác thực mà không cần database trung tâm.
* **Cực kỳ hợp cho API**: bạn xác thực tập trung một chỗ, người khác lấy token rồi tự xây ứng dụng trên API của bạn; thêm REST endpoint hay GraphQL endpoint mới vẫn dùng lại token đó.
* **Bảo mật cao** nếu secret/key đủ mạnh — rất khó phá, trừ khi bạn dùng secret quá yếu.
* **Token tự mang thông tin hữu ích** (username, role...) nên client render UI ngay được mà không cần hỏi server. Với session thì bạn chỉ dám đưa client mỗi session ID, vì đưa role ra là người ta sửa thành admin ngay.

**Cons:**

* **Chia sẻ secret trong microservices là một nỗi đau**; secret management trở thành bài toán riêng, và HashiCorp Vault giải quyết nó khá thanh lịch.
* **Key management**: public key để ở đâu, làm sao biết nó còn valid? Nếu private key lộ (như Heartbleed) thì phải deprecate key, nhưng token cũ tạo bằng key cũ xử lý ra sao — tin hay không tin? Và bạn vẫn tốn extra hop để kiểm tra key, quay lại đúng vấn đề của session.
* **Khó tiêu thụ hơn khó implement**: client phải biết gửi token ở đâu, biết token sắp hết hạn và tự đi lấy token mới — độ phức tạp bị đẩy về phía client, điều mà session ID ngày xưa không có.
* **Lưu refresh token** là bài toán khó: access token "rẻ" nên để cookie được, còn refresh token sống lâu, bị lấy là toi. Local storage thì dính XSS; mã hóa nó thì lại phải giấu key ở đâu — vòng lặp không lối thoát. Mình nghiêng về IndexedDB vì nhỉnh hơn local storage một chút, nhưng API của nó thì dở tệ.
* **Revocation và kiểm soát token** gần như không thể: state nằm trong token, không sửa được, muốn thu hồi thì phải quay về centralized. Cách mình thích là server định kỳ **kiểm tra trạng thái token bất đồng bộ** — request đến vẫn nhanh, không phải gánh database mỗi lần.
* **Thư viện implement ẩu**: có thư viện cho phép `alg: none` — signature rỗng vẫn là token hợp lệ, thế là attacker tự chế JWT và claim mình là admin. Lỗi này tồn tại đến tận năm 2015 mới bị phát hiện. Một diễn giả tên Philip có bài nói rất hay về các bad practice với JWT.

*Quan điểm của mình: mình vẫn dùng JWT, thiết kế của nó đẹp. Nhưng mình không dùng refresh token — mình thấy nó không cần thiết và không muốn đẩy việc sinh token về phía client.* Cách mình thích là chỉ dùng access token **không giới hạn thời gian**, lưu token trong database, và cứ 10 phút server async kiểm tra một lần xem token còn hợp lệ không. Nếu phát hiện bất thường — request từ IP lạ, hoặc token bị báo là đã mất — mình xóa entry đó khỏi database, kẻ tấn công có thêm tối đa khoảng 15 phút trước khi mọi thứ chấm dứt. OAuth 2 thì dùng refresh token, có thể vì lý do gì đó, nhưng cá nhân mình vẫn chưa hiểu hết lý do đó — và đó cũng chỉ là ý kiến của mình, các bạn cứ thoải mái phản biện.

Vậy bạn chọn gì: team session ID "cổ điển" hay team JWT? Và nhớ, không có phương pháp xác thực nào là tốt nhất — tất cả phụ thuộc vào use case của bạn. Hẹn gặp các bạn ở bài tiếp theo nhé! 🚀
