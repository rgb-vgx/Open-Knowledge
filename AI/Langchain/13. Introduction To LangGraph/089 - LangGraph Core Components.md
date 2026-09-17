---
title: "Bai 089 - LangGraph Core Components"
course: langchain
lesson: 89
status: edited-verified
source: "089 - LangGraph Core Components.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; ten API co the doi theo version"
categories: [AI]
tags: [LangGraph, nodes, edges, state, persistence]
doc_refs: ["https://docs.langchain.com/langgraph", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 089 — LangGraph Core Components

> Nguồn transcript: `089 - LangGraph Core Components.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (lớp 1 trung thành transcript; lớp 2 đối chiếu một phần qua WebFetch, tên API có thể đổi).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể 3 core components: nodes, edges, conditional edges.
2. Giải thích start/end nodes.
3. Mô tả state và quy ước node nhận state/trả dict update.
4. Hiểu cyclic graph, human-in-the-loop, persistence để làm gì.

---

## 2. Nội dung chính theo mạch transcript

Trong control flow/state machine/graph định sẵn, LLM hoặc quyết đi đâu tiếp (non-deterministic) hoặc được gọi trong step (LLM/agent calls).

Ba core components:

- Nodes là Python functions literal — code deterministic thường, code gọi LLM, thậm chí cả LLM agent, full flexibility.
- Edges nối nodes trong graph execution.
- Conditional edges quyết đi node A hay B, dynamic và flexible — sức mạnh LangGraph. Nhờ đó kiểm soát điều hướng execution.

Hai built-in nodes: start là entry point, end là node cuối; cả hai no-op, không làm gì.

State (agent state) là dictionary giữ thông tin cần track: kết quả nodes, temporary results, chat history. Đơn giản thì chỉ chat history/LLM outputs, phức tạp thì customize gì cũng được. Local với graph: mọi node/edge trong execution đều access được; cũng persist được ra storage để dừng rồi tiếp tục từ đúng điểm — sẽ demo trong khóa.

Quy ước quan trọng: mọi node là special function luôn nhận current graph state (đủ info để làm việc) và trả dictionary các keys muốn update. Vậy mọi node đều update state, state đổi dần theo thời gian, edges/conditional edges dựa vào state để chọn node tiếp. Đó là hình thù software LangGraph.

Ba concepts cho phần còn lại: cyclic graph (loops — thứ LangChain cũ rất khó), human-in-the-loop (lấy feedback người để chọn nhánh), persistence (built-in functions lưu state → robust, fault-tolerant, UX hay).

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Nodes là functions, edges/conditional edges điều hướng | VẪN ĐÚNG | https://docs.langchain.com/langgraph | WebFetch xác nhận StateGraph, START/END, compile/run. |
| Node nhận state, trả dict update | VẪN ĐÚNG | https://langchain-ai.github.io/langgraph/ | Quy ước reducer/state update vẫn lõi LangGraph; tên class có thể đổi. |
| Persistence/HITL/loops | VẪN ĐÚNG | https://docs.langchain.com/langgraph | Docs hiện tại nhấn mạnh durable execution, resume, human review. |

> Hộp cập nhật 2026-09-17: Giữ nguyên mạch lý thuyết. Khi code phải check tên import hiện tại (ví dụ MessagesState/StateGraph/START/END, checkpointer) vì API đổi theo version. Transcript không có code nên không thêm code.

---

## 4. Tóm tắt

| Component | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Nodes | Functions | Nhận state, trả update |
| Edges | Nối nodes | Flow tường minh |
| Conditional edges | Rẽ theo state | LLM/human quyết |
| State | Dict share + persist | Não chung của graph |

**Chốt: Nắm nodes-edges-state và quy ước update state thì đọc được mọi graph LangGraph.**

---

## 5. Câu hỏi tự kiểm tra

1. Ba core components là gì?
2. Start/end nodes làm gì?
3. State chứa gì và share thế nào?
4. Node function khác function thường ở đâu?
5. Persistence/HITL/cycles để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Nodes, edges, conditional edges — nodes làm việc, edges nối, conditional edges rẽ nhánh động.

**2.** Start là entry point, end là node cuối, cả hai no-op.

**3.** Dict giữ kết quả nodes, temporary results, chat history; local mọi node/edge access được, persist được để resume.

**4.** Luôn nhận current state và trả dict các keys muốn update, nên mọi node đều làm state tiến hóa.

**5.** Cycles làm loops; HITL lấy feedback người chọn nhánh; persistence lưu state để robust, fault-tolerant và UX hay.

</details>

## 6. Bước tiếp theo

Bài 090 — *Implementing ReAct AgentExecutor với LangGraph* — ráp reasoning + tools + loop thành agent chạy được.
