# 🔄 Request/Response: Pattern kinh điển nhất của backend và những chi phí ẩn bên dưới đường truyền

Nếu phải chọn một pattern giao tiếp duy nhất để nói về backend, mình chọn **request/response (yêu cầu/phản hồi)** — thanh lịch, kinh điển và có mặt ở khắp mọi nơi. Nhưng "gửi request rồi nhận response" nghe đơn giản bao nhiêu thì bên dưới đường truyền lại phức tạp bấy nhiêu. Các bạn cùng mình bóc từng lớp nhé.

### 🔍 Ranh giới của một request: thứ đắt giá mà ít ai để ý

Trong mô hình request/response, **client gửi request, backend xử lý rồi trả về response**. Mình có thể dành cả một khóa học chỉ để nói về request/response vì có quá nhiều thứ diễn ra bên trong nó.

Việc đầu tiên là phải định nghĩa **request là gì**. Dữ liệu client gửi không giống một lá thư — không phải một "cục" duy nhất. Trong TCP, nó thường là **một dòng dữ liệu liên tục (continuous stream)**, và server phải parse dòng dữ liệu đó để tìm **đâu là điểm bắt đầu, đâu là điểm kết thúc của request**.

Ví dụ: client có thể đã gửi liền một lúc **3 request**. Làm sao server biết đó là 3 request chứ không phải một request lớn? *Ranh giới của request là chuyện sống còn, và chi phí parse request không hề rẻ — đây chính là thứ mà backend engineer phải hiểu.*

* **Parse ≠ hiểu ≠ thực thi**: nhận được một GET request và biết nó là GET là một chuyện; còn **thực thi** request đó — gọi API, query database — lại là chuyện khác.
* **Response cũng có ranh giới**: client phải biết response bắt đầu ở đâu, kết thúc ở đâu, rồi parse và consume (hiển thị lên trang, hoặc tạo request mới).
* **Cấu trúc do hai bên thỏa thuận**: request structure được định nghĩa bởi cả client và server dựa trên protocol đang dùng. Ví dụ `GET / HTTP/1.1` + path + version protocol, theo sau là headers, kết thúc bằng CRLF (carriage return), rồi tới body — tất nhiên GET thì không có body.

Tin vui là công việc này **đã được các thư viện làm sẵn** — HTTP library, ví dụ Express dùng http server của Node.js — nhưng đừng quên nó vẫn là **một phần trong app của các bạn đang chạy**.

Mục tiêu của khóa học là hiểu backend từ A đến Z, **từ byte đầu tiên của request**. Vì không chỉ code bạn viết mới là backend — mọi thư viện bạn tham chiếu cũng đang làm việc. *Hiểu các thư viện đó làm gì là chìa khóa để trở thành engineer giỏi hơn, để không ai "lừa" được bạn, và để bạn nói chuyện được ở mọi tầng của stack.*

---

### 🧩 Parse, xử lý và serialize — ba tầng chi phí

Nhiều bạn sẽ thắc mắc: **serialization (tuần tự hóa)** nằm ở đâu? Nếu payload là JSON, XML hay protocol buffer, mình xếp nó vào phần **xử lý request**.

* Parse mới chỉ để hiểu "bắt đầu ở đây, kết thúc ở đây".
* Sau đó còn một bước nữa: **deserialize** nội dung thành thứ ngôn ngữ lập trình phía server hiểu được — và bước này **có chi phí**.

Với HTTP — vốn là text — mọi thứ dễ đọc hơn; nhưng khi payload là JSON, XML, protocol buffer hay format binary bạn tự chế, thì **cả client lẫn server đều phải hiểu và parse được format đó**, rồi dựng lại thành object dùng được trong app.

Vì sao người ta bỏ SOAP/XML để sang JSON REST? Một lý do lớn: **parse XML đắt hơn parse JSON rất nhiều**. Nhưng parse JSON cũng chậm — đó là lý do người ta tiếp tục chuyển sang **protocol buffers** như một lựa chọn parse nhanh.

Đây cũng là cuộc chiến giữa **plaintext, human-readable và hiệu năng**: JSON nhìn vào là hiểu, rất dễ chịu... nhưng cái giá là **kích thước** và **thời gian parse**.

Ví dụ với C++: có những **C++ JSON parser** nhận một đống byte trông giống JSON, parse rồi dựng lại thành cấu trúc C++ dùng được — đó là cây cầu nối. Mình từng thấy application mà JSON lớn mất tới **2 giây** chỉ để parse; đó là lúc câu hỏi "parser nào tốt, parser nào không" trở nên rất thật.

*JavaScript parse JSON rất nhanh vì JSON vốn sinh ra từ JavaScript — nhưng vẫn có chi phí, chỉ là nó nhanh. Nhanh hơn được nữa hay không lại là câu chuyện khác.*

---

### 🌐 Request/response ở khắp mọi nơi: HTTP, DNS, RPC, SQL và họ nhà API

**Web = HTTP** — HTTP là một request response protocol, không hơn không kém.

**DNS** cũng là request response protocol. Bạn gửi một DNS resolution request — "IP của google.com là gì?" — qua **UDP**, đóng trong một **datagram** kèm **query ID**. Khi resolver tìm ra câu trả lời, nó ghi lại kèm đúng query ID đó để biết câu trả lời thuộc về request nào — vì client có thể gửi **100 DNS request cùng một lúc**.

*Bài học đắt giá: đừng bao giờ tin vào thứ tự (order) trong backend engineering.* Đó cũng là lý do **pipelining** bị khai tử, và **head-of-line blocking** cũng là hệ quả của cùng một vấn đề. Ngay cả việc liệt kê thư mục (`ls`) cũng là request/response: gửi request tới server, nhận về danh sách thư mục.

**RPC (Remote Procedure Call)** — phong cách kinh điển, về bản chất vẫn là request response: bạn gửi request yêu cầu thực thi một method, chỉ có điều method nằm ở **remote server** thay vì máy local. RPC phổ biến vì lập trình viên client **không cần biết** đó là local hay remote — họ muốn abstraction đó.

*Nhưng ngay khi thêm abstraction, bạn thêm sự bất định:* method này nhanh vì sao, chậm vì sao? Giờ bạn phải hiểu nó chậm vì đi qua network — thế là mục đích "không cần biết" bị phá vỡ. **Leaky abstraction là thứ tệ nhất**, và đây là điều các bạn phải cực kỳ cảnh giác.

**SQL** cũng là một request response protocol: bạn gửi query, database **parse SQL**, **prepare một execution plan** (index này tốt, bitmap index rất tốt, index-only scan tốt — còn full table scan là khi bạn đòi quá nhiều dữ liệu), rồi thực thi, query dữ liệu từ các table, build response và trả về.

**API** đủ loại: **REST (Representational State Transfer)** và **SOAP (Simple Object Access Protocol)** — SOAP hiếm khi dùng nhưng vẫn sống trong enterprise; mình từng thấy một hai hệ thống enterprise còn chạy SOAP. *Quan điểm của mình: nếu nó chạy được thì để nó chạy — trừ khi gặp hạn chế thật sự, đừng tối ưu sớm những thứ không cần tối ưu.*

**GraphQL** — rất phổ biến, được Facebook phát triển. Ý tưởng: **gói nhiều request khác nhau vào một** để tránh bị **chatty (gọi quá nhiều lần)**. Mỗi request/response đều phải trả cái "header" của nó; phải gọi quá nhiều lần chính là điểm yếu của request response.

* Với REST, mọi thứ bạn mô tả đều là **resource**, nên muốn lấy user + comments + full name + mọi thứ trong một khoảng thời gian thì phải gọi nhiều request.
* GraphQL nói: "gửi cho tôi một syntax và backend sẽ lo." Về mặt kỹ thuật nó vẫn tạo nhiều query xuống database (tùy bạn có tạo view hay không), nhưng nó **dời chuỗi request từ client → backend xuống backend → database**, và nhờ nắm context, nó có thể loại bỏ một số SQL query nếu được implement và configure đúng.

---

### 🖼️ Ví dụ upload ảnh: gửi một khối hay chia chunk?

Giả sử bạn xây một **image service** và client upload ảnh theo mô hình request/response.

1. **Gửi nguyên khối**: lấy toàn bộ ảnh và gửi thẳng lên đường truyền. Đơn giản nhất — nhưng có **giới hạn**. Ảnh 7GB thì sao? Vẫn gửi được, nhưng giới hạn là có thật.
2. **Chia chunk (chia nhỏ)**: cắt ảnh thành nhiều phần nhỏ, mỗi request mang một chunk.

Cách chia chunk thắng ở chỗ: nếu vài phần bị fail, cách gửi nguyên khối khiến server nhận được 3/4 ảnh rồi đứt kết nối, nó nghĩ "client chẳng gửi gì cả" và xóa sạch (tùy backend của bạn làm gì).

Với cách chia chunk, bạn **đánh dấu mỗi chunk bằng một unique identifier**: server nói "tôi có chunk 1, 2, 3, nhưng chưa nhận được gì sau đó"; client đáp "tổng cộng 7 chunk, tôi mới gửi 3" — hai bên **resume (tiếp tục) chính xác chỗ dừng**. Về bản chất vẫn là request response, chỉ có **style of execution (cách thực thi)** thay đổi.

Server gom các chunk và **assemble (lắp ráp)** lại. Điểm hay nữa: client có thể **lưu state local** — "tôi đã upload cái này, còn thiếu cái kia" — rồi hỏi server để hai bên **synchronize state (đồng bộ trạng thái)** với nhau. *Nhưng luôn có cái giá cho mọi thứ, và cách này không dùng được ở mọi nơi.*

**Vậy request/response "không hợp" ở đâu?**

* **Notification service**: ai đó vừa login, vừa upload video, vừa comment story... bạn muốn biết ngay. Nhưng client là bên phải hỏi, còn **kiến thức lại nằm ở server**. "Tôi có notification không? Không. Tôi có notification không? Không." — đó là **polling**, sẽ có bài riêng, và nó **không scale tốt**.
* **Chat app**: "có ai vừa chat chưa?" lặp đi lặp lại — không thể làm nếu không tạo ra vô số request. Nếu cố, **latency (độ trễ)** sẽ cực cao, và bạn spam network bằng những request rỗng tới mức làm nghẽn mạng.
* **Long-running request**: gửi request xử lý lâu thì client chỉ ngồi chờ. Làm được, nhưng tốt hơn là dùng **asynchronous processing**. Và nếu client ngắt kết nối giữa chừng rồi quay lại, nó không biết request đã xong chưa.

*Và đây chính là lý do section này tồn tại: mình sẽ lần lượt giải quyết những bài toán trên bằng các design pattern khác nhau.*

---

### ⏱️ Dòng thời gian thật của một request (và màn demo với curl)

Nhìn vào timeline giữa client và server, các bạn sẽ thấy thời gian bị "xé" thành rất nhiều phần:

1. **Viết request cũng tốn thời gian** — serialize JSON sang binary, serialize protocol buffer từ object... rồi **flush ra network**, lúc đó mới thật sự là "tôi gửi xong".
2. **Request đi trên network không phải một mũi tên thẳng mà nằm nghiêng** — vì nó tốn thời gian để đến. Với TCP, request bị cắt thành **segment**, nhét vào **IP packet**, được **route** trên Internet; vài packet **đến sai thứ tự** và phải được **reorder** ở server.
3. **Server nhận và hiểu request, rồi xử lý** — trong suốt thời gian đó client vẫn ngồi chờ.
4. **Server viết response**, execution chạy tiếp, transfer chạy tiếp — client nhận được response, kèm cả chi phí reorder, parse response và **serialize ngược về object**.

Để thấy tận mắt, mình demo với `curl` — client library cực phổ biến do **Daniel Stenberg** phát triển — dùng `--trace` để lấy càng nhiều thông tin càng tốt, query một trang qua **HTTP thuần trên port 80** (không dùng HTTPS vì TLS xứng đáng có một bài riêng). Kết quả trong file output:

1. **DNS** phân giải để lấy IP của Google.
2. **TCP connection** được thiết lập tới Google port 80.
3. Gửi **request**: mũi tên sang phải thể hiện đó là request — `GET / HTTP/1.1` + headers (`Host: google.com`, `User-Agent: curl` và chấp nhận mọi thứ). Hết headers là hết request — GET không có body; nếu là POST sẽ có thêm phần headers và body.
4. Nhận **response headers trước tiên** (HTTP luôn hoạt động vậy): `HTTP/1.1 301 Moved Permanently` — "google.com không tồn tại, hãy sang www.google.com". `Location` sẽ gây redirect, nhưng curl mặc định không redirect nên đó là kết quả cuối cùng.
5. Từng header hiện ra trông như được nhận lần lượt từng cái — có thể chỉ là cách curl hiển thị cho dễ hiểu, còn thực tế nó nhận một loạt byte và **xử lý ngay khi byte về tới**; `Content-Length` và tất cả headers đều đã được nhận.
6. Cuối cùng là **body** — trang HTML với nội dung "Moved Permanently", để bạn biết mình cần đi chỗ khác.

Vậy là xong một vòng request/response: **rất đơn giản, rất thanh lịch**.

Nhưng như các bạn thấy, "đơn giản" chỉ đúng ở bề mặt. Ở bài tiếp theo, chúng ta sẽ sang một mô hình đối lập hoàn toàn: **push — server chủ động đẩy dữ liệu về client**. Hẹn gặp lại các bạn! 🚀
