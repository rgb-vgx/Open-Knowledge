# 🧩 Reflector & Revisor: Bộ đôi chain "phê bình – viết lại" cho Reflection Agent

Chào các bạn, lại là Eden đây! Trong bài này, chúng ta sẽ cùng **triển khai những chain sẽ chạy bên trong graph** của reflection agent. Hãy nhớ rằng graph chỉ là "bộ khung" điều phối — muốn lắp ráp nó, chúng ta phải xây dựng trước những "linh kiện" sẽ vận hành bên trong đã.

### ⚙️ Vì sao phải dựng chain trước khi dựng graph?

Trước khi xây graph, chúng ta cần **xây dựng những component sẽ chạy bên trong nó**. Cụ thể ở đây là hai chain:

1. **Generation chain** — chịu trách nhiệm **tạo mới và chỉnh sửa tweet** cho đến khi nó ngày một tốt hơn.
2. **Reflection chain** — nhận tweet đầu vào, **đưa ra phản hồi, phê bình và gợi ý** cách cải thiện.

Ở mỗi vòng lặp trong graph, phần critique (lời phê bình) này sẽ được "bơm" ngược trở lại generation chain để nó tiếp tục revise.

Mình tạo file **`chains.py`** — nơi chứa toàn bộ prompt và chain dùng trong graph. File bắt đầu với các import quan trọng:

* **`ChatPromptTemplate`** — nơi chứa nội dung chúng ta gửi cho LLM với vai trò "human", hoặc nhận về từ LLM với nhãn "AI".
* **`MessagesPlaceholder`** — cho phép chèn một "chỗ trống" linh động cho các message trong tương lai.
* **`ChatOpenAI`** — để khởi tạo model.

---

### 🔍 Reflection prompt: "Người phê bình" khó tính

Prompt đầu tiên là **reflection prompt** — đóng vai trò như bên phê bình (critique) trong kiến trúc agent của chúng ta. Nó nhìn vào kết quả đầu ra (ở đây là một tweet) và chỉ ra cách để tốt hơn.

System message của nó có nội dung đại ý:

*"You're a viral Twitter influencer creating a tweet. Generate critique and recommendation for the user's tweet. Always provide detailed recommendations including requests for length, virality, style, etc."*

Sau đó, chúng ta đặt một **messages placeholder** với tên biến là `messages`. Khi khởi tạo reflection prompt, mình sẽ "cắm" toàn bộ chuỗi message lịch sử vào đây — nhờ vậy agent có thể phê bình và đưa lời khuyên lặp đi lặp lại qua nhiều vòng.

---

### ✍️ Generation prompt: "Cây viết" không ngừng sửa mình

Prompt thứ hai là **generation prompt** — có nhiệm vụ tạo ra những tweet sẽ được chỉnh sửa liên tục dựa trên feedback từ reflection prompt. Mục tiêu là revise cho đến khi đạt được một tweet thật sự hoàn hảo.

Nội dung message đại ý:

*"You are a Twitter techie influencer assistant tasked with writing excellent Twitter posts. Generate the best Twitter posts possible for the user's request. If the user provides critique, respond with a revised version of your previous attempts."*

Các bạn có thể đặt tên cho nó tùy thích — gọi là **generation prompt** hay **creator prompt** đều được. Ở đây cũng có một `MessagesPlaceholder` với key `messages`, để chứa tất cả reflection và revision từ các bước trước đó.

---

### 🔗 Ghép chain bằng LangChain Expression Language

Giờ là lúc tạo hai chain hoàn chỉnh. Đầu tiên, mình khởi tạo một LLM — mặc định sẽ dùng **GPT-3.5 Turbo**. Sau đó, mình dùng **LangChain Expression Language (LCEL)** để nối prompt với model:

* **Generation chain** — "đấu ống" (`pipe`) generation prompt vào LLM.
* **Reflection chain** — tương tự, pipe reflection prompt vào chính LLM đó.

Vậy là xong phần chain! Ở bài tiếp theo, chúng ta sẽ cùng **lắp ráp graph LangGraph** hoàn chỉnh — nơi các chain này được kết nối thành một vòng lặp tự hoàn thiện. Hẹn gặp lại các bạn! 🚀
