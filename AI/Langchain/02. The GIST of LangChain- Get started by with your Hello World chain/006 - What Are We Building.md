# 🎯 Chúng ta sẽ xây gì? Viết chiếc "Hello World" đầu tiên với LangChain

Chào các bạn, Eden đây! 👋 Ở section này, chúng ta sẽ cùng viết **chain LangChain đầu tiên** — và như mọi hành trình lập trình tử tế, nó bắt đầu bằng một chiếc **Hello World**.

Không có gì phức tạp đâu, chúng ta học bằng cách làm (learn by doing), và mình sẽ giới thiệu từng viên gạch nền tảng mà bạn sẽ dùng xuyên suốt khóa học.

---

### 🧪 Chúng ta sẽ xây gì?

Ý tưởng cực kỳ đơn giản: chúng ta lấy **thông tin về Elon Musk**, gửi vào một **LLM**, để model này:

1. **Tóm tắt (summarize)** thông tin đó thành một đoạn ngắn.
2. **Tạo ra vài sự thật thú vị (cool facts)** về Elon Musk.

Đó chính là chain **LangChain Hello World** — nhỏ gọn nhưng chứa đựng gần như toàn bộ các thành phần cơ bản mà chúng ta sẽ dùng về sau.

---

### 🧱 Những khái niệm bạn sẽ gặp

Đây là section "learn by doing", nên song song với việc viết code, mình sẽ giới thiệu những cấu trúc (constructs) nền tảng của LangChain:

* **Prompt templates** — khuôn mẫu để tạo prompt linh động.
* **Prompts** — đầu vào mà LLM thực sự nhận.
* **Chat models** — giao diện để trò chuyện với các LLM.
* **Chains** — cách nối các thành phần thành một luồng xử lý.
* **Debugging và tracing** — kỹ năng quan trọng để "nhìn xuyên" vào ứng dụng LLM khi nó chạy.

*Đừng lo nếu các thuật ngữ này còn lạ lẫm — mình sẽ đi cùng bạn từng bước một.*

---

### 🔌 Bạn có thể dùng LLM nào?

Trong section này, mình sẽ dùng **GPT-5 của OpenAI**. Tuy nhiên, bạn hoàn toàn có thể dùng bất kỳ **first-tier LLM** nào mà bạn thích — chẳng hạn **Gemini của Google** hay **Claude của Anthropic**.

Đặc biệt, mình cũng sẽ hướng dẫn cách dùng **Ollama** để chạy **open-weights model** ngay trên máy của bạn, và chúng ta sẽ thử với **Gemma 3 của Google**. Vậy là dù bạn muốn dùng API trả phí hay model miễn phí chạy local, khóa học đều đáp ứng được.

---

Hy vọng bạn sẽ thích chiếc "Hello World" đầu tiên này. Nào, cùng mình vào code thôi! 🚀
