# 🛡️ Xây backend an toàn: 10 rủi ro bảo mật OWASP mà mọi developer nên nằm lòng

> Nguồn: `058-Building-Secure-Backend-Applications-OWASP-recommendations.txt` · [Udemy](https://ua.udemy.com/course/fundamentals-of-backend-communications-and-protocols/learn/lecture/50437129)

Nếu các bạn muốn xây dựng backend an toàn, có **mười lỗ hổng bảo mật** cần để mắt tới và đưa vào ngay từ giai đoạn thiết kế — cho cả backend lẫn frontend. Đây là danh sách do **OWASP (Open Source Web Application Security Project — tổ chức chuẩn bảo mật ứng dụng web)** đề xuất, và mình tin mọi developer đều nên có sự quen mặt với nó.

Các bạn không cần implement đầy đủ mọi thứ ngay — trước hết là **biết để mà tránh**. Có thể ứng dụng của bạn không dùng SQL, không dùng XML, chẳng dính mục nào trong số này, nhưng chỉ cần có awareness là bạn đã đi trước rất nhiều người. Nào, cùng đi qua từng mục.

### 🎯 OWASP Top 10: bước đầu tiên để thay đổi văn hóa viết code

OWASP khuyến nghị các công ty hãy áp dụng tài liệu này và bắt đầu quy trình đảm bảo ứng dụng web của mình giảm thiểu các rủi ro. Sử dụng OWASP Top 10 có lẽ là **bước đầu tiên hiệu quả nhất** để thay đổi văn hóa phát triển phần mềm trong tổ chức, hướng tới việc sản sinh ra code an toàn hơn.

Nhưng nhớ cho: **đây chỉ là bước đầu tiên, không phải tất cả**. Danh sách này là sự khái quát hóa mọi kiểu tấn công có thể thành mười nhóm. Vẫn có những đòn tấn công nằm ngoài danh sách — nhưng theo trải nghiệm của mình, **khoảng 90% các vụ tấn công đều nằm gọn trong này**, và cá nhân mình chưa từng thấy một cuộc tấn công nào không thuộc một trong mười nhóm đó.

Danh sách mười rủi ro: 1) Injection, 2) Broken Authentication, 3) Sensitive Data Exposure, 4) XML External Entities (XXE), 5) Broken Access Control, 6) Security Misconfiguration, 7) Cross-Site Scripting (XSS), 8) Insecure Deserialization, 9) Using Components with Known Vulnerabilities, 10) Insufficient Logging & Monitoring.

---

### 💉 Injection và Broken Authentication: hai kẻ đứng đầu bảng

**1. Injection** — cái tên quen thuộc nhất chắc chắn là **SQL injection**. Vấn đề nằm ở việc ứng dụng backend **không sanitize tham số đầu vào** trước khi đưa vào câu lệnh SQL. Hậu quả: kẻ tấn công có thể **drop nội dung, drop database, drop table, phá cấu trúc dữ liệu**, hoặc **rò rỉ những thứ đáng lẽ không được rò rỉ**.

Ví dụ kinh điển: câu `WHERE name = '` + chuỗi người dùng nhập + `'`. Kẻ tấn công đặt tên mình là `Adam` rồi thêm `';--` và nối thêm câu lệnh khác như `DROP TABLE students`. *Tất nhiên chuyện này thường không thành nếu bạn cấu hình database user không có quyền drop.* Vì vậy best practice là:

* Ứng dụng REST của bạn **không nên là admin** của database.
* Nên là một database user bị **cắt bỏ quyền hạn**, với **mật khẩu phức tạp**.
* Chỉ cấp duy nhất quyền **select** khi chỉ cần truy vấn.

Một biến thể khác để moi thêm dữ liệu: `WHERE name = 'Adam';--` hoặc `OR 1 = 1` — thế là toàn bộ nội dung bị lôi ra và trả về cho kẻ tấn công.

**2. Broken Authentication** — các chức năng liên quan xác thực và quản lý session thường được implement sai, cho phép kẻ tấn công chiếm mật khẩu, key, session token, hoặc mạo danh người dùng khác tạm thời hay vĩnh viễn. Nếu bạn có endpoint đăng nhập và mình có thể viết script **credential stuffing** — thử user này với cả một dictionary password — mà bạn **không chặn, không khóa, không làm chậm** lại, thì hệ thống xác thực đã hỏng. Không quan trọng backend có "secure" thế nào, cứ để người ta brute force thoải mái là dở.

Security hygiene tốt ở đây là: **tăng timeout sau mỗi lần đăng nhập thất bại**, khóa user vài phút rồi nhân đôi — nhiều hệ thống dùng cả dãy kiểu Fibonacci (2, 5, 9... phút) để mỗi lần thử lại càng chậm hơn. Một kiểu broken authentication khác là **session quá dài**: session không hết hạn trong 5 tiếng đồng hồ. Ai đó đăng nhập ở thư viện rồi đóng browser; người tiếp theo mở browser lên, cookie vẫn còn nguyên và thế là đang đăng nhập dưới tài khoản của người kia.

---

### 🔒 Sensitive Data Exposure và XXE: bảo vệ dữ liệu ở đâu?

**3. Sensitive Data Exposure** — rất nhiều web app và API không bảo vệ đúng mức **dữ liệu tài chính, y tế và PII**. Kẻ tấn công có thể đánh cắp hoặc sửa đổi dữ liệu được bảo vệ yếu để gian lận thẻ tín dụng, đánh cắp danh tính... Ví dụ thực tế: **vụ rò rỉ của Uber khoảng năm 2016**, với khoảng **50 triệu số an sinh xã hội và địa chỉ của người dùng** bị lộ.

Có hai loại dữ liệu nhạy cảm cần bảo vệ:

* **Data at rest** — dữ liệu nằm trong database. Có người đi tới mức **mã hóa toàn bộ**, nhưng đó là lượng công việc lớn: mã hóa rồi thì **key để ở đâu**, khi cần lại phải giải mã. Bạn có thể làm **end-to-end** để chính người dùng giải mã — nhưng như vậy backend không thể chạy các async job trên dữ liệu đó. Nghĩ kỹ thì đây *cũng là điều tốt*: chỉ bạn đọc được dữ liệu của mình.
* **Data in transit** — dữ liệu đang di chuyển trên mạng. Bảo vệ bằng **TLS (Transport Layer Security)**, mã hóa giữa hai bên. Các bạn nên hiểu rõ thuật toán mật mã nào còn an toàn, cái nào đã hết, và sự khác nhau giữa **TLS 1.2 và TLS 1.3**.

| Tiêu chí | Data at rest | Data in transit |
|---|---|---|
| Nằm ở đâu | Trong database | Trên đường truyền mạng |
| Cách bảo vệ | Mã hóa, có thể end-to-end | TLS giữa hai bên |
| Đánh đổi | Key để ở đâu, backend khó chạy async job trên dữ liệu mã hóa | Phải chọn thuật toán còn an toàn, TLS 1.2 hay 1.3 |

Một web server đầu tiên từng tiên phong bật **HTTPS mặc định** đã giúp chúng ta rất nhiều trong việc này, và ngày nay gần như mọi web server đều mặc định HTTPS — điều rất đáng mừng. Nhưng công lớn thực ra đến từ **HTTP/2**: HTTP/2 buộc phải được mã hóa, *và đó không phải chuyện ngẫu nhiên*. Lý do rất thú vị: giao thức này trên đường truyền (wire protocol) là **breaking change hoàn toàn** so với HTTP cũ — có stream, có header khác biệt — khiến các **middlebox** đứng giữa phát hoảng, chặn traffic và drop packet. Giải pháp của họ là mã hóa toàn bộ, nên HTTP/2 mặc định luôn được mã hóa. *Vậy là chính sự cứng nhắc của những chiếc hộp cũ kỹ từ năm 1992 ngoài kia lại vô tình đẩy chúng ta đến một thế giới security-by-default — một kết quả tốt đẹp ngoài dự tính.*

**4. XML External Entities (XXE)** — nhiều XML processor cũ hoặc cấu hình cẩu thả vẫn **đánh giá các tham chiếu external entity** trong tài liệu XML. External entity có thể bị lợi dụng để **tiết lộ file nội bộ** qua URI handler, **file share nội bộ**, **quét port nội bộ**, **remote code execution** và **denial of service**.

Cơ chế: XML có tính năng `SYSTEM entity` — khai báo một entity rồi trỏ tới một URI (Universal Resource Identifier) bất kỳ. Nếu backend của bạn cho upload XML (tính năng export/import chẳng hạn) và kẻ tấn công nạp vào một XML trỏ tới `/etc/passwd`, parser sẽ **đọc file đó và nhét nội dung vào tài liệu XML**, rồi tài liệu mới được parse và **trả ngược lại cho kẻ tấn công**. Đó là một tính năng bị lạm dụng, và hậu quả rất tệ nếu parser không validate đúng. *Cá nhân mình thấy XXE nên được gộp chung với Insecure Deserialization ở mục số 8 — nó đứng riêng một mục trông hơi lạ.*

---

### 🚪 Broken Access Control và Security Misconfiguration: lỗi của cả hệ thống

**5. Broken Access Control** — các giới hạn về việc người dùng **đã xác thực (authenticated)** được phép làm gì thường không được enforce đúng. Chúng ta đã đăng nhập, đã có token — hệ thống biết ta là ai. Nhưng ta có được **authorized** để truy cập `/admin`, `/system` hay `/data/passwords` không? Đó là câu hỏi hoàn toàn khác. Kẻ tấn công lợi dụng lỗ hổng này để truy cập chức năng/dữ liệu trái phép: tài khoản của người khác, xem mật khẩu, file nhạy cảm.

Ví dụ nổi bật: **HTTP smuggling**, khi có **reverse proxy** đứng giữa. *Đây thật ra không phải lỗi của bạn với tư cách backend engineer, mà là lỗi của người thiết kế hệ thống.* Nhưng chính vì vậy, một backend engineer phải **biết rõ thứ mình xây, thứ đứng trước mặt mình và thứ nằm sau lưng mình**. Có cả phiên bản tệ hơn: HTTP/2 smuggling, HTTP/2 over cleartext smuggling — bất cứ thứ gì cho phép **tuồn request HTTP lậu** qua lớp bảo vệ đều nguy hiểm. Node.js cứ ba tháng lại ra bản vá broken access control (tháng 2/2021, tháng 12/2020...); nginx, HAProxy cũng từng dính.

Vấn đề gốc nằm ở **đàm phán giao thức (protocol negotiation) giữa backend và frontend**. HTTP/1.1 là tệ nhất: làm sao biết request bắt đầu và kết thúc ở đâu? Toàn bộ chỉ là một mớ TCP segment; bạn phải gom lại, đợi đủ, thấy `GET HTTP/1.1`, rồi một `POST` và **chưa có dấu xuống dòng kết thúc** — phải **đợi tiếp**; segment sau tới mang theo `\r\n`; rồi header `Content-Length` báo 100 ký tự, thế là từ cuối phần header đi thêm 100 ký tự ta có body. *HTTP/1.1 đúng kiểu "hacky as F".* HTTP/2 giải quyết được nhờ khái niệm **stream**: mỗi stream định danh duy nhất một request, và một stream chỉ chứa một request tại một thời điểm.

**6. Security Misconfiguration** — điều mình nhắc đi nhắc lại trong các bản tin software: **hàng loạt Elasticsearch, MongoDB, PostgreSQL bị quét trên internet**. Người ta quét ngẫu nhiên các IP, nhất là trên những instance AWS phổ biến, và rất nhiều người **lười cấu hình**: deploy mặc định rồi ship luôn. Chắc hẳn bạn muốn mở port 5432? Mở luôn firewall? Cho nó vào?

*Không có bất kỳ use case nào trên đời mà database của bạn cần phơi ra internet công khai.* Hãy đặt một reverse proxy hoặc một ứng dụng phía trước để bảo vệ nó. Cấu hình `pg_hba.conf` kiểu `all all all md5` với tư duy "cho hết cho dễ" là sai — *mình cũng từng làm vậy trong tutorial, nhưng mình luôn nói rõ đó là cách làm lười biếng.* Misconfiguration thường đến từ default config không an toàn, cấu hình tùy hứng chắp vá, cloud storage mở toang, HTTP header cấu hình sai...

---

### 🕸️ Bốn mục cuối: XSS, deserialization, phụ thuộc và giám sát

**7. Cross-Site Scripting (XSS)** — xảy ra khi ứng dụng nhét dữ liệu không đáng tin vào trang mới mà không validate hay escape đúng, hoặc cập nhật trang bằng dữ liệu người dùng qua browser API tạo ra HTML/JavaScript. XSS cho phép kẻ tấn công **chạy script trong browser của nạn nhân**: cướp session người dùng, chỉnh sửa giao diện website.

Nhớ lại **bug XSS trên Twitter khoảng 2010–2011**: ai đó chế ra một tweet chứa JavaScript, chỉ cần bạn **nhìn thấy tweet đó** là script tự chạy và... **retweet chính nó** — kiểu `document.getElementById(...).click()` vào nút retweet. Thời đó không có prompt xác nhận, và chỉ cần một tài khoản **triệu follower** nhìn thấy là cả Twitter "đi đứt". Nguy hiểm hơn, nếu chèn được script vào một input, bạn có thể thực thi lệnh `fetch` request **trên chính site người dùng đang ở**. Ví dụ trong ngữ cảnh ngân hàng: một ô nhập liệu hở, script gửi POST tới endpoint chuyển tiền để chuyển tiền từ tài khoản này sang tài khoản kia. *Thực tế các giao dịch lớn có CAPTCHA và xác thực hai, ba, bảy lớp — nhưng đó chính là để chống đúng kiểu tấn công này.*

Điểm chí mạng: **cookie không cứu được bạn**, thuộc tính SameSite trên cookie cũng không, vì kẻ tấn công đang ở **cùng site** với bạn. Thứ duy nhất bảo vệ được bạn là **tắt inline script** — tuyệt đối không cho phép inline script chạy (mấy cái quảng cáo thì ai quan tâm), và chỉ cho thực thi từ các URL đáng tin qua **Content Security Policy**. Hãy nhớ: XSS là lỗi phía frontend, nhưng cách sửa thì **nằm ở backend**.

**8. Insecure Deserialization** — trước hết, **serialization** là việc bạn lấy object trong bộ nhớ (C#, Java, JavaScript, Go...) và chuyển thành string hoặc byte string (protocol buffer, XML, JSON...), rồi gửi qua mạng, vì bạn không thể gửi thẳng một object bộ nhớ qua đường truyền. Đầu bên kia sẽ **deserialize** để dựng object trở lại. Trong bước này, nếu deserializer của bạn dở và kẻ tấn công hiểu rõ cách nó hoạt động, hắn có thể **tiêm code vào một field** mà deserializer **mù quáng thực thi** — Java có những API kiểu này và rất nguy hiểm. Kết quả: **remote code execution**, injection, **leo thang đặc quyền**. Như đã nói, mình muốn gộp mục này chung với XXE và biến danh sách thành 9 — *có lẽ người ta giữ đủ 10 vì "top 9" nghe không hấp dẫn bằng.*

**9. Using Components with Known Vulnerabilities** — xin chào **OpenSSL** và **Heartbleed**, cùng vô số package npm mờ ám mà các bạn cài vào app React của mình. Hàng loạt thiết bị IoT vẫn đang chạy OpenSSL phiên bản cũ dính Heartbleed và **vẫn có thể bị tấn công**. Nếu ứng dụng của bạn tham chiếu tới OpenSSL hay bất kỳ component yếu, dính lỗ hổng nào — **bạn bị ảnh hưởng**, bất kể code của bạn có sạch đến đâu: từ rò rỉ thông tin nhạy cảm cho tới bị **DoS bằng crash server** chỉ vì một lỗi buffer overflow.

**10. Insufficient Logging & Monitoring** — thiếu logging và monitoring, cộng với việc tích hợp báo cáo sự cố thiếu hoặc kém hiệu quả, cho phép kẻ tấn công tiếp tục đánh sâu hơn, duy trì hiện diện và **pivot sang nhiều hệ thống khác**. Từ đầu năm 2020 đến nay, bao nhiêu vụ outage lớn đã được bàn tới: Google, Slack, Microsoft, Amazon sập — tất cả đều thiếu monitoring và logging. Nếu có một cuộc tấn công đang diễn ra mà bạn không có log, kẻ tấn công càng dễ lẻn vào sâu hơn. Bạn cần một cách để **phát hiện tấn công** — không có nó là thảm họa. Nhìn **SolarWinds** mà xem, Microsoft đang vật lộn đến thế nào. *Mình không trách Microsoft trong chuyện này. Mình ghét gọi những kẻ đó là "hacker" — chúng là thiên tài. Phương pháp chúng dùng chưa ai trong giới bảo mật từng nghĩ tới, và đó là lý do forensics mất rất nhiều thời gian; cũng chính vì vậy Microsoft đang tăng cường mạnh forensics, logging và monitoring.*

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao ứng dụng REST không nên dùng tài khoản admin của database?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì injection có thể drop nội dung, drop database, drop table — user bị cắt quyền hạn sẽ giới hạn thiệt hại.

Giải thích: Best practice là database user quyền tối thiểu, mật khẩu phức tạp, chỉ cấp quyền cần thiết như `select`.

Tham chiếu: Mục Injection và Broken Authentication.

</details>

**Câu 2:** Broken Authentication thường bị khai thác như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Credential stuffing — thử user với cả dictionary password mà không bị chặn, không khóa, không làm chậm.

Giải thích: Security hygiene là tăng timeout sau mỗi lần thất bại, khóa user theo dãy kiểu Fibonacci.

Tham chiếu: Mục Injection và Broken Authentication.

</details>

**Câu 3:** Data at rest và data in transit được bảo vệ khác nhau thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Data at rest mã hóa trong database với bài toán key để ở đâu; data in transit bảo vệ bằng TLS giữa hai bên.

Giải thích: Mã hóa end-to-end thì chính người dùng giải mã, nhưng backend không chạy được async job trên dữ liệu đó.

Tham chiếu: Mục Sensitive Data Exposure và XXE.

</details>

**Câu 4:** Cơ chế của XXE là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** XML có tính năng `SYSTEM entity` trỏ tới URI — parser cẩu thả sẽ đọc file nội bộ như `/etc/passwd` và nhét nội dung vào tài liệu trả về cho kẻ tấn công.

Giải thích: Hậu quả gồm tiết lộ file nội bộ, quét port nội bộ, remote code execution, denial of service.

Tham chiếu: Mục Sensitive Data Exposure và XXE.

</details>

**Câu 5:** Vì sao Insufficient Logging & Monitoring nguy hiểm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không có log thì không phát hiện được tấn công, kẻ tấn công càng lẻn vào sâu hơn và pivot sang nhiều hệ thống khác.

Giải thích: Các vụ outage lớn từ 2020 đến nay đều thiếu monitoring và logging.

Tham chiếu: Mục Bốn mục cuối.

</details>

Vậy các bạn thấy sao về danh sách này, và đã implement được mục nào chưa? Có thể bạn không dùng SQL, không dùng XML, không dính đủ cả mười — **bạn không cần implement tất cả, điều quan trọng là ý thức được chúng**. Với mình, OWASP Top 10 giống như tấm bản đồ tối thiểu mà bất kỳ ai làm backend cũng nên đọc qua một lần: hiểu để thiết kế, hiểu để review, và hiểu để không tự tin mù quáng rằng "code mình chạy được thì chắc là an toàn". Hẹn gặp lại các bạn ở bài tiếp theo! 🚀

## Nguồn tham khảo

- [Udemy — Building Secure Backend Applications (OWASP recommendations)](https://ua.udemy.com/course/fundamentals-of-backend-communications-and-protocols/learn/lecture/50437129)
- [OWASP — OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [OWASP — Top 10 2017](https://owasp.org/www-project-top-ten/2017/Top_10)
