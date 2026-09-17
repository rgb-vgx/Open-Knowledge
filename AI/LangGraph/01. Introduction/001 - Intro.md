# 🚀 Chào mừng đến với LangGraph: Xây dựng AI Agent tùy biến bằng flow engineering

Xin chào các bạn, mình là Eden đây! 👋

Trong khóa học này, mình sẽ cùng các bạn đi từ đầu đến cuối (the ins and outs) về **LangGraph** — gói (package) mới nằm trong hệ sinh thái LangChain, cho phép chúng ta xây dựng những **AI agent cực kỳ tinh vi và tùy biến cao**. Mình tin rằng trong tương lai gần, chúng ta sẽ chứng kiến rất nhiều agent xuất hiện trong ngành công nghiệp này.

Và tin vui là: với agent, chúng ta có thể đạt được rất nhiều thứ phức tạp.

Hãy cùng mình xem vì sao LangGraph lại là mảnh ghép đáng học ở thời điểm hiện tại nhé!

### 🧭 LangGraph là gì và vì sao các bạn nên học nó?

LangGraph cho phép chúng ta làm được rất nhiều thứ phức tạp với agent. Về bản chất, nó hiện thực hóa ý tưởng **flow engineering (kỹ thuật thiết kế luồng)** — cho phép lập trình viên chúng ta **định nghĩa phạm vi (scope)** mà LLM sẽ được sử dụng trong suốt quá trình agent chạy.

Nghe có vẻ khá trừu tượng, nhưng đừng lo, chúng ta sẽ đi sâu vào nó trong khóa học. Điểm mấu chốt là: với LangGraph, các bạn có thể xây dựng những agent được tùy biến ở mức cao nhất.

---

### 🔄 Đã có LangChain rồi, tại sao lại cần LangGraph?

Chắc hẳn các bạn đang tự hỏi: chúng ta đã có thể dùng LangChain để xây dựng agent rồi mà? Đúng vậy — mình thậm chí còn hướng dẫn xây dựng **ReAct agent** trong các khóa học khác của mình.

Tuy nhiên, **mọi thứ có thể xây bằng LangChain đều có thể xây bằng LangGraph — dễ dàng hơn nhiều và mô tả hành vi của agent rõ ràng hơn nhiều.**

* Với LangChain, mọi thứ khá trừu tượng và ẩn đi nhiều chi tiết bên trong.
* Với LangGraph, chúng ta được **linh hoạt hơn rất nhiều**, đồng thời có thời gian dễ thở hơn khi hiện thực và mô tả agent.

Các bạn có thể hình dung chúng ta sẽ **tận dụng graph (đồ thị) với nodes (nút) và edges (cạnh)**. Bằng cách mô tả luồng chạy của agent trong một graph, việc hiện thực những logic nâng cao trở nên vô cùng đơn giản.

---

### ⚠️ Vài lưu ý trước khi bắt đầu

Trước khi vào bài, mình có vài điều cần nói thẳng thắn:

1. **Đây không phải khóa học cho người mới bắt đầu.** Mình kỳ vọng các bạn đã có hiểu biết vững chắc về **Python** và về **LangChain**. Nếu các bạn đã học khóa LangChain trước đó của mình thì quá tốt. Xin lỗi vì mình sẽ không giảng lại kiến thức nền — bù lại, chúng ta có thể đi nhanh, đào sâu và làm được rất nhiều thứ thú vị với LangGraph.
2. **Discord server của khóa học.** Giống các khóa học khác của mình, khóa này cũng có một máy chủ Discord để chúng ta trao đổi và bàn luận về các chủ đề nâng cao. Các bạn có thể dùng nó để đặt câu hỏi, và ở đó có một cộng đồng cực kỳ vững mạnh.

*Đừng lo nếu bạn thấy thiếu tự tin một chút — mình sẽ đồng hành để bù đắp phần nền tảng cần thiết.*

Vậy là đủ cho phần giới thiệu rồi! Hãy sẵn sàng và cùng mình xây dựng những thứ tuyệt vời với graph trong các bài tiếp theo nhé! 🚀
