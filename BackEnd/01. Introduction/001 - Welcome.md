# 🚀 Chào mừng đến với Fundamentals of Backend Engineering: Vén bức màn "under the wire"

Chào các bạn! Mình là Hussein, và mình thực sự, thực sự cảm kích vì các bạn đã ghé qua khóa học này. Hy vọng các bạn sẽ thấy thích nó — vì mình đã dồn vào đây rất nhiều thứ.

Mình làm software engineering đã 17, à tính ra là 18 năm rồi, kể từ năm 2004. Trong ngần ấy năm xây dựng ứng dụng — đặc biệt là backend — mình dần nhận ra những **pattern (mẫu hình)** lặp đi lặp lại. Khóa học này là cách mình hệ thống hóa tất cả những gì đã học được, và cả những gì mình vẫn đang học mỗi ngày.

---

### 🎨 Backend engineering là một loại nghệ thuật

Mình tin như vậy. Là một software engineer, các bạn có thể chuyên sâu vào vô số lĩnh vực khác nhau, và mình chọn backend vì bị cuốn hút bởi lĩnh vực này một cách nghiêm túc:

* **Database engineering (kỹ thuật cơ sở dữ liệu).**
* **Backend engineering (kỹ thuật backend).**
* **Edge engineering (kỹ thuật biên)** — một dạng backend engineering mới, đưa sức mạnh tính toán ra sát phía người dùng.

Có quá nhiều thứ đang diễn ra: vô số design pattern, và cả cách các protocol vận hành, cách giao tiếp thực sự xảy ra bên dưới. Đó là lý do mình dành cả sự nghiệp cho mảng này.

---

### 🧩 Chỉ có một vài cách để client nói chuyện với backend

Trong khóa học, mình đi qua những design pattern phổ biến nhất của backend communication — những pattern mà cá nhân mình thấy nổi lên trong quá trình xây dựng ứng dụng backend.

Điều thú vị là: dù ngoài kia có bao nhiêu ứng dụng backend, gần như **mọi phần mềm nhận request và connection đều rơi vào một trong các pattern này**. Tất nhiên sẽ có những pattern mình chưa từng biết — mình luôn muốn nhìn thấy chúng để học thêm kỹ thuật mới — nhưng đây là những gì mình đã thu thập và tóm tắt trong khóa học.

---

### 🌐 Protocol: học từ những viên gạch nền móng

Khóa học này cũng đi qua những protocol phổ biến nhất trong backend engineering:

* **HTTP/1.1, HTTP/2, HTTP/3** — mình dành phần riêng để nói rõ từng phiên bản.
* **QUIC** và **gRPC** — ở mức cơ bản.
* **UDP và TCP** — các bạn sẽ học hai cái này *trước cả HTTP*, vì đây là bộ xương trần mà gần như mọi thứ khác được xây lên trên.
* **WebRTC, WebSockets** — những ví dụ protocol cụ thể, sinh động.

Mình sẽ chỉ cho các bạn **chính xác cách chúng hoạt động under the wire (bên dưới đường truyền)**. Không chỉ lý thuyết suông, mà là cơ chế thật.

---

### 🔍 Hiểu cơ chế để không còn black box

*Đây là điểm mình tâm đắc nhất, và cũng là lý do khóa học này tồn tại.*

Khi các bạn hiểu mọi thứ vận hành thế nào, khái niệm **abstraction (trừu tượng hóa)** gần như biến mất khỏi đầu các bạn. Và khi có sự cố — ứng dụng chậm, **latency (độ trễ)** tăng, hệ thống **degradation (suy giảm chất lượng)**, hay một bug khó chịu — các bạn lập tức chỉ ra được vấn đề nằm ở đâu và sửa nó, thay vì ngồi nhìn mọi thứ như một **black box (hộp đen)**.

Mình thừa nhận: rất nhiều người không đồng ý với mình chuyện này. Ai cũng có quyền có quan điểm riêng. Nhưng với mình:

* Mình vẫn dùng library, vẫn dùng framework — **với điều kiện mình hiểu chính xác nó được kiến trúc ra sao và làm gì đằng sau hậu trường.**
* Mình đang tin tưởng giao việc cho nó, nên mình phải hiểu nó làm việc đó như thế nào.

---

### ⚙️ Chuyện gì xảy ra khi request chạm tới backend?

Một trong những chủ đề mình rất tâm huyết là **backend execution styles (các kiểu thực thi trong backend)**. Hãy tưởng tượng request vừa được nhận ở backend:

1. Connection được **accept (chấp nhận)** như thế nào?
2. **Kernel (nhân hệ điều hành)** và **OS (hệ điều hành)** chuyển connection đó tới **process (tiến trình)** của ứng dụng backend ra sao?
3. Ứng dụng đọc request từ đâu, và **một request thực chất là gì**? — chỉ là một đống byte, nhưng công việc để hiểu nó không hề tầm thường.
4. Chi phí bị tiêu tốn qua từng lớp như thế nào, cho tới khoảnh khắc **sự kiện on-request** được kích hoạt?

Mình gỡ rối toàn bộ chuỗi đó, nên khóa học này được thiết kế cho các bạn ở mức **intermediate tới advanced (trung cấp đến nâng cao)**. Lời khuyên chân thành: hãy ít nhất đã từng xây qua một ứng dụng backend — đã nếm trải "quy trình làm xúc xích" và thấy nó khó nhằn thế nào. Nếu các bạn là **full stack engineer**, đây là khóa học hoàn hảo, vì các bạn đã đi khắp nơi: database, backend, frontend.

Mục tiêu của mình rất rõ: **vén bức màn lên, cho các bạn thấy điều gì thật sự diễn ra trong backend.** Còn rất nhiều thứ khác trong khóa học mà bài giới thiệu này chưa kể hết. Hy vọng các bạn sẽ thích nó — và ở bài tiếp theo, chúng ta sẽ trả lời câu hỏi: khóa học này dành cho ai. 🚀
