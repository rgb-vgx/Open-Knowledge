# 🛠️ Manual Tool Calling: Tự tay điều khiển LLM bằng Prompt thuần

> Nguồn: `037-Implementing-Manual-Tool-Calling-for-LLMs.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/54990493)

Sau khi đã có ReAct prompt hoàn chỉnh và viết lại hàm gọi Ollama, hôm nay chúng ta sẽ ráp vòng lặp agent thủ công — và khám phá một **"vũ khí bí mật"** giúp LLM biết dừng đúng lúc: **stop token**.

*Nghe có vẻ nhỏ nhặt, nhưng đây là chi tiết quyết định thành bại của cả cơ chế tool calling thủ công đấy!*

### ⏹️ Stop token: Bí quyết để LLM biết "dừng đúng lúc"

Nhìn lại hàm **`ollama_chat_traced`**: trước đây nó nhận **tools**, nhưng giờ chúng ta **không dùng tools nữa**. Tuy vậy, ta vẫn cần gửi cho model một cấu hình quan trọng: **stop argument**.

Cụ thể, hàm sẽ:

1. **Bỏ toàn bộ phần sử dụng tool**.
2. **Nhận model**, **messages**, và **options** — trong đó options sẽ chứa **stop argument** với giá trị là **`\nObservation`**.

Mình truyền thẳng cấu hình này vào lệnh gọi **`ollama.chat`**. Ý nghĩa: LLM sẽ **ngừng sinh văn bản ngay khi tạo ra token `\nObservation`**.

| Cấu hình | Hành vi của LLM | Hệ quả |
|---|---|---|
| Có stop token `\nObservation` | Dừng sinh ngay khi gặp token này | Output sạch, đúng Thought / Action / Action Input |
| Không có stop token | Tiếp tục sinh thêm văn bản | LLM bịa observation (hallucination), output hỏng |

---

### 🧱 Ráp "full prompt": ReAct prompt + scratchpad

Bước vào agent loop, có hai thứ ta **không cần nữa**:

* **tools_dict** — vì đã có tool dictionary từ trước.
* **Các messages cũ** — vì mọi thứ giờ đây đến từ **ReAct prompt**: prompt này đã chứa **cả chỉ dẫn cho agent lẫn input người dùng**. Để ý một điều thú vị: **không còn sự tách biệt giữa system prompt và user prompt** nữa — ta dùng **prompt như một khối thống nhất**.

Thay vào đó, mình làm như sau:

1. **Inject câu hỏi vào ReAct prompt** — câu hỏi đến từ người dùng lúc runtime.
2. **Khởi tạo scratchpad là một list rỗng** — nó sẽ chứa **lịch sử** mọi thứ LLM đã làm: các lựa chọn tool, observations, vân vân.
3. Ở **build time**, **tool descriptions** và **tool names** được plug vào prompt (như ta đã chuẩn bị ở video trước).
4. Ở **runtime**, **question** được plug vào một cách động, đến từ người dùng.
5. **Append scratchpad vào ReAct prompt gốc** → tạo thành **full prompt** — một **khối text lớn** duy nhất gửi tới LLM.

Mình chạy debug, copy giá trị full prompt ra file mới để xem: câu hỏi *"what is the price of laptop after applying the gold discount?"* đã được plug vào đúng chỗ, và phần kết thúc là **Thought:** — chính là **output indicator** để LLM bắt đầu làm việc. Mình cũng đảo thứ tự code một chút: **in câu hỏi trước, rồi mới format prompt**.

*Đừng lo nếu bạn thấy prompt dài và rối — cứ nhìn vào các placeholder, mọi thứ sẽ rõ ràng ngay.*

---

### 🧠 Gọi LLM và đọc "raw output"

Giờ là lúc gọi `ollama_chat_traced` với:

* Model **Qwen3**.
* **Một message duy nhất** mỗi lần gọi — chứa toàn bộ chỉ dẫn cho LLM cộng với câu hỏi người dùng.
* **Options**: stop argument là **`\nObservation`**, cùng **temperature = 0** để prompt cho kết quả **nhất quán hơn**.

Chạy debug vào **vòng lặp 1**, ta xem response nhận về:

* Response có **message**, trong message có **content** — đây là **raw response** của LLM dạng text thuần, được mình format lại cho dễ đọc.
* Trên **LangSmith**, trace cho thấy **toàn bộ input**: strict rules, ReAct prompt với tool descriptions được plug vào, danh sách tools, và câu hỏi của người dùng.
* Response có **phần suy nghĩ (thinking)**, rồi trả lời đúng **định dạng Thought / Action / Action Input**.
* Đặc biệt: nó **không sinh thêm gì sau Action Input** — vì ngay sau đó, nó sẽ output **`\nObservation`** và **dừng sinh văn bản hoàn toàn**. Trong response vì vậy **không hề có `\nObservation`**.

Để chứng minh "không nói suông", mình cố tình **thêm một typo (xóa stop argument)** rồi chạy lại: LLM lập tức tiếp tục sinh ra **observation bịa đặt (hallucination)** cùng mọi thứ khác. Mình khôi phục stop token — mọi thứ lại gọn gàng.

Và một chi tiết quan trọng: response này **không phải AI message object** — nó chỉ là **text thuần**. Nên mình đổi tên biến thành **`output`** cho đúng bản chất.

```mermaid
sequenceDiagram
    participant App
    participant LLM
    App->>LLM: Full prompt gồm react prompt cộng scratchpad
    LLM-->>App: Thought, Action, Action Input
    Note over LLM: Gặp stop token thì dừng sinh
    App->>App: Parse raw text output
```

---

### 🎯 Hai mũi tên còn thiếu của vòng lặp ReAct

Chúng ta đã có prompt hoàn chỉnh, cách gọi LLM và raw output. Ở video tiếp theo, mình sẽ implement hai **mũi tên** còn lại của vòng lặp:

1. **Mũi tên từ Thought đến Final Answer** — khi LLM thông báo đã có câu trả lời cuối cùng.
2. **Mũi tên từ Thought đến Tool** — parse câu trả lời của LLM, rồi **thực thi tool tương ứng**.

---

### 💻 Code mẫu đầy đủ — `3_raw_react_prompt.py`

Toàn bộ code của bài nằm trong file `3_raw_react_prompt.py` (tham khảo từ repo chính thức của khóa học) — phần `options={"stop": ["\nObservation"], "temperature": 0}` và agent loop chính là nội dung của bài:

```python
# CHANGE 1: Add re + inspect — we'll parse tool calls from raw text instead of structured JSON.
import re
import inspect
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
    price = float(price)
    discount_percentages = {"bronze": 5, "silver": 12, "gold": 23}
    discount = discount_percentages.get(discount_tier, 0)
    return round(price * (1 - discount / 100), 2)

tools = {
    "get_product_price": get_product_price,
    "apply_discount": apply_discount,
}

# CHANGE 3: Delete the JSON schemas. Tools now live inside the prompt as plain text.
# We derive descriptions from the functions themselves using inspect.

def get_tool_descriptions(tools_dict):
    descriptions = []
    for tool_name, tool_function in tools_dict.items():
        # __wrapped__ bypasses decorator wrappers (e.g., @traceable adds *, config=None)
        original_function = getattr(tool_function, "__wrapped__", tool_function)
        signature = inspect.signature(original_function)
        docstring = inspect.getdoc(tool_function) or ""
        descriptions.append(f"{tool_name}{signature} - {docstring}")
    return "\n".join(descriptions)

tool_descriptions = get_tool_descriptions(tools)
tool_names = ", ".join(tools.keys())

react_prompt = f"""
STRICT RULES — you must follow these exactly:
1. NEVER guess or assume any product price. You MUST call get_product_price first to get the real price.
2. Only call apply_discount AFTER you have received a price from get_product_price. Pass the exact price returned by get_product_price — do NOT pass a made-up number.
3. NEVER calculate discounts yourself using math. Always use the apply_discount tool.
4. If the user does not specify a discount tier, ask them which tier to use — do NOT assume one.

Answer the following questions as best you can. You have access to the following tools:

{tool_descriptions}

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action, as comma separated values
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!

Question: {{question}}
Thought:"""




# CHANGE 4: Drop tools= from ollama.chat(). The LLM has no idea it's an agent —
# all agency comes from the prompt above and our regex parsing below.

@traceable(name="Ollama Chat", run_type="llm")
def ollama_chat_traced(model, messages, options):
    return ollama.chat(model=model, messages=messages, options=options)





# --- Agent Loop ---


@traceable(name="Ollama Agent Loop")
def run_agent(question: str):
    print(f"Question: {question}")
    print("=" * 60)


    # CHANGE 5: One prompt string replaces the system/user message split.
    prompt = react_prompt.format(question=question)
    scratchpad = ""

    for iteration in range(1, MAX_ITERATIONS + 1):
        print(f"\n--- Iteration {iteration} ---")
        full_prompt = prompt + scratchpad

        # Stop token prevents the LLM from generating its own Observation —
        # we inject the real tool result instead.
        response = ollama_chat_traced(
            model=MODEL,
            messages=[{"role": "user", "content": full_prompt}],
            options={"stop": ["\nObservation"], "temperature": 0},
        )
        output = response.message.content
        print(f"LLM Output:\n{output}")

        print(f"  [Parsing] Looking for Final Answer in LLM output...")
        final_answer_match = re.search(r"Final Answer:\s*(.+)", output)
        if final_answer_match:
            final_answer = final_answer_match.group(1).strip()
            print(f"  [Parsed] Final Answer: {final_answer}")
            print("\n" + "=" * 60)
            print(f"Final Answer: {final_answer}")
            return final_answer



        # CHANGE 6: Parse tool calls from raw text with regex — fragile if LLM doesn't follow format.
        print(f"  [Parsing] Looking for Action and Action Input in LLM output...")

        action_match = re.search(r"Action:\s*(.+)", output)
        action_input_match = re.search(r"Action Input:\s*(.+)", output)

        if not action_match or not action_input_match:
            print(
                "  [Parsing] ERROR: Could not parse Action/Action Input from LLM output"
            )
            break

        tool_name = action_match.group(1).strip()
        tool_input_raw = action_input_match.group(1).strip()

        print(f"  [Tool Selected] {tool_name} with args: {tool_input_raw}")

        # Split comma-separated args; strip key= prefix if LLM outputs key=value format
        raw_args = [x.strip() for x in tool_input_raw.split(",")]
        args = [x.split("=", 1)[-1].strip().strip("'\"") for x in raw_args]

        print(f"  [Tool Executing] {tool_name}({args})...")
        if tool_name not in tools:
            observation = f"Error: Tool '{tool_name}' not found. Available tools: {list(tools.keys())}"
        else:
            observation = str(tools[tool_name](*args))


        print(f"  [Tool Result] {observation}")

        # CHANGE 7: History is one growing string re-sent every iteration (replaces messages.append).
        scratchpad += f"{output}\nObservation: {observation}\nThought:"


    print("ERROR: Max iterations reached without a final answer")
    return None


if __name__ == "__main__":
    print("Hello LangChain Agent (.bind_tools)!")
    print()
    result = run_agent("What is the price of a laptop after applying a gold discount?")
```

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Stop argument có giá trị gì và tác dụng ra sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Giá trị là `\nObservation`; LLM sẽ ngừng sinh văn bản ngay khi tạo ra token này.

Giải thích: Nhờ đó response chỉ dừng ở Action Input và không tự bịa observation.

Tham chiếu: Mục Stop token: Bí quyết để LLM biết "dừng đúng lúc".

</details>

**Câu 2:** Vì sao không cần dùng lại các messages cũ?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì mọi thứ đến từ ReAct prompt — prompt đã chứa cả chỉ dẫn cho agent lẫn input người dùng.

Giải thích: Không còn sự tách biệt giữa system prompt và user prompt; ta dùng prompt như một khối thống nhất.

Tham chiếu: Mục Ráp "full prompt".

</details>

**Câu 3:** Full prompt được ráp như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Inject câu hỏi vào ReAct prompt, khởi tạo scratchpad là list rỗng, rồi append scratchpad vào prompt gốc thành một khối text lớn duy nhất.

Giải thích: Tool descriptions và tool names plug ở build time, question plug ở runtime; phần kết thúc là Thought — output indicator.

Tham chiếu: Mục Ráp "full prompt".

</details>

**Câu 4:** Điều gì xảy ra khi cố tình xóa stop token?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** LLM lập tức tiếp tục sinh ra observation bịa đặt (hallucination) cùng mọi thứ khác.

Giải thích: Đây là minh chứng cho vai trò quyết định của stop token trong tool calling thủ công.

Tham chiếu: Mục Gọi LLM và đọc "raw output".

</details>

**Câu 5:** Vì sao biến response được đổi tên thành `output`?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì response chỉ là text thuần, không phải AI message object.

Giải thích: Ta đang làm việc với raw output của LLM thay vì object có cấu trúc.

Tham chiếu: Mục Gọi LLM và đọc "raw output".

</details>

Hai mũi tên này sẽ hoàn thiện vòng lặp ReAct thủ công của chúng ta. Hẹn gặp lại ở video tiếp theo! 🚀

## Nguồn tham khảo

- [Udemy — Implementing Manual Tool Calling for LLMs](https://ua.udemy.com/course/langchain/learn/lecture/54990493)
- [Ollama Docs — API chat](https://docs.ollama.com/api/chat)
- [LangChain Hub — hwchase17/react](https://smith.langchain.com/hub/hwchase17/react)
