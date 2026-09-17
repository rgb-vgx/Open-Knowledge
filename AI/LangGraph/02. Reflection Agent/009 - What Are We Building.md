# 🪞 Reflection Agent: Dự án đầu tiên giúp AI tự "soi gương" và viết lại Tweet của bạn

Chào các bạn, Eden đây! Chúng ta đã đi qua phần giới thiệu khóa học, và giờ là lúc bước vào **Section đầu tiên: Reflection Agent**. Trong bài này, mình sẽ kể cho các bạn nghe chúng ta sẽ xây dựng điều gì, và vì sao đây là dự án hoàn hảo để khởi động hành trình LangGraph.

### 🪞 Reflection Agent — "tấm gương" giúp AI tự hoàn thiện

Reflection agent (agent tự phản chiếu) là một công cụ đầy sức mạnh, được dùng để **nâng cao chất lượng và tỷ lệ thành công của các hệ thống AI**.

* Thay vì trả lời một lần rồi dừng lại, nó **thúc đẩy LLM nhìn lại những hành động trong quá khứ**.
* Nhờ đó, hệ thống có thể **học hỏi và cải thiện dần theo thời gian**.
* Đây là một trong những mô hình agentic nền tảng và trực quan nhất, rất phù hợp để các bạn làm quen với tư duy xây dựng vòng lặp trong LangGraph.

Nói cách khác: thay vì "một phát ăn ngay", chúng ta dạy cho AI biết **tự phê bình chính mình** rồi làm lại tốt hơn.

---

### 🐦 Dự án: Viết lại một bài đăng Twitter

Cụ thể, reflection agent của chúng ta sẽ giúp **chỉnh sửa các bài đăng Twitter**. Mình sẽ lấy ví dụ là chính chiếc tweet mình từng viết cách đây ít lâu về **LangChain**, và để agent giúp chúng ta lặp đi lặp lại cho tới khi bài đăng trở nên "mượt" hơn.

**Quy trình sẽ diễn ra như sau:**

1. Agent nhận **tweet gốc**.
2. Bước **reflection (tự phản chiếu)** đưa ra **critique (lời phê bình)** — nó phản hồi và chỉ trích bài đăng của chúng ta.
3. Lấy phản hồi đó **feed ngược trở lại LLM** rồi yêu cầu viết lại — ta có **revision number one**.
4. Tiếp tục lặp quy trình này hết lần này đến lần khác, cho tới khi ta có một bài đăng tử tế — và biết đâu đấy, đủ sức **lan truyền (viral)**.

Các bạn để ý: vai trò của **reflector (bên phản chiếu)** ở đây là một **người phản biện khó tính**, còn LLM sẽ đóng vai người viết và sửa bài.

---

### ⚡ Nghe "ghê gớm" nhưng chỉ dưới 100 dòng code

Có lẽ các bạn sẽ bất ngờ: dự án này tốn **chưa tới 100 dòng code**, bởi **LangGraph sẽ đảm nhiệm phần lớn công việc nặng nhọc** cho chúng ta. Việc của chúng ta chỉ là mô tả đúng luồng chạy, còn framework sẽ lo phần còn lại.

*Đừng lo nếu những khái niệm như graph, node hay reflection còn mơ hồ — mình sẽ giải thích từng bước ngay trong các video tiếp theo, các bạn nhé.*

Vậy là các bạn đã biết chúng ta sắp xây gì rồi đấy! Ở bài tiếp theo, chúng ta sẽ cùng nhau **setup project** với Poetry, PyCharm và các biến môi trường. Hẹn gặp lại các bạn! 🚀
