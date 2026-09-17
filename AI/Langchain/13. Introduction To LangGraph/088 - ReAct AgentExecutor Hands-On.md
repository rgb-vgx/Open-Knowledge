# 🛠️ Hands-On: Dựng ReAct Agent Executor bằng LangGraph — bài "hello world" của Agents

Chào các bạn, Eden đây! Trong bài này, mình sẽ giới thiệu **tổng quan dự án mà chúng ta sắp xây dựng**: một **ReAct agent executor**, nhưng lần này được implement hoàn toàn bằng **LangGraph**.

*Lý do mình chọn dự án này* rất đơn giản: nó cho thấy việc dùng **graph để mô tả agent flow** dễ dàng đến mức nào — đặc biệt là **ReAct agent**, một thuật toán vốn khá khó hiểu, nhưng khi nhìn qua lăng kính graph thì trở nên **cực kỳ dễ implement**.

### 🎯 Chúng ta sẽ xây dựng gì?

Trong suốt bài thực hành này, chúng ta sẽ:

* Implement một **agent executor** hoạt động theo **ReAct algorithm**, nhưng dựng bằng **LangGraph**.
* **Đi sâu vào graph state** và cách implement một **custom state (trạng thái tùy biến)**.
* Kết thúc bằng một **agent executor chạy được**, sẵn sàng nhận **tools (công cụ)** để sử dụng.

Về bộ công cụ, chúng ta sẽ dùng **search tool** cùng một **custom tool** do chính chúng ta viết.

Cách vận hành sẽ như sau: agent **thực thi graph có chứa một loop (vòng lặp)**, tự quyết định **có dùng tool hay không**, và cuối cùng đưa ra câu trả lời cho người dùng.

Và đây là câu hỏi "kinh điển" mà chúng ta sẽ hỏi agent:

> **"What's the weather in San Francisco? And please multiply it by three."**

*Đúng vậy, đây chính là ví dụ "hello world" của thế giới agents* — nhưng lần này chúng ta sẽ implement toàn bộ bằng **LangGraph**.

---

### 🆕 Cập nhật mới: Tái quay với Tool Node và Function Calling

Một cập nhật nhanh cho các bạn: đây là **mình của một năm sau**, với **ít tóc hơn một chút** và **vài cân nặng cộng thêm**. 😄

Điều quan trọng hơn là: **LangChain đang dần chuyển hướng về LangGraph** khi nói đến việc xây dựng và implement agents. Vì vậy, mình đã **quay lại toàn bộ section này** để tận dụng **phiên bản LangGraph mới nhất**, sử dụng một thứ gọi là **tool node** cùng kỹ thuật **function calling**.

Nhờ đó, agent của chúng ta sẽ trở nên **robust (mạnh mẽ) hơn rất nhiều** và **đáng tin cậy hơn (more trustworthy)**. Mình hy vọng các bạn sẽ thích phần này!

---

### 💡 Vì sao vẫn nên hiểu "cách cũ" của ReAct?

Có một **side note quan trọng**: trong thế giới **GenAI**, mọi thứ đều được xây **chồng lên nhau**. Việc hiểu **ReAct algorithm hoạt động ra sao cùng ReAct prompt** — tức cách làm cũ — theo mình là **cực kỳ, cực kỳ quan trọng**.

Bởi vì một khi bạn hiểu được **những điều cơ bản** và biết mọi thứ **bắt nguồn từ đâu**, thì mọi thứ còn lại **đều trở nên dễ hiểu (makes sense)**.

Thêm nữa, nếu bạn đã từng implement **ReAct executor** ở section trước, thì bây giờ mọi thứ sẽ **dễ hơn rất nhiều**: bạn đã nắm rõ các khái niệm, các ý tưởng và cách mọi thứ tiến hóa — điều đó mang lại cho bạn một **hiểu biết sâu sắc hơn về agents**.

Thế là đủ cho phần giới thiệu! Hãy chuẩn bị tinh thần bước vào code — chúng ta sẽ cùng nhau dựng nên ReAct agent đầu tiên bằng LangGraph ở bài tiếp theo. Gặp lại các bạn ngay sau đây nhé! 🚀
