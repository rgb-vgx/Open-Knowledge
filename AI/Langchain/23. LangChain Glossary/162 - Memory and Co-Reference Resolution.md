# 🧠 Memory phần 1: Khi LLM "mất trí nhớ" và phép màu mang tên coreference resolution

Chào các bạn, hôm nay mình và các bạn sẽ mở màn cho một chủ đề cực kỳ thú vị và cũng đầy "đau đầu" trong thế giới LLM: **memory (bộ nhớ hội thoại)**. Bài này là phần lý thuyết nền tảng, giúp các bạn hiểu vì sao LLM cần memory, trước khi chúng ta đi vào phần implementation ở các bài sau.

### 🔍 LLM là stateless — và đó là lý do nó "quên" bạn ngay lập tức

Trong các tương tác với người dùng, **LLM là stateless (phi trạng thái)** — nghĩa là chúng **không lưu lại bất kỳ thông tin nào** từ những cuộc trò chuyện đã diễn ra trước đó. Mỗi lần bạn gửi câu hỏi mới, model lại bắt đầu từ con số 0.

Hãy xem ví dụ này nhé. Nếu mình hỏi LLM (dựa trên tài liệu LangChain): *"Ai là người tạo ra LangChain?"* — mình sẽ nhận được câu trả lời chính xác: **Harrison Chase**. Nhưng nếu mình hỏi tiếp: *"Bạn có biết video YouTube nào về ông ấy không?"* — câu trả lời nhận được sẽ là:

> *"Tôi xin lỗi, tôi không biết bạn đang nhắc đến ai. Bạn có thể cung cấp thêm ngữ cảnh hoặc làm rõ 'ông ấy' là ai không?"*

Đúng vậy, chỉ sau **một câu hỏi**, model đã quên sạch cuộc trò chuyện.

---

### 💡 Coreference resolution — khi "him" phải được hiểu là Harrison Chase

Hiện tượng trên có một tên gọi chính thức trong học thuật: **coreference resolution (phân giải đại từ)**.

Đây là bài toán **xác định tất cả các biểu đạt, từ hoặc cụm từ trong một văn bản cùng tham chiếu đến một thực thể hay khái niệm**. Nói cách khác, đó là quá trình nhận diện mọi trường hợp mà các từ ngữ khác nhau trong văn bản đang nói về **cùng một thứ**.

Trong ví dụ trên, từ **"him" (ông ấy)** chính là đang tham chiếu đến **Harrison Chase** — nhưng model không làm được phép phân giải này, đơn giản vì nó **không có state (trạng thái)**.

Tin tốt là: nếu model được cung cấp **state và chat history (lịch sử hội thoại)** trong prompt, nó sẽ dễ dàng thực hiện coreference resolution. Và đây chính là **nền tảng cho mọi giải pháp memory** mà LangChain đang hỗ trợ: chúng ta đơn giản là tìm những cách tinh tế để **truyền vào prompt dữ liệu, thông tin cần thiết**, giúp model phân giải được các tham chiếu.

Ví dụ, prompt sẽ có dạng: *"Cho cuộc trò chuyện trước đó, hãy trả lời câu hỏi hiện tại của tôi."* Trong lịch sử, ta có cuộc hội thoại kiểu: *"Tôi thích uống cold brew coffee"*, *"tôi không muốn uống ở Starbucks hay Coffee Bean"*, và câu hỏi cuối: *"Tôi có thể tìm nó ở đâu khác?"* — ở đây **"nó"** đang tham chiếu đến **cold brew coffee**, và model hoàn toàn có thể xử lý, thực hiện phân giải và trả lời đúng.

---

### ⏰ Nút thắt token: hội thoại càng dài, prompt càng "phình"

Mọi chuyện bắt đầu phức tạp khi bạn nhận ra: nếu cuộc hội thoại kéo dài cả **một giờ đồng hồ**, ta sẽ gặp rắc rối — **quá nhiều dữ liệu để nhét vào prompt**. Chúng ta đã biết LLM có **giới hạn token**, và một cuộc trò chuyện rất dài chắc chắn sẽ **vượt qua giới hạn này**.

Vậy LangChain giải quyết ra sao? Đó chính là nội dung của các bài tiếp theo trong chủ đề memory.

*Lưu ý nhé: bài này là bài lý thuyết thuần túy — mình sẽ không demo code trực tiếp. Các class và cách implement sẽ lần lượt xuất hiện trong phần còn lại của khóa học, nên các bạn đừng lo nếu giờ chưa thấy code.*

Nói ngắn gọn: memory không phải phép thuật, mà là bài toán **thiết kế ngữ cảnh thông minh** — chọn lọc và đưa vào prompt đúng những dữ liệu cần thiết cho lượt hội thoại hiện tại.

Mục tiêu hôm nay là để các bạn nắm được **những chiến lược** được dùng để giải quyết bài toán token trong memory. Nắm vững nền tảng này rồi, các bạn sẽ thấy phần implementation nhẹ nhàng hơn hẳn. Hẹn gặp lại ở bài tiếp theo! 🚀
