---
title: "Bai 095 - Noi Nodes thanh Graph ReAct"
course: langchain
lesson: 95
status: edited-verified
source: "095 - Hands On Bringing Your ReAct Agent to Life Connecting Nodes into a Graph.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; ten API co the doi"
categories: [AI]
tags: [LangGraph, StateGraph, conditional-edges, MessagesState]
doc_refs: ["https://docs.langchain.com/langgraph", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 095 — Nối Nodes thành Graph ReAct

> Nguồn transcript: `095 - Hands On Bringing Your ReAct Agent to Life Connecting Nodes into a Graph.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên mạch code kể miệng và lỗi thiếu S như transcript).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Import HumanMessage, MessagesState và StateGraph đúng vai trò.
2. Đặt entry point và hằng số agent_reason/act/last.
3. Viết should_continue: có tool call thì act, không thì end.
4. Nối act → agent_reason để tạo loop và compile graph.
5. Vẽ flow.png và sửa lỗi import thường gặp.

---

## 2. Nội dung chính theo mạch transcript

Mở `main.py` implement ReAct graph. Imports: HumanMessage từ langchain-core làm input khởi chạy; MessagesState (transcript nói message state) giữ messages; StateGraph là graph generic nhận state object tùy ý; thêm run-agent-reasoning node và tool node.

Hằng số cho sạch code: `agent_reason`, `act`, `last = -1` để trỏ last message kiểu Python.

Dựng `StateGraph(MessagesState)` đặt tên flow. Add nodes agent_reason và act. Cursor autocomplete edge start→agent_reason nhưng giảng viên thích viết tường minh `set_entry_point(agent_reason)`.

Thêm conditional edge từ agent_reason theo hàm `should_continue` (implement sau), kèm mapping `end→END`, `act→act` để hình vẽ dotted lines explicit — không mapping graph vẫn chạy nhưng vẽ thiếu. Hàm này nhận graph state (MessagesState), trả string tên node tiếp: check messages, nếu last message có tool call thì đi act (LLM đã quyết gọi tool với đủ args), không thì end (heuristic LLM đã trả được đáp án có/không cần tool).

Nối edge act→agent_reason: xong tool lại reason xem trả đáp án hay gọi tiếp. Compile, dùng `get_graph().draw_mermaid_png()` (transcript nói draw Mermaid png) ra `flow.png`. Lỗi gặp: import `MessageState` thiếu S, sửa thành `MessagesState` cả chỗ khai báo lẫn should_continue rồi chạy lại — boom, ra đúng hình graph. Video sau test và xem traces.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| StateGraph + MessagesState + START/END | VẪN ĐÚNG | https://docs.langchain.com/langgraph | WebFetch xác nhận pattern; tên import check docs mới. |
| should_continue check last tool call | VẪN ĐÚNG | https://langchain-ai.github.io/langgraph/ | Pattern chuẩn ReAct graph; bản mới có prebuilt ToolNode/`create_agent` gọn hơn. |
| Vẽ graph ra png | VẪN ĐÚNG | https://docs.langchain.com/langgraph | Cách vẽ đổi theo version, đọc docs hiện tại. |

> Hộp cập nhật 2026-09-17: Giữ nguyên mạch kể miệng, không dựng code đầy đủ vì transcript không cho code text. Khi code thật ưu tiên check docs `create_agent`/ToolNode mới trước khi viết tay.

---

## 4. Tóm tắt

| Mảnh | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Entry | START → agent_reason | Điểm vào duy nhất |
| Rẽ | should_continue | Tool call thì act, không thì end |
| Loop | act → agent_reason | Lặp tới đáp án |
| Vẽ | flow.png | Nhìn hình bắt lỗi flow |

**Chốt: Graph ReAct chỉ có ba thứ — vào reason, rẽ theo tool call, xong tool quay lại reason.**

---

## 5. Câu hỏi tự kiểm tra

1. MessagesState để làm gì?
2. Vì sao dùng hằng số agent_reason/act/last?
3. should_continue quyết định thế nào?
4. Vì sao cần edge act→agent_reason?
5. Mapping end/act trong conditional edge để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Giữ messages, làm state share cho nodes/edges trong execution.

**2.** Để code sạch, khỏi viết lại strings, `last = -1` trỏ last message kiểu Python.

**3.** Nhận state, check last message: có tool call thì trả act, không thì end.

**4.** Để sau khi execute tool, agent reason lại xem trả đáp án hay gọi tool tiếp — tạo loop.

**5.** Để hình vẽ dotted lines explicit node nào đi tiếp được; không mapping vẫn chạy nhưng vẽ thiếu.

</details>

## 6. Bước tiếp theo

Bài 096 — *Chạy ReAct Agent* — invoke hỏi nhiệt độ Tokyo rồi đọc trace LangSmith.
