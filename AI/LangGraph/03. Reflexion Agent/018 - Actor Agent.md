# 🎭 Actor Agent: "First responder chain" viết bản nháp đầu tiên kèm critique và search query

Chào các bạn, mình là Eden đây! 👋 Trong video này, chúng ta sẽ implement **actor agent** — còn gọi là **first responder chain**, bước đầu tiên của graph. Nhiệm vụ của nó rất rõ ràng: nhận **user query** và tạo ra **bài viết đầu tiên**.

Đây là video dài và nhiều "đồ chơi" kỹ thuật, chúng ta sẽ cùng đi qua **prompt engineering**, **output parsers** và đặc biệt là **function calling** để ép LLM trả về **structured output (đầu ra có cấu trúc)**. Code vẫn có sẵn trong phần **Resources** như mọi khi nhé.

---

### 🧱 Imports và bối cảnh "message graph"

Bắt đầu với các import:

* **datetime** — để truyền ngày giờ hiện tại cho agent.
* `load_dotenv` — nạp biến môi trường.
* **JSONOutputToolsParser** và **PydanticToolsParser** từ LangChain output parsers — hai "phiên dịch viên" cho kết quả **function calling**: một cái biến response thành **JSON/dictionary**, một cái biến thành **Pydantic object**.
* **HumanMessage**, **ChatPromptTemplate** và **MessagesPlaceholder** — nơi chứa toàn bộ lịch sử các vòng lặp của agent, đồng thời làm chỗ trống cho các message mới.
* **ChatOpenAI** — mình dùng **GPT-4 Turbo**.

Một lưu ý quan trọng trước khi bắt đầu: chúng ta dùng **message graph**, nghĩa là **state** chỉ đơn giản là một **list of messages** và sẽ thay đổi sau mỗi node.

---

### 📝 Prompt chính: một template, ba nhiệm vụ

Mình tạo biến **actor_prompt_template** bằng `ChatPromptTemplate.from_messages`, gồm **system prompt** và toàn bộ lịch sử hội thoại. System prompt có dạng: *"You are an expert researcher, the current time is {time}"* — phần thời gian sẽ được điền động.

Phần **output indicator** có ba phần:

1. **First instructions** — chỗ để "nhét" yêu cầu cụ thể, ví dụ *"write a 250 word essay"*.
2. *"Reflect and critique your answer, be severe to maximize improvement"* — bài critique này sẽ được **Revisor** dùng ở bước sau.
3. *"Recommend search queries to research information and improve your answer"* — đây mới chỉ là **search query**, chưa phải kết quả; các query này sẽ được dùng ở **tool execution node** với **Tavily**.

Một điểm rất hay: template này sẽ **được tái sử dụng ở Revisor node** — nơi agent revise và critique liên tục. Vì thế chúng ta cần **MessagesPlaceholder** để đưa toàn bộ lịch sử vào.

Cuối cùng, mình dùng phương thức `.partial` để điền sẵn những placeholder đã biết — ví dụ ngày hiện tại — thông qua một **lambda function** trả về ngày hôm nay theo định dạng **ISO**. Giá trị này chỉ được tính khi prompt template được invoke, tức là khi agent thực sự chạy.

---

### 🧩 Schemas.py: "dạy" LLM qua mô tả field

Để output có cấu trúc, mình tạo file **schemas.py** với hai class **Pydantic**:

* **Reflection** — chứa hai thứ cần góp ý: **missing** (thông tin quan trọng bị thiếu) và **superfluous** (thông tin thừa, không tạo thêm giá trị — Eden thú nhận phải **tra từ điển** mới biết nghĩa từ này!).
* **AnswerQuestion** — gồm **answer** (bài trả lời 250 từ), **reflection** (đối tượng Reflection ở trên) và **search_queries** (1–3 truy vấn để cải thiện câu trả lời).

Một "chiêu" rất thú vị: chúng ta **prompt LLM ngay trong phần description của các field** — điều này giúp LLM **ground (neo) câu trả lời** vào đúng cấu trúc mong muốn. Khi dùng kèm **function calling**, class Reflection sẽ ép LLM trả về phản hồi cực kỳ cô đọng.

Quay lại **chains.py**, mình khởi tạo LLM **GPT-4 Turbo** cùng hai output parser (JSON tools parser và Pydantic tools parser — cái sau biến kết quả thành **AnswerQuestion object**).

---

### 🔗 First responder chain và chiêu "tool_choice"

Mình điền vào ô first instruction câu lệnh: **"Provide a detailed 250 word answer"**. Sau đó tạo **first responder chain**:

* prompt template → pipe vào **LLM GPT-4 Turbo** đã được `bind_tools` với **AnswerQuestion**.
* Đặt **tool_choice = "AnswerQuestion"** — buộc LLM **luôn luôn** gọi tool này, nhờ đó câu trả lời bị **neo chặt** vào object chúng ta muốn.

Với `if __name__ == "__main__"`, mình chạy chain với prompt: *"Write about AI-Powered SOC / autonomous SOC problem domain, list startups that have raised capital on this"* và truyền **HumanMessage** vào key `messages`.

---

### 🧪 Kết quả thực tế: một lỗi nhỏ và những phát hiện lớn

Lần chạy đầu tiên báo lỗi thiếu field **search_queries** — LLM không chịu sinh truy vấn. Có thể xử lý bằng **prompt engineering** (ví dụ: *"you must provide the search queries at all costs"*) hoặc tách thành một prompt riêng; nhưng vì đây là **proof of concept**, mình chỉ chạy lại và mọi thứ hoạt động.

Kết quả nhận được là một **AnswerQuestion object**:

* **Answer** về AI-powered SOC: tự động hóa phát hiện và vô hiệu hóa mối đe dọa, giảm false positive, giải phóng analyst cho việc chiến lược; thách thức nằm ở tích hợp với hạ tầng hiện có, độ chính xác và quyền riêng tư dữ liệu.
* **Reflection:** phần *missing* nhận xét bài viết cần số liệu cụ thể hơn về **số vốn gọi được của từng startup**; phần *superfluous* cho rằng đoạn giải thích chi tiết về problem domain hơi thừa với người đã quen khái niệm.
* **Search queries (4):** *AI-powered SOC startup funding*, *Darktrace funding history*, *Vectra capital raised*, *Arctic investment rounds*.

Mình cũng chỉ ra hai điểm cần cải thiện: response có **thông tin dư**, và dữ liệu về startup đến từ **parametric knowledge** (kiến thức LLM học trong quá trình training) — vì vậy cần **ground bằng dữ liệu bên ngoài**. Cuối cùng, mở **LangSmith** xem trace, ta thấy rõ prompt đã gửi cho OpenAI và answer được parse bằng **Pydantic output parser**.

Wow, một video dài đúng chất hands-on! *Nếu có đoạn nào hơi nặng, cứ xem lại — đây là phần lõi của cả agent.* Chúng ta đã có logic cho **responder node**; video tiếp theo sẽ đến với **Revisor chain** nhé! 🚀
