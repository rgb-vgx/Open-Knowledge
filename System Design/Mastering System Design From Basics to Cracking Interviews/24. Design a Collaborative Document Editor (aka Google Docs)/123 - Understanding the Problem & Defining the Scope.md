# 📝 Thiết kế Collaborative Document Editor: Hiểu bài toán trước khi nghĩ đến kiến trúc

> Nguồn: `123-Understanding-the-Problem-Defining-the-Scope.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49990475)

Trong case study này, mình và các bạn sẽ cùng thiết kế một **collaborative document editor (trình soạn thảo cộng tác)** quy mô lớn, kiểu Google Docs — nơi nhiều người sửa chung một tài liệu theo thời gian thực, không phải chờ nhau. Thoạt nhìn, đây có vẻ chỉ là "một text editor khác", nhưng ngay khi nhiều người cùng gõ vào một đoạn văn, bài toán trở nên khó hơn rất nhiều. Và như mọi case study khác, chúng ta bắt đầu bằng việc **hiểu thật rõ mình đang xây gì trước khi nghĩ đến kiến trúc hay công nghệ**.

---

### 🎯 Hiểu bài toán trước khi nghĩ đến kiến trúc

Ở mọi bài toán system design, bước đầu tiên luôn là hiểu rõ sản phẩm trước khi bàn đến kiến trúc. Lần này, sản phẩm là một **web-based collaborative document editor** tương tự Google Docs.

Ban đầu nó trông như một text editor bình thường. Nhưng khoảnh khắc nhiều người dùng cùng chỉnh sửa một tài liệu, độ phức tạp tăng vọt. Có **năm yêu cầu cốt lõi**:

1. **Simultaneous editing (chỉnh sửa đồng thời):** nhiều người phải làm việc trên cùng tài liệu mà không chờ nhau — kể cả khi hàng chục người đang kết nối, cộng tác vẫn phải diễn ra tự nhiên.
2. **Real-time updates (cập nhật theo thời gian thực):** một người thay đổi thì tất cả người đang xem phải thấy gần như tức thì. Bất kỳ độ trễ đáng kể nào cũng khiến cộng tác rối rắm và phá hỏng trải nghiệm.
3. **Trạng thái tài liệu nhất quán, không xung đột:** nếu hai người sửa cùng một đoạn văn, hệ thống phải xử lý đúng để cuối cùng mọi người thấy **cùng một tài liệu**, thay vì mỗi người giữ một phiên bản khác nhau.
4. **Document versioning (quản lý phiên bản):** người dùng cần theo dõi thay đổi, xem lại các phiên bản trước và khôi phục trạng thái cũ khi cần — càng quan trọng khi nhiều người cộng tác trên một tài liệu suốt thời gian dài.
5. **Access control (kiểm soát truy cập):** không phải ai cũng có cùng quyền. Có người chỉ được xem, người khác được sửa, người khác nữa được quản lý tài liệu.

Các bạn sẽ thấy xuyên suốt case study: **mọi quyết định kiến trúc đều được dẫn dắt bởi một hoặc nhiều yêu cầu trên**. Thay vì ghi nhớ công nghệ, hãy tập trung vào bài toán cần giải — vì đó chính là cách các kiến trúc sư giàu kinh nghiệm tiếp cận system design, và cũng là tư duy mà người phỏng vấn đang tìm kiếm.

---

### 📋 Yêu cầu chức năng cho MVP

Hiểu bài toán rồi, bước tiếp theo là định hình **functional requirements (yêu cầu chức năng)** một cách chính thức — những tính năng mà phiên bản đầu tiên, tức **MVP (Minimum Viable Product — sản phẩm khả dụng tối thiểu)**, bắt buộc phải có:

1. **Tạo, sửa và xóa tài liệu văn bản.** Đây là nền móng — thiếu các thao tác cơ bản này thì không còn là trình soạn thảo nữa.
2. **Cộng tác thời gian thực.** Nhiều người cùng làm việc trên một tài liệu **đồng thời**, thay vì lần lượt từng người một; trải nghiệm phải liền mạch dù ai là người thay đổi.
3. **Đồng bộ thời gian thực.** Khi một người gõ, chèn hay xóa nội dung, thay đổi đó phải được phản ánh gần như tức thì cho mọi người đang xem — cảm giác như tất cả đang làm việc trên một tài liệu dùng chung duy nhất.
4. **Lịch sử phiên bản và theo dõi thay đổi.** Cộng tác thường kéo theo sai sót hoặc chỉnh sửa ngoài ý muốn, nên người dùng phải xem lại được phiên bản trước và khôi phục trạng thái cũ. Điều này còn tạo **trách nhiệm giải trình**, cho thấy tài liệu đã tiến hóa ra sao theo thời gian.
5. **Kiểm soát quyền.** Mỗi cộng tác viên có mức truy cập khác nhau — người chỉ được xem, người được sửa — đảm bảo cả bảo mật lẫn cộng tác có kiểm soát.
6. **Chia sẻ đơn giản.** Người dùng phải mời được cộng tác viên qua **link chia sẻ** hoặc **email mời**, để việc kéo người khác vào phiên chỉnh sửa thật dễ dàng.

Lưu ý: các yêu cầu này cố tình chỉ tập trung vào **chức năng người dùng nhìn thấy**. Ở bước này, chúng ta định nghĩa hệ thống **làm gì**, chứ chưa phải **làm như thế nào** — các quyết định kiến trúc sau đó sẽ bám theo những yêu cầu này.

---

### ⚙️ Yêu cầu phi chức năng — hệ thống phải "tốt" đến đâu

Nếu yêu cầu chức năng nói hệ thống phải **làm gì**, thì **non-functional requirements (yêu cầu phi chức năng)** nói nó phải làm tốt đến đâu — và chúng thường tác động mạnh nhất đến kiến trúc mà chúng ta chọn:

* **Performance (hiệu năng):** người dùng kỳ vọng thay đổi xuất hiện gần như tức thì. Mục tiêu của chúng ta: đồng bộ chỉnh sửa với **độ trễ dưới 100 milliseconds**.
* **Scalability (khả năng mở rộng):** một nền tảng thành công có thể chứa **hàng triệu tài liệu** và phục vụ lượng lớn người dùng đang sửa đồng thời; kiến trúc phải chịu được khi cả người dùng lẫn tài liệu tăng lên.
* **Availability (tính sẵn sàng):** người ta dựa vào trình soạn thảo cộng tác cho công việc, học tập và kinh doanh, nên hệ thống phải truy cập được gần như mọi lúc. Kể cả khi mạng người dùng chập chờn, họ phải kết nối lại liền mạch và tiếp tục sửa **mà không mất công việc đang làm**.
* **Security (bảo mật):** mọi giao tiếp phải được mã hóa bằng **TLS**, quyền truy cập tài liệu phải được kiểm soát, và nền tảng cần có lớp bảo vệ cơ bản trước lạm dụng hoặc truy cập trái phép.
* **Reliability (độ tin cậy):** thay đổi phải được **tự động lưu**, hệ thống phải phục hồi duyên dáng khi gặp sự cố, và mọi người tham gia cuối cùng phải thấy **cùng một trạng thái tài liệu**, kể cả khi các cập nhật đến hơi lệch thời điểm.
* **Maintainability (khả năng bảo trì):** một kiến trúc **module hóa** với API sạch sẽ giúp thêm tính năng, sửa lỗi và tiến hóa hệ thống dễ hơn nhiều khi yêu cầu thay đổi.
* **Testability (khả năng kiểm thử):** cộng tác đồng thời rất khó kiểm chứng vì nhiều người tương tác cùng lúc; kiến trúc phải cho phép **mô phỏng lưu lượng lớn** để xác minh việc đồng bộ vẫn đúng và nhạy bén ngay cả dưới tải cao.

Một cách nghĩ rất hữu ích: các yêu cầu phi chức năng chính là **ràng buộc kiến trúc (architectural constraints)**. Chúng không thêm tính năng mới, nhưng chi phối mọi quyết định thiết kế về sau.

---

### 🧭 Giả định, ràng buộc và năm thách thức cốt lõi

Trước khi thiết kế kiến trúc, cần nói rõ **giả định (assumptions) và ràng buộc (constraints)**. Mọi hệ thống đều dựa trên một tập kỳ vọng; nêu chúng ra giúp chúng ta tránh giải những bài toán nằm ngoài phạm vi của hệ thống.

**Giả định:**

* Người dùng có kết nối internet **tương đối ổn định** và dùng trình duyệt hiện đại, hỗ trợ các công nghệ như **WebSockets** để giao tiếp thời gian thực.
* Tập trung vào **tài liệu nặng chữ** với định dạng cơ bản — vì rich media (nội dung đa phương tiện) mang đến một lớp bài toán hoàn toàn khác.
* Phiên cộng tác tương đối nhỏ: thường **2 đến 50 người** cùng sửa một tài liệu — mục tiêu thực tế của hầu hết tài liệu cộng tác, cho phép tối ưu cho trường hợp phổ biến thay vì kịch bản cực đoan.
* Workload **read-write heavy**: người dùng không chỉ xem mà liên tục gõ, xóa, chỉnh sửa, nên hệ thống phải xử lý **dòng cập nhật liên tục**.

**Ràng buộc:**

* **Đồng bộ thời gian thực khi nhiều người sửa cùng lúc** là thách thức lớn nhất — càng nhiều người, việc giữ mọi màn hình khớp nhau càng khó.
* **Bảo toàn tính nhất quán tài liệu:** xung đột phải được giải quyết mà không để người dùng nào giữ phiên bản khác với người khác.
* **Hỗ trợ eventual consistency (nhất quán sau cùng) giữa các client:** trong hệ phân tán, cập nhật có thể không đến mọi người cùng lúc, nhưng cuối cùng tất cả phải **hội tụ về cùng một trạng thái**.
* **Độ trễ thấp cho người dùng toàn cầu**, không chỉ trong một region — kiến trúc phải được thiết kế sẵn cho hiệu năng toàn cầu ngay từ đầu.
* **MVP giới hạn ở định dạng văn bản cơ bản:** chủ động thu hẹp phạm vi để giải quyết bài toán cộng tác cốt lõi trước khi thêm tính năng phức tạp.

Những giả định định hình môi trường mà ta thiết kế cho nó; những ràng buộc định hình thách thức mà kiến trúc phải vượt qua. Cùng nhau, chúng vạch ra ranh giới rõ ràng cho các quyết định ở những bước sau.

Giờ là lúc nhìn thẳng vào các **thách thức kỹ thuật cốt lõi** — những bài toán mà kiến trúc bắt buộc phải giải để cộng tác thời gian thực hoạt động được:

1. **Concurrency control (kiểm soát đồng thời):** nhiều người sửa cùng lúc thì các thay đổi có thể đến đồng thời, chồng lấn, thậm chí nhắm vào đúng cùng một đoạn text. Hệ thống cần cách xử lý các chỉnh sửa đồng thời **mà không làm hỏng tài liệu**.
2. **Conflict resolution (giải quyết xung đột):** nếu hai người sửa cùng nội dung gần như cùng khoảnh khắc, thay đổi nào được áp dụng, và làm sao để mọi người cuối cùng thấy cùng kết quả? Đây là một trong những bài toán khó nhất của collaborative editing, ảnh hưởng trực tiếp đến trải nghiệm người dùng.
3. **Real-time synchronization (đồng bộ thời gian thực):** mọi chỉnh sửa phải được gửi tới tất cả người dùng đang kết nối với độ trễ tối thiểu. Ở quy mô nhỏ thì đơn giản, nhưng khi số người dùng và tài liệu tăng, **broadcast (phát tán) cập nhật hiệu quả** trở thành thách thức mở rộng lớn.
4. **Trade-off giữa consistency và latency:** người dùng mong phản hồi tức thì khi gõ, nhưng đảm bảo nhất quán hoàn hảo giữa các client phân tán có thể gây trễ. Một hệ thống tốt tìm được **điểm cân bằng** để trình soạn thảo vẫn nhạy bén trong khi trạng thái tài liệu vẫn nhất quán.
5. **Failure recovery (phục hồi sau sự cố):** mạng không đáng tin; người dùng refresh bất ngờ, ngắt kết nối rồi kết nối lại liên tục. Hệ thống phải phục hồi duyên dáng, **đồng bộ những thay đổi bị bỏ lỡ**, và để người dùng tiếp tục sửa mà không mất kết quả.

Rồi các bạn sẽ thấy: gần như mọi quyết định kiến trúc trong case study này đều xuất phát từ một hoặc vài thách thức trên. *Nếu giải quyết tốt năm vấn đề này, chúng ta đã giải quyết được trái tim của một collaborative document editor.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao một text editor "bình thường" lại trở thành bài toán khó khi có nhiều người dùng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì phải xử lý chỉnh sửa đồng thời, cập nhật thời gian thực, trạng thái nhất quán không xung đột, quản lý phiên bản và phân quyền.

**Giải thích:** Khoảnh khắc nhiều người cùng sửa một tài liệu, độ phức tạp tăng vọt so với một trình soạn thảo đơn người.

Tham chiếu: Mục Hiểu bài toán trước khi nghĩ đến kiến trúc.

</details>

**Câu 2:** Mục tiêu độ trễ khi đồng bộ chỉnh sửa là bao nhiêu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dưới 100 milliseconds.

**Giải thích:** Độ trễ đáng kể sẽ phá vỡ cảm giác cộng tác thời gian thực.

Tham chiếu: Mục Yêu cầu phi chức năng.

</details>

**Câu 3:** Phiên cộng tác điển hình mà hệ thống nhắm tới có bao nhiêu người?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Khoảng 2 đến 50 người cùng sửa một tài liệu.

**Giải thích:** Đây là mục tiêu thực tế của hầu hết tài liệu cộng tác, cho phép tối ưu cho trường hợp phổ biến.

Tham chiếu: Mục Giả định, ràng buộc và năm thách thức cốt lõi.

</details>

**Câu 4:** Yêu cầu phi chức năng đóng vai trò gì trong thiết kế hệ thống?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chúng là các ràng buộc kiến trúc — không thêm tính năng mới nhưng chi phối mọi quyết định thiết kế.

**Giải thích:** Các yêu cầu như hiệu năng, bảo mật, độ tin cậy định hình kiến trúc mạnh hơn cả yêu cầu chức năng.

Tham chiếu: Mục Yêu cầu phi chức năng.

</details>

**Câu 5:** Kể tên năm thách thức kỹ thuật cốt lõi của collaborative editing.

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Concurrency control, conflict resolution, real-time synchronization, trade-off giữa consistency và latency, failure recovery.

**Giải thích:** Giải quyết tốt năm vấn đề này chính là giải quyết trái tim của một collaborative document editor.

Tham chiếu: Mục Giả định, ràng buộc và năm thách thức cốt lõi.

</details>

---

Vậy là chúng ta đã khép lại bước 1: bài toán, MVP, các ràng buộc kiến trúc và năm thách thức cốt lõi đều đã rõ ràng. Ở bài tiếp theo, chúng ta sẽ **ước lượng quy mô và nhận diện điểm nghẽn** — từ hơn 10 triệu người dùng hằng ngày đến 10 tỷ sự kiện đồng bộ mỗi ngày. Hẹn gặp lại các bạn! 🚀
