# 🧠 ReAct Prompt: Prompt quan trọng nhất trong AI Engineering (Nền tảng của mọi Agent)

> Nguồn: `034-What-are-we-building-Function-Calling-Yes-we-are-building-Fu.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/54977427)

Xin chào, Eden đây! Trong video này, chúng ta sẽ cùng tìm hiểu **ReAct prompt** — theo mình, đây là **prompt quan trọng nhất trong AI Engineering**, và là **nền tảng cho mọi agent** mà bạn thấy ngày nay. Chính prompt này đã giúp LLM hoạt động như một **reasoning engine (cỗ máy lập luận)** — và là thứ đã **khởi đầu cho tất cả**.

*Nếu bạn muốn học sâu về prompt này cùng toàn bộ lý thuyết prompt engineering phía sau, mình rất khuyến khích ghé qua phần Theory của khóa học.*

### 📜 Hành trình tìm về prompt "đã khởi đầu tất cả"

Mình đang ở trang chính của **LangSmith**. Vào mục **Prompts**, ta thấy tùy chọn **"Browse all Public Prompts in the LangChain Hub"** — nơi mọi người chia sẻ và tìm kiếm prompt, một cách rất tiện để khám phá prompt nói chung.

Mình tìm kiếm **`hwchase17/react`** và đây rồi — prompt với **hơn 7 triệu lượt tải**. Và đây là câu chuyện thú vị phía sau nó:

* Người đăng prompt này chính là **Harrison Chase** — **co-founder kiêm CEO của LangChain**.
* Trong **implementation OG của ReAct agent**, đây chính là prompt được dùng để "power" **agent LangChain đầu tiên**.
* Trong toàn bộ hệ sinh thái, mình tin đây là **agent đầu tiên mà mọi người có thể tự xây dựng**.

Trang prompt có hướng dẫn **tải về bằng LangSmith client**, kèm rất nhiều **metadata**. Nếu vào phần **Commit**, ta thấy **version** của prompt — và đây chính là phiên bản chúng ta sẽ dùng để power **raw ReAct agent** của mình.

Điểm quan trọng: chúng ta sẽ **không dùng function calling** nữa. Thay vào đó, chính **prompt này** sẽ đóng vai trò **reasoning engine** cho agent.

---

### 🔍 Giải phẫu "cỗ máy lập luận" ReAct

Cùng điểm qua nhanh nội dung prompt nhé:

1. **"Answer the following questions as best as you can. You have access to the following tools."** — kèm một **placeholder cho tools**, nơi ta sẽ **inject mô tả của từng tool**. Trong use case của chúng ta là hai tool: **get_product_price** và **apply_discount**.
2. **"Use the following format"** — tiếp theo là các phần: **Question** (câu hỏi đầu vào), **Thought** (luôn suy nghĩ về việc mình làm), và **Action** (một trong `[tool_names]`).
3. Lưu ý sự khác biệt: ở **Action** ta chỉ **inject tên tool**; còn ở phần **tools** phía trên là thông tin **đầy đủ hơn nhiều** — gồm **arguments, kiểu argument, giá trị trả về và mô tả khi nào nên dùng tool**. Chính những thông tin này giúp LLM quyết định chọn tool nào.
4. **Action Input** — input cho action.
5. **Observation** — kết quả của action. *Bạn có nhớ thuật ngữ "observation" chúng ta bàn ở các video trước không?* Nó có nguồn gốc chính từ **ReAct prompt và ReAct paper**.
6. Chuỗi **Thought / Action / Action Input / Observation** có thể **lặp lại N lần** — đây chính là vòng lặp agent mà ta sẽ implement.
7. Cuối cùng: **Thought: I know the final answer** và **Final Answer** — câu trả lời cuối cùng cho câu hỏi ban đầu.
8. **Begin** rồi đến **Question** (input người dùng) và **Thought** đi kèm **agent_scratchpad**.

```mermaid
flowchart TD
    A[Question] --> B[Thought]
    B --> C[Action chọn tool]
    C --> D[Action Input]
    D --> E[Observation từ tool]
    E --> B
    B --> F[Thought I know the final answer]
    F --> G[Final Answer]
```

Ở đây ta thấy rõ hàng loạt kỹ thuật prompt engineering như **few-shot prompting** và **chain of thought** đang được dùng để biến LLM thành một **reasoning agent**. Sau khi chạy prompt, LLM sẽ output ra **tool cần chạy** — nền tảng cho toàn bộ **luồng thực thi agent** của chúng ta: ta parse response, thực thi tool, rồi plug kết quả trở lại.

| Vị trí | Được inject gì | Vai trò |
|---|---|---|
| Phần tools đầu prompt | Mô tả đầy đủ: arguments, kiểu argument, giá trị trả về, khi nào nên dùng | Giúp LLM quyết định chọn tool nào |
| Phần Action | Chỉ tên tool trong `[tool_names]` | Chỉ đúng tool sẽ được chạy |

---

### 🗒️ Agent scratchpad — "ma thuật" của agent

Bạn có thể đang thắc mắc: **agent_scratchpad là gì?**

Đây là nơi lưu **toàn bộ lịch sử của agent**:

* Những **tool nào đã được chọn** và **vì sao** agent chọn chúng.
* Các **observation** — tức kết quả sau khi thực thi tool.

Scratchpad được **cập nhật liên tục** với kết quả mới nhất, giúp agent từ **vòng lặp 1 sang vòng lặp 2** giữ được sự tập trung và suy nghĩ bước tiếp theo. Đây chính là **phần "ma thuật"** làm nên sức mạnh của agent này.

---

### 💻 Code mẫu đầy đủ — `3_raw_react_prompt.py`

Toàn bộ code của bài nằm trong file `3_raw_react_prompt.py` (tham khảo từ repo chính thức của khóa học) — biến `react_prompt` chính là ReAct prompt từ LangChain Hub được phân tích ở trên:

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

**Câu 1:** ReAct prompt được tìm thấy ở đâu và ai là người đăng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Trên LangChain Hub trong LangSmith, do Harrison Chase — co-founder kiêm CEO của LangChain — đăng với hơn 7 triệu lượt tải.

Giải thích: Đây là prompt đã power agent LangChain đầu tiên trong implementation OG của ReAct agent.

Tham chiếu: Mục Hành trình tìm về prompt "đã khởi đầu tất cả".

</details>

**Câu 2:** Vòng lặp trong format của ReAct prompt gồm những phần nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Question, Thought, Action, Action Input, Observation — chuỗi Thought / Action / Action Input / Observation lặp N lần — rồi Thought: I know the final answer và Final Answer.

Giải thích: Begin, Question và Thought cùng agent_scratchpad khép lại prompt.

Tham chiếu: Mục Giải phẫu "cỗ máy lập luận" ReAct.

</details>

**Câu 3:** Vì sao phần tools cần mô tả đầy đủ hơn phần Action?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì thông tin arguments, kiểu argument, giá trị trả về và khi nào nên dùng tool mới giúp LLM quyết định chọn tool nào; còn Action chỉ cần đúng tên tool.

Giải thích: `[tool_names]` chỉ inject tên, còn phần tools phía trên chứa mô tả chi tiết.

Tham chiếu: Mục Giải phẫu "cỗ máy lập luận" ReAct.

</details>

**Câu 4:** agent_scratchpad là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nơi lưu toàn bộ lịch sử của agent: tool nào đã được chọn, vì sao, và các observation sau khi thực thi tool.

Giải thích: Nó được cập nhật liên tục để agent giữ tập trung từ vòng lặp 1 sang vòng lặp 2 — phần "ma thuật" của agent.

Tham chiếu: Mục Agent scratchpad — "ma thuật" của agent.

</details>

**Câu 5:** Trong Layer 3 này, cơ chế nào thay thế function calling?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chính ReAct prompt đóng vai trò reasoning engine — không dùng function calling nữa.

Giải thích: Các kỹ thuật few-shot prompting và chain of thought biến LLM thành reasoning agent.

Tham chiếu: Mục Hành trình tìm về prompt "đã khởi đầu tất cả".

</details>

Mình copy prompt này về để lát nữa sẽ chỉnh sửa một chút. Ở video tiếp theo, chúng ta sẽ implement **agent loop không dùng function calling**, chỉ dựa vào chính prompt này. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [Udemy — The ReAct Prompt](https://ua.udemy.com/course/langchain/learn/lecture/54977427)
- [LangChain Hub — hwchase17/react](https://smith.langchain.com/hub/hwchase17/react)
- [arXiv — ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
