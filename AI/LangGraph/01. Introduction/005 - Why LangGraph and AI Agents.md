# 🤖 Vì sao LangGraph ra đời? Hành trình đi tìm sự cân bằng giữa tự do và đáng tin cậy

Chào các bạn, mình là Eden đây! Bài này sẽ hơi **lý thuyết và triết lý một chút**, nhưng mình tin nó là một trong những bài quan trọng nhất của khóa học: chúng ta sẽ cùng lý giải **động lực thực sự khiến framework LangGraph được tạo ra**. Trước khi bắt đầu, mình muốn gửi lời cảm ơn đến nhóm đã cung cấp slide và hình minh họa để mình sử dụng trong bài giảng này. 🙏

### 🎚️ Phổ tự chủ: hai thái cực của hệ thống AI

Nếu nhìn các hệ thống AI theo **mức độ tự chủ (levels of autonomy)**, chúng ta sẽ thấy một phổ với hai đầu mút. **Một đầu mút là code deterministic (mã xác định):** chúng ta tự viết code, **không tích hợp LLM**. Ta biết chính xác đầu vào, đầu ra ở mỗi bước, và sẽ đi qua những bước nào — kiểm soát toàn bộ hệ thống.

* Ưu điểm: cực kỳ **resilient (kiên cường) và reliable (đáng tin cậy)** vì ta làm chủ toàn bộ quá trình vận hành.
* Nhược điểm: **hoàn toàn không linh hoạt**, vì mọi thứ đều bị hard-code.

**Đầu mút còn lại là autonomous agent (agent tự chủ):** chúng có thể làm mọi thứ — tự nghĩ ra nhiệm vụ, viết code, chạy code, sắp xếp lại nhiệm vụ rồi viết code khác. Chúng rất năng động, có thể đưa một nhiệm vụ từ đầu đến cuối và cực kỳ linh hoạt. Chúng được cho là có thể nhận prompt kiểu *"hãy biến tôi thành YouTuber số một"* và thực sự làm được.

Nhưng trong thực tế, **những hệ thống như vậy không thực sự tồn tại**. Các dự án như **AutoGPT, GPT Engineer, BabyAGI** đã cố gắng hiện thực ý tưởng này. Chúng rất quan trọng với ngành — thúc đẩy đổi mới và mở rộng ranh giới — nhưng **không hướng tới production**:

* Chúng **quá linh hoạt** và ta **không kiểm soát được** vì phụ thuộc quá nhiều vào LLM; khi đó LLM có xu hướng lan man và không trả về đúng thứ ta cần.
* Lý do gốc: ở mức cơ bản nhất, **LLM là những "sinh vật thống kê" — đoán từng token một**.

Tóm lại: autonomous agent **linh hoạt nhưng không đáng tin cậy**.

---

### 🧩 Tiến hóa từng bước: LLM call → chaining → LLM router

Ở giữa hai đầu mút đó, chúng ta có nhiều mức độ trung gian:

1. **Tích hợp một LLM vào code deterministic.** Ta vẫn tự viết code và kiểm soát luồng chạy, biết chính xác điều gì sẽ được thực thi. Bên trong luồng này, LLM có thể được dùng để tóm tắt, trích xuất thông tin, trích xuất thực thể... Nhưng LLM chỉ kiểm soát **một đầu ra duy nhất** trong toàn bộ luồng. Đổi lại, ta có thêm rất nhiều linh hoạt vì khả năng sinh của LLM rất sáng tạo, trong khi phần lớn quyền kiểm soát vẫn nằm ở phía lập trình viên.
2. **Chaining (chuỗi hóa).** Lấy đầu ra của LLM này làm đầu vào cho LLM khác — xếp lớp lời gọi này trên lời gọi kia. Ví dụ điển hình là luồng **RAG (Retrieval-Augmented Generation)**: đưa câu hỏi gốc cho LLM đầu tiên; dùng **embeddings** để truy xuất các tài liệu tương tự, có khả năng giúp trả lời câu hỏi; lấy prompt gốc, **tăng cường (augment)** nó, rồi gửi tất cả cho LLM để sinh câu trả lời. Trong một chain, các LLM quyết định đầu ra ở **nhiều bước** chứ không chỉ một. Càng tiến gần đầu mút autonomous agent, ta càng tận dụng LLM để xây dựng hệ thống phức tạp.
3. **LLM router.** Một loại chain dùng **năng lực suy luận (reasoning)** của LLM để quyết định sẽ đi đâu: chạy nhánh code số 1 hay nhánh số 2, tìm trong database hay tìm trên web. Đây là **lần đầu tiên LLM quyết định các bước cần làm**, mở ra nhiều linh hoạt hơn nữa.

Một chi tiết rất quan trọng: trên sơ đồ có một **đường nét đứt**, và **phía dưới đường nét đứt chính là thứ được coi là agent hay agentic application**. Trong khi đó, **mọi thứ phía trên đường đó đều đã được LangChain hiện thực rất tốt**. Mình là fan cứng của LangChain và tin rằng chỉ với những building block đó, ta đã có thể xây dựng hệ thống rất nâng cao.

Và đây là "spoiler" của mình: **khoảng trống giữa LLM router và autonomous agent — chính là nơi LangGraph tọa lạc.**

---

### 🧠 Vậy thế nào là một agent? (Và nó khác chain ở đâu?)

Đã có rất nhiều tranh luận về định nghĩa chính thức của agent cũng như agentic application. Nếu bạn đi hỏi ba người, bạn sẽ nhận được ba câu trả lời khác nhau — và hỏi lại họ một ngày sau, bạn sẽ nhận thêm ba câu trả lời khác nữa.

Theo mình, hiện nay định nghĩa về agent rất "mềm" và chưa có câu trả lời dứt khoát. Mình khá thích những gì **Andrew Ng (DeepLearning.AI)** và **Harrison Chase (LangChain)** viết về chủ đề này — họ có chung một sự đồng thuận về những thành phần cốt lõi của agent.

Nếu đơn giản hóa đến tận gốc, **một agent về bản chất là một control flow (luồng điều khiển) mà LLM quyết định sẽ đi hướng nào.** Ví dụ cơ bản: LLM quyết định đi bước 1 hay bước 2 — ta đang dùng năng lực suy luận của LLM để chọn hướng đi trong luồng.

**Vậy agent khác chain (và router chain) ở đâu?** Khác biệt chính là: **chain chỉ có một chiều** — chúng ta đi từ trái sang phải. Còn **agent có cycles (chu trình)** — và chính các cycles này mang lại **thuộc tính agentic (agentic properties)** cho ứng dụng.

Ngày nay, agent dùng **function calling (gọi hàm)** để quyết định các bước. Ngoài câu hỏi gửi cho LLM, ta gửi kèm **mô tả của các tool (công cụ)** — những hàm ta có thể thực thi trong backend và điều phối. Ta gửi cho LLM mô tả hàm, tham số, tên, chức năng và giá trị trả về. Với **tool decorator**, việc này rất dễ dàng: nếu thấy phù hợp, LLM sẽ bảo ta cần gọi hàm nào với tham số nào; ta gọi hàm và nhận lại câu trả lời mong muốn.

**Thiết kế agent cơ bản nhất** được giới thiệu lần đầu trong **bài báo ReAct**, và mình cho rằng nó đã thay đổi cả ngành:

1. Bắt đầu.
2. Dùng LLM quyết định xem có cần dùng tool không (ví dụ gọi API hoặc truy vấn database).
3. Gọi tool với tham số mà LLM đã chọn, rồi nhận kết quả.
4. Đưa toàn bộ kết quả trở lại cho LLM để nó quyết định dùng thêm tool hay trả câu trả lời cho người dùng.

Mình sẽ không đào quá sâu vào thuật toán ở đây — mình có hiện thực nó từ con số không trong khóa LangChain và trong khóa LangGraph, để hiểu nó đến từ đâu và "phép thuật" đằng sau nó thực chất là gì.

**Vấn đề của ReAct agent: quá linh hoạt.** LangChain hiện thực nó rất đẹp và các agent bắt đầu nở rộ. LLM có thể gọi tool 1, tool 2, tool 1 rồi tool 2... mọi hoán vị đều được phép. Nhưng vì **mọi hoán vị đều được phép**, nên hoán vị "agent lặp vô hạn" cũng được phép:

* Agent rơi vào **vòng lặp vô tận**, gọi mãi cùng một tool và bị kẹt.
* Nguyên nhân có thể do: định nghĩa tool chưa đúng, LLM mắc lỗi phi xác định (non-deterministic), LLM chưa đủ mạnh để chọn đúng tool, đưa sai tham số, hoặc **ảo giác (hallucinate)** ra một tool không tồn tại.

Bài học rút ra: agent kiểu AutoGPT hay ReAct **linh hoạt nhưng không đáng tin cậy**. Ta cần thứ gì đó **vẫn linh hoạt, nhưng đáng tin cậy hơn hẳn** để đưa vào production, cho người dùng tương tác và nhận kết quả tốt ngoài phạm vi một bản demo.

---

### 🗺️ LangGraph: giảm một chiều tự do, tăng một bậc đáng tin cậy

Đây chính xác là lý do LangGraph được tạo ra, và nó tọa lạc ngay khoảng trống giữa autonomous agent và router. **Ý tưởng cốt lõi: không trao toàn bộ tự do cho LLM.** Thay vào đó, ta **thu hẹp phạm vi (scope)** và **giảm bớt một chiều tự do**, để LLM vẫn có không gian tự do — nhưng không phải tự do tuyệt đối:

* Ta biểu diễn phần mềm (agentic software) của mình dưới dạng **graph với nodes (nút) và edges (cạnh)**.
* Ta biểu diễn nó như một **state machine (máy trạng thái) có thể chứa cycles** — điều mang lại thuộc tính agentic, khiến hệ thống trông như thể agent biết suy luận và biết nghĩ về việc cần làm.
* **LLM đóng vai trò then chốt**: nó quyết định cần đi đâu trong luồng.
* **Nhưng chính chúng ta — lập trình viên — là người định nghĩa luồng đó.**

Bằng cách giảm một chiều tự do của LLM, ta **thu về rất nhiều độ tin cậy** và có thể kiến trúc hệ thống **kiên cường và đáng tin cậy hơn hẳn**, tất cả là nhờ ta kiểm soát toàn bộ luồng.

**Vậy tại sao không dùng Airflow, NetworkX hay một graph framework khác?** Vì LangGraph **rất "opinionated" (định hướng chuyên biệt) cho các ứng dụng agentic** — nó được xây dựng để giải đúng bài toán này. Nó cung cấp sẵn một bộ building block:

* **Controllability (khả năng kiểm soát)** và **chạy các node song song (running nodes in parallel)**.
* **Conditional branching (phân nhánh có điều kiện)** với LLM.
* **Persistence (lưu trữ bền vững) tích hợp sẵn** — lưu trạng thái hiện tại của graph, cái gì đang được thực thi, cái gì đã thực thi.
* Nhờ đó, hiện thực **human-in-the-loop (con người can thiệp giữa vòng chạy)** rất dễ: tích hợp phản hồi của con người để "hiệu chỉnh" quá trình agent thực thi.
* **Time traveling (du hành thời gian)** — phát lại những phần đã chạy sai; cùng **debugging và tooling cho tracing**, vì tích hợp sẵn **LangSmith** ngay từ đầu.

Một điểm thú vị: **bên trong LangGraph, bạn có thể viết bất kỳ code nào bạn muốn** — không nhất thiết phải là code LangChain. Và một trong những động lực để kiến trúc phần mềm dưới dạng graph: **hầu hết các bài báo về agentic application đều minh họa bằng graph**, nên việc mô tả giải pháp dưới dạng graph rất tự nhiên — dễ đọc, dễ bảo trì, dễ test và dễ monitor.

Tóm lại: chúng ta kiểm soát luồng và viết ra luồng; ta tích hợp LLM để quyết định đi đâu và thực thi gì. Vì đây là một **state machine**, ta cần có **state (trạng thái)** — thứ được **chia sẻ giữa các node và các edge**, lưu mọi kết quả trung gian và cung cấp thông tin hữu ích cho LLM để quyết định hướng đi.

Đó là bức tranh toàn cảnh về động lực tạo ra LangGraph! *Nếu bài này có hơi nặng lý thuyết, các bạn cứ yên tâm — mọi khái niệm sẽ sáng tỏ khi chúng ta bắt tay vào thực hành.* Hẹn gặp lại các bạn ở bài tiếp theo! 🚀
