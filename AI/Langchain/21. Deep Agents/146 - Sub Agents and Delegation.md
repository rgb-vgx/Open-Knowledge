# 🤝 Sub Agents & Hierarchical Delegation: Khi Deep Agent biết "ủy quyền"

> Nguồn: `146-Deep-Agents-Sub-Agents-and-Hierarchical-Delegation.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/54113269)

Chào các bạn, mình là Eden đây! Chúng ta vừa nói về Planning Tool, còn hôm nay mình muốn giới thiệu một đặc điểm khác cũng quan trọng không kém: khả năng sử dụng **Sub Agents (agent con)**.

---

### 🧩 Sub Agents & Hierarchical Delegation

Deep Agents sử dụng khái niệm **Sub Agents**, qua đó mang lại thứ được gọi là **hierarchical delegation (ủy quyền theo tầng bậc)**. Nghĩa là bản thân Deep Agent có thể **"sinh" ra những phiên bản mới của chính nó**, nhưng những phiên bản này là các Sub Agent **chuyên biệt hóa cho từng tác vụ tập trung**.

Mỗi Sub Agent sẽ có **system prompt riêng**, **description riêng**, và **bộ tool riêng** mà nó được phép dùng. Mình phải nói ý tưởng này thực sự thiên tài — vì nó giống hệt cách chúng ta vận hành ngoài đời thực.

| Thành phần | Deep Agent chính | Sub Agent |
|---|---|---|
| Vai trò | Điều phối và ủy quyền | Thực thi một tác vụ tập trung |
| System prompt | Của agent chính | Riêng, chuyên biệt |
| Bộ tool | Theo cấu hình của agent chính | Riêng, chỉ gồm tool được phép |
| Context | Chỉ nhận kết quả cuối cùng | Chạy trong context window riêng |
| Khả năng chạy song song | Giao việc cho nhiều sub agent | Độc lập, tách biệt |

Khi muốn giao một việc cho người khác, chúng ta cần đảm bảo người đó có **đúng kỹ năng và đúng công cụ**, và quan trọng không kém: chúng ta phải biết **giải thích cho họ cần làm gì**.

---

### 🏠 Chuyện mái nhà của mình

Mình lấy ví dụ từ chính nhà mình. Mình không phải tay thợ, chẳng có chút khéo léo nào, khoan tường cũng không biết khoan — mình cực kỳ tệ mấy chuyện này.

Nhà mình có một cửa sập (hatch) trên trần tầng trên cùng. Mỗi khi mưa, hạt mưa đập vào tấm cửa sập phủ sợi thủy tinh (fiberglass) ấy và gây ra tiếng động rất to, vang khắp nhà. Để xử lý, mình mua **cỏ nhân tạo (synthetic grass)** phủ lên tấm fiberglass, giúp tiếng mưa rơi nhẹ đi. Nhưng trần nhà khá cao, phải có loại **thang đặc biệt mở chéo** mới leo lên được... và mình thì chịu.

Thế là mình gọi **bố vợ** — người cực giỏi khoản này. Ông mang theo **đồ nghề riêng**: con dao rọc giấy (box cutter) để cắt cỏ nhân tạo cho vừa kích thước, cái thang riêng để leo lên trần, và tự xử lý hết mọi thứ.

Các bạn có thấy giống không? Mình viết một tin nhắn mô tả tác vụ cần giúp — đó chính là **prompt**. Ông đến với đồ nghề riêng và "system prompt" riêng (tức kỹ năng của ông). Ông làm việc đó **khi mình thậm chí không có mặt**, vì ông có chìa khóa nhà. Kết quả cuối cùng: mọi thứ được sửa xong, mưa xuống không còn vang khắp nhà nữa.

---

### ⚙️ Context Isolation: bài học từ câu chuyện

Điểm quan trọng nhất: trong lúc ông làm việc, **mình không hề biết chuyện gì đang diễn ra**. Về mặt context, ông đang làm việc trong **context isolation (cô lập ngữ cảnh)** — mình chỉ nhận được **kết quả cuối cùng**.

Sub Agents hoạt động y hệt như vậy:

* Chúng làm việc **tách biệt**, chạy trong **context window riêng** mà không làm ô nhiễm context của agent chính.
* Chúng **chuyên biệt hóa**: mỗi Sub Agent có system prompt và bộ tool riêng, có thể khác nhau giữa các Sub Agent.
* Chúng chạy **tool calling loop** và **ReAct loop** của riêng mình, rồi chỉ trả về **kết quả cuối cùng**, không kèm các bước trung gian.

```mermaid
flowchart LR
    A[Deep Agent chính] -->|Giao việc qua prompt| B[Sub Agent chuyên biệt]
    B --> C[Chạy tool call và ReAct loop riêng]
    C --> D[Chỉ trả về kết quả cuối cùng]
    D --> A
```

Nhờ mẫu ủy quyền này, agent chính giữ được **context isolation**, không bị công việc chuyên biệt làm xao nhãng "attention", đồng thời có thể **chạy song song** nhiều tác vụ. Kết quả là chất lượng, hiệu quả và độ sâu của câu trả lời đều tăng vọt.

Một ví dụ kỹ thuật với **Claude Code**: nó có thể tạo một **exploration agent (agent thăm dò)** để truy tìm các **authentication pattern (mẫu xác thực)**, và agent này chạy song song cùng lúc với agent chính. Điều đó cho thấy Claude Code cũng đang triển khai kiến trúc này, với khả năng hỗ trợ Sub Agents cực kỳ mạnh mẽ và hữu ích.

---

### ⚠️ Đừng lo nếu thấy quá nhiều lý thuyết!

Mình biết mình đang nói khá nhiều lý thuyết, "vung tay" khá nhiều mà chưa đụng đến phần triển khai. *Các bạn đừng lo nhé — phần implementation chắc chắn sẽ đến, và chúng ta sẽ thấy chính xác cách hiện thực hóa những "phép màu" đó.*

---

### 💻 Code mẫu đầy đủ — `03_subagents.py`

Toàn bộ code của bài nằm trong file `03_subagents.py` (tham khảo từ repo chính thức của khóa học; chạy kèm `models.py` cùng repo):

**`models.py`**

```python
"""Model configuration for the Agent Harnesses chapter.

Every example in this project does `from models import model` and hands that
`model` straight to `create_deep_agent(...)`. Keeping the model in one place means
you swap providers or model names here once, and all five examples follow.

Default: OpenAI `gpt-5.6-sol`. Requires `OPENAI_API_KEY` in your `.env` (see
`.env.example`). To use a different model, change the string below — for example
`"openai:gpt-5.6-mini"` for a cheaper run, or an Anthropic model such as
`"anthropic:claude-haiku-4-5"` (set `ANTHROPIC_API_KEY` instead).
"""

from pathlib import Path

from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).resolve().parent / ".env", override=True)

from langchain.chat_models import init_chat_model

# The single model shared by every example in this project.
# Requires OPENAI_API_KEY in .env.
model = init_chat_model("openai:gpt-5.6-sol", reasoning_effort="none")
```

**`03_subagents.py`**

```python
"""03 · Subagents and hierarchical delegation.

The second knob: `subagents=`. A deep agent can spawn specialized workers, each
with its OWN system prompt and its OWN tools, that run in an isolated context and
return only their final result — not their intermediate reasoning. This is the
delegation pattern from the chapter: the main agent hands off a scoped job, the
subagent does the messy work in its own context window, and the main agent's
context stays clean.

Here a coordinator delegates individual topic lookups to a `fact-researcher`
subagent. The researcher owns the lookup tool; the coordinator does not. It can
only get facts by delegating through the built-in `task` tool. We use a small
in-memory knowledge base so the example runs with no key beyond OPENAI_API_KEY.
"""

from deepagents import create_deep_agent
from langchain_core.tools import tool

from models import model

# --- The subagent's private tool -------------------------------------------
# A stand-in for a real search / database tool. It belongs ONLY to the
# researcher subagent (see `tools=` below), so the coordinator cannot call it.
_KNOWLEDGE_BASE = {
    "planning tool": "Deep agents externalize a structured todo list (write_todos) "
    "with per-item status, updated between steps, instead of planning implicitly.",
    "subagents": "Deep agents spawn specialized workers with their own prompt and "
    "tools that run in an isolated context and return only a final result.",
    "filesystem": "Deep agents write intermediate artifacts to a virtual filesystem "
    "so bulky material stays out of the model's context window.",
    "system prompt": "Deep agents rely on a large, curated system prompt that "
    "encodes identity, scope, a reasoning framework, and heuristics.",
}


@tool
def lookup_fact(topic: str) -> str:
    """Look up a factual summary about a deep-agent topic from the knowledge base.
    Recognizes any topic that contains a known keyword (e.g. 'the filesystem
    capability' matches 'filesystem')."""
    print(f"    >> [researcher] lookup_fact(topic='{topic}')")
    key = topic.lower().strip()
    for name, fact in _KNOWLEDGE_BASE.items():
        if name in key or key in name:
            return fact
    return f"No entry found for '{topic}'."


# --- The specialized subagent ----------------------------------------------
# Note the key is `system_prompt` (its own brain, never inherited) and `tools`
# overrides the inherited set with just the lookup tool.
fact_researcher = {
    "name": "fact-researcher",
    "description": (
        "Look up a factual summary for ONE deep-agent topic and return a single "
        "polished sentence. Delegate one topic per call."
    ),
    "system_prompt": (
        "You research one topic at a time. Call lookup_fact with the given "
        "topic, then return ONE clear sentence based only on what it returns. "
        "Do not add facts of your own."
    ),
    "tools": [lookup_fact],
}


# --- The coordinator (main agent) ------------------------------------------
COORDINATOR_PROMPT = (
    "You are a coordinator. You do NOT look up facts yourself — you have no "
    "lookup tool. For each topic the user asks about, delegate to the "
    "fact-researcher subagent using the task tool (one topic per delegation). "
    "Collect the returned sentences and combine them into a short bulleted "
    "summary. Keep your own context focused on coordination."
)

agent = create_deep_agent(
    model=model,
    system_prompt=COORDINATOR_PROMPT,
    subagents=[fact_researcher],
)

result = agent.invoke(
    {
        "messages": [
            {
                "role": "user",
                "content": "Summarize two deep-agent capabilities: subagents "
                "and the filesystem.",
            }
        ]
    }
)

print("\n=== Coordinator's assembled summary ===")
print(result["messages"][-1].content)
```

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Hierarchical delegation trong deep agents nghĩa là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Deep Agent có thể sinh ra những phiên bản chuyên biệt của chính nó — các Sub Agent — cho từng tác vụ tập trung.

Giải thích: Đây là ủy quyền theo tầng bậc, giống cách con người giao việc cho người có đúng kỹ năng.

Tham chiếu: Mục Sub Agents & Hierarchical Delegation.

</details>

**Câu 2:** Mỗi Sub Agent được trang bị những gì riêng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** System prompt riêng, description riêng và bộ tool riêng.

Giải thích: Nhờ chuyên biệt hóa, sub agent làm tác vụ của mình tốt hơn.

Tham chiếu: Mục Sub Agents & Hierarchical Delegation.

</details>

**Câu 3:** Context isolation của Sub Agent thể hiện thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nó chạy trong context window riêng, không ô nhiễm context của agent chính; agent chính chỉ nhận kết quả cuối cùng.

Giải thích: Như bố vợ sửa mái nhà khi Eden không có mặt — chỉ thấy thành quả.

Tham chiếu: Mục Context Isolation.

</details>

**Câu 4:** Vì sao mẫu ủy quyền giúp agent chính hoạt động tốt hơn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Giữ context isolation, không bị công việc chuyên biệt làm xao nhãng attention và có thể chạy song song.

Giải thích: Kết quả là chất lượng, hiệu quả và độ sâu câu trả lời đều tăng.

Tham chiếu: Mục Context Isolation.

</details>

**Câu 5:** Claude Code minh họa kiến trúc này như thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nó tạo exploration agent truy tìm authentication pattern, chạy song song cùng agent chính.

Giải thích: Cho thấy Claude Code cũng hỗ trợ Sub Agents mạnh mẽ.

Tham chiếu: Mục Context Isolation.

</details>

Trước mắt, mình muốn các bạn nắm trọn khái niệm và giao diện, để thấy những khả năng này hiển hiện ra sao trong các công cụ quen thuộc hằng ngày. Ở bài tiếp theo, mình sẽ đi sâu vào **luồng context (context flow)** khi dùng Sub Agents, để các bạn thấy cách chúng giúp tránh phình context và đạt được **context isolation** như thế nào. 🚀

## Nguồn tham khảo

- [Udemy — Sub Agents and Hierarchical Delegation](https://ua.udemy.com/course/langchain/learn/lecture/54113269)
- [LangChain Docs — Deep Agents subagents](https://docs.langchain.com/oss/python/deepagents/subagents)
- [LangChain Docs — Deep Agents overview](https://docs.langchain.com/oss/python/deepagents/overview)
