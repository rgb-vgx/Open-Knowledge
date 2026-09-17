# 🧠 Self-RAG Implementation: Hai "giám khảo" canh chừng câu trả lời của LLM

Chào các bạn! Đây sẽ là một bài dài vì chúng ta triển khai trọn vẹn **Self-RAG paper** từ đầu đến cuối. Tin vui là mọi thứ sẽ dễ hơn nhiều nhờ cấu trúc đã có sẵn — mình chỉ cần thêm một tầng reflection (phản chiếu) ngay sau node generate mà thôi.

### 🗺️ Bức tranh tổng thể

Thay vì đi thẳng từ `generate` tới `END`, chúng ta thêm **conditional branching** (nhánh điều kiện) sau generate. Trong bài này mình viết hai chain phản chiếu:

* **Hallucination Grader** — kiểm tra xem câu trả lời của LLM có **grounded** trong tài liệu không (model có bịa không).
* **Answer Grader** — kiểm tra xem câu trả lời có **thật sự giải quyết câu hỏi gốc** hay không.

Bạn có thể thắc mắc: *sao không gói mỗi kiểm tra vào một node riêng?* Câu trả lời là hoàn toàn có thể. Nhưng vì quá trình này phải **quyết định bước tiếp theo** (kết thúc, sinh lại, hay tìm kiếm thêm), nên với mình **conditional branching trực giác hơn** — ta chọn node kế tiếp ngay tại điểm rẽ nhánh.

---

### 🕵️ Hallucination Grader: câu trả lời có bám tài liệu không?

Mình tạo file `hallucination_grader.py` trong package `chains`, với các import quen thuộc: `ChatPromptTemplate`, `BaseModel` và `Field` từ Pydantic, `RunnableSequence` để type hinting, và `ChatOpenAI`. Điểm đáng chú ý:

* Class `GradeHallucinations` kế thừa BaseModel, chỉ có **một attribute `binary_score` kiểu boolean**, description là *"answer is grounded in the facts, yes or no"*. Vì type hint là boolean nên output parser của LangChain sẽ **tự cast** câu trả lời của LLM thành boolean.
* Dùng `with_structured_output` với class này → kết quả trả về luôn đúng định dạng Pydantic mong muốn.
* System prompt: yêu cầu LLM chấm xem generation có grounded/được hỗ trợ bởi tập tài liệu hay không, trả về `yes`/`no`.
* `ChatPromptTemplate.from_messages` nhận list các tuple: một **system message**, một **human message** chứa các facts (tài liệu mình plug vào) và generation của LLM.

```python
class GradeHallucinations(BaseModel):
    binary_score: bool = Field(
        description="Answer is grounded in the facts, 'yes' or 'no'"
    )

hallucination_grader = hallucination_prompt | llm.with_structured_output(GradeHallucinations)
```

Về phần test, mình viết hai case:

1. **`test_hallucination_grader_answer_yes`:** câu hỏi "agent memory", retrieve tài liệu, dùng generation chain để sinh câu trả lời từ chính tài liệu đó — câu trả lời phải grounded → kết quả `yes`. *Lần chạy đầu mình gặp lỗi vì import trước khi load biến môi trường*; sửa thứ tự là chạy pass ngay.
2. **`test_hallucination_grader_answer_no`:** giữ nguyên mọi thứ, đổi kỳ vọng thành `no` và thay generation bằng nội dung "bịa": *"In order to make pizza, we first need to start with the dough."* Kết quả trả về `binary_score = false` — đúng là hallucinated. Mình cũng xóa một dòng không còn dùng trong test, rồi chạy lại toàn bộ test — tất cả đều pass ngon lành.

---

### 📝 Answer Grader: câu trả lời có đúng câu hỏi không?

Tương tự, mình tạo file `answer_grader.py` trong `chains`:

* Class `GradeAnswer` với một attribute `binary_score`, description: *"answer addresses the question, yes or no"*.
* Structured output với LLM, kèm system prompt: chấm xem câu trả lời có **giải quyết câu hỏi** hay không; `yes` nghĩa là có.
* `ChatPromptTemplate.from_messages` gồm system message và human message chứa câu hỏi của người dùng cùng generation của LLM.
* Chain `answer_grader` trả về object `GradeAnswer` cho biết `true/false` — không có gì mới về prompt engineering, vẫn là structured output với Pydantic class.

```python
class GradeAnswer(BaseModel):
    binary_score: str = Field(
        description="Answer addresses the question, 'yes' or 'no'"
    )

answer_grader = answer_prompt | llm.with_structured_output(GradeAnswer)
```

---

### 🔀 Ghép vào graph và chạy thử

Giờ là phần thú vị nhất: mình import `answer_grader` và `hallucination_grader` vào `graph.py`, rồi viết hàm điều kiện `grade_generation_v_documents_and_question(state)` trả về **tên node tiếp theo**. Đầu tiên, mình lấy `question`, `documents`, `generation` từ state rồi chạy hallucination grader:

* Nếu **grounded** (không hallucinate) → chạy answer grader. Nếu câu trả lời **giải quyết câu hỏi** → trả về `"useful"`; nếu không → trả về `"not useful"`.
* Nếu **không grounded** → trả về `"not supported"`.

À, mình cố tình trả về `"useful"` thay vì `END` để lát nữa demo cho các bạn cách dùng **path map**. Và đây là các conditional edge, kèm ý nghĩa từng nhánh:

```python
workflow.add_conditional_edges(
    "generate",
    grade_generation_v_documents_and_question,
    {
        "not supported": "generate",
        "useful": END,
        "not useful": "web_search",
    },
)
```

* `"not supported"` → quay lại **generate** để sinh lại cho grounded.
* `"useful"` → đi tới **END**, trả câu trả lời cho người dùng.
* `"not useful"` → đi tới **web search**, vì vector store không đủ thông tin để trả lời.

Một điểm rất hay: chính những string này sẽ được hiển thị trên các edge của graph, khiến luồng chạy trở nên **explainable** (dễ hiểu, dễ giải thích) hơn hẳn.

Cuối cùng, mình chạy `main.py` với câu hỏi "what is agent memory" — đúng như kỳ vọng, đây là **happy flow**: câu trả lời grounded trong tài liệu và giải quyết đúng câu hỏi. Nhìn vào log, các bạn thấy rõ từng bước; còn trên **LangSmith**, trace cho thấy sau node generate, node `grade_generation...` được kích hoạt — nó gọi LLM **2 lần** (một cho grounding, một cho việc trả lời đúng câu hỏi) trước khi quyết định trả câu trả lời cho người dùng.

Chúc mừng các bạn! Chúng ta vừa hoàn thành một workflow phức tạp với khả năng tự kiểm tra chính mình. Nếu muốn đối chiếu, các bạn có thể xem code trong **GitHub repository** của khóa học. Ở bài cuối của section, mình sẽ giới thiệu **Adaptive RAG** — dạy agent biết chọn "đúng cửa" cho từng câu hỏi. Hẹn gặp lại! 🚀
