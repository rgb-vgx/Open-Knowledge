# 🔧 Dựng lại ReAct Agent Loop bằng Raw Ollama SDK: Khi không còn LangChain che chở

> Nguồn: `032-Building-a-ReAct-Agent-Loop-with-the-Raw-Ollama-SDK.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/54885511)

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

| Thành phần | LangChain | Ollama SDK raw |
|---|---|---|
| Chat model | `init_chat_model` | Gọi thẳng `ollama.chat` |
| Tool binding | `bind_tools` | Truyền `tools` list trong lệnh gọi |
| Tool call | Object có `id` | Object ChatOllama, không có id |
| Message kết quả | ToolMessage | Dictionary role `tool` |
| Tracing | Có sẵn out of the box | Tự viết hàm traceable |
| Gọi tool | Qua Runnable interface | Gọi thẳng hàm Python |

Một lần nữa — **mọi thứ ở đây đều đặc thù cho Ollama**. Chuyển sang Anthropic sẽ là convention, cách đặt tên và cách xử lý khác. Đó chính là lý do **chi phí chuyển vendor khi không có LangChain rất cao**.

---

### 🔁 Bước thought: Xử lý tool call theo "phong cách Ollama"

Bước tiếp theo là lấy **tool calls** từ thought step theo kiểu Ollama. Mình gọi hàm `Ollama Chat` (hàm traced ta vừa viết) — lúc này đang **gọi thẳng Ollama SDK**.

Điểm quan trọng: response trả về là **Ollama response**, **không phải AI message object của LangChain**. Cấu trúc của nó như sau:

* Response có field **message** — mình gán vào biến `ai_message`.
* Message này có thuộc tính **`tool_calls`** — mình gán vào biến `tool_calls` để chuẩn hóa theo implementation cũ.

Chạy debug để xem tận mắt: response là **ChatResponse của Ollama**, chứa field **messages**; message có **role là `assistant`** (một số vendor khác gọi là **`AI`**), cùng **content** và **tool_calls**. Bên trong, tool call là một **object ChatOllama tool call** — **cấu trúc khác** với tool call object của LangChain.

Một chi tiết đáng chú ý: **Ollama không có tool call id**. Vì vậy, mình đổi đoạn code trích xuất: truy cập trực tiếp `tool_call.function.name` và `tool_call.function.arguments` — ví dụ tên là `get_product_price`, arguments là dictionary `product=laptop`.

```mermaid
flowchart TD
    A[List messages] --> B[Gọi Ollama Chat raw]
    B --> C{Có tool_calls}
    C -->|Có| D[Đọc function name và arguments]
    D --> E[Gọi thẳng hàm Python]
    E --> F[Append role tool với observation]
    F --> B
    C -->|Không| G[Final answer]
```

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

---

### 💻 Code mẫu đầy đủ — `2_agent_loop_raw_function_calling.py`

Toàn bộ code của bài nằm trong file `2_agent_loop_raw_function_calling.py` (tham khảo từ repo chính thức của khóa học):

```python
from dotenv import load_dotenv

load_dotenv()

import ollama
from langsmith import traceable

MAX_ITERATIONS = 10
MODEL = "qwen3:1.7b"


# --- Tools (LangChain @tool decorator) ---


@traceable(run_type="tool")
def get_product_price(product: str) -> float:
    """Look up the price of a product in the catalog."""
    print(f"    >> Executing get_product_price(product='{product}')")
    prices = {"laptop": 1299.99, "headphones": 149.95, "keyboard": 89.50}
    return prices.get(product, 0)


@traceable(run_type="tool")
def apply_discount(price: float, discount_tier: str) -> float:
    """Apply a discount tier to a price and return the final price.
    Available tiers: bronze, silver, gold."""
    print(f"    >> Executing apply_discount(price={price}, discount_tier='{discount_tier}')")
    discount_percentages = {"bronze": 5, "silver": 12, "gold": 23}
    discount = discount_percentages.get(discount_tier, 0)
    return round(price * (1 - discount / 100), 2)

# Difference 2: Without @tool, we must MANUALLY define the JSON schema for each function.
# This is exactly what LangChain's @tool decorator generates automatically
# from the function's type hints and docstring.
tools_for_llm = [
    {
        "type": "function",
        "function": {
            "name": "get_product_price",
            "description": "Look up the price of a product in the catalog.",
            "parameters": {
                "type": "object",
                "properties": {
                    "product": {
                        "type": "string",
                        "description": "The product name, e.g. 'laptop', 'headphones', 'keyboard'",
                    },
                },
                "required": ["product"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "apply_discount",
            "description": "Apply a discount tier to a price and return the final price. Available tiers: bronze, silver, gold.",
            "parameters": {
                "type": "object",
                "properties": {
                    "price": {"type": "number", "description": "The original price"},
                    "discount_tier": {
                        "type": "string",
                        "description": "The discount tier: 'bronze', 'silver', or 'gold'",
                    },
                },
                "required": ["price", "discount_tier"],
            },
        },
    },
]


# NOTE: Ollama can also auto-generate these schemas if you pass the functions
# directly as tools (similar to LangChain's @tool decorator):
#   tools_for_llm = [get_product_price, apply_discount]
# However, this requires your docstrings to follow the Google docstring format
# so Ollama can parse parameter descriptions from the Args section. For example:
#   def get_product_price(product: str) -> float:
#       """Look up the price of a product in the catalog.
#
#       Args:
#           product: The product name, e.g. 'laptop', 'headphones', 'keyboard'.
#
#       Returns:
#           The price of the product, or 0 if not found.
#       """
# We keep the manual JSON version here so you can see what @tool hides from you.

# --- Helper: traced Ollama call ---
# Difference 3: Without LangChain, we must manually trace LLM calls for LangSmith.


@traceable(name="Ollama Chat", run_type="llm")
def ollama_chat_traced(messages):
    return ollama.chat(model=MODEL, tools=tools_for_llm, messages=messages)

# --- Agent Loop ---


@traceable(name="Ollama Agent Loop")
def run_agent(question: str):
    tools_dict = {
        "get_product_price": get_product_price,
        "apply_discount": apply_discount,
    }



    print(f"Question: {question}")
    print("=" * 60)

    messages = [
        {
            "role": "system",
            "content": (
                "You are a helpful shopping assistant. "
                "You have access to a product catalog tool "
                "and a discount tool.\n\n"
                "STRICT RULES — you must follow these exactly:\n"
                "1. NEVER guess or assume any product price. "
                "You MUST call get_product_price first to get the real price.\n"
                "2. Only call apply_discount AFTER you have received "
                "a price from get_product_price. Pass the exact price "
                "returned by get_product_price — do NOT pass a made-up number.\n"
                "3. NEVER calculate discounts yourself using math. "
                "Always use the apply_discount tool.\n"
                "4. If the user does not specify a discount tier, "
                "ask them which tier to use — do NOT assume one."
            ),
        },
        {"role": "user", "content": question},
    ]

    for iteration in range(1, MAX_ITERATIONS + 1):
        print(f"\n--- Iteration {iteration} ---")

        # Difference 5: ollama.chat() directly instead of llm_with_tools.invoke()
        response = ollama_chat_traced(messages=messages)
        ai_message = response.message

        tool_calls = ai_message.tool_calls

        # If no tool calls, this is the final answer
        if not tool_calls:
            print(f"\nFinal Answer: {ai_message.content}")
            return ai_message.content

        # Process only the FIRST tool call — force one tool per iteration
        tool_call = tool_calls[0]
        # Difference 6: Attribute access (.function.name) instead of dict access (.get("name"))
        tool_name = tool_call.function.name
        tool_args = tool_call.function.arguments

        print(f"  [Tool Selected] {tool_name} with args: {tool_args}")

        tool_to_use = tools_dict.get(tool_name)
        if tool_to_use is None:
            raise ValueError(f"Tool '{tool_name}' not found")

        # Difference 7: Direct function call instead of tool.invoke()
        observation = tool_to_use(**tool_args)


        print(f"  [Tool Result] {observation}")

        messages.append(ai_message)
        messages.append(
            {
                "role": "tool",
                "content": str(observation),
            }
        )

    print("ERROR: Max iterations reached without a final answer")
    return None


if __name__ == "__main__":
    print("Hello LangChain Agent (.bind_tools)!")
    print()
    result = run_agent("What is the price of a laptop after applying a gold discount?")
```

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao phải viết hàm phụ trợ traceable cho Ollama Chat?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì Ollama Chat model không phải LangChain chat model nên không được trace tự động.

Giải thích: Hàm bọc bằng `traceable`, run type là `llm`, tên "Ollama Chat", để vẫn quan sát đẹp trên LangSmith.

Tham chiếu: Mục Tự trace Ollama Chat.

</details>

**Câu 2:** tools_dict viết tay dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Map tên tool mà LLM trả về sang function Python tương ứng để thực thi.

Giải thích: Trước đây dictionary được dựng từ thuộc tính tool name của LangChain, giờ phải viết tay.

Tham chiếu: Mục tools_dict viết tay và messages theo chuẩn Ollama.

</details>

**Câu 3:** Message được format lại khác LangChain như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** HumanMessage thay bằng role `user`, SystemMessage thay bằng role `system`.

Giải thích: Ollama gọi vai trò là user trong khi một số vendor khác gọi là human; LangChain tự làm phần chuyển đổi này hộ ta.

Tham chiếu: Mục tools_dict viết tay và messages theo chuẩn Ollama.

</details>

**Câu 4:** Tool call của Ollama khác của LangChain ở điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Ollama không có tool call id, phải truy cập trực tiếp `tool_call.function.name` và `tool_call.function.arguments`.

Giải thích: Object ChatOllama tool call cũng có cấu trúc khác tool call object của LangChain.

Tham chiếu: Mục Bước thought: Xử lý tool call theo "phong cách Ollama".

</details>

**Câu 5:** Observation được truyền ngược lại cho LLM bằng cách nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Append một dictionary với role `tool` và content là observation, thay cho ToolMessage.

Giải thích: Không còn Runnable interface nên gọi thẳng function Python với dictionary arguments nhận được.

Tham chiếu: Mục Thực thi tool, truyền observation và kiểm tra trace.

</details>

Mình sẽ chia sẻ trace này trong phần tài nguyên của video. Hẹn gặp lại các bạn ở video recap để cùng nhìn lại hành trình này! 🚀

## Nguồn tham khảo

- [Udemy — Building a ReAct Agent Loop with the Raw Ollama SDK](https://ua.udemy.com/course/langchain/learn/lecture/54885511)
- [Ollama Docs — Tool calling](https://docs.ollama.com/capabilities/tool-calling)
- [LangSmith Docs — Custom instrumentation với traceable](https://docs.langchain.com/langsmith/annotate-code)
