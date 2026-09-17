# 🎯 Mục tiêu Khóa học & Đối tượng phù hợp: Bạn sẽ nhận được gì và cần chuẩn bị những gì?

Tiếp tục hành trình khám phá khóa học LangChain, chúng ta hãy cùng nhau đi qua phần **Mục tiêu khóa học (Course Objectives)** nhé.

Mục tiêu số một của mình khi thiết kế khóa học này vô cùng đơn giản: **Đảm bảo rằng sau khi hoàn thành, bạn sẽ đủ tự tin để tự tay xây dựng các ứng dụng tích hợp LLM của riêng mình bằng LangChain.**

Trong thế giới Generative AI, mình thường chia các ứng dụng LLM thành hai loại chính: **Agents** và **RAG (Retrieval-Augmented Generation)**. Khóa học này sẽ cung cấp cho bạn kiến thức cực kỳ chuyên sâu về cả hai chủ đề này, giúp bạn nắm rõ cách triển khai từ A đến Z một cách thực chiến nhất.

---

### 🔍 Không chỉ "xây", mà còn "hiểu sâu" bản chất vấn đề

Điều tuyệt vời nhất là chúng ta không chỉ dừng lại ở việc lắp ráp ứng dụng, mà sẽ cùng nhau **đi sâu vào mã nguồn của LangChain** để hiểu chính xác những gì đang diễn ra "bên dưới lớp vỏ" (under the hood).

Sẽ không có bất kỳ "phép thuật" hay hộp đen nào cả! Chúng ta sẽ hiểu tường tận mọi thứ trong quá trình xây dựng ứng dụng, từ đó tạo cho bạn một nền tảng vững chắc trong lĩnh vực phát triển phần mềm ứng dụng LLM.

Và như một phần quà bonus, bạn cũng sẽ trở nên thông thạo toàn bộ hệ sinh thái của LangChain, bao gồm:

* **LangSmith:** Công cụ tuyệt vời cho việc tracing (theo dõi và gỡ lỗi luồng chạy).
* **LangGraph:** Công cụ đỉnh cao dành cho workflow engineering (kỹ thuật xây dựng luồng quy trình phức tạp).

*(Đừng lo lắng nếu bạn thấy những thuật ngữ này còn mới mẻ; mình hứa là bạn sẽ hiểu rõ tất cả chúng vào cuối khóa học!)*

Bên cạnh đó, chúng ta cũng sẽ thảo luận về các kỹ thuật **Prompt Engineering** từ cơ bản đến nâng cao, cũng như lịch sử hình thành của prompting – nền tảng cốt lõi của mọi ứng dụng Gen AI hiện nay.

Là một kỹ sư phần mềm từng có nhiều năm kinh nghiệm làm việc trong môi trường doanh nghiệp (enterprise), mình cũng sẽ lồng ghép xuyên suốt các tiêu chuẩn sẵn sàng cho môi trường thực tế (**production-ready**) như: **testing (kiểm thử), logging (ghi log), monitoring (giám sát), alerting (cảnh báo), và security (bảo mật)** thông qua các kịch bản thực tế.

---

### 👥 Khóa học này dành cho ai?

Ban đầu, khóa học này được thiết kế tập trung cho **các kỹ sư phần mềm (software engineers) và nhà khoa học dữ liệu (data scientists)** muốn bước chân vào thế giới Generative AI và tự tay xây dựng các ứng dụng LLM.

Tin vui là: **Bạn hoàn toàn không cần kiến thức nền tảng về Machine Learning!**

Hãy nhìn vào bản thân mình đi. Khi mới bắt đầu hành trình Gen AI vào năm 2023, mình có đúng 0 năm kinh nghiệm về Machine Learning. Mình từng cảm thấy thiếu tự tin vì khoảng trống kiến thức này, và việc nhảy vào thế giới Machine Learning thực sự đáng sợ đối với một lập trình viên backend thuần túy.

Nhưng thời thế đã thay đổi, AI giờ đây đã trở thành một "công nghệ phổ thông" (commodity), và LangChain chính là một trợ thủ đắc lực giúp tăng tốc quá trình đó. Bạn không cần phải học Machine Learning để tham gia khóa học này; bạn chỉ cần **kinh nghiệm lập trình phần mềm**.

*Một chút bất ngờ thú vị:* Dù đối tượng chính là dân kỹ thuật, nhưng mình đã từng rất ngạc nhiên khi thấy có cả **luật sư** và thậm chí là **bác sĩ** tham gia và rất thích thú với khóa học này đấy!

---

### ⚠️ Khóa học này KHÔNG dành cho ai?

Mình sẽ nói thẳng thắn: **Khóa học này không dành cho tất cả mọi người.**

Sẽ có một số kiến thức nền tảng (prerequisites) được mặc định là bạn đã biết và mình sẽ không giảng lại từ đầu. Nếu thiếu chúng, khóa học có thể sẽ trở nên thách thức đối với bạn:

1. **Ngôn ngữ Python:** Bạn cần có kiến thức cơ bản về Python (biết cách chạy chương trình, viết hàm, định nghĩa class và sử dụng thành thạo Python ở mức độ tiêu chuẩn). Tuy nhiên, chúng ta sẽ không làm gì quá đao to búa lớn với Python cả, chủ yếu là dùng thư viện LangChain thôi.
2. **Git cơ bản:** Toàn bộ mã nguồn được quản lý trên GitHub, nên bạn cần biết vài lệnh Git cơ bản như `git clone` hay `git commit`.
3. **Môi trường ảo (Virtual Environment):** Bạn cần nắm được khái niệm môi trường ảo trong Python và cách thiết lập các biến môi trường (environment variables).

Bất kỳ khóa học Python cơ bản nào cũng sẽ dạy bạn những điều này. Bạn sẽ thấy mình dựng toàn bộ dự án từ con số không (bootstrap from zero) và làm mọi thứ từng bước một, nhưng **đây là một khóa học về LangChain, không phải khóa học Python cơ bản**. Việc không mất thời gian dạy lại từ đầu sẽ giúp chúng ta có không gian để đi thẳng vào cốt lõi và khai thác sâu về LangChain một cách trọn vẹn nhất.

---

### 🤝 Cam kết từ tâm: Chính sách hoàn tiền 30 ngày

Cuối cùng, điều quan trọng bạn cần biết là khóa học này đi kèm với **chính sách hoàn tiền trong vòng 30 ngày**.

Nếu bạn cảm thấy khóa học này không phù hợp với mình, cứ thoải mái yêu cầu hoàn tiền. Bạn sẽ nhận lại tiền 100% mà không có bất kỳ câu hỏi hay sự khó dễ nào cả. Thậm chí, nếu vì lý do gì đó mà 30 ngày đã trôi qua nhưng bạn vẫn muốn hoàn tiền, đừng ngần ngại liên hệ trực tiếp với mình – mình sẽ cá nhân hóa việc hoàn tiền cho bạn với một tinh thần vô cùng thoải mái, không vướng bận điều gì.

Thế nào, mình hy vọng phần giải đáp này không làm bạn quá "hợp đồng" hay sợ hãi chứ? 😉

Mọi thứ đã sẵn sàng. Còn bây giờ, hãy thắt dây an toàn và **chính thức bước vào khóa học thôi nào!** 🚀