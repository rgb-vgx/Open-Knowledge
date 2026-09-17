# 🧬 Protocol Properties: Bộ thuộc tính của mọi giao thức — và vì sao đừng học vẹt chúng

> Nguồn: `017-Protocol-Properties.txt` · [Udemy](https://ua.udemy.com/course/fundamentals-of-backend-communications-and-protocols/learn/lecture/34629832)

Chào các bạn! Mở màn chương Protocols, mình sẽ nói về **protocol properties (thuộc tính của giao thức)** — những thứ cần cân nhắc khi thiết kế một protocol (giao thức). Mình nói trước cho chắc: bài này hơi lý thuyết, và mình khuyên các bạn hãy "take it with a grain of salt" — *đừng học thuộc, đừng biến chúng thành giáo điều. Điều quan trọng nhất cuối cùng vẫn là performance (hiệu năng), và liệu protocol đó có giải quyết được bài toán của bạn hay không.*

### 🎯 Protocol là gì — và vì sao mọi protocol đều sinh ra để giải một bài toán

**Protocol (giao thức)** là một hệ thống cho phép hai bên giao tiếp với nhau — nói cụ thể hơn, nó là **một tập luật (set of rules)**: làm 1, làm 2, làm 3, làm 4, làm 5... và nếu cả hai bên tuân theo cùng một bộ luật, họ có thể nói chuyện được với nhau. Hết.

Mỗi protocol trên đời đều được sinh ra để giải quyết một bài toán cụ thể:

* **TCP** — giao thức nổi tiếng nhất — ra đời từ những năm 60 (khoảng năm 1960) để phục vụ các mạng băng thông thấp thời đó. Người ta khi ấy không thể tưởng tượng nổi sẽ có những data center nằm sát nhau, gửi một lượng dữ liệu khổng lồ qua lại liên tục.
* Chính vì vậy, ngày nay trong data center, TCP đang **chạm tới giới hạn (pushing its limit)** — và đó là lý do người ta phát minh ra các giao thức mới để thay thế nó. Một ví dụ rất mới: **Homa** (2022) — mới tới mức nó chỉ là một bài báo nghiên cứu (paper), thậm chí chưa phải RFC.
* Còn hôm nay, chúng ta nói về các giao thức kinh điển: **DHCP, UDP, HTTP, gRPC, Apache Thrift, SMTP, FTP**... — mỗi cái ra đời để giải một bài toán khác nhau.

Bộ thuộc tính dưới đây được mình đúc kết từ kinh nghiệm cá nhân, từ những pattern mình quan sát được qua nhiều năm làm backend, cùng một số nguồn tài liệu khác. Có thể còn những thuộc tính khác chưa được liệt kê — và biết đâu chính bạn sẽ là người phát hiện ra chúng.

---

### 🔍 Thuộc tính #1: Data format — text hay binary?

**Data format (định dạng dữ liệu)** là một trong những thuộc tính quan trọng bậc nhất, và có hai trường phái:

* **Text-based**: dữ liệu đọc được ngay trên đường truyền (tất nhiên là khi chưa bị mã hóa) — plaintext, JSON, XML, HTTP dạng văn bản thường. Con người đọc được, máy cũng đọc được.
* **Binary**: không được thiết kế để con người đọc — chỉ cần máy đọc hiệu quả là đủ. Ví dụ điển hình là **Protocol Buffers**, cùng nhiều serialization protocol (giao thức tuần tự hóa) dạng nhị phân khác, dùng để các instance (thực thể) nói chuyện với nhau.

Điều thú vị nhất nằm ở **HTTP/2**: chữ "H" vẫn là hypertext, nhưng trên đường truyền nó **hoàn toàn là binary**. Họ đổi định dạng truyền tải, nhưng tương thích ở mức API thì không hề thay đổi — bạn vẫn gửi đúng request cũ, kết quả vẫn y nguyên, chỉ có protocol bên dưới đường truyền là khác. **HTTP/3** cũng vậy — cũng là binary.

*Data format quan trọng vì nó quyết định chi phí đọc/ghi, khả năng debug, và cả kích thước gói tin trên đường truyền.*

---

### 📦 Thuộc tính #2: Transfer mode — message hay stream?

**Transfer mode (chế độ truyền)** chia làm hai kiểu rõ rệt:

* **Message-based (dựa trên thông điệp)**: mỗi message có điểm **bắt đầu và kết thúc** rõ ràng. **UDP** là giao thức message-based điển hình — các message rời rạc, mỗi message nằm gọn trong một IP packet; nếu message lớn hơn **MTU (maximum transmission unit — đơn vị truyền tối đa)** thì nó bị chẻ thành nhiều IP packet và được đánh dấu bằng **fragment ID** để đầu nhận biết cách ghép chúng lại.
* **Stream (dòng byte)**: chỉ là một dòng byte tuôn ra liên tục, không nhất thiết có điểm đầu, chẳng có điểm cuối — như một con sông. **TCP** là giao thức stream; các giao thức âm thanh/hình ảnh (video, audio) cũng mang bản chất stream.

Và đây là hệ quả cực kỳ thú vị: khi bạn xây **HTTP trên TCP**, client buộc phải tự bóc tách một dòng byte liên tục để tìm xem request bắt đầu ở đâu và kết thúc ở đâu. Chi phí parsing (phân tích cú pháp) ở cả client lẫn server vì thế trở thành **một trong những giới hạn của TCP** — và đó chính là lý do **Homa** cố gắng làm một TCP dạng message-based, thay vì chỉ là một dòng byte nối đuôi nhau mãi không dứt.

---

### 🌐 Thuộc tính #3 và #4: Addressing và Directionality

Mọi protocol đều phải có **addressing system (hệ thống địa chỉ)** — bạn đi đâu, gói tin từ đâu tới? Ngày nay chúng ta có nhiều kiểu địa chỉ cùng tồn tại:

* **DNS** — kiểu địa chỉ ở layer 7: bạn gõ `google.com`...
* **Địa chỉ IP (Internet Protocol)** — ở layer 3: ví dụ `9.7.3.2`...
* **MAC address (Media Access Control)** — ở layer 2, được phân giải nhờ **ARP (Address Resolution Protocol)**: cho một địa chỉ IP, tìm ra MAC address tương ứng.

Địa chỉ nguồn/đích **thay đổi theo từng tầng**: frame mang MAC nguồn/đích; IP packet mang IP nguồn/đích. DNS phân giải tên miền thành IP, rồi IP cuối cùng được phân giải thành MAC khi gói tin tới đích.

Chuỗi phân giải địa chỉ đi từ tên miền xuống tới phần cứng như sau:

```mermaid
flowchart LR
    A[Tên miền - DNS layer 7] --> B[Địa chỉ IP - layer 3]
    B --> C[MAC address - layer 2 qua ARP]
```

Còn **directionality (hướng truyền)**: protocol là song hướng (bidirectional), một chiều (unidirectional), hay **full duplex / half duplex**? Ví dụ WiFi là **half duplex** — hai thiết bị không thể truyền cùng một lúc — trong khi kết nối full duplex cho phép cả hai đầu gửi/nhận đồng thời.

---

### 🧩 Thuộc tính #5 trở đi: State, Routing, Reliability và Error Management

* **State (trạng thái)**: **stateful (lưu trạng thái)** vs **stateless (không lưu trạng thái)**. Stateful có gRPC, TCP, Apache Thrift. Stateless có UDP — bản thân protocol không giữ trạng thái nào cả.
* **Routing (định tuyến)**: protocol của bạn sống thế nào qua các gateway và proxy (máy chủ trung gian)? Quay lại ví dụ `google.com`: bạn gửi request với Host header là google.com; để mở được kết nối TCP, bạn phải DNS ra địa chỉ IP. Nhưng nếu có proxy, kết nối TCP lại đi tới proxy trước — đích cuối (final destination) vẫn là Google, nhưng đích trực tiếp (immediate destination) là proxy; proxy quay sang nói chuyện với đích thật.
* **Flow control, congestion control và độ tin cậy**: UDP không có gì cả — gửi xong thì cầu trời. Còn TCP có **flow control (điều khiển luồng)**, **congestion control (điều khiển tắc nghẽn)**, **reliable delivery (giao hàng tin cậy)** và **retransmission (truyền lại)** đảm bảo.
* **Error management (quản lý lỗi)**: gặp lỗi thì sao — có error message (thông báo lỗi) và error code (mã lỗi) riêng không? Hết thời gian chờ (timeout) thì sao — có retry (thử lại) hay không?

Nhìn nhanh toàn bộ bộ thuộc tính trong một bảng:

| Thuộc tính | Lựa chọn | Ví dụ |
|---|---|---|
| Data format | Text hoặc binary | JSON, XML / Protocol Buffers |
| Transfer mode | Message hoặc stream | UDP / TCP |
| Addressing | DNS, IP, MAC | google.com, 9.7.3.2, địa chỉ MAC |
| Directionality | Một chiều, half duplex, full duplex | WiFi là half duplex |
| State | Stateful hoặc stateless | TCP, gRPC / UDP |

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Protocol được định nghĩa đơn giản nhất là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là một tập luật (set of rules) để hai bên giao tiếp — nếu cả hai cùng tuân theo, họ nói chuyện được với nhau.

Giải thích: Mỗi protocol được sinh ra để giải một bài toán cụ thể, tùy mục đích thiết kế.

Tham chiếu: Mục Protocol là gì.

</details>

**Câu 2:** Vì sao TCP ngày nay đang "chạm tới giới hạn" trong data center?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** TCP ra đời từ khoảng năm 1960 cho các mạng băng thông thấp, không lường trước được data center gửi khối lượng dữ liệu khổng lồ — nên người ta phát minh giao thức mới thay thế, ví dụ Homa (2022).

Giải thích: Homa mới tới mức chỉ là một paper nghiên cứu, chưa phải RFC.

Tham chiếu: Mục Protocol là gì.

</details>

**Câu 3:** Text-based và binary khác nhau thế nào — và HTTP/2 nằm ở đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Text-based đọc được trên đường truyền (JSON, XML), binary chỉ cần máy đọc hiệu quả (Protocol Buffers). HTTP/2 giữ chữ H là hypertext nhưng trên đường truyền hoàn toàn là binary, vẫn tương thích ở mức API; HTTP/3 cũng vậy.

Giải thích: Đổi định dạng truyền tải nhưng request/response vẫn y nguyên với người dùng.

Tham chiếu: Mục Thuộc tính #1.

</details>

**Câu 4:** Message-based và stream khác nhau ra sao, và hệ quả khi HTTP chạy trên TCP là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Message-based có điểm bắt đầu/kết thúc rõ ràng (UDP); stream là dòng byte liên tục không điểm đầu cuối (TCP). Vì vậy HTTP trên TCP buộc client phải parsing để tìm ranh giới request — một trong những giới hạn của TCP.

Giải thích: Đó cũng là lý do Homa cố làm TCP dạng message-based.

Tham chiếu: Mục Thuộc tính #2.

</details>

**Câu 5:** Stateful và stateless khác nhau thế nào, ví dụ cụ thể?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Stateful giữ trạng thái (gRPC, TCP, Apache Thrift); stateless không giữ trạng thái nào (UDP).

Giải thích: Đây là một trong những thuộc tính khi thiết kế protocol, bên cạnh flow control, routing và error management.

Tham chiếu: Mục Thuộc tính #5 trở đi.

</details>

Đó là những thuộc tính cơ bản nhất của một protocol. *Mình nhắc lại lần nữa: đây là kiến thức lý thuyết, đừng sống chết vì nó.* Nhưng khi hiểu chúng, bạn sẽ làm việc với bất kỳ giao thức nào tự tin hơn hẳn — và nếu một ngày bạn muốn tự thiết kế protocol cho riêng mình, đây chính là bộ câu hỏi bạn nên tự vấn trước khi viết dòng đặc tả đầu tiên.

Hẹn gặp các bạn ở bài tiếp theo — khi chúng ta dựng tấm bản đồ quan trọng nhất của cả chương: **OSI model (mô hình 7 tầng)** và trả lời câu hỏi *ứng dụng của bạn sống ở tầng nào?* 🚀

## Nguồn tham khảo

- [Udemy — Protocol Properties](https://ua.udemy.com/course/fundamentals-of-backend-communications-and-protocols/learn/lecture/34629832)
- [RFC 1122 — Requirements for Internet Hosts: Communication Layers](https://www.rfc-editor.org/info/rfc1122)
