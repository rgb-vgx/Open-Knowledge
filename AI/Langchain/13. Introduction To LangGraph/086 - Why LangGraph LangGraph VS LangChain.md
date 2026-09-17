---
title: "Bai 086 - Vi sao can LangGraph"
course: langchain
lesson: 86
status: edited-verified
source: "086 - Why LangGraph LangGraph VS LangChain.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; bai ly thuyet lich su"
categories: [AI]
tags: [LangGraph, autonomy-spectrum, ReAct, function-calling, tool-calling]
doc_refs: ["https://docs.langchain.com/langgraph", "https://arxiv.org/abs/2210.03629", "https://docs.langchain.com/oss/python/langchain/agents"]
---

# Bài 086 — Vì sao cần LangGraph

> Nguồn transcript: `086 - Why LangGraph LangGraph VS LangChain.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên slides và ví dụ như transcript; chưa kiểm chứng full do giới hạn mạng).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Vẽ phổ autonomy từ deterministic tới autonomous agents.
2. Giải thích chaining, RAG flow và LLM router.
3. Định nghĩa agent gọn nhất: control flow mà LLM quyết đi đâu.
4. Hiểu bệnh ReAct quá flexible: lặp tool vô hạn.
5. Nêu 5 building blocks LangGraph mang lại.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Phổ autonomy

- Deterministic code: không LLM, biết input/output/steps, resilient nhưng cứng vì hardcode.
- +1 LLM trong flow: dev vẫn cầm control flow, LLM chỉ quyết một output — ví dụ summarize/extract entities; thêm flexibility mà vẫn kiểm soát.
- Chaining: output LLM này làm input LLM kia; ví dụ RAG — embed câu hỏi, retrieve docs relevant, augment prompt rồi generate. Nhiều LLM quyết nhiều bước.
- LLM router: chain dùng LLM quyết chạy Branch 1 (DB) hay Branch 2 (web). Lần đầu LLM quyết steps, thêm flexibility, nhưng không cycles. Trên vạch dotted line này LangChain làm rất tốt.

Dưới vạch là agents/agentic apps. Định nghĩa soft, mỗi người mỗi kiểu, nhưng đồng thuận core: agent là control flow mà LLM quyết đi đâu (Node 1 hay Node 2). Chain một chiều trái→phải; agent có cycles — đó là tính agentic. Agents nay dùng function calling: gửi kèm descriptions/tools/args/return, LLM bảo gọi hàm nào với args nào qua `@tool`, ta thực thi.

### 2.2. ReAct quá flexible thành unreliable

Design ReAct gốc: LLM quyết có cần tool (API/DB) → gọi với args LLM chọn → trả kết quả về LLM → quyết gọi tiếp hay trả user. LangChain implement ngay, flexible mọi permutation nhưng cũng cho permutation xấu: agent kẹt invoke cùng tool vô hạn. Nguyên nhân: định nghĩa tools sai, LLM non-deterministic/yếu, sai args, hallucinate tool không tồn tại. Flexible như AutoGPT/ReAct mà unreliable thì không production được vì LLM đoán token nối token nên dễ scatter.

### 2.3. LangGraph lấp khoảng giữa

LangGraph bớt một chiều tự do của LLM: ta scope flow, LLM vẫn tự do nhưng không full tự do. Diễn đạt software thành graph nodes/edges dạng state machine có cycles — trông như agent biết reason, capabilities cao mà dev cầm flow. LLM đóng vai trò quyết đi đâu trong flow ta viết.

Vì sao không dùng Airflow/NetworkX: LangGraph opinionated cho agentic apps, có sẵn controllability, parallel nodes, conditional branching với LLM, persistence/checkpoint state, human-in-the-loop, time travel replay, debug/trace với LangSmith. Trong nodes viết code gì cũng được, không bắt buộc LangChain. Papers agent vốn vẽ thành graphs nên diễn đạt vậy rất readable, dễ maintain/test/monitor. State là thứ share qua nodes/edges, giữ intermediate results để LLM quyết đi đâu.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Phổ deterministic → router → agent có cycles | VẪN ĐÚNG | https://docs.langchain.com/langgraph | Khung sư phạm từ slides LangChain, không đổi bản chất. |
| ReAct kẹt loop, cần scope lại | VẪN ĐÚNG | https://arxiv.org/abs/2210.03629 | Đúng paper gốc và kinh nghiệm production. |
| LangGraph có persistence, HITL, time travel, LangSmith | VẪN ĐÚNG | https://docs.langchain.com/langgraph | WebFetch xác nhận durable execution, streaming, human review, resume. |

> Hộp cập nhật 2026-09-17: Giữ nguyên định nghĩa và slides. API chi tiết đổi theo version, đọc docs hiện tại khi code. Không thêm code vì transcript lý thuyết.

---

## 4. Tóm tắt

| Mức | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Deterministic | Code thuần | Chắc nhưng cứng |
| +LLM/chaining/router | Một chiều | Linh hoạt hơn |
| Autonomous | Full tự do | Scatter, chưa production-ready |
| LangGraph | Graph có cycles, dev cầm flow | Linh hoạt có kiểm soát |

**Chốt: Bớt LLM một chiều tự do để đổi lấy reliability — đó là lý do LangGraph ra đời.**

---

## 5. Câu hỏi tự kiểm tra

1. Phổ autonomy gồm những mức nào?
2. LLM router khác chain thường ở đâu?
3. Định nghĩa agent gọn nhất trong bài là gì?
4. Vì sao ReAct cũ unreliable?
5. Kể 5 building blocks LangGraph mang lại.

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Deterministic → +1 LLM → chaining (ví dụ RAG) → LLM router → agents có cycles → autonomous full tự do.

**2.** Router dùng LLM quyết chạy nhánh nào, nhưng vẫn không cycles, vẫn trên vạch LangChain làm tốt.

**3.** Control flow mà LLM quyết đi đâu (Node 1 hay Node 2), khác chain một chiều ở chỗ có cycles.

**4.** Vì mọi permutation đều cho phép, gồm cả kẹt invoke cùng tool vô hạn do tools sai, LLM yếu, sai args, hallucinate tool.

**5.** Controllability/parallel/conditional branching, persistence state, human-in-the-loop, time travel replay, debug/trace với LangSmith.

</details>

## 6. Bước tiếp theo

Bài 087 — *Graphs là gì* — nodes, edges và state machine nhìn dưới dạng đồ thị.
