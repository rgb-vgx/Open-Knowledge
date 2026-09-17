# 🔄 Tự tay viết ReAct Agent Loop trong LangChain: Từ Thought đến Final Answer

Sau khi đã có tool và biết cách bind tool vào model, hôm nay chúng ta sẽ implement **agent loop** — "trái tim" của mọi AI agent. Mình sẽ chạy debug từng bước để các bạn thấy rõ cách LLM suy nghĩ, chọn tool, thực thi và quay lại vòng lặp như thế nào.

*Đây là bài quan trọng nhất của Layer 1, nên mình sẽ đi thật kỹ nhé!*

### 🔁 Bước Thought: Vòng lặp và quyết định của LLM

Vòng lặp của chúng ta hoạt động như sau: mình sẽ lặp từ **1 đến max_iterations + 1** — đơn giản vì mình không muốn bắt đầu đếm từ 0. Mỗi vòng lặp, ta gửi messages cho LLM; LLM sẽ **suy nghĩ (thought)** và quyết định xem có cần thực thi tool hay không:

1. Nếu cần gọi tool, ta **thực thi tool** đó.
2. Lấy kết quả của tool **gửi ngược lại cho LLM**.
3. LLM tiếp tục các vòng lặp như vậy **cho đến khi không còn tool call nào** — đó cũng là lúc LLM quyết định đã có câu trả lời.
4. Mình in ra số thứ tự của từng vòng lặp để dễ theo dõi.

Tiếp theo là **thought step**: gọi LLM (đã kèm tools) với toàn bộ messages và nhận về một **AI message**. Message này sẽ chứa **quyết định gọi tool** của LLM, hoặc **content** — trong trường hợp model đã có câu trả lời và không muốn gọi tool nữa. Khi phần tool calls rỗng, nghĩa là LLM không cần thực thi tool → mình in ra "final answer", in luôn nội dung AI message và return giá trị này.

Để kiểm chứng, mình đặt breakpoint và chạy debug. Ta đang ở **vòng lặp 1**, với messages gồm **system message** và **user input**. Nhìn vào biến AI message, ta thấy có **content** — chính là quá trình suy nghĩ của model — và đặc biệt là có **tool calls**: LLM đã quyết định gọi **get_product_price** với tham số `product=laptop`. Vì tool calls không rỗng, vòng lặp tiếp tục.

---

### ⚙️ Thực thi tool call và Observation

Đây là lúc mình áp dụng một chút **defensive programming**: ngày nay LLM có thể trả về **nhiều tool call cùng lúc**, nhưng để ví dụ đơn giản và dễ hiểu, mình chỉ truy cập **tool call đầu tiên**. Về lý thuyết, tool_calls là một list có thể chứa nhiều phần tử — nhưng ở đây mình chỉ lấy phần tử đầu.

Mình trích xuất ba thứ từ tool call:

* **Tên tool** cần chạy — ở đây là `get_product_price`.
* **Tool arguments** — dictionary `product=laptop`.
* **Tool call id** — giúp ích khi trace mọi thứ trên LangSmith.

Sau đó, mình dùng **tools dictionary** đã khởi tạo từ trước để lấy hàm Python tương ứng — đây chính là lý do ta cần dictionary này. Biến nhận được là một **LangChain tool**, có thể gọi bằng method `invoke`. Nếu vì lý do gì đó không tìm thấy tool, mình raise lỗi; còn nếu ổn, mình **invoke tool với arguments** và thu được kết quả — gọi là **observation**.

Chạy debug, ta thấy mọi thứ diễn ra đúng như mong đợi: LLM chọn `get_product_price`, hàm chạy thành công, và trong biến observation là **giá thật của laptop**.

---

### 🧠 Ghi nhớ lịch sử — thứ tạo nên "agent"

Đến đây, ta đã dùng LLM như một **reasoning agent**: lấy output của nó, chạy tool cần thiết. Nhưng để agent thực sự "nhớ" mình đã làm gì, mỗi vòng lặp ta cần append vào messages:

* **AI message** — chứa tool call, tức quyết định của LLM.
* **Tool message** — chứa kết quả tool (observation) và **tool call ID** để phục vụ tracing.

Nhờ vậy, mỗi lần xử lý input, agent đều nhìn thấy **mọi bước nó đã làm trong quá khứ** — chính điều này tạo ra **agent capability**.

Vòng lặp kỳ vọng LLM sẽ kết thúc ở một thời điểm nào đó và không còn tool call, báo hiệu đã có đáp án. Nếu không, số vòng sẽ cứ tăng mãi — nên ta giới hạn 10 lần rồi dừng. Trong trường hợp đó, mình in thông báo lỗi rằng đã **max out số vòng lặp** và return rỗng.

---

### 🔍 Đọc trace và bài tập mapping

Chạy toàn bộ chương trình, ta thu được trace hoàn chỉnh cho câu hỏi *"What is the price of the laptop after applying the gold discount?"*:

1. **Vòng 1:** LLM chọn tool `get_product_price` với `product=laptop` → tool trả kết quả **1299**.
2. **Vòng 2:** LLM (đã thấy kết quả vòng trước) chọn `apply_discount` với hạng **gold** và mức giá nhận được → ra kết quả.
3. **Vòng 3:** Không còn tool call → trả về **final answer**.

Trên LangSmith, trace cho thấy rõ từng bước: gọi Ollama với hai tool `get_product_price` và `apply_discount`, system prompt, input, response chọn tool, rồi tool được thực thi — **tự động được trace** nhờ LangChain tool decorator. Tiếp đó là lần gọi LLM thứ hai với AI message chứa tool call cũ và ToolMessage chứa observation cùng **tool call id** khớp nhau (rất quan trọng khi tracing). Lần gọi thứ ba kết thúc với final answer không kèm tool call. Tổng cộng: **11 giây** và **2.4k token**.

*Bài tập cho các bạn:* hãy lấy **diagram của ReAct loop** và **map từng đoạn code** vào đó — đâu là thought process, đâu là tool invocation, khi nào LLM quyết định có final answer, và mỗi mũi tên trong state machine được implement như thế nào?

Những gì ta làm hôm nay chính là **lớp đầu tiên của việc bóc tách abstraction của agent**. Hàm `create_agent` của LangChain thực chất implement logic rất giống đoạn code này. Ở video tiếp theo, mình sẽ implement lại **hoàn toàn raw, không dùng LangChain** — khi đó các bạn sẽ thực sự thấy vì sao LangChain hữu ích và những vấn đề nó giải quyết cho chúng ta. Hẹn gặp lại! 🚀
