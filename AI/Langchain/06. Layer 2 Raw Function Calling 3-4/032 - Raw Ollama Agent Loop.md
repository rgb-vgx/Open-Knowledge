# 🔧 Dựng lại ReAct Agent Loop bằng Raw Ollama SDK: Khi không còn LangChain che chở

Sau khi đã tự tay viết JSON schema cho tool, hôm nay chúng ta tiếp tục bóc lớp abstraction tiếp theo: **chat model**. Mình sẽ dựng lại nguyên vẹn vòng lặp ReAct nhưng chỉ dùng **Ollama SDK thuần**.

*Nghe có vẻ khô khan, nhưng đây chính là lúc bạn thấy rõ LangChain đã "cõng" bao nhiêu việc nặng cho chúng ta.*

### 🔍 Tự trace Ollama Chat — vì không còn LangChain lo giúp

Thay vì dùng `init_chat_model`, chúng ta chuyển sang **Ollama Chat model**. Vì đây **không phải LangChain chat model**, ta cần tự trace nó để vẫn quan sát được đẹp đẽ trên LangSmith.

Cách làm của mình: tạo một **hàm phụ trợ (auxiliary function)**, bọc bằng **traceable** của LangSmith, đặt **run type là `llm`** và tên là **Ollama Chat**. Hàm này:

1. Nhận vào một **list messages**.
2. Gọi **Ollama Chat client** với **model Qwen3**, **tools** (chính là JSON scheme đã chuẩn bị) và **messages** cần cho LLM "tiêu hóa".

*Và đây chính là điểm khác biệt: nếu dùng LangChain, ta được tracing out of the box, không cần hàm phụ trợ này.*

---

### 🗂️ tools_dict viết tay và messages theo chuẩn Ollama

Trước đây, ta tạo **tool dictionary** dựa vào thuộc tính **tool name** của LangChain — giờ với Ollama thì không có. Nên mình **viết tay**: `get_product_price` map sang chính function `get_product_price`, và `apply_discount` map sang function `apply_discount`.

Phần **bind tool vào LLM** không còn cần thiết nữa, vì đã có hàm Ollama Chat traced đảm nhiệm — mình xóa nó.

Với messages, ta phải **format lại toàn bộ** vì không còn `HumanMessage`:

* Thay vì HumanMessage, ta truyền **role là `user`** và content là câu hỏi. Điểm thú vị: Ollama gọi role này là **user**, còn một số vendor khác gọi là **human**. Khi dùng LangChain HumanMessage, nó tự động làm phần chuyển đổi này hộ ta.
* Tương tự, mình thay SystemMessage bằng **role `system`** cùng nội dung prompt như cũ.

Một lần nữa — **mọi thứ ở đây đều đặc thù cho Ollama**. Chuyển sang Anthropic sẽ là convention, cách đặt tên và cách xử lý khác. Đó chính là lý do **chi phí chuyển vendor khi không có LangChain rất cao**.

---

### 🔁 Bước thought: Xử lý tool call theo "phong cách Ollama"

Bước tiếp theo là lấy **tool calls** từ thought step theo kiểu Ollama. Mình gọi hàm `Ollama Chat` (hàm traced ta vừa viết) — lúc này đang **gọi thẳng Ollama SDK**.

Điểm quan trọng: response trả về là **Ollama response**, **không phải AI message object của LangChain**. Cấu trúc của nó như sau:

* Response có field **message** — mình gán vào biến `ai_message`.
* Message này có thuộc tính **`tool_calls`** — mình gán vào biến `tool_calls` để chuẩn hóa theo implementation cũ.

Chạy debug để xem tận mắt: response là **ChatResponse của Ollama**, chứa field **messages**; message có **role là `assistant`** (một số vendor khác gọi là **`AI`**), cùng **content** và **tool_calls**. Bên trong, tool call là một **object ChatOllama tool call** — **cấu trúc khác** với tool call object của LangChain.

Một chi tiết đáng chú ý: **Ollama không có tool call id**. Vì vậy, mình đổi đoạn code trích xuất: truy cập trực tiếp `tool_call.function.name` và `tool_call.function.arguments` — ví dụ tên là `get_product_price`, arguments là dictionary `product=laptop`.

---

### ⚡ Thực thi tool, truyền observation và kiểm tra trace

Phần thực thi cũng "raw" hơn hẳn:

* Vì không có **Runnable interface** của LangChain, ta **gọi thẳng function Python** với dictionary arguments nhận được.
* Kết quả trả về chính là **observation**.
* Để truyền observation ngược lại cho LLM, thay vì append **ToolMessage** của LangChain, ta append một **dictionary với role `tool`** và content là observation.

Chạy lại toàn bộ và xem kết quả — mọi thứ hoạt động chính xác:

1. **Vòng 1:** chọn `get_product_price` với `product=laptop`, thực thi tool.
2. **Vòng 2:** LLM quyết định gọi `apply_discount` với arguments đúng, ta chạy tool.
3. **Vòng 3:** không còn tool call nào — kết thúc.

Mở LangSmith, mình phát hiện trace vẫn mang tên cũ **"LangChain Agent Loop"** — mình quên đổi tên mất! Sau khi sửa thành **"Ollama Agent Loop"** và chạy lại, trace cho thấy rõ đây đang gọi **Ollama Chat** — **raw SDK của Ollama**, không phải chat Ollama của LangChain. **Câu trả lời cuối cùng là 1,099** — chính xác, sau khi chạy đúng `get_product_price` và `apply_discount`.

Mình sẽ chia sẻ trace này trong phần tài nguyên của video. Hẹn gặp lại các bạn ở video recap để cùng nhìn lại hành trình này! 🚀
