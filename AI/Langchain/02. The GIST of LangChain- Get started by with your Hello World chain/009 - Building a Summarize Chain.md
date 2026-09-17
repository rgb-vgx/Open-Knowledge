# 🔨 Xây chain đầu tiên: Tóm tắt và "đào" sự thật thú vị về Elon Musk

Chào các bạn, Eden đây! Lý thuyết đã đủ rồi — giờ là lúc **viết chain LangChain đầu tiên** của chúng ta. Nhiệm vụ: lấy thông tin về Elon Musk, gửi cho LLM để **tóm tắt** và tạo ra **hai sự thật thú vị** về ông ấy.

Cùng mình đi qua từng bước nhé, mọi thứ đều rất trực quan.

---

### 📄 Bước 1 — Chuẩn bị dữ liệu đầu vào

Đầu tiên, mình định nghĩa một biến tên `information` để chứa dữ liệu. Mình lên Google tìm "Elon Musk", lấy đoạn thông tin đầu tiên từ **Wikipedia** và dán vào biến này.

Đây sẽ là dữ liệu được "chảy" vào LLM — nhưng không phải trực tiếp, mà thông qua một **prompt template**.

---

### 🧱 Bước 2 — Viết prompt template

Tiếp theo, mình viết template với một placeholder nằm trong dấu ngoặc nhọn:

```python
template = """Given the information {information} about a person I want you to create a short summary and two interesting facts about them"""

summary_prompt_template = PromptTemplate(
    input_variables=["information"],
    template=template
)
```

Có thể bạn đoán ngay: `{information}` sẽ không giữ nguyên trong prompt cuối cùng — nó sẽ được **thay bằng giá trị thật của biến** `information` **lúc runtime**.

Mình khởi tạo object `PromptTemplate` với template vừa viết, kèm danh sách `input_variables` — danh sách các key sẽ được "bơm" vào lúc chạy. Danh sách này **phải khớp chính xác** với các placeholder trong dấu ngoặc nhọn.

**Vậy vì sao không dùng f-string cho nhanh?** Câu hỏi rất hợp lý! Prompt template mang lại:

* **Ràng buộc chặt chẽ:** nó bắt bạn cung cấp đúng các biến mong đợi. Nếu quên hoặc gõ sai tên biến, bạn nhận được **lỗi rõ ràng** thay vì một prompt hỏng bị âm thầm gửi tới LLM.
* **Tái sử dụng và rõ ràng:** prompt có thể dùng lại trong một chain khác.
* **First-class citizen:** đây là công dân hạng nhất trong LangChain — nó được **log lại, trace lại**, giúp việc debug dễ thở hơn nhiều.
* **An toàn hơn trước prompt injection:** nó có thể áp đặt format và cấu trúc nghiêm ngặt, đặc biệt mạnh khi kết hợp với **output parsers**.

f-string khuyến khích ta cứ "nhồi" text vào — cũng chẳng sao, nhưng nếu muốn code **đáng tin cậy (reliable)**, hãy dùng prompt template. *Nghe hơi nhiều buzzword phải không? Cứ từ từ, cuối khóa bạn sẽ nắm hết.*

---

### 💬 Bước 3 — Khởi tạo Chat Model

Giờ đến lượt model. Mình tạo một **OpenAI chat model** và đặt tên biến là `llm`:

```python
llm = ChatOpenAI(temperature=0, model="gpt-5")
```

Đây là cách chúng ta tương tác với **GPT-5**, và cũng chính object này sẽ thực hiện các **API call** tới OpenAI để gửi prompt và nhận phản hồi.

**Ai trả tiền cho các API call này?** Nhớ lại video trước: chúng ta đã tạo API key trên OpenAI, gắn với tài khoản có thông tin thanh toán, và lưu vào biến môi trường `OPENAI_API_KEY`. LangChain sẽ tự tìm biến môi trường này và dùng nó làm thông tin xác thực. *Bài tập nhỏ: bạn thử mở source code của `ChatOpenAI` xem việc này diễn ra ở đâu nhé!*

Mình khởi tạo model với `temperature=0`. **Temperature quyết định độ ngẫu nhiên/sáng tạo của phản hồi**:

* **Thấp (0 – 0.3):** kết quả mang tính **deterministic (xác định), khách quan và có thể lặp lại** — rất hợp cho **tóm tắt, viết code, hướng dẫn, viết test**.
* **Cao (trên 0.8 đến 1):** kết quả **cực kỳ sáng tạo** — hợp cho **thơ ca, tiểu thuyết và những ý tưởng đột phá**.

Muốn hiểu temperature hoạt động thế nào, bạn ghé phần lý thuyết của khóa học nhé.

---

### 🔀 Bước 4 — Nối chain bằng pipe operator và chạy

Và đây, khoảnh khắc quan trọng nhất — chain đầu tiên của chúng ta:

```python
chain = summary_prompt_template | llm

response = chain.invoke({"information": information})
print(response.content)
```

Mình cùng "mổ xẻ" chuyện gì đang xảy ra nhé. Chúng ta đang dùng **LCEL — LangChain Expression Language**. Cú pháp này tạo chain bằng cách **compose hai component**: một prompt template và một LLM.

* `summary_prompt_template` sẽ format các input variables — ở đây là `information` — thành một **prompt string**.
* `llm` nhận prompt string đó và sinh ra phản hồi dạng text.
* **Pipe operator `|`** tạo ra một **runnable chain** mới: nối output của component bên trái thành input của component bên phải.

Nói cách khác: **format input bằng prompt template trước, rồi đưa prompt string thu được vào LLM để sinh phản hồi.** Kết quả trả về là một **runnable object** — nghĩa là ta gọi được method `invoke` với input khớp với template.

Khi bạn chạy `chain.invoke`, chuỗi sự kiện diễn ra như sau:

1. `invoke` của **prompt template** được gọi với input là key `information` (mang giá trị tiểu sử Elon Musk).
2. Kết quả là một **PromptValue** — nôm na là một "string xịn".
3. String này được pipe vào `invoke` của **LLM**.
4. Prompt cuối cùng được gửi tới model.

Đó là cách "nối chuỗi" thông minh — và cũng chính là ý nghĩa cái tên **LangChain**.

Mình nói thật lòng: **LCEL là thứ khó tiêu hóa nhất trong LangChain.** *Không hiểu ngay từ lần đầu là chuyện hoàn toàn bình thường!* Chúng ta sẽ đào sâu vào implementation và có thêm nhiều ví dụ xuyên khóa. Ở thời điểm này, chỉ cần hiểu ở mức cao: ta lấy biến `information`, nhét nó vào string, và gửi string đó cho LLM.

*(Fun fact: hiểu và implement agents còn dễ hơn hiểu pipe operator của chain expression language đấy!)*

Cuối cùng, chạy code thôi. GPT-5 khá chậm nên mình tua nhanh một chút, và ở cuối ta in ra `response.content` — chính là string LLM trả về. Kết quả: một **bản tóm tắt ngắn** và **hai sự thật thú vị** về Elon Musk. Tuyệt vời!

---

Ở video tiếp theo, chúng ta sẽ **debug, mổ xẻ các object** và **trace toàn bộ quá trình này với LangSmith** để bạn thấy tận mắt mọi thứ diễn ra bên trong. Hẹn gặp lại nhé! 🚀
