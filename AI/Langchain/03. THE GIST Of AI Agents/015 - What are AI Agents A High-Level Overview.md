---
title: 'Bài 015 — AI Agents Tổng Quan'
course: 'langchain'
lesson: 15
status: edited-verified
source: '015 - What are AI Agents A High-Level Overview.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/agents'
- 'https://docs.langchain.com/oss/python/langchain/tools'
- 'https://docs.langchain.com/oss/python/langchain/overview'
---

# Bài 015 — AI Agents Tổng Quan

> Biên soạn từ transcript "015 - What are AI Agents A High-Level Overview.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Định nghĩa agent theo quan điểm LangChain ecosystem.
- Phân biệt agent với chain thường: ai quyết định control flow.
- Giải thích ReAct (reasoning + acting) và vòng lặp iterative loop qua tools.
- Kể tên abstractions LangChain cung cấp: tools, pre-built ReAct agents, LangGraph.

## 1. Vì sao định nghĩa agents gây tranh cãi

Giảng viên mở đầu bằng câu đùa giữ nguyên:

> Hỏi hai người AI agents là gì sẽ nhận mười câu trả lời khác nhau — nhưng mười câu đó đều có common grounds.

Video này trình bày $0.02 của giảng viên, aligned với LangChain ecosystem. Ông tự nhận video này waving hands, chưa show code hay demo — intro của intro, mục đích là common grounds trước khi vào demo search agent ở video sau.

## 2. Định nghĩa agent

> Agent là software system dùng LLM như reasoning engine để decide actions nào cần take, rồi execute những actions đó.

Điểm mấu chốt lặp lại hai lần trong transcript:

> Trong agent, chính LLM decide what to do next.

Khác với simple chains/Runnables nơi sequence of actions hardcoded. So sánh trực tiếp:

| Chain thường | Agent |
|---|---|
| Developer define entire control flow, cái gì happen next | LLM dynamically determine tools/steps nào cần để solve task |
| LLM chỉ dùng ở một step (summarize, generate text) | LLM là reasoning engine quyết định mọi bước |
| Luồng cố định | Iterative loop tới khi task complete |

## 3. Biểu hiện cốt lõi: LLM + tools

Core manifestation ngoài real world: lấy LLM, equip nó với tools — tool gọi API, search, đọc database, write và execute code. Vì tools là functions ta pre-write với total flexibility, nên có thể cho LLM endless possibilities, basically superpowers làm anything, mimic human. Giảng viên gọi ý tưởng này mind blowing vì mở ra automation cho complex stuff trước đây không làm được.

## 4. ReAct — reasoning + acting

ReAct là agent architecture cụ thể theo ReAct paradigm. Tên ReAct comes from reasoning and acting, bắt nguồn từ một paper là stepping stone của implementing agents.

Mạch high-level:

```
reason (chain-of-thought) ──> decide acting ──> execute tools ──> lặp lại tới khi xong
```

- Kết hợp reasoning power của LLM để think through problem với chain-of-thought prompting (chi tiết ở theoretical section).
- Sau khi reason, LLM decides what need to do (acting).
- Ta go do what LLM tells us — actions manifested through tools.
- Tools là abilities cho LLM: API call, database, chạy Python code đã viết sẵn.
- Toàn bộ diễn ra trong iterative loop until task complete.

LangChain và LangGraph cung cấp pre-built ReAct agents dễ create và customize: invoke tools, handle complex workflows, maintain state over long-running tasks.

## 5. Lộ trình section này và sau đó

Giảng viên chốt:

- Section này chỉ học interface: how to equip LLM với tools, how to create và get started really quick.
- Section afterwards dive một layer deeper: magic của agents under the hood, every bits and bytes.
- ReAct là most important architecture, basis cho everything; đây cũng là most important topic trong LLM development applications theo ông.

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Agent = LLM reasoning engine decide + execute actions, khác chain hardcoded | Docs: "an agent is a model calling tools in a loop until a given task is complete", architecture "Agent = Model + Harness" | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Equip LLM với tools (API, search, DB, code) để có superpowers | `create_agent(model, tools, prompt)` assembly từ model + functions; harness "get the model the right context at the right time" | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |
| Tools là pre-written functions, `@tool` với docstring + type hints cho function calling | Import `@tool` từ `langchain.tools`, docstring là model-facing explanation, type annotations mandatory | Vẫn đúng | [LangChain tools](https://docs.langchain.com/oss/python/langchain/tools) |
| Pre-built ReAct agents trên LangGraph, maintain state long-running | `create_agent` powered bởi battle-tested LangGraph ReAct under the hood; hỗ trợ thread + checkpointer, middleware | Vẫn đúng | [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview) |

Code cập nhật (nếu có): không có — bài này không chứa code, chỉ định nghĩa.

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Mỗi người định nghĩa agent một kiểu | Chốt common ground: model calling tools in loop tới khi xong |
| Chain cứng, muốn luồng tự quyết theo task | Agent: LLM làm reasoning engine, tự chọn tools/steps |
| LLM đơn lẻ không hành động ra ngoài | Equip tools: API, search, DB, code — superpowers |
| Muốn pattern chuẩn thay vì tự chế loop | ReAct (reasoning + acting) qua `create_agent` trên LangGraph |

**Một câu chốt:** Agent khác chain ở một điểm duy nhất — ai quyết định bước tiếp theo: developer hay chính LLM.

## Câu hỏi tự kiểm tra

1. Định nghĩa agent theo video này là gì?
2. Phân biệt vai trò LLM trong chain và trong agent.
3. ReAct viết tắt của gì và gồm mấy pha?
4. Tools là gì và vì sao nói cho LLM "superpowers"?
5. Section này và section sau phân công thế nào?

<details><summary><b>Xem đáp án</b></summary>

**1.** Software system dùng LLM như reasoning engine để decide actions rồi execute chúng — model calling tools in loop tới khi task complete theo docs mới.

**2.** Trong chain, developer define entire control flow, LLM chỉ dùng ở một step; trong agent, LLM dynamically determine tools/steps và decide what to do next.

**3.** Reasoning and acting: reason bằng chain-of-thought trước, rồi decide acting, execute qua tools, lặp iterative loop tới khi xong.

**4.** Tools là pre-written functions (API call, search, DB, chạy code) equip cho LLM; nhờ đó LLM vượt khỏi text-in text-out để hành động ra ngoài như human.

**5.** Section này chỉ học interface (equip LLM với tools, create agent nhanh); section sau dive under the hood every bits and bytes của ReAct và các iterations.

</details>

## Bước tiếp theo

Bài 016 — *What are we building: AI Job Search Agent* — demo ChatGPT search grounded kèm sources chống hallucination.
