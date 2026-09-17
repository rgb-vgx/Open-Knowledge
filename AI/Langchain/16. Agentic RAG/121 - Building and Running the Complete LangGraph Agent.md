---
title: 'Bài 121 — Complete LangGraph Agent'
course: langchain
lesson: 121
status: edited-verified
source: '121 - Building and Running the Complete LangGraph Agent.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://langchain-ai.github.io/langgraph/graphs/
- https://docs.smith.langchain.com/
---

# Bài 121 — Ráp và chạy Complete LangGraph Agent

> Nguồn: `121 - Building and Running the Complete LangGraph Agent.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Export nodes qua `__init__` + `__all__`, định nghĩa const tên nodes.
2. Viết router `decide_to_generate` đọc cờ web_search.
3. Ráp graph retrieve → grade → (web_search | generate) → END, compile, xuất graph.png.
4. Invoke với "what is agent memory" và đọc trace LangSmith.

## 2. Nội dung chính theo mạch transcript

### 2.1. Chuẩn bị

- `nodes/__init__.py`: import 4 nodes (generate, grade_documents, retrieve, web_search) + `__all__` để import từ ngoài package.
- `const.py`: hằng tên nodes (RETRIEVE="retrieve"...) — reference qua const, đổi tên sửa một nơi.

### 2.2. Router và ráp graph (graph.py)

- `decide_to_generate(state)`: web_search true (có doc hỏng) → trả WEB_SEARCH; false (all relevant) → GENERATE. Trả const chứ không hardcode string.
- `StateGraph(GraphState)`, add 4 nodes, entry retrieve, edge retrieve → grade_documents.
- `add_conditional_edges("grade_documents", decide_to_generate, {"web_search": WEB_SEARCH, "generate": GENERATE})` — path map demo: nếu hàm trả tên khác node thì map sang node thật; ở đây key=value nên chỉ để minh họa option.
- `add_edge(WEB_SEARCH, GENERATE)`, `add_edge(GENERATE, END)`, `compile()`, vẽ graph.png.

### 2.3. Chạy

- `main.py`: invoke `{"question": "what is agent memory"}`; log hiện retrieve → grade (một doc không relevant) → web search ("what is agent memory") → generate ra đáp án tốt.
- Mở graph.png đối chiếu diagram; mở trace LangSmith thấy đủ nodes theo thứ tự. Code xem branch `langgraph` (transcript đọc; đã update theo LangChain/LangGraph mới).

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| Entry point + edges + conditional edges + compile | API graph chuẩn LangGraph. | https://docs.langchain.com/langgraph |
| Path map ánh xạ output router → node | Option `add_conditional_edges` có trong docs. | https://langchain-ai.github.io/langgraph/graphs/ |
| Trace LangSmith theo thứ tự nodes | Khả năng tracing LangSmith. | https://docs.smith.langchain.com/ |

> Ghi nhận: không nội dung lỗi thời ở mức luồng. Kiểm chứng mạng ngày 2026-09-17 bị hạn chế.

## 4. Tóm tắt một trang

| Node/edge | Vai trò |
|---|---|
| retrieve → grade | Lấy docs rồi chấm |
| decide_to_generate | Cờ true đi search, false đi generate |
| web_search → generate → END | Bù bằng chứng rồi sinh đáp án |

**Một câu chốt:** CRAG hoàn chỉnh chỉ là bốn node và một ngã ba đọc cờ — retrieve lấy, grade chấm, thiếu thì search bù, đủ thì sinh.

## 5. Câu hỏi tự kiểm tra

1. Vì sao tên nodes phải qua const?
2. Router đọc key state nào?
3. Path map trong bài này có bắt buộc không, vì sao vẫn viết?
4. Vì sao entry point là retrieve?
5. Trace demo cho thấy luồng nào đã chạy?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Để tránh duplication và sai chính tả rải rác — đổi tên chỉ sửa const một nơi.

**2.** `web_search` boolean do grade_documents ghi — true nghĩa có doc hỏng cần search.

**3.** Không bắt buộc (key=value trùng tên node); viết để minh họa option map output router sang node khác khi cần.

**4.** Vì mọi bước sau cần documents làm input — phải retrieve trước rồi mới grade/generate.

**5.** retrieve → grade (phát hiện 1 doc hỏng) → web_search → generate → END, đáp án "what is agent memory" tốt.

</details>

## 6. Bước tiếp theo

Bài 122 — *Self RAG Intro* — thêm reflection lên đáp án: grounded không, trả lời đúng hỏi chưa.
