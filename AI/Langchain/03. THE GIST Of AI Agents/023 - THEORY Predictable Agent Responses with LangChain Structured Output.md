---
title: 'Bài 023 — Chiến Lược Structured Output'
course: 'langchain'
lesson: 23
status: edited-verified
source: '023 - THEORY Predictable Agent Responses with LangChain Structured Output.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/structured-output'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 023 — Chiến Lược Structured Output

> Biên soạn từ transcript "023 - THEORY Predictable Agent Responses with LangChain Structured Output.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Phân biệt hai implementations của structured output: tool strategy và provider strategy.
- Giải thích provider strategy: ủy thác cho native structured output API của model vendor.
- Giải thích tool strategy: ép schema bằng cách bắt LLM luôn gọi một tool duy nhất.
- Nêu quy tắc chọn mặc định của LangChain và các schema types được hỗ trợ.

## 1. Structured output cho phép điều gì

Ôn lại một dòng: structured output allows agents return data in specific, predictable format — thay vì raw-text answer ta nhận Pydantic object, JSON response hay dataclass, thứ downstreamable vào application để dùng sau. Bài 022 đã thấy cách dùng qua `create_agent`; bài này dive deeper về implementation.

## 2. Hai chiến lược implementation

| Chiến lược | Cơ chế giữ nguyên lời giảng |
|---|---|
| **Provider strategy** | Dùng native model structured output capabilities — model provider APIs với structured output argument, họ làm heavy loading để response đúng format |
| **Tool strategy** | Dùng tool calling under the hood — workaround khi model không có structured output API |

LangChain choose by default provider strategy, unless ta specify otherwise.

## 3. Provider strategy — đẩy trách nhiệm cho vendor

Hầu hết top-tier models offer support structured output natively. Ta dùng API của họ với structured output argument, họ lo mọi thứ để response đúng format muốn.

Schema types nhận được (giảng viên show examples cho cả bốn):

- Pydantic model
- dataclass
- TypedDict
- JSON scheme

Vì model trong `create_agent` mà support structured output thì LangChain sẽ dùng cách này — shifting all responsibility cho model provider return good answer. Giảng viên đùa: nếu get wrong answer thì talk to vendor, not LangChain.

## 4. Tool strategy — ép schema bằng one single tool

Khi some models không offer structured output API — nhưng all top-tier models support tool calling — thì có workaround, và đây actually là how everything evolved:

1. LangChain under the hood dùng tool calling với schema của object muốn.
2. Provide one single tool cho LLM.
3. Nói với LLM they always need to choose that tool.
4. Bằng cách đó forcing LLM enforce schema đã gửi.

Case này cũng supports Pydantic models, dataclass, TypedDict và JSON scheme. LangChain implement sẵn cho ta.

```
response_format=Schema ──> model support native? ──> YES: ProviderStrategy ──> NO: ToolStrategy (single forced tool)
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Hai implementations: tool strategy (tool calling) và provider strategy (native), default là provider | Native-vendor path via ProviderStrategy dependable hơn nơi offered; invocation path via ToolStrategy cho mọi host hỗ trợ tool use; chỉ supply type thì framework pick native khi host advertise, else fallback invocation | Vẫn đúng | [Structured output](https://docs.langchain.com/oss/python/langchain/structured-output) |
| Schema types: Pydantic, dataclass, TypedDict, JSON schema | Shape bằng Pydantic, dataclass, TypedDict hoặc JSON Schema dict; JSON Schema dict cần explicit wrapper, bare dict không auto-detect | Vẫn đúng | [Structured output](https://docs.langchain.com/oss/python/langchain/structured-output) |
| Tool strategy: single tool + force LLM luôn chọn để enforce schema | Emulates formatting qua function calls với schema object, tailor confirmation bằng `tool_message_content`, retry qua `handle_errors` | Vẫn đúng | [Structured output](https://docs.langchain.com/oss/python/langchain/structured-output) |
| Dùng qua `response_format` ở `create_agent` (Bài 022) | Request typed returns bằng `response_format`, validated value ở `structured_response` | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |

Code cập nhật (nếu có): không có code runnable trong transcript — chỉ mô tả kiến trúc. Minh họa tương đương version mới:

```python
agent = create_agent(model=llm, tools=tools, response_format=AgentResponse)
```

Mặc định framework tự chọn ProviderStrategy khi model advertise native structured output, ngược lại fallback ToolStrategy.

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Model xịn có native structured output | ProviderStrategy: đẩy schema cho vendor enforce, dependable nhất |
| Model không có native API nhưng biết tool calling | ToolStrategy: single forced tool ép schema, cách everything evolved |
| Không muốn tự chọn strategy | Cứ supply type cho `response_format`, framework pick native nếu được else fallback |
| Cần nhiều dạng schema | Pydantic, dataclass, TypedDict, JSON Schema đều được (JSON dict cần explicit wrapper) |

**Một câu chốt:** Structured output chỉ có hai đường — nhờ vendor làm hộ hay ép model gọi một tool duy nhất — và LangChain tự chọn đường tốt nhất cho model bạn dùng.

## Câu hỏi tự kiểm tra

1. Hai chiến lược structured output là gì?
2. Provider strategy ủy thác việc gì cho ai?
3. Tool strategy ép schema bằng cách nào?
4. Mặc định LangChain chọn chiến lược nào?
5. Bốn schema types được hỗ trợ là gì?

<details><summary><b>Xem đáp án</b></summary>

**1.** Tool strategy (dùng tool calling under the hood) và provider strategy (dùng native model structured output capabilities).

**2.** Ủy thác cho model provider: dùng structured output argument của vendor API, họ làm heavy loading để response đúng format — sai thì talk to vendor.

**3.** Dùng tool calling với schema object, provide one single tool và bắt LLM always choose that tool — forcing LLM enforce schema đã gửi.

**4.** Provider strategy, unless specify otherwise; supply mỗi type thì pick native khi host advertise khả năng, else fallback invocation.

**5.** Pydantic model, dataclass, TypedDict và JSON scheme (JSON Schema dict cần explicit wrapper).

</details>
