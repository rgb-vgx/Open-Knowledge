# 🧠 Reflector & Revisor: Xây hai "bộ não" chạy bên trong Reflection Agent

Chào các bạn, Eden đây! Sau khi đã dựng xong môi trường, hôm nay chúng ta sẽ cùng viết các **chain** — những "cỗ máy" thực sự chạy bên trong graph. Trước khi dựng graph, ta phải dựng những thành phần sẽ chạy trong nó, đúng không nào?

### 📐 Hai chain, hai nhiệm vụ

Trong video này, chúng ta sẽ triển khai hai chain:

* **Generation chain (chuỗi sinh — revisor):** chịu trách nhiệm **sinh và chỉnh sửa (revise) tweet** của chúng ta, mỗi vòng một tốt hơn.
* **Reflection chain (chuỗi phản chiếu — reflector):** nhận tweet và đưa ra **phản hồi, phê bình**, kèm gợi ý cải thiện — lặp đi lặp lại.

Cứ mỗi vòng lặp trong graph, critique (lời phê bình) từ reflection chain sẽ được đưa vào generation chain để viết lại tweet. Đây chính là "trái tim" của kỹ thuật reflection mà chúng ta đang xây.

---

### ✍️ Reflection prompt — "bên phản chiếu"

Mình tạo một file mới tên là `chains.py` — nơi chứa toàn bộ prompt và chain dùng trong graph. Bắt đầu với các import:

* `ChatPromptTemplate` (mẫu prompt chat) và `MessagesPlaceholder` (chỗ trống cho message) từ LangChain. Nhắc lại một chút: **ChatPromptTemplate** chứa nội dung ta gửi cho LLM với vai trò con người, hoặc nhận về từ LLM với nhãn AI; còn **MessagesPlaceholder** cho phép ta đặt một **chỗ trống cho những message sẽ đến sau**.
* `ChatOpenAI` từ `langchain_openai`.

Prompt đầu tiên là **reflection prompt**. Đây là một **system message**, đại ý như sau:

* Bạn là một **influencer viral trên Twitter**.
* Nhiệm vụ: **tạo critique và recommendation** cho tweet của người dùng.
* Luôn đưa ra gợi ý chi tiết, bao gồm cả **độ dài (length), độ viral, style**, v.v.

Ngay dưới đó, mình đặt một `MessagesPlaceholder` với tên biến là `messages` — đây là chỗ chứa **lịch sử hội thoại**. Chính những message này sẽ được agent dùng để phê bình và nhận gợi ý hết lần này đến lần khác. Khi khởi tạo reflector, ta sẽ nối prompt này với biến `messages`.

---

### 🐦 Generation prompt — "bên duyệt lại"

Tiếp theo là **generation prompt**. Trong kiến trúc agent của chúng ta, prompt này sẽ sinh ra những chiếc tweet được **revision liên tục** dựa trên feedback từ reflection prompt — cho tới khi có được chiếc tweet hoàn hảo.

System message của nó đại ý:

* Bạn là **trợ lý của một tech influencer trên Twitter**, chịu trách nhiệm viết những bài đăng Twitter xuất sắc.
* Hãy tạo **tweet tốt nhất có thể** để đáp ứng yêu cầu của người dùng.
* Nếu người dùng đưa ra critique, hãy trả lời bằng **một phiên bản đã chỉnh sửa** của những lần thử trước đó.

Bạn có thể đặt tên cho prompt này tùy thích, nhưng mục tiêu của nó là **revise tweet dựa trên phản hồi nhận được**. Cuối prompt, mình cũng đặt một `MessagesPlaceholder` với key `messages` để chứa tất cả reflection và revision trước đó.

---

### 🔗 Khởi tạo LLM và ghép hai chain

Giờ là bước cuối: khởi tạo một **LM (language model)** với `ChatOpenAI` — mặc định sẽ dùng **GPT-3.5 Turbo**. Sau đó, mình dùng **LCEL (LangChain Expression Language)** để ghép prompt với model và tạo ra hai chain đơn giản:

* Chain thứ nhất: **generation chain** (trong code là `generate_chain`) — prompt generation + LM.
* Chain thứ hai: **reflection chain** (trong code là `reflect_chain`) — prompt reflection + LM.

Vậy là xong phần chain! Ở video tiếp theo, chúng ta sẽ thực sự **dựng graph** và nối các mảnh ghép này lại với nhau. Hẹn gặp lại các bạn! 🚀
