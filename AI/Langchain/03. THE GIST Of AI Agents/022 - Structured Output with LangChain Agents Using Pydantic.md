---
title: 'Bài 022 — Structured Output Với Pydantic'
course: 'langchain'
lesson: 22
status: edited-verified
source: '022 - Structured Output with LangChain Agents Using Pydantic.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/langchain/structured-output'
---

# Bài 022 — Structured Output Với Pydantic

> Biên soạn từ transcript "022 - Structured Output with LangChain Agents Using Pydantic.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Giải thích vì sao agent cần structured output thay vì raw text.
- Định nghĩa nested Pydantic models `Source` và `AgentResponse` với `Field` descriptions.
- Thêm `response_format=AgentResponse` vào `create_agent` để nhận structured response.
- Đọc kết quả ở `result["structured_response"]` trong debugger và LangSmith trace.

## 1. Vì sao cần structured output

Hầu hết lúc build agents và AI applications, LLMs respond in text. Muốn take text đó downstream vào application — serialize, render in user interface — thì cần structure: JSON object hay Pydantic object có thể programmatically parse và work with. Đó là việc của video này.

LangChain cho cách rất easy: thêm argument `response_format` vào `create_agent`, provide schema muốn (JSON schema hay Pydantic object), rồi magically response agent output sẽ adhere to schema đó. Video này chỉ reviewing interface — how to use; under the hood hẹn section sau.

## 2. Định nghĩa nested Pydantic models

```python
from typing import List
from pydantic import BaseModel, Field

class Source(BaseModel):
    """Scheme for a source used by the agent."""
    url: str = Field(description="The URL of the source")

class AgentResponse(BaseModel):
    """Scheme for the agent response."""
    answer: str = Field(description="The agent's answer to the query")
    sources: List[Source] = Field(
        default_factory=list,
        description="The list of sources used to generate the answer",
    )
```

Diễn giải giữ nguyên lời giảng:

- `BaseModel` cho base class để inherit khi define structured data scheme — cung cấp data parsing, serialization, automatic type validations.
- `Field` cho add metadata vào attribute — descriptions giúp LLM hiểu what to put in field đó.
- `Source` represent nguồn answer: một field `url`.
- `AgentResponse` là nested object: `answer` (string) + `sources` (list of `Source`) với `default_factory=list` — không provide sources thì populate empty list.
- Giảng viên thừa nhận có typo trong description ("an answer") nhưng don't worry, LLM handle easily.

## 3. Gắn vào agent bằng `response_format`

```python
agent = create_agent(model=llm, tools=tools, response_format=AgentResponse)
```

Chỉ thêm argument `response_format` là `AgentResponse` class đã tạo — that's it, works like magic. Agent không còn return string như trước mà return `AgentResponse` object để downstream (serialize rồi return từ server, render ở front end).

Chạy ở debug mode, đặt breakpoint trước `print`:

- `result` có new key `structured_response`, type là `AgentResponse` — gồm `answer` field và `sources` list.
- Mở debug console: `type(result["structured_response"])` là `AgentResponse`; in ra thấy `answer` và `sources[0].url` — mở URL ra là job application (không còn accepting candidates nhưng đúng tìm LangChain developers).

## 4. Nhìn trong LangSmith trace

Mở trace mới nhất, xuống result cuối: có additional field `structured_response` gồm `answer` và `sources` list, mỗi object có `url` LinkedIn job posting — very similar to debugger. Giảng viên cho quick hint: under the hood sẽ dùng function calling, more ở sections sau.

```
Pydantic schema ──> response_format ──> agent ──> result["structured_response"] ──> answer + sources[].url
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| `create_agent(..., response_format=Answer)` với Pydantic class, đọc ở `result["structured_response"]` | Request typed returns bằng `response_format`; validated object ở `result["structured_response"]`, ví dụ Pydantic `Answer` với `summary`, `confidence` | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Schema có thể là Pydantic, JSON schema; nested models + `Field` descriptions cho LLM | Shape định nghĩa bằng Pydantic, dataclass, TypedDict hoặc JSON Schema dict; JSON Schema dict cần explicit wrapper | Vẫn đúng | [Structured output](https://docs.langchain.com/oss/python/langchain/structured-output) |
| Under the hood dùng function calling (hint) | Invocation path (ToolStrategy) emulates formatting qua function calls, works với mọi host hỗ trợ tool use | Vẫn đúng | [Structured output](https://docs.langchain.com/oss/python/langchain/structured-output) |

Code cập nhật (nếu có): giữ code gốc transcript. Tương đương version mới không đổi:

```python
from typing import List
from pydantic import BaseModel, Field

class Source(BaseModel):
    """Scheme for a source used by the agent."""
    url: str = Field(description="The URL of the source")

class AgentResponse(BaseModel):
    """Scheme for the agent response."""
    answer: str = Field(description="The agent's answer to the query")
    sources: List[Source] = Field(default_factory=list, description="The list of sources used to generate the answer.")

agent = create_agent(model=llm, tools=tools, response_format=AgentResponse)
result = agent.invoke({"messages": [HumanMessage(content=query)]})
answer = result["structured_response"]
```

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Agent trả raw text, app không parse được | Thêm `response_format` với Pydantic schema — output thành object downstream được |
| Cần answer kèm nguồn grounded | Nested model: `AgentResponse(answer, sources: List[Source])`, descriptions guide LLM |
| Không biết đọc kết quả ở đâu | `result["structured_response"]` — type đúng class đã khai báo |
| Muốn kiểm chứng trên trace | LangSmith hiện thêm field `structured_response` ở result cuối |

**Một câu chốt:** Một argument `response_format` biến agent từ máy nhả text thành máy trả object có schema — và schema đó chính là Pydantic models bạn viết.

## Câu hỏi tự kiểm tra

1. Vì sao agent cần structured output?
2. `BaseModel` và `Field` mỗi class làm gì?
3. Vì sao `sources` dùng `default_factory=list`?
4. Thêm gì vào `create_agent` để bật structured output và đọc kết quả ở đâu?
5. Descriptions trong `Field` phục vụ ai?

<details><summary><b>Xem đáp án</b></summary>

**1.** Vì raw text không downstream được — muốn serialize, render UI hay parse programmatically thì cần JSON/Pydantic object thay vì text.

**2.** `BaseModel` cho base class define schema, kèm parsing, serialization, automatic type validations; `Field` add metadata (descriptions) vào attribute.

**3.** Để khi tạo `AgentResponse` mà không provide sources thì attribute populate với empty list thay vì lỗi thiếu field.

**4.** Thêm `response_format=AgentResponse`; kết quả là `result["structured_response"]` có type `AgentResponse` với `answer` và `sources`.

**5.** Phục vụ LLM — giúp model hiểu what to put in field đó, từ đó output adhere đúng schema.

</details>

## Bước tiếp theo

Bài 023 — *THEORY: Predictable Agent Responses with LangChain Structured Output* — hai chiến lược tool strategy và provider strategy đằng sau `response_format`.
