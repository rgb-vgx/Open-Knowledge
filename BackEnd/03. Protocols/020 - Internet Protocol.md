# 🌐 Internet Protocol: Bóc Tách "Chiếc Xe Chở Hàng" Của Toàn Bộ Internet

Chào các bạn! Hôm nay chúng ta nói về thứ mà mình hay gọi là **"phương tiện giao thông của Internet"** — Internet Protocol (giao thức Internet), hay IP. Dù bạn gửi request từ client hay backend trả response, dù bên trong là HTTP, gRPC, TCP hay UDP, thì cuối cùng dữ liệu cũng phải nằm gọn trong một thứ gọi là **IP packet (gói IP)**. Hiểu được nó, các bạn sẽ tự tay giải thích được rất nhiều hiện tượng latency mà người khác chỉ biết... cầu trời.

### 🧱 Những viên gạch nền: IP packet, địa chỉ IP và subnet

Ở layer 3, mọi thứ đều là IP packet: một đống dữ liệu kèm **địa chỉ IP đích** và **địa chỉ IP nguồn**. Router không biết gì về port, về header HTTP, về mã hóa — nó chỉ thấy một IP packet và chuyển tiếp. Dữ liệu bên trong có thể là JSON, một gRPC call, một response SQL, TCP hay UDP; tất cả đều chui vào cùng một chiếc xe.

Địa chỉ IP là thuộc tính của layer 3, có thể được cấp tự động (DHCP) hoặc cấu hình tĩnh trên máy. Địa chỉ IPv4 dài 4 byte và chia làm hai phần:

* **Network portion (phần mạng):** xác định bạn thuộc mạng nào.
* **Host portion (phần host):** xác định bạn là máy nào trong mạng đó.

Ví dụ với `192.168.254.0/24`, con số `/24` nghĩa là 24 bit đầu (3 byte) là phần mạng, 8 bit cuối là phần host — tức là subnet đó có tối đa 2^8 = 256 địa chỉ host. Chuỗi này còn được gọi là một **subnet**, và mỗi subnet phải có một **subnet mask (mặt nạ mạng)**.

*Đừng lo nếu bạn chưa từng cấu hình mấy thứ này — mình cũng nhấn mạnh ngay từ đầu rằng đây là địa hạt của network engineer, không phải việc hằng ngày của backend engineer.*

---

### 🧮 Subnet mask và default gateway: câu hỏi "mày có cùng mạng với tao không?"

Mỗi máy muốn kết nối đều cần đúng 3 thứ: **địa chỉ IP, subnet mask và gateway**. Thiếu chúng là bạn "chết đứng" — không kết nối được với ai.

Khi máy A muốn gửi dữ liệu cho máy B, nó tự hỏi: *B có cùng subnet với mình không?* Nó lấy subnet mask của chính nó, đem AND với địa chỉ của mình và của B:

1. Nếu **cùng subnet**, A gửi trực tiếp host-to-host bằng **MAC address** — đơn giản vì hai máy nằm cùng một mạng.
2. Nếu **khác subnet**, A không biết đường, và mọi thứ được đẩy cho **default gateway** (router). Câu thần chú: *cái gì mình không biết thì gửi cho gateway*.

Có một chi tiết rất hay: khi hai máy cùng subnet nhưng vẫn đi qua router, router chỉ đọc tới **layer 2** và hoạt động như một switch — nó không cần đụng tới địa chỉ IP. Còn khi đi ra ngoài subnet, A phải biết MAC address của router để gửi packet cho nó. *Và đây chính là mảnh đất của ARP poisoning (đầu độc ARP): kẻ tấn công giả làm router thì mọi packet đều chảy qua nó.*

Router là thiết bị "sống hai cuộc đời": một địa chỉ IP trong mạng này, một địa chỉ IP trong mạng kia — border router thì có thể có hàng trăm mạng. Nó không lưu trạng thái gì về packet cả: **IP là stateless**, packet cứ thế đi qua.

Và đây là bài học thực chiến mà mình rất tâm đắc: **đừng đặt database ở subnet khác với application.** Chỉ cần router giữa hai subnet bị nghẽn, buffer của nó đầy lên, và câu lệnh SQL đẹp đẽ của bạn bị kẹt trong router rồi mới tới được database — thế là ứng dụng của bạn "tự nhiên" chậm vài mili-giây mà không ai hiểu vì sao. Giải pháp: dùng một **switch hiệu năng cao** cho application và database, đừng bắt router làm công việc của switch. Và một khi hiểu được điều này, bạn sẽ biết chính xác cần yêu cầu network engineer cấu hình cái gì — *họ biết mọi thứ, nhưng họ không biết bạn muốn gì.*

---

### 📦 Giải phẫu gói IP: 20 byte "phí giao dịch" và trần 64KB

Chúng ta thường hình dung IP packet chỉ là dữ liệu kèm IP nguồn và IP đích. Sự thật là nó có **header** và **data**, với header mặc định **20 byte** — và có thể lên tới **60 byte** nếu bật các tùy chọn (options). 20 byte đó là "chi phí làm ăn": bạn gửi 1 byte dữ liệu thì cũng phải mang theo 20 byte header, nên gửi từng packet nhỏ lẻ là cực kỳ lãng phí — đó chính là lý do các thuật toán kiểu Nagle và delayed acknowledgement ra đời.

Còn data section? Trường length là 16 bit, nên về lý thuyết data có thể dài tới **65.536 byte**. Nhưng mình chưa từng thấy IP packet nào lớn như vậy, vì có thứ gọi là **MTU (maximum transmission unit)** — kích thước frame tối đa, phổ biến là **1500 byte** trên Internet. Trong mạng nội bộ hoặc jumbo frames bạn có thể gặp 9000 byte, và trong cloud thì các nhà cung cấp tự làm network interface với MTU lớn — *họ không chia sẻ thông tin đó với chúng ta*. Nếu có MTU khổng lồ, độ trễ sẽ giảm, nhưng đó là mạng nội bộ khép kín, không phải Internet.

Điểm qua các trường đáng chú ý trong header:

* **Version (4 bit):** IPv4 hoặc IPv6. 4 bit cho tới 15 phiên bản, nhưng thực tế chỉ dùng 4 và 6 — hơi lãng phí một chút.
* **Internet Header Length (IHL):** cho biết header dài bao nhiêu; mặc định là 5 (tương ứng 5 hàng x 4 byte = 20 byte).
* **Total Length (16 bit):** tổng độ dài cả header lẫn data.
* **ID, Flags, Fragment Offset:** phục vụ chuyện phân mảnh, với cờ **DF (Don't Fragment)** quyết định có cho phép cắt packet hay không.
* **Protocol (8 bit):** bên trong là TCP, UDP hay ICMP... Vậy là tối đa 255 giao thức. Ban đầu mình tự hỏi *tại sao không để router đọc data rồi tự đoán giao thức?* Sau đó mình hiểu ra: nhờ 8 bit này, router chỉ cần đọc 20 byte header là biết ngay nên xử lý hay chặn — **metadata để tối ưu hiệu năng**, một thiết kế cực kỳ tinh tế.
* **Source & Destination IP:** quan trọng nhất — bạn đi đâu, bạn từ đâu tới. Đừng tin ai nói "IP của tôi bị spoof" một cách dễ dàng: bạn có thể viết code đổi IP nguồn trong packet, nhưng router đầu tiên của **ISP** sẽ chặn ngay vì nó biết rõ địa chỉ nó cấp cho bạn. Muốn spoof thoải mái thì... tự dựng ISP. Mà spoof xong thì cũng chẳng nhận được response, vì IP đích không chỉa về bạn.

Cuối cùng là **ECN (Explicit Congestion Notification)** — viên ngọc của thiết kế. Khi buffer của router sắp đầy thay vì lặng lẽ drop packet, router **bật một bit** trong header để báo hiệu. Receiver thấy bit đó, hiểu rằng có nghẽn, và tầng TCP hai bên điều chỉnh tốc độ — tất cả mà **không cần drop packet nào**. Chỉ vài bit nhỏ bé mà giải quyết được cả một vấn đề lớn; *mình luôn ngạc nhiên vì sao chúng ta không chịu học từ những thiết kế tiết kiệm này, trong khi cứ nhồi JSON phình to, lặp key, lặp response khắp nơi.*

---

### 🧩 Fragmentation và TTL: khi packet quá to, và khi packet đi lạc mãi mãi

**Fragmentation (phân mảnh)** xảy ra khi IP packet lớn hơn MTU. Giả sử MTU là 1500 còn packet là 2000 byte, bạn có 2 lựa chọn:

1. Phân mảnh: 1500 byte vào frame thứ nhất, 500 byte vào frame thứ hai. Vấn đề là các frame **có thể đến không đúng thứ tự**, nên host phải gom và ráp lại — phức tạp, và một frame mất thì phải gửi lại một phần, vô cùng rối rắm. Nguy hiểm hơn, **fragment có thể bị giả mạo** — đây là một điểm tấn công bảo mật nghiêm trọng.
2. Không phân mảnh: nếu bạn đã bật cờ **DF** và packet vẫn quá lớn, thiết bị mạng sẽ gửi thông báo ICMP "packet too large / fragmentation needed" và packet bị drop — trách nhiệm chọn kích thước phù hợp thuộc về client.

Chính vì những hệ lụy trên mà **QUIC tắt hẳn IP fragmentation**. *Khi nghi ngờ, đừng phân mảnh — hãy để nó fail.*

Còn **TTL (Time To Live)** trả lời một câu hỏi đau đầu: điều gì ngăn packet lang thang trên Internet mãi mãi? Vì router là **stateless**, không ai nhớ packet đã từng ghé qua, routing loop hoàn toàn có thể xảy ra. Giải pháp rất đẹp: mỗi packet mang theo một bộ đếm 8 bit:

1. Bạn gửi packet với TTL, ví dụ 100.
2. Mỗi router (và host) nhìn thấy packet đều **giảm đi 1**.
3. Ai là người giảm về 0 thì người đó **drop packet** và gửi lại một thông báo **ICMP** cho IP nguồn.

TTL chính là "state đi theo dữ liệu" thay vì lưu trên thiết bị — triết lý stateless mà bạn sẽ gặp lại hoài trong backend. Và từ TTL sinh ra một công cụ bạn dùng mỗi ngày: **traceroute**. Nó lần lượt gửi packet với TTL = 1, 2, 3... Mỗi khi packet "chết", router hiện nguyên hình địa chỉ IP của mình — bạn dò ra toàn bộ đường đi. Nhưng cảnh báo:

* Nhiều router/firewall **chặn ICMP** → bạn chỉ thấy các dấu `* * * *`.
* Packet của lần dò sau có thể đi đường khác lần trước, nên **traceroute không chính xác 100%**.

Một chi tiết mình show trong demo: khi traceroute tới một máy **cùng subnet**, TTL không hề giảm — vì router lúc này chỉ hoạt động như switch ở layer 2, packet không đi lên layer 3 nữa.

---

### 📡 ICMP: giao thức "đưa tin" không cần port của layer 3

**ICMP (Internet Control Message Protocol)** sống ở layer 3, nghĩa là chỉ có IP nguồn và IP đích — **không hề có port**. Nó chuyên chở các thông điệp thông tin giữa các host:

* **Host unreachable / Port unreachable:** bạn gửi tới một port không tồn tại, server trả về ICMP "port unreachable" (dù port là khái niệm layer 4, ICMP layer 3 vẫn báo được).
* **Fragmentation needed:** đúng câu chuyện phân mảnh phía trên.
* **Packet expired:** TTL về 0, packet đã "hết hạn".

Cái tên `ping` mà bạn gõ mỗi ngày chính là ICMP echo request/echo reply. Và **traceroute cũng là ICMP**. ICMP không cần listener hay port nào mở — chỉ cần host bật ICMP là bạn gửi được. Header ICMP chỉ vỏn vẹn **4 byte** (type, code và checksum (mã kiểm tra)), lấy từ RFC 792; type và code cho tới 255 giá trị.

Mình có làm demo ngay trong bài giảng:

* Ping router nhà mình (`192.168.254.254`): TTL 64, độ trễ **6ms** — hơi chậm, có lúc 11-12ms, mình nghi do đang xài Wi-Fi.
* Ping `google.com`: ping **phải chạy DNS trước** để đổi hostname thành IP, rồi mới gửi được. Kết quả ~9-12ms — Google gần như ngang ngửa router nhà mình, khiến mình phải xem lại cái router.

Nhưng bi kịch của ICMP là bị các firewall chặn vì lý do bảo mật: kẻ xấu lợi dụng nó để **flooding attack**, dò cổng, hoặc làm **back channel**. Hệ quả là bạn ping một máy đang sống nhăn mà chẳng thấy hồi âm. Nghiêm trọng hơn, chặn ICMP tạo ra **TCP blackhole**: bắt tay TCP ba bước rất nhỏ nên đi qua được, nhưng khi bạn gửi dữ liệu thật kèm cờ DF, router cần gửi ICMP báo "packet quá lớn, hãy thu nhỏ" — ICMP bị chặn, thông báo không bao giờ tới. Kết quả: **kết nối mở hoàn toàn nhưng dữ liệu không đi đâu cả**, đúng nghĩa một cái hố đen. Nếu bạn từng gặp ca này, giờ bạn biết google từ khóa "TCP black hole" rồi đấy.

*ICMP là một trong những giao thức "first principle" mà mình cho rằng backend engineer phải hiểu — vì khi mọi thứ đổ vỡ, nó là thứ duy nhất còn trung thực nói cho bạn biết chuyện gì đang diễn ra.*

---

Tóm lại, IP chính là chiếc xe chở mọi thứ: địa chỉ nguồn/đích, subnet và gateway quyết định đường đi, còn header với TTL, fragmentation, ECN và ICMP lo phần vận hành sao cho packet đến nơi mà không kẹt vĩnh viễn trên Internet. Nắm được "under the wire" ở tầng này, các bạn sẽ debug latency nhanh hơn bất kỳ dashboard nào.

Còn bây giờ, chiếc xe đã có rồi — vậy hành khách ngồi trên đó là ai? Hẹn gặp các bạn ở bài tiếp theo về **UDP**, giao thức đơn giản đến mức khó tin mà lại gánh cả video call, DNS và game online. 🚀
