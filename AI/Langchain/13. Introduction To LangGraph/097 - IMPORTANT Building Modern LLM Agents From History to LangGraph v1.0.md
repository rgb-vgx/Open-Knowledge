---
title: "Bai 097 - Tu ReAct toi LangGraph v1.0"
course: langchain
lesson: 97
status: edited-verified
source: "097 - IMPORTANT Building Modern LLM Agents From History to LangGraph v1.0.md"
verified_date: 2026-09-17
langchain_version: "1.0; tao agent bang create_agent, deprecated Create React Agent cu"
categories: [AI]
tags: [ReAct, tool-calling, create-agent, LangGraph-v1, checkpoints]
doc_refs: ["https://docs.langchain.com/langgraph", "https://docs.langchain.com/oss/python/langchain/agents", "https://arxiv.org/abs/2210.03629"]
---

# Bài 097 — Từ ReAct tới LangGraph v1.0

> Nguồn transcript: `097 - IMPORTANT Building Modern LLM Agents From History to LangGraph v1.0.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (lớp 1 trung thành transcript; lớp 2 đối chiếu một phần qua WebFetch).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể evolution: ReAct prompt → function calling → tool calling → LangGraph → `create_agent`.
2. Giải thích vì sao parse ReAct cũ giòn và function calling mỗi vendor một kiểu.
3. Mô tả agent LangGraph: state + nodes + edges, checkpoints, compose graphs.
4. Biết LangChain 1.0 deprecate CreateReActAgent cũ về `create_agent`.
5. Hiểu vì sao tự tay làm một lần thì hết thấy magic.

---

## 2. Nội dung chính theo mạch transcript

Recap: query vào ReAct agent → LLM ponder quyết tool → execute tool → lặp tới final answer, không còn tool thì thôi.

Evolution: ReAct paper + ReAct prompt, LangChain parse fancy để trích tools — impressive nhưng unreliable vì models yếu, parse non-deterministic, sai một token là hỏng output. Rồi models khá hơn, function calling ra đời: khỏi ReAct prompt, vendor lo, model trả function cần gọi ở chỗ đặc biệt trong response. Hết bệnh parse nhưng sinh bệnh mới: mỗi vendor một tên (function calling/tool calling), một chỗ để info. LangChain tạo unified tool calling interface + integrations mọi vendor: một interface lấy functions cho mọi nơi.

LangGraph đổi kiến trúc: thay while-loop abstract trong AgentExecutor (cứng, thiếu visibility/control) bằng graphs nodes/edges + shared state. ReAct LangGraph có state dict (conversation, intermediate), nodes là functions nhận state làm computation (gọi LLM/tools) rồi trả updated state, edges định control flow. Động lực: papers agent nào cũng vẽ thành graphs nên diễn đạt vậy tự nhiên, unhide control flow, in được hình.

Hơn AgentExecutor cũ: state schema muốn track field gì chỉ cần khai báo (xưa phải config/kwargs rất khó); auto checkpoints trước mỗi node nên trace/monitor được, rewind time travel được; compose được graphs lồng nhau (graph làm node) kèm tracing/observability — xưa rất khó. Agent này sống ở graph prebuilt agents một thời gian, section này tự implement bản tương tự.

LangChain/LangGraph 1.0: API sạch với `create_agent`, deprecate/replace CreateReActAgent và prebuilt LangGraph, gom hết về một hàm trả compiled graph (LangGraph under the hood): đưa models + tools là có ReAct agent đủ observability/debugging, customize được. Biết dùng `create_agent` mà hiểu under the hood thì hết magic — nền cho modern LLM agents và deep agents.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| ReAct prompt cũ giòn vì parse | VẪN ĐÚNG | https://arxiv.org/abs/2210.03629 | Đúng paper gốc và lịch sử. |
| Tool calling unify đa vendor | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/agents | Hướng chuẩn hiện tại. |
| LangGraph 1.0 `create_agent` thay agent cũ | VẪN ĐÚNG | https://docs.langchain.com/langgraph | WebFetch xác nhận LangGraph là execution layer hiện tại; tên hàm check docs mới khi code. |
| Checkpoints/HITL/compose graphs | VẪN ĐÚNG | https://docs.langchain.com/langgraph | Docs nhấn mạnh durable execution, resume, human review. |

> Hộp cập nhật 2026-09-17: Giữ nguyên mạch lịch sử. Khi code check signature `create_agent` và checkpointer hiện tại vì API 1.x đổi nhanh. Transcript không có code nên không thêm code.

---

## 4. Tóm tắt

| Era | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| ReAct prompt | Parse tay | Giòn |
| Function/tool calling | Vendor + unify | Đỡ parse |
| AgentExecutor | While-loop | Khó thấy, khó lồng |
| LangGraph v1.0 | `create_agent` | Graph biên dịch sẵn |

**Chốt: Hiểu từ prompt giòn tới graph biên dịch sẵn thì `create_agent` hết magic — chỉ là ReAct được đóng gói tử tế.**

---

## 5. Câu hỏi tự kiểm tra

1. Flow ReAct tóm tắt thế nào?
2. Vì sao ReAct prompt cũ unreliable?
3. Function calling giải gì và sinh bệnh gì mới?
4. LangGraph hơn AgentExecutor cũ ở những gì?
5. LangChain 1.0 gom lại bằng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Query → LLM quyết tool → execute → lặp tới khi không còn tool thì trả final answer.

**2.** Vì models yếu, parse non-deterministic, sai một token là hỏng output.

**3.** Giải parse giòn bằng cách vendor trả function trong response; nhưng mỗi vendor một tên/vị trí nên LangChain phải unify thành tool calling.

**4.** State schema dễ track, auto checkpoints để trace/rewind, compose graphs lồng nhau, control flow tường minh in được hình.

**5.** Hàm `create_agent` trả compiled graph, deprecate CreateReActAgent và prebuilt cũ.

</details>

## 6. Bước tiếp theo

Hết phạm vi 3 sections 067-097. Ôn lại chuỗi prompt → context → production → LangGraph rồi sang sections agents nâng cao.
