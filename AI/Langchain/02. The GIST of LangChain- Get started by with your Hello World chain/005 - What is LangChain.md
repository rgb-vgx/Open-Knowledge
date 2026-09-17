# 🧭 LangChain là gì? Giải mã framework "xương sống" của ứng dụng LLM trong 6 phút

Chào mọi người, mình là Eden đây! 👋 Trước khi lao vào những dòng code đầu tiên, mình muốn dành vài phút để trả lời một câu hỏi mà rất nhiều bạn tò mò: **LangChain thực chất là gì, và vì sao nó lại quan trọng đến vậy?**

Hãy cùng mình gói gọn câu chuyện đó trong đúng 6 phút nhé.

---

### 🔍 LangChain — "chất keo" kết nối mọi thứ

**LangChain là một framework mã nguồn mở (open-source) giúp đơn giản hóa quá trình xây dựng các ứng dụng được trợ lực bởi LLM (LLM-powered applications).** Nó cung cấp cho chúng ta một bộ **công cụ (tools)** và **lớp trừu tượng (abstractions)**, nhờ đó việc tạo ra những ứng dụng LLM phức tạp trở nên dễ dàng hơn rất nhiều.

Framework này được ngành công nghiệp đón nhận cực kỳ rộng rãi, chủ yếu bởi các lập trình viên muốn xây dựng ứng dụng trên nền LLM mà **không cần hiểu sâu về Machine Learning** hay cách huấn luyện model — họ chỉ cần dùng model như một **"hộp đen" (black box)**.

Hiện tại, LangChain là một trong những framework phổ biến nhất — nếu không muốn nói là phổ biến nhất — khi phát triển các ứng dụng LLM như **agents** và **RAG** (hai chủ đề chúng ta sẽ mổ xẻ cực kỳ chi tiết trong khóa học). Vì là open-source nên:

* Toàn bộ code nằm trên **GitHub**, bạn có thể tạo **pull request** và tận mắt xem LangChain đang làm gì cho mình "bên dưới lớp vỏ" (under the hood).
* Cộng đồng các nhà đóng góp và sáng tạo vô cùng sôi động, liên tục xây dựng những thứ tuyệt vời với LangChain.

---

### 🧩 Vì sao chúng ta cần LangChain?

Hãy tưởng tượng bạn muốn xây một ứng dụng trên nền một LLM mạnh mẽ như **Claude Sonnet**, và bạn muốn:

* Kết hợp LLM với **dữ liệu cá nhân** mà nó chưa từng được huấn luyện: file PDF, email, hay database **Notion** của bạn.
* Xây dựng prompt **một cách linh động** theo input của người dùng.
* **Lưu lịch sử** tin nhắn giữa người dùng và AI.
* **Đổi LLM** sang Mistral khi bạn muốn.
* Kết nối LLM với **tool** như Google Search, hoặc gọi API theo yêu cầu người dùng.

Nghe thì thú vị, nhưng để tự làm tất cả, bạn sẽ phải khâu nối và đồng bộ rất nhiều "mảnh ghép" chuyển động cùng lúc. *May thay, LangChain sẽ gánh phần việc nặng nhọc đó*, và nghề xây dựng ứng dụng LLM trở nên nhẹ nhàng hơn hẳn.

---

### 🧰 Những module cốt lõi làm nên sức mạnh của LangChain

LangChain chia các chức năng then chốt thành nhiều module. Đây là những cái tên bạn sẽ gặp xuyên suốt khóa học:

* **Chat models:** trừu tượng hóa việc tương tác với LLM. Bạn có thể **đổi model như đổi tất** — chỉ cần import đúng model muốn dùng. Điểm hay nhất là mọi nhà cung cấp LLM đều dùng **chung một interface**, giúp bạn tự do chuyển đổi vendor bất cứ lúc nào và **không bị "trói chân"** vào một LLM duy nhất.
* **Prompts:** quản lý prompt, tối ưu hóa và **serialization**. Bạn tạo một **template** cho prompt rồi bơm input của người dùng vào một cách linh động để tạo ra prompt cuối cùng gửi tới LLM — mang lại **khả năng lắp ghép (composability)** và độ linh hoạt cao.
* **Document loaders:** nạp dữ liệu từ đủ loại nguồn — Notion, PDF, email và **hàng nghìn nguồn dữ liệu khác**. Sau khi nạp, mọi thứ trở về **một interface chung là LangChain document**, khiến việc xử lý dữ liệu trước khi đưa vào LLM trở nên cực kỳ đơn giản.
* **Hệ sinh thái agent:** tận dụng **khả năng suy luận (reasoning)** của LLM và trang bị cho nó những tool có thể gọi như **tìm kiếm trên internet, truy vấn database, gửi email** — nói cách khác là trao "siêu năng lực" cho LLM. Tất cả đều triển khai được qua các abstraction như **tools**, **agent executor** và các implementation với **LangGraph**.

---

### 🚀 Hành trình phía trước

Các bạn đừng sợ những đoạn code trong video! Mình hứa rằng chỉ sau vài section đầu tiên, bạn sẽ đủ tự tin tạo ra những ứng dụng agentic của riêng mình. Những gì mình vừa kể mới chỉ là **phần nổi của tảng băng chìm** so với những gì LangChain cung cấp.

Trong khóa học, chúng ta sẽ:

1. Đào sâu nhiều tính năng hơn nữa, **kể cả phần implementation bên trong**.
2. Đi qua toàn bộ hệ sinh thái LangChain.
3. Bàn cách đưa ứng dụng LLM lên **production**, bao gồm **tracing (theo dõi luồng chạy)** và **monitoring (giám sát)** qua **LangSmith** — công cụ cực kỳ tiện lợi để debug và trace ứng dụng LLM.
4. Cùng xây một **ứng dụng AI thực tế**, qua đó làm quen với mọi khái niệm và thuật ngữ cần biết về LangChain.

Và ở cuối hành trình, bạn sẽ có thể tự xây dựng những ứng dụng mới cho chính mình. Hãy thắt dây an toàn và hẹn gặp lại ở bài tiếp theo nhé! 🚀

