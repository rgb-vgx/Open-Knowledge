# 🔀 Model Switch: Đổi model chỉ bằng một chuỗi ký tự — nhưng đã đủ chưa?

> Nguồn: `030-Model-Switch.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/54882725)

Ở video trước, chúng ta đã tự tay implement agent loop — nhưng với các object của LangChain. Hôm nay, mình sẽ cho các bạn thấy **sự linh hoạt và tiện lợi** của LangChain khi chuyển đổi giữa các model... và cả một **bài học quan trọng** đằng sau sự tiện lợi đó.

*Đây là video ngắn nhưng chứa đựng một bài học mình rất tâm đắc — các bạn chú ý phần cuối nhé!*

### ⚡ Đổi model chỉ với một thay đổi nhỏ

Quay lại code, các bạn thấy chúng ta đang dùng model **Qwen3**. Trong phần khởi tạo LLM bằng `init_chat_model` với Ollama, mình chỉ cần đổi chuỗi thành **OpenAI** và tên model mong muốn — ví dụ **GPT-5** — thế là xong. Model đã được thay đổi!

Mình chạy lại chương trình:

* Vòng lặp 1 chọn đúng tool, lấy được kết quả tool.
* Vòng lặp 2 chọn đúng tool áp giảm giá và trả về final answer.

Mở LangSmith và xem trace mới nhất, các bạn sẽ thấy chúng ta đang dùng **chat open ai**. Lưu ý là việc này chỉ chạy được vì mình đã cài **langchain-openai** trong virtual environment. Trace cũng hiển thị **latency**, số **token** đã dùng, **chi phí** và câu trả lời của GPT-5.

Đây là một trong những lý do khiến LangChain "cất cánh": nó là một trong những **open source package đầu tiên** — nếu không muốn nói là đầu tiên — tạo ra lớp abstraction như vậy quanh các LLM. Khả năng đổi model chỉ bằng một chuỗi ký tự thực sự **rất tiện lợi**.

---

### ⚠️ Cú "quay xe": Model mạnh hơn chưa chắc cho kết quả tốt hơn

Tuy nhiên, khả năng đổi model dễ dàng **chưa đủ cho các ứng dụng production-grade**. Để mình chứng minh.

Model dùng ban nãy là **GPT-5** — thời điểm quay video, nó **không còn là state-of-the-art** nữa, vì đã có **GPT-5.2**. Vậy nếu mình chuyển sang GPT-5.2 và chạy thử thì sao? Kết quả nhận được là... **một câu trả lời không đạt yêu cầu**: agent hỏi ngược lại kiểu *"which laptop product should I look up in the catalog?"* thay vì hoàn thành nhiệm vụ.

| Model | Kết quả chạy | Ghi chú |
|---|---|---|
| Qwen3 qua Ollama | Vòng lặp chạy đúng như trước | Baseline của chúng ta |
| GPT-5 | Hoàn thành nhiệm vụ, trace hiện chat open ai | Trace có latency, token và chi phí |
| GPT-5.2 | Hỏi ngược lại thay vì hoàn thành nhiệm vụ | Model mới hơn chưa chắc tốt hơn cho use case |

Bài học mình muốn nhấn mạnh:

1. Đổi model **rất dễ**, nhưng phải đảm bảo model mới **đủ năng lực** và **phù hợp với use case** của bạn.
2. Việc GPT-5 là state-of-the-art ở thời điểm quay video **không đảm bảo** nó là model tốt nhất cho agent của chúng ta.
3. Trước khi chuyển model, hãy **kiểm tra kỹ lưỡng và benchmark** xem model nào thực sự tốt cho use case và cho agent run của bạn.

Và đây chính là lúc **evaluations (đánh giá)** phát huy tác dụng — chủ đề chúng ta sẽ đi sâu ở phần sau của khóa học. Mình cũng sẽ chia sẻ **cả hai trace** (GPT-5 và GPT-5.2) trong phần tài nguyên của video để các bạn tự so sánh.

*Đừng lo nếu bạn chưa từng làm evaluation — mình sẽ hướng dẫn đầy đủ ở các video sắp tới.*

---

### 🧭 Quay về Ollama và hướng tới lớp abstraction tiếp theo

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Để đổi model trong LangChain, ta phải sửa gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ đổi chuỗi provider và tên model trong `init_chat_model`.

Giải thích: Không cần import object chat model của từng vendor — đây là lý do LangChain "cất cánh".

Tham chiếu: Mục Đổi model chỉ với một thay đổi nhỏ.

</details>

**Câu 2:** Vì sao trace trên LangSmith ghi nhận được cả latency, token và chi phí của GPT-5?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì đã cài `langchain-openai` trong virtual environment nên tracing chạy tự động.

Giải thích: Trace hiển thị chat open ai cùng câu trả lời của GPT-5.

Tham chiếu: Mục Đổi model chỉ với một thay đổi nhỏ.

</details>

**Câu 3:** GPT-5.2 đã trả lời như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hỏi ngược lại kiểu "which laptop product should I look up in the catalog?" thay vì hoàn thành nhiệm vụ.

Giải thích: Đây là ví dụ model mới hơn, mạnh hơn nhưng chưa chắc phù hợp use case.

Tham chiếu: Mục Cú "quay xe".

</details>

**Câu 4:** Bài học chính của video là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Đổi model rất dễ, nhưng phải kiểm tra kỹ và benchmark xem model nào thực sự tốt cho agent run của bạn.

Giải thích: State-of-the-art ở thời điểm quay video không đảm bảo là model tốt nhất cho use case.

Tham chiếu: Mục Cú "quay xe".

</details>

**Câu 5:** Video tiếp theo sẽ bóc lớp abstraction nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Lớp chat model — implement lại agent loop hoàn toàn raw với Ollama SDK, không dùng object của LangChain.

Giải thích: Khi đó ta thấy tường tận những việc LangChain đang làm thay: format tool, quản lý message, tracing.

Tham chiếu: Mục Quay về Ollama và hướng tới lớp abstraction tiếp theo.

</details>

Cuối cùng, mình quay lại code với **Ollama và Qwen3** như trước. Ở video tiếp theo, chúng ta sẽ implement **đúng agent loop này** nhưng **không dùng object của LangChain**: không chat model, không tool decorator — tất cả sẽ làm **raw với Ollama SDK**.

Mục đích là **bóc thêm một lớp abstraction nữa**: lớp chat model. Khi đó, các bạn sẽ thấy tường tận **những công việc nặng nhọc mà LangChain đang làm thay chúng ta** — từ format tool, quản lý message, cho tới tracing. Hẹn gặp lại ở video tiếp theo! 🚀

## Nguồn tham khảo

- [Udemy — Model Switch](https://ua.udemy.com/course/langchain/learn/lecture/54882725)
- [LangChain Docs — Chat models và tool calling](https://docs.langchain.com/oss/python/langchain/models)
