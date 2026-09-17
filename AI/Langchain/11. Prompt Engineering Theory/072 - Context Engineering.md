# 🧠 Context Engineering: Bước tiến hóa của Prompt Engineering (và vì sao agent cần nó)

Hey các bạn, Eden đây! Chắc hẳn nhiều bạn đã từng làm việc với **AI agent** — có thể là các **coding agent** như Cursor hay Claude Code, hoặc tự phát triển agent cho công ty/cho chính mình.

Nhưng có một sự thật mà mình muốn chúng ta cùng nhìn thẳng: tất cả rốt cuộc cũng quy về **một prompt được gửi đến LLM và rất nhiều công sức engineering xung quanh nó**.

Hôm nay, mình sẽ giới thiệu tầng tư duy sâu hơn đó: **Context Engineering (kỹ thuật kiến tạo ngữ cảnh)**.

---

### 📦 Prompt tĩnh, context động — vì sao cần Context Engineering?

Nếu bạn nghĩ Cursor hay Claude Code chỉ là những **"wrapper" (lớp bọc) quanh LLM** thì điều đó đúng một phần.

Nhưng để xây dựng những wrapper thật sự tốt đòi hỏi **kiến thức sâu và công sức engineering khổng lồ** — bởi vì các lời gọi LLM ấy luôn đi kèm **context (ngữ cảnh)**.

Context đến từ rất nhiều nguồn:

* Từ **nhà phát triển (developer)** của ứng dụng.
* Từ **người dùng (user)**.
* Từ **tương tác trước đó** của người dùng.
* Từ **tool calls (lời gọi công cụ)** và nhiều **dữ liệu bên ngoài** khác.

Số lượng nguồn context đang **tăng lên mỗi ngày**. Và việc gửi đi đúng ngữ cảnh liên quan đến LLM không còn đơn giản như chúng ta từng nghĩ trong thời kỳ đầu.

Hồi đó, chúng ta nghĩ: "À, có prompt engineering rồi, viết vài prompt xịn là giải quyết hết mọi vấn đề."

Nhưng vấn đề nằm ở chỗ: **prompt là tĩnh (static)**, trong khi các mảnh context lại **cực kỳ động (dynamic)**. Vì context động, để xây dựng nội dung đúng, chúng ta cần **một hệ thống động** — không chỉ là một prompt tĩnh đơn thuần.

Đây chính là lý do chúng ta bước vào lãnh địa **Context Engineering**: **sự tiến hóa tự nhiên (natural evolution) của Prompt Engineering**, nhưng là một khái niệm sâu sắc hơn nhiều.

Chúng ta đều biết câu nói **"garbage in, garbage out" (rác vào thì rác ra)**. Đây là lý do phổ biến khiến các **agentic system** không hoạt động đúng như kỳ vọng: chúng đơn giản là **không được cung cấp đúng context**.

**LLM không thể đọc suy nghĩ của chúng ta** — chúng ta thực sự cần đưa cho nó thông tin đúng.

Và lưu ý: **không phải lúc nào cũng chỉ là thông tin và dữ liệu**. Đôi khi chúng ta cần đưa cho model **những công cụ (tools) phù hợp** để nó có thể tự đi lấy thông tin, thực hiện hành động và hoàn thành tác vụ.

---

### ⚙️ Bài toán context window khi agent chạy dài hơi

Các LLM đang ngày càng giỏi hơn — điều này không mới. Chúng suy luận rất tốt, và với **tool calling (gọi công cụ)**, chúng ta có thể xây dựng các AI agent có chức năng rất thú vị: chạy tool, gọi tool, nhận output của tool, rồi **lặp trong một vòng tròn (loop) cho đến khi hoàn thành tác vụ**.

Tuy nhiên, với **tác vụ chạy dài và phức tạp**, chúng ta thường **tích lũy phản hồi từ các tool call**. Điều này nghĩa là **context window cứ lớn dần**, rất nhiều **token bị lấp đầy** bởi kết quả tool call.

Hệ quả:

1. Có thể **vượt quá kích thước context window**.
2. **Tăng chi phí (cost)** và **độ trễ (latency)**.
3. Cuối cùng, nếu không xử lý, **hiệu suất agent bị suy giảm (degrade)**.

---

### ☠️ Ba kiểu "hư hại context" bạn cần đề phòng

Sự suy giảm hiệu suất có nhiều nguyên nhân, và mình muốn bạn nhớ ba trường hợp chính:

1. **Context poisoning (nhiễm độc ngữ cảnh):** xảy ra khi một tool call hoặc một lời gọi đưa vào context một **ảo giác (hallucination)**, và nó bắt đầu làm hỏng hệ thống.
2. **Context confusion (nhầm lẫn ngữ cảnh):** xảy ra khi ta đưa vào những **ngữ cảnh không cần thiết** cho tác vụ, khiến chúng ảnh hưởng đến câu trả lời.
3. **Context clash (xung đột ngữ cảnh):** xảy ra khi **các phần của context mâu thuẫn nhau**.

---

### 🔮 Tóm lại và điều gì chờ đón ở bài sau

Gói gọn trong vài câu: **Context Engineering — hiểu một cách đơn giản — là cách đưa cho LLM đúng ngữ cảnh.** Chúng ta đã bàn xem khái niệm này tiến hóa từ prompt engineering như thế nào, và **vì sao nó đặc biệt quan trọng với agent**.

Trong bài tiếp theo, mình sẽ trình bày **các kỹ thuật** giúp mang lại cho LLM ngữ cảnh tốt hơn. Điểm thú vị là:

* Một số kỹ thuật nằm ở **phía nhà phát triển ứng dụng** — ví dụ đội ngũ làm Claude Code sẽ triển khai các giải pháp đó.
* Một số kỹ thuật nằm ở **phía người dùng** — chúng ta, với tư cách người dùng Claude Code, có **rất nhiều ảnh hưởng** đến câu trả lời nhận được và ngữ cảnh được cung cấp cho LLM.

Điều này cũng có nghĩa: **ngay cả người không phải lập trình viên cũng cần biết Context Engineering** nếu muốn nhận câu trả lời tốt hơn từ các AI system và AI agent của mình.

Một ví dụ tuyệt vời cho các kỹ thuật này — cả từ phía developer lẫn phía user — chính là các coding agent như **Claude Code**.

Hẹn gặp lại các bạn ở bài tiếp theo, nơi mình sẽ hướng dẫn cách **engineering context tốt hơn**! 🚀
