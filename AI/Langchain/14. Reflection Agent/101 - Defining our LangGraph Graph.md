---
title: 'Bài 101 — Defining our LangGraph Graph'
course: langchain
lesson: 101
status: edited-verified
source: '101 - Defining our LangGraph Graph.md'
verified_date: 2026-09-17
langchain_version: 'chua-kiem-chung-day-du (transcript quay lai cho langgraph 1.0; kiem chung mang han che ngay 2026-09-17)'
categories:
- AI
tags: []
doc_refs:
- https://docs.langchain.com/langgraph
- https://langchain-ai.github.io/langgraph/graphs/
- https://github.com/langchain-ai/langgraph
---

# Bài 101 — Defining our LangGraph Graph

> Nguồn: `101 - Defining our LangGraph Graph.md` | Ngày kiểm chứng: 2026-09-17 | Trạng thái: edited-verified

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Định nghĩa state `MessageGraph` (TypedDict + `Annotated[list[BaseMessage], add_messages]`).
2. Viết hai node `generation_node` và `reflection_node` chạy hai chain từ bài 100.
3. Giải thích mẹo gắn nhãn critique thành `HumanMessage` để LLM nghe feedback tốt hơn.
4. Nối graph: entry point, edge tĩnh, conditional edge `should_continue`, compile và vẽ diagram.

## 2. Nội dung chính theo mạch transcript

### 2.1. Lưu ý bản quay lại

- Video được quay lại để khớp LangGraph 1.0, code giữ nguyên, chỉ đổi IDE sang Cursor — đừng hoảng.

### 2.2. Imports và state

- `TypedDict` định nghĩa schema state; `Annotated` gắn metadata reducer.
- `BaseMessage` làm type hint cho list messages (bao được Human/AI/System); `HumanMessage` để phân biệt input user.
- `END` là hằng kết thúc; `StateGraph` là class dựng graph có trạng thái.
- `add_messages` là reducer: thay vì ghi đè key `messages`, nó append message mới vào lịch sử.
- `MessageGraph(TypedDict)` chỉ có một key `messages: Annotated[list[BaseMessage], add_messages]`. Mọi node nhận state này vào và trả về dict `{"messages": [...]}` để cập nhật.

### 2.3. Hai node

- Hằng tên node: `GENERATE = "generate"`, `REFLECT = "reflect"`.
- `generation_node(state)`: invoke `generation_chain` với toàn bộ messages; vòng đầu chỉ có user input nên sinh tweet đầu, các vòng sau có thêm critique nên revise dần; trả về AI message để reducer append.
- `reflection_node(state)`: invoke `reflection_chain` tương tự, nhưng ép output thành `HumanMessage` — heuristic: muốn LLM tưởng critique là do người viết để tiếp thu tốt hơn (LLM được train hội thoại + human feedback).

### 2.4. Ráp graph và conditional edge

1. `StateGraph(MessageGraph)`, `add_node(GENERATE, generation_node)`, `add_node(REFLECT, reflection_node)`.
2. `set_entry_point(GENERATE)` tức tạo edge START → generate.
3. `should_continue(state) -> str`: đếm messages; transcript dùng ngưỡng 6 (2 vòng lặp) thì trả về END, dưới 6 trả về REFLECT. Giảng viên nhấn mạnh đây chỉ là heuristic demo — hoàn toàn có thể thay bằng LLM quyết định.
4. `add_conditional_edges(GENERATE, should_continue, {"end": END, "reflect": REFLECT})` + `add_edge(REFLECT, GENERATE)`, rồi `compile()`.
5. Vẽ graph: `get_graph().draw_mermaid()` đem sang Excalidraw/mermaid.live, hoặc `get_graph().print_ascii()`.
- Lỗi hiển thị transcript gặp: thiếu path map thì diagram không hiện conditional edge (code vẫn chạy). Fix bằng dict thứ ba ánh xạ output string → tên node để LangGraph biết đích đến.

## 3. Đối chiếu docs mới nhất (kèm link từng dòng)

> WebSearch/WebFetch ngày 2026-09-17 bị hạn chế, chỉ lấy được trang tổng quan docs. Giữ nguyên logic transcript, ghi nhận đổi tên API ở bản 1.x.

| Nội dung transcript | Đối chiếu 2026-09-17 | Nguồn |
|---|---|---|
| `StateGraph`, `END`/`START`, `add_node`/`add_edge`/`add_conditional_edges`, `set_entry_point`, `compile` | Vẫn là API dựng graph cơ bản của LangGraph. | https://docs.langchain.com/langgraph |
| `Annotated[..., add_messages]` quản lý lịch sử hội thoại | Khớp mẫu reducer `add_messages` trong docs LangGraph. | https://langchain-ai.github.io/langgraph/graphs/ |
| `MessagesState` import từ prebuilt (nhắc ở bài 109) | Bản 1.x khuyến khích dùng `MessagesState` có sẵn thay vì tự viết TypedDict. | https://github.com/langchain-ai/langgraph |
| Ép critique thành `HumanMessage` | Là heuristic của khóa học, transcript gốc không đề cập docs nào; giữ nguyên, không coi là chuẩn framework. | https://docs.langchain.com/langgraph |

> Hộp cập nhật: nếu chạy LangGraph 1.x, `set_entry_point` có thể được thay bằng `add_edge(START, ...)`; kiểm tra migration guide của repo trước khi chạy. Logic đếm 6 messages chỉ phục vụ demo 2 vòng lặp.

## 4. Tóm tắt một trang

| Khái niệm | Vai trò |
|---|---|
| MessageGraph state | List messages + reducer append |
| generation_node | Chạy generation_chain, trả AI message |
| reflection_node | Chạy reflection_chain, gắn nhãn HumanMessage |
| should_continue | Đếm messages, chọn END hay REFLECT |
| Path map | Khai báo đích conditional edge để vẽ đúng diagram |

**Một câu chốt:** Graph này chỉ có hai diễn viên và một người gác cổng đếm tin nhắn — generate viết, reflect chê, đủ 6 messages thì dừng, chưa đủ thì reflect xong quay lại generate.

## 5. Câu hỏi tự kiểm tra

1. Vì sao state chỉ cần một key `messages` mà vẫn đủ chạy vòng lặp?
2. Reducer `add_messages` khác gì gán dict thông thường?
3. Vì sao reflection_node ép output thành `HumanMessage`?
4. Hàm `should_continue` trả về gì và LangGraph dùng nó thế nào?
5. Vì sao phải thêm path map vào `add_conditional_edges` dù không có nó graph vẫn chạy?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Vì mọi ngữ cảnh cần thiết (user input, tweet các bản, critique) đều nằm trong lịch sử hội thoại; mỗi node đọc cả list và append thêm một message, nên một list duy nhất là đủ.

**2.** Gán thường sẽ ghi đè key; `add_messages` append phần tử mới vào list cũ, giữ toàn bộ lịch sử — đây là metadata qua `Annotated` báo cho LangGraph cách merge state.

**3.** Heuristic prompt engineering của giảng viên: LLM được train nặng về hội thoại và human feedback, nên gắn nhãn critique là "người nói" hy vọng bản revise sau nghe lời hơn.

**4.** Trả về string tên node kế tiếp ("reflect" hoặc "end"). LangGraph gọi hàm sau mỗi lần chạy node nguồn (generate) và điều hướng theo string đó — không phải node mà là router của conditional edge.

**5.** Vì LangGraph chỉ biết đích đến qua path map khi vẽ diagram; thiếu nó, mermaid không hiện nhánh conditional (dù runtime vẫn đi đúng). Thêm `{"reflect": REFLECT, "end": END}` để khai báo tường minh.

</details>

## 6. Bước tiếp theo

Bài 102 — *LangSmith Tracing* — invoke graph với tweet mẫu, đọc trace và xem lịch sử hội thoại trong final prompt.
