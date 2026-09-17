# 🤖 AI Agent là gì? Góc nhìn tổng quan (bài "intro của intro")

Chào các bạn, mình là Eden đây! Trong bài này, chúng ta sẽ cùng nhau trả lời một câu hỏi tưởng dễ mà không hề dễ: **AI Agent rốt cuộc là gì?**

Nếu bạn hỏi 10 người khác nhau, bạn có thể nhận về 10 câu trả lời khác nhau. Nhưng trong 10 câu trả lời đó luôn có một vài điểm chung — và đó chính là những gì mình muốn chia sẻ hôm nay, kèm theo góc nhìn cá nhân của mình.

---

### 🎯 Định nghĩa: LLM là "động cơ lý luận" của agent

Theo cách mình nhìn nhận: **agent là một hệ thống phần mềm dùng LLM như một reasoning engine (động cơ lý luận) để quyết định sẽ làm gì tiếp theo, rồi tự thực thi hành động đó.**

Khác biệt cốt lõi so với chain rất đơn giản:

* Trong **chain**, chúng ta — những lập trình viên — là người **hard-code toàn bộ luồng điều khiển**. Mình định nghĩa trước từng bước, LLM có thể chỉ được dùng ở một bước nào đó (ví dụ tóm tắt hoặc sinh văn bản), nhưng nó **không quyết định bước tiếp theo là gì**.
* Trong **agent**, chính **LLM quyết định** cần dùng tool nào, đi bước nào để giải quyết nhiệm vụ hoặc trả lời câu hỏi.

Đây chính là ranh giới lớn nhất giữa agent và chain thông thường. Điều quan trọng cần ghi nhớ: **trong agent, LLM là bên quyết định làm gì tiếp theo.**

---

### 🛠️ Linh hồn của agent nằm ở "tools"

Biểu hiện phổ biến nhất của agent ngoài đời thực là: lấy một LLM và **trang bị thêm tools (công cụ)** — ví dụ tool gọi API, tool tìm kiếm, tool đọc từ database, hay đơn giản là viết và chạy code.

Nói cách khác, chúng ta đang trao cho LLM "siêu năng lực" để làm mọi thứ. Mỗi lần nghĩ về điều này, mình vẫn thấy nó thật "ảo diệu": khi đã có một bộ óc ngôn ngữ mạnh như vậy, cộng thêm khả năng hành động, chúng ta sẽ chứng kiến rất nhiều sáng tạo, nhiều thứ phức tạp mà trước đây không thể làm, và tự động hóa được vô số công việc.

---

### 🔄 ReAct Agent: kết hợp "suy nghĩ" và "hành động"

Ở mức tổng quan nhất, **ReAct** là một kiến trúc agent tuân theo paradigm **reasoning + acting (suy luận và hành động)** — cái tên ReAct cũng ra đời từ đó. Đây là một bài báo nghiên cứu, và có thể xem nó như **viên gạch đầu tiên** cho việc hiện thực hóa agent.

Luồng hoạt động gói gọn như sau:

1. **Reasoning:** dùng sức mạnh suy luận của LLM (kết hợp **chain-of-thought prompting**) để "nghĩ" về bài toán.
2. **Acting:** LLM quyết định cần làm gì, rồi chúng ta thực thi điều đó.
3. **Tools:** các hành động được hiện thực qua tools — gọi API, gọi database, hoặc chạy một hàm Python mình viết sẵn từ trước.
4. **Lặp:** quá trình này diễn ra trong một **iterative loop (vòng lặp lặp đi lặp lại)** cho đến khi hoàn thành nhiệm vụ.

LangChain và LangGraph cung cấp sẵn các ReAct agent dựng theo kiến trúc này, để bạn tạo và tùy biến dễ dàng. Những agent này có thể gọi tools, xử lý các workflow phức tạp và **duy trì state (trạng thái) qua những tác vụ chạy dài**.

---

### 🚀 Section này chúng ta sẽ làm gì?

Thú thật, bài này mình chỉ "vung tay" ở mức khái niệm — chưa có code, chưa có demo. Đây đúng nghĩa là phần **intro của intro**.

Ở bài tiếp theo, mình sẽ cho các bạn xem demo của một **search agent**. Trong section này, chúng ta sẽ cùng hiện thực agent đó bằng LangChain, đi qua kiến trúc ReAct — kiến trúc quan trọng nhất và là nền tảng cho mọi thứ. Mục tiêu duy nhất của section: **biết cách trang bị tools cho LLM**.

Còn "ma thuật" bên dưới hoạt động ra sao, chúng ta sẽ bóc từng lớp ở section sau nữa. Hãy thắt dây an toàn, vì đây có thể là chủ đề thú vị và quan trọng nhất trong phát triển ứng dụng LLM đấy! 😉🚀
