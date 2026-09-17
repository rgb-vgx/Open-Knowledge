---
title: 'Bài 019 — Agent Đầu Tiên Tools Và LLMs'
course: 'langchain'
lesson: 19
status: edited-verified
source: '019 - Creating Your First LangChain Agent Tools and LLMs.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/tools'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 019 — Agent Đầu Tiên Tools Và LLMs

> Biên soạn từ transcript "019 - Creating Your First LangChain Agent Tools and LLMs.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Viết một `@tool` search từ Python function thường với type hints và docstring.
- Giải thích vì sao docstring và type hints quyết định việc LLM chọn tool.
- Tạo agent bằng `create_agent(model, tools)` với `ChatOpenAI` làm reasoning engine.
- Invoke agent bằng `{"messages": human_message}` và hiểu vì sao message đơn vẫn chạy.

## 1. Imports — hai thứ tối thiểu của agent

```python
from dotenv import load_dotenv

load_dotenv()

from langchain.tools import tool
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
```

Giảng viên nêu: để create agent cần hai minimal things — tools và LLM làm reasoning engine. `HumanMessage` sẽ là input cho agent execution.

## 2. Tool là function agent có thể execute

Định nghĩa giữ nguyên lời giảng:

> Tool là function mà agent có thể execute — bất kỳ function nào ta muốn, với internal implementation tự viết.

Nhờ đó agent có endless possibilities: call API, search database, run code — total flexibility. Viết tool xong plug vào agent là boom, like magic agent execute được tool đó.

Cách tạo rất simple:

```python
@tool
def search(query: str) -> str:
    """A tool that searches over the internet. Args: query. Returns the search result."""
    print(query)
    return "Tokyo weather is sunny right now."
```

Đây là search tool nhận query, search internet, output response — hiện tại là static function return string "Tokyo weather is sunny", implementation thật viết ở video sau. Ba yêu cầu bắt buộc:

1. Regular Python function với type hints.
2. Docstrings: description function làm gì, arguments nào, output gì.
3. Decorate bằng `@tool` của LangChain để convert thành LangChain tool.

Rule of thumb: description càng explicit và unambiguous càng tốt để LLM dễ decide có call tool không. Bản hiện tại "not the best description" nhưng suffices cho example.

## 3. Vì sao docstring và type hints là matter nhất

> Underneath the hood, LLM sẽ dùng description và arguments type hints để choose có call tool không và với arguments nào.

State-of-the-art models làm việc này qua function calling — thay vì chỉ return text/pictures/videos, LLM còn return special response là function cần invoked. Transcript treat function calling như black box ở đây, hẹn elaborating nhiều trong khóa học.

LangChain làm gì với metadata: take name, arguments, description, format nicely rồi plug vào LLM call — chi tiết sẽ thấy sớm. Còn "exactly LangChain tool là gì" thì trust me, sẽ tới sau.

## 4. Tạo agent — chỉ ba dòng

```python
llm = ChatOpenAI()
tools = [search]
agent = create_agent(model=llm, tools=tools)
```

- `llm` là instance `ChatOpenAI` — supply LLM cho agent.
- `tools` là list chứa search tool.
- `agent` nhận model và list tools — boom, có agent ready to go với search capability (dù hiện tại chỉ return Tokyo sunny).

## 5. Invoke agent bằng messages

Agent là runnable:

```python
result = agent.invoke({"messages": HumanMessage(content="what is the weather in Tokyo")})
print(result)
```

Key là `messages`, value ở đây là một human message đơn chứ không phải list. Vẫn working vì LangChain under the hood cast thành list chứa single human message. Muốn thì bọc trong list cũng được.

```
HumanMessage ──> agent.invoke({"messages": ...}) ──> LLM + tools loop ──> result dict
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| `@tool` từ `langchain.tools` biến function + docstring + type hints thành tool | Import từ `langchain.tools`; docstring là model-facing explanation, type annotations mandatory, tên lowercase underscore | Vẫn đúng | [LangChain tools](https://docs.langchain.com/oss/python/langchain/tools) |
| `create_agent(model=llm, tools=[search])` với LLM là reasoning engine | Builder `create_agent` assembly từ model identifier, utility functions, starter directive; `model=` nhận provider string hoặc pre-initialized object | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Invoke bằng `{"messages": HumanMessage(...)}`, message đơn tự cast thành list | Launch với chat-history mapping `{"messages": [...]}` và inspect message blocks; hỗ trợ thread + checkpointer | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| LLM chọn tool qua function calling dùng description + type hints | Harness "get the model the right context at the right time"; ToolRuntime param riêng không lộ vào model schema | Vẫn đúng | [LangChain tools](https://docs.langchain.com/oss/python/langchain/tools) |

Code cập nhật (nếu có): giữ code gốc transcript. Tương đương version mới (import từ package riêng đã tách):

```python
from langchain.tools import tool
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent

@tool
def search(query: str) -> str:
    """A tool that searches over the internet. Args: query. Returns the search result."""
    print(query)
    return "Tokyo weather is sunny right now."

llm = ChatOpenAI()
agent = create_agent(model=llm, tools=[search])
result = agent.invoke({"messages": [HumanMessage(content="what is the weather in Tokyo")]})
```

Đổi duy nhất: bọc message trong list cho explicit (bản gốc message đơn vẫn chạy nhờ auto-cast).

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Muốn LLM hành động ra ngoài | Viết Python function rồi `@tool` hóa, plug vào agent |
| LLM không biết khi nào gọi tool | Docstring explicit + type hints chuẩn — model-facing explanation |
| Tạo agent phức tạp | `create_agent(model, tools)` — hai thứ tối thiểu là xong |
| Chưa biết input agent format nào | Dict `{"messages": ...}` với human message, đơn hay list đều chạy |

**Một câu chốt:** Agent đầu tiên chỉ gồm một function trang trí `@tool` và một LLM — còn lại là `create_agent` lo.

## Câu hỏi tự kiểm tra

1. Ba thành phần bắt buộc để biến function thành tool là gì?
2. Vì sao description phải explicit và unambiguous?
3. Hai thứ tối thiểu để create agent là gì?
4. Vì sao `invoke` với một message đơn vẫn chạy?
5. Function calling là gì theo mức hiểu của bài này?

<details><summary><b>Xem đáp án</b></summary>

**1.** Python function với type hints, docstrings (làm gì, args nào, output gì), và decorator `@tool` convert thành LangChain tool.

**2.** Vì LLM dùng description và type hints để decide có call tool không và với arguments nào — càng rõ thì model càng dễ chọn đúng qua function calling.

**3.** Tools và LLM làm reasoning engine — truyền vào `create_agent(model=llm, tools=[search])` là có agent ready to run.

**4.** Vì LangChain under the hood cast message đơn thành list chứa single human message; bọc sẵn trong list cũng được.

**5.** Extra capability của SOTA models: ngoài text còn return special response là function cần invoke — treat như black box ở bài này, sẽ elaborating sau.

</details>

## Bước tiếp theo

Bài 020 — *From Query to Answer: How a LangChain Agent Thinks* — đọc trace ChatOpenAI, tool call và ToolMessage.
