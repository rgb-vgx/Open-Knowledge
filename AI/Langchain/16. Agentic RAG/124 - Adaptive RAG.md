---
title: 'Bài 124 — Adaptive RAG'
course: langchain
lesson: 124
status: edited-verified
source: '124 - Adaptive RAG.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript dung Literal, set_conditional_entry_point; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/oss/python/langchain/structured-output
- https://docs.langchain.com/langgraph
- https://docs.smith.langchain.com/
---

# Bài 124 — Adaptive RAG

> Nguồn: `124 - Adaptive RAG.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích Adaptive RAG: question router chọn RAG flow ngay từ đầu.
2. Viết `RouteQuery` schema (Literal vectorstore/websearch) + router chain.
3. Viết tests route hai hướng (agent memory vs how to make pizza).
4. Gắn `set_conditional_entry_point` và chạy thử cả hai luồng.

## 2. Nội dung chính theo mạch transcript

### 2.1. Ý tưởng

- "Fancy word" cho question router rẽ hai flow: (1) web search rồi đi tiếp luồng cũ, (2) retrieval từ vector store. Hỏi gì → đoán nơi có đáp án → đi đường đó, khỏi retrieve vô ích.
- Dựa paper Adaptive RAG (transcript show trên màn hình).

### 2.2. Router chain (chains/router.py)

- `Literal` giới hạn biến chỉ nhận giá trị định trước — tiện validate/type-check.
- `RouteQuery(BaseModel)`: `datasource: Literal["vectorstore", "websearch"]` (required qua `...`), description "Given a user question choose to route it to websearch or vectorstore".
- System: "You are an expert at routing... vectorstore contains documents related to agents, prompt engineering, and adversarial attacks... Use vectorstore for those topics, else websearch." Human: `{question}`. Chain `prompt | structured_llm` (bind Pydantic như các bài trước).

### 2.3. Tests + entry point (graph.py, main.py)

- Tests: `test_route_to_vectorstore` ("agent memory" → vectorstore), `test_route_to_websearch` ("how to make pizza" → websearch); import sau load env; full suite xanh (transcript note có thể parallelize sau).
- `route_question(state)`: lấy question, invoke router → datasource websearch thì return WEB_SEARCH, vectorstore thì RETRIEVE.
- `set_conditional_entry_point(route_question, {"websearch": WEB_SEARCH, "retrieve": RETRIEVE})` — conditional edge ngay từ START; phần còn lại giữ nguyên.
- Chạy "what is agent memory" → route vectorstore → luồng cũ ra đáp án; đổi "how to make pizza" → route web search (Tavily) → đáp án. Trace LangSmith xác nhận hai đường.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| `Literal` + structured output route | Pattern structured output LangChain. | https://docs.langchain.com/oss/python/langchain/structured-output |
| `set_conditional_entry_point` rẽ từ START | API entry routing LangGraph. | https://docs.langchain.com/langgraph |
| Hai luồng vectorstore/websearch + trace | Khớp luồng Adaptive RAG trên graph. | https://docs.smith.langchain.com/ |

> Hộp cập nhật: router ghi cứng topics trong system prompt (agents, prompt engineering, adversarial attacks) theo đúng dữ liệu đã ingest — đổi dữ liệu ingest thì phải sửa prompt. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Câu hỏi | Đi đường nào |
|---|---|
| Về agents/prompt engineering/adversarial | vectorstore retrieve |
| Còn lại (pizza...) | web search Tavily |

**Một câu chốt:** Đừng retrieve rồi mới biết sai chỗ — hỏi router một câu trước khi xuất phát để đi đúng đường từ đầu.

## 5. Câu hỏi tự kiểm tra

1. Adaptive RAG khác CRAG/Self RAG ở vị trí can thiệp nào?
2. `Literal["vectorstore", "websearch"]` ép được gì?
3. System prompt router phải khớp gì với ingestion?
4. `set_conditional_entry_point` khác `add_conditional_edges` ở đâu?
5. Hai test route chứng minh điều gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** CRAG can thiệp sau retrieve (grade docs), Self RAG sau generate (grade answer); Adaptive can thiệp trước cả hai — route ngay từ START.

**2.** Ép LLM chỉ được trả một trong hai giá trị định trước — sai giá trị là lỗi validate, dễ test và rẽ nhánh.

**3.** Khớp topics đã ingest (agents, prompt engineering, adversarial attacks) — router chỉ đúng khi mô tả đúng thứ vector store đang giữ.

**4.** Entry point rẽ từ START (chọn node đầu tiên), conditional edges rẽ từ một node giữa luồng (grade/generate) — cùng cơ chế router, khác vị trí.

**5.** "agent memory" về đúng vectorstore, "how to make pizza" về đúng websearch — router phân biệt được câu trong và ngoài phạm vi store.

</details>

## 6. Bước tiếp theo

Hết section 16 — sang section 17 *Introduction to Model Context Protocol (MCP)*.
