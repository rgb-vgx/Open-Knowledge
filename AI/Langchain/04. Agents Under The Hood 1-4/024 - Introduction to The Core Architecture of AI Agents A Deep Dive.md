---
title: 'Bài 024 — Giới thiệu kiến trúc core của AI Agent'
course: 'langchain'
lesson: 24
status: edited-verified
source: '024 - Introduction to The Core Architecture of AI Agents A Deep Dive.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/langchain/models'
- 'https://react-lm.github.io/'
---

# Bài 024 — Giới thiệu kiến trúc core của AI Agent

> Nguồn: `024 - Introduction to The Core Architecture of AI Agents A Deep Dive.md`

Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

- Hiểu 4 lớp bóc tách abstraction trong section: Layer 0 tới Layer 3.
- Phân biệt agent loop dùng LangChain primitives với bản raw không framework.
- Nắm vì sao `init_chat_model` và tool abstraction giúp đổi model dễ dàng.
- Hiểu vị trí của function calling và ReAct prompt trong lịch sử agent.
- Chuẩn bị tinh thần học hands-on, chạy code và xem trace.

## 1. Bối cảnh: từ Layer 0 tới section này

1. Giảng viên (Idan/Ethan) mở đầu: video này học cách agent chạy under the hood.
2. Layer 0 đã học trước đó: dùng `create_agent` abstraction, chỉ cần đưa model + tools (ví dụ Tavily search tool) là có agent chạy được.
3. Nhược điểm Layer 0: LangChain làm mọi thứ, người học không biết chuyện gì xảy ra bên trong.
4. Section này cam kết: bóc từng lớp (peel layer after layer) tới khi thấy hết "agent magic".
5. Phương pháp học được khuyến nghị mạnh: hands-on — tự viết code, chạy code, xem trace, đừng chỉ xem video.

## 2. Layer 1 — Agent loop với LangChain primitives

1. Lớp đầu tiên: tự triển khai agent loop, tức vòng lặp `while` chạy liên tục tới khi agent xong việc.
2. Vòng lặp này tận dụng function calling.
3. Triển khai bằng abstractions của LangChain để đỡ boilerplate: `tool`, tool binding, chat model, tool message.
4. Kết quả: phiên bản agent dùng LangChain primitives, vẫn là agent loop + function calling nhưng code gọn hơn raw rất nhiều.

## 3. Layer 2 — Cùng agent loop nhưng raw, không framework

1. Bóc tiếp một lớp: triển khai đúng agent loop + function calling như Layer 1 nhưng theo cách raw.
2. Không dùng bất kỳ framework nào, tự viết toàn bộ JSON schema.
3. Mục đích: thấy rõ giá trị LangChain mang lại — một interface duy nhất (single interface) để switch giữa các model.
4. Giảng viên nhấn mạnh: tính linh hoạt này rất quan trọng khi build agent production, vì model mới ra liên tục, cần đổi model với thay đổi code tối thiểu.

## 4. Layer 3 — ReAct prompt, không cần function calling

1. Bóc lớp sâu nhất: học function calling hoạt động under the hood ra sao.
2. Cách học: triển khai agent from scratch, không dùng function calling, chỉ dùng ReAct prompt + regular expressions + scratchpad.
3. Đây là cách agent đời đầu được triển khai khi mới ra mắt.
4. Hiểu lớp này giúp trả lời: vì sao mỗi lớp abstraction phía trên là cần thiết.
5. Giảng viên gọi đây là section yêu thích nhất vì cho hiểu biết sâu nhất về AI agent.

## 5. Quy ước thực hành cho cả section

1. Toàn bộ code nằm trên GitHub, link trong resources của video.
2. Giảng viên dùng Ollama với open-weights model như Qwen, thỉnh thoảng dùng OpenAI.
3. Người học có thể dùng bất kỳ model nào, miễn là model đó hỗ trợ function calling.
4. Yêu cầu duy nhất về model: phải support function calling, nếu không agent loop ở Layer 1 và 2 không chạy được.

> Câu chốt của giảng viên: học xong section này, bạn sẽ biết chính xác chuyện gì xảy ra under the hood khi triển khai agent của riêng mình.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Layer 0 dùng `create_agent`, chỉ cần model + tools là có agent | Docs hiện tại định nghĩa Agent = Model + Harness, build qua `create_agent` từ `langchain.agents`, ví dụ `create_agent(model, tools)` | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/agents |
| `init_chat_model` khởi tạo chat model chỉ bằng string, dễ switch vendor | Docs Models xác nhận `init_chat_model` với identifier `provider:model` plus kwargs, cùng object dùng solo hoặc nhét vào agent | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Tool + binding + chat model + tool message là primitives giúp đỡ boilerplate | Docs Models xác nhận flow `@tool` + `model.bind_tools([...])` + `ToolMessage` cho solo use; embedded use thì orchestration tự động | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Đổi model chỉ cần đổi string, LangChain cho single interface | Docs duy trì abstraction này; có thêm middleware `@wrap_model_call` để dynamic selection qua `request.override(model=...)` | Vẫn đúng | https://docs.langchain.com/oss/python/langchain/models |
| Cần model hỗ trợ function calling mới chạy được agent loop | Docs Ollama nêu chỉ variant được gắn cờ capable mới dùng được; OpenAI docs nêu control qua `tool_choice`, `parallel_tool_calls` | Vẫn đúng | https://docs.langchain.com/oss/python/integrations/chat/ollama |

### Code cập nhật (nếu có)

Không đổi logic. Cách viết hiện nay theo docs 1.x:

```python
from langchain.agents import create_agent
from langchain.tools import tool

@tool
def search(query: str) -> str:
    """Search the web."""
    ...

agent = create_agent("openai:gpt-5", tools=[search])
result = agent.invoke({"messages": [{"role": "user", "content": "hello"}]})
```

## Tóm tắt một trang

| Khái niệm (phiên bản mới) | Ý chính |
|---|---|
| Agent = Model + Harness | Model gọi tools theo vòng lặp tới khi xong task; harness lo context đúng lúc |
| `create_agent` | Entry point chuẩn hiện nay trong `langchain.agents`, thay cho `AgentExecutor` đời cũ |
| `init_chat_model` | Khởi tạo chat model bằng string `provider:model`, dễ switch vendor |
| Layer 1 | Agent loop + function calling bằng LangChain primitives |
| Layer 2 | Agent loop + function calling raw, tự viết JSON schema |
| Layer 3 | Agent bằng ReAct prompt + regex + scratchpad, không cần function calling |

**Câu chốt: muốn hiểu agent sâu thì phải bóc từng lớp abstraction, từ `create_agent` xuống agent loop, xuống raw function calling, xuống ReAct prompt.**

## Câu hỏi tự kiểm tra

1. Layer 0 trong khóa học dùng abstraction nào?
2. Layer 1 triển khai cái gì, bằng công cụ gì?
3. Layer 2 khác Layer 1 ở điểm nào?
4. Layer 3 dùng kỹ thuật gì thay cho function calling?
5. Điều kiện bắt buộc của model để chạy Layer 1 và 2 là gì?

<details><summary><b>Xem đáp án</b></summary>

1. `create_agent` — chỉ cần đưa model + tools.
2. Agent loop (vòng while) + function calling, bằng LangChain primitives (tool, binding, chat model, tool message).
3. Cùng logic nhưng raw, không framework, tự viết JSON schema.
4. ReAct prompt + regular expressions + scratchpad.
5. Model phải hỗ trợ function calling / tool calling.

</details>

## Bước tiếp theo

Sang Bài 025 — agent e-commerce mẫu của cả section (2 tools: giá sản phẩm và discount tier), trước khi vào Bài 026 lý thuyết ReAct.
