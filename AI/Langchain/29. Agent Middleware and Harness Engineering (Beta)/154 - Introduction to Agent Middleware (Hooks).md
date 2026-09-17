# 🪝 Agent Middleware (Hooks): Chiếc chìa khóa để hiểu mọi Agent Harness

> Nguồn: `154-Introduction-to-Agent-Middleware-Hooks.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/57762497)

Chào các bạn, lại là Eden đây! Trong vài video tới, chúng ta sẽ cùng nhau bước vào một chủ đề mình rất tâm đắc: **agent middleware**. Đây là một **building block (viên gạch nền)** cực kỳ quan trọng trong **harness engineering và agent engineering** – và khi hiểu nó, các bạn sẽ có góc nhìn sâu sắc hơn hẳn về những agent harness nổi tiếng như Claude Code.

Cùng mình xem vì sao nhé!

---

### 🧱 Vì sao middleware quan trọng đến vậy?

Middleware không phải là một khái niệm "tùy chọn cho vui". Theo mình, nó là **thành phần nền tảng** trong cách chúng ta dựng khung vận hành cho agent:

* Học middleware giúp bạn hiểu **tận gốc** cách một agent harness được lắp ráp và điều khiển.
* Kiến thức này áp dụng được cho cả agent do bạn tự xây lẫn các harness có sẵn trên thị trường.
* Một khi đã nắm được middleware, bạn sẽ đọc hiểu các agent harness như **Claude Code** theo cách hoàn toàn khác – không còn là "hộp đen" nữa.

---

### 🪝 Middleware và Hooks: hai tên gọi, một ý tưởng

Điểm thú vị: cùng một khái niệm, nhưng mỗi hệ thống gọi một kiểu:

* Trong **Claude Code**, middleware được gọi là **hooks (điểm móc can thiệp)**.
* Xét cho cùng, **cả middleware lẫn hooks đều thể hiện chung một ý tưởng** – cho phép bạn chèn logic vào những thời điểm định trước trong vòng chạy của agent.

| Khái niệm | Tên gọi | Hệ sinh thái tiêu biểu |
|---|---|---|
| Chèn logic vào checkpoint định trước trong vòng chạy agent | Middleware | LangChain |
| Cùng một ý tưởng, cách gọi khác | Hooks | Claude Code |

Chính vì vậy, mình sẽ dành trọn section này để **đi sâu vào cả hai cách nhìn** này. *Đừng lo nếu thuật ngữ "middleware" nghe hơi hàn lâm – mình sẽ bắt đầu từ ví dụ web quen thuộc rồi dẫn dắt tới agent từng bước một.*

---

### 🎬 Hành trình sắp tới

Trong các bài tiếp theo của section, chúng ta sẽ lần lượt trả lời:

1. **Middleware là gì** – bắt đầu từ FastAPI, Express rồi chuyển sang agent.
2. Vì sao **agent loop** khiến middleware phải khác hoàn toàn so với web request.
3. Các **use case thực tế** – từ context engineering, reliability, cost cho tới security và governance.

Đây đều là những mảnh ghép nằm trong cùng một bức tranh: **dựng khung vận hành cho agent (harness engineering)**, và middleware chính là viên gạch đầu tiên.

Nghe tới đây, mình tin các bạn đã thấy tò mò rồi đúng không? Hãy cùng mình đi tiếp vào bài học đầu tiên – gặp lại các bạn ngay sau đây! 🚀

## Nguồn tham khảo

- [Udemy — Introduction to Agent Middleware Hooks](https://ua.udemy.com/course/langchain/learn/lecture/57762497)
- [LangChain Docs — Middleware overview](https://docs.langchain.com/oss/python/langchain/middleware/overview)
- [Claude Code Docs — Hooks reference](https://code.claude.com/docs/en/hooks)
