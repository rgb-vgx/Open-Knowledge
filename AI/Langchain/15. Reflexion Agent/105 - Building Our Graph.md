# 🧱 Building Our Graph: Lắp ráp Reflexion Agent hoàn chỉnh với LangGraph 1.x

Chào các bạn, mình là Eden đây! Hôm nay là ngày hội lớn: chúng ta sẽ **lắp ráp tất cả các mảnh ghép** thành một graph LangGraph hoàn chỉnh cho Reflexion Agent. Trước khi bắt đầu, một lưu ý quan trọng: video này được **quay lại** để khớp với phiên bản mới nhất của LangGraph — cụ thể là **1.0.5** và được cập nhật theo chuẩn **LangGraph 1.+**. Các bạn yên tâm là mọi thứ đều được điều chỉnh cho phù hợp!

### 🧩 Imports & MessageState có sẵn

Mình mở file `main.py` và bắt đầu với imports:

* **`Literal`** từ `typing`.
* **`AIMessage` và `ToolMessage`**.
* Từ LangGraph: **`END`**, **`START`** và **`StateGraph`**.
* **`MessageState`** từ `langgraph.prebuilt` — StateGraph của chúng ta sẽ chỉ giữ **một danh sách message**, đúng như state mà chúng ta từng tự tay viết ở section reflection agent trước. Nếu bạn còn nhớ, hồi đó ta phải tự implement từ đầu; còn giờ đây, LangGraph cung cấp sẵn **`MessageState` trong prebuilt** để dùng trực tiếp.
* Từ `chains.py`: **`reviser_chain`** và **`first_responder_chain`**.
* Từ `tool_executor.py`: **`execute_tools`** — chính là `ToolNode` sẽ chạy search tool của chúng ta, chạy song song nữa.
* Và một hằng số quan trọng: **`MAX_ITERATIONS = 2`** — chúng ta chỉ muốn **tối đa hai vòng lặp** "draft → revision → draft → revision".

*Về sau, nếu muốn dùng kiến trúc kiểu LLM-as-a-judge, chúng ta không cần giới hạn bằng con số nữa, mà sẽ để LLM quyết định có nên tiếp tục hay không — và đó chính là những gì chúng ta sẽ xây ở section tiếp theo của khóa học!*

---

### 🎯 Hai node: draft và revise

Bắt đầu với node đầu tiên — **draft node**:

* Nhận vào **state** (chỉ chứa danh sách message).
* Gọi `first_responder_chain`, cắm `state` vào key `messages`.
* Khi mới khởi động graph, message đầu tiên chính là **human message với input người dùng**.
* Phản hồi nhận về là một object **`AnswerQuestion`** — gồm `answer`, `reflection` (điều gì cần thay đổi, điều gì còn thiếu, điều gì là thừa), và các **`search_queries`** để chạy tìm kiếm sau này.
* Cuối cùng, mình **append phản hồi này vào key `messages`** trong state.

Node thứ hai — **revised node**:

* Nhiệm vụ: **revise câu trả lời dựa trên kết quả công cụ và critique Pydantic**.
* Nó gọi `reviser_chain` với toàn bộ message hiện có — ở lần lặp đầu tiên, đó là kết quả từ draft.
* Sau khi nhận phản hồi, mình cũng **append vào state** của graph.

---

### 🔀 Event loop: đếm tool call để quyết định dừng

Đây là phần "não bộ" của graph. Trước tiên, hãy nhớ lại: chúng ta giới hạn số vòng lặp bằng một **con số "magic" là 2**. *Đây là một heuristic (cách xử lý theo kinh nghiệm) — và thú thật, nó không phải cách làm tốt nhất. Các bạn hoàn toàn có thể nâng cấp bằng cách thêm một LLM làm trọng tài, nhưng trong ví dụ này chúng ta cứ giới hạn ở 2.*

Vậy làm sao để đếm? Vì chúng ta dùng **function calling** để tạo structured output, mỗi phản hồi của LLM sẽ đi kèm một **tool call**. Cụ thể:

* Khi gọi responder → **1 tool call**.
* Khi chạy tool node → **không** tạo tool call nào (không có LLM nào gọi tool ở đây cả).
* Khi chạy reviser chain → **thêm một tool call** nữa.

Điều kiện kết thúc graph: nếu số tool call **lớn hơn 2** thì dừng. Vòng đầu có 1, 2 tool call; khi bước sang vòng hai, ta sẽ có 3 rồi 4 tool call — vượt ngưỡng và kết thúc.

Mình implement logic này trong conditional edge tên **`event_loop`**:

1. Nhận **state** (danh sách message) làm đầu vào.
2. Duyệt qua toàn bộ message, **đếm các tool call**.
3. Nếu số đếm **lớn hơn `MAX_ITERATIONS`** (2) → trả về **`END`** để kết thúc.
4. Nếu chưa → trả về **`"execute_tools"`** để tiếp tục vòng lặp.

Nhờ vậy, kiến trúc này chắc chắn chỉ chạy vòng lặp **đúng 2 lần**.

---

### 🗺️ Lắp graph, vẽ Mermaid và chạy thử

Giờ là lúc ráp mọi thứ lại:

1. Tạo **`StateGraph`** với state là **`MessageState`** (danh sách message).
2. Thêm ba node: **draft node**, **execute_tools node**, và **revised node**.
3. Nối các edge: **START → draft**, **draft → execute tools**, **execute tools → revise**.
4. Từ revised node, thêm **conditional edge** với logic **`event_loop`**, kèm argument thứ ba là danh sách các node có thể đi tới: **`execute tools`** và **`END`** — những giá trị này phải **khớp chính xác** với các giá trị chúng ta return trong `Literal`. Việc khai báo danh sách này giúp ích khi **trực quan hóa graph**.

Sau khi **compile graph**, mình in nó ra bằng **`draw_mermaid()`**, rồi dán vào **mermaid.live** để ngắm thành quả. Trong sơ đồ, các bạn sẽ thấy rõ **conditional edge từ revised node**: sau khi revise xong, hoặc là kết thúc, hoặc là chạy thêm một search query mới rồi tiếp tục revise theo query đó.

Cuối cùng, mình **invoke graph** với một dictionary chứa key `messages`, trong đó **role là `user`** (LangChain sẽ tự cast thành human message) và nội dung là:

*"Write about AI-powered SOC / autonomous SOC problem domain, list startups that have raised capital on that."*

Mình chạy ở chế độ debug, đặt breakpoint và xem xét response:

* Message cuối cùng là một **AI message có tool call** — cụ thể là **tool call `ReviseAnswer`**.
* Câu trả lời thật nằm trong **`args`** của tool call đó.

Mình viết đoạn code kiểm tra: nếu message cuối là AI message có tool call, lấy tool call đầu tiên, truy cập `args` và in ra key `answer`. Chạy lại toàn bộ, ta nhận được bài viết hoàn chỉnh:

* **AI-powered và Autonomous SOC**: SOC truyền thống đối mặt với tình trạng quá tải cảnh báo, tắc nghẽn phân loại thủ công và thiếu chuyên viên; SOC dùng AI giảm **false positive tới 50%**, tự động hóa **70% cảnh báo thường nhật**, cắt giảm **70–90% thời gian điều tra**.
* **Autonomous SOC** mở rộng phản ứng rủi ro thấp — cách ly email, cô lập endpoint, cấu hình lại firewall — rút ngắn **dwell time và MTTR xuống dưới 5 phút** trong lĩnh vực tài chính và y tế (MTTR = Median Time To Respond).
* **Startup theo mức độ trưởng thành**: nhóm **leaders** gồm **Darktrace, Vectra**; nhóm **Scale Up** gồm **Exabeam, Cybereason**; nhóm **Innovators** gồm **Deep Instinct, SecBI và Blumira**.

Một video dài nhưng thành quả thật xứng đáng, đúng không nào? Ở bài tiếp theo, chúng ta sẽ cùng "soi" toàn bộ hành trình này trên **LangSmith**. Hẹn gặp lại các bạn! 🚀
