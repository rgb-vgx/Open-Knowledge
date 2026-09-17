---
title: 'Bài 109 — Building Our LangGraph Graph'
course: langchain
lesson: 109
status: edited-verified
source: '109 - Building Our LangGraph Graph.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript de cap langgraph 1.0.5, MessagesState prebuilt; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://langchain-ai.github.io/langgraph/graphs/
- https://github.com/langchain-ai/langgraph
---

# Bài 109 — Building Our LangGraph Graph

> Nguồn: `109 - Building Our LangGraph Graph.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Ráp ba node draft → execute_tools → revise + conditional edge event_loop.
2. Giải thích cách đếm tool calls để giới hạn MAX_ITERATIONS=2.
3. Vẽ graph bằng Mermaid và invoke với đề AI-powered SOC.
4. Đọc tool call cuối để lấy answer trong `args`.

## 2. Nội dung chính theo mạch transcript

### 2.1. Ghi version

- Video quay lại cho LangGraph 1.0.5 — điều cần nhớ khi code cũ không chạy.

### 2.2. Imports và node functions

- `Literal`, `AIMessage`/`ToolMessage`, `END`/`START`, `StateGraph`, `MessagesState` từ prebuilt (khỏi tự viết TypedDict như section 14), hai chain bài 106–107, `execute_tools` (ToolNode) bài 108, `MAX_ITERATIONS = 2` (heuristic; tương lai thay bằng LLM-as-judge — hẹn section Agentic RAG).
- `draft_node(state)`: invoke `first_responder_chain` với `messages=state["messages"]`; message đầu là human input; response là object AnswerQuestion (answer + reflection + queries); append vào state.
- `revise_node(state)`: invoke `reviser_chain` với toàn bộ messages (vòng đầu gồm first answer + tool results), append tiếp.

### 2.3. Conditional edge event_loop

- Đếm tool calls trong messages (mỗi LLM response structured output = 1 tool call; ToolNode chạy search không sinh tool call mới).
- `> MAX_ITERATIONS` (2) thì END, còn lại về `execute_tools` — transcript tính: draft(1) → revise(2) → revise(3,4)... nên ngưỡng 2 cho hai vòng revise.
- Trả về `Literal["execute_tools", "end"]` (transcript ghi "endo" nhầm chính tả, ý là end).

### 2.4. Ráp graph và invoke

1. `StateGraph(MessagesState)`, add 3 nodes, `add_edge(START, "draft")`, `add_edge("draft", "execute_tools")`, `add_edge("execute_tools", "revise")`, `add_conditional_edges("revise", event_loop, ["execute_tools", END])`.
2. `compile()`, `get_graph().draw_mermaid()` đem sang mermaid.live vẽ.
3. Invoke `{"messages": [{"role": "user", "content": "Write about AI-powered SOC..."}]}` (LangChain cast thành HumanMessage), debug: message cuối là AIMessage có `tool_calls[0].args["answer"]` — in ra được bài Autonomous SOC (alert overload, giảm false positive ~50%, automate ~70% alert thường, MTTR dưới 5 phút, tier Darktrace/Vectra/Exabeam...). Transcript thừa nhận số liệu do LLM sinh, đọc demo thôi.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| `StateGraph(MessagesState)` + START/END + conditional edges | API dựng graph chuẩn LangGraph. | https://docs.langchain.com/langgraph |
| `ToolNode` chạy search concurrent | Vai trò ToolNode trong docs. | https://docs.langchain.com/langgraph |
| Đếm tool calls giới hạn vòng lặp | Heuristic của khóa học; docs không quy định ngưỡng này. | https://github.com/langchain-ai/langgraph |
| Vẽ Mermaid | `draw_mermaid`/`get_graph` có trong docs graph. | https://langchain-ai.github.io/langgraph/graphs/ |

> Hộp cập nhật: ngưỡng đếm tool call dễ lệch một vòng (bài 110 chỉ ra thực tế chạy 3 iterations dù đặt 2). Production nên thay bằng LLM-as-judge như transcript hẹn ở section 16. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Node/edge | Vai trò |
|---|---|
| draft | First response + critique + queries |
| execute_tools | Chạy Tavily concurrent |
| revise | Sửa bài bằng critique + search results |
| event_loop | Đếm tool calls, quá 2 thì END |

**Một câu chốt:** Graph Reflexion chỉ là vòng quay draft → tìm bằng chứng → sửa, có người đếm tool call đứng gác cổng dừng đúng lúc.

## 5. Câu hỏi tự kiểm tra

1. Vì sao section này dùng `MessagesState` thay vì tự viết TypedDict?
2. Vì sao ToolNode không làm tăng tool-call count?
3. `event_loop` đếm gì và ngưỡng 2 nghĩa là gì?
4. Message cuối khi invoke xong có dạng gì, lấy answer ở đâu?
5. Rủi ro của việc đếm tool call làm điều kiện dừng là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì state chỉ cần list messages — prebuilt có sẵn, khỏi viết lại TypedDict + reducer như bài 101.

**2.** Vì tool-call count đếm LLM response dạng function calling; ToolNode chỉ thực thi search và trả ToolMessage, không phải LLM gọi tool mới.

**3.** Đếm số tool calls (mỗi draft/revise = 1); quá 2 thì END. Transcript tính draft(1) → revise(2) là hết hai vòng, vòng sau nữa sẽ vượt ngưỡng.

**4.** AIMessage có `tool_calls[0]` là ReviseAnswer; answer nằm trong `args["answer"]` — code demo check `isinstance(last, AIMessage)` rồi in.

**5.** Đếm máy móc dễ lệch vòng (bài 110 chứng minh đặt 2 mà chạy 3) và không đánh giá được chất lượng bài — nên transcript hẹn thay bằng LLM-as-judge.

</details>

## 6. Bước tiếp theo

Bài 110 — *Tracing Our Graph* — đọc trace LangSmith 50s/35K tokens và lý giải vì sao đếm vòng lặp bị lệch.
