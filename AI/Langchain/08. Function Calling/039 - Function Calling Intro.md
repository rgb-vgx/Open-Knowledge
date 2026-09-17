# 🚀 Function Calling: Bước tiến hóa tất yếu từ ReAct Prompt

Xin chào, Eden đây! Hy vọng các bạn đang tận hưởng khóa học. Trong section này, chúng ta sẽ **đào sâu vào function calling** — hay còn gọi là **tool calling** (mình sẽ dùng hai thuật ngữ này thay thế cho nhau xuyên suốt).

*Nếu bạn vừa hoàn thành Layer 3 với "prompt thuần", thì đây chính là mảnh ghép tiếp theo của bức tranh lớn.*

### 🔍 Nhìn lại ReAct prompt: Hay nhưng chưa đủ "chắc"

Đến giờ, các bạn đã quen với **ReAct prompt** và thấy vòng lặp **reasoning rồi acting** này thú vị thế nào — từ đó ta xây được những ứng dụng rất tiên tiến.

Nhưng chắc hẳn bạn cũng nhận ra: **ReAct prompt không thực sự đáng tin cậy**. Chỉ cần LLM sinh **một token sai**, toàn bộ response có thể hỏng — vì **LangChain phải parse nó bằng regular expressions**. Đây là nền tảng của hành vi agentic và AI agent, nhưng chưa đủ độ ổn định để đưa vào production.

*Chính sự kém ổn định này là lý do các nhà cung cấp model phải "ra tay" — và đó là toàn bộ nội dung của section này.*

---

### ⚙️ Function Calling: Để nhà cung cấp model "gánh" phần khó

Bước tiến hóa tự nhiên của ReAct prompt thành một giải pháp **production-grade, đáng tin cậy** chính là khả năng **function calling / tool calling** của LLM. Ý tưởng cốt lõi rất đơn giản:

1. Thay vì phụ thuộc vào ReAct prompt, ta **dựa vào nhà cung cấp model** — Anthropic, Google, OpenAI...
2. Model sẽ trả về **function call** ở một **vị trí đặc biệt trong response**.
3. Đó là một **JSON đẹp đẽ** chứa **tên function** và **arguments**.
4. Chúng ta (hoặc LangChain) chỉ cần **parse JSON** — **không cần regular expressions**, chỉ cần truy cập các field là xong.
5. Sau đó, tiếp tục thuật toán AI agent như bình thường.

Kết quả nhận được với function calling **đáng tin cậy hơn hẳn** so với ReAct prompt. Nhờ vậy, ta có thể tự tin xây dựng những agent phức tạp mà không phải "nín thở" mỗi lần parse output.

---

### 🎯 Chúng ta sẽ làm gì trong section này?

Trong các video tiếp theo, mình sẽ cùng các bạn:

* **Demo function calling** trực tiếp trên code để bạn thấy tận mắt cách model trả về function call.
* **Chứng minh độ đáng tin cậy** của function calling so với ReAct prompt.
* Chỉ ra vì sao ngày nay, **best practice khi xây dựng AI agent chính là dùng function calling**.

*Đừng lo nếu bạn chưa thấy quen ngay — cứ đi qua từng video, mọi thứ sẽ khớp lại thành một bức tranh rõ ràng.*

Hãy cùng mình đi sâu vào chủ đề này nhé — hẹn gặp lại các bạn ở video tiếp theo! 🚀
