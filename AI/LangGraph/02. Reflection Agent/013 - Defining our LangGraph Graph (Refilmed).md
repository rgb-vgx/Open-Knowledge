# 🧩 Định nghĩa Graph theo chuẩn LangGraph 1.0: State, Reducer và Typed State

Chào các bạn, Eden đây! Trước khi vào bài, mình xin "bật mí" một chút: video này được **quay lại** để khớp với phiên bản **LangGraph 1.0** mới nhất, nên IDE sẽ đổi sang **Cursor** — nhưng đừng lo, toàn bộ logic code vẫn như cũ.

Ở bài này, chúng ta sẽ định nghĩa **workflow** của mình: các node sẽ chạy những chain đã viết, nối các node lại bằng edge, và quan trọng nhất là định nghĩa **state (trạng thái)** mà graph sẽ làm việc trên đó.

### 🗺️ Workflow trước, code sau

Luồng chạy của chúng ta trông như thế này:

1. Bắt đầu với **generate node** — chạy generation chain trên input.
2. Quyết định xem ta muốn **kết thúc** hay đi tiếp sang **reflect**.
3. Chạy **reflection chain** để phản chiếu output vừa sinh ra.
4. Lấy output của reflect node để **sinh lại (regenerate)**.
5. Lặp lại vòng này cho tới khi thỏa một điều kiện nhất định.

Mỗi node đều có quyền truy cập **state**: state là input của node, và khi node chạy xong, nó cập nhật state. Trong trường hợp của chúng ta, state đơn giản là **một danh sách message** mà ta liên tục append thêm.

---

### 🧱 State schema: TypedDict, Annotated và add_messages

Mở `main.py`, mình bắt đầu với các import:

* `TypedDict` và `Annotated` từ `typing`. **TypedDict** tạo ra dictionary có cấu trúc kèm gợi ý kiểu cho từng key — LangGraph yêu cầu **typed state** để biết dữ liệu nào chảy vào và ra khỏi graph; còn **Annotated** giúp thêm metadata vào các type hint đó.
* `BaseMessage` — abstract base class cho mọi loại message trong LangChain (human, AI, system...), dùng làm type hint cho danh sách message trong state schema, đảm bảo an toàn cho nhiều loại message khác nhau.
* `HumanMessage` — đại diện cho message từ người dùng; ta cần nó để **phân biệt nội dung của user với phản hồi của AI** trong một số message cụ thể.
* `END` — hằng số đặc biệt đánh dấu **node kết thúc** của graph.
* `StateGraph` — class chính để xây dựng **stateful graph**. Khi tạo workflow, ta phải cung cấp state cho nó: một cấu trúc dữ liệu — thường là dictionary hoặc class **Pydantic** — được duy trì xuyên suốt quá trình thực thi, lưu intermediate result, LLM response và gần như mọi thứ ta muốn. Rất linh hoạt!
* `add_messages` — **reducer function** của LangGraph. Mục tiêu duy nhất của nó là đảm bảo message mới được **append vào lịch sử hội thoại** thay vì ghi đè. Hàm chỉ đơn giản append vào một list, và đó là cách state được cập nhật.
* `generate_chain`, `reflect_chain` từ file `chains` — các chain sẽ chạy trong từng node.

Sau đó mình định nghĩa state schema tên là `MessageGraph`, kế thừa từ `TypedDict`, chỉ có **một key duy nhất là `messages`** — danh sách các `BaseMessage`. Điểm mấu chốt nằm ở annotation `add_messages`: đây là metadata nói cho LangGraph biết **cách xử lý cập nhật state**. Thay vì thay thế key như bình thường, LangGraph sẽ **append** các item mới vào giá trị của key đó.

**Reducer** là thuật ngữ chung chỉ cách ta muốn cập nhật state — ta có thể viết bất kỳ hàm nào miễn tuân theo reducer interface, và đó là một trong những ưu điểm lớn nhất về độ linh hoạt của LangGraph.

---

### 🔧 Hai node: generate và reflect

Mình định nghĩa hai hằng số `generate` và `reflect` làm tên node.

**Generation node** nhận vào state kiểu `MessageGraph` — chỉ chứa toàn bộ message đã sinh ra cho tới thời điểm hiện tại, trong đó **message đầu tiên là input của người dùng**, các message sau đều là AI message. Node chạy generation chain và invoke với tất cả message hiện có:

* Lần lặp đầu tiên, node chỉ có user input → sinh ra tweet.
* Các lần lặp sau, node có thêm critique → revise tweet.

Cách làm này thực chất là một **kỹ thuật prompt engineering**: LLM luôn nhận được toàn bộ lịch sử nên luôn biết critique trước đó là gì, điều gì đã thay đổi — nó có đầy đủ ngữ cảnh mọi lúc. Khi return, ta trả về một dictionary với key `messages`; nhờ reducer `add_messages`, giá trị này được **append** vào state hiện tại thay vì ghi đè.

**Reflection node** làm điều tương tự: nhận state, invoke reflection chain. Nhưng khi cập nhật state, ta không append AI message — ta **cast (chuyển) response AI thành `HumanMessage`**. Đây là một **heuristic (suy đoán có chủ đích)**: ta muốn khi critique được đưa trở lại LLM, nó nghĩ rằng critique đó là do **người dùng** viết ra. Lý do là các mô hình ngôn ngữ lớn được huấn luyện cả cho **hội thoại và phản hồi từ con người**; khi dán nhãn văn bản critique là human message, ta hy vọng nhận được kết quả tốt hơn.

---

### 🧩 Ghép tất cả lại: đỉnh, cạnh và bản đồ đường đi

Mình tạo một object `StateGraph` với state schema là class `MessageGraph` — đây là cách nói cho LangGraph biết state là gì và cập nhật thế nào. Sau đó tạo hai node: `generate` và `reflect`. *Lưu ý: mọi node trong LangGraph đều nhận input là state — đúng kiểu state mà ta khởi tạo graph.*

Tiếp theo, `set_entry_point("generate")` cho graph biết node chạy đầu tiên. Thực ra mọi graph đều bắt đầu với một **start node dựng sẵn**; khi dùng `set_entry_point`, ta đang tạo một edge từ start node sang `generate`.

Về phần edge:

* **Deterministic edge:** `reflect` → `generate` — sau khi phản chiếu, luôn quay lại sinh tweet mới dựa trên reflection.
* **Conditional edge:** `generate` → `reflect` hoặc `END` — được vẽ bằng **nét đứt** trong diagram.

Hàm `should_continue` nhận state và trả về một string là tên node. Nó được gọi sau mỗi lần chạy node để "điện tín" xem đi đâu tiếp. Logic ở đây rất đơn giản: **đếm số message; nếu đạt 6 thì kết thúc, nếu dưới 6 thì sang `reflect`** — như vậy ta có **hai vòng lặp reflection**. Tất nhiên, thay vì logic này, các bạn hoàn toàn có thể đặt một **LLM để quyết định** có cần thêm vòng lặp hay đã hài lòng với kết quả. Đó chính là vẻ đẹp của LangGraph: ta — những developer — định nghĩa luồng và node nào sẽ chạy, rồi có thể đặt LLM vào để chọn đường đi. Mình gọi đó là tư duy **flow engineering (kỹ thuật thiết kế luồng)**. Con số 6 chỉ là ví dụ; có thể là bất kỳ con số hay logic nào khác.

*Một điểm rất dễ nhầm:* `should_continue` **không phải là một node** — nó là hàm của conditional edge. Nó không return dictionary mà return **string**, và string đó **phải khớp với tên node**; nếu không khớp, ta sẽ nhận lỗi.

Mình gọi `add_conditional_edges` với node nguồn và hàm routing, rồi thêm edge thứ hai từ `reflect` sang `generate`. Xong phần "đồ nghề"!

Cuối cùng là compile và vẽ graph. Ban đầu, mình chỉ vẽ bằng `get_graph().draw_mermaid()` rồi dán vào **Excalidraw** (qua tính năng mermaid-to-excalidraw): nhìn vào diagram, ta thấy **thiếu conditional edge từ generate sang reflect và end**. *Đây không phải bug mà là "feature"* — graph vẫn chạy đúng nếu ta invoke, chỉ là vấn đề hiển thị. Nguyên nhân: LangGraph không tự biết `should_continue` sẽ trả về gì. Cách sửa rất đơn giản: thêm **path map** (dictionary ánh xạ output của hàm sang node cụ thể) vào `add_conditional_edges` — `END` → `END`, `reflect` → `reflect`. Chạy lại và dán lại vào Excalidraw, ta thấy đầy đủ conditional edge như mong muốn. Ngoài ra, `print_ascii()` cũng cho ta bản vẽ graph bằng ASCII.

Vậy là graph đã hoàn chỉnh và ta nhìn thấy rõ luồng chạy. Ở bài tiếp theo, chúng ta sẽ invoke nó với dữ liệu thật và mổ xẻ từng bước trên LangSmith cho tới chiếc tweet cuối cùng. Hẹn gặp lại các bạn! 🚀
