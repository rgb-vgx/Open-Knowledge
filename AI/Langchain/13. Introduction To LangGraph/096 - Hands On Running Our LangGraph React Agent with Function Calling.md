---
title: "Bai 096 - Chay ReAct Agent va Doc Trace"
course: langchain
lesson: 96
status: edited-verified
source: "096 - Hands On Running Our LangGraph React Agent with Function Calling.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; vi du search co the doi theo ket qua thuc te"
categories: [AI]
tags: [LangGraph, invoke, Tavily, LangSmith-tracing]
doc_refs: ["https://docs.langchain.com/langgraph", "https://docs.langchain.com/langsmith", "https://python.langchain.com/docs/integrations/tools/tavily_search/"]
---

# Bài 096 — Chạy ReAct Agent và Đọc Trace

> Nguồn transcript: `096 - Hands On Running Our LangGraph React Agent with Function Calling.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên ví dụ nhiệt độ Tokyo và con số 69/207, 15/45 như transcript).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Invoke graph với messages HumanMessage đúng format.
2. Kể mạch demo: search thời tiết Tokyo rồi triple.
3. Đọc trace LangSmith: agent_reason, should_continue, act.
4. Giải thích vì sao search bị gọi 2 lần.
5. Biết mẹo tăng max_results để đỡ tốn calls.

---

## 2. Nội dung chính theo mạch transcript

Gọi `app.invoke` với dict `messages` chứa HumanMessage `what is the weather in Tokyo, list it and then triple it`. Kỳ vọng: agent deduce cần search trước, rồi triple sau, rồi trả lời. In result lấy last message content.

Lần 1 output lấy humidity 69 x3 = 207 — giảng viên thấy chưa explicit nên sửa prompt thành `what is the temperature in Tokyo, list it and then triple it`. Agent chạy hơi lâu vì nhiều tool calls: reason (LLM) → tool → reason lại. Kết quả: 15 Celsius x3 = 45 — agent work as expected.

Mở LangSmith project react-function-calling thấy 2 traces. Trace 2 search tool bị gọi 2 lần — kinh nghiệm là bình thường vì search result lần đầu thiếu info thì agent tự detect và chạy lại tới khi đủ. Mẹo: thêm arg max_results (ví dụ 5 thay vì 1) để một lần trúng đáp án — heuristic, không chắc chắn.

Đọc trace từ đầu: agent_reason node có system message + cả 2 tools, quyết invoke search với query current temperature in Tokyo. should_continue không phải node mà là conditional edge function: check last message là AI tool call nên đi Act node. Tool node execute search, content lần đầu không có nhiệt độ — non-helpful. Nhờ edge act→agent_reason, kết quả trả về reasoning node, nó quyết search lại với query tương tự, lần này có include domain và content 15°C. Agent reason tiếp quyết gọi triple với num=15 trích từ tool call trước. Tool node chạy triple ra 45 — trivial nên bỏ qua. Node cuối là agent_reason thấy không cần gì nữa thì finish. Commit `graph`, push, chốt section: ReAct bằng graph + function calling dễ và ổn định hơn.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Invoke bằng dict messages HumanMessage | VẪN ĐÚNG | https://docs.langchain.com/langgraph | Pattern chuẩn; tên hàm compile/invoke check docs mới. |
| Đọc trace theo nodes/edges trong LangSmith | VẪN ĐÚNG | https://docs.langchain.com/langsmith | WebFetch xác nhận traces, run histories, monitors. |
| Search 2 lần vì kết quả đầu thiếu | VẪN ĐÚNG về bản chất | https://python.langchain.com/docs/integrations/tools/tavily_search/ | Search thực tế đổi theo thời gian; số liệu demo giữ nguyên lịch sử. |
| Mẹo tăng max_results | VẪN ĐÚNG | https://python.langchain.com/docs/integrations/tools/tavily_search/ | Heuristic, chưa fetch full do giới hạn mạng. |

> Hộp cập nhật 2026-09-17: Giữ nguyên con số và mạch trace. Kết quả search/nhiệt độ thực tế sẽ khác khi chạy lại. Không dựng code đầy đủ vì transcript không cho code text.

---

## 4. Tóm tắt

| Bước | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Invoke | messages HumanMessage | Hỏi rõ ràng |
| Loop | reason → act → reason | Search rồi triple |
| Trace | LangSmith nodes/edges | Nhìn là thấy bệnh |
| Mẹo | max_results cao hơn | Đỡ gọi lại |

**Chốt: Agent chạy đúng khi trace cho thấy nó tự search lại lúc thiếu info rồi mới tính — đó là ReAct có kiểm soát.**

---

## 5. Câu hỏi tự kiểm tra

1. Input invoke trong bài là gì?
2. Vì sao lần 1 ra 207 mà phải sửa prompt?
3. Vì sao search bị gọi 2 lần?
4. Mẹo tiết kiệm tool calls là gì?
5. Node cuối quyết finish bằng cách nào?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Dict `messages` với HumanMessage hỏi weather/temperature Tokyo rồi triple.

**2.** Vì lần 1 lấy humidity 69 x3 = 207, chưa explicit ý muốn temperature nên sửa thành temperature.

**3.** Vì content search đầu không có nhiệt độ, agent detect non-helpful và chạy lại tới khi đủ.

**4.** Tăng max_results (ví dụ 1 lên 5) để một lần có đáp án — heuristic không chắc chắn.

**5.** Agent_reason cuối thấy không cần tool nữa, should_continue cho đi end.

</details>

## 6. Bước tiếp theo

Bài 097 — *Từ ReAct tới LangGraph v1.0* — tool calling thống nhất và `create_agent` thay AgentExecutor cũ.
