# 🧠 ChatGPT "nhả chữ" từng token như thế nào? Mổ xẻ Server-Sent Events từ A tới Z

Các bạn có bao giờ tự hỏi vì sao ChatGPT trả lời mà chữ cứ hiện dần ra từng chút một, thay vì đợi cả câu trả lời rồi mới hiện một cục? Hôm nay mình sẽ mở DevTools, tắt cache và đi từ lúc gõ `chat.openai.com` cho tới lúc nhận được từng **token (đơn vị chữ của LLM)** ở phía client.

Mục tiêu rất đơn giản: chỉ cho các bạn thấy **Server-Sent Events (sự kiện đẩy từ server)** hoạt động ra sao dưới đường truyền (under the wire), kèm vài quyết định thiết kế backend của OpenAI mà mình "săm soi" được. Không hộp đen, tất cả đều kiểm chứng được.

### 🔌 Ấn Enter vào chat.openai.com: chuyện gì xảy ra trước khi có request?

Trước khi ấn Enter, mình giữ nguyên log lại vì biết sẽ có một cú redirect cần bắt tận mắt, và tắt cache để mọi thứ là một cú "cold hit" — coi như lần đầu truy cập.

Kết quả quan sát:
* Trang **redirect nhấp nháy** rồi tải lại, kèm vài lỗi **forbidden** xuất hiện trong mỗi session mới, dù mình đã đăng nhập và cookies đã được gửi đi. Trông có vẻ là **by design**, và chính lỗi đó trigger một request reload trang. *Hơi lạ một chút, nhưng không phải vấn đề lớn.*
* OpenAI đặt **Cloudflare** làm CDN (mạng phân phối nội dung) kiêm reverse proxy phía trước, nên phần lớn "vũ khí" bảo vệ nằm ở đây.
* Mình thấy **hai connection** tới hai domain — thực ra chỉ cần một; connection thứ hai là do **Cloudflare CAPTCHA** (lần này mình không bị hỏi, nhưng đôi khi bạn sẽ bị). Trớ trêu thay: một con bot đi hỏi xem bạn có phải là người hay không 😄.

Về thông số kết nối:
* **DNS lookup mất 64ms** — để dịch tên miền thành địa chỉ IP.
* Mình đang dùng VPN nên mọi con số cộng thêm **khoảng 10ms** (give or take) do phải mã hóa ở tầng IP giữa client và server VPN.
* Initial connection bao gồm cả **TLS handshake (bắt tay TLS)**. Muốn tách riêng phần **TCP handshake**, các bạn lấy mốc 96 trừ đi 53 trong waterfall.
* Chờ **byte đầu tiên** (time to first byte) mất 58ms.
* Bảo mật là **TLS 1.3** với key exchange dùng đường cong **25519** và symmetric key encryption — hàng top of the line như bao hệ thống xịn khác.
* Protocol được thương lượng là **h2**, tức **HTTP/2** — và các bạn sẽ thấy ngay vì sao điều này hợp lý cho SSE.

---

### 📡 Vì sao Server-Sent Events lại "đi nhờ" HTTP/2?

Đây là điểm mình muốn các bạn khắc cốt ghi tâm: **SSE về bản chất vẫn là một request-response (yêu cầu/phản hồi)**, nhưng cái response kéo dài rất lâu và bị chia thành nhiều **logical message (thông điệp logic)** để client đọc dần. Phía client chỉ thấy một request-response duy nhất, nhưng response cứ "nhỏ giọt" mãi. Nó giống như một request-response hào nhoáng — chỉ khác là phần thân bị chẻ nhỏ.

Vì response sống lâu như vậy, dùng **HTTP/1.1 là một ý tồi**: bạn đang chiếm dụng hẳn một connection, mà Chrome chỉ cho bạn **tối đa 6 connection** cho HTTP/1.1. HTTP/2 giải quyết bài toán đó:

* Connection ID **luôn luôn là một** — trong phiên này là **647** — và cứ thế tái sử dụng. *Đó là vẻ đẹp của HTTP/2.*
* Mọi request được gửi **cùng lúc**, và mỗi request là **một stream riêng** trong cùng một connection (multiplexing — ghép kênh).
* Stream ID phía client là **số lẻ**: 1, 3, 5, 7... và tối đa **cấu hình được khoảng 200 stream** (có thể hơn, nhưng càng nhiều stream thì server càng mệt khi phải lắp ghép chúng lại).
* Cloudflare còn quảng cáo endpoint **HTTP/3** qua **header alternative service (alt-svc)** — vì HTTP/3 chạy trên **QUIC (UDP)**, bạn không thể quảng cáo nó qua ALPN của TLS được. Trong phiên này Chrome của mình vẫn chọn h2, có thể do mình từng tinh chỉnh config gì đó.

Còn lại thì cũng bình thường: tải font, tải JavaScript, mọi thứ tĩnh tải song song; khi file JS cuối cùng xong thì những request "thật" mới bắt đầu. À, khi thấy **rainbow màu sắc** (xanh lá, cam, tím...) trong DevTools thì đó là dấu hiệu của **một connection mới** — đừng nhầm với các stream nằm chung trong một connection nhé.

---

### 🔑 Access token hết hạn, phân trang offset và câu chuyện UUID

Sau khi tải xong đống tài nguyên tĩnh, những request đáng chú ý mới xuất hiện. Đầu tiên là **session** — nơi chứa thông tin về mình, một phần của **OAuth (ủy quyền xác thực)**:

1. Cookies của mình chứa **refresh token**; nó được gửi đi và đổi lấy một **access token** ngắn hạn.
2. Access token đó dùng để xác thực và được **tái tạo liên tục**.
3. Nếu bạn ngồi idle hơi lâu, access token hết hạn: bạn ăn một lỗi **forbidden** và phải tự tay refresh trang để lấy token mới. *Mình thấy UX này chưa ngon — client đáng lẽ phải tự xin token mới thay vì bắt người dùng refresh.* Mình từng mất luôn câu hỏi đang gõ dở vì lý do đó.

Tiếp theo là endpoint **conversations** — danh sách hội thoại của bạn:

* Mỗi lần tạo chat mới, hệ thống tạo một **conversation với ID riêng**, và mọi thứ bạn làm trong đó nằm trong state của riêng nó.
* Đây là một **GET** kèm **offset = 0 và limit = 20**, tức họ dùng **paging (phân trang)**.
* Mình được trả về **16 conversations**, dù mình tưởng đã xóa hết. Hóa ra thao tác xóa không xóa sạch mọi thứ 😅.
* **Offset trong SQL không hề rẻ**: row không có kích thước cố định, nên database phải đọc hết các row từ đầu tới vị trí offset để tìm đúng row rồi mới bỏ đi. Offset càng lớn, query càng chậm.
* *Nhưng công bằng mà nói, chuyện này thường không đáng lo*: mỗi người dùng có bao nhiêu conversation đâu, và danh sách còn được lọc theo user. Trừ khi bạn tự tạo cả triệu conversation rồi nhảy tới offset 900,000 — **đừng làm thế**, backend sẽ không vui và API limit sẽ gõ cửa nhà bạn.

Điều làm mình trăn trở là **cả conversation lẫn message đều dùng random UUID**. Nếu mọi message của hàng triệu người dùng đều được lưu và tra cứu bằng ID ngẫu nhiên, database sẽ bị **random access (truy cập ngẫu nhiên) đập tơi bời**. Mình nhớ **Shopify** đã chuyển từ random UID sang **ULID (universally unique lexicographically sortable identifier — định danh duy nhất sắp xếp được theo thứ tự)** để có **tail performance** tốt hơn cho insert và truy vấn trang.

Một gợi ý nữa của mình: **cho các message phụ thuộc vào conversation ID**, để message sinh ra trong cùng một hội thoại có thứ tự với nhau — vì khi kéo message, bạn gần như luôn kéo các message liên quan trong cùng hội thoại. Với message, mình **ủng hộ ULID hoàn toàn**: message mang tính thời gian, bạn gần như chỉ đọc các message mới, và message tạo gần nhau nằm gần nhau trong cùng data page là điều cực tốt. Các ID ngẫu nhiên còn khiến **buffer pool phải nạp/đuổi trang liên tục (trashing)** nếu database dùng **clustered primary key như MySQL** — buộc họ phải xài buffer pool khổng lồ trong bộ nhớ chia sẻ. Còn conversation thì giữ UUID hay đổi sang ULID, không quan trọng lắm. *Đây là điểm mình tâm đắc nhất: hiểu cách database đánh index là hiểu luôn vì sao ID sinh ra theo thứ tự lại quý giá đến vậy.*

---

### 🎯 Mổ xẻ request "hi": POST kèm event stream

Trước khi gửi message, mình thử bấm **New chat**: hóa ra nó **không tạo gì trên server** — chỉ fetch lại danh sách conversation. Conversation thật sự được sinh ra khi mình gõ "hi".

Vậy request đó có gì đặc biệt?

* Client gửi một **POST** tới conversation API, và trong request header nói rõ: "tôi đang chờ một **event stream**". Response trả về có content type là **`text/event-stream`**.
* Nhưng nếu bạn click vào tab **EventStream** trong DevTools, nó **trống trơn**. Lý do: DevTools chỉ đọc event stream khi bạn dùng **EventSource API** của trình duyệt — thứ mà ChatGPT **không dùng**. Họ tự viết thư viện client riêng: chỉ là gửi request rồi đọc dần response trả về, một response bị chẻ nhỏ bằng token của chính họ.
* Nếu dùng EventSource chuẩn, mỗi message phải kết thúc bằng **ký tự xuống dòng kép**; họ không muốn vậy, có lẽ họ truyền token/định dạng đặc biệt của riêng mình. Muốn "ngửi" được nội dung server trả về thì phải dùng proxy man-in-the-middle hoặc Fiddler.

Còn payload thì thú vị không kém:
* Mỗi message bạn gửi có **ID duy nhất do chính client tạo** (của mình là 80), kèm theo **parent message ID**. Chuỗi liên kết này để ChatGPT nối các message trong cùng một conversation: bạn troll nó "1 + 1 = 3", nó cãi, bạn nói "sai rồi" — nó vẫn biết bạn đang nhắc tới message nào. **Về bản chất nó vẫn là stateless (không lưu trạng thái)**, nhưng các message được nối với nhau bằng link để tạo cảm giác "nhớ" ngữ cảnh.
* Request gửi kèm model. Mình thấy một endpoint kiểu "server hỗ trợ model nào?" và câu trả lời là dùng **text-davinci-002** (dù 003 vừa mới ra mắt), với **4097 token** và được train tới **tháng 6/2021** — nên nó không biết gì sau mốc đó. Họ gọi tên định danh model là **slug**. *API này sạch sẽ đến mức mình phải khen.*
* Sau đó là các call **moderation**: mỗi message đều được gửi đi kiểm duyệt kèm **ID hội thoại lẫn ID message**, kể cả câu trả lời của bot cũng bị kiểm duyệt. Việc gửi cả hai ID giúp **selectivity cao** — database lọc được tập kết quả nhỏ nhất, query nhẹ nhất có thể.
* Chuyện đặt tên hội thoại cũng hay: bạn không tự đặt tên, ChatGPT **dùng chính nó để đặt tên** — gửi conversation ID + message ID vào endpoint generate title. Hội thoại của mình chỉ có mỗi chữ "hi" nên được đặt tên là *"Greetings or help request"*. *Mình xài phí thật 😅.*
* Cuối cùng là **feedback API**: thumbs up gửi thẳng; thumbs down mới kèm tags (harmful, "con robot này đang cố giết chúng ta", great answer...). Feedback đi qua **một connection/domain khác hẳn** — đó là lý do lại thấy rainbow màu trong DevTools.

Và mình còn thử thách ChatGPT viết **JavaScript client-side cho SSE mà không dùng thư viện EventSource**. Nó viết code dùng request kiểu cũ, rồi mình yêu cầu viết lại bằng **fetch**: thay vì `response.json()` hay `response.text()` (đọc hết rồi mới trả về), bạn phải lấy **stream reader** từ response body và đọc dần từng mảnh. Đó chính là **streaming (truyền dần)** — dữ liệu về tới đâu xử lý tới đó, đúng kiểu ChatGPT "nhả chữ". *Với mình đây là game changer thật sự.*

---

### 🧪 Thí nghiệm cuối: để hai ChatGPT tự nói chuyện với nhau

Phần này là món mình thích nhất. Mình viết một đoạn JavaScript: xóa toàn bộ `body` của trang, tự dựng lại thành các **frame** chứa nhiều cửa sổ ChatGPT nằm cạnh nhau.

Kịch bản rất đơn giản:
1. Gõ câu hỏi vào con thứ nhất.
2. Lấy câu trả lời, tìm **đoạn văn cuối cùng** — chính là câu hỏi ngược nó vừa đặt cho mình.
3. Dán câu hỏi đó sang con thứ hai, rồi lặp lại vô hạn.

Tại sao phải nhét tất cả vào cùng một trang? Vì **cookies** — chúng chỉ được gửi trong domain của OpenAI, mở iframe từ domain khác là bó tay.

Kết quả: hai con bot "dạy nhau" đủ thứ — quang hợp ở thực vật, phản ứng phân hạch và nhà máy điện hạt nhân, vai trò của enzyme, ba trạng thái vật chất, phát minh quan trọng nhất lịch sử, sự khác nhau giữa millimeter/meter... Có lần chúng rơi vào vòng lặp "tôi có thể giúp gì cho bạn" mãi không dứt. Có lần một con bị hỏi câu cá nhân kiểu "môn thể thao yêu thích" liền trả lời kiểu người máy: "tôi là một language model, tôi không có sở thích" — rồi quay ngoắt về quang hợp. Access token hết hạn ngay giữa cuộc vui, nhưng các bạn hiểu ý tưởng rồi đấy.

Điều mình muốn các bạn mang về: **SSE chỉ là một request-response sống lâu bị chẻ thành nhiều thông điệp logic**, HTTP/2 giúp nó không chiếm chết connection, còn việc "nhả chữ" từng token chính là đọc stream dần ở client. *Hiểu được cơ chế này, các bạn sẽ tự tay debug và tự tay xây được những endpoint streaming y hệt — không cần chấp nhận hộp đen.* Hẹn gặp các bạn ở video tiếp theo, nơi mình sẽ tiếp tục mổ xẻ backend! 🚀
