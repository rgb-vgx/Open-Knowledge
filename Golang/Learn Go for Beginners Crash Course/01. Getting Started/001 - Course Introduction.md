# 🐹 Chào mừng đến với Go — Ngôn ngữ lập trình lý tưởng cho người mới bắt đầu

> Nguồn: `001-Introduction.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161698)

Chào mừng các bạn đến với **Learn Go for Beginners** — khóa crash course về ngôn ngữ lập trình Go. Trước khi lao vào gõ code, mình muốn dành vài phút kể cho các bạn nghe Go là ai, từ đâu đến, và vì sao mình tin đây là lựa chọn tuyệt vời để bắt đầu học lập trình.

Nếu Go là ngôn ngữ đầu tiên của các bạn, xin chúc mừng — các bạn đã chọn một điểm xuất phát rất đẹp. Còn nếu các bạn đã biết một ngôn ngữ khác rồi, thì Go sẽ là một ngôn ngữ cực kỳ dễ "bắt sóng".

---

### 🕰️ Go ra đời như thế nào?

Go được bắt đầu phát triển từ năm **2007** bởi ba "người khổng lồ" của làng lập trình: **Robert Griesemer, Rob Pike và Ken Thompson**. Ba cái tên này không xa lạ với bất kỳ ai làm việc trong ngành hay giảng dạy khoa học máy tính.

Go được **công bố vào năm 2009**, và phiên bản đầu tiên **1.0 ra mắt năm 2012**. Từ đó tới nay, Go liên tục leo hạng và hiện đứng **thứ tư trong bảng xếp hạng các ngôn ngữ phổ biến nhất** — sau JavaScript, Python và Java, thậm chí đã vượt qua cả C++. Đó là một thành tích đáng nể.

Danh sách các công ty dùng Go có thể khiến các bạn bất ngờ:

* **Docker** và **Kubernetes** — viết bằng Go.
* **Uber** — toàn bộ hệ thống.
* **Google** — phần lớn ứng dụng dùng Go cho backend.
* **Dropbox, Twitch, SoundCloud, American Express** — cũng chọn Go.

Không chỉ các ông lớn, rất nhiều lập trình viên cá nhân cũng dùng Go mỗi ngày. Cá nhân mình — người viết code chuyên nghiệp — thì Go chính là ngôn ngữ "go-to" của mình, xin phép được chơi chữ một chút.

---

### ⚡ Vì sao Go nhanh?

Go là ngôn ngữ **biên dịch (compiled)**: chương trình của các bạn được dịch thẳng xuống **mã máy (machine code)** trước khi chạy.

Những ngôn ngữ như PHP, JavaScript hay Python là ngôn ngữ **thông dịch (interpreted)**. Chúng dễ học, không có gì sai với chúng cả — nhưng tốc độ chậm hơn nhiều so với ngôn ngữ biên dịch.

| Tiêu chí | Compiled (Go) | Interpreted (PHP, JS, Python) |
|---|---|---|
| Cách chạy | Dịch xuống mã máy trước | Chạy qua bộ thông dịch |
| Tốc độ | Rất nhanh | Chậm hơn đáng kể |
| Phân phối | File chạy độc lập | Cần môi trường runtime |

---

### 📦 Phân phối sản phẩm dễ hơn rất nhiều

Vì Go biên dịch sẵn, việc **phân phối (distribution)** sản phẩm cuối cùng trở nên đơn giản hơn hẳn.

Ví dụ, nếu các bạn viết một ứng dụng bằng Java rồi muốn gửi nó cho máy khác chạy, các bạn phải chắc chắn máy đó đã cài Java runtime. Điều tương tự cũng đúng với C# hay PHP và rất nhiều ngôn ngữ thông dịch khác.

Với Go thì **không cần runtime** — đây là lý do khiến việc phân phối trở nên nhẹ nhàng hơn bao giờ hết.

---

### 🧵 Concurrency có sẵn trong ngôn ngữ

Một đặc điểm lớn nữa của Go là **concurrency (xử lý đồng thời) có sẵn ngay trong ngôn ngữ**, không cần thư viện ngoài.

Khác với nhiều ngôn ngữ khác, ví dụ PHP, chương trình Go có thể **làm nhiều việc cùng một lúc**. Máy tính ngày nay hầu như đều có nhiều bộ xử lý (processor) — nên chương trình của các bạn có thể hoàn thành yêu cầu nhanh hơn hẳn nhờ khả năng này.

---

### 📖 Dễ đọc, dễ bảo trì, viết một lần chạy mọi nơi

Go được thiết kế ngay từ đầu vì **tính dễ đọc (readability)** và **tính dễ dùng (usability)**.

Hãy tưởng tượng các bạn viết một chương trình C++ thật phức tạp, không ghi chú gì, rồi để đó 6–8–12 tháng sau quay lại đọc. Rất có thể các bạn sẽ tự hỏi: *"Hồi đó mình đang nghĩ gì nhỉ?"*. Với Go, các bạn gần như sẽ không bao giờ gặp tình huống đó — code Go dễ đọc tới mức giúp bạn dễ học và dễ bảo trì theo thời gian.

Thêm một điểm tuyệt vời: các bạn có thể viết code Go trên **Mac** rồi **biên dịch cho Windows, Linux** hay nhiều hệ điều hành khác. Lời hứa "write once, run anywhere" mà ngành phần mềm nhắc suốt bao năm — cuối cùng đã thành hiện thực với Go.

Triết lý cốt lõi của Go là **"one problem, one solution"** — một vấn đề, một lời giải. Nếu các bạn từng vật lộn với hàng chục cách giải quyết cùng một bài toán ở ngôn ngữ khác, các bạn sẽ thấy đây là điểm sáng. Go có **thư viện chuẩn (standard library) giàu có tới mức** khi gặp một bài toán, thường chỉ có một cách rõ ràng để giải. Với các nhóm lập trình viên làm dự án lớn, điều này khiến việc phối hợp dễ dàng hơn hẳn.

---

### ✅ Tự kiểm tra nhanh

**1. Go được phát triển bởi những ai?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Robert Griesemer, Rob Pike và Ken Thompson.
Giải thích: Ba "người khổng lồ" của làng lập trình, bắt đầu phát triển Go từ năm 2007.
Tham chiếu: Mục "Go ra đời như thế nào?"

</details>

**2. Vì sao Go nhanh hơn PHP, JavaScript hay Python?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì Go là ngôn ngữ biên dịch, code được dịch thẳng xuống mã máy.
Giải thích: PHP/JS/Python là ngôn ngữ thông dịch nên chậm hơn đáng kể.
Tham chiếu: Mục "Vì sao Go nhanh?"

</details>

**3. Lợi ích chính của việc Go không cần runtime là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Phân phối sản phẩm dễ dàng hơn nhiều.
Giải thích: Java, C#, PHP đều yêu cầu môi trường runtime trên máy đích; Go thì không.
Tham chiếu: Mục "Phân phối sản phẩm dễ hơn rất nhiều"

</details>

**4. Triết lý thiết kế cốt lõi của Go là gì?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** "One problem, one solution" — một vấn đề, một lời giải.
Giải thích: Nhờ thư viện chuẩn phong phú, Go hướng người lập trình tới một cách giải rõ ràng, giúp làm việc nhóm hiệu quả hơn.
Tham chiếu: Mục "Dễ đọc, dễ bảo trì, viết một lần chạy mọi nơi"

</details>

**5. Go đang xếp thứ mấy trong bảng xếp hạng ngôn ngữ phổ biến?**
<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Thứ tư (sau JavaScript, Python, Java).
Giải thích: Go đã vượt qua C++; số liệu mình dùng là dữ liệu năm 2020 và Go vẫn đang leo hạng đều đặn.
Tham chiếu: Mục "Go ra đời như thế nào?"

</details>

---

Đó là bức tranh tổng quan về Go — một ngôn ngữ nhanh, dễ đọc, có concurrency sẵn và cộng đồng ngày càng lớn. Mình tin sau khóa này, các bạn sẽ thấy Go là một lựa chọn cực kỳ xứng đáng cho cả người mới lẫn người đã có kinh nghiệm.

Bài tiếp theo, chúng ta sẽ cùng **cài đặt Go và bộ công cụ cần thiết** để sẵn sàng viết những dòng code đầu tiên. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [Go official website](https://go.dev/)
- [Udemy — Introduction](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26161698)
