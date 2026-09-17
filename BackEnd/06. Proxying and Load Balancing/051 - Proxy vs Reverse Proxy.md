# 🔀 Proxy và Reverse Proxy: Hai khái niệm nền tảng mà mọi backend engineer phải nằm lòng

Khi các bạn bắt đầu xem khóa học và gửi câu hỏi cho mình, một trong những câu hỏi mình thấy xuất hiện nhiều nhất là: "Proxy và **reverse proxy** khác nhau thế nào?". Đây là khóa học về networking, nhưng mình vẫn dành hẳn một bài cho chủ đề này, bởi nó chính là **cây cầu nối vào thế giới backend**. Là backend engineer, các bạn *phải* hiểu hai khái niệm này — vì API gateway, load balancer, sidecar container, service mesh, Envoy... tất cả đều hoặc là cái này, hoặc là cái kia.

Hãy cùng mổ xẻ từ định nghĩa cho tới chuyện gì thực sự xảy ra bên dưới đường truyền.

---

### 🎯 Proxy là gì — "một server đi request thay cho bạn"

Định nghĩa gọn nhất: **proxy (bên trung gian)** là một server đứng ra gửi request thay cho bạn.

Chuyện gì xảy ra khi bạn muốn vào `Google.com` mà máy bạn có cấu hình proxy?

* Nhìn từ **layer 4**: kết nối TCP được thiết lập **không phải với Google, mà với proxy trước tiên**.
* Nhìn từ **layer 7**: nội dung như `GET` xin `Google.com` được gửi tới proxy; proxy nhận ra đích đến rồi tự mở một **kết nối TCP hoàn toàn mới** giữa nó và Google.
* Google chỉ thấy **địa chỉ IP của proxy**, không bao giờ thấy bạn dưới dạng một địa chỉ IP.

Về nội dung tầng ứng dụng, dữ liệu được gửi đi gần như nguyên vẹn; một số proxy HTTP còn tự thêm header như `X-Forwarded-For`. Nếu header đó xuất hiện, client gốc có thể bị nhận diện từ **layer 7** — nhưng nhìn từ **layer 4**, Google chỉ biết đúng một thứ: proxy.

*Điểm cốt lõi mình muốn các bạn nhớ: trong mô hình proxy, **client biết server nhưng server không biết client**.* Ngoại lệ duy nhất là khi proxy tự thêm header để lộ danh tính client — mà mình gọi đùa là "ăn gian".

---

### 🛡️ Vậy người ta dùng proxy để làm gì?

Nghe xong có thể các bạn nghĩ: "Vậy để làm gì nhỉ, nghe hơi vô dụng?". Không hề. Đây là những use case mình thấy hằng ngày:

1. **Ẩn danh (anonymity)**: bạn không muốn bị nhận diện qua địa chỉ IP. Nhưng nhớ cho kỹ: proxy biết IP của bạn, nên bạn đang **đặt niềm tin vào proxy** — nó thêm IP của bạn vào request là xong.
2. **Caching**: proxy của một tổ chức có thể cache trang tĩnh; người khác trong cùng công ty truy cập lại sẽ được phục vụ từ cache. Kiểu này rất phổ biến ngày xưa, mọi request đều đi qua proxy của tổ chức trước.
3. **Logging & quan sát**: sidecar container và service mesh sống nhờ ý tưởng này — một proxy được cài nằm cạnh ứng dụng (gọi là **sidecar**), mọi request tới service A, B, C đều chảy qua nó. Bạn đo được một request mất bao lâu, log lại, monitor mọi thứ.
4. **Chặn website**: proxy nhìn thấy site bạn đang truy cập... và chặn. Chính vì nó nhìn thấy nên nó mới chặn được. Nhiều proxy HTTPS còn **giải mã traffic** để làm việc này.
5. **Debugging**: Fiddler hay man-in-the-middle proxy là ví dụ kinh điển — bạn cấu hình để mọi request chảy qua nó, và bạn nhìn thấy từng request mà ứng dụng của mình gửi ra. Đây là công cụ monitor/debug cực kỳ phổ biến.
6. **Microservices**: quay lại câu chuyện logging và caching ở trên — đó là linh hồn của service mesh.

Dĩ nhiên, mọi thứ đều có giá của nó — proxy có thể khiến request chậm hơn. *Và các bạn cứ thoải mái challenge mọi điều mình nói, vì đó chính là vẻ đẹp của engineering: không có gì là đương nhiên, càng critique chúng ta càng xây được phần mềm tốt hơn.*

---

### 🔄 Reverse proxy — đảo ngược hoàn toàn mọi thứ

Với proxy: client biết server, server không biết client. Với **reverse proxy (trung gian phía server)**, mọi thứ **đảo ngược**:

* Client **không biết server đích thực sự** là ai.
* Bạn nói chuyện với `Google.com` như thể đó là đích cuối cùng — nhưng `Google.com` có thể chỉ là một reverse proxy, và bạn hoàn toàn không biết nó đang nói chuyện với một server Google khác ở phía sau.
* Server phía sau đó được gọi là **back server**, có nơi gọi là **front end server** hay **edge server**.

Từ đây, hàng loạt use case tuyệt vời được sinh ra. Ví dụ đầu tiên: **load balancing (cân bằng tải)**. Với một **load balancer (bộ cân bằng tải)**, `Google.com` có thể gửi request thứ nhất cho server này, request thứ hai cho server khác, cứ thế xoay vòng (round robin). Thậm chí thông minh hơn: dựa vào **đường dẫn (path)** bạn đang gọi để chọn server phù hợp.

Ví dụ mình hay kể về API gateway:

* Bạn gọi `POST` tới đường dẫn post → đi tới **post server** với database phục vụ ghi.
* Bạn gọi đường dẫn đọc messages → đi tới **read server** với database phục vụ đọc.
* Hai server, hai database hoàn toàn khác nhau: một cái là **row store**, một cái là **column store** chuyên cho analytics — cứ thế mà thiết kế.

*Một câu mình muốn các bạn thuộc lòng: **load balancer là reverse proxy, nhưng không phải reverse proxy nào cũng là load balancer** — vì reverse proxy chỉ cần gửi request tới backend giúp bạn, chưa chắc đã có logic cân bằng tải.*

Bên dưới đường truyền: kết nối TCP được thiết lập giữa bạn và reverse proxy. Reverse proxy biết bạn, còn bạn **không bao giờ biết server thật sự sẽ phục vụ mình**. Mình dùng cách giải thích này để dạy suốt gần 6 năm và nó gần như luôn "click" với học viên.

---

### 🧩 Use case kinh điển của reverse proxy — CDN, canary, API gateway

* **Caching & CDN (content delivery network)**: Fastly giữ nội dung ở rất nhiều nơi. Bạn nói chuyện với CDN như thể đó là đích cuối cùng, không hề biết đằng sau là server nào. Bạn ở Ấn Độ có thể được một server đặt tại Ấn Độ phục vụ — cả ở tầng TCP lẫn tầng ứng dụng — hoàn toàn trong suốt với bạn. Nói vui: CDN là một **reverse proxy được "tô vẽ" hoành tráng**.
* **Load balancing**: chọn server backend cho từng request như mô tả ở trên.
* **Ingress / API gateway**: xác thực (authentication) diễn ra ngay tại reverse proxy.
* **Canary testing**: giả sử có một feature mới, bạn deploy nó lên đúng 1 server, các server còn lại vẫn chạy bản cũ. Một rule ở reverse proxy: cứ 100 request thì **10 request vào server mới, 90 request vào server cũ** — nghĩa là 10% người dùng trải nghiệm feature mới, 90% giữ hành vi cũ.
* **Microservices**: cũng như trên.

Nhưng nhớ này: với canary, ứng dụng của bạn **phải được viết theo kiểu stateless (không lưu trạng thái)**, vì request thứ nhất có thể đi server này, request thứ hai lại sang server khác. Code không cẩn thận là vỡ ngay — không đơn giản như nhìn đâu.

---

### 💡 Vài câu hỏi mình nhận được nhiều nhất

1. **Proxy và reverse proxy dùng cùng lúc được không?** Được — nhưng bạn sẽ **không bao giờ biết**. Bạn biết mình đang dùng proxy vì bạn phải tự cấu hình nó; còn reverse proxy thì bạn mù tịt. Thứ bạn đang "hit" vào rất có thể là một reverse proxy như nginx hay HAProxy, rồi nó nói chuyện tiếp với hệ thống phía sau.
2. **Dùng proxy thay VPN để ẩn danh được không?** Không nên. Nhiều proxy **terminate TLS** và xem nội dung của bạn. VPN hoạt động ở **tầng IP**: nó mã hóa IP packet và không cần biết bên trong là gì. Còn proxy hoạt động từ **layer 4 trở lên**, nên nó cần hiểu giao thức bạn đang dùng — đó là lý do có HTTP proxy, SOCKS proxy... đủ loại trên đời.
3. **Proxy chỉ dành cho TCP thôi à?** Không hẳn. Có rất nhiều loại proxy, phổ biến nhất là HTTP proxy. Đặc biệt, HTTPS proxy có **tunnel mode**: client dùng phương thức `CONNECT` để nhờ proxy "mở kết nối giúp tôi tới Google.com". Proxy mở kết nối và từ đó nó chỉ là một **ống dẫn rỗng**: mọi segment gửi tới đều được ghi thẳng vào ống. Proxy **không thấy nội dung** — TLS diễn ra end-to-end, proxy không giải mã được gì.

---

Vậy là chúng ta đã tách bạch được **proxy** và **reverse proxy**: một bên che giấu client khỏi server, một bên che giấu server khỏi client. Nắm được hai khái niệm này, các bạn sẽ thấy mọi thứ "hoa mỹ" trong thế giới software engineering — API gateway, service mesh, ingress, sidecar — đều quy về vài nguyên lý cơ bản.

Bài tiếp theo, mình sẽ đào sâu vào **layer 4 và layer 7 proxy/reverse proxy/load balancer**: khác nhau thế nào, mạnh yếu ra sao và khi nào nên dùng cái nào. Hẹn gặp lại các bạn! 🚀
